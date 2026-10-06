(function () {
    'use strict';

    var PESOS = { titulo: 12, tags: 7, resumo: 4, corpo: 1 };
    var PALAVRAS_VAZIAS = {
        pt: 'a o as os de da do das dos e em no na nos nas um uma uns umas para por com como que se ao aos qual quais é eu meu minha'.split(' '),
        en: 'a an the of to in on for and or is are how do does what with my i can by be'.split(' ')
    };

    function normalizar(texto) {
        return String(texto || '')
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .toLowerCase();
    }

    function tokenizar(texto) {
        return normalizar(texto).match(/[a-z0-9_$#.\/-]+/g) || [];
    }

    function textoPuro(md) {
        return String(md || '')
            .replace(/^(~~~|```).*$/gm, ' ')
            .replace(/^:::.*$/gm, ' ')
            .replace(/^#{1,4}\s+/gm, '')
            .replace(/[«»`*|>]/g, ' ')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/\s+/g, ' ')
            .trim();
    }

    var indice = [];
    var idiomaIndice = null;

    function campo(obj, idioma, nome) {
        var l = (obj && obj[idioma]) || (obj && obj.pt) || {};
        return l[nome];
    }

    function documento(tipo, id, idioma, dados) {
        var d = {
            tipo: tipo,
            id: id,
            titulo: dados.titulo || '',
            resumo: dados.resumo || '',
            tags: (dados.tags || []).join(' '),
            corpoPuro: textoPuro(dados.corpo || ''),
            extra: dados.extra || {}
        };
        d.n = {
            titulo: normalizar(d.titulo),
            tags: normalizar(d.tags),
            resumo: normalizar(d.resumo),
            corpo: normalizar(d.corpoPuro)
        };
        return d;
    }

    function construir(idioma) {
        var DOC = window.DOC;
        indice = [];

        DOC.topicos.forEach(function (t) {
            indice.push(documento('topico', t.id, idioma, {
                titulo: campo(t, idioma, 'titulo'),
                resumo: campo(t, idioma, 'resumo'),
                tags: (campo(t, idioma, 'tags') || []).concat(t.desde ? ['apex ' + t.desde, t.desde] : []),
                corpo: campo(t, idioma, 'conteudo'),
                extra: { cat: t.cat, desde: t.desde }
            }));
        });

        DOC.versoes.forEach(function (v) {
            var l = v[idioma] || v.pt || {};
            indice.push(documento('versao', v.id, idioma, {
                titulo: v.nome,
                resumo: l.destaque,
                tags: [v.id, 'versao', 'version', 'release', String(v.ano || '')].concat(l.tags || []),
                corpo: [(l.recursos || []).join(' . '), (l.descontinuados || []).join(' . '), l.notas || ''].join(' '),
                extra: { ano: v.ano }
            }));
        });

        DOC.glossario.forEach(function (g, i) {
            var l = g[idioma] || g.pt || {};
            indice.push(documento('termo', g.id || window.Markdown.slug(g.termo || (g.pt && g.pt.termo) || ('termo-' + i)), idioma, {
                titulo: l.termo || g.termo,
                resumo: l.def,
                tags: g.aliases || [],
                corpo: ''
            }));
        });

        DOC.faq.forEach(function (f) {
            var l = f[idioma] || f.pt || {};
            indice.push(documento('faq', f.id, idioma, {
                titulo: l.q,
                resumo: '',
                tags: (l.tags || []).concat(f.tema ? [f.tema] : []),
                corpo: l.r,
                extra: { tema: f.tema }
            }));
        });

        idiomaIndice = idioma;
    }

    function expandir(termos) {
        var sin = window.DOC.sinonimos || {};
        return termos.map(function (t, i) {
            var alternativas = [t];
            var dupla = termos[i + 1] ? t + ' ' + termos[i + 1] : null;
            if (sin[t]) alternativas = alternativas.concat(sin[t]);
            if (dupla && sin[dupla]) alternativas = alternativas.concat(sin[dupla]);
            if (t.length > 4 && /s$/.test(t)) alternativas.push(t.slice(0, -1));
            return alternativas.map(normalizar);
        });
    }

    function contemPrefixo(texto, termo) {
        if (!texto) return -1;
        if (termo.indexOf(' ') >= 0) return texto.indexOf(termo);
        var re = new RegExp('(^|[^a-z0-9_])' + termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        var m = re.exec(texto);
        return m ? m.index + m[1].length : -1;
    }

    function pontuarTermo(doc, alternativas) {
        var melhor = 0;
        alternativas.forEach(function (alt, idx) {
            var fator = idx === 0 ? 1 : 0.6;
            var p = 0;
            ['titulo', 'tags', 'resumo', 'corpo'].forEach(function (c) {
                var pos = contemPrefixo(doc.n[c], alt);
                if (pos >= 0) {
                    var base = PESOS[c];
                    if (c === 'titulo') {
                        if (doc.n.titulo === alt) base += 20;
                        else if (pos === 0) base += 6;
                    }
                    if (c === 'corpo') {
                        var n = doc.n.corpo.split(alt).length - 1;
                        base += Math.min(n, 6) * 0.5;
                    }
                    p += base;
                }
            });
            melhor = Math.max(melhor, p * fator);
        });
        return melhor;
    }

    function pesquisar(consulta, idioma, opcoes) {
        opcoes = opcoes || {};
        if (idiomaIndice !== idioma) construir(idioma);

        var bruto = normalizar(consulta).trim();
        if (!bruto) return [];

        var vazias = PALAVRAS_VAZIAS[idioma] || [];
        var termos = tokenizar(bruto).filter(function (t) { return vazias.indexOf(t) < 0; });
        if (!termos.length) termos = tokenizar(bruto);
        if (!termos.length) return [];

        var grupos = expandir(termos);
        var resultados = [];

        indice.forEach(function (doc) {
            if (opcoes.tipo && doc.tipo !== opcoes.tipo) return;
            var total = 0, faltando = 0;
            for (var i = 0; i < grupos.length; i++) {
                var p = pontuarTermo(doc, grupos[i]);
                if (p === 0) faltando++;
                total += p;
            }
            if (faltando > (grupos.length >= 4 ? 1 : 0)) return;
            if (faltando) total *= 0.5;

            if (termos.length > 1) {
                var frase = termos.join(' ');
                if (doc.n.titulo.indexOf(frase) >= 0) total += 25;
                else if (doc.n.corpo.indexOf(frase) >= 0 || doc.n.resumo.indexOf(frase) >= 0) total += 8;
            }
            if (doc.tipo === 'topico') total *= 1.15;

            resultados.push({ doc: doc, pontos: total, termos: termos });
        });

        resultados.sort(function (a, b) { return b.pontos - a.pontos; });
        return resultados;
    }

    function trecho(doc, termos, tamanho) {
        tamanho = tamanho || 170;
        var fonte = doc.resumo && termos.some(function (t) { return normalizar(doc.resumo).indexOf(t) >= 0; })
            ? doc.resumo : (doc.corpoPuro || doc.resumo || '');
        var n = normalizar(fonte);
        var pos = -1;
        for (var i = 0; i < termos.length && pos < 0; i++) pos = n.indexOf(termos[i]);
        if (pos < 0) return fonte.length > tamanho ? fonte.slice(0, tamanho).replace(/\s\S*$/, '') + '…' : fonte;
        var inicio = Math.max(0, pos - Math.floor(tamanho / 3));
        var fim = Math.min(fonte.length, inicio + tamanho);
        var t = fonte.slice(inicio, fim);
        if (inicio > 0) t = '…' + t.replace(/^\S*\s/, '');
        if (fim < fonte.length) t = t.replace(/\s\S*$/, '') + '…';
        return t;
    }

    function destacar(texto, termos) {
        var esc = window.Markdown.escapar(texto);
        if (!termos || !termos.length) return esc;
        var n = normalizar(esc);
        var marcas = [];
        termos.forEach(function (t) {
            if (t.length < 2) return;
            var pos = 0;
            while ((pos = n.indexOf(t, pos)) >= 0) { marcas.push([pos, pos + t.length]); pos += t.length; }
        });
        if (!marcas.length) return esc;
        marcas.sort(function (a, b) { return a[0] - b[0]; });
        var saida = '', ultimo = 0;
        marcas.forEach(function (m) {
            if (m[0] < ultimo) return;
            if (/&[a-z]*$/.test(esc.slice(ultimo, m[0])) && esc.indexOf(';', m[0]) - m[0] < 6) return;
            saida += esc.slice(ultimo, m[0]) + '<mark>' + esc.slice(m[0], m[1]) + '</mark>';
            ultimo = m[1];
        });
        return saida + esc.slice(ultimo);
    }

    window.Busca = {
        pesquisar: pesquisar,
        trecho: trecho,
        destacar: destacar,
        normalizar: normalizar,
        reconstruir: function (idioma) { construir(idioma); }
    };
})();
