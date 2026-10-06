DOC.topico({
    id: 'o-que-e-apex',
    cat: 'fundamentos',
    nivel: 'basico',
    links: [
        { t: 'apex.oracle.com — site oficial', u: 'https://apex.oracle.com/' },
        { t: 'Documentação oficial do Oracle APEX', u: 'https://docs.oracle.com/en/database/oracle/apex/' },
        { t: 'Oracle APEX FAQ (oficial)', u: 'https://apex.oracle.com/en/learn/resources/faq/' }
    ],
    relacionados: ['arquitetura', 'workspaces-e-aplicacoes', 'onde-rodar-apex', 'create-app-wizard'],
    pt: {
        titulo: 'O que é o Oracle APEX',
        resumo: 'Plataforma low-code da Oracle para criar aplicações web e mobile escaláveis e seguras diretamente sobre o Oracle Database.',
        tags: ['low-code', 'introdução', 'Application Express', 'o que é', 'gratuito', 'licença'],
        conteudo: `
            O **Oracle APEX** (originalmente *Oracle Application Express*) é uma plataforma de desenvolvimento **low-code** que roda
            inteiramente dentro do **Oracle Database**. Com ele você cria aplicações web responsivas — de um simples cadastro até
            sistemas corporativos com milhares de usuários — usando principalmente o navegador, SQL e PL/SQL.

            ## Por que ele é diferente
            - **Roda no banco de dados**: o "servidor de aplicação" é o próprio Oracle Database. Os metadados das aplicações
              (páginas, regiões, itens, processos) ficam guardados em tabelas, e o motor do APEX monta as páginas em tempo de execução.
            - **Sem custo adicional**: o APEX é um recurso *sem custo* de todas as edições do Oracle Database. Se você tem licença
              do banco (ou usa o Oracle Database Free / Autonomous Database), já pode usar o APEX.
            - **Desenvolvimento 100% no navegador**: o *App Builder* é ele mesmo uma aplicação APEX.
            - **Perto dos dados**: como a lógica executa onde os dados estão, não há camada de mapeamento objeto-relacional,
              e consultas SQL complexas são cidadãs de primeira classe.

            ## O que dá para construir
            - Sistemas internos (cadastros, aprovações, painéis, relatórios).
            - Portais para clientes e fornecedores, com autenticação social ou corporativa (SAML, OpenID Connect).
            - Substituição de planilhas e de aplicações legadas (Oracle Forms, Access).
            - Aplicações mobile responsivas e instaláveis (PWA).
            - Aplicações com recursos de IA generativa (assistentes de chat, geração de SQL, resumo de textos).

            ## Principais blocos de construção
            | Conceito | O que é |
            |---|---|
            | Workspace | Área de trabalho isolada, ligada a um ou mais schemas do banco. |
            | Aplicação | Conjunto de páginas e componentes compartilhados, identificado por um ID numérico. |
            | Página | Tela da aplicação, composta por regiões, itens, botões, processos e ações dinâmicas. |
            | Região | Bloco de conteúdo: relatório, formulário, gráfico, mapa, cards etc. |
            | Item | Campo de página (texto, data, lista) cujo valor fica no *session state*. |
            | Dynamic Action | Comportamento declarativo no navegador (mostrar/ocultar, atualizar, executar código). |
            | Processo | Lógica executada no servidor (PL/SQL, e-mail, API REST, workflow). |

            ## Breve histórico
            O APEX nasceu em 1999 como um projeto interno da Oracle (chamado *Flows*/*Project Marvel*), criado por Mike Hichwa e
            Joel Kallman. Foi lançado comercialmente como **HTML DB 1.5** em 2004, renomeado para **Application Express** em 2006
            (versão 2.1) e, a partir de 2018, passou a usar numeração anual (18.1, 18.2, 19.1...). Veja a [linha do tempo completa](#/versoes).

            :::dica Como começar de graça
            Crie um workspace gratuito em [apex.oracle.com](https://apex.oracle.com/) (ambiente de testes e aprendizado) ou
            use o **Always Free Autonomous Database** na Oracle Cloud. Também é possível instalar localmente com o
            **Oracle Database Free** + ORDS.
            :::

            ## Quando o APEX é uma boa escolha
            - Os dados já estão (ou podem estar) em um Oracle Database.
            - A equipe conhece SQL e PL/SQL.
            - É preciso entregar rápido, com segurança e manutenção simples.
            - A aplicação é orientada a dados: formulários, relatórios, painéis, fluxos de aprovação.

            Para interfaces altamente customizadas (jogos, editores gráficos), o APEX ainda funciona, mas você vai escrever
            mais JavaScript e CSS — ele é extensível via *plug-ins*, *Template Components* e a API JavaScript.
        `
    },
    en: {
        titulo: 'What is Oracle APEX',
        resumo: 'Oracle\'s low-code platform for building scalable, secure web and mobile apps directly on top of Oracle Database.',
        tags: ['low-code', 'introduction', 'Application Express', 'what is', 'free', 'license'],
        conteudo: `
            **Oracle APEX** (originally *Oracle Application Express*) is a **low-code** development platform that runs entirely
            inside **Oracle Database**. You build responsive web applications — from a simple data-entry screen to enterprise
            systems with thousands of users — mostly with a browser, SQL and PL/SQL.

            ## Why it is different
            - **It runs in the database**: the "application server" is Oracle Database itself. Application metadata (pages,
              regions, items, processes) is stored in tables and the APEX engine renders pages at runtime.
            - **No additional cost**: APEX is a *no-cost* feature of every Oracle Database edition. If you have a database license
              (or use Oracle Database Free / Autonomous Database), you can use APEX.
            - **100% browser-based development**: the *App Builder* is itself an APEX application.
            - **Close to the data**: logic runs where the data lives — no object-relational mapping layer, and complex SQL is a
              first-class citizen.

            ## What you can build
            - Internal systems (data entry, approvals, dashboards, reports).
            - Customer and partner portals with social or corporate sign-in (SAML, OpenID Connect).
            - Replacements for spreadsheets and legacy apps (Oracle Forms, Access).
            - Responsive, installable mobile apps (PWA).
            - Apps with generative AI features (chat assistants, SQL generation, text summarization).

            ## Main building blocks
            | Concept | What it is |
            |---|---|
            | Workspace | Isolated work area linked to one or more database schemas. |
            | Application | A set of pages and shared components, identified by a numeric ID. |
            | Page | An application screen made of regions, items, buttons, processes and dynamic actions. |
            | Region | A content block: report, form, chart, map, cards, etc. |
            | Item | A page field (text, date, list) whose value lives in *session state*. |
            | Dynamic Action | Declarative browser-side behavior (show/hide, refresh, run code). |
            | Process | Server-side logic (PL/SQL, e-mail, REST API, workflow). |

            ## A short history
            APEX started in 1999 as an internal Oracle project (called *Flows*/*Project Marvel*), created by Mike Hichwa and
            Joel Kallman. It shipped commercially as **HTML DB 1.5** in 2004, was renamed **Application Express** in 2006
            (release 2.1) and, since 2018, uses year-based numbering (18.1, 18.2, 19.1...). See the [full timeline](#/versoes).

            :::dica Getting started for free
            Request a free workspace at [apex.oracle.com](https://apex.oracle.com/) (for testing and learning) or use an
            **Always Free Autonomous Database** on Oracle Cloud. You can also install it locally with **Oracle Database Free** + ORDS.
            :::

            ## When APEX is a good fit
            - The data already is (or can be) in Oracle Database.
            - The team knows SQL and PL/SQL.
            - You need to ship fast, securely and with simple maintenance.
            - The app is data-centric: forms, reports, dashboards, approval flows.

            For highly custom UIs (games, graphic editors) APEX still works, but you will write more JavaScript and CSS — it is
            extensible through *plug-ins*, *Template Components* and the JavaScript API.
        `
    }
});

DOC.topico({
    id: 'arquitetura',
    cat: 'fundamentos',
    nivel: 'basico',
    links: [
        { t: 'APEX Installation Guide — Overview', u: 'https://docs.oracle.com/en/database/oracle/apex/' },
        { t: 'Oracle REST Data Services', u: 'https://www.oracle.com/database/technologies/appdev/rest.html' }
    ],
    relacionados: ['o-que-e-apex', 'ciclo-de-vida-da-pagina', 'ords', 'sessao-e-session-state'],
    pt: {
        titulo: 'Arquitetura do APEX',
        resumo: 'Como uma requisição vai do navegador ao banco: ORDS, o motor do APEX, metadados e o schema de parsing.',
        tags: ['arquitetura', 'ORDS', 'metadados', 'motor', 'schema', 'APEX_PUBLIC_USER', 'mod_plsql', 'EPG'],
        conteudo: `
            O APEX tem uma arquitetura simples: **navegador → servidor web (ORDS) → Oracle Database**. Toda a inteligência fica no banco.

            ## Os componentes
            1. **Navegador**: renderiza HTML, CSS e JavaScript gerados pelo APEX (Universal Theme + jQuery + biblioteca «apex.*»).
            2. **ORDS (Oracle REST Data Services)**: aplicação Java que recebe as requisições HTTP, mantém um *pool* de conexões e
               chama os procedimentos PL/SQL do APEX. Também serve os arquivos estáticos (imagens, JS, CSS) e os serviços REST.
            3. **Oracle Database**: contém o motor do APEX (pacotes PL/SQL), os metadados das aplicações e os seus dados.

            :::info Gateways antigos
            Antes do ORDS, o APEX também rodava com o **mod_plsql** (Oracle HTTP Server) e o **Embedded PL/SQL Gateway (EPG)**.
            Ambos foram descontinuados como opção suportada — hoje o ORDS é o caminho oficial.
            :::

            ## O motor é dirigido por metadados
            Quando você cria uma página no App Builder, nada de código é gerado em arquivos. O APEX grava **metadados** (definições
            de páginas, regiões, itens, processos) em tabelas do schema do APEX — por exemplo «APEX_260100» para a versão 26.1.
            Em tempo de execução, o motor lê esses metadados e monta o HTML. Por isso:
            - Publicar uma alteração é instantâneo (não há "build").
            - Exportar uma aplicação gera um script SQL que reinsere os metadados.
            - Você pode consultar a estrutura de qualquer aplicação pelas views «APEX_APPLICATION_*» (dicionário do APEX).

            ## Schemas envolvidos
            | Schema | Papel |
            |---|---|
            | «APEX_xxxxxx» | Dono do motor e dos metadados (um por versão instalada). |
            | «APEX_PUBLIC_USER» | Usuário com que o ORDS se conecta para atender páginas APEX. |
            | «APEX_PUBLIC_ROUTER» | Usado pelo ORDS para rotear as Friendly URLs (versões recentes). |
            | «APEX_REST_PUBLIC_USER» / «APEX_LISTENER» | Usados pelo ORDS para serviços RESTful. |
            | «FLOWS_FILES» | Armazenamento legado de arquivos enviados. |
            | **Schema de parsing** | O schema da sua aplicação: todo SQL e PL/SQL da app executa com os privilégios dele. |

            ## Fluxo de uma requisição
            1. O usuário acessa «/ords/r/meu-workspace/minha-app/home».
            2. O ORDS pega uma conexão do pool (como «APEX_PUBLIC_USER») e chama o motor do APEX.
            3. O APEX identifica a aplicação, valida a sessão e a autenticação, e troca o contexto para o **schema de parsing**.
            4. O motor executa os processos de renderização, as consultas das regiões e gera o HTML.
            5. O ORDS devolve a resposta; a conexão volta ao pool.

            :::dica Stateless no HTTP, stateful no banco
            Cada requisição usa uma conexão qualquer do pool. O "estado" da sessão (valores de itens, collections) é guardado em
            tabelas, associado ao **ID de sessão** do APEX — não à sessão do banco. Por isso variáveis globais de pacote
            PL/SQL **não** persistem entre requisições.
            :::

            ## Escalabilidade
            Como o trabalho pesado é SQL, o APEX escala junto com o banco (RAC, Exadata, Autonomous Database). O ORDS pode ser
            replicado atrás de um balanceador, e os arquivos estáticos podem vir de uma CDN da Oracle.
        `
    },
    en: {
        titulo: 'APEX Architecture',
        resumo: 'How a request travels from the browser to the database: ORDS, the APEX engine, metadata and the parsing schema.',
        tags: ['architecture', 'ORDS', 'metadata', 'engine', 'schema', 'APEX_PUBLIC_USER', 'mod_plsql', 'EPG'],
        conteudo: `
            APEX has a simple architecture: **browser → web listener (ORDS) → Oracle Database**. All the intelligence lives in the database.

            ## The components
            1. **Browser**: renders the HTML, CSS and JavaScript produced by APEX (Universal Theme + jQuery + the «apex.*» library).
            2. **ORDS (Oracle REST Data Services)**: a Java application that receives HTTP requests, keeps a connection *pool* and
               calls APEX PL/SQL procedures. It also serves static files (images, JS, CSS) and REST services.
            3. **Oracle Database**: holds the APEX engine (PL/SQL packages), application metadata and your data.

            :::info Older gateways
            Before ORDS, APEX could also run with **mod_plsql** (Oracle HTTP Server) and the **Embedded PL/SQL Gateway (EPG)**.
            Both are no longer supported options — ORDS is the official path today.
            :::

            ## A metadata-driven engine
            When you build a page in App Builder no code files are generated. APEX stores **metadata** (page, region, item and
            process definitions) in tables of the APEX schema — e.g. «APEX_260100» for release 26.1. At runtime the engine reads
            this metadata and renders HTML. That is why:
            - Publishing a change is instant (there is no "build").
            - Exporting an app produces a SQL script that re-inserts the metadata.
            - You can query the structure of any app through the «APEX_APPLICATION_*» views (the APEX dictionary).

            ## Schemas involved
            | Schema | Role |
            |---|---|
            | «APEX_xxxxxx» | Owns the engine and metadata (one per installed release). |
            | «APEX_PUBLIC_USER» | The user ORDS connects as to serve APEX pages. |
            | «APEX_PUBLIC_ROUTER» | Used by ORDS to route Friendly URLs (recent releases). |
            | «APEX_REST_PUBLIC_USER» / «APEX_LISTENER» | Used by ORDS for RESTful services. |
            | «FLOWS_FILES» | Legacy storage for uploaded files. |
            | **Parsing schema** | Your app's schema: all app SQL and PL/SQL runs with its privileges. |

            ## Request flow
            1. The user opens «/ords/r/my-workspace/my-app/home».
            2. ORDS takes a pooled connection (as «APEX_PUBLIC_USER») and calls the APEX engine.
            3. APEX identifies the app, validates the session and authentication, and switches to the **parsing schema**.
            4. The engine runs the rendering processes and region queries and produces HTML.
            5. ORDS returns the response; the connection goes back to the pool.

            :::dica Stateless over HTTP, stateful in the database
            Each request uses any pooled connection. Session "state" (item values, collections) is stored in tables, keyed by the
            APEX **session ID** — not by the database session. That is why PL/SQL package globals do **not** survive between requests.
            :::

            ## Scalability
            Since the heavy lifting is SQL, APEX scales with the database (RAC, Exadata, Autonomous Database). ORDS can be
            replicated behind a load balancer and static files can be served from Oracle's CDN.
        `
    }
});

DOC.topico({
    id: 'workspaces-e-aplicacoes',
    cat: 'fundamentos',
    nivel: 'basico',
    links: [
        { t: 'App Builder User\'s Guide', u: 'https://docs.oracle.com/en/database/oracle/apex/' },
        { t: 'Administration Guide — Workspaces', u: 'https://docs.oracle.com/en/database/oracle/apex/' }
    ],
    relacionados: ['arquitetura', 'administracao-instancia', 'create-app-wizard', 'componentes-compartilhados'],
    pt: {
        titulo: 'Workspaces, schemas e aplicações',
        resumo: 'Como o APEX organiza o trabalho: workspaces, schemas associados, papéis de usuário e a anatomia de uma aplicação.',
        tags: ['workspace', 'schema', 'desenvolvedor', 'administrador', 'App Builder', 'SQL Workshop', 'usuários'],
        conteudo: `
            ## Workspace
            Um **workspace** é uma área de trabalho virtual e isolada dentro de uma instância APEX. Cada workspace:
            - É associado a **um ou mais schemas** do banco (os dados que as aplicações podem acessar).
            - Tem seus próprios **usuários** (desenvolvedores, administradores e usuários finais).
            - Contém as **aplicações**, arquivos estáticos, credenciais, serviços REST e configurações de equipe.

            Uma mesma instância pode hospedar centenas de workspaces — é assim que o apex.oracle.com atende milhares de pessoas.

            ## Papéis de usuário
            | Papel | O que pode fazer |
            |---|---|
            | Administrador da instância | Gerencia a instância inteira (workspaces, configurações, segurança) pelo *Administration Services*. |
            | Administrador do workspace | Cria usuários, associa schemas, monitora atividade do workspace. |
            | Desenvolvedor | Cria e edita aplicações, usa o SQL Workshop. |
            | Usuário final | Apenas executa aplicações (quando a app usa *Oracle APEX Accounts*). |

            ## As ferramentas do workspace
            - **App Builder**: cria e edita aplicações.
            - **SQL Workshop**: Object Browser, SQL Commands, SQL Scripts, Query Builder, utilitários de dados e **RESTful Services**.
            - **Team Development / Gallery**: recursos colaborativos, apps de exemplo e *starter apps*.
            - **Administração**: usuários, grupos, atividade, Workspace Utilization.

            ## Anatomia de uma aplicação
            - **ID da aplicação** (ex.: 100) e um **alias** amigável usado nas URLs.
            - **Páginas**: cada uma com número, alias, modo (normal ou modal) e componentes.
            - **Página 0 (Global Page)**: componentes exibidos em todas as páginas.
            - **Componentes compartilhados**: autenticação, autorização, LOVs, listas, menus, templates, itens de aplicação,
              processos de aplicação, mensagens de texto, REST Data Sources etc.
            - **Atributos da aplicação**: idioma, formato de data, segurança, disponibilidade, versão.

            :::dica Schema de parsing
            Cada aplicação tem um **parsing schema**. Todo SQL da aplicação executa como esse schema, então conceda a ele apenas
            os privilégios necessários — e prefira acessar tabelas de outros schemas por meio de views ou pacotes.
            :::

            ## Consultando os metadados
            ~~~sql
            -- Aplicações do workspace atual
            select application_id, application_name, alias, pages, last_updated_on
              from apex_applications
             order by application_id;

            -- Páginas e regiões de uma aplicação
            select page_id, page_name, region_name, source_type
              from apex_application_page_regions
             where application_id = 100
             order by page_id, display_sequence;
            ~~~
        `
    },
    en: {
        titulo: 'Workspaces, schemas and applications',
        resumo: 'How APEX organizes work: workspaces, associated schemas, user roles and the anatomy of an application.',
        tags: ['workspace', 'schema', 'developer', 'administrator', 'App Builder', 'SQL Workshop', 'users'],
        conteudo: `
            ## Workspace
            A **workspace** is an isolated virtual work area inside an APEX instance. Each workspace:
            - Is associated with **one or more database schemas** (the data applications can access).
            - Has its own **users** (developers, administrators and end users).
            - Holds **applications**, static files, credentials, REST services and team settings.

            One instance can host hundreds of workspaces — that is how apex.oracle.com serves thousands of people.

            ## User roles
            | Role | What they can do |
            |---|---|
            | Instance administrator | Manages the whole instance (workspaces, settings, security) via *Administration Services*. |
            | Workspace administrator | Creates users, associates schemas, monitors workspace activity. |
            | Developer | Creates and edits applications, uses SQL Workshop. |
            | End user | Only runs applications (when the app uses *Oracle APEX Accounts*). |

            ## Workspace tools
            - **App Builder**: create and edit applications.
            - **SQL Workshop**: Object Browser, SQL Commands, SQL Scripts, Query Builder, data utilities and **RESTful Services**.
            - **Team Development / Gallery**: collaboration features, sample and *starter apps*.
            - **Administration**: users, groups, activity, Workspace Utilization.

            ## Anatomy of an application
            - **Application ID** (e.g. 100) and a friendly **alias** used in URLs.
            - **Pages**: each with a number, alias, mode (normal or modal) and components.
            - **Page 0 (Global Page)**: components rendered on every page.
            - **Shared components**: authentication, authorization, LOVs, lists, menus, templates, application items,
              application processes, text messages, REST Data Sources and more.
            - **Application attributes**: language, date format, security, availability, version.

            :::dica Parsing schema
            Every application has a **parsing schema**. All of the app's SQL runs as that schema, so grant it only the privileges
            it needs — and prefer reaching other schemas' tables through views or packages.
            :::

            ## Querying the metadata
            ~~~sql
            -- Applications in the current workspace
            select application_id, application_name, alias, pages, last_updated_on
              from apex_applications
             order by application_id;

            -- Pages and regions of an application
            select page_id, page_name, region_name, source_type
              from apex_application_page_regions
             where application_id = 100
             order by page_id, display_sequence;
            ~~~
        `
    }
});

DOC.topico({
    id: 'sessao-e-session-state',
    cat: 'fundamentos',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Understanding Session State Management', u: 'https://docs.oracle.com/en/database/oracle/apex/' },
        { t: 'APEX_SESSION (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/' }
    ],
    relacionados: ['substituicoes', 'ciclo-de-vida-da-pagina', 'session-state-protection', 'itens-de-pagina'],
    pt: {
        titulo: 'Sessão e session state',
        resumo: 'Como o APEX guarda valores de itens entre requisições, como ler e gravar esses valores e quando o cache é limpo.',
        tags: ['session state', 'sessão', 'itens', 'V()', 'bind', 'APEX_UTIL.SET_SESSION_STATE', 'clear cache', 'timeout'],
        conteudo: `
            O HTTP não guarda estado, mas aplicações precisam lembrar coisas: o cliente selecionado, o filtro escolhido, o usuário
            logado. O APEX resolve isso com o **session state**: valores de itens gravados no banco e vinculados a um **ID de sessão**.

            ## A sessão do APEX
            - Criada no primeiro acesso (ou após o login) e identificada por um número, visível na URL («session=12345...»).
            - Independe da sessão do banco: cada requisição pode usar uma conexão diferente do pool do ORDS.
            - Expira por **tempo máximo** ou **inatividade**, configuráveis em *Shared Components → Security Attributes*.
            - Guarda: valores de **itens de página** e **itens de aplicação**, **collections** e preferências.

            ## Como o valor chega ao session state
            - **Submit da página**: os itens são enviados e gravados antes dos processos *After Submit*.
            - **Computações e processos** que atribuem valores.
            - **Dynamic Actions** com "Items to Submit" ou a ação *Set Value*.
            - **URL**: parâmetros de item na URL (protegidos por checksum quando a *Session State Protection* está ativa).
            - **APIs**: «APEX_UTIL.SET_SESSION_STATE» no servidor ou «apex.item('P1_X').setValue()» no navegador
              (este último só altera o navegador até o próximo envio).

            ## Lendo valores
            | Onde | Sintaxe |
            |---|---|
            | SQL e PL/SQL | Bind variable «:P1_CLIENTE_ID» (preferível) |
            | PL/SQL dinâmico / views | «V('P1_CLIENTE_ID')», «NV('P1_NUMERO')» |
            | HTML e atributos estáticos | Substituição «&P1_CLIENTE_ID.» |
            | JavaScript | «apex.item('P1_CLIENTE_ID').getValue()» ou «$v('P1_CLIENTE_ID')» |

            ~~~plsql
            -- Gravando e lendo no servidor
            begin
                apex_util.set_session_state('P1_STATUS', 'APROVADO');
                if :P1_STATUS = 'APROVADO' then
                    apex_debug.info('Status: %s', v('P1_STATUS'));
                end if;
            end;
            ~~~

            :::atencao Erro clássico: "o item está vazio no processo"
            Se um processo AJAX ou uma Dynamic Action do tipo *Execute Server-side Code* lê «:P1_X» e o valor vem nulo,
            normalmente o item **não foi enviado**. Preencha o atributo **Items to Submit** com os itens que o código precisa
            e **Items to Return** com os que o código altera.
            :::

            ## Limpando o cache
            - Pela URL (argumento *ClearCache*, ex.: «RP», «APP» ou números de página).
            - Processo do tipo *Clear Session State* ou «APEX_UTIL.CLEAR_PAGE_CACHE».
            - Atributo do botão/branch "Clear Cache" ao navegar para outra página.

            ## Persistência por usuário
            Itens podem ter **Storage = Persistent (User)**, mantendo o valor entre sessões do mesmo usuário — útil para
            preferências (ex.: filial padrão).
        `
    },
    en: {
        titulo: 'Sessions and session state',
        resumo: 'How APEX keeps item values across requests, how to read and write them and when the cache is cleared.',
        tags: ['session state', 'session', 'items', 'V()', 'bind', 'APEX_UTIL.SET_SESSION_STATE', 'clear cache', 'timeout'],
        conteudo: `
            HTTP is stateless, but applications need to remember things: the selected customer, the chosen filter, the logged-in
            user. APEX solves this with **session state**: item values stored in the database and tied to a **session ID**.

            ## The APEX session
            - Created on first access (or after login) and identified by a number visible in the URL («session=12345...»).
            - Independent of the database session: each request may use a different pooled ORDS connection.
            - Expires by **maximum length** or **idle time**, configurable under *Shared Components → Security Attributes*.
            - Stores: **page item** and **application item** values, **collections** and preferences.

            ## How values get into session state
            - **Page submit**: items are posted and saved before *After Submit* processes run.
            - **Computations and processes** that assign values.
            - **Dynamic Actions** with "Items to Submit" or the *Set Value* action.
            - **URL**: item parameters in the URL (checksum-protected when *Session State Protection* is on).
            - **APIs**: «APEX_UTIL.SET_SESSION_STATE» on the server or «apex.item('P1_X').setValue()» in the browser
              (the latter only changes the browser until the next submit).

            ## Reading values
            | Where | Syntax |
            |---|---|
            | SQL and PL/SQL | Bind variable «:P1_CUSTOMER_ID» (preferred) |
            | Dynamic PL/SQL / views | «V('P1_CUSTOMER_ID')», «NV('P1_NUMBER')» |
            | HTML and static attributes | Substitution «&P1_CUSTOMER_ID.» |
            | JavaScript | «apex.item('P1_CUSTOMER_ID').getValue()» or «$v('P1_CUSTOMER_ID')» |

            ~~~plsql
            -- Writing and reading on the server
            begin
                apex_util.set_session_state('P1_STATUS', 'APPROVED');
                if :P1_STATUS = 'APPROVED' then
                    apex_debug.info('Status: %s', v('P1_STATUS'));
                end if;
            end;
            ~~~

            :::atencao Classic mistake: "the item is empty in my process"
            If an AJAX process or an *Execute Server-side Code* dynamic action reads «:P1_X» and gets null, the item was most
            likely **not submitted**. Fill in **Items to Submit** with the items the code needs and **Items to Return** with
            those it changes.
            :::

            ## Clearing the cache
            - Through the URL (*ClearCache* argument, e.g. «RP», «APP» or page numbers).
            - A *Clear Session State* process or «APEX_UTIL.CLEAR_PAGE_CACHE».
            - The "Clear Cache" attribute of buttons/branches when navigating to another page.

            ## Per-user persistence
            Items can use **Storage = Persistent (User)**, keeping the value across sessions of the same user — handy for
            preferences (e.g. default branch).
        `
    }
});

DOC.topico({
    id: 'ciclo-de-vida-da-pagina',
    cat: 'fundamentos',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Understanding Page Processing and Page Rendering', u: 'https://docs.oracle.com/en/database/oracle/apex/' }
    ],
    relacionados: ['sessao-e-session-state', 'processos-computacoes-validacoes', 'page-designer', 'dynamic-actions'],
    pt: {
        titulo: 'Ciclo de vida da página: renderização e processamento',
        resumo: 'A ordem exata em que o APEX executa computações, validações, processos e branches ao exibir e ao enviar uma página.',
        tags: ['page rendering', 'page processing', 'submit', 'branch', 'after submit', 'before header', 'ordem de execução'],
        conteudo: `
            Toda página APEX tem dois momentos: **renderização** (montar e exibir — historicamente chamado *Show*) e
            **processamento** (receber o submit — *Accept*). Entender a ordem dos pontos de execução evita muitos bugs.

            ## Renderização (Page Rendering)
            1. **Before Header** — computações e processos antes de qualquer HTML. Ideal para carregar dados (ex.: *Form - Initialization*)
               ou redirecionar.
            2. **After Header** — após o cabeçalho HTML ser gerado.
            3. **Before Regions** — logo antes das regiões.
            4. **Regiões e itens** são renderizados (consultas SQL das regiões executam aqui).
            5. **After Regions**.
            6. **Before Footer** / **After Footer**.

            ## Processamento (Page Processing)
            Ao clicar em um botão com ação *Submit Page*:
            1. Os valores dos itens são gravados no **session state**.
            2. **Computações** *After Submit*.
            3. **Validações** — se alguma falhar, o processamento para e a página é exibida novamente com os erros.
            4. **Processos** *Processing* (na ordem de sequência), respeitando condições como "When Button Pressed".
            5. **Branches** — decidem para onde ir (outra página, URL ou a mesma página).

            :::dica REQUEST
            O nome do botão clicado vira o valor de «REQUEST». Use condições como *Request = Expression 1* ou
            «:REQUEST in ('SAVE','CREATE')» para executar processos apenas para certos botões.
            :::

            ## Requisições AJAX
            Nem tudo exige submit. Regiões são atualizadas por AJAX (*Refresh*), Dynamic Actions executam código no servidor e
            processos podem ser chamados com «apex.server.process». Nessas chamadas apenas os processos **Ajax Callback**
            (ou o código da DA) executam — o ciclo de submit acima não roda.

            ## Erros comuns
            - Colocar lógica de carga em *After Submit*: ela não roda na primeira exibição.
            - Esquecer que validações rodam **antes** dos processos — um processo que "preenche" um valor não ajuda a validação.
            - Branch sem condição antes de outro branch condicional: o primeiro que casar vence.

            ~~~plsql
            -- Processo "Before Header" que redireciona usuários sem permissão
            begin
                if not apex_authorization.is_authorized('ADMIN') then
                    apex_util.redirect_url(apex_page.get_url(p_page => 1));
                end if;
            end;
            ~~~
        `
    },
    en: {
        titulo: 'Page lifecycle: rendering and processing',
        resumo: 'The exact order in which APEX runs computations, validations, processes and branches when showing and submitting a page.',
        tags: ['page rendering', 'page processing', 'submit', 'branch', 'after submit', 'before header', 'execution order'],
        conteudo: `
            Every APEX page has two moments: **rendering** (build and display — historically called *Show*) and **processing**
            (receive the submit — *Accept*). Knowing the order of execution points prevents many bugs.

            ## Page Rendering
            1. **Before Header** — computations and processes before any HTML. Ideal for loading data (e.g. *Form - Initialization*)
               or redirecting.
            2. **After Header** — after the HTML header is emitted.
            3. **Before Regions** — just before the regions.
            4. **Regions and items** are rendered (region SQL queries run here).
            5. **After Regions**.
            6. **Before Footer** / **After Footer**.

            ## Page Processing
            When a button with the *Submit Page* action is clicked:
            1. Item values are saved to **session state**.
            2. *After Submit* **computations**.
            3. **Validations** — if any fails, processing stops and the page is shown again with the errors.
            4. *Processing* **processes** (in sequence order), honoring conditions such as "When Button Pressed".
            5. **Branches** — decide where to go (another page, a URL or the same page).

            :::dica REQUEST
            The name of the clicked button becomes the value of «REQUEST». Use conditions like *Request = Expression 1* or
            «:REQUEST in ('SAVE','CREATE')» to run processes only for certain buttons.
            :::

            ## AJAX requests
            Not everything needs a submit. Regions refresh via AJAX (*Refresh*), dynamic actions run server code and processes can
            be called with «apex.server.process». In those calls only **Ajax Callback** processes (or the DA code) run — the
            submit cycle above does not.

            ## Common mistakes
            - Putting loading logic in *After Submit*: it does not run on first display.
            - Forgetting validations run **before** processes — a process that "fills in" a value will not help validation.
            - An unconditional branch placed before a conditional one: the first match wins.

            ~~~plsql
            -- "Before Header" process that redirects unauthorized users
            begin
                if not apex_authorization.is_authorized('ADMIN') then
                    apex_util.redirect_url(apex_page.get_url(p_page => 1));
                end if;
            end;
            ~~~
        `
    }
});

DOC.topico({
    id: 'urls-do-apex',
    cat: 'fundamentos',
    nivel: 'intermediario',
    desde: '20.1',
    links: [
        { t: 'App Builder Guide — Understanding URL Syntax', u: 'https://docs.oracle.com/en/database/oracle/apex/' },
        { t: 'APEX_PAGE.GET_URL', u: 'https://docs.oracle.com/en/database/oracle/apex/' }
    ],
    relacionados: ['sessao-e-session-state', 'session-state-protection', 'navegacao'],
    pt: {
        titulo: 'URLs do APEX: f?p e Friendly URLs',
        resumo: 'Entenda a sintaxe clássica f?p, as Friendly URLs (20.1+) e como gerar links corretamente com APEX_PAGE.GET_URL.',
        tags: ['URL', 'f?p', 'friendly URL', 'link', 'APEX_PAGE.GET_URL', 'apex_util.prepare_url', 'checksum', 'alias'],
        conteudo: `
            ## A sintaxe clássica «f?p»
            Durante quase duas décadas as URLs do APEX seguiram este formato, com argumentos separados por dois-pontos:

            ~~~texto
            f?p=App:Page:Session:Request:Debug:ClearCache:itemNames:itemValues:PrinterFriendly
            ~~~

            | Posição | Significado | Exemplo |
            |---|---|---|
            | App | ID ou alias da aplicação | «100» ou «VENDAS» |
            | Page | Número ou alias da página | «10» |
            | Session | ID da sessão | «&APP_SESSION.» |
            | Request | Valor de «REQUEST» | «EDITAR» |
            | Debug | «YES», «NO» ou nível (ex.: «LEVEL9») | «NO» |
            | ClearCache | Páginas/itens a limpar («RP», «APP», números) | «10» |
            | itemNames | Itens separados por vírgula | «P10_ID» |
            | itemValues | Valores na mesma ordem | «42» |

            ## Friendly URLs (APEX 20.1+)
            Aplicações novas usam **Friendly URLs** por padrão, com caminho legível baseado no workspace, no alias da app e da página:

            ~~~texto
            /ords/r/meu-workspace/vendas/pedido?p10_id=42&session=1234567890
            ~~~

            - Ative/desative em *Shared Components → Application Definition → Properties → Friendly URLs*.
            - Os aliases ficam mais importantes: defina-os com cuidado.

            ## Gere links por API, nunca "na mão"
            Montar URLs concatenando strings quebra quando o formato muda e ignora o **checksum** exigido pela
            *Session State Protection*. Use:

            ~~~plsql
            select apex_page.get_url(
                       p_page   => 10,
                       p_items  => 'P10_ID',
                       p_values => pedido_id ) as link_editar,
                   numero, cliente
              from pedidos;
            ~~~

            Em atributos declarativos (links de colunas, botões, branches), use o tipo de destino **Page in this application** — o
            APEX gera a URL e o checksum automaticamente.

            :::atencao Checksum
            Se aparecer o erro *"Session state protection violation"* ou *"checksum"*, provavelmente alguém editou a URL ou ela foi
            montada manualmente sem «APEX_PAGE.GET_URL» / «APEX_UTIL.PREPARE_URL».
            :::
        `
    },
    en: {
        titulo: 'APEX URLs: f?p and Friendly URLs',
        resumo: 'Understand the classic f?p syntax, Friendly URLs (20.1+) and how to generate links properly with APEX_PAGE.GET_URL.',
        tags: ['URL', 'f?p', 'friendly URL', 'link', 'APEX_PAGE.GET_URL', 'apex_util.prepare_url', 'checksum', 'alias'],
        conteudo: `
            ## The classic «f?p» syntax
            For almost two decades APEX URLs followed this format, with colon-separated arguments:

            ~~~texto
            f?p=App:Page:Session:Request:Debug:ClearCache:itemNames:itemValues:PrinterFriendly
            ~~~

            | Position | Meaning | Example |
            |---|---|---|
            | App | Application ID or alias | «100» or «SALES» |
            | Page | Page number or alias | «10» |
            | Session | Session ID | «&APP_SESSION.» |
            | Request | «REQUEST» value | «EDIT» |
            | Debug | «YES», «NO» or a level (e.g. «LEVEL9») | «NO» |
            | ClearCache | Pages/items to clear («RP», «APP», numbers) | «10» |
            | itemNames | Comma-separated items | «P10_ID» |
            | itemValues | Values in the same order | «42» |

            ## Friendly URLs (APEX 20.1+)
            New applications use **Friendly URLs** by default, with a readable path based on the workspace, app alias and page alias:

            ~~~texto
            /ords/r/my-workspace/sales/order?p10_id=42&session=1234567890
            ~~~

            - Toggle it under *Shared Components → Application Definition → Properties → Friendly URLs*.
            - Aliases become more important: choose them carefully.

            ## Generate links with the API, never by hand
            Concatenating URL strings breaks when the format changes and skips the **checksum** required by
            *Session State Protection*. Use:

            ~~~plsql
            select apex_page.get_url(
                       p_page   => 10,
                       p_items  => 'P10_ID',
                       p_values => order_id ) as edit_link,
                   order_no, customer
              from orders;
            ~~~

            In declarative attributes (column links, buttons, branches) use the **Page in this application** target type —
            APEX builds the URL and checksum for you.

            :::atencao Checksum
            If you see *"Session state protection violation"* or a *checksum* error, someone probably edited the URL or it was
            built by hand without «APEX_PAGE.GET_URL» / «APEX_UTIL.PREPARE_URL».
            :::
        `
    }
});

DOC.topico({
    id: 'substituicoes',
    cat: 'fundamentos',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Using Substitution Strings', u: 'https://docs.oracle.com/en/database/oracle/apex/' },
        { t: 'App Builder Guide — Built-in Substitution Strings', u: 'https://docs.oracle.com/en/database/oracle/apex/' }
    ],
    relacionados: ['sessao-e-session-state', 'escaping-e-xss', 'template-directives'],
    pt: {
        titulo: 'Substitution strings e formas de referenciar valores',
        resumo: '&ITEM., :ITEM, V(), #COLUNA# e os filtros de escape: quando usar cada sintaxe e a lista das substituições embutidas.',
        tags: ['substitution string', '&ITEM.', 'bind variable', '#COLUMN#', 'APP_USER', 'APP_ID', 'APP_SESSION', 'escape', '!HTML', '!RAW'],
        conteudo: `
            O APEX oferece várias formas de referenciar um valor. Usar a sintaxe certa no lugar certo é questão de
            **funcionamento** e de **segurança**.

            ## Quatro sintaxes
            | Sintaxe | Onde usar | Observação |
            |---|---|---|
            | «:P1_ITEM» | SQL e PL/SQL | **Bind variable**: segura e boa para performance. |
            | «V('P1_ITEM')» / «NV('P1_ITEM')» | PL/SQL em pacotes, views | Função que lê o session state. |
            | «&P1_ITEM.» | HTML, textos, atributos estáticos | Substituição textual (note o ponto final). |
            | «#COLUNA#» | Classic Report e Interactive Report | Valor da coluna na linha atual. |
            | «&COLUNA.» | Interactive Grid, Cards, Map, Template Components | Valor da coluna na linha atual. |

            :::atencao Nunca use &ITEM. dentro de SQL
            «where id = &P1_ID.» concatena o texto antes de executar — abre brecha para **SQL injection** e destrói o
            reaproveitamento de cursores. Use sempre «:P1_ID».
            :::

            ## Substituições embutidas mais usadas
            | Nome | Valor |
            |---|---|
            | «APP_ID» | ID da aplicação |
            | «APP_ALIAS» | Alias da aplicação |
            | «APP_PAGE_ID» | Página atual |
            | «APP_SESSION» | ID da sessão |
            | «APP_USER» | Usuário autenticado (ou «nobody») |
            | «REQUEST» | Valor da requisição (botão clicado) |
            | «DEBUG» | «YES» ou «NO» |
            | «APP_FILES» | Arquivos estáticos da aplicação (nome antigo: «APP_IMAGES») |
            | «WORKSPACE_FILES» | Arquivos estáticos do workspace (antigo: «WORKSPACE_IMAGES») |
            | «APEX_FILES» | Arquivos do próprio APEX (antigo: «IMAGE_PREFIX», o famoso «/i/») |
            | «THEME_FILES» | Arquivos do tema (antigo: «THEME_IMAGES») |
            | «APP_PAGE_ALIAS», «WORKSPACE_ID» | Alias da página e ID do workspace |
            | «APP_DATE_TIME_FORMAT», «APP_NLS_DATE_FORMAT» | Formatos de data configurados |
            | «BROWSER_LANGUAGE», «APP_TEXT$NOME» | Idioma e mensagens de texto |

            ## Filtros de escape
            Ao usar «&ITEM.» em HTML, você pode controlar o escape acrescentando um filtro:

            | Sintaxe | Efeito |
            |---|---|
            | «&P1_NOME!HTML.» | Escapa para conteúdo HTML |
            | «&P1_NOME!ATTR.» | Escapa para valor de atributo HTML |
            | «&P1_NOME!JS.» | Escapa para string JavaScript |
            | «&P1_NOME!RAW.» | Sem escape (use apenas com conteúdo confiável) |
            | «&P1_NOME!STRIPHTML.» | Remove as tags HTML |

            ~~~html
            <a href="#" title="&P1_NOME!ATTR.">Olá, &APP_USER!HTML.</a>
            <script>
              var nome = "&P1_NOME!JS.";
            </script>
            ~~~

            ## Exemplo em coluna de relatório
            Em *HTML Expression* de uma coluna:

            ~~~html
            <span class="u-badge #STATUS_CSS#">#STATUS#</span>
            ~~~

            Colunas e templates também aceitam **Template Directives** («{if/}», «{case/}», «{loop/}»), que reduzem a
            necessidade de HTML montado no SQL.

            :::novo Mensagens de texto (24.2+)
            Em aplicações com *Compatibility Mode* 24.2 ou superior, mensagens de texto traduzíveis podem ser referenciadas com
            «&{MSG.NOME_DA_MENSAGEM}.», inclusive com parâmetros nomeados. A antiga forma «&APP_TEXT$NOME.» passa a ser legado.
            :::
        `
    },
    en: {
        titulo: 'Substitution strings and ways to reference values',
        resumo: '&ITEM., :ITEM, V(), #COLUMN# and escape filters: when to use each syntax and the list of built-in substitutions.',
        tags: ['substitution string', '&ITEM.', 'bind variable', '#COLUMN#', 'APP_USER', 'APP_ID', 'APP_SESSION', 'escape', '!HTML', '!RAW'],
        conteudo: `
            APEX offers several ways to reference a value. Using the right syntax in the right place is a matter of both
            **correctness** and **security**.

            ## Four syntaxes
            | Syntax | Where | Note |
            |---|---|---|
            | «:P1_ITEM» | SQL and PL/SQL | **Bind variable**: safe and good for performance. |
            | «V('P1_ITEM')» / «NV('P1_ITEM')» | PL/SQL in packages, views | Function that reads session state. |
            | «&P1_ITEM.» | HTML, text, static attributes | Textual substitution (note the trailing dot). |
            | «#COLUMN#» | Classic Report and Interactive Report | Column value for the current row. |
            | «&COLUMN.» | Interactive Grid, Cards, Map, Template Components | Column value for the current row. |

            :::atencao Never use &ITEM. inside SQL
            «where id = &P1_ID.» concatenates text before execution — it opens the door to **SQL injection** and kills cursor
            sharing. Always use «:P1_ID».
            :::

            ## Most used built-in substitutions
            | Name | Value |
            |---|---|
            | «APP_ID» | Application ID |
            | «APP_ALIAS» | Application alias |
            | «APP_PAGE_ID» | Current page |
            | «APP_SESSION» | Session ID |
            | «APP_USER» | Authenticated user (or «nobody») |
            | «REQUEST» | Request value (clicked button) |
            | «DEBUG» | «YES» or «NO» |
            | «APP_FILES» | Application static files (old name: «APP_IMAGES») |
            | «WORKSPACE_FILES» | Workspace static files (old: «WORKSPACE_IMAGES») |
            | «APEX_FILES» | APEX's own files (old: «IMAGE_PREFIX», the famous «/i/») |
            | «THEME_FILES» | Theme files (old: «THEME_IMAGES») |
            | «APP_PAGE_ALIAS», «WORKSPACE_ID» | Page alias and workspace ID |
            | «APP_DATE_TIME_FORMAT», «APP_NLS_DATE_FORMAT» | Configured date formats |
            | «BROWSER_LANGUAGE», «APP_TEXT$NAME» | Language and text messages |

            ## Escape filters
            When using «&ITEM.» in HTML you can control escaping by appending a filter:

            | Syntax | Effect |
            |---|---|
            | «&P1_NAME!HTML.» | Escapes for HTML content |
            | «&P1_NAME!ATTR.» | Escapes for an HTML attribute value |
            | «&P1_NAME!JS.» | Escapes for a JavaScript string |
            | «&P1_NAME!RAW.» | No escaping (trusted content only) |
            | «&P1_NAME!STRIPHTML.» | Strips HTML tags |

            ~~~html
            <a href="#" title="&P1_NAME!ATTR.">Hello, &APP_USER!HTML.</a>
            <script>
              var name = "&P1_NAME!JS.";
            </script>
            ~~~

            ## Report column example
            In a column's *HTML Expression*:

            ~~~html
            <span class="u-badge #STATUS_CSS#">#STATUS#</span>
            ~~~

            Columns and templates also support **Template Directives** («{if/}», «{case/}», «{loop/}»), reducing the need
            to build HTML inside SQL.

            :::novo Text messages (24.2+)
            In applications with *Compatibility Mode* 24.2 or later, translatable text messages can be referenced with
            «&{MSG.MESSAGE_NAME}.», including named parameters. The old «&APP_TEXT$NAME.» form becomes legacy.
            :::
        `
    }
});
