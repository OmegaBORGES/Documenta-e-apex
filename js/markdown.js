(function () {
    'use strict';

    function escapar(texto) {
        return String(texto)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function slug(texto) {
        return String(texto)
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function inline(texto) {
        var guardados = [];
        function guardar(html) {
            guardados.push(html);
            return '\u0000' + (guardados.length - 1) + '\u0000';
        }

        texto = texto.replace(/«([^»]+)»/g, function (_, c) { return guardar('<code>' + escapar(c) + '</code>'); });
        texto = texto.replace(/`([^`]+)`/g, function (_, c) { return guardar('<code>' + escapar(c) + '</code>'); });

        texto = texto.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, rotulo, url) {
            var externo = /^https?:/.test(url);
            return guardar('<a href="' + escapar(url) + '"' + (externo ? ' target="_blank" rel="noopener"' : '') + '>' +
                inline(rotulo) + (externo ? '<span class="link-externo" aria-hidden="true">↗</span>' : '') + '</a>');
        });

        texto = escapar(texto);

        texto = texto
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/(^|[\s(])\*([^\s*][^*]*?[^\s*]|[^\s*])\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');

        return texto.replace(/\u0000(\d+)\u0000/g, function (_, i) { return guardados[+i]; });
    }

    var SQL_PALAVRAS = ('select from where and or not in is null as on join left right inner outer full cross union all ' +
        'intersect minus order by group having distinct insert into values update set delete merge using matched when then ' +
        'else end case begin declare exception raise return returning procedure function package body create replace ' +
        'table view index sequence trigger type constraint primary key foreign references unique check default ' +
        'alter drop grant revoke to with exists between like escape asc desc nulls first last fetch next rows only ' +
        'offset loop for while exit continue if elsif cursor open close bulk collect forall commit rollback savepoint ' +
        'pragma autonomous_transaction execute immediate varchar2 number date timestamp clob blob boolean integer pls_integer ' +
        'char nvarchar2 raw json true false out nocopy rowtype %rowtype %type record of varray limit sysdate systimestamp ' +
        'connect prior start level rownum partition over row_number rank dense_rank listagg within nvl nvl2 coalesce decode ' +
        'count sum avg min max trunc to_char to_date to_number upper lower substr instr length trim replace sql authid ' +
        'definer current_user deterministic result_cache pipelined pipe identity generated always vector').split(' ');
    var JS_PALAVRAS = ('const let var function return if else for while do new this true false null undefined async await ' +
        'class extends import export from try catch finally throw typeof instanceof of in switch case break continue ' +
        'default delete void yield static get set super').split(' ');

    var conjuntoSQL = {}; SQL_PALAVRAS.forEach(function (p) { conjuntoSQL[p] = true; });
    var conjuntoJS = {}; JS_PALAVRAS.forEach(function (p) { conjuntoJS[p] = true; });

    function span(classe, texto) {
        return '<span class="tk-' + classe + '">' + escapar(texto) + '</span>';
    }

    function realcarSQL(codigo) {
        var re = /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^']|'')*'?)|(:[A-Za-z_][\w$#]*|&[A-Za-z_][\w$#]*\.?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w$#]*(?:\.[A-Za-z_][\w$#]*)*)/g;
        var saida = '', ultimo = 0, m;
        while ((m = re.exec(codigo)) !== null) {
            saida += escapar(codigo.slice(ultimo, m.index));
            if (m[1]) saida += span('comentario', m[1]);
            else if (m[2]) saida += span('string', m[2]);
            else if (m[3]) saida += span('variavel', m[3]);
            else if (m[4]) saida += span('numero', m[4]);
            else {
                var palavra = m[5], baixa = palavra.toLowerCase();
                if (/^(apex_|dbms_|utl_|owa_|htp\b|htf\b|sys\.|wwv_|v\b|nv\b)/i.test(palavra)) saida += span('api', palavra);
                else if (conjuntoSQL[baixa]) saida += span('palavra', palavra);
                else saida += escapar(palavra);
            }
            ultimo = re.lastIndex;
        }
        return saida + escapar(codigo.slice(ultimo));
    }

    function realcarJS(codigo) {
        var re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?|`(?:[^`\\]|\\.)*`?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;
        var saida = '', ultimo = 0, m;
        while ((m = re.exec(codigo)) !== null) {
            saida += escapar(codigo.slice(ultimo, m.index));
            if (m[1]) saida += span('comentario', m[1]);
            else if (m[2]) saida += span('string', m[2]);
            else if (m[3]) saida += span('numero', m[3]);
            else {
                var p = m[4];
                if (p === 'apex' || p === '$s' || p === '$v' || p === '$x') saida += span('api', p);
                else if (conjuntoJS[p]) saida += span('palavra', p);
                else saida += escapar(p);
            }
            ultimo = re.lastIndex;
        }
        return saida + escapar(codigo.slice(ultimo));
    }

    function realcarHTML(codigo) {
        var re = /(<!--[\s\S]*?-->)|(<\/?[A-Za-z][\w:-]*)|("[^"]*"|'[^']*')|(\{\/?[a-z][\w:-]*\b[^}]*\}|#[A-Z_][A-Z0-9_$]*#|&[A-Z_][A-Z0-9_]*\.)/g;
        var saida = '', ultimo = 0, m;
        while ((m = re.exec(codigo)) !== null) {
            saida += escapar(codigo.slice(ultimo, m.index));
            if (m[1]) saida += span('comentario', m[1]);
            else if (m[2]) saida += span('palavra', m[2]);
            else if (m[3]) saida += span('string', m[3]);
            else saida += span('variavel', m[4]);
            ultimo = re.lastIndex;
        }
        return saida + escapar(codigo.slice(ultimo));
    }

    function realcar(codigo, linguagem) {
        switch ((linguagem || '').toLowerCase()) {
            case 'sql': case 'plsql': case 'pl/sql': return realcarSQL(codigo);
            case 'js': case 'javascript': case 'json': case 'css': return realcarJS(codigo);
            case 'html': case 'xml': case 'template': return realcarHTML(codigo);
            default: return escapar(codigo);
        }
    }

    var NOMES_LINGUAGEM = {
        sql: 'SQL', plsql: 'PL/SQL', js: 'JavaScript', javascript: 'JavaScript', json: 'JSON', css: 'CSS',
        html: 'HTML', xml: 'XML', template: 'Template', bash: 'Shell', shell: 'Shell', texto: 'Texto', text: 'Texto'
    };

    var TITULOS_DESTAQUE = {
        pt: { dica: 'Dica', atencao: 'Atenção', info: 'Saiba mais', novo: 'Novidade' },
        en: { dica: 'Tip', atencao: 'Watch out', info: 'Good to know', novo: 'New' }
    };
    var idiomaPadrao = 'pt';

    function renderizar(md, opcoes) {
        opcoes = opcoes || {};
        var titulos = opcoes.titulos || [];
        var idioma = opcoes.idioma || idiomaPadrao;
        var linhas = String(md || '').replace(/\r\n?/g, '\n').split('\n');
        var html = [];
        var i = 0;

        var minimo = Infinity;
        linhas.forEach(function (l) {
            if (l.trim()) minimo = Math.min(minimo, l.match(/^ */)[0].length);
        });
        if (minimo !== Infinity && minimo > 0) linhas = linhas.map(function (l) { return l.slice(minimo); });

        function eInicioDeBloco(l) {
            return /^(#{2,4}\s|~~~|```|:::|\||>\s?|-{3,}\s*$|\s*[-*]\s+|\s*\d+\.\s+)/.test(l);
        }

        while (i < linhas.length) {
            var linha = linhas[i];

            if (!linha.trim()) { i++; continue; }

            var cerca = linha.match(/^(~~~|```)\s*([\w/+-]*)\s*(.*)$/);
            if (cerca) {
                var lang = cerca[2] || 'texto', legenda = cerca[3] || '', corpo = [];
                i++;
                while (i < linhas.length && linhas[i].indexOf(cerca[1]) !== 0) { corpo.push(linhas[i]); i++; }
                i++;
                var rotulo = legenda || NOMES_LINGUAGEM[lang.toLowerCase()] || lang.toUpperCase();
                if (rotulo === 'Texto' && idioma === 'en') rotulo = 'Text';
                html.push('<div class="codigo"><div class="codigo-topo"><span>' + escapar(rotulo) + '</span>' +
                    '<button type="button" class="copiar" data-copiar>' + (idioma === 'en' ? 'Copy' : 'Copiar') + '</button></div>' +
                    '<pre><code class="lang-' + escapar(lang.toLowerCase()) + '">' + realcar(corpo.join('\n'), lang) + '</code></pre></div>');
                continue;
            }

            var destaque = linha.match(/^:::\s*(dica|atencao|info|novo)\s*(.*)$/);
            if (destaque) {
                var interno = [];
                i++;
                var profundidade = 0;
                while (i < linhas.length) {
                    if (/^:::\s*(dica|atencao|info|novo)/.test(linhas[i])) profundidade++;
                    else if (/^:::\s*$/.test(linhas[i])) { if (profundidade === 0) break; profundidade--; }
                    interno.push(linhas[i]); i++;
                }
                i++;
                var tipo = destaque[1];
                html.push('<aside class="destaque destaque-' + tipo + '"><p class="destaque-titulo">' +
                    inline(destaque[2] || (TITULOS_DESTAQUE[idioma] || TITULOS_DESTAQUE.pt)[tipo]) + '</p>' +
                    renderizar(interno.join('\n'), { titulos: [], idioma: idioma }) + '</aside>');
                continue;
            }

            var titulo = linha.match(/^(#{2,4})\s+(.+?)\s*$/);
            if (titulo) {
                var nivel = titulo[1].length, id = slug(titulo[2]);
                titulos.push({ nivel: nivel, texto: titulo[2].replace(/[«»*`]/g, ''), id: id });
                html.push('<h' + nivel + ' id="' + id + '">' + inline(titulo[2]) + '</h' + nivel + '>');
                i++; continue;
            }

            if (/^-{3,}\s*$/.test(linha)) { html.push('<hr>'); i++; continue; }

            if (/^\|/.test(linha)) {
                var linhasTabela = [];
                while (i < linhas.length && /^\|/.test(linhas[i])) { linhasTabela.push(linhas[i]); i++; }
                html.push(tabela(linhasTabela));
                continue;
            }

            if (/^>\s?/.test(linha)) {
                var citacao = [];
                while (i < linhas.length && /^>\s?/.test(linhas[i])) { citacao.push(linhas[i].replace(/^>\s?/, '')); i++; }
                html.push('<blockquote>' + renderizar(citacao.join('\n'), { titulos: [], idioma: idioma }) + '</blockquote>');
                continue;
            }

            if (/^\s*([-*]|\d+\.)\s+/.test(linha)) {
                var itensLista = [];
                while (i < linhas.length && (/^\s*([-*]|\d+\.)\s+/.test(linhas[i]) || (linhas[i].trim() && /^\s{2,}\S/.test(linhas[i])))) {
                    itensLista.push(linhas[i]); i++;
                }
                html.push(lista(itensLista));
                continue;
            }

            var paragrafo = [];
            while (i < linhas.length && linhas[i].trim() && !(paragrafo.length && eInicioDeBloco(linhas[i]))) {
                paragrafo.push(linhas[i].trim()); i++;
            }
            html.push('<p>' + inline(paragrafo.join(' ')) + '</p>');
        }

        return html.join('\n');
    }

    function lista(linhas) {
        return listaHTML(construirArvore(linhas));
    }

    function construirArvore(linhas) {
        var primeiro = linhas[0].match(/^\s*(\d+)\./);
        var raiz = { itens: [], ordenada: !!primeiro, inicio: primeiro ? parseInt(primeiro[1], 10) : 1 };
        var niveis = [{ indent: (linhas[0].match(/^\s*/)[0].length), lista: raiz }];
        var ultimoItem = null;
        linhas.forEach(function (l) {
            var m = l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
            if (!m) { if (ultimoItem) ultimoItem.texto += ' ' + l.trim(); return; }
            var indent = m[1].length;
            var nivel = niveis[niveis.length - 1];
            if (indent > nivel.indent && ultimoItem) {
                var sub = { itens: [], ordenada: /\d+\./.test(m[2]), inicio: parseInt(m[2], 10) || 1 };
                ultimoItem.sub = sub;
                niveis.push({ indent: indent, lista: sub });
            } else {
                while (niveis.length > 1 && indent < niveis[niveis.length - 1].indent) niveis.pop();
            }
            ultimoItem = { texto: m[3], sub: null };
            niveis[niveis.length - 1].lista.itens.push(ultimoItem);
        });
        return raiz;
    }

    function listaHTML(lista) {
        var tag = lista.ordenada ? 'ol' : 'ul';
        var inicio = lista.ordenada && lista.inicio > 1 ? ' start="' + lista.inicio + '"' : '';
        return '<' + tag + inicio + '>' + lista.itens.map(function (item) {
            return '<li>' + inline(item.texto) + (item.sub ? listaHTML(item.sub) : '') + '</li>';
        }).join('') + '</' + tag + '>';
    }

    function tabela(linhas) {
        function celulas(l) {
            return l.replace(/^\|/, '').replace(/\|\s*$/, '').split(/(?<!\\)\|/).map(function (c) { return c.replace(/\\\|/g, '|').trim(); });
        }
        var cabecalho = celulas(linhas[0]);
        var corpo = linhas.slice(1).filter(function (l) { return !/^\|[\s:|-]+\|?\s*$/.test(l); });
        return '<div class="tabela-rolagem"><table><thead><tr>' +
            cabecalho.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') +
            '</tr></thead><tbody>' +
            corpo.map(function (l) {
                return '<tr>' + celulas(l).map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
            }).join('') +
            '</tbody></table></div>';
    }

    window.Markdown = {
        renderizar: renderizar,
        definirIdioma: function (i) { idiomaPadrao = i; },
        inline: inline,
        escapar: escapar,
        slug: slug,
        realcar: realcar
    };
})();
