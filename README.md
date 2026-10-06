# Documentae
Aplicação de Documentações — **Documenta-e APEX**

Base de conhecimento bilíngue (português / inglês) sobre **Oracle APEX**, das origens (Flows / HTML DB, 1999–2004)
até a versão mais recente (**APEX 26.1**, maio de 2026). Feita para quem quer tirar dúvidas, pesquisar e aprender.

## O que tem
- **Tópicos** organizados em 16 categorias: fundamentos, instalação, App Builder, regiões e relatórios, itens e formulários,
  Dynamic Actions e JavaScript, PL/SQL e APIs, segurança, REST, interface e PWA, IA generativa, workflow, DevOps,
  globalização, performance e boas práticas.
- **Linha do tempo de versões**: todas as versões, com data, banco mínimo, ORDS, novidades e o que foi descontinuado.
- **Glossário** com os termos e siglas do universo APEX.
- **Perguntas frequentes**: as dúvidas que mais aparecem em fóruns e comunidades, com respostas práticas.
- **Busca** instantânea (ignora acentos, entende sinônimos como IG, IR, DA, LOV), atalho <kbd>/</kbd> ou <kbd>Ctrl</kbd>+<kbd>K</kbd>.
- Botões de **modo claro/escuro** (sol/lua) e de **idioma PT/EN**; as escolhas ficam salvas no navegador.

## Como usar
É um site estático (HTML + CSS + JavaScript puro, sem dependências). Basta abrir o `index.html` no navegador.

Para servir localmente (opcional):

```bash
python -m http.server 8080
```

e acessar `http://localhost:8080`. Também funciona publicado no GitHub Pages.

## Estrutura
```
index.html              página única (cabeçalho com título e busca centralizados)
style.css               estilos (azul-marinho original + fundo creme e acento âmbar; tema escuro)
js/markdown.js          renderizador de markdown simplificado + realce de sintaxe
js/busca.js             motor de busca no cliente
js/app.js               rotas (#/...), telas, tema e idioma
js/dados/base.js        categorias, eras, temas da FAQ e sinônimos da busca
js/dados/versoes.js     linha do tempo de versões
js/dados/topicos-*.js   artigos, um arquivo por categoria
js/dados/glossario.js   glossário
js/dados/faq.js         perguntas frequentes
ferramentas/validar-conteudo.js   validação do conteúdo (ids, links, markdown, pt/en)
```

## Como adicionar ou editar conteúdo
1. Abra o arquivo da categoria em `js/dados/` e copie um bloco `DOC.topico({...})` existente.
2. Preencha `id` (único), `cat`, `nivel`, `desde` (opcional), `links`, `relacionados` e os textos em `pt` e `en`.
3. O texto usa um markdown simplificado (veja o comentário no topo de `js/dados/base.js`):
   código inline com «aspas angulares», blocos com `~~~sql ... ~~~` e destaques com `:::dica ... :::`.
4. Rode a validação:

```bash
node ferramentas/validar-conteudo.js
```

> Conteúdo comunitário, não oficial. Oracle, Oracle APEX e marcas relacionadas pertencem à Oracle Corporation.
> Para detalhes definitivos, consulte a [documentação oficial](https://docs.oracle.com/en/database/oracle/apex/).
