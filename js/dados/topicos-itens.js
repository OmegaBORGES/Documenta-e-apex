DOC.topico({
    id: 'itens-de-pagina',
    cat: 'itens',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — About Item Types', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-item-types.html' },
        { t: 'App Builder Guide — Managing Session State Values', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-session-state-values.html' },
        { t: 'APEX_SESSION_STATE (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_SESSION_STATE.html' }
    ],
    relacionados: ['sessao-e-session-state', 'listas-de-valores', 'formularios', 'upload-download-arquivos', 'javascript-api'],
    pt: {
        titulo: 'Tipos de item de página',
        resumo: 'Os tipos de item do APEX, quando usar cada um, os atributos que mais importam e como ler e gravar valores em PL/SQL e JavaScript.',
        tags: ['item', 'page item', 'Text Field', 'Select One', 'Switch', 'getValue', 'setValue', 'session state', 'BOOLEAN', 'Quick Picks', 'Value Protected'],
        conteudo: `
            Um **item de página** é um campo da tela — texto, lista, data, checkbox, upload — cujo valor vive no
            **session state**. Por convenção o nome segue o padrão «P<página>_<NOME>» (ex.: «P10_CLIENTE_ID»), e é por esse
            nome que você o referencia em SQL, PL/SQL, JavaScript e substituições.

            ## Tipos de item e quando usar
            | Grupo | Tipos | Quando usar |
            |---|---|---|
            | Texto | Text Field, Textarea, Password | Entrada livre. Password nunca exibe o valor digitado. |
            | Texto formatado | Rich Text Editor, Markdown Editor | Conteúdo com formatação (HTML ou Markdown). |
            | Números e datas | Number Field, Date Picker, Star Rating, Percent Graph | Number Field aplica máscara e valida mínimo/máximo; Date Picker é o seletor nativo atual. |
            | Listas (LOV) | Select List, Select One, Select Many, Combobox, Popup LOV, Radio Group, Checkbox Group, Shuttle, List Manager, Text Field with Autocomplete | Escolha a partir de uma lista de valores — veja [Listas de valores](#/topico/listas-de-valores). |
            | Sim/Não | Checkbox, Switch | Valor binário (marcado/desmarcado, ligado/desligado). |
            | Arquivos | File Upload, Image Upload | Envio de arquivos; Image Upload recorta e redimensiona imagens. |
            | Exibição | Display Only, Display Image, Display Map, QR Code | Mostrar valores sem permitir edição. |
            | Especiais | Hidden, Color Picker, Geocoded Address | Hidden guarda valores técnicos (IDs) sem exibi-los. |

            :::info Linha do tempo dos itens
            O Checkbox simples (e o antigo Checkbox renomeado para Checkbox Group) chegou no 20.2; **Combobox**, **Image Upload**
            e **QR Code** no 23.2; **Select One** e **Select Many** no 24.1. O Date Picker nativo chegou no 22.2 e o antigo
            *Date Picker (jQuery)* foi descontinuado. O Rich Text Editor hoje usa a Oracle Rich Text Library (as versões com
            CKEditor e TinyMCE foram descontinuadas), e o item Password ganhou o botão mostrar/ocultar senha no 24.2.
            :::

            ## Atributos que mais importam
            - **Source** (Type + Used): de onde vem o valor ao renderizar — Static Value, Item, SQL Query, Expression,
              Function Body, Preference ou a coluna de uma Form region. *Used* decide se a origem só vale quando o session state
              está vazio (*Only when current value in session state is null*) ou sempre (*Always, replacing any existing value*).
            - **Default**: valor inicial quando nada veio da origem nem do session state (Static, Item, SQL Query, PL/SQL
              Expression, PL/SQL Function Body, Sequence).
            - **Session State → Data Type**: VARCHAR2 (padrão), CLOB para textos grandes (atributo surgiu no 22.2) e BOOLEAN no 26.1.
            - **Session State → Storage**: *Per Request (Memory Only)*, *Per Session (Persistent)* ou *Per User (Persistent)*.
            - **Security → Value Protected** (ligado por padrão em itens Hidden): impede que o valor seja alterado no navegador.
            - **Validation → Value Required**: validação NOT NULL automática (no cliente e no servidor).
            - **Read Only** e **Server-side Condition**: deixam o item somente leitura ou nem o renderizam.
            - **Quick Picks**: links de um clique abaixo do item com valores frequentes.

            ## Lendo e gravando valores
            | Operação | PL/SQL / SQL | JavaScript |
            |---|---|---|
            | Ler | «:P10_X» (bind), «V('P10_X')», «APEX_SESSION_STATE.GET_VARCHAR2('P10_X')» | «apex.item('P10_X').getValue()», «apex.items.P10_X.getValue()», «$v('P10_X')» |
            | Ler número | «APEX_SESSION_STATE.GET_NUMBER('P10_X')» (usa a máscara do item) | «apex.items.P10_X.getNativeValue()» em Number Field |
            | Gravar | «:P10_X := 'A';» em processos, «APEX_SESSION_STATE.SET_VALUE», «APEX_UTIL.SET_SESSION_STATE» | «apex.item('P10_X').setValue('A')», «$s('P10_X','A')» |

            ~~~plsql Processo de página (Execute Code)
            declare
                l_valor  number := apex_session_state.get_number('P10_VALOR');
                l_limite number := apex_session_state.get_number('P10_LIMITE');
            begin
                if l_valor > l_limite then
                    :P10_STATUS := 'ANALISE';             -- grava no session state
                end if;

                -- fora de um contexto com binds (pacotes, jobs com APEX_SESSION):
                apex_session_state.set_value(
                    p_item  => 'P10_OBS',
                    p_value => 'Valor acima de ' || l_limite );
            end;
            ~~~

            ~~~js
            var cliente = apex.item('P10_CLIENTE_ID').getValue();   // sempre string
            var tags    = apex.item('P10_TAGS').getValue();         // array em itens multivalorados

            // setValue dispara o evento change (cascatas e Dynamic Actions reagem)
            apex.item('P10_STATUS').setValue('ANALISE');

            // Popup LOV: valor de retorno + valor exibido, sem disparar change
            apex.item('P10_CLIENTE_ID').setValue('42', 'ACME Ltda', true);

            if (apex.item('P10_OBS').isEmpty()) {
                apex.item('P10_OBS').setFocus();
            }
            apex.item('P10_DESCONTO').hide();
            ~~~

            :::atencao setValue não grava no servidor
            «setValue» altera apenas o navegador. Para que um processo ou consulta enxergue o novo valor: faça submit da página,
            inclua o item em **Items to Submit** (Dynamic Action, refresh de região, LOV em cascata) ou envie-o em «pageItems»
            no «apex.server.process».
            :::

            ## Itens BOOLEAN
            :::novo Session State Data Type = BOOLEAN (26.1)
            No APEX 26.1 com **Oracle AI Database 26ai**, os itens **Checkbox**, **Switch** e **Hidden** podem usar o tipo
            BOOLEAN. O bind «:P10_ATIVO» passa a ser um BOOLEAN de verdade em PL/SQL e «getValue()» devolve «true»/«false» no
            JavaScript. Restrições: itens de aplicação continuam só VARCHAR2, o processo *Invoke API* ainda não aceita BOOLEAN e a
            ação *Set Value* com PL/SQL não consegue atribuí-lo (use *Execute Server-side Code* com Items to Return).
            :::

            ~~~plsql
            -- P10_ATIVO: Switch com Data Type = BOOLEAN (26.1 + 26ai)
            begin
                if :P10_ATIVO then
                    update clientes set ativo = :P10_ATIVO where id = :P10_ID;
                end if;
            end;
            ~~~

            :::dica Itens de página x itens de aplicação
            Itens de **aplicação** (Shared Components → Application Items) não pertencem a nenhuma página e servem para valores
            globais da sessão, como a filial do usuário. Para campos de tela, use sempre itens de página com o prefixo «P<n>_».
            :::
        `
    },
    en: {
        titulo: 'Page item types',
        resumo: 'APEX item types, when to use each one, the attributes that matter most and how to read and write values in PL/SQL and JavaScript.',
        tags: ['item', 'page item', 'Text Field', 'Select One', 'Switch', 'getValue', 'setValue', 'session state', 'BOOLEAN', 'Quick Picks', 'Value Protected'],
        conteudo: `
            A **page item** is a field on the screen — text, list, date, checkbox, upload — whose value lives in **session
            state**. By convention its name follows the «P<page>_<NAME>» pattern (e.g. «P10_CUSTOMER_ID»), and that name is how
            you reference it from SQL, PL/SQL, JavaScript and substitutions.

            ## Item types and when to use them
            | Group | Types | When to use |
            |---|---|---|
            | Text | Text Field, Textarea, Password | Free input. Password never displays the typed value. |
            | Formatted text | Rich Text Editor, Markdown Editor | Formatted content (HTML or Markdown). |
            | Numbers and dates | Number Field, Date Picker, Star Rating, Percent Graph | Number Field applies a format mask and validates min/max; Date Picker is the current native picker. |
            | Lists (LOV) | Select List, Select One, Select Many, Combobox, Popup LOV, Radio Group, Checkbox Group, Shuttle, List Manager, Text Field with Autocomplete | Pick from a list of values — see [Lists of values](#/topico/listas-de-valores). |
            | Yes/No | Checkbox, Switch | Binary value (checked/unchecked, on/off). |
            | Files | File Upload, Image Upload | File uploads; Image Upload crops and resizes images. |
            | Display | Display Only, Display Image, Display Map, QR Code | Show values without editing. |
            | Special | Hidden, Color Picker, Geocoded Address | Hidden keeps technical values (IDs) without showing them. |

            :::info Item timeline
            The single Checkbox (with the old Checkbox renamed to Checkbox Group) arrived in 20.2; **Combobox**, **Image Upload**
            and **QR Code** in 23.2; **Select One** and **Select Many** in 24.1. The native Date Picker arrived in 22.2 and the old
            *Date Picker (jQuery)* is desupported. The Rich Text Editor now uses the Oracle Rich Text Library (the CKEditor and
            TinyMCE based versions are desupported), and the Password item gained a show/hide password toggle in 24.2.
            :::

            ## Attributes that matter most
            - **Source** (Type + Used): where the value comes from at render time — Static Value, Item, SQL Query, Expression,
              Function Body, Preference or a Form region column. *Used* decides whether the source applies only when session
              state is empty (*Only when current value in session state is null*) or always (*Always, replacing any existing value*).
            - **Default**: initial value when nothing came from the source or session state (Static, Item, SQL Query, PL/SQL
              Expression, PL/SQL Function Body, Sequence).
            - **Session State → Data Type**: VARCHAR2 (default), CLOB for large text (attribute added in 22.2) and BOOLEAN in 26.1.
            - **Session State → Storage**: *Per Request (Memory Only)*, *Per Session (Persistent)* or *Per User (Persistent)*.
            - **Security → Value Protected** (on by default for Hidden items): prevents the value from being changed in the browser.
            - **Validation → Value Required**: automatic NOT NULL check (client and server side).
            - **Read Only** and **Server-side Condition**: make the item read-only or skip rendering it.
            - **Quick Picks**: one-click links below the item with frequent values.

            ## Reading and writing values
            | Operation | PL/SQL / SQL | JavaScript |
            |---|---|---|
            | Read | «:P10_X» (bind), «V('P10_X')», «APEX_SESSION_STATE.GET_VARCHAR2('P10_X')» | «apex.item('P10_X').getValue()», «apex.items.P10_X.getValue()», «$v('P10_X')» |
            | Read a number | «APEX_SESSION_STATE.GET_NUMBER('P10_X')» (uses the item format mask) | «apex.items.P10_X.getNativeValue()» on a Number Field |
            | Write | «:P10_X := 'A';» in processes, «APEX_SESSION_STATE.SET_VALUE», «APEX_UTIL.SET_SESSION_STATE» | «apex.item('P10_X').setValue('A')», «$s('P10_X','A')» |

            ~~~plsql Page process (Execute Code)
            declare
                l_amount number := apex_session_state.get_number('P10_AMOUNT');
                l_limit  number := apex_session_state.get_number('P10_LIMIT');
            begin
                if l_amount > l_limit then
                    :P10_STATUS := 'REVIEW';              -- writes to session state
                end if;

                -- outside a bind context (packages, jobs with APEX_SESSION):
                apex_session_state.set_value(
                    p_item  => 'P10_NOTE',
                    p_value => 'Amount above ' || l_limit );
            end;
            ~~~

            ~~~js
            var customer = apex.item('P10_CUSTOMER_ID').getValue(); // always a string
            var tags     = apex.item('P10_TAGS').getValue();        // array for multi-value items

            // setValue fires the change event (cascades and Dynamic Actions react)
            apex.item('P10_STATUS').setValue('REVIEW');

            // Popup LOV: return value + display value, without firing change
            apex.item('P10_CUSTOMER_ID').setValue('42', 'ACME Inc.', true);

            if (apex.item('P10_NOTE').isEmpty()) {
                apex.item('P10_NOTE').setFocus();
            }
            apex.item('P10_DISCOUNT').hide();
            ~~~

            :::atencao setValue does not write to the server
            «setValue» only changes the browser. For a process or query to see the new value: submit the page, add the item to
            **Items to Submit** (Dynamic Action, region refresh, cascading LOV) or send it in «pageItems» with
            «apex.server.process».
            :::

            ## BOOLEAN items
            :::novo Session State Data Type = BOOLEAN (26.1)
            In APEX 26.1 on **Oracle AI Database 26ai**, **Checkbox**, **Switch** and **Hidden** items can use the BOOLEAN data
            type. The bind «:P10_ACTIVE» becomes a real PL/SQL BOOLEAN and «getValue()» returns «true»/«false» in JavaScript.
            Restrictions: application items remain VARCHAR2 only, the *Invoke API* process does not support BOOLEAN yet and the
            *Set Value* action with PL/SQL cannot assign it (use *Execute Server-side Code* with Items to Return).
            :::

            ~~~plsql
            -- P10_ACTIVE: Switch with Data Type = BOOLEAN (26.1 + 26ai)
            begin
                if :P10_ACTIVE then
                    update customers set active = :P10_ACTIVE where id = :P10_ID;
                end if;
            end;
            ~~~

            :::dica Page items vs application items
            **Application** items (Shared Components → Application Items) belong to no page and hold session-wide values, such
            as the user's branch. For screen fields always use page items with the «P<n>_» prefix.
            :::
        `
    }
});

DOC.topico({
    id: 'listas-de-valores',
    cat: 'itens',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — About Lists of Values', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-lists-of-values.html' },
        { t: 'App Builder Guide — Creating a Cascading List of Values', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-cascading-list-of-values.html' },
        { t: 'App Builder Guide — About Item Types', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-item-types.html' }
    ],
    relacionados: ['itens-de-pagina', 'formularios', 'faceted-search-e-smart-filters', 'otimizacao-performance', 'ajax-callbacks'],
    pt: {
        titulo: 'Listas de valores (LOVs)',
        resumo: 'LOVs compartilhadas e locais, Select One/Many, Combobox e Popup LOV, listas em cascata com Parent Items, valores múltiplos e dicas de performance.',
        tags: ['LOV', 'list of values', 'Popup LOV', 'Select One', 'Select Many', 'Combobox', 'cascata', 'cascading LOV', 'Parent Items', 'Items to Submit', 'infinite scroll'],
        conteudo: `
            Uma **lista de valores (LOV)** define pares **valor exibido / valor de retorno**: o usuário vê "ACME Ltda" e o banco
            grava «42». LOVs alimentam itens de seleção, colunas de relatórios e da Interactive Grid, facets e Smart Filters.

            ## Compartilhada ou local?
            - **Shared LOV** (Shared Components → List of Values): reutilizável, com **colunas adicionais de exibição** e mapeamento
              declarativo de colunas (ampliados no 19.2). Fontes: valores estáticos, tabela/view, SQL, função que retorna SQL ou
              REST Data Source. Use sempre que a mesma lista aparecer em mais de um lugar.
            - **Local**: definida no próprio item (consulta SQL ou valores estáticos). Prática para listas de uso único.

            ~~~sql
            -- LOV dinâmica: 1ª coluna = exibição, 2ª = retorno (use aliases)
            select nome as d,
                   id   as r
              from clientes
             where ativo = 'S'
             order by nome
            ~~~

            ## Qual item usar?
            | Item | Desde | Quando usar |
            |---|---|---|
            | Select List | — | Listas pequenas; seleção nativa do navegador. |
            | Select One | 24.1 | Sucessor moderno do Select List: busca, ícones, grupos e HTML com Template Directives; só aceita valores da lista. |
            | Select Many | 24.1 | Seleção múltipla com chips e busca. |
            | Combobox | 23.2 | Lista com busca que **também aceita texto livre** (o *Manual Entries Item* guarda o que não existe na LOV). |
            | Popup LOV | reformulado no 19.2 | Listas grandes: diálogo com busca, várias colunas e Fetch on Search. |
            | Radio Group / Checkbox Group | — | Poucas opções, todas visíveis. |
            | Shuttle | — | Mover valores entre duas listas. |
            | Text Field with Autocomplete | — | Sugestões enquanto digita; o valor final é texto. |

            ## LOV em cascata (Parent Items)
            Exemplo: «P10_CIDADE» depende de «P10_UF». A consulta do filho usa o pai como bind:

            ~~~sql
            select nome as d,
                   id   as r
              from cidades
             where uf = :P10_UF
             order by nome
            ~~~

            No item filho, grupo **Cascading List of Values**:
            1. **Parent Item(s)**: «P10_UF» — quando o pai muda, o filho é limpo e recarregado via AJAX (o valor do pai é enviado).
            2. **Items to Submit**: outros itens usados na consulta além dos pais (ex.: «P10_TIPO»).
            3. **Optimize Refresh**: se os pais estiverem vazios, limpa o filho sem ida ao servidor.

            :::dica Recarregando por código
            Para forçar a recarga a partir de JavaScript, use «apex.item('P10_CIDADE').refresh()». Os eventos
            **Before Refresh** / **After Refresh** do item permitem reagir ao recarregamento (ex.: selecionar o primeiro valor).
            :::

            ## Valores múltiplos
            Select Many, Checkbox Group, Shuttle, Popup LOV, Combobox e Select List podem guardar vários valores. Desde o 24.1, o
            atributo **Multiple Values → Type** aceita **lista delimitada** (separador configurável; tradicionalmente «:») ou
            **JSON Array**. No JavaScript, «getValue()» devolve um array. No SQL:

            ~~~sql
            -- valores separados por ':'
            select *
              from produtos
             where id in (select column_value
                            from table(apex_string.split(:P10_PRODUTOS, ':')));
            ~~~

            ## Performance em listas grandes
            - Ative **Fetch on Search** e defina **Minimum Characters** (a busca só vai ao banco depois de N letras).
            - **Match Type = Starts With** permite uso de índices; *Contains* não.
            - **Maximum Values in List** limita o retorno (padrão de 250 quando vazio).
            - Indexe as colunas filtradas pela cascata e evite funções na cláusula WHERE da LOV.

            :::novo Novidades do 26.1
            - **Infinite scroll** em Select One, Select Many, Combobox e Text Field with Autocomplete: ao rolar, mais linhas são
              buscadas, sem o limite de *Maximum Values in List*.
            - **Quick Picks** mais flexíveis: valores estáticos, dinâmicos (a partir da LOV) ou por consulta SQL.
            - **Template Component Partials** (ex.: «{apply THEME$AVATAR/}») nas expressões HTML de Combobox, Select One e Select Many.
            :::
        `
    },
    en: {
        titulo: 'Lists of values (LOVs)',
        resumo: 'Shared and local LOVs, Select One/Many, Combobox and Popup LOV, cascading lists with Parent Items, multiple values and performance tips.',
        tags: ['LOV', 'list of values', 'Popup LOV', 'Select One', 'Select Many', 'Combobox', 'cascading LOV', 'Parent Items', 'Items to Submit', 'infinite scroll'],
        conteudo: `
            A **list of values (LOV)** defines **display value / return value** pairs: the user sees "ACME Inc." and the
            database stores «42». LOVs feed selection items, report and Interactive Grid columns, facets and Smart Filters.

            ## Shared or local?
            - **Shared LOV** (Shared Components → List of Values): reusable, with **additional display columns** and declarative
              column mapping (expanded in 19.2). Sources: static values, table/view, SQL, function returning SQL or a REST Data
              Source. Use it whenever the same list appears in more than one place.
            - **Local**: defined on the item itself (SQL query or static values). Handy for one-off lists.

            ~~~sql
            -- Dynamic LOV: 1st column = display, 2nd = return (use aliases)
            select name as d,
                   id   as r
              from customers
             where active = 'Y'
             order by name
            ~~~

            ## Which item should I use?
            | Item | Since | When to use |
            |---|---|---|
            | Select List | — | Small lists; native browser select. |
            | Select One | 24.1 | Modern successor of Select List: search, icons, groups and HTML with Template Directives; accepts list values only. |
            | Select Many | 24.1 | Multi-select with chips and search. |
            | Combobox | 23.2 | Searchable list that **also accepts free text** (the *Manual Entries Item* keeps values not found in the LOV). |
            | Popup LOV | reimagined in 19.2 | Large lists: search dialog, multiple columns and Fetch on Search. |
            | Radio Group / Checkbox Group | — | Few options, all visible. |
            | Shuttle | — | Move values between two lists. |
            | Text Field with Autocomplete | — | Suggestions while typing; the final value is text. |

            ## Cascading LOVs (Parent Items)
            Example: «P10_CITY» depends on «P10_STATE». The child query uses the parent as a bind variable:

            ~~~sql
            select name as d,
                   id   as r
              from cities
             where state = :P10_STATE
             order by name
            ~~~

            On the child item, **Cascading List of Values** group:
            1. **Parent Item(s)**: «P10_STATE» — when the parent changes, the child is cleared and reloaded via AJAX (the parent value is sent).
            2. **Items to Submit**: other items used by the query besides the parents (e.g. «P10_TYPE»).
            3. **Optimize Refresh**: if the parents are empty, clears the child without a server round trip.

            :::dica Refreshing from code
            To force a reload from JavaScript use «apex.item('P10_CITY').refresh()». The item's **Before Refresh** /
            **After Refresh** events let you react to the reload (e.g. select the first value).
            :::

            ## Multiple values
            Select Many, Checkbox Group, Shuttle, Popup LOV, Combobox and Select List can store several values. Since 24.1 the
            **Multiple Values → Type** attribute supports a **delimited list** (configurable separator; traditionally «:») or a
            **JSON Array**. In JavaScript «getValue()» returns an array. In SQL:

            ~~~sql
            -- colon-separated values
            select *
              from products
             where id in (select column_value
                            from table(apex_string.split(:P10_PRODUCTS, ':')));
            ~~~

            ## Performance for large lists
            - Turn on **Fetch on Search** and set **Minimum Characters** (the query runs only after N characters).
            - **Match Type = Starts With** can use indexes; *Contains* cannot.
            - **Maximum Values in List** caps the result (250 when left empty).
            - Index the columns filtered by the cascade and avoid functions in the LOV WHERE clause.

            :::novo What is new in 26.1
            - **Infinite scroll** in Select One, Select Many, Combobox and Text Field with Autocomplete: scrolling fetches more
              rows, without the *Maximum Values in List* cap.
            - More flexible **Quick Picks**: static, dynamic (from the LOV) or from a SQL query.
            - **Template Component Partials** (e.g. «{apply THEME$AVATAR/}») in the HTML expressions of Combobox, Select One and Select Many.
            :::
        `
    }
});

DOC.topico({
    id: 'formularios',
    cat: 'itens',
    nivel: 'intermediario',
    desde: '19.1',
    links: [
        { t: 'App Builder Guide — Developing Forms', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/developing-forms.html' },
        { t: 'App Builder Guide — Configuring Lost Update Detection', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/configuring-lost-update-detection.html' },
        { t: 'App Builder Guide — About Page Processes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-page-processes.html' }
    ],
    relacionados: ['itens-de-pagina', 'processos-computacoes-validacoes', 'paginas-modais', 'mestre-detalhe', 'botoes-e-branches'],
    pt: {
        titulo: 'Formulários com Form region',
        resumo: 'Como funciona um formulário moderno: Form region, Form - Initialization, Automatic Row Processing (DML), retorno da PK e proteção contra lost update.',
        tags: ['form', 'formulário', 'Form region', 'Form - Initialization', 'Automatic Row Processing', 'DML', 'lost update', 'Row Version', 'Prevent Lost Updates', 'Database Action', 'CRUD'],
        conteudo: `
            Desde o **APEX 19.1**, formulários são construídos com a **Form region**: a região guarda a fonte de dados e a chave
            primária, e os itens apenas apontam para colunas dela. Dois processos nativos fazem o trabalho pesado de ler e gravar.
            O wizard *Create Page → Form* (ou *Report with Form*) monta tudo isso para você.

            ## As peças de um formulário
            | Peça | Onde fica | Papel |
            |---|---|---|
            | Form region | Body | Fonte: Table/View, SQL Query ou PL/SQL retornando SQL — banco local, REST Enabled SQL ou REST Data Source. Grupo **Edit**: Enabled, Allowed Operations, Lost Update Type. |
            | Itens da região | Dentro da região | Cada item aponta para uma coluna (**Source → Form Region / Column**). Um ou mais são **Primary Key**; colunas **Query Only** são lidas mas não gravadas. |
            | Form - Initialization | Pre-Rendering (Before Header) | Busca a linha pela PK; com PK vazia, prepara um registro novo usando os defaults. |
            | Form - Automatic Row Processing (DML) | Processing | Executa INSERT, UPDATE ou DELETE. |
            | Botões | Região ou página | O atributo **Database Action** (SQL INSERT, UPDATE ou DELETE action) define a operação; o nome do botão vira «REQUEST». |

            ## Fluxo típico: relatório + formulário modal
            1. A coluna de link do relatório abre a página do formulário passando «P20_ID».
            2. **Form - Initialization** lê a linha com «:P20_ID».
            3. O usuário clica em **Save** (request «SAVE»): validações rodam e o processo **DML** faz o UPDATE.
            4. O processo **Close Dialog** fecha o modal; na página de origem, uma DA **Dialog Closed** pode atualizar o relatório.

            Com **Return Primary Key(s) after Insert** ligado no processo DML, o ID gerado (identity, sequence ou trigger) volta
            para o item da PK — útil para gravar detalhes em seguida ou exibir "Pedido 1234 criado" na mensagem de sucesso
            (ex.: *Success Message* = «Pedido &P20_ID. salvo.»).

            ## Proteção contra lost update
            Dois usuários abrem o mesmo registro; quem salvar por último sobrescreveria o outro sem perceber. O APEX evita isso:
            - Na região, **Lost Update Type**: *Row Values* (checksum das colunas atualizáveis, calculado na leitura e conferido
              ao gravar) ou *Row Version Column* (uma coluna incrementada a cada UPDATE, normalmente por trigger).
            - No processo DML, **Prevent Lost Updates** = On.
            - Se a linha mudou desde a leitura, o UPDATE é recusado com a mensagem *Current version of data in database has
              changed since user initiated update process*.

            ~~~sql
            -- Coluna de versão para usar com "Row Version Column"
            alter table pedidos add (versao number default 1 not null);

            create or replace trigger pedidos_bu
            before update on pedidos
            for each row
            begin
                :new.versao := :old.versao + 1;
            end;
            ~~~

            :::dica Row Values ou Row Version Column?
            *Row Values* funciona sem alterar a tabela. *Row Version Column* é mais leve (não calcula checksum de todas as colunas),
            mas a Oracle não o recomenda quando o formulário grava em várias tabelas.
            :::

            ## Saindo do automático
            Para regras de negócio complexas (várias tabelas, APIs, auditoria), substitua o DML automático por um processo
            **Execute Code** que chama o seu pacote — mantendo a Form region para leitura e para a renderização dos itens:

            ~~~plsql Processo Execute Code (Processing)
            begin
                case :REQUEST
                    when 'CREATE' then
                        pedidos_api.criar(
                            p_cliente_id => :P20_CLIENTE_ID,
                            p_valor      => :P20_VALOR,
                            p_id         => :P20_ID );     -- parâmetro OUT devolve a PK
                    when 'SAVE' then
                        pedidos_api.alterar(
                            p_id         => :P20_ID,
                            p_cliente_id => :P20_CLIENTE_ID,
                            p_valor      => :P20_VALOR );
                    when 'DELETE' then
                        pedidos_api.excluir(p_id => :P20_ID);
                end case;
            end;
            ~~~

            :::atencao Validação no cliente não basta
            *Value Required* e itens como Number Field e Date Picker já validam no navegador quando o botão tem
            **Execute Validations = On**. Mas as regras de negócio precisam de **validações no servidor** (ou constraints no
            banco): o navegador pode ser contornado.
            :::

            ## Erros comuns
            - Item fora da Form region (ou com *Source* errado): o valor não é lido nem gravado.
            - PK não marcada como **Primary Key** nos itens: a inicialização não encontra a linha.
            - Botão sem **Database Action** e processo sem condição: o DML não sabe se deve inserir ou atualizar.
        `
    },
    en: {
        titulo: 'Forms with the Form region',
        resumo: 'How a modern form works: Form region, Form - Initialization, Automatic Row Processing (DML), returning the PK and lost update protection.',
        tags: ['form', 'Form region', 'Form - Initialization', 'Automatic Row Processing', 'DML', 'lost update', 'Row Version', 'Prevent Lost Updates', 'Database Action', 'CRUD'],
        conteudo: `
            Since **APEX 19.1**, forms are built with the **Form region**: the region holds the data source and the primary key,
            and items simply point to its columns. Two native processes do the heavy lifting of reading and writing. The
            *Create Page → Form* (or *Report with Form*) wizard builds all of this for you.

            ## The parts of a form
            | Part | Where | Role |
            |---|---|---|
            | Form region | Body | Source: Table/View, SQL Query or PL/SQL returning SQL — local database, REST Enabled SQL or REST Data Source. **Edit** group: Enabled, Allowed Operations, Lost Update Type. |
            | Region items | Inside the region | Each item points to a column (**Source → Form Region / Column**). One or more are **Primary Key**; **Query Only** columns are read but not written. |
            | Form - Initialization | Pre-Rendering (Before Header) | Fetches the row by PK; with an empty PK it prepares a new record using defaults. |
            | Form - Automatic Row Processing (DML) | Processing | Runs the INSERT, UPDATE or DELETE. |
            | Buttons | Region or page | The **Database Action** attribute (SQL INSERT, UPDATE or DELETE action) sets the operation; the button name becomes «REQUEST». |

            ## Typical flow: report + modal form
            1. The report link column opens the form page passing «P20_ID».
            2. **Form - Initialization** reads the row using «:P20_ID».
            3. The user clicks **Save** (request «SAVE»): validations run and the **DML** process performs the UPDATE.
            4. The **Close Dialog** process closes the modal; on the calling page a **Dialog Closed** DA can refresh the report.

            With **Return Primary Key(s) after Insert** turned on in the DML process, the generated ID (identity, sequence or
            trigger) is returned to the PK item — handy for saving detail rows next or showing "Order 1234 created" in the success
            message (e.g. *Success Message* = «Order &P20_ID. saved.»).

            ## Lost update protection
            Two users open the same record; whoever saves last would silently overwrite the other. APEX prevents that:
            - On the region, **Lost Update Type**: *Row Values* (a checksum of the updatable columns, computed when reading and
              checked when saving) or *Row Version Column* (a column incremented on every UPDATE, usually by a trigger).
            - On the DML process, **Prevent Lost Updates** = On.
            - If the row changed since it was read, the UPDATE is rejected with *Current version of data in database has changed
              since user initiated update process*.

            ~~~sql
            -- Version column to use with "Row Version Column"
            alter table orders add (row_version number default 1 not null);

            create or replace trigger orders_bu
            before update on orders
            for each row
            begin
                :new.row_version := :old.row_version + 1;
            end;
            ~~~

            :::dica Row Values or Row Version Column?
            *Row Values* works without changing the table. *Row Version Column* is lighter (no checksum over every column), but
            Oracle does not recommend it when the form updates data in multiple tables.
            :::

            ## Going beyond the automatic process
            For complex business rules (several tables, APIs, auditing) replace the automatic DML with an **Execute Code** process
            that calls your package — keeping the Form region for reading and item rendering:

            ~~~plsql Execute Code process (Processing)
            begin
                case :REQUEST
                    when 'CREATE' then
                        orders_api.create_order(
                            p_customer_id => :P20_CUSTOMER_ID,
                            p_amount      => :P20_AMOUNT,
                            p_id          => :P20_ID );    -- OUT parameter returns the PK
                    when 'SAVE' then
                        orders_api.update_order(
                            p_id          => :P20_ID,
                            p_customer_id => :P20_CUSTOMER_ID,
                            p_amount      => :P20_AMOUNT );
                    when 'DELETE' then
                        orders_api.delete_order(p_id => :P20_ID);
                end case;
            end;
            ~~~

            :::atencao Client-side validation is not enough
            *Value Required* and items such as Number Field and Date Picker already validate in the browser when the button has
            **Execute Validations = On**. Business rules still need **server-side validations** (or database constraints): the
            browser can be bypassed.
            :::

            ## Common mistakes
            - An item outside the Form region (or with the wrong *Source*): its value is neither read nor written.
            - PK items not flagged as **Primary Key**: initialization cannot find the row.
            - A button without **Database Action** and a process without a condition: the DML does not know whether to insert or update.
        `
    }
});

DOC.topico({
    id: 'mestre-detalhe',
    cat: 'itens',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Managing Master Detail Forms', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-master-detail-forms.html' },
        { t: 'App Builder Guide — Creating Master Detail from an Existing Interactive Grid', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-master-metail-from-existing-interactive-grid.html' },
        { t: 'JavaScript API — interactiveGrid', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/interactiveGrid.html' }
    ],
    relacionados: ['interactive-grid', 'formularios', 'processos-computacoes-validacoes', 'paginas-modais'],
    pt: {
        titulo: 'Mestre-detalhe',
        resumo: 'Os estilos Stacked, Side by Side e Drill Down, como ligar duas Interactive Grids e o padrão cabeçalho em formulário com linhas em IG editável.',
        tags: ['master detail', 'mestre-detalhe', 'Interactive Grid', 'Master Region', 'Master Column', 'APEX$ROW_STATUS', 'Stacked', 'Side by Side', 'Drill Down', 'pedido e itens'],
        conteudo: `
            Um **mestre-detalhe** mostra um registro "pai" e seus "filhos": pedido e itens, departamento e funcionários. No
            APEX moderno o detalhe quase sempre é uma **Interactive Grid (IG) editável**.

            ## Três estilos no Create Page wizard
            | Estilo | Como fica | Bom para |
            |---|---|---|
            | Stacked | Uma página com duas IGs editáveis empilhadas; selecionar uma linha no mestre filtra o detalhe. | Manutenção rápida de tabelas pequenas. |
            | Side by Side | Uma página: lista de mestres à esquerda; à direita o registro selecionado e os relatórios de detalhe, com edição em diálogos modais. | Navegar por muitos mestres. |
            | Drill Down | Duas páginas: um Interactive Report com os mestres e uma página de formulário para o registro escolhido. | Fluxos "lista → documento" (pedidos, notas). |

            Caminho: **Create Page → Master Detail**, escolha o estilo, as tabelas e a **foreign key** que liga as duas. O Create
            App Wizard oferece apenas Stacked e Side by Side.

            ## Ligando duas Interactive Grids manualmente
            1. IG do mestre com **Edit → Enabled** e a coluna de chave primária marcada como **Primary Key**.
            2. IG do detalhe: em **Master Detail → Master Region**, escolha a região mestre.
            3. Na coluna de FK do detalhe: **Master Detail → Master Column** = a coluna correspondente do mestre.
            4. Habilite a edição do detalhe (Add Row, Update Row, Delete Row) e defina a sua chave primária.

            O APEX filtra o detalhe pela linha atual do mestre e preenche a FK das linhas novas. Cada IG grava com o seu processo
            **Interactive Grid - Automatic Row Processing (DML)**. Dá para encadear vários níveis (pedido → itens → lotes) e ter
            vários relacionamentos na mesma página.

            ## Cabeçalho em formulário + linhas em IG
            O padrão mais comum em sistemas de pedidos é uma **Form region** no mestre e uma IG no detalhe, na mesma página:
            - Fonte da IG com «where pedido_id = :P20_ID» e **Page Items to Submit** = «P20_ID».
            - Coluna «PEDIDO_ID» da IG como Hidden.
            - **Ordem dos processos**: primeiro o DML do formulário (com *Return Primary Key(s) after Insert*), depois o DML da IG —
              assim um pedido novo já tem ID quando as linhas forem gravadas.

            Para gravar a FK nas linhas, use **Target Type = PL/SQL Code** no processo da IG. As colunas viram binds e
            «:APEX$ROW_STATUS» indica a operação (C = create, U = update, D = delete):

            ~~~plsql IG - Automatic Row Processing (DML), Target Type = PL/SQL Code
            begin
                case :APEX$ROW_STATUS
                    when 'C' then
                        insert into pedido_itens (pedido_id, produto_id, quantidade, preco)
                        values (:P20_ID, :PRODUTO_ID, :QUANTIDADE, :PRECO)
                        returning id into :ID;
                    when 'U' then
                        update pedido_itens
                           set produto_id = :PRODUTO_ID,
                               quantidade = :QUANTIDADE,
                               preco      = :PRECO
                         where id = :ID;
                    when 'D' then
                        delete from pedido_itens where id = :ID;
                end case;
            end;
            ~~~

            :::dica Validando as linhas
            Validações podem ser associadas à IG (atributo **Editable Region**) e usar as colunas como binds («:QUANTIDADE») e
            «:APEX$ROW_STATUS». Elas rodam para cada linha alterada, e a mensagem de erro aparece na célula da coluna associada.
            :::

            ## JavaScript útil
            As chamadas abaixo usam o **HTML DOM ID** da região (no 26.1 o antigo atributo *Static ID* passou a se chamar assim).

            ~~~js
            // Salvar a IG por código (ex.: a partir de um botão próprio)
            apex.region('itens').call('getActions').invoke('save');

            // Atualizar o detalhe (ex.: depois de fechar um diálogo)
            apex.region('itens').refresh();

            // Somar uma coluna percorrendo o modelo (ignorando linhas excluídas)
            var model = apex.region('itens').call('getViews', 'grid').model;
            var total = 0;
            model.forEach(function (rec, index, id) {
                var meta = model.getRecordMetadata(id);
                if (!meta.deleted && !meta.agg) {
                    total += apex.locale.toNumber(model.getValue(rec, 'QUANTIDADE')) || 0;
                }
            });
            apex.item('P20_TOTAL_ITENS').setValue(String(total));
            ~~~

            :::atencao Detalhe com pedido ainda não salvo
            Num pedido novo, «P20_ID» está vazio até o submit. Por isso a ordem dos processos importa — e, se a IG estiver na
            mesma página, salve o formulário e a grade **no mesmo submit** (botão do formulário), não pelo botão Save da própria IG.
            :::
        `
    },
    en: {
        titulo: 'Master-detail',
        resumo: 'The Stacked, Side by Side and Drill Down styles, linking two Interactive Grids and the header-in-a-form with lines-in-an-editable-IG pattern.',
        tags: ['master detail', 'Interactive Grid', 'Master Region', 'Master Column', 'APEX$ROW_STATUS', 'Stacked', 'Side by Side', 'Drill Down', 'order lines'],
        conteudo: `
            A **master-detail** shows a "parent" record and its "children": an order and its lines, a department and its
            employees. In modern APEX the detail is almost always an **editable Interactive Grid (IG)**.

            ## Three styles in the Create Page wizard
            | Style | Layout | Good for |
            |---|---|---|
            | Stacked | One page with two stacked editable IGs; selecting a master row filters the detail. | Quick maintenance of small tables. |
            | Side by Side | One page: master list on the left; on the right the selected record and its detail reports, edited in modal dialogs. | Browsing many masters. |
            | Drill Down | Two pages: an Interactive Report of masters and a form page for the chosen record. | "List → document" flows (orders, invoices). |

            Path: **Create Page → Master Detail**, pick the style, the tables and the **foreign key** linking them. The Create App
            Wizard only offers Stacked and Side by Side.

            ## Linking two Interactive Grids by hand
            1. Master IG with **Edit → Enabled** and its key column flagged as **Primary Key**.
            2. Detail IG: under **Master Detail → Master Region**, select the master region.
            3. On the detail FK column: **Master Detail → Master Column** = the matching master column.
            4. Enable editing on the detail (Add Row, Update Row, Delete Row) and define its primary key.

            APEX filters the detail by the current master row and fills in the FK for new rows. Each IG saves through its own
            **Interactive Grid - Automatic Row Processing (DML)** process. You can chain several levels (order → lines → lots) and
            have several relationships on the same page.

            ## Header in a form + lines in an IG
            The most common pattern in order-entry systems is a **Form region** for the master and an IG for the detail, on the
            same page:
            - IG source with «where order_id = :P20_ID» and **Page Items to Submit** = «P20_ID».
            - The IG «ORDER_ID» column as Hidden.
            - **Process order**: the form DML first (with *Return Primary Key(s) after Insert*), then the IG DML — so a new order
              already has an ID when its lines are saved.

            To write the FK on the lines, use **Target Type = PL/SQL Code** on the IG process. Columns become bind variables and
            «:APEX$ROW_STATUS» tells the operation (C = create, U = update, D = delete):

            ~~~plsql IG - Automatic Row Processing (DML), Target Type = PL/SQL Code
            begin
                case :APEX$ROW_STATUS
                    when 'C' then
                        insert into order_lines (order_id, product_id, quantity, price)
                        values (:P20_ID, :PRODUCT_ID, :QUANTITY, :PRICE)
                        returning id into :ID;
                    when 'U' then
                        update order_lines
                           set product_id = :PRODUCT_ID,
                               quantity   = :QUANTITY,
                               price      = :PRICE
                         where id = :ID;
                    when 'D' then
                        delete from order_lines where id = :ID;
                end case;
            end;
            ~~~

            :::dica Validating the lines
            Validations can be attached to the IG (**Editable Region** attribute) and use columns as binds («:QUANTITY») and
            «:APEX$ROW_STATUS». They run for every changed row, and the error shows on the associated column cell.
            :::

            ## Useful JavaScript
            The calls below use the region's **HTML DOM ID** (in 26.1 the former *Static ID* attribute was renamed to that).

            ~~~js
            // Save the IG from code (e.g. from a custom button)
            apex.region('lines').call('getActions').invoke('save');

            // Refresh the detail (e.g. after a dialog closes)
            apex.region('lines').refresh();

            // Sum a column by walking the model (skipping deleted rows)
            var model = apex.region('lines').call('getViews', 'grid').model;
            var total = 0;
            model.forEach(function (rec, index, id) {
                var meta = model.getRecordMetadata(id);
                if (!meta.deleted && !meta.agg) {
                    total += apex.locale.toNumber(model.getValue(rec, 'QUANTITY')) || 0;
                }
            });
            apex.item('P20_TOTAL_QTY').setValue(String(total));
            ~~~

            :::atencao Detail rows for an unsaved order
            For a new order «P20_ID» is empty until submit. That is why process order matters — and, with the IG on the same
            page, save the form and the grid **in the same submit** (the form button), not through the IG's own Save button.
            :::
        `
    }
});

DOC.topico({
    id: 'processos-computacoes-validacoes',
    cat: 'itens',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Understanding Validations', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-validations.html' },
        { t: 'App Builder Guide — Understanding Page Computations', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-page-computations.html' },
        { t: 'App Builder Guide — About Page Processes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-page-processes.html' }
    ],
    relacionados: ['ciclo-de-vida-da-pagina', 'formularios', 'tratamento-de-erros', 'execution-chains-background', 'ajax-callbacks'],
    pt: {
        titulo: 'Processos, computações e validações',
        resumo: 'A lógica declarativa do servidor: tipos de computação, validações (Always Execute, local do erro) e processos, com condições e mensagens.',
        tags: ['validação', 'validation', 'Always Execute', 'Execute Validations', 'computação', 'computation', 'processo', 'process', 'Execute Code', 'When Button Pressed', 'APEX_ERROR', '#LABEL#'],
        conteudo: `
            Na parte de servidor de uma página há três tipos de componente: **computações** atribuem valor a um item,
            **validações** verificam os dados e bloqueiam o envio, e **processos** executam ações. A ordem no submit é fixa:

            ~~~texto
            Submit → session state → Computações (After Submit) → Validações → Processos → Branches
            ~~~

            Detalhes em [Ciclo de vida da página](#/topico/ciclo-de-vida-da-pagina). Enquanto houver erros de validação na tela,
            computações e processos não rodam.

            ## Computações
            Atribuem um valor a **um único item**. Tipos: Static Value, Item, SQL Query (valor único ou lista separada por
            dois-pontos), Expression, Function Body e Preference. Pontos de execução: On New Instance, Before Header, After Header,
            Before/After Regions, Before/After Footer e **After Submit** (o mais comum).

            ~~~plsql Computação After Submit em P10_NOME (tipo Expression, PL/SQL)
            initcap(trim(:P10_NOME))
            ~~~

            :::dica Computação, default ou processo?
            Use **Default** para o valor inicial na renderização, **computação** para derivar ou normalizar um item, e um processo
            **Execute Code** quando a lógica atribui vários itens ou chama uma API.
            :::

            ## Validações
            | Categoria | Tipos | Exemplo |
            |---|---|---|
            | Item | Item is NOT NULL, Item is numeric, Item is a valid date, Item = Value, Item matches Regular Expression, Item contains no spaces... | E-mail obrigatório e no formato certo. |
            | SQL | Rows returned / No Rows returned | O CPF informado não pode já existir. |
            | Expression | Expressão booleana (SQL ou PL/SQL) | «:P10_QUANTIDADE > 0» |
            | Function Body | Retornando Boolean ou retornando o **texto do erro** | Regras com mensagens diferentes. |

            ~~~plsql Validação: Function Body (returning Error Text)
            declare
                l_saldo number;
            begin
                select saldo
                  into l_saldo
                  from estoques
                 where produto_id = :P10_PRODUTO_ID;

                if l_saldo < apex_session_state.get_number('P10_QUANTIDADE') then
                    return 'Estoque insuficiente: restam ' || l_saldo || ' unidades.';
                end if;
                return null;      -- null = válido
            end;
            ~~~

            Atributos de cada validação:
            - **Error Message**: aceita «#LABEL#» (rótulo do item associado) e, em grids, «#COLUMN_HEADER#».
            - **Display Location**: *Inline with Field and in Notification*, *Inline with Field*, *Inline in Notification* ou
              *On Error Page*.
            - **Associated Item**: onde a mensagem aparece; a notificação ganha um link que leva o foco ao item.
            - **Server-side Condition** e **When Button Pressed**: quando a validação deve rodar.
            - **Editable Region**: para validar linhas de uma Interactive Grid (colunas como binds e «:APEX$ROW_STATUS»).

            :::atencao Always Execute
            Botões têm o atributo **Execute Validations**. Com Off (comum em *Delete* e *Cancel*), as validações são puladas —
            exceto as marcadas com **Always Execute = On**, ideais para checagens de segurança como "este usuário pode alterar
            este registro?". Desde o 18.1, botões com Execute Validations = On também fazem checagens no cliente (como Value
            Required) antes de enviar a página.
            :::

            ## Processos
            | Tipo | Para quê |
            |---|---|
            | Execute Code | PL/SQL livre — de preferência só a chamada ao seu pacote. |
            | Form - Initialization / Form - Automatic Row Processing (DML) | Ler e gravar Form regions. |
            | Interactive Grid - Automatic Row Processing (DML) | Gravar as linhas de uma IG. |
            | Invoke API (22.2) | Chamar procedure/função de pacote ou operação REST mapeando parâmetros declarativamente. |
            | Execution Chain (23.1) | Agrupar processos, inclusive em background. |
            | Send E-Mail, Send Push Notification | Notificações. |
            | Download, Print Report (24.1) | Entregar arquivos e relatórios. |
            | Close Dialog, Clear Session State, Reset Pagination | Navegação e limpeza de estado. |
            | Human Task - Create/Manage, Workflow | Aprovações e fluxos. |
            | Generate Text with AI (26.1) | Equivalente declarativo de «APEX_AI.GENERATE». |

            Pontos de execução: **Processing** (após as validações), **After Submit** (antes das validações), **Before Header**
            (na renderização) e **Ajax Callback** (chamado via AJAX). Use **Server-side Condition → When Button Pressed** ou
            *Request is contained in Value* para amarrar o processo a botões, e preencha **Success Message** para o feedback.

            ~~~plsql Execute Code com erro amigável
            begin
                pedidos_api.aprovar(p_id => :P10_ID);
            exception
                when pedidos_api.e_sem_saldo then
                    apex_error.add_error(
                        p_message          => 'Saldo insuficiente para aprovar o pedido.',
                        p_display_location => apex_error.c_inline_in_notification );
            end;
            ~~~

            Erros não tratados (inclusive «raise_application_error») interrompem o processamento e passam pela
            **Error Handling Function** da aplicação, onde você pode traduzir mensagens técnicas — veja
            [Tratamento de erros](#/topico/tratamento-de-erros).
        `
    },
    en: {
        titulo: 'Processes, computations and validations',
        resumo: 'Declarative server-side logic: computation types, validations (Always Execute, error location) and processes, with conditions and messages.',
        tags: ['validation', 'Always Execute', 'Execute Validations', 'computation', 'process', 'Execute Code', 'When Button Pressed', 'APEX_ERROR', '#LABEL#'],
        conteudo: `
            On the server side of a page there are three kinds of components: **computations** assign a value to an item,
            **validations** check data and block the submit, and **processes** perform actions. The order on submit is fixed:

            ~~~texto
            Submit → session state → Computations (After Submit) → Validations → Processes → Branches
            ~~~

            Details in [Page lifecycle](#/topico/ciclo-de-vida-da-pagina). While validation errors are displayed, computations and
            processes do not run.

            ## Computations
            They assign a value to **a single item**. Types: Static Value, Item, SQL Query (single value or colon-separated list),
            Expression, Function Body and Preference. Execution points: On New Instance, Before Header, After Header,
            Before/After Regions, Before/After Footer and **After Submit** (the most common).

            ~~~plsql After Submit computation on P10_NAME (Expression, PL/SQL)
            initcap(trim(:P10_NAME))
            ~~~

            :::dica Computation, default or process?
            Use **Default** for the initial value at render time, a **computation** to derive or normalize one item, and an
            **Execute Code** process when the logic sets several items or calls an API.
            :::

            ## Validations
            | Category | Types | Example |
            |---|---|---|
            | Item | Item is NOT NULL, Item is numeric, Item is a valid date, Item = Value, Item matches Regular Expression, Item contains no spaces... | E-mail required and well formed. |
            | SQL | Rows returned / No Rows returned | The tax ID must not already exist. |
            | Expression | Boolean expression (SQL or PL/SQL) | «:P10_QUANTITY > 0» |
            | Function Body | Returning Boolean or returning the **error text** | Rules with different messages. |

            ~~~plsql Validation: Function Body (returning Error Text)
            declare
                l_stock number;
            begin
                select on_hand
                  into l_stock
                  from inventory
                 where product_id = :P10_PRODUCT_ID;

                if l_stock < apex_session_state.get_number('P10_QUANTITY') then
                    return 'Not enough stock: only ' || l_stock || ' units left.';
                end if;
                return null;      -- null = valid
            end;
            ~~~

            Validation attributes:
            - **Error Message**: supports «#LABEL#» (label of the associated item) and, in grids, «#COLUMN_HEADER#».
            - **Display Location**: *Inline with Field and in Notification*, *Inline with Field*, *Inline in Notification* or
              *On Error Page*.
            - **Associated Item**: where the message shows; the notification gets a link that moves focus to the item.
            - **Server-side Condition** and **When Button Pressed**: when the validation should run.
            - **Editable Region**: to validate Interactive Grid rows (columns as binds and «:APEX$ROW_STATUS»).

            :::atencao Always Execute
            Buttons have an **Execute Validations** attribute. When Off (typical for *Delete* and *Cancel*), validations are
            skipped — except those with **Always Execute = On**, ideal for security checks like "may this user change this
            record?". Since 18.1, buttons with Execute Validations = On also run client-side checks (such as Value Required)
            before submitting.
            :::

            ## Processes
            | Type | Purpose |
            |---|---|
            | Execute Code | Free PL/SQL — ideally just a call to your package. |
            | Form - Initialization / Form - Automatic Row Processing (DML) | Read and write Form regions. |
            | Interactive Grid - Automatic Row Processing (DML) | Save IG rows. |
            | Invoke API (22.2) | Call a package procedure/function or a REST operation with declarative parameter mapping. |
            | Execution Chain (23.1) | Group processes, including in the background. |
            | Send E-Mail, Send Push Notification | Notifications. |
            | Download, Print Report (24.1) | Deliver files and reports. |
            | Close Dialog, Clear Session State, Reset Pagination | Navigation and state cleanup. |
            | Human Task - Create/Manage, Workflow | Approvals and flows. |
            | Generate Text with AI (26.1) | Declarative equivalent of «APEX_AI.GENERATE». |

            Execution points: **Processing** (after validations), **After Submit** (before validations), **Before Header** (during
            rendering) and **Ajax Callback** (called via AJAX). Use **Server-side Condition → When Button Pressed** or
            *Request is contained in Value* to tie a process to buttons, and fill in **Success Message** for feedback.

            ~~~plsql Execute Code with a friendly error
            begin
                orders_api.approve(p_id => :P10_ID);
            exception
                when orders_api.e_no_credit then
                    apex_error.add_error(
                        p_message          => 'Not enough credit to approve this order.',
                        p_display_location => apex_error.c_inline_in_notification );
            end;
            ~~~

            Unhandled errors (including «raise_application_error») stop processing and go through the application's
            **Error Handling Function**, where you can translate technical messages — see
            [Error handling](#/topico/tratamento-de-erros).
        `
    }
});

DOC.topico({
    id: 'upload-download-arquivos',
    cat: 'itens',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — About Item Types (File Upload, Image Upload)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-item-types.html' },
        { t: 'App Builder Guide — Understanding BLOB Support in Forms and Reports', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-blob-support-in-forms-and-reports.html' },
        { t: 'APEX_HTTP.DOWNLOAD (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_HTTP.DOWNLOAD-Procedure-Signature-1.html' }
    ],
    relacionados: ['itens-de-pagina', 'formularios', 'impressao-e-exportacao', 'carga-de-dados', 'escaping-e-xss'],
    pt: {
        titulo: 'Upload e download de arquivos',
        resumo: 'File Upload e Image Upload, APEX_APPLICATION_TEMP_FILES x coluna BLOB, e as formas de download: coluna Download BLOB, processo/DA Download, APEX_HTTP e o legado.',
        tags: ['upload', 'download', 'File Upload', 'Image Upload', 'BLOB', 'APEX_APPLICATION_TEMP_FILES', 'APEX_HTTP.DOWNLOAD', 'wpg_docload', 'dropzone', 'arquivo', 'anexo'],
        conteudo: `
            ## Upload: File Upload e Image Upload
            - **File Upload**: *Display As* = Native File Browse, Inline File Browse, Inline Dropzone ou Block Dropzone (arrastar e
              soltar; dropzone desde o 20.2). Atributos úteis: **File Types** (ex.: «.pdf,image/*»), **Maximum File Size** (KB),
              **Allow Multiple Files** e **Capture Using** (abre a câmera no celular).
            - **Image Upload** (23.2): mesmo armazenamento, com prévia, **recorte** e **redimensionamento** feitos no navegador.
            - O File Upload não é suportado como coluna de Interactive Grid.

            ## Onde o arquivo vai parar (Storage Type)
            | Storage Type | Como funciona | Quando usar |
            |---|---|---|
            | Table APEX_APPLICATION_TEMP_FILES | O arquivo vai para uma área temporária e o item recebe o identificador (coluna «NAME»). **Purge File at**: End of Request ou End of Session. | Você decide o destino: sua tabela, Object Storage, leitura de planilha com APEX_DATA_PARSER... |
            | BLOB column specified in Item Source | Grava direto na coluna BLOB da Form region, com colunas opcionais de MIME type, nome do arquivo, charset e data. | Formulário simples sobre uma tabela com BLOB. |

            ~~~plsql Processo (Processing): copiar da área temporária para a sua tabela
            declare
                l_nomes apex_t_varchar2;
            begin
                -- com Allow Multiple Files, os identificadores vêm separados por ':'
                l_nomes := apex_string.split(:P30_ARQUIVOS, ':');

                for i in 1 .. l_nomes.count loop
                    insert into documentos (nome, mime_type, tamanho, conteudo, enviado_por)
                    select filename, mime_type, dbms_lob.getlength(blob_content), blob_content, :APP_USER
                      from apex_application_temp_files
                     where name = l_nomes(i);
                end loop;
            end;
            ~~~

            :::novo Copiar e colar (26.1)
            Com **Allow Copy and Paste** ligado, o usuário cola um arquivo ou print direto da área de transferência
            (Ctrl+V / Cmd+V) no File Upload ou Image Upload. Habilite em apenas um item por página.
            :::

            :::atencao Segurança no upload
            Restrinja *File Types* e *Maximum File Size*, mas confira também no servidor (MIME type, extensão, tamanho) — o
            navegador pode ser contornado. Ao devolver arquivos enviados por usuários, prefira **attachment** a exibir inline
            conteúdo como HTML ou SVG.
            :::

            ## Download: quatro caminhos
            | Opção | Desde | Ideal para |
            |---|---|---|
            | Coluna **Download BLOB** em relatórios / item **Display Image** | — | Link ou imagem declarativos a partir de uma tabela. |
            | Processo **Download** e ação dinâmica **Download** | 24.1 | Um ou vários arquivos (vários viram ZIP), de BLOB, CLOB ou VARCHAR2, como anexo ou inline. |
            | «APEX_HTTP.DOWNLOAD» | 24.1 | Controle total em PL/SQL (Before Header, Ajax Callback, application process). |
            | «OWA_UTIL» + «WPG_DOCLOAD» | legado | Aplicações em versões anteriores ao 24.1. |

            ### Coluna Download BLOB
            Inclua no relatório uma coluna com o tamanho do BLOB e mude o tipo para **Download BLOB**; em *BLOB Attributes*
            informe tabela, coluna BLOB, chave primária e, opcionalmente, colunas de MIME type, nome e data.

            ~~~sql
            select id,
                   nome,
                   dbms_lob.getlength(conteudo) as download   -- coluna tipo Download BLOB
              from documentos
            ~~~

            ### APEX_HTTP.DOWNLOAD (24.1+)
            ~~~plsql Processo Before Header da página de download (ex.: página 40)
            declare
                l_conteudo blob;
                l_mime     documentos.mime_type%type;
                l_nome     documentos.nome%type;
            begin
                select conteudo, mime_type, nome
                  into l_conteudo, l_mime, l_nome
                  from documentos
                 where id = :P40_ID
                   and enviado_por = :APP_USER;       -- autorização!

                apex_http.download(
                    p_blob         => l_conteudo,
                    p_content_type => l_mime,
                    p_filename     => l_nome,
                    p_is_inline    => false );         -- true = abre no navegador (ex.: PDF)
            end;
            ~~~

            A procedure limpa o buffer HTP e chama «APEX_APPLICATION.STOP_APEX_ENGINE» ao final. Há também uma assinatura com
            «p_clob» para textos (CSV, JSON, TXT). Gere o link com «apex_page.get_url(p_page => 40, p_items => 'P40_ID',
            p_values => id)» para manter o checksum da Session State Protection.

            ### Antes do 24.1
            ~~~plsql Download "clássico"
            declare
                l_conteudo blob;
                l_mime     documentos.mime_type%type;
                l_nome     documentos.nome%type;
            begin
                select conteudo, mime_type, nome
                  into l_conteudo, l_mime, l_nome
                  from documentos
                 where id = :P40_ID;

                sys.owa_util.mime_header(l_mime, false);
                sys.htp.p('Content-Length: ' || dbms_lob.getlength(l_conteudo));
                sys.htp.p('Content-Disposition: attachment; filename="' || l_nome || '"');
                sys.owa_util.http_header_close;
                sys.wpg_docload.download_file(l_conteudo);
                apex_application.stop_apex_engine;
            end;
            ~~~

            :::dica STOP_APEX_ENGINE e exceções
            «stop_apex_engine» encerra a requisição levantando uma exceção interna. Se o bloco tiver «when others», relance-a
            (ou trate «apex_application.e_stop_apex_engine» antes), senão o APEX tenta continuar renderizando a página depois
            do arquivo.
            :::
        `
    },
    en: {
        titulo: 'File upload and download',
        resumo: 'File Upload and Image Upload, APEX_APPLICATION_TEMP_FILES vs a BLOB column, and download options: Download BLOB column, Download process/DA, APEX_HTTP, legacy.',
        tags: ['upload', 'download', 'File Upload', 'Image Upload', 'BLOB', 'APEX_APPLICATION_TEMP_FILES', 'APEX_HTTP.DOWNLOAD', 'wpg_docload', 'dropzone', 'file', 'attachment'],
        conteudo: `
            ## Upload: File Upload and Image Upload
            - **File Upload**: *Display As* = Native File Browse, Inline File Browse, Inline Dropzone or Block Dropzone (drag and
              drop; dropzone since 20.2). Useful attributes: **File Types** (e.g. «.pdf,image/*»), **Maximum File Size** (KB),
              **Allow Multiple Files** and **Capture Using** (opens the camera on mobile).
            - **Image Upload** (23.2): same storage, plus preview, **cropping** and **resizing** done in the browser.
            - File Upload is not supported as an Interactive Grid column.

            ## Where the file ends up (Storage Type)
            | Storage Type | How it works | When to use |
            |---|---|---|
            | Table APEX_APPLICATION_TEMP_FILES | The file goes to a temporary area and the item receives its identifier (the «NAME» column). **Purge File at**: End of Request or End of Session. | You decide the destination: your table, Object Storage, parsing a spreadsheet with APEX_DATA_PARSER... |
            | BLOB column specified in Item Source | Writes straight into the Form region BLOB column, with optional MIME type, file name, charset and date columns. | A simple form over a table with a BLOB. |

            ~~~plsql Process (Processing): copy from the temporary area into your table
            declare
                l_names apex_t_varchar2;
            begin
                -- with Allow Multiple Files, identifiers come separated by ':'
                l_names := apex_string.split(:P30_FILES, ':');

                for i in 1 .. l_names.count loop
                    insert into documents (file_name, mime_type, file_size, content, uploaded_by)
                    select filename, mime_type, dbms_lob.getlength(blob_content), blob_content, :APP_USER
                      from apex_application_temp_files
                     where name = l_names(i);
                end loop;
            end;
            ~~~

            :::novo Copy and paste (26.1)
            With **Allow Copy and Paste** turned on, users can paste a file or screenshot straight from the clipboard
            (Ctrl+V / Cmd+V) into a File Upload or Image Upload item. Enable it on only one item per page.
            :::

            :::atencao Upload security
            Restrict *File Types* and *Maximum File Size*, but also check on the server (MIME type, extension, size) — the browser
            can be bypassed. When serving user-uploaded files, prefer **attachment** over rendering HTML or SVG content inline.
            :::

            ## Download: four paths
            | Option | Since | Best for |
            |---|---|---|
            | **Download BLOB** report column / **Display Image** item | — | Declarative link or image from a table. |
            | **Download** process and **Download** dynamic action | 24.1 | One or many files (many become a ZIP), from BLOB, CLOB or VARCHAR2, as attachment or inline. |
            | «APEX_HTTP.DOWNLOAD» | 24.1 | Full control in PL/SQL (Before Header, Ajax Callback, application process). |
            | «OWA_UTIL» + «WPG_DOCLOAD» | legacy | Apps on releases before 24.1. |

            ### Download BLOB column
            Add a column with the BLOB length to the report and set its type to **Download BLOB**; under *BLOB Attributes* enter
            the table, BLOB column, primary key and, optionally, MIME type, file name and date columns.

            ~~~sql
            select id,
                   file_name,
                   dbms_lob.getlength(content) as download   -- Download BLOB column
              from documents
            ~~~

            ### APEX_HTTP.DOWNLOAD (24.1+)
            ~~~plsql Before Header process on the download page (e.g. page 40)
            declare
                l_content blob;
                l_mime    documents.mime_type%type;
                l_name    documents.file_name%type;
            begin
                select content, mime_type, file_name
                  into l_content, l_mime, l_name
                  from documents
                 where id = :P40_ID
                   and uploaded_by = :APP_USER;        -- authorization!

                apex_http.download(
                    p_blob         => l_content,
                    p_content_type => l_mime,
                    p_filename     => l_name,
                    p_is_inline    => false );         -- true = open in the browser (e.g. PDF)
            end;
            ~~~

            The procedure clears the HTP buffer and calls «APEX_APPLICATION.STOP_APEX_ENGINE» at the end. There is also a
            «p_clob» signature for text (CSV, JSON, TXT). Build the link with «apex_page.get_url(p_page => 40, p_items => 'P40_ID',
            p_values => id)» to keep the Session State Protection checksum.

            ### Before 24.1
            ~~~plsql "Classic" download
            declare
                l_content blob;
                l_mime    documents.mime_type%type;
                l_name    documents.file_name%type;
            begin
                select content, mime_type, file_name
                  into l_content, l_mime, l_name
                  from documents
                 where id = :P40_ID;

                sys.owa_util.mime_header(l_mime, false);
                sys.htp.p('Content-Length: ' || dbms_lob.getlength(l_content));
                sys.htp.p('Content-Disposition: attachment; filename="' || l_name || '"');
                sys.owa_util.http_header_close;
                sys.wpg_docload.download_file(l_content);
                apex_application.stop_apex_engine;
            end;
            ~~~

            :::dica STOP_APEX_ENGINE and exceptions
            «stop_apex_engine» ends the request by raising an internal exception. If your block has «when others», re-raise it
            (or handle «apex_application.e_stop_apex_engine» first), otherwise APEX tries to keep rendering the page after the file.
            :::
        `
    }
});
