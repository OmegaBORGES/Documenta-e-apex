DOC.topico({
    id: 'rest-data-sources',
    cat: 'integracao',
    nivel: 'intermediario',
    desde: '18.1',
    links: [
        { t: 'App Builder Guide — Managing REST Data Sources', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-REST-data-sources.html' },
        { t: 'App Builder Guide — Managing Data Synchronization', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-data-synchronization.html' },
        { t: 'APEX_REST_SOURCE_SYNC (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_REST_SOURCE_SYNC.html' }
    ],
    relacionados: ['web-credentials', 'apex-exec', 'restful-services-ords', 'rest-enabled-sql', 'automations'],
    pt: {
        titulo: 'REST Data Sources (e sincronização com tabela local)',
        resumo: 'Consuma APIs REST de forma declarativa em relatórios, formulários e gráficos: tipos, Data Profile, operações, paginação e sincronização.',
        tags: ['REST Data Source', 'REST Source', 'Web Source Module', 'API REST', 'Data Profile', 'paginação', 'sincronização', 'APEX_REST_SOURCE_SYNC', 'Remote Server', 'OpenAPI', 'OData', 'APEX_EXEC'],
        conteudo: `
            Uma **REST Data Source** (*Shared Components → REST Data Sources*) descreve uma API REST para que o APEX a use como
            **fonte de dados** em Classic e Interactive Reports, Interactive Grid, Forms, Cards, Charts, Calendar, Map, Faceted
            Search, LOVs e Automations, ou via [APEX_EXEC](#/topico/apex-exec). O recurso surgiu no 18.1 como *Web Source Modules*
            e ganhou o nome atual no 20.2.

            ## Anatomia
            | Parte | Função |
            |---|---|
            | Remote Server | Base da URL (servidor, porta, contexto), compartilhada por várias fontes e trocada por ambiente. |
            | Service URL Path | O restante do endereço do endpoint. |
            | Authentication | Uma [Web Credential](#/topico/web-credentials): Basic, OAuth2, HTTP Header etc. |
            | Operations | Método HTTP + **Database Action**: Fetch Rows, Fetch Single Row, Insert Row, Update Row, Delete Row. |
            | Parameters | Query string, HTTP header, URL pattern, request ou response body. |
            | Data Profile | Como transformar a resposta (JSON, XML ou CSV) em linhas e colunas. |

            ## Tipos
            | Tipo | Destaques |
            |---|---|
            | Simple HTTP | Qualquer API; tudo é configurado manualmente; filtros e ordenação ficam a cargo do APEX. |
            | Oracle REST Data Services | APIs do ORDS: filtros, ordenação e DML delegados ao serviço. |
            | REST Enabled SQL Query | Uma consulta executada num [REST Enabled SQL](#/topico/rest-enabled-sql) remoto (sem DML). |
            | Oracle Cloud Applications (SaaS) REST Service | Aplicações Fusion/SaaS da Oracle, com paginação. |
            | Oracle Cloud Infrastructure (OCI) REST Service | APIs da OCI, como o Object Storage. |
            | OData REST Service | Protocolo OData 4.0.1+: leitura desde o 23.2 e DML no 26.1. |
            | Oracle Cloud Applications (BOSS) REST Service | Endpoints Business Object Spectra Service (consulta e DML). |

            Plug-ins podem acrescentar outros tipos.

            ## Data Profile
            O **Row Selector** aponta para o array que contém as linhas (ex.: «items»). Cada **coluna** tem nome, tipo de dado e um
            **selector** com o caminho do atributo na resposta (ex.: «customer.name»). Marque a(s) coluna(s) de **Primary Key**:
            elas são necessárias para formulários, DML e sincronização no modo Merge. Arrays aninhados viram **Array Columns**, que
            o componente pode "abrir" como linhas.

            ## Criando
            O assistente pede a URL e a autenticação e pode **descobrir** a estrutura: chama o endpoint, analisa a resposta e
            propõe o Data Profile. Desde o 23.1 a descoberta pode usar **OpenAPI/Swagger**; no 21.2 surgiram os **REST Source
            Catalogs**, que desde o 23.2 podem ser criados a partir de um documento OpenAPI.

            ## Paginação
            | Pagination Type | Exemplo de requisição |
            |---|---|
            | No Pagination | Todos os dados vêm na primeira resposta. |
            | Page Size and Fetch Offset | «?limit=100&offset=200» |
            | Page Size and Page Number | «?pageSize=100&page=3» |
            | Page Number | «?page=3» (tamanho fixo definido pela API) |
            | Page Size and Page Token | «?limit=100&token=...» com o token da resposta anterior (Simple HTTP, desde o 24.2) |

            Os nomes dos parâmetros são configuráveis. O APEX busca as páginas conforme o componente precisa; o atributo
            *Allow Fetch All Rows* controla se ele pode buscar tudo (necessário, por exemplo, para contagem total). A fonte também
            tem **cache**: respostas JSON ficam guardadas por um período e evitam chamadas repetidas.

            ## Sincronizando com uma tabela local
            Quando a API é lenta, tem limite de chamadas ou devolve muitos dados, sincronize-a com uma **tabela local** (desde o
            20.2) em *REST Data Sources → (fonte) → Manage Synchronization*:
            - **Synchronize to**: tabela nova (o APEX gera o DDL a partir do Data Profile) ou existente.
            - **Synchronization Type**: **Append** (só insere), **Merge** (atualiza ou insere pela Primary Key) ou **Replace**
              (esvazia e recarrega).
            - **Synchronization Schedule**: sintaxe de calendário do DBMS_SCHEDULER, ex.: «FREQ=HOURLY;INTERVAL=1». O schema de
              parsing precisa do privilégio **CREATE JOB**.
            - **Steps** (uma chamada por conjunto de parâmetros), **Commit Interval**, **HTTP Request Limit** e *rate limiting* simples.

            Depois aponte os relatórios para a tabela: índices, SQL completo e nenhum parse de JSON a cada página.

            ~~~plsql
            -- Dispara a sincronização fora do agendamento (exige sessão APEX)
            begin
                apex_session.create_session(p_app_id => 100, p_page_id => 1, p_username => 'INTEGRACAO');
                apex_rest_source_sync.synchronize_data(
                    p_module_static_id  => 'clientes_crm',
                    p_run_in_background => true);
            end;
            ~~~

            :::atencao Sincronizações chegam desativadas após importar
            Para evitar execuções duplicadas, o APEX **desabilita** as sincronizações ao importar uma aplicação. Reative em
            *Manage Synchronization* ou com «APEX_REST_SOURCE_SYNC.ENABLE» no script de implantação.
            :::

            ## Usando em PL/SQL
            ~~~plsql
            declare
                l_ctx  apex_exec.t_context;
                l_nome pls_integer;
            begin
                l_ctx  := apex_exec.open_rest_source_query(
                              p_static_id => 'clientes_crm',
                              p_max_rows  => 500);
                l_nome := apex_exec.get_column_position(l_ctx, 'NOME');
                while apex_exec.next_row(l_ctx) loop
                    apex_debug.info('Cliente: %s', apex_exec.get_varchar2(l_ctx, l_nome));
                end loop;
                apex_exec.close(l_ctx);
            exception
                when others then
                    apex_exec.close(l_ctx);
                    raise;
            end;
            ~~~

            Para POST, PUT e DELETE use «APEX_EXEC.EXECUTE_REST_SOURCE» (operação + parâmetros) ou o processo declarativo
            **Invoke API**, que aceita REST Sources desde o 23.1.

            :::novo Novidades do 26.1
            - **Invocation Scope**: escopo OAuth definido por chamada (o escopo da credencial passa a ser o padrão).
            - Parâmetros com **valor dinâmico**: estático, item, consulta SQL, expressão ou function body (PL/SQL ou JavaScript).
            - **Template Directives** no *Request Body Template*, para montar JSON com propriedades condicionais.
            - **OData** com insert, update e delete.
            :::
        `
    },
    en: {
        titulo: 'REST Data Sources (and syncing to a local table)',
        resumo: 'Consume REST APIs declaratively in reports, forms and charts: types, Data Profiles, operations, pagination and synchronization.',
        tags: ['REST Data Source', 'REST Source', 'Web Source Module', 'REST API', 'Data Profile', 'pagination', 'synchronization', 'APEX_REST_SOURCE_SYNC', 'Remote Server', 'OpenAPI', 'OData', 'APEX_EXEC'],
        conteudo: `
            A **REST Data Source** (*Shared Components → REST Data Sources*) describes a REST API so APEX can use it as a **data
            source** for Classic and Interactive Reports, Interactive Grid, Forms, Cards, Charts, Calendar, Map, Faceted Search,
            LOVs and Automations, or through [APEX_EXEC](#/topico/apex-exec). The feature arrived in 18.1 as *Web Source Modules*
            and got its current name in 20.2.

            ## Anatomy
            | Part | Role |
            |---|---|
            | Remote Server | URL base (server, port, context), shared by several sources and switched per environment. |
            | Service URL Path | The rest of the endpoint address. |
            | Authentication | A [Web Credential](#/topico/web-credentials): Basic, OAuth2, HTTP Header, etc. |
            | Operations | HTTP method + **Database Action**: Fetch Rows, Fetch Single Row, Insert Row, Update Row, Delete Row. |
            | Parameters | Query string, HTTP header, URL pattern, request or response body. |
            | Data Profile | How the response (JSON, XML or CSV) becomes rows and columns. |

            ## Types
            | Type | Highlights |
            |---|---|
            | Simple HTTP | Any API; everything configured by hand; filtering and sorting done by APEX. |
            | Oracle REST Data Services | ORDS APIs: filtering, sorting and DML delegated to the service. |
            | REST Enabled SQL Query | A query run on a remote [REST Enabled SQL](#/topico/rest-enabled-sql) service (no DML). |
            | Oracle Cloud Applications (SaaS) REST Service | Oracle Fusion/SaaS applications, with pagination. |
            | Oracle Cloud Infrastructure (OCI) REST Service | OCI APIs such as Object Storage. |
            | OData REST Service | OData 4.0.1+: read-only since 23.2, DML in 26.1. |
            | Oracle Cloud Applications (BOSS) REST Service | Business Object Spectra Service endpoints (query and DML). |

            Plug-ins can add more types.

            ## Data Profile
            The **Row Selector** points to the array holding the rows (e.g. «items»). Each **column** has a name, a data type and a
            **selector** with the attribute path in the response (e.g. «customer.name»). Flag the **Primary Key** column(s): they
            are required for forms, DML and Merge synchronization. Nested arrays become **Array Columns**, which a component can
            "unnest" into rows.

            ## Creating one
            The wizard asks for the URL and authentication and can **discover** the structure: it calls the endpoint, analyzes the
            response and proposes a Data Profile. Since 23.1 discovery can use **OpenAPI/Swagger**; **REST Source Catalogs**
            arrived in 21.2 and, since 23.2, can be created from an OpenAPI document.

            ## Pagination
            | Pagination Type | Request example |
            |---|---|
            | No Pagination | All data comes in the first response. |
            | Page Size and Fetch Offset | «?limit=100&offset=200» |
            | Page Size and Page Number | «?pageSize=100&page=3» |
            | Page Number | «?page=3» (fixed page size set by the API) |
            | Page Size and Page Token | «?limit=100&token=...» with the token from the previous response (Simple HTTP, since 24.2) |

            Parameter names are configurable. APEX fetches pages as the component needs them; the *Allow Fetch All Rows* attribute
            controls whether it may fetch everything (needed, for instance, for a total row count). Sources also have a **cache**:
            JSON responses are kept for a period, saving repeated calls.

            ## Syncing to a local table
            When the API is slow, rate-limited or returns lots of data, sync it to a **local table** (since 20.2) under
            *REST Data Sources → (source) → Manage Synchronization*:
            - **Synchronize to**: a new table (APEX generates the DDL from the Data Profile) or an existing one.
            - **Synchronization Type**: **Append** (insert only), **Merge** (update or insert by Primary Key) or **Replace** (empty
              and reload).
            - **Synchronization Schedule**: DBMS_SCHEDULER calendar syntax, e.g. «FREQ=HOURLY;INTERVAL=1». The parsing schema
              needs the **CREATE JOB** privilege.
            - **Steps** (one call per parameter set), **Commit Interval**, **HTTP Request Limit** and simple *rate limiting*.

            Then point reports at the table: indexes, full SQL and no JSON parsing on every page view.

            ~~~plsql
            -- Trigger a synchronization outside the schedule (requires an APEX session)
            begin
                apex_session.create_session(p_app_id => 100, p_page_id => 1, p_username => 'INTEGRATION');
                apex_rest_source_sync.synchronize_data(
                    p_module_static_id  => 'crm_customers',
                    p_run_in_background => true);
            end;
            ~~~

            :::atencao Synchronizations are disabled after import
            To avoid duplicate runs, APEX **disables** synchronizations when an application is imported. Re-enable them in
            *Manage Synchronization* or with «APEX_REST_SOURCE_SYNC.ENABLE» in your deployment script.
            :::

            ## Using it from PL/SQL
            ~~~plsql
            declare
                l_ctx  apex_exec.t_context;
                l_name pls_integer;
            begin
                l_ctx  := apex_exec.open_rest_source_query(
                              p_static_id => 'crm_customers',
                              p_max_rows  => 500);
                l_name := apex_exec.get_column_position(l_ctx, 'NAME');
                while apex_exec.next_row(l_ctx) loop
                    apex_debug.info('Customer: %s', apex_exec.get_varchar2(l_ctx, l_name));
                end loop;
                apex_exec.close(l_ctx);
            exception
                when others then
                    apex_exec.close(l_ctx);
                    raise;
            end;
            ~~~

            For POST, PUT and DELETE use «APEX_EXEC.EXECUTE_REST_SOURCE» (operation + parameters) or the declarative **Invoke
            API** process, which supports REST Sources since 23.1.

            :::novo New in 26.1
            - **Invocation Scope**: OAuth scope set per call (the credential scope becomes the default).
            - **Dynamic parameter values**: static, item, SQL query, expression or function body (PL/SQL or JavaScript).
            - **Template Directives** in the *Request Body Template*, to build JSON with conditional properties.
            - **OData** with insert, update and delete.
            :::
        `
    }
});

DOC.topico({
    id: 'restful-services-ords',
    cat: 'integracao',
    nivel: 'intermediario',
    desde: '4.2',
    links: [
        { t: 'ORDS Developer\'s Guide — Developing ORDS Applications', u: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/26.1/orddg/developing-REST-applications.html' },
        { t: 'ORDS PL/SQL Package Reference', u: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/26.1/orddg/ORDS-reference.html' },
        { t: 'ORDS_SECURITY PL/SQL Package Reference', u: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/26.1/orddg/ords_security-pl-sql-package-reference.html' }
    ],
    relacionados: ['ords', 'rest-data-sources', 'web-credentials', 'sql-workshop', 'rest-enabled-sql'],
    pt: {
        titulo: 'Criando APIs REST com ORDS (módulos, handlers e AutoREST)',
        resumo: 'Publique dados do banco como APIs REST: habilitar o schema, AutoREST, módulos, templates e handlers em PL/SQL, e proteção com OAuth2.',
        tags: ['ORDS', 'RESTful Services', 'API REST', 'ORDS.DEFINE_MODULE', 'ORDS.DEFINE_HANDLER', 'ORDS.ENABLE_SCHEMA', 'AutoREST', 'ORDS.ENABLE_OBJECT', 'OAuth2', 'ORDS_SECURITY', 'Database Actions'],
        conteudo: `
            O mesmo **ORDS** que serve as páginas do APEX também publica **APIs REST** sobre o banco. Há dois estilos:
            **AutoREST** (um objeto vira API com uma chamada) e **serviços customizados**, organizados em
            **módulo → template → handler**. A publicação de RESTful Services surgiu no APEX 4.2, junto com o APEX Listener 2.0.

            :::atencao RESTful Services do SQL Workshop: deprecated no 26.1
            A tela *SQL Workshop → RESTful Services* está **deprecated** no APEX 26.1 e será removida numa versão futura. A
            definição declarativa continua disponível no **Database Actions** (SQL Developer Web), em *REST*; também dá para usar o
            pacote PL/SQL «ORDS», o SQLcl ou o SQL Developer. Os serviços existentes pertencem ao ORDS e continuam funcionando —
            muda só a ferramenta. (Desde o 22.1, os antigos serviços REST "baseados no APEX" estão desuportados.)
            :::

            ## 1. Habilitar o schema
            ~~~plsql
            begin
                ords.enable_schema(
                    p_enabled             => true,
                    p_schema              => 'VENDAS',
                    p_url_mapping_type    => 'BASE_PATH',
                    p_url_mapping_pattern => 'vendas',   -- alias usado na URL
                    p_auto_rest_auth      => false);
                commit;
            end;
            /
            ~~~

            As APIs ficarão em «https://servidor/ords/vendas/...».

            ## 2. AutoREST
            ~~~plsql
            begin
                ords.enable_object(
                    p_enabled        => true,
                    p_schema         => 'VENDAS',
                    p_object         => 'CLIENTES',
                    p_object_type    => 'TABLE',
                    p_object_alias   => 'clientes',
                    p_auto_rest_auth => true);   -- exige autorização
                commit;
            end;
            /
            ~~~

            A tabela ganha GET (lista paginada, item pela chave e filtros com «?q=»), POST, PUT e DELETE em
            «/ords/vendas/clientes/». Também funciona com views, procedures, functions e packages. É ótimo para integrações
            internas; para contratos públicos prefira serviços customizados, que não expõem a estrutura da tabela.

            ## 3. Serviço customizado
            ~~~plsql
            begin
                ords.define_module(
                    p_module_name    => 'api.pedidos',
                    p_base_path      => '/pedidos/',
                    p_items_per_page => 25);

                ords.define_template(p_module_name => 'api.pedidos', p_pattern => '.');
                ords.define_template(p_module_name => 'api.pedidos', p_pattern => ':id');

                -- GET /pedidos/  (lista paginada)
                ords.define_handler(
                    p_module_name => 'api.pedidos',
                    p_pattern     => '.',
                    p_method      => 'GET',
                    p_source_type => ords.source_type_collection_feed,
                    p_source      => 'select id, cliente, status, total from pedidos order by id');

                -- GET /pedidos/:id  (um registro)
                ords.define_handler(
                    p_module_name => 'api.pedidos',
                    p_pattern     => ':id',
                    p_method      => 'GET',
                    p_source_type => ords.source_type_collection_item,
                    p_source      => 'select id, cliente, status, total from pedidos where id = :id');

                -- POST /pedidos/  (cria a partir de um JSON)
                ords.define_handler(
                    p_module_name   => 'api.pedidos',
                    p_pattern       => '.',
                    p_method        => 'POST',
                    p_mimes_allowed => 'application/json',
                    p_source_type   => ords.source_type_plsql,
                    p_source        => q'[
                        declare
                            l_doc json_object_t := json_object_t.parse(:body_text);
                        begin
                            insert into pedidos (cliente, status, total)
                            values (l_doc.get_string('cliente'), 'NOVO', l_doc.get_number('total'));
                            :status_code := 201;
                        end;]');
                commit;
            end;
            /
            ~~~

            | Source type | Uso |
            |---|---|
            | «source_type_collection_feed» | GET de uma consulta, JSON paginado |
            | «source_type_collection_item» | GET de uma única linha |
            | «source_type_query» / «source_type_csv_query» | Consulta em JSON (formato legado) ou CSV |
            | «source_type_plsql» | Bloco PL/SQL (POST, PUT, DELETE) |
            | «source_type_media» | Conteúdo binário com o Content-Type correto |
            | «source_type_mle_javascript» | JavaScript MLE (banco 23ai ou superior) |

            No PL/SQL do handler existem parâmetros implícitos como «:body» (BLOB), «:body_text» (CLOB), «:status_code» e
            «:current_user», além dos parâmetros do padrão da URL («:id»).

            ## 4. Proteger com OAuth2
            ~~~plsql
            declare
                l_roles    owa.vc_arr;
                l_patterns owa.vc_arr;
            begin
                ords.create_role(p_role_name => 'pedidos_api');
                l_roles(1)    := 'pedidos_api';
                l_patterns(1) := '/pedidos/*';
                ords.define_privilege(
                    p_privilege_name => 'pedidos.priv',
                    p_roles          => l_roles,
                    p_patterns       => l_patterns,
                    p_label          => 'API de pedidos');
                commit;
            end;
            /
            ~~~

            Depois registre um cliente OAuth (fluxo *client credentials*) e conceda o papel:

            ~~~plsql
            declare
                l_cred ords_types.t_client_credentials;
            begin
                l_cred := ords_security.register_client(
                              p_name          => 'erp_integracao',
                              p_grant_type    => 'client_credentials',
                              p_support_email => 'ti@empresa.com',
                              p_description   => 'Integração do ERP',
                              p_client_secret => ords_types.oauth_client_secret(p_secret => 'gere-um-segredo-forte'));
                ords_security.grant_client_role(
                    p_client_name => 'erp_integracao',
                    p_role_name   => 'pedidos_api');
                commit;
                dbms_output.put_line('client_id: ' || l_cred.client_key.client_id);
            end;
            /
            ~~~

            O consumidor obtém o token e chama a API:

            ~~~bash
            curl -s -u CLIENT_ID:CLIENT_SECRET -d "grant_type=client_credentials" https://servidor/ords/vendas/oauth/token
            curl -s -H "Authorization: Bearer ACCESS_TOKEN" https://servidor/ords/vendas/pedidos/42
            ~~~

            :::info O pacote OAUTH foi substituído
            O pacote «OAUTH» (e «OAUTH.CREATE_CLIENT», comum em tutoriais antigos) foi deprecated no ORDS 24.3 e desuportado a
            partir do ORDS 25.3. Use «ORDS_SECURITY» — ou crie o cliente pelo Database Actions.
            :::

            :::dica Consumindo no APEX
            Para usar essa API em outra aplicação, crie uma [REST Data Source](#/topico/rest-data-sources) do tipo **Oracle REST
            Data Services** com uma [Web Credential](#/topico/web-credentials) *OAuth2 Client Credentials*: filtros e paginação
            são delegados ao ORDS e o token é renovado automaticamente.
            :::
        `
    },
    en: {
        titulo: 'Building REST APIs with ORDS (modules, handlers and AutoREST)',
        resumo: 'Publish database data as REST APIs: enable the schema, AutoREST, modules, templates and handlers in PL/SQL, and OAuth2 protection.',
        tags: ['ORDS', 'RESTful Services', 'REST API', 'ORDS.DEFINE_MODULE', 'ORDS.DEFINE_HANDLER', 'ORDS.ENABLE_SCHEMA', 'AutoREST', 'ORDS.ENABLE_OBJECT', 'OAuth2', 'ORDS_SECURITY', 'Database Actions'],
        conteudo: `
            The same **ORDS** that serves APEX pages also publishes **REST APIs** on top of the database. There are two styles:
            **AutoREST** (an object becomes an API with one call) and **custom services**, organized as
            **module → template → handler**. Publishing RESTful Services first appeared in APEX 4.2, alongside APEX Listener 2.0.

            :::atencao SQL Workshop RESTful Services: deprecated in 26.1
            The *SQL Workshop → RESTful Services* screen is **deprecated** in APEX 26.1 and will be removed in a future release.
            Declarative definition remains available in **Database Actions** (SQL Developer Web), under *REST*; you can also use
            the «ORDS» PL/SQL package, SQLcl or SQL Developer. Existing services belong to ORDS and keep working — only the tool
            changes. (Since 22.1, the old "APEX-based" REST services are desupported.)
            :::

            ## 1. Enable the schema
            ~~~plsql
            begin
                ords.enable_schema(
                    p_enabled             => true,
                    p_schema              => 'SALES',
                    p_url_mapping_type    => 'BASE_PATH',
                    p_url_mapping_pattern => 'sales',   -- alias used in the URL
                    p_auto_rest_auth      => false);
                commit;
            end;
            /
            ~~~

            APIs will live under «https://server/ords/sales/...».

            ## 2. AutoREST
            ~~~plsql
            begin
                ords.enable_object(
                    p_enabled        => true,
                    p_schema         => 'SALES',
                    p_object         => 'CUSTOMERS',
                    p_object_type    => 'TABLE',
                    p_object_alias   => 'customers',
                    p_auto_rest_auth => true);   -- requires authorization
                commit;
            end;
            /
            ~~~

            The table gets GET (paginated list, item by key and «?q=» filters), POST, PUT and DELETE at «/ords/sales/customers/».
            It also works for views, procedures, functions and packages. Great for internal integrations; for public contracts,
            prefer custom services, which do not expose the table structure.

            ## 3. Custom service
            ~~~plsql
            begin
                ords.define_module(
                    p_module_name    => 'api.orders',
                    p_base_path      => '/orders/',
                    p_items_per_page => 25);

                ords.define_template(p_module_name => 'api.orders', p_pattern => '.');
                ords.define_template(p_module_name => 'api.orders', p_pattern => ':id');

                -- GET /orders/  (paginated list)
                ords.define_handler(
                    p_module_name => 'api.orders',
                    p_pattern     => '.',
                    p_method      => 'GET',
                    p_source_type => ords.source_type_collection_feed,
                    p_source      => 'select id, customer, status, total from orders order by id');

                -- GET /orders/:id  (single record)
                ords.define_handler(
                    p_module_name => 'api.orders',
                    p_pattern     => ':id',
                    p_method      => 'GET',
                    p_source_type => ords.source_type_collection_item,
                    p_source      => 'select id, customer, status, total from orders where id = :id');

                -- POST /orders/  (create from JSON)
                ords.define_handler(
                    p_module_name   => 'api.orders',
                    p_pattern       => '.',
                    p_method        => 'POST',
                    p_mimes_allowed => 'application/json',
                    p_source_type   => ords.source_type_plsql,
                    p_source        => q'[
                        declare
                            l_doc json_object_t := json_object_t.parse(:body_text);
                        begin
                            insert into orders (customer, status, total)
                            values (l_doc.get_string('customer'), 'NEW', l_doc.get_number('total'));
                            :status_code := 201;
                        end;]');
                commit;
            end;
            /
            ~~~

            | Source type | Use |
            |---|---|
            | «source_type_collection_feed» | GET from a query, paginated JSON |
            | «source_type_collection_item» | GET of a single row |
            | «source_type_query» / «source_type_csv_query» | Query as JSON (legacy format) or CSV |
            | «source_type_plsql» | PL/SQL block (POST, PUT, DELETE) |
            | «source_type_media» | Binary content with the right Content-Type |
            | «source_type_mle_javascript» | MLE JavaScript (database 23ai or later) |

            Handler PL/SQL has implicit parameters such as «:body» (BLOB), «:body_text» (CLOB), «:status_code» and
            «:current_user», plus the URL pattern parameters («:id»).

            ## 4. Protect it with OAuth2
            ~~~plsql
            declare
                l_roles    owa.vc_arr;
                l_patterns owa.vc_arr;
            begin
                ords.create_role(p_role_name => 'orders_api');
                l_roles(1)    := 'orders_api';
                l_patterns(1) := '/orders/*';
                ords.define_privilege(
                    p_privilege_name => 'orders.priv',
                    p_roles          => l_roles,
                    p_patterns       => l_patterns,
                    p_label          => 'Orders API');
                commit;
            end;
            /
            ~~~

            Then register an OAuth client (*client credentials* flow) and grant it the role:

            ~~~plsql
            declare
                l_cred ords_types.t_client_credentials;
            begin
                l_cred := ords_security.register_client(
                              p_name          => 'erp_integration',
                              p_grant_type    => 'client_credentials',
                              p_support_email => 'it@company.com',
                              p_description   => 'ERP integration',
                              p_client_secret => ords_types.oauth_client_secret(p_secret => 'generate-a-strong-secret'));
                ords_security.grant_client_role(
                    p_client_name => 'erp_integration',
                    p_role_name   => 'orders_api');
                commit;
                dbms_output.put_line('client_id: ' || l_cred.client_key.client_id);
            end;
            /
            ~~~

            The consumer gets a token and calls the API:

            ~~~bash
            curl -s -u CLIENT_ID:CLIENT_SECRET -d "grant_type=client_credentials" https://server/ords/sales/oauth/token
            curl -s -H "Authorization: Bearer ACCESS_TOKEN" https://server/ords/sales/orders/42
            ~~~

            :::info The OAUTH package was replaced
            The «OAUTH» package (and «OAUTH.CREATE_CLIENT», common in older tutorials) was deprecated in ORDS 24.3 and is
            desupported starting with ORDS 25.3. Use «ORDS_SECURITY» — or create the client in Database Actions.
            :::

            :::dica Consuming it from APEX
            To use this API in another application, create a [REST Data Source](#/topico/rest-data-sources) of type **Oracle REST
            Data Services** with an *OAuth2 Client Credentials* [Web Credential](#/topico/web-credentials): filtering and
            pagination are delegated to ORDS and the token is renewed automatically.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-web-service',
    cat: 'integracao',
    nivel: 'intermediario',
    links: [
        { t: 'APEX_WEB_SERVICE (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_WEB_SERVICE.html' },
        { t: 'Installation Guide — Enabling Network Services in Oracle Database', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/enabling-network-services.html' },
        { t: 'Administration Guide — Configuring Wallet Information', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeadm/configuring-wallet-information.html' }
    ],
    relacionados: ['web-credentials', 'rest-data-sources', 'apex-json', 'administracao-instancia', 'tratamento-de-erros'],
    pt: {
        titulo: 'Consumindo APIs com APEX_WEB_SERVICE',
        resumo: 'Chame qualquer API HTTP a partir do PL/SQL com MAKE_REST_REQUEST, cabeçalhos e Web Credentials, e resolva erros de ACL e certificado.',
        tags: ['APEX_WEB_SERVICE', 'MAKE_REST_REQUEST', 'REST', 'HTTP', 'g_status_code', 'set_request_headers', 'ORA-24247', 'ORA-29024', 'wallet', 'ACL', 'UTL_HTTP', 'JSON_TABLE', 'APEX_HTTP'],
        conteudo: `
            «APEX_WEB_SERVICE» é o pacote para chamar **qualquer API HTTP** a partir de PL/SQL: processos de página, Ajax Callbacks,
            Automations, jobs. Por baixo ele usa o «UTL_HTTP», mas acrescenta o que falta: Web Credentials com OAuth2 automático,
            proxy e wallet configurados na instância, cabeçalhos, cookies e funções de parse.

            :::info E o APEX_HTTP?
            O pacote «APEX_HTTP» (24.1) tem outro objetivo: enviar arquivos **para o navegador** com «APEX_HTTP.DOWNLOAD». Para
            chamadas de saída, use «APEX_WEB_SERVICE». E se a mesma API alimenta relatórios e formulários, prefira uma
            [REST Data Source](#/topico/rest-data-sources).
            :::

            ## MAKE_REST_REQUEST
            | Parâmetro | Para quê |
            |---|---|
            | «p_url», «p_http_method» | Endpoint e método (GET, POST, PUT, DELETE, HEAD) |
            | «p_body» / «p_body_blob» | Corpo em texto (CLOB) ou binário (BLOB) |
            | «p_parm_name», «p_parm_value» | Pares nome/valor em arrays |
            | «p_credential_static_id» | Web Credential a usar (Basic, OAuth2, HTTP Header...) |
            | «p_token_url» | URL do token em fluxos OAuth2 |
            | «p_oauth_scope» | Escopo OAuth desta chamada (novo no 26.1) |
            | «p_transfer_timeout» | Tempo máximo em segundos (padrão 180) |
            | «p_wallet_path», «p_wallet_pwd», «p_https_host» | Sobrepõem a wallet configurada na instância |

            A função devolve um CLOB («MAKE_REST_REQUEST_B» devolve BLOB). Depois da chamada, consulte
            «apex_web_service.g_status_code», «g_reason_phrase» e os cabeçalhos de resposta em «g_headers».

            ## GET com credencial e parse do JSON
            ~~~plsql
            declare
                l_resposta clob;
            begin
                apex_web_service.set_request_headers(
                    p_name_01  => 'Accept',
                    p_value_01 => 'application/json');

                l_resposta := apex_web_service.make_rest_request(
                                  p_url                  => 'https://api.exemplo.com/v1/clientes',
                                  p_http_method          => 'GET',
                                  p_parm_name            => apex_string.string_to_table('status:limite'),
                                  p_parm_value           => apex_string.string_to_table('ATIVO:50'),
                                  p_credential_static_id => 'API_EXEMPLO');

                if apex_web_service.g_status_code != 200 then
                    raise_application_error(-20001, 'API respondeu ' || apex_web_service.g_status_code
                                                   || ' ' || apex_web_service.g_reason_phrase);
                end if;

                for r in (select jt.id, jt.nome
                            from json_table(l_resposta, '$.items[*]'
                                     columns (id   number        path '$.id',
                                              nome varchar2(200) path '$.nome')) jt) loop
                    apex_debug.info('Cliente %s: %s', r.id, r.nome);
                end loop;
            end;
            ~~~

            ## POST com corpo JSON
            ~~~plsql
            declare
                l_corpo    clob;
                l_resposta clob;
            begin
                select json_object('nome'  value :P10_NOME,
                                   'email' value :P10_EMAIL
                                   returning clob)
                  into l_corpo
                  from dual;

                apex_web_service.set_request_headers(
                    p_name_01  => 'Content-Type',
                    p_value_01 => 'application/json');

                l_resposta := apex_web_service.make_rest_request(
                                  p_url                  => 'https://api.exemplo.com/v1/clientes',
                                  p_http_method          => 'POST',
                                  p_body                 => l_corpo,
                                  p_credential_static_id => 'API_EXEMPLO');

                if apex_web_service.g_status_code not in (200, 201) then
                    raise_application_error(-20002, 'Falha ao criar cliente: ' || substr(l_resposta, 1, 500));
                end if;

                for i in 1 .. apex_web_service.g_headers.count loop
                    if lower(apex_web_service.g_headers(i).name) = 'location' then
                        apex_debug.info('Criado em %s', apex_web_service.g_headers(i).value);
                    end if;
                end loop;
            end;
            ~~~

            Os cabeçalhos ficam em «g_request_headers» até serem trocados: «set_request_headers» limpa a lista por padrão
            («p_reset => true») e «clear_request_headers» a esvazia.

            ## Erros clássicos
            | Erro | Causa | Solução |
            |---|---|---|
            | ORA-24247: network access denied by access control list (ACL) | O banco não tem permissão de rede para o host | ACL com «DBMS_NETWORK_ACL_ADMIN» (abaixo) |
            | ORA-29024: Certificate validation failure | O certificado do servidor não é confiável | Wallet com as CAs; no 26ai a configuração de wallet pode ficar vazia |
            | ORA-28759: failure to open file | Caminho da wallet errado ou sem permissão | *Instance Settings → Wallet* («file:/caminho») |
            | ORA-29273: HTTP request failed | Erro genérico do UTL_HTTP | Leia o próximo erro da pilha (em geral um dos acima) |
            | ORA-29276: transfer timeout | Servidor lento | Aumente «p_transfer_timeout» |
            | Credential is not allowed to be used for this URL endpoint | URL fora de *Valid for URLs* | Ajuste a Web Credential |

            ~~~plsql
            -- Como DBA: permite ao APEX conectar em api.exemplo.com:443
            begin
                dbms_network_acl_admin.append_host_ace(
                    host       => 'api.exemplo.com',
                    lower_port => 443,
                    upper_port => 443,
                    ace        => xs$ace_type(
                                      privilege_list => xs$name_list('connect'),
                                      principal_name => 'APEX_260100',
                                      principal_type => xs_acl.ptype_db));
            end;
            /
            ~~~

            A permissão para o schema do APEX («APEX_260100» no 26.1) vale para todas as aplicações da instância; o schema de
            parsing só precisa dela se usar «UTL_HTTP» diretamente ou credenciais do banco. No Autonomous Database não é preciso
            configurar ACL.

            :::dica Fora de uma página
            Em jobs ou no SQLcl, defina o workspace antes de usar Web Credentials: «apex_util.set_workspace('MEU_WS')» — necessário
            quando o usuário do banco está mapeado a mais de um workspace.
            :::
        `
    },
    en: {
        titulo: 'Calling APIs with APEX_WEB_SERVICE',
        resumo: 'Call any HTTP API from PL/SQL with MAKE_REST_REQUEST, headers and Web Credentials, and fix ACL and certificate errors.',
        tags: ['APEX_WEB_SERVICE', 'MAKE_REST_REQUEST', 'REST', 'HTTP', 'g_status_code', 'set_request_headers', 'ORA-24247', 'ORA-29024', 'wallet', 'ACL', 'UTL_HTTP', 'JSON_TABLE', 'APEX_HTTP'],
        conteudo: `
            «APEX_WEB_SERVICE» is the package for calling **any HTTP API** from PL/SQL: page processes, Ajax Callbacks,
            Automations, jobs. Under the hood it uses «UTL_HTTP», but it adds what is missing: Web Credentials with automatic
            OAuth2, the instance proxy and wallet, headers, cookies and parsing helpers.

            :::info What about APEX_HTTP?
            The «APEX_HTTP» package (24.1) has a different job: sending files **to the browser** with «APEX_HTTP.DOWNLOAD». For
            outbound calls, use «APEX_WEB_SERVICE». And if the same API feeds reports and forms, prefer a
            [REST Data Source](#/topico/rest-data-sources).
            :::

            ## MAKE_REST_REQUEST
            | Parameter | Purpose |
            |---|---|
            | «p_url», «p_http_method» | Endpoint and method (GET, POST, PUT, DELETE, HEAD) |
            | «p_body» / «p_body_blob» | Text (CLOB) or binary (BLOB) body |
            | «p_parm_name», «p_parm_value» | Name/value pairs as arrays |
            | «p_credential_static_id» | Web Credential to use (Basic, OAuth2, HTTP Header...) |
            | «p_token_url» | Token URL for OAuth2 flows |
            | «p_oauth_scope» | OAuth scope for this call (new in 26.1) |
            | «p_transfer_timeout» | Maximum seconds to wait (default 180) |
            | «p_wallet_path», «p_wallet_pwd», «p_https_host» | Override the instance wallet |

            The function returns a CLOB («MAKE_REST_REQUEST_B» returns a BLOB). After the call, check
            «apex_web_service.g_status_code», «g_reason_phrase» and the response headers in «g_headers».

            ## GET with a credential and JSON parsing
            ~~~plsql
            declare
                l_response clob;
            begin
                apex_web_service.set_request_headers(
                    p_name_01  => 'Accept',
                    p_value_01 => 'application/json');

                l_response := apex_web_service.make_rest_request(
                                  p_url                  => 'https://api.example.com/v1/customers',
                                  p_http_method          => 'GET',
                                  p_parm_name            => apex_string.string_to_table('status:limit'),
                                  p_parm_value           => apex_string.string_to_table('ACTIVE:50'),
                                  p_credential_static_id => 'EXAMPLE_API');

                if apex_web_service.g_status_code != 200 then
                    raise_application_error(-20001, 'API returned ' || apex_web_service.g_status_code
                                                   || ' ' || apex_web_service.g_reason_phrase);
                end if;

                for r in (select jt.id, jt.name
                            from json_table(l_response, '$.items[*]'
                                     columns (id   number        path '$.id',
                                              name varchar2(200) path '$.name')) jt) loop
                    apex_debug.info('Customer %s: %s', r.id, r.name);
                end loop;
            end;
            ~~~

            ## POST with a JSON body
            ~~~plsql
            declare
                l_body     clob;
                l_response clob;
            begin
                select json_object('name'  value :P10_NAME,
                                   'email' value :P10_EMAIL
                                   returning clob)
                  into l_body
                  from dual;

                apex_web_service.set_request_headers(
                    p_name_01  => 'Content-Type',
                    p_value_01 => 'application/json');

                l_response := apex_web_service.make_rest_request(
                                  p_url                  => 'https://api.example.com/v1/customers',
                                  p_http_method          => 'POST',
                                  p_body                 => l_body,
                                  p_credential_static_id => 'EXAMPLE_API');

                if apex_web_service.g_status_code not in (200, 201) then
                    raise_application_error(-20002, 'Could not create customer: ' || substr(l_response, 1, 500));
                end if;

                for i in 1 .. apex_web_service.g_headers.count loop
                    if lower(apex_web_service.g_headers(i).name) = 'location' then
                        apex_debug.info('Created at %s', apex_web_service.g_headers(i).value);
                    end if;
                end loop;
            end;
            ~~~

            Headers stay in «g_request_headers» until replaced: «set_request_headers» clears the list by default
            («p_reset => true») and «clear_request_headers» empties it.

            ## Classic errors
            | Error | Cause | Fix |
            |---|---|---|
            | ORA-24247: network access denied by access control list (ACL) | The database has no network permission for the host | ACL with «DBMS_NETWORK_ACL_ADMIN» (below) |
            | ORA-29024: Certificate validation failure | The server certificate is not trusted | Wallet with the CAs; on 26ai the wallet setting can stay empty |
            | ORA-28759: failure to open file | Wrong wallet path or no permission | *Instance Settings → Wallet* («file:/path») |
            | ORA-29273: HTTP request failed | Generic UTL_HTTP error | Read the next error in the stack (usually one of the above) |
            | ORA-29276: transfer timeout | Slow server | Increase «p_transfer_timeout» |
            | Credential is not allowed to be used for this URL endpoint | URL outside *Valid for URLs* | Adjust the Web Credential |

            ~~~plsql
            -- As DBA: allow APEX to connect to api.example.com:443
            begin
                dbms_network_acl_admin.append_host_ace(
                    host       => 'api.example.com',
                    lower_port => 443,
                    upper_port => 443,
                    ace        => xs$ace_type(
                                      privilege_list => xs$name_list('connect'),
                                      principal_name => 'APEX_260100',
                                      principal_type => xs_acl.ptype_db));
            end;
            /
            ~~~

            Granting it to the APEX schema («APEX_260100» in 26.1) covers every application in the instance; the parsing schema
            only needs it when using «UTL_HTTP» directly or database credentials. On Autonomous Database no ACL setup is needed.

            :::dica Outside a page
            In jobs or SQLcl, set the workspace before using Web Credentials: «apex_util.set_workspace('MY_WS')» — required when
            the database user is mapped to more than one workspace.
            :::
        `
    }
});

DOC.topico({
    id: 'web-credentials',
    cat: 'integracao',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Managing Web Credentials', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-credentials.html' },
        { t: 'App Builder Guide — Understanding Web Credentials', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-web-credentials.html' },
        { t: 'APEX_CREDENTIAL (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_CREDENTIAL.html' }
    ],
    relacionados: ['rest-data-sources', 'apex-web-service', 'social-sign-in-e-saml', 'ambientes-dev-test-prod', 'rest-enabled-sql'],
    pt: {
        titulo: 'Web Credentials e OAuth2',
        resumo: 'Guarde segredos de APIs criptografados no workspace, use OAuth2 com renovação automática de tokens e restrinja o uso com Valid for URLs.',
        tags: ['Web Credentials', 'credenciais', 'OAuth2', 'client credentials', 'token', 'APEX_CREDENTIAL', 'Valid for URLs', 'API key', 'HTTP Header', 'Basic Authentication', 'OAuth2 Password Flow', 'segredos'],
        conteudo: `
            **Web Credentials** guardam usuário e senha, client ID e secret, chaves de API e chaves privadas de forma
            **criptografada** no workspace, para que nada disso apareça em código, itens ou exports. Ficam em *Workspace Utilities
            → Web Credentials* ou *Shared Components → Credentials* e são usadas por REST Data Sources, Remote Servers, REST
            Enabled SQL, Social Sign-In, «APEX_WEB_SERVICE» e outros recursos. Os segredos **não podem ser lidos de volta** em
            texto claro — nem pelo desenvolvedor.

            ## Tipos de autenticação
            | Tipo | Como funciona |
            |---|---|
            | Basic Authentication | Usuário e senha em Base64 no cabeçalho «Authorization». |
            | OAuth2 Client Credentials | Troca client ID + secret por um access token na URL do token e renova quando expira. |
            | OAuth2 Password Flow (26.1) | Client ID/secret opcionais + usuário e senha, guardados numa credencial Basic associada. |
            | HTTP Header | Nome da credencial = nome do cabeçalho; segredo = valor (ex.: «x-api-key»). |
            | URL Query String | Acrescenta «?nome=valor» à URL; útil para API keys, mas proxies podem registrar a URL. |
            | OCI Native Authentication | Assina as requisições para as APIs da Oracle Cloud Infrastructure. |
            | Signed User Assertion / User Assertion Signing Certificate | Asserções JWT assinadas com a identidade do usuário (cliente *Trusted* no IdP). |
            | Key Pair / Certificate Pair | Pares de chaves; o Certificate Pair é usado com SAML. |

            HTTP Header e URL Query String existem desde o 20.2, e o APEX não grava esses segredos no log de debug.

            ## Valid for URLs
            Preencha **Valid for URLs** com os prefixos permitidos, um por linha. Se a credencial for usada com outra URL — por
            engano ou de propósito —, o APEX recusa com *Credential is not allowed to be used for this URL endpoint*. A
            comparação é por prefixo: «https://api.exemplo.com/v1/» permite «https://api.exemplo.com/v1/pedidos», mas não
            «http://api.exemplo.com/» nem outro domínio.

            ## OAuth2 sem dor de cabeça
            Com **OAuth2 Client Credentials**, o APEX pede o token, guarda-o e o renova quando expira — você só informa a credencial
            e a URL do token (na REST Data Source, no Remote Server ou em «p_token_url»). Atributos importantes:
            - **OAuth Scope**: escopo padrão do token. No 26.1 cada chamada pode pedir outro escopo (*Invocation Scope* nas REST
              Data Sources, parâmetro de escopo nas APIs), e **Named Scopes** criam apelidos para escopos longos.
            - **Token Authentication Method** (26.1): como client ID e secret vão ao servidor de token — cabeçalho Basic, corpo da
              requisição ou combinações.
            - **Refresh tokens** (26.1): se o servidor de token emitir um, o APEX o usa para renovar o access token.

            ## APEX_CREDENTIAL
            | Procedimento | Uso |
            |---|---|
            | «SET_PERSISTENT_CREDENTIALS» | Grava ID e segredo para todas as sessões (descarta tokens existentes) |
            | «SET_SESSION_CREDENTIALS» | Credencial válida só na sessão atual (ex.: o usuário digita a senha da API) |
            | «SET_ALLOWED_URLS» | Define as Valid for URLs (exige informar o segredo de novo) |
            | «SET_SCOPE» (24.2) | Altera o escopo e os named scopes; limpa os tokens |
            | «CLEAR_TOKENS» | Descarta os tokens obtidos |
            | «CREATE_CREDENTIAL» / «DROP_CREDENTIAL» | Cria e remove credenciais por código |

            ## Exportação e ambientes
            O export da aplicação inclui as credenciais usadas, **sem os segredos**. Na importação, se o workspace já tiver uma
            credencial com o mesmo **Static ID**, ela é reaproveitada; senão, é criada, e **Prompt On Install** pede os valores.
            Em implantações automatizadas, defina os segredos por script (valores vindos de um cofre ou variável de ambiente, nunca
            do Git):

            ~~~plsql
            begin
                apex_util.set_workspace(p_workspace => 'VENDAS');

                apex_credential.set_persistent_credentials(
                    p_credential_static_id => 'API_ERP',
                    p_client_id            => :client_id,
                    p_client_secret        => :client_secret);

                apex_credential.set_allowed_urls(
                    p_credential_static_id => 'API_ERP',
                    p_allowed_urls         => apex_t_varchar2('https://erp.empresa.com/api/'),
                    p_client_secret        => :client_secret);
                commit;
            end;
            /
            ~~~

            :::novo Credenciais do banco (24.1)
            No Oracle AI Database 26ai ou no Autonomous Database, credenciais Basic, OAuth2 Client Credentials e Signed User
            Assertion podem apontar para uma **credencial do banco** (mantida com «DBMS_CREDENTIAL» ou «DBMS_CLOUD»). O segredo
            fica só no banco; as chamadas HTTP passam a rodar no contexto do **schema de parsing** (que precisa da ACL de rede) e
            *Valid for URLs* é desativado.
            :::

            :::atencao Nada de segredos em itens ou no código
            Não monte o cabeçalho «Authorization» com valores fixos em PL/SQL nem guarde chaves em itens de aplicação ou
            substitution strings: um export, um log de debug ou um repositório Git expõem tudo. Use uma credencial do tipo
            **HTTP Header** ou **URL Query String**.
            :::
        `
    },
    en: {
        titulo: 'Web Credentials and OAuth2',
        resumo: 'Store API secrets encrypted in the workspace, use OAuth2 with automatic token renewal and restrict usage with Valid for URLs.',
        tags: ['Web Credentials', 'credentials', 'OAuth2', 'client credentials', 'token', 'APEX_CREDENTIAL', 'Valid for URLs', 'API key', 'HTTP Header', 'Basic Authentication', 'OAuth2 Password Flow', 'secrets'],
        conteudo: `
            **Web Credentials** store user names and passwords, client IDs and secrets, API keys and private keys **encrypted** in
            the workspace, so none of that shows up in code, items or exports. They live under *Workspace Utilities → Web
            Credentials* or *Shared Components → Credentials* and are used by REST Data Sources, Remote Servers, REST Enabled SQL,
            Social Sign-In, «APEX_WEB_SERVICE» and other features. Secrets **cannot be read back** in clear text — not even by
            developers.

            ## Authentication types
            | Type | How it works |
            |---|---|
            | Basic Authentication | User name and password, Base64-encoded in the «Authorization» header. |
            | OAuth2 Client Credentials | Exchanges client ID + secret for an access token at the token URL and renews it when it expires. |
            | OAuth2 Password Flow (26.1) | Optional client ID/secret + user name and password, stored in a linked Basic credential. |
            | HTTP Header | Credential name = header name; secret = value (e.g. «x-api-key»). |
            | URL Query String | Appends «?name=value» to the URL; handy for API keys, but proxies may log the URL. |
            | OCI Native Authentication | Signs requests to Oracle Cloud Infrastructure APIs. |
            | Signed User Assertion / User Assertion Signing Certificate | Signed JWT assertions carrying the user identity (a *Trusted* client in the IdP). |
            | Key Pair / Certificate Pair | Key pairs; Certificate Pair is used with SAML. |

            HTTP Header and URL Query String exist since 20.2, and APEX does not write those secrets to the debug log.

            ## Valid for URLs
            Fill **Valid for URLs** with the allowed prefixes, one per line. If the credential is used with any other URL — by
            mistake or on purpose — APEX refuses with *Credential is not allowed to be used for this URL endpoint*. Matching is by
            prefix: «https://api.example.com/v1/» allows «https://api.example.com/v1/orders», but not «http://api.example.com/»
            nor another domain.

            ## Painless OAuth2
            With **OAuth2 Client Credentials**, APEX requests the token, stores it and renews it on expiry — you only provide the
            credential and the token URL (in the REST Data Source, the Remote Server or «p_token_url»). Key attributes:
            - **OAuth Scope**: the token's default scope. In 26.1 each call can ask for another scope (*Invocation Scope* on REST
              Data Sources, a scope parameter in the APIs), and **Named Scopes** create aliases for long scopes.
            - **Token Authentication Method** (26.1): how client ID and secret reach the token server — Basic header, request
              body or combinations.
            - **Refresh tokens** (26.1): if the token server issues one, APEX uses it to renew the access token.

            ## APEX_CREDENTIAL
            | Procedure | Use |
            |---|---|
            | «SET_PERSISTENT_CREDENTIALS» | Stores ID and secret for all sessions (discards existing tokens) |
            | «SET_SESSION_CREDENTIALS» | Credential valid for the current session only (e.g. the user types the API password) |
            | «SET_ALLOWED_URLS» | Sets Valid for URLs (the secret must be passed again) |
            | «SET_SCOPE» (24.2) | Changes the scope and named scopes; clears tokens |
            | «CLEAR_TOKENS» | Discards acquired tokens |
            | «CREATE_CREDENTIAL» / «DROP_CREDENTIAL» | Creates and drops credentials in code |

            ## Export and environments
            The application export includes the credentials it uses, **without secrets**. On import, if the workspace already has
            a credential with the same **Static ID**, it is reused; otherwise it is created and **Prompt On Install** asks for the
            values. In automated deployments, set the secrets by script (values from a vault or environment variable, never from
            Git):

            ~~~plsql
            begin
                apex_util.set_workspace(p_workspace => 'SALES');

                apex_credential.set_persistent_credentials(
                    p_credential_static_id => 'ERP_API',
                    p_client_id            => :client_id,
                    p_client_secret        => :client_secret);

                apex_credential.set_allowed_urls(
                    p_credential_static_id => 'ERP_API',
                    p_allowed_urls         => apex_t_varchar2('https://erp.company.com/api/'),
                    p_client_secret        => :client_secret);
                commit;
            end;
            /
            ~~~

            :::novo Database credentials (24.1)
            On Oracle AI Database 26ai or Autonomous Database, Basic, OAuth2 Client Credentials and Signed User Assertion
            credentials can point to a **database credential** (maintained with «DBMS_CREDENTIAL» or «DBMS_CLOUD»). The secret
            stays in the database only; HTTP calls then run in the context of the **parsing schema** (which needs the network ACL)
            and *Valid for URLs* is disabled.
            :::

            :::atencao No secrets in items or code
            Do not build the «Authorization» header from hard-coded values in PL/SQL, and do not keep keys in application items or
            substitution strings: an export, a debug log or a Git repository exposes everything. Use an **HTTP Header** or
            **URL Query String** credential instead.
            :::
        `
    }
});

DOC.topico({
    id: 'rest-enabled-sql',
    cat: 'integracao',
    nivel: 'avancado',
    desde: '18.1',
    links: [
        { t: 'App Builder Guide — Managing REST Enabled SQL References', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-rest-enabled-sql-references.html' },
        { t: 'App Builder Guide — Understanding Remote Servers', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-remote-servers.html' },
        { t: 'ORDS Developer\'s Guide — REST-Enabled SQL Service', u: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/26.1/orddg/rest-enabled-sql-service.html' }
    ],
    relacionados: ['rest-data-sources', 'ords', 'apex-exec', 'web-credentials', 'ambientes-dev-test-prod'],
    pt: {
        titulo: 'REST Enabled SQL e Remote Servers',
        resumo: 'Use outro banco Oracle (ou MySQL) como fonte de relatórios, formulários e gráficos via HTTPS com o REST-Enabled SQL do ORDS, sem database links.',
        tags: ['REST Enabled SQL', 'Remote Server', 'banco remoto', 'database link', 'ORDS', '_/sql', 'APEX_EXEC', 'OPEN_REMOTE_SQL_QUERY', 'EXECUTE_REMOTE_PLSQL', 'Flexible Remote Server', 'MySQL'],
        conteudo: `
            O **REST-Enabled SQL Service** é um recurso do ORDS que recebe comandos SQL por HTTPS («POST .../ords/schema/_/sql»)
            e devolve o resultado em JSON. O APEX usa esse serviço, desde o 18.1, para executar a consulta de um componente **em
            outro banco**, sem database link.

            ## Database link x REST Enabled SQL
            | | Database link | REST Enabled SQL |
            |---|---|---|
            | Transporte | SQL*Net | JSON sobre HTTP(S) |
            | Join com tabelas locais | Sim, na mesma consulta | Não: a consulta inteira roda no banco remoto |
            | Nuvem e internet | Exige a porta do listener acessível | Funciona onde houver HTTPS |
            | Onde é definido | No banco | No workspace (Shared Components) |

            Os dois buscam dados pela rede e são bem mais lentos que uma tabela local. Para volumes altos, considere replicar os
            dados — por exemplo, com uma REST Data Source do tipo *REST Enabled SQL Query* e [sincronização](#/topico/rest-data-sources).

            ## Preparando o banco remoto
            1. Tenha um ORDS na frente do banco remoto (independente do ORDS que atende o APEX) com o serviço ativo — por exemplo,
               «ords --config PASTA_DE_CONFIG config set restEnabledSql.active true» e reinicie o ORDS (o serviço vem desligado
               por padrão).
            2. No schema remoto, habilite o REST:

            ~~~plsql
            begin
                ords.enable_schema;
                commit;
            end;
            /
            ~~~

            3. Teste com curl antes de ir para o APEX:

            ~~~bash
            curl -i -X POST --user RELATORIOS:senha -H "Content-Type: application/sql" --data-binary "select count(*) from pedidos" https://bd-remoto.empresa.com/ords/relatorios/_/sql
            ~~~

            ## Criando a referência no APEX
            Em *Shared Components → REST Enabled SQL → Create*, informe o nome, a **Endpoint URL**
            («https://bd-remoto.empresa.com/ords/relatorios», **sem** «/_/sql») e a credencial: Basic (usuário do banco remoto)
            ou, melhor, **OAuth2 Client Credentials**. Clique em *Test*. A referência é um **Remote Server** do workspace e serve
            a todas as aplicações.

            ## Usando
            - **Regiões**: em *Source*, mude **Location** de *Local Database* para *REST Enabled SQL* e escolha o servidor.
              Funciona em Interactive Report, Interactive Grid, Classic Report, Form, Chart, Calendar, Tree e outros.
            - **Processos**: o tipo *Execute Code* também pode rodar no servidor remoto.
            - **PL/SQL**, com «APEX_EXEC»:

            ~~~plsql
            declare
                l_params apex_exec.t_parameters;
                l_ctx    apex_exec.t_context;
            begin
                apex_exec.add_parameter(l_params, 'STATUS', 'ABERTO');
                l_ctx := apex_exec.open_remote_sql_query(
                             p_server_static_id => 'bd_relatorios',
                             p_sql_query        => 'select id, cliente, total from pedidos where status = :STATUS',
                             p_sql_parameters   => l_params,
                             p_auto_bind_items  => false);
                while apex_exec.next_row(l_ctx) loop
                    apex_debug.info('Pedido %s: %s', apex_exec.get_number(l_ctx, 1), apex_exec.get_varchar2(l_ctx, 2));
                end loop;
                apex_exec.close(l_ctx);
            exception
                when others then
                    apex_exec.close(l_ctx);
                    raise;
            end;
            ~~~

            Para executar PL/SQL remoto: «apex_exec.execute_remote_plsql(p_server_static_id => 'bd_relatorios', p_plsql_code =>
            'begin pkg_pedidos.recalcular(:P10_ID); end;')» — por padrão os itens da página são vinculados automaticamente.

            ## Endereços diferentes por ambiente
            - Na importação: «APEX_APPLICATION_INSTALL.SET_REMOTE_SERVER»; numa aplicação já instalada:
              «APEX_APPLICATION_ADMIN.SET_REMOTE_SERVER» (24.2).
            - **Flexible Remote Servers** (24.2): a URL aceita *placeholders* como «#tenant#» e uma **Configuration Procedure**
              calcula a URL em tempo de execução:

            ~~~plsql
            procedure config_servidor (
                p_info   in     apex_plugin.t_remote_server_info,
                p_config in out apex_plugin.t_remote_server_config)
            is
            begin
                if v('G_AMBIENTE') = 'PROD' then
                    p_config.base_url := 'https://bd-prod.empresa.com/ords/relatorios';
                else
                    p_config.base_url := 'https://bd-teste.empresa.com/ords/relatorios';
                end if;
            end config_servidor;
            ~~~

            :::atencao O usuário remoto é o limite
            O REST-Enabled SQL executa **qualquer** SQL que o schema remoto tenha permissão para rodar. Use um schema dedicado,
            com privilégios mínimos (somente leitura, se possível), e prefira OAuth2 a senha de banco na credencial.
            :::

            :::dica MySQL também
            Com um ORDS configurado para MySQL (cenário suportado na Oracle Cloud), o APEX consegue usar o MySQL como fonte de
            componentes **somente leitura**.
            :::
        `
    },
    en: {
        titulo: 'REST Enabled SQL and Remote Servers',
        resumo: 'Use another Oracle database (or MySQL) as the source of reports, forms and charts over HTTPS with ORDS REST-Enabled SQL, no database links.',
        tags: ['REST Enabled SQL', 'Remote Server', 'remote database', 'database link', 'ORDS', '_/sql', 'APEX_EXEC', 'OPEN_REMOTE_SQL_QUERY', 'EXECUTE_REMOTE_PLSQL', 'Flexible Remote Server', 'MySQL'],
        conteudo: `
            The **REST-Enabled SQL Service** is an ORDS feature that accepts SQL statements over HTTPS («POST
            .../ords/schema/_/sql») and returns the result as JSON. Since 18.1, APEX uses it to run a component's query **on
            another database**, without a database link.

            ## Database link vs REST Enabled SQL
            | | Database link | REST Enabled SQL |
            |---|---|---|
            | Transport | SQL*Net | JSON over HTTP(S) |
            | Join with local tables | Yes, in the same query | No: the whole query runs remotely |
            | Cloud and internet | Needs the listener port reachable | Works wherever HTTPS does |
            | Where it is defined | In the database | In the workspace (Shared Components) |

            Both fetch data over the network and are much slower than a local table. For high volumes, consider replicating the
            data — e.g. with a *REST Enabled SQL Query* REST Data Source plus [synchronization](#/topico/rest-data-sources).

            ## Preparing the remote database
            1. Put an ORDS in front of the remote database (independent from the ORDS serving APEX) with the service enabled —
               for example «ords --config CONFIG_FOLDER config set restEnabledSql.active true», then restart ORDS (it is off
               by default).
            2. In the remote schema, enable REST:

            ~~~plsql
            begin
                ords.enable_schema;
                commit;
            end;
            /
            ~~~

            3. Test with curl before going to APEX:

            ~~~bash
            curl -i -X POST --user REPORTS:password -H "Content-Type: application/sql" --data-binary "select count(*) from orders" https://remote-db.company.com/ords/reports/_/sql
            ~~~

            ## Creating the reference in APEX
            Under *Shared Components → REST Enabled SQL → Create*, enter a name, the **Endpoint URL**
            («https://remote-db.company.com/ords/reports», **without** «/_/sql») and the credential: Basic (remote database user)
            or, better, **OAuth2 Client Credentials**. Click *Test*. The reference is a workspace **Remote Server** shared by all
            applications.

            ## Using it
            - **Regions**: in *Source*, switch **Location** from *Local Database* to *REST Enabled SQL* and pick the server. Works
              for Interactive Report, Interactive Grid, Classic Report, Form, Chart, Calendar, Tree and more.
            - **Processes**: the *Execute Code* type can also run on the remote server.
            - **PL/SQL**, with «APEX_EXEC»:

            ~~~plsql
            declare
                l_params apex_exec.t_parameters;
                l_ctx    apex_exec.t_context;
            begin
                apex_exec.add_parameter(l_params, 'STATUS', 'OPEN');
                l_ctx := apex_exec.open_remote_sql_query(
                             p_server_static_id => 'reports_db',
                             p_sql_query        => 'select id, customer, total from orders where status = :STATUS',
                             p_sql_parameters   => l_params,
                             p_auto_bind_items  => false);
                while apex_exec.next_row(l_ctx) loop
                    apex_debug.info('Order %s: %s', apex_exec.get_number(l_ctx, 1), apex_exec.get_varchar2(l_ctx, 2));
                end loop;
                apex_exec.close(l_ctx);
            exception
                when others then
                    apex_exec.close(l_ctx);
                    raise;
            end;
            ~~~

            To run remote PL/SQL: «apex_exec.execute_remote_plsql(p_server_static_id => 'reports_db', p_plsql_code =>
            'begin order_pkg.recalculate(:P10_ID); end;')» — page items are bound automatically by default.

            ## Different endpoints per environment
            - At import: «APEX_APPLICATION_INSTALL.SET_REMOTE_SERVER»; for an installed application:
              «APEX_APPLICATION_ADMIN.SET_REMOTE_SERVER» (24.2).
            - **Flexible Remote Servers** (24.2): the URL accepts *placeholders* such as «#tenant#» and a **Configuration
              Procedure** computes the URL at runtime:

            ~~~plsql
            procedure server_config (
                p_info   in     apex_plugin.t_remote_server_info,
                p_config in out apex_plugin.t_remote_server_config)
            is
            begin
                if v('G_ENVIRONMENT') = 'PROD' then
                    p_config.base_url := 'https://db-prod.company.com/ords/reports';
                else
                    p_config.base_url := 'https://db-test.company.com/ords/reports';
                end if;
            end server_config;
            ~~~

            :::atencao The remote user is the limit
            REST-Enabled SQL runs **any** SQL the remote schema is allowed to run. Use a dedicated schema with minimal privileges
            (read-only if possible), and prefer OAuth2 over a database password in the credential.
            :::

            :::dica MySQL too
            With ORDS configured for MySQL (a scenario supported on Oracle Cloud), APEX can use MySQL as the source of
            **read-only** components.
            :::
        `
    }
});

DOC.topico({
    id: 'carga-de-dados',
    cat: 'integracao',
    nivel: 'intermediario',
    desde: '21.1',
    links: [
        { t: 'App Builder Guide — Creating Applications with Data Loading Capability', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-applications-with-data-loading-capability.html' },
        { t: 'APEX_DATA_LOADING (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_DATA_LOADING.html' },
        { t: 'APEX_DATA_PARSER (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_DATA_PARSER.html' }
    ],
    relacionados: ['upload-download-arquivos', 'apex-collection', 'processos-computacoes-validacoes', 'sql-workshop', 'impressao-e-exportacao'],
    pt: {
        titulo: 'Carga de dados: Data Load Definitions, APEX_DATA_LOADING e APEX_DATA_PARSER',
        resumo: 'Permita que usuários importem CSV, XLSX, XML e JSON com Data Load Definitions, ou faça o parse você mesmo com APEX_DATA_PARSER.',
        tags: ['carga de dados', 'data load', 'importar', 'CSV', 'Excel', 'XLSX', 'upload', 'APEX_DATA_LOADING', 'APEX_DATA_PARSER', 'Data Load Definition', 'Data Loading', 'planilha'],
        conteudo: `
            Importar planilhas é um dos pedidos mais comuns em sistemas internos. O APEX oferece três níveis:

            | Opção | Para quem | Quando usar |
            |---|---|---|
            | Data Workshop (SQL Workshop) | Desenvolvedor | Carga pontual em tabelas, sem criar páginas. |
            | **Data Load Definition** + processo **Data Loading** | Usuário final | Importação recorrente, com mapeamento e regras definidos pelo desenvolvedor. |
            | «APEX_DATA_PARSER» | Desenvolvedor | Controle total: staging, validações e regras em PL/SQL. |

            O antigo assistente de carga (anterior ao 21.1) aparece como *Legacy Data Load* e não deve ser usado em páginas novas.

            ## Data Load Definitions (desde o 21.1)
            Em *Shared Components → Data Load Definitions → Create*, escolha o **destino** (tabela ou collection), envie um
            **arquivo de exemplo** (CSV, XLSX, XML ou JSON) e confira o mapeamento automático das colunas. O formato do exemplo
            define o tipo de arquivo que os usuários poderão enviar. No final, o assistente oferece criar a página de carga.

            Na definição você configura:
            - **Data Profile**: colunas com *selector* por nome ou expressão regular, tipo de dado, máscara de formato e, para XML
              ou JSON, o **Row Selector**. Cada coluna aceita **SQL Expression**, **SQL Query**, **Lookup** ou **Transformation
              Rules** (ex.: trocar um código pelo ID, aplicar «upper», limpar espaços).
            - **Loading Method**: **Append** (insere; com Primary Key definida, não altera linhas existentes), **Merge** (atualiza
              pela Primary Key ou insere; só para tabelas) ou **Replace** (apaga e recarrega).
            - **Commit Interval** e **Error Handling**: *Ignore*, *Stop*, *Log Error into Collection* ou *Log into Error Log*
              (tabela de DML Error Logging; só com Append e sem Primary Key).

            A página gerada tem um único processo **Data Loading**: o usuário envia o arquivo (ou cola o texto, se o formato for
            CSV), vê a prévia e confirma. São até 300 colunas, com os tipos VARCHAR2, NUMBER, DATE, TIMESTAMP (com e sem fuso) e CLOB.

            ## APEX_DATA_LOADING: a mesma definição por código
            ~~~plsql
            declare
                l_arquivo   blob;
                l_resultado apex_data_loading.t_data_load_result;
            begin
                select blob_content
                  into l_arquivo
                  from apex_application_temp_files
                 where name = :P20_ARQUIVO;

                l_resultado := apex_data_loading.load_data(
                                   p_static_id    => 'carga_clientes',
                                   p_data_to_load => l_arquivo);

                apex_debug.info('Processadas: %s, com erro: %s',
                                l_resultado.processed_rows, l_resultado.error_rows);
            end;
            ~~~

            Uma segunda assinatura recebe um CLOB (texto colado), e «p_xlsx_sheet_name» escolhe a planilha. Fora de uma página
            (job ou script), crie antes uma sessão com «APEX_SESSION.CREATE_SESSION».

            ## APEX_DATA_PARSER: parse sob medida
            «APEX_DATA_PARSER.PARSE» (disponível desde o 19.1) é uma *table function* que lê CSV, XLSX, XML ou JSON direto de um
            BLOB e devolve «LINE_NUMBER» e as colunas «COL001» a «COL300», como texto. Nada é gravado: você decide o destino.

            ~~~plsql
            -- Item File Upload com Storage Type = Table APEX_APPLICATION_TEMP_FILES
            insert into stg_clientes (linha, nome, email, cidade, limite)
            select p.line_number,
                   trim(p.col001),
                   lower(trim(p.col002)),
                   p.col003,
                   to_number(p.col004 default null on conversion error)
              from apex_application_temp_files f,
                   table(apex_data_parser.parse(
                             p_content   => f.blob_content,
                             p_file_name => f.filename)) p
             where f.name = :P20_ARQUIVO
               and p.line_number > 1;   -- pula o cabeçalho
            ~~~

            | Parâmetro ou função | Para quê |
            |---|---|
            | «p_xlsx_sheet_name» | Escolhe a planilha pelo nome interno (ex.: «sheet1.xml») |
            | «GET_XLSX_WORKSHEETS» | Lista as planilhas do arquivo (nome exibido e nome interno) |
            | «p_csv_col_delimiter», «p_csv_enclosed» | Separador e delimitador (o separador é detectado se omitido) |
            | «p_skip_rows», «p_max_rows» | Pula linhas iniciais ou limita a leitura (útil para prévias) |
            | «p_file_charset» | Codificação (padrão AL32UTF8) |
            | «p_row_selector» | Caminho do array de linhas em JSON ou XML |
            | «DISCOVER» + «GET_COLUMNS» | Devolvem nomes, tipos e máscaras detectados |

            :::dica CSV vindo do Excel em português
            O Excel em pt-BR costuma salvar CSV com ponto e vírgula e, na opção comum, em codificação do Windows: se aparecerem
            acentos estranhos, informe «p_file_charset => 'WE8MSWIN1252'» (ou peça a opção "CSV UTF-8"). Arquivos acima de
            50 MB são lidos direto do BLOB e o parse fica mais lento.
            :::

            :::atencao Volume e staging
            A documentação avisa que a carga pela aplicação não foi feita para centenas de milhares de linhas — para grandes
            volumes use SQL*Loader, external tables ou o comando «load» do SQLcl. E, mesmo em cargas pequenas, prefira gravar em
            uma tabela de **staging**, validar (duplicados, chaves estrangeiras, formatos), mostrar os erros ao usuário e só
            então mover para a tabela final com «MERGE».
            :::
        `
    },
    en: {
        titulo: 'Data loading: Data Load Definitions, APEX_DATA_LOADING and APEX_DATA_PARSER',
        resumo: 'Let users import CSV, XLSX, XML and JSON with Data Load Definitions, or do the parsing yourself with APEX_DATA_PARSER.',
        tags: ['data loading', 'data load', 'import', 'CSV', 'Excel', 'XLSX', 'upload', 'APEX_DATA_LOADING', 'APEX_DATA_PARSER', 'Data Load Definition', 'Data Loading', 'spreadsheet'],
        conteudo: `
            Importing spreadsheets is one of the most common requests in internal systems. APEX offers three levels:

            | Option | For whom | When to use |
            |---|---|---|
            | Data Workshop (SQL Workshop) | Developer | One-off loads into tables, no pages needed. |
            | **Data Load Definition** + **Data Loading** process | End user | Recurring imports with mapping and rules defined by the developer. |
            | «APEX_DATA_PARSER» | Developer | Full control: staging, validations and rules in PL/SQL. |

            The old load wizard (before 21.1) shows up as *Legacy Data Load* and should not be used for new pages.

            ## Data Load Definitions (since 21.1)
            Under *Shared Components → Data Load Definitions → Create*, choose the **target** (table or collection), upload a
            **sample file** (CSV, XLSX, XML or JSON) and review the automatic column mapping. The sample format determines which
            file type users may upload. At the end, the wizard offers to create the load page.

            In the definition you configure:
            - **Data Profile**: columns with a *selector* by name or regular expression, data type, format mask and, for XML or
              JSON, the **Row Selector**. Each column accepts a **SQL Expression**, **SQL Query**, **Lookup** or **Transformation
              Rules** (e.g. replace a code with its ID, apply «upper», trim spaces).
            - **Loading Method**: **Append** (inserts; with a Primary Key defined, existing rows are left untouched), **Merge**
              (updates by Primary Key or inserts; tables only) or **Replace** (deletes and reloads).
            - **Commit Interval** and **Error Handling**: *Ignore*, *Stop*, *Log Error into Collection* or *Log into Error Log*
              (DML Error Logging table; Append without Primary Key only).

            The generated page has a single **Data Loading** process: the user uploads the file (or pastes text, when the format
            is CSV), previews it and confirms. Up to 300 columns are supported, with VARCHAR2, NUMBER, DATE, TIMESTAMP (with and
            without time zone) and CLOB types.

            ## APEX_DATA_LOADING: the same definition from code
            ~~~plsql
            declare
                l_file   blob;
                l_result apex_data_loading.t_data_load_result;
            begin
                select blob_content
                  into l_file
                  from apex_application_temp_files
                 where name = :P20_FILE;

                l_result := apex_data_loading.load_data(
                                p_static_id    => 'customer_load',
                                p_data_to_load => l_file);

                apex_debug.info('Processed: %s, with errors: %s',
                                l_result.processed_rows, l_result.error_rows);
            end;
            ~~~

            A second signature takes a CLOB (pasted text), and «p_xlsx_sheet_name» picks the worksheet. Outside a page (job or
            script), first create a session with «APEX_SESSION.CREATE_SESSION».

            ## APEX_DATA_PARSER: custom parsing
            «APEX_DATA_PARSER.PARSE» (available since 19.1) is a *table function* that reads CSV, XLSX, XML or JSON straight from a
            BLOB and returns «LINE_NUMBER» plus columns «COL001» to «COL300» as text. Nothing is stored: you decide where it goes.

            ~~~plsql
            -- File Upload item with Storage Type = Table APEX_APPLICATION_TEMP_FILES
            insert into stg_customers (line_no, name, email, city, credit_limit)
            select p.line_number,
                   trim(p.col001),
                   lower(trim(p.col002)),
                   p.col003,
                   to_number(p.col004 default null on conversion error)
              from apex_application_temp_files f,
                   table(apex_data_parser.parse(
                             p_content   => f.blob_content,
                             p_file_name => f.filename)) p
             where f.name = :P20_FILE
               and p.line_number > 1;   -- skip the header row
            ~~~

            | Parameter or function | Purpose |
            |---|---|
            | «p_xlsx_sheet_name» | Picks the worksheet by internal name (e.g. «sheet1.xml») |
            | «GET_XLSX_WORKSHEETS» | Lists the workbook sheets (display and internal names) |
            | «p_csv_col_delimiter», «p_csv_enclosed» | Separator and enclosure (the separator is detected if omitted) |
            | «p_skip_rows», «p_max_rows» | Skip leading rows or cap reading (handy for previews) |
            | «p_file_charset» | Encoding (default AL32UTF8) |
            | «p_row_selector» | Path to the row array in JSON or XML |
            | «DISCOVER» + «GET_COLUMNS» | Return detected names, data types and format masks |

            :::dica CSV files from a localized Excel
            Excel in many locales saves CSV with semicolons and, in the common option, in a Windows code page: if accents look
            garbled, pass «p_file_charset => 'WE8MSWIN1252'» (or ask for the "CSV UTF-8" option). Files over 50 MB are parsed
            directly from the BLOB and parsing becomes slower.
            :::

            :::atencao Volume and staging
            The documentation warns that application data loading is not designed for hundreds of thousands of rows — for big
            volumes use SQL*Loader, external tables or the SQLcl «load» command. And even for small loads, prefer writing to a
            **staging** table, validating (duplicates, foreign keys, formats), showing errors to the user and only then moving the
            data to the final table with «MERGE».
            :::
        `
    }
});
