DOC.topico({
    id: 'exportar-importar',
    cat: 'devops',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Exporting an Application', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/exporting-an-application.html' },
        { t: 'App Builder Guide — Importing Export Files', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/importing-export-files.html' },
        { t: 'APEX_EXPORT.GET_APPLICATION', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/GET_APPLICATION_Function.html' }
    ],
    relacionados: ['ambientes-dev-test-prod', 'controle-de-versao', 'apexlang', 'supporting-objects', 'sqlcl-projects-e-cicd'],
    pt: {
        titulo: 'Exportar e importar aplicações',
        resumo: 'Tipos de export do 26.1 (Standard, Runtime, Full, Custom), formatos SQL e APEXlang, opções avançadas, import no App Builder, SQLcl e APEX_EXPORT.',
        tags: ['export', 'import', 'exportar', 'importar', 'f100.sql', 'APEX_EXPORT', 'SQLcl', 'apex export', 'split', 'Import Application', 'backup'],
        conteudo: `
            Como o APEX guarda as aplicações como **metadados** no banco, "levar a app para outro lugar" significa exportar esses
            metadados para um arquivo e reinstalá-los no destino. É assim que você faz deploy, backup, cópia entre workspaces e
            versionamento.

            ## Tipos de export (26.1)
            No App Builder (*Export / Import → Export*, ou o botão *Export / Import* na home da aplicação), o 26.1 organizou o
            export em quatro tipos:

            | Tipo | Para quê | O que leva |
            |---|---|---|
            | Standard | Controle de versão (recomendado) | Metadados + comentários e informações de auditoria do desenvolvedor |
            | Runtime | Deploy em teste/produção | Sem metadados de desenvolvimento; build status *Run Application Only* |
            | Full | Migração completa | Tudo, inclusive relatórios salvos e instâncias de workflow e tarefas |
            | Custom | Controle fino | Você escolhe cada opção avançada |

            E dois **formatos**: **SQL** (o clássico «f100.sql») ou **APEXlang** (um ZIP com o nome do alias da app, com arquivos
            «.apx» legíveis — veja [APEXlang](#/topico/apexlang)).

            ## Opções avançadas (formato SQL)
            - **Split into Multiple Files**: ZIP com um arquivo por componente, em vez de um único script.
            - **Supporting Object Definitions**: Yes, No ou *Yes and Install on Import Automatically*.
            - **Public/Private Reports**, **Report Subscriptions**, **Translations**, **Comments**.
            - **Original IDs**: mantém os IDs como estavam na última importação (diffs mais estáveis).
            - **Build Status Override** e **Owner Override** (outro schema dono).
            - **As of**: exporta como a aplicação estava *N minutos atrás* (flashback) — salva vidas depois de um erro.

            Além da aplicação inteira, dá para exportar páginas, componentes, workspaces, arquivos estáticos, temas e plug-ins.

            ## Importando no App Builder
            Em *App Builder → Import* (no 26.1 "Install Application" passou a se chamar **Import Application**) você envia o
            arquivo SQL, ZIP ou APEXlang e escolhe:
            - **Parsing Schema** — o schema dono da app no destino;
            - **Build Status** — *Run and Build* ou *Run Application Only* (protege contra edição);
            - **Import As Application** — gerar um novo ID, reutilizar o ID original (substitui a app existente) ou informar outro;
            - **Subscription Mode** (quando há componentes assinados) — Strict, Ignore Errors, Remove ou Legacy.

            Se houver Web Credentials ou Remote Servers, o assistente pede os dados do destino; se houver Supporting Objects,
            oferece instalá-los.

            ## Pela linha de comando (SQLcl)
            ~~~sql
            -- Arquivo único f100.sql
            apex export -applicationid 100

            -- Um arquivo por componente, sem data de export e com IDs originais
            apex export -applicationid 100 -split -skipExportDate -expOriginalIds

            -- Todas as apps de um workspace
            apex export -workspaceid 1908816359534887

            -- Importar no destino (mesmo workspace, mesmo ID)
            @f100.sql
            -- ou, para export split:
            @f100/install.sql
            ~~~

            Para instalar em workspace, ID ou schema diferentes, prepare o contexto com «APEX_APPLICATION_INSTALL» antes do
            script (veja [Promovendo entre ambientes](#/topico/ambientes-dev-test-prod)).

            ## Pela API PL/SQL
            ~~~plsql
            declare
                l_files apex_t_export_files;
            begin
                l_files := apex_export.get_application(
                               p_application_id          => 100,
                               p_split                   => false,
                               p_with_supporting_objects => 'Y');
                -- l_files(1).name = 'f100.sql'; l_files(1).contents = o script (CLOB)
                insert into backups_apex (nome, conteudo, criado_em)
                values (l_files(1).name, l_files(1).contents, sysdate);
                commit;
            end;
            /
            ~~~

            :::atencao Regras de compatibilidade
            - Não se importa uma app exportada de uma versão **mais nova** do APEX em uma mais antiga.
            - Importe primeiro a aplicação e **depois** os arquivos relacionados.
            - No 26.1, exports de **páginas ou componentes isolados** de versões anteriores não podem mais ser importados
              (aplicações completas, sim).
            - Segredos de Web Credentials não vão no arquivo: você os informa no destino.
            :::

            :::novo Mudanças recentes
            - **26.1**: tipos Standard/Runtime/Full/Custom, formato APEXlang e, no «APEX_EXPORT», arquivos binários em
              «contents_blob» (exports APEXlang incluem arquivos estáticos binários).
            - O utilitário Java **APEXExport** foi desuportado no 23.2 — use o SQLcl.
            - O APEX faz **backups automáticos** das aplicações (desde o 20.1), que podem ser consultados e restaurados no
              App Builder (*Manage Backups*).
            :::
        `
    },
    en: {
        titulo: 'Exporting and importing applications',
        resumo: '26.1 export types (Standard, Runtime, Full, Custom), SQL and APEXlang formats, advanced options, App Builder import, SQLcl and APEX_EXPORT.',
        tags: ['export', 'import', 'f100.sql', 'APEX_EXPORT', 'SQLcl', 'apex export', 'split', 'Import Application', 'backup'],
        conteudo: `
            Because APEX stores applications as **metadata** in the database, "taking the app somewhere else" means exporting that
            metadata to a file and reinstalling it on the target. That is how you deploy, back up, copy between workspaces and
            version your apps.

            ## Export types (26.1)
            In App Builder (*Export / Import → Export*, or the *Export / Import* button on the application home page), 26.1
            organizes exports into four types:

            | Type | Purpose | What it includes |
            |---|---|---|
            | Standard | Source control (recommended) | Metadata + developer comments and audit information |
            | Runtime | Deploying to test/production | No developer metadata; build status *Run Application Only* |
            | Full | Complete migration | Everything, including saved reports and workflow/task instances |
            | Custom | Fine-grained control | You pick every advanced option |

            And two **formats**: **SQL** (the classic «f100.sql») or **APEXlang** (a ZIP named after the app alias, holding readable
            «.apx» files — see [APEXlang](#/topico/apexlang)).

            ## Advanced options (SQL format)
            - **Split into Multiple Files**: a ZIP with one file per component instead of a single script.
            - **Supporting Object Definitions**: Yes, No or *Yes and Install on Import Automatically*.
            - **Public/Private Reports**, **Report Subscriptions**, **Translations**, **Comments**.
            - **Original IDs**: keeps IDs as they were at the last import (more stable diffs).
            - **Build Status Override** and **Owner Override** (a different owning schema).
            - **As of**: exports the application as it was *N minutes ago* (flashback) — a lifesaver after a mistake.

            Besides whole applications you can export pages, components, workspaces, static files, themes and plug-ins.

            ## Importing in App Builder
            Under *App Builder → Import* (in 26.1 "Install Application" was renamed **Import Application**) you upload the SQL,
            ZIP or APEXlang file and choose:
            - **Parsing Schema** — the schema that owns the app on the target;
            - **Build Status** — *Run and Build* or *Run Application Only* (protects against editing);
            - **Import As Application** — auto-assign a new ID, reuse the original ID (replaces the existing app) or enter another;
            - **Subscription Mode** (when there are subscribed components) — Strict, Ignore Errors, Remove or Legacy.

            If Web Credentials or Remote Servers are detected, the wizard asks for the target values; if there are Supporting
            Objects, it offers to install them.

            ## From the command line (SQLcl)
            ~~~sql
            -- Single file f100.sql
            apex export -applicationid 100

            -- One file per component, no export date, original IDs
            apex export -applicationid 100 -split -skipExportDate -expOriginalIds

            -- Every app in a workspace
            apex export -workspaceid 1908816359534887

            -- Install on the target (same workspace, same ID)
            @f100.sql
            -- or, for a split export:
            @f100/install.sql
            ~~~

            To install into a different workspace, ID or schema, set up the context with «APEX_APPLICATION_INSTALL» before running
            the script (see [Promoting between environments](#/topico/ambientes-dev-test-prod)).

            ## From the PL/SQL API
            ~~~plsql
            declare
                l_files apex_t_export_files;
            begin
                l_files := apex_export.get_application(
                               p_application_id          => 100,
                               p_split                   => false,
                               p_with_supporting_objects => 'Y');
                -- l_files(1).name = 'f100.sql'; l_files(1).contents = the script (CLOB)
                insert into apex_backups (name, content, created_on)
                values (l_files(1).name, l_files(1).contents, sysdate);
                commit;
            end;
            /
            ~~~

            :::atencao Compatibility rules
            - You cannot import an app exported from a **newer** APEX release into an older one.
            - Import the application first and the related files **afterwards**.
            - In 26.1, **single page or component** exports from earlier releases can no longer be imported (full applications
              still can).
            - Web Credential secrets are not in the file: you enter them on the target.
            :::

            :::novo Recent changes
            - **26.1**: Standard/Runtime/Full/Custom types, the APEXlang format and, in «APEX_EXPORT», binary files in
              «contents_blob» (APEXlang exports include binary static files).
            - The Java **APEXExport** utility was desupported in 23.2 — use SQLcl.
            - APEX takes **automatic application backups** (since 20.1), which you can browse and restore in App Builder
              (*Manage Backups*).
            :::
        `
    }
});

DOC.topico({
    id: 'ambientes-dev-test-prod',
    cat: 'devops',
    nivel: 'avancado',
    links: [
        { t: 'APEX_APPLICATION_INSTALL — Import Script Examples', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/Import-Script-Examples.html' },
        { t: 'APEX_APPLICATION_INSTALL (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_APPLICATION_INSTALL.html' },
        { t: 'App Builder Guide — Using Build Options', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-build-options-to-control-configuration.html' }
    ],
    relacionados: ['exportar-importar', 'sqlcl-projects-e-cicd', 'gerenciando-workspaces', 'web-credentials', 'supporting-objects'],
    pt: {
        titulo: 'Promovendo entre ambientes (dev, teste, produção)',
        resumo: 'Como levar uma app de dev para teste e produção: IDs e offsets, APEX_APPLICATION_INSTALL, Remote Servers, credenciais, build options e app settings.',
        tags: ['deploy', 'ambientes', 'produção', 'APEX_APPLICATION_INSTALL', 'generate_offset', 'set_workspace', 'build options', 'application settings', 'remote server', 'runtime'],
        conteudo: `
            Promover uma aplicação é instalar em **teste** e **produção** exatamente a versão validada em **desenvolvimento** — e
            ajustar só o que é específico de cada ambiente (URLs, credenciais, flags de recurso).

            ## O cenário ideal
            - Instâncias separadas (ou no mínimo workspaces separados) para dev, teste e produção.
            - **Mesmo nome e ID de workspace, mesmo schema e mesmo ID de aplicação** em todos os ambientes. Assim, instalar é só
              rodar o script exportado.
            - Produção com build status **Run Application Only** e, de preferência, instalação **runtime-only**.
            - Ninguém desenvolve em produção: toda mudança nasce em dev e é promovida.

            ## IDs e offsets
            - O **ID da aplicação** é único na instância inteira. Duas cópias da mesma app na mesma instância precisam de IDs
              diferentes.
            - Cada componente (página, região, item...) também tem um ID interno. Ao instalar uma cópia na mesma instância, use
              um **offset** para que esses IDs não colidam — é o que «generate_offset» faz.
            - Exportar com **Original IDs** ajuda a manter os IDs estáveis entre ambientes e deixa os diffs mais limpos.

            ## APEX_APPLICATION_INSTALL: quando o destino é diferente
            Se workspace, ID, schema ou alias forem diferentes no destino, configure o contexto antes de rodar o export:

            ~~~plsql
            begin
                apex_application_install.set_workspace('VENDAS_PROD');
                apex_application_install.set_application_id(100);
                apex_application_install.generate_offset;
                apex_application_install.set_schema('VENDAS');
                apex_application_install.set_application_alias('VENDAS');
                apex_application_install.set_build_status(
                    p_build_status => apex_application_admin.c_build_status_run_only);
                apex_application_install.set_auto_install_sup_obj(p_auto_install_sup_obj => true);
                apex_application_install.set_keep_sessions(p_keep_sessions => true);
                -- URL do serviço REST de produção
                apex_application_install.set_remote_server(
                    p_static_id => 'API_ERP',
                    p_base_url  => 'https://erp.empresa.com.br/api/');
            end;
            /

            @f100.sql
            ~~~

            «set_keep_sessions» preserva as sessões dos usuários durante a atualização; «generate_application_id» gera um ID
            livre quando você não quer escolher um.

            ## O que muda de um ambiente para outro
            | Item | Como tratar |
            |---|---|
            | URLs de APIs externas | **Remote Servers** (Shared Components) + «set_remote_server» ou *Prompt on Install* |
            | Senhas e tokens | **Web Credentials** — os segredos não são exportados; defina-os em cada ambiente |
            | Recursos ligados/desligados | **Build Options** (*Status*, *Default on Export*, *On Upgrade Keep Status*) |
            | Parâmetros da aplicação | **Application Settings** + «APEX_APP_SETTING»; use *On Upgrade Keep Value* |
            | Objetos de banco | Scripts versionados, Liquibase/SQLcl Projects ou Supporting Objects |
            | Identificação visual | *Environment Banner* do workspace (21.2+) para não confundir dev com produção |

            ## Ajustes depois de instalado
            O pacote «APEX_APPLICATION_ADMIN» (23.1+) altera atributos de uma app já instalada — status, build options, alias,
            versão, esquema de autenticação:

            ~~~plsql
            begin
                apex_util.set_workspace(p_workspace => 'VENDAS_PROD');
                -- Liga a build option de Static ID "novo-checkout" na app 100
                apex_application_admin.set_build_option_status(
                    p_application_id => 100,
                    p_static_id      => 'novo-checkout',
                    p_build_status   => apex_application_admin.c_build_option_status_include);
                commit;
            end;
            /
            ~~~

            :::dica Recurso escondido em produção
            Associe páginas e componentes novos a uma build option com status *Exclude*. A versão vai para produção desligada e,
            no dia do lançamento, basta incluir a build option — sem novo deploy.
            :::

            :::atencao Objetos de banco andam junto
            A aplicação e os objetos de banco (tabelas, pacotes, views) precisam chegar **juntos** ao destino. Um deploy que
            instala a app mas esquece de compilar o pacote novo quebra a produção. Automatize as duas partes no mesmo pipeline
            (veja [SQLcl Projects e CI/CD](#/topico/sqlcl-projects-e-cicd)).
            :::
        `
    },
    en: {
        titulo: 'Promoting between environments (dev, test, prod)',
        resumo: 'Moving an app from dev to test and production: IDs and offsets, APEX_APPLICATION_INSTALL, Remote Servers, credentials, build options and app settings.',
        tags: ['deploy', 'environments', 'production', 'APEX_APPLICATION_INSTALL', 'generate_offset', 'set_workspace', 'build options', 'application settings', 'remote server', 'runtime'],
        conteudo: `
            Promoting an application means installing in **test** and **production** exactly the version validated in
            **development** — and adjusting only what is specific to each environment (URLs, credentials, feature flags).

            ## The ideal setup
            - Separate instances (or at least separate workspaces) for dev, test and production.
            - **Same workspace name and ID, same schema and same application ID** everywhere. Installing is then just running
              the exported script.
            - Production with build status **Run Application Only** and, ideally, a **runtime-only** installation.
            - Nobody develops in production: every change starts in dev and is promoted.

            ## IDs and offsets
            - The **application ID** is unique across the whole instance. Two copies of the same app in one instance need
              different IDs.
            - Every component (page, region, item...) also has an internal ID. When installing a copy into the same instance, use
              an **offset** so those IDs do not collide — that is what «generate_offset» does.
            - Exporting with **Original IDs** keeps IDs stable across environments and makes diffs cleaner.

            ## APEX_APPLICATION_INSTALL: when the target differs
            If workspace, ID, schema or alias differ on the target, set up the context before running the export:

            ~~~plsql
            begin
                apex_application_install.set_workspace('SALES_PROD');
                apex_application_install.set_application_id(100);
                apex_application_install.generate_offset;
                apex_application_install.set_schema('SALES');
                apex_application_install.set_application_alias('SALES');
                apex_application_install.set_build_status(
                    p_build_status => apex_application_admin.c_build_status_run_only);
                apex_application_install.set_auto_install_sup_obj(p_auto_install_sup_obj => true);
                apex_application_install.set_keep_sessions(p_keep_sessions => true);
                -- Production REST service URL
                apex_application_install.set_remote_server(
                    p_static_id => 'ERP_API',
                    p_base_url  => 'https://erp.example.com/api/');
            end;
            /

            @f100.sql
            ~~~

            «set_keep_sessions» preserves user sessions during the update; «generate_application_id» picks a free ID when you do
            not want to choose one.

            ## What changes between environments
            | Item | How to handle it |
            |---|---|
            | External API URLs | **Remote Servers** (Shared Components) + «set_remote_server» or *Prompt on Install* |
            | Passwords and tokens | **Web Credentials** — secrets are not exported; set them in each environment |
            | Features on/off | **Build Options** (*Status*, *Default on Export*, *On Upgrade Keep Status*) |
            | Application parameters | **Application Settings** + «APEX_APP_SETTING»; use *On Upgrade Keep Value* |
            | Database objects | Versioned scripts, Liquibase/SQLcl Projects or Supporting Objects |
            | Visual cue | Workspace *Environment Banner* (21.2+) so nobody mistakes dev for production |

            ## Adjusting after installation
            The «APEX_APPLICATION_ADMIN» package (23.1+) changes attributes of an already installed app — status, build options,
            alias, version, authentication scheme:

            ~~~plsql
            begin
                apex_util.set_workspace(p_workspace => 'SALES_PROD');
                -- Switch on the build option with Static ID "new-checkout" in app 100
                apex_application_admin.set_build_option_status(
                    p_application_id => 100,
                    p_static_id      => 'new-checkout',
                    p_build_status   => apex_application_admin.c_build_option_status_include);
                commit;
            end;
            /
            ~~~

            :::dica Dark launch in production
            Tie new pages and components to a build option with status *Exclude*. The release goes to production switched off
            and, on launch day, you just include the build option — no new deployment.
            :::

            :::atencao Database objects travel together
            The application and its database objects (tables, packages, views) must reach the target **together**. A deployment
            that installs the app but forgets to compile the new package breaks production. Automate both parts in the same
            pipeline (see [SQLcl Projects and CI/CD](#/topico/sqlcl-projects-e-cicd)).
            :::
        `
    }
});

DOC.topico({
    id: 'working-copies',
    cat: 'devops',
    nivel: 'intermediario',
    desde: '23.2',
    links: [
        { t: 'App Builder Guide — About Working Copies', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-working-copies.html' },
        { t: 'App Builder Guide — Merging Changes into Main', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/merging-changes-from-a-working-copy-into-main.html' },
        { t: 'App Builder Guide — Creating a Working Copy', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-a-working-copy-to-merge-refresh-or-compare.html' }
    ],
    relacionados: ['controle-de-versao', 'apexlang', 'exportar-importar', 'page-designer'],
    pt: {
        titulo: 'Working Copies e merge',
        resumo: 'Cópias de trabalho da aplicação (23.2+): criar, comparar, fazer refresh e merge na Main, como a comparação funciona e as limitações.',
        tags: ['working copy', 'cópia de trabalho', 'merge', 'compare', 'refresh from main', 'branch', 'MAIN_APP_ID', 'Application Lock', 'diff'],
        conteudo: `
            **Working Copies** permitem trabalhar em uma **cópia isolada** de uma aplicação e depois fazer *merge* das mudanças de
            volta na aplicação principal (a **Main**) — algo parecido com um branch do Git, só que dentro do App Builder. O recurso
            surgiu no **APEX 23.2**; o 24.1 trouxe a comparação de uma página com a Main e diffs em YAML, e no 26.1 os diffs são
            exibidos em APEXlang.

            ## Quando usar
            - Testar uma alteração grande sem atrapalhar quem usa a app de desenvolvimento.
            - Vários desenvolvedores trabalhando em partes diferentes da mesma aplicação.
            - Prototipar uma ideia que talvez seja descartada.

            ## O ciclo de vida
            1. Na home da aplicação, crie a working copy e dê um nome (ex.: «relatorio-vendas»). Ela ganha um **novo ID de
               aplicação**.
            2. Edite normalmente. O nome da cópia aparece ao lado do nome da app no App Builder e no Page Designer.
            3. **Compare Changes**: veja o que mudou em relação à Main — ou entre duas working copies.
            4. **Refresh from Main**: traga para a cópia o que outros já integraram na Main.
            5. **Merge into Main**: revise a lista, desmarque o que não deve ir, escolha *Backup target app first* e, se quiser,
               *Delete Working Copy after merge*. Confirme com *Confirm Merge*.

            ## Como a comparação funciona
            O APEX exporta as duas aplicações em formato *split* (um arquivo por componente), calcula um checksum por arquivo e
            compara. A working copy é exportada com os **IDs originais**, para que o mesmo componente tenha o mesmo ID dos dois
            lados. Esse export roda em um **job de background**, então o banco precisa de «JOB_QUEUE_PROCESSES» maior que zero:

            ~~~sql
            select value
              from v$parameter
             where name = 'job_queue_processes';

            -- Se estiver 0 (como DBA):
            alter system set job_queue_processes = 20 scope = both;
            ~~~

            ## Como o merge funciona (atenção!)
            O merge **substitui componentes inteiros**: se a página ou o shared component existe na Main, ele é trocado pela versão
            da working copy. **Não existe merge linha a linha.** Se alguém alterou a página 10 na Main depois que você criou a
            cópia e você fizer merge da sua página 10, as mudanças da Main **se perdem**.

            Para evitar sustos:
            - Faça *Refresh from Main* antes do merge.
            - Combine quem mexe em quais páginas.
            - No diálogo de merge, desmarque tudo o que você não alterou de propósito — itens aparecem como alterados,
              adicionados ou ausentes (*missing*).

            ## Limitações
            | Situação | O que fazer |
            |---|---|
            | Working copy de working copy | Não é permitido |
            | Traduções, temas e templates de tema | Não são mergeados — aplique manualmente na Main |
            | Supporting Objects e atributos da aplicação | Idem |
            | Componentes de workspace (App Groups, Credentials, Remote Servers) | Idem |
            | Componente apagado na cópia | Apague manualmente na Main |
            | Automations | Ficam desabilitadas na cópia; desmarque no merge ou reabilite depois |
            | Nomes duplicados de shared components entre cópias | Podem gerar «ORA-00001» no merge — combine os nomes |

            ## Referenciando a Main
            A substitution string «MAIN_APP_ID» (24.2+) informa o ID da aplicação principal quando você está em uma working copy —
            útil em código ou links que dependem do ID "oficial" da app.

            :::novo 26.1: Application Lock e APEXlang
            - **Application Lock**: uma aplicação travada não pode ser alterada pelo App Builder — só via APEXlang. Com working
              copies, você pode travar a Main para que as mudanças entrem apenas pelo merge.
            - O Page Designer ganhou a opção **APEXlang View**, que mostra a página atual em APEXlang (somente leitura), e os
              diffs entre cópias passaram a ser exibidos em APEXlang.
            :::

            :::dica Working Copies não substituem o Git
            Working copies são ótimas para mudanças de curta duração dentro de uma instância. Para histórico, revisão de código e
            CI/CD, combine-as com exports versionados (veja [Controle de versão](#/topico/controle-de-versao)).
            :::
        `
    },
    en: {
        titulo: 'Working Copies and merge',
        resumo: 'Application working copies (23.2+): create, compare, refresh and merge into Main, how comparison works and the limitations.',
        tags: ['working copy', 'merge', 'compare', 'refresh from main', 'branch', 'MAIN_APP_ID', 'Application Lock', 'diff'],
        conteudo: `
            **Working Copies** let you work on an **isolated copy** of an application and then *merge* the changes back into the
            main application (**Main**) — similar to a Git branch, but inside App Builder. The feature arrived in **APEX 23.2**;
            24.1 added comparing a page with Main and YAML diffs, and in 26.1 diffs are displayed in APEXlang.

            ## When to use it
            - Testing a large change without disturbing people using the development app.
            - Several developers working on different parts of the same application.
            - Prototyping an idea that may be thrown away.

            ## The lifecycle
            1. On the application home page, create the working copy and name it (e.g. «sales-report»). It gets a **new
               application ID**.
            2. Edit as usual. The copy's name appears next to the app name in App Builder and Page Designer.
            3. **Compare Changes**: see what changed relative to Main — or between two working copies.
            4. **Refresh from Main**: bring into your copy what others have already merged into Main.
            5. **Merge into Main**: review the list, deselect what should not go, choose *Backup target app first* and, optionally,
               *Delete Working Copy after merge*. Finish with *Confirm Merge*.

            ## How comparison works
            APEX exports both applications in *split* form (one file per component), computes a checksum per file and compares
            them. The working copy is exported with **original IDs**, so the same component has the same ID on both sides. That
            export runs in a **background job**, so the database needs «JOB_QUEUE_PROCESSES» greater than zero:

            ~~~sql
            select value
              from v$parameter
             where name = 'job_queue_processes';

            -- If it is 0 (as a DBA):
            alter system set job_queue_processes = 20 scope = both;
            ~~~

            ## How merge works (careful!)
            Merge **replaces whole components**: if the page or shared component exists in Main, it is swapped for the working
            copy's version. **There is no line-level merge.** If someone changed page 10 in Main after you created your copy and
            you merge your page 10, Main's changes are **lost**.

            To avoid surprises:
            - Run *Refresh from Main* before merging.
            - Agree on who works on which pages.
            - In the merge dialog, deselect anything you did not intentionally change — items show up as changed, added or
              missing.

            ## Limitations
            | Situation | What to do |
            |---|---|
            | A working copy of a working copy | Not allowed |
            | Translations, themes and theme templates | Not merged — apply them manually to Main |
            | Supporting Objects and application properties | Same |
            | Workspace components (App Groups, Credentials, Remote Servers) | Same |
            | A component deleted in the copy | Delete it manually in Main |
            | Automations | Disabled in the copy; deselect them when merging or re-enable afterwards |
            | Duplicate shared component names across copies | May raise «ORA-00001» on merge — coordinate names |

            ## Referencing Main
            The «MAIN_APP_ID» substitution string (24.2+) gives you the main application ID when you are in a working copy —
            handy for code or links that depend on the app's "official" ID.

            :::novo 26.1: Application Lock and APEXlang
            - **Application Lock**: a locked application cannot be changed through App Builder — only through APEXlang. With
              working copies, you can lock Main so changes only come in through merges.
            - Page Designer gained the **APEXlang View** option, showing the current page in APEXlang (read-only), and diffs
              between copies are now displayed in APEXlang.
            :::

            :::dica Working Copies do not replace Git
            Working copies are great for short-lived changes inside one instance. For history, code review and CI/CD, combine them
            with versioned exports (see [Version control](#/topico/controle-de-versao)).
            :::
        `
    }
});

DOC.topico({
    id: 'sqlcl-projects-e-cicd',
    cat: 'devops',
    nivel: 'avancado',
    links: [
        { t: 'SQLcl User\'s Guide — Database Application CI/CD', u: 'https://docs.oracle.com/en/database/oracle/sql-developer-command-line/26.1/sqcug/database-application-ci-cd.html' },
        { t: 'SQLcl — Project Quick Start', u: 'https://docs.oracle.com/en/database/oracle/sql-developer-command-line/26.1/sqcug/quick-start.html' },
        { t: 'SQLcl — About the Project Command', u: 'https://docs.oracle.com/en/database/oracle/sql-developer-command-line/26.1/sqcug/project-command.html' }
    ],
    relacionados: ['controle-de-versao', 'ambientes-dev-test-prod', 'apexlang', 'exportar-importar', 'supporting-objects'],
    pt: {
        titulo: 'SQLcl Projects e CI/CD',
        resumo: 'O comando project do SQLcl (24.3+): init, export, stage, release, gen-artifact e deploy com Git e Liquibase, incluindo aplicações APEX.',
        tags: ['SQLcl', 'project', 'CI/CD', 'Liquibase', 'pipeline', 'deploy', 'gen-artifact', 'stage', 'release', 'DevOps', 'Git', 'changelog'],
        conteudo: `
            O comando «project» do **SQLcl** (disponível desde o SQLcl 24.3, de outubro de 2024) é a proposta oficial da Oracle
            para CI/CD de aplicações de banco — **incluindo aplicações APEX**. Ele junta Git, export de objetos e **Liquibase** em
            um fluxo padronizado: você desenvolve no banco de dev, exporta o código para o repositório, gera changelogs e
            empacota um artefato que é implantado em teste e produção.

            ## Os subcomandos
            | Comando | Atalho | O que faz |
            |---|---|---|
            | «project init» | in | Cria o projeto (pasta «.dbtools» com configuração e filtros) |
            | «project config» | cfg | Lista e altera configurações |
            | «project export» | ex | Exporta objetos dos schemas (via DBMS_METADATA) e aplicações APEX para «src/» |
            | «project stage» | st | Compara o branch atual com o base e gera changelogs Liquibase em «dist/releases/next» |
            | «project verify» | v | Verifica snapshots, mudanças e o projeto |
            | «project release» | re | Fecha a versão: renomeia «next» para o número da versão |
            | «project gen-artifact» | ga | Gera o ZIP implantável |
            | «project deploy» | dp | Implanta o artefato no banco conectado |

            ## Estrutura do repositório
            ~~~texto
            vendas/
            ├── .dbtools/              configuração, filtros, formatação
            ├── src/database/          o "estado atual" do código
            │   └── vendas/
            │       ├── tables/ ...
            │       └── apex_apps/f100/
            ├── dist/                  changelogs Liquibase por release
            │   └── releases/next/     trabalho em andamento
            └── artifact/              ZIPs gerados pelo gen-artifact
            ~~~

            ## Um ciclo completo
            Uma vez, crie as conexões nomeadas e o projeto:

            ~~~sql
            conn -savepwd -save vendas-dev  vendas/senha@//dev-db:1521/devpdb
            conn -savepwd -save vendas-prod vendas/senha@//prod-db:1521/prodpdb

            !git init --initial-branch=main
            project init -name vendas -schemas VENDAS
            !git add --all
            !git commit -m "projeto inicial"
            ~~~

            A cada tarefa — branch, desenvolvimento no banco de dev (tabelas, pacotes, páginas APEX), export e stage:

            ~~~sql
            conn -name vendas-dev
            !git checkout -b TICKET-42
            project export
            !git add --all
            !git commit -m "TICKET-42: tabela de pedidos e pagina de cadastro"
            project stage
            !git add --all
            !git commit -m "TICKET-42: changelogs"
            !git checkout main
            !git merge TICKET-42
            ~~~

            Na hora de entregar:

            ~~~sql
            project release -version 1.0.0
            !git add --all
            !git commit -m "release 1.0.0"
            !git tag release-1.0.0
            project gen-artifact -version 1.0.0

            conn -name vendas-prod
            project deploy -file artifact/vendas-1.0.0.zip
            ~~~

            ## Liquibase por baixo
            Cada mudança "staged" vira um *changeset* Liquibase. No destino, o Liquibase embutido no SQLcl registra os changesets já
            aplicados (tabela «DATABASECHANGELOG»), então o deploy executa **só o que falta** — o mesmo artefato serve para teste e
            produção. Com «project stage add-custom -file-name carga.sql» você inclui scripts próprios (dados de referência, por
            exemplo).

            ## E as aplicações APEX?
            - «project export» exporta também as aplicações APEX dos schemas do projeto, em «src/database/<schema>/apex_apps/».
            - Filtros em «.dbtools/filters/project.filters» controlam o que entra — por exemplo «export_type = 'APEX_APPLICATION'»
              ou «application_id in (200, 300)».
            - A partir do SQLcl 26.2, projetos também suportam aplicações em formato **APEXlang** (opção de configuração
              «apex.apexlang»; confira com «project config -list»).

            ## No servidor de CI
            O SQLcl roda sem interação, então qualquer ferramenta (GitHub Actions, GitLab CI, Jenkins, Azure DevOps) consegue
            executar o deploy:

            ~~~sql deploy.sql
            conn -name vendas-test
            project deploy -file artifact/vendas-1.0.0.zip
            exit
            ~~~

            ~~~bash
            sql /nolog @deploy.sql
            ~~~

            :::atencao Release é imutável
            Código que entrou em uma release **não deve ser alterado** — corrija em uma nova release. Antes de fechar a versão,
            rode «project verify» e teste o artefato em um banco de build e em um de teste com dados, por exemplo gerando
            «project gen-artifact -version 1.0.0-test».
            :::

            :::dica Mesma versão do SQLcl para todos
            Use a mesma versão do SQLcl nas máquinas dos desenvolvedores e no CI; a documentação tem uma seção específica sobre
            como atualizar o SQLcl em projetos existentes.
            :::
        `
    },
    en: {
        titulo: 'SQLcl Projects and CI/CD',
        resumo: 'The SQLcl project command (24.3+): init, export, stage, release, gen-artifact and deploy with Git and Liquibase, APEX applications included.',
        tags: ['SQLcl', 'project', 'CI/CD', 'Liquibase', 'pipeline', 'deploy', 'gen-artifact', 'stage', 'release', 'DevOps', 'Git', 'changelog'],
        conteudo: `
            The **SQLcl** «project» command (available since SQLcl 24.3, October 2024) is Oracle's official answer for CI/CD of
            database applications — **APEX applications included**. It brings Git, object export and **Liquibase** together in a
            standard flow: you develop on the dev database, export the code to the repository, generate changelogs and package an
            artifact that is deployed to test and production.

            ## The subcommands
            | Command | Short | What it does |
            |---|---|---|
            | «project init» | in | Creates the project («.dbtools» folder with configuration and filters) |
            | «project config» | cfg | Lists and changes settings |
            | «project export» | ex | Exports schema objects (through DBMS_METADATA) and APEX applications to «src/» |
            | «project stage» | st | Compares the current branch with the base and writes Liquibase changelogs to «dist/releases/next» |
            | «project verify» | v | Checks snapshots, changes and the project |
            | «project release» | re | Closes the version: renames «next» to the version number |
            | «project gen-artifact» | ga | Builds the deployable ZIP |
            | «project deploy» | dp | Deploys the artifact to the connected database |

            ## Repository layout
            ~~~texto
            sales/
            ├── .dbtools/              configuration, filters, formatting
            ├── src/database/          the "current state" of the code
            │   └── sales/
            │       ├── tables/ ...
            │       └── apex_apps/f100/
            ├── dist/                  Liquibase changelogs per release
            │   └── releases/next/     work in progress
            └── artifact/              ZIPs produced by gen-artifact
            ~~~

            ## A full cycle
            Once, create the named connections and the project:

            ~~~sql
            conn -savepwd -save sales-dev  sales/password@//dev-db:1521/devpdb
            conn -savepwd -save sales-prod sales/password@//prod-db:1521/prodpdb

            !git init --initial-branch=main
            project init -name sales -schemas SALES
            !git add --all
            !git commit -m "initial project"
            ~~~

            For each task — branch, develop on the dev database (tables, packages, APEX pages), export and stage:

            ~~~sql
            conn -name sales-dev
            !git checkout -b TICKET-42
            project export
            !git add --all
            !git commit -m "TICKET-42: orders table and entry page"
            project stage
            !git add --all
            !git commit -m "TICKET-42: changelogs"
            !git checkout main
            !git merge TICKET-42
            ~~~

            When it is time to ship:

            ~~~sql
            project release -version 1.0.0
            !git add --all
            !git commit -m "release 1.0.0"
            !git tag release-1.0.0
            project gen-artifact -version 1.0.0

            conn -name sales-prod
            project deploy -file artifact/sales-1.0.0.zip
            ~~~

            ## Liquibase under the hood
            Each staged change becomes a Liquibase *changeset*. On the target, SQLcl's embedded Liquibase records the changesets
            already applied (the «DATABASECHANGELOG» table), so a deployment runs **only what is missing** — the same artifact
            serves test and production. With «project stage add-custom -file-name load.sql» you add your own scripts (reference
            data, for example).

            ## What about APEX applications?
            - «project export» also exports the APEX applications of the project's schemas, under
              «src/database/<schema>/apex_apps/».
            - Filters in «.dbtools/filters/project.filters» control what goes in — for example «export_type = 'APEX_APPLICATION'»
              or «application_id in (200, 300)».
            - Starting with SQLcl 26.2, projects also support applications in **APEXlang** format (the «apex.apexlang»
              configuration option; check it with «project config -list»).

            ## On the CI server
            SQLcl runs non-interactively, so any tool (GitHub Actions, GitLab CI, Jenkins, Azure DevOps) can run the deployment:

            ~~~sql deploy.sql
            conn -name sales-test
            project deploy -file artifact/sales-1.0.0.zip
            exit
            ~~~

            ~~~bash
            sql /nolog @deploy.sql
            ~~~

            :::atencao A release is immutable
            Code that made it into a release **must not be modified** — fix it in a new release. Before closing a version, run
            «project verify» and test the artifact on a build database and on a test database with data, for instance by
            generating «project gen-artifact -version 1.0.0-test».
            :::

            :::dica Same SQLcl version for everyone
            Use the same SQLcl version on developer machines and in CI; the documentation has a dedicated section on upgrading
            SQLcl for existing projects.
            :::
        `
    }
});

DOC.topico({
    id: 'apexlang',
    cat: 'devops',
    nivel: 'intermediario',
    desde: '26.1',
    links: [
        { t: 'App Builder Guide — About APEXlang', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-an-application-with-APEXlang.html' },
        { t: 'SQLcl User\'s Guide — APEXlang commands', u: 'https://docs.oracle.com/en/database/oracle/sql-developer-command-line/26.1/sqcug/apexlang.html' },
        { t: 'APEXlang API Reference', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/apxln/index.html' }
    ],
    relacionados: ['controle-de-versao', 'working-copies', 'exportar-importar', 'blueprints-e-spec-driven', 'apex-assistant'],
    pt: {
        titulo: 'APEXlang (26.1)',
        resumo: 'A linguagem aberta de especificação de aplicações do APEX 26.1: arquivos .apx legíveis para Git e LLMs, sintaxe, export/import e os comandos do SQLcl.',
        tags: ['APEXlang', '.apx', 'APEX 26.1', 'SQLcl', 'apex export', 'apex import', 'apex validate', 'apex generate', 'Static ID', 'LLM', 'IA', 'VS Code', 'Application Lock'],
        conteudo: `
            O **APEXlang** é a maior novidade de ciclo de vida do APEX 26.1: uma *linguagem aberta de especificação de
            aplicações* que representa uma app APEX como **arquivos de texto legíveis** («.apx»). Esses arquivos podem ser
            revisados, versionados, comparados, validados — e também lidos, editados e gerados por **LLMs e agentes de IA**.
            Guardados no Git, os arquivos APEXlang podem servir como a **fonte da verdade** da aplicação.

            ## Por que um novo formato?
            O export SQL tradicional é um script enorme de chamadas a APIs internas com IDs numéricos: ótimo para instalar,
            péssimo para ler, revisar em pull requests ou editar à mão. O APEXlang descreve a mesma aplicação de forma
            declarativa, componente por componente, usando **Static IDs** legíveis em vez de IDs internos.

            ## Estrutura de um export APEXlang
            O export é um ZIP com o nome do alias da aplicação. Descompactado:

            ~~~texto
            minha-app/
            ├── application.apx          atributos da aplicação
            ├── page_groups.apx
            ├── pages/
            │   ├── p00001.apx
            │   └── p00002.apx
            ├── shared_components/       lists.apx, lovs.apx...
            ├── supporting_objects/      scripts SQL
            ├── deployments/
            │   └── default.json         workspace, ID, schema do destino
            └── .apex/
                └── apexlang.json        versão do metamodelo (define o compilador)
            ~~~

            Arquivos CSS, JavaScript e imagens da aplicação também vão no pacote.

            ## Como é a sintaxe
            Cada componente tem tipo, identificador e um bloco entre parênteses; propriedades são «nome: valor»; grupos de
            propriedades ficam entre chaves; «@» referencia outro componente (como templates). Trecho de uma página:

            ~~~texto
            page 1 (
                name: Home
                alias: HOME
                title: Home
                security {
                    pageAccessProtection: argumentsMustHaveChecksum
                }

                region app-name (
                    name: Home
                    type: staticContent
                    layout {
                        sequence: 10
                        slot: breadcrumbBar
                    }
                    appearance {
                        template: @/hero
                    }
                )
            )
            ~~~

            Comentários usam «//» ou «/* */», e blocos de código (SQL, PL/SQL, JavaScript) ficam entre três crases, como no
            Markdown. A referência completa de componentes e propriedades está na *APEXlang API Reference*.

            ## Exportando e importando
            **No App Builder**: em *Export*, escolha o formato **APEXlang**; em *Import*, envie o ZIP. Regras do import:
            - pelo menos um schema do workspace precisa estar **REST-enabled**;
            - importa sempre a **aplicação inteira** (uma página isolada só no formato SQL);
            - erros e avisos aparecem em uma página própria;
            - no 26.1, dados de runtime (relatórios salvos, instâncias de workflow e tarefas) não vão em exports APEXlang.

            **No SQLcl (26.1.2+)**:

            ~~~sql
            -- Exportar a app 105 em APEXlang (cria ./f105)
            apex export -applicationid 105 -exptype APEXLANG

            -- Validar: compila e aponta erros (funciona até sem conexão, com sql /nolog)
            apex validate -input ./f105

            -- Importar; valores de deployments/default.json podem ser sobrescritos
            apex import -input ./f105 -workspace VENDAS_TESTE -id 205 -schema VENDAS

            -- Gerar o esqueleto de uma aplicação nova
            apex generate -name "Portal do Cliente" -alias portal-cliente
            ~~~

            No PL/SQL, «APEX_EXPORT» também exporta em APEXlang — e o antigo tipo «READABLE_YAML» foi deprecado e passou a gerar
            APEXlang. Como o pacote inclui arquivos binários, leia «contents_blob» além de «contents».

            ## Static IDs para tudo
            Para que diffs entre instâncias não mostrem falsas diferenças, o 26.1 passou a usar **Static IDs** em todos os
            componentes. No upgrade (ou ao importar apps antigas) o APEX gera IDs únicos e legíveis a partir dos nomes. O campo vem
            travado por padrão (ícone de cadeado): trate-o como **identificador permanente**. Plug-ins ganharam o atributo
            **APEXlang Name** (nome em camelCase usado nos arquivos).

            ## APEXlang e IA
            - O **SQL Developer para VS Code** tem suporte nativo a APEXlang, com o SQLcl embutido para importar, exportar e validar.
            - A Oracle distribui *skills* para agentes de IA em github.com/oracle/skills, sincronizáveis com o comando
              «skills sync» do SQLcl.
            - O **APEXlang Atlas** é uma ferramenta interativa para aprender a linguagem.

            :::atencao Versões casadas
            O compilador APEXlang existe no **ORDS** e no **SQLcl**. O import exige ORDS 26.1.1+, e o arquivo
            «.apex/apexlang.json» registra a versão do metamodelo usada. Mantenha SQLcl, ORDS e o patch do APEX alinhados.
            :::

            :::novo Application Lock
            No 26.1 você pode **travar** uma aplicação: enquanto travada, ela só muda via APEXlang (ou merge de working copy).
            Combinado com Git e «apex validate», isso permite um fluxo em que os arquivos «.apx» são a única porta de entrada de
            mudanças.
            :::
        `
    },
    en: {
        titulo: 'APEXlang (26.1)',
        resumo: 'APEX 26.1\'s open application specification language: readable .apx files for Git and LLMs, syntax, export/import and the SQLcl commands.',
        tags: ['APEXlang', '.apx', 'APEX 26.1', 'SQLcl', 'apex export', 'apex import', 'apex validate', 'apex generate', 'Static ID', 'LLM', 'AI', 'VS Code', 'Application Lock'],
        conteudo: `
            **APEXlang** is the biggest lifecycle change in APEX 26.1: an *open application specification language* that
            represents an APEX app as **human-readable text files** («.apx»). These files can be reviewed, versioned, diffed,
            validated — and also read, edited and generated by **LLMs and AI agents**. Stored in Git, APEXlang files can serve as
            the application's **source of truth**.

            ## Why a new format?
            The traditional SQL export is a huge script of internal API calls with numeric IDs: great for installing, terrible
            for reading, reviewing in pull requests or editing by hand. APEXlang describes the same application declaratively,
            component by component, using readable **Static IDs** instead of internal IDs.

            ## Layout of an APEXlang export
            The export is a ZIP named after the application alias. Unzipped:

            ~~~texto
            my-app/
            ├── application.apx          application attributes
            ├── page_groups.apx
            ├── pages/
            │   ├── p00001.apx
            │   └── p00002.apx
            ├── shared_components/       lists.apx, lovs.apx...
            ├── supporting_objects/      SQL scripts
            ├── deployments/
            │   └── default.json         target workspace, ID, schema
            └── .apex/
                └── apexlang.json        metamodel version (selects the compiler)
            ~~~

            The application's CSS, JavaScript and image files are included in the package too.

            ## What the syntax looks like
            Each component has a type, an identifier and a block in parentheses; properties are «name: value»; property groups go
            inside braces; «@» references another component (such as templates). An excerpt of a page:

            ~~~texto
            page 1 (
                name: Home
                alias: HOME
                title: Home
                security {
                    pageAccessProtection: argumentsMustHaveChecksum
                }

                region app-name (
                    name: Home
                    type: staticContent
                    layout {
                        sequence: 10
                        slot: breadcrumbBar
                    }
                    appearance {
                        template: @/hero
                    }
                )
            )
            ~~~

            Comments use «//» or «/* */», and code blocks (SQL, PL/SQL, JavaScript) are fenced with three backticks, Markdown-style.
            The full component and property reference is the *APEXlang API Reference*.

            ## Exporting and importing
            **In App Builder**: under *Export*, pick the **APEXlang** format; under *Import*, upload the ZIP. Import rules:
            - at least one schema in the workspace must be **REST-enabled**;
            - it always imports the **whole application** (a single page only in SQL format);
            - errors and warnings are shown on a dedicated page;
            - in 26.1, runtime data (saved reports, workflow and task instances) is not included in APEXlang exports.

            **In SQLcl (26.1.2+)**:

            ~~~sql
            -- Export app 105 as APEXlang (creates ./f105)
            apex export -applicationid 105 -exptype APEXLANG

            -- Validate: compiles and reports errors (works even offline, with sql /nolog)
            apex validate -input ./f105

            -- Import; values from deployments/default.json can be overridden
            apex import -input ./f105 -workspace SALES_TEST -id 205 -schema SALES

            -- Generate the skeleton of a new application
            apex generate -name "Customer Portal" -alias customer-portal
            ~~~

            In PL/SQL, «APEX_EXPORT» also exports APEXlang — and the old «READABLE_YAML» type was deprecated and now produces
            APEXlang. Since the package includes binary files, read «contents_blob» as well as «contents».

            ## Static IDs everywhere
            To keep diffs between instances free of false differences, 26.1 uses **Static IDs** for every component. On upgrade
            (or when importing older apps) APEX generates unique, readable IDs from component names. The field is locked by default
            (padlock icon): treat it as a **permanent identifier**. Plug-ins gained an **APEXlang Name** attribute (the camelCase
            name used in the files).

            ## APEXlang and AI
            - **SQL Developer for VS Code** supports APEXlang natively, with embedded SQLcl to import, export and validate.
            - Oracle publishes *skills* for AI agents at github.com/oracle/skills, which can be synced with SQLcl's «skills sync»
              command.
            - **APEXlang Atlas** is an interactive tool for learning the language.

            :::atencao Matching versions
            The APEXlang compiler lives in **ORDS** and in **SQLcl**. Import requires ORDS 26.1.1+, and «.apex/apexlang.json»
            records the metamodel version used. Keep SQLcl, ORDS and the APEX patch level aligned.
            :::

            :::novo Application Lock
            In 26.1 you can **lock** an application: while locked, it only changes through APEXlang (or a working copy merge).
            Combined with Git and «apex validate», this enables a flow where «.apx» files are the only way changes get in.
            :::
        `
    }
});

DOC.topico({
    id: 'controle-de-versao',
    cat: 'devops',
    nivel: 'intermediario',
    links: [
        { t: 'Administration Guide — Exporting and Importing Using SQLcl', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeadm/exporting-and-importing-using-sqlcl.html' },
        { t: 'App Builder Guide — Directory Structure When Splitting Export Files', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/directory-structure-when-splitting-export-files.html' },
        { t: 'APEX_EXPORT.GET_APPLICATION', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/GET_APPLICATION_Function.html' }
    ],
    relacionados: ['apexlang', 'sqlcl-projects-e-cicd', 'working-copies', 'exportar-importar', 'organizacao-do-codigo'],
    pt: {
        titulo: 'Controle de versão com Git',
        resumo: 'Como versionar aplicações APEX no Git: export split, readable YAML, APEXlang, opções que deixam os diffs limpos, export parcial e fluxo de trabalho.',
        tags: ['Git', 'controle de versão', 'versionamento', 'split', 'readable export', 'YAML', 'APEXlang', 'diff', 'pull request', 'skipExportDate', 'expOriginalIds'],
        conteudo: `
            No APEX a aplicação vive como metadados no banco, então "colocar a app no Git" significa **exportá-la para arquivos**
            e versioná-los com disciplina. O formato escolhido faz toda a diferença na qualidade dos diffs.

            ## Os formatos ao longo do tempo
            | Formato | Desde | Importável? | Para Git |
            |---|---|---|---|
            | SQL em arquivo único («f100.sql») | Sempre | Sim | Fraco: qualquer mudança altera o arquivo inteiro |
            | SQL split (um arquivo por componente) | Há muitas versões | Sim | Bom: diffs por página e componente |
            | Readable export (YAML) | 22.1 (JSON também; removido no 24.1) | Não | Bom para revisão; deprecado no 26.1 |
            | APEXlang («.apx») | 26.1 | Sim | O melhor: legível, editável e importável |

            ## Exports que geram diffs limpos
            ~~~sql
            -- exportar.sql (rodar com: sql /nolog @exportar.sql)
            conn -name vendas-dev
            apex export -applicationid 100 -split -skipExportDate -expOriginalIds -expSupportingObjects Y
            exit
            ~~~

            - «-split»: um arquivo por componente — o *git status* mostra exatamente quais páginas e LOVs mudaram.
            - «-skipExportDate»: tira a data do export, para os arquivos não mudarem à toa.
            - «-expOriginalIds»: mantém os IDs da última importação, estáveis entre ambientes.
            - Evite exportar dados de runtime (relatórios salvos, notificações); no 26.1 o tipo **Standard** é o recomendado
              para controle de versão.

            No 26.1, prefira APEXlang:

            ~~~sql
            apex export -applicationid 100 -exptype APEXLANG
            ~~~

            ## O que um diff mostra
            Com export split, alterar a página 3, criar a página 11 e mudar uma LOV gera algo assim:

            ~~~bash
            $ git status
                    new file:   application/pages/page_00011.sql
                    modified:   application/pages/page_00003.sql
                    modified:   application/shared_components/user_interface/lovs/tags_lov.sql
                    modified:   application/create_application.sql
                    modified:   install.sql
            ~~~

            ## Export parcial
            Para levar só o que mudou desde uma data:

            ~~~sql
            apex list -applicationid 113 -changesSince 2026-09-01
            apex export -applicationid 113 -split -expComponents "PAGE:3 PAGE:11"
            ~~~

            O resultado tem um «install_component.sql» que instala apenas esses componentes.

            ## Fluxo de trabalho recomendado
            1. **Repositório único** com a aplicação, os objetos de banco (DDL de tabelas, pacotes, views) e os arquivos
               estáticos — a app sem o banco não serve para nada.
            2. **Export frequente e automatizado** (no fim de cada tarefa ou por um job agendado), sempre com as mesmas opções.
            3. **Pull requests** revisando os diffs por componente.
            4. **Restaurar a partir do Git** é rodar «@f100/install.sql» (ou «apex import» para APEXlang) em um banco limpo —
               teste isso periodicamente.
            5. Para pipelines completos, use [SQLcl Projects](#/topico/sqlcl-projects-e-cicd), que padroniza export, changelogs e
               deploy.

            ## E os branches?
            O desafio do APEX é que, em geral, todos desenvolvem no **mesmo banco de dev**. Para trabalhar em paralelo:
            - [Working Copies](#/topico/working-copies) dentro da mesma instância;
            - ou um banco por desenvolvedor (por exemplo, Oracle AI Database Free em container), importando a app a partir do Git.

            :::atencao Merge de arquivos SQL não é confiável
            Dois desenvolvedores alterando a mesma página em branches diferentes geram conflitos difíceis de resolver nos
            arquivos SQL (IDs, «install.sql», «create_application.sql»). Evite edição paralela do mesmo componente. Com APEXlang o
            merge textual fica viável, mas rode sempre «apex validate» depois de resolver conflitos.
            :::

            :::dica Detectando divergências
            O «APEX_EXPORT» e o SQLcl oferecem tipos de export de **checksum** (SHA-1/SHA-256), independentes de IDs. Compare o
            checksum da app em produção com o da versão no Git para saber se alguém alterou algo diretamente no ambiente.
            :::
        `
    },
    en: {
        titulo: 'Version control with Git',
        resumo: 'How to version APEX apps in Git: split export, readable YAML, APEXlang, options for clean diffs, partial export and a working process.',
        tags: ['Git', 'version control', 'versioning', 'split', 'readable export', 'YAML', 'APEXlang', 'diff', 'pull request', 'skipExportDate', 'expOriginalIds'],
        conteudo: `
            In APEX the application lives as metadata in the database, so "putting the app in Git" means **exporting it to files**
            and versioning them with discipline. The format you pick makes all the difference in diff quality.

            ## Formats over time
            | Format | Since | Importable? | For Git |
            |---|---|---|---|
            | Single SQL file («f100.sql») | Always | Yes | Poor: any change touches the whole file |
            | Split SQL (one file per component) | Many releases | Yes | Good: per-page and per-component diffs |
            | Readable export (YAML) | 22.1 (JSON too; removed in 24.1) | No | Good for review; deprecated in 26.1 |
            | APEXlang («.apx») | 26.1 | Yes | Best: readable, editable and importable |

            ## Exports that produce clean diffs
            ~~~sql
            -- export.sql (run with: sql /nolog @export.sql)
            conn -name sales-dev
            apex export -applicationid 100 -split -skipExportDate -expOriginalIds -expSupportingObjects Y
            exit
            ~~~

            - «-split»: one file per component — *git status* shows exactly which pages and LOVs changed.
            - «-skipExportDate»: drops the export date so files do not change for nothing.
            - «-expOriginalIds»: keeps the IDs from the last import, stable across environments.
            - Avoid exporting runtime data (saved reports, notifications); in 26.1 the **Standard** type is the one recommended
              for source control.

            In 26.1, prefer APEXlang:

            ~~~sql
            apex export -applicationid 100 -exptype APEXLANG
            ~~~

            ## What a diff shows
            With a split export, changing page 3, creating page 11 and editing an LOV yields something like:

            ~~~bash
            $ git status
                    new file:   application/pages/page_00011.sql
                    modified:   application/pages/page_00003.sql
                    modified:   application/shared_components/user_interface/lovs/tags_lov.sql
                    modified:   application/create_application.sql
                    modified:   install.sql
            ~~~

            ## Partial export
            To ship only what changed since a given date:

            ~~~sql
            apex list -applicationid 113 -changesSince 2026-09-01
            apex export -applicationid 113 -split -expComponents "PAGE:3 PAGE:11"
            ~~~

            The output includes an «install_component.sql» that installs just those components.

            ## Recommended workflow
            1. **A single repository** with the application, the database objects (table DDL, packages, views) and the static
               files — the app is useless without its database.
            2. **Frequent, automated exports** (at the end of each task or from a scheduled job), always with the same options.
            3. **Pull requests** reviewing the per-component diffs.
            4. **Restoring from Git** means running «@f100/install.sql» (or «apex import» for APEXlang) on a clean database — test
               that regularly.
            5. For full pipelines, use [SQLcl Projects](#/topico/sqlcl-projects-e-cicd), which standardizes export, changelogs
               and deployment.

            ## What about branches?
            The APEX challenge is that everyone usually develops on the **same dev database**. To work in parallel:
            - [Working Copies](#/topico/working-copies) inside the same instance;
            - or one database per developer (e.g. Oracle AI Database Free in a container), importing the app from Git.

            :::atencao Merging SQL files is not reliable
            Two developers changing the same page on different branches create conflicts that are hard to resolve in SQL files
            (IDs, «install.sql», «create_application.sql»). Avoid parallel edits to the same component. With APEXlang a textual
            merge becomes feasible, but always run «apex validate» after resolving conflicts.
            :::

            :::dica Detecting drift
            «APEX_EXPORT» and SQLcl offer **checksum** export types (SHA-1/SHA-256) that are independent of IDs. Compare the
            checksum of the production app with the one of the version in Git to find out whether someone changed something
            directly in that environment.
            :::
        `
    }
});

DOC.topico({
    id: 'supporting-objects',
    cat: 'devops',
    nivel: 'intermediario',
    desde: '2.2',
    links: [
        { t: 'App Builder Guide — How to Create a Custom Application (Supporting Objects)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/how-to-create-a-custom-packaged-application.html' },
        { t: 'APEX_APPLICATION_INSTALL (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_APPLICATION_INSTALL.html' }
    ],
    relacionados: ['exportar-importar', 'ambientes-dev-test-prod', 'sqlcl-projects-e-cicd', 'apexlang', 'working-copies'],
    pt: {
        titulo: 'Supporting Objects',
        resumo: 'Empacote tabelas, dados e scripts junto com a aplicação: scripts de instalação, upgrade e desinstalação, pré-requisitos, validações e instalação automática.',
        tags: ['supporting objects', 'objetos de suporte', 'install script', 'upgrade script', 'deinstall', 'packaged app', 'set_auto_install_sup_obj', 'expSupportingObjects', 'pré-requisitos'],
        conteudo: `
            **Supporting Objects** permitem empacotar, **dentro do export da aplicação**, tudo o que ela precisa no banco: tabelas,
            sequences, pacotes, dados iniciais, arquivos estáticos. Quem importa a app pode instalar esses objetos no mesmo
            assistente — e a aplicação sai funcionando. O recurso existe desde o APEX 2.2 e é a base das aplicações de exemplo e
            das antigas *packaged apps*.

            ## As partes
            Em *Shared Components → Supporting Objects*:

            | Parte | Para quê |
            |---|---|
            | Installation Scripts | Criam os objetos e os dados iniciais (vários scripts, em sequência) |
            | Upgrade Scripts | Atualizam objetos e dados quando a app já está instalada |
            | Deinstallation Script | Remove os objetos criados pela instalação |
            | Prerequisites | Espaço livre, privilégios de sistema exigidos, objetos que não podem existir |
            | Application Substitution Strings | Valores perguntados durante a instalação |
            | Build Options | Opções que o instalador pode ligar ou desligar |
            | Validations | Regras próprias que bloqueiam a instalação se falharem |
            | Messages | Textos exibidos ao instalar, atualizar ou desinstalar |

            ## Instalar ou atualizar?
            Em *Query to Detect Existing Supporting Objects* você informa uma consulta que retorna **pelo menos uma linha se os
            objetos já existem**. Se retornar, o APEX roda os *Upgrade Scripts*; senão, os *Installation Scripts*:

            ~~~sql
            select 1
              from user_tables
             where table_name = 'VND_PEDIDOS'
            ~~~

            ## Exemplos de scripts
            ~~~sql Installation Script
            create table vnd_clientes (
                id         number generated by default on null as identity primary key,
                nome       varchar2(200) not null,
                criado_em  date default sysdate not null
            );

            insert into vnd_clientes (nome) values ('Cliente de exemplo');
            commit;
            ~~~

            Scripts de upgrade devem ser **idempotentes** — rodar duas vezes não pode quebrar nada:

            ~~~plsql
            declare
                l_existe number;
            begin
                select count(*) into l_existe
                  from user_tab_columns
                 where table_name = 'VND_CLIENTES'
                   and column_name = 'EMAIL';

                if l_existe = 0 then
                    execute immediate 'alter table vnd_clientes add email varchar2(320)';
                end if;
            end;
            /
            ~~~

            ~~~sql Deinstallation Script
            drop table vnd_clientes cascade constraints purge;
            ~~~

            Crie cada script em *Installation Scripts → Create* e siga o assistente — escrevendo o SQL no editor ou enviando um
            arquivo. Dica: o DDL de objetos que já existem pode ser obtido no Object Browser do SQL Workshop ou com
            «DBMS_METADATA.GET_DDL». Os scripts rodam no **parsing schema** da aplicação.

            ## Exportando e instalando
            - Ative *Include in Export* em Supporting Objects, ou escolha no export: **Yes**, **No** ou
              **Yes and Install on Import Automatically**.
            - SQLcl: «apex export -applicationid 100 -expSupportingObjects Y» (use «I» para instalar automaticamente no import).
            - API: «APEX_EXPORT.GET_APPLICATION» com «p_with_supporting_objects» = «'Y'», «'I'» ou «'N'».
            - No import pelo App Builder, o assistente pergunta se deve instalar agora; dá para instalar depois pela página de
              Supporting Objects.
            - Em scripts de deploy, force a instalação antes de rodar o export:

            ~~~plsql
            begin
                apex_application_install.set_workspace('VENDAS');
                apex_application_install.set_auto_install_sup_obj(p_auto_install_sup_obj => true);
            end;
            /
            @f100.sql
            ~~~

            Para desinstalar, use *Deinstall Supporting Objects* ou a opção de excluir a aplicação, que roda o script de
            desinstalação. Em exports APEXlang, os scripts ficam na pasta «supporting_objects/».

            :::atencao Defina os pré-requisitos
            Se a instalação cria jobs, views materializadas ou usa pacotes do sistema, declare os **privilégios de sistema**
            necessários em *Prerequisites*. Assim o instalador falha cedo, com mensagem clara, em vez de deixar metade dos objetos
            criados.
            :::

            :::dica Quando usar (e quando não)
            Supporting Objects brilham em apps de demonstração, apps distribuídas para outros times ou clientes e projetos
            pequenos. Em projetos grandes, com muitas releases, scripts de upgrade acumulados ficam difíceis de manter — prefira
            Liquibase com [SQLcl Projects](#/topico/sqlcl-projects-e-cicd). Lembre também que Working Copies **não** mergeiam
            Supporting Objects.
            :::
        `
    },
    en: {
        titulo: 'Supporting Objects',
        resumo: 'Package tables, data and scripts with the application: install, upgrade and deinstall scripts, prerequisites, validations and automatic installation.',
        tags: ['supporting objects', 'install script', 'upgrade script', 'deinstall', 'packaged app', 'set_auto_install_sup_obj', 'expSupportingObjects', 'prerequisites'],
        conteudo: `
            **Supporting Objects** let you package, **inside the application export**, everything the app needs in the database:
            tables, sequences, packages, seed data, static files. Whoever imports the app can install those objects in the same
            wizard — and the application just works. The feature has existed since APEX 2.2 and powers the sample apps and the
            old *packaged apps*.

            ## The parts
            Under *Shared Components → Supporting Objects*:

            | Part | Purpose |
            |---|---|
            | Installation Scripts | Create objects and seed data (several scripts, in sequence) |
            | Upgrade Scripts | Update objects and data when the app is already installed |
            | Deinstallation Script | Removes the objects created by the installation |
            | Prerequisites | Free space, required system privileges, objects that must not exist |
            | Application Substitution Strings | Values prompted for during installation |
            | Build Options | Options the installer can switch on or off |
            | Validations | Custom rules that block installation when they fail |
            | Messages | Texts shown when installing, upgrading or deinstalling |

            ## Install or upgrade?
            In *Query to Detect Existing Supporting Objects* you enter a query that returns **at least one row if the objects
            already exist**. If it does, APEX runs the *Upgrade Scripts*; otherwise, the *Installation Scripts*:

            ~~~sql
            select 1
              from user_tables
             where table_name = 'SLS_ORDERS'
            ~~~

            ## Script examples
            ~~~sql Installation Script
            create table sls_customers (
                id          number generated by default on null as identity primary key,
                name        varchar2(200) not null,
                created_on  date default sysdate not null
            );

            insert into sls_customers (name) values ('Sample customer');
            commit;
            ~~~

            Upgrade scripts must be **idempotent** — running them twice must not break anything:

            ~~~plsql
            declare
                l_exists number;
            begin
                select count(*) into l_exists
                  from user_tab_columns
                 where table_name = 'SLS_CUSTOMERS'
                   and column_name = 'EMAIL';

                if l_exists = 0 then
                    execute immediate 'alter table sls_customers add email varchar2(320)';
                end if;
            end;
            /
            ~~~

            ~~~sql Deinstallation Script
            drop table sls_customers cascade constraints purge;
            ~~~

            Create each script under *Installation Scripts → Create* and follow the wizard — typing SQL in the editor or uploading
            a file. Tip: you can get the DDL of existing objects from SQL Workshop's Object Browser or with
            «DBMS_METADATA.GET_DDL». Scripts run in the application's **parsing schema**.

            ## Exporting and installing
            - Turn on *Include in Export* in Supporting Objects, or choose at export time: **Yes**, **No** or
              **Yes and Install on Import Automatically**.
            - SQLcl: «apex export -applicationid 100 -expSupportingObjects Y» (use «I» to install automatically on import).
            - API: «APEX_EXPORT.GET_APPLICATION» with «p_with_supporting_objects» = «'Y'», «'I'» or «'N'».
            - When importing through App Builder, the wizard asks whether to install now; you can also install later from the
              Supporting Objects page.
            - In deployment scripts, force installation before running the export:

            ~~~plsql
            begin
                apex_application_install.set_workspace('SALES');
                apex_application_install.set_auto_install_sup_obj(p_auto_install_sup_obj => true);
            end;
            /
            @f100.sql
            ~~~

            To deinstall, use *Deinstall Supporting Objects* or the delete-application option, which runs the deinstallation
            script. In APEXlang exports, the scripts live in the «supporting_objects/» folder.

            :::atencao Declare the prerequisites
            If installation creates jobs, materialized views or uses system packages, declare the required **system privileges**
            under *Prerequisites*. The installer then fails early with a clear message instead of leaving half the objects
            created.
            :::

            :::dica When to use them (and when not to)
            Supporting Objects shine for demo apps, apps distributed to other teams or customers, and small projects. In large
            projects with many releases, accumulated upgrade scripts become hard to maintain — prefer Liquibase with
            [SQLcl Projects](#/topico/sqlcl-projects-e-cicd). Also remember that Working Copies do **not** merge Supporting
            Objects.
            :::
        `
    }
});
