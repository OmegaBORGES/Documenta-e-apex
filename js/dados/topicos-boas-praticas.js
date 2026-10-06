DOC.topico({
    id: 'organizacao-do-codigo',
    cat: 'boas-praticas',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Using the Embedded Code Utility', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-the-embedded-code-utility.html' },
        { t: 'App Builder Guide — Viewing Database Object Dependencies', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/viewing-database-object-dependencies.html' }
    ],
    relacionados: ['convencoes-de-nomenclatura', 'js-e-css-na-pagina', 'tratamento-de-erros', 'reutilizacao-e-subscriptions', 'controle-de-versao'],
    pt: {
        titulo: 'Organização do código: lógica em pacotes PL/SQL',
        resumo: 'Por que e como tirar a lógica das páginas e levá-la para pacotes PL/SQL, separando camadas para ter apps fáceis de testar, versionar e manter.',
        tags: ['boas práticas', 'pacotes', 'PL/SQL', 'camadas', 'arquitetura', 'Embedded Code', 'dependências', 'manutenção', 'testes', 'utPLSQL', 'commit'],
        conteudo: `
            O APEX facilita escrever SQL e PL/SQL direto nas páginas: em processos, validações, computações, fontes de região e
            condições. Isso é ótimo para protótipos — e vira um problema quando a aplicação cresce. Código espalhado por dezenas
            de páginas é difícil de encontrar, testar e reaproveitar. A recomendação mais repetida pela comunidade é simples:
            **mantenha a camada APEX fina e coloque a lógica em pacotes PL/SQL**.

            ## Por que pacotes
            - **Compilação e dependências**: o banco valida o código ao compilar e invalida o pacote se uma tabela mudar; código
              embutido no APEX só falha quando a página roda.
            - **Reuso**: a mesma regra atende a página, um job, uma API REST no ORDS e uma Automation.
            - **Testes**: procedures com parâmetros podem ser testadas fora do navegador (por exemplo, com utPLSQL).
            - **Controle de versão**: arquivos «.pks» e «.pkb» vão para o Git com histórico e diffs legíveis.
            - **Performance e segurança**: código compilado, bind variables naturais e privilégios bem definidos.

            ## Camadas sugeridas
            | Camada | Conteúdo | Exemplo |
            |---|---|---|
            | Dados | Tabelas, constraints, views e triggers simples (auditoria, IDs) | «PEDIDOS», «V_PEDIDOS_ABERTOS» |
            | Regras de negócio | Pacotes por domínio, sem dependência do APEX | «PEDIDOS_API.APROVAR» |
            | Apoio à interface | Pacotes que conhecem a aplicação e usam «APEX_*» | «VENDAS_PEDIDOS_UI.CARREGAR» |
            | APEX | Componentes declarativos que chamam as camadas acima | Processo "Aprovar pedido" |

            ## Na prática
            ~~~plsql
            create or replace package pedidos_api authid definer as
                procedure aprovar (
                    p_pedido_id in pedidos.id%type,
                    p_usuario   in varchar2 );
            end pedidos_api;
            /
            create or replace package body pedidos_api as
                procedure aprovar (
                    p_pedido_id in pedidos.id%type,
                    p_usuario   in varchar2 )
                is
                begin
                    update pedidos
                       set status       = 'APROVADO',
                           aprovado_por = p_usuario,
                           aprovado_em  = systimestamp
                     where id     = p_pedido_id
                       and status = 'PENDENTE';

                    if sql%rowcount = 0 then
                        raise_application_error( -20001, 'Pedido inexistente ou já processado.' );
                    end if;
                end aprovar;
            end pedidos_api;
            /
            ~~~

            O processo da página fica com uma única chamada:

            ~~~plsql
            pedidos_api.aprovar(
                p_pedido_id => :P10_ID,
                p_usuario   => :APP_USER );
            ~~~

            :::dica Passe valores por parâmetro
            Nos pacotes de regra, evite ler o session state com «V('P10_ID')»: receba os valores como parâmetros. O pacote fica
            independente da página, testável e reaproveitável. Deixe «V()» e «APEX_SESSION_STATE» para a camada de apoio à
            interface, quando fizer sentido.
            :::

            :::atencao Cuidado com COMMIT
            O APEX faz commit ao final de cada requisição processada com sucesso. Um «COMMIT» dentro de um pacote chamado por um
            processo quebra a atomicidade: se algo falhar depois, o que já foi gravado não é desfeito. Exceções conscientes são
            rotinas de log com «PRAGMA AUTONOMOUS_TRANSACTION».
            :::

            ## E o resto?
            - **JavaScript e CSS**: em arquivos estáticos, com funções nomeadas em um namespace, chamadas pelas Dynamic Actions —
              veja [Onde colocar JavaScript e CSS](#/topico/js-e-css-na-pagina).
            - **Consultas de relatório complexas**: views no banco; a região fica com um «select ... from v_...» simples.
            - **Repetição entre páginas**: Global Page (página 0), processos e computações de aplicação, Template Components e
              [subscriptions](#/topico/reutilizacao-e-subscriptions).
            - **Erros**: deixe a regra levantar exceções com mensagens claras e trate a apresentação na
              [Error Handling Function](#/topico/tratamento-de-erros).

            ## Ferramentas para auditar
            | Ferramenta | Onde | Para quê |
            |---|---|---|
            | Embedded Code | *Utilities → Embedded Code* | Lista o SQL, PL/SQL e JavaScript embutido na aplicação — ótimo para achar o que migrar para pacotes. |
            | Database Object Dependencies (24.2) | *Utilities* | Relatório das tabelas, views e pacotes usados por página e aplicação. |
            | «APEX_APP_OBJECT_DEPENDENCY» (24.1) | API PL/SQL | A mesma análise de dependências por código. |
            | APEXlang (26.1) | Export em arquivos «.apx» | A aplicação em texto legível, pronta para revisão e diff. |

            :::novo 26.1
            Com o **APEXlang**, a aplicação inteira pode ser exportada como arquivos de texto legíveis, o que facilita revisar o
            código embutido, comparar versões e até usar ferramentas de IA para analisar a aplicação. Veja [APEXlang](#/topico/apexlang).
            :::
        `
    },
    en: {
        titulo: 'Code organization: logic in PL/SQL packages',
        resumo: 'Why and how to move logic out of pages into PL/SQL packages, separating layers so apps are easy to test, version and maintain.',
        tags: ['best practices', 'packages', 'PL/SQL', 'layers', 'architecture', 'Embedded Code', 'dependencies', 'maintenance', 'testing', 'utPLSQL', 'commit'],
        conteudo: `
            APEX makes it easy to write SQL and PL/SQL right inside pages: in processes, validations, computations, region sources
            and conditions. That is great for prototypes — and becomes a problem as the application grows. Code scattered across
            dozens of pages is hard to find, test and reuse. The community's most repeated advice is simple: **keep the APEX
            layer thin and put the logic in PL/SQL packages**.

            ## Why packages
            - **Compilation and dependencies**: the database validates code at compile time and invalidates the package if a table
              changes; code embedded in APEX only fails when the page runs.
            - **Reuse**: the same rule serves the page, a job, a REST API on ORDS and an Automation.
            - **Testing**: procedures with parameters can be tested outside the browser (for example with utPLSQL).
            - **Version control**: «.pks» and «.pkb» files go into Git with history and readable diffs.
            - **Performance and security**: compiled code, natural bind variables and well-defined privileges.

            ## Suggested layers
            | Layer | Content | Example |
            |---|---|---|
            | Data | Tables, constraints, views and simple triggers (auditing, IDs) | «ORDERS», «V_OPEN_ORDERS» |
            | Business rules | Domain packages with no APEX dependency | «ORDERS_API.APPROVE» |
            | UI support | Packages that know the application and use «APEX_*» | «SALES_ORDERS_UI.LOAD» |
            | APEX | Declarative components calling the layers above | "Approve order" process |

            ## In practice
            ~~~plsql
            create or replace package orders_api authid definer as
                procedure approve (
                    p_order_id in orders.id%type,
                    p_user     in varchar2 );
            end orders_api;
            /
            create or replace package body orders_api as
                procedure approve (
                    p_order_id in orders.id%type,
                    p_user     in varchar2 )
                is
                begin
                    update orders
                       set status      = 'APPROVED',
                           approved_by = p_user,
                           approved_on = systimestamp
                     where id     = p_order_id
                       and status = 'PENDING';

                    if sql%rowcount = 0 then
                        raise_application_error( -20001, 'Order not found or already processed.' );
                    end if;
                end approve;
            end orders_api;
            /
            ~~~

            The page process becomes a single call:

            ~~~plsql
            orders_api.approve(
                p_order_id => :P10_ID,
                p_user     => :APP_USER );
            ~~~

            :::dica Pass values as parameters
            In business-rule packages, avoid reading session state with «V('P10_ID')»: receive values as parameters. The package
            becomes page-independent, testable and reusable. Leave «V()» and «APEX_SESSION_STATE» to the UI-support layer, where
            it makes sense.
            :::

            :::atencao Careful with COMMIT
            APEX commits at the end of every successfully processed request. A «COMMIT» inside a package called by a process breaks
            atomicity: if something fails afterwards, what was already written is not undone. Deliberate exceptions are logging
            routines using «PRAGMA AUTONOMOUS_TRANSACTION».
            :::

            ## What about the rest?
            - **JavaScript and CSS**: in static files, with named functions in a namespace, called from Dynamic Actions — see
              [Where to put JavaScript and CSS](#/topico/js-e-css-na-pagina).
            - **Complex report queries**: database views; the region keeps a simple «select ... from v_...».
            - **Repetition across pages**: Global Page (page 0), application processes and computations, Template Components and
              [subscriptions](#/topico/reutilizacao-e-subscriptions).
            - **Errors**: let rules raise exceptions with clear messages and handle presentation in the
              [Error Handling Function](#/topico/tratamento-de-erros).

            ## Tools to audit
            | Tool | Where | Purpose |
            |---|---|---|
            | Embedded Code | *Utilities → Embedded Code* | Lists the SQL, PL/SQL and JavaScript embedded in the app — great to find what should move to packages. |
            | Database Object Dependencies (24.2) | *Utilities* | Report of tables, views and packages used per page and application. |
            | «APEX_APP_OBJECT_DEPENDENCY» (24.1) | PL/SQL API | The same dependency analysis from code. |
            | APEXlang (26.1) | Export as «.apx» files | The application as readable text, ready for review and diff. |

            :::novo 26.1
            With **APEXlang**, the whole application can be exported as readable text files, which makes it easier to review
            embedded code, compare versions and even use AI tools to analyze the application. See [APEXlang](#/topico/apexlang).
            :::
        `
    }
});

DOC.topico({
    id: 'convencoes-de-nomenclatura',
    cat: 'boas-praticas',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Editing Page Items', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/editing-page-items.html' },
        { t: 'Release Notes 26.1 — Changed Behavior (Static ID e HTML DOM ID)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmrn/changed-behavior.html' }
    ],
    relacionados: ['organizacao-do-codigo', 'sessao-e-session-state', 'dicionario-apex', 'apexlang', 'itens-de-pagina'],
    pt: {
        titulo: 'Convenções de nomenclatura',
        resumo: 'Padrões de nomes para itens, páginas, componentes, objetos de banco, JavaScript e CSS que deixam a aplicação previsível e fácil de manter.',
        tags: ['nomenclatura', 'naming conventions', 'padrões', 'P1_', 'itens de aplicação', 'Static ID', 'HTML DOM ID', 'alias', 'prefixos', 'namespace'],
        conteudo: `
            O APEX quase não impõe padrões de nomes — e é exatamente por isso que você precisa de um. Nomes consistentes tornam a
            aplicação **previsível**: qualquer pessoa do time sabe onde procurar, buscas no código funcionam e exports (inclusive
            APEXlang) ficam legíveis. Não existe um padrão oficial único; o importante é **combinar com o time, documentar e
            seguir**. Abaixo, convenções amplamente usadas.

            ## Componentes do APEX
            | Elemento | Convenção sugerida | Exemplo |
            |---|---|---|
            | Item de página | «P<página>_<NOME>», o padrão gerado pelo APEX | «P10_CLIENTE_ID» |
            | Item de aplicação | Prefixo próprio, nunca «P<número>_» | «G_EMPRESA_ID», «AI_PERFIL» |
            | Alias de página | Minúsculas com hífen (aparece na Friendly URL) | «pedido-detalhe» |
            | Botão | Maiúsculas, descrevendo a ação (o nome vira o «REQUEST») | «SALVAR», «APROVAR» |
            | HTML DOM ID de região | Minúsculas com sublinhado, descritivo | «pedidos_report», «filtros_drawer» |
            | Dynamic Action | Frase com a intenção | "Recalcular total ao mudar quantidade" |
            | Processo, validação | Verbo + objeto | "Aprovar pedido", "Validar data de entrega" |
            | LOV, lista, autorização | O conceito, em maiúsculas | «CLIENTES_ATIVOS», «IS_ADMIN» |

            :::atencao Limites e mudanças recentes
            - Nomes de itens usados como bind variable («:P10_CLIENTE_ID») devem ter no máximo **30 caracteres**.
            - Renomear um item exige atualizar todo código que o referencia: SQL, PL/SQL, JavaScript, condições e HTML.
            - No **26.1**, todo componente ganhou um **Static ID** usado nos exports e no APEXlang, e o antigo "Static ID" de
              regiões, botões e colunas de IG/IR passou a se chamar **HTML DOM ID**. Trate Static IDs como identificadores
              permanentes: mudá-los quebra referências e atrapalha comparações entre versões.
            :::

            ## Objetos de banco
            | Objeto | Convenção sugerida | Exemplo |
            |---|---|---|
            | Tabela | Plural, sem prefixo técnico | «PEDIDOS», «ITENS_PEDIDO» |
            | Chave primária | «ID» (identity) ou «<TABELA>_ID» — escolha um e mantenha | «PEDIDOS.ID» |
            | View | Prefixo «V_» (ou sufixo «_V») | «V_PEDIDOS_ABERTOS» |
            | Pacote de regra | «<DOMINIO>_API» | «PEDIDOS_API» |
            | Pacote de interface | «<APP>_<AREA>_UI» | «VENDAS_PEDIDOS_UI» |
            | Constraints | Tabela + sufixo do tipo | «PEDIDOS_PK», «PEDIDOS_CLIENTE_FK», «PEDIDOS_STATUS_CK» |
            | Variáveis PL/SQL | «p_» parâmetro, «l_» local, «g_» global, «c_» constante | «p_pedido_id», «l_total» |

            ## JavaScript e CSS
            Agrupe as funções da aplicação em um **namespace**, em um arquivo estático carregado pelos atributos de interface:

            ~~~js
            // app.js
            var vendas = vendas || {};

            vendas.pedidos = {
                recalcularTotal: function () {
                    var qtd   = apex.locale.toNumber( apex.item( "P10_QTD" ).getValue() ) || 0,
                        preco = apex.locale.toNumber( apex.item( "P10_PRECO" ).getValue() ) || 0;
                    apex.item( "P10_TOTAL" ).setValue( apex.locale.formatNumber( qtd * preco, "999G999G990D00" ) );
                }
            };
            ~~~

            Na Dynamic Action, a ação *Execute JavaScript Code* fica com uma linha: «vendas.pedidos.recalcularTotal();». Nas
            classes CSS, use um prefixo próprio («vendas-», «minhaapp-») para não colidir com «t-» (tema), «u-» (utilitárias) e
            «a-» (núcleo do APEX).

            ## Encontrando desvios
            O [dicionário do APEX](#/topico/dicionario-apex) ajuda a verificar o padrão automaticamente:

            ~~~sql
            -- Itens de página fora do padrão P<página>_
            select page_id, item_name
              from apex_application_page_items
             where application_id = 100
               and not regexp_like( item_name, '^P' || page_id || '_' )
             order by page_id, item_name;
            ~~~

            :::dica Escreva o padrão em uma página
            Mantenha um documento curto com as convenções e exemplos, revise-o com o time e use-o nas revisões de código
            (junto com o [checklist de qualidade](#/topico/checklist-de-qualidade)). Padrão que só existe na cabeça de alguém não
            é padrão.
            :::

            :::info Nomes que o usuário vê
            Títulos de página, labels e mensagens são texto para o usuário — escreva-os em linguagem natural e, se a aplicação
            for traduzida, use [mensagens de texto](#/topico/mensagens-de-texto) em vez de texto fixo no código.
            :::
        `
    },
    en: {
        titulo: 'Naming conventions',
        resumo: 'Naming standards for items, pages, components, database objects, JavaScript and CSS that make an application predictable and easy to maintain.',
        tags: ['naming conventions', 'standards', 'P1_', 'application items', 'Static ID', 'HTML DOM ID', 'alias', 'prefixes', 'namespace'],
        conteudo: `
            APEX enforces almost no naming rules — which is exactly why you need some. Consistent names make an application
            **predictable**: anyone on the team knows where to look, code searches work and exports (APEXlang included) stay
            readable. There is no single official standard; what matters is to **agree as a team, document it and follow it**.
            Below are widely used conventions.

            ## APEX components
            | Element | Suggested convention | Example |
            |---|---|---|
            | Page item | «P<page>_<NAME>», the pattern APEX generates | «P10_CUSTOMER_ID» |
            | Application item | Its own prefix, never «P<number>_» | «G_COMPANY_ID», «AI_PROFILE» |
            | Page alias | Lowercase with hyphens (shows up in the Friendly URL) | «order-detail» |
            | Button | Uppercase, describing the action (the name becomes «REQUEST») | «SAVE», «APPROVE» |
            | Region HTML DOM ID | Lowercase with underscores, descriptive | «orders_report», «filters_drawer» |
            | Dynamic Action | A sentence stating the intent | "Recalculate total when quantity changes" |
            | Process, validation | Verb + object | "Approve order", "Validate delivery date" |
            | LOV, list, authorization | The concept, uppercase | «ACTIVE_CUSTOMERS», «IS_ADMIN» |

            :::atencao Limits and recent changes
            - Item names used as bind variables («:P10_CUSTOMER_ID») must be at most **30 characters** long.
            - Renaming an item means updating every piece of code that references it: SQL, PL/SQL, JavaScript, conditions and HTML.
            - In **26.1**, every component got a **Static ID** used in exports and APEXlang, and the former "Static ID" of regions,
              buttons and IG/IR columns was renamed **HTML DOM ID**. Treat Static IDs as permanent identifiers: changing them breaks
              references and confuses version comparisons.
            :::

            ## Database objects
            | Object | Suggested convention | Example |
            |---|---|---|
            | Table | Plural, no technical prefix | «ORDERS», «ORDER_LINES» |
            | Primary key | «ID» (identity) or «<TABLE>_ID» — pick one and stick to it | «ORDERS.ID» |
            | View | «V_» prefix (or «_V» suffix) | «V_OPEN_ORDERS» |
            | Business-rule package | «<DOMAIN>_API» | «ORDERS_API» |
            | UI package | «<APP>_<AREA>_UI» | «SALES_ORDERS_UI» |
            | Constraints | Table + type suffix | «ORDERS_PK», «ORDERS_CUSTOMER_FK», «ORDERS_STATUS_CK» |
            | PL/SQL variables | «p_» parameter, «l_» local, «g_» global, «c_» constant | «p_order_id», «l_total» |

            ## JavaScript and CSS
            Group the application's functions in a **namespace**, in a static file loaded through the user interface attributes:

            ~~~js
            // app.js
            var sales = sales || {};

            sales.orders = {
                recalcTotal: function () {
                    var qty   = apex.locale.toNumber( apex.item( "P10_QTY" ).getValue() ) || 0,
                        price = apex.locale.toNumber( apex.item( "P10_PRICE" ).getValue() ) || 0;
                    apex.item( "P10_TOTAL" ).setValue( apex.locale.formatNumber( qty * price, "999G999G990D00" ) );
                }
            };
            ~~~

            In the Dynamic Action, the *Execute JavaScript Code* action becomes one line: «sales.orders.recalcTotal();». For CSS
            classes, use your own prefix («sales-», «myapp-») so they do not collide with «t-» (theme), «u-» (utilities) and «a-»
            (APEX core).

            ## Finding deviations
            The [APEX dictionary](#/topico/dicionario-apex) helps check the standard automatically:

            ~~~sql
            -- Page items not following the P<page>_ pattern
            select page_id, item_name
              from apex_application_page_items
             where application_id = 100
               and not regexp_like( item_name, '^P' || page_id || '_' )
             order by page_id, item_name;
            ~~~

            :::dica Write the standard down
            Keep a short document with the conventions and examples, review it with the team and use it in code reviews (together
            with the [quality checklist](#/topico/checklist-de-qualidade)). A standard that only lives in someone's head is not a
            standard.
            :::

            :::info Names users see
            Page titles, labels and messages are text for users — write them in natural language and, if the application is
            translated, use [text messages](#/topico/mensagens-de-texto) instead of hard-coded text.
            :::
        `
    }
});

DOC.topico({
    id: 'reutilizacao-e-subscriptions',
    cat: 'boas-praticas',
    nivel: 'avancado',
    links: [
        { t: 'App Builder Guide — Using Shared Component Subscriptions', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-shared-component-subscriptions.html' },
        { t: 'App Builder Guide — About Application Types', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-application-types.html' },
        { t: 'App Builder Guide — Using Component Groups', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-component-groups.html' }
    ],
    relacionados: ['componentes-compartilhados', 'universal-theme', 'ambientes-dev-test-prod', 'plugins', 'organizacao-do-codigo'],
    pt: {
        titulo: 'Reutilização: subscriptions, component groups e apps Theme/Library',
        resumo: 'Compartilhe componentes entre aplicações com subscriptions e component groups e, no 26.1, com aplicações Theme, Library e Boilerplate.',
        tags: ['subscription', 'inscrição', 'master app', 'Shared Components', 'component groups', 'publish', 'refresh', 'Library', 'Theme', 'Boilerplate', 'APEX_SHARED_COMPONENT'],
        conteudo: `
            Empresas raramente têm uma única aplicação APEX. Logo surgem as perguntas: como usar o **mesmo esquema de
            autenticação** em todas? Como manter **LOVs, autorizações e templates** iguais? Copiar e colar resolve no primeiro dia
            e vira pesadelo no segundo. A resposta do APEX é o mecanismo de **subscriptions** (inscrições) de Shared Components,
            bastante ampliado nas últimas versões.

            ## Como funciona uma subscription
            - Um componente **mestre** vive em uma aplicação — tradicionalmente chamada de *master app*.
            - Outras aplicações do **mesmo workspace** têm uma cópia **inscrita** nele: ao copiar o componente escolha *Copy and
              Subscribe*, ou use *Subscribe From* na página do componente.
            - Desde o 23.2 o componente inscrito é **somente leitura**: altera-se apenas o mestre.
            - Mudou o mestre? Use **Publish** nele (empurra para todos os inscritos) ou **Refresh** no inscrito (puxa as mudanças).
              A coluna **Subscription Status** mostra *Up to date* ou *Needs refresh*.
            - Dependências são resolvidas automaticamente: o APEX procura o componente dependente pelo Static ID, depois pelo
              nome e, se não encontrar, copia-o.

            ## O que pode ser inscrito
            Authentication e Authorization Schemes, Lists of Values, Lists, Plug-ins, Build Options, Application Items, Processes,
            Computations e Settings, Application Access Control (roles), Email Templates, Text Messages, Report Layouts, REST Data
            Sources, Data Load Definitions, Search Configurations, Shortcuts, Map Backgrounds e **Component Groups**. Temas e
            templates têm o seu próprio mecanismo de inscrição (o tema mestre).

            ## Component Groups (24.1)
            Um **Component Group** reúne Shared Components de uma mesma funcionalidade — por exemplo, "Segurança" com autenticação,
            autorizações, roles e itens de aplicação. Você copia, inscreve, atualiza ou publica o **grupo inteiro** de uma vez
            (no 24.1, temas e templates ainda não podiam entrar em grupos).

            ## Tipos de aplicação (26.1)
            | Tipo | Papel |
            |---|---|
            | Standard | A aplicação comum; todas as existentes passam a ser Standard. |
            | **Theme** | Contém a definição de um tema — estilos, templates, Template Components — para outras apps se inscreverem. |
            | **Library** | Contém Shared Components reutilizáveis (autenticação, LOVs, listas, workflows...), organizados em component groups. |
            | **Boilerplate** | Ponto de partida para apps novas: páginas prontas e inscrições já apontando para as apps Library e Theme. |

            O tipo é definido em *Edit Application Definition → Properties → Application Type* (a documentação sugere criar a app,
            excluir as páginas geradas e então mudar o tipo para Theme ou Library). Para criar uma app a partir de um boilerplate,
            use *App Builder → Create → Create App From a Boilerplate*: a nova aplicação é independente do boilerplate, mas mantém
            as inscrições nas apps Library e Theme.

            ## Automatizando o refresh
            Depois de publicar uma nova versão da app Library, você pode atualizar os inscritos por script:

            ~~~plsql
            begin
                -- necessário apenas fora de uma sessão APEX
                apex_util.set_workspace( p_workspace => 'VENDAS' );

                for c in ( select component_type, component_id
                             from apex_subscribed_components
                            where application_id      = 100
                              and subscription_status <> apex_shared_component.c_status_up_to_date )
                loop
                    apex_shared_component.refresh(
                        p_component_type => c.component_type,
                        p_component_id   => c.component_id );
                end loop;
                commit;
            end;
            ~~~

            O pacote «APEX_SHARED_COMPONENT» surgiu no 24.2 (no 26.1 também faz refresh e publish de temas) e só existe em
            instalações completas, não em ambientes runtime-only.

            ## Instalando em outros ambientes (26.1)
            Os exports agora levam o ID da aplicação mestre e o Static ID do componente mestre. Na importação, o APEX verifica se
            os mestres existem no workspace de destino — e você pode remapear:

            ~~~plsql
            begin
                apex_application_install.clear_all;
                apex_application_install.set_workspace( 'VENDAS_PROD' );
                -- No destino, a app Library tem o ID 210 em vez de 110
                apex_application_install.set_subscription_mapping(
                    p_from_application_id => 110,
                    p_to_application_id   => 210 );
            end;
            ~~~

            Com «set_subscription_mode» você escolhe entre o modo estrito (padrão: a instalação falha se faltar um mestre) e
            «c_subscription_remove» (remove as inscrições na instalação).

            :::atencao Planeje a ordem de deploy
            Inscrições funcionam dentro do mesmo workspace. Instale primeiro as apps mestre (Theme e Library) e depois as que
            dependem delas, e mantenha os IDs estáveis entre ambientes — ou use o mapeamento acima.
            :::

            :::dica Comece pequeno
            Uma app mestre com autenticação, autorizações e LOVs comuns já elimina boa parte da duplicação. Evolua para component
            groups e apps Library/Theme quando o número de aplicações crescer.
            :::
        `
    },
    en: {
        titulo: 'Reuse: subscriptions, component groups and Theme/Library apps',
        resumo: 'Share components across applications with subscriptions and component groups and, in 26.1, with Theme, Library and Boilerplate apps.',
        tags: ['subscription', 'master app', 'Shared Components', 'component groups', 'publish', 'refresh', 'Library', 'Theme', 'Boilerplate', 'APEX_SHARED_COMPONENT', 'reuse'],
        conteudo: `
            Organizations rarely have a single APEX application. Questions come up quickly: how do we use the **same
            authentication scheme** everywhere? How do we keep **LOVs, authorizations and templates** identical? Copy and paste
            works on day one and becomes a nightmare on day two. APEX's answer is Shared Component **subscriptions**, greatly
            extended in recent releases.

            ## How a subscription works
            - A **master** component lives in one application — traditionally called the *master app*.
            - Other applications in the **same workspace** hold a **subscribed** copy: when copying the component choose *Copy and
              Subscribe*, or use *Subscribe From* on the component page.
            - Since 23.2 the subscribed component is **read-only**: only the master is edited.
            - Master changed? Use **Publish** on it (pushes to all subscribers) or **Refresh** on the subscriber (pulls changes).
              The **Subscription Status** column shows *Up to date* or *Needs refresh*.
            - Dependencies are resolved automatically: APEX looks for the dependent component by Static ID, then by name and, if
              not found, copies it.

            ## What can be subscribed
            Authentication and Authorization Schemes, Lists of Values, Lists, Plug-ins, Build Options, Application Items,
            Processes, Computations and Settings, Application Access Control (roles), Email Templates, Text Messages, Report
            Layouts, REST Data Sources, Data Load Definitions, Search Configurations, Shortcuts, Map Backgrounds and **Component
            Groups**. Themes and templates have their own subscription mechanism (the master theme).

            ## Component Groups (24.1)
            A **Component Group** bundles Shared Components for one feature — for instance "Security" with authentication,
            authorizations, roles and application items. You copy, subscribe, refresh or publish the **whole group** at once (in
            24.1, themes and templates could not yet be added to groups).

            ## Application types (26.1)
            | Type | Role |
            |---|---|
            | Standard | The regular application; all existing apps become Standard. |
            | **Theme** | Holds a theme definition — styles, templates, Template Components — for other apps to subscribe to. |
            | **Library** | Holds reusable Shared Components (authentication, LOVs, lists, workflows...), organized in component groups. |
            | **Boilerplate** | A starting point for new apps: ready-made pages and subscriptions already pointing to the Library and Theme apps. |

            The type is set in *Edit Application Definition → Properties → Application Type* (the documentation suggests creating
            the app, deleting the generated pages and then switching the type to Theme or Library). To create an app from a
            boilerplate, use *App Builder → Create → Create App From a Boilerplate*: the new app is independent of the
            boilerplate but keeps its subscriptions to the Library and Theme apps.

            ## Automating refresh
            After publishing a new version of the Library app, you can refresh subscribers with a script:

            ~~~plsql
            begin
                -- only needed outside an APEX session
                apex_util.set_workspace( p_workspace => 'SALES' );

                for c in ( select component_type, component_id
                             from apex_subscribed_components
                            where application_id      = 100
                              and subscription_status <> apex_shared_component.c_status_up_to_date )
                loop
                    apex_shared_component.refresh(
                        p_component_type => c.component_type,
                        p_component_id   => c.component_id );
                end loop;
                commit;
            end;
            ~~~

            The «APEX_SHARED_COMPONENT» package arrived in 24.2 (in 26.1 it also refreshes and publishes themes) and exists only in
            full development installations, not in runtime-only environments.

            ## Installing in other environments (26.1)
            Exports now carry the master application ID and the master component's Static ID. On import, APEX checks whether the
            masters exist in the target workspace — and you can remap them:

            ~~~plsql
            begin
                apex_application_install.clear_all;
                apex_application_install.set_workspace( 'SALES_PROD' );
                -- In the target, the Library app has ID 210 instead of 110
                apex_application_install.set_subscription_mapping(
                    p_from_application_id => 110,
                    p_to_application_id   => 210 );
            end;
            ~~~

            With «set_subscription_mode» you choose between strict mode (the default: installation fails if a master is missing)
            and «c_subscription_remove» (removes the subscriptions during installation).

            :::atencao Plan the deployment order
            Subscriptions work within a single workspace. Install the master apps (Theme and Library) first and then the apps that
            depend on them, and keep IDs stable across environments — or use the mapping above.
            :::

            :::dica Start small
            One master app with common authentication, authorizations and LOVs already removes much of the duplication. Move on to
            component groups and Library/Theme apps as the number of applications grows.
            :::
        `
    }
});

DOC.topico({
    id: 'checklist-de-qualidade',
    cat: 'boas-praticas',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Running Advisor to Check Application Integrity', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/running-advisor-to-check-application-integrity.html' },
        { t: 'Accessibility Guide — Testing Apps for Accessibility', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeacc/testing-apps-for-accessibility.html' },
        { t: 'App Builder Guide — Using Build Options', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-build-options-to-control-configuration.html' }
    ],
    relacionados: ['acessibilidade', 'session-state-protection', 'escaping-e-xss', 'otimizacao-performance', 'ambientes-dev-test-prod'],
    pt: {
        titulo: 'Checklist de qualidade e APEX Advisor',
        resumo: 'Um roteiro para revisar a aplicação antes de cada entrega: APEX Advisor, segurança, performance, acessibilidade, manutenção e deploy.',
        tags: ['qualidade', 'checklist', 'Advisor', 'code review', 'revisão', 'lint', 'segurança', 'performance', 'deploy', 'boas práticas'],
        conteudo: `
            Antes de promover uma aplicação para produção, vale passar por um roteiro de revisão. O APEX tem uma ferramenta
            embutida para começar: o **Advisor**, que funciona como um *lint* (ou um compilador exigente) da aplicação. Ele não
            substitui um checklist humano — por isso, abaixo estão os dois.

            ## O APEX Advisor
            - **Aplicação inteira**: *App Builder → (aplicação) → Utilities → Advisor*. Em *Checks to Perform*, escolha as
              verificações e, se quiser, informe uma lista de páginas separadas por vírgula; clique em **Perform Check**.
            - **Uma página**: no Page Designer, menu *Utilities → Advisor*.
            - Filtre o resultado em *Filter Result*; as escolhas ficam salvas para a próxima execução.

            O Advisor procura erros de programação, problemas de segurança, gargalos de performance, questões de qualidade e de
            acessibilidade e desvios de boas práticas — como referências a itens inexistentes, páginas sem título, itens sem
            label e relatórios sem coluna que identifique a linha.

            :::dica Faça do Advisor um hábito
            Rode o Advisor a cada entrega (ou antes de cada merge de uma Working Copy) e trate os avisos como erros de compilação:
            corrija ou justifique por escrito.
            :::

            ## Checklist por área
            ### Segurança
            - Toda página e todo processo sensível têm **Authorization Scheme**; páginas públicas são exceções conscientes.
            - [Session State Protection](#/topico/session-state-protection) ligada, com *Page Access Protection* adequada e itens
              com checksum ou *Restricted*.
            - Nenhum «&ITEM.» dentro de SQL ou PL/SQL — sempre bind variables.
            - Escape mantido em colunas e HTML Expressions; «!RAW» só com conteúdo confiável.
            - Debug desabilitado em produção e, quando possível, produção como ambiente **runtime-only**.
            - Cabeçalhos HTTP de segurança e Content Security Policy revisados.

            ### Performance
            - Consultas das regiões testadas com volume real de dados (plano de execução, índices).
            - Paginação adequada e *lazy loading* em regiões pesadas; nada de trazer tudo para filtrar no navegador.
            - Sem chamadas a «V()» ou funções PL/SQL por linha em consultas grandes.
            - Tempos medidos no [modo Debug](#/topico/modo-debug).

            ### Acessibilidade
            - Checagens de acessibilidade do Advisor limpas: títulos de página, labels, *Value Identifies Row*, texto alternativo.
            - Navegação só por teclado testada nas telas principais.

            ### Manutenção
            - Lógica em pacotes e nomes padronizados (veja [organização do código](#/topico/organizacao-do-codigo)).
            - Nada de IDs de aplicação ou URLs fixos: use «APEX_PAGE.GET_URL» e substitution strings como «&APP_ID.».
            - *Utilities → Embedded Code* revisado e relatório *Database Object Dependencies* sem surpresas.
            - Textos exibidos ao usuário em mensagens de texto, se houver tradução.

            ### Deploy
            - Versão da aplicação atualizada (atributo *Version*, exibido via «#APP_VERSION#»).
            - **Build Options** controlando funcionalidades ainda em desenvolvimento.
            - Export da aplicação e scripts de banco versionados juntos no Git.
            - No 26.1, **Application Lock** para impedir edições pelo App Builder onde ninguém deveria editar.

            ### Experiência do usuário
            - Mensagens de sucesso e erro claras, *Warn on Unsaved Changes* nos formulários e comportamento consistente em telas
              pequenas.

            ## Consultas úteis no dicionário
            ~~~sql
            -- Páginas sem esquema de autorização (revise uma a uma)
            select page_id, page_name
              from apex_application_pages
             where application_id = 100
               and authorization_scheme is null
             order by page_id;

            -- Descubra as colunas de qualquer view do APEX
            select column_name, comments
              from apex_dictionary
             where apex_view_name = 'APEX_APPLICATION_PAGES'
             order by column_id;
            ~~~

            :::atencao Lista não é sentença
            A página de login e páginas propositalmente públicas aparecem na primeira consulta sem estarem erradas. O objetivo é
            revisar cada caso, não "zerar" a lista a qualquer custo.
            :::

            :::novo Ferramentas recentes
            24.1: «APEX_APP_OBJECT_DEPENDENCY» e *accessibility help text* no Page Designer; 24.2: relatório **Database Object
            Dependencies**; 26.1: **Application Lock**, Static IDs em todos os componentes e export **APEXlang**, que torna a
            revisão de código — inclusive automatizada — muito mais simples.
            :::
        `
    },
    en: {
        titulo: 'Quality checklist and APEX Advisor',
        resumo: 'A review routine before every release: APEX Advisor, security, performance, accessibility, maintainability and deployment.',
        tags: ['quality', 'checklist', 'Advisor', 'code review', 'lint', 'security', 'performance', 'deployment', 'best practices'],
        conteudo: `
            Before promoting an application to production, it pays to go through a review routine. APEX has a built-in tool to get
            started: **Advisor**, which works like a *lint* (or a strict compiler) for your application. It does not replace a
            human checklist — so below you will find both.

            ## APEX Advisor
            - **Whole application**: *App Builder → (application) → Utilities → Advisor*. Under *Checks to Perform*, pick the checks
              and optionally enter a comma-separated list of pages; click **Perform Check**.
            - **One page**: in Page Designer, *Utilities → Advisor* menu.
            - Filter the results under *Filter Result*; your choices are saved for the next run.

            Advisor looks for programming errors, security issues, performance bottlenecks, quality and accessibility problems and
            deviations from best practices — such as references to nonexistent items, pages without a title, items without a
            label and reports without a column identifying the row.

            :::dica Make Advisor a habit
            Run Advisor for every release (or before every Working Copy merge) and treat warnings like compiler errors: fix them or
            justify them in writing.
            :::

            ## Checklist by area
            ### Security
            - Every page and sensitive process has an **Authorization Scheme**; public pages are deliberate exceptions.
            - [Session State Protection](#/topico/session-state-protection) enabled, with proper *Page Access Protection* and items
              using checksums or *Restricted*.
            - No «&ITEM.» inside SQL or PL/SQL — always bind variables.
            - Escaping kept on columns and HTML Expressions; «!RAW» only with trusted content.
            - Debug disabled in production and, when possible, production as a **runtime-only** environment.
            - HTTP security headers and Content Security Policy reviewed.

            ### Performance
            - Region queries tested with real data volumes (execution plan, indexes).
            - Proper pagination and *lazy loading* on heavy regions; never fetch everything to filter in the browser.
            - No «V()» or per-row PL/SQL function calls in large queries.
            - Timings measured in [Debug mode](#/topico/modo-debug).

            ### Accessibility
            - Advisor accessibility checks clean: page titles, labels, *Value Identifies Row*, alternative text.
            - Keyboard-only navigation tested on the main screens.

            ### Maintainability
            - Logic in packages and standardized names (see [code organization](#/topico/organizacao-do-codigo)).
            - No hard-coded application IDs or URLs: use «APEX_PAGE.GET_URL» and substitution strings such as «&APP_ID.».
            - *Utilities → Embedded Code* reviewed and the *Database Object Dependencies* report holds no surprises.
            - User-facing text in text messages if the app is translated.

            ### Deployment
            - Application version updated (*Version* attribute, shown through «#APP_VERSION#»).
            - **Build Options** gating features still under development.
            - Application export and database scripts versioned together in Git.
            - In 26.1, **Application Lock** to prevent App Builder edits where nobody should edit.

            ### User experience
            - Clear success and error messages, *Warn on Unsaved Changes* on forms and consistent behavior on small screens.

            ## Handy dictionary queries
            ~~~sql
            -- Pages without an authorization scheme (review each one)
            select page_id, page_name
              from apex_application_pages
             where application_id = 100
               and authorization_scheme is null
             order by page_id;

            -- Discover the columns of any APEX view
            select column_name, comments
              from apex_dictionary
             where apex_view_name = 'APEX_APPLICATION_PAGES'
             order by column_id;
            ~~~

            :::atencao A list is not a verdict
            The login page and intentionally public pages show up in the first query without being wrong. The goal is to review
            each case, not to "zero out" the list at any cost.
            :::

            :::novo Recent tools
            24.1: «APEX_APP_OBJECT_DEPENDENCY» and *accessibility help text* in Page Designer; 24.2: the **Database Object
            Dependencies** report; 26.1: **Application Lock**, Static IDs on every component and **APEXlang** export, which makes
            code review — automated review included — much simpler.
            :::
        `
    }
});

DOC.topico({
    id: 'migrando-do-oracle-forms',
    cat: 'boas-praticas',
    nivel: 'intermediario',
    links: [
        { t: 'Oracle APEX — Modernizing Oracle Forms', u: 'https://apex.oracle.com/en/solutions/oracle-forms/' },
        { t: 'Documentação do Oracle APEX 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/' }
    ],
    relacionados: ['o-que-e-apex', 'organizacao-do-codigo', 'formularios', 'mestre-detalhe', 'interactive-grid'],
    pt: {
        titulo: 'Migrando do Oracle Forms para o APEX',
        resumo: 'Como modernizar aplicações Oracle Forms com APEX: reaproveitar o PL/SQL do banco, mapear conceitos, planejar por etapas e evitar armadilhas.',
        tags: ['Oracle Forms', 'migração', 'modernização', 'Forms to APEX', 'triggers', 'Oracle Reports', 'legado', 'PL/SQL', 'blocos', 'LOV'],
        conteudo: `
            O **Oracle Forms** sustentou sistemas corporativos por décadas, e muitas empresas buscam modernizá-los. O APEX é o
            caminho natural: os dois são centrados no banco, usam SQL e PL/SQL e privilegiam o desenvolvimento declarativo. A
            própria Oracle apresenta o APEX como a plataforma de escolha para modernizar aplicações Forms — e ele é um recurso sem
            custo adicional do Oracle Database.

            ## Converter ou modernizar?
            Versões antigas do APEX (a partir do 3.2) tinham um recurso de conversão de Forms, que importava os módulos em XML e
            gerava páginas. Esse recurso não faz parte do App Builder atual: a abordagem recomendada hoje é **modernizar** —
            reconstruir a interface com componentes APEX, reaproveitando a lógica que já está no banco. Converter tela a tela
            reproduz em tecnologia nova os problemas de usabilidade de décadas atrás.

            ## Mapeando os conceitos
            | Oracle Forms | No APEX |
            |---|---|
            | Módulo (.fmb) | Aplicação ou conjunto de páginas |
            | Canvas / Window | Página (normal, modal ou drawer) |
            | Bloco de um registro | Form region |
            | Bloco multi-registro | Interactive Grid editável ou Interactive Report |
            | Relação mestre-detalhe | Página Master Detail |
            | Item | Item de página ou coluna do Interactive Grid |
            | LOV / Record Group | List of Values compartilhada (Popup LOV, Select One...) |
            | Menu (.mmb) | Navigation Menu (List) |
            | Program units e bibliotecas (.pll) | Pacotes PL/SQL no banco |
            | Variáveis GLOBAL | Itens de aplicação |
            | Alerts | «apex.message.confirm» ou a ação *Confirm* |
            | Modo Enter-Query | Faceted Search, Smart Filters e filtros de IR/IG |
            | Oracle Reports | Document Generator, report layouts e exportação de dados |

            ## E os triggers?
            | Trigger do Forms | Equivalente no APEX |
            |---|---|
            | WHEN-VALIDATE-ITEM / WHEN-VALIDATE-RECORD | Validation |
            | WHEN-BUTTON-PRESSED | Botão com processo (submit) ou Dynamic Action |
            | WHEN-NEW-FORM-INSTANCE | Processo *Before Header* ou Dynamic Action *Page Load* |
            | POST-QUERY | Join ou view na consulta da região |
            | PRE-INSERT / PRE-UPDATE | Processo, trigger de banco ou pacote |
            | WHEN-LIST-CHANGED, WHEN-CHECKBOX-CHANGED | Dynamic Action no evento *Change* |
            | ON-ERROR / ON-MESSAGE | Error Handling Function e mensagens de texto |

            ## Exemplo: tirando a regra do trigger
            ~~~plsql
            -- Antes, no Forms (WHEN-VALIDATE-ITEM de :PEDIDO.DATA_ENTREGA)
            if :pedido.data_entrega < :pedido.data_pedido then
                message( 'Data de entrega anterior ao pedido' );
                raise form_trigger_failure;
            end if;
            ~~~

            ~~~plsql
            -- Depois: a regra vive no banco e serve aos dois mundos
            create or replace function pedido_valida_entrega (
                p_data_pedido  in date,
                p_data_entrega in date ) return varchar2
            is
            begin
                if p_data_entrega < p_data_pedido then
                    return 'A data de entrega não pode ser anterior à data do pedido.';
                end if;
                return null;
            end pedido_valida_entrega;
            /
            ~~~

            No APEX, uma validação do tipo *Function Body (returning Error Text)* chama a função (use a mesma máscara de formato
            dos itens):

            ~~~plsql
            return pedido_valida_entrega(
                       p_data_pedido  => to_date( :P10_DATA_PEDIDO,  'DD/MM/YYYY' ),
                       p_data_entrega => to_date( :P10_DATA_ENTREGA, 'DD/MM/YYYY' ) );
            ~~~

            ## Um roteiro em etapas
            1. **Inventário**: liste módulos, uso real, complexidade e dependências (bibliotecas, menus, relatórios). Módulos que
               ninguém usa não precisam ser migrados.
            2. **Leve a lógica para o banco** ainda no Forms: o que está em triggers e bibliotecas vira pacote, e as duas
               aplicações passam a usar o mesmo código.
            3. **Piloto**: escolha uma área funcional bem delimitada para modernizar primeiro — ela calibra estimativas e treina o time.
            4. **Construa e teste** com os wizards do APEX, redesenhando fluxos em vez de copiar telas.
            5. **Convivência**: Forms e APEX podem rodar lado a lado sobre o mesmo banco; migre por módulos e desligue o Forms aos poucos.

            :::atencao Diferenças que pegam
            - A web é *stateless*: não há bloqueio de registro durante a edição; o APEX detecta alteração concorrente (*lost
              update*) ao salvar.
            - O commit acontece ao final de cada requisição, não quando o usuário "salva o form" com vários blocos abertos.
            - Lógica orientada a foco e teclas de função (KEY-*, WHEN-NEW-ITEM-INSTANCE) não tem equivalente direto — repense a
              interação.
            :::

            :::dica Recursos oficiais
            A página *Modernizing Oracle Forms* (apex.oracle.com/en/solutions/oracle-forms) reúne guia, FAQ, casos de clientes e
            um laboratório "Oracle Forms to Oracle APEX". Ferramentas de IA, como o [APEX Assistant](#/topico/apex-assistant),
            ajudam a entender e reescrever trechos de PL/SQL — mas revise sempre o resultado.
            :::
        `
    },
    en: {
        titulo: 'Migrating from Oracle Forms to APEX',
        resumo: 'How to modernize Oracle Forms applications with APEX: reuse database PL/SQL, map concepts, plan in phases and avoid pitfalls.',
        tags: ['Oracle Forms', 'migration', 'modernization', 'Forms to APEX', 'triggers', 'Oracle Reports', 'legacy', 'PL/SQL', 'blocks', 'LOV'],
        conteudo: `
            **Oracle Forms** has powered enterprise systems for decades, and many organizations are modernizing them. APEX is the
            natural path: both are database-centric, use SQL and PL/SQL and favor declarative development. Oracle itself presents
            APEX as the platform of choice for modernizing Forms applications — and it is a no-cost feature of Oracle Database.

            ## Convert or modernize?
            Old APEX releases (starting with 3.2) had a Forms conversion feature that imported modules as XML and generated pages.
            That feature is not part of today's App Builder: the recommended approach is to **modernize** — rebuild the UI with
            APEX components while reusing the logic already in the database. Converting screen by screen just reproduces
            decades-old usability problems in a new technology.

            ## Mapping the concepts
            | Oracle Forms | In APEX |
            |---|---|
            | Module (.fmb) | Application or set of pages |
            | Canvas / Window | Page (normal, modal or drawer) |
            | Single-record block | Form region |
            | Multi-record block | Editable Interactive Grid or Interactive Report |
            | Master-detail relation | Master Detail page |
            | Item | Page item or Interactive Grid column |
            | LOV / Record Group | Shared List of Values (Popup LOV, Select One...) |
            | Menu (.mmb) | Navigation Menu (List) |
            | Program units and libraries (.pll) | PL/SQL packages in the database |
            | GLOBAL variables | Application items |
            | Alerts | «apex.message.confirm» or the *Confirm* action |
            | Enter-Query mode | Faceted Search, Smart Filters and IR/IG filters |
            | Oracle Reports | Document Generator, report layouts and data export |

            ## What about triggers?
            | Forms trigger | APEX equivalent |
            |---|---|
            | WHEN-VALIDATE-ITEM / WHEN-VALIDATE-RECORD | Validation |
            | WHEN-BUTTON-PRESSED | Button with a process (submit) or a Dynamic Action |
            | WHEN-NEW-FORM-INSTANCE | *Before Header* process or *Page Load* Dynamic Action |
            | POST-QUERY | Join or view in the region query |
            | PRE-INSERT / PRE-UPDATE | Process, database trigger or package |
            | WHEN-LIST-CHANGED, WHEN-CHECKBOX-CHANGED | Dynamic Action on the *Change* event |
            | ON-ERROR / ON-MESSAGE | Error Handling Function and text messages |

            ## Example: moving the rule out of the trigger
            ~~~plsql
            -- Before, in Forms (WHEN-VALIDATE-ITEM on :ORDER.DELIVERY_DATE)
            if :order.delivery_date < :order.order_date then
                message( 'Delivery date before order date' );
                raise form_trigger_failure;
            end if;
            ~~~

            ~~~plsql
            -- After: the rule lives in the database and serves both worlds
            create or replace function order_check_delivery (
                p_order_date    in date,
                p_delivery_date in date ) return varchar2
            is
            begin
                if p_delivery_date < p_order_date then
                    return 'The delivery date cannot be earlier than the order date.';
                end if;
                return null;
            end order_check_delivery;
            /
            ~~~

            In APEX, a *Function Body (returning Error Text)* validation calls the function (use the same format mask as the items):

            ~~~plsql
            return order_check_delivery(
                       p_order_date    => to_date( :P10_ORDER_DATE,    'MM/DD/YYYY' ),
                       p_delivery_date => to_date( :P10_DELIVERY_DATE, 'MM/DD/YYYY' ) );
            ~~~

            ## A phased roadmap
            1. **Inventory**: list modules, actual usage, complexity and dependencies (libraries, menus, reports). Modules nobody
               uses do not need migrating.
            2. **Move logic to the database** while still on Forms: whatever lives in triggers and libraries becomes a package,
               and both applications share the same code.
            3. **Pilot**: pick a well-bounded functional area to modernize first — it calibrates estimates and trains the team.
            4. **Build and test** with the APEX wizards, redesigning flows instead of copying screens.
            5. **Coexistence**: Forms and APEX can run side by side on the same database; migrate module by module and retire
               Forms gradually.

            :::atencao Differences that bite
            - The web is *stateless*: records are not locked while being edited; APEX detects concurrent changes (*lost update*)
              on save.
            - Commits happen at the end of each request, not when the user "saves the form" with several blocks open.
            - Focus-driven logic and function keys (KEY-*, WHEN-NEW-ITEM-INSTANCE) have no direct equivalent — rethink the
              interaction.
            :::

            :::dica Official resources
            The *Modernizing Oracle Forms* page (apex.oracle.com/en/solutions/oracle-forms) gathers a guide, FAQ, customer stories
            and an "Oracle Forms to Oracle APEX" lab. AI tools such as [APEX Assistant](#/topico/apex-assistant) help you understand
            and rewrite PL/SQL snippets — but always review the result.
            :::
        `
    }
});

DOC.topico({
    id: 'como-aprender-apex',
    cat: 'boas-praticas',
    nivel: 'basico',
    links: [
        { t: 'Oracle APEX — Training and Certifications', u: 'https://apex.oracle.com/en/learn/training/' },
        { t: 'Exame 1Z0-771 — Oracle APEX Cloud Developer Professional', u: 'https://education.oracle.com/oracle-apex-cloud-developer-professional/pexam_1Z0-771' },
        { t: 'Documentação oficial do Oracle APEX', u: 'https://docs.oracle.com/en/database/oracle/apex/' }
    ],
    relacionados: ['o-que-e-apex', 'onde-rodar-apex', 'create-app-wizard', 'sql-workshop', 'plugins'],
    pt: {
        titulo: 'Como aprender APEX: caminho, recursos e certificação',
        resumo: 'Um roteiro de estudo do zero ao avançado, com os cursos gratuitos da Oracle, a certificação oficial, a documentação e a comunidade.',
        tags: ['aprender', 'curso', 'tutorial', 'certificação', '1Z0-771', 'MyLearn', 'LiveLabs', 'Office Hours', 'apex.world', 'comunidade', 'Joel Kallman Day'],
        conteudo: `
            Aprender o básico de APEX é rápido — em poucas horas você cria uma aplicação funcional. Ficar realmente bom exige outra
            coisa: entender SQL e PL/SQL a fundo, conhecer os componentes e praticar em projetos reais. Este roteiro organiza o
            caminho e aponta os recursos oficiais e da comunidade.

            ## 1. Um ambiente para praticar
            - **apex.oracle.com**: workspace gratuito em minutos, ideal para estudar. É um serviço de avaliação — não guarde dados
              reais nem use em produção.
            - **Always Free Autonomous Database** na Oracle Cloud, ou o **Oracle Database Free** com ORDS no seu computador. Veja
              [Onde rodar o APEX](#/topico/onde-rodar-apex).

            ## 2. A base: SQL e PL/SQL
            O APEX é, em boa parte, "SQL com interface". Quem domina joins, funções analíticas, transações e pacotes PL/SQL evolui
            muito mais rápido. Na plataforma **Oracle MyLearn** há trilhas gratuitas como *Oracle SQL Explorer* e
            *Programming with PL/SQL*.

            ## 3. Cursos oficiais de APEX
            | Trilha no MyLearn | Duração | Para quem |
            |---|---|---|
            | Oracle APEX Foundations | cerca de 3 horas | Iniciantes: App Builder, SQL Workshop e a primeira aplicação na nuvem. |
            | Oracle APEX Developer Professional | cerca de 22 horas | Iniciantes e experientes: cada componente em detalhe, IA no APEX e laboratórios guiados. |

            O **Oracle LiveLabs** complementa com workshops passo a passo de APEX — do básico a REST, IA e modernização de Forms.

            ## 4. Certificação
            A certificação oficial é a **Oracle APEX Cloud Developer Certified Professional**, obtida com o exame **1Z0-771**
            (*Oracle APEX Cloud Developer Professional*), agendado pelo Oracle MyLearn. A trilha *Developer Professional* cobre
            o conteúdo. Antes de agendar, confira no MyLearn a versão vigente do exame, o número de questões e a nota mínima.

            ## 5. Documentação e referências
            - [Documentação oficial](https://docs.oracle.com/en/database/oracle/apex/): App Builder Guide, APIs PL/SQL e
              JavaScript e as **Release Notes** de cada versão (o capítulo *New Features* é leitura obrigatória).
            - **Universal Theme Reference** ([apex.oracle.com/ut](https://apex.oracle.com/ut)) para a interface.
            - **Sample Apps** e **Starter Apps** da Gallery do App Builder: código real para estudar.
            - **APEX Diff** ([apex.oracle.com/apexdiff](https://apex.oracle.com/apexdiff)): compara as APIs PL/SQL entre versões.

            ## 6. Comunidade
            | Recurso | O que oferece |
            |---|---|
            | APEX Office Hours | Sessões ao vivo com o time de produto do APEX. |
            | Blog oficial (blogs.oracle.com/apex) | Anúncios, novidades e artigos técnicos. |
            | Canal Oracle APEX no YouTube | Demonstrações, tutoriais e gravações de eventos. |
            | Fóruns e o app Ideas | Perguntas técnicas e sugestões de recursos para o produto. |
            | apex.world | Portal da comunidade, com diretório de plug-ins e um Slack muito ativo. |
            | #orclapex | A hashtag da comunidade nas redes sociais. |
            | Joel Kallman Day | Em outubro, a comunidade publica artigos em homenagem a Joel Kallman, um dos criadores do APEX. |

            ## Roteiro sugerido
            1. **Semanas 1 e 2**: trilha Foundations, aplicações com o [Create App Wizard](#/topico/create-app-wizard) e
               exploração do Page Designer.
            2. **Semanas 3 a 6**: formulários, relatórios, LOVs, validações, Dynamic Actions e
               [session state](#/topico/sessao-e-session-state).
            3. **Meses 2 e 3**: segurança (autenticação, autorização, Session State Protection), REST, PL/SQL em pacotes e a API
               JavaScript.
            4. **Depois**: Template Components, plug-ins, CI/CD, IA generativa, performance — e a certificação.

            :::dica Aprenda construindo
            Escolha um problema real (uma planilha do time, um controle de empréstimos, um cadastro) e leve-o até produção. Use o
            modo Debug para entender o que acontece por trás e leia o código dos Sample Apps.
            :::

            :::info Acompanhe as versões
            O APEX evolui rápido: depois do 24.2 a Oracle pulou direto para o **26.1** (maio de 2026), alinhando a numeração ao
            Oracle AI Database 26ai. Ao estudar por materiais antigos, confira se o recurso mudou — veja a
            [linha do tempo de versões](#/versoes).
            :::
        `
    },
    en: {
        titulo: 'How to learn APEX: path, resources and certification',
        resumo: 'A study roadmap from zero to advanced, with free Oracle courses, the official certification, documentation and the community.',
        tags: ['learn', 'course', 'tutorial', 'certification', '1Z0-771', 'MyLearn', 'LiveLabs', 'Office Hours', 'apex.world', 'community', 'Joel Kallman Day'],
        conteudo: `
            Learning APEX basics is quick — in a few hours you can build a working application. Getting really good takes
            something else: a deep understanding of SQL and PL/SQL, knowing the components and practicing on real projects. This
            roadmap organizes the journey and points to official and community resources.

            ## 1. An environment to practice
            - **apex.oracle.com**: a free workspace in minutes, ideal for learning. It is an evaluation service — do not store real
              data or use it for production.
            - **Always Free Autonomous Database** on Oracle Cloud, or **Oracle Database Free** with ORDS on your machine. See
              [Where to run APEX](#/topico/onde-rodar-apex).

            ## 2. The foundation: SQL and PL/SQL
            APEX is, to a large extent, "SQL with a UI". People who master joins, analytic functions, transactions and PL/SQL
            packages progress much faster. The **Oracle MyLearn** platform offers free learning paths such as *Oracle SQL
            Explorer* and *Programming with PL/SQL*.

            ## 3. Official APEX courses
            | MyLearn path | Duration | Audience |
            |---|---|---|
            | Oracle APEX Foundations | about 3 hours | Beginners: App Builder, SQL Workshop and a first cloud application. |
            | Oracle APEX Developer Professional | about 22 hours | Beginners and seasoned developers: every component in detail, AI in APEX and guided labs. |

            **Oracle LiveLabs** complements them with step-by-step APEX workshops — from basics to REST, AI and Forms modernization.

            ## 4. Certification
            The official certification is **Oracle APEX Cloud Developer Certified Professional**, earned by passing exam
            **1Z0-771** (*Oracle APEX Cloud Developer Professional*), scheduled through Oracle MyLearn. The *Developer
            Professional* path covers the content. Before booking, check MyLearn for the current exam version, number of
            questions and passing score.

            ## 5. Documentation and references
            - [Official documentation](https://docs.oracle.com/en/database/oracle/apex/): App Builder Guide, PL/SQL and JavaScript
              APIs and each release's **Release Notes** (the *New Features* chapter is required reading).
            - **Universal Theme Reference** ([apex.oracle.com/ut](https://apex.oracle.com/ut)) for the UI.
            - **Sample Apps** and **Starter Apps** in the App Builder Gallery: real code to study.
            - **APEX Diff** ([apex.oracle.com/apexdiff](https://apex.oracle.com/apexdiff)): compares PL/SQL APIs across releases.

            ## 6. Community
            | Resource | What it offers |
            |---|---|
            | APEX Office Hours | Live sessions with the APEX product team. |
            | Official blog (blogs.oracle.com/apex) | Announcements, news and technical articles. |
            | Oracle APEX YouTube channel | Demos, tutorials and event recordings. |
            | Forums and the Ideas app | Technical questions and feature suggestions for the product. |
            | apex.world | Community portal with a plug-in directory and a very active Slack. |
            | #orclapex | The community hashtag on social media. |
            | Joel Kallman Day | Every October the community publishes posts honoring Joel Kallman, one of the creators of APEX. |

            ## Suggested roadmap
            1. **Weeks 1 and 2**: the Foundations path, building apps with the [Create App Wizard](#/topico/create-app-wizard) and
               exploring Page Designer.
            2. **Weeks 3 to 6**: forms, reports, LOVs, validations, Dynamic Actions and
               [session state](#/topico/sessao-e-session-state).
            3. **Months 2 and 3**: security (authentication, authorization, Session State Protection), REST, PL/SQL in packages and
               the JavaScript API.
            4. **After that**: Template Components, plug-ins, CI/CD, generative AI, performance — and the certification.

            :::dica Learn by building
            Pick a real problem (a team spreadsheet, an equipment-loan tracker, a registration form) and take it all the way to
            production. Use Debug mode to understand what happens behind the scenes and read the Sample Apps' code.
            :::

            :::info Keep up with releases
            APEX moves fast: after 24.2 Oracle jumped straight to **26.1** (May 2026), aligning the numbering with Oracle AI
            Database 26ai. When studying older material, check whether the feature has changed — see the
            [release timeline](#/versoes).
            :::
        `
    }
});
