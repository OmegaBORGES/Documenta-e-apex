DOC.topico({
    id: 'modo-debug',
    cat: 'performance',
    nivel: 'basico',
    links: [
        { t: 'App Builder Guide — Utilizing Debug Mode', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/utilizing-debug-mode.html' },
        { t: 'App Builder Guide — Available Debug Levels', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/available-debug-levels.html' },
        { t: 'App Builder Guide — Viewing Debug Messages', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/viewing-debug-messages.html' }
    ],
    relacionados: ['apex-debug-e-logs', 'otimizacao-performance', 'monitoramento', 'urls-do-apex', 'apex-session-e-contexto'],
    pt: {
        titulo: 'Modo debug e Debug Messages',
        resumo: 'Como ligar o debug do APEX (Developer Toolbar, URL, sessão, instância), escolher o nível certo e ler as Debug Messages para achar erros e lentidões.',
        tags: ['debug', 'depuração', 'Developer Toolbar', 'LEVEL9', 'LEVEL6', 'debug=YES', 'View Debug', 'Debug Messages', 'APEX_DEBUG_MESSAGES', 'níveis de debug', 'APEX_SESSION.SET_DEBUG'],
        conteudo: `
            O **modo debug** registra, para cada requisição, o que o motor do APEX fez e quanto tempo levou: computações,
            processos, consultas de regiões, chamadas AJAX e as mensagens que o seu código gerou com «APEX_DEBUG». É a primeira
            ferramenta para entender um erro ou uma página lenta.

            ## Ligando o debug
            | Como | Onde |
            |---|---|
            | Developer Toolbar | Ao rodar a app a partir do App Builder: **Debug → Enable Debug** com *Info*, *App Trace* ou *Full Trace*. |
            | URL (Friendly URL) | «...?session=123&debug=YES» ou «&debug=LEVEL9». |
            | URL (f?p) | Quinto argumento: «f?p=100:1:&APP_SESSION.::YES». |
            | Sessão de outro usuário | *Administration → Monitor Activity → Active Sessions*: abra a sessão e defina o nível. |
            | PL/SQL | «APEX_SESSION.SET_DEBUG» para as próximas requisições de uma sessão. |
            | Instância inteira | Parâmetro «SYSTEM_DEBUG_LEVEL» via «APEX_INSTANCE_ADMIN.SET_PARAMETER» (só por pouco tempo). |

            Ligado pela Developer Toolbar, o debug continua ativo naquela aba do navegador até você desligá-lo.

            ~~~plsql Ligar o debug na sessão de um usuário que reportou um erro
            begin
                apex_session.set_debug(
                    p_session_id => 1234567890,
                    p_level      => apex_debug.c_log_level_app_trace );
                commit;
            end;
            ~~~

            ## Níveis
            | Nível | Nome | Conteúdo |
            |---|---|---|
            | LEVEL1 | Error | Só erros |
            | LEVEL2 | Warn | Erros e avisos |
            | LEVEL4 | Info | Padrão de «debug=YES» e da opção *Info* |
            | LEVEL5 | Application Enter | Entrada e saída de rotinas da aplicação |
            | LEVEL6 | Application Trace | Detalhes da aplicação (opção *App Trace*) |
            | LEVEL8 | APEX Engine Enter | Entrada e saída de rotinas do motor |
            | LEVEL9 | APEX Engine Trace | Tudo, inclusive planos de execução das consultas (opção *Full Trace*) |

            Os níveis são cumulativos. A Oracle recomenda **LEVEL6 ou menor** no dia a dia; o LEVEL9 gera muitas mensagens e
            deixa a requisição visivelmente mais lenta.

            ## Lendo as mensagens
            - **Developer Toolbar → Debug → View Debug**, ou *App Builder → (aplicação) → Utilities → Debug Messages*.
            - Cada requisição é um **page view** com um *View Identifier*, do tipo **Rendering** (exibir a página),
              **Processing** (submit) ou **AJAX** (refresh de região, Dynamic Action, gráfico).
            - O gráfico no topo destaca os passos mais demorados; as colunas de tempo ajudam a achar o gargalo. Em
              *Actions → Columns* inclua o **Call Stack** (útil para o suporte Oracle) e use *Actions → Download* para
              compartilhar em HTML ou Excel.

            ~~~sql Consultando o debug por SQL
            -- 1. Descobrir o page view da requisição que interessa
            select view_timestamp, page_id, apex_user, elapsed_time, debug_page_view_id
              from apex_workspace_activity_log
             where application_id = 100
               and debug_page_view_id is not null
             order by view_timestamp desc;

            -- 2. Ler as mensagens daquele page view
            select message_timestamp, elapsed_time, message_level, message
              from apex_debug_messages
             where page_view_id = :PAGE_VIEW_ID
             order by message_timestamp;
            ~~~

            :::atencao Em produção
            - Desligue o atributo **Debugging** da aplicação (*Application Definition → Properties*) para que usuários finais
              não liguem o debug pela URL; desenvolvedores do workspace continuam podendo depurar.
            - Erros são registrados mesmo com o debug desligado.
            - As mensagens ficam guardadas por tempo limitado (pelo menos duas semanas) e podem ser apagadas em
              *Utilities → Debug Messages*: todas, por idade, da sessão atual ou por View Identifier.
            :::

            :::dica Dynamic Actions no console
            Com o debug ligado, o framework de Dynamic Actions escreve no console JavaScript do navegador (F12) cada ação
            disparada, com o elemento, o evento e os dados envolvidos — ótimo para descobrir por que uma DA não executou.
            :::
        `
    },
    en: {
        titulo: 'Debug mode and Debug Messages',
        resumo: 'How to turn on APEX debugging (Developer Toolbar, URL, session, instance), pick the right level and read Debug Messages to find errors and slowness.',
        tags: ['debug', 'debugging', 'Developer Toolbar', 'LEVEL9', 'LEVEL6', 'debug=YES', 'View Debug', 'Debug Messages', 'APEX_DEBUG_MESSAGES', 'debug levels', 'APEX_SESSION.SET_DEBUG'],
        conteudo: `
            **Debug mode** records, for every request, what the APEX engine did and how long it took: computations,
            processes, region queries, AJAX calls and the messages your own code emitted with «APEX_DEBUG». It is the first
            tool to reach for when you need to understand an error or a slow page.

            ## Turning debug on
            | How | Where |
            |---|---|
            | Developer Toolbar | When running the app from App Builder: **Debug → Enable Debug** with *Info*, *App Trace* or *Full Trace*. |
            | URL (Friendly URL) | «...?session=123&debug=YES» or «&debug=LEVEL9». |
            | URL (f?p) | Fifth argument: «f?p=100:1:&APP_SESSION.::YES». |
            | Another user's session | *Administration → Monitor Activity → Active Sessions*: open the session and set the level. |
            | PL/SQL | «APEX_SESSION.SET_DEBUG» for the next requests of a session. |
            | Whole instance | The «SYSTEM_DEBUG_LEVEL» parameter via «APEX_INSTANCE_ADMIN.SET_PARAMETER» (only briefly). |

            Once enabled from the Developer Toolbar, debug stays on in that browser tab until you turn it off.

            ~~~plsql Enable debug in the session of a user who reported an error
            begin
                apex_session.set_debug(
                    p_session_id => 1234567890,
                    p_level      => apex_debug.c_log_level_app_trace );
                commit;
            end;
            ~~~

            ## Levels
            | Level | Name | Content |
            |---|---|---|
            | LEVEL1 | Error | Errors only |
            | LEVEL2 | Warn | Errors and warnings |
            | LEVEL4 | Info | Default for «debug=YES» and the *Info* option |
            | LEVEL5 | Application Enter | Entry and exit of application routines |
            | LEVEL6 | Application Trace | Application details (*App Trace* option) |
            | LEVEL8 | APEX Engine Enter | Entry and exit of engine routines |
            | LEVEL9 | APEX Engine Trace | Everything, including query execution plans (*Full Trace* option) |

            Levels are cumulative. Oracle recommends **LEVEL6 or lower** for everyday work; LEVEL9 produces a lot of messages
            and makes the request noticeably slower.

            ## Reading the messages
            - **Developer Toolbar → Debug → View Debug**, or *App Builder → (application) → Utilities → Debug Messages*.
            - Each request is a **page view** with a *View Identifier*, of type **Rendering** (showing the page),
              **Processing** (submit) or **AJAX** (region refresh, Dynamic Action, chart).
            - The chart at the top highlights the slowest steps; the timing columns help you find the bottleneck. Under
              *Actions → Columns* add the **Call Stack** (useful for Oracle Support) and use *Actions → Download* to share
              it as HTML or Excel.

            ~~~sql Querying debug data with SQL
            -- 1. Find the page view of the request you care about
            select view_timestamp, page_id, apex_user, elapsed_time, debug_page_view_id
              from apex_workspace_activity_log
             where application_id = 100
               and debug_page_view_id is not null
             order by view_timestamp desc;

            -- 2. Read the messages of that page view
            select message_timestamp, elapsed_time, message_level, message
              from apex_debug_messages
             where page_view_id = :PAGE_VIEW_ID
             order by message_timestamp;
            ~~~

            :::atencao In production
            - Turn off the application's **Debugging** attribute (*Application Definition → Properties*) so end users cannot
              enable debug through the URL; workspace developers can still debug.
            - Errors are logged even when debug is off.
            - Messages are kept for a limited time (at least two weeks) and can be purged in *Utilities → Debug Messages*:
              all of them, by age, for the current session or by View Identifier.
            :::

            :::dica Dynamic Actions in the console
            With debug on, the Dynamic Action framework writes every fired action to the browser's JavaScript console (F12),
            including the element, event and data involved — great for finding out why a DA did not run.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-debug-e-logs',
    cat: 'performance',
    nivel: 'intermediario',
    links: [
        { t: 'API Reference — APEX_DEBUG', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_DEBUG.html' },
        { t: 'App Builder Guide — Using APEX_DEBUG When Developing Your Application', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-APEX_DEBUG-when-developing-your-application.html' },
        { t: 'App Builder Guide — Creating Custom Activity Reports Using APEX_ACTIVITY_LOG', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-custom-activity-reports-using-apex_activity_log.html' }
    ],
    relacionados: ['modo-debug', 'monitoramento', 'tratamento-de-erros', 'organizacao-do-codigo', 'apex-session-e-contexto'],
    pt: {
        titulo: 'APEX_DEBUG, Activity Log e instrumentação',
        resumo: 'Instrumente seu PL/SQL com APEX_DEBUG, consulte APEX_DEBUG_MESSAGES e use os logs de atividade (APEX_WORKSPACE_ACTIVITY_LOG) para medir uso e erros.',
        tags: ['APEX_DEBUG', 'instrumentação', 'log', 'logging', 'APEX_DEBUG_MESSAGES', 'APEX_WORKSPACE_ACTIVITY_LOG', 'APEX_ACTIVITY_LOG', 'apex_debug.enter', 'apex_debug.error', 'enable_dbms_output', 'Activity Log'],
        conteudo: `
            O modo debug só ajuda se o seu código "falar". **Instrumentar** é espalhar mensagens de log em pontos estratégicos
            do PL/SQL: elas ficam silenciosas em produção e aparecem quando alguém liga o debug. O pacote «APEX_DEBUG» faz isso
            integrado às Debug Messages do APEX — e funciona também em código chamado fora das páginas (jobs, SQLcl).

            ## Os procedimentos principais
            | Procedimento | Nível | Uso |
            |---|---|---|
            | «APEX_DEBUG.ENTER» | 5 (Application Enter) | Entrada de rotina, com até 10 pares nome/valor de parâmetros. |
            | «APEX_DEBUG.TRACE» | 6 (Application Trace) | Detalhes finos do processamento. |
            | «APEX_DEBUG.INFO» | 4 (Info) | Marcos importantes do fluxo. |
            | «APEX_DEBUG.WARN» | 2 (Warn) | Situações inesperadas, mas tratadas. |
            | «APEX_DEBUG.ERROR» | 1 (Error) | Erros — **registrado mesmo com o debug desligado**. |
            | «APEX_DEBUG.MESSAGE» | configurável | Com «p_level» e «p_force» (registra mesmo sem debug). |
            | «APEX_DEBUG.LOG_PAGE_SESSION_STATE» | 6 por padrão | Registra os valores dos itens da página. |
            | «APEX_DEBUG.LOG_LONG_MESSAGE» | configurável | Mensagens longas, que passariam do limite de uma mensagem comum. |

            As mensagens aceitam placeholders no estilo printf: cada «%s» (ou «%0» a «%9») é trocado pelos argumentos
            seguintes, truncados em «p_max_length» (1000 caracteres por padrão). Use «%%» para um % literal.

            ## Um pacote instrumentado
            ~~~plsql
            create or replace package body pedidos_api as

                procedure aprovar ( p_id in number, p_usuario in varchar2 ) is
                    l_total pedidos.total%type;
                begin
                    apex_debug.enter( 'pedidos_api.aprovar',
                                      'p_id',      p_id,
                                      'p_usuario', p_usuario );

                    select total into l_total from pedidos where id = p_id for update;
                    apex_debug.trace( 'Total do pedido %s: %s', p_id, l_total );

                    if l_total > 50000 then
                        apex_debug.warn( 'Pedido %s acima do limite: exige segunda aprovação', p_id );
                    end if;

                    update pedidos
                       set status = 'APROVADO', aprovado_por = p_usuario, aprovado_em = systimestamp
                     where id = p_id;

                    apex_debug.info( 'Pedido %s aprovado', p_id );
                exception
                    when others then
                        apex_debug.error( 'Falha ao aprovar o pedido %s: %s', p_id, sqlerrm );
                        raise;
                end aprovar;

            end pedidos_api;
            ~~~

            ## Fora do navegador (jobs, SQLcl, testes)
            ~~~plsql
            begin
                apex_debug.enable( p_level => apex_debug.c_log_level_app_trace );
                apex_debug.enable_dbms_output;   -- também imprime no DBMS_OUTPUT, com o prefixo "# APEX|"
                pedidos_api.aprovar( p_id => 42, p_usuario => 'JOB_NOTURNO' );
            end;
            ~~~

            Para que o log tenha contexto de aplicação, crie antes uma sessão com «APEX_SESSION.CREATE_SESSION» (veja
            [APEX_SESSION](#/topico/apex-session-e-contexto)). «APEX_DEBUG.GET_PAGE_VIEW_ID» devolve o identificador para
            consultar depois em «APEX_DEBUG_MESSAGES», e «APEX_DEBUG.REMOVE_SESSION_MESSAGES» limpa as mensagens da sessão.

            ## Logs de atividade
            Independentemente do debug, o APEX registra cada page view quando o atributo **Logging** da aplicação está ligado
            (*Application Definition → Properties*; o administrador da instância pode impor a configuração). As principais views:

            | View | Conteúdo |
            |---|---|
            | «APEX_WORKSPACE_ACTIVITY_LOG» | Uma linha por page view: app, página, usuário, tempo decorrido, linhas, erro, tipo de requisição e ID do debug. |
            | «APEX_ACTIVITY_LOG» | View clássica, com colunas como «flow_id», «step_id», «elap», «userid» e «sqlerrm». |
            | «APEX_DEBUG_MESSAGES» | As mensagens de debug, por page view. |

            ~~~sql Erros e páginas lentas da última semana
            select application_id, page_id, apex_user, view_timestamp,
                   elapsed_time, error_message
              from apex_workspace_activity_log
             where view_timestamp > systimestamp - interval '7' day
               and ( error_message is not null or elapsed_time > 3 )
             order by view_timestamp desc;
            ~~~

            :::atencao Log de atividade não é auditoria
            O log de atividade alterna entre duas tabelas e é expurgado periodicamente, assim como as Debug Messages. Para
            histórico permanente (auditoria, métricas de negócio), copie os dados para uma tabela sua ou registre diretamente
            na aplicação.
            :::

            :::dica Não registre segredos
            Nunca envie senhas, tokens ou dados pessoais sensíveis para «APEX_DEBUG»: qualquer desenvolvedor do workspace
            consegue ler as Debug Messages.
            :::
        `
    },
    en: {
        titulo: 'APEX_DEBUG, Activity Log and instrumentation',
        resumo: 'Instrument your PL/SQL with APEX_DEBUG, query APEX_DEBUG_MESSAGES and use activity logs (APEX_WORKSPACE_ACTIVITY_LOG) to measure usage and errors.',
        tags: ['APEX_DEBUG', 'instrumentation', 'log', 'logging', 'APEX_DEBUG_MESSAGES', 'APEX_WORKSPACE_ACTIVITY_LOG', 'APEX_ACTIVITY_LOG', 'apex_debug.enter', 'apex_debug.error', 'enable_dbms_output', 'Activity Log'],
        conteudo: `
            Debug mode only helps if your code "talks". **Instrumenting** means placing log messages at strategic points of
            your PL/SQL: they stay silent in production and show up when someone turns debug on. The «APEX_DEBUG» package does
            this integrated with APEX Debug Messages — and it also works in code called outside pages (jobs, SQLcl).

            ## The main procedures
            | Procedure | Level | Use |
            |---|---|---|
            | «APEX_DEBUG.ENTER» | 5 (Application Enter) | Routine entry, with up to 10 parameter name/value pairs. |
            | «APEX_DEBUG.TRACE» | 6 (Application Trace) | Fine-grained processing details. |
            | «APEX_DEBUG.INFO» | 4 (Info) | Important milestones of the flow. |
            | «APEX_DEBUG.WARN» | 2 (Warn) | Unexpected but handled situations. |
            | «APEX_DEBUG.ERROR» | 1 (Error) | Errors — **logged even when debug is off**. |
            | «APEX_DEBUG.MESSAGE» | configurable | With «p_level» and «p_force» (logs even without debug). |
            | «APEX_DEBUG.LOG_PAGE_SESSION_STATE» | 6 by default | Logs the page's item values. |
            | «APEX_DEBUG.LOG_LONG_MESSAGE» | configurable | Long messages that would exceed a regular message's limit. |

            Messages take printf-style placeholders: each «%s» (or «%0» to «%9») is replaced by the following arguments,
            truncated at «p_max_length» (1000 characters by default). Use «%%» for a literal %.

            ## An instrumented package
            ~~~plsql
            create or replace package body orders_api as

                procedure approve ( p_id in number, p_user in varchar2 ) is
                    l_total orders.total%type;
                begin
                    apex_debug.enter( 'orders_api.approve',
                                      'p_id',   p_id,
                                      'p_user', p_user );

                    select total into l_total from orders where id = p_id for update;
                    apex_debug.trace( 'Order %s total: %s', p_id, l_total );

                    if l_total > 50000 then
                        apex_debug.warn( 'Order %s above the limit: needs a second approval', p_id );
                    end if;

                    update orders
                       set status = 'APPROVED', approved_by = p_user, approved_at = systimestamp
                     where id = p_id;

                    apex_debug.info( 'Order %s approved', p_id );
                exception
                    when others then
                        apex_debug.error( 'Failed to approve order %s: %s', p_id, sqlerrm );
                        raise;
                end approve;

            end orders_api;
            ~~~

            ## Outside the browser (jobs, SQLcl, tests)
            ~~~plsql
            begin
                apex_debug.enable( p_level => apex_debug.c_log_level_app_trace );
                apex_debug.enable_dbms_output;   -- also prints to DBMS_OUTPUT, prefixed with "# APEX|"
                orders_api.approve( p_id => 42, p_user => 'NIGHTLY_JOB' );
            end;
            ~~~

            To give the log an application context, create a session first with «APEX_SESSION.CREATE_SESSION» (see
            [APEX_SESSION](#/topico/apex-session-e-contexto)). «APEX_DEBUG.GET_PAGE_VIEW_ID» returns the identifier to query
            later in «APEX_DEBUG_MESSAGES», and «APEX_DEBUG.REMOVE_SESSION_MESSAGES» clears the session's messages.

            ## Activity logs
            Independently of debug, APEX logs every page view when the application's **Logging** attribute is on
            (*Application Definition → Properties*; the instance administrator can enforce the setting). The main views:

            | View | Content |
            |---|---|
            | «APEX_WORKSPACE_ACTIVITY_LOG» | One row per page view: app, page, user, elapsed time, rows, error, request type and debug ID. |
            | «APEX_ACTIVITY_LOG» | The classic view, with columns such as «flow_id», «step_id», «elap», «userid» and «sqlerrm». |
            | «APEX_DEBUG_MESSAGES» | Debug messages, by page view. |

            ~~~sql Errors and slow pages in the last week
            select application_id, page_id, apex_user, view_timestamp,
                   elapsed_time, error_message
              from apex_workspace_activity_log
             where view_timestamp > systimestamp - interval '7' day
               and ( error_message is not null or elapsed_time > 3 )
             order by view_timestamp desc;
            ~~~

            :::atencao The activity log is not an audit trail
            The activity log rotates between two tables and is purged periodically, and so are Debug Messages. For permanent
            history (auditing, business metrics), copy the data into your own table or log directly from the application.
            :::

            :::dica Do not log secrets
            Never send passwords, tokens or sensitive personal data to «APEX_DEBUG»: any workspace developer can read the
            Debug Messages.
            :::
        `
    }
});

DOC.topico({
    id: 'otimizacao-performance',
    cat: 'performance',
    nivel: 'avancado',
    links: [
        { t: 'App Builder Guide — Managing Application Performance', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-application-performance.html' },
        { t: 'App Builder Guide — Identifying Performance Issues', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/identifying-performance-issues.html' },
        { t: 'App Builder Guide — Editing Regions (Region Caching)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/editing-regions.html' }
    ],
    relacionados: ['modo-debug', 'monitoramento', 'interactive-report', 'arquivos-estaticos-e-cdn', 'apex-collection'],
    pt: {
        titulo: 'Otimizando a performance de aplicações APEX',
        resumo: 'Onde o tempo realmente vai e como reduzi-lo: SQL e bind variables, paginação, lazy loading, cache de região e página, arquivos estáticos e banco.',
        tags: ['performance', 'lentidão', 'otimização', 'bind variables', 'lazy loading', 'paginação', 'cache', 'Server Cache', 'V()', 'Maximum Rows to Process', 'explain plan', 'APEX_COLLECTION'],
        conteudo: `
            A documentação da Oracle é direta: a maior parte dos problemas de performance em APEX vem do **SQL e do PL/SQL
            escritos pelos desenvolvedores**, não do APEX nem do banco. Por isso a otimização começa medindo.

            ## 1. Meça antes de mexer
            - Rode a página com **debug LEVEL6** (ou **LEVEL9**, que inclui os planos de execução) e veja no gráfico quais
              passos consomem tempo — veja [Modo debug](#/topico/modo-debug).
            - Use «APEX_WORKSPACE_ACTIVITY_LOG» para achar as páginas mais lentas em produção — veja
              [Monitoramento](#/topico/monitoramento).
            - Na aba *Network* das DevTools do navegador, veja se o tempo está no servidor ou no download e renderização.
            - Teste a consulta suspeita fora da página (SQL Commands, SQLcl, SQL Developer) e analise o plano de execução.

            ## 2. SQL e PL/SQL
            - Use **bind variables** («:P10_ID»), nunca «&P10_ID.» dentro de SQL: além de seguro, o cursor é reaproveitado.
            - Evite chamar «V()» ou «NV()» para cada linha em consultas grandes: prefira binds ou leve a lógica para PL/SQL.
            - Crie índices para os filtros e joins das regiões — inclusive colunas usadas em Faceted Search e LOVs.
            - Coloque a lógica em **pacotes** compilados em vez de longos blocos anônimos nos atributos da página.
            - Para LOVs com milhares de valores, prefira **Popup LOV**, Combobox ou Select One a uma Select List.

            ~~~sql
            -- Evite: V() é chamada para cada linha avaliada
            select id, numero, total from pedidos where vendedor = v('APP_USER');

            -- Prefira: bind variable, avaliada uma vez e com cursor compartilhado
            select id, numero, total from pedidos where vendedor = :APP_USER;
            ~~~

            ## 3. Relatórios e regiões
            | Técnica | Onde | Efeito |
            |---|---|---|
            | Paginação sem total | Classic e Interactive Report | Tipos que mostram "de Z" contam todas as linhas a cada página; evite em tabelas grandes. |
            | Maximum Rows to Process | Interactive Report | Limita as linhas lidas antes de filtros e ordenação. |
            | Maximum Rows to Display (26.1) | Interactive Report | Limita o que é exibido depois de aplicados os filtros. |
            | Lazy Loading | Interactive Grid; Classic e Interactive Report (21.1+); Dynamic Content (22.2+) | A página aparece antes e a região carrega em seguida. |
            | Refresh pontual | Dynamic Actions | Atualize só a região que mudou e envie só os itens necessários. |
            | Regiões colapsáveis ou em abas | Layout | Combinadas com lazy loading, não carregam o que ninguém abriu. |

            ## 4. Cache
            - **Server Cache** de região: *Disabled*, *Enabled* (para todos), *Cached by User* ou *Cache by Session* — ótimo
              para regiões que mudam pouco (listas, HTML estático, gráficos de resumo). O cache só é usado quando a condição
              da região é verdadeira.
            - Páginas inteiras também podem ser cacheadas. Invalide com «APEX_REGION.PURGE_CACHE» e «APEX_PAGE.PURGE_CACHE»
              quando os dados mudarem; *Utilities → Caching* no Page Designer mostra o que está em cache.
            - Para consultas caras repetidas na mesma sessão (paginação, filtros), a própria documentação sugere materializar
              o resultado uma vez em uma [collection](#/topico/apex-collection).

            ## 5. Navegador e rede
            - Sirva os arquivos do APEX pela **CDN** (static.oracle.com) e use arquivos estáticos minificados — veja
              [Arquivos estáticos e CDN](#/topico/arquivos-estaticos-e-cdn).
            - Ative **Show Processing** nos botões de submit e mantenha desligado *Enable Duplicate Page Submissions*.
            - Para tarefas longas, use **Execution Chains em background** (23.1+) em vez de deixar o usuário esperando.

            ## 6. Banco e ORDS
            - SGA e shared pool dimensionados para caber em memória real, e **estatísticas coletadas no schema do APEX**
              («APEX_260100») para o otimizador montar bons planos sobre os metadados.
            - Ajuste o pool de conexões do ORDS (por exemplo, «jdbc.MaxLimit») ao número de requisições simultâneas.

            :::novo No 26.1
            *Maximum Rows to Display* no Interactive Report, rolagem infinita em Select One, Select Many, Combobox e
            Autocomplete (sem ficar preso ao limite de valores), camadas de mapa com **vector tiles** para grandes volumes e o
            atributo *Show Processing* na DA *Execute Server-side Code*.
            :::

            :::atencao Não otimize no escuro
            O LEVEL9 acrescenta overhead: use-o para investigar e desligue em seguida. E meça de novo depois de cada mudança —
            otimização sem medição costuma só mover o gargalo de lugar.
            :::
        `
    },
    en: {
        titulo: 'Optimizing APEX application performance',
        resumo: 'Where the time really goes and how to cut it: SQL and bind variables, pagination, lazy loading, region and page caching, static files and the database.',
        tags: ['performance', 'slow', 'optimization', 'tuning', 'bind variables', 'lazy loading', 'pagination', 'cache', 'Server Cache', 'V()', 'Maximum Rows to Process', 'explain plan', 'APEX_COLLECTION'],
        conteudo: `
            Oracle's documentation is blunt: most APEX performance problems come from **SQL and PL/SQL written by developers**,
            not from APEX or the database. That is why optimization starts with measuring.

            ## 1. Measure before changing anything
            - Run the page with **debug LEVEL6** (or **LEVEL9**, which includes execution plans) and see which steps take
              time in the chart — see [Debug mode](#/topico/modo-debug).
            - Use «APEX_WORKSPACE_ACTIVITY_LOG» to find the slowest pages in production — see
              [Monitoring](#/topico/monitoramento).
            - In the browser DevTools *Network* tab, check whether the time is on the server or in download and rendering.
            - Test the suspect query outside the page (SQL Commands, SQLcl, SQL Developer) and analyze its execution plan.

            ## 2. SQL and PL/SQL
            - Use **bind variables** («:P10_ID»), never «&P10_ID.» inside SQL: besides being safe, the cursor is reused.
            - Avoid calling «V()» or «NV()» for every row in large queries: prefer binds or move the logic to PL/SQL.
            - Index the filters and joins used by regions — including columns used by Faceted Search and LOVs.
            - Put logic in compiled **packages** instead of long anonymous blocks in page attributes.
            - For LOVs with thousands of values prefer **Popup LOV**, Combobox or Select One over a Select List.

            ~~~sql
            -- Avoid: V() is called for every row evaluated
            select id, order_no, total from orders where salesperson = v('APP_USER');

            -- Prefer: a bind variable, evaluated once with a shared cursor
            select id, order_no, total from orders where salesperson = :APP_USER;
            ~~~

            ## 3. Reports and regions
            | Technique | Where | Effect |
            |---|---|---|
            | Pagination without totals | Classic and Interactive Report | Types showing "of Z" count every row on each page; avoid them on big tables. |
            | Maximum Rows to Process | Interactive Report | Caps the rows read before filters and sorting. |
            | Maximum Rows to Display (26.1) | Interactive Report | Caps what is displayed after filters are applied. |
            | Lazy Loading | Interactive Grid; Classic and Interactive Report (21.1+); Dynamic Content (22.2+) | The page shows up first and the region loads right after. |
            | Targeted refresh | Dynamic Actions | Refresh only the region that changed and submit only the items needed. |
            | Collapsible or tabbed regions | Layout | Combined with lazy loading, they do not load what nobody opened. |

            ## 4. Caching
            - Region **Server Cache**: *Disabled*, *Enabled* (for everyone), *Cached by User* or *Cache by Session* — great
              for regions that rarely change (lists, static HTML, summary charts). The cache is only used when the region's
              condition is true.
            - Whole pages can be cached too. Invalidate with «APEX_REGION.PURGE_CACHE» and «APEX_PAGE.PURGE_CACHE» when the
              data changes; *Utilities → Caching* in Page Designer shows what is cached.
            - For expensive queries repeated within a session (pagination, filtering), the documentation itself suggests
              materializing the result once in a [collection](#/topico/apex-collection).

            ## 5. Browser and network
            - Serve APEX files from the **CDN** (static.oracle.com) and use minified static files — see
              [Static files and CDN](#/topico/arquivos-estaticos-e-cdn).
            - Turn on **Show Processing** on submit buttons and keep *Enable Duplicate Page Submissions* off.
            - For long tasks, use **background Execution Chains** (23.1+) instead of making the user wait.

            ## 6. Database and ORDS
            - Size the SGA and shared pool to fit in real memory, and **gather statistics on the APEX schema**
              («APEX_260100») so the optimizer builds good plans over the metadata.
            - Tune the ORDS connection pool (for example «jdbc.MaxLimit») to the number of concurrent requests.

            :::novo In 26.1
            *Maximum Rows to Display* for Interactive Reports, infinite scrolling in Select One, Select Many, Combobox and
            Autocomplete (no longer capped by the values limit), **vector tile** map layers for large data sets and the
            *Show Processing* attribute on the *Execute Server-side Code* DA.
            :::

            :::atencao Do not tune blindly
            LEVEL9 adds overhead: use it to investigate, then turn it off. And measure again after each change — tuning
            without measuring usually just moves the bottleneck elsewhere.
            :::
        `
    }
});

DOC.topico({
    id: 'monitoramento',
    cat: 'performance',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Utilizing Logs and Reports', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/utilizing-logs-and-reports.html' },
        { t: 'API Reference — APEX_INSTANCE_DEBUG', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_INSTANCE_DEBUG.html' },
        { t: 'App Builder Guide — Correlating APEX Sessions to Database Sessions', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/correlating-apex-sessions-to-database-sessions.html' }
    ],
    relacionados: ['apex-debug-e-logs', 'otimizacao-performance', 'administracao-instancia', 'dicionario-apex', 'modo-debug'],
    pt: {
        titulo: 'Monitorando a instância e as aplicações',
        resumo: 'Relatórios de Monitor Activity, logs de atividade, views do dicionário, a visão do DBA, APEX_INSTANCE_DEBUG (26.1) e OpenTelemetry.',
        tags: ['monitoramento', 'Monitor Activity', 'Active Sessions', 'Application Errors', 'Workspace Utilization', 'APEX_INSTANCE_DEBUG', 'OpenTelemetry', 'V$SESSION', 'DBMS_APPLICATION_INFO', 'Activity Reporting', 'Administration Services'],
        conteudo: `
            Monitorar é responder com dados a perguntas como: quem usa a aplicação, quais páginas estão lentas, que erros
            apareceram hoje e se a instância está saudável. O APEX oferece relatórios prontos em três níveis e views para
            consultas próprias.

            ## Três níveis
            | Nível | Onde | O que ver |
            |---|---|---|
            | Aplicação | Páginas da feature *Activity Reporting* (Create App Wizard) | Top users, erros, Page Performance, page views, log de automações. |
            | Workspace | *Administration → Monitor Activity*, *App Builder → Dashboard* e *Workspace Utilization* | Page views, sessões ativas, erros, logins, atividade dos desenvolvedores. |
            | Instância | *Administration Services → Monitor Activity* e logs da instância | Atividade de todos os workspaces e, no 26.1, os logs de instalação/upgrade. |

            ## Monitor Activity (workspace)
            - **Page Views**: por view, usuário, aplicação, página, dia e hora.
            - **Sessions**: *Active Sessions* — abra uma sessão para ver os page views dela e ligar o debug.
            - **Page View Analysis**: páginas mais vistas e *By Weighted Page Performance*, que combina volume e tempo — ótimo
              para priorizar otimizações.
            - **Login Attempts**, **Application Errors**, **Environment** (navegador, sistema operacional) e **Developer Activity**.
            - Relatórios de schema (uso de tablespace, privilégios) e o arquivo histórico de atividade.

            ## Consultas próprias
            Com o *Logging* da aplicação ligado, «APEX_WORKSPACE_ACTIVITY_LOG» permite montar painéis sob medida:

            ~~~sql Páginas mais lentas nas últimas 24 horas
            select application_id, page_id, page_name,
                   count(*)                     as page_views,
                   round(avg(elapsed_time), 2)  as media_seg,
                   round(max(elapsed_time), 2)  as pior_seg
              from apex_workspace_activity_log
             where view_timestamp > systimestamp - interval '1' day
             group by application_id, page_id, page_name
             order by media_seg desc
             fetch first 10 rows only;
            ~~~

            ## A visão do DBA
            A cada requisição o APEX preenche atributos da sessão do banco: **module** recebe «schema/APEX:APP app:página»,
            **client_identifier** recebe «usuário:sessão» e **client_info** recebe «id-do-workspace:usuário». Assim um DBA identifica
            quem consome recursos em «V$SESSION», «V$SQLAREA», AWR ou ASH:

            ~~~sql
            select sid, serial#, module, action, client_identifier, sql_id, event
              from v$session
             where module like '%APEX:APP%';
            ~~~

            Em processos longos do seu código, «DBMS_APPLICATION_INFO.SET_SESSION_LONGOPS» expõe o progresso em
            «V$SESSION_LONGOPS».

            ## Ferramentas da instância
            - «APEX_INSTANCE_ADMIN.SET_PARAMETER» com «SYSTEM_DEBUG_LEVEL» liga o debug em toda a instância — só por pouco
              tempo, pelo impacto em performance.
            - Os scripts da pasta «utilities/debug» do pacote de instalação («d0.sql», «d1.sql», «d2.sql», «ds.sql»,
              «activity.sql») listam requisições, mensagens de debug e atividade a partir do SQLcl.

            :::novo APEX_INSTANCE_DEBUG (26.1)
            O novo pacote «APEX_INSTANCE_DEBUG» permite que usuários do banco com «APEX_ADMINISTRATOR_READ_ROLE» ou
            «APEX_ADMINISTRATOR_ROLE» — sem precisar de SYS — leiam logs de debug e de atividade em SQL*Plus e SQLcl. Ele tem
            «ENABLE», «DISABLE» e «IS_ENABLED» para o debug da instância e «LIST_ACTIVITY», «LIST_PAGE_VIEWS» e «LIST_MESSAGES»
            para relatórios; os scripts de «utilities/debug» passaram a usá-lo por baixo. Também é novo o relatório
            **Install / Upgrade Logs** em Administration Services.
            :::

            ~~~sql SQLcl
            set lines 190 serveroutput on size unlimited

            -- atividade com erro nos últimos 2 dias
            exec apex_instance_debug.list_activity( p_from_date => sysdate - 2, p_error => '%' );

            -- últimas 30 requisições com debug e as mensagens de uma delas
            exec apex_instance_debug.list_page_views;
            exec apex_instance_debug.list_messages( 1234 );
            ~~~

            ## Experiência do usuário com OpenTelemetry
            Desde o **24.2** o APEX pode enviar dados de experiência do usuário (tempo de carregamento das páginas, interações)
            no padrão **OpenTelemetry**: configure *Client Logging Service URL* e *Token Relay URL* em
            *Workspace Utilities → OpenTelemetry* e informe o *Product Family* nos User Interface Attributes da aplicação.
            Requer a versão atual do Universal Theme.

            :::dica O que acompanhar em produção
            - Tempo médio e pior tempo das páginas mais acessadas.
            - Quantidade de erros por dia, e o surgimento de erros novos.
            - Sessões ativas e horários de pico.
            - Falhas de login em sequência (possíveis ataques).
            - Crescimento do tablespace dos schemas.
            :::
        `
    },
    en: {
        titulo: 'Monitoring the instance and applications',
        resumo: 'Monitor Activity reports, activity logs, dictionary views, the DBA view, APEX_INSTANCE_DEBUG (26.1) and OpenTelemetry.',
        tags: ['monitoring', 'Monitor Activity', 'Active Sessions', 'Application Errors', 'Workspace Utilization', 'APEX_INSTANCE_DEBUG', 'OpenTelemetry', 'V$SESSION', 'DBMS_APPLICATION_INFO', 'Activity Reporting', 'Administration Services'],
        conteudo: `
            Monitoring means answering, with data, questions such as: who uses the application, which pages are slow, which
            errors showed up today and whether the instance is healthy. APEX provides ready-made reports at three levels plus
            views for your own queries.

            ## Three levels
            | Level | Where | What you see |
            |---|---|---|
            | Application | *Activity Reporting* feature pages (Create App Wizard) | Top users, errors, Page Performance, page views, automations log. |
            | Workspace | *Administration → Monitor Activity*, *App Builder → Dashboard* and *Workspace Utilization* | Page views, active sessions, errors, logins, developer activity. |
            | Instance | *Administration Services → Monitor Activity* and instance logs | Activity across all workspaces and, in 26.1, install/upgrade logs. |

            ## Monitor Activity (workspace)
            - **Page Views**: by view, user, application, page, day and hour.
            - **Sessions**: *Active Sessions* — open a session to see its page views and turn debug on for it.
            - **Page View Analysis**: most viewed pages and *By Weighted Page Performance*, which combines volume and time —
              great for prioritizing tuning work.
            - **Login Attempts**, **Application Errors**, **Environment** (browser, operating system) and **Developer Activity**.
            - Schema reports (tablespace usage, privileges) and the archived activity history.

            ## Your own queries
            With the application's *Logging* turned on, «APEX_WORKSPACE_ACTIVITY_LOG» lets you build tailored dashboards:

            ~~~sql Slowest pages in the last 24 hours
            select application_id, page_id, page_name,
                   count(*)                     as page_views,
                   round(avg(elapsed_time), 2)  as avg_sec,
                   round(max(elapsed_time), 2)  as worst_sec
              from apex_workspace_activity_log
             where view_timestamp > systimestamp - interval '1' day
             group by application_id, page_id, page_name
             order by avg_sec desc
             fetch first 10 rows only;
            ~~~

            ## The DBA's view
            On every request APEX fills in database session attributes: **module** gets «schema/APEX:APP app:page»,
            **client_identifier** gets «user:session» and **client_info** gets «workspace-id:user». That lets a DBA see who is
            consuming resources in «V$SESSION», «V$SQLAREA», AWR or ASH:

            ~~~sql
            select sid, serial#, module, action, client_identifier, sql_id, event
              from v$session
             where module like '%APEX:APP%';
            ~~~

            For long-running processes in your own code, «DBMS_APPLICATION_INFO.SET_SESSION_LONGOPS» exposes progress in
            «V$SESSION_LONGOPS».

            ## Instance tools
            - «APEX_INSTANCE_ADMIN.SET_PARAMETER» with «SYSTEM_DEBUG_LEVEL» turns debug on for the whole instance — only
              briefly, given the performance impact.
            - The scripts in the install kit's «utilities/debug» folder («d0.sql», «d1.sql», «d2.sql», «ds.sql»,
              «activity.sql») list requests, debug messages and activity from SQLcl.

            :::novo APEX_INSTANCE_DEBUG (26.1)
            The new «APEX_INSTANCE_DEBUG» package lets database users with «APEX_ADMINISTRATOR_READ_ROLE» or
            «APEX_ADMINISTRATOR_ROLE» — no SYS access needed — read debug and activity logs from SQL*Plus and SQLcl. It offers
            «ENABLE», «DISABLE» and «IS_ENABLED» for instance debugging and «LIST_ACTIVITY», «LIST_PAGE_VIEWS» and
            «LIST_MESSAGES» for reports; the «utilities/debug» scripts now use it under the hood. Also new is the
            **Install / Upgrade Logs** report in Administration Services.
            :::

            ~~~sql SQLcl
            set lines 190 serveroutput on size unlimited

            -- activity with errors in the last 2 days
            exec apex_instance_debug.list_activity( p_from_date => sysdate - 2, p_error => '%' );

            -- last 30 debug-enabled requests and the messages of one of them
            exec apex_instance_debug.list_page_views;
            exec apex_instance_debug.list_messages( 1234 );
            ~~~

            ## User experience with OpenTelemetry
            Since **24.2** APEX can send user experience data (page load times, interactions) using the **OpenTelemetry**
            standard: set the *Client Logging Service URL* and *Token Relay URL* in *Workspace Utilities → OpenTelemetry* and
            enter the *Product Family* in the application's User Interface Attributes. It requires the current Universal Theme.

            :::dica What to watch in production
            - Average and worst time of the most used pages.
            - Errors per day, and new kinds of errors appearing.
            - Active sessions and peak hours.
            - Repeated login failures (possible attacks).
            - Tablespace growth of the schemas.
            :::
        `
    }
});
