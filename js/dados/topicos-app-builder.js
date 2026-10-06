DOC.topico({
    id: 'create-app-wizard',
    cat: 'app-builder',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Choosing an Application Creation Method', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/choosing-an-application-creation-method.html' },
        { t: 'App Builder Guide — Creating an App Using Generative AI', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-an-app-using-generative-ai.html' },
        { t: 'App Builder Guide — Creating an Application from a File', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-an-application-from-a-file.html' }
    ],
    relacionados: ['page-designer', 'apex-assistant', 'blueprints-e-spec-driven', 'carga-de-dados', 'sql-workshop'],
    pt: {
        titulo: 'Criando aplicações: Create App Wizard, arquivos e IA',
        resumo: 'Todas as formas de criar uma aplicação no App Builder 26.1: criação rápida, assistente completo, a partir de arquivo, apps da Gallery e geração com IA.',
        tags: ['Create Application Wizard', 'criar aplicação', 'Create App From a File', 'planilha', 'CSV', 'XLSX', 'App Gallery', 'Starter Apps', 'Sample Apps', 'Create App Using Generative AI', 'blueprint', 'features'],
        conteudo: `
            O **App Builder** oferece vários caminhos para começar uma aplicação — do protótipo de um clique até a geração
            assistida por IA. Todos ficam em **App Builder → Create**. Este artigo cobre as opções do APEX 26.1 e quando usar cada uma.

            ## As opções de criação
            | Opção | O que faz | Quando usar |
            |---|---|---|
            | **Create Application** | Cria a app só com o nome: Global Page, Home e Login (criação simplificada desde o 23.2). | Protótipos e apps que você vai montar página a página. |
            | **Use Create App Wizard** | Assistente completo: páginas, features e configurações. | A maioria dos projetos novos sobre tabelas existentes. |
            | **Create App Using Generative AI** | Você descreve a app em linguagem natural para o APEX Assistant (24.1+). | Explorar ideias e gerar um esqueleto rapidamente. |
            | **Create App From a File** | Carrega CSV, XLSX, XML, TXT ou JSON (ou dados colados), cria a tabela e a app. | Substituir planilhas. |
            | **Create Fusion Integration** | Starter app integrada a uma instância do Oracle Fusion Applications. | Extensões de Fusion. |
            | **App Gallery** | Instala Sample, Starter, Custom e Utility Apps. | Aprender com exemplos ou partir de uma solução pronta. |

            ## O assistente completo
            O **Create Application Wizard** (com o conceito de *features* desde o 18.1) é organizado em blocos:
            1. **Name e Appearance** — nome, ícone, estilo do tema e posição da navegação (lateral ou superior).
            2. **Pages** — clique em *Add Page* para incluir páginas Blank, Calendar, Cards, Chart, Dashboard, Faceted Search,
               Smart Filters, Form, Interactive Grid, Interactive Report, Map, Master Detail, Classic Report, Multiple Reports,
               Timeline ou Wizard.
            3. **Features** — funcionalidades de aplicação (cada uma no máximo uma vez por app).
            4. **Settings** — Application ID, schema, autenticação, idioma e *Advanced Settings* (logging, debugging,
               deep linking, sessão e formatos de globalização).

            | Feature | O que adiciona |
            |---|---|
            | Install Progressive Web App | Torna a app instalável e cria a entrada "Install App". |
            | Push Notifications | Notificações push e a página de configurações do usuário. |
            | About Page | Página "Sobre" com a descrição da aplicação. |
            | Access Control | Papéis Administrator, Contributor e Reader, com páginas de administração. |
            | Activity Reporting | Relatórios de uso: Top Users, log de erros, Page Performance, Automations Log. |
            | Configuration Options | Permite ligar e desligar funcionalidades (build options). |
            | Feedback | Ícone de feedback na barra de navegação e relatório de comentários. |
            | Theme Style Selection | Escolha do estilo do tema pelo administrador (e, opcionalmente, pelo usuário). |

            :::dica JSON Application Blueprint
            Cada execução do assistente salva um **blueprint em JSON**. Em *Use Create App Wizard → Load Blueprint* você
            recarrega um desenho anterior e, em *View Blueprint*, edita o JSON — útil para duplicar a definição de uma página
            várias vezes em vez de clicar em *Add Page* repetidamente.
            :::

            ## Criando a partir de um arquivo
            Em **Create App From a File**, arraste o arquivo (ou cole dados delimitados) e configure a carga:
            - **Load To**: *New Table* (informe o nome) ou *Existing Table* (*Append* ou *Replace*).
            - **Primary Keys**: SYS_GUID ou *Identity Column*.
            - **Use Column Data Types**: deduz os tipos a partir do arquivo (senão, usa VARCHAR2(4000)).
            - **Column Headers**, delimitador, *Enclosed By* e *File Encoding*.

            Ao clicar em *Continue to Create Application Wizard*, o APEX já sugere páginas de relatório, formulário e
            dashboard para a nova tabela.

            ~~~texto Exemplo de CSV com cabeçalho
            CLIENTE,CIDADE,UF,LIMITE_CREDITO,DATA_CADASTRO
            Mercado Alfa,Campinas,SP,15000,2026-03-10
            Padaria Beta,Recife,PE,4200,2026-04-22
            ~~~

            ## Gerando com IA
            Desde o **24.1**, a opção **Create App Using Generative AI** abre o **APEX Assistant**: você descreve a aplicação,
            o assistente mostra um resumo das páginas e tabelas que pretende usar, você refina a conversa e, ao final, clica em
            *Create Application* para revisar tudo no assistente tradicional. Pré-requisito: um **Generative AI Service**
            configurado em *Workspace Utilities* com o atributo **Used by App Builder** ligado — sem ele a opção nem aparece.
            Se não houver tabelas, o assistente oferece instalar um *Sample Dataset*.

            ~~~texto Exemplo de prompt
            Crie uma aplicação de gestão de projetos sobre as tabelas EBA_PROJECTS e
            EBA_PROJECT_TASKS, com dashboard, relatório interativo de projetos e um
            formulário mestre-detalhe de tarefas.
            ~~~

            :::novo APEX 26.1 — o "AI Application Generator"
            - **Create Page Using Natural Language**: o assistente de criação de página aceita uma descrição e sugere nome,
              tipo de página e tabela.
            - **Blueprints em Markdown** (desenvolvimento orientado a especificação): você junta a especificação funcional, a
              descrição do schema (gerada em *SQL Workshop → Utilities → Describe Tables*) e o prompt de sistema publicado no
              repositório oracle/apex do GitHub; um agente de IA gera o blueprint, que é importado em *App Builder → Import* com
              o tipo **Application Blueprint**. Veja [Blueprints](#/topico/blueprints-e-spec-driven).
            - Novos **tipos de aplicação**: Standard, Theme, Library e Boilerplate (apps-modelo com páginas e subscriptions prontas).
            :::

            ## Depois da criação
            A app gerada é um ponto de partida: abra as páginas no [Page Designer](#/topico/page-designer), ajuste os
            [Shared Components](#/topico/componentes-compartilhados) e acrescente páginas com *Create Page*.

            :::atencao IDs reservados
            Os IDs de aplicação entre 3000 e 9000 são reservados para uso interno do APEX. Deixe o assistente gerar o ID ou
            defina uma faixa própria por ambiente.
            :::
        `
    },
    en: {
        titulo: 'Creating applications: Create App Wizard, files and AI',
        resumo: 'Every way to create an application in App Builder 26.1: quick create, the full wizard, from a file, Gallery apps and AI generation.',
        tags: ['Create Application Wizard', 'create application', 'Create App From a File', 'spreadsheet', 'CSV', 'XLSX', 'App Gallery', 'Starter Apps', 'Sample Apps', 'Create App Using Generative AI', 'blueprint', 'features'],
        conteudo: `
            **App Builder** offers several ways to start an application — from a one-click prototype to AI-assisted generation.
            They all live under **App Builder → Create**. This article covers the APEX 26.1 options and when to use each one.

            ## Creation options
            | Option | What it does | When to use it |
            |---|---|---|
            | **Create Application** | Creates the app from just a name: Global Page, Home and Login (simplified create since 23.2). | Prototypes and apps you will build page by page. |
            | **Use Create App Wizard** | Full wizard: pages, features and settings. | Most new projects on top of existing tables. |
            | **Create App Using Generative AI** | You describe the app in natural language to APEX Assistant (24.1+). | Exploring ideas and generating a skeleton fast. |
            | **Create App From a File** | Loads CSV, XLSX, XML, TXT or JSON (or pasted data), creates the table and the app. | Replacing spreadsheets. |
            | **Create Fusion Integration** | Starter app integrated with an Oracle Fusion Applications instance. | Fusion extensions. |
            | **App Gallery** | Installs Sample, Starter, Custom and Utility Apps. | Learning from examples or starting from a ready-made solution. |

            ## The full wizard
            The **Create Application Wizard** (built around *features* since 18.1) is organized in blocks:
            1. **Name and Appearance** — name, icon, theme style and navigation position (side or top).
            2. **Pages** — click *Add Page* to include Blank, Calendar, Cards, Chart, Dashboard, Faceted Search, Smart Filters,
               Form, Interactive Grid, Interactive Report, Map, Master Detail, Classic Report, Multiple Reports, Timeline or
               Wizard pages.
            3. **Features** — application-level functionality (each at most once per app).
            4. **Settings** — Application ID, schema, authentication, language and *Advanced Settings* (logging, debugging,
               deep linking, session and globalization formats).

            | Feature | What it adds |
            |---|---|
            | Install Progressive Web App | Makes the app installable and adds an "Install App" entry. |
            | Push Notifications | Push notifications plus a user settings page. |
            | About Page | An About page showing the application description. |
            | Access Control | Administrator, Contributor and Reader roles with admin pages. |
            | Activity Reporting | Usage reports: Top Users, error log, Page Performance, Automations Log. |
            | Configuration Options | Lets admins switch functionality on and off (build options). |
            | Feedback | A feedback icon in the navigation bar and a comments report. |
            | Theme Style Selection | Lets the admin (and optionally end users) pick the theme style. |

            :::dica JSON Application Blueprint
            Each run of the wizard saves a **JSON blueprint**. Under *Use Create App Wizard → Load Blueprint* you reload an
            earlier design and, with *View Blueprint*, edit the JSON — handy for duplicating a page definition many times
            instead of clicking *Add Page* over and over.
            :::

            ## Creating from a file
            In **Create App From a File**, drag the file in (or paste delimited data) and configure the load:
            - **Load To**: *New Table* (enter its name) or *Existing Table* (*Append* or *Replace*).
            - **Primary Keys**: SYS_GUID or *Identity Column*.
            - **Use Column Data Types**: infers types from the file (otherwise VARCHAR2(4000) is used).
            - **Column Headers**, delimiter, *Enclosed By* and *File Encoding*.

            When you click *Continue to Create Application Wizard*, APEX already proposes report, form and dashboard pages
            for the new table.

            ~~~texto Sample CSV with a header row
            CUSTOMER,CITY,STATE,CREDIT_LIMIT,CREATED_ON
            Alpha Market,Austin,TX,15000,2026-03-10
            Beta Bakery,Denver,CO,4200,2026-04-22
            ~~~

            ## Generating with AI
            Since **24.1**, **Create App Using Generative AI** opens **APEX Assistant**: you describe the application, the
            assistant summarizes the pages and tables it plans to use, you refine the conversation and finally click
            *Create Application* to review everything in the regular wizard. Prerequisite: a **Generative AI Service**
            configured in *Workspace Utilities* with **Used by App Builder** turned on — without it the option is hidden.
            If there are no tables, the assistant offers to install a *Sample Dataset*.

            ~~~texto Sample prompt
            Create a project management app on the EBA_PROJECTS and EBA_PROJECT_TASKS
            tables, with a dashboard, an interactive report of projects and a
            master-detail form for tasks.
            ~~~

            :::novo APEX 26.1 — the "AI Application Generator"
            - **Create Page Using Natural Language**: the Create Page wizard accepts a description and suggests the page
              name, page type and table.
            - **Markdown blueprints** (spec-driven development): you combine the functional spec, the schema description
              (generated in *SQL Workshop → Utilities → Describe Tables*) and the system prompt published in the oracle/apex
              GitHub repository; an AI coding agent produces the blueprint, which you import in *App Builder → Import* with the
              **Application Blueprint** file type. See [Blueprints](#/topico/blueprints-e-spec-driven).
            - New **application types**: Standard, Theme, Library and Boilerplate (template apps with pre-built pages and
              subscriptions).
            :::

            ## After creation
            The generated app is a starting point: open its pages in [Page Designer](#/topico/page-designer), tune the
            [Shared Components](#/topico/componentes-compartilhados) and add pages with *Create Page*.

            :::atencao Reserved IDs
            Application IDs from 3000 to 9000 are reserved for APEX internal use. Let the wizard generate the ID or define
            your own range per environment.
            :::
        `
    }
});

DOC.topico({
    id: 'page-designer',
    cat: 'app-builder',
    nivel: 'basico',
    desde: '5.0',
    links: [
        { t: 'App Builder Guide — About Page Designer', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-page-designer.html' },
        { t: 'App Builder Guide — Page Designer Toolbar', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/page-designer-toolbar.html' },
        { t: 'App Builder Guide — Page Designer Code Editor', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/code-editor-in-page-designer.html' }
    ],
    relacionados: ['create-app-wizard', 'componentes-compartilhados', 'ciclo-de-vida-da-pagina', 'dynamic-actions', 'apexlang'],
    pt: {
        titulo: 'Page Designer: o editor de páginas',
        resumo: 'Conheça os painéis, a árvore de componentes, o Property Editor, o layout em grid, o editor de código e os atalhos do Page Designer.',
        tags: ['Page Designer', 'Property Editor', 'Rendering', 'Gallery', 'Layout', 'grid', 'atalhos', 'Monaco', 'editor de código', 'APEXlang View', 'Component View'],
        conteudo: `
            O **Page Designer** é o IDE do APEX para editar páginas. Introduzido no **APEX 5.0**, ele substituiu a antiga
            *Component View* (a versão legada foi desuportada no 18.1, e a aba Component View dentro do Page Designer foi
            depreciada no 21.1 e removida no 21.2).

            ## Os três painéis
            | Painel | Conteúdo |
            |---|---|
            | Esquerdo | Abas **Rendering**, **Dynamic Actions**, **Processing** e **Page Shared Components**, em forma de árvore. |
            | Central | Abas **Layout**, **Page Search** e **Help**; abaixo do Layout fica a **Gallery** (Regions, Items, Buttons). |
            | Direito | **Property Editor**, com os atributos do componente selecionado. |

            O fluxo é sempre o mesmo: selecione um componente na árvore ou no Layout e edite-o no Property Editor.

            ### Árvore Rendering e aba Processing
            A árvore **Rendering** mostra regiões, itens e botões na ordem em que o APEX os processa, além da lógica
            *Pre-Rendering* (Before Header, After Header, Before Regions) e *Post-Rendering*. Clique com o botão direito para
            criar, duplicar, mover ou **comentar** componentes (*Comment Out* desativa sem apagar). A aba **Processing** mostra
            a ordem do submit: computações, validações, processos e branches.

            ### Property Editor
            - Atributos agrupados (Identification, Source, Layout, Appearance, Server-side Condition, Security...).
            - **Filter Properties** filtra atributos por palavra; o botão **Pin Filter** mantém o filtro ao trocar de componente.
            - **Go to Group** salta direto para um grupo.
            - Com **vários componentes selecionados**, só os atributos comuns aparecem — e a alteração vale para todos.
            - Erros e avisos aparecem no botão **Show Messages** da barra; clicar em uma mensagem leva ao atributo com problema.
            - A aba **Help** do painel central mostra a ajuda do atributo selecionado.

            ### Layout em grid
            O Universal Theme usa um grid de **12 colunas**. No grupo *Layout* de regiões e itens, defina **Start New Row**,
            **Column** e **Column Span**. Arraste componentes da Gallery para o Layout ou use o menu de contexto da Gallery →
            *Add To* para inserir em um ponto exato. *Display from Here* foca a visualização em uma região.

            ## Barra de ferramentas e Utilities
            | Controle | Uso |
            |---|---|
            | Seletor de página | Navegar entre páginas (Page Finder). |
            | Cadeado | Bloquear a página para outros desenvolvedores. |
            | Undo / Redo | Desfazer e refazer alterações. |
            | Create | Page, Copy Page, Breadcrumb Region, Shared Component, Page Group, comentários e issues. |
            | Utilities | Delete Page, Advisor, Caching, History, Checksum, Export, *Show* (Tooltips, Text Messages Picker, Layout View) e *Layout* (Two Pane, Three Pane, Reset Layout). |
            | Save / Save and Run Page | Salvar e executar a página. |

            ## Editor de código e atalhos
            Desde o **20.2** os campos de código usam o editor **Monaco** (o mesmo do VS Code), com realce de sintaxe para SQL,
            PL/SQL, JavaScript, HTML e CSS, validação, Query Builder e — com IA configurada — o **APEX Assistant** (24.1+).

            | Atalho | Ação |
            |---|---|
            | Ctrl+Space | Autocompletar |
            | Ctrl+Alt+V | Validar o código |
            | F1 | Command Palette (mais de 80 comandos) |
            | Ctrl+F / Ctrl+H | Localizar / substituir |
            | Ctrl+Z / Ctrl+Shift+Z | Desfazer / refazer |
            | Shift+Alt+clique | Múltiplos cursores |
            | Alt+6 | Ir para o Property Editor após selecionar um componente |
            | Alt+F1 | Ajuda do campo que está com o foco |

            ~~~plsql Server-side Condition do tipo Expression (linguagem PL/SQL)
            :P10_STATUS = 'ABERTO'
            and apex_authorization.is_authorized( 'GERENTE' )
            ~~~

            :::novo Mudanças no 26.1
            - **Utilities → Show APEXlang View**: visualização somente leitura da página salva no formato [APEXlang](#/topico/apexlang).
            - **Show → Global Page Components**: exibe ou oculta os componentes da página 0 na árvore e no layout.
            - O botão **Save** fica desabilitado enquanto não há alterações, e os cabeçalhos de grupo do Property Editor ficam
              fixos ao rolar.
            - O atributo *Static ID* de regiões e botões passou a se chamar **HTML DOM ID**, e *Page Template* tornou-se
              obrigatório (acabou a opção "Default Template").
            - O App Builder segue por padrão o tema claro/escuro do sistema (*Appearance: Auto*).
            :::

            :::dica Tela pequena?
            Use *Utilities → Layout → Two Pane Mode* para trabalhar só com o painel central e o Property Editor, e arraste abas
            entre painéis para montar o seu arranjo. *Reset Layout* volta ao padrão.
            :::
        `
    },
    en: {
        titulo: 'Page Designer: the page editor',
        resumo: 'Get to know the panes, component tree, Property Editor, grid layout, code editor and shortcuts of Page Designer.',
        tags: ['Page Designer', 'Property Editor', 'Rendering', 'Gallery', 'Layout', 'grid', 'shortcuts', 'Monaco', 'code editor', 'APEXlang View', 'Component View'],
        conteudo: `
            **Page Designer** is the APEX IDE for editing pages. Introduced in **APEX 5.0**, it replaced the old *Component View*
            (the legacy version was desupported in 18.1, and the Component View tab inside Page Designer was deprecated in 21.1
            and removed in 21.2).

            ## The three panes
            | Pane | Content |
            |---|---|
            | Left | **Rendering**, **Dynamic Actions**, **Processing** and **Page Shared Components** tabs, shown as trees. |
            | Center | **Layout**, **Page Search** and **Help** tabs; below Layout sits the **Gallery** (Regions, Items, Buttons). |
            | Right | **Property Editor**, with the attributes of the selected component. |

            The workflow is always the same: select a component in the tree or in Layout and edit it in the Property Editor.

            ### Rendering tree and Processing tab
            The **Rendering** tree shows regions, items and buttons in the order APEX processes them, plus *Pre-Rendering*
            (Before Header, After Header, Before Regions) and *Post-Rendering* logic. Right-click to create, duplicate, move or
            **comment out** components (*Comment Out* disables without deleting). The **Processing** tab shows the submit
            order: computations, validations, processes and branches.

            ### Property Editor
            - Attributes grouped (Identification, Source, Layout, Appearance, Server-side Condition, Security...).
            - **Filter Properties** filters attributes by keyword; the **Pin Filter** button keeps the filter while you switch
              components.
            - **Go to Group** jumps straight to a group.
            - With **multiple components selected**, only common attributes are shown — and a change applies to all of them.
            - Errors and warnings appear under the toolbar's **Show Messages** button; clicking a message takes you to the
              offending attribute.
            - The **Help** tab in the center pane shows help for the selected attribute.

            ### Grid layout
            Universal Theme uses a **12-column** grid. In the *Layout* group of regions and items set **Start New Row**,
            **Column** and **Column Span**. Drag components from the Gallery into Layout, or use the Gallery context menu →
            *Add To* to insert at an exact spot. *Display from Here* focuses the view on one region.

            ## Toolbar and Utilities
            | Control | Purpose |
            |---|---|
            | Page selector | Move between pages (Page Finder). |
            | Padlock | Lock the page against other developers. |
            | Undo / Redo | Undo and redo changes. |
            | Create | Page, Copy Page, Breadcrumb Region, Shared Component, Page Group, comments and issues. |
            | Utilities | Delete Page, Advisor, Caching, History, Checksum, Export, *Show* (Tooltips, Text Messages Picker, Layout View) and *Layout* (Two Pane, Three Pane, Reset Layout). |
            | Save / Save and Run Page | Save and run the page. |

            ## Code editor and shortcuts
            Since **20.2** code fields use the **Monaco** editor (the one behind VS Code), with syntax highlighting for SQL,
            PL/SQL, JavaScript, HTML and CSS, validation, Query Builder and — when AI is configured — **APEX Assistant** (24.1+).

            | Shortcut | Action |
            |---|---|
            | Ctrl+Space | Autocomplete |
            | Ctrl+Alt+V | Validate the code |
            | F1 | Command Palette (80+ commands) |
            | Ctrl+F / Ctrl+H | Find / replace |
            | Ctrl+Z / Ctrl+Shift+Z | Undo / redo |
            | Shift+Alt+click | Multiple cursors |
            | Alt+6 | Jump to the Property Editor after selecting a component |
            | Alt+F1 | Help for the focused field |

            ~~~plsql Server-side Condition of type Expression (PL/SQL language)
            :P10_STATUS = 'OPEN'
            and apex_authorization.is_authorized( 'MANAGER' )
            ~~~

            :::novo Changes in 26.1
            - **Utilities → Show APEXlang View**: a read-only view of the saved page in [APEXlang](#/topico/apexlang) format.
            - **Show → Global Page Components**: shows or hides page 0 components in the tree and layout.
            - The **Save** button stays disabled until there are changes, and Property Editor group headers stay pinned while
              scrolling.
            - The *Static ID* attribute of regions and buttons is now called **HTML DOM ID**, and *Page Template* is now
              required (the "Default Template" option is gone).
            - App Builder follows the OS light/dark preference by default (*Appearance: Auto*).
            :::

            :::dica Small screen?
            Use *Utilities → Layout → Two Pane Mode* to work with just the center pane and the Property Editor, and drag tabs
            between panes to build your own arrangement. *Reset Layout* restores the default.
            :::
        `
    }
});

DOC.topico({
    id: 'componentes-compartilhados',
    cat: 'app-builder',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Shared Components Page', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/shared-components-page.html' },
        { t: 'App Builder Guide — Using Shared Component Subscriptions', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-shared-component-subscriptions.html' },
        { t: 'App Builder Guide — Using Component Groups', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-component-groups.html' }
    ],
    relacionados: ['navegacao', 'listas-de-valores', 'reutilizacao-e-subscriptions', 'autenticacao', 'plugins'],
    pt: {
        titulo: 'Shared Components: visão geral',
        resumo: 'O que são os Shared Components, como estão organizados no APEX 26.1 e como reutilizá-los entre aplicações com subscriptions e Component Groups.',
        tags: ['Shared Components', 'componentes compartilhados', 'application items', 'application processes', 'build options', 'subscription', 'Component Groups', 'Application Settings', 'APEX_APP_SETTING'],
        conteudo: `
            **Shared Components** são os componentes definidos no nível da aplicação e reaproveitados por várias páginas:
            autenticação, listas de valores, menus, templates, processos de aplicação e muito mais. Você os acessa pelo botão
            **Shared Components** na página inicial da aplicação ou na barra do Page Designer.

            ## Como a página está organizada (26.1)
            | Grupo | Componentes |
            |---|---|
            | Application Logic | Application Definition, Application Items, Application Processes, Application Computations, Application Settings, Build Options |
            | Security | Security Attributes, Authentication Schemes, Authorization Schemes, Application Access Control, Session State Protection |
            | Other Components | List of Values, Plug-ins, Component Settings, Shortcuts, Component Groups, Data Load Definitions |
            | Navigation and Search | Lists, Navigation Menu, Tabs, Breadcrumbs, Navigation Bar List, Search Configurations |
            | User Interface | User Interface Attributes, Progressive Web App, Themes, Templates, Email Templates, Map Backgrounds |
            | Files and Reports | Static Application Files, Static Workspace Files, Report Queries, Report Layouts |
            | Data Sources | REST Data Sources, Duality Views, JSON Sources, Legacy Web Service References |
            | Workflows and Automations | Task Definitions, Automations, Workflows |
            | Globalization | Globalization Attributes, Text Messages, Application Translations |
            | Generative AI | AI Attributes, AI Agents, AI Services |

            *Credentials*, *REST Enabled SQL* e *Remote Servers* são objetos do **workspace**, compartilhados por todas as apps.

            ## Os mais usados no dia a dia
            - **Application Items**: variáveis globais da sessão, sem interface. Ótimas para guardar a filial, o perfil ou um
              parâmetro carregado no login. Proteja-as com *Session State Protection* quando o valor não puder vir do navegador.
            - **Application Processes**: PL/SQL executado em todas as páginas (pontos *On Load* e *On Submit*), uma única vez por
              sessão (*On New Instance*) ou sob demanda via AJAX (*Ajax Callback*).
            - **Application Computations**: atribuem valores a itens em pontos comuns a todas as páginas.
            - **Build Options**: incluem ou excluem componentes inteiros — perfeitas para "feature flags" e código só de desenvolvimento.
            - **Application Settings**: parâmetros configuráveis lidos com «APEX_APP_SETTING», sem alterar código.
            - **Lists, Breadcrumbs e Navigation Menu**: veja [Navegação](#/topico/navegacao).
            - **List of Values**: veja [Listas de valores](#/topico/listas-de-valores).

            ~~~plsql Carregando Application Items após o login (Post-Authentication)
            procedure carregar_contexto_usuario is
            begin
                select u.filial_id, u.perfil
                  into :AI_FILIAL_ID, :AI_PERFIL
                  from usuarios u
                 where u.username = :APP_USER;

                -- parâmetro ajustável sem novo deploy
                :AI_LIMITE_APROVACAO := apex_app_setting.get_value( p_name => 'LIMITE_APROVACAO' );
            exception
                when no_data_found then
                    :AI_PERFIL := 'CONVIDADO';
            end carregar_contexto_usuario;
            ~~~

            ## Reaproveitando entre aplicações
            - **Copy**: copia o componente para outra app (cópia independente).
            - **Subscribe**: a cópia fica vinculada a um **master** e é atualizada com *Refresh* (no assinante) ou *Publish*
              (no master). A API «APEX_SHARED_COMPONENT» (24.2) faz refresh e publish por código — no 26.1, também para temas.
            - **Component Groups** (24.1): agrupam componentes relacionados para copiar, assinar ou atualizar tudo de uma vez
              (temas e templates ficam de fora).

            :::novo 26.1: Static IDs e novos tipos de aplicação
            Todos os componentes passaram a ter **Static ID**, que virou o identificador principal ao copiar, assinar e comparar
            exports — trate-o como permanente. Surgiram também apps do tipo **Library** (só componentes reutilizáveis, como
            esquemas de autenticação e LOVs), **Theme** e **Boilerplate**. Veja
            [Reutilização e subscriptions](#/topico/reutilizacao-e-subscriptions).
            :::

            :::dica Quem usa este componente?
            No Page Designer, a aba **Page Shared Components** lista o que a página atual usa. As telas de cada tipo têm
            relatórios de *Utilization* e *History*, e o dicionário do APEX responde por SQL.
            :::

            ~~~sql
            select * from apex_application_items     where application_id = :APP_ID;
            select * from apex_application_processes where application_id = :APP_ID;
            select * from apex_application_lists     where application_id = :APP_ID;
            ~~~
        `
    },
    en: {
        titulo: 'Shared Components: an overview',
        resumo: 'What Shared Components are, how they are organized in APEX 26.1 and how to reuse them across apps with subscriptions and Component Groups.',
        tags: ['Shared Components', 'application items', 'application processes', 'build options', 'subscription', 'Component Groups', 'Application Settings', 'APEX_APP_SETTING'],
        conteudo: `
            **Shared Components** are components defined at application level and reused by many pages: authentication, lists
            of values, menus, templates, application processes and much more. You reach them through the **Shared Components**
            button on the application home page or in the Page Designer toolbar.

            ## How the page is organized (26.1)
            | Group | Components |
            |---|---|
            | Application Logic | Application Definition, Application Items, Application Processes, Application Computations, Application Settings, Build Options |
            | Security | Security Attributes, Authentication Schemes, Authorization Schemes, Application Access Control, Session State Protection |
            | Other Components | List of Values, Plug-ins, Component Settings, Shortcuts, Component Groups, Data Load Definitions |
            | Navigation and Search | Lists, Navigation Menu, Tabs, Breadcrumbs, Navigation Bar List, Search Configurations |
            | User Interface | User Interface Attributes, Progressive Web App, Themes, Templates, Email Templates, Map Backgrounds |
            | Files and Reports | Static Application Files, Static Workspace Files, Report Queries, Report Layouts |
            | Data Sources | REST Data Sources, Duality Views, JSON Sources, Legacy Web Service References |
            | Workflows and Automations | Task Definitions, Automations, Workflows |
            | Globalization | Globalization Attributes, Text Messages, Application Translations |
            | Generative AI | AI Attributes, AI Agents, AI Services |

            *Credentials*, *REST Enabled SQL* and *Remote Servers* are **workspace** objects shared by every app.

            ## The everyday ones
            - **Application Items**: session-wide global variables with no UI. Great for the user's branch, role or a parameter
              loaded at login. Protect them with *Session State Protection* when the value must not come from the browser.
            - **Application Processes**: PL/SQL that runs on every page (*On Load* and *On Submit* points), once per session
              (*On New Instance*) or on demand through AJAX (*Ajax Callback*).
            - **Application Computations**: assign item values at points shared by every page.
            - **Build Options**: include or exclude whole components — perfect for feature flags and development-only code.
            - **Application Settings**: configurable parameters read with «APEX_APP_SETTING», no code change needed.
            - **Lists, Breadcrumbs and Navigation Menu**: see [Navigation](#/topico/navegacao).
            - **List of Values**: see [Lists of values](#/topico/listas-de-valores).

            ~~~plsql Loading Application Items after login (Post-Authentication)
            procedure load_user_context is
            begin
                select u.branch_id, u.role_code
                  into :AI_BRANCH_ID, :AI_ROLE
                  from app_users u
                 where u.username = :APP_USER;

                -- tunable parameter, no redeploy required
                :AI_APPROVAL_LIMIT := apex_app_setting.get_value( p_name => 'APPROVAL_LIMIT' );
            exception
                when no_data_found then
                    :AI_ROLE := 'GUEST';
            end load_user_context;
            ~~~

            ## Reusing across applications
            - **Copy**: copies the component into another app (an independent copy).
            - **Subscribe**: the copy is linked to a **master** and updated with *Refresh* (on the subscriber) or *Publish* (on
              the master). The «APEX_SHARED_COMPONENT» API (24.2) refreshes and publishes from code — in 26.1, themes too.
            - **Component Groups** (24.1): bundle related components to copy, subscribe or refresh them all at once (themes and
              templates are not supported).

            :::novo 26.1: Static IDs and new application types
            Every component now has a **Static ID**, which became the primary identifier when copying, subscribing and diffing
            exports — treat it as permanent. There are also new **Library** apps (reusable components only, such as
            authentication schemes and LOVs), **Theme** apps and **Boilerplate** apps. See
            [Reuse and subscriptions](#/topico/reutilizacao-e-subscriptions).
            :::

            :::dica Who uses this component?
            In Page Designer, the **Page Shared Components** tab lists what the current page uses. Each component type has
            *Utilization* and *History* reports, and the APEX dictionary answers in SQL.
            :::

            ~~~sql
            select * from apex_application_items     where application_id = :APP_ID;
            select * from apex_application_processes where application_id = :APP_ID;
            select * from apex_application_lists     where application_id = :APP_ID;
            ~~~
        `
    }
});

DOC.topico({
    id: 'navegacao',
    cat: 'app-builder',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Adding Navigation', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/adding-navigation.html' },
        { t: 'App Builder Guide — Creating Dynamic Lists', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-dynamic-lists.html' },
        { t: 'App Builder Guide — Creating Breadcrumbs', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-breadcrumbs.html' }
    ],
    relacionados: ['componentes-compartilhados', 'botoes-e-branches', 'urls-do-apex', 'autorizacao', 'universal-theme'],
    pt: {
        titulo: 'Navegação: Navigation Menu, Lists, Breadcrumbs e Navigation Bar',
        resumo: 'Como o APEX monta a navegação a partir de Lists: menu lateral ou superior, Mega Menu, breadcrumbs, barra de navegação e listas dinâmicas.',
        tags: ['Navigation Menu', 'menu', 'Lists', 'listas', 'Breadcrumbs', 'Navigation Bar', 'Mega Menu', 'lista dinâmica', 'dynamic list', 'Tabs'],
        conteudo: `
            No APEX quase toda a navegação é construída a partir de **Lists** (*Shared Components → Navigation and Search*).
            Desde o 5.0 o menu principal é uma lista renderizada por um *list template*: mudar o visual é trocar o template,
            não reescrever o menu.

            ## As peças
            | Peça | Onde se configura | Observação |
            |---|---|---|
            | Navigation Menu | User Interface Attributes + lista do menu | Menu lateral (árvore) ou superior (barra ou Mega Menu). |
            | Navigation Bar | User Interface Attributes + lista da barra | Canto superior direito: usuário, sair, ajuda, feedback. |
            | Breadcrumbs | Shared Components → Breadcrumbs + região Breadcrumb | Trilha "Início › Clientes › Editar". |
            | Lists em regiões | Região do tipo List | Atalhos em cards, abas, wizard progress, menus. |
            | Tabs | Shared Components → Tabs | Recurso legado de temas antigos. |

            ## Navigation Menu
            Em *Shared Components → User Interface Attributes → Navigation Menu*:
            - **Display Navigation**: liga ou desliga o menu.
            - **Navigation Menu List**: a lista usada.
            - **Position**: *Side* (posição «#SIDE_GLOBAL_NAVIGATION_LIST#», árvore lateral) ou *Top*
              (posição «#TOP_GLOBAL_NAVIGATION_LIST#», no cabeçalho).
            - **List Template** e **Template Options**: por exemplo *Side Navigation Menu*, *Top Navigation Menu* ou
              *Mega Menu* (20.1+).

            Cada entrada da lista tem rótulo, destino (use *Page in this application*), ícone, entrada-pai (para submenus),
            **condição** e **Authorization Scheme**. O atributo *Current for Pages* marca a entrada como ativa também em
            páginas relacionadas (por exemplo, o relatório e o formulário de clientes). Desde o 23.2 uma entrada pode
            referenciar outra lista como sublista, com até 10 níveis.

            :::atencao Esconder o link não protege a página
            Uma autorização na entrada do menu só oculta o link. Proteja também a **página** (*Security → Authorization
            Scheme*) — senão o usuário chega a ela digitando a URL.
            :::

            ## Listas dinâmicas
            Quando o menu depende de dados, crie uma lista **Dynamic** baseada em SQL. As colunas são posicionais (os aliases
            são ignorados): nível, rótulo, URL de destino, *is current* («YES»/«NO»), ícone, atributos da imagem, texto ALT e
            até 10 atributos livres, que os templates usam por exemplo como badge.

            ~~~sql Lista dinâmica hierárquica
            select level                                as nivel,
                   nome                                 as rotulo,
                   apex_page.get_url( p_page   => 30,
                                      p_items  => 'P30_CATEGORIA_ID',
                                      p_values => id )  as destino,
                   case when id = :P30_CATEGORIA_ID
                        then 'YES' else 'NO' end         as is_current,
                   'fa-folder'                          as icone,
                   null                                 as icone_attr,
                   null                                 as icone_alt,
                   qtd_produtos                         as badge
              from categorias
             start with categoria_pai_id is null
            connect by prior id = categoria_pai_id
             order siblings by nome
            ~~~

            ## Breadcrumbs
            Breadcrumbs são um Shared Component com entradas hierárquicas: cada uma aponta para uma página e tem uma
            entrada-pai. O assistente *Create Page* pode criar a entrada automaticamente, e uma região **Breadcrumb** na posição
            *Breadcrumb Bar* exibe a trilha. Os rótulos aceitam substituições — «Pedido &P20_NUMERO.» gera uma trilha dinâmica.

            ## Navigation Bar
            Com **Implementation = List**, a barra é renderizada a partir de uma lista na posição «#NAVIGATION_BAR#» do page
            template. É ali que ficam o menu do usuário («&APP_USER.»), o link de saída («&LOGOUT_URL.»), ajuda e feedback.
            A opção *Classic* existe por compatibilidade com aplicações antigas.

            :::novo 26.1: atributos de link
            Entradas de lista ganharam **Link Attributes**: um campo nas listas estáticas e a coluna «link_attributes» nas
            dinâmicas, para incluir atributos HTML personalizados (como «target» ou «data-») em cada link.
            :::

            :::dica Menus grandes
            Para dezenas de entradas, prefira o template **Mega Menu** ou divida o menu em sublistas, e use ícones da
            [Font APEX](#/topico/icones-font-apex) de forma consistente.
            :::
        `
    },
    en: {
        titulo: 'Navigation: Navigation Menu, Lists, Breadcrumbs and Navigation Bar',
        resumo: 'How APEX builds navigation from Lists: side or top menu, Mega Menu, breadcrumbs, the navigation bar and dynamic lists.',
        tags: ['Navigation Menu', 'menu', 'Lists', 'Breadcrumbs', 'Navigation Bar', 'Mega Menu', 'dynamic list', 'Tabs'],
        conteudo: `
            In APEX almost all navigation is built from **Lists** (*Shared Components → Navigation and Search*). Since 5.0 the
            main menu is a list rendered by a *list template*: changing the look means changing the template, not rewriting
            the menu.

            ## The pieces
            | Piece | Where it is configured | Note |
            |---|---|---|
            | Navigation Menu | User Interface Attributes + menu list | Side menu (tree) or top menu (bar or Mega Menu). |
            | Navigation Bar | User Interface Attributes + bar list | Top-right corner: user, sign out, help, feedback. |
            | Breadcrumbs | Shared Components → Breadcrumbs + Breadcrumb region | The "Home › Customers › Edit" trail. |
            | Lists in regions | List region | Shortcut cards, tabs, wizard progress, menus. |
            | Tabs | Shared Components → Tabs | Legacy feature of old themes. |

            ## Navigation Menu
            Under *Shared Components → User Interface Attributes → Navigation Menu*:
            - **Display Navigation**: turns the menu on or off.
            - **Navigation Menu List**: the list to use.
            - **Position**: *Side* («#SIDE_GLOBAL_NAVIGATION_LIST#» position, a side tree) or *Top*
              («#TOP_GLOBAL_NAVIGATION_LIST#» position, in the header).
            - **List Template** and **Template Options**: e.g. *Side Navigation Menu*, *Top Navigation Menu* or *Mega Menu*
              (20.1+).

            Each list entry has a label, a target (use *Page in this application*), an icon, a parent entry (for submenus), a
            **condition** and an **Authorization Scheme**. The *Current for Pages* attribute marks the entry as active on
            related pages too (for example the customer report and form). Since 23.2 an entry can reference another list as a
            sublist, up to 10 levels deep.

            :::atencao Hiding the link does not protect the page
            An authorization on the menu entry only hides the link. Protect the **page** as well (*Security → Authorization
            Scheme*) — otherwise users can reach it by typing the URL.
            :::

            ## Dynamic lists
            When the menu depends on data, create a **Dynamic** list based on SQL. Columns are positional (aliases are
            ignored): level, label, target URL, *is current* («YES»/«NO»), icon, image attributes, ALT text and up to 10
            free attributes that templates use, for instance as a badge.

            ~~~sql Hierarchical dynamic list
            select level                                as lvl,
                   name                                 as label,
                   apex_page.get_url( p_page   => 30,
                                      p_items  => 'P30_CATEGORY_ID',
                                      p_values => id )  as target,
                   case when id = :P30_CATEGORY_ID
                        then 'YES' else 'NO' end         as is_current,
                   'fa-folder'                          as icon,
                   null                                 as icon_attr,
                   null                                 as icon_alt,
                   product_count                        as badge
              from categories
             start with parent_id is null
            connect by prior id = parent_id
             order siblings by name
            ~~~

            ## Breadcrumbs
            Breadcrumbs are a Shared Component with hierarchical entries: each points to a page and has a parent entry. The
            *Create Page* wizard can create the entry for you, and a **Breadcrumb** region in the *Breadcrumb Bar* position
            displays the trail. Labels accept substitutions — «Order &P20_ORDER_NO.» gives you a dynamic trail.

            ## Navigation Bar
            With **Implementation = List**, the bar is rendered from a list in the page template's «#NAVIGATION_BAR#» position.
            That is where the user menu («&APP_USER.»), the sign-out link («&LOGOUT_URL.»), help and feedback live. The
            *Classic* option exists for compatibility with older apps.

            :::novo 26.1: link attributes
            List entries gained **Link Attributes**: a field on static lists and a «link_attributes» column on dynamic lists,
            to add custom HTML attributes (such as «target» or «data-» attributes) to each link.
            :::

            :::dica Large menus
            For dozens of entries prefer the **Mega Menu** template or split the menu into sublists, and use
            [Font APEX](#/topico/icones-font-apex) icons consistently.
            :::
        `
    }
});

DOC.topico({
    id: 'paginas-modais',
    cat: 'app-builder',
    nivel: 'intermediario',
    desde: '5.0',
    links: [
        { t: 'App Builder Guide — Creating Dialog Pages', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-dialog-pages.html' },
        { t: 'JavaScript API — apex.navigation.dialog', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.navigation.dialog.html' }
    ],
    relacionados: ['botoes-e-branches', 'eventos-javascript', 'dynamic-actions', 'formularios', 'javascript-api'],
    pt: {
        titulo: 'Páginas modais e diálogos (Modal, Drawer, retorno de valores)',
        resumo: 'Crie páginas Modal Dialog e Drawer, feche o diálogo devolvendo itens e atualize a página-mãe com o evento Dialog Closed.',
        tags: ['modal', 'Modal Dialog', 'Drawer', 'Non-Modal Dialog', 'Dialog Closed', 'Close Dialog', 'Cancel Dialog', 'apex.navigation.dialog', 'Items to Return', 'apexafterclosedialog', 'Inline Dialog'],
        conteudo: `
            Páginas de diálogo abrem por cima da página atual — ideais para formulários de edição rápidos. Desde o
            **APEX 5.0** isso é declarativo: basta mudar o **Page Mode** da página.

            ## Tipos de diálogo
            | Tipo | Como configurar | Comportamento |
            |---|---|---|
            | Modal Dialog | Page Mode = Modal Dialog; template *Modal Dialog* (ou *Wizard Modal Dialog*) | Janela sobreposta; a página de fundo fica bloqueada. |
            | Drawer | Page Mode = Modal Dialog; Dialog Template = *Drawer* | Painel que desliza da borda da tela. |
            | Non-Modal Dialog | Page Mode = Non-Modal Dialog | Janela separada; o usuário continua usando a página-mãe. |
            | Inline Dialog / Inline Drawer | Template de **região** + DAs *Open Region* / *Close Region* | Não é outra página: a região já está na página atual. |

            Os drawers chegaram ao Universal Theme no 21.2 e, desde o 22.2, os assistentes criam páginas de formulário como
            Drawer por padrão. Pré-requisito geral: o tema precisa ter um page template do tipo *Dialog Page* (o Universal
            Theme já tem).

            ## Atributos do diálogo
            No Property Editor da página, grupo **Dialog**: *Width*, *Height*, *Maximum Width*, *Attributes*, *CSS Classes*,
            **Chained** (reaproveita a mesma janela quando um diálogo abre outro) e *Resizable*.

            ## Abrindo o diálogo
            Qualquer link ou botão com destino *Page in this application* apontando para uma página modal já abre o diálogo —
            o APEX gera uma URL «javascript:apex.navigation.dialog(...)». Em código, gere a URL no servidor com
            «APEX_PAGE.GET_URL» (que já devolve essa URL para páginas de diálogo) e navegue com «apex.navigation.redirect»:

            ~~~js
            // P10_URL_EDITAR foi calculado no servidor com apex_page.get_url( p_page => 20, ... )
            apex.navigation.redirect( apex.item( "P10_URL_EDITAR" ).getValue() );
            ~~~

            ## Fechando e devolvendo valores
            - Processo **Close Dialog**: fecha o diálogo depois do submit. Em **Items to Return** liste os itens que a
              página-mãe deve receber (ex.: «P20_ID»). Os assistentes de formulário criam esse processo automaticamente.
            - Ação dinâmica **Close Dialog**: fecha sem submit.
            - Ação dinâmica **Cancel Dialog**: fecha sem devolver nada (o clássico botão *Cancelar*).
            - Em JavaScript: «apex.navigation.dialog.close( true, ["P20_ID","P20_NOME"] )» e
              «apex.navigation.dialog.cancel( true )».

            Um branch de um diálogo para uma página normal fecha o diálogo e navega a página-mãe. De diálogo para diálogo, as
            duas páginas precisam do mesmo Page Mode (e *Chained* ligado para reaproveitar a janela).

            ## Atualizando a página-mãe
            Crie uma Dynamic Action na página que abriu o diálogo:
            1. **Event**: *Dialog Closed* (ou *Dialog Closed or Canceled*).
            2. **Selection Type**: o elemento que abriu o diálogo — o botão ou a **região** que contém o link (o evento é
               disparado no elemento de origem e sobe pelo DOM).
            3. **True Actions**: *Refresh* na região do relatório e, se precisar do valor devolvido, *Set Value* com
               **Set Type = Dialog Return Item**.

            Os valores devolvidos também ficam em «this.data» numa ação *Execute JavaScript Code*:

            ~~~js Dynamic Action "Dialog Closed" → Execute JavaScript Code
            var pedidoId = this.data.P20_ID;
            apex.message.showPageSuccess( "Pedido " + pedidoId + " salvo com sucesso." );
            apex.region( "pedidos" ).refresh();   // "pedidos" é o HTML DOM ID da região
            ~~~

            Por baixo dos panos, os eventos JavaScript são «apexafterclosedialog» e «apexafterclosecanceldialog».

            :::atencao O valor não chegou?
            Se «this.data» vier vazio, confira se o item está em **Items to Return** do processo ou da ação *Close Dialog* e
            se o fechamento acontece **depois** do processo que gera o valor (por exemplo, o ID criado pelo
            *Automatic Row Processing*).
            :::

            :::novo Novidades do 26.1
            O Universal Theme 26.1 acrescentou drawers que abrem **no topo e na base** da tela e um *slot* de rodapé para
            Inline Drawers e Inline Dialogs. E *Save and Run* em uma página modal agora recarrega o próprio diálogo aberto.
            :::
        `
    },
    en: {
        titulo: 'Modal pages and dialogs (Modal, Drawer, returning values)',
        resumo: 'Build Modal Dialog and Drawer pages, close the dialog returning items and refresh the parent page with the Dialog Closed event.',
        tags: ['modal', 'Modal Dialog', 'Drawer', 'Non-Modal Dialog', 'Dialog Closed', 'Close Dialog', 'Cancel Dialog', 'apex.navigation.dialog', 'Items to Return', 'apexafterclosedialog', 'Inline Dialog'],
        conteudo: `
            Dialog pages open on top of the current page — ideal for quick edit forms. Since **APEX 5.0** this is declarative:
            you just change the page's **Page Mode**.

            ## Dialog types
            | Type | How to configure | Behavior |
            |---|---|---|
            | Modal Dialog | Page Mode = Modal Dialog; *Modal Dialog* (or *Wizard Modal Dialog*) template | Overlay window; the page behind is blocked. |
            | Drawer | Page Mode = Modal Dialog; Dialog Template = *Drawer* | A panel that slides in from the screen edge. |
            | Non-Modal Dialog | Page Mode = Non-Modal Dialog | Separate window; the user can keep using the parent page. |
            | Inline Dialog / Inline Drawer | **Region** template + *Open Region* / *Close Region* DAs | Not another page: the region is already on the current page. |

            Drawers arrived in Universal Theme in 21.2 and, since 22.2, the wizards create form pages as Drawers by default.
            General prerequisite: the theme must have a page template of type *Dialog Page* (Universal Theme does).

            ## Dialog attributes
            In the page's Property Editor, **Dialog** group: *Width*, *Height*, *Maximum Width*, *Attributes*, *CSS Classes*,
            **Chained** (reuses the same window when one dialog opens another) and *Resizable*.

            ## Opening the dialog
            Any link or button whose target is *Page in this application* pointing to a modal page already opens the dialog —
            APEX generates a «javascript:apex.navigation.dialog(...)» URL. In code, build the URL on the server with
            «APEX_PAGE.GET_URL» (which already returns that URL for dialog pages) and navigate with «apex.navigation.redirect»:

            ~~~js
            // P10_EDIT_URL was computed on the server with apex_page.get_url( p_page => 20, ... )
            apex.navigation.redirect( apex.item( "P10_EDIT_URL" ).getValue() );
            ~~~

            ## Closing and returning values
            - **Close Dialog** process: closes the dialog after the submit. In **Items to Return** list the items the parent
              page should receive (e.g. «P20_ID»). The form wizards create this process for you.
            - **Close Dialog** dynamic action: closes without a submit.
            - **Cancel Dialog** dynamic action: closes returning nothing (the classic *Cancel* button).
            - In JavaScript: «apex.navigation.dialog.close( true, ["P20_ID","P20_NAME"] )» and
              «apex.navigation.dialog.cancel( true )».

            A branch from a dialog to a normal page closes the dialog and navigates the parent page. From dialog to dialog,
            both pages need the same Page Mode (and *Chained* on to reuse the window).

            ## Refreshing the parent page
            Create a Dynamic Action on the page that opened the dialog:
            1. **Event**: *Dialog Closed* (or *Dialog Closed or Canceled*).
            2. **Selection Type**: the element that opened the dialog — the button or the **region** containing the link (the
               event fires on the triggering element and bubbles up the DOM).
            3. **True Actions**: *Refresh* the report region and, if you need the returned value, *Set Value* with
               **Set Type = Dialog Return Item**.

            Returned values are also available in «this.data» inside an *Execute JavaScript Code* action:

            ~~~js "Dialog Closed" Dynamic Action → Execute JavaScript Code
            var orderId = this.data.P20_ID;
            apex.message.showPageSuccess( "Order " + orderId + " saved." );
            apex.region( "orders" ).refresh();   // "orders" is the region's HTML DOM ID
            ~~~

            Under the hood, the JavaScript events are «apexafterclosedialog» and «apexafterclosecanceldialog».

            :::atencao The value did not arrive?
            If «this.data» is empty, check that the item is listed in **Items to Return** of the *Close Dialog* process or
            action, and that the dialog closes **after** the process that produces the value (for example, the ID created by
            *Automatic Row Processing*).
            :::

            :::novo New in 26.1
            Universal Theme 26.1 added drawers that open from the **top and bottom** of the screen and a footer slot for
            Inline Drawers and Inline Dialogs. And *Save and Run* on a modal page now reloads the open dialog itself.
            :::
        `
    }
});

DOC.topico({
    id: 'botoes-e-branches',
    cat: 'app-builder',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Managing Buttons', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-buttons.html' },
        { t: 'App Builder Guide — Controlling Navigation Using Branches', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/controlling-navigation-using-branches.html' },
        { t: 'JavaScript API — apex.page', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.page.html' }
    ],
    relacionados: ['ciclo-de-vida-da-pagina', 'paginas-modais', 'dynamic-actions', 'urls-do-apex', 'processos-computacoes-validacoes'],
    pt: {
        titulo: 'Botões, branches e redirecionamentos',
        resumo: 'Ações de botão, REQUEST, confirmação, Show Processing, branches após o submit e as formas corretas de redirecionar no servidor e no navegador.',
        tags: ['botão', 'button', 'branch', 'redirect', 'redirecionar', 'REQUEST', 'When Button Pressed', 'apex.page.submit', 'apex.navigation.redirect', 'apex_util.redirect_url', 'Show Processing', 'Trigger Action'],
        conteudo: `
            Botões disparam ações; **branches** decidem para onde o usuário vai depois do submit. Entender os dois evita
            redirecionamentos "mágicos" e processos executando na hora errada.

            ## O que um botão pode fazer
            | Action | Efeito |
            |---|---|
            | Submit Page | Envia a página; o nome do botão vira o valor de «REQUEST». |
            | Redirect to Page in this Application | Navega sem submit (pode limpar cache, definir itens e REQUEST). |
            | Redirect to Page in a different Application | Idem, para outra app (exige *Deep Linking* na app de destino). |
            | Redirect to URL | Vai para uma URL qualquer. |
            | Defined by Dynamic Action | Nada acontece sozinho: uma DA trata o clique. |
            | Trigger Action (26.1) | Ações dinâmicas definidas diretamente sob o botão, na árvore de Rendering. |

            ## Atributos que fazem diferença
            - **Button Name**: vira o REQUEST. Padronize os nomes (SAVE, CREATE, DELETE...).
            - **Hot**, **Template** (texto, ícone ou ambos) e **Template Options** definem o visual.
            - **Database Action**: indica se o botão representa INSERT, UPDATE ou DELETE para o processamento automático de
              formulários.
            - **Server-side Condition** e **Authorization Scheme**: escondem o botão quando ele não se aplica.
            - **Warn on Unsaved Changes**: *Page Default* ou *Do Not Check*.
            - **Show Processing**: exibe o indicador de espera e evita submits duplicados.
            - **Requires Confirmation**: mensagem e estilo (*Default*, *Information*, *Warning*, *Danger*, *Success*) antes da ação.

            :::novo Botões no 26.1
            - **Type = Menu**: o botão vira um menu, com as entradas como filhas na árvore de Rendering.
            - **Show as Disabled**: quando a condição server-side é falsa, o botão aparece desabilitado em vez de sumir.
            - **Trigger Actions**: DAs declarativas para botões, ações de cards e menus.
            - O antigo *Static ID* do botão agora se chama **HTML DOM ID**.
            :::

            ## REQUEST e "When Button Pressed"
            Processos e validações têm a condição **When Button Pressed** — o jeito mais simples de amarrar lógica a um botão.
            Em PL/SQL, use «:REQUEST»:

            ~~~plsql
            begin
                if :REQUEST = 'APROVAR' then
                    pedidos_api.aprovar( p_id => :P20_ID, p_usuario => :APP_USER );
                elsif :REQUEST in ( 'REPROVAR', 'CANCELAR' ) then
                    pedidos_api.encerrar( p_id => :P20_ID, p_motivo => :REQUEST );
                end if;
            end;
            ~~~

            ## Branches
            Branches são criados na aba **Processing** do Page Designer e podem rodar em cinco pontos:

            | Ponto | Quando executa |
            |---|---|
            | Before Header | Na renderização, antes de qualquer HTML (redireciona sem mostrar a página). |
            | After Submit | Logo após o submit, antes das computações. |
            | Validating | Antes das validações. |
            | Processing | Antes dos processos. |
            | After Processing | O mais comum: depois que os processos rodaram com sucesso. |

            Tipos disponíveis: *Page or URL (Redirect)*, *Page Identified by Item*, *URL Identified by Item*,
            *PL/SQL Procedure*, *Function Returning a URL*, *Function Returning a Page* e *Branch to Page Accept*. Os branches
            são avaliados pela sequência e o primeiro cuja condição é satisfeita vence — por isso deixe o branch sem condição
            por último.

            ~~~plsql Branch do tipo "Function Returning a URL"
            return apex_page.get_url(
                       p_page        => case when :REQUEST = 'SALVAR_E_NOVO' then 20 else 10 end,
                       p_clear_cache => '20' );
            ~~~

            ## Redirecionando por código
            - **No servidor** (por exemplo, num processo *Before Header*):
              «apex_util.redirect_url( apex_page.get_url( p_page => 1 ) )».
            - **No navegador**: «apex.navigation.redirect( url )» para navegar e
              «apex.page.submit( { request: "SALVAR", showWait: true, validate: true } )» para enviar a página com um REQUEST.

            :::dica Sem branch?
            Se nenhum branch se aplica depois do submit, o APEX exibe a mesma página novamente. A mensagem de sucesso do
            processo aparece na página de destino.
            :::

            :::atencao Não monte URLs na mão
            Use o destino declarativo *Page in this application* ou «APEX_PAGE.GET_URL» para que os checksums da
            [Session State Protection](#/topico/session-state-protection) e as Friendly URLs funcionem.
            :::
        `
    },
    en: {
        titulo: 'Buttons, branches and redirects',
        resumo: 'Button actions, REQUEST, confirmation, Show Processing, branches after submit and the right ways to redirect on the server and in the browser.',
        tags: ['button', 'branch', 'redirect', 'REQUEST', 'When Button Pressed', 'apex.page.submit', 'apex.navigation.redirect', 'apex_util.redirect_url', 'Show Processing', 'Trigger Action'],
        conteudo: `
            Buttons fire actions; **branches** decide where the user goes after the submit. Understanding both avoids
            "magic" redirects and processes running at the wrong time.

            ## What a button can do
            | Action | Effect |
            |---|---|
            | Submit Page | Submits the page; the button name becomes the «REQUEST» value. |
            | Redirect to Page in this Application | Navigates without submitting (can clear cache, set items and REQUEST). |
            | Redirect to Page in a different Application | Same, for another app (requires *Deep Linking* in the target app). |
            | Redirect to URL | Goes to any URL. |
            | Defined by Dynamic Action | Nothing happens by itself: a DA handles the click. |
            | Trigger Action (26.1) | Dynamic actions defined right under the button in the Rendering tree. |

            ## Attributes that matter
            - **Button Name**: becomes the REQUEST. Standardize names (SAVE, CREATE, DELETE...).
            - **Hot**, **Template** (text, icon or both) and **Template Options** define the look.
            - **Database Action**: tells automatic form processing whether the button means INSERT, UPDATE or DELETE.
            - **Server-side Condition** and **Authorization Scheme**: hide the button when it does not apply.
            - **Warn on Unsaved Changes**: *Page Default* or *Do Not Check*.
            - **Show Processing**: shows the wait indicator and prevents double submits.
            - **Requires Confirmation**: message and style (*Default*, *Information*, *Warning*, *Danger*, *Success*) before
              the action runs.

            :::novo Buttons in 26.1
            - **Type = Menu**: the button becomes a menu, with entries as children in the Rendering tree.
            - **Show as Disabled**: when the server-side condition is false, the button is rendered disabled instead of hidden.
            - **Trigger Actions**: declarative DAs for buttons, card actions and menus.
            - The button's former *Static ID* is now called **HTML DOM ID**.
            :::

            ## REQUEST and "When Button Pressed"
            Processes and validations have a **When Button Pressed** condition — the simplest way to tie logic to a button. In
            PL/SQL use «:REQUEST»:

            ~~~plsql
            begin
                if :REQUEST = 'APPROVE' then
                    orders_api.approve( p_id => :P20_ID, p_user => :APP_USER );
                elsif :REQUEST in ( 'REJECT', 'CANCEL' ) then
                    orders_api.close_order( p_id => :P20_ID, p_reason => :REQUEST );
                end if;
            end;
            ~~~

            ## Branches
            Branches are created in Page Designer's **Processing** tab and can run at five points:

            | Point | When it runs |
            |---|---|
            | Before Header | During rendering, before any HTML (redirects without showing the page). |
            | After Submit | Right after the submit, before computations. |
            | Validating | Before validations. |
            | Processing | Before processes. |
            | After Processing | The most common: after the processes ran successfully. |

            Available types: *Page or URL (Redirect)*, *Page Identified by Item*, *URL Identified by Item*,
            *PL/SQL Procedure*, *Function Returning a URL*, *Function Returning a Page* and *Branch to Page Accept*. Branches
            are evaluated in sequence and the first one whose condition is met wins — so keep the unconditional branch last.

            ~~~plsql "Function Returning a URL" branch
            return apex_page.get_url(
                       p_page        => case when :REQUEST = 'SAVE_AND_NEW' then 20 else 10 end,
                       p_clear_cache => '20' );
            ~~~

            ## Redirecting from code
            - **On the server** (for example in a *Before Header* process):
              «apex_util.redirect_url( apex_page.get_url( p_page => 1 ) )».
            - **In the browser**: «apex.navigation.redirect( url )» to navigate and
              «apex.page.submit( { request: "SAVE", showWait: true, validate: true } )» to submit the page with a REQUEST.

            :::dica No branch?
            If no branch applies after the submit, APEX simply shows the same page again. The process success message is
            displayed on the destination page.
            :::

            :::atencao Do not build URLs by hand
            Use the declarative *Page in this application* target or «APEX_PAGE.GET_URL» so that
            [Session State Protection](#/topico/session-state-protection) checksums and Friendly URLs keep working.
            :::
        `
    }
});

DOC.topico({
    id: 'plugins',
    cat: 'app-builder',
    nivel: 'avancado',
    desde: '4.0',
    links: [
        { t: 'App Builder Guide — Implementing Plug-ins', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/implementing-plug-ins.html' },
        { t: 'App Builder Guide — Creating Plug-ins', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-plug-ins.html' },
        { t: 'API Reference — APEX_PLUGIN', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_PLUGIN.html' }
    ],
    relacionados: ['template-components', 'dynamic-actions', 'javascript-api', 'reutilizacao-e-subscriptions', 'escaping-e-xss'],
    pt: {
        titulo: 'Plug-ins: tipos, onde encontrar e como criar o seu',
        resumo: 'Estenda o APEX com novos tipos de região, item, ação dinâmica, processo e mais: onde obter plug-ins prontos e como escrever um do zero.',
        tags: ['plug-in', 'plugin', 'apex.world', 'APEX_PLUGIN', 'APEX_PLUGIN_UTIL', 'region plug-in', 'item plug-in', 'dynamic action plug-in', 'custom attributes', 'Template Component', 'extensão'],
        conteudo: `
            **Plug-ins** acrescentam novos tipos de componente ao APEX: um plug-in de região aparece na lista de tipos de
            região, um plug-in de item na lista de tipos de item, e assim por diante. Existem desde o **APEX 4.0** e ficam em
            *Shared Components → Other Components → Plug-ins*.

            ## Tipos de plug-in (26.1)
            | Tipo | Para quê |
            |---|---|
            | Region | Componentes visuais (gráficos, timelines, editores). |
            | Item | Campos de formulário com comportamento próprio. |
            | Dynamic Action | Novas ações para Dynamic Actions. |
            | Process | Lógica de servidor reutilizável (inclusive como atividade de workflow). |
            | Authentication Scheme Type | Novos métodos de login. |
            | Authorization Scheme Type | Regras de autorização reutilizáveis. |
            | REST Data Source | Adaptadores para APIs REST específicas. |
            | Template Component | Componentes baseados em templates HTML (23.1+). |
            | Generative AI Tool | Ferramentas reutilizáveis para AI Agents (26.1). |

            ## Onde encontrar plug-ins prontos
            - **apex.world** — diretório da comunidade com centenas de plug-ins.
            - **github.com/oracle/apex** — exemplos oficiais (escolha o branch da versão e abra a pasta de plug-ins).
            - Importe o arquivo em *App Builder → Import* (tipo *Plug-in*) ou na própria página de plug-ins. Para várias apps,
              mantenha o plug-in numa app master e use **subscription**.

            :::atencao Plug-in é código rodando no seu schema
            Um plug-in executa PL/SQL e JavaScript com os privilégios da aplicação. Antes de usar um de terceiros, revise o
            código (escape de saída, SQL dinâmico), verifique se é mantido para a sua versão e se convive com a sua Content
            Security Policy — o 26.1 dispensa «unsafe-inline» no core do APEX, mas plug-ins com scripts inline podem exigi-lo.
            :::

            ## Anatomia de um plug-in
            - **Name**, **Static ID** (identificador único, ex.: «COM.EMPRESA.SAUDACAO») e **APEXlang Name** (26.1).
            - **Type** e **Source → PL/SQL Code** com os callbacks. Em produção, prefira um **pacote** no banco e informe só
              «pacote.procedimento» nos callbacks (o código não é interpretado a cada requisição).
            - **Callbacks**: renderização, AJAX, validação, execução — variam por tipo.
            - **Standard Attributes**: o que o componente suporta (para itens: *Session State Changeable*,
              *Has Read Only Attribute* etc.).
            - **Custom Attributes**: as propriedades exibidas no Property Editor, cada uma com seu Static ID.
            - **Files**: JS, CSS e imagens, referenciados com «#PLUGIN_FILES#».
            - **Events**: eventos personalizados que Dynamic Actions podem escutar.

            ## Exemplo: plug-in de região mínimo
            Com **API Interface = Procedure**, a assinatura moderna recebe parâmetros e um registro de resultado. Informe
            «render_saudacao» como procedimento de renderização:

            ~~~plsql
            procedure render_saudacao (
                p_plugin in            apex_plugin.t_plugin,
                p_region in            apex_plugin.t_region,
                p_param  in            apex_plugin.t_region_render_param,
                p_result in out nocopy apex_plugin.t_region_render_result )
            is
                l_mensagem varchar2(4000);
            begin
                l_mensagem := p_region.attributes.get_varchar2(
                                  p_static_id     => 'mensagem',
                                  p_default_value => 'Olá' );

                apex_plugin_util.debug_region( p_plugin => p_plugin, p_region => p_region );

                sys.htp.p( '<div class="saudacao">'
                        || apex_escape.html( l_mensagem || ', ' || :APP_USER )
                        || '</div>' );
            end render_saudacao;
            ~~~

            ## Atributos ilimitados
            Plug-ins antigos liam «p_region.attribute_01» a «attribute_25». Com API Interface = Procedure, os atributos são
            lidos pelo Static ID com «attributes.get_varchar2», «get_number» etc., sem limite de quantidade. Isso vale para
            regiões desde o 24.1, itens desde o 24.2 e, no 26.1, também para Dynamic Action, Process, autenticação,
            autorização e REST Data Source (plug-ins existentes precisam de pequenos ajustes).

            :::novo 26.1
            Novo atributo **APEXlang Name** (nome em camel case usado nos arquivos APEXlang), tipo **Generative AI Tool**,
            opção **Template Support** nos atributos customizados (realce de template directives no editor) e depreciação de
            «t_plugin.name» (use «static_id») e de «t_region.static_id» (use «dom_id»).
            :::

            :::dica Depure com as Debug Messages
            Rode a página em modo debug: «apex_plugin_util.debug_region» registra os atributos do plug-in, e mensagens próprias
            com «apex_debug.info» ajudam a seguir o fluxo. Veja [Modo debug](#/topico/modo-debug).
            :::
        `
    },
    en: {
        titulo: 'Plug-ins: types, where to find them and how to build your own',
        resumo: 'Extend APEX with new region, item, dynamic action, process and other types: where to get ready-made plug-ins and how to write one from scratch.',
        tags: ['plug-in', 'plugin', 'apex.world', 'APEX_PLUGIN', 'APEX_PLUGIN_UTIL', 'region plug-in', 'item plug-in', 'dynamic action plug-in', 'custom attributes', 'Template Component', 'extension'],
        conteudo: `
            **Plug-ins** add new component types to APEX: a region plug-in shows up in the region type list, an item plug-in
            in the item type list, and so on. They exist since **APEX 4.0** and live under
            *Shared Components → Other Components → Plug-ins*.

            ## Plug-in types (26.1)
            | Type | Purpose |
            |---|---|
            | Region | Visual components (charts, timelines, editors). |
            | Item | Form fields with their own behavior. |
            | Dynamic Action | New actions for Dynamic Actions. |
            | Process | Reusable server-side logic (also usable as a workflow activity). |
            | Authentication Scheme Type | New sign-in methods. |
            | Authorization Scheme Type | Reusable authorization rules. |
            | REST Data Source | Adapters for specific REST APIs. |
            | Template Component | Components based on HTML templates (23.1+). |
            | Generative AI Tool | Reusable tools for AI Agents (26.1). |

            ## Where to find ready-made plug-ins
            - **apex.world** — the community directory with hundreds of plug-ins.
            - **github.com/oracle/apex** — official samples (pick the release branch and open the plug-ins folder).
            - Import the file in *App Builder → Import* (*Plug-in* type) or on the app's plug-ins page. For many apps, keep the
              plug-in in a master app and use a **subscription**.

            :::atencao A plug-in is code running in your schema
            A plug-in runs PL/SQL and JavaScript with the application's privileges. Before adopting a third-party one, review
            the code (output escaping, dynamic SQL), check that it is maintained for your release and that it works with your
            Content Security Policy — 26.1 no longer needs «unsafe-inline» for APEX core, but plug-ins with inline scripts may
            still require it.
            :::

            ## Anatomy of a plug-in
            - **Name**, **Static ID** (unique identifier, e.g. «COM.COMPANY.GREETING») and **APEXlang Name** (26.1).
            - **Type** and **Source → PL/SQL Code** holding the callbacks. In production prefer a database **package** and
              enter just «package.procedure» in the callbacks (the code is not interpreted on every request).
            - **Callbacks**: render, AJAX, validation, execution — they vary by type.
            - **Standard Attributes**: what the component supports (for items: *Session State Changeable*,
              *Has Read Only Attribute* and so on).
            - **Custom Attributes**: the properties shown in the Property Editor, each with its own Static ID.
            - **Files**: JS, CSS and images, referenced with «#PLUGIN_FILES#».
            - **Events**: custom events Dynamic Actions can listen to.

            ## Example: a minimal region plug-in
            With **API Interface = Procedure**, the modern signature takes parameters and a result record. Enter
            «render_greeting» as the render procedure:

            ~~~plsql
            procedure render_greeting (
                p_plugin in            apex_plugin.t_plugin,
                p_region in            apex_plugin.t_region,
                p_param  in            apex_plugin.t_region_render_param,
                p_result in out nocopy apex_plugin.t_region_render_result )
            is
                l_message varchar2(4000);
            begin
                l_message := p_region.attributes.get_varchar2(
                                 p_static_id     => 'message',
                                 p_default_value => 'Hello' );

                apex_plugin_util.debug_region( p_plugin => p_plugin, p_region => p_region );

                sys.htp.p( '<div class="greeting">'
                        || apex_escape.html( l_message || ', ' || :APP_USER )
                        || '</div>' );
            end render_greeting;
            ~~~

            ## Unlimited attributes
            Older plug-ins read «p_region.attribute_01» through «attribute_25». With API Interface = Procedure, attributes are
            read by Static ID with «attributes.get_varchar2», «get_number» and friends, with no limit on how many. This applies
            to regions since 24.1, items since 24.2 and, in 26.1, also to Dynamic Action, Process, authentication,
            authorization and REST Data Source plug-ins (existing plug-ins need small changes).

            :::novo 26.1
            New **APEXlang Name** attribute (the camel-case name used in APEXlang files), the **Generative AI Tool** type, a
            **Template Support** option on custom attributes (template directive highlighting in the editor) and the
            deprecation of «t_plugin.name» (use «static_id») and «t_region.static_id» (use «dom_id»).
            :::

            :::dica Debug with Debug Messages
            Run the page in debug mode: «apex_plugin_util.debug_region» logs the plug-in attributes, and your own
            «apex_debug.info» messages help you follow the flow. See [Debug mode](#/topico/modo-debug).
            :::
        `
    }
});

DOC.topico({
    id: 'sql-workshop',
    cat: 'app-builder',
    nivel: 'basico',
    links: [
        { t: 'SQL Workshop Guide 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeutl/' },
        { t: 'SQL Workshop Guide — Using Quick SQL', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeutl/using-quick-sql.html' },
        { t: 'SQL Workshop Guide — Using Data Workshop', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeutl/using-data-workshop.html' }
    ],
    relacionados: ['create-app-wizard', 'carga-de-dados', 'restful-services-ords', 'dicionario-apex', 'blueprints-e-spec-driven'],
    pt: {
        titulo: 'SQL Workshop: Object Browser, SQL Commands, Scripts, Quick SQL e Data Workshop',
        resumo: 'As ferramentas de banco de dados embutidas no APEX: navegar objetos, rodar SQL, executar scripts, modelar com Quick SQL e carregar dados.',
        tags: ['SQL Workshop', 'Object Browser', 'SQL Commands', 'SQL Scripts', 'Quick SQL', 'Data Workshop', 'Data Generator', 'Query Builder', 'Describe Tables', 'Sample Datasets', 'explain plan'],
        conteudo: `
            O **SQL Workshop** reúne, dentro do próprio APEX, as ferramentas para trabalhar com os objetos e dados dos schemas
            do workspace — sem instalar nenhum cliente SQL.

            ## As ferramentas
            | Ferramenta | Para quê |
            |---|---|
            | Object Browser | Navegar, criar e alterar tabelas, views, índices, pacotes, triggers etc. (interface renovada no 23.1). |
            | SQL Commands | Executar uma instrução SQL ou um bloco PL/SQL, ver resultados e o plano de execução. |
            | SQL Scripts | Guardar e executar scripts com vários comandos (DDL, cargas, instalação). |
            | Utilities | Data Workshop, Data Generator, Quick SQL, Sample Datasets, Generate DDL, Describe Tables, UI Defaults, comparação de schemas, Recycle Bin, relatórios de objetos e monitoramento do banco. |
            | RESTful Services | Definição de APIs REST no ORDS — **depreciado no 26.1** (use o SQL Developer Web). |

            Selecione o **schema** no canto superior direito: tudo roda com os privilégios dele.

            ## Object Browser
            Lista os objetos por tipo; para cada tabela há abas de colunas, dados, índices, constraints, grants, estatísticas,
            triggers, dependências e DDL. Dá para editar linhas, criar objetos por assistente e habilitar REST em uma tabela.

            ## SQL Commands
            - Executa uma instrução ou um bloco por vez (selecione um trecho para rodar só ele).
            - Abas *Results*, *Explain*, *Describe*, *Saved SQL* e *History*.
            - Bind variables («:P10_STATUS») são solicitadas na execução — ótimo para testar a query de uma região exatamente
              como ela está na página.

            ~~~sql Testando no SQL Commands a query de uma região
            select p.id, p.numero, c.nome as cliente, p.total
              from pedidos p
              join clientes c on c.id = p.cliente_id
             where p.status = :P10_STATUS
             order by p.data_pedido desc
            ~~~

            ## SQL Scripts
            Crie ou faça upload de arquivos .sql, execute-os e veja o resultado de cada comando. Há cotas por workspace para o
            tamanho de scripts e resultados, e um script também pode servir de ponto de partida para criar uma aplicação.

            ## Quick SQL
            O **Quick SQL** (que começou como packaged app no 5.1 e foi reescrito com diagrama ER no 23.2, exigindo ORDS 23.3+)
            gera DDL a partir de uma notação abreviada baseada em indentação:

            ~~~texto Quick SQL
            departamentos /insert 3
              nome /nn vc100
              sigla vc10 /unique
              funcionarios /insert 12
                nome /nn vc100
                email vc255
                salario num
                data_admissao date
            ~~~

            A tabela indentada vira filha (com chave estrangeira), «/nn» gera NOT NULL, «vc100» vira VARCHAR2(100) e
            «/insert N» cria dados de exemplo. A aba **Diagram** mostra o modelo ER enquanto você digita, *Settings* controla
            prefixos, colunas de auditoria e tipo de chave primária, e *Review and Run* leva o script para o SQL Scripts.

            ## Data Workshop e dados de teste
            - **Data Workshop → Load Data**: carrega CSV, XLSX, XML ou JSON (ou dados colados) em tabela nova ou existente;
              **Unload Data** exporta para texto ou XML. Veja [Carga de dados](#/topico/carga-de-dados).
            - **Data Generator** (22.1): gera grandes volumes de dados realistas para testes.
            - **Sample Datasets**: instala conjuntos de dados de exemplo para estudar e prototipar.

            :::novo Novidades recentes
            - **Create Data Model Using AI** (24.2): o APEX Assistant gera o script de tabelas em SQL ou em Quick SQL.
            - **Describe Tables** (26.1): produz uma descrição em Markdown ou texto das tabelas e views (colunas, comentários,
              constraints) pensada para LLMs — insumo dos [Blueprints](#/topico/blueprints-e-spec-driven). Usa
              «DBMS_DEVELOPER», disponível no 26ai e em patches recentes do 19c (API «APEX_DB_DICTIONARY»).
            - O Object Browser cria e edita colunas **BOOLEAN** (26ai).
            :::

            :::atencao Cuidado em produção
            O SQL Workshop executa qualquer comando com os privilégios do schema. Em produção, prefira uma instalação
            *runtime-only* ou restrinja quem é desenvolvedor no workspace. E evite depender do **Query Builder**: ele está
            depreciado desde o 22.2.
            :::
        `
    },
    en: {
        titulo: 'SQL Workshop: Object Browser, SQL Commands, Scripts, Quick SQL and Data Workshop',
        resumo: 'The database tools built into APEX: browse objects, run SQL, execute scripts, model with Quick SQL and load data.',
        tags: ['SQL Workshop', 'Object Browser', 'SQL Commands', 'SQL Scripts', 'Quick SQL', 'Data Workshop', 'Data Generator', 'Query Builder', 'Describe Tables', 'Sample Datasets', 'explain plan'],
        conteudo: `
            **SQL Workshop** brings, inside APEX itself, the tools to work with the objects and data of the workspace schemas —
            no SQL client to install.

            ## The tools
            | Tool | Purpose |
            |---|---|
            | Object Browser | Browse, create and alter tables, views, indexes, packages, triggers, etc. (UI refreshed in 23.1). |
            | SQL Commands | Run one SQL statement or PL/SQL block, see results and the execution plan. |
            | SQL Scripts | Store and run multi-statement scripts (DDL, loads, installs). |
            | Utilities | Data Workshop, Data Generator, Quick SQL, Sample Datasets, Generate DDL, Describe Tables, UI Defaults, schema comparison, Recycle Bin, object reports and database monitoring. |
            | RESTful Services | Defining ORDS REST APIs — **deprecated in 26.1** (use SQL Developer Web). |

            Pick the **schema** in the top-right corner: everything runs with its privileges.

            ## Object Browser
            Lists objects by type; each table has tabs for columns, data, indexes, constraints, grants, statistics, triggers,
            dependencies and DDL. You can edit rows, create objects with wizards and REST-enable a table.

            ## SQL Commands
            - Runs one statement or block at a time (select a fragment to run just that).
            - *Results*, *Explain*, *Describe*, *Saved SQL* and *History* tabs.
            - Bind variables («:P10_STATUS») are prompted for at run time — great for testing a region query exactly as it
              is on the page.

            ~~~sql Testing a region query in SQL Commands
            select o.id, o.order_no, c.name as customer, o.total
              from orders o
              join customers c on c.id = o.customer_id
             where o.status = :P10_STATUS
             order by o.order_date desc
            ~~~

            ## SQL Scripts
            Create or upload .sql files, run them and see the result of each statement. There are per-workspace quotas for
            script and result sizes, and a script can also be the starting point for creating an application.

            ## Quick SQL
            **Quick SQL** (which started as a packaged app in 5.1 and was rewritten with an ER diagram in 23.2, requiring
            ORDS 23.3+) generates DDL from an indentation-based shorthand:

            ~~~texto Quick SQL
            departments /insert 3
              name /nn vc100
              code vc10 /unique
              employees /insert 12
                name /nn vc100
                email vc255
                salary num
                hire_date date
            ~~~

            The indented table becomes a child (with a foreign key), «/nn» means NOT NULL, «vc100» becomes VARCHAR2(100) and
            «/insert N» creates sample rows. The **Diagram** tab shows the ER model as you type, *Settings* controls prefixes,
            audit columns and primary key type, and *Review and Run* sends the script to SQL Scripts.

            ## Data Workshop and test data
            - **Data Workshop → Load Data**: loads CSV, XLSX, XML or JSON (or pasted data) into a new or existing table;
              **Unload Data** exports to text or XML. See [Data loading](#/topico/carga-de-dados).
            - **Data Generator** (22.1): generates large volumes of realistic test data.
            - **Sample Datasets**: installs sample data sets for learning and prototyping.

            :::novo Recent additions
            - **Create Data Model Using AI** (24.2): APEX Assistant generates the table script in SQL or Quick SQL.
            - **Describe Tables** (26.1): produces a Markdown or text description of tables and views (columns, comments,
              constraints) designed for LLMs — the input for [Blueprints](#/topico/blueprints-e-spec-driven). It relies on
              «DBMS_DEVELOPER», available on 26ai and recent 19c patches («APEX_DB_DICTIONARY» API).
            - Object Browser creates and edits **BOOLEAN** columns (26ai).
            :::

            :::atencao Careful in production
            SQL Workshop runs any statement with the schema's privileges. In production prefer a *runtime-only* install or
            restrict who is a developer in the workspace. And avoid relying on **Query Builder**: it has been deprecated since 22.2.
            :::
        `
    }
});
