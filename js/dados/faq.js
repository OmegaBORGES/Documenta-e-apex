DOC.pergunta({
    id: 'apex-e-gratuito',
    tema: 'geral',
    destaque: true,
    ver: ['o-que-e-apex', 'onde-rodar-apex'],
    pt: {
        q: 'O Oracle APEX é gratuito? Preciso pagar licença?',
        tags: ['gratuito', 'licença', 'custo', 'preço', 'free', 'Always Free', 'Oracle Database Free', 'XE', 'ORDS'],
        r: `
            O APEX é um recurso **sem custo** de todas as edições do Oracle Database (Enterprise Edition, Standard Edition 2 e Free).
            Não há cobrança por desenvolvedor, por aplicação nem por usuário final, e o **ORDS** (o servidor web que publica o APEX)
            também é gratuito.

            O que você paga é o **banco de dados** em que o APEX roda:
            - **On-premises**: a licença do Oracle Database que você já tem. O APEX vem junto.
            - **Nuvem**: Autonomous Database ou APEX Application Development Service (APEX Service), cobrados por ECPU e armazenamento.

            Opções que não custam nada:
            - **Oracle Database Free** (23ai/26ai Free), na sua máquina ou em container.
            - **OCI Always Free Autonomous Database**, com o APEX já instalado (até 2 instâncias de 20 GB; a instância para após 7 dias sem uso).
            - O workspace de avaliação em **oracleapex.com**, só para estudo e testes.

            :::atencao
            As opções gratuitas têm limites de CPU, memória, armazenamento e sessões simultâneas. Para produção com carga real,
            use um banco licenciado ou um serviço pago dimensionado para o seu uso.
            :::
        `
    },
    en: {
        q: 'Is Oracle APEX free? Do I need a license?',
        tags: ['free', 'license', 'cost', 'pricing', 'Always Free', 'Oracle Database Free', 'XE', 'ORDS'],
        r: `
            APEX is a **no-cost** feature of every Oracle Database edition (Enterprise Edition, Standard Edition 2 and Free).
            There are no fees per developer, per application or per end user, and **ORDS** (the web listener that serves APEX)
            is free as well.

            What you pay for is the **database** APEX runs on:
            - **On-premises**: the Oracle Database license you already have. APEX is included.
            - **Cloud**: Autonomous Database or the APEX Application Development Service (APEX Service), billed by ECPU and storage.

            Options that cost nothing:
            - **Oracle Database Free** (23ai/26ai Free), on your machine or in a container.
            - **OCI Always Free Autonomous Database**, with APEX preinstalled (up to 2 instances of 20 GB; an instance is stopped after 7 days without use).
            - The evaluation workspace at **oracleapex.com**, for learning and testing only.

            :::atencao
            The free options have limits on CPU, memory, storage and concurrent sessions. For production workloads, use a
            licensed database or a paid service sized for your usage.
            :::
        `
    }
});

DOC.pergunta({
    id: 'apex-oracle-com-producao',
    tema: 'geral',
    ver: ['onde-rodar-apex', 'workspaces-e-aplicacoes'],
    pt: {
        q: 'Posso usar o apex.oracle.com (oracleapex.com) para produção?',
        tags: ['apex.oracle.com', 'oracleapex.com', 'produção', 'workspace gratuito', 'avaliação', 'hospedagem'],
        r: `
            **Não.** O serviço gratuito de avaliação serve para aprender, testar recursos e fazer demonstrações. Em **17 de agosto de 2025**
            ele mudou para **oracleapex.com**: os workspaces existentes continuaram funcionando no novo domínio e o endereço antigo
            redireciona para lá.

            Regras importantes do serviço:
            - Não é permitido guardar dados de produção nem dados sensíveis.
            - Não há garantia de disponibilidade, desempenho ou backup.
            - Workspaces sem uso podem ser removidos.

            Para produção, as alternativas são:
            - **OCI Always Free Autonomous Database** (APEX pré-instalado), para apps pequenos.
            - **APEX Service** ou **Autonomous Database** pagos.
            - Um banco **on-premises** (ou em VM na nuvem) com ORDS.
            - Um provedor de hospedagem APEX de terceiros.

            :::atencao Social Sign-In
            Se o seu app de testes usa Social Sign-In, cadastre a nova URL de retorno (com oracleapex.com) no provedor de identidade.
            E-mails enviados pelo serviço agora saem de um remetente do domínio oracleapex.com.
            :::
        `
    },
    en: {
        q: 'Can I run production apps on apex.oracle.com / oracleapex.com?',
        tags: ['apex.oracle.com', 'oracleapex.com', 'production', 'free workspace', 'evaluation', 'hosting'],
        r: `
            **No.** The free evaluation service is for learning, trying features and running demos. On **17 August 2025** it moved
            to **oracleapex.com**: existing workspaces kept working on the new domain and the old address redirects there.

            Key rules of the service:
            - Production data and sensitive data are not allowed.
            - There is no guarantee of availability, performance or backups.
            - Unused workspaces may be removed.

            For production, choose one of these:
            - **OCI Always Free Autonomous Database** (APEX preinstalled), for small apps.
            - The paid **APEX Service** or **Autonomous Database**.
            - An **on-premises** database (or a cloud VM) with ORDS.
            - A third-party APEX hosting provider.

            :::atencao Social Sign-In
            If your test app uses Social Sign-In, register the new redirect URL (on oracleapex.com) with your identity provider.
            E-mails sent by the service now come from an oracleapex.com sender address.
            :::
        `
    }
});

DOC.pergunta({
    id: 'por-que-nao-existe-apex-25',
    tema: 'geral',
    ver: ['upgrade-e-patches', 'instalacao-apex'],
    pt: {
        q: 'Por que não existe APEX 25? Qual é a versão mais recente?',
        tags: ['versão', 'APEX 25', 'APEX 26.1', '24.2', 'numeração', 'release', 'lançamento', '26ai'],
        r: `
            A Oracle foi da **24.2** (GA em janeiro de 2025) direto para a **26.1** (GA em **14/05/2026**), alinhando a numeração
            do APEX com o **Oracle AI Database 26ai**. Não houve versão do APEX em 2025, então não procure por "25.1".

            A numeração segue o padrão **AA.N** (ano + número da versão no ano). Os patch set bundles acrescentam um terceiro
            número: em 30/09/2026 o patch mais recente da 26.1 era o **26.1.5**.

            Requisitos da 26.1:
            - Oracle Database **19c com RU 19.18 ou superior**, ou Oracle AI Database **26ai 23.26 ou superior** (todas as edições).
            - **ORDS 26.1.1** ou superior.

            Destaques da 26.1: APEXlang (apps em arquivos de texto .apx), AI Agents com Tools, Interactive Report em linguagem
            natural, Row Selector no IR, Trigger Actions, estilo **Iris** do Universal Theme e Application Lock.

            :::dica
            Para saber qual versão está instalada, rode «select version_no, patch_applied from apex_release». No Autonomous Database
            e no APEX Service, a Oracle aplica upgrades e patches automaticamente.
            :::
        `
    },
    en: {
        q: 'Why is there no APEX 25? What is the latest release?',
        tags: ['version', 'APEX 25', 'APEX 26.1', '24.2', 'numbering', 'release', '26ai'],
        r: `
            Oracle went from **24.2** (GA in January 2025) straight to **26.1** (GA on **14 May 2026**), aligning APEX numbering
            with **Oracle AI Database 26ai**. There was no APEX release in 2025, so do not look for "25.1".

            Releases follow a **YY.N** pattern (year + release number within the year). Patch set bundles add a third number:
            on 30 September 2026 the latest 26.1 patch was **26.1.5**.

            26.1 requirements:
            - Oracle Database **19c with RU 19.18 or later**, or Oracle AI Database **26ai 23.26 or later** (all editions).
            - **ORDS 26.1.1** or later.

            26.1 highlights: APEXlang (apps as .apx text files), AI Agents with Tools, natural-language Interactive Reports,
            the IR Row Selector, Trigger Actions, the Universal Theme **Iris** style and Application Lock.

            :::dica
            To see which version is installed, run «select version_no, patch_applied from apex_release». On Autonomous Database
            and APEX Service, Oracle applies upgrades and patches for you.
            :::
        `
    }
});

DOC.pergunta({
    id: 'migrar-oracle-forms',
    tema: 'geral',
    ver: ['migrando-do-oracle-forms', 'mestre-detalhe', 'organizacao-do-codigo'],
    pt: {
        q: 'Dá para migrar Oracle Forms para APEX automaticamente?',
        tags: ['Oracle Forms', 'migração', 'modernização', 'fmb', 'frmf2xml', 'conversão', 'legado'],
        r: `
            Não existe conversor automático "de um clique". O antigo recurso **Migration Projects** do App Builder foi
            descontinuado (*desupported*) no APEX 21.1. Na prática, a migração é uma **reconstrução guiada**:

            1. **Inventário**: converta os arquivos .fmb para XML com o utilitário «frmf2xml» do Forms e liste blocos, triggers,
               LOVs, program units e relatórios.
            2. **Lógica no banco**: leve as regras de negócio para pacotes PL/SQL. O que já está em procedures e triggers do banco
               é reaproveitado sem mudança.
            3. **Interface**: reconstrua com componentes do APEX.
              - Bloco de registro único: região Form.
              - Bloco tabular: Interactive Grid.
              - Mestre-detalhe: página Master Detail.
              - Triggers WHEN-VALIDATE-ITEM, POST-QUERY etc.: validações, Dynamic Actions e computações.

            Aproveite para repensar a navegação e a usabilidade em vez de copiar cada tela. Existem ferramentas de terceiros que
            analisam e geram parte do código. No **26.1**, a criação de páginas por linguagem natural, os Blueprints e o
            APEXlang aceleram a reescrita, mas não traduzem triggers do Forms um a um.

            :::dica
            Comece pelos módulos mais simples e de maior uso. Ganhar experiência nos primeiros reduz muito o custo dos demais.
            :::
        `
    },
    en: {
        q: 'Can I automatically migrate Oracle Forms to APEX?',
        tags: ['Oracle Forms', 'migration', 'modernization', 'fmb', 'frmf2xml', 'conversion', 'legacy'],
        r: `
            There is no one-click converter. The old **Migration Projects** feature of App Builder was desupported in APEX 21.1.
            In practice a migration is a **guided rebuild**:

            1. **Inventory**: convert the .fmb files to XML with the Forms «frmf2xml» utility and list blocks, triggers, LOVs,
               program units and reports.
            2. **Logic in the database**: move business rules into PL/SQL packages. Whatever already lives in database procedures
               and triggers is reused as is.
            3. **User interface**: rebuild it with APEX components.
              - Single-record block: Form region.
              - Tabular block: Interactive Grid.
              - Master-detail: Master Detail page.
              - WHEN-VALIDATE-ITEM, POST-QUERY and similar triggers: validations, Dynamic Actions and computations.

            Take the chance to rethink navigation and usability instead of copying every screen. Third-party tools can analyze
            the forms and generate part of the code. In **26.1**, natural-language page creation, Blueprints and APEXlang speed
            up the rewrite, but they do not translate Forms triggers one to one.

            :::dica
            Start with the simplest, most used modules. The experience you gain there lowers the cost of the rest.
            :::
        `
    }
});

DOC.pergunta({
    id: 'versao-apex-ords-instalada',
    tema: 'instalacao',
    ver: ['instalacao-apex', 'ords', 'upgrade-e-patches'],
    pt: {
        q: 'Como descubro a versão do APEX e do ORDS instalados?',
        tags: ['versão', 'apex_release', 'apex_patches', 'ords.installed_version', 'patch', 'requisitos', 'About'],
        r: `
            Pelo SQL, conectado a qualquer schema do banco:

            ~~~sql
            -- versão do APEX e patch aplicado
            select version_no, patch_applied from apex_release;

            -- patch set bundles aplicados
            select * from apex_patches;

            -- versão do ORDS registrada no banco
            select ords.installed_version from dual;
            ~~~

            Outras formas:
            - No App Builder: menu de ajuda (ícone **?**) > **About**.
            - Em JavaScript, numa página do app: «apex.env.APEX_VERSION».
            - No servidor do ORDS: «ords --version».
            - A versão dos arquivos estáticos aparece em «/i/apex_version.txt» e precisa bater com a do banco.

            Requisitos do **APEX 26.1**: Oracle Database 19c com **RU 19.18+** ou Oracle AI Database 26ai **23.26+**, e **ORDS 26.1.1+**.
            Alguns recursos dependem do 26ai, como itens com Session State Data Type **BOOLEAN**.

            :::atencao
            O ORDS deve estar na versão exigida pelo APEX (ou mais nova). Depois de um upgrade do APEX, atualize o ORDS e as
            imagens antes de liberar o acesso aos usuários.
            :::
        `
    },
    en: {
        q: 'How do I check which APEX and ORDS versions are installed?',
        tags: ['version', 'apex_release', 'apex_patches', 'ords.installed_version', 'patch', 'requirements', 'About'],
        r: `
            From SQL, connected to any schema:

            ~~~sql
            -- APEX version and applied patch
            select version_no, patch_applied from apex_release;

            -- applied patch set bundles
            select * from apex_patches;

            -- ORDS version recorded in the database
            select ords.installed_version from dual;
            ~~~

            Other ways:
            - In App Builder: the help menu (the **?** icon) > **About**.
            - In JavaScript, on an app page: «apex.env.APEX_VERSION».
            - On the ORDS server: «ords --version».
            - The static files version is in «/i/apex_version.txt» and must match the database version.

            **APEX 26.1** requires Oracle Database 19c with **RU 19.18+** or Oracle AI Database 26ai **23.26+**, plus **ORDS 26.1.1+**.
            Some features need 26ai, such as items with the **BOOLEAN** Session State Data Type.

            :::atencao
            ORDS must be at the version APEX requires (or newer). After an APEX upgrade, update ORDS and the images before
            letting users back in.
            :::
        `
    }
});

DOC.pergunta({
    id: 'instalar-apex-local-docker',
    tema: 'instalacao',
    ver: ['instalacao-apex', 'ords', 'onde-rodar-apex'],
    pt: {
        q: 'Como instalo o APEX localmente (Docker / Oracle Database Free)?',
        tags: ['instalar', 'Docker', 'Podman', 'container', 'Oracle Database Free', 'ords-developer', 'apexins.sql', 'local', 'FREEPDB1'],
        r: `
            O caminho mais rápido são **dois containers** do Oracle Container Registry (container-registry.oracle.com):
            1. **database/free**: o Oracle Database Free, com a PDB **FREEPDB1**.
            2. **database/ords-developer**: o ORDS. Na primeira inicialização, ele lê um arquivo «conn_string.txt» (montado em
               «/opt/oracle/variables», com a linha «CONN_STRING=sys/senha@host:1521/FREEPDB1») e instala APEX e ORDS sozinho.
               O acesso fica em http://localhost:8181/ords.

            Instalação manual (banco já existente), como SYS na PDB:
            ~~~bash
            # na pasta onde o zip do APEX foi extraído
            sql sys@//localhost:1521/FREEPDB1 as sysdba
            @apexins.sql SYSAUX SYSAUX TEMP /i/
            @apxchpwd.sql
            # depois (apxchpwd.sql define a senha do ADMIN), no servidor do ORDS
            ords install
            ords serve --apex-images /caminho/apex/images
            ~~~

            Também é preciso desbloquear APEX_PUBLIC_USER e liberar a ACL de rede se o app for chamar APIs ou enviar e-mail.

            :::dica
            Em instalações novas, a Oracle recomenda instalar o ORDS antes do APEX. O APEX 26.1 exige **ORDS 26.1.1** ou superior.
            :::
        `
    },
    en: {
        q: 'How do I install APEX locally (Docker / Oracle Database Free)?',
        tags: ['install', 'Docker', 'Podman', 'container', 'Oracle Database Free', 'ords-developer', 'apexins.sql', 'local', 'FREEPDB1'],
        r: `
            The fastest route is **two containers** from the Oracle Container Registry (container-registry.oracle.com):
            1. **database/free**: Oracle Database Free, with the **FREEPDB1** PDB.
            2. **database/ords-developer**: ORDS. On first start it reads a «conn_string.txt» file (mounted at
               «/opt/oracle/variables», containing «CONN_STRING=sys/password@host:1521/FREEPDB1») and installs APEX and ORDS
               for you. It is then available at http://localhost:8181/ords.

            Manual install (existing database), as SYS in the PDB:
            ~~~bash
            # in the folder where the APEX zip was extracted
            sql sys@//localhost:1521/FREEPDB1 as sysdba
            @apexins.sql SYSAUX SYSAUX TEMP /i/
            @apxchpwd.sql
            # then (apxchpwd.sql sets the ADMIN password), on the ORDS server
            ords install
            ords serve --apex-images /path/to/apex/images
            ~~~

            You also need to unlock APEX_PUBLIC_USER and grant a network ACL if the app will call APIs or send e-mail.

            :::dica
            For new installations Oracle recommends installing ORDS before APEX. APEX 26.1 requires **ORDS 26.1.1** or later.
            :::
        `
    }
});

DOC.pergunta({
    id: 'imagens-404-pasta-i',
    tema: 'instalacao',
    ver: ['arquivos-estaticos-e-cdn', 'ords', 'upgrade-e-patches'],
    pt: {
        q: 'Por que as imagens, CSS e JS do APEX dão 404 em /i/ ("There are issues with the configuration of the Static Files")?',
        tags: ['404 Not Found /i/', '/i/', 'imagens', 'static files', 'There are issues with the configuration of the Static Files in your environment', 'There is a problem with your environment', 'CDN', 'apex_version.txt', 'standalone.static.path'],
        r: `
            O ORDS não está servindo a pasta **images** do APEX, ou está servindo a pasta de **outra versão** (muito comum logo
            depois de um upgrade). A página aparece sem estilo e o APEX avisa que há problema com os arquivos estáticos.

            Como resolver:
            - **ORDS standalone**: aponte para a pasta images da versão instalada e reinicie o ORDS.
            ~~~bash
            ords config set standalone.static.path /opt/apex/images
            # ou, ao iniciar:
            ords serve --apex-images /opt/apex/images
            ~~~
            - **Tomcat/WebLogic**: publique ou copie a pasta images no contexto «/i».
            - **Usar o CDN da Oracle** (dispensa copiar arquivos): rode «@utilities/reset_image_prefix.sql» e informe
              «https://static.oracle.com/cdn/apex/26.1.5/» (troque pela sua versão exata, com o patch).

            Para conferir, abra «/i/apex_version.txt» no navegador: a versão precisa ser a mesma de «apex_release».

            :::atencao
            Depois de aplicar um patch set bundle, copie também a pasta images do patch. Imagens antigas com o banco novo causam
            erros de JavaScript difíceis de entender. Limpe o cache do navegador depois da troca.
            :::
        `
    },
    en: {
        q: 'Why do APEX images, CSS and JS return 404 under /i/ ("There are issues with the configuration of the Static Files")?',
        tags: ['404 Not Found /i/', '/i/', 'images', 'static files', 'There are issues with the configuration of the Static Files in your environment', 'There is a problem with your environment', 'CDN', 'apex_version.txt', 'standalone.static.path'],
        r: `
            ORDS is not serving the APEX **images** folder, or it is serving the folder of **another version** (very common
            right after an upgrade). Pages show up unstyled and APEX warns about the static files configuration.

            How to fix it:
            - **ORDS standalone**: point it at the images folder of the installed version and restart ORDS.
            ~~~bash
            ords config set standalone.static.path /opt/apex/images
            # or, when starting:
            ords serve --apex-images /opt/apex/images
            ~~~
            - **Tomcat/WebLogic**: deploy or copy the images folder to the «/i» context.
            - **Use the Oracle CDN** (no files to copy): run «@utilities/reset_image_prefix.sql» and enter
              «https://static.oracle.com/cdn/apex/26.1.5/» (use your exact version, including the patch).

            To check, open «/i/apex_version.txt» in the browser: it must show the same version as «apex_release».

            :::atencao
            After applying a patch set bundle, also copy the patch's images folder. Old images with a newer database cause
            confusing JavaScript errors. Clear the browser cache after switching.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ords-404-503',
    tema: 'instalacao',
    ver: ['ords', 'administracao-instancia'],
    pt: {
        q: 'O ORDS retorna 404 "The request could not be mapped to any database" ou 503 Service Unavailable. O que fazer?',
        tags: ['ORDS', '404', '503', 'Service Unavailable', 'could not be mapped to any database', 'ORA-28000', 'APEX_PUBLIC_USER', 'ORDS_PUBLIC_USER', 'Application is currently unavailable'],
        r: `
            **404 "The request could not be mapped to any database"**
            - A URL não corresponde a nenhum pool configurado (confira o caminho «/ords/...»).
            - Ou o ORDS subiu antes do banco e desistiu de conectar. Revise com «ords config list» e reinicie o ORDS com o banco no ar.

            **503 Service Unavailable**
            - Quase sempre a conta **ORDS_PUBLIC_USER** ou **APEX_PUBLIC_USER** está bloqueada ou com senha expirada (ORA-28000).
            ~~~sql
            alter user ords_public_user identified by "NovaSenha#2026" account unlock;
            alter user apex_public_user account unlock;
            ~~~
            - Depois, grave a nova senha no ORDS («ords config secret db.password») e reinicie.
            - Coloque essas contas num **profile** sem expiração de senha para o problema não voltar.

            **"Application is currently unavailable"**
            - Não é erro do ORDS: confira o **Availability** do app (Available, Available to Developers Only, Unavailable) em
              Edit Application Definition, e se a instância não está no meio de um upgrade.

            :::dica
            O log do ORDS (saída do «ords serve» ou do Tomcat) mostra a causa exata, inclusive o ORA- do pool de conexões.
            :::
        `
    },
    en: {
        q: 'ORDS returns 404 "The request could not be mapped to any database" or 503 Service Unavailable. What should I do?',
        tags: ['ORDS', '404', '503', 'Service Unavailable', 'could not be mapped to any database', 'ORA-28000', 'APEX_PUBLIC_USER', 'ORDS_PUBLIC_USER', 'Application is currently unavailable'],
        r: `
            **404 "The request could not be mapped to any database"**
            - The URL does not match any configured pool (check the «/ords/...» path).
            - Or ORDS started before the database and gave up connecting. Review the setup with «ords config list» and restart
              ORDS once the database is up.

            **503 Service Unavailable**
            - Usually the **ORDS_PUBLIC_USER** or **APEX_PUBLIC_USER** account is locked or its password expired (ORA-28000).
            ~~~sql
            alter user ords_public_user identified by "NewPassword#2026" account unlock;
            alter user apex_public_user account unlock;
            ~~~
            - Then store the new password in ORDS («ords config secret db.password») and restart.
            - Put these accounts on a **profile** without password expiry so it does not happen again.

            **"Application is currently unavailable"**
            - This is not an ORDS error: check the app's **Availability** (Available, Available to Developers Only, Unavailable)
              in Edit Application Definition, and whether the instance is in the middle of an upgrade.

            :::dica
            The ORDS log (the «ords serve» output or the Tomcat log) shows the exact cause, including the ORA- error from the
            connection pool.
            :::
        `
    }
});

DOC.pergunta({
    id: 'upgrade-apex-patch',
    tema: 'instalacao',
    ver: ['upgrade-e-patches', 'instalacao-apex', 'arquivos-estaticos-e-cdn'],
    pt: {
        q: 'Como faço upgrade do APEX ou aplico um patch set bundle?',
        tags: ['upgrade', 'patch', 'patch set bundle', 'atualizar', 'catpatch.sql', 'apexins.sql', 'APEX_260100', 'My Oracle Support'],
        r: `
            **Upgrade de versão (ex.: 24.2 para 26.1)**
            1. Faça backup e teste antes em um ambiente que não seja produção.
            2. Rode o «apexins.sql» da nova versão como SYS. Ele cria um **novo schema** (no 26.1, «APEX_260100») e migra os
               metadados das suas aplicações. O upgrade direto só é suportado a partir da 18.1.
            3. Atualize o ORDS se necessário (26.1 exige ORDS 26.1.1+), troque a pasta images (ou o prefixo do CDN) e reinicie.

            **Patch set bundle (ex.: 26.1.x)**
            1. Baixe o patch no My Oracle Support (os bundles são cumulativos).
            2. Como SYS, rode «@catpatch.sql» (ou «@catpatch_con.sql» se o APEX estiver instalado na raiz do CDB).
            3. Copie a pasta images do patch sobre os arquivos estáticos e confira:
            ~~~sql
            select version_no, patch_applied from apex_release;
            select * from apex_patches;
            ~~~

            No Autonomous Database e no APEX Service, a Oracle aplica upgrades e patches automaticamente.

            :::atencao Novo no 26.1
            O 26.1 **não importa** exports de página única ou de componentes gerados em versões anteriores. Aplicações
            completas exportadas da 24.2 ou antes continuam sendo importadas normalmente.
            :::
        `
    },
    en: {
        q: 'How do I upgrade APEX or apply a patch set bundle?',
        tags: ['upgrade', 'patch', 'patch set bundle', 'update', 'catpatch.sql', 'apexins.sql', 'APEX_260100', 'My Oracle Support'],
        r: `
            **Release upgrade (e.g., 24.2 to 26.1)**
            1. Back up, and test first in a non-production environment.
            2. Run the new release's «apexins.sql» as SYS. It creates a **new schema** (in 26.1, «APEX_260100») and migrates your
               application metadata. Direct upgrades are only supported from 18.1 onwards.
            3. Upgrade ORDS if needed (26.1 requires ORDS 26.1.1+), switch the images folder (or the CDN prefix) and restart.

            **Patch set bundle (e.g., 26.1.x)**
            1. Download it from My Oracle Support (bundles are cumulative).
            2. As SYS, run «@catpatch.sql» (or «@catpatch_con.sql» if APEX is installed in the CDB root).
            3. Copy the patch's images folder over your static files and check:
            ~~~sql
            select version_no, patch_applied from apex_release;
            select * from apex_patches;
            ~~~

            On Autonomous Database and APEX Service, Oracle applies upgrades and patches for you.

            :::atencao New in 26.1
            26.1 **cannot import** single-page or component exports created in earlier releases. Full applications exported
            from 24.2 or earlier still import normally.
            :::
        `
    }
});

DOC.pergunta({
    id: 'redefinir-senha-admin',
    tema: 'instalacao',
    ver: ['administracao-instancia', 'gerenciando-workspaces'],
    pt: {
        q: 'Esqueci a senha do ADMIN (workspace INTERNAL). Como redefinir?',
        tags: ['senha', 'ADMIN', 'INTERNAL', 'apxchpwd.sql', 'redefinir', 'conta bloqueada', 'reset password'],
        r: `
            Conecte como **SYS** na PDB onde o APEX está instalado e rode o script «apxchpwd.sql», que fica na pasta de instalação
            do APEX (a mesma do zip da sua versão):

            ~~~bash
            cd /caminho/apex
            sql sys@//localhost:1521/FREEPDB1 as sysdba
            @apxchpwd.sql
            ~~~

            O script pede o usuário (ADMIN), o e-mail e a nova senha. Se o usuário não existir, ele é criado; se estiver bloqueado,
            é desbloqueado. A senha precisa seguir as regras de complexidade da instância.

            Outros casos:
            - **Desenvolvedor de um workspace** esqueceu a senha: o administrador do workspace (ou da instância) redefine em
              **Manage Users and Groups**.
            - **Autonomous Database / APEX Service**: não há «apxchpwd.sql». A senha do ADMIN da instância é a do usuário ADMIN do banco;
              troque-a pelo console da OCI.

            :::dica
            Depois de entrar, cadastre um segundo administrador da instância para não depender de uma única conta.
            :::
        `
    },
    en: {
        q: 'I forgot the instance ADMIN (INTERNAL workspace) password. How do I reset it?',
        tags: ['password', 'ADMIN', 'INTERNAL', 'apxchpwd.sql', 'reset password', 'locked account'],
        r: `
            Connect as **SYS** to the PDB where APEX is installed and run the «apxchpwd.sql» script from the APEX install folder
            (the zip for your version):

            ~~~bash
            cd /path/to/apex
            sql sys@//localhost:1521/FREEPDB1 as sysdba
            @apxchpwd.sql
            ~~~

            The script asks for the username (ADMIN), e-mail and new password. If the user does not exist it is created; if it is
            locked, it is unlocked. The password must follow the instance complexity rules.

            Other cases:
            - **A workspace developer** forgot the password: the workspace (or instance) administrator resets it under
              **Manage Users and Groups**.
            - **Autonomous Database / APEX Service**: there is no «apxchpwd.sql». The instance ADMIN password is the database ADMIN
              user password; change it from the OCI console.

            :::dica
            Once you are in, create a second instance administrator so you do not depend on a single account.
            :::
        `
    }
});

DOC.pergunta({
    id: 'urls-amigaveis-tirar-ords',
    tema: 'instalacao',
    ver: ['urls-do-apex', 'ords', 'session-state-protection'],
    pt: {
        q: 'Como funcionam as URLs amigáveis? Dá para mudar a URL do app ou tirar o /ords/?',
        tags: ['Friendly URLs', 'URL amigável', '/ords/', 'path prefix', 'alias', 'f?p', 'apex_page.get_url', 'proxy reverso', 'domínio próprio', 'vanity URL'],
        r: `
            Ative em **Edit Application Definition > Friendly URLs = On**. As URLs passam a ter o formato:

            ~~~texto
            https://servidor/ords/r/<path_prefix>/<alias_do_app>/<alias_da_pagina>?p2_id=10&session=123...
            ~~~

            - O **path prefix** vem do workspace (por padrão, o nome dele) e é alterado em Workspace Administration > Manage Service >
              Set Workspace Preferences.
            - O alias do app fica na definição da aplicação, e o de cada página em **Page Alias**.
            - Itens na URL aparecem em minúsculas (p2_id) e, com Session State Protection, ganham o parâmetro **cs** (checksum).

            Para **tirar o /ords** ou usar seu próprio domínio, coloque um proxy reverso na frente (Nginx, Apache, OCI Load Balancer)
            que reescreva o caminho, ou use um domínio personalizado (*vanity URL*) no Autonomous Database.

            Gere links no servidor com «apex_page.get_url», que já calcula o checksum:

            ~~~plsql
            l_url := apex_page.get_url(p_page => 'pedido', p_items => 'P2_ID', p_values => :P1_ID);
            ~~~

            :::atencao
            Não monte URLs concatenando strings «f?p=...». Com Session State Protection ativo, elas falham por falta de checksum.
            :::
        `
    },
    en: {
        q: 'How do Friendly URLs work, and can I change my app URL or remove /ords/?',
        tags: ['Friendly URLs', '/ords/', 'path prefix', 'alias', 'f?p', 'apex_page.get_url', 'reverse proxy', 'custom domain', 'vanity URL'],
        r: `
            Turn on **Edit Application Definition > Friendly URLs = On**. URLs then look like this:

            ~~~texto
            https://server/ords/r/<path_prefix>/<app_alias>/<page_alias>?p2_id=10&session=123...
            ~~~

            - The **path prefix** comes from the workspace (by default, its name) and is changed under Workspace Administration >
              Manage Service > Set Workspace Preferences.
            - The app alias is in the application definition, and each page has a **Page Alias**.
            - Items in the URL are lowercase (p2_id) and, with Session State Protection, get a **cs** (checksum) parameter.

            To **remove /ords** or use your own domain, put a reverse proxy in front (Nginx, Apache, OCI Load Balancer) that rewrites
            the path, or use a custom (*vanity*) domain on Autonomous Database.

            Generate links on the server with «apex_page.get_url», which adds the checksum for you:

            ~~~plsql
            l_url := apex_page.get_url(p_page => 'order', p_items => 'P2_ID', p_values => :P1_ID);
            ~~~

            :::atencao
            Do not build URLs by concatenating «f?p=...» strings. With Session State Protection on, they fail for lack of a checksum.
            :::
        `
    }
});

DOC.pergunta({
    id: 'valor-item-javascript-plsql',
    tema: 'sessao',
    destaque: true,
    ver: ['javascript-api', 'sessao-e-session-state', 'substituicoes'],
    pt: {
        q: 'Como pego o valor de um item de página em JavaScript e em PL/SQL?',
        tags: ['valor do item', 'apex.item', 'getValue', '$v', 'bind variable', 'v()', 'nv()', 'APEX_SESSION_STATE', 'ler item'],
        r: `
            **No navegador (JavaScript)**

            ~~~js
            var nome  = apex.item("P1_ENAME").getValue();  // forma recomendada
            var nome2 = $v("P1_ENAME");                     // atalho legado, ainda funciona
            var deptos = apex.item("P1_DEPTOS").getValue(); // Select Many / Checkbox Group: retorna array
            ~~~

            **No servidor, dentro do APEX** (regiões, processos, validações, computações): use a *bind variable* «:P1_ENAME».

            ~~~sql
            select * from emp where ename = :P1_ENAME
            ~~~

            **Em pacotes e views** (código armazenado fora da página): use «v('P1_ENAME')», «nv('P1_SAL')» ou, desde o 22.2,
            «apex_session_state.get_varchar2('P1_ENAME')». Melhor ainda: receba o valor como **parâmetro** do procedimento, o que
            deixa o código testável fora do APEX.

            :::atencao
            O PL/SQL só enxerga o que está em **session state**, não o que o usuário acabou de digitar na tela. Para enviar o valor
            ao servidor sem submeter a página, use **Items to Submit** (veja [por que o item chega NULL](#/faq/da-plsql-item-null)).
            :::
        `
    },
    en: {
        q: 'How do I get a page item value in JavaScript and in PL/SQL?',
        tags: ['item value', 'apex.item', 'getValue', '$v', 'bind variable', 'v()', 'nv()', 'APEX_SESSION_STATE', 'read item'],
        r: `
            **In the browser (JavaScript)**

            ~~~js
            var name  = apex.item("P1_ENAME").getValue();   // recommended
            var name2 = $v("P1_ENAME");                      // legacy shortcut, still works
            var depts = apex.item("P1_DEPTS").getValue();    // Select Many / Checkbox Group: returns an array
            ~~~

            **On the server, inside APEX** (regions, processes, validations, computations): use the *bind variable* «:P1_ENAME».

            ~~~sql
            select * from emp where ename = :P1_ENAME
            ~~~

            **In packages and views** (stored code outside the page): use «v('P1_ENAME')», «nv('P1_SAL')» or, since 22.2,
            «apex_session_state.get_varchar2('P1_ENAME')». Better still, take the value as a procedure **parameter**, which keeps
            the code testable outside APEX.

            :::atencao
            PL/SQL only sees what is in **session state**, not what the user just typed on screen. To send the value to the server
            without submitting the page, use **Items to Submit** (see [why the item arrives as NULL](#/faq/da-plsql-item-null)).
            :::
        `
    }
});

DOC.pergunta({
    id: 'definir-valor-item-sem-submit',
    tema: 'sessao',
    ver: ['javascript-api', 'ajax-callbacks', 'sessao-e-session-state'],
    pt: {
        q: 'Como defino o valor de um item via JavaScript e gravo em session state sem submeter a página?',
        tags: ['setValue', '$s', 'session state', 'sem submit', 'pageItems', 'apex.server.process', 'set_session_state', 'Items to Return'],
        r: `
            «apex.item("P1_X").setValue("abc")» (ou «$s») muda o valor **apenas no navegador** e dispara o evento change.
            Para o valor chegar ao session state, escolha uma destas opções:
            - Liste o item em **Items to Submit** de uma Dynamic Action "Execute Server-side Code" (ou de uma região que vai ser atualizada).
            - Envie o item numa chamada Ajax com a opção **pageItems**. Um processo Ajax Callback com corpo «null;» já basta,
              porque os itens enviados são gravados antes de o processo rodar.
            - Submeta a página.

            ~~~js
            apex.item("P1_STATUS").setValue("APROVADO");
            apex.server.process("GRAVAR_STATUS", { pageItems: "#P1_STATUS" }, { dataType: "text" })
                .done(function () { apex.message.showPageSuccess("Status salvo."); });
            ~~~

            No sentido contrário (servidor para o navegador):
            - Em "Execute Server-side Code", atribua «:P1_X := 'abc';» e liste o item em **Items to Return**.
            - Em código PL/SQL de processos, também vale «apex_util.set_session_state('P1_X', 'abc')» ou, desde o 22.2,
              «apex_session_state.set_value('P1_X', 'abc')».
            - Sem código: a ação **Set Value** da Dynamic Action (tipos SQL Statement, PL/SQL Expression etc.).
        `
    },
    en: {
        q: 'How do I set an item value from JavaScript and save it to session state without submitting the page?',
        tags: ['setValue', '$s', 'session state', 'no submit', 'pageItems', 'apex.server.process', 'set_session_state', 'Items to Return'],
        r: `
            «apex.item("P1_X").setValue("abc")» (or «$s») changes the value **only in the browser** and fires the change event.
            To get the value into session state, pick one of these:
            - List the item in **Items to Submit** of an "Execute Server-side Code" Dynamic Action (or of a region being refreshed).
            - Send the item in an Ajax call with the **pageItems** option. An Ajax Callback process whose body is «null;» is enough,
              because the submitted items are saved before the process runs.
            - Submit the page.

            ~~~js
            apex.item("P1_STATUS").setValue("APPROVED");
            apex.server.process("SAVE_STATUS", { pageItems: "#P1_STATUS" }, { dataType: "text" })
                .done(function () { apex.message.showPageSuccess("Status saved."); });
            ~~~

            The other way round (server to browser):
            - In "Execute Server-side Code", assign «:P1_X := 'abc';» and list the item in **Items to Return**.
            - In PL/SQL processes you can also use «apex_util.set_session_state('P1_X', 'abc')» or, since 22.2,
              «apex_session_state.set_value('P1_X', 'abc')».
            - With no code: the **Set Value** Dynamic Action (SQL Statement, PL/SQL Expression and other types).
        `
    }
});

DOC.pergunta({
    id: 'da-plsql-item-null',
    tema: 'sessao',
    ver: ['dynamic-actions', 'ajax-callbacks', 'sessao-e-session-state'],
    pt: {
        q: 'Por que o PL/SQL da minha Dynamic Action recebe o item NULL (ou o valor antigo)?',
        tags: ['Items to Submit', 'Items to Return', 'Page Items to Submit', 'NULL', 'valor antigo', 'Execute Server-side Code', 'session state', 'refresh'],
        r: `
            Porque o valor digitado no navegador **nunca chegou ao session state**. O servidor só conhece o que foi enviado.

            Como resolver:
            - Em "Execute Server-side Code", coloque o item em **Items to Submit**. Para devolver ao navegador valores alterados
              pelo PL/SQL, use **Items to Return**.
            - Regiões, LOVs em cascata e gráficos que você atualiza (Refresh) precisam do item em **Page Items to Submit** da região.
            - Confira o atributo **Source > Used** do item: com "Always, replacing any existing value in session state", o valor é
              sobrescrito a cada renderização.
            - Confira **Session State > Storage** (Per Request ou Per Session) do item.

            ~~~plsql
            -- DA: Execute Server-side Code
            -- Items to Submit: P1_EMPNO    Items to Return: P1_SAL
            select sal into :P1_SAL from emp where empno = :P1_EMPNO;
            ~~~

            :::dica
            Ative o modo debug e veja em View Debug quais itens chegaram na requisição Ajax e com qual valor.
            :::
        `
    },
    en: {
        q: 'Why does my Dynamic Action PL/SQL see the item as NULL (or an old value)?',
        tags: ['Items to Submit', 'Items to Return', 'Page Items to Submit', 'NULL', 'old value', 'Execute Server-side Code', 'session state', 'refresh'],
        r: `
            Because the value typed in the browser **never reached session state**. The server only knows what was sent to it.

            How to fix it:
            - In "Execute Server-side Code", put the item in **Items to Submit**. To send values changed by the PL/SQL back to the
              browser, use **Items to Return**.
            - Regions, cascading LOVs and charts that you refresh need the item in the region's **Page Items to Submit**.
            - Check the item's **Source > Used** attribute: with "Always, replacing any existing value in session state" the value
              is overwritten on every render.
            - Check the item's **Session State > Storage** (Per Request or Per Session).

            ~~~plsql
            -- DA: Execute Server-side Code
            -- Items to Submit: P1_EMPNO    Items to Return: P1_SAL
            select sal into :P1_SAL from emp where empno = :P1_EMPNO;
            ~~~

            :::dica
            Turn on debug mode and check in View Debug which items arrived with the Ajax request, and with which values.
            :::
        `
    }
});

DOC.pergunta({
    id: 'bind-substituicao-v-coluna',
    tema: 'sessao',
    ver: ['substituicoes', 'sessao-e-session-state', 'sql-injection'],
    pt: {
        q: 'Qual a diferença entre :ITEM, &ITEM., V(\'ITEM\') e #COLUNA#? E o que são itens de aplicação?',
        tags: ['bind variable', 'substitution string', '&ITEM.', ':ITEM', 'v()', '#COLUNA#', 'application item', 'item de aplicação', 'APP_USER', 'apex.env'],
        r: `
            | Sintaxe | Onde usar |
            |---|---|
            | «:P1_X» | SQL e PL/SQL dentro do APEX (bind variable). Seguro e eficiente. |
            | «&P1_X.» | Texto estático, HTML, URLs e templates (substitution string). O ponto final é obrigatório. |
            | «v('P1_X')» | Código armazenado: pacotes, funções e views. |
            | «#COLUNA#» | Valor da coluna em links e HTML Expression de Classic Report e Interactive Report. |
            | «&COLUNA.» | Valor da coluna em Interactive Grid, Cards e Template Components. |

            Valores prontos: «:APP_USER», «:APP_ID», «:APP_PAGE_ID», «:APP_SESSION». Em JavaScript: «apex.env.APP_USER»,
            «apex.env.APP_ID» etc.

            **Itens de aplicação** (Shared Components > Application Items) são variáveis globais da sessão: não aparecem na tela,
            valem em todas as páginas e costumam ser preenchidos no post-authentication, em Application Computations ou em processos.
            Em JavaScript, só são acessíveis via Ajax (ou se você os renderizar em algum lugar da página).

            :::atencao
            Nunca use «&P1_X.» dentro de SQL. O valor é colado no texto da query: abre brecha para **SQL injection** e impede o
            reaproveitamento do cursor. Em SQL, use sempre «:P1_X».
            :::
        `
    },
    en: {
        q: 'What is the difference between :ITEM, &ITEM., V(\'ITEM\') and #COLUMN#? What are application items?',
        tags: ['bind variable', 'substitution string', '&ITEM.', ':ITEM', 'v()', '#COLUMN#', 'application item', 'APP_USER', 'apex.env'],
        r: `
            | Syntax | Where to use it |
            |---|---|
            | «:P1_X» | SQL and PL/SQL inside APEX (bind variable). Safe and efficient. |
            | «&P1_X.» | Static text, HTML, URLs and templates (substitution string). The trailing period is required. |
            | «v('P1_X')» | Stored code: packages, functions and views. |
            | «#COLUMN#» | Column value in links and HTML Expressions of Classic and Interactive Reports. |
            | «&COLUMN.» | Column value in Interactive Grid, Cards and Template Components. |

            Built-in values: «:APP_USER», «:APP_ID», «:APP_PAGE_ID», «:APP_SESSION». In JavaScript: «apex.env.APP_USER»,
            «apex.env.APP_ID» and so on.

            **Application items** (Shared Components > Application Items) are global session variables: they are never displayed,
            they are valid on every page, and they are usually set in the post-authentication procedure, Application Computations
            or processes. In JavaScript they are only reachable through Ajax (or if you render them somewhere on the page).

            :::atencao
            Never use «&P1_X.» inside SQL. The value is pasted into the query text: it opens the door to **SQL injection** and
            prevents cursor reuse. In SQL, always use «:P1_X».
            :::
        `
    }
});

DOC.pergunta({
    id: 'passar-valores-entre-paginas',
    tema: 'sessao',
    ver: ['urls-do-apex', 'botoes-e-branches', 'session-state-protection'],
    pt: {
        q: 'Como passo valores entre páginas e limpo o cache da página de destino?',
        tags: ['passar valor', 'Set Items', 'Clear Cache', 'link', 'branch', 'apex_page.get_url', 'clear_page_cache', 'RP', 'checksum'],
        r: `
            Use o **Link Builder**, que aparece em botões, colunas do tipo Link e branches:
            - **Target**: a página de destino (número ou alias).
            - **Set Items**: nome e valor, por exemplo «P2_ID» = «#ID#» (coluna de relatório) ou «&P1_ID.» (item da página atual).
            - **Clear Cache**: a página de destino (ex.: 2) para começar sem valores antigos. Acrescente «RP» para voltar a
              paginação ao início.

            Em PL/SQL, gere a URL com «apex_page.get_url»:

            ~~~plsql
            :P1_URL := apex_page.get_url(
                p_page        => 2,
                p_clear_cache => '2',
                p_items       => 'P2_ID,P2_MODO',
                p_values      => :P1_ID || ',EDITAR');
            ~~~

            Para limpar itens por programação: «apex_util.clear_page_cache(2)» ou o processo declarativo **Clear Session State**.

            :::atencao
            Com **Session State Protection** ligado, as URLs precisam de checksum. O Link Builder e o «apex_page.get_url» calculam
            o checksum automaticamente; URLs montadas na mão falham com erro de proteção.
            :::
        `
    },
    en: {
        q: 'How do I pass values between pages and clear the target page cache?',
        tags: ['pass value', 'Set Items', 'Clear Cache', 'link', 'branch', 'apex_page.get_url', 'clear_page_cache', 'RP', 'checksum'],
        r: `
            Use the **Link Builder**, available on buttons, Link columns and branches:
            - **Target**: the destination page (number or alias).
            - **Set Items**: name and value, for example «P2_ID» = «#ID#» (report column) or «&P1_ID.» (item on the current page).
            - **Clear Cache**: the target page (e.g., 2) so it starts without old values. Add «RP» to reset pagination.

            In PL/SQL, build the URL with «apex_page.get_url»:

            ~~~plsql
            :P1_URL := apex_page.get_url(
                p_page        => 2,
                p_clear_cache => '2',
                p_items       => 'P2_ID,P2_MODE',
                p_values      => :P1_ID || ',EDIT');
            ~~~

            To clear items in code: «apex_util.clear_page_cache(2)» or the declarative **Clear Session State** process.

            :::atencao
            With **Session State Protection** on, URLs need a checksum. The Link Builder and «apex_page.get_url» add it for you;
            hand-built URLs fail with a protection error.
            :::
        `
    }
});

DOC.pergunta({
    id: 'dados-temporarios-apex-collection',
    tema: 'sessao',
    ver: ['apex-collection', 'sessao-e-session-state'],
    pt: {
        q: 'Como guardo dados temporários por sessão (carrinho, wizard)? Posso usar tabela temporária global?',
        tags: ['APEX_COLLECTION', 'collection', 'carrinho', 'wizard', 'GTT', 'global temporary table', 'tabela temporária', 'apex_collections'],
        r: `
            Use **APEX_COLLECTION**. Tabelas temporárias globais (GTT) não são confiáveis no APEX: cada requisição pode usar uma
            **sessão de banco diferente** do pool de conexões, então os dados "somem" entre uma página e outra.

            ~~~plsql
            apex_collection.create_or_truncate_collection(p_collection_name => 'CARRINHO');

            apex_collection.add_member(
                p_collection_name => 'CARRINHO',
                p_c001            => :P1_PRODUTO,
                p_n001            => :P1_QTD);
            ~~~

            ~~~sql
            select seq_id, c001 as produto, n001 as quantidade
              from apex_collections
             where collection_name = 'CARRINHO'
            ~~~

            Cada membro tem até **50 colunas VARCHAR2** (c001 a c050), **5 NUMBER** (n001 a n005), **5 DATE** (d001 a d005), além de
            um CLOB, um BLOB e um XMLTYPE. A collection pertence à sessão do APEX e é descartada quando a sessão termina.

            Outras funções úteis: «collection_exists», «update_member_attribute», «delete_member» e «create_collection_from_query».

            :::dica
            Para volumes grandes ou dados que precisam sobreviver ao fim da sessão, prefira uma tabela comum com uma coluna de
            usuário (ou de sessão) e limpe-a periodicamente.
            :::
        `
    },
    en: {
        q: 'How do I store temporary per-session data (cart, wizard)? Can I use a global temporary table?',
        tags: ['APEX_COLLECTION', 'collection', 'cart', 'wizard', 'GTT', 'global temporary table', 'temporary data', 'apex_collections'],
        r: `
            Use **APEX_COLLECTION**. Global temporary tables (GTTs) are unreliable in APEX: each request may run in a **different
            database session** from the connection pool, so the rows "vanish" between pages.

            ~~~plsql
            apex_collection.create_or_truncate_collection(p_collection_name => 'CART');

            apex_collection.add_member(
                p_collection_name => 'CART',
                p_c001            => :P1_PRODUCT,
                p_n001            => :P1_QTY);
            ~~~

            ~~~sql
            select seq_id, c001 as product, n001 as quantity
              from apex_collections
             where collection_name = 'CART'
            ~~~

            Each member holds up to **50 VARCHAR2 columns** (c001 to c050), **5 NUMBER** (n001 to n005), **5 DATE** (d001 to d005),
            plus one CLOB, one BLOB and one XMLTYPE. A collection belongs to the APEX session and is discarded when the session ends.

            Other useful calls: «collection_exists», «update_member_attribute», «delete_member» and «create_collection_from_query».

            :::dica
            For large volumes, or data that must outlive the session, use a regular table with a user (or session) column and
            purge it periodically.
            :::
        `
    }
});

DOC.pergunta({
    id: 'classic-ir-ig-diferenca',
    tema: 'relatorios',
    ver: ['classic-report', 'interactive-report', 'interactive-grid'],
    pt: {
        q: 'Qual a diferença entre Classic Report, Interactive Report e Interactive Grid?',
        tags: ['Classic Report', 'Interactive Report', 'Interactive Grid', 'IR', 'IG', 'comparação', 'qual usar', 'relatório'],
        r: `
            | Recurso | Classic Report | Interactive Report | Interactive Grid |
            |---|---|---|---|
            | Edição inline | Não | Não | Sim |
            | Filtros e colunas pelo usuário | Não | Sim | Sim |
            | Relatórios salvos | Não | Sim | Sim |
            | Group By e Pivot | Não | Sim | Não |
            | Gráfico, highlight, control break | Não | Sim | Sim |
            | Controle total do HTML (templates) | Sim | Limitado | Limitado |

            - **Classic Report**: simples, leve e guiado por templates. Ideal para listas pequenas, painéis e layouts personalizados
              (com Template Directives ou template de linha).
            - **Interactive Report (IR)**: somente leitura, com recursos para o usuário final: filtros, ordenação, highlight,
              agregações, Group By, Pivot, gráficos, relatórios salvos, download e assinaturas por e-mail.
            - **Interactive Grid (IG)**: personalização parecida com a do IR e, além disso, **edição em grade** estilo planilha,
              mestre-detalhe, colunas congeladas e paginação por rolagem.

            Regra prática: **IR para consultar**, **IG para editar várias linhas**, **Classic Report** (ou Cards e Template Components)
            quando o visual importa mais que a interatividade.

            :::novo No 26.1
            O IR ganhou **Row Selector** declarativo (seleção de linhas) e busca em **linguagem natural** com IA.
            :::
        `
    },
    en: {
        q: 'What is the difference between Classic Report, Interactive Report and Interactive Grid?',
        tags: ['Classic Report', 'Interactive Report', 'Interactive Grid', 'IR', 'IG', 'comparison', 'which to use', 'report'],
        r: `
            | Feature | Classic Report | Interactive Report | Interactive Grid |
            |---|---|---|---|
            | Inline editing | No | No | Yes |
            | End-user filters and columns | No | Yes | Yes |
            | Saved reports | No | Yes | Yes |
            | Group By and Pivot | No | Yes | No |
            | Charts, highlight, control break | No | Yes | Yes |
            | Full HTML control (templates) | Yes | Limited | Limited |

            - **Classic Report**: simple, lightweight and template driven. Great for small lists, dashboards and custom layouts
              (with Template Directives or a row template).
            - **Interactive Report (IR)**: read-only, with end-user power features: filters, sorting, highlight, aggregates,
              Group By, Pivot, charts, saved reports, download and e-mail subscriptions.
            - **Interactive Grid (IG)**: customization similar to the IR plus spreadsheet-like **grid editing**, master-detail,
              frozen columns and scroll pagination.

            Rule of thumb: **IR to browse**, **IG to edit many rows**, **Classic Report** (or Cards and Template Components) when
            the look matters more than interactivity.

            :::novo In 26.1
            The IR gained a declarative **Row Selector** (row selection) and AI-powered **natural-language** search.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ig-linhas-selecionadas',
    tema: 'relatorios',
    destaque: true,
    ver: ['interactive-grid', 'javascript-api'],
    pt: {
        q: 'Como obtenho as linhas selecionadas de um Interactive Grid?',
        tags: ['Interactive Grid', 'IG', 'linhas selecionadas', 'getSelectedRecords', 'Selection Change', 'model', 'apex_string.split', 'checkbox'],
        r: `
            Dê um **HTML DOM ID** à região (no 24.2 e anteriores o atributo se chama **Static ID**), por exemplo «emp», e use:

            ~~~js
            var ig$   = apex.region("emp").widget(),
                model = ig$.interactiveGrid("getViews", "grid").model,
                ids   = ig$.interactiveGrid("getSelectedRecords").map(function (rec) {
                            return model.getValue(rec, "EMPNO");
                        });

            apex.item("P1_IDS").setValue(ids.join(":"));
            ~~~

            Também dá para usar o evento de Dynamic Action **Selection Change [Interactive Grid]** e ler «this.data.selectedRecords»
            e «this.data.model» na ação JavaScript.

            No servidor, transforme a lista em linhas:

            ~~~sql
            select e.*
              from emp e
             where e.empno in (select to_number(column_value)
                                 from table(apex_string.split(:P1_IDS, ':')))
            ~~~

            :::atencao
            Colunas Popup LOV podem devolver um objeto «{ v: ..., d: ... }» em «getValue». Nesse caso use «.v» para pegar o valor
            de retorno. Lembre-se também de enviar «P1_IDS» ao servidor (Items to Submit) antes de usá-lo no PL/SQL.
            :::
        `
    },
    en: {
        q: 'How do I get the selected rows of an Interactive Grid?',
        tags: ['Interactive Grid', 'IG', 'selected rows', 'getSelectedRecords', 'Selection Change', 'model', 'apex_string.split', 'checkbox'],
        r: `
            Give the region an **HTML DOM ID** (called **Static ID** in 24.2 and earlier), for example «emp», and use:

            ~~~js
            var ig$   = apex.region("emp").widget(),
                model = ig$.interactiveGrid("getViews", "grid").model,
                ids   = ig$.interactiveGrid("getSelectedRecords").map(function (rec) {
                            return model.getValue(rec, "EMPNO");
                        });

            apex.item("P1_IDS").setValue(ids.join(":"));
            ~~~

            You can also use the **Selection Change [Interactive Grid]** Dynamic Action event and read «this.data.selectedRecords»
            and «this.data.model» in the JavaScript action.

            On the server, turn the list into rows:

            ~~~sql
            select e.*
              from emp e
             where e.empno in (select to_number(column_value)
                                 from table(apex_string.split(:P1_IDS, ':')))
            ~~~

            :::atencao
            Popup LOV columns may return an object «{ v: ..., d: ... }» from «getValue». In that case use «.v» to get the return
            value. Also remember to send «P1_IDS» to the server (Items to Submit) before using it in PL/SQL.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ig-valor-celula-javascript',
    tema: 'relatorios',
    ver: ['interactive-grid', 'javascript-api'],
    pt: {
        q: 'Como leio ou altero o valor de uma célula ou coluna do Interactive Grid por JavaScript?',
        tags: ['Interactive Grid', 'IG', 'célula', 'coluna', 'model', 'getValue', 'setValue', 'forEach', 'Set Value'],
        r: `
            Trabalhe com o **model** da visão grid. O exemplo abaixo dá aumento a todos do departamento 10:

            ~~~js
            var model = apex.region("emp").call("getViews", "grid").model;

            model.forEach(function (rec) {
                if (Number(model.getValue(rec, "DEPTNO")) === 10) {
                    var sal = parseFloat(model.getValue(rec, "SAL")) || 0;
                    model.setValue(rec, "SAL", String(sal * 1.1));
                }
            });
            ~~~

            Pontos importantes:
            - Os valores no model são **strings** (já com a máscara de formato da coluna); converta antes de fazer contas. Com máscaras
              brasileiras (1.234,56), use «apex.locale.toNumber» em vez de «parseFloat».
            - As linhas alteradas ficam marcadas e são gravadas pelo processo **Interactive Grid - Automatic Row Processing (DML)**
              quando o usuário salva.

            Sem código: numa Dynamic Action disparada por uma **coluna** do IG, a ação **Set Value** com Affected Elements = a outra
            coluna altera o valor na linha atual.

            :::atencao
            A coluna precisa ser editável. Colunas **Query Only** ou somente leitura não são gravadas, e o IG precisa estar com
            **Editable = On** para que as alterações sejam salvas.
            :::
        `
    },
    en: {
        q: 'How do I read or set an Interactive Grid cell or column value in JavaScript?',
        tags: ['Interactive Grid', 'IG', 'cell', 'column', 'model', 'getValue', 'setValue', 'forEach', 'Set Value'],
        r: `
            Work with the grid view's **model**. This example gives everyone in department 10 a raise:

            ~~~js
            var model = apex.region("emp").call("getViews", "grid").model;

            model.forEach(function (rec) {
                if (Number(model.getValue(rec, "DEPTNO")) === 10) {
                    var sal = parseFloat(model.getValue(rec, "SAL")) || 0;
                    model.setValue(rec, "SAL", String(sal * 1.1));
                }
            });
            ~~~

            Key points:
            - Model values are **strings** (already using the column format mask); convert them before doing math. With localized
              masks (1.234,56), use «apex.locale.toNumber» instead of «parseFloat».
            - Changed rows are flagged and saved by the **Interactive Grid - Automatic Row Processing (DML)** process when the user saves.

            With no code: in a Dynamic Action fired by an IG **column**, a **Set Value** action whose Affected Elements is another
            column changes the value in the current row.

            :::atencao
            The column must be editable. **Query Only** or read-only columns are not saved, and the IG must have **Editable = On**
            for changes to be stored.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ig-salvar-programaticamente',
    tema: 'relatorios',
    ver: ['interactive-grid', 'eventos-javascript'],
    pt: {
        q: 'Como salvo o Interactive Grid por JavaScript e executo algo depois do save?',
        tags: ['Interactive Grid', 'IG', 'salvar', 'save', 'getActions', 'invoke', 'interactivegridsave', 'Save [Interactive Grid]', 'Ajax'],
        r: `
            Invoque a ação **save** do próprio grid:

            ~~~js
            apex.region("emp").call("getActions").invoke("save");
            ~~~

            O IG grava as alterações **via Ajax**, sem submeter a página, executando o processo
            "Interactive Grid - Automatic Row Processing (DML)" e as validações ligadas à região.

            Para rodar algo **depois** de salvar, crie uma Dynamic Action com o evento **Save [Interactive Grid]** na região, ou ouça
            o evento em JavaScript:

            ~~~js
            apex.region("emp").element.on("interactivegridsave", function () {
                apex.region("totais").refresh();
            });
            ~~~

            Outras ações úteis do mesmo jeito: «selection-add-row» (adiciona linha) e «edit» (liga ou desliga o modo de edição).
            Para saber se há alterações pendentes: «apex.region("emp").call("getViews", "grid").model.isChanged()».

            :::dica
            Um submit normal da página também grava as alterações pendentes do IG, porque o processo do grid roda no processamento
            da página. Use o save via Ajax quando quiser ficar na mesma tela sem recarregar.
            :::
        `
    },
    en: {
        q: 'How do I save an Interactive Grid from JavaScript and run code after saving?',
        tags: ['Interactive Grid', 'IG', 'save', 'getActions', 'invoke', 'interactivegridsave', 'Save [Interactive Grid]', 'Ajax'],
        r: `
            Invoke the grid's own **save** action:

            ~~~js
            apex.region("emp").call("getActions").invoke("save");
            ~~~

            The IG saves the changes **through Ajax**, without a page submit, running the
            "Interactive Grid - Automatic Row Processing (DML)" process and the validations tied to the region.

            To run something **after** saving, create a Dynamic Action on the **Save [Interactive Grid]** event of the region, or
            listen to the event in JavaScript:

            ~~~js
            apex.region("emp").element.on("interactivegridsave", function () {
                apex.region("totals").refresh();
            });
            ~~~

            Other handy actions work the same way: «selection-add-row» (adds a row) and «edit» (toggles edit mode).
            To check for pending changes: «apex.region("emp").call("getViews", "grid").model.isChanged()».

            :::dica
            A regular page submit also saves pending IG changes, because the grid process runs during page processing. Use the
            Ajax save when you want to stay on the same screen without reloading.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ig-personalizar-toolbar',
    tema: 'relatorios',
    ver: ['interactive-grid', 'javascript-api'],
    pt: {
        q: 'Como personalizo a toolbar do Interactive Grid (adicionar ou remover botões)?',
        tags: ['Interactive Grid', 'IG', 'toolbar', 'barra de ferramentas', 'botão', 'copyDefaultToolbar', 'Initialization JavaScript Function', 'initActions'],
        r: `
            **Sem código**: em Attributes > **Toolbar** você esconde a barra inteira ou escolhe quais controles aparecem (campo de
            busca, menu Actions, botões Reset, Save etc.).

            **Botões próprios**: use Attributes > **Initialization JavaScript Function**:

            ~~~js
            function (config) {
                var toolbar = $.apex.interactiveGrid.copyDefaultToolbar();

                toolbar.toolbarFind("actions3").controls.push({
                    type: "BUTTON",
                    label: "Aprovar",
                    action: "aprovar",
                    icon: "fa fa-check",
                    iconBeforeLabel: true,
                    hot: true
                });
                config.toolbarData = toolbar;

                config.initActions = function (actions) {
                    actions.add({
                        name: "aprovar",
                        action: function () { apex.page.submit("APROVAR"); }
                    });
                };
                return config;
            }
            ~~~

            O botão chama uma **action** (do framework apex.actions). Assim, o mesmo comando pode ser usado em menus e atalhos.
            Para **remover** um controle padrão, localize-o com «toolbarFind» e tire-o do array «controls» do grupo.

            :::dica
            Confira os grupos e ids da toolbar padrão no console: «$.apex.interactiveGrid.copyDefaultToolbar()». A aplicação de
            exemplo **Sample Interactive Grids** (App Gallery) tem vários exemplos de toolbar.
            :::
        `
    },
    en: {
        q: 'How do I customize the Interactive Grid toolbar (add or remove buttons)?',
        tags: ['Interactive Grid', 'IG', 'toolbar', 'button', 'copyDefaultToolbar', 'Initialization JavaScript Function', 'initActions'],
        r: `
            **With no code**: under Attributes > **Toolbar** you can hide the whole toolbar or pick which controls show up (search
            field, Actions menu, Reset and Save buttons, and so on).

            **Custom buttons**: use Attributes > **Initialization JavaScript Function**:

            ~~~js
            function (config) {
                var toolbar = $.apex.interactiveGrid.copyDefaultToolbar();

                toolbar.toolbarFind("actions3").controls.push({
                    type: "BUTTON",
                    label: "Approve",
                    action: "approve",
                    icon: "fa fa-check",
                    iconBeforeLabel: true,
                    hot: true
                });
                config.toolbarData = toolbar;

                config.initActions = function (actions) {
                    actions.add({
                        name: "approve",
                        action: function () { apex.page.submit("APPROVE"); }
                    });
                };
                return config;
            }
            ~~~

            The button calls an **action** (from the apex.actions framework), so the same command can also be used in menus and
            keyboard shortcuts. To **remove** a default control, find it with «toolbarFind» and take it out of the group's
            «controls» array.

            :::dica
            Inspect the default toolbar groups and ids in the console: «$.apex.interactiveGrid.copyDefaultToolbar()». The
            **Sample Interactive Grids** app (App Gallery) has many toolbar examples.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ig-plsql-proprio-linhas-editaveis',
    tema: 'relatorios',
    ver: ['interactive-grid', 'processos-computacoes-validacoes'],
    pt: {
        q: 'Como uso PL/SQL próprio para gravar o Interactive Grid e controlar quais linhas podem ser editadas?',
        tags: ['Interactive Grid', 'IG', 'APEX$ROW_STATUS', 'PL/SQL Code', 'DML', 'Allowed Row Operations Column', 'linha somente leitura', 'tabular form'],
        r: `
            No processo **Interactive Grid - Automatic Row Processing (DML)**, mude **Target Type** para **PL/SQL Code**. O código
            roda uma vez por linha alterada, e as colunas ficam disponíveis como bind variables. «:APEX$ROW_STATUS» indica a operação
            (C = criar, U = atualizar, D = excluir):

            ~~~plsql
            case :APEX$ROW_STATUS
                when 'C' then
                    insert into emp (ename, sal, deptno)
                    values (:ENAME, :SAL, :DEPTNO)
                    returning empno into :EMPNO;
                when 'U' then
                    update emp set ename = :ENAME, sal = :SAL, deptno = :DEPTNO
                     where empno = :EMPNO;
                when 'D' then
                    delete from emp where empno = :EMPNO;
            end case;
            ~~~

            Para controlar a edição **por linha**, crie uma coluna na query e aponte para ela em **Allowed Row Operations Column**
            (atributos de edição do IG). Ela deve retornar «U» (pode editar), «D» (pode excluir), «UD» (ambos) ou nulo (nenhum):

            ~~~sql
            select empno, ename, sal, deptno,
                   case when status = 'FECHADO' then null else 'UD' end as ops_permitidas
              from emp
            ~~~

            :::dica
            Prefira chamar um pacote («pkg_emp.salvar(...)») a escrever a lógica toda no processo: fica testável e reutilizável.
            :::
        `
    },
    en: {
        q: 'How do I use my own PL/SQL to save Interactive Grid rows, and control which rows are editable?',
        tags: ['Interactive Grid', 'IG', 'APEX$ROW_STATUS', 'PL/SQL Code', 'DML', 'Allowed Row Operations Column', 'read-only row', 'tabular form'],
        r: `
            In the **Interactive Grid - Automatic Row Processing (DML)** process, change **Target Type** to **PL/SQL Code**. The code
            runs once per changed row, and the columns are available as bind variables. «:APEX$ROW_STATUS» tells you the operation
            (C = create, U = update, D = delete):

            ~~~plsql
            case :APEX$ROW_STATUS
                when 'C' then
                    insert into emp (ename, sal, deptno)
                    values (:ENAME, :SAL, :DEPTNO)
                    returning empno into :EMPNO;
                when 'U' then
                    update emp set ename = :ENAME, sal = :SAL, deptno = :DEPTNO
                     where empno = :EMPNO;
                when 'D' then
                    delete from emp where empno = :EMPNO;
            end case;
            ~~~

            To control editing **per row**, add a column to the query and select it in **Allowed Row Operations Column** (the IG
            edit attributes). It must return «U» (can update), «D» (can delete), «UD» (both) or null (neither):

            ~~~sql
            select empno, ename, sal, deptno,
                   case when status = 'CLOSED' then null else 'UD' end as allowed_ops
              from emp
            ~~~

            :::dica
            Prefer calling a package («pkg_emp.save(...)») over writing all the logic in the process: it stays testable and reusable.
            :::
        `
    }
});

DOC.pergunta({
    id: 'coluna-link-filtrar-ir-url',
    tema: 'relatorios',
    ver: ['interactive-report', 'urls-do-apex', 'classic-report'],
    pt: {
        q: 'Como transformo uma coluna em link e filtro um Interactive Report pela URL?',
        tags: ['link', 'coluna link', 'Interactive Report', 'IR', 'filtro pela URL', 'IR_', 'IRC_', 'RIR', 'CIR', 'apex_ir.add_filter'],
        r: `
            **Coluna como link**: selecione a coluna e mude **Type** para **Link**. No **Target**, defina a página (ex.: 2),
            **Set Items** «P2_ID» = «#EMPNO#» e **Clear Cache** = 2. Em **Link Text** use «#ENAME#» ou um ícone, como
            «<span class="fa fa-edit"></span>».

            **Filtrar um IR pela URL**: na página de destino, passe "itens" com o prefixo **IR**:
            - «IR_DEPTNO» = 10 filtra por igualdade (o operador padrão).
            - Outros operadores vão antes do sublinhado: «IRC_ENAME» (contém), «IRGT_SAL» (maior que), «IRLT_», «IRN_» (nulo) etc.
            - Com mais de um IR na página, qualifique pelo HTML DOM ID da região: «IR[EMP]C_ENAME».
            - Em **Clear Cache**, «RIR» volta o relatório ao padrão e «CIR» limpa todas as configurações antes de aplicar o filtro.

            ~~~texto
            Clear Cache: RIR      Set Items: IR_DEPTNO = #DEPTNO#
            ~~~

            Por código (por exemplo num processo Before Header), use «apex_ir.add_filter» ou «apex_ir.reset_report».

            :::atencao
            Se montar o link em SQL com «apex_page.get_url» e HTML Expression, só desligue o escape da coluna quando o conteúdo
            for gerado por você. Dados do usuário sem escape abrem brecha para XSS.
            :::
        `
    },
    en: {
        q: 'How do I make a report column a link and filter an Interactive Report from the URL?',
        tags: ['link', 'column link', 'Interactive Report', 'IR', 'URL filter', 'IR_', 'IRC_', 'RIR', 'CIR', 'apex_ir.add_filter'],
        r: `
            **Column as a link**: select the column and set **Type** to **Link**. In the **Target**, set the page (e.g., 2),
            **Set Items** «P2_ID» = «#EMPNO#» and **Clear Cache** = 2. For **Link Text** use «#ENAME#» or an icon such as
            «<span class="fa fa-edit"></span>».

            **Filtering an IR from the URL**: on the target page, pass "items" with the **IR** prefix:
            - «IR_DEPTNO» = 10 filters by equality (the default operator).
            - Other operators go before the underscore: «IRC_ENAME» (contains), «IRGT_SAL» (greater than), «IRLT_», «IRN_» (null), etc.
            - With more than one IR on the page, qualify with the region HTML DOM ID: «IR[EMP]C_ENAME».
            - In **Clear Cache**, «RIR» resets the report to its default and «CIR» clears all settings before the filter is applied.

            ~~~texto
            Clear Cache: RIR      Set Items: IR_DEPTNO = #DEPTNO#
            ~~~

            In code (for example in a Before Header process), use «apex_ir.add_filter» or «apex_ir.reset_report».

            :::atencao
            If you build the link in SQL with «apex_page.get_url» and an HTML Expression, only turn off column escaping when you
            generate the content yourself. Unescaped user data opens the door to XSS.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ir-layout-padrao-usuarios',
    tema: 'relatorios',
    ver: ['interactive-report', 'interactive-grid'],
    pt: {
        q: 'Como salvo um layout padrão do Interactive Report para todos os usuários?',
        tags: ['Interactive Report', 'IR', 'relatório padrão', 'Primary', 'Alternative', 'Save Report', 'default report', 'layout', 'reset'],
        r: `
            1. Execute a página como desenvolvedor e ajuste colunas, filtros, ordenação, agregações etc.
            2. Abra **Actions > Report > Save Report**.
            3. Em **Save**, escolha **As Default Report Settings**:
              - **Primary**: o layout que todos os usuários veem ao abrir o relatório.
              - **Alternative**: um layout adicional com nome, que os usuários escolhem na lista de relatórios.

            Os usuários podem continuar salvando seus relatórios **privados** (e públicos, se você permitir).

            Pegadinhas comuns:
            - Uma coluna nova adicionada depois pode ficar **oculta** nos relatórios já salvos, até o usuário fazer **Reset**.
            - Para forçar o padrão, use «RIR» no Clear Cache do link ou «apex_ir.reset_report» por código.
            - O Interactive Grid tem a mesma ideia em **Actions > Report > Save As** (Primary, Alternative, Public).

            :::dica
            Defina o layout Primary antes de liberar o app. Assim os usuários já começam com colunas e ordenação que fazem sentido.
            :::
        `
    },
    en: {
        q: 'How do I save a default Interactive Report layout for all users?',
        tags: ['Interactive Report', 'IR', 'default report', 'Primary', 'Alternative', 'Save Report', 'layout', 'reset'],
        r: `
            1. Run the page as a developer and set up columns, filters, sorting, aggregates and so on.
            2. Open **Actions > Report > Save Report**.
            3. Under **Save**, choose **As Default Report Settings**:
              - **Primary**: the layout every user sees when opening the report.
              - **Alternative**: an additional named layout that users pick from the report list.

            Users can still save their own **private** reports (and public ones, if you allow it).

            Common gotchas:
            - A column added later may stay **hidden** in already saved reports until the user clicks **Reset**.
            - To force the default, use «RIR» in the link's Clear Cache or «apex_ir.reset_report» in code.
            - The Interactive Grid has the same idea under **Actions > Report > Save As** (Primary, Alternative, Public).

            :::dica
            Define the Primary layout before releasing the app, so users start with sensible columns and sorting.
            :::
        `
    }
});

DOC.pergunta({
    id: 'checkbox-selecionar-linhas-relatorio',
    tema: 'relatorios',
    ver: ['interactive-report', 'interactive-grid', 'classic-report'],
    pt: {
        q: 'Como coloco checkbox para selecionar várias linhas num relatório?',
        tags: ['checkbox', 'seleção múltipla', 'Row Selector', 'Interactive Report', 'Interactive Grid', 'APEX_ITEM', 'g_f01', 'selecionar linhas'],
        r: `
            Depende do tipo de relatório e da versão:

            - **Interactive Report no 26.1**: crie uma coluna do tipo **Row Selector** (clique direito em Columns). Ela permite
              seleção múltipla, "selecionar todos" e grava as chaves primárias selecionadas, separadas por dois-pontos, num item de
              página que você indica. O APEX mantém a seleção durante a paginação.
            - **Interactive Grid**: o seletor de linhas já vem pronto. Leia a seleção como em
              [linhas selecionadas do IG](#/faq/ig-linhas-selecionadas). Para quem só precisa selecionar, um IG somente leitura resolve
              bem em versões anteriores ao 26.1.
            - **Classic Report e versões antigas**: o padrão legado é gerar o checkbox na query com «apex_item.checkbox2(1, empno)»
              e percorrer «apex_application.g_f01» num processo. O pacote APEX_ITEM é **legado**: evite em desenvolvimento novo.

            Depois, no servidor, transforme a lista do item em linhas:

            ~~~sql
            select column_value as empno
              from table(apex_string.split(:P1_SELECIONADOS, ':'))
            ~~~

            :::novo No 26.1
            O Row Selector do IR funciona nas visões Report, Icon e Detail e permite copiar as linhas selecionadas para a área de
            transferência.
            :::
        `
    },
    en: {
        q: 'How do I add checkboxes to select multiple rows in a report?',
        tags: ['checkbox', 'multi select', 'Row Selector', 'Interactive Report', 'Interactive Grid', 'APEX_ITEM', 'g_f01', 'select rows'],
        r: `
            It depends on the report type and the release:

            - **Interactive Report in 26.1**: create a **Row Selector** column (right-click Columns). It supports multi-select and
              "select all", and stores the selected primary keys, colon-delimited, in a page item you choose. APEX keeps the
              selection across pagination.
            - **Interactive Grid**: the row selector is built in. Read the selection as shown in
              [IG selected rows](#/faq/ig-linhas-selecionadas). If you only need selection, a read-only IG works well before 26.1.
            - **Classic Report and older releases**: the legacy pattern generates the checkbox in the query with
              «apex_item.checkbox2(1, empno)» and loops over «apex_application.g_f01» in a process. APEX_ITEM is **legacy**:
              avoid it in new development.

            Then, on the server, turn the item list into rows:

            ~~~sql
            select column_value as empno
              from table(apex_string.split(:P1_SELECTED, ':'))
            ~~~

            :::novo In 26.1
            The IR Row Selector works in the Report, Icon and Detail views and can copy the selected rows to the clipboard.
            :::
        `
    }
});

DOC.pergunta({
    id: 'chamar-plsql-ajax-javascript',
    tema: 'dinamico',
    destaque: true,
    ver: ['ajax-callbacks', 'javascript-api', 'apex-json'],
    pt: {
        q: 'Como chamo um processo PL/SQL via AJAX e recebo o resultado em JavaScript?',
        tags: ['AJAX', 'Ajax Callback', 'apex.server.process', 'x01', 'g_x01', 'APEX_JSON', 'Application Process', 'promise', 'chamar PL/SQL'],
        r: `
            1. Crie um processo com **Point = Ajax Callback** na página (ou um Application Process, para usar em várias páginas).
            2. Chame-o com «apex.server.process», que devolve uma *promise*.

            ~~~js
            apex.server.process("BUSCAR_SALARIO", {
                x01: apex.item("P1_EMPNO").getValue()
            }).done(function (data) {
                apex.item("P1_SAL").setValue(data.sal);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                apex.message.alert("Erro: " + errorThrown);
            });
            ~~~

            ~~~plsql
            -- Processo Ajax Callback "BUSCAR_SALARIO"
            declare
                l_sal emp.sal%type;
            begin
                select sal into l_sal from emp where empno = to_number(apex_application.g_x01);
                apex_json.open_object;
                apex_json.write('sal', l_sal);
                apex_json.close_object;
            end;
            ~~~

            Parâmetros úteis:
            - «x01» a «x10»: valores avulsos, lidos com «apex_application.g_x01» etc.
            - «pageItems: "#P1_A,#P1_B"»: grava itens no session state antes de o processo rodar (aí você usa «:P1_A»).
            - «f01» a «f20»: arrays, lidos com «apex_application.g_f01».

            :::dica
            Para casos simples, a Dynamic Action **Execute Server-side Code** (com Items to Submit e Items to Return) faz o mesmo
            sem uma linha de JavaScript.
            :::
        `
    },
    en: {
        q: 'How do I call PL/SQL via AJAX and get the result back in JavaScript?',
        tags: ['AJAX', 'Ajax Callback', 'apex.server.process', 'x01', 'g_x01', 'APEX_JSON', 'Application Process', 'promise', 'call PL/SQL'],
        r: `
            1. Create a process with **Point = Ajax Callback** on the page (or an Application Process, to reuse it on many pages).
            2. Call it with «apex.server.process», which returns a *promise*.

            ~~~js
            apex.server.process("GET_SALARY", {
                x01: apex.item("P1_EMPNO").getValue()
            }).done(function (data) {
                apex.item("P1_SAL").setValue(data.sal);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                apex.message.alert("Error: " + errorThrown);
            });
            ~~~

            ~~~plsql
            -- Ajax Callback process "GET_SALARY"
            declare
                l_sal emp.sal%type;
            begin
                select sal into l_sal from emp where empno = to_number(apex_application.g_x01);
                apex_json.open_object;
                apex_json.write('sal', l_sal);
                apex_json.close_object;
            end;
            ~~~

            Useful parameters:
            - «x01» to «x10»: single values, read with «apex_application.g_x01» and so on.
            - «pageItems: "#P1_A,#P1_B"»: saves items to session state before the process runs (then you use «:P1_A»).
            - «f01» to «f20»: arrays, read with «apex_application.g_f01».

            :::dica
            For simple cases, the **Execute Server-side Code** Dynamic Action (with Items to Submit and Items to Return) does the
            same without a single line of JavaScript.
            :::
        `
    }
});

DOC.pergunta({
    id: 'mostrar-ocultar-conforme-valor',
    tema: 'dinamico',
    ver: ['dynamic-actions', 'processos-computacoes-validacoes'],
    pt: {
        q: 'Como mostro ou oculto itens e regiões conforme o valor de outro item?',
        tags: ['mostrar', 'ocultar', 'show', 'hide', 'Dynamic Action', 'Client-side Condition', 'Fire on Initialization', 'Server-side Condition', 'condicional'],
        r: `
            **No navegador (muda na hora)**: crie uma Dynamic Action:
            - Event: **Change**, Selection Type: Item(s), Item: «P1_TIPO».
            - **Client-side Condition**: Item = Value, valor «PJ».
            - True action: **Show** (itens ou regiões afetados). False action: **Hide**.
            - Deixe **Fire on Initialization = On** nas ações para que o estado correto valha também ao carregar a página.

            **Na renderização (no servidor)**: a **Server-side Condition** do componente decide se ele é gerado. Um item que não foi
            renderizado não aparece e também **não é submetido**.

            ~~~plsql
            -- Server-side Condition do tipo Expression (PL/SQL)
            :P1_TIPO = 'PJ' and apex_authorization.is_authorized('ADMIN')
            ~~~

            :::atencao
            Esconder no navegador não muda o servidor. Validações de itens que podem ficar ocultos precisam de uma Server-side
            Condition equivalente (ex.: só valida o CNPJ quando «:P1_TIPO = 'PJ'»), senão falham em campos que o usuário nem vê.
            :::
        `
    },
    en: {
        q: 'How do I show or hide items and regions based on another item value?',
        tags: ['show', 'hide', 'Dynamic Action', 'Client-side Condition', 'Fire on Initialization', 'Server-side Condition', 'conditional'],
        r: `
            **In the browser (changes instantly)**: create a Dynamic Action:
            - Event: **Change**, Selection Type: Item(s), Item: «P1_TYPE».
            - **Client-side Condition**: Item = Value, value «CORP».
            - True action: **Show** (the affected items or regions). False action: **Hide**.
            - Keep **Fire on Initialization = On** on the actions so the right state also applies when the page loads.

            **At render time (on the server)**: the component's **Server-side Condition** decides whether it is generated at all.
            An item that was not rendered is not shown and is **not submitted** either.

            ~~~plsql
            -- Server-side Condition of type Expression (PL/SQL)
            :P1_TYPE = 'CORP' and apex_authorization.is_authorized('ADMIN')
            ~~~

            :::atencao
            Hiding something in the browser does not change the server. Validations on items that may be hidden need a matching
            Server-side Condition (e.g., only validate the tax ID when «:P1_TYPE = 'CORP'»), otherwise they fail on fields the
            user cannot even see.
            :::
        `
    }
});

DOC.pergunta({
    id: 'refresh-apos-fechar-dialogo',
    tema: 'dinamico',
    destaque: true,
    ver: ['paginas-modais', 'eventos-javascript', 'dynamic-actions'],
    pt: {
        q: 'Como atualizo um relatório ou região depois que um diálogo modal fecha?',
        tags: ['modal', 'diálogo', 'Dialog Closed', 'refresh', 'atualizar região', 'Close Dialog', 'apexafterclosedialog', 'retornar valores'],
        r: `
            1. Na **página modal**, feche com o processo ou a Dynamic Action **Close Dialog** (opcionalmente com **Items to Return**,
               ex.: «P2_ID»).
            2. Na **página que abriu o diálogo**, crie uma Dynamic Action com o evento **Dialog Closed**:
              - Selection Type: a **região** que contém o link (relatório) ou o **botão** que abriu o modal.
              - Se não souber qual elemento abriu o diálogo, use Selection Type **JavaScript Expression** com o valor «window».
            3. True action: **Refresh** da região. Os valores devolvidos ficam em «this.data.P2_ID» numa ação JavaScript.

            Equivalente em código:

            ~~~js
            apex.jQuery(window).on("apexafterclosedialog", function () {
                apex.region("pedidos").refresh();
            });
            ~~~

            Existe também o evento **Dialog Closed or Canceled** («apexafterclosecanceldialog»), que dispara até quando o usuário
            fecha o modal pelo X ou pelo botão Cancel.

            :::atencao
            Se a página modal terminar com um **branch** para outra página em vez de **Close Dialog**, o evento nunca dispara: o
            modal apenas navega por dentro. Use Close Dialog depois do processamento.
            :::
        `
    },
    en: {
        q: 'How do I refresh a report or region after a modal dialog closes?',
        tags: ['modal', 'dialog', 'Dialog Closed', 'refresh', 'refresh region', 'Close Dialog', 'apexafterclosedialog', 'return values'],
        r: `
            1. On the **modal page**, close it with the **Close Dialog** process or Dynamic Action (optionally with **Items to Return**,
               e.g., «P2_ID»).
            2. On the **page that opened the dialog**, create a Dynamic Action on the **Dialog Closed** event:
              - Selection Type: the **region** containing the link (report) or the **button** that opened the modal.
              - If you are not sure which element opened the dialog, use Selection Type **JavaScript Expression** with «window».
            3. True action: **Refresh** the region. Returned values are available as «this.data.P2_ID» in a JavaScript action.

            The code equivalent:

            ~~~js
            apex.jQuery(window).on("apexafterclosedialog", function () {
                apex.region("orders").refresh();
            });
            ~~~

            There is also a **Dialog Closed or Canceled** event («apexafterclosecanceldialog»), which fires even when the user
            closes the modal with the X or a Cancel button.

            :::atencao
            If the modal page ends with a **branch** to another page instead of **Close Dialog**, the event never fires: the modal
            just navigates internally. Use Close Dialog after processing.
            :::
        `
    }
});

DOC.pergunta({
    id: 'abrir-modal-redirecionar-submeter-js',
    tema: 'dinamico',
    ver: ['paginas-modais', 'javascript-api', 'botoes-e-branches'],
    pt: {
        q: 'Como abro uma página modal, redireciono ou submeto a página via JavaScript?',
        tags: ['abrir modal', 'redirect', 'apex.navigation.redirect', 'apex.page.submit', 'apex_page.get_url', 'checksum', 'JavaScript', 'submeter'],
        r: `
            **Abrir modal ou redirecionar**: URLs de páginas modais carregam checksum e a chamada do diálogo, então precisam ser
            **geradas no servidor**. Um padrão comum:

            ~~~plsql
            -- DA "Execute Server-side Code"
            -- Items to Submit: P1_ID     Items to Return: P1_URL
            :P1_URL := apex_page.get_url(p_page => 2, p_items => 'P2_ID', p_values => :P1_ID);
            ~~~

            ~~~js
            // ação seguinte da mesma DA: Execute JavaScript Code
            apex.navigation.redirect(apex.item("P1_URL").getValue());
            ~~~

            Quando o destino é modal, «get_url» devolve uma URL «javascript:» que abre o diálogo, e o
            «apex.navigation.redirect» sabe executá-la. Dentro do próprio modal, «apex.navigation.dialog.close(true)» fecha o diálogo
            por JavaScript.

            **Submeter a página**:

            ~~~js
            apex.page.submit({ request: "SALVAR", showWait: true, validate: true });
            ~~~

            :::dica
            Sempre que possível, prefira o declarativo: botão com Action **Redirect to Page in this Application** ou coluna Link.
            O APEX calcula URL e checksum para você.
            :::
        `
    },
    en: {
        q: 'How do I open a modal page, redirect, or submit the page from JavaScript?',
        tags: ['open modal', 'redirect', 'apex.navigation.redirect', 'apex.page.submit', 'apex_page.get_url', 'checksum', 'JavaScript', 'submit'],
        r: `
            **Opening a modal or redirecting**: modal page URLs carry a checksum and the dialog call, so they must be **generated
            on the server**. A common pattern:

            ~~~plsql
            -- DA "Execute Server-side Code"
            -- Items to Submit: P1_ID     Items to Return: P1_URL
            :P1_URL := apex_page.get_url(p_page => 2, p_items => 'P2_ID', p_values => :P1_ID);
            ~~~

            ~~~js
            // next action of the same DA: Execute JavaScript Code
            apex.navigation.redirect(apex.item("P1_URL").getValue());
            ~~~

            When the target is modal, «get_url» returns a «javascript:» URL that opens the dialog, and «apex.navigation.redirect»
            knows how to run it. Inside the modal itself, «apex.navigation.dialog.close(true)» closes the dialog from JavaScript.

            **Submitting the page**:

            ~~~js
            apex.page.submit({ request: "SAVE", showWait: true, validate: true });
            ~~~

            :::dica
            Whenever you can, go declarative: a button with the **Redirect to Page in this Application** action, or a Link column.
            APEX builds the URL and checksum for you.
            :::
        `
    }
});

DOC.pergunta({
    id: 'lov-cascata',
    tema: 'dinamico',
    ver: ['listas-de-valores', 'itens-de-pagina'],
    pt: {
        q: 'Como faço uma LOV em cascata (ex.: Estado e Cidade)?',
        tags: ['LOV', 'cascata', 'cascading LOV', 'Parent Item', 'lista dependente', 'select list', 'Estado', 'Cidade', 'Popup LOV'],
        r: `
            No item filho (ex.: «P1_CIDADE»), escreva a query da **List of Values** usando o item pai:

            ~~~sql
            select nome as d, id as r
              from cidades
             where estado_id = :P1_ESTADO
             order by nome
            ~~~

            Depois, ainda no item filho:
            - Em **Cascading List of Values > Parent Item(s)**, informe «P1_ESTADO» (pode ser mais de um, separados por vírgula).
            - Se a query usar outros itens, coloque-os em **Items to Submit**.
            - Opcional: **Parent Required = On** evita executar a query enquanto o pai estiver vazio.

            Quando o pai muda, o APEX limpa o filho e recarrega a lista automaticamente. No **Interactive Grid** existe o mesmo
            atributo por coluna, apontando para a coluna pai.

            :::atencao
            O filho só atualiza se o pai disparar o evento **change**. Se você muda o pai por JavaScript, use
            «apex.item("P1_ESTADO").setValue(...)» e não o «.val()» do jQuery, que não dispara o evento.
            :::
        `
    },
    en: {
        q: 'How do I build cascading LOVs (e.g., State and City)?',
        tags: ['LOV', 'cascading', 'cascading LOV', 'Parent Item', 'dependent list', 'select list', 'State', 'City', 'Popup LOV'],
        r: `
            On the child item (e.g., «P1_CITY»), write the **List of Values** query using the parent item:

            ~~~sql
            select name as d, id as r
              from cities
             where state_id = :P1_STATE
             order by name
            ~~~

            Then, still on the child item:
            - Under **Cascading List of Values > Parent Item(s)**, enter «P1_STATE» (you can list several, comma-separated).
            - If the query uses other items, put them in **Items to Submit**.
            - Optional: **Parent Required = On** stops the query from running while the parent is empty.

            When the parent changes, APEX clears the child and reloads its list automatically. The **Interactive Grid** has the same
            attribute per column, pointing at the parent column.

            :::atencao
            The child only refreshes when the parent fires a **change** event. If you set the parent from JavaScript, use
            «apex.item("P1_STATE").setValue(...)», not jQuery «.val()», which does not fire the event.
            :::
        `
    }
});

DOC.pergunta({
    id: 'confirmacao-mensagem-sucesso-erro',
    tema: 'dinamico',
    ver: ['javascript-api', 'tratamento-de-erros', 'dynamic-actions'],
    pt: {
        q: 'Como mostro uma confirmação, uma mensagem de sucesso ou de erro?',
        tags: ['confirmação', 'confirm', 'mensagem de sucesso', 'mensagem de erro', 'apex.message', 'showPageSuccess', 'showErrors', 'Show Success Message', 'apex_error.add_error'],
        r: `
            **Declarativo**
            - **Success Message** do processo: aparece depois do submit.
            - Ação **Confirm** (ou **Alert**) numa Dynamic Action antes de submeter.
            - No servidor, «apex_error.add_error» para erros com o mesmo visual das validações.
            - **Novo no 26.1**: as ações **Show Success Message**, **Show Error Message** e **Clear Errors**.

            A Success Message de um processo sobrevive ao redirecionamento do branch. Já as funções de «apex.message» mostram a
            mensagem na hora, sem recarregar a página, o que combina com Ajax:

            ~~~js
            apex.message.confirm("Excluir este registro?", function (ok) {
                if (ok) { apex.page.submit("EXCLUIR"); }
            });

            apex.message.showPageSuccess("Salvo com sucesso!");

            apex.message.clearErrors();
            apex.message.showErrors([{
                type: "error",
                location: ["page", "inline"],
                pageItem: "P1_NOME",
                message: "Informe o nome.",
                unsafe: false
            }]);
            ~~~

            :::dica
            «unsafe: false» faz o APEX escapar o texto da mensagem. Mantenha assim quando a mensagem tiver dados digitados pelo
            usuário.
            :::
        `
    },
    en: {
        q: 'How do I show a confirmation dialog or a success or error message?',
        tags: ['confirmation', 'confirm', 'success message', 'error message', 'apex.message', 'showPageSuccess', 'showErrors', 'Show Success Message', 'apex_error.add_error'],
        r: `
            **Declarative**
            - The process **Success Message**: shown after the submit.
            - A **Confirm** (or **Alert**) action in a Dynamic Action before submitting.
            - On the server, «apex_error.add_error» for errors that look like validation errors.
            - **New in 26.1**: the **Show Success Message**, **Show Error Message** and **Clear Errors** actions.

            A process Success Message survives the branch redirect. The «apex.message» functions, on the other hand, show the
            message right away without reloading the page, which suits Ajax calls:

            ~~~js
            apex.message.confirm("Delete this record?", function (ok) {
                if (ok) { apex.page.submit("DELETE"); }
            });

            apex.message.showPageSuccess("Saved successfully!");

            apex.message.clearErrors();
            apex.message.showErrors([{
                type: "error",
                location: ["page", "inline"],
                pageItem: "P1_NAME",
                message: "Please enter a name.",
                unsafe: false
            }]);
            ~~~

            :::dica
            «unsafe: false» makes APEX escape the message text. Keep it that way whenever the message contains user-entered data.
            :::
        `
    }
});

DOC.pergunta({
    id: 'mestre-detalhe-pedido-itens',
    tema: 'forms',
    ver: ['mestre-detalhe', 'interactive-grid', 'formularios'],
    pt: {
        q: 'Como crio uma página mestre-detalhe (ex.: Pedido e Itens)?',
        tags: ['mestre-detalhe', 'master detail', 'Pedido e Itens', 'Interactive Grid', 'Master Region', 'Master Column', 'chave estrangeira', 'Drill Down'],
        r: `
            Use **Create Page > Master Detail**. Há três estilos:
            - **Stacked**: dois Interactive Grids editáveis na mesma página, um acima do outro.
            - **Side by Side**: lista de mestres à esquerda e o registro selecionado com seus detalhes à direita.
            - **Drill Down**: relatório de mestres que abre uma página com o form do mestre e um IG com os detalhes.

            Como a ligação funciona:
            - No IG de detalhe, o atributo **Master Region** aponta para a região mestre.
            - Na coluna de chave estrangeira do detalhe, **Master Column** aponta para a chave do mestre.
            - Com dois IGs, o APEX grava primeiro o mestre e propaga a chave nova para as linhas de detalhe na mesma operação.

            No estilo **Drill Down** (form + IG), o processo DML do form precisa rodar **antes** do processo do IG e estar com
            **Return Primary Key(s) after Insert = On**, para que o detalhe receba a chave do pedido recém-criado.

            :::atencao
            Erros como ORA-01400 (não pode inserir NULL na FK) ou ORA-01403 ao salvar um mestre novo quase sempre indicam ordem
            errada dos processos ou a chave do mestre não sendo devolvida.
            :::
        `
    },
    en: {
        q: 'How do I build a master-detail page (e.g., Order and Items)?',
        tags: ['master detail', 'Order and Items', 'Interactive Grid', 'Master Region', 'Master Column', 'foreign key', 'Drill Down'],
        r: `
            Use **Create Page > Master Detail**. There are three styles:
            - **Stacked**: two editable Interactive Grids on the same page, one above the other.
            - **Side by Side**: a list of masters on the left and the selected record with its details on the right.
            - **Drill Down**: a master report that opens a page with the master form and an IG for the details.

            How the link works:
            - On the detail IG, the **Master Region** attribute points at the master region.
            - On the detail foreign key column, **Master Column** points at the master key.
            - With two IGs, APEX saves the master first and passes the new key to the detail rows in the same operation.

            In the **Drill Down** style (form + IG), the form DML process must run **before** the IG process and have
            **Return Primary Key(s) after Insert = On**, so the details receive the key of the newly created order.

            :::atencao
            Errors such as ORA-01400 (cannot insert NULL into the FK) or ORA-01403 when saving a new master almost always mean
            the processes run in the wrong order or the master key is not being returned.
            :::
        `
    }
});

DOC.pergunta({
    id: 'validacoes-condicionais-erro-no-campo',
    tema: 'forms',
    ver: ['processos-computacoes-validacoes', 'tratamento-de-erros'],
    pt: {
        q: 'Como faço validações (inclusive condicionais) e mostro o erro ao lado do campo?',
        tags: ['validação', 'validation', 'condicional', 'Server-side Condition', 'apex_error.add_error', 'inline', 'Value Required', 'Error Handling Function', 'constraint'],
        r: `
            Crie validações na página (Processing > Validations) e associe cada uma ao item em **Associated Item**, para que o erro
            apareça ao lado do campo. Tipos mais usados: Item is NOT NULL, Item matches Regular Expression, Rows returned,
            Expression e **Function Body (returning Error Text)**:

            ~~~plsql
            if :P1_TIPO = 'PJ' and :P1_CNPJ is null then
                return 'Informe o CNPJ para pessoa jurídica.';
            end if;
            return null;
            ~~~

            Para regras **condicionais**, use a **Server-side Condition** da validação (ex.: só quando «:P1_TIPO = 'PJ'»). O atributo
            **Value Required** do item ainda faz a checagem no navegador antes do submit.

            Dentro de processos, gere erros com a mesma aparência:

            ~~~plsql
            apex_error.add_error(
                p_message          => 'Data de entrega anterior à data do pedido.',
                p_display_location => apex_error.c_inline_with_field_and_notif,
                p_page_item_name   => 'P1_DATA_ENTREGA');
            ~~~

            :::dica
            Para trocar mensagens técnicas de constraint (ORA-00001, ORA-02292) por textos amigáveis, crie uma **Error Handling
            Function** na aplicação e use «apex_error.extract_constraint_name».
            :::
        `
    },
    en: {
        q: 'How do I add validations (including conditional ones) and show the error next to the field?',
        tags: ['validation', 'conditional', 'Server-side Condition', 'apex_error.add_error', 'inline', 'Value Required', 'Error Handling Function', 'constraint'],
        r: `
            Create validations on the page (Processing > Validations) and set **Associated Item** on each one so the error shows
            next to the field. The most used types are Item is NOT NULL, Item matches Regular Expression, Rows returned,
            Expression and **Function Body (returning Error Text)**:

            ~~~plsql
            if :P1_TYPE = 'CORP' and :P1_TAX_ID is null then
                return 'Please enter the company tax ID.';
            end if;
            return null;
            ~~~

            For **conditional** rules, use the validation's **Server-side Condition** (e.g., only when «:P1_TYPE = 'CORP'»). The
            item's **Value Required** attribute also checks in the browser before the submit.

            Inside processes, raise errors that look the same:

            ~~~plsql
            apex_error.add_error(
                p_message          => 'Delivery date is before the order date.',
                p_display_location => apex_error.c_inline_with_field_and_notif,
                p_page_item_name   => 'P1_DELIVERY_DATE');
            ~~~

            :::dica
            To turn technical constraint messages (ORA-00001, ORA-02292) into friendly text, create an application **Error Handling
            Function** and use «apex_error.extract_constraint_name».
            :::
        `
    }
});

DOC.pergunta({
    id: 'chave-primaria-apos-insert',
    tema: 'forms',
    ver: ['formularios', 'processos-computacoes-validacoes'],
    pt: {
        q: 'Como obtenho a chave primária gerada depois do insert do formulário?',
        tags: ['chave primária', 'primary key', 'ID gerado', 'Return Primary Key(s) after Insert', 'returning into', 'identity', 'sequence', 'insert'],
        r: `
            No processo **Form - Automatic Row Processing (DML)** da região Form, ligue **Return Primary Key(s) after Insert**.
            Depois do insert, o item da chave (ex.: «P2_ID») fica preenchido, venha o valor de uma coluna **identity**, de um
            **default com sequence** ou de uma trigger. Processos e branches seguintes já podem usar «:P2_ID», por exemplo para
            redirecionar à página de detalhes do registro criado.

            Em PL/SQL próprio, use a cláusula «returning»:

            ~~~plsql
            insert into pedidos (cliente_id, data_pedido)
            values (:P2_CLIENTE_ID, sysdate)
            returning id into :P2_ID;
            ~~~

            O mesmo «returning ... into :COLUNA» funciona no código PL/SQL de um Interactive Grid, para devolver a chave da linha
            nova ao grid.

            :::atencao
            Os processos que dependem da chave precisam vir **depois** do processo DML na sequência de processamento. E o item da
            chave deve ser o **Primary Key** da região Form (atributo Primary Key do item).
            :::
        `
    },
    en: {
        q: 'How do I get the generated primary key after a form insert?',
        tags: ['primary key', 'generated ID', 'Return Primary Key(s) after Insert', 'returning into', 'identity', 'sequence', 'insert'],
        r: `
            In the Form region's **Form - Automatic Row Processing (DML)** process, turn on **Return Primary Key(s) after Insert**.
            After the insert, the key item (e.g., «P2_ID») is filled in, whether the value comes from an **identity** column, a
            **sequence default** or a trigger. Later processes and branches can use «:P2_ID», for example to redirect to the new
            record's detail page.

            In your own PL/SQL, use the «returning» clause:

            ~~~plsql
            insert into orders (customer_id, order_date)
            values (:P2_CUSTOMER_ID, sysdate)
            returning id into :P2_ID;
            ~~~

            The same «returning ... into :COLUMN» works in an Interactive Grid's PL/SQL code, to hand the new row's key back to
            the grid.

            :::atencao
            Processes that depend on the key must come **after** the DML process in the processing sequence. And the key item must
            be the Form region's **Primary Key** (the item's Primary Key attribute).
            :::
        `
    }
});

DOC.pergunta({
    id: 'formato-data-numero-brasileiro',
    tema: 'forms',
    ver: ['formatos-data-numero-e-fuso', 'traducao-de-aplicacoes', 'mensagens-de-texto'],
    pt: {
        q: 'Como configuro data e número no formato brasileiro (DD/MM/YYYY, vírgula decimal) e as mensagens do APEX em português?',
        tags: ['formato de data', 'DD/MM/YYYY', 'vírgula decimal', 'pt-br', 'Globalization', 'NLS', 'format mask', 'fuso horário', 'load_pt-br.sql', 'tradução'],
        r: `
            Em **Shared Components > Globalization Attributes**:
            - **Application Primary Language**: Portuguese (Brazil) «pt-br». O idioma define o NLS da sessão, o que já traz a
              **vírgula decimal** e o ponto como separador de milhar.
            - **Application Date Format**: «DD/MM/YYYY». Ajuste também **Date Time Format** (ex.: «DD/MM/YYYY HH24:MI») e os formatos
              de timestamp.
            - **Automatic Time Zone**: ligue se os usuários estiverem em fusos diferentes.

            A **Format Mask** de cada item ou coluna sobrepõe o formato da aplicação. Para números, use os elementos NLS «G» e «D»,
            como em «FM999G999G990D00», que seguem o idioma.

            **Textos do próprio APEX** (menus do IR, botões do calendário, mensagens padrão) só saem em português se o idioma
            pt-br estiver carregado na instância. O script vem no zip de instalação, em «builder/pt-br/load_pt-br.sql», e é
            executado pelo DBA. No Autonomous Database, os idiomas já vêm instalados.

            :::novo No 26.1
            O **Automatic Time Zone** passou a usar nomes de fuso (ex.: «America/Sao_Paulo») em vez de deslocamentos como «-03:00»,
            e os timestamps de expiração de sessão são gravados em **UTC**. Revise códigos que comparam esses valores com «SYSDATE».
            :::
        `
    },
    en: {
        q: 'How do I set Brazilian date and number formats (DD/MM/YYYY, decimal comma) and get APEX built-in messages in Portuguese?',
        tags: ['date format', 'DD/MM/YYYY', 'decimal comma', 'pt-br', 'Globalization', 'NLS', 'format mask', 'time zone', 'load_pt-br.sql', 'translation'],
        r: `
            Under **Shared Components > Globalization Attributes**:
            - **Application Primary Language**: Portuguese (Brazil) «pt-br». The language drives the session NLS settings, which
              gives you the **decimal comma** and the period as thousands separator.
            - **Application Date Format**: «DD/MM/YYYY». Also set **Date Time Format** (e.g., «DD/MM/YYYY HH24:MI») and the
              timestamp formats.
            - **Automatic Time Zone**: turn it on if users are in different time zones.

            Each item or column **Format Mask** overrides the application format. For numbers, use the NLS elements «G» and «D»,
            as in «FM999G999G990D00», which follow the language.

            **APEX's own texts** (IR menus, calendar buttons, default messages) only appear in Portuguese if the pt-br language is
            loaded in the instance. The script ships in the install zip as «builder/pt-br/load_pt-br.sql» and is run by the DBA.
            On Autonomous Database the languages are already installed.

            :::novo In 26.1
            **Automatic Time Zone** now uses time zone names (e.g., «America/Sao_Paulo») instead of offsets such as «-03:00», and
            session expiry timestamps are stored in **UTC**. Review code that compares these values with «SYSDATE».
            :::
        `
    }
});

DOC.pergunta({
    id: 'upload-arquivo-tabela',
    tema: 'arquivos',
    ver: ['upload-download-arquivos', 'formularios'],
    pt: {
        q: 'Como faço upload de um arquivo e salvo na minha tabela?',
        tags: ['upload', 'File Upload', 'File Browse', 'Image Upload', 'BLOB', 'APEX_APPLICATION_TEMP_FILES', 'arquivo', 'anexo', 'Allow Multiple Files'],
        r: `
            **Form sobre a sua tabela (declarativo)**: use um item **File Upload** (ou **Image Upload**, desde o 23.2, para imagens)
            com Storage Type **BLOB column specified in Item Source**. Informe as colunas de MIME type, nome do arquivo e data de
            atualização, e o processo DML do form grava tudo sem código.

            **Por programação**: use Storage Type **Table APEX_APPLICATION_TEMP_FILES** e copie o arquivo num processo:

            ~~~plsql
            insert into documentos (nome_arquivo, mime_type, conteudo)
            select filename, mime_type, blob_content
              from apex_application_temp_files
             where name in (select column_value
                              from table(apex_string.split(:P1_ARQUIVO, ':')));
            ~~~

            O «apex_string.split» cobre também o caso de **Allow Multiple Files**, em que o item recebe vários nomes separados
            por dois-pontos.

            :::atencao
            O atributo **Purge File At** (End of Request ou End of Session) define quando o arquivo some da tabela temporária. Se
            o processo roda numa requisição posterior com "End of Request", o select não encontra nada (ORA-01403 ou nenhuma linha
            inserida).
            :::

            :::novo No 26.1
            Os itens File Upload e Image Upload ganharam a opção **Allow Copy and Paste**, para colar arquivos direto da área de
            transferência.
            :::
        `
    },
    en: {
        q: 'How do I upload a file and store it in my own table?',
        tags: ['upload', 'File Upload', 'File Browse', 'Image Upload', 'BLOB', 'APEX_APPLICATION_TEMP_FILES', 'file', 'attachment', 'Allow Multiple Files'],
        r: `
            **Form on your table (declarative)**: use a **File Upload** item (or **Image Upload**, since 23.2, for images) with
            Storage Type **BLOB column specified in Item Source**. Set the MIME type, filename and last-updated columns, and the
            form DML process stores everything with no code.

            **In code**: use Storage Type **Table APEX_APPLICATION_TEMP_FILES** and copy the file in a process:

            ~~~plsql
            insert into documents (file_name, mime_type, content)
            select filename, mime_type, blob_content
              from apex_application_temp_files
             where name in (select column_value
                              from table(apex_string.split(:P1_FILE, ':')));
            ~~~

            The «apex_string.split» also covers **Allow Multiple Files**, where the item receives several colon-separated names.

            :::atencao
            The **Purge File At** attribute (End of Request or End of Session) controls when the file leaves the temporary table.
            If your process runs in a later request with "End of Request", the select finds nothing (ORA-01403 or no rows inserted).
            :::

            :::novo In 26.1
            File Upload and Image Upload items gained an **Allow Copy and Paste** option, so users can paste files straight from
            the clipboard.
            :::
        `
    }
});

DOC.pergunta({
    id: 'download-blob-exibir-imagem',
    tema: 'arquivos',
    ver: ['upload-download-arquivos', 'classic-report'],
    pt: {
        q: 'Como faço download de um BLOB ou exibo uma imagem guardada no banco?',
        tags: ['download', 'BLOB', 'imagem', 'Download BLOB', 'Display Image', 'APEX_HTTP.DOWNLOAD', 'wpg_docload', 'arquivo', 'Download process'],
        r: `
            **Em relatórios**: mude o tipo da coluna para **Download BLOB** ou **Display Image**. A query deve trazer
            «dbms_lob.getlength(conteudo) as conteudo», e nos atributos você informa tabela, coluna BLOB, chave primária, MIME type
            e nome do arquivo. Em formulários, o item **Display Image** mostra a imagem de uma coluna BLOB.

            **Desde o 24.1**: há o processo e a Dynamic Action **Download**, totalmente declarativos, e a API «APEX_HTTP.DOWNLOAD»:

            ~~~plsql
            declare
                l_doc documentos%rowtype;
            begin
                select * into l_doc from documentos where id = :P1_ID;
                apex_http.download(
                    p_blob         => l_doc.conteudo,
                    p_content_type => l_doc.mime_type,
                    p_filename     => l_doc.nome_arquivo);
            end;
            ~~~

            O procedimento limpa o buffer de saída e chama «apex_application.stop_apex_engine» depois do download. Use
            «p_is_inline => true» para abrir no navegador (PDF, imagem) em vez de baixar.

            **Versões anteriores**: «owa_util.mime_header» + «wpg_docload.download_file» + «apex_application.stop_apex_engine»,
            normalmente num Application Process chamado por URL.

            :::atencao
            Confira a autorização do processo de download: sem ela, qualquer usuário que adivinhe um ID baixa arquivos de outros.
            :::
        `
    },
    en: {
        q: 'How do I download a BLOB or display an image stored in the database?',
        tags: ['download', 'BLOB', 'image', 'Download BLOB', 'Display Image', 'APEX_HTTP.DOWNLOAD', 'wpg_docload', 'file', 'Download process'],
        r: `
            **In reports**: set the column type to **Download BLOB** or **Display Image**. The query must return
            «dbms_lob.getlength(content) as content», and in the attributes you set the table, BLOB column, primary key, MIME type
            and filename. In forms, the **Display Image** item shows an image from a BLOB column.

            **Since 24.1**: there is a fully declarative **Download** process and Dynamic Action, plus the «APEX_HTTP.DOWNLOAD» API:

            ~~~plsql
            declare
                l_doc documents%rowtype;
            begin
                select * into l_doc from documents where id = :P1_ID;
                apex_http.download(
                    p_blob         => l_doc.content,
                    p_content_type => l_doc.mime_type,
                    p_filename     => l_doc.file_name);
            end;
            ~~~

            The procedure clears the output buffer and calls «apex_application.stop_apex_engine» after the download. Use
            «p_is_inline => true» to open the file in the browser (PDF, image) instead of downloading it.

            **Older releases**: «owa_util.mime_header» + «wpg_docload.download_file» + «apex_application.stop_apex_engine»,
            usually in an Application Process called through a URL.

            :::atencao
            Check the download process authorization: without it, any user who guesses an ID can download someone else's files.
            :::
        `
    }
});

DOC.pergunta({
    id: 'importar-excel-csv',
    tema: 'arquivos',
    ver: ['carga-de-dados', 'upload-download-arquivos'],
    pt: {
        q: 'Como importo uma planilha Excel ou um CSV para uma tabela?',
        tags: ['importar', 'Excel', 'XLSX', 'CSV', 'planilha', 'Data Loading', 'Data Load Definition', 'APEX_DATA_PARSER', 'APEX_DATA_LOADING', 'carga'],
        r: `
            **Para o usuário final**: crie uma página com **Create Page > Data Loading**. Ela gera uma **Data Load Definition**
            (Shared Components) que aceita CSV, XLSX, JSON e XML, com mapeamento de colunas, lookups e transformações. Por código,
            a mesma definição roda com «apex_data_loading.load_data».

            **Com lógica própria**: faça o upload para «APEX_APPLICATION_TEMP_FILES» e leia o arquivo com «APEX_DATA_PARSER»:

            ~~~plsql
            insert into stage_vendas (cliente, valor)
            select p.col001, to_number(p.col002)
              from apex_application_temp_files f,
                   table(apex_data_parser.parse(
                             p_content   => f.blob_content,
                             p_file_name => f.filename,
                             p_skip_rows => 1)) p
             where f.name = :P1_ARQUIVO;
            ~~~

            O parser detecta o formato pela extensão do arquivo e devolve até **300 colunas** VARCHAR2 (col001 a col300). Converta
            tipos explicitamente e atenção ao separador decimal do arquivo. Para XLSX com várias abas, informe a planilha em «p_xlsx_sheet_name».

            :::dica
            Para cargas pontuais feitas pelo desenvolvedor, não precisa de página: use **SQL Workshop > Data Workshop > Load Data**.
            :::
        `
    },
    en: {
        q: 'How do I import an Excel or CSV file into a table?',
        tags: ['import', 'Excel', 'XLSX', 'CSV', 'spreadsheet', 'Data Loading', 'Data Load Definition', 'APEX_DATA_PARSER', 'APEX_DATA_LOADING', 'upload'],
        r: `
            **For end users**: create a page with **Create Page > Data Loading**. It generates a **Data Load Definition** (Shared
            Components) that accepts CSV, XLSX, JSON and XML, with column mapping, lookups and transformations. In code, the same
            definition runs with «apex_data_loading.load_data».

            **With custom logic**: upload to «APEX_APPLICATION_TEMP_FILES» and read the file with «APEX_DATA_PARSER»:

            ~~~plsql
            insert into stage_sales (customer, amount)
            select p.col001, to_number(p.col002)
              from apex_application_temp_files f,
                   table(apex_data_parser.parse(
                             p_content   => f.blob_content,
                             p_file_name => f.filename,
                             p_skip_rows => 1)) p
             where f.name = :P1_FILE;
            ~~~

            The parser detects the format from the file extension and returns up to **300 VARCHAR2 columns** (col001 to col300).
            Convert data types explicitly. For XLSX files with several sheets, pass the sheet in «p_xlsx_sheet_name».

            :::dica
            For one-off loads done by a developer you do not need a page: use **SQL Workshop > Data Workshop > Load Data**.
            :::
        `
    }
});

DOC.pergunta({
    id: 'enviar-email-apex',
    tema: 'arquivos',
    ver: ['apex-mail', 'administracao-instancia'],
    pt: {
        q: 'Como envio e-mail pelo APEX?',
        tags: ['e-mail', 'email', 'APEX_MAIL', 'SMTP', 'Send E-Mail', 'Email Templates', 'anexo', 'add_attachment', 'push_queue', 'OCI Email Delivery'],
        r: `
            **1. Configure o SMTP**
            - On-premises: Administration Services > Manage Instance > Instance Settings > **Email** (host, porta, TLS, usuário e senha).
            - Autonomous Database: via «apex_instance_admin.set_parameter» («SMTP_HOST_ADDRESS», «SMTP_USERNAME», «SMTP_PASSWORD»),
              normalmente com o **OCI Email Delivery** e um remetente aprovado.
            - **Novo no 26.1**: credenciais SMTP também podem ser definidas por **workspace** (Workspace Preferences).

            **2. Envie**: declarativamente com o processo **Send E-Mail** (que pode usar um **Email Template** de Shared Components)
            ou em PL/SQL:

            ~~~plsql
            apex_mail.send(
                p_to        => :P1_EMAIL,
                p_from      => 'nao-responda@empresa.com.br',
                p_subj      => 'Pedido aprovado',
                p_body      => 'Seu pedido foi aprovado.',
                p_body_html => '<p>Seu pedido foi <b>aprovado</b>.</p>');

            apex_mail.push_queue;  -- opcional: envia agora, sem esperar o job
            ~~~

            Para anexos, use a versão função de «apex_mail.send» (que retorna o id da mensagem) e chame «apex_mail.add_attachment».

            :::atencao
            Fora de uma sessão do APEX (job do scheduler, script SQL), chame antes «apex_util.set_workspace('MEU_WS')». Sem isso, o
            APEX_MAIL não sabe a qual workspace o e-mail pertence e falha.
            :::
        `
    },
    en: {
        q: 'How do I send e-mail from APEX?',
        tags: ['e-mail', 'email', 'APEX_MAIL', 'SMTP', 'Send E-Mail', 'Email Templates', 'attachment', 'add_attachment', 'push_queue', 'OCI Email Delivery'],
        r: `
            **1. Configure SMTP**
            - On-premises: Administration Services > Manage Instance > Instance Settings > **Email** (host, port, TLS, user and password).
            - Autonomous Database: through «apex_instance_admin.set_parameter» («SMTP_HOST_ADDRESS», «SMTP_USERNAME», «SMTP_PASSWORD»),
              usually with **OCI Email Delivery** and an approved sender.
            - **New in 26.1**: SMTP credentials can also be set per **workspace** (Workspace Preferences).

            **2. Send**: declaratively with the **Send E-Mail** process (which can use an **Email Template** from Shared Components)
            or in PL/SQL:

            ~~~plsql
            apex_mail.send(
                p_to        => :P1_EMAIL,
                p_from      => 'no-reply@company.com',
                p_subj      => 'Order approved',
                p_body      => 'Your order was approved.',
                p_body_html => '<p>Your order was <b>approved</b>.</p>');

            apex_mail.push_queue;  -- optional: send now, without waiting for the job
            ~~~

            For attachments, use the function form of «apex_mail.send» (it returns the message id) and call «apex_mail.add_attachment».

            :::atencao
            Outside an APEX session (scheduler job, SQL script), call «apex_util.set_workspace('MY_WS')» first. Without it, APEX_MAIL
            does not know which workspace the e-mail belongs to and fails.
            :::
        `
    }
});

DOC.pergunta({
    id: 'email-nao-chega',
    tema: 'arquivos',
    ver: ['apex-mail', 'administracao-instancia'],
    pt: {
        q: 'O e-mail enviado pelo APEX não chega. Como investigo?',
        tags: ['e-mail não chega', 'APEX_MAIL_QUEUE', 'APEX_MAIL_LOG', 'mail_send_error', 'ORACLE_APEX_MAIL_QUEUE', 'SMTP', 'ORA-24247', 'ORA-29024', 'spam'],
        r: `
            O «apex_mail.send» só coloca a mensagem numa **fila**. Quem envia de fato é o job **ORACLE_APEX_MAIL_QUEUE**. Por isso,
            "não deu erro" não significa "foi enviado".

            Onde olhar:

            ~~~sql
            -- mensagens ainda na fila, com o erro da última tentativa
            select mail_to, mail_subj, mail_send_count, mail_send_error
              from apex_mail_queue;

            -- mensagens já processadas
            select * from apex_mail_log;
            ~~~

            Chamar «apex_mail.push_queue» numa sessão SQL também mostra o erro na hora. Pelo navegador, veja Administration Services >
            Manage Instance > **Mail Queue**.

            Causas mais comuns:
            - **ORA-24247**: falta ACL de rede para o host e a porta SMTP.
            - **ORA-29024**: falta o certificado no wallet para a conexão TLS.
            - Modo TLS errado para a porta (ex.: STARTTLS na 587).
            - Usuário ou senha SMTP inválidos.
            - Remetente não aprovado (OCI Email Delivery exige *approved senders*).
            - Mensagem entregue, mas indo para o **spam** por falta de SPF/DKIM no domínio do remetente.

            :::dica
            Veja a pergunta sobre [ORA-24247 e ORA-29024](#/faq/ora-24247-ora-29024-acl-wallet) para corrigir ACL e wallet.
            :::
        `
    },
    en: {
        q: 'My APEX e-mails are not arriving. How do I troubleshoot?',
        tags: ['e-mail not arriving', 'APEX_MAIL_QUEUE', 'APEX_MAIL_LOG', 'mail_send_error', 'ORACLE_APEX_MAIL_QUEUE', 'SMTP', 'ORA-24247', 'ORA-29024', 'spam'],
        r: `
            «apex_mail.send» only puts the message in a **queue**. The actual sending is done by the **ORACLE_APEX_MAIL_QUEUE** job,
            so "no error" does not mean "sent".

            Where to look:

            ~~~sql
            -- messages still queued, with the last attempt's error
            select mail_to, mail_subj, mail_send_count, mail_send_error
              from apex_mail_queue;

            -- messages already processed
            select * from apex_mail_log;
            ~~~

            Calling «apex_mail.push_queue» in a SQL session also shows the error right away. In the browser, check Administration
            Services > Manage Instance > **Mail Queue**.

            The usual causes:
            - **ORA-24247**: no network ACL for the SMTP host and port.
            - **ORA-29024**: the certificate is missing from the wallet for the TLS connection.
            - Wrong TLS mode for the port (e.g., STARTTLS on 587).
            - Invalid SMTP user or password.
            - Sender not approved (OCI Email Delivery requires *approved senders*).
            - Delivered but landing in **spam** because the sender domain lacks SPF/DKIM.

            :::dica
            See the question on [ORA-24247 and ORA-29024](#/faq/ora-24247-ora-29024-acl-wallet) to fix the ACL and the wallet.
            :::
        `
    }
});

DOC.pergunta({
    id: 'gerar-pdf-apex',
    tema: 'arquivos',
    ver: ['impressao-e-exportacao'],
    pt: {
        q: 'Como gero PDF (relatório, nota, contrato) no APEX?',
        tags: ['PDF', 'relatório', 'impressão', 'Document Generator', 'APEX_PRINT', 'BI Publisher', 'APEX Office Print', 'Report Layout', 'Print Report'],
        r: `
            Há quatro caminhos, do mais simples ao mais completo:

            1. **Download nativo em PDF** de Interactive Report, Interactive Grid e Classic Report. Bom para listagens simples, com
               pouco controle de layout.
            2. **Report Queries e Report Layouts** com um servidor de impressão configurado na instância:
              - **OCI Document Generator** (desde o 24.1): uma função pré-construída da OCI que gera PDF a partir de modelos do
                Word. É chamada pelo processo ou Dynamic Action **Print Report** ou pela API «APEX_PRINT» («generate_document»).
              - **Oracle BI Publisher**, para quem já tem a licença.
            3. **Ferramentas de terceiros**: APEX Office Print (AOP), JasperReports, PL/PDF, entre outras.
            4. **Impressão do navegador** com CSS de impressão («@media print»), útil para comprovantes simples.

            Para documentos com layout rico (notas, contratos, etiquetas), os modelos em Word do Document Generator ou de uma
            ferramenta de terceiros costumam ser o melhor equilíbrio.

            :::novo No 26.1
            O Document Generator passou a gerar **PDFs protegidos por senha** (novas sobrecargas de «GENERATE_DOCUMENT») e o BI
            Publisher ganhou suporte a credenciais em Instance Settings > Report Printing.
            :::
        `
    },
    en: {
        q: 'How do I generate PDF documents (reports, invoices, contracts) in APEX?',
        tags: ['PDF', 'report', 'printing', 'Document Generator', 'APEX_PRINT', 'BI Publisher', 'APEX Office Print', 'Report Layout', 'Print Report'],
        r: `
            There are four routes, from simplest to richest:

            1. **Native PDF download** from Interactive Reports, Interactive Grids and Classic Reports. Fine for simple listings,
               with little layout control.
            2. **Report Queries and Report Layouts** with a print server configured for the instance:
              - **OCI Document Generator** (since 24.1): a prebuilt OCI function that produces PDF from Word templates. It is called
                by the **Print Report** process or Dynamic Action, or by the «APEX_PRINT» API («generate_document»).
              - **Oracle BI Publisher**, if you already license it.
            3. **Third-party tools**: APEX Office Print (AOP), JasperReports, PL/PDF and others.
            4. **Browser printing** with print CSS («@media print»), handy for simple receipts.

            For documents with rich layout (invoices, contracts, labels), Word templates with Document Generator or a third-party
            tool are usually the best balance.

            :::novo In 26.1
            Document Generator can now produce **password-protected PDFs** (new «GENERATE_DOCUMENT» overloads), and BI Publisher
            gained credentials support under Instance Settings > Report Printing.
            :::
        `
    }
});

DOC.pergunta({
    id: 'exportar-excel-xlsx',
    tema: 'arquivos',
    ver: ['impressao-e-exportacao', 'apex-exec'],
    pt: {
        q: 'Como exporto dados para Excel (XLSX)?',
        tags: ['Excel', 'XLSX', 'exportar', 'download', 'APEX_DATA_EXPORT', 'APEX_EXEC', 'CSV', 'apex_region.export_data'],
        r: `
            **Sem código**: em Interactive Report, Interactive Grid e Classic Report, habilite os formatos de download (CSV, XLSX,
            PDF, HTML) nos atributos da região. O usuário baixa em **Actions > Download**, já com os filtros que aplicou.

            **Por código** (desde o 20.2), com APEX_EXEC + APEX_DATA_EXPORT:

            ~~~plsql
            declare
                l_ctx    apex_exec.t_context;
                l_export apex_data_export.t_export;
            begin
                l_ctx := apex_exec.open_query_context(
                             p_location  => apex_exec.c_location_local_db,
                             p_sql_query => 'select empno, ename, sal from emp');

                l_export := apex_data_export.export(
                                p_context   => l_ctx,
                                p_format    => apex_data_export.c_format_xlsx,
                                p_file_name => 'funcionarios');

                apex_exec.close(l_ctx);
                apex_data_export.download(p_export => l_export);
            end;
            ~~~

            O mesmo pacote gera PDF, CSV, HTML, XML e JSON. O resultado também pode ir para um BLOB, por exemplo para anexar num
            e-mail com APEX_MAIL.

            Para exportar uma região **com os filtros atuais do usuário**, use «apex_region.export_data».

            :::atencao
            Feche o contexto com «apex_exec.close» também no tratamento de exceções. Contextos abertos consomem cursores.
            :::
        `
    },
    en: {
        q: 'How do I export data to Excel (XLSX)?',
        tags: ['Excel', 'XLSX', 'export', 'download', 'APEX_DATA_EXPORT', 'APEX_EXEC', 'CSV', 'apex_region.export_data'],
        r: `
            **No code**: in Interactive Reports, Interactive Grids and Classic Reports, enable the download formats (CSV, XLSX, PDF,
            HTML) in the region attributes. Users download from **Actions > Download**, with the filters they applied.

            **In code** (since 20.2), with APEX_EXEC + APEX_DATA_EXPORT:

            ~~~plsql
            declare
                l_ctx    apex_exec.t_context;
                l_export apex_data_export.t_export;
            begin
                l_ctx := apex_exec.open_query_context(
                             p_location  => apex_exec.c_location_local_db,
                             p_sql_query => 'select empno, ename, sal from emp');

                l_export := apex_data_export.export(
                                p_context   => l_ctx,
                                p_format    => apex_data_export.c_format_xlsx,
                                p_file_name => 'employees');

                apex_exec.close(l_ctx);
                apex_data_export.download(p_export => l_export);
            end;
            ~~~

            The same package produces PDF, CSV, HTML, XML and JSON. The result can also go to a BLOB, for example to attach to an
            e-mail with APEX_MAIL.

            To export a region **with the user's current filters**, use «apex_region.export_data».

            :::atencao
            Close the context with «apex_exec.close» in your exception handler too. Open contexts hold cursors.
            :::
        `
    }
});

DOC.pergunta({
    id: 'autenticacao-customizada-tabela-usuarios',
    tema: 'seguranca',
    ver: ['autenticacao', 'autorizacao'],
    pt: {
        q: 'Como faço login com a minha própria tabela de usuários (autenticação customizada)?',
        tags: ['autenticação customizada', 'custom authentication', 'login', 'tabela de usuários', 'senha', 'hash', 'DBMS_CRYPTO', 'post-authentication'],
        r: `
            Em **Shared Components > Authentication Schemes > Create**, escolha o tipo **Custom**, informe o
            **Authentication Function Name** e torne o esquema o atual (**Make Current Scheme**). A função recebe usuário e senha e
            devolve TRUE ou FALSE:

            ~~~plsql
            function autenticar (p_username in varchar2, p_password in varchar2) return boolean is
                l_hash usuarios.senha_hash%type;
                l_salt usuarios.salt%type;
            begin
                select senha_hash, salt into l_hash, l_salt
                  from usuarios
                 where username = upper(p_username) and ativo = 'S';

                return l_hash = rawtohex(dbms_crypto.hash(
                                    utl_raw.cast_to_raw(l_salt || p_password),
                                    dbms_crypto.hash_sh256));
            exception
                when no_data_found then return false;
            end autenticar;
            ~~~

            O schema precisa de «grant execute on dbms_crypto». Para carregar itens de aplicação (nome, perfil, filial) logo após o
            login, use o **Post-Authentication Procedure Name** do mesmo esquema.

            :::atencao
            Nunca guarde senhas em texto puro nem com hash sem *salt*. Se puder, prefira não gerenciar senhas: Social Sign-In
            (Entra ID, Google), SAML ou LDAP tiram esse risco da sua aplicação.
            :::
        `
    },
    en: {
        q: 'How do I log in against my own users table (custom authentication)?',
        tags: ['custom authentication', 'login', 'users table', 'password', 'hash', 'DBMS_CRYPTO', 'post-authentication'],
        r: `
            Under **Shared Components > Authentication Schemes > Create**, choose the **Custom** type, enter the
            **Authentication Function Name** and make the scheme current (**Make Current Scheme**). The function receives the user
            name and password and returns TRUE or FALSE:

            ~~~plsql
            function authenticate (p_username in varchar2, p_password in varchar2) return boolean is
                l_hash app_users.pwd_hash%type;
                l_salt app_users.salt%type;
            begin
                select pwd_hash, salt into l_hash, l_salt
                  from app_users
                 where username = upper(p_username) and active = 'Y';

                return l_hash = rawtohex(dbms_crypto.hash(
                                    utl_raw.cast_to_raw(l_salt || p_password),
                                    dbms_crypto.hash_sh256));
            exception
                when no_data_found then return false;
            end authenticate;
            ~~~

            The schema needs «grant execute on dbms_crypto». To load application items (name, role, branch) right after login,
            use the scheme's **Post-Authentication Procedure Name**.

            :::atencao
            Never store plain-text passwords or unsalted hashes. If you can, avoid managing passwords at all: Social Sign-In
            (Entra ID, Google), SAML or LDAP take that risk out of your application.
            :::
        `
    }
});

DOC.pergunta({
    id: 'perfis-permissoes-paginas-botoes',
    tema: 'seguranca',
    ver: ['autorizacao', 'autenticacao'],
    pt: {
        q: 'Como controlo perfis e permissões (admin, leitura) em páginas e botões?',
        tags: ['autorização', 'authorization scheme', 'perfil', 'papel', 'role', 'Access Control', 'APEX_ACL', 'permissão', 'admin'],
        r: `
            **Autenticação** diz *quem* é o usuário; **autorização** diz *o que* ele pode fazer.

            1. Adicione o recurso **Access Control** (no Create App ou em Create Page > Feature). Ele cria os papéis Administrator,
               Contributor e Reader, uma página de administração de usuários e os esquemas **Administration Rights**,
               **Contribution Rights** e **Reader Rights**. Os papéis são gerenciados pela API «APEX_ACL».
            2. Crie seus próprios **Authorization Schemes** quando precisar, por exemplo do tipo PL/SQL Function Returning Boolean:

            ~~~plsql
            return apex_acl.has_user_role(p_role_static_id => 'ADMINISTRATOR');
            ~~~

            Depois, associe o esquema em **Security > Authorization Scheme** de páginas, regiões, botões, itens, entradas de menu,
            processos e Ajax Callbacks.

            Use **Evaluation Point = Once per session** quando o resultado não muda durante a sessão: é bem mais rápido.

            :::atencao
            Esconder um botão **não é segurança**. Proteja também o processo que o botão dispara (e a página, e o Ajax Callback)
            com a mesma autorização, porque requisições podem ser forjadas fora da interface.
            :::
        `
    },
    en: {
        q: 'How do I implement roles and permissions (admin, read-only) on pages and buttons?',
        tags: ['authorization', 'authorization scheme', 'role', 'Access Control', 'APEX_ACL', 'permission', 'admin'],
        r: `
            **Authentication** decides *who* the user is; **authorization** decides *what* they can do.

            1. Add the **Access Control** feature (in Create App or via Create Page > Feature). It creates the Administrator,
               Contributor and Reader roles, a user administration page, and the **Administration Rights**,
               **Contribution Rights** and **Reader Rights** schemes. Roles are managed with the «APEX_ACL» API.
            2. Create your own **Authorization Schemes** when needed, for example of type PL/SQL Function Returning Boolean:

            ~~~plsql
            return apex_acl.has_user_role(p_role_static_id => 'ADMINISTRATOR');
            ~~~

            Then attach the scheme under **Security > Authorization Scheme** on pages, regions, buttons, items, menu entries,
            processes and Ajax Callbacks.

            Use **Evaluation Point = Once per session** when the result does not change during the session: it is much faster.

            :::atencao
            Hiding a button **is not security**. Also protect the process the button triggers (and the page, and the Ajax
            Callback) with the same authorization, because requests can be forged outside the UI.
            :::
        `
    }
});

DOC.pergunta({
    id: 'sso-entra-id-google-oidc',
    tema: 'seguranca',
    ver: ['social-sign-in-e-saml', 'web-credentials', 'autenticacao'],
    pt: {
        q: 'Como faço SSO com Microsoft Entra ID (Azure AD), Google ou OpenID Connect?',
        tags: ['SSO', 'Social Sign-In', 'Entra ID', 'Azure AD', 'Google', 'OpenID Connect', 'OAuth2', 'apex_authentication.callback', 'login Microsoft'],
        r: `
            1. **Registre o app no provedor de identidade** e cadastre a URL de retorno (redirect URI):
               «https://seu-servidor/ords/apex_authentication.callback».
            2. No APEX, crie uma **Web Credential** com o *client ID* e o *client secret* fornecidos pelo provedor.
            3. Crie um **Authentication Scheme** do tipo **Social Sign-In**:
              - **Google**: há opção pronta na lista de provedores.
              - **Microsoft Entra ID** e outros: use **OpenID Connect Provider** com a *discovery URL*, por exemplo
                «https://login.microsoftonline.com/<tenant-id>/v2.0/.well-known/openid-configuration».
            4. Em **Scope**, informe «profile,email». Em **Username**, escolha o atributo do token que identifica o usuário
               («email», «preferred_username» ou «upn»).
            5. Torne o esquema atual e teste numa janela anônima.

            Para controlar o acesso por grupos do provedor, leia as *claims* do token no Post-Authentication ou use o recurso
            Access Control do APEX com os usuários já autenticados.

            :::atencao On-premises
            O banco precisa alcançar o provedor por HTTPS: libere a **ACL de rede** e configure o **wallet** com os certificados.
            Sem isso surgem ORA-24247 ou ORA-29024 (veja [esta pergunta](#/faq/ora-24247-ora-29024-acl-wallet)).
            :::
        `
    },
    en: {
        q: 'How do I set up SSO with Microsoft Entra ID (Azure AD), Google or OpenID Connect?',
        tags: ['SSO', 'Social Sign-In', 'Entra ID', 'Azure AD', 'Google', 'OpenID Connect', 'OAuth2', 'apex_authentication.callback', 'Microsoft login'],
        r: `
            1. **Register the app with the identity provider** and add the redirect URI:
               «https://your-server/ords/apex_authentication.callback».
            2. In APEX, create a **Web Credential** with the *client ID* and *client secret* issued by the provider.
            3. Create an **Authentication Scheme** of type **Social Sign-In**:
              - **Google**: it is a ready-made option in the provider list.
              - **Microsoft Entra ID** and others: use **OpenID Connect Provider** with the *discovery URL*, for example
                «https://login.microsoftonline.com/<tenant-id>/v2.0/.well-known/openid-configuration».
            4. Set **Scope** to «profile,email». For **Username**, pick the token attribute that identifies the user
               («email», «preferred_username» or «upn»).
            5. Make the scheme current and test it in a private window.

            To control access by provider groups, read the token *claims* in the post-authentication procedure, or use APEX Access
            Control with the authenticated users.

            :::atencao On-premises
            The database must reach the provider over HTTPS: grant the **network ACL** and set up the **wallet** with the
            certificates. Otherwise you get ORA-24247 or ORA-29024 (see [this question](#/faq/ora-24247-ora-29024-acl-wallet)).
            :::
        `
    }
});

DOC.pergunta({
    id: 'tempo-sessao-your-session-has-ended',
    tema: 'seguranca',
    ver: ['sessao-e-session-state', 'autenticacao', 'apex-session-e-contexto'],
    pt: {
        q: 'Como altero o tempo de sessão? Por que aparece "Your session has ended"?',
        tags: ['timeout', 'tempo de sessão', 'Your session has ended', 'sessão expirada', 'Session Management', 'Maximum Session Idle Time', 'Rejoin Sessions', 'UTC'],
        r: `
            Em **Shared Components > Security Attributes > Session Management**:
            - **Maximum Session Length in Seconds**: duração máxima da sessão.
            - **Maximum Session Idle Time in Seconds**: tempo máximo sem atividade.
            - **Session Timeout Warning in Seconds**: avisa o usuário antes de expirar.
            - URLs de timeout para onde o usuário vai depois que a sessão acaba.

            Campos vazios herdam o valor do workspace ou da instância.

            A mensagem **"Your session has ended"** aparece quando:
            - a sessão expirou por tempo ou ociosidade;
            - o ID de sessão da URL não corresponde ao cookie do navegador (favorito antigo, link copiado de outra pessoa, app aberto
              num iframe que bloqueia cookies de terceiros).

            Para links que não carregam sessão, ative **Deep Linking** e use URLs sem o parâmetro de sessão: o APEX pede login e
            depois leva o usuário à página certa.

            :::atencao Novo no 26.1
            Os timestamps de expiração em «APEX_WORKSPACE_SESSIONS» passaram a ser gravados em **UTC**. Códigos que comparam com
            «SYSDATE» precisam converter:

            ~~~sql
            select apex_session_id, session_idle_timeout_on
              from apex_workspace_sessions
             where cast(systimestamp at time zone '00:00' as date) > session_idle_timeout_on
            ~~~
            :::
        `
    },
    en: {
        q: 'How do I change the session timeout, and why do I get "Your session has ended"?',
        tags: ['timeout', 'session timeout', 'Your session has ended', 'session expired', 'Session Management', 'Maximum Session Idle Time', 'Rejoin Sessions', 'UTC'],
        r: `
            Under **Shared Components > Security Attributes > Session Management**:
            - **Maximum Session Length in Seconds**: the maximum session duration.
            - **Maximum Session Idle Time in Seconds**: the maximum time without activity.
            - **Session Timeout Warning in Seconds**: warns the user before it expires.
            - Timeout URLs where the user is sent after the session ends.

            Empty fields inherit the workspace or instance value.

            The **"Your session has ended"** message appears when:
            - the session expired by length or idle time;
            - the session ID in the URL does not match the browser cookie (old bookmark, link copied from someone else, app opened
              in an iframe that blocks third-party cookies).

            For links that carry no session, turn on **Deep Linking** and use URLs without the session parameter: APEX asks the user
            to log in and then takes them to the right page.

            :::atencao New in 26.1
            Expiry timestamps in «APEX_WORKSPACE_SESSIONS» are now stored in **UTC**. Code that compares them with «SYSDATE» must
            convert:

            ~~~sql
            select apex_session_id, session_idle_timeout_on
              from apex_workspace_sessions
             where cast(systimestamp at time zone '00:00' as date) > session_idle_timeout_on
            ~~~
            :::
        `
    }
});

DOC.pergunta({
    id: 'consumir-api-rest-externa',
    tema: 'integracao',
    ver: ['rest-data-sources', 'apex-web-service', 'web-credentials'],
    pt: {
        q: 'Como consumo uma API REST externa no APEX?',
        tags: ['REST', 'API', 'consumir API', 'REST Data Source', 'APEX_WEB_SERVICE', 'make_rest_request', 'JSON_TABLE', 'Web Credential', 'integração'],
        r: `
            **Declarativo**: em **Shared Components > REST Data Sources**, informe a URL e deixe o APEX descobrir a estrutura do
            JSON. A fonte pode alimentar Interactive Report, Interactive Grid, Cards, gráficos e LOVs, com cache, **sincronização**
            para uma tabela local e operações DML quando a API permite.

            **Por código**, com «APEX_WEB_SERVICE»:

            ~~~plsql
            declare
                l_resp clob;
            begin
                apex_web_service.set_request_headers(
                    p_name_01  => 'Accept',
                    p_value_01 => 'application/json');

                l_resp := apex_web_service.make_rest_request(
                              p_url                  => 'https://api.exemplo.com/v1/clientes',
                              p_http_method          => 'GET',
                              p_credential_static_id => 'API_CLIENTES');

                if apex_web_service.g_status_code = 200 then
                    insert into clientes_api (id, nome)
                    select id, nome
                      from json_table(l_resp, '$.items[*]'
                               columns (id   number        path '$.id',
                                        nome varchar2(200) path '$.nome'));
                end if;
            end;
            ~~~

            Guarde tokens e senhas numa **Web Credential** (nunca no código) e restrinja em **Valid for URLs** os endereços em que
            ela pode ser usada.

            :::atencao On-premises
            O banco precisa de ACL de rede e de wallet para chamar HTTPS. Veja [ORA-24247 e ORA-29024](#/faq/ora-24247-ora-29024-acl-wallet).
            :::
        `
    },
    en: {
        q: 'How do I consume an external REST API in APEX?',
        tags: ['REST', 'API', 'consume API', 'REST Data Source', 'APEX_WEB_SERVICE', 'make_rest_request', 'JSON_TABLE', 'Web Credential', 'integration'],
        r: `
            **Declarative**: under **Shared Components > REST Data Sources**, enter the URL and let APEX discover the JSON
            structure. The source can feed Interactive Reports, Interactive Grids, Cards, charts and LOVs, with caching,
            **synchronization** to a local table, and DML when the API supports it.

            **In code**, with «APEX_WEB_SERVICE»:

            ~~~plsql
            declare
                l_resp clob;
            begin
                apex_web_service.set_request_headers(
                    p_name_01  => 'Accept',
                    p_value_01 => 'application/json');

                l_resp := apex_web_service.make_rest_request(
                              p_url                  => 'https://api.example.com/v1/customers',
                              p_http_method          => 'GET',
                              p_credential_static_id => 'CUSTOMERS_API');

                if apex_web_service.g_status_code = 200 then
                    insert into api_customers (id, name)
                    select id, name
                      from json_table(l_resp, '$.items[*]'
                               columns (id   number        path '$.id',
                                        name varchar2(200) path '$.name'));
                end if;
            end;
            ~~~

            Keep tokens and passwords in a **Web Credential** (never in code) and restrict where it can be used with **Valid for URLs**.

            :::atencao On-premises
            The database needs a network ACL and a wallet to call HTTPS. See [ORA-24247 and ORA-29024](#/faq/ora-24247-ora-29024-acl-wallet).
            :::
        `
    }
});

DOC.pergunta({
    id: 'expor-tabelas-api-rest',
    tema: 'integracao',
    ver: ['restful-services-ords', 'rest-enabled-sql'],
    pt: {
        q: 'Como exponho minhas tabelas como API REST?',
        tags: ['API REST', 'ORDS', 'AutoREST', 'RESTful Services', 'enable_object', 'OAuth2', 'módulo', 'handler', 'SQL Developer Web'],
        r: `
            Quem publica APIs é o **ORDS**. O jeito mais rápido é o **AutoREST**, que gera CRUD completo para uma tabela:

            ~~~plsql
            begin
                ords.enable_schema(p_enabled => true, p_url_mapping_pattern => 'rh');
                ords.enable_object(
                    p_enabled        => true,
                    p_schema         => 'RH',
                    p_object         => 'EMP',
                    p_object_type    => 'TABLE',
                    p_object_alias   => 'funcionarios',
                    p_auto_rest_auth => true);   -- exige autenticação
                commit;
            end;
            ~~~

            A API fica em «https://servidor/ords/rh/funcionarios/» (GET, POST, PUT, DELETE, com paginação e filtros).

            Para APIs sob medida, defina **módulos, templates e handlers** (GET com SQL, POST com PL/SQL) pela API PL/SQL do ORDS
            («ords.define_module», «define_template», «define_handler») ou pela interface do **SQL Developer Web** (Database
            Actions). Proteja com **roles e privileges** do ORDS e clientes **OAuth2**.

            :::atencao Deprecado no 26.1
            Criar APIs pela tela **SQL Workshop > RESTful Services** do APEX foi marcado como *deprecated* e será removido. Use o
            SQL Developer Web ou a API PL/SQL do ORDS.
            :::
        `
    },
    en: {
        q: 'How do I expose my tables as a REST API?',
        tags: ['REST API', 'ORDS', 'AutoREST', 'RESTful Services', 'enable_object', 'OAuth2', 'module', 'handler', 'SQL Developer Web'],
        r: `
            APIs are published by **ORDS**. The quickest way is **AutoREST**, which generates full CRUD for a table:

            ~~~plsql
            begin
                ords.enable_schema(p_enabled => true, p_url_mapping_pattern => 'hr');
                ords.enable_object(
                    p_enabled        => true,
                    p_schema         => 'HR',
                    p_object         => 'EMP',
                    p_object_type    => 'TABLE',
                    p_object_alias   => 'employees',
                    p_auto_rest_auth => true);   -- require authentication
                commit;
            end;
            ~~~

            The API is then at «https://server/ords/hr/employees/» (GET, POST, PUT, DELETE, with paging and filters).

            For custom APIs, define **modules, templates and handlers** (GET with SQL, POST with PL/SQL) through the ORDS PL/SQL API
            («ords.define_module», «define_template», «define_handler») or the **SQL Developer Web** (Database Actions) UI. Secure
            them with ORDS **roles and privileges** and **OAuth2** clients.

            :::atencao Deprecated in 26.1
            Creating APIs through APEX's **SQL Workshop > RESTful Services** screens is deprecated and will be removed. Use SQL
            Developer Web or the ORDS PL/SQL API.
            :::
        `
    }
});

DOC.pergunta({
    id: 'levar-app-dev-para-prod',
    tema: 'deploy',
    ver: ['ambientes-dev-test-prod', 'exportar-importar', 'supporting-objects'],
    pt: {
        q: 'Como levo um app de DEV para PROD (e trato configurações diferentes por ambiente)?',
        tags: ['deploy', 'DEV', 'PROD', 'exportar', 'importar', 'APEX_APPLICATION_INSTALL', 'SQLcl', 'Build Options', 'Application Settings', 'ambientes'],
        r: `
            1. **Exporte** o app: App Builder > Export/Import, ou no SQLcl «apex export -applicationid 100».
            2. **Importe** no workspace de destino (no 26.1 o botão se chama **Import Application**, antes era *Install*),
               mantendo ou trocando o ID e escolhendo o *parsing schema*. Workspace e schema precisam existir antes.
            3. **Objetos do banco** (tabelas, pacotes) vão por **Supporting Objects** ou, melhor, por scripts versionados
               (SQLcl Projects/Liquibase).
            4. **Valores por ambiente**: use **Application Settings**, **Build Options** e substitution strings em vez de valores fixos.

            Instalação por script, útil em pipelines:

            ~~~plsql
            begin
                apex_application_install.set_workspace('PROD_WS');
                apex_application_install.set_application_id(100);
                apex_application_install.set_schema('APP_PROD');
                apex_application_install.generate_offset;
            end;
            /
            @f100.sql
            ~~~

            :::atencao
            Os segredos das **Web Credentials** não vão no export: cadastre-os em cada ambiente. E no 26.1 não é possível importar
            exports de **página única ou de componentes** gerados em versões anteriores; leve o app completo.
            :::
        `
    },
    en: {
        q: 'How do I move an app from DEV to PROD (and handle per-environment settings)?',
        tags: ['deploy', 'DEV', 'PROD', 'export', 'import', 'APEX_APPLICATION_INSTALL', 'SQLcl', 'Build Options', 'Application Settings', 'environments'],
        r: `
            1. **Export** the app: App Builder > Export/Import, or in SQLcl «apex export -applicationid 100».
            2. **Import** it into the target workspace (in 26.1 the button is called **Import Application**, formerly *Install*),
               keeping or changing the ID and choosing the *parsing schema*. The workspace and schema must already exist.
            3. **Database objects** (tables, packages) go through **Supporting Objects** or, better, versioned scripts
               (SQLcl Projects/Liquibase).
            4. **Per-environment values**: use **Application Settings**, **Build Options** and substitution strings instead of
               hard-coded values.

            Scripted install, handy in pipelines:

            ~~~plsql
            begin
                apex_application_install.set_workspace('PROD_WS');
                apex_application_install.set_application_id(100);
                apex_application_install.set_schema('APP_PROD');
                apex_application_install.generate_offset;
            end;
            /
            @f100.sql
            ~~~

            :::atencao
            **Web Credential** secrets are not exported: set them in each environment. And in 26.1 you cannot import **single-page
            or component** exports created in earlier releases; move the full application.
            :::
        `
    }
});

DOC.pergunta({
    id: 'versionar-apex-git',
    tema: 'deploy',
    ver: ['controle-de-versao', 'apexlang', 'sqlcl-projects-e-cicd'],
    pt: {
        q: 'Como versiono minha aplicação APEX no Git?',
        tags: ['Git', 'controle de versão', 'versionamento', 'split export', 'READABLE_YAML', 'APEXlang', 'SQLcl', 'Working Copies', 'CI/CD'],
        r: `
            **Abordagem clássica (qualquer versão recente)**: exporte com o SQLcl em arquivos separados e legíveis, e faça commit
            da pasta:

            ~~~bash
            sql usuario@//host:1521/PDB
            apex export -applicationid 100 -split -skipExportDate -expOriginalIds -expType APPLICATION_SOURCE,READABLE_YAML
            ~~~

            «-split» gera um arquivo por componente, «-skipExportDate» evita diffs falsos e «READABLE_YAML» produz uma versão fácil
            de revisar em pull requests.

            **APEX 26.1: APEXlang**. As aplicações podem ser exportadas num formato de texto aberto e legível (arquivos **.apx**),
            pensado para Git e para assistentes de IA. Com o SQLcl 26.1.2 ou superior você exporta, valida e importa
            («apex export» com «-exptype apexlang», «apex validate», «apex import»). O **Application Lock** pode obrigar que todas as
            mudanças passem pelo APEXlang.

            **Dentro do App Builder**: as **Working Copies** (desde o 23.2) funcionam como branches, com comparação e merge.

            :::dica
            Para pipelines completos (objetos do banco + app), veja **SQLcl Projects** (SQLcl 24.3+), que usa Liquibase. Desde o
            SQLcl 26.2, os projetos também trabalham com APEXlang.
            :::
        `
    },
    en: {
        q: 'How do I put my APEX application under Git version control?',
        tags: ['Git', 'version control', 'split export', 'READABLE_YAML', 'APEXlang', 'SQLcl', 'Working Copies', 'CI/CD'],
        r: `
            **Classic approach (any recent release)**: export with SQLcl into separate, readable files and commit the folder:

            ~~~bash
            sql user@//host:1521/PDB
            apex export -applicationid 100 -split -skipExportDate -expOriginalIds -expType APPLICATION_SOURCE,READABLE_YAML
            ~~~

            «-split» writes one file per component, «-skipExportDate» avoids false diffs, and «READABLE_YAML» produces a version that
            is easy to review in pull requests.

            **APEX 26.1: APEXlang**. Applications can be exported in an open, human-readable text format (**.apx** files), designed
            for Git and AI assistants. With SQLcl 26.1.2 or later you export, validate and import («apex export» with
            «-exptype apexlang», «apex validate», «apex import»). **Application Lock** can force every change to go through APEXlang.

            **Inside App Builder**: **Working Copies** (since 23.2) work like branches, with compare and merge.

            :::dica
            For full pipelines (database objects + app), look at **SQLcl Projects** (SQLcl 24.3+), built on Liquibase. Since SQLcl
            26.2, projects also handle APEXlang.
            :::
        `
    }
});

DOC.pergunta({
    id: 'mudar-cores-css-js-customizado',
    tema: 'ui',
    ver: ['theme-roller-e-estilos', 'js-e-css-na-pagina', 'universal-theme'],
    pt: {
        q: 'Como mudo as cores do app e onde coloco meu CSS e JavaScript customizados?',
        tags: ['cores', 'Theme Roller', 'CSS', 'JavaScript', 'Static Application Files', '#APP_FILES#', '#MIN#', 'tema', 'Iris', 'estilo'],
        r: `
            **Cores**: rode o app, abra **Developer Toolbar > Customize > Theme Roller**, escolha um estilo base, ajuste as cores e
            use **Save As** para criar o seu estilo. Depois, marque-o como **Set as Current**.

            **CSS**, do mais local ao mais global:
            - Página: **CSS > Inline** nos atributos da página.
            - Tema: o campo **Custom CSS** do Theme Roller (fica salvo no estilo).
            - Aplicação: envie «app.css» para **Static Application Files** e referencie em **User Interface Attributes > CSS File
              URLs** como «#APP_FILES#app#MIN#.css».

            **JavaScript**:
            - Página: **Function and Global Variable Declaration** e **Execute when Page Loads**.
            - Aplicação: «#APP_FILES#app#MIN#.js» em **JavaScript File URLs**.

            O «#MIN#» carrega a versão minificada («app.min.css») fora do modo debug. O APEX gera o .min automaticamente quando você
            envia o arquivo, se a opção de minificação estiver marcada.

            :::novo No 26.1
            O Universal Theme ganhou o estilo **Iris**, o novo padrão para apps criados no 26.1, e opções condicionais e dinâmicas
            no Theme Roller.
            :::

            :::dica
            Prefira sobrescrever as **variáveis CSS** do Universal Theme (as que começam com «--ut-» e «--a-») a fixar cores em
            seletores: o resultado sobrevive a upgrades do tema.
            :::
        `
    },
    en: {
        q: 'How do I change my app colors, and where do I put custom CSS and JavaScript?',
        tags: ['colors', 'Theme Roller', 'CSS', 'JavaScript', 'Static Application Files', '#APP_FILES#', '#MIN#', 'theme', 'Iris', 'style'],
        r: `
            **Colors**: run the app, open **Developer Toolbar > Customize > Theme Roller**, pick a base style, tweak the colors and
            use **Save As** to create your own style. Then mark it **Set as Current**.

            **CSS**, from most local to most global:
            - Page: **CSS > Inline** in the page attributes.
            - Theme: the Theme Roller **Custom CSS** field (saved with the style).
            - Application: upload «app.css» to **Static Application Files** and reference it under **User Interface Attributes >
              CSS File URLs** as «#APP_FILES#app#MIN#.css».

            **JavaScript**:
            - Page: **Function and Global Variable Declaration** and **Execute when Page Loads**.
            - Application: «#APP_FILES#app#MIN#.js» under **JavaScript File URLs**.

            «#MIN#» loads the minified version («app.min.css») outside debug mode. APEX creates the .min file for you when you upload
            the file, if the minify option is checked.

            :::novo In 26.1
            Universal Theme gained the **Iris** style, the new default for apps created in 26.1, plus conditional and dynamic
            options in Theme Roller.
            :::

            :::dica
            Prefer overriding Universal Theme **CSS variables** (those starting with «--ut-» and «--a-») to hard-coding colors in
            selectors: the result survives theme upgrades.
            :::
        `
    }
});

DOC.pergunta({
    id: 'logo-icone-pagina-login',
    tema: 'ui',
    ver: ['universal-theme', 'autenticacao', 'pwa'],
    pt: {
        q: 'Como troco o logo e o ícone do app e personalizo a página de login?',
        tags: ['logo', 'ícone', 'favicon', 'página de login', 'login page', 'User Interface Attributes', 'Static Application Files', 'personalizar'],
        r: `
            **Logo**: em **Shared Components > User Interface Attributes**, seção **Logo**, escolha o tipo (Text, Image, Image and
            Text ou Custom). Para imagem, envie o arquivo para **Static Application Files** e informe «#APP_FILES#logo.png».

            **Ícone do app**: na mesma página (**User Interface Attributes**), seção **Icon**, clique em **Change Icon**, ou rode o
            app e use **Developer Toolbar > Customize > Edit App Icon**. O ícone vira o favicon, o ícone do PWA, o da tela de login e
            o do App Builder.

            **Página de login**: é uma página comum (normalmente a **9999**). Você pode:
            - trocar textos, labels e o título da região de login;
            - adicionar regiões (aviso, link de "esqueci minha senha", termos de uso);
            - mudar o fundo e o visual com CSS na própria página, usando a classe do corpo da página de login
              («t-PageBody--login») como ponto de partida.

            :::dica
            Se recriar a página de login, use **Create Page > Login** em vez de copiar outra página: ela já vem com os processos de
            autenticação e de cookie de usuário.
            :::
        `
    },
    en: {
        q: 'How do I change the app logo and icon, and customize the login page?',
        tags: ['logo', 'icon', 'favicon', 'login page', 'User Interface Attributes', 'Static Application Files', 'customize'],
        r: `
            **Logo**: under **Shared Components > User Interface Attributes**, **Logo** section, pick the type (Text, Image, Image
            and Text or Custom). For an image, upload the file to **Static Application Files** and enter «#APP_FILES#logo.png».

            **App icon**: on the same page (**User Interface Attributes**), **Icon** section, click **Change Icon**, or run the app
            and use **Developer Toolbar > Customize > Edit App Icon**. The icon becomes the favicon, the PWA icon, and the icon on
            the sign-in page and in App Builder.

            **Login page**: it is an ordinary page (usually **9999**). You can:
            - change texts, labels and the login region title;
            - add regions (a notice, a "forgot password" link, terms of use);
            - restyle the background and look with CSS on the page itself, using the login page body class («t-PageBody--login»)
              as a starting point.

            :::dica
            If you recreate the login page, use **Create Page > Login** instead of copying another page: it comes with the
            authentication and user cookie processes.
            :::
        `
    }
});

DOC.pergunta({
    id: 'app-bilingue-traducao',
    tema: 'ui',
    ver: ['traducao-de-aplicacoes', 'mensagens-de-texto', 'formatos-data-numero-e-fuso'],
    pt: {
        q: 'Como faço meu app bilíngue (português e inglês)?',
        tags: ['tradução', 'bilíngue', 'idioma', 'XLIFF', 'translation', 'Text Messages', 'APEX_LANG', 'Globalization', 'multi-idioma'],
        r: `
            1. Em **Globalization Attributes**, defina o **Primary Language** (ex.: pt-br) e como o idioma é escolhido em
               **Application Language Derived From** (navegador, preferência do usuário, item de aplicação, sessão).
            2. Em **Shared Components > Application Translations**: crie o mapeamento para o novo idioma (que gera um app
               "sombra" com outro ID), faça o **Seed**, exporte o **XLIFF**, traduza, aplique o arquivo e **Publish**.
            3. Para textos usados em código, crie **Text Messages** e use «apex_lang.get_message('CHAVE')» no PL/SQL e
               «apex.lang.getMessage("CHAVE")» no JavaScript (marque **Used in JavaScript** na mensagem).
            4. Os **dados** das suas tabelas (nome de produto, descrição) não são traduzidos pelo APEX: modele colunas ou tabelas
               por idioma.

            :::atencao
            Toda mudança no app principal exige **novo Seed e novo Publish** do idioma traduzido. Inclua isso no seu processo de
            deploy, senão a versão em inglês fica desatualizada.
            :::

            :::novo No 26.1
            É possível traduzir aplicações usando apenas **Text Messages**: exporte as mensagens em XLIFF ou CSV, traduza, importe,
            e o mesmo app roda em vários idiomas sem apps traduzidos separados.
            :::
        `
    },
    en: {
        q: 'How do I make my app bilingual (Portuguese and English)?',
        tags: ['translation', 'bilingual', 'language', 'XLIFF', 'Text Messages', 'APEX_LANG', 'Globalization', 'multilingual'],
        r: `
            1. In **Globalization Attributes**, set the **Primary Language** (e.g., pt-br) and how the language is chosen in
               **Application Language Derived From** (browser, user preference, application item, session).
            2. Under **Shared Components > Application Translations**: create the mapping for the new language (it generates a
               "shadow" app with another ID), **Seed**, export the **XLIFF**, translate it, apply the file and **Publish**.
            3. For strings used in code, create **Text Messages** and call «apex_lang.get_message('KEY')» in PL/SQL and
               «apex.lang.getMessage("KEY")» in JavaScript (check **Used in JavaScript** on the message).
            4. The **data** in your tables (product names, descriptions) is not translated by APEX: model per-language columns
               or tables.

            :::atencao
            Every change in the main app requires a **new Seed and Publish** of the translated language. Make it part of your
            deployment process, or the English version falls behind.
            :::

            :::novo In 26.1
            You can translate applications using **Text Messages** only: export the messages as XLIFF or CSV, translate, import,
            and the same app runs in several languages without separate translated apps.
            :::
        `
    }
});

DOC.pergunta({
    id: 'app-mobile-instalavel-pwa',
    tema: 'ui',
    ver: ['pwa', 'notificacoes-push', 'universal-theme'],
    pt: {
        q: 'O APEX faz app para celular? Como deixo o app instalável?',
        tags: ['mobile', 'celular', 'PWA', 'Progressive Web App', 'instalável', 'push notification', 'offline', 'responsivo', 'apex.pwa'],
        r: `
            Sim. Apps com o **Universal Theme** são **responsivos** por padrão e funcionam bem no navegador do celular.

            Para que o usuário **instale** o app (ícone na tela inicial, abertura em tela cheia, página offline), ative o
            **Progressive Web App** em **Shared Components > Progressive Web App**. Lá você configura nome, ícone, cores, modo de
            exibição e a página mostrada sem conexão.

            Recursos relacionados:
            - **Push notifications** (desde o 23.1): o usuário se inscreve no app e você envia avisos com o processo **Send Push
              Notification** ou a API «APEX_PWA».
            - API JavaScript «apex.pwa» para, por exemplo, oferecer o botão de instalação.
            - Dynamic Actions como **Get Current Position** e **Share** usam recursos do aparelho.

            :::atencao
            PWA exige **HTTPS**. E o APEX não empacota apps para a App Store ou o Google Play: o caminho nativo é a instalação
            pelo navegador.
            :::

            :::novo No 26.1
            Suporte a mais propriedades do manifesto PWA («short_name», «handle_links», «sizes», «form_factor»), melhorando a
            instalação nos navegadores modernos.
            :::
        `
    },
    en: {
        q: 'Can APEX build mobile apps? How do I make my app installable?',
        tags: ['mobile', 'phone', 'PWA', 'Progressive Web App', 'installable', 'push notification', 'offline', 'responsive', 'apex.pwa'],
        r: `
            Yes. **Universal Theme** apps are **responsive** by default and work well in a phone browser.

            To let users **install** the app (home-screen icon, full-screen launch, offline page), enable **Progressive Web App**
            under **Shared Components > Progressive Web App**. There you set the name, icon, colors, display mode and the page shown
            when offline.

            Related features:
            - **Push notifications** (since 23.1): users subscribe in the app and you send notices with the **Send Push
              Notification** process or the «APEX_PWA» API.
            - The «apex.pwa» JavaScript API, for example to offer an install button.
            - Dynamic Actions such as **Get Current Position** and **Share** use device features.

            :::atencao
            PWAs require **HTTPS**. And APEX does not package apps for the App Store or Google Play: the native route is installing
            from the browser.
            :::

            :::novo In 26.1
            Support for more PWA manifest properties («short_name», «handle_links», «sizes», «form_factor»), improving installation
            in modern browsers.
            :::
        `
    }
});

DOC.pergunta({
    id: 'depurar-pagina-debug',
    tema: 'performance',
    ver: ['modo-debug', 'apex-debug-e-logs'],
    pt: {
        q: 'Como depuro (debug) uma página APEX?',
        tags: ['debug', 'depuração', 'APEX_DEBUG', 'View Debug', 'Developer Toolbar', 'LEVEL9', 'apex.debug', 'APEX_DEBUG_MESSAGES', 'log'],
        r: `
            1. Na **Developer Toolbar**, clique em **Debug** (ou passe o parâmetro «debug=YES», ou «LEVEL9» para o nível máximo, na URL).
            2. Reproduza o problema.
            3. Abra **View Debug**: cada etapa da página (renderização, processos, Ajax) aparece com o tempo gasto.

            Instrumente seu PL/SQL. As mensagens só são gravadas quando o debug está ligado, então o custo em produção é mínimo:

            ~~~plsql
            apex_debug.info('Pedido %s: total calculado = %s', :P1_PEDIDO_ID, l_total);
            apex_debug.error('Falha ao chamar a API: %s', sqlerrm);
            ~~~

            As mensagens ficam na view «APEX_DEBUG_MESSAGES». No JavaScript, «apex.debug.info(...)» escreve no console do navegador
            quando o debug está ativo.

            Para erros de **Ajax**, abra o DevTools do navegador (aba **Network**) e veja a resposta da requisição «wwv_flow.ajax»:
            o texto do erro está lá.

            :::dica
            Para depurar a sessão de **outro usuário** sem pedir que ele mude a URL, use «apex_session.set_debug» com o ID da
            sessão dele.
            :::
        `
    },
    en: {
        q: 'How do I debug an APEX page?',
        tags: ['debug', 'debugging', 'APEX_DEBUG', 'View Debug', 'Developer Toolbar', 'LEVEL9', 'apex.debug', 'APEX_DEBUG_MESSAGES', 'log'],
        r: `
            1. On the **Developer Toolbar**, click **Debug** (or pass «debug=YES», or «LEVEL9» for the most detail, in the URL).
            2. Reproduce the problem.
            3. Open **View Debug**: every step of the page (rendering, processes, Ajax) is listed with its elapsed time.

            Instrument your PL/SQL. Messages are only written when debug is on, so the cost in production is minimal:

            ~~~plsql
            apex_debug.info('Order %s: computed total = %s', :P1_ORDER_ID, l_total);
            apex_debug.error('API call failed: %s', sqlerrm);
            ~~~

            Messages are stored in the «APEX_DEBUG_MESSAGES» view. In JavaScript, «apex.debug.info(...)» writes to the browser
            console when debug is on.

            For **Ajax** errors, open the browser DevTools (**Network** tab) and look at the response of the «wwv_flow.ajax»
            request: the error text is there.

            :::dica
            To debug **another user's** session without asking them to change the URL, use «apex_session.set_debug» with their
            session ID.
            :::
        `
    }
});

DOC.pergunta({
    id: 'pagina-lenta-gargalo',
    tema: 'performance',
    ver: ['otimizacao-performance', 'modo-debug', 'monitoramento'],
    pt: {
        q: 'Minha página está lenta. Como descubro o culpado?',
        tags: ['lento', 'lentidão', 'performance', 'gargalo', 'APEX_WORKSPACE_ACTIVITY_LOG', 'Lazy Loading', 'plano de execução', 'otimização'],
        r: `
            1. Rode a página em **debug** e veja em View Debug qual região ou processo consome o tempo. Depois, ajuste aquele SQL
               (plano de execução, índices, filtros).
            2. Descubra as páginas mais lentas no histórico, em **Monitor Activity** ou direto na view de atividade:

            ~~~sql
            select page_id,
                   count(*)                    as acessos,
                   round(avg(elapsed_time), 2) as media_seg,
                   max(elapsed_time)           as max_seg
              from apex_workspace_activity_log
             where application_id = 100
               and view_date > sysdate - 7
             group by page_id
             order by media_seg desc
            ~~~

            Causas clássicas:
            - Funções PL/SQL ou chamadas «v('ITEM')» executadas **por linha** na query (use bind variables).
            - Relatórios sem paginação ou com **Maximum Rows to Process** enorme.
            - Esquemas de autorização avaliados **sempre** em vez de *Once per session*.
            - Muitas regiões carregando ao mesmo tempo.

            Remédios: **Lazy Loading** nas regiões pesadas, paginação, cache de região (Server Cache) e mover cálculos caros para
            visões materializadas ou tabelas de resumo.

            :::dica
            Meça antes e depois de cada ajuste. O tempo do debug é a forma mais simples de provar que a mudança funcionou.
            :::
        `
    },
    en: {
        q: 'My page is slow. How do I find the bottleneck?',
        tags: ['slow', 'performance', 'bottleneck', 'APEX_WORKSPACE_ACTIVITY_LOG', 'Lazy Loading', 'execution plan', 'tuning'],
        r: `
            1. Run the page in **debug** and check in View Debug which region or process takes the time. Then tune that SQL
               (execution plan, indexes, filters).
            2. Find the slowest pages over time, in **Monitor Activity** or straight from the activity view:

            ~~~sql
            select page_id,
                   count(*)                    as views,
                   round(avg(elapsed_time), 2) as avg_sec,
                   max(elapsed_time)           as max_sec
              from apex_workspace_activity_log
             where application_id = 100
               and view_date > sysdate - 7
             group by page_id
             order by avg_sec desc
            ~~~

            The classic causes:
            - PL/SQL functions or «v('ITEM')» calls running **per row** in the query (use bind variables).
            - Reports without pagination, or with a huge **Maximum Rows to Process**.
            - Authorization schemes evaluated **always** instead of *Once per session*.
            - Too many regions loading at the same time.

            Remedies: **Lazy Loading** on heavy regions, pagination, region caching (Server Cache), and moving expensive
            calculations into materialized views or summary tables.

            :::dica
            Measure before and after every change. The debug timings are the simplest way to prove the change worked.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ora-24247-ora-29024-acl-wallet',
    tema: 'erros',
    ver: ['administracao-instancia', 'apex-web-service', 'web-credentials'],
    pt: {
        q: 'Como resolvo ORA-24247 (ACL de rede) ou ORA-29024 (falha de certificado) ao chamar uma API ou enviar e-mail?',
        tags: ['ORA-24247', 'network access denied by access control list (ACL)', 'ORA-29024', 'Certificate validation failure', 'ACL', 'wallet', 'orapki', 'DBMS_NETWORK_ACL_ADMIN', 'HTTPS'],
        r: `
            **ORA-24247: network access denied by access control list (ACL)**. O schema do motor do APEX não tem permissão para
            conectar ao host. Como SYS (no 26.1 o schema é «APEX_260100»):

            ~~~plsql
            begin
                dbms_network_acl_admin.append_host_ace(
                    host => 'api.exemplo.com',
                    ace  => xs$ace_type(
                                privilege_list => xs$name_list('connect'),
                                principal_name => 'APEX_260100',
                                principal_type => xs_acl.ptype_db));
            end;
            ~~~

            Para e-mail, libere o host do SMTP (com «lower_port» e «upper_port», se quiser restringir a porta).

            **ORA-29024: Certificate validation failure**. O banco não confia no certificado HTTPS do servidor. Crie um wallet com
            os certificados raiz e intermediário da cadeia e informe o caminho em **Instance Settings > Wallet**:

            ~~~bash
            orapki wallet create -wallet /u01/app/oracle/wallet -auto_login_only
            orapki wallet add -wallet /u01/app/oracle/wallet -trusted_cert -cert /tmp/raiz.crt -auto_login_only
            ~~~

            No Oracle Database 23ai/26ai (e em RUs recentes do 19c), dá para usar o repositório de certificados do sistema
            operacional com o caminho de wallet «system:».

            :::dica
            No **Autonomous Database** e no APEX Service, chamadas HTTPS para endpoints públicos funcionam sem configurar ACL nem
            wallet.
            :::
        `
    },
    en: {
        q: 'How do I fix ORA-24247 (network ACL) or ORA-29024 (certificate validation failure) when calling an API or sending e-mail?',
        tags: ['ORA-24247', 'network access denied by access control list (ACL)', 'ORA-29024', 'Certificate validation failure', 'ACL', 'wallet', 'orapki', 'DBMS_NETWORK_ACL_ADMIN', 'HTTPS'],
        r: `
            **ORA-24247: network access denied by access control list (ACL)**. The APEX engine schema is not allowed to connect to
            the host. As SYS (in 26.1 the schema is «APEX_260100»):

            ~~~plsql
            begin
                dbms_network_acl_admin.append_host_ace(
                    host => 'api.example.com',
                    ace  => xs$ace_type(
                                privilege_list => xs$name_list('connect'),
                                principal_name => 'APEX_260100',
                                principal_type => xs_acl.ptype_db));
            end;
            ~~~

            For e-mail, grant the SMTP host (with «lower_port» and «upper_port» if you want to restrict the port).

            **ORA-29024: Certificate validation failure**. The database does not trust the server's HTTPS certificate. Create a
            wallet with the root and intermediate certificates of the chain and set its path in **Instance Settings > Wallet**:

            ~~~bash
            orapki wallet create -wallet /u01/app/oracle/wallet -auto_login_only
            orapki wallet add -wallet /u01/app/oracle/wallet -trusted_cert -cert /tmp/root.crt -auto_login_only
            ~~~

            On Oracle Database 23ai/26ai (and recent 19c RUs) you can use the operating system certificate store with the
            «system:» wallet path.

            :::dica
            On **Autonomous Database** and APEX Service, HTTPS calls to public endpoints work without any ACL or wallet setup.
            :::
        `
    }
});

DOC.pergunta({
    id: 'session-state-protection-violation',
    tema: 'erros',
    ver: ['session-state-protection', 'sessao-e-session-state'],
    pt: {
        q: 'O que causa "Session state protection violation" ou "Page protection violation" ao submeter a página?',
        tags: ['Session state protection violation', 'Page protection violation', 'checksum', 'Value Protected', 'item oculto', 'hidden item', 'Send On Page Submit', 'SSP'],
        r: `
            O APEX calcula um **checksum** para valores protegidos e confere no submit. O erro aparece quando:
            - um item **Hidden** com **Value Protected = On** (o padrão) foi alterado no navegador, por JavaScript ou por uma
              Dynamic Action **Set Value**;
            - um item **Display Only** que envia valor no submit foi alterado;
            - o usuário submeteu antes de a página terminar de carregar;
            - alguém editou um parâmetro de uma URL protegida por checksum.

            Mensagens típicas: "Session state protection violation: This may be caused by manual alteration of protected page item
            P1_X" e "Page protection violation: This may be caused by submitting a page that had not yet finished loading or by
            manual alteration of protected page items".

            Como resolver:
            - Se o valor **deve** mudar no cliente, mude **Value Protected** para Off nesse item e **valide no servidor**.
            - Em itens Display Only calculados na tela, use **Send On Page Submit = Off**.
            - Gere URLs com o Link Builder ou «apex_page.get_url», nunca concatenando valores.

            :::atencao
            Não desligue o Session State Protection da aplicação inteira para "sumir" com o erro. Ele impede que usuários troquem
            IDs na URL e acessem registros de outras pessoas.
            :::
        `
    },
    en: {
        q: 'What causes "Session state protection violation" or "Page protection violation" on submit?',
        tags: ['Session state protection violation', 'Page protection violation', 'checksum', 'Value Protected', 'hidden item', 'Send On Page Submit', 'SSP'],
        r: `
            APEX computes a **checksum** for protected values and verifies it on submit. The error appears when:
            - a **Hidden** item with **Value Protected = On** (the default) was changed in the browser, by JavaScript or by a
              **Set Value** Dynamic Action;
            - a **Display Only** item that sends its value on submit was changed;
            - the user submitted before the page finished loading;
            - someone edited a parameter of a checksum-protected URL.

            Typical messages: "Session state protection violation: This may be caused by manual alteration of protected page item
            P1_X" and "Page protection violation: This may be caused by submitting a page that had not yet finished loading or by
            manual alteration of protected page items".

            How to fix it:
            - If the value **must** change on the client, set **Value Protected** to Off on that item and **validate it on the server**.
            - For Display Only items computed on screen, use **Send On Page Submit = Off**.
            - Generate URLs with the Link Builder or «apex_page.get_url», never by concatenating values.

            :::atencao
            Do not turn off Session State Protection for the whole app to make the error go away. It stops users from changing IDs
            in the URL to reach other people's records.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ora-01403-no-data-found',
    tema: 'erros',
    destaque: true,
    ver: ['tratamento-de-erros', 'modo-debug', 'formularios'],
    pt: {
        q: 'Como resolvo "ORA-01403: no data found" num processo ou "Ajax call returned server error ORA-01403"?',
        tags: ['ORA-01403', 'no data found', 'Ajax call returned server error', 'select into', 'NO_DATA_FOUND', 'Items to Submit', 'erro Ajax'],
        r: `
            Um «select ... into» não encontrou nenhuma linha. Causas típicas no APEX:
            - O processo **Form - Initialization** (ou um select próprio) rodou com o item da chave **nulo ou errado**: o link não
              passou o valor ou o cache foi limpo.
            - Uma Dynamic Action ou um Ajax Callback usa um item que **não estava em Items to Submit**, então o bind chegou nulo.
            - O arquivo enviado já tinha sido removido de «APEX_APPLICATION_TEMP_FILES» (Purge File At).
            - Mestre-detalhe salvando o detalhe sem a chave do mestre.

            Primeiro descubra **qual** processo falhou: ative o debug e procure o erro em View Debug.

            Depois, resolva a causa (passar o item, ajustar Items to Submit, colocar uma Server-side Condition "Item is NOT NULL"
            no processo) ou trate a ausência de dados quando ela for normal:

            ~~~plsql
            begin
                select sal into :P1_SAL from emp where empno = :P1_EMPNO;
            exception
                when no_data_found then
                    :P1_SAL := null;
            end;
            ~~~

            :::atencao
            Não "engula" todo erro com «when others then null». Trate só o NO_DATA_FOUND esperado e deixe os outros erros aparecerem.
            :::
        `
    },
    en: {
        q: 'How do I fix "ORA-01403: no data found" in a process or "Ajax call returned server error ORA-01403"?',
        tags: ['ORA-01403', 'no data found', 'Ajax call returned server error', 'select into', 'NO_DATA_FOUND', 'Items to Submit', 'Ajax error'],
        r: `
            A «select ... into» found no row. Typical causes in APEX:
            - The **Form - Initialization** process (or your own select) ran with a **null or wrong** key item: the link did not pass
              the value, or the cache was cleared.
            - A Dynamic Action or Ajax Callback uses an item that **was not in Items to Submit**, so the bind arrived as null.
            - The uploaded file had already been removed from «APEX_APPLICATION_TEMP_FILES» (Purge File At).
            - A master-detail page saving details without the master key.

            First find out **which** process failed: turn on debug and look for the error in View Debug.

            Then fix the cause (pass the item, adjust Items to Submit, add an "Item is NOT NULL" Server-side Condition to the
            process) or handle the missing data when it is expected:

            ~~~plsql
            begin
                select sal into :P1_SAL from emp where empno = :P1_EMPNO;
            exception
                when no_data_found then
                    :P1_SAL := null;
            end;
            ~~~

            :::atencao
            Do not swallow every error with «when others then null». Handle only the expected NO_DATA_FOUND and let other errors surface.
            :::
        `
    }
});

DOC.pergunta({
    id: 'ora-20987-requested-url-prohibited',
    tema: 'erros',
    ver: ['web-credentials', 'administracao-instancia', 'apex-session-e-contexto'],
    pt: {
        q: 'O que significa "ORA-20987: APEX - The requested URL has been prohibited"?',
        tags: ['ORA-20987', 'The requested URL has been prohibited', 'Require Outbound HTTPS', 'REQUIRE_OUT_HTTPS', 'HTTP', 'HTTPS', 'REST Data Source', 'Autonomous'],
        r: `
            **ORA-20987** é o código de erro genérico do APEX: a causa real está no texto depois de "APEX -".

            "**The requested URL has been prohibited**" quase sempre significa que o app tentou chamar uma URL **http://** (sem
            TLS) e a instância exige HTTPS para conexões de saída (**Require Outbound HTTPS = Yes**). No Autonomous Database, no
            APEX Service e no oracleapex.com essa exigência é fixa.

            Como resolver:
            - Use **https://** no endpoint (a melhor opção).
            - On-premises, se o HTTP for realmente necessário (rede interna), o administrador da instância pode desligar a
              exigência em **Manage Instance > Instance Settings > Security > HTTP Protocol** ou por SQL:

            ~~~plsql
            begin
                apex_instance_admin.set_parameter('REQUIRE_OUT_HTTPS', 'N');
                commit;
            end;
            ~~~

            Outras variantes comuns de ORA-20987:
            - Uma **Web Credential** usada com uma URL fora da lista **Valid for URLs** dela.
            - APIs do APEX chamadas **fora de uma sessão APEX** (job, SQL Developer): crie uma com «apex_session.create_session»
              ou defina o workspace com «apex_util.set_workspace».

            :::atencao
            Desligar o HTTPS de saída deixa o tráfego legível na rede. Prefira configurar TLS no serviço de destino.
            :::
        `
    },
    en: {
        q: 'What does "ORA-20987: APEX - The requested URL has been prohibited" mean?',
        tags: ['ORA-20987', 'The requested URL has been prohibited', 'Require Outbound HTTPS', 'REQUIRE_OUT_HTTPS', 'HTTP', 'HTTPS', 'REST Data Source', 'Autonomous'],
        r: `
            **ORA-20987** is APEX's generic error code: the real cause is in the text after "APEX -".

            "**The requested URL has been prohibited**" almost always means the app tried to call an **http://** URL (no TLS)
            while the instance requires HTTPS for outbound connections (**Require Outbound HTTPS = Yes**). On Autonomous Database,
            APEX Service and oracleapex.com this requirement is fixed.

            How to fix it:
            - Use **https://** for the endpoint (the best option).
            - On-premises, if plain HTTP is really needed (internal network), the instance administrator can turn the requirement
              off under **Manage Instance > Instance Settings > Security > HTTP Protocol** or with SQL:

            ~~~plsql
            begin
                apex_instance_admin.set_parameter('REQUIRE_OUT_HTTPS', 'N');
                commit;
            end;
            ~~~

            Other common ORA-20987 variants:
            - A **Web Credential** used with a URL outside its **Valid for URLs** list.
            - APEX APIs called **outside an APEX session** (scheduler job, SQL Developer): create one with
              «apex_session.create_session» or set the workspace with «apex_util.set_workspace».

            :::atencao
            Turning off outbound HTTPS leaves traffic readable on the network. Prefer enabling TLS on the target service.
            :::
        `
    }
});

DOC.pergunta({
    id: 'lost-update-current-version-changed',
    tema: 'erros',
    ver: ['formularios', 'interactive-grid', 'processos-computacoes-validacoes'],
    pt: {
        q: 'Por que aparece "Current version of data in database has changed since user initiated update process"?',
        tags: ['Current version of data in database has changed since user initiated update process', 'lost update', 'checksum', 'Prevent Lost Updates', 'bloqueio otimista', 'optimistic locking'],
        r: `
            É a **proteção contra atualização perdida** (*lost update*, bloqueio otimista). Ao exibir o registro, o APEX guarda um
            checksum dos valores; no submit, compara com o que está no banco **naquele momento**. Se forem diferentes, o update é
            recusado para não sobrescrever a mudança de outra pessoa.

            Causas comuns:
            - Outro usuário (ou um job) alterou o registro enquanto o formulário estava aberto. Nesse caso, o erro está certo:
              recarregue a página e refaça a alteração.
            - Um processo **anterior** no mesmo submit já fez update na mesma linha antes do processo DML do form.
            - Uma trigger ou rotina que atualiza a linha no momento em que ela é lida ou exibida.

            Como resolver:
            - Coloque a lógica extra **depois** do processo DML, ou dentro dele (PL/SQL próprio).
            - Evite atualizar a linha durante a renderização da página.
            - No Interactive Grid, considere usar uma **coluna de versão** (Lost Update Type = Row Version Column) em vez de
              comparar todos os valores.

            :::atencao
            Dá para desligar **Prevent Lost Updates** no processo **Form - Automatic Row Processing (DML)**, mas isso esconde o
            problema e permite que um usuário apague, sem saber, a alteração de outro.
            :::
        `
    },
    en: {
        q: 'Why do I get "Current version of data in database has changed since user initiated update process"?',
        tags: ['Current version of data in database has changed since user initiated update process', 'lost update', 'checksum', 'Prevent Lost Updates', 'optimistic locking'],
        r: `
            This is **lost update protection** (optimistic locking). When the record is displayed, APEX keeps a checksum of its
            values; on submit it compares that with what is in the database **at that moment**. If they differ, the update is
            rejected so it does not overwrite someone else's change.

            Common causes:
            - Another user (or a job) changed the record while the form was open. Here the error is right: reload the page and
              redo the change.
            - An **earlier** process in the same submit already updated the same row before the form's DML process.
            - A trigger or routine that updates the row when it is read or displayed.

            How to fix it:
            - Put the extra logic **after** the DML process, or inside it (custom PL/SQL).
            - Avoid updating the row while the page renders.
            - In the Interactive Grid, consider a **row version column** (Lost Update Type = Row Version Column) instead of comparing
              every value.

            :::atencao
            You can turn off **Prevent Lost Updates** in the **Form - Automatic Row Processing (DML)** process, but that hides the
            problem and lets one user silently wipe out another user's change.
            :::
        `
    }
});

DOC.pergunta({
    id: 'page-already-submitted-duplo-clique',
    tema: 'erros',
    ver: ['botoes-e-branches', 'processos-computacoes-validacoes', 'javascript-api'],
    pt: {
        q: 'Como evito duplo clique sem receber "This page was already submitted and can not be re-submitted"?',
        tags: ['This page was already submitted and can not be re-submitted', 'duplo clique', 'double submit', 'Allow Duplicate Submissions', 'Reload on Submit', 'showWait'],
        r: `
            A mensagem vem do atributo de página **Allow Duplicate Submissions = No**. Ele bloqueia um segundo submit da mesma
            página, mas, combinado com erros de validação e **Reload on Submit = Only for Success**, pode impedir o usuário de
            submeter de novo **depois de corrigir os erros**.

            Alternativas mais amigáveis:
            - Deixe duplicate submissions permitido e submeta mostrando o indicador de espera, que impede cliques repetidos:

            ~~~js
            apex.page.submit({ request: "SALVAR", showWait: true });
            ~~~

            - Desabilite o botão no clique (ação **Disable** de uma Dynamic Action antes do submit).
            - Torne o processamento **idempotente**: constraints únicas (ex.: número do pedido) impedem registros duplicados mesmo
              que dois submits cheguem ao servidor.
            - Se mantiver a proteção, use **Reload on Submit = Always**, para que a página seja recarregada também quando há erro.

            :::dica
            A proteção mais confiável contra duplicidade está no **banco** (constraint ou chave única), não na interface.
            :::
        `
    },
    en: {
        q: 'How do I prevent double clicks without getting "This page was already submitted and can not be re-submitted"?',
        tags: ['This page was already submitted and can not be re-submitted', 'double click', 'double submit', 'Allow Duplicate Submissions', 'Reload on Submit', 'showWait'],
        r: `
            The message comes from the page attribute **Allow Duplicate Submissions = No**. It blocks a second submit of the same
            page but, combined with validation errors and **Reload on Submit = Only for Success**, it can stop users from
            submitting again **after fixing the errors**.

            Friendlier alternatives:
            - Allow duplicate submissions and submit with the wait indicator, which blocks repeated clicks:

            ~~~js
            apex.page.submit({ request: "SAVE", showWait: true });
            ~~~

            - Disable the button on click (a **Disable** action in a Dynamic Action before the submit).
            - Make processing **idempotent**: unique constraints (e.g., the order number) prevent duplicate rows even if two
              submits reach the server.
            - If you keep the protection, use **Reload on Submit = Always**, so the page also reloads when there are errors.

            :::dica
            The most reliable protection against duplicates lives in the **database** (a unique constraint or key), not in the UI.
            :::
        `
    }
});

DOC.pergunta({
    id: 'configurar-provedor-ia',
    tema: 'ia',
    ver: ['servicos-de-ia-generativa', 'ai-agents-e-rag', 'ia-no-apex-visao-geral'],
    pt: {
        q: 'Como configuro um provedor de IA (OpenAI, OCI Generative AI, Claude, Gemini) no APEX?',
        tags: ['IA', 'AI', 'Generative AI Services', 'OpenAI', 'OCI Generative AI', 'Anthropic Claude', 'Google Gemini', 'Mistral', 'Ollama', 'Cohere', 'AI Agents', 'APEX Assistant'],
        r: `
            1. Em **Workspace Utilities > Generative AI Services**, crie um serviço: escolha o provedor, a URL base, o modelo e uma
               **Web Credential** com a chave de API.
            2. Marque **Used by App Builder** se quiser que o **APEX Assistant** do App Builder use esse serviço.
            3. Em cada aplicação, defina como a IA será usada em **Shared Components**. No 26.1 isso se chama **AI Agents**
               (antes, *AI Configurations*): prompt de sistema, ferramentas (AI Tools) e fontes de contexto.

            Provedores:
            - **24.1**: OCI Generative AI, OpenAI e Cohere.
            - **26.1**: além desses, **Anthropic Claude**, **Google Gemini**, **Mistral AI** e **Ollama** (modelos locais).

            :::atencao On-premises
            O banco precisa de ACL de rede e de wallet para alcançar o endpoint do provedor
            (veja [ORA-24247 e ORA-29024](#/faq/ora-24247-ora-29024-acl-wallet)). Defina também limites de uso: o 26.1 permite
            configurar o máximo de tokens de IA por instância e por workspace.
            :::

            :::info
            No 26.1, alguns modelos antigos da Cohere foram marcados como *deprecated*; a recomendação é migrar para
            «cohere.command-a-03-2025».
            :::
        `
    },
    en: {
        q: 'How do I configure an AI provider (OpenAI, OCI Generative AI, Claude, Gemini) in APEX?',
        tags: ['AI', 'Generative AI Services', 'OpenAI', 'OCI Generative AI', 'Anthropic Claude', 'Google Gemini', 'Mistral', 'Ollama', 'Cohere', 'AI Agents', 'APEX Assistant'],
        r: `
            1. Under **Workspace Utilities > Generative AI Services**, create a service: pick the provider, base URL, model and a
               **Web Credential** holding the API key.
            2. Turn on **Used by App Builder** if you want the App Builder **APEX Assistant** to use that service.
            3. In each application, define how AI is used under **Shared Components**. In 26.1 these are called **AI Agents**
               (formerly *AI Configurations*): system prompt, tools (AI Tools) and context sources.

            Providers:
            - **24.1**: OCI Generative AI, OpenAI and Cohere.
            - **26.1**: also **Anthropic Claude**, **Google Gemini**, **Mistral AI** and **Ollama** (local models).

            :::atencao On-premises
            The database needs a network ACL and a wallet to reach the provider endpoint
            (see [ORA-24247 and ORA-29024](#/faq/ora-24247-ora-29024-acl-wallet)). Also set usage limits: 26.1 lets you configure
            the maximum AI tokens per instance and per workspace.
            :::

            :::info
            In 26.1 some older Cohere models were deprecated; the recommendation is to move to «cohere.command-a-03-2025».
            :::
        `
    }
});

DOC.pergunta({
    id: 'usar-ia-dentro-do-app',
    tema: 'ia',
    ver: ['chat-e-geracao-de-texto', 'apex-ai-pacote', 'ai-agents-e-rag'],
    pt: {
        q: 'Como uso IA dentro do meu app (chat, resumo, consulta em linguagem natural)?',
        tags: ['IA', 'chat', 'resumo', 'Show AI Assistant', 'Generate Text with AI', 'APEX_AI', 'AI Agents', 'AI Tools', 'linguagem natural', 'Interactive Report'],
        r: `
            Opções declarativas:
            - Dynamic Action **Show AI Assistant** (24.1): abre um chat no app. No 26.1 aceita Items to Submit e AI Agent.
            - Dynamic Action **Generate Text with AI** (24.2): gera texto a partir de itens da página (resumos, sugestões).
            - **Novo no 26.1**: processo **Generate Text with AI**, **AI Agents** com **AI Tools** (Retrieve Data, Execute
              Server-side Code, Execute Client-side Code, com aprovação do usuário para ações sensíveis) e **Interactive Report
              em linguagem natural**, em que o usuário filtra, agrupa e cria gráficos escrevendo o que quer.

            Em PL/SQL, com o pacote «APEX_AI» (exige uma sessão do APEX):

            ~~~plsql
            declare
                l_resumo clob;
            begin
                l_resumo := apex_ai.generate(
                                p_prompt          => 'Resuma em três frases: ' || :P1_TEXTO,
                                p_agent_static_id => 'ASSISTENTE_RH');
                :P1_RESUMO := l_resumo;
            end;
            ~~~

            No 26.1, use «p_agent_static_id» (o antigo «p_config_static_id» ficou *deprecated*) ou «p_service_static_id» para chamar
            um serviço diretamente.

            :::atencao
            Trate a saída da IA como **dado do usuário**: escape antes de exibir e nunca execute SQL gerado sem revisão e sem
            restringir o que ele pode acessar.
            :::
        `
    },
    en: {
        q: 'How do I use AI inside my app (chat, summarization, natural-language queries)?',
        tags: ['AI', 'chat', 'summarization', 'Show AI Assistant', 'Generate Text with AI', 'APEX_AI', 'AI Agents', 'AI Tools', 'natural language', 'Interactive Report'],
        r: `
            Declarative options:
            - The **Show AI Assistant** Dynamic Action (24.1): opens a chat in the app. In 26.1 it supports Items to Submit and AI Agents.
            - The **Generate Text with AI** Dynamic Action (24.2): generates text from page items (summaries, suggestions).
            - **New in 26.1**: the **Generate Text with AI** process, **AI Agents** with **AI Tools** (Retrieve Data, Execute
              Server-side Code, Execute Client-side Code, with user approval for sensitive actions) and **natural-language
              Interactive Reports**, where users filter, group and chart by typing what they want.

            In PL/SQL, with the «APEX_AI» package (it needs an APEX session):

            ~~~plsql
            declare
                l_summary clob;
            begin
                l_summary := apex_ai.generate(
                                 p_prompt          => 'Summarize in three sentences: ' || :P1_TEXT,
                                 p_agent_static_id => 'HR_ASSISTANT');
                :P1_SUMMARY := l_summary;
            end;
            ~~~

            In 26.1, use «p_agent_static_id» (the old «p_config_static_id» is deprecated) or «p_service_static_id» to call a service
            directly.

            :::atencao
            Treat AI output as **user data**: escape it before display and never run generated SQL without review and without
            restricting what it can reach.
            :::
        `
    }
});

DOC.pergunta({
    id: 'criar-app-com-ia-apexlang',
    tema: 'ia',
    ver: ['apexlang', 'apex-assistant', 'blueprints-e-spec-driven'],
    pt: {
        q: 'Dá para criar um app inteiro com IA? O que é o APEXlang?',
        tags: ['criar app com IA', 'APEXlang', '.apx', 'Create App Using Generative AI', 'APEX Assistant', 'Blueprints', 'spec-driven', 'APEX_GENDEV', 'MCP', 'SQLcl'],
        r: `
            Sim, **com revisão humana**:
            - **Desde o 24.1**: o **APEX Assistant** cria um app a partir de uma descrição em linguagem natural (Create App Using
              Generative AI) e ajuda a escrever SQL, PL/SQL e JavaScript.
            - **No 26.1**: **Blueprints** em Markdown descrevem o app e alimentam o desenvolvimento orientado a especificação
              (*spec-driven development*, API «APEX_GENDEV»).

            O **APEXlang** (novo no 26.1) é um formato de texto aberto e legível para aplicações APEX (arquivos **.apx**). Como é
            texto, assistentes de código com IA conseguem gerar e alterar apps; você versiona no Git, compara diferenças e
            **valida antes de importar** com o SQLcl 26.1.2 ou superior («apex validate», «apex import»). O compilador também
            roda no ORDS (26.1.1+).

            :::info MCP
            O APEX não tem um servidor MCP próprio. Para que agentes de IA consultem o banco, use o servidor MCP do **SQLcl**
            (desde o 25.2) ou do **ORDS** (desde o 26.2).
            :::

            :::atencao
            Revise sempre o SQL gerado, as autorizações e o Session State Protection das páginas criadas. Um app que "funciona"
            não é necessariamente um app seguro.
            :::
        `
    },
    en: {
        q: 'Can I build a whole app with AI? What is APEXlang?',
        tags: ['build app with AI', 'APEXlang', '.apx', 'Create App Using Generative AI', 'APEX Assistant', 'Blueprints', 'spec-driven', 'APEX_GENDEV', 'MCP', 'SQLcl'],
        r: `
            Yes, **with human review**:
            - **Since 24.1**: **APEX Assistant** creates an app from a natural-language description (Create App Using Generative AI)
              and helps write SQL, PL/SQL and JavaScript.
            - **In 26.1**: Markdown **Blueprints** describe the app and drive spec-driven development (the «APEX_GENDEV» API).

            **APEXlang** (new in 26.1) is an open, human-readable text format for APEX applications (**.apx** files). Because it
            is text, AI coding assistants can generate and change apps; you version it in Git, diff it and **validate it before
            importing** with SQLcl 26.1.2 or later («apex validate», «apex import»). The compiler also runs in ORDS (26.1.1+).

            :::info MCP
            APEX has no MCP server of its own. To let AI agents query the database, use the MCP server in **SQLcl** (since 25.2)
            or in **ORDS** (since 26.2).
            :::

            :::atencao
            Always review the generated SQL, the authorization schemes and Session State Protection on the generated pages. An app
            that "works" is not necessarily a secure app.
            :::
        `
    }
});

DOC.pergunta({
    id: 'aprender-apex-gratis',
    tema: 'carreira',
    ver: ['como-aprender-apex', 'onde-rodar-apex'],
    pt: {
        q: 'Por onde começo a aprender APEX de graça?',
        tags: ['aprender', 'curso', 'gratuito', 'iniciante', 'MyLearn', 'LiveLabs', 'App Gallery', 'comunidade', 'GUOB', 'estudar'],
        r: `
            **Onde praticar**
            - Um workspace gratuito em **oracleapex.com** ou um **Always Free Autonomous Database** na OCI.
            - Oracle Database Free + ORDS em container, na sua máquina.

            **Onde estudar**
            - Trilhas gratuitas de APEX no **Oracle MyLearn** (incluindo a trilha de preparação para a certificação).
            - Workshops práticos no **Oracle LiveLabs**.
            - A **App Gallery** dentro do APEX: apps de exemplo como *Sample Interactive Grids* e a referência do **Universal Theme**
              mostram como cada recurso funciona, com o código aberto para você ver.
            - A documentação oficial (App Builder User's Guide, API Reference e JavaScript API Reference).

            **Ordem sugerida**
            1. SQL e PL/SQL (a base de tudo no APEX).
            2. Fundamentos do APEX: páginas, regiões, itens, session state, processos.
            3. Dynamic Actions e a API JavaScript.
            4. REST, segurança e deploy.

            **Comunidade**: os fóruns oficiais do APEX, o apex.world e, em português, o blog Oracle LAD Cloud Experts e o GUOB
            (Grupo de Usuários Oracle do Brasil).

            :::dica
            Escolha um problema real (uma planilha do seu trabalho, um controle pessoal) e construa o app. Aprende-se muito mais
            resolvendo algo concreto do que seguindo tutoriais soltos.
            :::
        `
    },
    en: {
        q: 'Where do I start learning APEX for free?',
        tags: ['learn', 'course', 'free', 'beginner', 'MyLearn', 'LiveLabs', 'App Gallery', 'community', 'study'],
        r: `
            **Where to practice**
            - A free workspace on **oracleapex.com** or an **Always Free Autonomous Database** on OCI.
            - Oracle Database Free + ORDS in containers on your own machine.

            **Where to study**
            - Free APEX learning paths on **Oracle MyLearn** (including the certification prep path).
            - Hands-on workshops on **Oracle LiveLabs**.
            - The **App Gallery** inside APEX: sample apps such as *Sample Interactive Grids* and the **Universal Theme** reference
              show how each feature works, with the code open for you to inspect.
            - The official documentation (App Builder User's Guide, API Reference and JavaScript API Reference).

            **Suggested order**
            1. SQL and PL/SQL (the foundation of everything in APEX).
            2. APEX fundamentals: pages, regions, items, session state, processes.
            3. Dynamic Actions and the JavaScript API.
            4. REST, security and deployment.

            **Community**: the official APEX forums, apex.world and, in Portuguese, the Oracle LAD Cloud Experts blog and GUOB
            (the Brazilian Oracle user group).

            :::dica
            Pick a real problem (a spreadsheet from work, a personal tracker) and build the app. You learn far more by solving
            something concrete than by following scattered tutorials.
            :::
        `
    }
});

DOC.pergunta({
    id: 'certificacao-apex-carreira',
    tema: 'carreira',
    ver: ['como-aprender-apex'],
    pt: {
        q: 'Existe certificação de APEX? Vale a pena para a carreira?',
        tags: ['certificação', '1Z0-771', 'APEX Cloud Developer Professional', 'carreira', 'mercado', 'emprego', 'Oracle University'],
        r: `
            Sim. A certificação atual é a **Oracle APEX Cloud Developer Professional** (exame **1Z0-771**). A Oracle mantém uma
            trilha de preparação no MyLearn e, de tempos em tempos, oferece a trilha e a primeira tentativa do exame **sem custo**
            por um período limitado. Confira as condições vigentes no site da Oracle University antes de se inscrever.

            **Vale a pena?** O mercado de APEX é menor que o de frameworks web genéricos, mas é **concentrado e estável** em empresas
            que usam Oracle:
            - governo, bancos, saúde e indústria;
            - modernização de sistemas em **Oracle Forms**;
            - extensões e portais em torno de ERPs Oracle (E-Business Suite, Fusion).

            Para se destacar, combine o APEX com:
            - SQL e PL/SQL **fortes** (é o que mais diferencia um bom desenvolvedor APEX);
            - JavaScript e CSS;
            - REST, ORDS e integrações;
            - OCI e Autonomous Database;
            - os recursos novos de IA e o APEXlang do 26.1.

            :::dica
            Um portfólio com apps publicados (num workspace gratuito ou no Always Free) costuma pesar tanto quanto o certificado
            numa entrevista.
            :::
        `
    },
    en: {
        q: 'Is there an APEX certification, and is APEX worth it for my career?',
        tags: ['certification', '1Z0-771', 'APEX Cloud Developer Professional', 'career', 'job market', 'jobs', 'Oracle University'],
        r: `
            Yes. The current certification is **Oracle APEX Cloud Developer Professional** (exam **1Z0-771**). Oracle keeps a prep
            path on MyLearn and, from time to time, offers the path and the first exam attempt **at no cost** for a limited period.
            Check the current terms on the Oracle University site before you sign up.

            **Is it worth it?** The APEX job market is smaller than that of generic web frameworks, but it is **concentrated and
            stable** in Oracle shops:
            - government, banking, healthcare and manufacturing;
            - modernization of **Oracle Forms** systems;
            - extensions and portals around Oracle ERPs (E-Business Suite, Fusion).

            To stand out, pair APEX with:
            - **strong** SQL and PL/SQL (the biggest differentiator for an APEX developer);
            - JavaScript and CSS;
            - REST, ORDS and integrations;
            - OCI and Autonomous Database;
            - the new AI features and APEXlang in 26.1.

            :::dica
            A portfolio of published apps (on a free workspace or Always Free) often weighs as much as the certificate in an
            interview.
            :::
        `
    }
});
