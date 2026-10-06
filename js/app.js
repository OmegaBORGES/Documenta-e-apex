(function () {
    'use strict';

    var DOC = window.DOC;
    var md = window.Markdown;
    var esc = md.escapar;

    var TEXTOS = {
        pt: {
            subtitulo: 'Tudo sobre Oracle APEX em um só lugar — dos tempos do HTML DB até a versão mais recente.',
            placeholder: 'Pesquise qualquer coisa: Interactive Grid, APEX_EXEC, ORDS, versão 24.2...',
            rotuloBusca: 'Pesquisar na documentação',
            menuInicio: 'Início', menuTopicos: 'Tópicos', menuVersoes: 'Versões', menuGlossario: 'Glossário', menuFaq: 'Perguntas frequentes',
            temaClaro: 'Modo claro', temaEscuro: 'Modo escuro', idioma: 'Idioma',
            rodape: 'conteúdo comunitário de estudo sobre Oracle APEX.',
            desenvolvidoPor: 'Desenvolvido por',
            rodapeNota: 'Oracle, Oracle APEX e marcas relacionadas pertencem à Oracle Corporation. Este material não é oficial; consulte sempre a <a href="https://docs.oracle.com/en/database/oracle/apex/" target="_blank" rel="noopener">documentação oficial</a> para detalhes definitivos.',
            voltarTopo: 'Voltar ao topo',
            populares: 'Buscas populares:',
            estatTopicos: 'tópicos', estatVersoes: 'versões', estatTermos: 'termos no glossário', estatPerguntas: 'perguntas respondidas',
            categorias: 'Explore por categoria',
            categoriasDesc: 'Os assuntos estão organizados do básico ao avançado. Escolha uma área para começar.',
            topicosN: function (n) { return n + (n === 1 ? ' tópico' : ' tópicos'); },
            versaoAtual: 'Versão mais recente',
            verNovidades: 'Ver todas as novidades',
            linhaTempo: 'Linha do tempo das versões',
            linhaTempoDesc: 'Do Project Flows ao APEX de hoje: o que cada versão trouxe.',
            verLinhaTempo: 'Ver a linha do tempo completa',
            comeceAqui: 'Comece por aqui',
            comeceAquiDesc: 'Uma trilha sugerida para quem está chegando agora.',
            duvidas: 'Dúvidas frequentes',
            duvidasDesc: 'As perguntas que mais aparecem em fóruns e comunidades — respondidas.',
            verTodasPerguntas: 'Ver todas as perguntas',
            todosTopicos: 'Todos os tópicos',
            todosTopicosDesc: 'Navegue por todo o conteúdo, organizado por categoria.',
            filtrarNivel: 'Filtrar por nível',
            todos: 'Todos',
            nivel: { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' },
            desde: 'Desde o APEX',
            leitura: function (n) { return n + ' min de leitura'; },
            nesteArtigo: 'Neste artigo',
            relacionados: 'Tópicos relacionados',
            linksOficiais: 'Para se aprofundar',
            anterior: 'Anterior', proximo: 'Próximo',
            inicio: 'Início',
            versoesTitulo: 'Versões do Oracle APEX',
            versoesDesc: 'Todas as versões, das origens até hoje, com os principais recursos de cada uma. Use os filtros para navegar por era.',
            filtrarEra: 'Filtrar por era',
            lancamento: 'Lançamento', bdMinimo: 'Banco mínimo', ordsMinimo: 'ORDS',
            principaisRecursos: 'Principais novidades',
            descontinuados: 'Obsoletos / removidos',
            verDetalhes: 'Ver detalhes',
            verMais: function (n) { return 'Ver mais ' + n; },
            verMenos: 'Ver menos',
            maisRecente: 'Mais recente',
            notas: 'Contexto',
            versaoAnterior: 'Versão anterior', versaoSeguinte: 'Versão seguinte',
            glossarioTitulo: 'Glossário',
            glossarioDesc: 'Os termos e siglas do universo APEX explicados de forma direta.',
            filtrarTermos: 'Filtrar termos...',
            nenhumTermo: 'Nenhum termo encontrado.',
            leiaMais: 'Leia mais',
            faqTitulo: 'Perguntas frequentes',
            faqDesc: 'Dúvidas reais e recorrentes da comunidade APEX, com respostas práticas.',
            filtrarTema: 'Filtrar por tema',
            buscaTitulo: function (q) { return 'Resultados para “' + q + '”'; },
            buscaN: function (n) { return n === 0 ? 'Nenhum resultado' : n + (n === 1 ? ' resultado' : ' resultados'); },
            buscaVazia: 'Nada encontrado. Tente outras palavras, um sinônimo em inglês (ex.: “report”, “item”) ou explore as categorias.',
            buscaDica: 'Dica: pressione <kbd>/</kbd> em qualquer página para pesquisar.',
            verTodosResultados: function (n) { return 'Ver todos os ' + n + ' resultados'; },
            semSugestoes: 'Nenhum resultado. Pressione Enter para buscar mesmo assim.',
            tipos: { todos: 'Todos', topico: 'Tópicos', versao: 'Versões', termo: 'Glossário', faq: 'Perguntas' },
            tipo1: { topico: 'Tópico', versao: 'Versão', termo: 'Glossário', faq: 'Pergunta' },
            naoEncontrado: 'Página não encontrada',
            naoEncontradoDesc: 'O endereço acessado não existe. Que tal pesquisar ou voltar ao início?',
            voltarInicio: 'Voltar ao início',
            copiar: 'Copiar', copiado: 'Copiado!',
            emBreve: 'Conteúdo em preparação.'
        },
        en: {
            subtitulo: 'Everything about Oracle APEX in one place — from the HTML DB days to the latest release.',
            placeholder: 'Search anything: Interactive Grid, APEX_EXEC, ORDS, version 24.2...',
            rotuloBusca: 'Search the documentation',
            menuInicio: 'Home', menuTopicos: 'Topics', menuVersoes: 'Versions', menuGlossario: 'Glossary', menuFaq: 'FAQ',
            temaClaro: 'Light mode', temaEscuro: 'Dark mode', idioma: 'Language',
            rodape: 'community study material about Oracle APEX.',
            desenvolvidoPor: 'Developed by',
            rodapeNota: 'Oracle, Oracle APEX and related marks belong to Oracle Corporation. This material is unofficial; always check the <a href="https://docs.oracle.com/en/database/oracle/apex/" target="_blank" rel="noopener">official documentation</a> for definitive details.',
            voltarTopo: 'Back to top',
            populares: 'Popular searches:',
            estatTopicos: 'topics', estatVersoes: 'versions', estatTermos: 'glossary terms', estatPerguntas: 'answered questions',
            categorias: 'Explore by category',
            categoriasDesc: 'Subjects are organized from beginner to advanced. Pick an area to start.',
            topicosN: function (n) { return n + (n === 1 ? ' topic' : ' topics'); },
            versaoAtual: 'Latest release',
            verNovidades: 'See all new features',
            linhaTempo: 'Release timeline',
            linhaTempoDesc: 'From Project Flows to today\'s APEX: what each release brought.',
            verLinhaTempo: 'See the full timeline',
            comeceAqui: 'Start here',
            comeceAquiDesc: 'A suggested path for newcomers.',
            duvidas: 'Frequently asked questions',
            duvidasDesc: 'The questions that come up most in forums and communities — answered.',
            verTodasPerguntas: 'See all questions',
            todosTopicos: 'All topics',
            todosTopicosDesc: 'Browse all content, organized by category.',
            filtrarNivel: 'Filter by level',
            todos: 'All',
            nivel: { basico: 'Beginner', intermediario: 'Intermediate', avancado: 'Advanced' },
            desde: 'Since APEX',
            leitura: function (n) { return n + ' min read'; },
            nesteArtigo: 'On this page',
            relacionados: 'Related topics',
            linksOficiais: 'Learn more',
            anterior: 'Previous', proximo: 'Next',
            inicio: 'Home',
            versoesTitulo: 'Oracle APEX versions',
            versoesDesc: 'Every release, from the origins to today, with the key features of each. Use the filters to browse by era.',
            filtrarEra: 'Filter by era',
            lancamento: 'Released', bdMinimo: 'Minimum database', ordsMinimo: 'ORDS',
            principaisRecursos: 'Key new features',
            descontinuados: 'Deprecated / removed',
            verDetalhes: 'See details',
            verMais: function (n) { return 'Show ' + n + ' more'; },
            verMenos: 'Show less',
            maisRecente: 'Latest',
            notas: 'Context',
            versaoAnterior: 'Previous version', versaoSeguinte: 'Next version',
            glossarioTitulo: 'Glossary',
            glossarioDesc: 'APEX terms and acronyms explained in plain words.',
            filtrarTermos: 'Filter terms...',
            nenhumTermo: 'No terms found.',
            leiaMais: 'Read more',
            faqTitulo: 'Frequently asked questions',
            faqDesc: 'Real, recurring questions from the APEX community, with practical answers.',
            filtrarTema: 'Filter by theme',
            buscaTitulo: function (q) { return 'Results for “' + q + '”'; },
            buscaN: function (n) { return n === 0 ? 'No results' : n + (n === 1 ? ' result' : ' results'); },
            buscaVazia: 'Nothing found. Try other words, a synonym (e.g. “report”, “item”) or browse the categories.',
            buscaDica: 'Tip: press <kbd>/</kbd> on any page to search.',
            verTodosResultados: function (n) { return 'See all ' + n + ' results'; },
            semSugestoes: 'No results. Press Enter to search anyway.',
            tipos: { todos: 'All', topico: 'Topics', versao: 'Versions', termo: 'Glossary', faq: 'Questions' },
            tipo1: { topico: 'Topic', versao: 'Version', termo: 'Glossary', faq: 'Question' },
            naoEncontrado: 'Page not found',
            naoEncontradoDesc: 'This address does not exist. How about searching or going back home?',
            voltarInicio: 'Back to home',
            copiar: 'Copy', copiado: 'Copied!',
            emBreve: 'Content coming soon.'
        }
    };

    var BUSCAS_POPULARES = {
        pt: ['Interactive Grid', 'Dynamic Actions', 'APEX_AI', 'Session State', 'REST Data Source', 'Autenticação', 'Workflow', 'Novidades 26.1'],
        en: ['Interactive Grid', 'Dynamic Actions', 'APEX_AI', 'Session State', 'REST Data Source', 'Authentication', 'Workflow', 'New in 26.1']
    };

    var TRILHA = ['o-que-e-apex', 'arquitetura', 'workspaces-e-aplicacoes', 'sessao-e-session-state', 'create-app-wizard',
        'page-designer', 'interactive-report', 'formularios', 'dynamic-actions', 'autenticacao'];

    var ICONES = {
        livro: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
        servidor: '<rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/>',
        camadas: '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
        grade: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
        formulario: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
        raio: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
        codigo: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
        escudo: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
        plugue: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
        paleta: '<path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A5.6 5.6 0 0 0 22 9.8C22 5.5 17.5 2 12 2Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="6.8" r="1"/><circle cx="15" cy="7" r="1"/>',
        brilho: '<path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9L11 3z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>',
        fluxo: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M6.5 10v3.5a2 2 0 0 0 2 2H14"/>',
        foguete: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
        globo: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        velocimetro: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
        estrela: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
        relogio: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        ajuda: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
        livroAberto: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
        setaDireita: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        setaEsquerda: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
        externo: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
        busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
        sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
        lua: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
        idiomas: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
        bandeira: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
        alerta: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
        mais: '<path d="M12 5v14M5 12h14"/>'
    };

    function icone(nome, classe) {
        return '<svg class="icone ' + (classe || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONES[nome] || ICONES.livro) + '</svg>';
    }

    function lerPreferencia(chave) {
        try { return localStorage.getItem(chave); } catch (e) { return null; }
    }
    function salvarPreferencia(chave, valor) {
        try { localStorage.setItem(chave, valor); } catch (e) { }
    }

    var idioma = lerPreferencia('documentae-idioma');
    if (idioma !== 'pt' && idioma !== 'en') {
        idioma = (navigator.language || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
        if (!/^en/.test((navigator.language || '').toLowerCase())) idioma = 'pt';
    }

    md.definirIdioma(idioma);

    function T(chave) { return TEXTOS[idioma][chave]; }
    function L(obj) { return (obj && (obj[idioma] || obj.pt)) || {}; }

    function temaAtual() {
        var definido = document.documentElement.getAttribute('data-tema');
        if (definido) return definido;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
    }

    function aplicarTema(tema, salvar) {
        document.documentElement.setAttribute('data-tema', tema);
        if (salvar) salvarPreferencia('documentae-tema', tema);
        atualizarControles();
    }

    function aplicarIdioma(novo) {
        if (novo === idioma) return;
        idioma = novo;
        md.definirIdioma(idioma);
        salvarPreferencia('documentae-idioma', idioma);
        window.Busca.reconstruir(idioma);
        traduzirInterface();
        rotear();
    }

    var $ = function (sel, raiz) { return (raiz || document).querySelector(sel); };
    var $$ = function (sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); };

    function chaveVersao(v) {
        if (typeof v.ordem === 'number') return v.ordem;
        var p = String(v.id).split('.');
        return (parseInt(p[0], 10) || 0) * 100 + (parseInt(p[1], 10) || 0);
    }
    function versoesOrdenadas() {
        return DOC.versoes.slice().sort(function (a, b) { return chaveVersao(a) - chaveVersao(b); });
    }
    function versaoMaisRecente() {
        var lista = versoesOrdenadas().filter(function (v) { return !v.prevista; });
        return lista[lista.length - 1];
    }

    function categoria(id) {
        for (var i = 0; i < DOC.categorias.length; i++) if (DOC.categorias[i].id === id) return DOC.categorias[i];
        return null;
    }
    function topico(id) {
        for (var i = 0; i < DOC.topicos.length; i++) if (DOC.topicos[i].id === id) return DOC.topicos[i];
        return null;
    }
    function idTermo(g) {
        return g.id || md.slug(g.termo || L(g).termo || '');
    }
    function topicosDaCategoria(id) {
        return DOC.topicos.filter(function (t) { return t.cat === id; });
    }

    function minutosLeitura(texto) {
        var palavras = String(texto || '').split(/\s+/).length;
        return Math.max(1, Math.round(palavras / 200));
    }

    function formatarData(data) {
        if (!data) return '';
        var m = String(data).match(/^(\d{4})-(\d{2})$/);
        if (!m) return String(data);
        var meses = idioma === 'pt'
            ? ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return meses[parseInt(m[2], 10) - 1] + (idioma === 'pt' ? '/' : ' ') + m[1];
    }

    function chipNivel(nivel) {
        if (!nivel) return '';
        return '<span class="chip chip-nivel chip-' + esc(nivel) + '">' + esc(T('nivel')[nivel] || nivel) + '</span>';
    }
    function chipDesde(desde, comoLink) {
        if (!desde) return '';
        var texto = esc(T('desde')) + ' ' + esc(desde);
        var existe = DOC.versoes.some(function (v) { return v.id === desde; });
        return comoLink && existe
            ? '<a class="chip chip-versao" href="#/versao/' + esc(desde) + '">' + texto + '</a>'
            : '<span class="chip chip-versao">' + texto + '</span>';
    }

    function cartaoTopico(t) {
        var l = L(t), cat = categoria(t.cat);
        return '<a class="cartao cartao-topico" href="#/topico/' + esc(t.id) + '">' +
            '<span class="cartao-cat">' + icone(cat ? cat.icone : 'livro') + esc(cat ? L(cat).nome : '') + '</span>' +
            '<strong class="cartao-titulo">' + esc(l.titulo || t.id) + '</strong>' +
            '<span class="cartao-resumo">' + md.inline(l.resumo || '') + '</span>' +
            '<span class="cartao-meta">' + chipNivel(t.nivel) + chipDesde(t.desde) + '</span>' +
            '</a>';
    }

    function cabecalhoPagina(titulo, descricao, migalhas) {
        var trilha = '';
        if (migalhas && migalhas.length) {
            trilha = '<nav class="migalhas" aria-label="breadcrumb"><a href="#/">' + esc(T('inicio')) + '</a>' +
                migalhas.map(function (m) {
                    return '<span aria-hidden="true">/</span>' + (m.href ? '<a href="' + m.href + '">' + esc(m.texto) + '</a>' : '<span>' + esc(m.texto) + '</span>');
                }).join('') + '</nav>';
        }
        return '<header class="pagina-cabecalho">' + trilha + '<h2 class="pagina-titulo">' + titulo + '</h2>' +
            (descricao ? '<p class="pagina-desc">' + descricao + '</p>' : '') + '</header>';
    }

    function filtros(nome, opcoes, ativo, rotulo) {
        return '<div class="filtros" role="group" aria-label="' + esc(rotulo) + '">' + opcoes.map(function (o) {
            return '<button type="button" class="filtro' + (o.id === ativo ? ' ativo' : '') + '" data-filtro="' + esc(nome) +
                '" data-valor="' + esc(o.id) + '" aria-pressed="' + (o.id === ativo) + '">' + esc(o.texto) +
                (o.n != null ? ' <span class="filtro-n">' + o.n + '</span>' : '') + '</button>';
        }).join('') + '</div>';
    }

    function telaInicio() {
        var recente = versaoMaisRecente();
        var lr = L(recente);
        var populares = BUSCAS_POPULARES[idioma].map(function (b) {
            return '<a class="chip chip-busca" href="#/busca/' + encodeURIComponent(b) + '">' + esc(b) + '</a>';
        }).join('');

        var estat = [
            [DOC.topicos.length, T('estatTopicos'), '#/topicos'],
            [DOC.versoes.length, T('estatVersoes'), '#/versoes'],
            [DOC.glossario.length, T('estatTermos'), '#/glossario'],
            [DOC.faq.length, T('estatPerguntas'), '#/faq']
        ].map(function (e) {
            return '<a class="estatistica" href="' + e[2] + '"><strong>' + e[0] + '</strong><span>' + esc(e[1]) + '</span></a>';
        }).join('');

        var cats = DOC.categorias.map(function (c) {
            var n = topicosDaCategoria(c.id).length, lc = L(c);
            return '<a class="cartao cartao-categoria" href="#/categoria/' + c.id + '">' +
                '<span class="cartao-icone">' + icone(c.icone) + '</span>' +
                '<strong class="cartao-titulo">' + esc(lc.nome) + '</strong>' +
                '<span class="cartao-resumo">' + esc(lc.desc) + '</span>' +
                '<span class="cartao-rodape">' + esc(T('topicosN')(n)) + icone('setaDireita') + '</span></a>';
        }).join('');

        var destaque = '';
        if (recente) {
            destaque = '<section class="secao destaque-versao">' +
                '<div class="destaque-versao-texto">' +
                '<span class="selo">' + icone('brilho') + esc(T('versaoAtual')) + '</span>' +
                '<h3>' + esc(recente.nome) + '</h3>' +
                '<p class="destaque-versao-data">' + esc(T('lancamento')) + ': ' + esc(formatarData(recente.data)) + '</p>' +
                '<p>' + md.inline(lr.destaque || '') + '</p>' +
                '<a class="botao botao-primario" href="#/versao/' + esc(recente.id) + '">' + esc(T('verNovidades')) + icone('setaDireita') + '</a>' +
                '</div><ul class="destaque-versao-lista">' +
                (lr.recursos || []).slice(0, 6).map(function (r) { return '<li>' + md.inline(r) + '</li>'; }).join('') +
                '</ul></section>';
        }

        var ultimas = versoesOrdenadas().slice(-8);
        var linha = '<section class="secao"><div class="secao-topo"><div><h3 class="secao-titulo">' + icone('relogio') + esc(T('linhaTempo')) + '</h3>' +
            '<p class="secao-desc">' + esc(T('linhaTempoDesc')) + '</p></div>' +
            '<a class="link-seta" href="#/versoes">' + esc(T('verLinhaTempo')) + icone('setaDireita') + '</a></div>' +
            '<ol class="mini-linha">' + ultimas.map(function (v) {
                return '<li><a href="#/versao/' + esc(v.id) + '"><span class="mini-linha-ano">' + esc(String(v.ano || '')) + '</span>' +
                    '<strong>' + esc(v.id) + '</strong><span class="mini-linha-txt">' + esc(trunc(semMarcacao(L(v).destaque), 90)) + '</span></a></li>';
            }).join('') + '</ol></section>';

        var trilha = TRILHA.map(topico).filter(Boolean);
        var comece = trilha.length ? '<section class="secao"><div class="secao-topo"><div><h3 class="secao-titulo">' + icone('bandeira') + esc(T('comeceAqui')) + '</h3>' +
            '<p class="secao-desc">' + esc(T('comeceAquiDesc')) + '</p></div></div><ol class="trilha">' +
            trilha.map(function (t, i) {
                return '<li><a href="#/topico/' + esc(t.id) + '"><span class="trilha-n">' + (i + 1) + '</span><span><strong>' + esc(L(t).titulo) +
                    '</strong><small>' + esc(trunc(semMarcacao(L(t).resumo), 110)) + '</small></span></a></li>';
            }).join('') + '</ol></section>' : '';

        var faqs = DOC.faq.filter(function (f) { return f.destaque; });
        if (faqs.length < 6) faqs = faqs.concat(DOC.faq.filter(function (f) { return !f.destaque; })).slice(0, 6);
        var duvidas = faqs.length ? '<section class="secao"><div class="secao-topo"><div><h3 class="secao-titulo">' + icone('ajuda') + esc(T('duvidas')) + '</h3>' +
            '<p class="secao-desc">' + esc(T('duvidasDesc')) + '</p></div><a class="link-seta" href="#/faq">' + esc(T('verTodasPerguntas')) + icone('setaDireita') + '</a></div>' +
            '<div class="faq-grade">' + faqs.slice(0, 6).map(function (f) {
                return '<a class="cartao cartao-faq" href="#/faq/' + esc(f.id) + '">' + icone('ajuda') + '<span>' + esc(L(f).q) + '</span></a>';
            }).join('') + '</div></section>' : '';

        return '<div class="inicio">' +
            '<div class="populares"><span>' + esc(T('populares')) + '</span>' + populares + '</div>' +
            '<div class="estatisticas">' + estat + '</div>' +
            '<section class="secao"><div class="secao-topo"><div><h3 class="secao-titulo">' + icone('camadas') + esc(T('categorias')) + '</h3>' +
            '<p class="secao-desc">' + esc(T('categoriasDesc')) + '</p></div></div><div class="grade-categorias">' + cats + '</div></section>' +
            destaque + '<div class="duas-colunas">' + comece + linha + '</div>' + duvidas + '</div>';
    }

    function trunc(texto, n) {
        texto = String(texto || '');
        return texto.length > n ? texto.slice(0, n).replace(/\s\S*$/, '') + '…' : texto;
    }

    function semMarcacao(texto) {
        return String(texto || '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/(^|\s)\*([^*]+)\*/g, '$1$2')
            .replace(/[«»`]/g, '');
    }

    var filtroNivel = 'todos';

    function telaTopicos() {
        var niveis = [{ id: 'todos', texto: T('todos') }].concat(['basico', 'intermediario', 'avancado'].map(function (n) {
            return { id: n, texto: T('nivel')[n], n: DOC.topicos.filter(function (t) { return t.nivel === n; }).length };
        }));
        var secoes = DOC.categorias.map(function (c) {
            var lista = topicosDaCategoria(c.id).filter(function (t) { return filtroNivel === 'todos' || t.nivel === filtroNivel; });
            if (!lista.length) return '';
            return '<section class="secao" id="cat-' + c.id + '"><div class="secao-topo"><div><h3 class="secao-titulo">' + icone(c.icone) +
                '<a href="#/categoria/' + c.id + '">' + esc(L(c).nome) + '</a></h3><p class="secao-desc">' + esc(L(c).desc) + '</p></div></div>' +
                '<div class="grade-topicos">' + lista.map(cartaoTopico).join('') + '</div></section>';
        }).join('');
        return cabecalhoPagina(esc(T('todosTopicos')), esc(T('todosTopicosDesc')), [{ texto: T('menuTopicos') }]) +
            filtros('nivel', niveis, filtroNivel, T('filtrarNivel')) + secoes;
    }

    function telaCategoria(id) {
        var c = categoria(id);
        if (!c) return telaNaoEncontrada();
        var lista = topicosDaCategoria(id);
        var outras = DOC.categorias.filter(function (o) { return o.id !== id; }).map(function (o) {
            return '<a class="chip" href="#/categoria/' + o.id + '">' + esc(L(o).nome) + '</a>';
        }).join('');
        return cabecalhoPagina('<span class="pagina-icone">' + icone(c.icone) + '</span>' + esc(L(c).nome), esc(L(c).desc),
            [{ texto: T('menuTopicos'), href: '#/topicos' }, { texto: L(c).nome }]) +
            (lista.length ? '<div class="grade-topicos">' + lista.map(cartaoTopico).join('') + '</div>' : '<p class="vazio">' + esc(T('emBreve')) + '</p>') +
            '<div class="outras-categorias">' + outras + '</div>';
    }

    function telaTopico(id) {
        var t = topico(id);
        if (!t) return telaNaoEncontrada();
        var l = L(t), c = categoria(t.cat);
        var titulos = [];
        var corpo = md.renderizar(l.conteudo || '', { titulos: titulos });
        var irmaos = topicosDaCategoria(t.cat);
        var pos = irmaos.indexOf(t);
        var ant = irmaos[pos - 1], prox = irmaos[pos + 1];

        var indice = titulos.filter(function (h) { return h.nivel <= 3; });
        var toc = indice.length > 1 ? '<nav class="toc" aria-label="' + esc(T('nesteArtigo')) + '"><p class="toc-titulo">' + esc(T('nesteArtigo')) + '</p><ul>' +
            indice.map(function (h) {
                return '<li class="toc-n' + h.nivel + '"><a href="#/topico/' + esc(t.id) + '" data-ancora="' + esc(h.id) + '">' + esc(h.texto) + '</a></li>';
            }).join('') + '</ul></nav>' : '';

        var links = (t.links || []).length ? '<section class="artigo-links"><h3>' + icone('externo') + esc(T('linksOficiais')) + '</h3><ul>' +
            t.links.map(function (k) {
                var texto = typeof k.t === 'object' ? L(k.t) : k.t;
                return '<li><a href="' + esc(k.u) + '" target="_blank" rel="noopener">' + esc(texto) + '<span class="link-externo" aria-hidden="true">↗</span></a></li>';
            }).join('') + '</ul></section>' : '';

        var rel = (t.relacionados || []).map(topico).filter(Boolean);
        var relacionados = rel.length ? '<section class="artigo-relacionados"><h3>' + esc(T('relacionados')) + '</h3><div class="grade-topicos compacta">' +
            rel.map(cartaoTopico).join('') + '</div></section>' : '';

        var navegacao = '<nav class="artigo-nav">' +
            (ant ? '<a class="artigo-nav-ant" href="#/topico/' + esc(ant.id) + '">' + icone('setaEsquerda') + '<span><small>' + esc(T('anterior')) + '</small>' + esc(L(ant).titulo) + '</span></a>' : '<span></span>') +
            (prox ? '<a class="artigo-nav-prox" href="#/topico/' + esc(prox.id) + '"><span><small>' + esc(T('proximo')) + '</small>' + esc(L(prox).titulo) + '</span>' + icone('setaDireita') + '</a>' : '<span></span>') +
            '</nav>';

        return '<div class="artigo-layout' + (toc ? '' : ' sem-toc') + '"><article class="artigo">' +
            cabecalhoPagina(esc(l.titulo || t.id), md.inline(l.resumo || ''), [
                { texto: T('menuTopicos'), href: '#/topicos' },
                { texto: c ? L(c).nome : '', href: c ? '#/categoria/' + c.id : null }
            ]) +
            '<div class="artigo-meta">' + chipNivel(t.nivel) + chipDesde(t.desde, true) +
            '<span class="chip chip-leitura">' + icone('relogio') + esc(T('leitura')(minutosLeitura(l.conteudo))) + '</span>' +
            ((l.tags || []).slice(0, 6).map(function (g) { return '<a class="chip chip-tag" href="#/busca/' + encodeURIComponent(g) + '">' + esc(/^[#&:]/.test(g) ? g : '#' + g) + '</a>'; }).join('')) +
            '</div>' +
            '<div class="artigo-corpo">' + (corpo || '<p class="vazio">' + esc(T('emBreve')) + '</p>') + '</div>' +
            links + relacionados + navegacao +
            '</article>' + (toc ? '<aside class="artigo-lateral">' + toc + '</aside>' : '') + '</div>';
    }

    var filtroEra = 'todas';
    var versoesExpandidas = {};

    function blocoVersao(v, recenteId, completo) {
        var l = L(v);
        var recursos = l.recursos || [];
        var limite = completo || versoesExpandidas[v.id] ? recursos.length : 5;
        var era = null;
        DOC.eras.forEach(function (e) { if (e.id === v.era) era = e; });

        var meta = '<dl class="versao-meta">' +
            (v.data ? '<div><dt>' + esc(T('lancamento')) + '</dt><dd>' + esc(formatarData(v.data)) + '</dd></div>' : '') +
            (v.bd ? '<div><dt>' + esc(T('bdMinimo')) + '</dt><dd>' + esc(v.bd) + '</dd></div>' : '') +
            (v.ords ? '<div><dt>' + esc(T('ordsMinimo')) + '</dt><dd>' + esc(v.ords) + '</dd></div>' : '') +
            '</dl>';

        var lista = recursos.length ? '<h4>' + esc(T('principaisRecursos')) + '</h4><ul class="versao-recursos">' +
            recursos.slice(0, limite).map(function (r) { return '<li>' + md.inline(r) + '</li>'; }).join('') + '</ul>' +
            (!completo && recursos.length > 5 ? '<button type="button" class="link-botao" data-expandir-versao="' + esc(v.id) + '">' +
                esc(versoesExpandidas[v.id] ? T('verMenos') : T('verMais')(recursos.length - 5)) + '</button>' : '') : '';

        var desc = (l.descontinuados || []).length ? '<h4 class="versao-desc-titulo">' + icone('alerta') + esc(T('descontinuados')) + '</h4><ul class="versao-descontinuados">' +
            l.descontinuados.map(function (r) { return '<li>' + md.inline(r) + '</li>'; }).join('') + '</ul>' : '';

        var notas = completo && l.notas ? '<h4>' + esc(T('notas')) + '</h4><div class="artigo-corpo">' + md.renderizar(l.notas) + '</div>' : '';

        var links = completo && (v.links || []).length ? '<h4>' + esc(T('linksOficiais')) + '</h4><ul class="versao-links">' + v.links.map(function (k) {
            return '<li><a href="' + esc(k.u) + '" target="_blank" rel="noopener">' + esc(typeof k.t === 'object' ? L(k.t) : k.t) + '<span class="link-externo" aria-hidden="true">↗</span></a></li>';
        }).join('') + '</ul>' : '';

        return '<article class="versao' + (v.id === recenteId ? ' versao-recente' : '') + '" id="v-' + esc(v.id) + '">' +
            '<div class="versao-cabecalho"><div><span class="versao-era">' + esc(era ? L({ pt: { t: era.pt }, en: { t: era.en } }).t : '') + '</span>' +
            '<h3>' + (completo ? esc(v.nome) : '<a href="#/versao/' + esc(v.id) + '">' + esc(v.nome) + '</a>') + '</h3></div>' +
            (v.id === recenteId ? '<span class="selo">' + icone('brilho') + esc(T('maisRecente')) + '</span>' : '') + '</div>' +
            meta + (l.destaque ? '<p class="versao-destaque">' + md.inline(l.destaque) + '</p>' : '') + lista + desc + notas + links +
            (completo ? '' : '<a class="link-seta" href="#/versao/' + esc(v.id) + '">' + esc(T('verDetalhes')) + icone('setaDireita') + '</a>') +
            '</article>';
    }

    function telaVersoes() {
        var recente = versaoMaisRecente();
        var opcoes = [{ id: 'todas', texto: T('todos'), n: DOC.versoes.length }].concat(DOC.eras.map(function (e) {
            return { id: e.id, texto: (idioma === 'pt' ? e.pt : e.en) + ' · ' + e.anos, n: DOC.versoes.filter(function (v) { return v.era === e.id; }).length };
        }));
        var lista = versoesOrdenadas().reverse().filter(function (v) { return filtroEra === 'todas' || v.era === filtroEra; });
        return cabecalhoPagina(esc(T('versoesTitulo')), esc(T('versoesDesc')), [{ texto: T('menuVersoes') }]) +
            filtros('era', opcoes, filtroEra, T('filtrarEra')) +
            '<div class="linha-tempo">' + lista.map(function (v) {
                return '<div class="linha-tempo-item"><span class="linha-tempo-ano">' + esc(String(v.ano || '')) + '</span>' + blocoVersao(v, recente && recente.id) + '</div>';
            }).join('') + '</div>';
    }

    function telaVersao(id) {
        var ordenadas = versoesOrdenadas();
        var v = null, pos = -1;
        ordenadas.forEach(function (x, i) { if (x.id === id) { v = x; pos = i; } });
        if (!v) return telaNaoEncontrada();
        var recente = versaoMaisRecente();
        var ant = ordenadas[pos - 1], prox = ordenadas[pos + 1];
        var nav = '<nav class="artigo-nav">' +
            (ant ? '<a class="artigo-nav-ant" href="#/versao/' + esc(ant.id) + '">' + icone('setaEsquerda') + '<span><small>' + esc(T('versaoAnterior')) + '</small>' + esc(ant.nome) + '</span></a>' : '<span></span>') +
            (prox ? '<a class="artigo-nav-prox" href="#/versao/' + esc(prox.id) + '"><span><small>' + esc(T('versaoSeguinte')) + '</small>' + esc(prox.nome) + '</span>' + icone('setaDireita') + '</a>' : '<span></span>') +
            '</nav>';
        var surgiram = DOC.topicos.filter(function (t) { return t.desde === v.id; });
        var rel = surgiram.length ? '<section class="artigo-relacionados"><h3>' + esc(T('relacionados')) + '</h3><div class="grade-topicos compacta">' +
            surgiram.map(cartaoTopico).join('') + '</div></section>' : '';
        return '<div class="pagina-estreita">' + cabecalhoPagina(esc(v.nome), '', [{ texto: T('menuVersoes'), href: '#/versoes' }, { texto: v.id }]) +
            blocoVersao(v, recente && recente.id, true) + rel + nav + '</div>';
    }

    var filtroGlossario = '';

    function telaGlossario() {
        var termos = DOC.glossario.slice().sort(function (a, b) {
            return (L(a).termo || a.termo).localeCompare(L(b).termo || b.termo, idioma);
        });
        var letras = {};
        termos.forEach(function (g) {
            var letra = window.Busca.normalizar((L(g).termo || g.termo).charAt(0)).toUpperCase();
            if (!/[A-Z]/.test(letra)) letra = '#';
            (letras[letra] = letras[letra] || []).push(g);
        });
        var chaves = Object.keys(letras).sort();
        var indiceLetras = '<nav class="letras" aria-label="A–Z">' + chaves.map(function (k) {
            return '<a href="#/glossario" data-ancora="letra-' + k + '">' + k + '</a>';
        }).join('') + '</nav>';
        var grupos = chaves.map(function (k) {
            return '<section class="glossario-grupo" id="letra-' + k + '"><h3 class="glossario-letra">' + k + '</h3><dl>' +
                letras[k].map(function (g) {
                    var l = L(g), nome = l.termo || g.termo;
                    var alvo = g.ver && topico(g.ver) ? ' <a class="link-seta pequeno" href="#/topico/' + esc(g.ver) + '">' + esc(T('leiaMais')) + icone('setaDireita') + '</a>' : '';
                    return '<div class="termo" id="g-' + esc(idTermo(g)) + '" data-termo="' + esc(window.Busca.normalizar(nome + ' ' + (l.def || '') + ' ' + (g.aliases || []).join(' '))) + '">' +
                        '<dt>' + esc(nome) + (g.sigla ? ' <abbr>' + esc(g.sigla) + '</abbr>' : '') + '</dt><dd>' + md.inline(l.def || '') + alvo + '</dd></div>';
                }).join('') + '</dl></section>';
        }).join('');
        return cabecalhoPagina(esc(T('glossarioTitulo')), esc(T('glossarioDesc')), [{ texto: T('menuGlossario') }]) +
            '<div class="glossario-ferramentas"><input type="search" class="filtro-texto" id="filtro-glossario" placeholder="' + esc(T('filtrarTermos')) +
            '" value="' + esc(filtroGlossario) + '" aria-label="' + esc(T('filtrarTermos')) + '">' + indiceLetras + '</div>' +
            '<div class="glossario">' + grupos + '</div><p class="vazio" id="glossario-vazio" hidden>' + esc(T('nenhumTermo')) + '</p>';
    }

    var filtroTema = 'todos';

    function telaFaq(abrirId) {
        if (abrirId) {
            var alvo = DOC.faq.filter(function (f) { return f.id === abrirId; })[0];
            if (alvo && filtroTema !== 'todos' && alvo.tema !== filtroTema) filtroTema = 'todos';
        }
        var usados = DOC.temasFaq.filter(function (tm) { return DOC.faq.some(function (f) { return f.tema === tm.id; }); });
        var opcoes = [{ id: 'todos', texto: T('todos'), n: DOC.faq.length }].concat(usados.map(function (tm) {
            return { id: tm.id, texto: idioma === 'pt' ? tm.pt : tm.en, n: DOC.faq.filter(function (f) { return f.tema === tm.id; }).length };
        }));
        var grupos = usados.filter(function (tm) { return filtroTema === 'todos' || filtroTema === tm.id; }).map(function (tm) {
            var perguntas = DOC.faq.filter(function (f) { return f.tema === tm.id; });
            return '<section class="faq-grupo"><h3>' + esc(idioma === 'pt' ? tm.pt : tm.en) + '</h3>' + perguntas.map(function (f) {
                var l = L(f);
                var ver = (f.ver || []).map(topico).filter(Boolean);
                return '<details class="faq-item" id="faq-' + esc(f.id) + '"' + (f.id === abrirId ? ' open' : '') + '>' +
                    '<summary>' + esc(l.q) + '</summary><div class="faq-resposta artigo-corpo">' + md.renderizar(l.r || '') +
                    (ver.length ? '<p class="faq-ver">' + esc(T('leiaMais')) + ': ' + ver.map(function (t) {
                        return '<a href="#/topico/' + esc(t.id) + '">' + esc(L(t).titulo) + '</a>';
                    }).join(' · ') + '</p>' : '') + '</div></details>';
            }).join('') + '</section>';
        }).join('');
        return '<div class="pagina-estreita">' + cabecalhoPagina(esc(T('faqTitulo')), esc(T('faqDesc')), [{ texto: T('menuFaq') }]) +
            filtros('tema', opcoes, filtroTema, T('filtrarTema')) + grupos + '</div>';
    }

    var filtroBusca = 'todos';

    function hrefResultado(doc) {
        switch (doc.tipo) {
            case 'topico': return '#/topico/' + doc.id;
            case 'versao': return '#/versao/' + doc.id;
            case 'faq': return '#/faq/' + doc.id;
            default: return '#/glossario/' + encodeURIComponent(doc.id);
        }
    }

    function iconeTipo(doc) {
        if (doc.tipo === 'topico') { var c = categoria(doc.extra.cat); return icone(c ? c.icone : 'livro'); }
        if (doc.tipo === 'versao') return icone('relogio');
        if (doc.tipo === 'faq') return icone('ajuda');
        return icone('livroAberto');
    }

    function telaBusca(q) {
        var resultados = window.Busca.pesquisar(q, idioma);
        var contagem = { todos: resultados.length, topico: 0, versao: 0, termo: 0, faq: 0 };
        resultados.forEach(function (r) { contagem[r.doc.tipo]++; });
        if (filtroBusca !== 'todos' && !contagem[filtroBusca]) filtroBusca = 'todos';
        var visiveis = resultados.filter(function (r) { return filtroBusca === 'todos' || r.doc.tipo === filtroBusca; });
        var opcoes = ['todos', 'topico', 'versao', 'termo', 'faq'].filter(function (k) { return k === 'todos' || contagem[k]; }).map(function (k) {
            return { id: k, texto: T('tipos')[k], n: contagem[k] };
        });

        var corpo = visiveis.length ? '<ol class="resultados">' + visiveis.map(function (r) {
            var d = r.doc, sub = '';
            if (d.tipo === 'topico') { var c = categoria(d.extra.cat); sub = c ? L(c).nome : ''; }
            else sub = T('tipo1')[d.tipo];
            return '<li><a class="resultado" href="' + hrefResultado(d) + '"><span class="resultado-icone">' + iconeTipo(d) + '</span><span>' +
                '<span class="resultado-tipo">' + esc(sub) + '</span>' +
                '<strong>' + window.Busca.destacar(d.titulo, r.termos) + '</strong>' +
                '<span class="resultado-trecho">' + window.Busca.destacar(window.Busca.trecho(d, r.termos), r.termos) + '</span></span></a></li>';
        }).join('') + '</ol>' : '<div class="vazio grande">' + icone('busca') + '<p>' + esc(T('buscaVazia')) + '</p>' +
            '<div class="populares">' + BUSCAS_POPULARES[idioma].map(function (b) {
                return '<a class="chip chip-busca" href="#/busca/' + encodeURIComponent(b) + '">' + esc(b) + '</a>';
            }).join('') + '</div></div>';

        return '<div class="pagina-estreita">' + cabecalhoPagina(esc(T('buscaTitulo')(q)), esc(T('buscaN')(resultados.length)) + ' · ' + T('buscaDica'), null) +
            (resultados.length ? filtros('busca', opcoes, filtroBusca, T('tipos').todos) : '') + corpo + '</div>';
    }

    function telaNaoEncontrada() {
        return '<div class="vazio grande">' + icone('alerta') + '<h2>' + esc(T('naoEncontrado')) + '</h2><p>' + esc(T('naoEncontradoDesc')) +
            '</p><a class="botao botao-primario" href="#/">' + esc(T('voltarInicio')) + '</a></div>';
    }

    var conteudo = $('#conteudo');
    var topo = $('#topo');

    function rotaAtual() {
        var h = location.hash.replace(/^#\/?/, '');
        var partes = h.split('/');
        return { nome: partes[0] || 'inicio', param: partes.slice(1).join('/') };
    }

    function rotear() {
        var r = rotaAtual();
        var html, titulo = '', menu = r.nome, ancora = null;
        var param = r.param ? safeDecode(r.param) : '';

        switch (r.nome) {
            case 'inicio': html = telaInicio(); break;
            case 'topicos': html = telaTopicos(); titulo = T('menuTopicos'); break;
            case 'categoria': html = telaCategoria(param); titulo = categoria(param) ? L(categoria(param)).nome : ''; menu = 'topicos'; break;
            case 'topico': html = telaTopico(param); titulo = topico(param) ? L(topico(param)).titulo : ''; menu = 'topicos'; break;
            case 'versoes': html = telaVersoes(); titulo = T('menuVersoes'); break;
            case 'versao': html = telaVersao(param); titulo = param; menu = 'versoes'; break;
            case 'glossario':
                if (param) { filtroGlossario = ''; ancora = 'g-' + param; }
                html = telaGlossario(); titulo = T('menuGlossario');
                break;
            case 'faq': html = telaFaq(param); titulo = T('menuFaq'); if (param) ancora = 'faq-' + param; break;
            case 'busca':
                html = telaBusca(param); titulo = param; menu = '';
                var campo = $('#campo-busca');
                if (document.activeElement !== campo) campo.value = param;
                break;
            default: html = telaNaoEncontrada(); menu = '';
        }

        conteudo.innerHTML = html;
        document.title = (titulo ? titulo + ' · ' : '') + 'Documenta-e APEX';
        document.body.classList.toggle('pagina-inicial', r.nome === 'inicio');
        $$('.menu a').forEach(function (a) {
            var ativo = a.getAttribute('data-rota') === menu;
            a.classList.toggle('ativo', ativo);
            if (ativo) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
        });
        fecharSugestoes();

        if (r.nome === 'glossario') aplicarFiltroGlossario();

        if (ancora) {
            var el;
            el = document.getElementById(ancora);
            if (el && el.classList.contains('termo')) el.classList.add('termo-alvo');
            if (el) { setTimeout(function () { el.scrollIntoView({ block: 'center' }); }, 30); return; }
        }
        if (r.nome !== 'inicio') {
            var destino = topo.offsetHeight - 8;
            if (window.scrollY > destino) window.scrollTo(0, destino);
        } else {
            window.scrollTo(0, 0);
        }
    }

    function safeDecode(s) {
        try { return decodeURIComponent(s); } catch (e) { return s; }
    }

    var campoBusca = $('#campo-busca');
    var caixaSugestoes = $('#sugestoes');
    var selecionado = -1;
    var temporizador = null;

    function fecharSugestoes() {
        caixaSugestoes.hidden = true;
        caixaSugestoes.innerHTML = '';
        campoBusca.setAttribute('aria-expanded', 'false');
        selecionado = -1;
    }

    function mostrarSugestoes() {
        var q = campoBusca.value.trim();
        if (q.length < 2) { fecharSugestoes(); return; }
        var resultados = window.Busca.pesquisar(q, idioma);
        var top = resultados.slice(0, 8);
        if (!top.length) {
            caixaSugestoes.innerHTML = '<p class="sugestao-vazia">' + esc(T('semSugestoes')) + '</p>';
        } else {
            caixaSugestoes.innerHTML = top.map(function (r, i) {
                var d = r.doc;
                return '<a class="sugestao" role="option" id="sug-' + i + '" href="' + hrefResultado(d) + '">' +
                    '<span class="resultado-icone">' + iconeTipo(d) + '</span><span class="sugestao-texto">' +
                    '<strong>' + window.Busca.destacar(d.titulo, r.termos) + '</strong>' +
                    '<small>' + window.Busca.destacar(window.Busca.trecho(d, r.termos, 110), r.termos) + '</small></span>' +
                    '<span class="sugestao-tipo">' + esc(T('tipo1')[d.tipo]) + '</span></a>';
            }).join('') + (resultados.length > top.length ? '<a class="sugestao-todos" href="#/busca/' + encodeURIComponent(q) + '">' +
                esc(T('verTodosResultados')(resultados.length)) + icone('setaDireita') + '</a>' : '');
        }
        caixaSugestoes.hidden = false;
        campoBusca.setAttribute('aria-expanded', 'true');
        selecionado = -1;
    }

    function moverSelecao(delta) {
        var itens = $$('.sugestao, .sugestao-todos', caixaSugestoes);
        if (!itens.length) return;
        selecionado = (selecionado + delta + itens.length) % itens.length;
        itens.forEach(function (el, i) { el.classList.toggle('selecionada', i === selecionado); el.setAttribute('aria-selected', i === selecionado); });
        campoBusca.setAttribute('aria-activedescendant', itens[selecionado].id || '');
        itens[selecionado].scrollIntoView({ block: 'nearest' });
    }

    campoBusca.addEventListener('input', function () {
        clearTimeout(temporizador);
        temporizador = setTimeout(mostrarSugestoes, 90);
    });
    campoBusca.addEventListener('focus', function () { if (campoBusca.value.trim().length >= 2) mostrarSugestoes(); });
    campoBusca.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); if (caixaSugestoes.hidden) mostrarSugestoes(); moverSelecao(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); moverSelecao(-1); }
        else if (e.key === 'Escape') { fecharSugestoes(); }
    });
    $('#form-busca').addEventListener('submit', function (e) {
        e.preventDefault();
        var itens = $$('.sugestao, .sugestao-todos', caixaSugestoes);
        if (selecionado >= 0 && itens[selecionado]) { location.hash = itens[selecionado].getAttribute('href'); campoBusca.blur(); return; }
        var q = campoBusca.value.trim();
        if (q) { filtroBusca = 'todos'; location.hash = '#/busca/' + encodeURIComponent(q); campoBusca.blur(); }
    });
    caixaSugestoes.addEventListener('mousedown', function (e) { e.preventDefault(); });
    caixaSugestoes.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (a) { fecharSugestoes(); campoBusca.blur(); }
    });
    document.addEventListener('click', function (e) {
        if (!e.target.closest('#form-busca')) fecharSugestoes();
    });

    document.addEventListener('keydown', function (e) {
        var editando = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;
        if ((e.key === '/' && !editando) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            campoBusca.focus();
            campoBusca.select();
        }
    });

    conteudo.addEventListener('click', function (e) {
        var alvo;

        if ((alvo = e.target.closest('[data-ancora]'))) {
            e.preventDefault();
            var el = document.getElementById(alvo.getAttribute('data-ancora'));
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        if ((alvo = e.target.closest('[data-filtro]'))) {
            var nome = alvo.getAttribute('data-filtro'), valor = alvo.getAttribute('data-valor');
            if (nome === 'nivel') filtroNivel = valor;
            if (nome === 'era') filtroEra = valor;
            if (nome === 'tema') filtroTema = valor;
            if (nome === 'busca') filtroBusca = valor;
            var y = window.scrollY;
            rotear();
            window.scrollTo(0, y);
            return;
        }

        if ((alvo = e.target.closest('[data-expandir-versao]'))) {
            var id = alvo.getAttribute('data-expandir-versao');
            versoesExpandidas[id] = !versoesExpandidas[id];
            var yy = window.scrollY;
            rotear();
            window.scrollTo(0, yy);
            return;
        }

        if ((alvo = e.target.closest('[data-copiar]'))) {
            var codigo = alvo.closest('.codigo').querySelector('code').innerText;
            var feito = function () {
                alvo.textContent = T('copiado');
                alvo.classList.add('ok');
                setTimeout(function () { alvo.textContent = T('copiar'); alvo.classList.remove('ok'); }, 1600);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(codigo).then(feito, function () { copiarFallback(codigo); feito(); });
            } else { copiarFallback(codigo); feito(); }
        }
    });

    function copiarFallback(texto) {
        var area = document.createElement('textarea');
        area.value = texto;
        area.style.position = 'fixed'; area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try { document.execCommand('copy'); } catch (e) { }
        document.body.removeChild(area);
    }

    function aplicarFiltroGlossario() {
        var q = window.Busca.normalizar(filtroGlossario.trim());
        var algum = false;
        $$('.glossario-grupo').forEach(function (grupo) {
            var visivel = 0;
            $$('.termo', grupo).forEach(function (t) {
                var ok = !q || t.getAttribute('data-termo').indexOf(q) >= 0;
                t.hidden = !ok;
                if (ok) visivel++;
            });
            grupo.hidden = !visivel;
            if (visivel) algum = true;
        });
        var vazio = $('#glossario-vazio');
        if (vazio) vazio.hidden = algum;
    }
    conteudo.addEventListener('input', function (e) {
        if (e.target.id === 'filtro-glossario') { filtroGlossario = e.target.value; aplicarFiltroGlossario(); }
    });

    var acoes = $('.navbar-acoes');
    acoes.innerHTML =
        '<div class="alternador" role="group" id="grupo-idioma">' +
        '<span class="alternador-icone" aria-hidden="true">' + icone('idiomas') + '</span>' +
        '<button type="button" data-idioma="pt" lang="pt-BR">PT</button>' +
        '<button type="button" data-idioma="en" lang="en">EN</button>' +
        '</div>' +
        '<button type="button" class="alternador-tema" id="alternar-tema" role="switch">' +
        '<span class="tema-opcao tema-sol">' + icone('sol') + '</span>' +
        '<span class="tema-opcao tema-lua">' + icone('lua') + '</span>' +
        '<span class="tema-bolinha" aria-hidden="true"></span>' +
        '</button>';

    function atualizarControles() {
        var escuro = temaAtual() === 'escuro';
        var botaoTema = $('#alternar-tema');
        botaoTema.setAttribute('aria-checked', String(escuro));
        botaoTema.setAttribute('aria-label', escuro ? T('temaClaro') : T('temaEscuro'));
        botaoTema.title = escuro ? T('temaClaro') : T('temaEscuro');
        $('.tema-sol', botaoTema).title = T('temaClaro');
        $('.tema-lua', botaoTema).title = T('temaEscuro');
        $('#grupo-idioma').setAttribute('aria-label', T('idioma'));
        $$('[data-idioma]').forEach(function (b) {
            var ativo = b.getAttribute('data-idioma') === idioma;
            b.classList.toggle('ativo', ativo);
            b.setAttribute('aria-pressed', String(ativo));
            b.title = b.getAttribute('data-idioma') === 'pt' ? 'Português' : 'English';
        });
        var meta = $('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', escuro ? '#07071f' : '#0d0d48');
    }

    $('#alternar-tema').addEventListener('click', function () {
        aplicarTema(temaAtual() === 'escuro' ? 'claro' : 'escuro', true);
    });
    $('#grupo-idioma').addEventListener('click', function (e) {
        var b = e.target.closest('[data-idioma]');
        if (b) aplicarIdioma(b.getAttribute('data-idioma'));
    });
    if (window.matchMedia) {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        var aoMudar = function () { if (!lerPreferencia('documentae-tema')) atualizarControles(); };
        if (mq.addEventListener) mq.addEventListener('change', aoMudar); else if (mq.addListener) mq.addListener(aoMudar);
    }

    function traduzirInterface() {
        document.documentElement.lang = idioma === 'pt' ? 'pt-br' : 'en';
        $('.subtitulo').textContent = T('subtitulo');
        campoBusca.placeholder = T('placeholder');
        campoBusca.setAttribute('aria-label', T('rotuloBusca'));
        var mapa = { inicio: 'menuInicio', topicos: 'menuTopicos', versoes: 'menuVersoes', glossario: 'menuGlossario', faq: 'menuFaq' };
        $$('.menu a').forEach(function (a) { a.textContent = T(mapa[a.getAttribute('data-rota')]); });
        $('.rodape p').innerHTML = '<strong>Documenta-e APEX</strong> &middot; ' + esc(T('rodape'));
        $('.rodape-nota').innerHTML = T('rodapeNota');
        $('.rodape-autor').innerHTML = esc(T('desenvolvidoPor')) + ' <strong>Gustavo Borges</strong>';
        $('#voltar-topo').setAttribute('aria-label', T('voltarTopo'));
        $('#voltar-topo').title = T('voltarTopo');
        atualizarControles();
    }

    var botaoTopo = $('#voltar-topo');
    window.addEventListener('scroll', function () {
        botaoTopo.hidden = window.scrollY < 600;
    }, { passive: true });
    botaoTopo.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.addEventListener('hashchange', rotear);
    traduzirInterface();
    rotear();
})();
