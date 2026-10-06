DOC.topico({
    id: 'apis-plsql-visao-geral',
    cat: 'plsql',
    nivel: 'intermediario',
    links: [
        { t: 'Oracle APEX API Reference 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/' },
        { t: 'APEX 26.1 Release Notes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmrn/' }
    ],
    relacionados: ['apex-collection', 'apex-exec', 'apex-json', 'apex-string-e-utilitarios', 'dicionario-apex'],
    pt: {
        titulo: 'Visão geral dos pacotes APEX_* (mapa das APIs)',
        resumo: 'Mapa dos mais de 60 pacotes PL/SQL do APEX 26.1 agrupados por finalidade, com a versão em que cada um surgiu e os novos do 24.1, 24.2 e 26.1.',
        tags: ['API', 'PL/SQL', 'pacotes', 'API Reference', 'APEX_UTIL', 'APEX_STRING', 'APEX_AI', 'APEX_GENDEV', 'APEX_DB_DICTIONARY', 'mapa'],
        conteudo: `
            Por trás do App Builder existe uma camada PL/SQL completa: a **API Reference** do APEX 26.1 documenta mais de
            60 pacotes públicos «APEX_*». Eles ficam no schema do APEX (ex.: «APEX_260100») e são expostos por sinônimos
            públicos, então qualquer código executado pelo schema de parsing pode chamar «apex_util», «apex_mail» etc.
            O prefixo «APEX_» nas APIs existe desde a versão 2.2; antes delas, muitos nomes começavam com «HTMLDB_» ou «WWV_FLOW_».

            ## Como ler este mapa
            - A coluna **Desde** mostra a primeira versão em que o pacote aparece na API Reference. "≤ 4.2" indica que ele já
              existia nas versões antigas.
            - Pacotes marcados com **24.1**, **24.2** ou **26.1** são os mais recentes.
            - Muitos pacotes exigem uma **sessão APEX** ativa («APEX_EXEC», «APEX_COLLECTION», «APEX_AI», «APEX_WORKFLOW»...).
              Fora de uma página, crie uma com [APEX_SESSION](#/topico/apex-session-e-contexto).

            ## Sessão, estado e navegação
            | Pacote | Para que serve | Desde |
            |---|---|---|
            | «APEX_APPLICATION» | Globais do motor («G_FLOW_ID», «G_USER», «G_X01»...), «STOP_APEX_ENGINE» | ≤ 4.2 |
            | «APEX_UTIL» | Utilitários gerais: session state, preferências, usuários, cache, «REDIRECT_URL» | ≤ 4.2 |
            | «APEX_COLLECTION» | Tabelas temporárias por sessão | ≤ 4.2 |
            | «APEX_PAGE» | «GET_URL», modo da página, purge de cache | 5.0 |
            | «APEX_SESSION» | Criar, anexar e excluir sessões; debug e trace | 5.1 |
            | «APEX_APP_SETTING» | Application Settings («GET_VALUE», «SET_VALUE») | 18.1 |
            | «APEX_SESSION_STATE» | Itens com tipo: VARCHAR2, CLOB e BOOLEAN | 22.2 |

            ## Segurança e identidade
            | Pacote | Para que serve | Desde |
            |---|---|---|
            | «APEX_AUTHENTICATION» | Login, logout, post-login, callbacks | ≤ 4.2 |
            | «APEX_CUSTOM_AUTH», «APEX_LDAP» | Autenticação customizada e LDAP | ≤ 4.2 |
            | «APEX_ESCAPE» | Escape para HTML, atributos, JS, JSON, CSV | ≤ 4.2 |
            | «APEX_AUTHORIZATION» | «IS_AUTHORIZED», cache de autorizações | 5.0 |
            | «APEX_ACL», «APEX_JWT» | Papéis do Access Control; tokens JWT | 18.1 |
            | «APEX_CREDENTIAL» | Web Credentials (tokens, escopos, URLs permitidas) | 18.2 |

            ## Dados, relatórios e integração
            | Pacote | Para que serve | Desde |
            |---|---|---|
            | «APEX_WEB_SERVICE» | Chamadas REST/SOAP («MAKE_REST_REQUEST») | ≤ 4.2 |
            | «APEX_IR», «APEX_REGION» | Relatórios interativos; contexto de consulta de regiões | ≤ 4.2 / 5.0 |
            | «APEX_JSON», «APEX_ZIP», «APEX_SPATIAL» | JSON, arquivos ZIP, dados espaciais | 5.0 |
            | «APEX_EXEC» | Consulta e DML em fontes locais, REST e remotas | 18.1 |
            | «APEX_DATA_PARSER» | Ler CSV, XLSX, JSON e XML | 19.1 |
            | «APEX_IG» | Interactive Grid (filtros, relatórios salvos) | 20.1 |
            | «APEX_DATA_EXPORT», «APEX_REST_SOURCE_SYNC» | Exportar PDF/XLSX/CSV; sincronizar REST Data Sources | 20.2 |
            | «APEX_DATA_LOADING» | Executar Data Load Definitions | 21.1 |
            | «APEX_DG_DATA_GEN» | Data Generator | 22.1 |
            | «APEX_SEARCH» | Search Configurations | 22.2 |
            | «APEX_BARCODE» | QR Code, Code 128, EAN-8 em SVG/PNG | 23.2 |
            | «APEX_HTTP», «APEX_PRINT» | Download de arquivos; Document Generator | **24.1** |

            ## Processos de negócio e comunicação
            | Pacote | Para que serve | Desde |
            |---|---|---|
            | «APEX_MAIL» | E-mail com fila, anexos e templates | ≤ 4.2 |
            | «APEX_AUTOMATION» | Executar e controlar Automations | 20.2 |
            | «APEX_BACKGROUND_PROCESS» | Status e progresso de Execution Chains em background | 23.1 |
            | «APEX_PWA» | Push notifications | 23.1 |
            | «APEX_HUMAN_TASK», «APEX_WORKFLOW» | Tarefas humanas/aprovações e workflows | 23.2 |
            | «APEX_AI» | Chat, geração de texto e embeddings com IA generativa | **24.1** |

            ## Texto, depuração e utilitários
            | Pacote | Para que serve | Desde |
            |---|---|---|
            | «APEX_DEBUG», «APEX_ERROR», «APEX_LANG» | Log de debug, erros, mensagens traduzíveis | ≤ 4.2 |
            | «APEX_JAVASCRIPT», «APEX_CSS» | Incluir JS/CSS a partir do PL/SQL | ≤ 4.2 |
            | «APEX_STRING», «APEX_THEME» | Strings e coleções; estilos de tema | 5.1 |
            | «APEX_STRING_UTIL» | Slugs, tamanhos de arquivo, e-mails e links em textos | 20.1 |
            | «APEX_MARKDOWN» | Converter Markdown em HTML | 21.1 |
            | «APEX_T_JAVASCRIPT_OBJECT» | Montar objetos JavaScript (inclusive funções) no PL/SQL | **26.1** |

            ## Administração, ciclo de vida e desenvolvimento
            | Pacote | Para que serve | Desde |
            |---|---|---|
            | «APEX_INSTANCE_ADMIN», «APEX_APPLICATION_INSTALL» | Parâmetros da instância; ajustes de import | ≤ 4.2 |
            | «APEX_EXPORT» | Exportar apps e workspaces (no 26.1 também em APEXlang) | 18.1 |
            | «APEX_DATA_INSTALL» | Instalar dados de apps (Data Packager) | 21.2 |
            | «APEX_APPLICATION_ADMIN» | Status, build options e atributos de apps instaladas | 23.1 |
            | «APEX_EXTENSION», «APEX_APP_OBJECT_DEPENDENCY» | Builder Extensions; dependências de objetos | **24.1** |
            | «APEX_SHARED_COMPONENT» | «REFRESH»/«PUBLISH» de componentes inscritos | **24.2** |
            | «APEX_GENDEV» | Blueprints e desenvolvimento orientado a especificação | **26.1** |
            | «APEX_DB_DICTIONARY» | Descrição de tabelas legível por LLMs | **26.1** |
            | «APEX_INSTANCE_DEBUG» | Debug e logs da instância (ex.: via SQLcl) | **26.1** |

            :::atencao Pacotes legados ou depreciados
            - «APEX_APPROVAL» (22.1) foi **depreciado no 24.1**: use «APEX_HUMAN_TASK».
            - «APEX_ITEM» é **Legacy** (tabular forms manuais); prefira Interactive Grid.
            - «APEX_UTIL.STRING_TO_TABLE»/«TABLE_TO_STRING» estão depreciados: use «APEX_STRING».
            - «APEX_PLSQL_JOB» não existe mais nas versões atuais: use «DBMS_SCHEDULER» ou Execution Chains em background.
            :::

            ## Exemplo: várias APIs trabalhando juntas
            ~~~plsql
            begin
                -- lê um item com tipo, registra no debug e redireciona
                if apex_session_state.get_varchar2('P10_STATUS') = 'FECHADO' then
                    apex_debug.info('Pedido %s já fechado (usuário %s)',
                                    apex_session_state.get_varchar2('P10_ID'),
                                    apex_application.g_user);
                    apex_util.redirect_url(apex_page.get_url(p_page => 1));
                end if;
            end;
            ~~~

            :::dica Como descobrir a API certa
            Na API Reference, cada pacote tem exemplos completos. Dentro do App Builder, o **APEX Assistant** (24.1+) e o
            autocompletar do editor de código também sugerem chamadas. E as views «APEX_*» do
            [dicionário](#/topico/dicionario-apex) mostram como cada componente foi configurado.
            :::
        `
    },
    en: {
        titulo: 'Overview of the APEX_* packages (API map)',
        resumo: 'A map of the 60+ PL/SQL packages in APEX 26.1 grouped by purpose, with the release each one appeared in and the newcomers from 24.1, 24.2 and 26.1.',
        tags: ['API', 'PL/SQL', 'packages', 'API Reference', 'APEX_UTIL', 'APEX_STRING', 'APEX_AI', 'APEX_GENDEV', 'APEX_DB_DICTIONARY', 'map'],
        conteudo: `
            Behind App Builder there is a complete PL/SQL layer: the APEX 26.1 **API Reference** documents more than 60 public
            «APEX_*» packages. They live in the APEX schema (e.g. «APEX_260100») and are exposed through public synonyms, so any
            code running as the parsing schema can call «apex_util», «apex_mail» and so on. The «APEX_» prefix has been used since
            release 2.2; before that many names started with «HTMLDB_» or «WWV_FLOW_».

            ## How to read this map
            - The **Since** column shows the first release in which the package appears in the API Reference. "≤ 4.2" means it
              already existed in the old releases.
            - Packages marked **24.1**, **24.2** or **26.1** are the newest.
            - Many packages require an active **APEX session** («APEX_EXEC», «APEX_COLLECTION», «APEX_AI», «APEX_WORKFLOW»...).
              Outside a page, create one with [APEX_SESSION](#/topico/apex-session-e-contexto).

            ## Session, state and navigation
            | Package | What it is for | Since |
            |---|---|---|
            | «APEX_APPLICATION» | Engine globals («G_FLOW_ID», «G_USER», «G_X01»...), «STOP_APEX_ENGINE» | ≤ 4.2 |
            | «APEX_UTIL» | General utilities: session state, preferences, users, cache, «REDIRECT_URL» | ≤ 4.2 |
            | «APEX_COLLECTION» | Per-session temporary tables | ≤ 4.2 |
            | «APEX_PAGE» | «GET_URL», page mode, cache purge | 5.0 |
            | «APEX_SESSION» | Create, attach and delete sessions; debug and trace | 5.1 |
            | «APEX_APP_SETTING» | Application Settings («GET_VALUE», «SET_VALUE») | 18.1 |
            | «APEX_SESSION_STATE» | Typed items: VARCHAR2, CLOB and BOOLEAN | 22.2 |

            ## Security and identity
            | Package | What it is for | Since |
            |---|---|---|
            | «APEX_AUTHENTICATION» | Login, logout, post-login, callbacks | ≤ 4.2 |
            | «APEX_CUSTOM_AUTH», «APEX_LDAP» | Custom and LDAP authentication | ≤ 4.2 |
            | «APEX_ESCAPE» | Escaping for HTML, attributes, JS, JSON, CSV | ≤ 4.2 |
            | «APEX_AUTHORIZATION» | «IS_AUTHORIZED», authorization cache | 5.0 |
            | «APEX_ACL», «APEX_JWT» | Access Control roles; JWT tokens | 18.1 |
            | «APEX_CREDENTIAL» | Web Credentials (tokens, scopes, allowed URLs) | 18.2 |

            ## Data, reporting and integration
            | Package | What it is for | Since |
            |---|---|---|
            | «APEX_WEB_SERVICE» | REST/SOAP calls («MAKE_REST_REQUEST») | ≤ 4.2 |
            | «APEX_IR», «APEX_REGION» | Interactive reports; region query contexts | ≤ 4.2 / 5.0 |
            | «APEX_JSON», «APEX_ZIP», «APEX_SPATIAL» | JSON, ZIP files, spatial data | 5.0 |
            | «APEX_EXEC» | Queries and DML on local, REST and remote sources | 18.1 |
            | «APEX_DATA_PARSER» | Read CSV, XLSX, JSON and XML | 19.1 |
            | «APEX_IG» | Interactive Grid (filters, saved reports) | 20.1 |
            | «APEX_DATA_EXPORT», «APEX_REST_SOURCE_SYNC» | Export PDF/XLSX/CSV; synchronize REST Data Sources | 20.2 |
            | «APEX_DATA_LOADING» | Run Data Load Definitions | 21.1 |
            | «APEX_DG_DATA_GEN» | Data Generator | 22.1 |
            | «APEX_SEARCH» | Search Configurations | 22.2 |
            | «APEX_BARCODE» | QR Code, Code 128, EAN-8 as SVG/PNG | 23.2 |
            | «APEX_HTTP», «APEX_PRINT» | File downloads; Document Generator | **24.1** |

            ## Business processes and communication
            | Package | What it is for | Since |
            |---|---|---|
            | «APEX_MAIL» | E-mail with queue, attachments and templates | ≤ 4.2 |
            | «APEX_AUTOMATION» | Run and control Automations | 20.2 |
            | «APEX_BACKGROUND_PROCESS» | Status and progress of background Execution Chains | 23.1 |
            | «APEX_PWA» | Push notifications | 23.1 |
            | «APEX_HUMAN_TASK», «APEX_WORKFLOW» | Human tasks/approvals and workflows | 23.2 |
            | «APEX_AI» | Chat, text generation and embeddings with generative AI | **24.1** |

            ## Text, debugging and utilities
            | Package | What it is for | Since |
            |---|---|---|
            | «APEX_DEBUG», «APEX_ERROR», «APEX_LANG» | Debug logging, errors, translatable messages | ≤ 4.2 |
            | «APEX_JAVASCRIPT», «APEX_CSS» | Add JS/CSS from PL/SQL | ≤ 4.2 |
            | «APEX_STRING», «APEX_THEME» | Strings and collections; theme styles | 5.1 |
            | «APEX_STRING_UTIL» | Slugs, file sizes, e-mails and links inside text | 20.1 |
            | «APEX_MARKDOWN» | Convert Markdown to HTML | 21.1 |
            | «APEX_T_JAVASCRIPT_OBJECT» | Build JavaScript objects (including functions) in PL/SQL | **26.1** |

            ## Administration, lifecycle and development
            | Package | What it is for | Since |
            |---|---|---|
            | «APEX_INSTANCE_ADMIN», «APEX_APPLICATION_INSTALL» | Instance parameters; import adjustments | ≤ 4.2 |
            | «APEX_EXPORT» | Export apps and workspaces (APEXlang too in 26.1) | 18.1 |
            | «APEX_DATA_INSTALL» | Install app data (Data Packager) | 21.2 |
            | «APEX_APPLICATION_ADMIN» | Status, build options and attributes of installed apps | 23.1 |
            | «APEX_EXTENSION», «APEX_APP_OBJECT_DEPENDENCY» | Builder Extensions; object dependencies | **24.1** |
            | «APEX_SHARED_COMPONENT» | «REFRESH»/«PUBLISH» of subscribed components | **24.2** |
            | «APEX_GENDEV» | Blueprints and specification-driven development | **26.1** |
            | «APEX_DB_DICTIONARY» | LLM-friendly table descriptions | **26.1** |
            | «APEX_INSTANCE_DEBUG» | Instance-level debug and logs (e.g. from SQLcl) | **26.1** |

            :::atencao Legacy or deprecated packages
            - «APEX_APPROVAL» (22.1) was **deprecated in 24.1**: use «APEX_HUMAN_TASK».
            - «APEX_ITEM» is **Legacy** (manual tabular forms); prefer the Interactive Grid.
            - «APEX_UTIL.STRING_TO_TABLE»/«TABLE_TO_STRING» are deprecated: use «APEX_STRING».
            - «APEX_PLSQL_JOB» no longer exists in current releases: use «DBMS_SCHEDULER» or background Execution Chains.
            :::

            ## Example: several APIs working together
            ~~~plsql
            begin
                -- read a typed item, log to debug and redirect
                if apex_session_state.get_varchar2('P10_STATUS') = 'CLOSED' then
                    apex_debug.info('Order %s already closed (user %s)',
                                    apex_session_state.get_varchar2('P10_ID'),
                                    apex_application.g_user);
                    apex_util.redirect_url(apex_page.get_url(p_page => 1));
                end if;
            end;
            ~~~

            :::dica Finding the right API
            In the API Reference every package has complete examples. Inside App Builder, **APEX Assistant** (24.1+) and the
            code editor's autocomplete also suggest calls. And the «APEX_*» views of the
            [dictionary](#/topico/dicionario-apex) show how each component was configured.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-collection',
    cat: 'plsql',
    nivel: 'intermediario',
    links: [
        { t: 'APEX_COLLECTION (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_COLLECTION.html' },
        { t: 'Accessing a Collection', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/Accessing-a-Collection.html' },
        { t: 'App Builder Guide — About Using Collections', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-using-collections.html' }
    ],
    relacionados: ['sessao-e-session-state', 'apis-plsql-visao-geral', 'interactive-grid', 'apex-session-e-contexto'],
    pt: {
        titulo: 'APEX_COLLECTION: coleções na sessão',
        resumo: 'Guarde linhas temporárias por sessão (carrinhos, wizards, seleções) com a API APEX_COLLECTION e consulte-as pela view APEX_COLLECTIONS.',
        tags: ['APEX_COLLECTION', 'APEX_COLLECTIONS', 'collection', 'coleção', 'carrinho', 'ADD_MEMBER', 'CREATE_OR_TRUNCATE_COLLECTION', 'seq_id', 'c001', 'temporário'],
        conteudo: `
            Uma **collection** é uma "tabela temporária" que pertence à sessão do usuário. Ela resolve um problema clássico do
            APEX: cada requisição pode usar uma conexão diferente do pool do ORDS, então **variáveis de pacote** e
            **global temporary tables** não sobrevivem de uma página para outra. As collections, ao contrário, ficam gravadas em
            tabelas do APEX, associadas à **sessão** e à **aplicação**, e somem quando a sessão é encerrada e expurgada.

            Usos típicos: carrinho de compras, wizards de várias etapas que só gravam no final, listas de seleção temporárias,
            resultados de uma chamada REST que você quer paginar e filtrar, área de "rascunho" antes de um commit definitivo.

            ## Estrutura de um membro
            Cada linha (membro) tem um número sequencial e um conjunto fixo de atributos:

            | Coluna em APEX_COLLECTIONS | Tipo | Quantidade |
            |---|---|---|
            | «COLLECTION_NAME», «SEQ_ID» | Nome (maiúsculo) e sequência | — |
            | «C001» ... «C050» | VARCHAR2(4000) | 50 |
            | «N001» ... «N005» | NUMBER | 5 |
            | «D001» ... «D005» | DATE | 5 |
            | «CLOB001», «BLOB001», «XMLTYPE001» | LOBs e XML | 1 de cada |
            | «MD5_ORIGINAL» | Checksum para detectar alterações | — |

            Com «MAX_STRING_SIZE=EXTENDED» no banco, os atributos «C001»–«C050» aceitam até 32.767 bytes.

            ## Principais procedimentos
            | Chamada | O que faz |
            |---|---|
            | «CREATE_COLLECTION» / «CREATE_OR_TRUNCATE_COLLECTION» | Cria (ou esvazia, se já existir) |
            | «CREATE_COLLECTION_FROM_QUERY_B» | Cria a partir de uma query com operações em lote (rápido) |
            | «ADD_MEMBER» / «ADD_MEMBERS» | Adiciona um membro / vários de uma vez (arrays) |
            | «UPDATE_MEMBER» / «UPDATE_MEMBER_ATTRIBUTE» | Atualiza o membro inteiro / um atributo |
            | «DELETE_MEMBER» / «TRUNCATE_COLLECTION» / «DELETE_COLLECTION» | Remove um membro / todos / a collection |
            | «COLLECTION_EXISTS», «COLLECTION_MEMBER_COUNT» | Testes e contagem |
            | «SORT_MEMBERS», «RESEQUENCE_COLLECTION», «MOVE_MEMBER_UP» | Ordenação e sequência |

            ## Exemplo: carrinho de compras
            Processo do botão **Adicionar**:

            ~~~plsql
            begin
                if not apex_collection.collection_exists('CARRINHO') then
                    apex_collection.create_collection('CARRINHO');
                end if;

                apex_collection.add_member(
                    p_collection_name => 'CARRINHO',
                    p_c001            => :P10_PRODUTO_NOME,
                    p_n001            => to_number(:P10_PRODUTO_ID),
                    p_n002            => to_number(:P10_QUANTIDADE),
                    p_n003            => to_number(:P10_PRECO),
                    p_d001            => sysdate );
            end;
            ~~~

            Região de relatório (Classic Report, Cards ou Interactive Grid) sobre a collection:

            ~~~sql
            select seq_id,
                   c001        as produto,
                   n002        as quantidade,
                   n003        as preco,
                   n002 * n003 as subtotal
              from apex_collections
             where collection_name = 'CARRINHO'
             order by seq_id;
            ~~~

            Alterar a quantidade (atributo numérico 2 = «N002») e, no fim, transformar o carrinho em pedido:

            ~~~plsql
            begin
                apex_collection.update_member_attribute(
                    p_collection_name => 'CARRINHO',
                    p_seq             => :P10_SEQ_ID,
                    p_attr_number     => 2,
                    p_number_value    => to_number(:P10_QUANTIDADE) );
            end;

            -- Processo "Finalizar pedido"
            declare
                l_pedido_id pedidos.id%type;
            begin
                insert into pedidos (cliente_id, data_pedido)
                values (:P10_CLIENTE_ID, sysdate)
                returning id into l_pedido_id;

                insert into pedido_itens (pedido_id, produto_id, quantidade, preco)
                select l_pedido_id, n001, n002, n003
                  from apex_collections
                 where collection_name = 'CARRINHO';

                apex_collection.delete_collection('CARRINHO');
            end;
            ~~~

            ## Carregando a partir de uma query
            ~~~plsql
            begin
                apex_collection.create_collection_from_query_b(
                    p_collection_name    => 'FUNCIONARIOS',
                    p_query              => 'select empno, ename, sal from emp where deptno = :b_depto',
                    p_names              => apex_string.string_to_table('b_depto'),
                    p_values             => apex_string.string_to_table(:P20_DEPTNO),
                    p_truncate_if_exists => 'YES' );
            end;
            ~~~

            As colunas da query preenchem «C001», «C002», «C003»... em ordem (como texto). Se você precisa de números e datas
            nas colunas «N» e «D», use «CREATE_COLLECTION_FROM_QUERY2»/«QUERYB2», em que as 5 primeiras colunas são numéricas e
            as 5 seguintes, datas. A versão «_B» é bem mais rápida, mas não calcula o MD5.

            :::atencao Nomes em maiúsculas e escopo
            O nome da collection é sempre convertido para **maiúsculas** — na view, filtre por «'CARRINHO'», nunca por
            «'Carrinho'». E lembre: a collection é da **sessão + aplicação**. Outra aplicação (mesmo com sessão compartilhada)
            ou um job sem sessão não a enxergam.
            :::

            :::dica Quando NÃO usar collections
            Para grandes volumes (dezenas de milhares de linhas por sessão) ou dados que precisam sobreviver ao logout, prefira uma
            tabela real com uma coluna de sessão ou de usuário. Para um único valor grande (ex.: um JSON), um item com
            *Session State Data Type* CLOB (22.2+) pode ser mais simples.
            :::
        `
    },
    en: {
        titulo: 'APEX_COLLECTION: session collections',
        resumo: 'Keep temporary per-session rows (shopping carts, wizards, selections) with the APEX_COLLECTION API and query them through the APEX_COLLECTIONS view.',
        tags: ['APEX_COLLECTION', 'APEX_COLLECTIONS', 'collection', 'shopping cart', 'ADD_MEMBER', 'CREATE_OR_TRUNCATE_COLLECTION', 'seq_id', 'c001', 'temporary'],
        conteudo: `
            A **collection** is a "temporary table" owned by the user's session. It solves a classic APEX problem: every request may
            use a different pooled ORDS connection, so **package variables** and **global temporary tables** do not survive from one
            page to the next. Collections, on the other hand, are stored in APEX tables, tied to the **session** and the
            **application**, and disappear when the session ends and is purged.

            Typical uses: shopping carts, multi-step wizards that only save at the end, temporary selection lists, results of a REST
            call you want to page and filter, a "scratch area" before a final commit.

            ## Structure of a member
            Each row (member) has a sequence number and a fixed set of attributes:

            | Column in APEX_COLLECTIONS | Type | Count |
            |---|---|---|
            | «COLLECTION_NAME», «SEQ_ID» | Name (upper case) and sequence | — |
            | «C001» ... «C050» | VARCHAR2(4000) | 50 |
            | «N001» ... «N005» | NUMBER | 5 |
            | «D001» ... «D005» | DATE | 5 |
            | «CLOB001», «BLOB001», «XMLTYPE001» | LOBs and XML | 1 each |
            | «MD5_ORIGINAL» | Checksum to detect changes | — |

            With «MAX_STRING_SIZE=EXTENDED» in the database, attributes «C001»–«C050» accept up to 32,767 bytes.

            ## Main procedures
            | Call | What it does |
            |---|---|
            | «CREATE_COLLECTION» / «CREATE_OR_TRUNCATE_COLLECTION» | Creates (or empties, if it exists) |
            | «CREATE_COLLECTION_FROM_QUERY_B» | Creates from a query using bulk operations (fast) |
            | «ADD_MEMBER» / «ADD_MEMBERS» | Adds one member / many at once (arrays) |
            | «UPDATE_MEMBER» / «UPDATE_MEMBER_ATTRIBUTE» | Updates the whole member / one attribute |
            | «DELETE_MEMBER» / «TRUNCATE_COLLECTION» / «DELETE_COLLECTION» | Removes one member / all / the collection |
            | «COLLECTION_EXISTS», «COLLECTION_MEMBER_COUNT» | Checks and counts |
            | «SORT_MEMBERS», «RESEQUENCE_COLLECTION», «MOVE_MEMBER_UP» | Ordering and sequence |

            ## Example: shopping cart
            Process for the **Add** button:

            ~~~plsql
            begin
                if not apex_collection.collection_exists('CART') then
                    apex_collection.create_collection('CART');
                end if;

                apex_collection.add_member(
                    p_collection_name => 'CART',
                    p_c001            => :P10_PRODUCT_NAME,
                    p_n001            => to_number(:P10_PRODUCT_ID),
                    p_n002            => to_number(:P10_QUANTITY),
                    p_n003            => to_number(:P10_PRICE),
                    p_d001            => sysdate );
            end;
            ~~~

            Report region (Classic Report, Cards or Interactive Grid) on top of the collection:

            ~~~sql
            select seq_id,
                   c001        as product,
                   n002        as quantity,
                   n003        as price,
                   n002 * n003 as subtotal
              from apex_collections
             where collection_name = 'CART'
             order by seq_id;
            ~~~

            Changing the quantity (numeric attribute 2 = «N002») and, at the end, turning the cart into an order:

            ~~~plsql
            begin
                apex_collection.update_member_attribute(
                    p_collection_name => 'CART',
                    p_seq             => :P10_SEQ_ID,
                    p_attr_number     => 2,
                    p_number_value    => to_number(:P10_QUANTITY) );
            end;

            -- "Place order" process
            declare
                l_order_id orders.id%type;
            begin
                insert into orders (customer_id, order_date)
                values (:P10_CUSTOMER_ID, sysdate)
                returning id into l_order_id;

                insert into order_items (order_id, product_id, quantity, price)
                select l_order_id, n001, n002, n003
                  from apex_collections
                 where collection_name = 'CART';

                apex_collection.delete_collection('CART');
            end;
            ~~~

            ## Loading from a query
            ~~~plsql
            begin
                apex_collection.create_collection_from_query_b(
                    p_collection_name    => 'EMPLOYEES',
                    p_query              => 'select empno, ename, sal from emp where deptno = :b_dept',
                    p_names              => apex_string.string_to_table('b_dept'),
                    p_values             => apex_string.string_to_table(:P20_DEPTNO),
                    p_truncate_if_exists => 'YES' );
            end;
            ~~~

            Query columns fill «C001», «C002», «C003»... in order (as text). If you need numbers and dates in the «N» and «D»
            columns, use «CREATE_COLLECTION_FROM_QUERY2»/«QUERYB2», where the first 5 columns are numeric and the next 5 are
            dates. The «_B» variants are much faster but do not compute the MD5.

            :::atencao Upper-case names and scope
            The collection name is always converted to **upper case** — in the view filter by «'CART'», never «'Cart'». And
            remember: a collection belongs to the **session + application**. Another application (even with session sharing) or a
            job without a session cannot see it.
            :::

            :::dica When NOT to use collections
            For large volumes (tens of thousands of rows per session) or data that must survive logout, prefer a real table with a
            session or user column. For a single large value (e.g. a JSON document), an item with *Session State Data Type* CLOB
            (22.2+) may be simpler.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-exec',
    cat: 'plsql',
    nivel: 'avancado',
    desde: '18.1',
    links: [
        { t: 'APEX_EXEC (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_EXEC.html' },
        { t: 'Call Sequences for APEX_EXEC', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/call-sequences-for-APEX_EXEC.html' }
    ],
    relacionados: ['rest-data-sources', 'rest-enabled-sql', 'impressao-e-exportacao', 'apex-json', 'apis-plsql-visao-geral'],
    pt: {
        titulo: 'APEX_EXEC e fontes de dados',
        resumo: 'Uma única API para consultar e alterar dados locais, de REST Data Sources ou de bancos remotos (REST Enabled SQL), com filtros, ordenação e paginação.',
        tags: ['APEX_EXEC', 'OPEN_QUERY_CONTEXT', 'NEXT_ROW', 'GET_VARCHAR2', 'REST Data Source', 'REST Enabled SQL', 'ADD_FILTER', 'EXECUTE_DML', 'APEX_REGION.OPEN_QUERY_CONTEXT', 't_context'],
        conteudo: `
            Regiões do APEX não se importam se os dados vêm de uma tabela local, de uma API REST ou de outro banco: você escolhe a
            **Data Source** e o motor faz o resto. O pacote **APEX_EXEC** (desde o 18.1, junto com REST Enabled SQL e as fontes REST)
            oferece essa mesma abstração para o seu PL/SQL: o código de leitura é igual, qualquer que seja a origem.

            ## Quando usar
            - Ler, em PL/SQL, uma **REST Data Source** já configurada (com autenticação, paginação e mapeamento de colunas prontos).
            - Executar SQL ou PL/SQL em um banco remoto via **REST Enabled SQL**, sem database link.
            - Aplicar filtros e ordenação de forma declarativa, que o APEX traduz para cada tipo de fonte.
            - Escrever plug-ins de região que funcionem com qualquer Data Source.
            - Alimentar «APEX_DATA_EXPORT» para gerar PDF, XLSX ou CSV.

            :::atencao Requer sessão APEX
            Todas as chamadas do APEX_EXEC exigem uma sessão APEX. Em páginas, processos e Automations ela já existe; em SQLcl ou
            jobs, crie uma com «apex_session.create_session». E **sempre** feche o contexto com «apex_exec.close» — inclusive no
            bloco de exceção — para liberar cursores e LOBs temporários.
            :::

            ## O ciclo de uma consulta
            1. (Opcional) monte parâmetros («ADD_PARAMETER»), filtros («ADD_FILTER») e ordenação («ADD_ORDER_BY»).
            2. Abra o contexto: «OPEN_QUERY_CONTEXT», «OPEN_REST_SOURCE_QUERY» ou «OPEN_REMOTE_SQL_QUERY».
            3. Descubra a posição das colunas com «GET_COLUMN_POSITION».
            4. Percorra com «NEXT_ROW» e leia com «GET_VARCHAR2», «GET_NUMBER», «GET_DATE», «GET_CLOB»...
            5. Feche com «CLOSE».

            ~~~plsql
            declare
                l_ctx     apex_exec.t_context;
                l_filtros apex_exec.t_filters;
                l_idx_nome pls_integer;
                l_idx_sal  pls_integer;
            begin
                apex_exec.add_filter(
                    p_filters     => l_filtros,
                    p_filter_type => apex_exec.c_filter_gt,
                    p_column_name => 'SAL',
                    p_value       => 2000 );

                l_ctx := apex_exec.open_query_context(
                    p_location  => apex_exec.c_location_local_db,
                    p_sql_query => 'select ename, sal from emp',
                    p_filters   => l_filtros,
                    p_max_rows  => 100 );

                l_idx_nome := apex_exec.get_column_position(l_ctx, 'ENAME');
                l_idx_sal  := apex_exec.get_column_position(l_ctx, 'SAL');

                while apex_exec.next_row(l_ctx) loop
                    apex_debug.info('%s ganha %s',
                        apex_exec.get_varchar2(l_ctx, l_idx_nome),
                        apex_exec.get_number(l_ctx, l_idx_sal));
                end loop;

                apex_exec.close(l_ctx);
            exception
                when others then
                    apex_exec.close(l_ctx);
                    raise;
            end;
            ~~~

            Para ler uma REST Data Source basta trocar a abertura — o restante do loop é idêntico:

            ~~~plsql
            l_ctx := apex_exec.open_rest_source_query(
                         p_static_id => 'CLIENTES_API',   -- Static ID da REST Data Source
                         p_filters   => l_filtros,
                         p_max_rows  => 500 );
            ~~~

            ## Locais de dados (p_location)
            | Constante | Fonte |
            |---|---|
            | «c_location_local_db» | Banco local (schema de parsing) |
            | «c_location_remote_db» | REST Enabled SQL («p_server_static_id») |
            | «c_location_rest_source» | REST Data Source |
            | «c_location_json_source», «c_location_duality_view» | JSON Sources e Duality Views (24.2+) |
            | «c_location_sample_data» | Dados de exemplo (26.1) |

            ## Executando PL/SQL e DML
            - «EXECUTE_PLSQL» e «EXECUTE_REMOTE_PLSQL» executam blocos com binds de entrada e saída («T_PARAMETERS»).
            - «EXECUTE_REST_SOURCE» chama uma operação (ex.: POST) de uma REST Data Source.
            - Para DML: «OPEN_LOCAL_DML_CONTEXT» / «OPEN_REST_SOURCE_DML_CONTEXT» / «OPEN_REMOTE_DML_CONTEXT», depois
              «ADD_DML_ROW», «SET_VALUE» e «EXECUTE_DML» — com detecção de *lost update* opcional.

            ~~~plsql
            declare
                l_params apex_exec.t_parameters;
            begin
                apex_exec.add_parameter(l_params, 'NOME',  :P5_NOME);
                apex_exec.add_parameter(l_params, 'EMAIL', :P5_EMAIL);

                apex_exec.execute_rest_source(
                    p_static_id  => 'CLIENTES_API',
                    p_operation  => 'POST',
                    p_parameters => l_params );

                :P5_RESPOSTA := apex_exec.get_parameter_clob(l_params, 'RESPONSE');
            end;
            ~~~

            :::dica Os dados que o usuário está vendo
            «APEX_REGION.OPEN_QUERY_CONTEXT(p_page_id, p_region_id)» devolve um contexto APEX_EXEC com a consulta de uma região
            **incluindo os filtros** aplicados pelo usuário (ex.: em um Interactive Report). Combine com
            «APEX_DATA_EXPORT.EXPORT» para gerar arquivos ou com «APEX_JSON.WRITE_CONTEXT» para serializar em JSON.
            «DESCRIBE_QUERY» (24.1) descreve as colunas de uma query sem executá-la.
            :::
        `
    },
    en: {
        titulo: 'APEX_EXEC and data sources',
        resumo: 'One API to query and change local data, REST Data Sources or remote databases (REST Enabled SQL), with filters, sorting and pagination.',
        tags: ['APEX_EXEC', 'OPEN_QUERY_CONTEXT', 'NEXT_ROW', 'GET_VARCHAR2', 'REST Data Source', 'REST Enabled SQL', 'ADD_FILTER', 'EXECUTE_DML', 'APEX_REGION.OPEN_QUERY_CONTEXT', 't_context'],
        conteudo: `
            APEX regions do not care whether data comes from a local table, a REST API or another database: you pick the
            **Data Source** and the engine does the rest. The **APEX_EXEC** package (since 18.1, together with REST Enabled SQL and
            REST sources) gives your PL/SQL that same abstraction: the reading code is identical regardless of the origin.

            ## When to use it
            - Read, in PL/SQL, a configured **REST Data Source** (authentication, pagination and column mapping already done).
            - Run SQL or PL/SQL on a remote database through **REST Enabled SQL**, without a database link.
            - Apply filters and sorting declaratively, which APEX translates for each source type.
            - Write region plug-ins that work with any Data Source.
            - Feed «APEX_DATA_EXPORT» to produce PDF, XLSX or CSV.

            :::atencao Requires an APEX session
            Every APEX_EXEC call needs an APEX session. Pages, processes and Automations already have one; in SQLcl or jobs,
            create it with «apex_session.create_session». And **always** close the context with «apex_exec.close» — also in the
            exception handler — to release cursors and temporary LOBs.
            :::

            ## The query cycle
            1. (Optional) build parameters («ADD_PARAMETER»), filters («ADD_FILTER») and sorting («ADD_ORDER_BY»).
            2. Open the context: «OPEN_QUERY_CONTEXT», «OPEN_REST_SOURCE_QUERY» or «OPEN_REMOTE_SQL_QUERY».
            3. Find column positions with «GET_COLUMN_POSITION».
            4. Loop with «NEXT_ROW» and read with «GET_VARCHAR2», «GET_NUMBER», «GET_DATE», «GET_CLOB»...
            5. Close with «CLOSE».

            ~~~plsql
            declare
                l_ctx      apex_exec.t_context;
                l_filters  apex_exec.t_filters;
                l_idx_name pls_integer;
                l_idx_sal  pls_integer;
            begin
                apex_exec.add_filter(
                    p_filters     => l_filters,
                    p_filter_type => apex_exec.c_filter_gt,
                    p_column_name => 'SAL',
                    p_value       => 2000 );

                l_ctx := apex_exec.open_query_context(
                    p_location  => apex_exec.c_location_local_db,
                    p_sql_query => 'select ename, sal from emp',
                    p_filters   => l_filters,
                    p_max_rows  => 100 );

                l_idx_name := apex_exec.get_column_position(l_ctx, 'ENAME');
                l_idx_sal  := apex_exec.get_column_position(l_ctx, 'SAL');

                while apex_exec.next_row(l_ctx) loop
                    apex_debug.info('%s earns %s',
                        apex_exec.get_varchar2(l_ctx, l_idx_name),
                        apex_exec.get_number(l_ctx, l_idx_sal));
                end loop;

                apex_exec.close(l_ctx);
            exception
                when others then
                    apex_exec.close(l_ctx);
                    raise;
            end;
            ~~~

            To read a REST Data Source just change how the context is opened — the rest of the loop is the same:

            ~~~plsql
            l_ctx := apex_exec.open_rest_source_query(
                         p_static_id => 'CUSTOMERS_API',   -- REST Data Source static ID
                         p_filters   => l_filters,
                         p_max_rows  => 500 );
            ~~~

            ## Data locations (p_location)
            | Constant | Source |
            |---|---|
            | «c_location_local_db» | Local database (parsing schema) |
            | «c_location_remote_db» | REST Enabled SQL («p_server_static_id») |
            | «c_location_rest_source» | REST Data Source |
            | «c_location_json_source», «c_location_duality_view» | JSON Sources and Duality Views (24.2+) |
            | «c_location_sample_data» | Sample data (26.1) |

            ## Running PL/SQL and DML
            - «EXECUTE_PLSQL» and «EXECUTE_REMOTE_PLSQL» run blocks with in and out binds («T_PARAMETERS»).
            - «EXECUTE_REST_SOURCE» invokes an operation (e.g. POST) of a REST Data Source.
            - For DML: «OPEN_LOCAL_DML_CONTEXT» / «OPEN_REST_SOURCE_DML_CONTEXT» / «OPEN_REMOTE_DML_CONTEXT», then «ADD_DML_ROW»,
              «SET_VALUE» and «EXECUTE_DML» — with optional *lost update* detection.

            ~~~plsql
            declare
                l_params apex_exec.t_parameters;
            begin
                apex_exec.add_parameter(l_params, 'NAME',  :P5_NAME);
                apex_exec.add_parameter(l_params, 'EMAIL', :P5_EMAIL);

                apex_exec.execute_rest_source(
                    p_static_id  => 'CUSTOMERS_API',
                    p_operation  => 'POST',
                    p_parameters => l_params );

                :P5_RESPONSE := apex_exec.get_parameter_clob(l_params, 'RESPONSE');
            end;
            ~~~

            :::dica The data the user is looking at
            «APEX_REGION.OPEN_QUERY_CONTEXT(p_page_id, p_region_id)» returns an APEX_EXEC context with a region's query
            **including the filters** the user applied (e.g. in an Interactive Report). Combine it with «APEX_DATA_EXPORT.EXPORT»
            to produce files or with «APEX_JSON.WRITE_CONTEXT» to serialize it as JSON. «DESCRIBE_QUERY» (24.1) describes a
            query's columns without running it.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-json',
    cat: 'plsql',
    nivel: 'intermediario',
    desde: '5.0',
    links: [
        { t: 'APEX_JSON (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_JSON.html' },
        { t: 'APEX_JSON — Overview and Examples', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/Package-Overview-and-Examples.html' }
    ],
    relacionados: ['apex-web-service', 'ajax-callbacks', 'apex-exec', 'restful-services-ords'],
    pt: {
        titulo: 'Trabalhando com JSON (APEX_JSON e JSON nativo do banco)',
        resumo: 'Quando usar APEX_JSON e quando usar JSON_TABLE, JSON_OBJECT e JSON_OBJECT_T para ler e gerar JSON em processos, Ajax Callbacks e integrações.',
        tags: ['JSON', 'APEX_JSON', 'JSON_TABLE', 'JSON_OBJECT', 'JSON_ARRAYAGG', 'JSON_OBJECT_T', 'parse', 'Ajax Callback', 'REST', 'write'],
        conteudo: `
            JSON está em toda parte no APEX: respostas de APIs REST, chamadas AJAX, configurações de plug-ins, placeholders de
            templates de e-mail. Você tem duas famílias de ferramentas:

            - **APEX_JSON** (desde o APEX 5.0): pacote PL/SQL para *parse* e geração. Escreve direto no buffer HTP, o que é
              muito prático em processos **Ajax Callback**.
            - **SQL/JSON nativo do banco**: «JSON_TABLE», «JSON_VALUE», «JSON_QUERY», «JSON_OBJECT», «JSON_ARRAYAGG» e os tipos
              PL/SQL «JSON_OBJECT_T»/«JSON_ARRAY_T». Implementado no kernel do banco, costuma ser bem mais rápido em volumes grandes.

            ## Qual usar?
            | Tarefa | Recomendação |
            |---|---|
            | Transformar uma resposta JSON em linhas | «JSON_TABLE» |
            | Gerar JSON a partir de tabelas | «JSON_OBJECT» + «JSON_ARRAYAGG» |
            | Manipular um documento em PL/SQL | «JSON_OBJECT_T» / «JSON_ARRAY_T» |
            | Responder a um Ajax Callback | «APEX_JSON» (escreve no HTP) ou «htp.p» com JSON gerado em SQL |
            | Serializar um cursor ou um contexto APEX_EXEC | «APEX_JSON.WRITE(p_name, p_cursor)», «WRITE_CONTEXT» |
            | Código legado / bancos antigos | «APEX_JSON» |

            ## Lendo JSON com JSON_TABLE
            Imagine que uma integração gravou a resposta de uma API em «integracao_log.payload» (CLOB):

            ~~~sql
            select jt.*
              from integracao_log l,
                   json_table(l.payload, '$.items[*]'
                     columns (
                       id     number         path '$.id',
                       nome   varchar2(200)  path '$.name',
                       email  varchar2(320)  path '$.contact.email',
                       nested path '$.tags[*]'
                         columns ( tag varchar2(50) path '$' )
                     )) jt
             where l.id = :P20_LOG_ID;
            ~~~

            Essa query pode ser a fonte de um Interactive Report — com filtros, ordenação e download, sem uma linha de PL/SQL.

            ## Lendo JSON com APEX_JSON
            ~~~plsql
            declare
                l_json  apex_json.t_values;
                l_total pls_integer;
            begin
                apex_json.parse(p_values => l_json, p_source => l_resposta);   -- l_resposta: CLOB

                l_total := nvl(apex_json.get_count(p_path => 'items', p_values => l_json), 0);

                for i in 1 .. l_total loop
                    apex_debug.info('%s <%s>',
                        apex_json.get_varchar2(p_path => 'items[%d].name', p0 => i, p_values => l_json),
                        apex_json.get_varchar2(p_path => 'items[%d].contact.email', p0 => i, p_values => l_json));
                end loop;
            end;
            ~~~

            :::atencao Índices começam em 1
            Nos caminhos do APEX_JSON («items[%d]») o primeiro elemento é o **1**. Já em «JSON_ARRAY_T.GET(i)» o primeiro é o
            **0**. E se você chamar «apex_json.parse(p_source => ...)» sem «p_values», o resultado vai para a variável global
            «g_values», que é sobrescrita pelo próximo parse.
            :::

            ## Gerando JSON em SQL
            ~~~sql
            select json_object(
                     'id'      value c.id,
                     'nome'    value c.nome,
                     'pedidos' value (
                         select json_arrayagg(
                                  json_object('id' value p.id, 'total' value p.total)
                                  returning clob)
                           from pedidos p
                          where p.cliente_id = c.id )
                     returning clob) as documento
              from clientes c
             where c.id = :P20_CLIENTE_ID;
            ~~~

            ## Respondendo a um Ajax Callback
            Processo **Ajax Callback** chamado «RESUMO_CLIENTE». O APEX_JSON escreve no buffer HTP, que vira a resposta HTTP:

            ~~~plsql
            declare
                l_total number;
            begin
                select count(*) into l_total
                  from pedidos
                 where cliente_id = apex_application.g_x01;

                apex_json.open_object;
                apex_json.write('clienteId',    apex_application.g_x01);
                apex_json.write('totalPedidos', l_total);
                apex_json.open_array('ultimos');
                for r in (select id, data_pedido
                            from pedidos
                           where cliente_id = apex_application.g_x01
                           order by data_pedido desc
                           fetch first 5 rows only) loop
                    apex_json.open_object;
                    apex_json.write('id',   r.id);
                    apex_json.write('data', r.data_pedido);
                    apex_json.close_object;
                end loop;
                apex_json.close_array;
                apex_json.close_object;
            end;
            ~~~

            ~~~js
            apex.server.process("RESUMO_CLIENTE",
                { x01: apex.item("P20_CLIENTE_ID").getValue() },
                { dataType: "json" }
            ).then(function (data) {
                apex.message.showPageSuccess("Pedidos: " + data.totalPedidos);
            });
            ~~~

            Para gerar em um CLOB em vez do HTP (ex.: para enviar a uma API), use «apex_json.initialize_clob_output»,
            «apex_json.get_clob_output» e, no final, «apex_json.free_output».

            :::novo JSON Sources e Duality Views (24.2)
            Desde o 24.2 as regiões podem usar **JSON Sources** — coleções JSON e, no Oracle AI Database 26ai, **JSON-Relational
            Duality Views** — como Data Source, e o APEX_EXEC ganhou os locais correspondentes. Antes de escrever código de parse,
            verifique se a fonte declarativa já resolve.
            :::
        `
    },
    en: {
        titulo: 'Working with JSON (APEX_JSON and native database JSON)',
        resumo: 'When to use APEX_JSON and when to use JSON_TABLE, JSON_OBJECT and JSON_OBJECT_T to read and generate JSON in processes, Ajax Callbacks and integrations.',
        tags: ['JSON', 'APEX_JSON', 'JSON_TABLE', 'JSON_OBJECT', 'JSON_ARRAYAGG', 'JSON_OBJECT_T', 'parse', 'Ajax Callback', 'REST', 'write'],
        conteudo: `
            JSON is everywhere in APEX: REST API responses, AJAX calls, plug-in settings, e-mail template placeholders. You have two
            families of tools:

            - **APEX_JSON** (since APEX 5.0): a PL/SQL package for parsing and generating. It writes straight to the HTP buffer,
              which is very handy in **Ajax Callback** processes.
            - **Native database SQL/JSON**: «JSON_TABLE», «JSON_VALUE», «JSON_QUERY», «JSON_OBJECT», «JSON_ARRAYAGG» and the PL/SQL
              types «JSON_OBJECT_T»/«JSON_ARRAY_T». Implemented in the database kernel, it is usually much faster on large volumes.

            ## Which one?
            | Task | Recommendation |
            |---|---|
            | Turn a JSON response into rows | «JSON_TABLE» |
            | Generate JSON from tables | «JSON_OBJECT» + «JSON_ARRAYAGG» |
            | Manipulate a document in PL/SQL | «JSON_OBJECT_T» / «JSON_ARRAY_T» |
            | Answer an Ajax Callback | «APEX_JSON» (writes to HTP) or «htp.p» with JSON built in SQL |
            | Serialize a cursor or an APEX_EXEC context | «APEX_JSON.WRITE(p_name, p_cursor)», «WRITE_CONTEXT» |
            | Legacy code / old databases | «APEX_JSON» |

            ## Reading JSON with JSON_TABLE
            Suppose an integration stored an API response in «integration_log.payload» (CLOB):

            ~~~sql
            select jt.*
              from integration_log l,
                   json_table(l.payload, '$.items[*]'
                     columns (
                       id     number         path '$.id',
                       name   varchar2(200)  path '$.name',
                       email  varchar2(320)  path '$.contact.email',
                       nested path '$.tags[*]'
                         columns ( tag varchar2(50) path '$' )
                     )) jt
             where l.id = :P20_LOG_ID;
            ~~~

            This query can be the source of an Interactive Report — with filters, sorting and download, without a line of PL/SQL.

            ## Reading JSON with APEX_JSON
            ~~~plsql
            declare
                l_json  apex_json.t_values;
                l_total pls_integer;
            begin
                apex_json.parse(p_values => l_json, p_source => l_response);   -- l_response: CLOB

                l_total := nvl(apex_json.get_count(p_path => 'items', p_values => l_json), 0);

                for i in 1 .. l_total loop
                    apex_debug.info('%s <%s>',
                        apex_json.get_varchar2(p_path => 'items[%d].name', p0 => i, p_values => l_json),
                        apex_json.get_varchar2(p_path => 'items[%d].contact.email', p0 => i, p_values => l_json));
                end loop;
            end;
            ~~~

            :::atencao Indexes start at 1
            In APEX_JSON paths («items[%d]») the first element is **1**. In «JSON_ARRAY_T.GET(i)» the first one is **0**. And if
            you call «apex_json.parse(p_source => ...)» without «p_values», the result goes to the global «g_values» variable,
            which the next parse overwrites.
            :::

            ## Generating JSON in SQL
            ~~~sql
            select json_object(
                     'id'     value c.id,
                     'name'   value c.name,
                     'orders' value (
                         select json_arrayagg(
                                  json_object('id' value o.id, 'total' value o.total)
                                  returning clob)
                           from orders o
                          where o.customer_id = c.id )
                     returning clob) as document
              from customers c
             where c.id = :P20_CUSTOMER_ID;
            ~~~

            ## Answering an Ajax Callback
            An **Ajax Callback** process named «CUSTOMER_SUMMARY». APEX_JSON writes to the HTP buffer, which becomes the HTTP
            response:

            ~~~plsql
            declare
                l_total number;
            begin
                select count(*) into l_total
                  from orders
                 where customer_id = apex_application.g_x01;

                apex_json.open_object;
                apex_json.write('customerId',  apex_application.g_x01);
                apex_json.write('totalOrders', l_total);
                apex_json.open_array('latest');
                for r in (select id, order_date
                            from orders
                           where customer_id = apex_application.g_x01
                           order by order_date desc
                           fetch first 5 rows only) loop
                    apex_json.open_object;
                    apex_json.write('id',   r.id);
                    apex_json.write('date', r.order_date);
                    apex_json.close_object;
                end loop;
                apex_json.close_array;
                apex_json.close_object;
            end;
            ~~~

            ~~~js
            apex.server.process("CUSTOMER_SUMMARY",
                { x01: apex.item("P20_CUSTOMER_ID").getValue() },
                { dataType: "json" }
            ).then(function (data) {
                apex.message.showPageSuccess("Orders: " + data.totalOrders);
            });
            ~~~

            To write to a CLOB instead of HTP (e.g. to send it to an API), use «apex_json.initialize_clob_output»,
            «apex_json.get_clob_output» and, at the end, «apex_json.free_output».

            :::novo JSON Sources and Duality Views (24.2)
            Since 24.2 regions can use **JSON Sources** — JSON collections and, on Oracle AI Database 26ai,
            **JSON-Relational Duality Views** — as a Data Source, and APEX_EXEC gained the matching locations. Before writing parsing
            code, check whether the declarative source already does the job.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-string-e-utilitarios',
    cat: 'plsql',
    nivel: 'intermediario',
    links: [
        { t: 'APEX_STRING (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_STRING.html' },
        { t: 'APEX_UTIL (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_UTIL.html' },
        { t: 'APEX_ESCAPE (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_ESCAPE.html' }
    ],
    relacionados: ['escaping-e-xss', 'apis-plsql-visao-geral', 'urls-do-apex', 'sessao-e-session-state', 'listas-de-valores'],
    pt: {
        titulo: 'APEX_STRING, APEX_UTIL, APEX_ESCAPE e outros utilitários',
        resumo: 'As funções do dia a dia: dividir e juntar listas, formatar mensagens, escapar HTML, gerar slugs, ler preferências e redirecionar.',
        tags: ['APEX_STRING', 'SPLIT', 'JOIN', 'FORMAT', 'APEX_UTIL', 'APEX_ESCAPE', 'APEX_STRING_UTIL', 'apex_t_varchar2', 'GET_SLUG', 'multi-seleção'],
        conteudo: `
            Alguns pacotes aparecem em praticamente toda aplicação APEX. Conhecê-los evita reinventar funções de *split*,
            concatenação e escape — e evita bugs de segurança.

            ## APEX_STRING (desde o 5.1)
            Trabalha com strings e com os tipos de coleção «apex_t_varchar2» e «apex_t_number».

            | Função | O que faz |
            |---|---|
            | «SPLIT(p_str, p_sep)» | Divide em «apex_t_varchar2» (separador de 1 caractere ou expressão regular) |
            | «SPLIT_NUMBERS» | Divide em «apex_t_number» |
            | «JOIN(p_table, p_sep)» | Junta uma coleção em uma string |
            | «FORMAT(p_message, p0, p1...)» | Mensagem com placeholders «%s» ou «%0»...«%19» |
            | «PUSH» | Acrescenta elementos a uma coleção |
            | «GREP» | Filtra uma coleção por expressão regular |
            | «PLIST_GET», «PLIST_PUT» | Listas chave/valor simples |
            | «GET_INITIALS», «NEXT_CHUNK», «SHUFFLE» | Iniciais, leitura de CLOB em pedaços, embaralhar |
            | «STRING_TO_TABLE», «TABLE_TO_STRING» | Substitutos das versões depreciadas do APEX_UTIL |

            ### Multi-seleção em SQL
            Checkbox Group, Shuttle e Select Many (no modo de valores separados) devolvem algo como «10:20:30». Para filtrar:

            ~~~sql
            select e.ename, e.sal
              from emp e
             where e.deptno in (select column_value
                                  from table(apex_string.split_numbers(:P5_DEPTOS, ':')));
            ~~~

            ### Formatando mensagens
            ~~~plsql
            declare
                l_msg varchar2(4000);
            begin
                l_msg := apex_string.format('Pedido %0 de %1 aprovado por %2', :P10_ID, :P10_CLIENTE, :APP_USER);
                apex_debug.info(l_msg);

                l_msg := apex_string.join(apex_t_varchar2('a', 'b', 'c'), ', ');   -- a, b, c
            end;
            ~~~

            :::atencao FORMAT corta parâmetros longos
            Por padrão, «APEX_STRING.FORMAT» limita **cada parâmetro** a 1000 caracteres («p_max_length») e acrescenta «~» quando
            corta. Para textos longos, passe «p_max_length => null» ou concatene de outra forma.
            :::

            ## APEX_STRING_UTIL (desde o 20.1)
            Funções de texto mais "de aplicação": «GET_SLUG» (texto amigável para URLs), «TO_DISPLAY_FILESIZE» (ex.: 2,5 MB),
            «GET_FILE_EXTENSION», «GET_DOMAIN», «FIND_EMAIL_ADDRESSES», «FIND_LINKS», «PHRASE_EXISTS» e «DIFF» (diferenças
            entre dois textos).

            ## APEX_UTIL
            O pacote mais antigo e mais "variado". Os usos mais comuns hoje:

            | Chamada | Uso |
            |---|---|
            | «SET_SESSION_STATE», «GET_SESSION_STATE» | Gravar/ler itens (no 22.2+ há também «APEX_SESSION_STATE», com tipos) |
            | «REDIRECT_URL» | Redirecionar a partir de um processo |
            | «PREPARE_URL» | Acrescentar checksum a uma URL (prefira «APEX_PAGE.GET_URL») |
            | «SET_PREFERENCE», «GET_PREFERENCE» | Preferências persistentes por usuário |
            | «CURRENT_USER_IN_GROUP» | Grupos de usuários (contas APEX) |
            | «GET_BLOB_FILE_SRC» | URL para exibir/baixar um BLOB |
            | «CLEAR_PAGE_CACHE», «CLEAR_APP_CACHE» | Limpar session state |
            | «SET_WORKSPACE», «SET_SECURITY_GROUP_ID» | Definir o workspace fora de uma sessão APEX |

            Várias funções antigas estão marcadas como **Deprecated** na 26.1 (ex.: «STRING_TO_TABLE», «TABLE_TO_STRING»,
            «GET_BUILD_OPTION_STATUS» — esta última agora em «APEX_APPLICATION_ADMIN»). Evite-as em código novo.

            ## APEX_ESCAPE: segurança ao gerar HTML
            Sempre que você montar HTML, JavaScript ou CSV manualmente, escape os dados conforme o **contexto**:

            | Função | Contexto |
            |---|---|
            | «HTML» | Conteúdo de elementos HTML |
            | «HTML_ATTRIBUTE» | Valor de atributo HTML |
            | «JS_LITERAL» | String JavaScript (inclui as aspas) |
            | «JSON», «CSV», «REGEXP», «LDAP_DN» | Outros formatos |
            | «STRIPHTML», «HTML_ALLOWLIST» | Remover tags / permitir só tags seguras |

            ~~~plsql
            -- Região Dynamic Content (função que retorna CLOB)
            declare
                l_html clob;
            begin
                for r in (select nome, email from clientes where ativo = 'S' order by nome) loop
                    l_html := l_html || apex_string.format(
                        '<li title="%1">%0</li>',
                        apex_escape.html(r.nome),
                        apex_escape.html_attribute(r.email));
                end loop;
                return '<ul>' || l_html || '</ul>';
            end;
            ~~~

            :::dica Antes de escrever HTML no PL/SQL
            Muitas vezes um Classic Report com *HTML Expression*, um **Template Component** ou **Template Directives** resolvem o
            mesmo problema com escape automático. Veja [XSS e escaping](#/topico/escaping-e-xss).
            :::
        `
    },
    en: {
        titulo: 'APEX_STRING, APEX_UTIL, APEX_ESCAPE and other utilities',
        resumo: 'The everyday functions: splitting and joining lists, formatting messages, escaping HTML, building slugs, reading preferences and redirecting.',
        tags: ['APEX_STRING', 'SPLIT', 'JOIN', 'FORMAT', 'APEX_UTIL', 'APEX_ESCAPE', 'APEX_STRING_UTIL', 'apex_t_varchar2', 'GET_SLUG', 'multi-select'],
        conteudo: `
            Some packages show up in almost every APEX application. Knowing them saves you from reinventing *split*, concatenation
            and escaping functions — and prevents security bugs.

            ## APEX_STRING (since 5.1)
            Works with strings and with the collection types «apex_t_varchar2» and «apex_t_number».

            | Function | What it does |
            |---|---|
            | «SPLIT(p_str, p_sep)» | Splits into «apex_t_varchar2» (single-character separator or regular expression) |
            | «SPLIT_NUMBERS» | Splits into «apex_t_number» |
            | «JOIN(p_table, p_sep)» | Joins a collection into a string |
            | «FORMAT(p_message, p0, p1...)» | Message with «%s» or «%0»...«%19» placeholders |
            | «PUSH» | Appends elements to a collection |
            | «GREP» | Filters a collection with a regular expression |
            | «PLIST_GET», «PLIST_PUT» | Simple key/value lists |
            | «GET_INITIALS», «NEXT_CHUNK», «SHUFFLE» | Initials, reading a CLOB in chunks, shuffling |
            | «STRING_TO_TABLE», «TABLE_TO_STRING» | Replacements for the deprecated APEX_UTIL versions |

            ### Multi-select in SQL
            Checkbox Group, Shuttle and Select Many (in separated-values mode) return something like «10:20:30». To filter:

            ~~~sql
            select e.ename, e.sal
              from emp e
             where e.deptno in (select column_value
                                  from table(apex_string.split_numbers(:P5_DEPTS, ':')));
            ~~~

            ### Formatting messages
            ~~~plsql
            declare
                l_msg varchar2(4000);
            begin
                l_msg := apex_string.format('Order %0 for %1 approved by %2', :P10_ID, :P10_CUSTOMER, :APP_USER);
                apex_debug.info(l_msg);

                l_msg := apex_string.join(apex_t_varchar2('a', 'b', 'c'), ', ');   -- a, b, c
            end;
            ~~~

            :::atencao FORMAT truncates long parameters
            By default «APEX_STRING.FORMAT» caps **each parameter** at 1000 characters («p_max_length») and appends «~» when it
            truncates. For long text pass «p_max_length => null» or concatenate in another way.
            :::

            ## APEX_STRING_UTIL (since 20.1)
            More "application-level" text helpers: «GET_SLUG» (URL-friendly text), «TO_DISPLAY_FILESIZE» (e.g. 2.5 MB),
            «GET_FILE_EXTENSION», «GET_DOMAIN», «FIND_EMAIL_ADDRESSES», «FIND_LINKS», «PHRASE_EXISTS» and «DIFF» (differences
            between two texts).

            ## APEX_UTIL
            The oldest and most "assorted" package. The most common uses today:

            | Call | Use |
            |---|---|
            | «SET_SESSION_STATE», «GET_SESSION_STATE» | Write/read items (22.2+ also has the typed «APEX_SESSION_STATE») |
            | «REDIRECT_URL» | Redirect from a process |
            | «PREPARE_URL» | Add a checksum to a URL (prefer «APEX_PAGE.GET_URL») |
            | «SET_PREFERENCE», «GET_PREFERENCE» | Persistent per-user preferences |
            | «CURRENT_USER_IN_GROUP» | User groups (APEX accounts) |
            | «GET_BLOB_FILE_SRC» | URL to display/download a BLOB |
            | «CLEAR_PAGE_CACHE», «CLEAR_APP_CACHE» | Clear session state |
            | «SET_WORKSPACE», «SET_SECURITY_GROUP_ID» | Set the workspace outside an APEX session |

            Several old functions are marked **Deprecated** in 26.1 (e.g. «STRING_TO_TABLE», «TABLE_TO_STRING»,
            «GET_BUILD_OPTION_STATUS» — the latter now lives in «APEX_APPLICATION_ADMIN»). Avoid them in new code.

            ## APEX_ESCAPE: safety when generating HTML
            Whenever you build HTML, JavaScript or CSV by hand, escape the data according to its **context**:

            | Function | Context |
            |---|---|
            | «HTML» | HTML element content |
            | «HTML_ATTRIBUTE» | HTML attribute value |
            | «JS_LITERAL» | JavaScript string (quotes included) |
            | «JSON», «CSV», «REGEXP», «LDAP_DN» | Other formats |
            | «STRIPHTML», «HTML_ALLOWLIST» | Strip tags / allow only safe tags |

            ~~~plsql
            -- Dynamic Content region (function returning CLOB)
            declare
                l_html clob;
            begin
                for r in (select name, email from customers where active = 'Y' order by name) loop
                    l_html := l_html || apex_string.format(
                        '<li title="%1">%0</li>',
                        apex_escape.html(r.name),
                        apex_escape.html_attribute(r.email));
                end loop;
                return '<ul>' || l_html || '</ul>';
            end;
            ~~~

            :::dica Before writing HTML in PL/SQL
            Often a Classic Report with an *HTML Expression*, a **Template Component** or **Template Directives** solve the same
            problem with automatic escaping. See [XSS and escaping](#/topico/escaping-e-xss).
            :::
        `
    }
});

DOC.topico({
    id: 'dicionario-apex',
    cat: 'plsql',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Accessing APEX Views', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/accessing-apex-views.html' },
        { t: 'App Builder Guide — Workflow Views', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/workflow-views.html' },
        { t: 'App Builder Guide — Runtime Views for Tasks', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/runtime-views-for-tasks.html' }
    ],
    relacionados: ['arquitetura', 'checklist-de-qualidade', 'apex-debug-e-logs', 'monitoramento', 'workspaces-e-aplicacoes'],
    pt: {
        titulo: 'Views do dicionário do APEX (APEX_APPLICATION_*, APEX_WORKSPACE_*)',
        resumo: 'Consulte por SQL os metadados das aplicações e os logs de uso: páginas, regiões, processos, atividade, e-mails, tarefas e workflows.',
        tags: ['dicionário', 'APEX_DICTIONARY', 'APEX_APPLICATIONS', 'APEX_APPLICATION_PAGES', 'APEX_WORKSPACE_ACTIVITY_LOG', 'metadados', 'views', 'auditoria', 'APEX_RELEASE'],
        conteudo: `
            Como o APEX é dirigido por metadados, **tudo** o que você configura no App Builder fica em tabelas — e é exposto por
            dezenas de views públicas com prefixo «APEX_». Elas são a base para auditorias, documentação automática, painéis de uso
            e verificações de qualidade (o próprio App Builder usa essas informações em seus relatórios).

            ## Descobrindo as views
            - A view **«APEX_DICTIONARY»** lista todas as views do APEX, suas colunas e comentários.
            - No App Builder: **Application → Utilities → Oracle APEX Views** mostra as views em lista ou árvore (*Tree View*),
              permite escolher colunas, ver o resultado e copiar a query.

            ~~~sql
            -- Colunas e descrições de uma view
            select column_name, comments
              from apex_dictionary
             where apex_view_name = 'APEX_APPLICATION_PAGE_ITEMS'
             order by column_id;
            ~~~

            ## As views mais úteis
            | Grupo | Views |
            |---|---|
            | Instância e workspace | «APEX_RELEASE», «APEX_PATCHES», «APEX_WORKSPACES», «APEX_WORKSPACE_SCHEMAS», «APEX_WORKSPACE_APEX_USERS» |
            | Aplicação | «APEX_APPLICATIONS», «APEX_APPLICATION_ITEMS», «APEX_APPLICATION_PROCESSES», «APEX_APPLICATION_LOVS» |
            | Páginas | «APEX_APPLICATION_PAGES», «APEX_APPLICATION_PAGE_REGIONS», «APEX_APPLICATION_PAGE_ITEMS», «APEX_APPLICATION_PAGE_BUTTONS» |
            | Lógica | «APEX_APPLICATION_PAGE_PROC», «APEX_APPLICATION_PAGE_VAL», «APEX_APPLICATION_PAGE_DA», «APEX_APPLICATION_PAGE_DA_ACTS» |
            | Segurança | «APEX_APPLICATION_AUTH», «APEX_APPLICATION_AUTHORIZATION» |
            | Arquivos | «APEX_APPLICATION_STATIC_FILES», «APEX_WORKSPACE_STATIC_FILES», «APEX_APPLICATION_TEMP_FILES» |
            | Uso e logs | «APEX_WORKSPACE_ACTIVITY_LOG», «APEX_WORKSPACE_ACCESS_LOG», «APEX_DEBUG_MESSAGES» |
            | E-mail | «APEX_MAIL_QUEUE», «APEX_MAIL_LOG» |
            | Sessão | «APEX_COLLECTIONS» |
            | Tarefas e workflows | «APEX_TASKS», «APEX_TASK_HISTORY», «APEX_WORKFLOWS», «APEX_WORKFLOW_ACTIVITIES», «APEX_APPL_WORKFLOWS» |

            Repare no padrão: «APEX_APPLICATION_*» e «APEX_APPL_*» descrevem **definições** (metadados); «APEX_WORKSPACE_*»,
            «APEX_TASKS», «APEX_WORKFLOWS» etc. trazem dados de **execução**.

            ## Consultas práticas
            ~~~sql
            -- Versão instalada
            select version_no from apex_release;

            -- Páginas sem esquema de autorização (exceto a Global Page)
            select page_id, page_name
              from apex_application_pages
             where application_id = :APP_ID
               and authorization_scheme is null
               and page_id <> 0
             order by page_id;

            -- Onde a tabela PEDIDOS é usada em processos?
            select page_id, process_name, process_type, process_point
              from apex_application_page_proc
             where application_id = :APP_ID
               and upper(process_source) like '%PEDIDOS%'
             order by page_id;

            -- As 10 páginas mais lentas da última semana
            select page_id, page_name,
                   count(*)                    as acessos,
                   round(avg(elapsed_time), 3) as tempo_medio_s
              from apex_workspace_activity_log
             where application_id = :APP_ID
               and view_date > sysdate - 7
             group by page_id, page_name
             order by tempo_medio_s desc
             fetch first 10 rows only;
            ~~~

            :::atencao O que cada usuário enxerga
            As views filtram pelo **workspace**. Dentro do APEX (SQL Workshop, páginas) você vê o workspace atual; em ferramentas
            externas, conectado como um schema, vê os workspaces associados a ele. Papéis administrativos (como
            «APEX_ADMINISTRATOR_ROLE») enxergam a instância inteira. Fora de uma sessão APEX, «apex_util.set_workspace» define o
            workspace.
            :::

            ## Ideias de uso
            - **Checklist de qualidade**: itens sem label, regiões sem Static ID, páginas sem autorização, processos com SQL
              dinâmico concatenado.
            - **Documentação** gerada automaticamente (ex.: lista de páginas, LOVs e regras de autorização).
            - **Análise de impacto**: antes de alterar uma tabela, procure o nome dela em fontes de regiões, processos e LOVs.
            - **Painel de uso**: acessos por usuário e página, erros recentes («error_message» no activity log).

            :::dica Não confunda com APEX_DB_DICTIONARY
            O pacote «APEX_DB_DICTIONARY» (novo no 26.1) é outra coisa: descreve **tabelas do banco** em formato legível por
            modelos de IA. As views «APEX_*» descrevem as **aplicações APEX**.
            :::
        `
    },
    en: {
        titulo: 'APEX dictionary views (APEX_APPLICATION_*, APEX_WORKSPACE_*)',
        resumo: 'Query application metadata and usage logs with SQL: pages, regions, processes, activity, e-mails, tasks and workflows.',
        tags: ['dictionary', 'APEX_DICTIONARY', 'APEX_APPLICATIONS', 'APEX_APPLICATION_PAGES', 'APEX_WORKSPACE_ACTIVITY_LOG', 'metadata', 'views', 'audit', 'APEX_RELEASE'],
        conteudo: `
            Because APEX is metadata-driven, **everything** you configure in App Builder lives in tables — and is exposed through
            dozens of public views with the «APEX_» prefix. They are the basis for audits, automatic documentation, usage dashboards
            and quality checks (App Builder itself relies on this information for its reports).

            ## Finding the views
            - The **«APEX_DICTIONARY»** view lists every APEX view, its columns and comments.
            - In App Builder: **Application → Utilities → Oracle APEX Views** shows the views as a list or a tree (*Tree View*),
              lets you pick columns, see results and copy the query.

            ~~~sql
            -- Columns and descriptions of a view
            select column_name, comments
              from apex_dictionary
             where apex_view_name = 'APEX_APPLICATION_PAGE_ITEMS'
             order by column_id;
            ~~~

            ## The most useful views
            | Group | Views |
            |---|---|
            | Instance and workspace | «APEX_RELEASE», «APEX_PATCHES», «APEX_WORKSPACES», «APEX_WORKSPACE_SCHEMAS», «APEX_WORKSPACE_APEX_USERS» |
            | Application | «APEX_APPLICATIONS», «APEX_APPLICATION_ITEMS», «APEX_APPLICATION_PROCESSES», «APEX_APPLICATION_LOVS» |
            | Pages | «APEX_APPLICATION_PAGES», «APEX_APPLICATION_PAGE_REGIONS», «APEX_APPLICATION_PAGE_ITEMS», «APEX_APPLICATION_PAGE_BUTTONS» |
            | Logic | «APEX_APPLICATION_PAGE_PROC», «APEX_APPLICATION_PAGE_VAL», «APEX_APPLICATION_PAGE_DA», «APEX_APPLICATION_PAGE_DA_ACTS» |
            | Security | «APEX_APPLICATION_AUTH», «APEX_APPLICATION_AUTHORIZATION» |
            | Files | «APEX_APPLICATION_STATIC_FILES», «APEX_WORKSPACE_STATIC_FILES», «APEX_APPLICATION_TEMP_FILES» |
            | Usage and logs | «APEX_WORKSPACE_ACTIVITY_LOG», «APEX_WORKSPACE_ACCESS_LOG», «APEX_DEBUG_MESSAGES» |
            | E-mail | «APEX_MAIL_QUEUE», «APEX_MAIL_LOG» |
            | Session | «APEX_COLLECTIONS» |
            | Tasks and workflows | «APEX_TASKS», «APEX_TASK_HISTORY», «APEX_WORKFLOWS», «APEX_WORKFLOW_ACTIVITIES», «APEX_APPL_WORKFLOWS» |

            Note the pattern: «APEX_APPLICATION_*» and «APEX_APPL_*» describe **definitions** (metadata); «APEX_WORKSPACE_*»,
            «APEX_TASKS», «APEX_WORKFLOWS» and friends hold **runtime** data.

            ## Practical queries
            ~~~sql
            -- Installed release
            select version_no from apex_release;

            -- Pages without an authorization scheme (except the Global Page)
            select page_id, page_name
              from apex_application_pages
             where application_id = :APP_ID
               and authorization_scheme is null
               and page_id <> 0
             order by page_id;

            -- Where is the ORDERS table used in processes?
            select page_id, process_name, process_type, process_point
              from apex_application_page_proc
             where application_id = :APP_ID
               and upper(process_source) like '%ORDERS%'
             order by page_id;

            -- The 10 slowest pages of the last week
            select page_id, page_name,
                   count(*)                    as views,
                   round(avg(elapsed_time), 3) as avg_seconds
              from apex_workspace_activity_log
             where application_id = :APP_ID
               and view_date > sysdate - 7
             group by page_id, page_name
             order by avg_seconds desc
             fetch first 10 rows only;
            ~~~

            :::atencao What each user can see
            The views filter by **workspace**. Inside APEX (SQL Workshop, pages) you see the current workspace; in external tools,
            connected as a schema, you see the workspaces associated with it. Administrative roles (such as
            «APEX_ADMINISTRATOR_ROLE») see the whole instance. Outside an APEX session, «apex_util.set_workspace» sets the workspace.
            :::

            ## Ideas
            - **Quality checklist**: items without labels, regions without Static IDs, pages without authorization, processes with
              concatenated dynamic SQL.
            - Automatically generated **documentation** (e.g. list of pages, LOVs and authorization rules).
            - **Impact analysis**: before changing a table, search its name in region sources, processes and LOVs.
            - **Usage dashboard**: views per user and page, recent errors («error_message» in the activity log).

            :::dica Do not confuse it with APEX_DB_DICTIONARY
            The «APEX_DB_DICTIONARY» package (new in 26.1) is something else: it describes **database tables** in a format suited
            for AI models. The «APEX_*» views describe **APEX applications**.
            :::
        `
    }
});

DOC.topico({
    id: 'tratamento-de-erros',
    cat: 'plsql',
    nivel: 'intermediario',
    desde: '4.1',
    links: [
        { t: 'APEX_ERROR (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_ERROR.html' },
        { t: 'Example of an Error Handling Function', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/Example-of-an-Error-Handling-Function.html' },
        { t: 'App Builder Guide — Application Definition (Error Handling)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/editing-application-attributes.html' }
    ],
    relacionados: ['processos-computacoes-validacoes', 'mensagens-de-texto', 'apex-debug-e-logs', 'escaping-e-xss'],
    pt: {
        titulo: 'Tratamento de erros (Error Handling Function e APEX_ERROR)',
        resumo: 'Mostre mensagens amigáveis, associe erros aos campos certos, esconda detalhes internos e registre falhas com a Error Handling Function e o APEX_ERROR.',
        tags: ['erro', 'APEX_ERROR', 'ADD_ERROR', 'Error Handling Function', 't_error', 't_error_result', 'constraint', 'ORA-', 'raise_application_error', 'mensagem amigável'],
        conteudo: `
            Um erro mal tratado expõe detalhes internos ("ORA-02292: integrity constraint (APP.FK_PEDIDO) violated - child record
            found") e não ajuda o usuário. O APEX oferece várias camadas para transformar falhas em mensagens claras.

            ## As camadas
            1. **Validações declarativas** e atributos como *Value Required* — a primeira linha de defesa.
            2. **«APEX_ERROR.ADD_ERROR»** — adiciona erros a partir do seu PL/SQL, com local de exibição e item associado.
            3. **«raise_application_error(-20xxx, 'mensagem')»** em pacotes e triggers — o APEX exibe a mensagem.
            4. **Error Handling Function** (desde o APEX 4.1) — uma função que intercepta **todos** os erros da aplicação para
               reescrever, registrar ou mascarar.
            5. **Text Messages** com o nome «APEX.ERROR.ORA-número» — mensagem amigável para um erro ORA sem escrever código.

            ## Onde o erro aparece
            | Constante | Exibição |
            |---|---|
            | «apex_error.c_inline_with_field» | Junto ao campo |
            | «apex_error.c_inline_with_field_and_notif» | Junto ao campo e na área de notificação |
            | «apex_error.c_inline_in_notification» | Só na área de notificação |
            | «apex_error.c_on_error_page» | Página de erro separada |

            O padrão para validações fica em **Application Definition → Error Handling → Default Error Display Location**.

            ## ADD_ERROR: várias mensagens de uma vez
            ~~~plsql
            begin
                if to_number(:P10_QUANTIDADE) <= 0 then
                    apex_error.add_error(
                        p_message          => 'Informe uma quantidade maior que zero.',
                        p_display_location => apex_error.c_inline_with_field_and_notif,
                        p_page_item_name   => 'P10_QUANTIDADE' );
                end if;

                if :P10_TIPO = 'PJ' and :P10_CNPJ is null then
                    apex_error.add_error(
                        p_message          => 'Clientes pessoa jurídica precisam de CNPJ.',
                        p_display_location => apex_error.c_inline_in_notification );
                end if;

                if not apex_error.have_errors_occurred then
                    pedidos_pkg.salvar(p_id => :P10_ID);
                end if;
            end;
            ~~~

            Outras assinaturas permitem associar o erro a uma **célula de Interactive Grid** («p_region_id», «p_column_alias»,
            «p_row_num») ou usar uma Text Message traduzível («p_error_code» com parâmetros «p0»...«p9»).

            ## A Error Handling Function
            Registre-a em **Shared Components → Application Definition → Error Handling → Error Handling Function** (ex.:
            «#OWNER#.app_erros.tratar»). Uma página pode definir a sua própria, que tem prioridade. A assinatura é fixa:

            ~~~plsql
            function tratar (p_error in apex_error.t_error)
                return apex_error.t_error_result;
            ~~~

            O registro «p_error» traz, entre outros: «message», «additional_info», «display_location», «page_item_name»,
            «column_alias», «apex_error_code», «is_internal_error», «is_common_runtime_error», «ora_sqlcode», «ora_sqlerrm»,
            «error_backtrace» e «component». O resultado («t_error_result») tem «message», «additional_info»,
            «display_location», «page_item_name» e «column_alias».

            ~~~plsql
            create or replace package body app_erros as

                procedure registrar(p_error in apex_error.t_error, p_ref out number) is
                    pragma autonomous_transaction;
                begin
                    insert into log_erros (app_id, page_id, usuario, mensagem, ora_sqlcode, backtrace)
                    values (v('APP_ID'), v('APP_PAGE_ID'), v('APP_USER'),
                            substr(p_error.message, 1, 4000), p_error.ora_sqlcode,
                            substr(p_error.error_backtrace, 1, 4000))
                    returning id into p_ref;
                    commit;
                end registrar;

                function tratar(p_error in apex_error.t_error)
                    return apex_error.t_error_result
                is
                    l_result     apex_error.t_error_result;
                    l_ref        number;
                    l_constraint varchar2(255);
                begin
                    l_result := apex_error.init_error_result(p_error => p_error);

                    if p_error.is_internal_error then
                        -- erros internos podem conter detalhes sensíveis
                        if not p_error.is_common_runtime_error then
                            registrar(p_error, l_ref);
                            l_result.message := 'Erro inesperado. Informe o código ' || l_ref || ' ao suporte.';
                            l_result.additional_info := null;
                        end if;
                    else
                        -- violações de constraint: busca uma mensagem amigável
                        if p_error.ora_sqlcode in (-1, -2290, -2291, -2292) then
                            l_constraint := apex_error.extract_constraint_name(p_error => p_error);
                            begin
                                select mensagem into l_result.message
                                  from mensagens_constraint
                                 where constraint_name = l_constraint;
                            exception
                                when no_data_found then null;
                            end;
                        end if;

                        -- raise_application_error: mostra só o texto, sem a pilha ORA
                        if p_error.ora_sqlcode is not null and l_result.message = p_error.message then
                            l_result.message := apex_error.get_first_ora_error_text(p_error => p_error);
                        end if;

                        if l_result.page_item_name is null and l_result.column_alias is null then
                            apex_error.auto_set_associated_item(p_error => p_error, p_error_result => l_result);
                        end if;
                    end if;

                    return l_result;
                end tratar;

            end app_erros;
            ~~~

            :::atencao A função não pode falhar
            Mantenha a Error Handling Function simples e à prova de erros: uma exceção dentro dela esconde o erro original. Use
            **transação autônoma** para gravar logs (senão o rollback da página apaga o registro).
            :::

            :::dica No navegador
            Para erros de validação no cliente use «apex.message.showErrors» / «apex.message.clearErrors». No 26.1 também existe a
            Dynamic Action **Show Error Message**, que dispensa JavaScript.
            :::
        `
    },
    en: {
        titulo: 'Error handling (Error Handling Function and APEX_ERROR)',
        resumo: 'Show friendly messages, attach errors to the right fields, hide internal details and log failures with the Error Handling Function and APEX_ERROR.',
        tags: ['error', 'APEX_ERROR', 'ADD_ERROR', 'Error Handling Function', 't_error', 't_error_result', 'constraint', 'ORA-', 'raise_application_error', 'friendly message'],
        conteudo: `
            A poorly handled error exposes internals ("ORA-02292: integrity constraint (APP.FK_ORDER) violated - child record found")
            and does not help the user. APEX offers several layers to turn failures into clear messages.

            ## The layers
            1. **Declarative validations** and attributes such as *Value Required* — the first line of defense.
            2. **«APEX_ERROR.ADD_ERROR»** — adds errors from your PL/SQL, with a display location and an associated item.
            3. **«raise_application_error(-20xxx, 'message')»** in packages and triggers — APEX shows the message.
            4. **Error Handling Function** (since APEX 4.1) — a function that intercepts **every** application error to rewrite,
               log or mask it.
            5. **Text Messages** named «APEX.ERROR.ORA-number» — a friendly message for an ORA error without writing code.

            ## Where the error shows up
            | Constant | Display |
            |---|---|
            | «apex_error.c_inline_with_field» | Next to the field |
            | «apex_error.c_inline_with_field_and_notif» | Next to the field and in the notification area |
            | «apex_error.c_inline_in_notification» | Only in the notification area |
            | «apex_error.c_on_error_page» | A separate error page |

            The default for validations is set in **Application Definition → Error Handling → Default Error Display Location**.

            ## ADD_ERROR: several messages at once
            ~~~plsql
            begin
                if to_number(:P10_QUANTITY) <= 0 then
                    apex_error.add_error(
                        p_message          => 'Enter a quantity greater than zero.',
                        p_display_location => apex_error.c_inline_with_field_and_notif,
                        p_page_item_name   => 'P10_QUANTITY' );
                end if;

                if :P10_TYPE = 'COMPANY' and :P10_TAX_ID is null then
                    apex_error.add_error(
                        p_message          => 'Company customers need a tax ID.',
                        p_display_location => apex_error.c_inline_in_notification );
                end if;

                if not apex_error.have_errors_occurred then
                    orders_pkg.save(p_id => :P10_ID);
                end if;
            end;
            ~~~

            Other signatures attach the error to an **Interactive Grid cell** («p_region_id», «p_column_alias», «p_row_num») or use
            a translatable Text Message («p_error_code» with «p0»...«p9» parameters).

            ## The Error Handling Function
            Register it in **Shared Components → Application Definition → Error Handling → Error Handling Function** (e.g.
            «#OWNER#.app_errors.handle»). A page can define its own, which takes precedence. The signature is fixed:

            ~~~plsql
            function handle (p_error in apex_error.t_error)
                return apex_error.t_error_result;
            ~~~

            The «p_error» record carries, among others: «message», «additional_info», «display_location», «page_item_name»,
            «column_alias», «apex_error_code», «is_internal_error», «is_common_runtime_error», «ora_sqlcode», «ora_sqlerrm»,
            «error_backtrace» and «component». The result («t_error_result») has «message», «additional_info», «display_location»,
            «page_item_name» and «column_alias».

            ~~~plsql
            create or replace package body app_errors as

                procedure log_error(p_error in apex_error.t_error, p_ref out number) is
                    pragma autonomous_transaction;
                begin
                    insert into error_log (app_id, page_id, app_user, message, ora_sqlcode, backtrace)
                    values (v('APP_ID'), v('APP_PAGE_ID'), v('APP_USER'),
                            substr(p_error.message, 1, 4000), p_error.ora_sqlcode,
                            substr(p_error.error_backtrace, 1, 4000))
                    returning id into p_ref;
                    commit;
                end log_error;

                function handle(p_error in apex_error.t_error)
                    return apex_error.t_error_result
                is
                    l_result     apex_error.t_error_result;
                    l_ref        number;
                    l_constraint varchar2(255);
                begin
                    l_result := apex_error.init_error_result(p_error => p_error);

                    if p_error.is_internal_error then
                        -- internal errors may contain sensitive details
                        if not p_error.is_common_runtime_error then
                            log_error(p_error, l_ref);
                            l_result.message := 'Unexpected error. Please give reference ' || l_ref || ' to support.';
                            l_result.additional_info := null;
                        end if;
                    else
                        -- constraint violations: look up a friendly message
                        if p_error.ora_sqlcode in (-1, -2290, -2291, -2292) then
                            l_constraint := apex_error.extract_constraint_name(p_error => p_error);
                            begin
                                select message into l_result.message
                                  from constraint_messages
                                 where constraint_name = l_constraint;
                            exception
                                when no_data_found then null;
                            end;
                        end if;

                        -- raise_application_error: show only the text, not the ORA stack
                        if p_error.ora_sqlcode is not null and l_result.message = p_error.message then
                            l_result.message := apex_error.get_first_ora_error_text(p_error => p_error);
                        end if;

                        if l_result.page_item_name is null and l_result.column_alias is null then
                            apex_error.auto_set_associated_item(p_error => p_error, p_error_result => l_result);
                        end if;
                    end if;

                    return l_result;
                end handle;

            end app_errors;
            ~~~

            :::atencao The function must not fail
            Keep the Error Handling Function simple and bullet-proof: an exception inside it hides the original error. Use an
            **autonomous transaction** to write logs (otherwise the page rollback wipes the row).
            :::

            :::dica In the browser
            For client-side validation errors use «apex.message.showErrors» / «apex.message.clearErrors». In 26.1 there is also the
            **Show Error Message** dynamic action, which needs no JavaScript.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-session-e-contexto',
    cat: 'plsql',
    nivel: 'avancado',
    desde: '18.1',
    links: [
        { t: 'APEX_SESSION (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_SESSION.html' },
        { t: 'App Builder Guide — Built-in Substitution Strings (SYS_CONTEXT)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-available-built-in-substitution-strings.html' }
    ],
    relacionados: ['sessao-e-session-state', 'automations', 'apex-mail', 'apex-collection', 'modo-debug'],
    pt: {
        titulo: 'APEX_SESSION: sessões fora do navegador e o contexto APEX$SESSION',
        resumo: 'Crie, anexe e exclua sessões APEX em jobs, scripts SQLcl e testes, ative debug na sessão de um usuário e use SYS_CONTEXT(\'APEX$SESSION\') em SQL.',
        tags: ['APEX_SESSION', 'CREATE_SESSION', 'ATTACH', 'DELETE_SESSION', 'SET_DEBUG', 'APEX$SESSION', 'SYS_CONTEXT', 'SQLcl', 'job', 'utPLSQL', 'tenant'],
        conteudo: `
            Várias APIs só funcionam dentro de uma **sessão APEX**: «APEX_EXEC», «APEX_COLLECTION», «APEX_AI», «APEX_WORKFLOW»,
            «V('APP_USER')», templates de e-mail sem «p_application_id» etc. Em uma página isso é automático. Mas e em um job do
            «DBMS_SCHEDULER», um script SQLcl, um teste utPLSQL ou um handler REST? É aí que entra o **APEX_SESSION**.

            O pacote surgiu no 5.1 (com «SET_DEBUG» e «SET_TRACE»); «CREATE_SESSION», «ATTACH» e «DELETE_SESSION» chegaram no
            **18.1**.

            ## Os procedimentos
            | Chamada | O que faz |
            |---|---|
            | «CREATE_SESSION(p_app_id, p_page_id, p_username, p_call_post_authentication)» | Cria uma sessão nova e a define como atual |
            | «ATTACH(p_app_id, p_page_id, p_session_id)» | Conecta-se a uma sessão existente e roda o *Initialization PL/SQL Code* |
            | «DETACH» | Desconecta, limpa o ambiente e roda o *Cleanup PL/SQL Code* |
            | «DELETE_SESSION(p_session_id)» | Exclui a sessão (padrão: a atual) |
            | «SET_DEBUG(p_session_id, p_level)» | Liga/desliga debug para as próximas requisições da sessão |
            | «SET_TRACE» | Ativa SQL trace nas próximas requisições |
            | «SET_TENANT_ID(p_tenant_id)» | Associa a sessão a um tenant (lido em «APP_TENANT_ID») |

            ## Exemplo: job noturno
            ~~~plsql
            begin
                apex_session.create_session(
                    p_app_id   => 100,
                    p_page_id  => 1,
                    p_username => 'JOB_NOTURNO' );

                -- a partir daqui funcionam V('APP_USER'), :APP_ID, collections, APEX_EXEC...
                apex_collection.create_or_truncate_collection('PENDENTES');

                for r in (select id, email from faturas where status = 'VENCIDA') loop
                    apex_collection.add_member(
                        p_collection_name => 'PENDENTES',
                        p_n001            => r.id,
                        p_c001            => r.email );
                end loop;

                faturas_pkg.notificar_vencidas;   -- usa a collection e APEX_MAIL

                commit;                           -- e-mails só entram na fila com commit
                apex_session.delete_session;      -- exclui a sessão atual
            end;
            ~~~

            :::atencao CREATE_SESSION não autentica ninguém
            «CREATE_SESSION» aceita qualquer nome em «p_username» — não há senha nem verificação de credenciais. O que limita o uso é
            o banco: o schema que chama precisa ter acesso ao workspace da aplicação (senão ocorre «APP_NOT_FOUND_ERR»). Proteja
            quem pode executar esse código. «p_call_post_authentication => true» executa o procedimento de *post-authentication*
            do esquema de autenticação (útil para carregar itens de aplicação). Segundo a documentação, «CREATE_SESSION» não é
            suportado em **SQL Commands** e **SQL Scripts** do SQL Workshop.
            :::

            ## Depurando a sessão de um usuário
            O usuário relata um erro; você descobre o ID da sessão dele (ex.: no relatório **Active Sessions** do workspace) e liga
            o debug sem pedir que ele mude nada:

            ~~~plsql
            begin
                apex_session.set_debug(
                    p_session_id => 1234567890123,
                    p_level      => apex_debug.c_log_level_info );
                commit;
            end;
            ~~~

            Com «ATTACH» você também pode, em um script, "entrar" na sessão para inspecionar valores com «V('P1_ITEM')» — use com
            cuidado e só em ambientes onde isso é permitido.

            ## O contexto APEX$SESSION
            Quando o APEX começa a processar uma requisição, ele preenche o contexto de aplicação **APEX$SESSION**. Assim, SQL
            "puro" (views, políticas VPD, defaults de colunas, triggers) acessa a identidade da sessão sem depender de «V()»:

            | Atributo | Exemplo |
            |---|---|
            | «APP_USER» | «sys_context('APEX$SESSION', 'APP_USER')» |
            | «APP_SESSION» | «sys_context('APEX$SESSION', 'APP_SESSION')» |
            | «APP_ID» | «sys_context('APEX$SESSION', 'APP_ID')» |
            | «WORKSPACE_ID» | «sys_context('APEX$SESSION', 'WORKSPACE_ID')» |

            ~~~sql
            -- Auditoria: quem criou a linha (usuário APEX ou, fora do APEX, o usuário do banco)
            alter table pedidos modify (
                criado_por default on null coalesce(sys_context('APEX$SESSION', 'APP_USER'), user)
            );
            ~~~

            :::dica Testes automatizados
            Em suítes utPLSQL, crie a sessão no *setup* («apex_session.create_session») e exclua no *teardown*
            («apex_session.delete_session»). Assim seus pacotes que leem «:APP_USER» ou usam collections rodam igual à aplicação.
            :::
        `
    },
    en: {
        titulo: 'APEX_SESSION: sessions outside the browser and the APEX$SESSION context',
        resumo: 'Create, attach and delete APEX sessions in jobs, SQLcl scripts and tests, enable debug in a user session and use SYS_CONTEXT(\'APEX$SESSION\') in SQL.',
        tags: ['APEX_SESSION', 'CREATE_SESSION', 'ATTACH', 'DELETE_SESSION', 'SET_DEBUG', 'APEX$SESSION', 'SYS_CONTEXT', 'SQLcl', 'job', 'utPLSQL', 'tenant'],
        conteudo: `
            Several APIs only work inside an **APEX session**: «APEX_EXEC», «APEX_COLLECTION», «APEX_AI», «APEX_WORKFLOW»,
            «V('APP_USER')», e-mail templates without «p_application_id» and so on. On a page this is automatic. But what about a
            «DBMS_SCHEDULER» job, a SQLcl script, a utPLSQL test or a REST handler? That is where **APEX_SESSION** comes in.

            The package appeared in 5.1 (with «SET_DEBUG» and «SET_TRACE»); «CREATE_SESSION», «ATTACH» and «DELETE_SESSION»
            arrived in **18.1**.

            ## The procedures
            | Call | What it does |
            |---|---|
            | «CREATE_SESSION(p_app_id, p_page_id, p_username, p_call_post_authentication)» | Creates a new session and makes it current |
            | «ATTACH(p_app_id, p_page_id, p_session_id)» | Joins an existing session and runs the *Initialization PL/SQL Code* |
            | «DETACH» | Detaches, resets the environment and runs the *Cleanup PL/SQL Code* |
            | «DELETE_SESSION(p_session_id)» | Deletes the session (default: the current one) |
            | «SET_DEBUG(p_session_id, p_level)» | Turns debug on/off for the session's next requests |
            | «SET_TRACE» | Enables SQL trace for the next requests |
            | «SET_TENANT_ID(p_tenant_id)» | Ties the session to a tenant (read through «APP_TENANT_ID») |

            ## Example: nightly job
            ~~~plsql
            begin
                apex_session.create_session(
                    p_app_id   => 100,
                    p_page_id  => 1,
                    p_username => 'NIGHTLY_JOB' );

                -- from here on V('APP_USER'), :APP_ID, collections, APEX_EXEC... all work
                apex_collection.create_or_truncate_collection('PENDING');

                for r in (select id, email from invoices where status = 'OVERDUE') loop
                    apex_collection.add_member(
                        p_collection_name => 'PENDING',
                        p_n001            => r.id,
                        p_c001            => r.email );
                end loop;

                invoices_pkg.notify_overdue;      -- uses the collection and APEX_MAIL

                commit;                           -- e-mails are only queued on commit
                apex_session.delete_session;      -- deletes the current session
            end;
            ~~~

            :::atencao CREATE_SESSION does not authenticate anyone
            «CREATE_SESSION» accepts any name in «p_username» — there is no password or credential check. What limits it is the
            database: the calling schema must have access to the application's workspace (otherwise «APP_NOT_FOUND_ERR» is
            raised). Protect who can run that code. «p_call_post_authentication => true» runs the authentication scheme's
            *post-authentication* procedure (handy to load application items). According to the docs, «CREATE_SESSION» is not
            supported in SQL Workshop's **SQL Commands** and **SQL Scripts**.
            :::

            ## Debugging a user's session
            A user reports an error; you find their session ID (e.g. in the workspace **Active Sessions** report) and turn debug on
            without asking them to change anything:

            ~~~plsql
            begin
                apex_session.set_debug(
                    p_session_id => 1234567890123,
                    p_level      => apex_debug.c_log_level_info );
                commit;
            end;
            ~~~

            With «ATTACH» a script can also "step into" the session to inspect values with «V('P1_ITEM')» — use it carefully and
            only where that is allowed.

            ## The APEX$SESSION context
            When APEX starts processing a request it fills the **APEX$SESSION** application context. That way plain SQL (views,
            VPD policies, column defaults, triggers) can read the session identity without relying on «V()»:

            | Attribute | Example |
            |---|---|
            | «APP_USER» | «sys_context('APEX$SESSION', 'APP_USER')» |
            | «APP_SESSION» | «sys_context('APEX$SESSION', 'APP_SESSION')» |
            | «APP_ID» | «sys_context('APEX$SESSION', 'APP_ID')» |
            | «WORKSPACE_ID» | «sys_context('APEX$SESSION', 'WORKSPACE_ID')» |

            ~~~sql
            -- Auditing: who created the row (APEX user or, outside APEX, the database user)
            alter table orders modify (
                created_by default on null coalesce(sys_context('APEX$SESSION', 'APP_USER'), user)
            );
            ~~~

            :::dica Automated tests
            In utPLSQL suites, create the session in *setup* («apex_session.create_session») and delete it in *teardown*
            («apex_session.delete_session»). Your packages that read «:APP_USER» or use collections then behave exactly as in the
            application.
            :::
        `
    }
});
