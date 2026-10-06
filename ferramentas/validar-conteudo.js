'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => s.startsWith('js/dados/') || s === 'js/markdown.js');

const contexto = { console };
contexto.window = contexto;
vm.createContext(contexto);

let erros = 0, avisos = 0;
const erro = (m) => { erros++; console.log('ERRO  ' + m); };
const aviso = (m) => { avisos++; console.log('aviso ' + m); };

for (const s of scripts) {
    const codigo = fs.readFileSync(path.join(raiz, s), 'utf8');
    try { vm.runInContext(codigo, contexto, { filename: s }); }
    catch (e) { erro(s + ': ' + e.message); }
}

const DOC = contexto.DOC, md = contexto.Markdown;
if (!DOC) { console.log('DOC não carregado'); process.exit(1); }

const cats = new Set(DOC.categorias.map(c => c.id));
const ids = new Set();
for (const t of DOC.topicos) {
    if (ids.has(t.id)) erro('tópico duplicado: ' + t.id);
    ids.add(t.id);
    if (!cats.has(t.cat)) erro(t.id + ': categoria inexistente ' + t.cat);
    if (!['basico', 'intermediario', 'avancado'].includes(t.nivel)) erro(t.id + ': nivel inválido ' + t.nivel);
    for (const l of ['pt', 'en']) {
        const x = t[l];
        if (!x) { erro(t.id + ': sem idioma ' + l); continue; }
        for (const c of ['titulo', 'resumo', 'conteudo']) if (!x[c]) erro(t.id + '.' + l + ': falta ' + c);
        if (!Array.isArray(x.tags)) aviso(t.id + '.' + l + ': sem tags');
        try {
            const h = md.renderizar(x.conteudo || '');
            if (/undefined|\[object Object\]/.test(h)) aviso(t.id + '.' + l + ': "undefined" no HTML');
            const blocos = (x.conteudo.match(/^\s*~~~/gm) || []).length;
            if (blocos % 2) erro(t.id + '.' + l + ': bloco de código ~~~ sem fechamento');
            const abre = (x.conteudo.match(/^\s*:::\s*(dica|atencao|info|novo)/gm) || []).length;
            const fecha = (x.conteudo.match(/^\s*:::\s*$/gm) || []).length;
            if (abre !== fecha) erro(t.id + '.' + l + ': destaques ::: desbalanceados (' + abre + '/' + fecha + ')');
        } catch (e) { erro(t.id + '.' + l + ': markdown falhou: ' + e.message); }
    }
    for (const k of t.links || []) if (!/^https?:\/\//.test(k.u)) erro(t.id + ': link inválido ' + k.u);
}
for (const t of DOC.topicos) for (const r of t.relacionados || []) if (!ids.has(r)) aviso(t.id + ': relacionado inexistente "' + r + '"');

const vids = new Set();
for (const v of DOC.versoes) {
    if (vids.has(v.id)) erro('versão duplicada: ' + v.id);
    vids.add(v.id);
    if (!DOC.eras.some(e => e.id === v.era)) erro('versão ' + v.id + ': era inválida ' + v.era);
    for (const l of ['pt', 'en']) if (!v[l] || !v[l].destaque || !(v[l].recursos || []).length) erro('versão ' + v.id + '.' + l + ': incompleta');
}
for (const t of DOC.topicos) if (t.desde && !vids.has(t.desde) && DOC.versoes.length) aviso(t.id + ': desde "' + t.desde + '" não é uma versão cadastrada');

const gids = new Set();
for (const g of DOC.glossario) {
    const id = g.id || md.slug(g.termo || (g.pt && g.pt.termo) || '');
    if (gids.has(id)) erro('termo duplicado: ' + id);
    gids.add(id);
    for (const l of ['pt', 'en']) if (!g[l] || !g[l].def) erro('termo ' + id + '.' + l + ': sem definição');
    if (g.ver && !ids.has(g.ver)) aviso('termo ' + id + ': ver inexistente "' + g.ver + '"');
}

const fids = new Set();
const temas = new Set(DOC.temasFaq.map(t => t.id));
for (const f of DOC.faq) {
    if (fids.has(f.id)) erro('pergunta duplicada: ' + f.id);
    fids.add(f.id);
    if (!temas.has(f.tema)) erro('pergunta ' + f.id + ': tema inválido ' + f.tema);
    for (const l of ['pt', 'en']) {
        if (!f[l] || !f[l].q || !f[l].r) { erro('pergunta ' + f.id + '.' + l + ': incompleta'); continue; }
        try { md.renderizar(f[l].r); } catch (e) { erro('pergunta ' + f.id + ': markdown falhou'); }
    }
    for (const r of f.ver || []) if (!ids.has(r)) aviso('pergunta ' + f.id + ': ver inexistente "' + r + '"');
}

const porCat = {};
for (const t of DOC.topicos) porCat[t.cat] = (porCat[t.cat] || 0) + 1;
console.log('\nTópicos: ' + DOC.topicos.length + ' | Versões: ' + DOC.versoes.length + ' | Glossário: ' + DOC.glossario.length + ' | FAQ: ' + DOC.faq.length);
console.log('Por categoria: ' + DOC.categorias.map(c => c.id + '=' + (porCat[c.id] || 0)).join(', '));
console.log(erros + ' erro(s), ' + avisos + ' aviso(s)');
process.exit(erros ? 1 : 0);
