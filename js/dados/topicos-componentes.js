DOC.topico({
    id: 'classic-report',
    cat: 'componentes',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Managing Classic Reports', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-classic-reports.html' },
        { t: 'Managing Classic Report Column Attributes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-classic-report-column-attributes.html' }
    ],
    relacionados: ['interactive-report', 'cards', 'template-directives', 'faceted-search-e-smart-filters', 'impressao-e-exportacao'],
    pt: {
        titulo: 'Classic Report',
        resumo: 'O relatório mais simples e previsível do APEX: uma consulta SQL exibida com templates, links, paginação, quebras e downloads, sem personalização pelo usuário.',
        tags: ['classic report', 'relatório clássico', 'report', 'HTML Expression', '#COLUMN#', 'paginação', 'lazy loading', 'template', 'refresh'],
        conteudo: `
            O **Classic Report** é a região de relatório mais antiga e mais simples do APEX: você escreve uma consulta SQL e o
            APEX a exibe como tabela (ou com outro template), com paginação, ordenação opcional e links. Ele não oferece as
            personalizações de usuário final do [Interactive Report](#/topico/interactive-report), mas em troca é leve,
            previsível e **totalmente controlado** pelo desenvolvedor.

            ## Quando usar
            | Situação | Classic Report? |
            |---|---|
            | Lista simples, somente leitura, com layout controlado | Sim |
            | Relatório com template próprio (timeline, comentários, pares valor/atributo) | Sim |
            | Usuário precisa filtrar, salvar visões, agrupar e baixar sozinho | Prefira Interactive Report |
            | Edição de várias linhas na tela | Prefira Interactive Grid |
            | Blocos visuais com imagem, badge e ações | Prefira Cards |
            | Resultado filtrado por Faceted Search ou Smart Filters | Sim (é uma das regiões suportadas) |

            ## Fonte de dados
            No grupo *Source* você define:
            - **Location**: banco local, *REST Enabled SQL* ou *REST Data Source*.
            - **Type**: *Table / View*, *SQL Query* ou *Function Body returning SQL Query* (útil quando o SQL precisa ser montado
              dinamicamente — sempre com bind variables).
            - **Page Items to Submit**: itens usados na consulta que devem ir para o session state quando a região é
              atualizada via AJAX.

            ~~~sql
            select p.id,
                   p.numero,
                   c.nome            as cliente,
                   p.data_pedido,
                   p.total,
                   p.status
              from pedidos p
              join clientes c on c.id = p.cliente_id
             where (:P10_STATUS is null or p.status = :P10_STATUS)
               and p.data_pedido >= add_months(trunc(sysdate), -3)
            ~~~

            :::atencao Bind variables sempre
            Use «:P10_STATUS», nunca «&P10_STATUS.» dentro do SQL. A substituição textual abre caminho para SQL injection e
            impede o reaproveitamento do cursor.
            :::

            ## Colunas
            Cada coluna da consulta vira um nó em *Columns* no Page Designer, com seu próprio **Type**:
            - **Plain Text** e **Plain Text (based on List of Values)** — o padrão. Mantenha *Escape special characters* ligado.
            - **Link** — gera um link por linha. Use o destino *Page in this application* e repasse valores com «#ID#»
              (o APEX calcula o checksum da URL).
            - **Rich Text** (antigo *Markdown*, renomeado no 21.1), **Percent Graph**, **Display Image**, **Download BLOB**
              e **Hidden Column**.

            A **HTML Expression** de uma coluna aceita «#COLUNA#» e, desde o 22.2, **Template Directives**:

            ~~~html
            {case STATUS/}
              {when ATRASADO/}<span class="u-danger-text">Atrasado</span>
              {when ENTREGUE/}<span class="u-success-text">Entregue</span>
              {otherwise/}<span>#STATUS#</span>
            {endcase/}
            ~~~

            ## Aparência, paginação e ordenação
            - **Template** (*Appearance*): além do *Standard*, o Universal Theme traz templates como *Value Attribute Pairs*,
              *Badge List*, *Timeline*, *Comments* e *Media List*. Para layouts ricos novos, avalie também os
              [Template Components](#/topico/template-components) (23.1).
            - **Template Options**: listras, bordas, cabeçalho fixo, largura da tabela etc.
            - **Pagination**: tipos como *Row Ranges X to Y of Z*; *Maximum Rows to Process* limita o volume lido.
            - **Lazy Loading** (desde o 21.1): a página abre primeiro e a região carrega em seguida — ótimo para consultas lentas.
            - **Ordenação**: marque colunas como ordenáveis e defina a ordem padrão. Para escolher a ordenação por uma lista,
              existe o item **Order By Item** (22.1).
            - **Break Formatting**: quebras pelas primeiras colunas e totais por coluna.

            ## Atualizando com Dynamic Action
            O Classic Report é refrescável: crie uma Dynamic Action *Change* em «P10_STATUS» com a ação *Refresh* na região
            (e inclua «P10_STATUS» em *Page Items to Submit*). Em JavaScript:

            ~~~js
            // "pedidos" é o HTML DOM ID da região (chamado Static ID até o 24.2)
            apex.region( "pedidos" ).refresh();
            ~~~

            ## Exportar e imprimir
            Habilite *Printing* nos atributos da região para oferecer download em CSV, HTML, PDF e Excel — PDF e XLSX são
            gerados nativamente desde o 20.2, sem servidor de impressão. Em PL/SQL, leia os dados da região com
            «APEX_REGION.OPEN_QUERY_CONTEXT» ou gere um arquivo com «APEX_REGION.EXPORT_DATA». Veja
            [Impressão e exportação](#/topico/impressao-e-exportacao).

            :::dica Classic Report + filtros modernos
            Combinado com [Faceted Search ou Smart Filters](#/topico/faceted-search-e-smart-filters), o Classic Report vira
            uma tela de busca completa: os filtros são aplicados automaticamente à consulta, sem você alterar o SQL.
            :::

            ## Boas práticas
            - Selecione só as colunas que vai exibir e filtre no SQL, não com condições de exibição.
            - Prefira montar HTML nas *HTML Expressions* (com escape) a concatenar tags dentro do SELECT.
            - Para muitos registros, use paginação e *Lazy Loading*; para edição, migre para Interactive Grid.
        `
    },
    en: {
        titulo: 'Classic Report',
        resumo: 'The simplest, most predictable APEX report: a SQL query rendered with templates, links, pagination, breaks and downloads, with no end-user customization.',
        tags: ['classic report', 'report', 'HTML Expression', '#COLUMN#', 'pagination', 'lazy loading', 'template', 'refresh'],
        conteudo: `
            The **Classic Report** is the oldest and simplest APEX report region: you write a SQL query and APEX renders it as a
            table (or with another template), with pagination, optional sorting and links. It does not offer the end-user
            customizations of the [Interactive Report](#/topico/interactive-report), but in return it is lightweight,
            predictable and **fully controlled** by the developer.

            ## When to use it
            | Situation | Classic Report? |
            |---|---|
            | Simple read-only list with a controlled layout | Yes |
            | Report with a dedicated template (timeline, comments, value/attribute pairs) | Yes |
            | Users must filter, save views, group and download on their own | Prefer Interactive Report |
            | Editing many rows on screen | Prefer Interactive Grid |
            | Visual blocks with image, badge and actions | Prefer Cards |
            | Results filtered by Faceted Search or Smart Filters | Yes (it is one of the supported regions) |

            ## Data source
            In the *Source* group you define:
            - **Location**: local database, *REST Enabled SQL* or *REST Data Source*.
            - **Type**: *Table / View*, *SQL Query* or *Function Body returning SQL Query* (useful when the SQL must be built
              dynamically — always with bind variables).
            - **Page Items to Submit**: items used by the query that must reach session state when the region refreshes via AJAX.

            ~~~sql
            select o.id,
                   o.order_no,
                   c.name            as customer,
                   o.order_date,
                   o.total,
                   o.status
              from orders o
              join customers c on c.id = o.customer_id
             where (:P10_STATUS is null or o.status = :P10_STATUS)
               and o.order_date >= add_months(trunc(sysdate), -3)
            ~~~

            :::atencao Always use bind variables
            Use «:P10_STATUS», never «&P10_STATUS.» inside SQL. Textual substitution opens the door to SQL injection and
            prevents cursor reuse.
            :::

            ## Columns
            Each query column becomes a node under *Columns* in Page Designer, with its own **Type**:
            - **Plain Text** and **Plain Text (based on List of Values)** — the default. Keep *Escape special characters* on.
            - **Link** — renders a link per row. Use the *Page in this application* target and pass values with «#ID#»
              (APEX computes the URL checksum).
            - **Rich Text** (formerly *Markdown*, renamed in 21.1), **Percent Graph**, **Display Image**, **Download BLOB**
              and **Hidden Column**.

            A column **HTML Expression** accepts «#COLUMN#» and, since 22.2, **Template Directives**:

            ~~~html
            {case STATUS/}
              {when LATE/}<span class="u-danger-text">Late</span>
              {when DELIVERED/}<span class="u-success-text">Delivered</span>
              {otherwise/}<span>#STATUS#</span>
            {endcase/}
            ~~~

            ## Appearance, pagination and sorting
            - **Template** (*Appearance*): besides *Standard*, Universal Theme ships templates such as *Value Attribute Pairs*,
              *Badge List*, *Timeline*, *Comments* and *Media List*. For new rich layouts also consider
              [Template Components](#/topico/template-components) (23.1).
            - **Template Options**: stripes, borders, sticky header, table width and more.
            - **Pagination**: types such as *Row Ranges X to Y of Z*; *Maximum Rows to Process* caps how much is read.
            - **Lazy Loading** (since 21.1): the page opens first and the region loads right after — great for slow queries.
            - **Sorting**: mark columns as sortable and set the default order. To let users pick the order from a list, use the
              **Order By Item** (22.1).
            - **Break Formatting**: breaks on the first columns and per-column totals.

            ## Refreshing with a Dynamic Action
            Classic Reports are refreshable: create a *Change* dynamic action on «P10_STATUS» with a *Refresh* action on the
            region (and add «P10_STATUS» to *Page Items to Submit*). In JavaScript:

            ~~~js
            // "orders" is the region HTML DOM ID (called Static ID up to 24.2)
            apex.region( "orders" ).refresh();
            ~~~

            ## Export and print
            Enable *Printing* in the region attributes to offer CSV, HTML, PDF and Excel downloads — PDF and XLSX are generated
            natively since 20.2, with no print server. In PL/SQL, read the region data with «APEX_REGION.OPEN_QUERY_CONTEXT»
            or produce a file with «APEX_REGION.EXPORT_DATA». See [Printing and export](#/topico/impressao-e-exportacao).

            :::dica Classic Report + modern filters
            Combined with [Faceted Search or Smart Filters](#/topico/faceted-search-e-smart-filters), a Classic Report becomes a
            complete search page: filters are applied to the query automatically, without touching your SQL.
            :::

            ## Good practices
            - Select only the columns you display and filter in SQL, not with display conditions.
            - Build HTML in *HTML Expressions* (escaped) instead of concatenating tags inside the SELECT.
            - For large data sets use pagination and *Lazy Loading*; for editing, move to an Interactive Grid.
        `
    }
});

DOC.topico({
    id: 'interactive-report',
    cat: 'componentes',
    nivel: 'intermediario',
    desde: '3.1',
    links: [
        { t: 'App Builder Guide — Managing Interactive Reports', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-interactive-reports.html' },
        { t: 'Adding Natural Language Support to Interactive Reports (26.1)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/adding-natural-language-support-to-interactive-reports.html' },
        { t: 'APEX_IR (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_IR.html' }
    ],
    relacionados: ['classic-report', 'interactive-grid', 'select-ai-e-vetores', 'impressao-e-exportacao', 'apex-exec'],
    pt: {
        titulo: 'Interactive Report',
        resumo: 'Relatório em que o usuário filtra, ordena, agrupa, cria gráficos e salva visões; inclui APEX_IR, links com filtros e as novidades do 26.1 (Search with AI e Row Selector).',
        tags: ['interactive report', 'IR', 'relatório interativo', 'saved reports', 'actions menu', 'APEX_IR', 'NL2IR', 'Search with AI', 'Row Selector', 'filtro por URL'],
        conteudo: `
            O **Interactive Report** (IR), introduzido no APEX 3.1, é o relatório "self-service": você escreve uma consulta e o
            usuário final decide o que ver — filtros, ordenação, colunas, quebras, destaques, gráficos, agrupamentos, pivot e
            downloads — e ainda **salva** essas configurações como relatórios nomeados. Desde o 5.0 uma página pode ter
            vários IRs.

            ## Montando o relatório
            - **Source**: *Table / View* ou *SQL Query* (banco local, REST Enabled SQL ou REST Data Source).
            - **Columns**: tipos como *Plain Text*, *Plain Text (based on List of Values)*, *Link*, *Rich Text*,
              *Display Image*, *Percent Graph* e *Hidden Column*. Colunas aceitam HTML Expression com «#COLUNA#» e Template
              Directives (22.2).
            - **Link Column** (atributos da região): *Link to Single Row View*, *Link to Custom Target* (ex.: abrir o formulário
              de edição) ou *Exclude Link Column*.
            - **Search Bar** e **Actions Menu**: cada recurso pode ser ligado ou desligado individualmente.

            ~~~sql
            select p.id, p.numero, c.nome as cliente, p.vendedor,
                   p.data_pedido, p.status, p.total
              from pedidos p
              join clientes c on c.id = p.cliente_id
            ~~~

            :::dica Deixe a ordenação para o relatório
            Não dependa de ORDER BY no SQL: a ordenação vem das configurações do relatório (padrão ou do usuário). Defina a
            ordenação padrão salvando o relatório principal.
            :::

            ## O menu Actions
            | Opção | O que o usuário faz |
            |---|---|
            | Columns | Escolhe e reordena colunas visíveis |
            | Filter | Filtros por coluna ou por expressão de linha |
            | Data | Ordenação, agregações (soma, média...), colunas calculadas (Compute) e Flashback |
            | Format | Control Break, Highlight, linhas por página |
            | Chart / Group By / Pivot | Visões alternativas dos mesmos dados |
            | Report | Salvar, salvar como, redefinir |
            | Download / Subscription | Exportar (CSV, HTML, Excel, PDF) ou receber o relatório por e-mail periodicamente |

            ## Relatórios salvos
            | Tipo | Quem cria | Quem vê |
            |---|---|---|
            | Primary Default | Desenvolvedor (rodando a app) | Todos, como visão inicial |
            | Alternative | Desenvolvedor | Todos, na lista de relatórios |
            | Public | Usuário autorizado (*Save Public Report*) | Todos |
            | Private | Qualquer usuário | Só o autor |

            Cada relatório salvo pode ter um **Static ID**, usado em links e nas APIs.

            ## Links que aplicam filtros
            Pela URL você pode abrir um relatório salvo e aplicar filtros. Exemplos da documentação:

            ~~~texto
            /ords/r/empresa/vendas/pedidos?session=15332852263343&IR_STATUS=ABERTO
            f?p=&APP_ID.:1:&SESSION.:IR_REPORT_12345::RIR,CIR::RIR,CIR:IR_ENAME:KING
            ~~~

            Prefixos de operador: «IR_» (igual), «IRC_» (contém), «IRLT_», «IRGT_», «IRN_», «IRNN_», entre outros. Com vários IRs
            na página, qualifique pela região: «IR[pedidos]C_CLIENTE». No ClearCache, «RR» redefine e «CR» limpa o relatório.

            ## Controlando por PL/SQL: APEX_IR
            ~~~plsql
            -- Processo After Submit: aplica um filtro ao relatório "abertos" da região "pedidos"
            begin
                apex_ir.add_filter(
                    p_page_id          => 10,
                    p_region_static_id => 'pedidos',
                    p_report_column    => 'STATUS',
                    p_filter_value     => 'ABERTO',
                    p_operator_abbr    => 'EQ',
                    p_report_static_id => 'abertos' );
            end;
            ~~~

            O pacote também tem «RESET_REPORT», «CLEAR_REPORT», «DELETE_REPORT», «GET_LAST_VIEWED_REPORT_ID» e
            «CHANGE_REPORT_OWNER». A Oracle recomenda chamar «ADD_FILTER» em processos de submit, não na renderização.
            Para **ler os dados como o usuário os vê** (com os filtros dele), use «APEX_REGION.OPEN_QUERY_CONTEXT» — o antigo
            «APEX_IR.GET_REPORT» está deprecated.

            ~~~plsql
            declare
                l_ctx   apex_exec.t_context;
                l_total number := 0;
            begin
                l_ctx := apex_region.open_query_context(
                             p_page_id   => 10,
                             p_region_id => apex_region.get_id( p_page_id => 10, p_dom_static_id => 'pedidos' ) );
                while apex_exec.next_row( l_ctx ) loop
                    l_total := l_total + apex_exec.get_number( l_ctx, 'TOTAL' );
                end loop;
                apex_exec.close( l_ctx );
                :P10_TOTAL_FILTRADO := l_total;
            exception
                when others then
                    apex_exec.close( l_ctx );
                    raise;
            end;
            ~~~

            ## Novidades do 26.1
            :::novo Search with AI e Row Selector
            - **Linguagem natural (NL2IR)**: com um Generative AI Service selecionado nos *AI Attributes* da aplicação, ligue
              *Natural Language Support* na região. O *Default Search Mode* passa a ser **Search with AI** e o usuário digita
              pedidos como "mostre os pedidos atrasados de 2026, quebre por vendedor e destaque totais acima de 10 mil" — o LLM
              converte o texto em filtros, quebras, destaques, gráficos e pivots. Preencha *Report Context* e *Column Context*
              para melhorar a precisão.
            - **Row Selector**: novo tipo de coluna para seleção simples ou múltipla de linhas, com *Current Selection Page Item*
              (chaves primárias separadas por dois-pontos) e a nova interface JavaScript «interactiveReportRegion».
            - Também novos: atributo *CSS Classes* por coluna, *Maximum Rows to Display* e a Dynamic Action
              *Invoke Interactive Report Dialog*.
            :::

            ~~~js
            // 26.1: chaves das linhas selecionadas no IR "pedidos"
            var ids = apex.region( "pedidos" ).getSelectedValues();
            apex.item( "P10_IDS" ).setValue( ids.join( ":" ) );
            ~~~

            Antes do 26.1, a seleção de linhas exigia truques como «APEX_ITEM.CHECKBOX2» (API legada).
        `
    },
    en: {
        titulo: 'Interactive Report',
        resumo: 'A report users can filter, sort, group, chart and save themselves; covers APEX_IR, filter links and the 26.1 additions (Search with AI and Row Selector).',
        tags: ['interactive report', 'IR', 'saved reports', 'actions menu', 'APEX_IR', 'NL2IR', 'Search with AI', 'Row Selector', 'URL filter'],
        conteudo: `
            The **Interactive Report** (IR), introduced in APEX 3.1, is the "self-service" report: you write a query and the end
            user decides what to see — filters, sorting, columns, control breaks, highlights, charts, group by, pivot and
            downloads — and can **save** those settings as named reports. Since 5.0 a page can hold several IRs.

            ## Building the report
            - **Source**: *Table / View* or *SQL Query* (local database, REST Enabled SQL or REST Data Source).
            - **Columns**: types such as *Plain Text*, *Plain Text (based on List of Values)*, *Link*, *Rich Text*,
              *Display Image*, *Percent Graph* and *Hidden Column*. Columns accept an HTML Expression with «#COLUMN#» and
              Template Directives (22.2).
            - **Link Column** (region attributes): *Link to Single Row View*, *Link to Custom Target* (e.g. open the edit form)
              or *Exclude Link Column*.
            - **Search Bar** and **Actions Menu**: every feature can be switched on or off individually.

            ~~~sql
            select o.id, o.order_no, c.name as customer, o.sales_rep,
                   o.order_date, o.status, o.total
              from orders o
              join customers c on c.id = o.customer_id
            ~~~

            :::dica Let the report do the sorting
            Do not rely on ORDER BY in the SQL: sorting comes from the report settings (default or user-defined). Define the
            default order by saving the primary report.
            :::

            ## The Actions menu
            | Option | What the user does |
            |---|---|
            | Columns | Picks and reorders visible columns |
            | Filter | Column filters or row expression filters |
            | Data | Sort, aggregates (sum, average...), computed columns (Compute) and Flashback |
            | Format | Control Break, Highlight, rows per page |
            | Chart / Group By / Pivot | Alternative views of the same data |
            | Report | Save, save as, reset |
            | Download / Subscription | Export (CSV, HTML, Excel, PDF) or receive the report by e-mail periodically |

            ## Saved reports
            | Type | Created by | Seen by |
            |---|---|---|
            | Primary Default | Developer (running the app) | Everyone, as the initial view |
            | Alternative | Developer | Everyone, in the report list |
            | Public | Authorized user (*Save Public Report*) | Everyone |
            | Private | Any user | Only the author |

            Each saved report can have a **Static ID**, used by links and APIs.

            ## Links that apply filters
            Through the URL you can open a saved report and apply filters. Examples from the documentation:

            ~~~texto
            /ords/r/company/sales/orders?session=15332852263343&IR_STATUS=OPEN
            f?p=&APP_ID.:1:&SESSION.:IR_REPORT_12345::RIR,CIR::RIR,CIR:IR_ENAME:KING
            ~~~

            Operator prefixes: «IR_» (equals), «IRC_» (contains), «IRLT_», «IRGT_», «IRN_», «IRNN_» and more. With several IRs on
            the page, qualify by region: «IR[orders]C_CUSTOMER». In ClearCache, «RR» resets and «CR» clears the report.

            ## Controlling it from PL/SQL: APEX_IR
            ~~~plsql
            -- After Submit process: applies a filter to the "open" report of region "orders"
            begin
                apex_ir.add_filter(
                    p_page_id          => 10,
                    p_region_static_id => 'orders',
                    p_report_column    => 'STATUS',
                    p_filter_value     => 'OPEN',
                    p_operator_abbr    => 'EQ',
                    p_report_static_id => 'open' );
            end;
            ~~~

            The package also has «RESET_REPORT», «CLEAR_REPORT», «DELETE_REPORT», «GET_LAST_VIEWED_REPORT_ID» and
            «CHANGE_REPORT_OWNER». Oracle recommends calling «ADD_FILTER» in submit processes, not during rendering.
            To **read the data the way the user sees it** (with their filters), use «APEX_REGION.OPEN_QUERY_CONTEXT» — the old
            «APEX_IR.GET_REPORT» is deprecated.

            ~~~plsql
            declare
                l_ctx   apex_exec.t_context;
                l_total number := 0;
            begin
                l_ctx := apex_region.open_query_context(
                             p_page_id   => 10,
                             p_region_id => apex_region.get_id( p_page_id => 10, p_dom_static_id => 'orders' ) );
                while apex_exec.next_row( l_ctx ) loop
                    l_total := l_total + apex_exec.get_number( l_ctx, 'TOTAL' );
                end loop;
                apex_exec.close( l_ctx );
                :P10_FILTERED_TOTAL := l_total;
            exception
                when others then
                    apex_exec.close( l_ctx );
                    raise;
            end;
            ~~~

            ## What is new in 26.1
            :::novo Search with AI and Row Selector
            - **Natural language (NL2IR)**: with a Generative AI Service selected in the application *AI Attributes*, turn on
              *Natural Language Support* in the region. The *Default Search Mode* becomes **Search with AI** and users type
              requests such as "show late orders from 2026, break by sales rep and highlight totals above 10k" — the LLM turns
              the text into filters, breaks, highlights, charts and pivots. Fill in *Report Context* and *Column Context* to
              improve accuracy.
            - **Row Selector**: a new column type for single or multiple row selection, with a *Current Selection Page Item*
              (colon-separated primary keys) and the new «interactiveReportRegion» JavaScript interface.
            - Also new: a *CSS Classes* column attribute, *Maximum Rows to Display* and the *Invoke Interactive Report Dialog*
              dynamic action.
            :::

            ~~~js
            // 26.1: keys of the selected rows in IR "orders"
            var ids = apex.region( "orders" ).getSelectedValues();
            apex.item( "P10_IDS" ).setValue( ids.join( ":" ) );
            ~~~

            Before 26.1, row selection required tricks such as «APEX_ITEM.CHECKBOX2» (a legacy API).
        `
    }
});

DOC.topico({
    id: 'interactive-grid',
    cat: 'componentes',
    nivel: 'avancado',
    desde: '5.1',
    links: [
        { t: 'App Builder Guide — Managing Interactive Grids', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-interactive-grids.html' },
        { t: 'JavaScript API — interactiveGrid widget', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/interactiveGrid.html' },
        { t: 'APEX_IG (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_IG.html' }
    ],
    relacionados: ['mestre-detalhe', 'interactive-report', 'javascript-api', 'processos-computacoes-validacoes', 'formularios'],
    pt: {
        titulo: 'Interactive Grid',
        resumo: 'A grade editável do APEX: Automatic Row Processing, chave primária, seleção e model em JavaScript, salvar por código, toolbar customizada e APEX_IG.',
        tags: ['interactive grid', 'IG', 'grade editável', 'tabular form', 'Automatic Row Processing', 'APEX$ROW_STATUS', 'getSelectedRecords', 'model', 'toolbar', 'APEX_IG', 'copiar e colar'],
        conteudo: `
            O **Interactive Grid** (IG), lançado no APEX 5.1, substituiu os antigos *tabular forms*. Ele reúne os recursos de
            relatório do Interactive Report (filtros, ordenação, agregações, gráfico, relatórios salvos) com **edição de várias
            linhas** direto na tela, colunas congeladas, redimensionamento por arrastar e paginação por rolagem. Por baixo há
            um widget JavaScript completo com seu próprio **modelo de dados** («apex.model»).

            ## Tornando a grade editável
            Em *Attributes → Edit*:
            - **Enabled** = On — o APEX cria automaticamente o processo *Interactive Grid - Automatic Row Processing (DML)*.
            - **Allowed Operations**: *Add Row*, *Update Row*, *Delete Row*.
            - **Allowed Row Operations Column**: coluna cujo valor diz, linha a linha, se ela pode ser alterada («U»), excluída
              («D») ou ambos («UD»).
            - **Lost Update Type**: *Row Values* (checksum das colunas) ou *Row Version Column*.
            - **Add Row If Empty**: começa com uma linha vazia em vez de "No data found".

            :::atencao Chave primária é obrigatória na prática
            Marque a coluna de chave com **Source → Primary Key = On**. Sem ela o APEX usa o «ROWID», o que não funciona com
            views complexas nem com REST. Em master-detail, a chave também liga a grade filha ao registro pai.
            :::

            ~~~sql
            select empno, ename, job, sal, deptno,
                   case when status = 'FECHADO' then null else 'UD' end as ops_permitidas
              from emp
            ~~~

            ## Automatic Row Processing e DML customizado
            O processo de DML roda **uma vez por linha alterada**, tanto no botão *Save* da grade (AJAX) quanto no submit da
            página. Em *Settings → Target Type* escolha *Region Source*, *Table / View* ou *PL/SQL Code*. No modo PL/SQL você
            usa as colunas como bind variables e «:APEX$ROW_STATUS» («C», «U» ou «D»):

            ~~~plsql
            begin
                case :APEX$ROW_STATUS
                    when 'C' then
                        insert into emp (empno, ename, job, sal, deptno)
                        values (emp_seq.nextval, :ENAME, :JOB, :SAL, :DEPTNO)
                        returning empno into :EMPNO;   -- devolve a nova chave para a grade
                    when 'U' then
                        update emp
                           set ename = :ENAME, job = :JOB, sal = :SAL, deptno = :DEPTNO
                         where empno = :EMPNO;
                    when 'D' then
                        delete from emp where empno = :EMPNO;
                end case;
            end;
            ~~~

            Validações associadas à região editável (*Editable Region*) também rodam por linha e podem referenciar «:SAL»,
            «:DEPTNO» etc. Veja [Processos, computações e validações](#/topico/processos-computacoes-validacoes).

            ## JavaScript: seleção e modelo
            Defina o **HTML DOM ID** da região (chamado *Static ID* até o 24.2), por exemplo «emp». A partir daí:

            ~~~js
            // Registros selecionados na visão grid
            var view    = apex.region( "emp" ).widget().interactiveGrid( "getViews", "grid" ),
                model   = view.model,
                records = view.getSelectedRecords(),
                ids     = [];

            records.forEach( function( record ) {
                ids.push( model.getValue( record, "EMPNO" ) );
            } );
            apex.item( "P1_EMPNOS" ).setValue( ids.join( ":" ) );

            // Alterar valores pelo modelo (o servidor espera strings)
            model.forEach( function( record ) {
                if ( model.getValue( record, "JOB" ) === "CLERK" ) {
                    model.setValue( record, "SAL", "1500" );
                }
            } );

            // Salvar as alterações sem submit, como o botão Save
            apex.region( "emp" ).widget().interactiveGrid( "getActions" ).invoke( "save" );
            ~~~

            | Necessidade | Chamada |
            |---|---|
            | Visão atual | «interactiveGrid('getCurrentView')» |
            | Registros selecionados | «interactiveGrid('getSelectedRecords')» ou «view.getSelectedRecords()» |
            | Selecionar por código | «interactiveGrid('setSelectedRecords', registros)» |
            | Há alterações pendentes? | «model.isChanged()» |
            | Inserir linha | «model.insertNewRecord()» ou a ação «selection-add-row» |
            | Recarregar do servidor | «apex.region('emp').refresh()» |
            | Ações (save, edit, reset-report...) | «interactiveGrid('getActions').invoke(nome)» |

            «apex.region('emp').call('getActions')» é um atalho equivalente para chamar métodos do widget. Para reagir à
            seleção sem código, use a Dynamic Action **Selection Change [Interactive Grid]** — em JavaScript, «this.data»
            traz «selectedRecords» e «model». Outros eventos úteis: *Row Initialization* e *Save*.

            :::atencao Valores de LOV e registros fora da página
            Colunas com lista de valores podem guardar no modelo um par de valor e exibição; confira o tipo antes de comparar.
            E «model.forEach» só percorre registros **já carregados** — com paginação por rolagem, nem tudo está no navegador.
            :::

            ## Customizando a toolbar
            No atributo **JavaScript Initialization Code** da região:

            ~~~js
            function( options ) {
                var $ = apex.jQuery,
                    toolbarData = $.apex.interactiveGrid.copyDefaultToolbar(),
                    grupo = toolbarData.toolbarFind( "actions3" );   // grupo do botão Add Row

                grupo.controls.push( {
                    type: "BUTTON",
                    action: "aprovar-selecionados",
                    iconBeforeLabel: true,
                    hot: true
                } );
                options.toolbarData = toolbarData;

                options.initActions = function( actions ) {
                    actions.hide( "show-help-dialog" );
                    actions.add( {
                        name: "aprovar-selecionados",
                        label: "Aprovar",
                        icon: "fa fa-check",
                        action: function( event, focusElement ) {
                            apex.event.trigger( "#emp", "aprovar-selecionados" );
                        }
                    } );
                };
                return options;
            }
            ~~~

            Os grupos padrão são «search», «reports», «views», «actions1» (menu Actions), «actions2» (Edit/Save), «actions3»
            (Add Row) e «actions4» (Reset). O evento customizado pode disparar uma Dynamic Action do tipo *Custom*.

            ## Relatórios salvos e APEX_IG
            Como no IR, existem relatórios *Primary*, *Alternative*, *Public* e *Private*; desde o 20.2 links e APIs usam o
            **Static ID do relatório salvo**. Filtros via URL seguem o padrão «IG[emp]C_ENAME:KING» ou, com uma só grade,
            «IG_ENAME:KING».

            ~~~plsql
            begin
                apex_ig.add_filter(
                    p_page_id          => 1,
                    p_region_static_id => 'emp',
                    p_column_name      => 'DEPTNO',
                    p_operator_abbr    => 'EQ',
                    p_filter_value     => '30',
                    p_report_static_id => 'por_depto' );
            end;
            ~~~

            «APEX_IG» também oferece «RESET_REPORT», «CLEAR_REPORT», «DELETE_REPORT», «CHANGE_REPORT_OWNER» e
            «GET_LAST_VIEWED_REPORT_ID».

            :::novo Copiar, recortar e colar (26.1)
            Grades editáveis ganharam **Copy**, **Cut**, **Paste** e **Paste Insert**, inclusive arrastando faixas de células de
            uma planilha. Exige URL **https**, permissão de área de transferência no navegador e funciona fora do modo de edição
            de célula. O widget «grid» ganhou «getSelectedRanges» e as opções «allowCut» e «allowPaste».
            :::
        `
    },
    en: {
        titulo: 'Interactive Grid',
        resumo: 'The APEX editable grid: Automatic Row Processing, primary keys, selection and model in JavaScript, saving from code, custom toolbar and APEX_IG.',
        tags: ['interactive grid', 'IG', 'editable grid', 'tabular form', 'Automatic Row Processing', 'APEX$ROW_STATUS', 'getSelectedRecords', 'model', 'toolbar', 'APEX_IG', 'copy paste'],
        conteudo: `
            The **Interactive Grid** (IG), released in APEX 5.1, replaced the old *tabular forms*. It combines the reporting
            features of the Interactive Report (filters, sorting, aggregates, chart, saved reports) with **multi-row editing**
            on screen, frozen columns, drag-to-resize and scroll pagination. Underneath is a full JavaScript widget with its own
            **data model** («apex.model»).

            ## Making the grid editable
            Under *Attributes → Edit*:
            - **Enabled** = On — APEX automatically creates the *Interactive Grid - Automatic Row Processing (DML)* process.
            - **Allowed Operations**: *Add Row*, *Update Row*, *Delete Row*.
            - **Allowed Row Operations Column**: a column whose value tells, row by row, whether it can be updated («U»),
              deleted («D») or both («UD»).
            - **Lost Update Type**: *Row Values* (column checksum) or *Row Version Column*.
            - **Add Row If Empty**: start with an empty row instead of "No data found".

            :::atencao A primary key is required in practice
            Flag the key column with **Source → Primary Key = On**. Without it APEX falls back to «ROWID», which does not work
            with complex views or REST sources. In master-detail, the key also links the child grid to the parent record.
            :::

            ~~~sql
            select empno, ename, job, sal, deptno,
                   case when status = 'CLOSED' then null else 'UD' end as allowed_ops
              from emp
            ~~~

            ## Automatic Row Processing and custom DML
            The DML process runs **once per changed row**, both for the grid *Save* button (AJAX) and for a page submit. Under
            *Settings → Target Type* choose *Region Source*, *Table / View* or *PL/SQL Code*. In PL/SQL mode you use the
            columns as bind variables plus «:APEX$ROW_STATUS» («C», «U» or «D»):

            ~~~plsql
            begin
                case :APEX$ROW_STATUS
                    when 'C' then
                        insert into emp (empno, ename, job, sal, deptno)
                        values (emp_seq.nextval, :ENAME, :JOB, :SAL, :DEPTNO)
                        returning empno into :EMPNO;   -- returns the new key to the grid
                    when 'U' then
                        update emp
                           set ename = :ENAME, job = :JOB, sal = :SAL, deptno = :DEPTNO
                         where empno = :EMPNO;
                    when 'D' then
                        delete from emp where empno = :EMPNO;
                end case;
            end;
            ~~~

            Validations tied to the *Editable Region* also run per row and can reference «:SAL», «:DEPTNO» and so on. See
            [Processes, computations and validations](#/topico/processos-computacoes-validacoes).

            ## JavaScript: selection and model
            Give the region an **HTML DOM ID** (called *Static ID* up to 24.2), for example «emp». Then:

            ~~~js
            // Selected records in the grid view
            var view    = apex.region( "emp" ).widget().interactiveGrid( "getViews", "grid" ),
                model   = view.model,
                records = view.getSelectedRecords(),
                ids     = [];

            records.forEach( function( record ) {
                ids.push( model.getValue( record, "EMPNO" ) );
            } );
            apex.item( "P1_EMPNOS" ).setValue( ids.join( ":" ) );

            // Change values through the model (the server expects strings)
            model.forEach( function( record ) {
                if ( model.getValue( record, "JOB" ) === "CLERK" ) {
                    model.setValue( record, "SAL", "1500" );
                }
            } );

            // Save the changes without a page submit, like the Save button
            apex.region( "emp" ).widget().interactiveGrid( "getActions" ).invoke( "save" );
            ~~~

            | Need | Call |
            |---|---|
            | Current view | «interactiveGrid('getCurrentView')» |
            | Selected records | «interactiveGrid('getSelectedRecords')» or «view.getSelectedRecords()» |
            | Select from code | «interactiveGrid('setSelectedRecords', records)» |
            | Any pending changes? | «model.isChanged()» |
            | Insert a row | «model.insertNewRecord()» or the «selection-add-row» action |
            | Reload from the server | «apex.region('emp').refresh()» |
            | Actions (save, edit, reset-report...) | «interactiveGrid('getActions').invoke(name)» |

            «apex.region('emp').call('getActions')» is an equivalent shortcut for calling widget methods. To react to selection
            without code, use the **Selection Change [Interactive Grid]** dynamic action — in JavaScript, «this.data» holds
            «selectedRecords» and «model». Other useful events: *Row Initialization* and *Save*.

            :::atencao LOV values and records outside the page
            Columns with a list of values may store a value/display pair in the model; check the type before comparing.
            And «model.forEach» only visits records **already loaded** — with scroll pagination, not everything is in the browser.
            :::

            ## Customizing the toolbar
            In the region **JavaScript Initialization Code** attribute:

            ~~~js
            function( options ) {
                var $ = apex.jQuery,
                    toolbarData = $.apex.interactiveGrid.copyDefaultToolbar(),
                    group = toolbarData.toolbarFind( "actions3" );   // Add Row button group

                group.controls.push( {
                    type: "BUTTON",
                    action: "approve-selected",
                    iconBeforeLabel: true,
                    hot: true
                } );
                options.toolbarData = toolbarData;

                options.initActions = function( actions ) {
                    actions.hide( "show-help-dialog" );
                    actions.add( {
                        name: "approve-selected",
                        label: "Approve",
                        icon: "fa fa-check",
                        action: function( event, focusElement ) {
                            apex.event.trigger( "#emp", "approve-selected" );
                        }
                    } );
                };
                return options;
            }
            ~~~

            The default groups are «search», «reports», «views», «actions1» (Actions menu), «actions2» (Edit/Save), «actions3»
            (Add Row) and «actions4» (Reset). The custom event can fire a *Custom* dynamic action.

            ## Saved reports and APEX_IG
            As in the IR there are *Primary*, *Alternative*, *Public* and *Private* reports; since 20.2 links and APIs use the
            **saved report Static ID**. URL filters follow the pattern «IG[emp]C_ENAME:KING» or, with a single grid,
            «IG_ENAME:KING».

            ~~~plsql
            begin
                apex_ig.add_filter(
                    p_page_id          => 1,
                    p_region_static_id => 'emp',
                    p_column_name      => 'DEPTNO',
                    p_operator_abbr    => 'EQ',
                    p_filter_value     => '30',
                    p_report_static_id => 'by_dept' );
            end;
            ~~~

            «APEX_IG» also offers «RESET_REPORT», «CLEAR_REPORT», «DELETE_REPORT», «CHANGE_REPORT_OWNER» and
            «GET_LAST_VIEWED_REPORT_ID».

            :::novo Copy, cut and paste (26.1)
            Editable grids gained **Copy**, **Cut**, **Paste** and **Paste Insert**, including dragging cell ranges from a
            spreadsheet. It requires an **https** URL, clipboard permission in the browser and works outside cell edit mode.
            The «grid» widget gained «getSelectedRanges» and the «allowCut» and «allowPaste» options.
            :::
        `
    }
});

DOC.topico({
    id: 'cards',
    cat: 'componentes',
    nivel: 'basico',
    desde: '20.2',
    links: [
        { t: 'App Builder Guide — Managing Cards', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-cards.html' },
        { t: 'Using Actions to Link from a Cards Page', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-actions-to-link-from-cards-page.html' },
        { t: 'JavaScript API — cardsRegion', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/cardsRegion.html' }
    ],
    relacionados: ['classic-report', 'template-components', 'template-directives', 'faceted-search-e-smart-filters', 'dynamic-actions'],
    pt: {
        titulo: 'Região Cards',
        resumo: 'Relatório em blocos visuais (cards) com título, corpo, ícone, badge, mídia e ações declarativas — ideal para catálogos, painéis e telas de busca.',
        tags: ['cards', 'cartões', 'card region', 'media', 'badge', 'actions', 'cardsRegion', 'Order By Item', 'template directives', 'grid layout'],
        conteudo: `
            A região **Cards**, introduzida no APEX 20.2, é um relatório leve que mostra cada linha da consulta como um
            **cartão**: título, subtítulo, corpo, ícone ou iniciais, badge, imagem e botões de ação — tudo declarativo, sem
            escrever HTML. É a escolha natural para catálogos de produtos, listas de projetos, galerias e resultados de busca.

            ## Estrutura de um card
            | Grupo de atributos | Para que serve |
            |---|---|
            | Appearance | **Layout**: *Grid*, *Float* ou *Horizontal (Row)*; número de colunas da grade |
            | Card | **Primary Key Column 1/2** (usadas por ações, seleção e JavaScript) |
            | Title / Subtitle | Colunas de título e subtítulo |
            | Body / Secondary Body | Texto principal e secundário |
            | Icon and Badge | Ícone (classe Font APEX, iniciais ou imagem) e um badge com rótulo |
            | Media | Imagem: **Source** *Image URL*, *BLOB Column* ou *URL Column*; **Position** *First*, *Body* ou *Background* |

            Title, Subtitle, Body e Secondary Body aceitam **Advanced Formatting**: em vez de uma coluna, você escreve uma
            *HTML Expression* com substituições «&COLUNA.» e Template Directives.

            ## Exemplo: catálogo de produtos
            ~~~sql
            select p.id,
                   p.nome,
                   p.categoria,
                   p.descricao,
                   to_char(p.preco, 'FM999G999G990D00') as preco_fmt,
                   p.foto_url,
                   case when p.estoque = 0 then 'Esgotado' end as badge,
                   case when p.estoque < 5 then 'BAIXO' else 'OK' end as nivel_estoque
              from produtos p
             where p.ativo = 'S'
            ~~~

            Mapeie *Title* → «NOME», *Subtitle* → «CATEGORIA», *Media* → «FOTO_URL» (Source *URL Column*) e o badge → «BADGE».
            No *Body*, ligue *Advanced Formatting*:

            ~~~html
            <p>&DESCRICAO.</p>
            <strong>R$ &PRECO_FMT.</strong>
            {case NIVEL_ESTOQUE/}
              {when BAIXO/}<span class="u-warning-text">Últimas unidades</span>
            {endcase/}
            ~~~

            :::dica Escape e segurança
            O APEX já procura escapar automaticamente as substituições «&COLUNA.» conforme o contexto; para controle fino use
            filtros como «&COLUNA!HTML.» e «&COLUNA!ATTR.» (e «!RAW» só com conteúdo confiável). Evite montar HTML no SELECT —
            prefira as HTML Expressions com Template Directives.
            :::

            ## Ações
            Em **Actions** (nó abaixo da região) você adiciona:
            - **Full Card** — o cartão inteiro vira link;
            - **Title**, **Subtitle** ou **Media** — só aquela parte é clicável;
            - **Button** — um ou mais botões no rodapé do card.

            Cada ação tem *Link Type* (*Redirect to Page in this Application*, *Redirect to Page in a different Application*,
            *Redirect to URL*) e *Set Items* com valores como «&ID.». Condições de servidor por ação podem ser avaliadas
            *For Each Row* — por exemplo, mostrar o botão "Aprovar" só nos cards pendentes.

            :::novo Trigger Actions (26.1)
            Ações de Cards (e botões, menus e ações de outras regiões) podem disparar **Dynamic Actions declaradas na árvore do
            Page Designer**. Para usar valores da linha, ligue *Available on Client* na coluna e leia com «$v('NOME_COLUNA')» em
            JavaScript ou «&NOME_COLUNA.» nas novas ações de mensagem de sucesso/erro.
            :::

            ## Paginação, ordenação e filtros
            - **Pagination**: por página ou por rolagem (*scroll*), com rolagem virtual desde o 21.1.
            - **Ordenação**: Cards não têm cabeçalho para clicar; use o item **Order By Item** (22.1), que lista as ordenações e
              atualiza a região automaticamente.
            - **Filtros**: Cards é uma das regiões suportadas por [Faceted Search e Smart Filters](#/topico/faceted-search-e-smart-filters).
            - **Lazy loading** e *Page Items to Submit* funcionam como nos demais relatórios.

            ## JavaScript
            Desde o 24.1 a interface «cardsRegion» documenta métodos como «refresh», «gotoPage», «nextPage», «loadMore»,
            «getModel» e métodos de item corrente e seleção. A região também ganhou, no 22.1, o atributo **JavaScript
            Initialization Code** para customizações avançadas.

            ~~~js
            // Recarrega os cards depois de salvar um diálogo
            apex.region( "produtos" ).refresh();
            ~~~

            ## Cards ou Template Components?
            Para listas mais compactas (linha com avatar, título e badge), os [Template Components](#/topico/template-components)
            *Content Row* e *Media List* (23.1) costumam ser melhores. Cards brilha quando a mídia e as ações são o foco.
        `
    },
    en: {
        titulo: 'Cards region',
        resumo: 'A report rendered as visual blocks (cards) with title, body, icon, badge, media and declarative actions — ideal for catalogs, dashboards and search pages.',
        tags: ['cards', 'card region', 'media', 'badge', 'actions', 'cardsRegion', 'Order By Item', 'template directives', 'grid layout'],
        conteudo: `
            The **Cards** region, introduced in APEX 20.2, is a lightweight report that shows each query row as a **card**:
            title, subtitle, body, icon or initials, badge, image and action buttons — all declarative, with no HTML to write.
            It is the natural choice for product catalogs, project lists, galleries and search results.

            ## Anatomy of a card
            | Attribute group | Purpose |
            |---|---|
            | Appearance | **Layout**: *Grid*, *Float* or *Horizontal (Row)*; number of grid columns |
            | Card | **Primary Key Column 1/2** (used by actions, selection and JavaScript) |
            | Title / Subtitle | Title and subtitle columns |
            | Body / Secondary Body | Main and secondary text |
            | Icon and Badge | Icon (Font APEX class, initials or image) and a labeled badge |
            | Media | Image: **Source** *Image URL*, *BLOB Column* or *URL Column*; **Position** *First*, *Body* or *Background* |

            Title, Subtitle, Body and Secondary Body support **Advanced Formatting**: instead of a column you write an
            *HTML Expression* with «&COLUMN.» substitutions and Template Directives.

            ## Example: product catalog
            ~~~sql
            select p.id,
                   p.name,
                   p.category,
                   p.description,
                   to_char(p.price, 'FM999G999G990D00') as price_fmt,
                   p.photo_url,
                   case when p.stock = 0 then 'Sold out' end as badge,
                   case when p.stock < 5 then 'LOW' else 'OK' end as stock_level
              from products p
             where p.active = 'Y'
            ~~~

            Map *Title* → «NAME», *Subtitle* → «CATEGORY», *Media* → «PHOTO_URL» (Source *URL Column*) and the badge → «BADGE».
            In *Body*, turn on *Advanced Formatting*:

            ~~~html
            <p>&DESCRIPTION.</p>
            <strong>$ &PRICE_FMT.</strong>
            {case STOCK_LEVEL/}
              {when LOW/}<span class="u-warning-text">Only a few left</span>
            {endcase/}
            ~~~

            :::dica Escaping and security
            APEX already tries to escape «&COLUMN.» substitutions automatically according to the context; for fine-grained
            control use filters such as «&COLUMN!HTML.» and «&COLUMN!ATTR.» (and «!RAW» only for trusted content). Avoid
            building HTML in the SELECT — prefer HTML Expressions with Template Directives.
            :::

            ## Actions
            Under **Actions** (a node below the region) you add:
            - **Full Card** — the whole card becomes a link;
            - **Title**, **Subtitle** or **Media** — only that part is clickable;
            - **Button** — one or more buttons in the card footer.

            Each action has a *Link Type* (*Redirect to Page in this Application*, *Redirect to Page in a different Application*,
            *Redirect to URL*) and *Set Items* with values such as «&ID.». Server-side conditions per action can be evaluated
            *For Each Row* — for example, showing the "Approve" button only on pending cards.

            :::novo Trigger Actions (26.1)
            Card actions (and buttons, menus and actions of other regions) can fire **Dynamic Actions declared in the Page
            Designer tree**. To use row values, turn on *Available on Client* for the column and read it with
            «$v('COLUMN_NAME')» in JavaScript or «&COLUMN_NAME.» in the new success/error message actions.
            :::

            ## Pagination, sorting and filters
            - **Pagination**: by page or by *scroll*, with virtual scrolling since 21.1.
            - **Sorting**: cards have no clickable header; use the **Order By Item** (22.1), which lists the sort options and
              refreshes the region automatically.
            - **Filters**: Cards is one of the regions supported by [Faceted Search and Smart Filters](#/topico/faceted-search-e-smart-filters).
            - **Lazy loading** and *Page Items to Submit* work as in other reports.

            ## JavaScript
            Since 24.1 the «cardsRegion» interface documents methods such as «refresh», «gotoPage», «nextPage», «loadMore»,
            «getModel» plus current-item and selection methods. In 22.1 the region also gained the **JavaScript Initialization
            Code** attribute for advanced customization.

            ~~~js
            // Reload the cards after a dialog saves data
            apex.region( "products" ).refresh();
            ~~~

            ## Cards or Template Components?
            For more compact lists (a row with avatar, title and badge), the [Template Components](#/topico/template-components)
            *Content Row* and *Media List* (23.1) are often a better fit. Cards shine when media and actions are the focus.
        `
    }
});

DOC.topico({
    id: 'charts',
    cat: 'componentes',
    nivel: 'intermediario',
    desde: '5.1',
    links: [
        { t: 'App Builder Guide — Creating Charts', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-charts.html' },
        { t: 'App Builder Guide — Editing Charts', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/editing-charts.html' }
    ],
    relacionados: ['interactive-report', 'faceted-search-e-smart-filters', 'dynamic-actions', 'javascript-api', 'classic-report'],
    pt: {
        titulo: 'Gráficos (Oracle JET charts)',
        resumo: 'A região Chart: tipos de gráfico, séries com SQL de label e value, várias séries, drill-down por link, refresh dinâmico e customização via JavaScript.',
        tags: ['chart', 'gráfico', 'Oracle JET', 'série', 'series', 'label', 'value', 'drill-down', 'barra', 'pizza', 'linha', 'gantt', 'dataFilter'],
        conteudo: `
            Desde o APEX 5.1 a região **Chart** usa as visualizações do **Oracle JET** (JavaScript Extension Toolkit), que
            substituíram os antigos gráficos AnyChart em Flash (desuportados no 21.1). O APEX 26.1 traz o Oracle JET 20.0.2.
            Os gráficos são HTML5/SVG, responsivos, acessíveis e animados.

            ## Tipos disponíveis
            Area, Bar, Box Plot, Bubble, Combination, Donut, Funnel, Gantt, Line, Line with Area, Pie, Polar, Pyramid, Radar,
            Scatter, Status Meter Gauge e Stock.

            ## Como um gráfico é montado
            Um gráfico tem três níveis de atributos:
            1. **Region** — título, template, condições.
            2. **Attributes** (o gráfico) — *Type*, orientação, empilhamento, legenda, zoom e rolagem, animação,
               *Automatic Refresh* e *JavaScript Initialization Code*.
            3. **Series** — nós abaixo da região, cada um com sua **fonte de dados** e o **Column Mapping**.

            O mapeamento depende do tipo: barras, linhas e pizza usam **Label** e **Value**; Scatter usa X e Y; Bubble adiciona
            o tamanho; séries de faixa (range) usam valores baixo/alto; Gantt usa tarefa, início e fim; Stock usa abertura, máxima, mínima e
            fechamento.

            ## Exemplo: vendas por departamento com drill-down
            ~~~sql
            select d.dname        as label,
                   sum(e.sal)     as value,
                   d.deptno
              from emp e
              join dept d on d.deptno = e.deptno
             where (:P5_JOB is null or e.job = :P5_JOB)
             group by d.dname, d.deptno
             order by value desc
            ~~~

            - *Column Mapping*: **Label** = «LABEL», **Value** = «VALUE».
            - *Page Items to Submit* (na série): «P5_JOB».
            - *Link*: tipo *Redirect to Page in this Application*, página 6, *Set Items* «P6_DEPTNO» = «&DEPTNO.» — ao clicar
              na barra o usuário abre o detalhe do departamento.

            ## Várias séries
            - Crie **mais de uma série** sob a região (ex.: "Meta" e "Realizado"), cada uma com seu SQL, usando os mesmos
              labels para que os valores se alinhem.
            - Em gráficos *Combination*, cada série escolhe seu **Type** (barra, linha, área...).
            - Para gerar séries dinamicamente a partir de uma única consulta, há o mapeamento de coluna **Series Name** — cada
              valor distinto vira uma série.

            :::dica Labels iguais em todas as séries
            O JET agrupa os pontos pelo label. Se uma série não tiver valor para um label, o ponto fica vazio; se os labels
            vierem em ordem diferente, o eixo pode ficar embaralhado. Garanta a mesma lista e a mesma ordenação.
            :::

            ## Atualização dinâmica
            O gráfico é refrescável: uma Dynamic Action *Change* em «P5_JOB» com a ação *Refresh* na região redesenha os dados.
            Para painéis, *Automatic Refresh* define um intervalo em segundos.

            ~~~js
            apex.region( "grafico-vendas" ).refresh();
            ~~~

            ## Customização por JavaScript
            O atributo **JavaScript Initialization Code** recebe as opções do JET antes da criação do gráfico. O exemplo
            abaixo, baseado na documentação, altera a cor da primeira série quando os dados chegam e oculta a legenda:

            ~~~js
            function( options ) {
                options.dataFilter = function( data ) {
                    data.series[ 0 ].color = "#C74634";
                    return data;
                };
                options.legend = { rendered: "off" };
                return options;
            }
            ~~~

            Qualquer propriedade do componente ojChart pode ser ajustada assim — consulte o JSDoc do Oracle JET para a versão
            que acompanha a sua instância.

            ## Outros lugares com gráficos
            - **Interactive Report** e **Interactive Grid** têm visão *Chart* criada pelo próprio usuário.
            - **Faceted Search** mostra gráficos de contagem por faceta (20.2); no 26.1 eles ganharam a opção *Maximize*.

            :::atencao Volume de dados
            Gráficos devem receber dados **agregados**. Mandar milhares de pontos para o navegador deixa a página lenta e o
            gráfico ilegível — agrupe no SQL (GROUP BY, TRUNC de datas) e limite a quantidade de linhas.
            :::
        `
    },
    en: {
        titulo: 'Charts (Oracle JET)',
        resumo: 'The Chart region: chart types, series with label/value SQL, multiple series, drill-down links, dynamic refresh and JavaScript customization.',
        tags: ['chart', 'Oracle JET', 'series', 'label', 'value', 'drill-down', 'bar', 'pie', 'line', 'gantt', 'dataFilter'],
        conteudo: `
            Since APEX 5.1 the **Chart** region uses **Oracle JET** (JavaScript Extension Toolkit) data visualizations, which
            replaced the old Flash-based AnyChart charts (desupported in 21.1). APEX 26.1 ships Oracle JET 20.0.2. Charts are
            HTML5/SVG, responsive, accessible and animated.

            ## Available types
            Area, Bar, Box Plot, Bubble, Combination, Donut, Funnel, Gantt, Line, Line with Area, Pie, Polar, Pyramid, Radar,
            Scatter, Status Meter Gauge and Stock.

            ## How a chart is built
            A chart has three levels of attributes:
            1. **Region** — title, template, conditions.
            2. **Attributes** (the chart) — *Type*, orientation, stacking, legend, zoom and scroll, animation,
               *Automatic Refresh* and *JavaScript Initialization Code*.
            3. **Series** — nodes below the region, each with its own **data source** and **Column Mapping**.

            The mapping depends on the type: bar, line and pie use **Label** and **Value**; Scatter uses X and Y; Bubble adds
            the size; range series use low/high values; Gantt uses task, start and end; Stock uses open, high, low and close.

            ## Example: sales by department with drill-down
            ~~~sql
            select d.dname        as label,
                   sum(e.sal)     as value,
                   d.deptno
              from emp e
              join dept d on d.deptno = e.deptno
             where (:P5_JOB is null or e.job = :P5_JOB)
             group by d.dname, d.deptno
             order by value desc
            ~~~

            - *Column Mapping*: **Label** = «LABEL», **Value** = «VALUE».
            - *Page Items to Submit* (on the series): «P5_JOB».
            - *Link*: type *Redirect to Page in this Application*, page 6, *Set Items* «P6_DEPTNO» = «&DEPTNO.» — clicking a
              bar opens the department detail.

            ## Multiple series
            - Create **more than one series** under the region (e.g. "Target" and "Actual"), each with its own SQL, using the
              same labels so the values line up.
            - In *Combination* charts each series picks its own **Type** (bar, line, area...).
            - To generate series dynamically from a single query there is the **Series Name** column mapping — each distinct
              value becomes a series.

            :::dica Same labels in every series
            JET groups points by label. If a series has no value for a label the point is empty; if labels arrive in a
            different order the axis may get scrambled. Make sure every series returns the same list in the same order.
            :::

            ## Dynamic refresh
            Charts are refreshable: a *Change* dynamic action on «P5_JOB» with a *Refresh* action on the region redraws the
            data. For dashboards, *Automatic Refresh* sets an interval in seconds.

            ~~~js
            apex.region( "sales-chart" ).refresh();
            ~~~

            ## JavaScript customization
            The **JavaScript Initialization Code** attribute receives the JET options before the chart is created. The
            example below, based on the documentation, changes the color of the first series when data arrives and hides
            the legend:

            ~~~js
            function( options ) {
                options.dataFilter = function( data ) {
                    data.series[ 0 ].color = "#C74634";
                    return data;
                };
                options.legend = { rendered: "off" };
                return options;
            }
            ~~~

            Any ojChart property can be tuned this way — check the Oracle JET JSDoc for the version shipped with your instance.

            ## Other places with charts
            - **Interactive Report** and **Interactive Grid** have a user-defined *Chart* view.
            - **Faceted Search** shows facet count charts (20.2); in 26.1 they gained a *Maximize* option.

            :::atencao Data volume
            Charts should receive **aggregated** data. Sending thousands of points to the browser makes the page slow and the
            chart unreadable — group in SQL (GROUP BY, TRUNC on dates) and limit the number of rows.
            :::
        `
    }
});

DOC.topico({
    id: 'map-region',
    cat: 'componentes',
    nivel: 'intermediario',
    desde: '21.1',
    links: [
        { t: 'App Builder Guide — Creating Maps', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-maps.html' },
        { t: 'App Builder Guide — Editing Maps', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/editing-maps.html' },
        { t: 'JavaScript API — mapRegion', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/mapRegion.html' }
    ],
    relacionados: ['faceted-search-e-smart-filters', 'itens-de-pagina', 'rest-data-sources', 'javascript-api'],
    pt: {
        titulo: 'Região Map (mapas)',
        resumo: 'Mapas interativos nativos: camadas de pontos, linhas, polígonos e heat map a partir de lat/long, GeoJSON ou SDO_GEOMETRY, com vector tiles e API de camadas no 26.1.',
        tags: ['map', 'mapa', 'spatial', 'SDO_GEOMETRY', 'GeoJSON', 'latitude', 'longitude', 'heat map', 'MapLibre', 'vector tiles', 'mapRegion', 'camadas', 'layers'],
        conteudo: `
            A região **Map**, nativa desde o APEX 21.1, desenha dados geográficos em um mapa interativo (arrastar, zoom,
            tooltips, janelas de informação) usando a biblioteca **MapLibre** — 5.6.1 no APEX 26.1. Não precisa de chave de
            API: o mapa de fundo padrão vem do serviço de mapas da Oracle.

            ## Camadas (layers)
            Uma região Map tem uma ou mais **camadas**, cada uma com sua própria consulta:
            | Tipo de camada | Uso típico |
            |---|---|
            | Points | Lojas, clientes, ocorrências (com ícones ou formas SVG e agrupamento) |
            | Lines | Rotas, rodovias, redes |
            | Polygons | Bairros, estados, áreas de entrega |
            | Heat Map | Densidade de pontos (vendas, chamados) |
            | Extruded Polygons | Polígonos em 3D com altura proporcional a um valor |

            As camadas podem ler do banco local, de **REST Enabled SQL** ou de **REST Data Sources**.

            ## De onde vem a geometria
            Em *Column Mapping → Geometry Column Data Type*:
            - **Two Numeric Columns** — longitude e latitude em colunas numéricas (só para Points e Heat Map);
            - **SDO_GEOMETRY** — o tipo do Oracle Spatial;
            - **GeoJSON** — texto GeoJSON em coluna VARCHAR2 ou CLOB.

            ~~~sql
            -- Camada de pontos: lojas com longitude/latitude
            select id,
                   nome,
                   cidade,
                   faturamento_mes,
                   longitude,
                   latitude
              from lojas
             where ativa = 'S'

            -- A mesma informação como SDO_GEOMETRY (SRID 4326 = WGS 84)
            select id, nome,
                   sdo_geometry(2001, 4326, sdo_point_type(longitude, latitude, null), null, null) as geom
              from lojas
            ~~~

            Defina também a **Primary Key Column** da camada: ela identifica o objeto clicado em eventos JavaScript e
            Dynamic Actions.

            ## Tooltip, janela de informação e aparência
            - **Tooltip** e **Info Window** aceitam colunas simples ou *Advanced Formatting* com HTML e «&COLUNA.»:
              «<strong>&NOME.</strong><br>&CIDADE.». Use filtros como «&NOME!HTML.» para dados digitados por usuários.
            - **Appearance**: cor e opacidade de preenchimento, cor e espessura de traço, ícones e esquemas de cores para mapas
              temáticos.
            - **Zoom Levels**: mínimo e máximo em que a camada aparece — útil para mostrar detalhes só de perto.
            - **Initial Position and Zoom**: fixo ou calculado a partir dos dados (*Based on Spatial Results*).
            - **Map Controls**: barra de navegação, escala, mini mapa, localização do navegador, ferramentas de círculo e
              distância.

            :::dica Coordenadas e índices
            Guarde as coordenadas em WGS 84 (SRID 4326), o sistema usado pelos mapas web, e lembre que a ordem é
            **longitude, latitude**. Com SDO_GEOMETRY e índice espacial, o APEX aproveita o Oracle Spatial para filtrar e
            transformar coordenadas.
            :::

            ## Mapas de fundo
            Além do fundo padrão, aplicações recentes usam fundos em **vector tiles** (OpenStreetMap em estilos claro, colorido
            e escuro). Desde o 23.2 é possível cadastrar **Custom Map Backgrounds** em Shared Components (Raster, Vector ou
            OGC WMS, com cabeçalhos HTTP e chave de API), reutilizáveis também nos itens Display Map e Geocoded Address.

            ## Interação com JavaScript
            ~~~js
            // Ao clicar num objeto do mapa "mapa-lojas", guarda o ID da loja
            apex.jQuery( "#mapa-lojas" ).on( "spatialmapobjectclick", function( event, data ) {
                apex.item( "P20_LOJA_ID" ).setValue( data.id );
            } );

            // Centraliza (longitude, latitude) e aproxima
            apex.region( "mapa-lojas" ).setCenter( [ -46.6333, -23.5505 ] );
            apex.region( "mapa-lojas" ).setZoomLevel( 11 );
            ~~~

            Outros eventos: «spatialmapclick» (clique em área vazia, com «lat»/«lng»), «spatialmapchanged» e
            «spatialmapinitialized». Os mesmos eventos estão disponíveis como eventos de componente em Dynamic Actions.

            ## Busca e filtros
            O Map é uma das regiões que podem ser filtradas por [Faceted Search e Smart Filters](#/topico/faceted-search-e-smart-filters)
            — a combinação clássica de "lista de filtros + mapa de resultados".

            :::novo Novidades do 26.1
            - **Vector Tile layers**: ligue *Use Vector Tiles* na camada para que os dados sejam entregues como vector tiles
              gerados pelo Oracle Database — muito mais rápido com grandes volumes de objetos.
            - **API de camadas**: «hideLayer», «showLayer», «moveLayer» e «getLayerIdByName» na interface «mapRegion».
            - **Bounding Box** para restringir a área navegável (com *Infinite Map* desligado), **legendas** customizáveis por
              camada e substituições dinâmicas em opacidade, espessura e estilo de traço.
            :::

            ~~~js
            // 26.1: alterna a camada "Concorrentes"
            var mapa = apex.region( "mapa-lojas" );
            if ( apex.item( "P20_MOSTRAR_CONC" ).getValue() === "S" ) {
                mapa.showLayer( "Concorrentes" );
            } else {
                mapa.hideLayer( "Concorrentes" );
            }
            ~~~

            Para cálculos geográficos no servidor (distâncias, geocodificação, metadados espaciais) veja também o pacote
            «APEX_SPATIAL» e os recursos do Oracle Spatial no banco.
        `
    },
    en: {
        titulo: 'Map region',
        resumo: 'Native interactive maps: point, line, polygon and heat map layers from lat/long, GeoJSON or SDO_GEOMETRY, plus vector tiles and a layer API in 26.1.',
        tags: ['map', 'spatial', 'SDO_GEOMETRY', 'GeoJSON', 'latitude', 'longitude', 'heat map', 'MapLibre', 'vector tiles', 'mapRegion', 'layers'],
        conteudo: `
            The **Map** region, native since APEX 21.1, draws geographic data on an interactive map (drag, zoom, tooltips,
            info windows) using the **MapLibre** library — 5.6.1 in APEX 26.1. No API key is needed: the default background map
            comes from Oracle's map service.

            ## Layers
            A Map region has one or more **layers**, each with its own query:
            | Layer type | Typical use |
            |---|---|
            | Points | Stores, customers, incidents (with icons or SVG shapes and clustering) |
            | Lines | Routes, roads, networks |
            | Polygons | Districts, states, delivery areas |
            | Heat Map | Point density (sales, tickets) |
            | Extruded Polygons | 3D polygons whose height is proportional to a value |

            Layers can read from the local database, **REST Enabled SQL** or **REST Data Sources**.

            ## Where the geometry comes from
            Under *Column Mapping → Geometry Column Data Type*:
            - **Two Numeric Columns** — longitude and latitude in numeric columns (Points and Heat Map only);
            - **SDO_GEOMETRY** — the Oracle Spatial type;
            - **GeoJSON** — GeoJSON text in a VARCHAR2 or CLOB column.

            ~~~sql
            -- Point layer: stores with longitude/latitude
            select id,
                   name,
                   city,
                   monthly_revenue,
                   longitude,
                   latitude
              from stores
             where active = 'Y'

            -- The same data as SDO_GEOMETRY (SRID 4326 = WGS 84)
            select id, name,
                   sdo_geometry(2001, 4326, sdo_point_type(longitude, latitude, null), null, null) as geom
              from stores
            ~~~

            Also set the layer **Primary Key Column**: it identifies the clicked object in JavaScript events and Dynamic Actions.

            ## Tooltip, info window and appearance
            - **Tooltip** and **Info Window** accept plain columns or *Advanced Formatting* with HTML and «&COLUMN.»:
              «<strong>&NAME.</strong><br>&CITY.». Use filters such as «&NAME!HTML.» for user-entered data.
            - **Appearance**: fill color and opacity, stroke color and width, icons and color schemes for thematic maps.
            - **Zoom Levels**: minimum and maximum zoom at which the layer shows — handy to reveal details only up close.
            - **Initial Position and Zoom**: fixed or computed from the data (*Based on Spatial Results*).
            - **Map Controls**: navigation bar, scale bar, overview map, browser location, circle and distance tools.

            :::dica Coordinates and indexes
            Store coordinates in WGS 84 (SRID 4326), the system used by web maps, and remember the order is
            **longitude, latitude**. With SDO_GEOMETRY and a spatial index, APEX leverages Oracle Spatial to filter and
            transform coordinates.
            :::

            ## Background maps
            Besides the default background, recent applications use **vector tile** backgrounds (OpenStreetMap in light,
            colorful and dark styles). Since 23.2 you can register **Custom Map Backgrounds** in Shared Components (Raster,
            Vector or OGC WMS, with HTTP headers and API key), reusable by the Display Map and Geocoded Address items too.

            ## JavaScript interaction
            ~~~js
            // When an object in map "store-map" is clicked, keep the store ID
            apex.jQuery( "#store-map" ).on( "spatialmapobjectclick", function( event, data ) {
                apex.item( "P20_STORE_ID" ).setValue( data.id );
            } );

            // Center (longitude, latitude) and zoom in
            apex.region( "store-map" ).setCenter( [ -77.050636, 38.889248 ] );
            apex.region( "store-map" ).setZoomLevel( 11 );
            ~~~

            Other events: «spatialmapclick» (click on an empty area, with «lat»/«lng»), «spatialmapchanged» and
            «spatialmapinitialized». The same events are available as component events in Dynamic Actions.

            ## Search and filters
            Map is one of the regions that can be filtered by [Faceted Search and Smart Filters](#/topico/faceted-search-e-smart-filters)
            — the classic "filter list + results map" combination.

            :::novo New in 26.1
            - **Vector Tile layers**: turn on *Use Vector Tiles* on a layer so data is delivered as vector tiles generated by
              Oracle Database — much faster with large numbers of objects.
            - **Layer API**: «hideLayer», «showLayer», «moveLayer» and «getLayerIdByName» in the «mapRegion» interface.
            - **Bounding Box** to restrict the navigable area (with *Infinite Map* off), customizable per-layer **legends** and
              dynamic substitutions for opacity, stroke width and stroke style.
            :::

            ~~~js
            // 26.1: toggle the "Competitors" layer
            var map = apex.region( "store-map" );
            if ( apex.item( "P20_SHOW_COMP" ).getValue() === "Y" ) {
                map.showLayer( "Competitors" );
            } else {
                map.hideLayer( "Competitors" );
            }
            ~~~

            For server-side geographic work (distances, geocoding, spatial metadata) see also the «APEX_SPATIAL» package and
            the Oracle Spatial features of the database.
        `
    }
});

DOC.topico({
    id: 'calendar',
    cat: 'componentes',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Creating Calendars', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-calendars.html' },
        { t: 'Managing Calendar Attributes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-calendar-attributes.html' },
        { t: 'About Dynamic Action Support for Calendar', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-dynamic-action-support-for-calendar.html' }
    ],
    relacionados: ['formularios', 'paginas-modais', 'dynamic-actions', 'faceted-search-e-smart-filters', 'formatos-data-numero-e-fuso'],
    pt: {
        titulo: 'Calendar (calendário)',
        resumo: 'A região Calendar baseada no FullCalendar: colunas de início e fim, links de criação e edição, arrastar e soltar com PL/SQL, cores por evento e Dynamic Actions.',
        tags: ['calendar', 'calendário', 'agenda', 'FullCalendar', 'drag and drop', 'arrastar e soltar', 'APEX$NEW_START_DATE', 'eventos', 'agendamento'],
        conteudo: `
            A região **Calendar** exibe registros com data em visões de **mês, semana, dia e lista**. Desde o APEX 5.x ela é
            baseada na biblioteca **FullCalendar** (o APEX 26.1 traz a 6.1.20); as versões antigas do FullCalendar foram sendo
            substituídas automaticamente — a v3 foi desuportada no 22.2. Os antigos *Legacy Calendar Templates* estão
            deprecated no 26.1.

            ## A consulta
            Basta uma consulta com uma descrição, uma data de início e, opcionalmente, uma data de fim:

            ~~~sql
            select id,
                   titulo,
                   inicio,
                   fim,
                   case tipo
                       when 'REUNIAO' then 'apex-cal-blue'
                       when 'FERIAS'  then 'apex-cal-green'
                       else 'apex-cal-orange'
                   end as css_class,
                   local
              from agenda
             where responsavel = :APP_USER
            ~~~

            ## Atributos principais (Settings)
            | Atributo | Para que serve |
            |---|---|
            | Display Column | Texto mostrado no evento |
            | Start Date Column / End Date Column | Início e fim (com fim, o evento tem duração) |
            | Primary Key Column | Necessária para o link de edição e para arrastar e soltar |
            | Create Link | Página aberta ao clicar num dia/horário vazio |
            | View / Edit Link | Página aberta ao clicar num evento |
            | Show Time / Time Format | Exibição de horas |
            | CSS Class | Coluna com a classe CSS de cada evento (cores) |
            | Supplemental Information | Informação adicional do evento |
            | Drag and Drop | Permite mover e redimensionar eventos |

            Use colunas DATE ou TIMESTAMP. Eventos de dia inteiro são datas sem hora; desde o 5.1 a data de fim é tratada como
            **inclusiva**, como no resto do APEX.

            ## Criar e editar com formulário modal
            O padrão mais comum: *View / Edit Link* aponta para uma página modal de formulário passando «&ID.» para
            «P30_ID»; *Create Link* abre a mesma página vazia. Ao fechar o diálogo, uma Dynamic Action *Dialog Closed* faz
            *Refresh* do calendário. Veja [Páginas modais](#/topico/paginas-modais).

            ## Arrastar e soltar
            Com **Drag and Drop** ligado, informe o PL/SQL que grava a nova data. As bind variables especiais trazem a chave e
            as novas datas no formato «YYYYMMDDHH24MISS»:

            ~~~plsql
            begin
                update agenda
                   set inicio = to_date(:APEX$NEW_START_DATE, 'YYYYMMDDHH24MISS'),
                       fim    = to_date(:APEX$NEW_END_DATE,   'YYYYMMDDHH24MISS')
                 where id = :APEX$PK_VALUE
                   and responsavel = :APP_USER;   -- só move o que é do usuário
            end;
            ~~~

            :::atencao Valide no servidor
            Arrastar um evento é uma alteração de dados como qualquer outra: confira permissões e regras de negócio (horário
            comercial, conflitos) no PL/SQL, e levante um erro quando a mudança não for permitida.
            :::

            ## Dynamic Actions do calendário
            | Evento | Quando dispara | Dados em «this.data» |
            |---|---|---|
            | Date Selected | Seleção de data/período vazio (sem Create Link) | «newStartDate», «newEndDate» |
            | Event Selected | Clique num evento (sem View/Edit Link) | O objeto do evento do FullCalendar |
            | View Changed | Troca de visão ou de período | «viewType», «startDate», «endDate» |

            ~~~js
            // Dynamic Action "Date Selected" > Execute JavaScript Code
            // Itens ocultos; no servidor converta com TO_DATE(:P10_INICIO_RAW, 'YYYYMMDDHH24MISS')
            apex.item( "P10_INICIO_RAW" ).setValue( this.data.newStartDate );
            apex.item( "P10_FIM_RAW" ).setValue( this.data.newEndDate );
            ~~~

            ## Customização avançada
            O atributo **Initialization JavaScript Code** recebe as opções do FullCalendar antes da criação:

            ~~~js
            function( pOptions ) {
                pOptions.firstDay    = 1;      // semana começa na segunda-feira
                pOptions.weekNumbers = true;   // mostra o número da semana
                return pOptions;
            }
            ~~~

            :::dica Cores e filtros
            As classes «apex-cal-*» do Universal Theme colorem os eventos sem CSS próprio. E o Calendar pode ser a região de
            resultados de [Smart Filters](#/topico/faceted-search-e-smart-filters) — por exemplo, filtrar a agenda por sala ou
            por tipo de evento.
            :::

            Em fusos horários diferentes, lembre-se de que o calendário mostra as datas como vêm do SQL; para converter, veja
            [formatos de data e fuso horário](#/topico/formatos-data-numero-e-fuso).
        `
    },
    en: {
        titulo: 'Calendar',
        resumo: 'The FullCalendar-based Calendar region: start and end columns, create and edit links, drag and drop with PL/SQL, per-event colors and Dynamic Actions.',
        tags: ['calendar', 'schedule', 'FullCalendar', 'drag and drop', 'APEX$NEW_START_DATE', 'events', 'appointments'],
        conteudo: `
            The **Calendar** region shows dated records in **month, week, day and list** views. Since APEX 5.x it is built on
            the **FullCalendar** library (APEX 26.1 ships 6.1.20); older FullCalendar versions were replaced automatically over
            time — v3 was desupported in 22.2. The old *Legacy Calendar Templates* are deprecated in 26.1.

            ## The query
            All you need is a query with a description, a start date and, optionally, an end date:

            ~~~sql
            select id,
                   title,
                   start_date,
                   end_date,
                   case event_type
                       when 'MEETING'  then 'apex-cal-blue'
                       when 'VACATION' then 'apex-cal-green'
                       else 'apex-cal-orange'
                   end as css_class,
                   location
              from schedule
             where owner = :APP_USER
            ~~~

            ## Main attributes (Settings)
            | Attribute | Purpose |
            |---|---|
            | Display Column | Text shown on the event |
            | Start Date Column / End Date Column | Start and end (with an end, the event has a duration) |
            | Primary Key Column | Required for the edit link and for drag and drop |
            | Create Link | Page opened when an empty day/time slot is clicked |
            | View / Edit Link | Page opened when an event is clicked |
            | Show Time / Time Format | Time display |
            | CSS Class | Column holding each event's CSS class (colors) |
            | Supplemental Information | Additional event information |
            | Drag and Drop | Lets users move and resize events |

            Use DATE or TIMESTAMP columns. All-day events are dates without time; since 5.1 the end date is treated as
            **inclusive**, like the rest of APEX.

            ## Create and edit with a modal form
            The most common pattern: *View / Edit Link* points to a modal form page passing «&ID.» into «P30_ID»; *Create Link*
            opens the same page empty. When the dialog closes, a *Dialog Closed* dynamic action runs *Refresh* on the calendar.
            See [Modal pages](#/topico/paginas-modais).

            ## Drag and drop
            With **Drag and Drop** on, provide the PL/SQL that stores the new date. Special bind variables carry the key and the
            new dates in «YYYYMMDDHH24MISS» format:

            ~~~plsql
            begin
                update schedule
                   set start_date = to_date(:APEX$NEW_START_DATE, 'YYYYMMDDHH24MISS'),
                       end_date   = to_date(:APEX$NEW_END_DATE,   'YYYYMMDDHH24MISS')
                 where id = :APEX$PK_VALUE
                   and owner = :APP_USER;   -- only move the user's own events
            end;
            ~~~

            :::atencao Validate on the server
            Dragging an event is a data change like any other: check permissions and business rules (business hours,
            conflicts) in PL/SQL, and raise an error when the change is not allowed.
            :::

            ## Calendar dynamic actions
            | Event | When it fires | Data in «this.data» |
            |---|---|---|
            | Date Selected | An empty date/range is selected (no Create Link) | «newStartDate», «newEndDate» |
            | Event Selected | An event is clicked (no View/Edit Link) | The FullCalendar event object |
            | View Changed | The view or period changes | «viewType», «startDate», «endDate» |

            ~~~js
            // "Date Selected" dynamic action > Execute JavaScript Code
            // Hidden items; convert on the server with TO_DATE(:P10_START_RAW, 'YYYYMMDDHH24MISS')
            apex.item( "P10_START_RAW" ).setValue( this.data.newStartDate );
            apex.item( "P10_END_RAW" ).setValue( this.data.newEndDate );
            ~~~

            ## Advanced customization
            The **Initialization JavaScript Code** attribute receives the FullCalendar options before creation:

            ~~~js
            function( pOptions ) {
                pOptions.firstDay    = 1;      // week starts on Monday
                pOptions.weekNumbers = true;   // show week numbers
                return pOptions;
            }
            ~~~

            :::dica Colors and filters
            Universal Theme «apex-cal-*» classes color events without custom CSS. And the Calendar can be the results region of
            [Smart Filters](#/topico/faceted-search-e-smart-filters) — for example, filtering the schedule by room or event type.
            :::

            Across time zones, remember the calendar shows dates exactly as the SQL returns them; for conversions see
            [date formats and time zones](#/topico/formatos-data-numero-e-fuso).
        `
    }
});

DOC.topico({
    id: 'faceted-search-e-smart-filters',
    cat: 'componentes',
    nivel: 'intermediario',
    desde: '19.2',
    links: [
        { t: 'App Builder Guide — Managing Faceted Search', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-faceted-search.html' },
        { t: 'App Builder Guide — Managing Smart Filters', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-smart-filters.html' },
        { t: 'JavaScript API — facetsRegion', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/facetsRegion.html' }
    ],
    relacionados: ['classic-report', 'cards', 'map-region', 'search-configurations', 'listas-de-valores'],
    pt: {
        titulo: 'Faceted Search e Smart Filters',
        resumo: 'Filtros no estilo e-commerce aplicados automaticamente a Classic Report, Cards, Map ou Calendar: facetas com contagens, gráficos e, no 26.1, a opção Exclude.',
        tags: ['faceted search', 'busca facetada', 'facetas', 'smart filters', 'filtros', 'chips', 'contagem', 'facetsRegion', 'Exclude', 'range', 'checkbox group'],
        conteudo: `
            **Faceted Search** (APEX 19.2) e **Smart Filters** (APEX 21.2) resolvem o mesmo problema: deixar o usuário
            filtrar um relatório por vários critérios, vendo **quantos registros** cada opção retorna — como nas lojas
            online. A diferença está no layout:

            | Aspecto | Faceted Search | Smart Filters |
            |---|---|---|
            | Layout | Painel de facetas (geralmente à esquerda) | Uma barra de busca no topo com "chips" de sugestão |
            | Espaço ocupado | Maior; ótimo em desktop | Compacto; ótimo em mobile e telas cheias |
            | Tipos de filtro | Checkbox Group, Input Field, Radio Group, Range, Search, Select List | Checkbox Group, Input Field, Radio Group, Range, Search |
            | Melhor para | Explorar dados com muitos critérios visíveis | Busca rápida com autocompletar de filtros |

            ## Como funciona
            São sempre **duas regiões**: a região de filtros (Faceted Search ou Smart Filters) e a região de resultados,
            indicada no atributo **Filtered Region**. Os resultados podem ser **Classic Report**, **Cards**, **Map** ou
            **Calendar** — e, desde o 22.1, plug-ins de região marcados como compatíveis. Interactive Report e Interactive
            Grid **não** são suportados (eles têm seus próprios filtros).

            Cada faceta é um **item de página** (ex.: «P2_CATEGORIA») ligado a uma coluna da região filtrada por
            *Source → Database Column*. O APEX acrescenta os filtros à consulta automaticamente — **não** escreva
            «where categoria = :P2_CATEGORIA» no SQL do relatório.

            ~~~sql
            -- Região filtrada (Classic Report ou Cards): sem WHERE para as facetas
            select id, nome, categoria, marca, preco, estoque, avaliacao
              from produtos
             where ativo = 'S'
            ~~~

            ## Tipos de faceta
            - **Checkbox Group** — várias opções; o valor fica separado por dois-pontos. Mostra contagens.
            - **Radio Group** e **Select List** — uma opção.
            - **Range** — faixas (preço, data). Use uma LOV com as faixas ou deixe o usuário digitar mínimo e máximo.
            - **Input Field** — compara um valor digitado; o operador pode ser fixo ou escolhido pelo usuário (23.2 adicionou
              "diferente de", "não começa com" e "não contém"). Desde o 24.1 aceita Date Picker.
            - **Search** — busca textual em uma ou mais colunas (*Database Column(s)*: «NOME,MARCA»), sempre no topo.

            ~~~texto
            Exemplo de LOV estática para uma faceta Range de preço (retorno = mínimo|máximo):
              Até 100        ->  |100
              100 a 500      ->  100|500
              Acima de 500   ->  500|
            ~~~

            ## Recursos que valem conhecer
            - **Contagens** e **gráficos** de contagem por faceta (barra ou pizza, 20.2).
            - **Cascata e condições** (20.1): uma faceta depende de outra, ou só aparece conforme outra.
            - **Display Toggling** (21.1): facetas opcionais que o usuário mostra pelo botão *More Filters*.
            - **Colunas multivalor** (21.2): valores separados por delimitador ou array JSON.
            - **Grupos de checkbox** para colunas booleanas (20.2).
            - **Modo em lote**: as escolhas só são aplicadas quando o usuário confirma, em vez de atualizar a cada clique.

            :::novo 26.1: Exclude e Maximize
            Facetas e filtros dos tipos Checkbox Group, Radio Group e Range ganharam a opção **Exclude**: o usuário marca o
            que **não** quer ver e o relatório mostra todo o resto. Os gráficos do Faceted Search ganharam a template option
            **Maximize**, que expande o gráfico para a tela inteira.
            :::

            ## JavaScript
            A interface «facetsRegion» (documentada desde o 21.2) oferece:

            ~~~js
            // Limpa facetas e termos de busca
            apex.region( "filtros" ).clear();

            // Recalcula as contagens quando um item EXTERNO às facetas muda o relatório
            apex.region( "filtros" ).fetchCounts();

            // Atualiza outra região sempre que os filtros mudam
            apex.region( "filtros" ).on( "facetschange", function() {
                apex.region( "grafico-resumo" ).refresh();
            } );
            ~~~

            Também há «reset», «hideFacet», «showFacet», «addChart» e «getTotalResourceCount». A Dynamic Action *Refresh*
            na região de facetas busca novas contagens.

            :::dica Performance
            Cada faceta com contagem executa uma agregação sobre a consulta da região filtrada. Mantenha a consulta enxuta,
            indexe as colunas mais filtradas e prefira LOVs com valores distintos pequenos. Para dezenas de facetas, use
            *Display Toggling* para carregar só as essenciais.
            :::

            ## Quando escolher cada um
            Use **Faceted Search** em telas de exploração (catálogos, consultas gerenciais) em que ver todos os critérios ajuda
            a decidir. Use **Smart Filters** quando o espaço é curto ou quando o usuário sabe o que procura e prefere digitar.
            Para busca textual em **várias fontes** ao mesmo tempo, veja [Search Configurations](#/topico/search-configurations).
        `
    },
    en: {
        titulo: 'Faceted Search and Smart Filters',
        resumo: 'E-commerce style filters applied automatically to a Classic Report, Cards, Map or Calendar: facets with counts, charts and, in 26.1, the Exclude option.',
        tags: ['faceted search', 'facets', 'smart filters', 'filters', 'chips', 'counts', 'facetsRegion', 'Exclude', 'range', 'checkbox group'],
        conteudo: `
            **Faceted Search** (APEX 19.2) and **Smart Filters** (APEX 21.2) solve the same problem: letting users filter a
            report by several criteria while seeing **how many records** each option returns — just like online stores. The
            difference is the layout:

            | Aspect | Faceted Search | Smart Filters |
            |---|---|---|
            | Layout | Facet panel (usually on the left) | One search bar at the top with suggestion "chips" |
            | Footprint | Larger; great on desktop | Compact; great on mobile and busy pages |
            | Filter types | Checkbox Group, Input Field, Radio Group, Range, Search, Select List | Checkbox Group, Input Field, Radio Group, Range, Search |
            | Best for | Exploring data with many visible criteria | Quick search with filter autocomplete |

            ## How it works
            There are always **two regions**: the filter region (Faceted Search or Smart Filters) and the results region,
            selected in the **Filtered Region** attribute. Results can be a **Classic Report**, **Cards**, **Map** or
            **Calendar** — and, since 22.1, region plug-ins flagged as compatible. Interactive Reports and Interactive Grids
            are **not** supported (they have their own filtering).

            Each facet is a **page item** (e.g. «P2_CATEGORY») bound to a column of the filtered region through
            *Source → Database Column*. APEX adds the filters to the query automatically — do **not** write
            «where category = :P2_CATEGORY» in the report SQL.

            ~~~sql
            -- Filtered region (Classic Report or Cards): no WHERE for the facets
            select id, name, category, brand, price, stock, rating
              from products
             where active = 'Y'
            ~~~

            ## Facet types
            - **Checkbox Group** — several options; the value is colon-separated. Shows counts.
            - **Radio Group** and **Select List** — a single option.
            - **Range** — ranges (price, dates). Use an LOV with the ranges or let users type minimum and maximum.
            - **Input Field** — compares a typed value; the operator can be fixed or chosen by the user (23.2 added
              "not equals", "does not start with" and "does not contain"). Since 24.1 it supports the Date Picker.
            - **Search** — text search over one or more columns (*Database Column(s)*: «NAME,BRAND»), always at the top.

            ~~~texto
            Static LOV example for a price Range facet (return value = min|max):
              Up to 100      ->  |100
              100 to 500     ->  100|500
              Above 500      ->  500|
            ~~~

            ## Features worth knowing
            - **Counts** and per-facet count **charts** (bar or pie, 20.2).
            - **Cascading and conditions** (20.1): a facet depends on another, or only appears based on another.
            - **Display Toggling** (21.1): optional facets users reveal through the *More Filters* button.
            - **Multi-value columns** (21.2): delimiter-separated values or a JSON array.
            - **Checkbox groups** for Boolean columns (20.2).
            - **Batch mode**: choices are applied only when the user confirms, instead of refreshing on every click.

            :::novo 26.1: Exclude and Maximize
            Checkbox Group, Radio Group and Range facets and filters gained an **Exclude** option: users tick what they do
            **not** want and the report shows everything else. Faceted Search charts gained the **Maximize** template option,
            which expands a chart to the full screen.
            :::

            ## JavaScript
            The «facetsRegion» interface (documented since 21.2) offers:

            ~~~js
            // Clear facets and search terms
            apex.region( "filters" ).clear();

            // Recompute counts when an item OUTSIDE the facets changes the report
            apex.region( "filters" ).fetchCounts();

            // Refresh another region whenever the filters change
            apex.region( "filters" ).on( "facetschange", function() {
                apex.region( "summary-chart" ).refresh();
            } );
            ~~~

            There are also «reset», «hideFacet», «showFacet», «addChart» and «getTotalResourceCount». A *Refresh* dynamic
            action on the facets region fetches new counts.

            :::dica Performance
            Every facet with counts runs an aggregation over the filtered region query. Keep the query lean, index the most
            filtered columns and prefer LOVs with few distinct values. With dozens of facets, use *Display Toggling* so only
            the essential ones load.
            :::

            ## When to pick each one
            Use **Faceted Search** on exploration pages (catalogs, management queries) where seeing every criterion helps the
            decision. Use **Smart Filters** when space is tight or users know what they want and prefer typing. For text search
            across **several sources** at once, see [Search Configurations](#/topico/search-configurations).
        `
    }
});

DOC.topico({
    id: 'search-configurations',
    cat: 'componentes',
    nivel: 'intermediario',
    desde: '22.2',
    links: [
        { t: 'App Builder Guide — Adding Search to an Application', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/adding-search-to-an-application.html' },
        { t: 'About Creating Application Searches', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-creating-application-searches.html' },
        { t: 'APEX_SEARCH (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_SEARCH.html' }
    ],
    relacionados: ['faceted-search-e-smart-filters', 'select-ai-e-vetores', 'rest-data-sources', 'navegacao', 'componentes-compartilhados'],
    pt: {
        titulo: 'Search Configurations e região Search',
        resumo: 'Busca global da aplicação (22.2): configurações reutilizáveis em Shared Components sobre tabelas, Oracle Text, listas, vetores e REST, exibidas pela região Search.',
        tags: ['search', 'busca', 'search configuration', 'busca global', 'Oracle Text', 'vector search', 'busca vetorial', 'ubiquitous search', 'APEX_SEARCH'],
        conteudo: `
            Desde o APEX 22.2 você pode montar uma **busca de aplicação** — aquela caixa "pesquise qualquer coisa" que retorna
            clientes, pedidos e produtos numa única lista — de forma declarativa. Ela tem duas partes:

            1. **Search Configurations** (em *Shared Components*): definem **o que** pesquisar e **como** cada resultado aparece.
            2. Região **Search** (na página): o campo de busca e a lista de resultados, que pode combinar várias configurações.

            ## Tipos de configuração
            | Tipo | Como pesquisa | Observações |
            |---|---|---|
            | Standard | Expressões LIKE sobre tabela, SQL ou REST Data Source | O mais simples; também via REST Enabled SQL |
            | Oracle Text | Índice Oracle Text existente | Busca linguística e aproximada (fuzzy), com score |
            | List | Entradas de uma List dos Shared Components | Ótimo para "ir para a página X" |
            | Oracle Vector Search | Similaridade sobre colunas VECTOR (24.2) | Exige um Vector Provider e Oracle Database 23ai/26ai |
            | Oracle Ubiquitous Search | Índice de busca ubíqua do banco | Exige Oracle AI Database 26ai |

            ## Configurando uma busca Standard
            1. *Shared Components → Search Configurations → Create*, tipo **Standard**.
            2. Escolha a fonte (tabela, SQL ou REST) e as **colunas pesquisáveis**.
            3. Mapeie a apresentação: chave primária, **título**, subtítulo, descrição, badge, ícone, data de modificação,
               e o **link** do resultado (ex.: página 20 com «P20_ID» = «&ID.»).
            4. Defina ordenação e o rótulo da configuração (aparece como grupo nos resultados).

            ~~~sql
            -- Fonte de uma configuração "Clientes"
            select id,
                   nome,
                   cidade || ' - ' || uf           as subtitulo,
                   'Cliente desde ' || to_char(criado_em, 'YYYY') as descricao,
                   status,
                   atualizado_em
              from clientes
            ~~~

            ## A região Search
            Crie uma página pelo wizard (*Search Page*) ou manualmente: adicione uma região do tipo **Search**, aponte o
            **Search Page Item** (ex.: «P6_SEARCH») e, em *Search Sources*, adicione uma ou mais configurações. Há opções de
            paginação, busca enquanto digita (*search as you type*), contagem de resultados, lazy loading, layout customizado e
            mensagens para "nenhum termo digitado" e "nenhum resultado".

            :::dica Busca global no cabeçalho
            Um padrão comum é colocar um item de texto na Navigation Bar (ou no cabeçalho) que redireciona para a página de busca
            passando o termo — assim qualquer página da aplicação tem a pesquisa à mão.
            :::

            ## Usando por SQL: APEX_SEARCH
            A função de tabela «APEX_SEARCH.SEARCH» executa configurações por Static ID e devolve linhas padronizadas
            («CONFIG_LABEL», «TITLE», «SUBTITLE», «DESCRIPTION», «BADGE», «LINK», «SCORE», «PRIMARY_KEY_1» e outras) — útil
            para um relatório próprio, um template component ou uma API:

            ~~~sql
            select config_label, title, subtitle, badge, link
              from table( apex_search.search(
                              p_search_static_ids => apex_t_varchar2( 'CLIENTES', 'PEDIDOS' ),
                              p_search_expression => :P6_SEARCH,
                              p_apply_order_bys   => 'N' ) )
             order by config_label, title
            ~~~

            ## Reutilização
            Search Configurations são componentes compartilhados: podem ser **copiadas** ou **assinadas** (*subscribe*) a
            partir de outra aplicação, o que permite manter uma busca corporativa centralizada.

            :::novo Busca semântica
            Com **Oracle Vector Search** (24.2) a busca entende significado, não só palavras: o termo digitado é convertido em
            vetor pelo *Vector Provider* configurado no workspace e os resultados vêm ordenados por similaridade. Veja
            [Select AI, busca vetorial e linguagem natural](#/topico/select-ai-e-vetores).
            :::

            ## Search, Faceted Search ou Smart Filters?
            Search Configurations atendem a **"encontre qualquer coisa em vários lugares"**. Para refinar **um** conjunto de
            dados com critérios e contagens, use [Faceted Search ou Smart Filters](#/topico/faceted-search-e-smart-filters).
        `
    },
    en: {
        titulo: 'Search Configurations and the Search region',
        resumo: 'Application-wide search (22.2): reusable configurations in Shared Components over tables, Oracle Text, lists, vectors and REST, displayed by the Search region.',
        tags: ['search', 'search configuration', 'global search', 'Oracle Text', 'vector search', 'ubiquitous search', 'APEX_SEARCH'],
        conteudo: `
            Since APEX 22.2 you can build an **application search** — the "search anything" box that returns customers, orders
            and products in a single list — declaratively. It has two parts:

            1. **Search Configurations** (in *Shared Components*): define **what** to search and **how** each result looks.
            2. The **Search** region (on a page): the search field and the result list, which can combine several configurations.

            ## Configuration types
            | Type | How it searches | Notes |
            |---|---|---|
            | Standard | LIKE expressions over a table, SQL or REST Data Source | The simplest; REST Enabled SQL too |
            | Oracle Text | An existing Oracle Text index | Linguistic and fuzzy search, with score |
            | List | Entries of a Shared Components List | Great for "go to page X" |
            | Oracle Vector Search | Similarity over VECTOR columns (24.2) | Requires a Vector Provider and Oracle Database 23ai/26ai |
            | Oracle Ubiquitous Search | The database ubiquitous search index | Requires Oracle AI Database 26ai |

            ## Setting up a Standard search
            1. *Shared Components → Search Configurations → Create*, type **Standard**.
            2. Pick the source (table, SQL or REST) and the **searchable columns**.
            3. Map the presentation: primary key, **title**, subtitle, description, badge, icon, last-modified date, and the
               result **link** (e.g. page 20 with «P20_ID» = «&ID.»).
            4. Set the ordering and the configuration label (shown as a group in the results).

            ~~~sql
            -- Source of a "Customers" configuration
            select id,
                   name,
                   city || ' - ' || state             as subtitle,
                   'Customer since ' || to_char(created_on, 'YYYY') as description,
                   status,
                   updated_on
              from customers
            ~~~

            ## The Search region
            Create a page with the wizard (*Search Page*) or manually: add a **Search** region, point to the
            **Search Page Item** (e.g. «P6_SEARCH») and, under *Search Sources*, add one or more configurations. There are
            options for pagination, search as you type, result counts, lazy loading, custom layout and messages for "no search
            term entered" and "no results found".

            :::dica Global search in the header
            A common pattern is a text item in the Navigation Bar (or header) that redirects to the search page passing the
            term — so every page of the app has search at hand.
            :::

            ## Using it from SQL: APEX_SEARCH
            The «APEX_SEARCH.SEARCH» table function runs configurations by Static ID and returns standardized rows
            («CONFIG_LABEL», «TITLE», «SUBTITLE», «DESCRIPTION», «BADGE», «LINK», «SCORE», «PRIMARY_KEY_1» and more) — useful
            for your own report, a template component or an API:

            ~~~sql
            select config_label, title, subtitle, badge, link
              from table( apex_search.search(
                              p_search_static_ids => apex_t_varchar2( 'CUSTOMERS', 'ORDERS' ),
                              p_search_expression => :P6_SEARCH,
                              p_apply_order_bys   => 'N' ) )
             order by config_label, title
            ~~~

            ## Reuse
            Search Configurations are shared components: they can be **copied** or **subscribed** from another application,
            which lets you keep a central corporate search.

            :::novo Semantic search
            With **Oracle Vector Search** (24.2) search understands meaning, not just words: the typed term is turned into a
            vector by the *Vector Provider* configured in the workspace and results come back ordered by similarity. See
            [Select AI, vector search and natural language](#/topico/select-ai-e-vetores).
            :::

            ## Search, Faceted Search or Smart Filters?
            Search Configurations answer **"find anything in many places"**. To refine **one** data set with criteria and
            counts, use [Faceted Search or Smart Filters](#/topico/faceted-search-e-smart-filters).
        `
    }
});

DOC.topico({
    id: 'outras-regioes',
    cat: 'componentes',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Supported Region Types', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/supported-region-types.html' },
        { t: 'App Builder Guide — Managing Trees', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-trees.html' }
    ],
    relacionados: ['template-components', 'navegacao', 'workflow', 'page-designer', 'escaping-e-xss'],
    pt: {
        titulo: 'Outras regiões: Static e Dynamic Content, Tree, List e mais',
        resumo: 'As regiões de apoio do APEX: Static Content, Dynamic Content, Tree, List, Region Display Selector, Breadcrumb, Help Text, URL e Workflow Diagram.',
        tags: ['static content', 'dynamic content', 'tree', 'árvore', 'list', 'lista', 'region display selector', 'abas', 'breadcrumb', 'help text', 'URL region', 'workflow diagram'],
        conteudo: `
            Além dos relatórios, o APEX tem regiões "de apoio" que organizam a página, mostram conteúdo livre ou navegação.
            Conhecer cada uma evita reinventar componentes com HTML e JavaScript.

            | Região | Use para |
            |---|---|
            | Static Content | Texto/HTML fixo e, principalmente, **contêiner** de itens, botões e sub-regiões |
            | Dynamic Content | HTML gerado por código (PL/SQL ou JavaScript no banco), refrescável |
            | Tree | Dados hierárquicos (organogramas, categorias, menus) |
            | List | Exibir uma List dos Shared Components com um template (cards, abas, menu, links) |
            | Region Display Selector | Abas que mostram uma região por vez |
            | Breadcrumb | Trilha de navegação da página atual |
            | Help Text | Ajuda da página (página de ajuda dedicada) |
            | URL | Conteúdo remoto obtido de uma URL |
            | Workflow Diagram | Diagrama somente leitura do andamento de um workflow (24.1) |

            ## Static Content
            A região mais usada do APEX. Com o template *Standard* ela vira um "cartão" com título; com *Blank with Attributes*
            é um contêiner invisível. Itens de formulário, botões e sub-regiões ficam dentro dela. O texto aceita
            substituições; com **Output As = HTML** o conteúdo não é escapado — então nunca coloque ali valores digitados por
            usuários sem filtro:

            ~~~html
            <p>Olá, <strong>&APP_USER!HTML.</strong>! Você tem &P1_PENDENTES!HTML. tarefas pendentes.</p>
            ~~~

            ## Dynamic Content (22.2)
            Substitui a antiga *PL/SQL Dynamic Content* (hoje legada), que escrevia HTML com «HTP.P». A nova região
            **retorna um CLOB**, pode ser **atualizada** (Refresh) e suporta **lazy loading**; o código pode ser PL/SQL ou
            JavaScript (MLE):

            ~~~plsql
            declare
                l_html clob;
            begin
                for r in ( select titulo, texto
                             from avisos
                            where ativo = 'S'
                            order by criado_em desc
                            fetch first 5 rows only ) loop
                    l_html := l_html
                           || '<div class="aviso"><h3>' || apex_escape.html(r.titulo) || '</h3>'
                           || '<p>' || apex_escape.html(r.texto) || '</p></div>';
                end loop;
                return nvl(l_html, '<p>Nenhum aviso.</p>');
            end;
            ~~~

            :::atencao Escape tudo que vem de dados
            Em Dynamic Content você monta o HTML: use «APEX_ESCAPE.HTML» (e «HTML_ATTRIBUTE» em atributos) em todo valor vindo
            de tabelas ou itens. Veja [XSS e escaping](#/topico/escaping-e-xss).
            :::

            ## Tree
            Mostra hierarquias com expandir/recolher, teclado e ícones. Em **Hierarchy** escolha *Computed With SQL* — você
            informa **Node ID Column**, **Parent Key Column** e o critério *Start With* — ou *Not Computed*, quando a sua
            consulta já traz nível e status (folha ou não) via CONNECT BY. Defina também *Node Label Column*,
            *Node Value Column*, *Icon CSS Class Column*, *Tooltip* e *Link*.

            ~~~sql
            select empno,
                   mgr,
                   ename,
                   case when job = 'MANAGER' then 'fa fa-users' else 'fa fa-user' end as icone,
                   apex_page.get_url( p_page => 7, p_items => 'P7_EMPNO', p_values => empno ) as link
              from emp
            ~~~

            Desde o 20.2 a Tree suporta lazy loading e refresh sem recarregar a página; as Dynamic Actions *Expand Tree* e
            *Collapse Tree* controlam os nós, e o widget «treeView» permite customizações em JavaScript.

            ## List
            Renderiza uma **List** de *Shared Components* — estática ou dinâmica (definida por SQL) — com um *list template*
            do Universal Theme: *Cards*, *Media List*, *Badge List*, *Links List*, *Menu Bar*, *Tabs* e outros. É a base da
            Navigation Menu e de muitas páginas de "hub". No 26.1 os itens de lista ganharam **Link Attributes** (coluna
            «link_attributes» em listas dinâmicas). Veja [Navegação](#/topico/navegacao).

            ## Region Display Selector
            Transforma regiões da página em **abas** (ou em uma barra que rola até a região). Só participam regiões com o
            atributo *Region Display Selector* ligado. Desde o 23.1 mostra ícones nas abas e pode lembrar a última aba
            escolhida (*Remember Last Selection*), que «APEX_REGION.RESET» volta ao padrão.

            ## Breadcrumb, Help Text e URL
            - **Breadcrumb**: exibe a trilha definida em *Shared Components → Breadcrumbs*, normalmente na posição
              *Breadcrumb Bar* do template de página.
            - **Help Text**: mostra o texto de ajuda da página; é a região usada pela página de ajuda gerada pelo wizard.
            - **URL**: inclui conteúdo remoto obtido de uma URL. Como a requisição parte do servidor, o host precisa estar
              liberado na ACL de rede do banco. Para integrações reais prefira [REST Data Sources](#/topico/rest-data-sources).

            ## Workflow Diagram (24.1)
            Exibe, somente leitura, o diagrama de uma instância de workflow com as atividades concluídas e a atual. É usado nas
            páginas de detalhes do Workflow Console. Veja [Workflow](#/topico/workflow).

            :::dica Template Components e regiões legadas
            Desde o 23.1, os **Template Components** (Avatar, Badge, Comments, Content Row, Media List, Timeline — e, no
            Universal Theme 26.1, Metric Card) aparecem como tipos de região. Já *Reflow Report*, *Column Toggle Report*,
            *List View* e *PL/SQL Dynamic Content* são **legados**: evite em páginas novas.
            :::
        `
    },
    en: {
        titulo: 'Other regions: Static and Dynamic Content, Tree, List and more',
        resumo: 'The APEX support regions: Static Content, Dynamic Content, Tree, List, Region Display Selector, Breadcrumb, Help Text, URL and Workflow Diagram.',
        tags: ['static content', 'dynamic content', 'tree', 'list', 'region display selector', 'tabs', 'breadcrumb', 'help text', 'URL region', 'workflow diagram'],
        conteudo: `
            Besides reports, APEX has "support" regions that organize the page, show free content or navigation. Knowing
            each one saves you from reinventing components with HTML and JavaScript.

            | Region | Use it for |
            |---|---|
            | Static Content | Fixed text/HTML and, above all, a **container** for items, buttons and sub-regions |
            | Dynamic Content | HTML generated by code (PL/SQL or in-database JavaScript), refreshable |
            | Tree | Hierarchical data (org charts, categories, menus) |
            | List | Rendering a Shared Components List with a template (cards, tabs, menu, links) |
            | Region Display Selector | Tabs that show one region at a time |
            | Breadcrumb | Navigation trail for the current page |
            | Help Text | Page help (dedicated help page) |
            | URL | Remote content fetched from a URL |
            | Workflow Diagram | Read-only diagram of a workflow's progress (24.1) |

            ## Static Content
            The most used region in APEX. With the *Standard* template it becomes a titled "card"; with *Blank with Attributes*
            it is an invisible container. Form items, buttons and sub-regions live inside it. The text supports substitutions;
            with **Output As = HTML** the content is not escaped — so never put user-entered values there without a filter:

            ~~~html
            <p>Hello, <strong>&APP_USER!HTML.</strong>! You have &P1_PENDING!HTML. pending tasks.</p>
            ~~~

            ## Dynamic Content (22.2)
            It replaces the old *PL/SQL Dynamic Content* (now legacy), which wrote HTML with «HTP.P». The new region
            **returns a CLOB**, can be **refreshed** and supports **lazy loading**; the code can be PL/SQL or JavaScript (MLE):

            ~~~plsql
            declare
                l_html clob;
            begin
                for r in ( select title, body
                             from notices
                            where active = 'Y'
                            order by created_on desc
                            fetch first 5 rows only ) loop
                    l_html := l_html
                           || '<div class="notice"><h3>' || apex_escape.html(r.title) || '</h3>'
                           || '<p>' || apex_escape.html(r.body) || '</p></div>';
                end loop;
                return nvl(l_html, '<p>No notices.</p>');
            end;
            ~~~

            :::atencao Escape everything that comes from data
            In Dynamic Content you build the HTML: use «APEX_ESCAPE.HTML» (and «HTML_ATTRIBUTE» inside attributes) on every
            value coming from tables or items. See [XSS and escaping](#/topico/escaping-e-xss).
            :::

            ## Tree
            Shows hierarchies with expand/collapse, keyboard support and icons. Under **Hierarchy** choose *Computed With SQL* —
            you provide the **Node ID Column**, **Parent Key Column** and the *Start With* criterion — or *Not Computed*, when
            your query already returns level and status (leaf or not) via CONNECT BY. Also set *Node Label Column*,
            *Node Value Column*, *Icon CSS Class Column*, *Tooltip* and *Link*.

            ~~~sql
            select empno,
                   mgr,
                   ename,
                   case when job = 'MANAGER' then 'fa fa-users' else 'fa fa-user' end as icon,
                   apex_page.get_url( p_page => 7, p_items => 'P7_EMPNO', p_values => empno ) as link
              from emp
            ~~~

            Since 20.2 the Tree supports lazy loading and refresh without reloading the page; the *Expand Tree* and
            *Collapse Tree* dynamic actions control nodes, and the «treeView» widget allows JavaScript customization.

            ## List
            Renders a *Shared Components* **List** — static or dynamic (defined by SQL) — with a Universal Theme *list template*:
            *Cards*, *Media List*, *Badge List*, *Links List*, *Menu Bar*, *Tabs* and others. It is the basis of the Navigation
            Menu and of many "hub" pages. In 26.1 list entries gained **Link Attributes** (a «link_attributes» column in dynamic
            lists). See [Navigation](#/topico/navegacao).

            ## Region Display Selector
            Turns page regions into **tabs** (or into a bar that scrolls to the region). Only regions with the
            *Region Display Selector* attribute on take part. Since 23.1 it shows icons on tabs and can remember the last chosen
            tab (*Remember Last Selection*), which «APEX_REGION.RESET» puts back to the default.

            ## Breadcrumb, Help Text and URL
            - **Breadcrumb**: displays the trail defined in *Shared Components → Breadcrumbs*, usually in the page template's
              *Breadcrumb Bar* position.
            - **Help Text**: shows the page help text; it is the region used by the help page generated by the wizard.
            - **URL**: includes remote content fetched from a URL. Since the request leaves from the server, the host must be
              allowed in the database network ACL. For real integrations prefer [REST Data Sources](#/topico/rest-data-sources).

            ## Workflow Diagram (24.1)
            Displays, read-only, the diagram of a workflow instance with the completed and current activities. It is used on
            the Workflow Console detail pages. See [Workflow](#/topico/workflow).

            :::dica Template Components and legacy regions
            Since 23.1, **Template Components** (Avatar, Badge, Comments, Content Row, Media List, Timeline — and, in Universal
            Theme 26.1, Metric Card) show up as region types. *Reflow Report*, *Column Toggle Report*, *List View* and
            *PL/SQL Dynamic Content*, on the other hand, are **legacy**: avoid them on new pages.
            :::
        `
    }
});

DOC.topico({
    id: 'impressao-e-exportacao',
    cat: 'componentes',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Printing Report Regions', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/printing-report-regions.html' },
        { t: 'APEX_DATA_EXPORT (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_DATA_EXPORT.html' },
        { t: 'Data Reporter Guide — Introduction (26.1)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/apxdr/introduction-to-data-reporter.html' }
    ],
    relacionados: ['interactive-report', 'interactive-grid', 'upload-download-arquivos', 'apex-exec', 'apex-mail'],
    pt: {
        titulo: 'Impressão, PDF e exportação de dados',
        resumo: 'Downloads nativos de relatórios, servidores de impressão e Document Generator, report queries e layouts, APEX_PRINT, APEX_DATA_EXPORT e o Data Reporter do 26.1.',
        tags: ['impressão', 'PDF', 'Excel', 'XLSX', 'CSV', 'exportar', 'Document Generator', 'APEX_PRINT', 'APEX_DATA_EXPORT', 'report query', 'report layout', 'BI Publisher', 'Data Reporter'],
        conteudo: `
            "Preciso de um PDF" é um dos pedidos mais comuns em aplicações corporativas. O APEX oferece três níveis de
            solução — do download com um clique até documentos baseados em modelos do Word — e, no 26.1, uma ferramenta de
            relatórios ad hoc para usuários de negócio.

            ## 1. Downloads nativos dos relatórios
            Interactive Report, Interactive Grid e Classic Report exportam **CSV, HTML, PDF e XLSX sem servidor de
            impressão** (PDF e Excel nativos desde o 20.1/20.2). Habilite os formatos nos atributos de download/printing da
            região; o usuário escolhe orientação e tamanho da página no diálogo. O IR também envia o relatório por e-mail e
            aceita *subscriptions*.

            Limitações do modo nativo: no PDF, textos muito longos numa linha podem ser truncados; no Excel, cada célula aceita
            até 32 KB. Layouts personalizados exigem um servidor de impressão.

            ## 2. Servidores de impressão e layouts
            | Print server | Modelos (layouts) | Observações |
            |---|---|---|
            | Nativo (nenhum) | Não suporta layouts próprios | Básico, sem configuração |
            | Oracle Document Generator Pre-built Function | DOCX e XLSX | Função da OCI (24.1); instância precisa de DBMS_CLOUD |
            | Oracle BI Publisher (Analytics Publisher) | RTF e XSL-FO | Exige licença |
            | APEX Office Print | DOCX, XLSX, PPTX, HTML, Markdown e outros | Produto de terceiros |
            | External (Apache FOP) | XSL-FO | Servidor J2EE externo |

            A configuração fica na administração da instância (*Report Printing*); na aplicação, *Print Server Type* pode ser
            *Native Printing*, *Remote Print Server* ou *Use Instance Settings* — o Document Generator só é selecionável pela
            configuração da instância.

            Com um servidor configurado, você cria em *Shared Components*:
            - **Report Queries** — uma ou mais consultas SQL (não funções que retornam SQL) que fornecem os dados;
            - **Report Layouts** — o modelo: *Generic Columns* ou *Named Columns* (XSL-FO), RTF ou arquivos DOCX/XLSX
              conforme o servidor.

            Para gerar o documento: o processo **Print Report** (24.1), a Dynamic Action *Print Report* ou a API «APEX_PRINT».

            :::novo Document Generator
            No 24.1 o **Document Generator** da OCI virou um tipo de servidor de impressão: você desenha o modelo no Microsoft
            Word e o APEX combina com os dados. O 24.2 acrescentou modelos XLSX e saídas DOCX e XLSX; o 26.1 adicionou **PDF
            protegido por senha** e credenciais para o BI Publisher.
            :::

            ~~~plsql
            -- Processo ou Ajax Callback: gera o PDF a partir de uma report query + layout e faz o download
            declare
                l_documento blob;
            begin
                l_documento := apex_print.generate_document(
                                   p_application_id          => :APP_ID,
                                   p_report_query_static_id  => 'PEDIDO',
                                   p_report_layout_static_id => 'PEDIDO_DOCX',
                                   p_output_type             => apex_print.c_output_pdf );

                apex_http.download(
                    p_blob         => l_documento,
                    p_content_type => 'application/pdf',
                    p_filename     => 'pedido-' || :P20_ID || '.pdf' );
            end;
            ~~~

            Outra assinatura de «GENERATE_DOCUMENT» recebe os dados em **JSON** e o modelo como BLOB — útil quando o modelo vem
            de uma tabela ou de upload.

            ## 3. Exportação por PL/SQL: APEX_DATA_EXPORT
            Introduzido no 20.2, recebe um contexto do «APEX_EXEC» e gera **CSV, HTML, PDF, XLSX, XML ou JSON**
            («c_format_csv», «c_format_html», «c_format_pdf», «c_format_xlsx», «c_format_xml», «c_format_json»). O resultado
            («t_export») traz «content_blob», «mime_type» e «file_name» — dá para baixar, gravar ou mandar por e-mail:

            ~~~plsql
            declare
                l_ctx     apex_exec.t_context;
                l_export  apex_data_export.t_export;
                l_mail_id number;
            begin
                l_ctx := apex_exec.open_query_context(
                             p_location  => apex_exec.c_location_local_db,
                             p_sql_query => 'select numero, cliente, total from pedidos where data_pedido >= trunc(sysdate) - 1' );

                l_export := apex_data_export.export(
                                p_context   => l_ctx,
                                p_format    => apex_data_export.c_format_xlsx,
                                p_file_name => 'pedidos' );
                apex_exec.close( l_ctx );

                l_mail_id := apex_mail.send(
                                 p_to   => 'vendas@example.com',
                                 p_from => 'nao-responda@example.com',
                                 p_subj => 'Pedidos das últimas 24 horas',
                                 p_body => 'Planilha em anexo.' );
                apex_mail.add_attachment(
                    p_mail_id    => l_mail_id,
                    p_attachment => l_export.content_blob,
                    p_filename   => 'pedidos.xlsx',
                    p_mime_type  => l_export.mime_type );
            exception
                when others then
                    apex_exec.close( l_ctx );
                    raise;
            end;
            ~~~

            Para baixar no navegador use «apex_data_export.download( p_export => l_export )». Para exportar uma região
            **exatamente como o usuário a vê** (filtros do IR incluídos), use «APEX_REGION.EXPORT_DATA» com «p_page_id»,
            «p_region_id» e «p_format». O pacote ainda tem «ADD_COLUMN», «ADD_AGGREGATE», «ADD_HIGHLIGHT» e
            «GET_PRINT_CONFIG» (tamanho de página, orientação, fontes).

            :::dica Arquivos prontos
            Para baixar BLOBs já gravados (contratos, notas), use o processo ou a Dynamic Action **Download** (24.1) ou
            «APEX_HTTP.DOWNLOAD». Veja [Upload e download de arquivos](#/topico/upload-download-arquivos).
            :::

            ## Data Reporter (26.1)
            :::novo Relatórios ad hoc para usuários de negócio
            O **Data Reporter** é uma ferramenta nova, irmã do App Builder e do SQL Workshop na home do APEX. Administradores
            definem **datasets** a partir de tabelas e views do workspace; editores criam relatórios (Interactive Report ou
            Faceted Search com tabela ou lista) numa interface simplificada; visualizadores apenas consultam. As páginas não são
            editadas no Page Designer, mas podem ser exportadas e importadas.
            :::
        `
    },
    en: {
        titulo: 'Printing, PDF and data export',
        resumo: 'Native report downloads, print servers and Document Generator, report queries and layouts, APEX_PRINT, APEX_DATA_EXPORT and the 26.1 Data Reporter.',
        tags: ['printing', 'PDF', 'Excel', 'XLSX', 'CSV', 'export', 'Document Generator', 'APEX_PRINT', 'APEX_DATA_EXPORT', 'report query', 'report layout', 'BI Publisher', 'Data Reporter'],
        conteudo: `
            "I need a PDF" is one of the most common requests in business applications. APEX offers three levels of solution —
            from a one-click download to documents based on Word templates — and, in 26.1, an ad hoc reporting tool for
            business users.

            ## 1. Native report downloads
            Interactive Reports, Interactive Grids and Classic Reports export **CSV, HTML, PDF and XLSX with no print server**
            (native PDF and Excel since 20.1/20.2). Enable the formats in the region download/printing attributes; users pick
            page orientation and size in the dialog. The IR can also e-mail the report and supports *subscriptions*.

            Native mode limits: in PDF, very long text in a row may be truncated; in Excel, each cell holds up to 32 KB. Custom
            layouts require a print server.

            ## 2. Print servers and layouts
            | Print server | Templates (layouts) | Notes |
            |---|---|---|
            | Native (none) | No custom layouts | Basic, zero setup |
            | Oracle Document Generator Pre-built Function | DOCX and XLSX | OCI function (24.1); the instance needs DBMS_CLOUD |
            | Oracle BI Publisher (Analytics Publisher) | RTF and XSL-FO | Requires a license |
            | APEX Office Print | DOCX, XLSX, PPTX, HTML, Markdown and more | Third-party product |
            | External (Apache FOP) | XSL-FO | External J2EE server |

            The configuration lives in instance administration (*Report Printing*); in the application, *Print Server Type* can
            be *Native Printing*, *Remote Print Server* or *Use Instance Settings* — Document Generator can only be selected
            through the instance settings.

            With a server configured, you create in *Shared Components*:
            - **Report Queries** — one or more SQL queries (not functions returning SQL) that supply the data;
            - **Report Layouts** — the template: *Generic Columns* or *Named Columns* (XSL-FO), RTF or DOCX/XLSX files
              depending on the server.

            To produce the document: the **Print Report** process (24.1), the *Print Report* dynamic action or the «APEX_PRINT» API.

            :::novo Document Generator
            In 24.1 the OCI **Document Generator** became a print server type: you design the template in Microsoft Word and
            APEX merges it with the data. 24.2 added XLSX templates and DOCX and XLSX outputs; 26.1 added
            **password-protected PDF** and credentials for BI Publisher.
            :::

            ~~~plsql
            -- Process or Ajax Callback: builds the PDF from a report query + layout and downloads it
            declare
                l_document blob;
            begin
                l_document := apex_print.generate_document(
                                  p_application_id          => :APP_ID,
                                  p_report_query_static_id  => 'ORDER',
                                  p_report_layout_static_id => 'ORDER_DOCX',
                                  p_output_type             => apex_print.c_output_pdf );

                apex_http.download(
                    p_blob         => l_document,
                    p_content_type => 'application/pdf',
                    p_filename     => 'order-' || :P20_ID || '.pdf' );
            end;
            ~~~

            Another «GENERATE_DOCUMENT» signature takes the data as **JSON** and the template as a BLOB — handy when the template
            comes from a table or an upload.

            ## 3. Exporting from PL/SQL: APEX_DATA_EXPORT
            Introduced in 20.2, it takes an «APEX_EXEC» context and produces **CSV, HTML, PDF, XLSX, XML or JSON**
            («c_format_csv», «c_format_html», «c_format_pdf», «c_format_xlsx», «c_format_xml», «c_format_json»). The result
            («t_export») carries «content_blob», «mime_type» and «file_name» — you can download, store or e-mail it:

            ~~~plsql
            declare
                l_ctx     apex_exec.t_context;
                l_export  apex_data_export.t_export;
                l_mail_id number;
            begin
                l_ctx := apex_exec.open_query_context(
                             p_location  => apex_exec.c_location_local_db,
                             p_sql_query => 'select order_no, customer, total from orders where order_date >= trunc(sysdate) - 1' );

                l_export := apex_data_export.export(
                                p_context   => l_ctx,
                                p_format    => apex_data_export.c_format_xlsx,
                                p_file_name => 'orders' );
                apex_exec.close( l_ctx );

                l_mail_id := apex_mail.send(
                                 p_to   => 'sales@example.com',
                                 p_from => 'no-reply@example.com',
                                 p_subj => 'Orders from the last 24 hours',
                                 p_body => 'Spreadsheet attached.' );
                apex_mail.add_attachment(
                    p_mail_id    => l_mail_id,
                    p_attachment => l_export.content_blob,
                    p_filename   => 'orders.xlsx',
                    p_mime_type  => l_export.mime_type );
            exception
                when others then
                    apex_exec.close( l_ctx );
                    raise;
            end;
            ~~~

            To download in the browser use «apex_data_export.download( p_export => l_export )». To export a region **exactly as
            the user sees it** (IR filters included), use «APEX_REGION.EXPORT_DATA» with «p_page_id», «p_region_id» and
            «p_format». The package also has «ADD_COLUMN», «ADD_AGGREGATE», «ADD_HIGHLIGHT» and «GET_PRINT_CONFIG» (page size,
            orientation, fonts).

            :::dica Ready-made files
            To download BLOBs already stored (contracts, invoices), use the **Download** process or dynamic action (24.1) or
            «APEX_HTTP.DOWNLOAD». See [File upload and download](#/topico/upload-download-arquivos).
            :::

            ## Data Reporter (26.1)
            :::novo Ad hoc reports for business users
            **Data Reporter** is a new tool, a sibling of App Builder and SQL Workshop on the APEX home page. Administrators
            define **datasets** from workspace tables and views; editors build reports (Interactive Report or Faceted Search
            with a table or list) in a simplified interface; viewers only consume them. Its pages are not edited in Page
            Designer, but they can be exported and imported.
            :::
        `
    }
});
