DOC.topico({
    id: 'human-tasks-e-aprovacoes',
    cat: 'processos',
    nivel: 'intermediario',
    desde: '22.1',
    links: [
        { t: 'App Builder Guide — About Tasks', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-tasks.html' },
        { t: 'App Builder Guide — Managing Unified Task Lists', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-unified-task-lists.html' },
        { t: 'APEX_HUMAN_TASK (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_HUMAN_TASK.html' }
    ],
    relacionados: ['workflow', 'apex-mail', 'notificacoes-push', 'autorizacao', 'dicionario-apex'],
    pt: {
        titulo: 'Human Tasks e aprovações',
        resumo: 'Crie aprovações e tarefas para pessoas com Task Definitions, Unified Task List, os processos Human Task e a API APEX_HUMAN_TASK.',
        tags: ['Human Task', 'aprovação', 'approval', 'Task Definition', 'Unified Task List', 'APEX_HUMAN_TASK', 'APEX_APPROVAL', 'Action Task', 'potential owner', 'business administrator'],
        conteudo: `
            Pedidos de compra, férias, reembolsos, revisão de documentos: muitos sistemas precisam que **uma pessoa** decida ou
            execute algo. O APEX traz um componente nativo para isso — as **Human Tasks** — com caixa de entrada, histórico,
            comentários, prazos, delegação e escalonamento, sem você modelar tabelas de workflow do zero.

            ## Linha do tempo
            | Versão | Novidade |
            |---|---|
            | 22.1 | Componente **Approvals**: Task Definitions, Unified Task List, processos e a API «APEX_APPROVAL» |
            | 23.2 | API «APEX_HUMAN_TASK» (sucessora do «APEX_APPROVAL»), **Action Tasks** e integração com Workflow |
            | 24.1 | **Vacation rules** e opção de o iniciador poder concluir a própria tarefa; «APEX_APPROVAL» depreciado |
            | 26.1 | Tarefas atribuídas por **Authorization Scheme**; «REFRESH_BUSINESS_ADMINS» e «DELETE_TASKS» |

            ## Os blocos de construção
            | Peça | Onde | Papel |
            |---|---|---|
            | **Task Definition** | Shared Components → Workflows and Automations | Modelo da tarefa: tipo, assunto, parâmetros, participantes, prazos e ações |
            | **Unified Task List** | Create Page → Components | "Caixa de entrada" com os contextos My Tasks, Admin Tasks e Initiated by Me |
            | **Task Details Page** | Gerada a partir da Task Definition | Detalhes, histórico, comentários e botões de ação |
            | **Human Task - Create / Manage** | Processos de página | Criar tarefas e agir sobre elas (aprovar, reivindicar, delegar...) |
            | **APEX_HUMAN_TASK** | API PL/SQL | Tudo isso por código |

            ## Tipos de tarefa
            - **Approval Task**: o responsável **aprova** ou **rejeita**; o resultado fica em «APEX$TASK_OUTCOME» («APPROVED» ou
              «REJECTED»).
            - **Action Task**: o responsável executa algo e **conclui** a tarefa (sem aprovar/rejeitar).

            ## Participantes
            | Papel | O que pode fazer |
            |---|---|
            | Initiator | Cria a tarefa, fornece informações quando solicitado, pode cancelar |
            | Potential Owner | Pode reivindicar (*claim*) e então agir sobre a tarefa |
            | Actual Owner | Quem assumiu: aprova, rejeita, conclui, delega, pede informações |
            | Business Administrator | Reatribui, renova, cancela, muda prioridade |
            | Excluded Owner / Excluded Admin | Exceções a um grupo definido por Authorization Scheme |

            Participantes podem vir de valores estáticos, consultas SQL, expressões ou de um **Authorization Scheme** — útil
            para "qualquer pessoa do setor financeiro".

            ## Ciclo de vida
            Uma tarefa nasce **Assigned** (um único potential owner) ou **Unassigned** (vários). Daí pode ir para
            **Info Requested**, **Completed**, **Canceled**, **Expired** ou **Errored**. Com prazo definido (*Due On*), a política de
            expiração escolhe entre **Expire** e **Renew** (cria uma nova tarefa até um número máximo de renovações).

            ## Ações da Task Definition
            Ações executam código, enviam e-mail ou push quando eventos acontecem: Create, Claim, Complete, Delegate, Request
            Information, Before Expire, Expire, entre outros. Exemplo de ação no evento **Complete** de uma aprovação:

            ~~~plsql
            update pedidos
               set status = case :APEX$TASK_OUTCOME
                              when 'APPROVED' then 'APROVADO'
                              else 'REJEITADO'
                            end
             where id = :APEX$TASK_PK;
            ~~~

            Outras substituições disponíveis: «APEX$TASK_ID», «APEX$TASK_OWNER», «APEX$TASK_INITIATOR», «APEX$TASK_SUBJECT»,
            «APEX$TASK_STATE», «APEX$TASK_DUE_ON».

            ## Por código
            ~~~plsql
            declare
                l_task_id number;
            begin
                l_task_id := apex_human_task.create_task(
                    p_task_def_static_id => 'APROVACAO_PEDIDO',
                    p_subject            => 'Pedido ' || :P10_ID || ' - ' || :P10_CLIENTE,
                    p_parameters         => apex_human_task.t_task_parameters(
                        1 => apex_human_task.t_task_parameter(static_id => 'VALOR', string_value => :P10_TOTAL)),
                    p_detail_pk          => :P10_ID );
            end;

            -- Em outro momento, o aprovador (ou um processo) decide:
            begin
                apex_human_task.approve_task(p_task_id => :P20_TASK_ID, p_autoclaim => true);
                -- ou: apex_human_task.reject_task(p_task_id => :P20_TASK_ID);
            end;
            ~~~

            ~~~sql
            -- Tarefas do usuário logado (exige sessão APEX)
            select task_id, subject, state, priority_level, due_on
              from table(apex_human_task.get_tasks(p_context => 'MY_TASKS'))
             order by created_on desc;
            ~~~

            Para relatórios e auditoria há as views «APEX_TASKS», «APEX_TASK_HISTORY», «APEX_TASK_PARAMETERS»,
            «APEX_TASK_PARTICIPANTS» e «APEX_TASK_COMMENTS».

            :::atencao Pré-requisitos
            O schema de parsing precisa do privilégio **CREATE JOB** (prazos, expiração e ações rodam em jobs). Por padrão, numa
            Approval Task o **iniciador não pode aprovar o próprio pedido** — isso é configurável na Task Definition (ou com
            «p_initiator_can_complete»). Para testar *Request Information*, use dois usuários diferentes.
            :::

            :::dica Tarefas soltas ou dentro de um Workflow?
            Uma aprovação isolada ("aprovar este pedido") cabe bem em uma Human Task criada por um processo de página. Quando há
            várias etapas, desvios e prazos encadeados, coloque a tarefa como atividade de um [Workflow](#/topico/workflow).
            :::
        `
    },
    en: {
        titulo: 'Human Tasks and approvals',
        resumo: 'Build approvals and to-dos for people with Task Definitions, the Unified Task List, the Human Task processes and the APEX_HUMAN_TASK API.',
        tags: ['Human Task', 'approval', 'Task Definition', 'Unified Task List', 'APEX_HUMAN_TASK', 'APEX_APPROVAL', 'Action Task', 'potential owner', 'business administrator', 'inbox'],
        conteudo: `
            Purchase requests, vacation requests, reimbursements, document reviews: many systems need **a person** to decide or do
            something. APEX ships a native component for this — **Human Tasks** — with an inbox, history, comments, deadlines,
            delegation and escalation, so you do not have to model workflow tables from scratch.

            ## Timeline
            | Release | What arrived |
            |---|---|
            | 22.1 | The **Approvals** component: Task Definitions, Unified Task List, processes and the «APEX_APPROVAL» API |
            | 23.2 | The «APEX_HUMAN_TASK» API (successor of «APEX_APPROVAL»), **Action Tasks** and Workflow integration |
            | 24.1 | **Vacation rules** and an option letting the initiator complete their own task; «APEX_APPROVAL» deprecated |
            | 26.1 | Tasks assigned through an **Authorization Scheme**; «REFRESH_BUSINESS_ADMINS» and «DELETE_TASKS» |

            ## Building blocks
            | Piece | Where | Role |
            |---|---|---|
            | **Task Definition** | Shared Components → Workflows and Automations | Task model: type, subject, parameters, participants, deadlines and actions |
            | **Unified Task List** | Create Page → Components | "Inbox" with the My Tasks, Admin Tasks and Initiated by Me contexts |
            | **Task Details Page** | Generated from the Task Definition | Details, history, comments and action buttons |
            | **Human Task - Create / Manage** | Page processes | Create tasks and act on them (approve, claim, delegate...) |
            | **APEX_HUMAN_TASK** | PL/SQL API | All of the above in code |

            ## Task types
            - **Approval Task**: the owner **approves** or **rejects**; the result is in «APEX$TASK_OUTCOME» («APPROVED» or
              «REJECTED»).
            - **Action Task**: the owner does something and **completes** the task (no approve/reject).

            ## Participants
            | Role | What they can do |
            |---|---|
            | Initiator | Creates the task, provides information when asked, may cancel |
            | Potential Owner | Can claim the task and then act on it |
            | Actual Owner | Whoever claimed it: approves, rejects, completes, delegates, requests information |
            | Business Administrator | Reassigns, renews, cancels, changes priority |
            | Excluded Owner / Excluded Admin | Exceptions to a group defined by an Authorization Scheme |

            Participants can come from static values, SQL queries, expressions or an **Authorization Scheme** — handy for
            "anyone in the finance department".

            ## Lifecycle
            A task starts as **Assigned** (a single potential owner) or **Unassigned** (several). From there it can move to
            **Info Requested**, **Completed**, **Canceled**, **Expired** or **Errored**. With a deadline (*Due On*), the expiration
            policy chooses between **Expire** and **Renew** (creates a new task up to a maximum number of renewals).

            ## Task Definition actions
            Actions run code, send e-mail or push notifications when events happen: Create, Claim, Complete, Delegate, Request
            Information, Before Expire, Expire and others. Example of an action on the **Complete** event of an approval:

            ~~~plsql
            update orders
               set status = case :APEX$TASK_OUTCOME
                              when 'APPROVED' then 'APPROVED'
                              else 'REJECTED'
                            end
             where id = :APEX$TASK_PK;
            ~~~

            Other available substitutions: «APEX$TASK_ID», «APEX$TASK_OWNER», «APEX$TASK_INITIATOR», «APEX$TASK_SUBJECT»,
            «APEX$TASK_STATE», «APEX$TASK_DUE_ON».

            ## In code
            ~~~plsql
            declare
                l_task_id number;
            begin
                l_task_id := apex_human_task.create_task(
                    p_task_def_static_id => 'ORDER_APPROVAL',
                    p_subject            => 'Order ' || :P10_ID || ' - ' || :P10_CUSTOMER,
                    p_parameters         => apex_human_task.t_task_parameters(
                        1 => apex_human_task.t_task_parameter(static_id => 'AMOUNT', string_value => :P10_TOTAL)),
                    p_detail_pk          => :P10_ID );
            end;

            -- Later, the approver (or a process) decides:
            begin
                apex_human_task.approve_task(p_task_id => :P20_TASK_ID, p_autoclaim => true);
                -- or: apex_human_task.reject_task(p_task_id => :P20_TASK_ID);
            end;
            ~~~

            ~~~sql
            -- Tasks of the logged-in user (requires an APEX session)
            select task_id, subject, state, priority_level, due_on
              from table(apex_human_task.get_tasks(p_context => 'MY_TASKS'))
             order by created_on desc;
            ~~~

            For reports and auditing there are the «APEX_TASKS», «APEX_TASK_HISTORY», «APEX_TASK_PARAMETERS»,
            «APEX_TASK_PARTICIPANTS» and «APEX_TASK_COMMENTS» views.

            :::atencao Prerequisites
            The parsing schema needs the **CREATE JOB** privilege (deadlines, expiration and actions run in jobs). By default, in an
            Approval Task the **initiator cannot approve their own request** — this is configurable in the Task Definition (or with
            «p_initiator_can_complete»). To test *Request Information*, use two different users.
            :::

            :::dica Standalone tasks or inside a Workflow?
            A single approval ("approve this order") fits nicely in a Human Task created by a page process. When there are several
            steps, branches and chained deadlines, make the task an activity of a [Workflow](#/topico/workflow).
            :::
        `
    }
});

DOC.topico({
    id: 'workflow',
    cat: 'processos',
    nivel: 'avancado',
    desde: '23.2',
    links: [
        { t: 'App Builder Guide — About Workflows', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-workflows.html' },
        { t: 'App Builder Guide — Workflow Views', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/workflow-views.html' },
        { t: 'APEX_WORKFLOW (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_WORKFLOW.html' }
    ],
    relacionados: ['human-tasks-e-aprovacoes', 'outras-regioes', 'automations', 'chat-e-geracao-de-texto', 'notificacoes-push'],
    pt: {
        titulo: 'Workflow (APEX_WORKFLOW e Workflow Diagram)',
        resumo: 'Modele processos de negócio de longa duração no Workflow Designer: atividades, desvios, esperas, tarefas humanas, fluxos paralelos (26.1) e a API APEX_WORKFLOW.',
        tags: ['Workflow', 'APEX_WORKFLOW', 'Workflow Designer', 'Workflow Diagram', 'Parallel Flow', 'Invoke Workflow', 'atividade', 'Wait', 'Switch', 'processo de negócio', 'BPM'],
        conteudo: `
            O **Workflow** (desde o APEX 23.2) orquestra processos de negócio que duram horas, dias ou semanas e misturam passos
            automáticos (código, e-mail, chamadas de API) com passos humanos (aprovações). O motor guarda o estado de cada instância
            no banco, retoma de onde parou e registra tudo para auditoria.

            ## Evolução
            | Versão | Novidade |
            |---|---|
            | 23.2 | Workflow, Workflow Designer, Workflow Console e a API «APEX_WORKFLOW» |
            | 24.1 | Região **Workflow Diagram** para mostrar o andamento ao usuário |
            | 24.2 | **Invoke Workflow** (sub-workflows), parâmetros In/Out/In-Out e suporte a CLOB |
            | 26.1 | **Parallel Flow**, atividade **Generate Text with AI**, Tenant ID e «SET_ACTIVITY_DUE_DATE» |

            ## Conceitos
            - **Definição e versões**: cada workflow (Shared Components) tem versões **In Development** (editável, roda só na sessão
              do desenvolvedor), **Active** (a que roda para os usuários; só uma por vez) e **Inactive**. Instâncias em andamento
              continuam na versão em que começaram.
            - **Parâmetros**: entradas do workflow (ex.: ID do pedido). Desde o 24.2 podem ser In, Out ou In/Out.
            - **Variáveis**: valores que mudam durante a execução (ex.: resultado de uma aprovação).
            - **Additional Data**: uma query cujas colunas viram binds e substituições nas atividades.
            - **Participantes**: **Workflow Owners** (iniciam, terminam, refazem) e **Workflow Administrators** (também suspendem,
              retomam e alteram variáveis).

            ## Atividades disponíveis
            | Atividade | Uso |
            |---|---|
            | Workflow Start / Workflow End | Início (exatamente um) e fim(ns) |
            | Execute Code | PL/SQL |
            | Human Task - Create | Cria uma tarefa e espera a decisão |
            | Send E-Mail / Send Push Notification | Comunicação |
            | Invoke API | Chama uma API (procedimento PL/SQL ou REST Data Source) |
            | Switch | Desvios: True False, Check Workflow Variable ou Case |
            | Wait | Pausa por tempo ou até «CONTINUE_ACTIVITY» |
            | Invoke Workflow | Chama outro workflow (24.2) |
            | Parallel Flow | Ramos executados em paralelo (26.1) |
            | Generate Text with AI | Gera texto com um AI Agent (26.1) |
            | Plug-ins de processo | Qualquer process type plug-in |

            As **conexões** ligam as atividades: transições **Normal**, **Timeout** (quando o prazo da atividade vence) e **Error**
            (desvio para tratar um código de erro em vez de o workflow ficar *Faulted*), além dos **branches** dos Switches.

            ## Iniciando um workflow
            Declarativamente: processo do tipo **Workflow** com *Type = Start*, escolhendo a definição e mapeando os parâmetros
            (outros tipos: Terminate, Suspend, Resume, Retry). Por código:

            ~~~plsql
            declare
                l_params      apex_workflow.t_workflow_parameters;
                l_workflow_id number;
            begin
                l_params(1).static_id            := 'PEDIDO_ID';
                l_params(1).value.data_type      := apex_session_state.c_data_type_varchar2;
                l_params(1).value.varchar2_value := :P10_ID;

                l_workflow_id := apex_workflow.start_workflow(
                    p_static_id  => 'APROVACAO_PEDIDO',
                    p_parameters => l_params,
                    p_detail_pk  => :P10_ID );

                :P10_WORKFLOW_ID := l_workflow_id;
            end;
            ~~~

            ## Retomando uma atividade Wait
            Um sistema externo confirma o pagamento e o workflow, parado em uma atividade *Wait*, deve seguir:

            ~~~plsql
            declare
                l_params apex_application_global.vc_map;
            begin
                l_params('STATUS_PAGAMENTO') := 'PAGO';   -- atualiza a variável do workflow
                apex_workflow.continue_activity(
                    p_instance_id     => :P30_WORKFLOW_ID,
                    p_static_id       => 'AGUARDA_PAGAMENTO',
                    p_activity_params => l_params );
            end;
            ~~~

            ## Acompanhando
            - **Workflow Console** (Create Page → Components): lista instâncias por contexto (My Workflows, Admin Workflows,
              Initiated by Me), com página de detalhes, ações de administrador e, opcionalmente, um **Workflow Dashboard**.
            - Região **Workflow Diagram** (24.1): mostra o desenho e a posição atual da instância.
            - Views de execução: «APEX_WORKFLOWS», «APEX_WORKFLOW_ACTIVITIES», «APEX_WORKFLOW_VARIABLES»,
              «APEX_WORKFLOW_PARAMETERS»; de definição: «APEX_APPL_WORKFLOWS», «APEX_APPL_WORKFLOW_ACTIVITIES»...
            - Estados de uma instância: **Active**, **Suspended**, **Faulted**, **Terminated** e **Completed**.

            :::novo Parallel Flow e IA no 26.1
            Um **Parallel Flow** tem dois ou mais ramos que executam ao mesmo tempo (ex.: no onboarding, TI, RH e Facilities
            trabalham em paralelo); ele termina quando todos os ramos terminam e pode ter prazo com transição de Timeout. Não é
            possível aninhar um Parallel Flow dentro de outro, e **evite gravar a mesma variável em ramos diferentes** — o
            resultado não é determinístico. A atividade **Generate Text with AI** usa um AI Agent configurado para, por exemplo,
            resumir um pedido antes de enviá-lo ao aprovador.
            :::

            :::atencao Antes de começar
            O schema de parsing precisa do privilégio **CREATE JOB**, e a API exige uma sessão APEX. Para uma versão **Active**
            iniciar, ela precisa ter participantes definidos. Enquanto você estiver com sessão de desenvolvedor aberta, novas
            instâncias usam a versão **In Development** — teste a versão ativa em uma janela anônima.
            :::
        `
    },
    en: {
        titulo: 'Workflow (APEX_WORKFLOW and Workflow Diagram)',
        resumo: 'Model long-running business processes in the Workflow Designer: activities, branches, waits, human tasks, parallel flows (26.1) and the APEX_WORKFLOW API.',
        tags: ['Workflow', 'APEX_WORKFLOW', 'Workflow Designer', 'Workflow Diagram', 'Parallel Flow', 'Invoke Workflow', 'activity', 'Wait', 'Switch', 'business process', 'BPM'],
        conteudo: `
            **Workflow** (since APEX 23.2) orchestrates business processes that last hours, days or weeks and mix automatic steps
            (code, e-mail, API calls) with human steps (approvals). The engine stores the state of each instance in the database,
            resumes where it stopped and records everything for auditing.

            ## Evolution
            | Release | What arrived |
            |---|---|
            | 23.2 | Workflow, Workflow Designer, Workflow Console and the «APEX_WORKFLOW» API |
            | 24.1 | The **Workflow Diagram** region to show progress to users |
            | 24.2 | **Invoke Workflow** (sub-workflows), In/Out/In-Out parameters and CLOB support |
            | 26.1 | **Parallel Flow**, the **Generate Text with AI** activity, Tenant ID and «SET_ACTIVITY_DUE_DATE» |

            ## Concepts
            - **Definition and versions**: each workflow (Shared Components) has **In Development** versions (editable, runs only in
              the developer session), an **Active** one (what users run; only one at a time) and **Inactive** ones. Running
              instances stay on the version they started with.
            - **Parameters**: workflow inputs (e.g. the order ID). Since 24.2 they can be In, Out or In/Out.
            - **Variables**: values that change during execution (e.g. an approval result).
            - **Additional Data**: a query whose columns become binds and substitutions in the activities.
            - **Participants**: **Workflow Owners** (start, terminate, retry) and **Workflow Administrators** (also suspend, resume
              and change variables).

            ## Available activities
            | Activity | Use |
            |---|---|
            | Workflow Start / Workflow End | Start (exactly one) and end(s) |
            | Execute Code | PL/SQL |
            | Human Task - Create | Creates a task and waits for the decision |
            | Send E-Mail / Send Push Notification | Communication |
            | Invoke API | Calls an API (PL/SQL procedure or REST Data Source) |
            | Switch | Branching: True False, Check Workflow Variable or Case |
            | Wait | Pauses for a time or until «CONTINUE_ACTIVITY» |
            | Invoke Workflow | Calls another workflow (24.2) |
            | Parallel Flow | Branches executed in parallel (26.1) |
            | Generate Text with AI | Generates text with an AI Agent (26.1) |
            | Process plug-ins | Any process type plug-in |

            **Connections** link activities: **Normal**, **Timeout** (when the activity deadline passes) and **Error** transitions
            (route to handle an error code instead of the workflow becoming *Faulted*), plus the **branches** of Switches.

            ## Starting a workflow
            Declaratively: a **Workflow** process with *Type = Start*, picking the definition and mapping the parameters (other
            types: Terminate, Suspend, Resume, Retry). In code:

            ~~~plsql
            declare
                l_params      apex_workflow.t_workflow_parameters;
                l_workflow_id number;
            begin
                l_params(1).static_id            := 'ORDER_ID';
                l_params(1).value.data_type      := apex_session_state.c_data_type_varchar2;
                l_params(1).value.varchar2_value := :P10_ID;

                l_workflow_id := apex_workflow.start_workflow(
                    p_static_id  => 'ORDER_APPROVAL',
                    p_parameters => l_params,
                    p_detail_pk  => :P10_ID );

                :P10_WORKFLOW_ID := l_workflow_id;
            end;
            ~~~

            ## Resuming a Wait activity
            An external system confirms the payment and the workflow, parked in a *Wait* activity, must move on:

            ~~~plsql
            declare
                l_params apex_application_global.vc_map;
            begin
                l_params('PAYMENT_STATUS') := 'PAID';   -- updates the workflow variable
                apex_workflow.continue_activity(
                    p_instance_id     => :P30_WORKFLOW_ID,
                    p_static_id       => 'WAIT_FOR_PAYMENT',
                    p_activity_params => l_params );
            end;
            ~~~

            ## Monitoring
            - **Workflow Console** (Create Page → Components): lists instances by context (My Workflows, Admin Workflows, Initiated
              by Me), with a details page, administrator actions and, optionally, a **Workflow Dashboard**.
            - The **Workflow Diagram** region (24.1): shows the model and the instance's current position.
            - Runtime views: «APEX_WORKFLOWS», «APEX_WORKFLOW_ACTIVITIES», «APEX_WORKFLOW_VARIABLES», «APEX_WORKFLOW_PARAMETERS»;
              definition views: «APEX_APPL_WORKFLOWS», «APEX_APPL_WORKFLOW_ACTIVITIES»...
            - Instance states: **Active**, **Suspended**, **Faulted**, **Terminated** and **Completed**.

            :::novo Parallel Flow and AI in 26.1
            A **Parallel Flow** has two or more branches running at the same time (e.g. in onboarding, IT, HR and Facilities work in
            parallel); it finishes when all branches finish and may have a deadline with a Timeout transition. A Parallel Flow cannot
            be nested in another one, and **avoid setting the same variable in different branches** — the result is not
            deterministic. The **Generate Text with AI** activity uses a configured AI Agent to, for example, summarize an order
            before sending it to the approver.
            :::

            :::atencao Before you start
            The parsing schema needs the **CREATE JOB** privilege, and the API requires an APEX session. An **Active** version needs
            participants before it can start. While you have a developer session open, new instances use the **In Development**
            version — test the active version in a private browser window.
            :::
        `
    }
});

DOC.topico({
    id: 'automations',
    cat: 'processos',
    nivel: 'intermediario',
    desde: '20.2',
    links: [
        { t: 'App Builder Guide — About Automations', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-automations.html' },
        { t: 'App Builder Guide — Creating an Automation', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-an-automation.html' },
        { t: 'APEX_AUTOMATION (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_AUTOMATION.html' }
    ],
    relacionados: ['execution-chains-background', 'apex-mail', 'rest-data-sources', 'apex-session-e-contexto', 'apex-exec'],
    pt: {
        titulo: 'Automations',
        resumo: 'Tarefas agendadas ou sob demanda que executam ações para cada linha de uma consulta: alertas, limpezas, sincronizações e aprovações automáticas.',
        tags: ['Automations', 'APEX_AUTOMATION', 'agendamento', 'scheduler', 'job', 'Schedule Expression', 'LOG_INFO', 'SKIP_CURRENT_ROW', 'EXECUTE', 'TERMINATE'],
        conteudo: `
            **Automations** (desde o APEX 20.2) são sequências de ações disparadas por agenda ou sob demanda, normalmente guiadas
            por uma consulta: "para cada fatura vencida, envie um lembrete"; "para cada pedido parado há 3 dias, avise o gerente";
            "toda madrugada, arquive registros antigos". Tudo declarativo, com log de execução, sem criar jobs à mão.

            Ficam em **Shared Components → Workflows and Automations → Automations**.

            ## Configuração principal
            | Atributo | Opções |
            |---|---|
            | Type | **Scheduled** (pela agenda) ou **On Demand** (só via «APEX_AUTOMATION.EXECUTE») |
            | Actions Initiated On | **Query** (as ações rodam para cada linha) ou **Always** |
            | Schedule Expression | Sintaxe de calendário do «DBMS_SCHEDULER», com o *Schedule Builder* para ajudar |
            | Schedule Status | Active ou Disabled |
            | Source | Local Database, REST Enabled SQL ou REST Data Source; tabela ou SQL Query |
            | Execute Actions When | Rows returned ou No rows returned |
            | Error Handling | Ignorar, parar a execução ou desabilitar a automation |

            As **ações** executam em sequência, cada uma com condição própria. A mais comum é código PL/SQL, mas também há envio de
            e-mail (com templates de e-mail desde o 21.2) e outros tipos de processo, inclusive plug-ins. As colunas da query ficam
            disponíveis como **bind variables**.

            ## Exemplo: lembrete diário de faturas vencidas
            Query da automation (*Actions Initiated On = Query*):

            ~~~sql
            select f.id, f.numero, f.vencimento, c.email, c.nome
              from faturas f
              join clientes c on c.id = f.cliente_id
             where f.status = 'ABERTA'
               and f.vencimento < trunc(sysdate)
               and f.lembrete_em is null
            ~~~

            Schedule Expression: «FREQ=DAILY;INTERVAL=1;BYHOUR=7;BYMINUTE=0». Ação (Execute Code):

            ~~~plsql
            declare
                l_placeholders varchar2(4000);
            begin
                if :EMAIL is null then
                    apex_automation.skip_current_row(p_log_message => 'Fatura ' || :NUMERO || ' sem e-mail');
                    return;
                end if;

                select json_object('NOME' value :NOME, 'NUMERO' value :NUMERO)
                  into l_placeholders
                  from dual;

                apex_mail.send(
                    p_template_static_id => 'FATURA_VENCIDA',
                    p_placeholders       => l_placeholders,
                    p_to                 => :EMAIL );

                update faturas set lembrete_em = sysdate where id = :ID;

                apex_automation.log_info('Lembrete enviado para a fatura ' || :NUMERO);
            end;
            ~~~

            ## A API APEX_AUTOMATION
            | Chamada | Uso |
            |---|---|
            | «EXECUTE(p_static_id, p_filters...)» | Executa agora, opcionalmente com filtros extras na query |
            | «EXECUTE(p_static_id, p_run_in_background)» | Executa em um job único do scheduler |
            | «RESCHEDULE» | Antecipa a próxima execução |
            | «ENABLE» / «DISABLE» | Liga/desliga o agendamento |
            | «TERMINATE» | Interrompe uma execução em andamento (substitui o «ABORT», depreciado no 24.1) |
            | «LOG_INFO», «LOG_WARN», «LOG_ERROR» | Mensagens no log de execução |
            | «SKIP_CURRENT_ROW», «EXIT» | Pular a linha atual / encerrar a execução |
            | «IS_RUNNING», «GET_LAST_RUN_TIMESTAMP» | Consultas de estado |

            ~~~plsql
            -- Disparando uma automation On Demand a partir de um script
            begin
                apex_session.create_session(p_app_id => 100, p_page_id => 1, p_username => 'ADMIN');
                apex_automation.execute(
                    p_static_id         => 'fatura-vencida',
                    p_run_in_background => true );
            end;
            ~~~

            ## Logs e monitoramento
            A aba **Execution Log** mostra cada execução (início, fim, status, linhas com sucesso e com erro) e as mensagens por
            linha. O botão **Save and Run** executa na hora, em background. O APEX expurga o log a cada **14 dias** por padrão
            (configurável em Administration Services).

            :::atencao Como o agendamento funciona
            Um job coordenador verifica as automations periodicamente, então a execução acontece **alguns minutos depois** do
            horário previsto — não use Automations para precisão de segundos. O agendador usa o **fuso horário do servidor de
            banco**, e o schema de parsing precisa do privilégio **CREATE JOB**. Não há página nem itens de página: use as colunas
            da query e as APIs.
            :::

            :::dica Automation, Execution Chain ou DBMS_SCHEDULER?
            - **Automation**: trabalho recorrente ou disparado por código, guiado por dados, com log declarativo.
            - **[Execution Chain em background](#/topico/execution-chains-background)**: trabalho pesado iniciado por um usuário
              em uma página, com barra de progresso.
            - **«DBMS_SCHEDULER»** direto: rotinas de banco sem relação com uma aplicação APEX.
            :::
        `
    },
    en: {
        titulo: 'Automations',
        resumo: 'Scheduled or on-demand jobs that run actions for each row of a query: alerts, clean-ups, synchronizations and automatic approvals.',
        tags: ['Automations', 'APEX_AUTOMATION', 'scheduling', 'scheduler', 'job', 'Schedule Expression', 'LOG_INFO', 'SKIP_CURRENT_ROW', 'EXECUTE', 'TERMINATE'],
        conteudo: `
            **Automations** (since APEX 20.2) are sequences of actions triggered by a schedule or on demand, usually driven by a
            query: "for each overdue invoice, send a reminder"; "for each order stuck for 3 days, alert the manager"; "every night,
            archive old records". All declarative, with an execution log, without creating jobs by hand.

            They live in **Shared Components → Workflows and Automations → Automations**.

            ## Main settings
            | Attribute | Options |
            |---|---|
            | Type | **Scheduled** (by schedule) or **On Demand** (only through «APEX_AUTOMATION.EXECUTE») |
            | Actions Initiated On | **Query** (actions run for each row) or **Always** |
            | Schedule Expression | «DBMS_SCHEDULER» calendaring syntax, with the *Schedule Builder* to help |
            | Schedule Status | Active or Disabled |
            | Source | Local Database, REST Enabled SQL or REST Data Source; table or SQL Query |
            | Execute Actions When | Rows returned or No rows returned |
            | Error Handling | Ignore, stop the execution or disable the automation |

            **Actions** run in sequence, each with its own condition. The most common is PL/SQL code, but there is also e-mail
            sending (with e-mail templates since 21.2) and other process types, including plug-ins. Query columns are available as
            **bind variables**.

            ## Example: daily overdue-invoice reminder
            Automation query (*Actions Initiated On = Query*):

            ~~~sql
            select i.id, i.invoice_no, i.due_date, c.email, c.name
              from invoices i
              join customers c on c.id = i.customer_id
             where i.status = 'OPEN'
               and i.due_date < trunc(sysdate)
               and i.reminded_on is null
            ~~~

            Schedule Expression: «FREQ=DAILY;INTERVAL=1;BYHOUR=7;BYMINUTE=0». Action (Execute Code):

            ~~~plsql
            declare
                l_placeholders varchar2(4000);
            begin
                if :EMAIL is null then
                    apex_automation.skip_current_row(p_log_message => 'Invoice ' || :INVOICE_NO || ' has no e-mail');
                    return;
                end if;

                select json_object('NAME' value :NAME, 'INVOICE_NO' value :INVOICE_NO)
                  into l_placeholders
                  from dual;

                apex_mail.send(
                    p_template_static_id => 'OVERDUE_INVOICE',
                    p_placeholders       => l_placeholders,
                    p_to                 => :EMAIL );

                update invoices set reminded_on = sysdate where id = :ID;

                apex_automation.log_info('Reminder sent for invoice ' || :INVOICE_NO);
            end;
            ~~~

            ## The APEX_AUTOMATION API
            | Call | Use |
            |---|---|
            | «EXECUTE(p_static_id, p_filters...)» | Runs now, optionally with extra filters on the query |
            | «EXECUTE(p_static_id, p_run_in_background)» | Runs in a one-time scheduler job |
            | «RESCHEDULE» | Brings the next run forward |
            | «ENABLE» / «DISABLE» | Turns the schedule on/off |
            | «TERMINATE» | Stops a running execution (replaces «ABORT», deprecated in 24.1) |
            | «LOG_INFO», «LOG_WARN», «LOG_ERROR» | Messages in the execution log |
            | «SKIP_CURRENT_ROW», «EXIT» | Skip the current row / end the execution |
            | «IS_RUNNING», «GET_LAST_RUN_TIMESTAMP» | Status checks |

            ~~~plsql
            -- Triggering an On Demand automation from a script
            begin
                apex_session.create_session(p_app_id => 100, p_page_id => 1, p_username => 'ADMIN');
                apex_automation.execute(
                    p_static_id         => 'overdue-invoice',
                    p_run_in_background => true );
            end;
            ~~~

            ## Logs and monitoring
            The **Execution Log** tab shows each run (start, end, status, successful and failed rows) and per-row messages. The
            **Save and Run** button runs it right away, in the background. APEX purges the log every **14 days** by default
            (configurable in Administration Services).

            :::atencao How scheduling works
            A coordinator job checks automations periodically, so a run happens **a few minutes after** the due time — do not use
            Automations for second-level precision. The scheduler uses the **database server time zone**, and the parsing schema
            needs the **CREATE JOB** privilege. There is no page and no page items: use the query columns and the APIs.
            :::

            :::dica Automation, Execution Chain or DBMS_SCHEDULER?
            - **Automation**: recurring or code-triggered, data-driven work with a declarative log.
            - **[Background Execution Chain](#/topico/execution-chains-background)**: heavy work started by a user on a page, with
              a progress bar.
            - Plain **«DBMS_SCHEDULER»**: database routines unrelated to an APEX application.
            :::
        `
    }
});

DOC.topico({
    id: 'execution-chains-background',
    cat: 'processos',
    nivel: 'intermediario',
    desde: '23.1',
    links: [
        { t: 'App Builder Guide — Understanding Background Page Processing', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-background-page-processing.html' },
        { t: 'APEX_BACKGROUND_PROCESS (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/apex_background_process.html' }
    ],
    relacionados: ['automations', 'carga-de-dados', 'processos-computacoes-validacoes', 'upload-download-arquivos', 'ajax-callbacks'],
    pt: {
        titulo: 'Execution Chains e processamento em background',
        resumo: 'Agrupe processos em uma Execution Chain e rode-a em background para cargas e cálculos longos, com progresso via APEX_BACKGROUND_PROCESS.',
        tags: ['Execution Chain', 'background', 'segundo plano', 'APEX_BACKGROUND_PROCESS', 'SET_PROGRESS', 'GET_EXECUTION', 'processo longo', 'DBMS_SCHEDULER', 'barra de progresso'],
        conteudo: `
            Um processo que leva minutos (importar uma planilha grande, recalcular estoques, gerar centenas de PDFs) não deve
            prender o usuário olhando um *spinner* — nem arriscar *timeout* do navegador ou do proxy. Desde o **APEX 23.1** o tipo
            de processo **Execution Chain** resolve isso: ele agrupa processos filhos e pode executá-los **em background**, por
            meio do «DBMS_SCHEDULER», enquanto a página responde na hora.

            ## Como montar
            1. No Page Designer, aba Processing, crie um processo do tipo **Execution Chain**.
            2. Clique com o botão direito nele e use **Create Child Process** para adicionar os passos (Execute Code, Data Loading,
               Send E-Mail...). Eles rodam um após o outro.
            3. Ative **Settings → Execute in Background**.

            Mesmo sem background, uma chain é útil para agrupar vários processos sob **uma única condição**. Chains também podem ser
            aninhadas (atributo *Execution Chain* do processo filho).

            ## Atributos importantes
            | Atributo | Para que serve |
            |---|---|
            | Execute in Background | Roda em um job do scheduler em vez de na requisição |
            | Serialize Executions | Uma execução por vez (de todas as sessões) — evita conflitos na mesma tabela |
            | Return Execution ID into Item | Guarda o ID da execução para acompanhar o status |
            | Temporary File Handling | **Ignore**, **Move** ou **Copy** dos arquivos enviados por File Upload |
            | Executions Limit | Máximo de execuções simultâneas que um usuário pode disparar |

            O número de jobs simultâneos também pode ser limitado na **instância** (Background Jobs), no **workspace** (Workspace
            Isolation → Maximum Background Page Process Jobs) e na **aplicação** (Application Definition). Quando o limite é
            atingido, as novas execuções esperam na fila.

            ## Informando o progresso
            Nos processos filhos, use «APEX_BACKGROUND_PROCESS»:

            ~~~plsql
            declare
                l_total pls_integer;
                l_feito pls_integer := 0;
            begin
                select count(*) into l_total from staging_produtos where lote_id = :P40_LOTE_ID;

                apex_background_process.set_status('Validando e importando produtos');
                for r in (select * from staging_produtos where lote_id = :P40_LOTE_ID) loop
                    produtos_pkg.importar(r.id);
                    l_feito := l_feito + 1;
                    apex_background_process.set_progress(p_totalwork => l_total, p_sofar => l_feito);
                end loop;
            end;
            ~~~

            Na página, um processo **Ajax Callback** consulta o andamento pelo ID da execução:

            ~~~plsql
            declare
                l_exec apex_background_process.t_execution;
            begin
                l_exec := apex_background_process.get_execution(p_execution_id => apex_application.g_x01);
                apex_json.open_object;
                apex_json.write('estado',   l_exec.state);
                apex_json.write('mensagem', l_exec.last_status_message);
                apex_json.write('percentual',
                    case when l_exec.totalwork > 0 then round(100 * l_exec.sofar / l_exec.totalwork) end);
                apex_json.close_object;
            end;
            ~~~

            ~~~js
            var timer = setInterval(function () {
                apex.server.process("STATUS_IMPORTACAO",
                    { x01: apex.item("P40_EXEC_ID").getValue() },
                    { dataType: "json" }
                ).then(function (d) {
                    apex.item("P40_PROGRESSO").setValue(d.percentual);
                    if (["SUCCESS", "FAILED", "ABORTED"].indexOf(d.estado) >= 0) {
                        clearInterval(timer);
                    }
                });
            }, 3000);
            ~~~

            Estados possíveis («t_execution.state»): **ENQUEUED**, **SCHEDULED**, **EXECUTING**, **SUCCESS**, **FAILED** e
            **ABORTED** (terminada). Para interromper, use «APEX_BACKGROUND_PROCESS.TERMINATE» («ABORT» está depreciado).

            ## Monitorando
            - **Developer Toolbar → Session → View: Background Executions**: lista as execuções e permite terminar.
            - **Administration → Monitor Activity → Active Sessions → Background Processing** no workspace.

            :::atencao O que muda em background
            O código roda em um job, separado da requisição do usuário: não há como redirecionar, mostrar mensagens na página ou
            pedir confirmação. Os itens são lidos do session state do momento do submit — mude o que precisar **antes** de
            disparar. O schema de parsing precisa do privilégio **CREATE JOB**. Ao reimportar uma aplicação com processos em
            background, o assistente pergunta o que fazer com as execuções existentes.
            :::

            :::dica Arquivos enviados
            Se a chain processa um arquivo de um item File Upload, configure *Temporary File Handling* como **Move** (uma chain usa
            o arquivo) ou **Copy** (várias chains). Com **Ignore**, o arquivo não estará disponível para o processo em background.
            :::
        `
    },
    en: {
        titulo: 'Execution Chains and background processing',
        resumo: 'Group processes in an Execution Chain and run it in the background for long loads and calculations, reporting progress with APEX_BACKGROUND_PROCESS.',
        tags: ['Execution Chain', 'background', 'APEX_BACKGROUND_PROCESS', 'SET_PROGRESS', 'GET_EXECUTION', 'long-running process', 'DBMS_SCHEDULER', 'progress bar', 'async'],
        conteudo: `
            A process that takes minutes (importing a large spreadsheet, recalculating stock, producing hundreds of PDFs) should not
            leave the user staring at a spinner — nor risk a browser or proxy timeout. Since **APEX 23.1** the **Execution Chain**
            process type solves this: it groups child processes and can run them **in the background** through «DBMS_SCHEDULER»,
            while the page responds immediately.

            ## How to build one
            1. In Page Designer, Processing tab, create a process of type **Execution Chain**.
            2. Right-click it and use **Create Child Process** to add the steps (Execute Code, Data Loading, Send E-Mail...). They
               run one after the other.
            3. Turn on **Settings → Execute in Background**.

            Even without background mode a chain is useful to group several processes under **a single condition**. Chains can also
            be nested (the child process's *Execution Chain* attribute).

            ## Key attributes
            | Attribute | What it is for |
            |---|---|
            | Execute in Background | Runs in a scheduler job instead of in the request |
            | Serialize Executions | One execution at a time (across all sessions) — avoids conflicts on the same table |
            | Return Execution ID into Item | Stores the execution ID to track its status |
            | Temporary File Handling | **Ignore**, **Move** or **Copy** files uploaded through File Upload |
            | Executions Limit | Maximum simultaneous executions a user can submit |

            Concurrent jobs can also be limited at the **instance** (Background Jobs), **workspace** (Workspace Isolation → Maximum
            Background Page Process Jobs) and **application** (Application Definition) levels. When the limit is reached, new
            executions wait in the queue.

            ## Reporting progress
            In the child processes, use «APEX_BACKGROUND_PROCESS»:

            ~~~plsql
            declare
                l_total pls_integer;
                l_done  pls_integer := 0;
            begin
                select count(*) into l_total from staging_products where batch_id = :P40_BATCH_ID;

                apex_background_process.set_status('Validating and importing products');
                for r in (select * from staging_products where batch_id = :P40_BATCH_ID) loop
                    products_pkg.import(r.id);
                    l_done := l_done + 1;
                    apex_background_process.set_progress(p_totalwork => l_total, p_sofar => l_done);
                end loop;
            end;
            ~~~

            On the page, an **Ajax Callback** process reads the progress by execution ID:

            ~~~plsql
            declare
                l_exec apex_background_process.t_execution;
            begin
                l_exec := apex_background_process.get_execution(p_execution_id => apex_application.g_x01);
                apex_json.open_object;
                apex_json.write('state',   l_exec.state);
                apex_json.write('message', l_exec.last_status_message);
                apex_json.write('percent',
                    case when l_exec.totalwork > 0 then round(100 * l_exec.sofar / l_exec.totalwork) end);
                apex_json.close_object;
            end;
            ~~~

            ~~~js
            var timer = setInterval(function () {
                apex.server.process("IMPORT_STATUS",
                    { x01: apex.item("P40_EXEC_ID").getValue() },
                    { dataType: "json" }
                ).then(function (d) {
                    apex.item("P40_PROGRESS").setValue(d.percent);
                    if (["SUCCESS", "FAILED", "ABORTED"].indexOf(d.state) >= 0) {
                        clearInterval(timer);
                    }
                });
            }, 3000);
            ~~~

            Possible states («t_execution.state»): **ENQUEUED**, **SCHEDULED**, **EXECUTING**, **SUCCESS**, **FAILED** and
            **ABORTED** (terminated). To stop one, use «APEX_BACKGROUND_PROCESS.TERMINATE» («ABORT» is deprecated).

            ## Monitoring
            - **Developer Toolbar → Session → View: Background Executions**: lists executions and lets you terminate them.
            - **Administration → Monitor Activity → Active Sessions → Background Processing** in the workspace.

            :::atencao What changes in the background
            The code runs in a job, separate from the user's request: it cannot redirect, show page messages or ask for
            confirmation. Items are read from the session state as of the submit — change what you need **before** submitting.
            The parsing schema needs the **CREATE JOB** privilege. When you re-import an application with background processes, the
            wizard asks what to do with existing executions.
            :::

            :::dica Uploaded files
            If the chain processes a file from a File Upload item, set *Temporary File Handling* to **Move** (one chain uses the
            file) or **Copy** (several chains). With **Ignore**, the file will not be available to the background process.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-mail',
    cat: 'processos',
    nivel: 'basico',
    links: [
        { t: 'APEX_MAIL (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_MAIL.html' },
        { t: 'App Builder Guide — Managing Email Templates', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-email-templates.html' },
        { t: 'App Builder Guide — Sending Email from an Application', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/sending-email-from-an-application.html' }
    ],
    relacionados: ['administracao-instancia', 'automations', 'human-tasks-e-aprovacoes', 'apex-session-e-contexto', 'notificacoes-push'],
    pt: {
        titulo: 'Enviando e-mail (APEX_MAIL, Send E-Mail e templates)',
        resumo: 'Configure o SMTP, envie e-mails pelo processo Send E-Mail ou pela API APEX_MAIL, use templates com placeholders, anexos e acompanhe a fila.',
        tags: ['e-mail', 'email', 'APEX_MAIL', 'Send E-Mail', 'SMTP', 'Email Templates', 'PUSH_QUEUE', 'ADD_ATTACHMENT', 'APEX_MAIL_QUEUE', 'anexo'],
        conteudo: `
            O APEX envia e-mails a partir do banco: o pacote **APEX_MAIL** (construído sobre o «UTL_SMTP») grava cada mensagem em
            uma **fila**, e o job **ORACLE_APEX_MAIL_QUEUE** entrega periodicamente ao servidor SMTP. Mensagens enviadas ficam em
            «APEX_MAIL_LOG»; pendentes ou com erro, em «APEX_MAIL_QUEUE».

            ## 1. Configuração (uma vez)
            - O administrador da instância define o SMTP em **Administration Services → Instance Settings → Email**: host,
              porta, autenticação, uso de TLS e o *Default Email From Address* (que, se preenchido, é sempre usado como remetente).
            - O banco precisa de **ACL de rede** («DBMS_NETWORK_ACL_ADMIN») liberando o host SMTP para o schema do APEX e, para
              TLS, de um **wallet** com os certificados.
            - No **26.1**, o SMTP também pode ser configurado **por workspace**.
            - No Autonomous Database, siga o guia "Sending Email from APEX" do serviço (com remetentes aprovados).

            ## 2. Três formas de enviar
            | Forma | Quando usar |
            |---|---|
            | Processo **Send E-Mail** | Declarativo: destinatários com substituições (ex.: «&P2_EMAIL.»), assunto e corpo ou template, anexos por SQL |
            | «APEX_MAIL.SEND» com texto/HTML | Controle total do conteúdo em PL/SQL |
            | «APEX_MAIL.SEND» com template | Layout mantido em **Shared Components → Email Templates** |

            ## 3. Templates de e-mail
            Templates existem desde o 18.1 (o processo Send E-Mail passou a usá-los no 21.2). Cada template tem *Static
            Identifier*, assunto, formato HTML (cabeçalho, corpo, rodapé) e formato texto, com placeholders no formato
            «#NOME_DO_CAMPO#». Há modelos prontos (Order Details, Event Reminder, Scheduled Outage) para começar.

            ~~~plsql
            declare
                l_placeholders clob;
                l_mail_id      number;
            begin
                select json_object(
                           'CLIENTE' value c.nome,
                           'NUMERO'  value p.id,
                           'TOTAL'   value to_char(p.total, 'FM999G999G990D00'))
                  into l_placeholders
                  from pedidos p
                  join clientes c on c.id = p.cliente_id
                 where p.id = :P10_PEDIDO_ID;

                l_mail_id := apex_mail.send(
                    p_template_static_id => 'PEDIDO_CONFIRMADO',
                    p_placeholders       => l_placeholders,
                    p_to                 => :P10_EMAIL );

                for f in (select nome_arquivo, mime_type, conteudo
                            from pedido_anexos
                           where pedido_id = :P10_PEDIDO_ID) loop
                    apex_mail.add_attachment(
                        p_mail_id    => l_mail_id,
                        p_attachment => f.conteudo,
                        p_filename   => f.nome_arquivo,
                        p_mime_type  => f.mime_type );
                end loop;
            end;
            ~~~

            Os valores dos placeholders são **escapados automaticamente** no formato HTML. Para inserir HTML de propósito, use
            «#CAMPO!RAW#»; para remover tags, «#CAMPO!STRIPHTML#». «APEX_MAIL.PREPARE_TEMPLATE» devolve assunto, HTML e texto já
            preenchidos, sem enviar — útil para pré-visualizar. «p_language_override» escolhe a tradução do template.

            ## 4. Enviando sem template
            ~~~plsql
            declare
                l_id number;
            begin
                l_id := apex_mail.send(
                    p_to        => 'cliente@example.com',
                    p_from      => 'nao-responda@example.com',
                    p_subj      => 'Seu cadastro foi aprovado',
                    p_body      => 'Seu cadastro foi aprovado.' || utl_tcp.crlf,
                    p_body_html => '<html><body><p>Seu cadastro foi <strong>aprovado</strong>.</p></body></html>' );
                apex_mail.push_queue;   -- opcional: entrega já, sem esperar o job
            end;
            ~~~

            Regras do protocolo: nenhuma linha pode passar de **1000 caracteres** (quebre com «utl_tcp.crlf»), e «p_body_html» deve
            ser um documento HTML completo. Se você passar só «p_body», o e-mail é texto puro; com os dois, é *multipart*.

            :::atencao Sem commit, sem e-mail
            «APEX_MAIL.SEND» só **insere na fila**. Em processos de página o APEX faz o commit ao final da requisição; em scripts,
            jobs e SQLcl, faça **commit** você mesmo. Fora de uma sessão APEX, defina o workspace com «apex_util.set_workspace»
            (ou crie uma sessão com «APEX_SESSION») e, para templates, informe «p_application_id».
            :::

            :::dica Diagnóstico rápido
            E-mail não chegou? Consulte «APEX_MAIL_QUEUE» (erros como falha de conexão ou de autenticação SMTP aparecem lá) e
            «APEX_MAIL_LOG». O administrador também vê a fila em **Manage Instance → Mail Queue**. Para testes, «PUSH_QUEUE» evita
            esperar o próximo ciclo do job.
            :::
        `
    },
    en: {
        titulo: 'Sending e-mail (APEX_MAIL, Send E-Mail and templates)',
        resumo: 'Configure SMTP, send e-mail with the Send E-Mail process or the APEX_MAIL API, use templates with placeholders and attachments, and monitor the queue.',
        tags: ['e-mail', 'email', 'APEX_MAIL', 'Send E-Mail', 'SMTP', 'Email Templates', 'PUSH_QUEUE', 'ADD_ATTACHMENT', 'APEX_MAIL_QUEUE', 'attachment'],
        conteudo: `
            APEX sends e-mail from the database: the **APEX_MAIL** package (built on «UTL_SMTP») writes each message to a **queue**,
            and the **ORACLE_APEX_MAIL_QUEUE** job periodically delivers it to the SMTP server. Sent messages are in
            «APEX_MAIL_LOG»; pending or failed ones in «APEX_MAIL_QUEUE».

            ## 1. Configuration (once)
            - The instance administrator sets SMTP in **Administration Services → Instance Settings → Email**: host, port,
              authentication, TLS and the *Default Email From Address* (which, when set, is always used as the sender).
            - The database needs a **network ACL** («DBMS_NETWORK_ACL_ADMIN») allowing the APEX schema to reach the SMTP host and,
              for TLS, a **wallet** with the certificates.
            - In **26.1**, SMTP can also be configured **per workspace**.
            - On Autonomous Database, follow the service's "Sending Email from APEX" guide (with approved senders).

            ## 2. Three ways to send
            | Way | When to use |
            |---|---|
            | **Send E-Mail** process | Declarative: recipients with substitutions (e.g. «&P2_EMAIL.»), subject and body or template, attachments via SQL |
            | «APEX_MAIL.SEND» with text/HTML | Full control of the content in PL/SQL |
            | «APEX_MAIL.SEND» with a template | Layout kept in **Shared Components → Email Templates** |

            ## 3. E-mail templates
            Templates exist since 18.1 (the Send E-Mail process started using them in 21.2). Each template has a *Static Identifier*,
            subject, HTML format (header, body, footer) and plain-text format, with placeholders written as «#FIELD_NAME#».
            Sample templates (Order Details, Event Reminder, Scheduled Outage) help you get started.

            ~~~plsql
            declare
                l_placeholders clob;
                l_mail_id      number;
            begin
                select json_object(
                           'CUSTOMER' value c.name,
                           'ORDER_NO' value o.id,
                           'TOTAL'    value to_char(o.total, 'FM999G999G990D00'))
                  into l_placeholders
                  from orders o
                  join customers c on c.id = o.customer_id
                 where o.id = :P10_ORDER_ID;

                l_mail_id := apex_mail.send(
                    p_template_static_id => 'ORDER_CONFIRMED',
                    p_placeholders       => l_placeholders,
                    p_to                 => :P10_EMAIL );

                for f in (select file_name, mime_type, content
                            from order_attachments
                           where order_id = :P10_ORDER_ID) loop
                    apex_mail.add_attachment(
                        p_mail_id    => l_mail_id,
                        p_attachment => f.content,
                        p_filename   => f.file_name,
                        p_mime_type  => f.mime_type );
                end loop;
            end;
            ~~~

            Placeholder values are **escaped automatically** in the HTML format. To insert HTML on purpose use «#FIELD!RAW#»; to
            strip tags, «#FIELD!STRIPHTML#». «APEX_MAIL.PREPARE_TEMPLATE» returns the filled subject, HTML and text without sending —
            handy for previews. «p_language_override» picks a translated template.

            ## 4. Sending without a template
            ~~~plsql
            declare
                l_id number;
            begin
                l_id := apex_mail.send(
                    p_to        => 'customer@example.com',
                    p_from      => 'no-reply@example.com',
                    p_subj      => 'Your registration was approved',
                    p_body      => 'Your registration was approved.' || utl_tcp.crlf,
                    p_body_html => '<html><body><p>Your registration was <strong>approved</strong>.</p></body></html>' );
                apex_mail.push_queue;   -- optional: deliver now instead of waiting for the job
            end;
            ~~~

            Protocol rules: no line may exceed **1000 characters** (break with «utl_tcp.crlf»), and «p_body_html» must be a complete
            HTML document. If you pass only «p_body» the e-mail is plain text; with both it is *multipart*.

            :::atencao No commit, no e-mail
            «APEX_MAIL.SEND» only **inserts into the queue**. In page processes APEX commits at the end of the request; in scripts,
            jobs and SQLcl, **commit** yourself. Outside an APEX session, set the workspace with «apex_util.set_workspace» (or
            create a session with «APEX_SESSION») and, for templates, pass «p_application_id».
            :::

            :::dica Quick diagnosis
            E-mail did not arrive? Check «APEX_MAIL_QUEUE» (errors such as SMTP connection or authentication failures show up there)
            and «APEX_MAIL_LOG». The administrator also sees the queue under **Manage Instance → Mail Queue**. For testing,
            «PUSH_QUEUE» avoids waiting for the next job cycle.
            :::
        `
    }
});

DOC.topico({
    id: 'notificacoes-push',
    cat: 'processos',
    nivel: 'intermediario',
    desde: '23.1',
    links: [
        { t: 'App Builder Guide — Configuring Progressive Web App Attributes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/configuring-progressive-web-app-attributes.html' },
        { t: 'APEX_PWA (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_PWA.html' },
        { t: 'apex.pwa (JavaScript API)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.pwa.html' }
    ],
    relacionados: ['pwa', 'workflow', 'apex-mail', 'human-tasks-e-aprovacoes', 'automations'],
    pt: {
        titulo: 'Push notifications (APEX_PWA e Send Push Notification)',
        resumo: 'Envie notificações para o celular ou desktop dos usuários, mesmo com o app fechado, usando PWA, o processo Send Push Notification e a API APEX_PWA.',
        tags: ['push', 'notificação', 'push notification', 'APEX_PWA', 'PWA', 'Send Push Notification', 'SEND_PUSH_NOTIFICATION', 'apex.pwa', 'service worker', 'mobile'],
        conteudo: `
            **Web push notifications** permitem que a aplicação avise o usuário — no celular ou no desktop — mesmo quando ele não está
            com a página aberta: "Você tem uma nova aprovação", "Seu pedido foi enviado". O suporte nativo chegou no **APEX 23.1**,
            junto com o pacote **APEX_PWA**, e funciona sobre o recurso de [Progressive Web App](#/topico/pwa).

            ## Pré-requisitos
            - A aplicação precisa ser um **PWA** (os atributos de PWA só aparecem com **Friendly URLs** ativadas) e ser acessada por
              **HTTPS**.
            - Em **Shared Components → Progressive Web App → Push Notifications**, ative **Enable Push Notifications**.
            - O APEX usa um par de chaves (pública/privada) guardado como **credencial**; a pública permite a inscrição no navegador
              e a privada assina os envios. «APEX_PWA.GENERATE_PUSH_CREDENTIALS» regenera as chaves.
            - Informe um **Contact Email** (o provedor do serviço de push — Google, Mozilla, Apple — pode usá-lo para contato).
            - Ao ativar, o APEX adiciona a entrada **User Settings** na barra de navegação e uma página de configurações onde o
              usuário se inscreve.

            ## Como funciona
            1. **Inscrição**: o usuário, em cada dispositivo/navegador, aceita receber notificações. A inscrição fica associada ao
               usuário e à aplicação.
            2. **Envio**: um processo **Send Push Notification**, uma atividade de **Workflow**, uma ação de **Task Definition** ou a
               API «APEX_PWA.SEND_PUSH_NOTIFICATION» coloca a mensagem em uma **fila**.
            3. **Entrega**: um job do banco envia a fila aos serviços de push; todos os dispositivos inscritos do usuário recebem.
               «APEX_PWA.PUSH_QUEUE» dispara o envio imediatamente.

            ## A API
            | Chamada | Uso |
            |---|---|
            | «SEND_PUSH_NOTIFICATION(p_user_name, p_title, p_body, p_icon_url, p_target_url)» | Enfileira uma notificação para um usuário |
            | «HAS_PUSH_SUBSCRIPTION(p_user_name)» | O usuário tem ao menos um dispositivo inscrito? |
            | «SUBSCRIBE_PUSH_NOTIFICATIONS», «UNSUBSCRIBE_PUSH_NOTIFICATIONS» | Gerenciar inscrições no servidor |
            | «PUSH_QUEUE» | Enviar a fila agora |
            | «GENERATE_PUSH_CREDENTIALS» | Regenerar o par de chaves |

            «p_icon_url» usa por padrão o ícone da aplicação, e «p_target_url» (a página aberta ao clicar) usa por padrão a página
            inicial — a documentação recomenda habilitar *deep linking* ou *rejoin sessions* para uma melhor experiência.

            ~~~plsql
            -- Processo após criar um pedido que precisa de aprovação
            begin
                if apex_pwa.has_push_subscription(p_user_name => :P10_APROVADOR) then
                    apex_pwa.send_push_notification(
                        p_user_name => :P10_APROVADOR,
                        p_title     => 'Nova aprovação pendente',
                        p_body      => 'Pedido ' || :P10_ID || ' aguarda sua decisão.' );
                else
                    -- sem inscrição: use outro canal
                    apex_mail.send(
                        p_to   => :P10_APROVADOR_EMAIL,
                        p_from => 'nao-responda@example.com',
                        p_subj => 'Nova aprovação pendente',
                        p_body => 'Pedido ' || :P10_ID || ' aguarda sua decisão.' );
                end if;
            end;
            ~~~

            ## No navegador
            Além da página padrão de User Settings, você pode criar sua própria experiência com o namespace «apex.pwa»:

            ~~~js
            apex.pwa.hasPushSubscription().then(function (inscrito) {
                if (!inscrito) {
                    apex.pwa.subscribePushNotifications();
                }
            });
            ~~~

            Também existem «apex.pwa.unsubscribePushNotifications()» e «apex.pwa.getPushSubscription()».

            :::atencao Limitações práticas
            - A inscrição é **por dispositivo e por navegador**: quem usa celular e notebook precisa aceitar nos dois.
            - Em iPhone e iPad, o Safari só entrega push para web apps **adicionados à Tela de Início**.
            - O usuário (ou o sistema operacional) pode bloquear notificações a qualquer momento — trate push como canal
              complementar, não como único aviso de algo crítico.
            - O envio parte do banco para os serviços de push pela internet: como em qualquer chamada HTTPS feita pelo banco,
              verifique ACL de rede e wallet.
            :::

            :::dica Conteúdo das notificações
            Textos curtos e acionáveis funcionam melhor. Evite dados sensíveis no título e no corpo — a notificação pode aparecer na
            tela bloqueada. Leve o usuário à página certa e deixe os detalhes para depois do login.
            :::
        `
    },
    en: {
        titulo: 'Push notifications (APEX_PWA and Send Push Notification)',
        resumo: 'Send notifications to users\' phones or desktops, even with the app closed, using PWA, the Send Push Notification process and the APEX_PWA API.',
        tags: ['push', 'notification', 'push notification', 'APEX_PWA', 'PWA', 'Send Push Notification', 'SEND_PUSH_NOTIFICATION', 'apex.pwa', 'service worker', 'mobile'],
        conteudo: `
            **Web push notifications** let the application alert users — on their phone or desktop — even when the page is not open:
            "You have a new approval", "Your order has shipped". Native support arrived in **APEX 23.1**, together with the
            **APEX_PWA** package, and is built on the [Progressive Web App](#/topico/pwa) feature.

            ## Prerequisites
            - The application must be a **PWA** (PWA attributes only appear when **Friendly URLs** are on) and be served over
              **HTTPS**.
            - In **Shared Components → Progressive Web App → Push Notifications**, turn on **Enable Push Notifications**.
            - APEX uses a key pair (public/private) stored as a **credential**; the public key lets browsers subscribe and the private
              key signs the messages. «APEX_PWA.GENERATE_PUSH_CREDENTIALS» regenerates the keys.
            - Provide a **Contact Email** (the push service provider — Google, Mozilla, Apple — may use it to reach you).
            - When enabled, APEX adds a **User Settings** entry to the navigation bar and a settings page where users subscribe.

            ## How it works
            1. **Subscription**: on each device/browser, the user agrees to receive notifications. The subscription is tied to the
               user and the application.
            2. **Sending**: a **Send Push Notification** process, a **Workflow** activity, a **Task Definition** action or the
               «APEX_PWA.SEND_PUSH_NOTIFICATION» API puts the message in a **queue**.
            3. **Delivery**: a database job sends the queue to the push services; every subscribed device of the user receives it.
               «APEX_PWA.PUSH_QUEUE» triggers sending immediately.

            ## The API
            | Call | Use |
            |---|---|
            | «SEND_PUSH_NOTIFICATION(p_user_name, p_title, p_body, p_icon_url, p_target_url)» | Queues a notification for a user |
            | «HAS_PUSH_SUBSCRIPTION(p_user_name)» | Does the user have at least one subscribed device? |
            | «SUBSCRIBE_PUSH_NOTIFICATIONS», «UNSUBSCRIBE_PUSH_NOTIFICATIONS» | Manage subscriptions on the server |
            | «PUSH_QUEUE» | Send the queue now |
            | «GENERATE_PUSH_CREDENTIALS» | Regenerate the key pair |

            «p_icon_url» defaults to the application icon and «p_target_url» (the page opened on click) defaults to the home page —
            the documentation recommends enabling *deep linking* or *rejoin sessions* for a better experience.

            ~~~plsql
            -- Process after creating an order that needs approval
            begin
                if apex_pwa.has_push_subscription(p_user_name => :P10_APPROVER) then
                    apex_pwa.send_push_notification(
                        p_user_name => :P10_APPROVER,
                        p_title     => 'New approval pending',
                        p_body      => 'Order ' || :P10_ID || ' is waiting for your decision.' );
                else
                    -- no subscription: use another channel
                    apex_mail.send(
                        p_to   => :P10_APPROVER_EMAIL,
                        p_from => 'no-reply@example.com',
                        p_subj => 'New approval pending',
                        p_body => 'Order ' || :P10_ID || ' is waiting for your decision.' );
                end if;
            end;
            ~~~

            ## In the browser
            Besides the default User Settings page, you can build your own experience with the «apex.pwa» namespace:

            ~~~js
            apex.pwa.hasPushSubscription().then(function (subscribed) {
                if (!subscribed) {
                    apex.pwa.subscribePushNotifications();
                }
            });
            ~~~

            There are also «apex.pwa.unsubscribePushNotifications()» and «apex.pwa.getPushSubscription()».

            :::atencao Practical limitations
            - Subscriptions are **per device and per browser**: someone using a phone and a laptop must accept on both.
            - On iPhone and iPad, Safari only delivers push to web apps **added to the Home Screen**.
            - The user (or the operating system) can block notifications at any time — treat push as a complementary channel, not
              the only alert for something critical.
            - Messages go from the database to the push services over the internet: as with any HTTPS call made by the database,
              check the network ACL and wallet.
            :::

            :::dica Notification content
            Short, actionable texts work best. Avoid sensitive data in the title and body — the notification may show on the lock
            screen. Take the user to the right page and leave the details for after login.
            :::
        `
    }
});
