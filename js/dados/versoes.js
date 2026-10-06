DOC.versao({
    id: '26.1',
    nome: 'Oracle APEX 26.1',
    ano: 2026,
    data: '2026-05',
    era: 'ia',
    bd: '19c (RU 19.18+) / 26ai (23.26+)',
    ords: '26.1.1+',
    links: [
        { t: 'Release Notes 26.1 — New Features', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmrn/new-features.html' },
        { t: 'Installation Requirements 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/apex-installation-requirements.html' },
        { t: 'Changed Behavior 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmrn/changed-behavior.html' }
    ],
    pt: {
        destaque: 'A maior versão em anos: **APEXlang**, **AI Agents**, relatórios em linguagem natural, **Data Reporter** e o novo estilo **Iris** do Universal Theme. Vendida como *Oracle APEX AI Application Generator*.',
        tags: ['apexlang', 'ai agents', 'iris', 'data reporter', 'nl2ir', 'blueprints', 'novidades 26.1', 'mais recente'],
        recursos: [
            '**APEXlang**: a aplicação inteira representada em arquivos de texto «.apx» — ideal para Git, revisão de código e geração por LLMs. Exportação Standard, Runtime, Full ou Custom, em SQL ou APEXlang.',
            '**AI Agents** substituem as AI Configurations: ferramentas (*AI Tools*) do tipo Retrieve Data, Execute Server-side Code e Execute Client-side Code, com aprovação do usuário (*guardrails*).',
            '**Interactive Report em linguagem natural (NL2IR)**: o pedido do usuário vira filtros, quebras e gráficos nativos — sem executar SQL gerado pela IA.',
            'Novos provedores de IA: **Anthropic Claude**, **Google Gemini**, **Mistral AI** e **Ollama**, além de OpenAI, Cohere e OCI Generative AI.',
            '**Data Reporter**: ferramenta de relatórios ad hoc para usuários de negócio, ao lado do App Builder e do SQL Workshop.',
            '**Blueprints** em Markdown para desenvolvimento orientado a especificação (pacote «APEX_GENDEV»).',
            'Estilo **Iris** como novo padrão do Universal Theme, Template Components **Metric Card** e **Blank Page**, Font APEX 2.5.',
            'Processo de página e atividade de workflow **Generate Text with AI**; saída JSON estruturada com JSON Schema; anexos em «APEX_AI.GENERATE»; limites de tokens.',
            '**Application Lock**, Static IDs para todos os componentes e novos tipos de aplicação: Theme, Library e Boilerplate.',
            'Workflow com **Parallel Flow**, multi-tenancy e tarefas atribuídas por Authorization Scheme.',
            'Itens com session state do tipo **BOOLEAN** (no 26ai), rolagem infinita em Select One/Many e Combobox, colar arquivos no File/Image Upload.',
            'Interactive Grid com **copiar, recortar e colar**; Interactive Report com seleção de linhas; Map com camadas **Vector Tile**.',
            'Dynamic Actions declarativas *Show Success Message*, *Show Error Message* e **Trigger Actions** em botões, cards e menus.',
            '**CSP estrita**: o JavaScript do núcleo dispensa «unsafe-inline» e «unsafe-hashes»; SMTP configurável por workspace; OAuth2 Password Flow e asserções assinadas.',
            'Novos pacotes: «APEX_DB_DICTIONARY» (*Describe Tables* para LLMs), «APEX_GENDEV», «APEX_INSTANCE_DEBUG», «APEX_T_JAVASCRIPT_OBJECT».'
        ],
        descontinuados: [
            '«APEX_AI.CHAT/GENERATE» com «p_config_static_id» (use «p_agent_static_id») e as views «APEX_APPL_AI_CONFIGS*».',
            'RESTful Services dentro do SQL Workshop e o Export Repository.',
            'Templates legados de Calendar; «#REGION_STATIC_ID#» (use «#DOM_ID#»); funções de cache do «APEX_UTIL».',
            'Desuportados: coluna «COMPONENT_SIGNATURE», utilitários Application Comparison e Component Summary Count.'
        ],
        notas: `
            Não existe APEX 25.x: depois da 24.2 (lançada em janeiro de 2025) a versão seguinte saiu em maio de 2026 e, pela
            regra de numeração por ano, chamou-se **26.1**. Ela chegou ao Autonomous Database em julho de 2026.

            :::atencao Mudanças que exigem atenção no upgrade
            - O atributo *Static ID* de regiões e botões passou a se chamar **HTML DOM ID**.
            - *Install Application* agora se chama **Import Application**, e exports de página/componente isolado de versões anteriores não podem mais ser importados.
            - Timeouts de sessão passam a ser calculados em UTC e o fuso horário automático usa nomes de região.
            - Exige **ORDS 26.1.1+** e banco 19c com RU 19.18 ou superior.
            :::

            Os patch sets são distribuídos como *Patch Set Bundles* cumulativos (patch 39179920), elevando a versão para 26.1.x.
        `
    },
    en: {
        destaque: 'The biggest release in years: **APEXlang**, **AI Agents**, natural-language reports, **Data Reporter** and the new **Iris** Universal Theme style. Marketed as *Oracle APEX AI Application Generator*.',
        tags: ['apexlang', 'ai agents', 'iris', 'data reporter', 'nl2ir', 'blueprints', 'new in 26.1', 'latest'],
        recursos: [
            '**APEXlang**: the whole application as «.apx» text files — ideal for Git, code review and LLM generation. Standard, Runtime, Full or Custom exports, in SQL or APEXlang.',
            '**AI Agents** replace AI Configurations: *AI Tools* of type Retrieve Data, Execute Server-side Code and Execute Client-side Code, with user-approval *guardrails*.',
            '**Natural-language Interactive Reports (NL2IR)**: the user request becomes native filters, breaks and charts — no AI-generated SQL is executed.',
            'New AI providers: **Anthropic Claude**, **Google Gemini**, **Mistral AI** and **Ollama**, alongside OpenAI, Cohere and OCI Generative AI.',
            '**Data Reporter**: an ad-hoc reporting tool for business users, next to App Builder and SQL Workshop.',
            'Markdown **Blueprints** for spec-driven development («APEX_GENDEV» package).',
            '**Iris** as the new default Universal Theme style, **Metric Card** and **Blank Page** Template Components, Font APEX 2.5.',
            '**Generate Text with AI** page process and workflow activity; structured JSON output with JSON Schema; attachments in «APEX_AI.GENERATE»; token limits.',
            '**Application Lock**, Static IDs for every component and new application types: Theme, Library and Boilerplate.',
            'Workflow **Parallel Flow**, multi-tenancy and tasks assigned by Authorization Scheme.',
            '**BOOLEAN** session state items (on 26ai), infinite scroll in Select One/Many and Combobox, paste files into File/Image Upload.',
            'Interactive Grid **copy, cut and paste**; Interactive Report row selection; **Vector Tile** layers in Maps.',
            'Declarative *Show Success Message* and *Show Error Message* actions and **Trigger Actions** on buttons, cards and menus.',
            '**Strict CSP**: core JavaScript no longer needs «unsafe-inline» or «unsafe-hashes»; per-workspace SMTP; OAuth2 Password Flow and signed assertions.',
            'New packages: «APEX_DB_DICTIONARY» (*Describe Tables* for LLMs), «APEX_GENDEV», «APEX_INSTANCE_DEBUG», «APEX_T_JAVASCRIPT_OBJECT».'
        ],
        descontinuados: [
            '«APEX_AI.CHAT/GENERATE» with «p_config_static_id» (use «p_agent_static_id») and the «APEX_APPL_AI_CONFIGS*» views.',
            'RESTful Services inside SQL Workshop and the Export Repository.',
            'Legacy Calendar templates; «#REGION_STATIC_ID#» (use «#DOM_ID#»); «APEX_UTIL» cache functions.',
            'Desupported: the «COMPONENT_SIGNATURE» column, Application Comparison and Component Summary Count utilities.'
        ],
        notas: `
            There is no APEX 25.x: after 24.2 (released January 2025) the next release shipped in May 2026 and, following the
            year-based numbering rule, was named **26.1**. It reached Autonomous Database in July 2026.

            :::atencao Upgrade gotchas
            - The *Static ID* attribute of regions and buttons was renamed **HTML DOM ID**.
            - *Install Application* is now **Import Application**, and isolated page/component exports from earlier releases can no longer be imported.
            - Session timeouts are computed in UTC and automatic time zone uses region names.
            - Requires **ORDS 26.1.1+** and a 19c database at RU 19.18 or later.
            :::

            Patch sets ship as cumulative *Patch Set Bundles* (patch 39179920), raising the version to 26.1.x.
        `
    }
});

DOC.versao({
    id: '24.2',
    nome: 'Oracle APEX 24.2',
    ano: 2025,
    data: '2025-01',
    era: 'ia',
    bd: '19c+',
    ords: '23.3+',
    links: [
        { t: 'Release Notes 24.2 — New Features', u: 'https://docs.oracle.com/en/database/oracle/apex/24.2/htmrn/new-features.html' },
        { t: 'Installation Requirements 24.2', u: 'https://docs.oracle.com/en/database/oracle/apex/24.2/htmig/apex-installation-requirements.html' }
    ],
    pt: {
        destaque: 'JSON Sources (incluindo Duality Views), **busca vetorial**, **AI Configurations com RAG** e a ação *Generate Text with AI*. Apesar do número, saiu em janeiro de 2025.',
        tags: ['json sources', 'duality views', 'vector search', 'rag', 'ai configurations', 'generate text with ai'],
        recursos: [
            '**JSON Sources**: novo Shared Component para tabelas com colunas JSON e, no 23ai, **JSON-Relational Duality Views** (com DML) e JSON Collections.',
            '**Vector Search**: Search Configurations vetoriais, *Vector Providers* e «APEX_AI.GET_VECTOR_EMBEDDINGS».',
            '**AI Configurations** com **RAG Sources**: prompt de sistema, mensagem de boas-vindas e contexto dinâmico para o assistente de IA.',
            'Dynamic Action **Generate Text with AI** (resumir, traduzir, redigir).',
            '*Create Custom Data Models Using AI* no SQL Workshop (gera DDL ou Quick SQL a partir de linguagem natural).',
            'Workflow: atividade *Invoke Workflow* (sub-workflows), parâmetros In/Out e suporte a CLOB.',
            'Relatório de **dependências de objetos do banco** da aplicação.',
            'Document Generator com modelos **XLSX**; Template Components com quebras de grupo declarativas.',
            'Universal Theme: metadados do tema no workspace (exports menores), Font APEX 2.4, mostrar/ocultar senha, Popup LOV unificado.',
            'Pacote «APEX_SHARED_COMPONENT», substituição «MAIN_APP_ID», paginação REST por token e coleta OpenTelemetry.',
            'Nova sintaxe de mensagens de texto «&{MSG.NOME}.» (compatibility mode 24.2).'
        ],
        descontinuados: [
            'Rich Text Editor com TinyMCE desuportado (migração automática para a Oracle Rich Text Library).',
            '«APEX_LANG.MESSAGE» (use «GET_MESSAGE») e «APEX_PLUGIN_UTIL.EXECUTE_PLSQL_CODE» depreciados.',
            'Column Toggle Report, List View e Reflow Report marcados como *Legacy*.'
        ],
        notas: `
            Foi a única versão disponível durante todo o ano de 2025 e passou a exigir **ORDS 23.3** ou superior.
            O suporte foi estendido até meados de 2027 por causa do intervalo maior até a 26.1.
        `
    },
    en: {
        destaque: 'JSON Sources (including Duality Views), **vector search**, **AI Configurations with RAG** and the *Generate Text with AI* action. Despite the number, it shipped in January 2025.',
        tags: ['json sources', 'duality views', 'vector search', 'rag', 'ai configurations', 'generate text with ai'],
        recursos: [
            '**JSON Sources**: a new Shared Component for tables with JSON columns and, on 23ai, **JSON-Relational Duality Views** (with DML) and JSON Collections.',
            '**Vector Search**: vector Search Configurations, *Vector Providers* and «APEX_AI.GET_VECTOR_EMBEDDINGS».',
            '**AI Configurations** with **RAG Sources**: system prompt, welcome message and dynamic context for the AI assistant.',
            '**Generate Text with AI** dynamic action (summarize, translate, draft).',
            '*Create Custom Data Models Using AI* in SQL Workshop (DDL or Quick SQL from natural language).',
            'Workflow: *Invoke Workflow* activity (sub-workflows), In/Out parameters and CLOB support.',
            'Application **database object dependencies** report.',
            'Document Generator **XLSX** templates; declarative group breaks in Template Components.',
            'Universal Theme: theme metadata stored at workspace level (smaller exports), Font APEX 2.4, show/hide password, unified Popup LOV.',
            '«APEX_SHARED_COMPONENT» package, «MAIN_APP_ID» substitution, token-based REST pagination and OpenTelemetry collection.',
            'New text message syntax «&{MSG.NAME}.» (compatibility mode 24.2).'
        ],
        descontinuados: [
            'TinyMCE-based Rich Text Editor desupported (auto-migrated to the Oracle Rich Text Library).',
            '«APEX_LANG.MESSAGE» (use «GET_MESSAGE») and «APEX_PLUGIN_UTIL.EXECUTE_PLSQL_CODE» deprecated.',
            'Column Toggle Report, List View and Reflow Report marked *Legacy*.'
        ],
        notas: `
            It was the only release available throughout 2025 and raised the requirement to **ORDS 23.3** or later.
            Its support window was extended to mid-2027 because of the longer gap until 26.1.
        `
    }
});

DOC.versao({
    id: '24.1',
    nome: 'Oracle APEX 24.1',
    ano: 2024,
    data: '2024-06',
    era: 'ia',
    bd: '19c+',
    ords: '20.x+',
    links: [
        { t: 'Release Notes 24.1 — New Features', u: 'https://docs.oracle.com/en/database/oracle/apex/24.1/htmrn/new-features.html' }
    ],
    pt: {
        destaque: 'Chega a **IA generativa**: APEX Assistant, criação de apps por prompt, chat na aplicação e o pacote «APEX_AI». Também traz o Document Generator e os itens Select One/Many.',
        tags: ['ia generativa', 'apex assistant', 'apex_ai', 'document generator', 'select one', 'select many'],
        recursos: [
            '**Generative AI Services** (OpenAI, Cohere, OCI Generative AI) configurados em *Workspace Utilities* e na instância.',
            '**APEX Assistant** nos editores de SQL, PL/SQL e JavaScript e no SQL Workshop.',
            '**Create App Using Generative AI**: criar uma aplicação a partir de um prompt.',
            'Dynamic Action **Show AI Assistant** (chat em tempo de execução) e pacote «APEX_AI» («GENERATE», «CHAT», consentimento).',
            '**Document Generator** (templates Word → PDF) com o pacote «APEX_PRINT» e o processo *Print Report*.',
            'Novos itens **Select One** e **Select Many**.',
            'Template Components com **Slots**, seleção declarativa e componentes sem fonte de dados.',
            '**Component Groups** e atributos ilimitados para plug-ins de região.',
            'Workflow Diagram region, dashboards de workflow e *vacation rules* em Human Tasks.',
            'Working Copies: comparar página com a principal e diffs em YAML; export legível em YAML também por página.',
            'Processo e Dynamic Action **Download** (BLOB/CLOB, inclusive em ZIP) e «APEX_HTTP.DOWNLOAD»; evento *Input* em DAs.'
        ],
        descontinuados: [
            'Pacote «APEX_APPROVAL» (use «APEX_HUMAN_TASK»), Rich Text Editor TinyMCE e o evento *Page Unload*.',
            '«APEX_UTIL.URL_ENCODE» e «APEX_AUTOMATION.ABORT» (use «TERMINATE»).',
            'Export legível em JSON desuportado (fica o YAML, disponível desde a 22.1).'
        ],
        notas: ''
    },
    en: {
        destaque: '**Generative AI** arrives: APEX Assistant, app creation from a prompt, in-app chat and the «APEX_AI» package. Also brings Document Generator and Select One/Many items.',
        tags: ['generative ai', 'apex assistant', 'apex_ai', 'document generator', 'select one', 'select many'],
        recursos: [
            '**Generative AI Services** (OpenAI, Cohere, OCI Generative AI) configured in *Workspace Utilities* and at instance level.',
            '**APEX Assistant** in the SQL, PL/SQL and JavaScript editors and in SQL Workshop.',
            '**Create App Using Generative AI**: build an application from a prompt.',
            '**Show AI Assistant** dynamic action (runtime chat) and the «APEX_AI» package («GENERATE», «CHAT», consent).',
            '**Document Generator** (Word → PDF templates) with the «APEX_PRINT» package and the *Print Report* process.',
            'New **Select One** and **Select Many** items.',
            'Template Components with **Slots**, declarative selection and data-less components.',
            '**Component Groups** and unlimited attributes for region plug-ins.',
            'Workflow Diagram region, workflow dashboards and Human Task *vacation rules*.',
            'Working Copies: compare a page with main and YAML diffs; readable YAML export also per page.',
            '**Download** process and dynamic action (BLOB/CLOB, including ZIP) and «APEX_HTTP.DOWNLOAD»; *Input* DA event.'
        ],
        descontinuados: [
            'The «APEX_APPROVAL» package (use «APEX_HUMAN_TASK»), the TinyMCE Rich Text Editor and the *Page Unload* event.',
            '«APEX_UTIL.URL_ENCODE» and «APEX_AUTOMATION.ABORT» (use «TERMINATE»).',
            'Readable JSON export desupported (YAML, available since 22.1, remains).'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '23.2',
    nome: 'Oracle APEX 23.2',
    ano: 2023,
    data: '2023-11',
    era: 'anual',
    bd: '19c+',
    ords: '20.x+',
    links: [
        { t: 'Release Notes 23.2 — New Features', u: 'https://docs.oracle.com/en/database/oracle/apex/23.2/htmrn/new-features.html' }
    ],
    pt: {
        destaque: '**Workflow** nativo, **Working Copies** com merge, Action Tasks e novos itens Combobox, Image Upload e QR Code.',
        tags: ['workflow', 'working copies', 'combobox', 'qr code', 'image upload', 'odata'],
        recursos: [
            '**Workflow** com designer visual, console e o pacote «APEX_WORKFLOW».',
            '**Application Working Copies**: criar cópia de trabalho, comparar (diff visual) e fazer merge na aplicação principal.',
            'Pacote «APEX_HUMAN_TASK» (sucessor de «APEX_APPROVAL») e **Action Tasks** além de aprovações.',
            'Novos itens **Combobox**, **Image Upload** (recorte e câmera) e **QR Code**, com o pacote «APEX_BARCODE».',
            '**Quick SQL** reescrito com diagrama entidade-relacionamento.',
            'REST: catálogos a partir de OpenAPI, conector **OData** (somente leitura) e Fusion Apps como fonte.',
            'Custom Map Backgrounds; subscriptions de Shared Components ampliadas.',
            'Wizards simplificados de criação, exportação e importação de aplicações.',
            'Arquivos estáticos no OCI Object Storage; tradução dos relatórios padrão de IR e IG.'
        ],
        descontinuados: [
            'Utilitário Java «APEXExport» desuportado (use o SQLcl).',
            'Export legível em JSON depreciado; CKEditor5 desuportado a partir do patch 23.2.9.'
        ],
        notas: ''
    },
    en: {
        destaque: 'Native **Workflow**, **Working Copies** with merge, Action Tasks and new Combobox, Image Upload and QR Code items.',
        tags: ['workflow', 'working copies', 'combobox', 'qr code', 'image upload', 'odata'],
        recursos: [
            '**Workflow** with a visual designer, console and the «APEX_WORKFLOW» package.',
            '**Application Working Copies**: create a working copy, compare (visual diff) and merge back into the main app.',
            '«APEX_HUMAN_TASK» package (successor of «APEX_APPROVAL») and **Action Tasks** beyond approvals.',
            'New **Combobox**, **Image Upload** (crop and camera) and **QR Code** items, plus the «APEX_BARCODE» package.',
            '**Quick SQL** rewritten with an entity-relationship diagram.',
            'REST: catalogs from OpenAPI, **OData** connector (read-only) and Fusion Apps as a source.',
            'Custom Map Backgrounds; extended Shared Component subscriptions.',
            'Simplified create, export and import application wizards.',
            'Static files on OCI Object Storage; translation of default IR and IG reports.'
        ],
        descontinuados: [
            'The «APEXExport» Java utility desupported (use SQLcl).',
            'Readable JSON export deprecated; CKEditor5 desupported from patch 23.2.9.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '23.1',
    nome: 'Oracle APEX 23.1',
    ano: 2023,
    data: '2023-05',
    era: 'anual',
    bd: '19c+',
    ords: '20.x+',
    links: [
        { t: 'Release Notes 23.1 — New Features', u: 'https://docs.oracle.com/en/database/oracle/apex/23.1/htmrn/new-features.html' }
    ],
    pt: {
        destaque: 'Estreia dos **Template Components**, **push notifications** em PWA e **Execution Chains** com processamento em background.',
        tags: ['template components', 'push notifications', 'execution chain', 'background', 'apex_pwa'],
        recursos: [
            '**Template Components**: componentes de UI reutilizáveis (Avatar, Badge, Comments, Content Row, Media List, Timeline) usados como região ou relatório.',
            '**Push Notifications** para PWA com um único switch e o pacote «APEX_PWA».',
            'Processo **Execution Chain**, que agrupa processos e pode rodar em background («APEX_BACKGROUND_PROCESS»).',
            'Object Browser modernizado e SQL Developer Web integrado ao SQL Workshop.',
            'Pacote «APEX_APPLICATION_ADMIN» (funções administrativas que estavam no «APEX_UTIL»).',
            'Atributo *Session State Commits* (Immediate ou End of Request).',
            'Autenticação multi-tenant (Configuration Procedure com «tenant_id»).',
            'Novo Color Picker, import/export de estilos do Theme Roller em JSON e Region Display Selector com ícones.',
            'Suporte a Property Graph do Database 23c/23ai em componentes.'
        ],
        descontinuados: [
            'Múltiplas User Interfaces por aplicação, item JET Date Picker e seletor "DOM Object" em DAs desuportados.',
            'Opção "HTML (Unsafe)" do Display Only depreciada.'
        ],
        notas: ''
    },
    en: {
        destaque: 'Debut of **Template Components**, PWA **push notifications** and **Execution Chains** with background processing.',
        tags: ['template components', 'push notifications', 'execution chain', 'background', 'apex_pwa'],
        recursos: [
            '**Template Components**: reusable UI components (Avatar, Badge, Comments, Content Row, Media List, Timeline) usable as a region or report.',
            'PWA **Push Notifications** with a single switch and the «APEX_PWA» package.',
            '**Execution Chain** process, grouping processes that can run in the background («APEX_BACKGROUND_PROCESS»).',
            'Modernized Object Browser and SQL Developer Web integrated into SQL Workshop.',
            '«APEX_APPLICATION_ADMIN» package (admin functions formerly in «APEX_UTIL»).',
            '*Session State Commits* attribute (Immediate or End of Request).',
            'Multi-tenant authentication (Configuration Procedure with «tenant_id»).',
            'New Color Picker, Theme Roller style import/export in JSON and Region Display Selector with icons.',
            'Property Graph (Database 23c/23ai) support in components.'
        ],
        descontinuados: [
            'Multiple User Interfaces per app, the JET Date Picker item and the "DOM Object" DA selector desupported.',
            'The "HTML (Unsafe)" Display Only option deprecated.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '22.2',
    nome: 'Oracle APEX 22.2',
    ano: 2022,
    data: '2022-11',
    era: 'anual',
    bd: '12.1.0.2+',
    ords: '20.x+',
    links: [
        { t: 'Release Notes 22.2 — New Features', u: 'https://docs.oracle.com/en/database/oracle/apex/22.2/htmrn/new-features.html' }
    ],
    pt: {
        destaque: '**Search Configurations** e região Search, processo **Invoke API**, nova região Dynamic Content e itens com session state **CLOB**.',
        tags: ['search', 'invoke api', 'dynamic content', 'clob', 'date picker', 'drawer'],
        recursos: [
            '**Application Search**: Shared Component *Search Configurations* e a região **Search** (dados locais, listas, REST, Oracle Text).',
            'Processo **Invoke API**: chama procedures e funções PL/SQL de forma declarativa.',
            'Nova região **Dynamic Content** (retorna CLOB, atualizável, com lazy loading); a antiga PL/SQL Dynamic Content vira legado.',
            'Itens com *Session State Data Type* **CLOB** e «APEX_SESSION_STATE».',
            'Approvals ampliado: prazos, expiração, *Request Information*, *Invite Participant* e logs.',
            'Novo **Date Picker nativo**, leve, com botão *Today*.',
            'PWA com screenshots e atalhos; Dynamic Actions **Share** e **Get Current Position**.',
            'Template Directives em colunas de Interactive Report e Classic Report; landmarks por região; DAs com debounce e throttle.',
            'Template de diálogo **Drawer**; Text Field with Autocomplete refeito como web component.'
        ],
        descontinuados: [
            'Query Builder do SQL Workshop e Date Pickers jQuery/JET depreciados.',
            'CKEditor4 e FullCalendar 3 desuportados.'
        ],
        notas: `Foi a primeira vez em que o download on-premises saiu no mesmo dia da versão na nuvem.`
    },
    en: {
        destaque: '**Search Configurations** and the Search region, the **Invoke API** process, a new Dynamic Content region and **CLOB** session state items.',
        tags: ['search', 'invoke api', 'dynamic content', 'clob', 'date picker', 'drawer'],
        recursos: [
            '**Application Search**: the *Search Configurations* Shared Component and the **Search** region (local data, lists, REST, Oracle Text).',
            '**Invoke API** process: calls PL/SQL procedures and functions declaratively.',
            'New **Dynamic Content** region (returns a CLOB, refreshable, lazy loading); the old PL/SQL Dynamic Content becomes legacy.',
            'Items with **CLOB** *Session State Data Type* and «APEX_SESSION_STATE».',
            'Richer Approvals: due dates, expiration, *Request Information*, *Invite Participant* and logs.',
            'New lightweight **native Date Picker** with a *Today* button.',
            'PWA screenshots and shortcuts; **Share** and **Get Current Position** dynamic actions.',
            'Template Directives in Interactive/Classic Report columns; per-region landmarks; DA debounce and throttle.',
            '**Drawer** dialog template; Text Field with Autocomplete rebuilt as a web component.'
        ],
        descontinuados: [
            'SQL Workshop Query Builder and jQuery/JET Date Pickers deprecated.',
            'CKEditor4 and FullCalendar 3 desupported.'
        ],
        notas: `The first time the on-premises download shipped on the same day as the cloud release.`
    }
});

DOC.versao({
    id: '22.1',
    nome: 'Oracle APEX 22.1',
    ano: 2022,
    data: '2022-05',
    era: 'anual',
    bd: '12.1.0.2+',
    ords: '20.x+',
    links: [
        { t: 'Release Notes 22.1', u: 'https://docs.oracle.com/en/database/oracle/apex/22.1/htmrn/index.html' }
    ],
    pt: {
        destaque: '**Approvals** e **Unified Task List**, Create Page simplificado, **export legível** em JSON/YAML e o **Data Generator**.',
        tags: ['approvals', 'human task', 'task list', 'data generator', 'readable export', 'yaml'],
        recursos: [
            '**Approvals** (Task Definitions, Unified Task List, Task Details, processos de Human Task) e a app de exemplo Sample Approvals.',
            '**Create Page Wizard simplificado**, com defaults inteligentes e LOVs a partir de chaves estrangeiras.',
            '**Export legível** em JSON e YAML (para revisão e controle de versão).',
            '**Data Generator**: blueprints que geram dados de teste em CSV, JSON, SQL ou direto nas tabelas.',
            'Tokenized Row Search e **Order By Item** declarativo em regiões.',
            'PWA com service worker customizável e **Persistent Authentication** ("lembrar de mim").',
            'Session Overrides na Developer Toolbar; App Gallery instalada direto do GitHub.',
            'O ORDS passa a processar Friendly URLs e arquivos estáticos (servlet «r»); MapLibre substitui o Mapbox.'
        ],
        descontinuados: [
            'Utilitário APEXExport depreciado (use o SQLcl); CKEditor4 depreciado.',
            'REST Services baseados no APEX desuportados (somente serviços ORDS); Date Picker jQuery desuportado.'
        ],
        notas: ''
    },
    en: {
        destaque: '**Approvals** and the **Unified Task List**, a simplified Create Page wizard, **readable export** in JSON/YAML and the **Data Generator**.',
        tags: ['approvals', 'human task', 'task list', 'data generator', 'readable export', 'yaml'],
        recursos: [
            '**Approvals** (Task Definitions, Unified Task List, Task Details, Human Task processes) and the Sample Approvals app.',
            '**Simplified Create Page Wizard** with smart defaults and LOVs from foreign keys.',
            '**Readable export** in JSON and YAML (for review and version control).',
            '**Data Generator**: blueprints that generate test data as CSV, JSON, SQL or straight into tables.',
            'Tokenized Row Search and declarative **Order By Item** for regions.',
            'PWA with a customizable service worker and **Persistent Authentication** ("remember me").',
            'Session Overrides in the Developer Toolbar; App Gallery installed straight from GitHub.',
            'ORDS now handles Friendly URLs and static files (the «r» servlet); MapLibre replaces Mapbox.'
        ],
        descontinuados: [
            'APEXExport utility deprecated (use SQLcl); CKEditor4 deprecated.',
            'APEX-based REST Services desupported (ORDS-based only); jQuery Date Picker desupported.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '21.2',
    nome: 'Oracle APEX 21.2',
    ano: 2021,
    data: '2021-11',
    era: 'anual',
    bd: '12.1.0.2+',
    ords: '19.x+',
    links: [
        { t: 'Release Notes 21.2', u: 'https://docs.oracle.com/en/database/oracle/application-express/21.2/htmrn/index.html' }
    ],
    pt: {
        destaque: '**Smart Filters**, aplicações instaláveis como **PWA**, **SAML** e Modal Dialog Drawers. Primeira documentação com o nome "Oracle APEX".',
        tags: ['smart filters', 'pwa', 'saml', 'drawer', 'email templates', 'environment banner'],
        recursos: [
            '**Smart Filters**: barra de busca com autocomplete e *suggestion chips*.',
            '**Progressive Web Apps**: app instalável, cache e página offline customizável.',
            'Autenticação **SAML** (inclusive para o App Builder) e **Environment Banners**.',
            'Universal Theme: componentes lado a lado, mais posições na página e **Modal Dialog Drawers**.',
            'Faceted Search com facetas multivaloradas; itens **Geocoded Address** e **Display Map**.',
            'Alertas e confirmações customizáveis (com Template Directives) e "Require Confirmation" em botões.',
            'REST Service Catalogs; assinaturas de IR em todos os formatos; imagens em PDF e XLSX.',
            'Email Templates no processo *Send E-Mail* e em Automations; **Data Packager**; editor de arquivos estáticos com minificação.',
            'Runtime traduzido para 31 idiomas.'
        ],
        descontinuados: [
            'Posições legadas de página/região e substitution strings legadas (ex.: «IMAGE_PREFIX» → «APEX_FILES») depreciadas.',
            'Aba Component View do Page Designer desuportada.'
        ],
        notas: ''
    },
    en: {
        destaque: '**Smart Filters**, installable **PWA** apps, **SAML** and Modal Dialog Drawers. The first documentation titled "Oracle APEX".',
        tags: ['smart filters', 'pwa', 'saml', 'drawer', 'email templates', 'environment banner'],
        recursos: [
            '**Smart Filters**: a search bar with autocomplete and *suggestion chips*.',
            '**Progressive Web Apps**: installable apps, caching and a custom offline page.',
            '**SAML** authentication (also for App Builder) and **Environment Banners**.',
            'Universal Theme: side-by-side components, more page positions and **Modal Dialog Drawers**.',
            'Multi-value facets in Faceted Search; **Geocoded Address** and **Display Map** items.',
            'Customizable alerts and confirms (with Template Directives) and "Require Confirmation" on buttons.',
            'REST Service Catalogs; IR subscriptions in every format; images in PDF and XLSX.',
            'Email Templates in the *Send E-Mail* process and Automations; **Data Packager**; static file editor with minification.',
            'Runtime translated into 31 languages.'
        ],
        descontinuados: [
            'Legacy page/region positions and legacy substitution strings (e.g. «IMAGE_PREFIX» → «APEX_FILES») deprecated.',
            'Page Designer Component View tab desupported.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '21.1',
    nome: 'Oracle APEX 21.1',
    ano: 2021,
    data: '2021-05',
    era: 'anual',
    bd: '12.1.0.2+',
    ords: '19.x+',
    links: [
        { t: 'Release Notes 21.1', u: 'https://docs.oracle.com/en/database/oracle/application-express/21.1/htmrn/index.html' }
    ],
    pt: {
        destaque: 'Região **Map** nativa, **Data Load Definitions** nas aplicações, Markdown nativo e novo Date Picker. Passa a exigir o banco 12.1.0.2.',
        tags: ['map', 'mapa', 'data loading', 'markdown', 'date picker', 'lazy loading'],
        recursos: [
            '**Map Region** nativa: pontos, linhas, polígonos, heat map e 3D; mapas base da Oracle sem API key; SDO_GEOMETRY e GeoJSON.',
            '**Data Load Definitions** nas aplicações (CSV, XLSX, XML, JSON) com transformações e o pacote «APEX_DATA_LOADING».',
            'Markdown nativo: pacote «APEX_MARKDOWN» e Display Only formatando Markdown.',
            'Novo **Date Picker** e novo **Color Picker** baseados em Oracle JET.',
            '**Lazy loading** em Classic Report e Interactive Report; IG com linhas de altura variável.',
            'Faceted Search com facetas que aparecem e somem; integração com Map e Calendar.',
            'Universal Theme modernizado (variáveis CSS, grid, flexbox), Font APEX 2.2.',
            'Condições e autorizações por ação em Dynamic Actions; import de ZIP.'
        ],
        descontinuados: [
            'Websheets, AnyChart/AnyMap/AnyGantt e Migration Workbench desuportados.',
            'Aba Component View e Date Picker jQuery depreciados.'
        ],
        notas: `O serviço gerenciado **Oracle APEX Application Development** (APEX Service) na OCI foi anunciado em janeiro de 2021, pouco antes desta versão.`
    },
    en: {
        destaque: 'Native **Map** region, in-app **Data Load Definitions**, native Markdown and a new Date Picker. Now requires database 12.1.0.2.',
        tags: ['map', 'data loading', 'markdown', 'date picker', 'lazy loading'],
        recursos: [
            'Native **Map Region**: points, lines, polygons, heat map and 3D; Oracle base maps without an API key; SDO_GEOMETRY and GeoJSON.',
            'In-app **Data Load Definitions** (CSV, XLSX, XML, JSON) with transformations and the «APEX_DATA_LOADING» package.',
            'Native Markdown: the «APEX_MARKDOWN» package and Display Only rendering Markdown.',
            'New **Date Picker** and **Color Picker** based on Oracle JET.',
            '**Lazy loading** in Classic and Interactive Reports; variable-height IG rows.',
            'Faceted Search display toggling; integration with Map and Calendar.',
            'Modernized Universal Theme (CSS variables, grid, flexbox), Font APEX 2.2.',
            'Per-action conditions and authorization in Dynamic Actions; ZIP import.'
        ],
        descontinuados: [
            'Websheets, AnyChart/AnyMap/AnyGantt and Migration Workbench desupported.',
            'Component View tab and jQuery Date Picker deprecated.'
        ],
        notas: `The managed **Oracle APEX Application Development** service (APEX Service) on OCI was announced in January 2021, shortly before this release.`
    }
});

DOC.versao({
    id: '20.2',
    nome: 'Oracle APEX 20.2',
    ano: 2020,
    data: '2020-10',
    era: 'anual',
    bd: '11.2.0.4+',
    ords: '19.x+',
    links: [
        { t: 'Release Notes 20.2', u: 'https://docs.oracle.com/en/database/oracle/application-express/20.2/htmrn/index.html' }
    ],
    pt: {
        destaque: 'Região **Cards**, **Automations**, sincronização de REST, PDF/Excel nativos e o estilo **Redwood Light**. ORDS vira o único servidor web suportado.',
        tags: ['cards', 'automations', 'rest sync', 'apex_data_export', 'redwood', 'ckeditor'],
        recursos: [
            'Região **Cards** (layout, mídia, badges, ações) com HTML Expressions que aceitam **Template Directives**.',
            '**Automations**: ações PL/SQL agendadas ou disparadas por consulta («APEX_AUTOMATION»).',
            '**REST Data Source Synchronization** para tabela local; "Web Source Modules" passam a se chamar **REST Data Sources**.',
            'Download nativo em **PDF e Excel** em IR e Classic Report; APIs «APEX_DATA_EXPORT» e «APEX_REGION.EXPORT_DATA».',
            'Theme Style **Redwood Light** para as aplicações.',
            'Editor de código **Monaco** no App Builder.',
            'Novos itens: Checkbox simples, File Browse como *drop zone* e Rich Text Editor com **CKEditor 5**.',
            'Web Credentials dos tipos URL Query String e HTTP Header, com restrição por URL; Tree com lazy loading.'
        ],
        descontinuados: [
            '**EPG e mod_plsql desuportados**: o ORDS passa a ser o único web listener suportado.',
            'Criação de novos Tabular Forms desuportada; Websheets depreciados.'
        ],
        notas: `Última versão a aceitar o Oracle Database 11g (11.2.0.4).`
    },
    en: {
        destaque: '**Cards** region, **Automations**, REST sync, native PDF/Excel and the **Redwood Light** style. ORDS becomes the only supported web listener.',
        tags: ['cards', 'automations', 'rest sync', 'apex_data_export', 'redwood', 'ckeditor'],
        recursos: [
            '**Cards** region (layout, media, badges, actions) with HTML Expressions supporting **Template Directives**.',
            '**Automations**: scheduled or query-driven PL/SQL actions («APEX_AUTOMATION»).',
            '**REST Data Source Synchronization** to a local table; "Web Source Modules" renamed **REST Data Sources**.',
            'Native **PDF and Excel** download in IR and Classic Report; «APEX_DATA_EXPORT» and «APEX_REGION.EXPORT_DATA» APIs.',
            '**Redwood Light** theme style for applications.',
            '**Monaco** code editor in App Builder.',
            'New items: single Checkbox, File Browse drop zone and a **CKEditor 5** Rich Text Editor.',
            'URL Query String and HTTP Header Web Credentials restricted by URL; lazy-loading Tree.'
        ],
        descontinuados: [
            '**EPG and mod_plsql desupported**: ORDS becomes the only supported web listener.',
            'Creating new Tabular Forms desupported; Websheets deprecated.'
        ],
        notas: `The last release to accept Oracle Database 11g (11.2.0.4).`
    }
});

DOC.versao({
    id: '20.1',
    nome: 'Oracle APEX 20.1',
    ano: 2020,
    data: '2020-04',
    era: 'anual',
    bd: '11.2.0.4+',
    ords: '19.x+',
    links: [
        { t: 'Release Notes 20.1', u: 'https://docs.oracle.com/en/database/oracle/application-express/20.1/htmrn/index.html' }
    ],
    pt: {
        destaque: 'App Builder no visual **Redwood**, **Friendly URLs**, Mega Menu e PDF nativo no Interactive Grid.',
        tags: ['friendly urls', 'redwood', 'mega menu', 'pdf', 'backups'],
        recursos: [
            'App Builder redesenhado no estilo **Redwood**, com modo claro/escuro automático.',
            '**Friendly URLs** («/ords/r/workspace/app/pagina»), padrão para apps novas.',
            'Navegação **Mega Menu** no Universal Theme.',
            'Download em **PDF** nativo no Interactive Grid.',
            'Backups automáticos de aplicações, export em ZIP e deploy remoto para o Autonomous Database.',
            'Faceted Search com LOVs em cascata e facetas condicionais; pacote «APEX_IG».',
            'Alerta de expiração de sessão; SODA no SQL Workshop; Oracle JET 8.'
        ],
        descontinuados: [
            '**EPG e mod_plsql depreciados** ("no futuro o APEX suportará apenas o ORDS").',
            'Tabular Forms legados, jQuery UI e Internet Explorer 11 depreciados.'
        ],
        notas: ''
    },
    en: {
        destaque: 'A **Redwood**-styled App Builder, **Friendly URLs**, Mega Menu and native PDF in Interactive Grid.',
        tags: ['friendly urls', 'redwood', 'mega menu', 'pdf', 'backups'],
        recursos: [
            'App Builder redesigned in the **Redwood** style, with automatic light/dark mode.',
            '**Friendly URLs** («/ords/r/workspace/app/page»), the default for new apps.',
            '**Mega Menu** navigation in Universal Theme.',
            'Native **PDF** download in Interactive Grid.',
            'Automatic application backups, ZIP export and remote deployment to Autonomous Database.',
            'Faceted Search cascading LOVs and conditional facets; «APEX_IG» package.',
            'Session expiration warning; SODA in SQL Workshop; Oracle JET 8.'
        ],
        descontinuados: [
            '**EPG and mod_plsql deprecated** ("in the future APEX will only support ORDS").',
            'Legacy Tabular Forms, jQuery UI and Internet Explorer 11 deprecated.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '19.2',
    nome: 'Oracle APEX 19.2',
    ano: 2019,
    data: '2019-11',
    era: 'anual',
    bd: '11.2.0.4+',
    ords: '19.1+',
    links: [
        { t: 'Release Notes 19.2', u: 'https://docs.oracle.com/en/database/oracle/application-express/19.2/htmrn/index.html' }
    ],
    pt: {
        destaque: 'Estreia do **Faceted Search**, **Popup LOV** redesenhado, itens Markdown Editor e Star Rating e o estilo **Vita – Dark**.',
        tags: ['faceted search', 'popup lov', 'markdown', 'star rating', 'dark mode'],
        recursos: [
            '**Faceted Search**: filtragem no banco, facetas descobertas automaticamente e contagens dinâmicas.',
            '**Popup LOV** redesenhado: várias colunas, busca enquanto digita e multisseleção.',
            'Shared LOVs com fontes REST e múltiplas colunas de exibição.',
            'Novos itens **Markdown Editor** e **Star Rating**; Switch com visual on/off.',
            'Interactive Grid sobre fontes externas (REST Enabled SQL e Web Sources).',
            'Data Load em tabelas existentes (Excel, CSV, XML, JSON).',
            'Theme Style **Vita – Dark**, menu de navegação recolhível e template Content Row.',
            'Team Development refeito (issues, labels, milestones).'
        ],
        descontinuados: [
            'AnyChart, AnyMap e AnyGantt depreciados; impressão baseada em ORDS desuportada.'
        ],
        notas: ''
    },
    en: {
        destaque: 'Debut of **Faceted Search**, a redesigned **Popup LOV**, Markdown Editor and Star Rating items and the **Vita – Dark** style.',
        tags: ['faceted search', 'popup lov', 'markdown', 'star rating', 'dark mode'],
        recursos: [
            '**Faceted Search**: in-database filtering, auto-discovered facets and dynamic counts.',
            'Redesigned **Popup LOV**: multiple columns, search-as-you-type and multi-select.',
            'Shared LOVs with REST sources and multiple display columns.',
            'New **Markdown Editor** and **Star Rating** items; on/off-styled Switch.',
            'Interactive Grid over external sources (REST Enabled SQL and Web Sources).',
            'Data Load into existing tables (Excel, CSV, XML, JSON).',
            '**Vita – Dark** theme style, collapsible navigation menu and the Content Row template.',
            'Rebuilt Team Development (issues, labels, milestones).'
        ],
        descontinuados: [
            'AnyChart, AnyMap and AnyGantt deprecated; ORDS-based printing desupported.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '19.1',
    nome: 'Oracle APEX 19.1',
    ano: 2019,
    data: '2019-03',
    era: 'anual',
    bd: '11.2.0.4+',
    links: [
        { t: 'Release Notes 19.1', u: 'https://docs.oracle.com/en/database/oracle/application-express/19.1/htmrn/index.html' }
    ],
    pt: {
        destaque: 'Nova **Form Region** nativa, formulários sobre REST, novo **Data Loading** no SQL Workshop e o pacote «APEX_DATA_PARSER».',
        tags: ['form region', 'data loading', 'apex_data_parser', 'dark mode', 'inline popup'],
        recursos: [
            '**Form Region** nativa: a fonte de dados fica na região (tabela, SQL ou função), com detecção de *lost update*.',
            'Formulários lendo e gravando em REST Enabled SQL e Web Sources.',
            '**Data Loading** no SQL Workshop com arrastar e soltar (CSV, XLSX, XML, JSON) e arquivos grandes em background.',
            'Pacote «APEX_DATA_PARSER».',
            '**Dark Mode** para o App Builder.',
            'Template de região **Inline Popup** e Dynamic Actions *Open Region* / *Close Region*.',
            'Habilitar REST em tabelas e views direto pelo Object Browser.'
        ],
        descontinuados: [
            'Team Development legado e impressão baseada em ORDS depreciados.'
        ],
        notas: ''
    },
    en: {
        destaque: 'A native **Form Region**, REST-based forms, new **Data Loading** in SQL Workshop and the «APEX_DATA_PARSER» package.',
        tags: ['form region', 'data loading', 'apex_data_parser', 'dark mode', 'inline popup'],
        recursos: [
            'Native **Form Region**: the data source lives on the region (table, SQL or function), with *lost update* detection.',
            'Forms reading from and writing to REST Enabled SQL and Web Sources.',
            'Drag-and-drop **Data Loading** in SQL Workshop (CSV, XLSX, XML, JSON) with large files in the background.',
            '«APEX_DATA_PARSER» package.',
            '**Dark Mode** for App Builder.',
            '**Inline Popup** region template and *Open Region* / *Close Region* dynamic actions.',
            'REST-enable tables and views straight from Object Browser.'
        ],
        descontinuados: [
            'Legacy Team Development and ORDS-based printing deprecated.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '18.2',
    nome: 'Oracle APEX 18.2',
    ano: 2018,
    data: '2018-09',
    era: 'anual',
    bd: '11.2.0.4+',
    ords: '3.0.12+',
    links: [
        { t: 'Release Notes 18.2', u: 'https://docs.oracle.com/en/database/oracle/application-express/18.2/htmrn/index.html' }
    ],
    pt: {
        destaque: 'Master Detail **lado a lado**, página Dashboard no wizard, Font APEX 2.1 e a galeria de apps de exemplo.',
        tags: ['master detail', 'dashboard', 'font apex', 'sample apps'],
        recursos: [
            'Layout **Master Detail Side by Side**; os antigos "Single Page" e "Two Page" viram *Stacked* e *Drill Down*.',
            'Página **Dashboard** no Create Page Wizard.',
            'LOVs estáticas declarativas no Page Designer.',
            'Font APEX 2.1.',
            '"Packaged Apps" passam a se chamar **Productivity & Sample Apps**; *Sample Datasets* no Create Application.',
            'Set Value preenchendo várias colunas do Interactive Grid.'
        ],
        descontinuados: [
            'jQuery Flot e o gráfico JET Dial Gauge depreciados.'
        ],
        notas: ''
    },
    en: {
        destaque: '**Side-by-side** Master Detail, a Dashboard page in the wizard, Font APEX 2.1 and the sample app gallery.',
        tags: ['master detail', 'dashboard', 'font apex', 'sample apps'],
        recursos: [
            '**Master Detail Side by Side** layout; the old "Single Page" and "Two Page" become *Stacked* and *Drill Down*.',
            '**Dashboard** page in the Create Page Wizard.',
            'Declarative static LOVs in Page Designer.',
            'Font APEX 2.1.',
            '"Packaged Apps" renamed **Productivity & Sample Apps**; *Sample Datasets* in Create Application.',
            'Set Value filling several Interactive Grid columns.'
        ],
        descontinuados: [
            'jQuery Flot and the JET Dial Gauge chart deprecated.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '18.1',
    nome: 'Oracle APEX 18.1',
    ano: 2018,
    data: '2018-05',
    era: 'anual',
    bd: '11.2.0.4+',
    ords: '3.0.12+',
    links: [
        { t: 'Release Notes 18.1', u: 'https://docs.oracle.com/database/apex-18.1/HTMRN/toc.htm' }
    ],
    pt: {
        destaque: 'Começa a **numeração por ano**. Chegam **REST Enabled SQL**, **Web Source Modules**, **Social Sign-In** e o novo Create App Wizard com *Application Features*.',
        tags: ['numeração anual', 'rest enabled sql', 'web source', 'social sign-in', 'application features', 'gantt'],
        recursos: [
            '**REST Enabled SQL**: usar um banco remoto como fonte de relatórios, gráficos e processos.',
            '**Web Source Modules**: consumo declarativo de REST (ORDS, Simple HTTP, Oracle Fusion) com Data Profiles.',
            'Novo **Create App Wizard** com **Application Features** (Access Control, Activity Reporting, Feedback, Configuration Options...).',
            '**Social Sign-In**: Google, Facebook, OpenID Connect e OAuth2.',
            'Novos gráficos JET: **Gantt**, Box Plot e Pyramid; gráficos de IR passam a usar JET.',
            '**Font APEX 2** (Font Awesome removido).',
            'Busca global no App Builder; JavaScript API Reference como guia próprio.',
            'List View, Column Toggle e Reflow passam a funcionar na interface desktop.'
        ],
        descontinuados: [
            'jQuery Mobile e o tema mobile 51 desuportados (fim da interface Mobile separada).',
            'Temas legados 1–26 e 50, gráficos HTML/SVG legados e o Legacy Component View desuportados.'
        ],
        notas: `A versão foi planejada como "5.2", mas a Oracle adotou o formato **AA.N** (ano + sequência), com duas versões por ano.`
    },
    en: {
        destaque: '**Year-based numbering** begins. **REST Enabled SQL**, **Web Source Modules**, **Social Sign-In** and a new Create App Wizard with *Application Features* arrive.',
        tags: ['year-based numbering', 'rest enabled sql', 'web source', 'social sign-in', 'application features', 'gantt'],
        recursos: [
            '**REST Enabled SQL**: use a remote database as the source of reports, charts and processes.',
            '**Web Source Modules**: declarative REST consumption (ORDS, Simple HTTP, Oracle Fusion) with Data Profiles.',
            'New **Create App Wizard** with **Application Features** (Access Control, Activity Reporting, Feedback, Configuration Options...).',
            '**Social Sign-In**: Google, Facebook, OpenID Connect and OAuth2.',
            'New JET charts: **Gantt**, Box Plot and Pyramid; IR charts now use JET.',
            '**Font APEX 2** (Font Awesome removed).',
            'Global search in App Builder; the JavaScript API Reference becomes its own guide.',
            'List View, Column Toggle and Reflow work in the desktop UI.'
        ],
        descontinuados: [
            'jQuery Mobile and mobile theme 51 desupported (end of the separate Mobile UI).',
            'Legacy themes 1–26 and 50, legacy HTML/SVG charts and the Legacy Component View desupported.'
        ],
        notas: `It was planned as "5.2", but Oracle adopted the **YY.N** format (year + sequence), with two releases per year.`
    }
});

DOC.versao({
    id: '5.1',
    nome: 'Oracle Application Express 5.1',
    ano: 2016,
    data: '2016-12',
    era: 'moderna',
    bd: '11.2.0.4+',
    ords: 'ORDS 2.0.3+ / EPG / mod_plsql',
    links: [
        { t: 'Release Notes 5.1', u: 'https://docs.oracle.com/database/apex-5.1/HTMRN/toc.htm' }
    ],
    pt: {
        destaque: 'Nasce o **Interactive Grid** e chegam os gráficos **Oracle JET** e a biblioteca de ícones **Font APEX**.',
        tags: ['interactive grid', 'oracle jet', 'font apex', 'quick sql'],
        recursos: [
            '**Interactive Grid**: grade editável com colunas congeladas, paginação por rolagem, agregações, gráficos e mestre-detalhe-detalhe em N níveis.',
            '**Oracle JET Charts**: gráficos HTML5 modernos.',
            '**Font APEX**: mais de 1.000 ícones; *Live Template Options*.',
            'Wizards de Create Application e Create Page simplificados.',
            'Calendar com eventos para Dynamic Actions e navegação por teclado.',
            'File Browse com múltiplos arquivos; *Reload on Submit*; **Warn on Unsaved Changes**.',
            'Novos apps: **Quick SQL**, REST Client Assistant e Sample Interactive Grids.'
        ],
        descontinuados: [
            'Temas 1–26 e 50 depreciados; migração de Microsoft Access desuportada.'
        ],
        notas: ''
    },
    en: {
        destaque: 'The **Interactive Grid** is born, along with **Oracle JET** charts and the **Font APEX** icon library.',
        tags: ['interactive grid', 'oracle jet', 'font apex', 'quick sql'],
        recursos: [
            '**Interactive Grid**: an editable grid with frozen columns, scroll pagination, aggregates, charts and N-level master-detail-detail.',
            '**Oracle JET Charts**: modern HTML5 charts.',
            '**Font APEX**: 1,000+ icons; *Live Template Options*.',
            'Simplified Create Application and Create Page wizards.',
            'Calendar events for Dynamic Actions and keyboard navigation.',
            'Multi-file File Browse; *Reload on Submit*; **Warn on Unsaved Changes**.',
            'New apps: **Quick SQL**, REST Client Assistant and Sample Interactive Grids.'
        ],
        descontinuados: [
            'Themes 1–26 and 50 deprecated; Microsoft Access migration desupported.'
        ],
        notas: ''
    }
});

DOC.versao({
    id: '5.0',
    nome: 'Oracle Application Express 5.0',
    ano: 2015,
    data: '2015-04',
    era: 'moderna',
    bd: '11.1.0.7+',
    ords: 'ORDS 2.0.3+ / EPG / mod_plsql',
    links: [
        { t: 'Application Express 5.0 — Release Notes', u: 'https://docs.oracle.com/cd/E59726_01/doc.50/e39143/toc.htm' }
    ],
    pt: {
        destaque: 'A grande reformulação: **Page Designer**, **Universal Theme** com **Theme Roller** e páginas **modais** nativas.',
        tags: ['page designer', 'universal theme', 'theme roller', 'template options', 'modal dialog'],
        recursos: [
            '**Page Designer**: IDE no navegador com árvore de componentes, Grid Layout com arrastar e soltar e Property Editor.',
            '**Universal Theme (Theme 42)**: tema responsivo com **Theme Styles**, **Theme Roller** e **Template Options**.',
            'Páginas **Modal Dialog** nativas.',
            'Vários Interactive Reports na mesma página, **Pivot View** e cabeçalhos fixos.',
            'Novo **Calendar** baseado no FullCalendar, com arrastar e soltar.',
            '**Navigation Menu** lateral ou superior baseado em listas.',
            'Pacote «APEX_AUTHORIZATION» e autenticação flexível do workspace.',
            'Relatórios mobile Reflow e Column Toggle.'
        ],
        descontinuados: [
            'Flash 3 Charts desuportados (migrados para AnyChart).',
            'htmldb_Get, Ajax síncrono em Dynamic Actions e Classic Tree depreciados.'
        ],
        notas: `Resultado de cerca de dois anos e meio de engenharia, a 5.0 definiu a aparência e a forma de trabalho do APEX moderno.`
    },
    en: {
        destaque: 'The big overhaul: **Page Designer**, **Universal Theme** with **Theme Roller** and native **modal** pages.',
        tags: ['page designer', 'universal theme', 'theme roller', 'template options', 'modal dialog'],
        recursos: [
            '**Page Designer**: an in-browser IDE with a component tree, drag-and-drop Grid Layout and a Property Editor.',
            '**Universal Theme (Theme 42)**: a responsive theme with **Theme Styles**, **Theme Roller** and **Template Options**.',
            'Native **Modal Dialog** pages.',
            'Multiple Interactive Reports per page, **Pivot View** and fixed headers.',
            'New FullCalendar-based **Calendar** with drag and drop.',
            'List-based side or top **Navigation Menu**.',
            '«APEX_AUTHORIZATION» package and flexible workspace authentication.',
            'Reflow and Column Toggle mobile reports.'
        ],
        descontinuados: [
            'Flash 3 Charts desupported (migrated to AnyChart).',
            'htmldb_Get, synchronous Ajax in Dynamic Actions and Classic Tree deprecated.'
        ],
        notas: `The result of about two and a half years of engineering, 5.0 defined the look and workflow of modern APEX.`
    }
});

DOC.versao({
    id: '4.2',
    nome: 'Oracle Application Express 4.2',
    ano: 2012,
    data: '2012-10',
    era: 'classica',
    bd: '10.2.0.4+',
    ords: 'APEX Listener 2.0 (REST)',
    links: [
        { t: 'Application Express 4.2 — What\'s New', u: 'https://docs.oracle.com/cd/E37097_01/doc.42/e35125/GUID-3614E8FE-7212-4CA5-833B-261081BDAAFF.htm' },
        { t: 'Installation Guide 4.2 — Requirements', u: 'https://docs.oracle.com/cd/E37097_01/install.42/e35123/pre_require.htm' }
    ],
    pt: {
        destaque: 'Foco em **mobile** (jQuery Mobile), **gráficos HTML5**, **RESTful Services** publicados pelo banco e o **Theme 25** responsivo.',
        tags: ['mobile', 'jquery mobile', 'html5', 'restful services', 'theme 25', 'packaged applications'],
        recursos: [
            '**Aplicações mobile**: interface Mobile separada da Desktop, com detecção automática, temas jQuery Mobile, região List View e transições.',
            '**Gráficos HTML5**, dispensando o Flash.',
            'Tipos de item HTML5 (number, email, tel, url), Slider e Yes/No (flip toggle).',
            '**RESTful Services** no SQL Workshop: o banco passa a *publicar* APIs REST (exige APEX Listener 2.0).',
            '**Packaged Applications**: aplicações de produtividade prontas para instalar.',
            '**Theme 25** responsivo, baseado no novo **Grid Layout**; jQuery carregado por CDN.',
            'Branches nomeados, páginas e regiões somente leitura, estado de sessão compartilhado entre aplicações.',
            'Plug-ins com até 25 atributos customizados.'
        ],
        descontinuados: [],
        notas: `O Oracle Database 12c R1 passou a trazer o APEX 4.2 instalado por padrão. Os patch sets foram até o **4.2.6** (setembro de 2014).`
    },
    en: {
        destaque: 'Focus on **mobile** (jQuery Mobile), **HTML5 charts**, **RESTful Services** published by the database and the responsive **Theme 25**.',
        tags: ['mobile', 'jquery mobile', 'html5', 'restful services', 'theme 25', 'packaged applications'],
        recursos: [
            '**Mobile applications**: a Mobile user interface separate from Desktop, with auto-detection, jQuery Mobile themes, List View region and transitions.',
            '**HTML5 charts**, no more Flash.',
            'HTML5 item types (number, email, tel, url), Slider and Yes/No (flip toggle).',
            '**RESTful Services** in SQL Workshop: the database now *publishes* REST APIs (requires APEX Listener 2.0).',
            '**Packaged Applications**: ready-to-install productivity apps.',
            'Responsive **Theme 25**, based on the new **Grid Layout**; jQuery loaded from a CDN.',
            'Named branches, read-only pages and regions, session state shared across applications.',
            'Plug-ins with up to 25 custom attributes.'
        ],
        descontinuados: [],
        notas: `Oracle Database 12c R1 shipped with APEX 4.2 installed by default. Patch sets went up to **4.2.6** (September 2014).`
    }
});

DOC.versao({
    id: '4.1',
    nome: 'Oracle Application Express 4.1',
    ano: 2011,
    data: '2011-08',
    era: 'classica',
    bd: '10.2.0.4+',
    ords: 'APEX Listener / EPG / mod_plsql',
    links: [
        { t: 'Application Express 4.1 — What\'s New', u: 'https://docs.oracle.com/cd/E23903_01/doc.41/e21674/what_new.htm' }
    ],
    pt: {
        destaque: 'Tratamento de erros centralizado, **ROWID** em formulários, **Data Upload** para usuários finais e plug-ins de autenticação e autorização.',
        tags: ['error handling', 'rowid', 'data upload', 'plug-ins', 'acessibilidade'],
        recursos: [
            '**Error Handling Function**: troca mensagens técnicas do banco por textos amigáveis.',
            '**ROWID** em formulários como alternativa à chave primária (fim do limite de duas colunas-chave).',
            '**Data Upload**: carga de dados pelo usuário final com mapeamento de colunas e transformações.',
            'Calendário com arrastar e soltar; Websheets redesenhados.',
            'Tabular forms com todos os tipos de validação.',
            'Plug-ins de **autenticação** e **autorização**.',
            '**Acessibilidade**: modo leitor de tela e alto contraste.'
        ],
        descontinuados: [],
        notas: ''
    },
    en: {
        destaque: 'Centralized error handling, **ROWID** in forms, end-user **Data Upload** and authentication/authorization plug-ins.',
        tags: ['error handling', 'rowid', 'data upload', 'plug-ins', 'accessibility'],
        recursos: [
            '**Error Handling Function**: replaces technical database messages with friendly text.',
            '**ROWID** in forms as an alternative to the primary key (no more two-key-column limit).',
            '**Data Upload**: end-user data loading with column mapping and transformations.',
            'Drag-and-drop calendar; redesigned Websheets.',
            'Tabular forms with every validation type.',
            '**Authentication** and **authorization** plug-ins.',
            '**Accessibility**: screen reader mode and high contrast.'
        ],
        descontinuados: [],
        notas: ''
    }
});

DOC.versao({
    id: '4.0',
    nome: 'Oracle Application Express 4.0',
    ano: 2010,
    data: '2010-06',
    era: 'classica',
    bd: '10.2.0.3+',
    ords: 'APEX Listener 1.0 / EPG / mod_plsql',
    links: [
        { t: 'Application Express 4.0 — What\'s New', u: 'https://docs.oracle.com/cd/E17556_01/user.40/e15517/what_new.htm' },
        { t: 'Joel Kallman — Oracle Application Express 4.0 is released', u: 'https://joelkallman.blogspot.com/2010/06/oracle-application-express-40-is.html' }
    ],
    pt: {
        destaque: 'Um divisor de águas: **Dynamic Actions**, **Plug-ins**, **Websheets**, **Team Development** e o novo **APEX Listener**.',
        tags: ['dynamic actions', 'plug-ins', 'websheets', 'team development', 'apex listener'],
        recursos: [
            '**Dynamic Actions**: comportamento no navegador sem escrever JavaScript.',
            '**Plug-ins** em PL/SQL para itens, regiões e processos.',
            '**Websheets**: aplicações de dados e conteúdo criadas por usuários finais.',
            '**Team Development**: features, to-dos, bugs, marcos e feedback.',
            'Consumo de **RESTful Web Services**.',
            'Gráficos AnyChart 5.1 (mapas, Gantt) e Interactive Reports com visão de ícones, filtros compostos, Group By e assinatura por e-mail.',
            'Application Builder redesenhado; suporte a TIMESTAMP WITH TIME ZONE; 20 temas.',
            'Novo web listener em Java: o **APEX Listener** (alternativa ao mod_plsql e ao EPG).'
        ],
        descontinuados: [],
        notas: `Lançado em junho de 2010 após três *Early Adopters*. O APEX Listener, lançado no mesmo período, é o antecessor direto do **ORDS** (renomeado Oracle REST Data Services a partir da versão 2.0.6).`
    },
    en: {
        destaque: 'A watershed release: **Dynamic Actions**, **Plug-ins**, **Websheets**, **Team Development** and the new **APEX Listener**.',
        tags: ['dynamic actions', 'plug-ins', 'websheets', 'team development', 'apex listener'],
        recursos: [
            '**Dynamic Actions**: browser behavior without writing JavaScript.',
            'PL/SQL **plug-ins** for items, regions and processes.',
            '**Websheets**: data and content apps built by end users.',
            '**Team Development**: features, to-dos, bugs, milestones and feedback.',
            'Consuming **RESTful Web Services**.',
            'AnyChart 5.1 charts (maps, Gantt) and Interactive Reports with icon view, compound filters, Group By and e-mail subscriptions.',
            'Redesigned Application Builder; TIMESTAMP WITH TIME ZONE support; 20 themes.',
            'A new Java web listener: the **APEX Listener** (alternative to mod_plsql and EPG).'
        ],
        descontinuados: [],
        notas: `Released in June 2010 after three *Early Adopter* rounds. The APEX Listener, shipped around the same time, is the direct predecessor of **ORDS** (renamed Oracle REST Data Services from release 2.0.6).`
    }
});

DOC.versao({
    id: '3.2',
    nome: 'Oracle Application Express 3.2',
    ano: 2009,
    data: '2009-02',
    era: 'classica',
    bd: '9.2.0.3+',
    links: [
        { t: 'Application Express 3.2 — What\'s New', u: 'https://docs.oracle.com/cd/E14373_01/appdev.32/e11838/what_new.htm' }
    ],
    pt: {
        destaque: '**Conversão de Oracle Forms** para APEX e um pacote de reforços de **segurança**.',
        tags: ['oracle forms', 'forms conversion', 'segurança', 'criptografia'],
        recursos: [
            '**Forms Conversion**: converte telas, menus, relatórios e bibliotecas do Oracle Forms (via XML do Forms2XML) em uma aplicação APEX.',
            'Criptografia declarativa do estado de sessão e timeouts de sessão configuráveis.',
            'Itens de senha que não gravam valor no estado de sessão.',
            'Opção de exigir HTTPS e senhas fortes para administradores.',
            'Menos privilégios exigidos no banco; schema passa a se chamar «APEX_030200» (antes «FLOWS_»).'
        ],
        descontinuados: [],
        notas: ''
    },
    en: {
        destaque: '**Oracle Forms conversion** to APEX and a batch of **security** hardening.',
        tags: ['oracle forms', 'forms conversion', 'security', 'encryption'],
        recursos: [
            '**Forms Conversion**: converts Oracle Forms screens, menus, reports and libraries (via Forms2XML XML) into an APEX application.',
            'Declarative session state encryption and configurable session timeouts.',
            'Password items that never store their value in session state.',
            'Option to require HTTPS and strong admin passwords.',
            'Fewer database privileges required; the schema is now named «APEX_030200» (formerly «FLOWS_»).'
        ],
        descontinuados: [],
        notas: ''
    }
});

DOC.versao({
    id: '3.1',
    nome: 'Oracle Application Express 3.1',
    ano: 2008,
    data: '2008-02',
    era: 'classica',
    bd: '9.2.0.3+',
    links: [
        { t: 'Application Express 3.1 — What\'s New', u: 'https://docs.oracle.com/cd/E10513_01/appdev.310/e10499/what_new.htm' }
    ],
    pt: {
        destaque: 'Nascem os **Interactive Reports**: filtros, ordenação, quebras, gráficos e relatórios salvos nas mãos do usuário final.',
        tags: ['interactive report', 'runtime', 'blob', 'javascript'],
        recursos: [
            '**Interactive Reports**: usuário escolhe colunas, filtros, destaques, ordenação, quebras, agregações, gráficos e colunas calculadas; salva relatórios e baixa em CSV, XLS, PDF ou RTF.',
            'Instalação **runtime-only** para produção, sem o builder.',
            'Bibliotecas JavaScript documentadas e arquivos JS/CSS comprimidos.',
            'Suporte declarativo a **BLOB**: upload, download e exibição em formulários e relatórios.',
            'Item *Hidden and Protected*; anexos de e-mail nas APIs; formato de data por aplicação.'
        ],
        descontinuados: [],
        notas: ''
    },
    en: {
        destaque: '**Interactive Reports** are born: filters, sorting, breaks, charts and saved reports in the hands of end users.',
        tags: ['interactive report', 'runtime', 'blob', 'javascript'],
        recursos: [
            '**Interactive Reports**: users pick columns, filters, highlights, sorting, breaks, aggregates, charts and computed columns; save reports and download as CSV, XLS, PDF or RTF.',
            '**Runtime-only** installation for production, without the builder.',
            'Documented JavaScript libraries and compressed JS/CSS files.',
            'Declarative **BLOB** support: upload, download and display in forms and reports.',
            '*Hidden and Protected* item; e-mail attachments in the APIs; per-application date format.'
        ],
        descontinuados: [],
        notas: ''
    }
});

DOC.versao({
    id: '3.0',
    nome: 'Oracle Application Express 3.0',
    ano: 2007,
    data: '2007-03',
    era: 'classica',
    bd: '9.2+',
    links: [
        { t: 'Application Express 3.0 — What\'s New', u: 'https://docs.oracle.com/cd/B32472_01/appdev.300/b32471/what_new.htm' }
    ],
    pt: {
        destaque: '**Impressão em PDF**, **Flash Charts**, migração de Microsoft Access e o Embedded PL/SQL Gateway como opção de servidor web.',
        tags: ['pdf', 'flash charts', 'access', 'epg', 'cache'],
        recursos: [
            '**Impressão de relatórios em PDF**.',
            '**Flash Charts** com 18 tipos de gráfico.',
            '**Migração de aplicações Microsoft Access**.',
            'Primeira versão a documentar o **Embedded PL/SQL Gateway (EPG)** como alternativa ao mod_plsql.',
            'Novos itens (Shuttle, editores HTML, Color Picker) e calendários mensal, semanal e diário.',
            '**Cache de página e de região**; comparação de aplicações e schemas.',
            'Políticas de senha e bloqueio de contas.'
        ],
        descontinuados: [],
        notas: `O Oracle Database 11g R1 (2007) passou a incluir o APEX na distribuição principal do banco. O 3.0.1 permitiu atualizar o APEX do Oracle XE.`
    },
    en: {
        destaque: '**PDF printing**, **Flash Charts**, Microsoft Access migration and the Embedded PL/SQL Gateway as a web server option.',
        tags: ['pdf', 'flash charts', 'access', 'epg', 'cache'],
        recursos: [
            '**PDF report printing**.',
            '**Flash Charts** with 18 chart types.',
            '**Microsoft Access application migration**.',
            'First release to document the **Embedded PL/SQL Gateway (EPG)** as an alternative to mod_plsql.',
            'New items (Shuttle, HTML editors, Color Picker) and monthly, weekly and daily calendars.',
            '**Page and region caching**; application and schema comparison.',
            'Password policies and account locking.'
        ],
        descontinuados: [],
        notas: `Oracle Database 11g R1 (2007) started shipping APEX in the main database distribution. 3.0.1 made it possible to upgrade APEX inside Oracle XE.`
    }
});

DOC.versao({
    id: '2.2',
    nome: 'Oracle Application Express 2.2',
    ano: 2006,
    data: '2006-08',
    era: 'classica',
    bd: '9.2.0.3+',
    links: [
        { t: 'Application Express 2.2 — What\'s New', u: 'https://docs.oracle.com/cd/B31036_01/appdev.22/b28550/what_new.htm' }
    ],
    pt: {
        destaque: 'Primeira versão para download com o nome **Application Express**: APIs com prefixo «APEX_» e aplicações empacotadas com **Supporting Objects**.',
        tags: ['application express', 'apex_', 'supporting objects', 'packaged applications'],
        recursos: [
            'Todas as APIs passam a usar o prefixo «APEX_».',
            '**Supporting Objects**: aplicação, imagens, CSS, JS, DDL e dados iniciais num único arquivo instalável.',
            '**Access Control Wizard** (listas de controle de acesso).',
            'Item Finder, exportação por componente e cópia de páginas entre aplicações.',
            'Developer Comments, suporte a TIMESTAMP e debug do processamento da página.'
        ],
        descontinuados: [],
        notas: ''
    },
    en: {
        destaque: 'First downloadable release named **Application Express**: «APEX_»-prefixed APIs and packaged apps with **Supporting Objects**.',
        tags: ['application express', 'apex_', 'supporting objects', 'packaged applications'],
        recursos: [
            'All APIs now use the «APEX_» prefix.',
            '**Supporting Objects**: app, images, CSS, JS, DDL and seed data in a single installable file.',
            '**Access Control Wizard** (access control lists).',
            'Item Finder, component-level export and copying pages between apps.',
            'Developer Comments, TIMESTAMP support and page-processing debug.'
        ],
        descontinuados: [],
        notas: ''
    }
});

DOC.versao({
    id: '2.1',
    nome: 'Oracle Application Express 2.1 (Oracle XE)',
    ano: 2006,
    data: '2006-02',
    era: 'classica',
    bd: '10g XE',
    links: [
        { t: 'Oracle Database XE — Application Express User\'s Guide 2.1', u: 'https://docs.oracle.com/cd/B25329_01/doc/appdev.102/b25309/preface.htm' }
    ],
    pt: {
        destaque: 'O HTML DB vira **Oracle Application Express** e chega embutido no gratuito **Oracle Database 10g Express Edition**.',
        tags: ['xe', 'express edition', 'renomeação', 'embedded pl/sql gateway'],
        recursos: [
            'Novo nome anunciado em 30/01/2006: **Oracle Application Express**.',
            'Incluído no **Oracle Database 10g XE** (gratuito, até 4 GB de dados), lançado em fevereiro de 2006.',
            'Acesso pelo **Embedded PL/SQL Gateway**, sem precisar do Oracle HTTP Server.',
            'Application Builder, Object Browser, Query Builder, SQL Scripts e utilitários num ambiente simplificado.'
        ],
        descontinuados: [],
        notas: `Ao que tudo indica, a 2.1 nunca foi distribuída como download avulso — ela existiu dentro do Oracle XE.`
    },
    en: {
        destaque: 'HTML DB becomes **Oracle Application Express** and ships inside the free **Oracle Database 10g Express Edition**.',
        tags: ['xe', 'express edition', 'rename', 'embedded pl/sql gateway'],
        recursos: [
            'New name announced on 30 Jan 2006: **Oracle Application Express**.',
            'Bundled with **Oracle Database 10g XE** (free, up to 4 GB of data), released in February 2006.',
            'Served by the **Embedded PL/SQL Gateway**, no Oracle HTTP Server needed.',
            'Application Builder, Object Browser, Query Builder, SQL Scripts and utilities in a simplified environment.'
        ],
        descontinuados: [],
        notas: `As far as we can tell, 2.1 was never shipped as a standalone download — it lived inside Oracle XE.`
    }
});

DOC.versao({
    id: '2.0',
    nome: 'Oracle HTML DB 2.0',
    ano: 2005,
    data: '2005-09',
    era: 'origens',
    bd: '9.2.0.3+',
    links: [
        { t: 'HTML DB 2.0 — What\'s New', u: 'https://docs.oracle.com/cd/B31035_01/appdev.200/b16373/what_new.htm' }
    ],
    pt: {
        destaque: '**SQL Workshop** reconstruído, **Session State Protection**, relatórios com AJAX e análise de SQL injection.',
        tags: ['sql workshop', 'session state protection', 'ajax', 'query builder'],
        recursos: [
            'SQL Workshop reconstruído: **Object Browser**, **Query Builder** gráfico, SQL Commands com explain plan, SQL Scripts e Database Monitor.',
            'Novo Create Application Wizard (várias tabelas, drill-down).',
            '**Session State Protection** contra adulteração de URL.',
            'Ferramenta de análise de **SQL injection**.',
            'Paginação e ordenação de relatórios com *partial page refresh* (AJAX).',
            'Listas hierárquicas, menus suspensos e ajuda sensível ao contexto.'
        ],
        descontinuados: [],
        notas: ''
    },
    en: {
        destaque: 'Rebuilt **SQL Workshop**, **Session State Protection**, AJAX reports and SQL injection analysis.',
        tags: ['sql workshop', 'session state protection', 'ajax', 'query builder'],
        recursos: [
            'Rebuilt SQL Workshop: **Object Browser**, graphical **Query Builder**, SQL Commands with explain plan, SQL Scripts and Database Monitor.',
            'New Create Application Wizard (multiple tables, drill-down).',
            '**Session State Protection** against URL tampering.',
            '**SQL injection** analysis tool.',
            'Report pagination and sorting with *partial page refresh* (AJAX).',
            'Hierarchical lists, drop-down menus and context-sensitive help.'
        ],
        descontinuados: [],
        notas: ''
    }
});

DOC.versao({
    id: '1.6',
    nome: 'Oracle HTML DB 1.6',
    ano: 2005,
    data: '2005-07',
    era: 'origens',
    bd: '9.2.0.3+',
    links: [
        { t: 'HTML DB 1.6 — What\'s New', u: 'https://docs.oracle.com/cd/B19306_01/appdev.102/b14303/what_new.htm' }
    ],
    pt: {
        destaque: 'Chegam os **temas**, o assistente **Master Detail**, Web Services e calendários.',
        tags: ['themes', 'master detail', 'web services', 'calendário'],
        recursos: [
            '**Themes**: templates agrupados em temas, trocando o visual da aplicação inteira de uma vez.',
            'Assistente de formulário **Master Detail**.',
            'Suporte a **Web Services** (UDDI/WSDL) com assistentes de formulário e relatório.',
            'Criação de aplicação a partir de planilha ou tabela.',
            'Calendários, gráficos SVG e melhorias em tabular forms.',
            '*Page groups* e bloqueio de páginas entre desenvolvedores.'
        ],
        descontinuados: [],
        notas: `Joel Kallman cita a 1.6 em 2004; a política de suporte da Oracle registra a disponibilidade geral em julho de 2005.`
    },
    en: {
        destaque: '**Themes**, the **Master Detail** wizard, Web Services and calendars arrive.',
        tags: ['themes', 'master detail', 'web services', 'calendar'],
        recursos: [
            '**Themes**: templates grouped into themes, switching the whole app look at once.',
            '**Master Detail** form wizard.',
            '**Web Services** support (UDDI/WSDL) with form and report wizards.',
            'Create an application from a spreadsheet or table.',
            'Calendars, SVG charts and tabular form improvements.',
            'Page groups and page locking between developers.'
        ],
        descontinuados: [],
        notas: `Joel Kallman dates 1.6 to 2004; Oracle's support policy lists general availability in July 2005.`
    }
});

DOC.versao({
    id: '1.5',
    nome: 'Oracle HTML DB 1.5',
    ano: 2004,
    data: '2004-02',
    era: 'origens',
    bd: '9.2.0.3+',
    links: [
        { t: 'Joel Kallman — Happy birthday, Oracle Application Express', u: 'https://joelkallman.blogspot.com/2014/01/happy-birthday-oracle-application.html' },
        { t: 'HTML DB 1.5 — Introduction', u: 'https://docs.oracle.com/cd/B13789_01/appdev.101/b10992/mvl_intro.htm' }
    ],
    pt: {
        destaque: 'Primeira versão oficial e suportada, distribuída no Companion CD do **Oracle Database 10g**.',
        tags: ['html db', 'primeira versão', '10g', 'mod_plsql'],
        recursos: [
            'Ambiente declarativo e multi-workspace para aplicações web centradas em banco de dados.',
            'Aplicações renderizadas em tempo real a partir de **metadados** e estado de sessão automático.',
            '**Application Builder** (páginas, regiões, formulários, relatórios, gráficos).',
            '**SQL Workshop** (SQL Command Processor, scripts, Database Browser) e **Data Workshop** (importação/exportação).',
            'Servido pelo Oracle HTTP Server com **mod_plsql**.'
        ],
        descontinuados: [],
        notas: `Curiosidade: os arquivos do guia do HTML DB 1.5 têm o prefixo «mvl_», herança do nome *Project Marvel*, e os schemas do produto se chamavam «FLOWS_xxxxxx» até a 3.1.`
    },
    en: {
        destaque: 'The first official, supported release, shipped on the **Oracle Database 10g** Companion CD.',
        tags: ['html db', 'first release', '10g', 'mod_plsql'],
        recursos: [
            'Declarative, multi-workspace environment for database-centric web applications.',
            'Applications rendered at runtime from **metadata**, with automatic session state.',
            '**Application Builder** (pages, regions, forms, reports, charts).',
            '**SQL Workshop** (SQL Command Processor, scripts, Database Browser) and **Data Workshop** (import/export).',
            'Served by Oracle HTTP Server with **mod_plsql**.'
        ],
        descontinuados: [],
        notas: `Fun fact: the HTML DB 1.5 guide files use the «mvl_» prefix, a leftover from the *Project Marvel* name, and product schemas were called «FLOWS_xxxxxx» up to 3.1.`
    }
});

DOC.versao({
    id: 'flows',
    ordem: 50,
    nome: 'Flows / Project Marvel',
    ano: 1999,
    data: '1999',
    era: 'origens',
    links: [
        { t: 'Joel Kallman — My personal thanks to the Chicago Police', u: 'https://joelkallman.blogspot.com/2019/11/my-personal-thanks-to-chicago-police.html' },
        { t: 'Rittman Mead (2003) — HTML DB, formerly Project Marvel', u: 'https://www.rittmanmead.com/blog/2003/08/one-of-the-new-features/' }
    ],
    pt: {
        destaque: 'Antes de ter nome comercial: o framework interno **Flows**, criado por Mike Hichwa em 1999, depois oferecido como o serviço hospedado *Project Marvel*.',
        tags: ['origens', 'história', 'flows', 'project marvel', 'mike hichwa', 'joel kallman', 'webdb'],
        recursos: [
            '1999: **Mike Hichwa** (criador do Oracle WebDB) escreve a primeira linha do framework de metadados **Flows**; **Joel Kallman** constrói sobre ele um calendário interno da Oracle, que chega a mais de 25 mil usuários.',
            'Não é uma nova versão do WebDB: código novo, sem caminho de upgrade, aproveitando as lições do WebDB.',
            '2001: o Departamento de Polícia de Chicago adota o Flows para migrar um grande sistema em Oracle Forms — o projeto originou recursos como as **collections**.',
            '2002: o produto vira o serviço hospedado **Project Marvel** («marvel.oracle.com»), sobre o Oracle9i; o login pedia a "Company" (futuro workspace).',
            '2003: anunciado o novo nome **HTML DB**, para ser distribuído com o Oracle Database 10g.'
        ],
        descontinuados: [],
        notas: `O serviço hospedado mudou de endereço junto com o produto: «marvel.oracle.com» (2002), «htmldb.oracle.com» (2003) e **apex.oracle.com** (2006).`
    },
    en: {
        destaque: 'Before it had a product name: the internal **Flows** framework, created by Mike Hichwa in 1999, later offered as the hosted *Project Marvel* service.',
        tags: ['origins', 'history', 'flows', 'project marvel', 'mike hichwa', 'joel kallman', 'webdb'],
        recursos: [
            '1999: **Mike Hichwa** (creator of Oracle WebDB) writes the first line of the **Flows** metadata framework; **Joel Kallman** builds an internal Oracle calendar on it that reaches 25,000+ users.',
            'Not a new version of WebDB: new code, no upgrade path, built on lessons learned from WebDB.',
            '2001: the Chicago Police Department adopts Flows to migrate a large Oracle Forms system — the project gave birth to features such as **collections**.',
            '2002: the product becomes the hosted **Project Marvel** service («marvel.oracle.com»), on Oracle9i; the login asked for a "Company" (the future workspace).',
            '2003: the new name **HTML DB** is announced, to ship with Oracle Database 10g.'
        ],
        descontinuados: [],
        notas: `The hosted service moved along with the product: «marvel.oracle.com» (2002), «htmldb.oracle.com» (2003) and **apex.oracle.com** (2006).`
    }
});
