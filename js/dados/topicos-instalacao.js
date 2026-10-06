DOC.topico({
    id: 'onde-rodar-apex',
    cat: 'instalacao',
    nivel: 'basico',
    links: [
        { t: 'apex.oracle.com — workspace gratuito', u: 'https://apex.oracle.com/' },
        { t: 'Always Free Autonomous AI Database — limites', u: 'https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/autonomous-always-free.html' },
        { t: 'Installation Guide 26.1 — requisitos', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/apex-installation-requirements.html' }
    ],
    relacionados: ['o-que-e-apex', 'instalacao-apex', 'ords', 'upgrade-e-patches', 'como-aprender-apex'],
    pt: {
        titulo: 'Onde rodar o APEX',
        resumo: 'apex.oracle.com, Always Free, APEX Service, Autonomous Database, on-premises ou Oracle AI Database Free: custos, limites e quando usar cada um.',
        tags: ['onde rodar', 'hospedagem', 'Always Free', 'Autonomous Database', 'APEX Service', 'Database Free', 'container', 'docker', 'OCI', 'nuvem', 'on-premises'],
        conteudo: `
            O APEX sempre roda **dentro de um Oracle Database** e precisa de um servidor web (o ORDS) na frente. O que muda de um
            ambiente para outro é *quem* cuida da instalação, dos patches e dos backups — e quanto isso custa.

            ## Visão geral das opções
            | Opção | Custo | Quem administra | Indicado para |
            |---|---|---|---|
            | apex.oracle.com | Grátis | Oracle | Aprender, testar ideias, demos |
            | Always Free Autonomous Database | Grátis | Oracle | Projetos pessoais, protótipos, apps pequenas |
            | APEX Service | Pago (baixo custo) | Oracle | Produção focada em APEX |
            | Autonomous Database (pago) | Pago | Oracle | Produção com uso amplo do banco |
            | On-premises, VM ou OCI Base Database | Licença do banco | Você | Controle total, requisitos corporativos |
            | Oracle AI Database 26ai Free | Grátis | Você | Desenvolvimento local e laboratório |

            ## apex.oracle.com
            Você solicita um workspace gratuito no site e em minutos está desenvolvendo, sempre na versão mais recente do APEX.
            É o ambiente oficial de **avaliação**: ótimo para aprender e montar demonstrações, mas **não é para produção** — não há
            SLA nem garantias sobre os seus dados.

            ## Always Free Autonomous Database
            Na Oracle Cloud (OCI) qualquer conta pode criar bancos **Always Free**, com APEX e ORDS já instalados e atualizados
            pela Oracle. Limites oficiais:
            - até **2** bancos Always Free por tenancy, com **20 GB** de armazenamento cada;
            - no máximo **30 sessões** simultâneas no banco; na interface HTTP (APEX, ORDS e Database Actions) algo entre
              **3 e 6 usuários simultâneos** — acima disso podem aparecer erros HTTP 429;
            - o banco é **parado após 7 dias sem uso** e pode ser **excluído** se ficar 90 dias parado ou inativo.

            Os tipos de workload disponíveis no Always Free incluem Transaction Processing, JSON, Lakehouse e **APEX Service**.

            ## APEX Service
            O **Oracle APEX Application Development** — o *APEX Service*; a documentação 26.1 também o chama de
            *Oracle APEX AI Application Generator Service* — é um Autonomous Database de baixo custo, pensado para quem quer só
            desenvolver e hospedar aplicações APEX. Usa o modelo de cobrança por ECPU, recebe patches automaticamente e pode ser
            **promovido** para Autonomous Transaction Processing se você precisar de todos os recursos do banco.

            ## Autonomous Database (pago)
            Mesma experiência gerenciada — APEX pré-instalado, patches automáticos, backups e escalabilidade — com todos os recursos
            do banco. Novas versões do APEX chegam ao Autonomous algumas semanas depois do lançamento: o 26.1 saiu em 14/05/2026 e
            ficou disponível no Autonomous em 14/07/2026.

            ## On-premises, VM ou OCI Base Database
            Você instala o banco, o APEX e o ORDS (veja [Instalando o APEX](#/topico/instalacao-apex) e [ORDS](#/topico/ords)).
            Em troca do trabalho, ganha controle total: decide quando atualizar, integra com a rede corporativa e pode usar uma
            instalação **runtime-only** em produção — opção que não existe nos serviços do Oracle Cloud.

            ## Oracle AI Database 26ai Free
            Edição gratuita do banco, com limites de CPU, memória e armazenamento, que roda em Linux, Windows ou em container.
            É o jeito mais prático de ter um APEX **local** para estudar ou desenvolver offline. A Oracle publica imagens no
            Oracle Container Registry, como «container-registry.oracle.com/database/free» (banco) e
            «container-registry.oracle.com/database/ords» (ORDS).

            :::dica Qual escolher?
            - Quer aprender agora? **apex.oracle.com**.
            - Projeto pessoal ou protótipo que precisa ficar no ar? **Always Free**.
            - Produção sem DBA dedicado? **APEX Service** ou **Autonomous Database**.
            - Rede interna, versões controladas, integração com sistemas legados? **On-premises**.
            :::

            ## Descobrindo a versão do seu ambiente
            Em qualquer opção você confere a versão e os patch sets instalados com duas consultas:

            ~~~sql
            -- Versão do APEX (ex.: 26.1.5)
            select version_no, api_compatibility
              from apex_release;

            -- Histórico de patch sets aplicados
            select patch_number, patch_version, installed_on
              from apex_patches
             order by installed_on;
            ~~~

            :::atencao Requisitos mudaram no 26.1
            O APEX 26.1 exige Oracle Database 19c com RU 19.18 ou superior (ou Oracle AI Database 26ai 23.26.0+) e ORDS 26.1.1
            ou superior. Nos serviços gerenciados isso é transparente; on-premises, verifique antes de atualizar.
            :::
        `
    },
    en: {
        titulo: 'Where to run APEX',
        resumo: 'apex.oracle.com, Always Free, APEX Service, Autonomous Database, on-premises or Oracle AI Database Free: costs, limits and when to use each.',
        tags: ['where to run', 'hosting', 'Always Free', 'Autonomous Database', 'APEX Service', 'Database Free', 'container', 'docker', 'OCI', 'cloud', 'on-premises'],
        conteudo: `
            APEX always runs **inside an Oracle Database** and needs a web listener (ORDS) in front of it. What changes from one
            environment to another is *who* takes care of installation, patching and backups — and how much it costs.

            ## Options at a glance
            | Option | Cost | Managed by | Best for |
            |---|---|---|---|
            | apex.oracle.com | Free | Oracle | Learning, trying ideas, demos |
            | Always Free Autonomous Database | Free | Oracle | Personal projects, prototypes, small apps |
            | APEX Service | Paid (low cost) | Oracle | APEX-focused production |
            | Autonomous Database (paid) | Paid | Oracle | Production with broad database usage |
            | On-premises, VM or OCI Base Database | Database license | You | Full control, corporate requirements |
            | Oracle AI Database 26ai Free | Free | You | Local development and labs |

            ## apex.oracle.com
            Request a free workspace on the site and you are building within minutes, always on the latest APEX release. It is the
            official **evaluation** environment: great for learning and demos, but **not for production** — there is no SLA and
            no guarantee for your data.

            ## Always Free Autonomous Database
            On Oracle Cloud (OCI) any account can create **Always Free** databases with APEX and ORDS preinstalled and kept up to
            date by Oracle. Official limits:
            - up to **2** Always Free databases per tenancy, with **20 GB** of storage each;
            - at most **30 simultaneous** database sessions; on the HTTP interface (APEX, ORDS and Database Actions) roughly
              **3 to 6 simultaneous users** — beyond that you may get HTTP 429 errors;
            - the database is **stopped after 7 days of inactivity** and may be **reclaimed** after 90 days stopped or inactive.

            Workload types available as Always Free include Transaction Processing, JSON, Lakehouse and **APEX Service**.

            ## APEX Service
            **Oracle APEX Application Development** — the *APEX Service*; the 26.1 documentation also calls it
            *Oracle APEX AI Application Generator Service* — is a low-cost Autonomous Database for people who only want to build and
            host APEX apps. It uses the ECPU billing model, is patched automatically and can be **promoted** to Autonomous
            Transaction Processing when you need the full database feature set.

            ## Autonomous Database (paid)
            The same managed experience — APEX preinstalled, automatic patching, backups and scalability — with every database
            feature. New APEX releases reach Autonomous a few weeks after GA: 26.1 shipped on 2026-05-14 and became available on
            Autonomous on 2026-07-14.

            ## On-premises, VM or OCI Base Database
            You install the database, APEX and ORDS yourself (see [Installing APEX](#/topico/instalacao-apex) and
            [ORDS](#/topico/ords)). In exchange you get full control: you decide when to upgrade, integrate with the corporate
            network and can use a **runtime-only** installation in production — an option not available on Oracle Cloud services.

            ## Oracle AI Database 26ai Free
            The free database edition, with CPU, memory and storage limits, running on Linux, Windows or in a container. It is the
            easiest way to have a **local** APEX for study or offline development. Oracle publishes images on the Oracle Container
            Registry, such as «container-registry.oracle.com/database/free» (database) and
            «container-registry.oracle.com/database/ords» (ORDS).

            :::dica Which one should I pick?
            - Want to learn right now? **apex.oracle.com**.
            - A personal project or prototype that must stay online? **Always Free**.
            - Production without a dedicated DBA? **APEX Service** or **Autonomous Database**.
            - Internal network, controlled versions, legacy integration? **On-premises**.
            :::

            ## Finding out your environment's version
            In any option, two queries tell you the release and the patch sets installed:

            ~~~sql
            -- APEX release (e.g. 26.1.5)
            select version_no, api_compatibility
              from apex_release;

            -- Patch set history
            select patch_number, patch_version, installed_on
              from apex_patches
             order by installed_on;
            ~~~

            :::atencao Requirements changed in 26.1
            APEX 26.1 requires Oracle Database 19c with RU 19.18 or later (or Oracle AI Database 26ai 23.26.0+) and ORDS 26.1.1
            or later. On managed services this is transparent; on-premises, check before upgrading.
            :::
        `
    }
});

DOC.topico({
    id: 'instalacao-apex',
    cat: 'instalacao',
    nivel: 'intermediario',
    links: [
        { t: 'Installation Guide 26.1 — Downloading and Installing APEX', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/downloading-installing-apex.html' },
        { t: 'Installation Guide 26.1 — Requirements', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/apex-installation-requirements.html' },
        { t: 'Installation Guide 26.1 — Configuring ORDS', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/configuring-ords.html' }
    ],
    relacionados: ['onde-rodar-apex', 'ords', 'upgrade-e-patches', 'administracao-instancia', 'arquivos-estaticos-e-cdn'],
    pt: {
        titulo: 'Instalando o APEX passo a passo',
        resumo: 'Requisitos do APEX 26.1, full development x runtime, apexins.sql, apxchpwd.sql, apex_rest_config.sql, ACL de rede e verificação final.',
        tags: ['instalação', 'install', 'apexins.sql', 'apxrtins.sql', 'apxchpwd.sql', 'apex_rest_config.sql', 'runtime', 'requisitos', 'ACL', 'DBMS_NETWORK_ACL_ADMIN', 'PDB'],
        conteudo: `
            Este roteiro cobre uma instalação **nova** do APEX 26.1 em banco próprio (on-premises, VM ou container). Em Autonomous
            Database e APEX Service o APEX já vem instalado e configurado — pule tudo isto.

            ## Requisitos do 26.1
            | Item | Requisito |
            |---|---|
            | Banco | Oracle Database 19c com RU 19.18+ ou Oracle AI Database 26ai 23.26.0+ (todas as edições, inclusive a Free) |
            | Memória | SGA de pelo menos 1200 MB e PGA de pelo menos 300 MB; «WORKAREA_SIZE_POLICY» = AUTO |
            | Servidor web | ORDS 26.1.1 ou superior — em instalações novas, instale o ORDS **antes** do APEX |
            | Oracle XML DB | Obrigatório para o ambiente de desenvolvimento completo |
            | Disco | ~670 MB (só inglês) ou ~1,2 GB (download completo); ~260 MB livres no tablespace do APEX |

            ## Full development ou runtime?
            - **Full development** («apexins.sql»): App Builder, SQL Workshop e Administration Services.
            - **Runtime** («apxrtins.sql»): só executa aplicações, sem interface de desenvolvimento. A Oracle recomenda runtime
              para aplicações de produção sensíveis.
            - Dá para converter depois: «apxdvins.sql» (runtime para full) e «apxdevrm.sql» (full para runtime).

            ## Passo a passo
            ### 1. Prepare os arquivos e o ORDS
            Baixe o ZIP na página oficial de downloads do APEX e descompacte em um caminho **curto e sem espaços** (no Windows,
            uma pasta logo abaixo da raiz do disco). Instale e configure o ORDS (veja [ORDS](#/topico/ords)).

            ### 2. Conecte-se ao PDB
            Entre no diretório «apex» e conecte-se como SYS com SYSDBA **no PDB** onde o APEX vai ficar:

            ~~~bash
            cd /opt/install/apex
            sql sys@//dbhost:1521/FREEPDB1 as sysdba
            ~~~

            ### 3. Rode a instalação
            Os parâmetros são: tablespace do APEX, tablespace dos arquivos, tablespace temporário e o diretório virtual das
            imagens (mantenha «/i/» para facilitar upgrades):

            ~~~sql
            @apexins.sql SYSAUX SYSAUX TEMP /i/
            ~~~

            ### 4. Administrador e RESTful Services
            Crie a conta de administrador da instância (o script pede usuário, e-mail e senha) e configure os RESTful Services —
            necessários também para servir arquivos estáticos (o script pede senhas para «APEX_LISTENER» e
            «APEX_REST_PUBLIC_USER»):

            ~~~sql
            @apxchpwd.sql
            @apex_rest_config.sql
            ~~~

            ### 5. Contas públicas e rede
            Desbloqueie as contas públicas e libere a saída de rede — sem isso, e-mail, chamadas REST, LDAP e impressão remota
            falham:

            ~~~plsql
            alter user apex_public_user account unlock;
            alter user apex_public_router account unlock;

            begin
                dbms_network_acl_admin.append_host_ace(
                    host => 'localhost',   -- ou '*' para qualquer host
                    ace  => xs$ace_type(
                                privilege_list => xs$name_list('connect'),
                                principal_name => apex_application.g_flow_schema_owner,
                                principal_type => xs_acl.ptype_db));
            end;
            /
            ~~~

            ### 6. Imagens e ORDS
            - Publique as imagens: copie a pasta «apex/images» para onde o ORDS as serve, ou aponte para a CDN da Oracle
              (veja [Arquivos estáticos e CDN](#/topico/arquivos-estaticos-e-cdn)).
            - Garanta o ORDS em modo «proxied» («ords config set plsql.gateway.mode proxied»), reinicie-o e acesse
              «http://servidor:8080/ords». Para administrar a instância, entre no workspace **INTERNAL** com o usuário criado no
              passo 4.

            ## Conferindo a instalação
            ~~~sql
            select comp_id, version, status
              from dba_registry
             where comp_id = 'APEX';     -- STATUS deve ser VALID

            select version_no from apex_release;
            ~~~

            :::atencao Prefira instalar no PDB
            Instalar no «CDB$ROOT» torna o APEX comum a todos os PDBs, amarra a versão de todos eles e impede recursos como o
            upgrade com tempo mínimo de indisponibilidade. Na maioria dos casos, instale em cada PDB que precisar do APEX.
            :::

            :::dica Instalação silenciosa e logs
            O script «apxsilentins.sql» faz a instalação e define as senhas em um único comando — útil em scripts e containers.
            A instalação grava um arquivo de log no diretório corrente e, no 26.1, o Administration Services ganhou o relatório
            **Install / Upgrade Logs**, com todas as fases, avisos e erros.
            :::

            Depois de instalar, configure e-mail, wallet e parâmetros da instância em
            [Administração da instância](#/topico/administracao-instancia) e crie seu primeiro workspace em
            [Gerenciando workspaces](#/topico/gerenciando-workspaces).
        `
    },
    en: {
        titulo: 'Installing APEX step by step',
        resumo: 'APEX 26.1 requirements, full development vs runtime, apexins.sql, apxchpwd.sql, apex_rest_config.sql, network ACL and final checks.',
        tags: ['installation', 'install', 'apexins.sql', 'apxrtins.sql', 'apxchpwd.sql', 'apex_rest_config.sql', 'runtime', 'requirements', 'ACL', 'DBMS_NETWORK_ACL_ADMIN', 'PDB'],
        conteudo: `
            This walkthrough covers a **fresh** APEX 26.1 installation on your own database (on-premises, VM or container). On
            Autonomous Database and APEX Service, APEX is already installed and configured — skip all of this.

            ## 26.1 requirements
            | Item | Requirement |
            |---|---|
            | Database | Oracle Database 19c with RU 19.18+ or Oracle AI Database 26ai 23.26.0+ (all editions, including Free) |
            | Memory | SGA of at least 1200 MB and PGA of at least 300 MB; «WORKAREA_SIZE_POLICY» = AUTO |
            | Web listener | ORDS 26.1.1 or later — for new installations, install ORDS **before** APEX |
            | Oracle XML DB | Required for a full development environment |
            | Disk | ~670 MB (English only) or ~1.2 GB (full download); ~260 MB free in the APEX tablespace |

            ## Full development or runtime?
            - **Full development** («apexins.sql»): App Builder, SQL Workshop and Administration Services.
            - **Runtime** («apxrtins.sql»): only runs applications, with no development UI. Oracle recommends runtime for sensitive
              production applications.
            - You can convert later: «apxdvins.sql» (runtime to full) and «apxdevrm.sql» (full to runtime).

            ## Step by step
            ### 1. Prepare the files and ORDS
            Download the ZIP from the official APEX downloads page and unzip it into a **short path without spaces** (on Windows,
            a folder right below the drive root). Install and configure ORDS (see [ORDS](#/topico/ords)).

            ### 2. Connect to the PDB
            Change into the «apex» directory and connect as SYS with SYSDBA **to the PDB** that will host APEX:

            ~~~bash
            cd /opt/install/apex
            sql sys@//dbhost:1521/FREEPDB1 as sysdba
            ~~~

            ### 3. Run the installer
            The arguments are: APEX tablespace, files tablespace, temporary tablespace and the virtual images directory (keep
            «/i/» to make upgrades easier):

            ~~~sql
            @apexins.sql SYSAUX SYSAUX TEMP /i/
            ~~~

            ### 4. Administrator and RESTful Services
            Create the instance administrator account (the script prompts for user name, e-mail and password) and configure
            RESTful Services — also required to serve static files (the script prompts for passwords for «APEX_LISTENER» and
            «APEX_REST_PUBLIC_USER»):

            ~~~sql
            @apxchpwd.sql
            @apex_rest_config.sql
            ~~~

            ### 5. Public accounts and network
            Unlock the public accounts and allow outbound network access — without it, e-mail, REST calls, LDAP and remote
            printing fail:

            ~~~plsql
            alter user apex_public_user account unlock;
            alter user apex_public_router account unlock;

            begin
                dbms_network_acl_admin.append_host_ace(
                    host => 'localhost',   -- or '*' for any host
                    ace  => xs$ace_type(
                                privilege_list => xs$name_list('connect'),
                                principal_name => apex_application.g_flow_schema_owner,
                                principal_type => xs_acl.ptype_db));
            end;
            /
            ~~~

            ### 6. Images and ORDS
            - Publish the images: copy the «apex/images» folder to where ORDS serves it from, or point to Oracle's CDN
              (see [Static files and CDN](#/topico/arquivos-estaticos-e-cdn)).
            - Make sure ORDS runs in «proxied» mode («ords config set plsql.gateway.mode proxied»), restart it and open
              «http://server:8080/ords». To administer the instance, sign in to the **INTERNAL** workspace with the user created
              in step 4.

            ## Verifying the installation
            ~~~sql
            select comp_id, version, status
              from dba_registry
             where comp_id = 'APEX';     -- STATUS should be VALID

            select version_no from apex_release;
            ~~~

            :::atencao Prefer installing into the PDB
            Installing into «CDB$ROOT» makes APEX common to every PDB, ties all of them to the same release and rules out features
            such as the minimal-downtime upgrade. In most cases, install into each PDB that needs APEX.
            :::

            :::dica Silent install and logs
            The «apxsilentins.sql» script installs and sets the passwords in a single command — handy for scripts and containers.
            The installer writes a log file to the current directory and, in 26.1, Administration Services gained the
            **Install / Upgrade Logs** report, listing every phase, warning and error.
            :::

            After installing, configure e-mail, wallet and instance parameters in
            [Instance administration](#/topico/administracao-instancia) and create your first workspace in
            [Managing workspaces](#/topico/gerenciando-workspaces).
        `
    }
});

DOC.topico({
    id: 'ords',
    cat: 'instalacao',
    nivel: 'intermediario',
    links: [
        { t: 'ORDS 26.1 — Installing and Configuring', u: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/26.1/ordig/installing-and-configuring-oracle-rest-data-services.html' },
        { t: 'ORDS 26.1 — Deploying (standalone, Tomcat, WebLogic)', u: 'https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/26.1/ordig/deploying-and-monitoring-oracle-rest-data-services.html' },
        { t: 'APEX Installation Guide — Configuring ORDS', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/configuring-ords.html' }
    ],
    relacionados: ['arquitetura', 'instalacao-apex', 'restful-services-ords', 'arquivos-estaticos-e-cdn', 'upgrade-e-patches'],
    pt: {
        titulo: 'ORDS: o servidor web do APEX',
        resumo: 'O que o Oracle REST Data Services faz, versões, modos de implantação (standalone, Tomcat, WebLogic), instalação via CLI, pools e configuração.',
        tags: ['ORDS', 'Oracle REST Data Services', 'standalone', 'ords serve', 'ords install', 'Tomcat', 'WebLogic', 'Jetty', 'pool', 'plsql.gateway.mode', 'proxied', 'Java'],
        conteudo: `
            O **ORDS (Oracle REST Data Services)** é a aplicação Java que fica entre o navegador e o banco. Para o APEX ele faz o
            papel de *PL/SQL gateway*: recebe as requisições HTTP, pega uma conexão do pool e chama o motor do APEX. Ele também
            publica os **RESTful Services** e o AutoREST, o **Database Actions** (SQL Developer Web) e, desde a versão 22.1 (APEX e ORDS), serve
            diretamente as Friendly URLs e os arquivos estáticos das aplicações.

            ## Versões
            - O ORDS tem cerca de **quatro versões por ano**, numeradas como ano.trimestre.patch: 26.1.0 (abril/2026),
              26.2 (julho/2026, que trouxe um servidor MCP) e assim por diante.
            - O **APEX 26.1 exige ORDS 26.1.1 ou superior** (o 24.2 exigia 23.3+). Atualize o ORDS junto com o APEX.
            - Requer **Java 17 ou 21** (Oracle Java ou GraalVM).
            - Desde o ORDS 22.1 a administração é feita pela linha de comando «ords» («ords install», «ords config»,
              «ords serve»), que substituiu o antigo «java -jar ords.war».

            ## Modos de implantação
            | Modo | Como roda | Quando usar |
            |---|---|---|
            | Standalone | Servidor Jetty embutido, «ords serve» | O mais comum hoje: simples, desenvolvimento e produção |
            | Apache Tomcat 9.0.x | WAR implantado no Tomcat | Quando a empresa já padroniza Tomcat |
            | Oracle WebLogic 14.1.2 | WAR implantado no WebLogic | Ambientes Oracle Fusion Middleware |
            | Container | Imagem oficial no Oracle Container Registry | Docker/Kubernetes |

            ## Instalando (modo não interativo)
            O comando «install» cria os schemas do ORDS no banco («ORDS_METADATA» e «ORDS_PUBLIC_USER») e grava a configuração na
            pasta indicada em «--config». Rodando apenas «ords --config /opt/ords/config install», ele pergunta tudo
            interativamente. Em scripts, passe as opções e as senhas pela entrada padrão (primeiro a do SYS, depois a do usuário
            proxy):

            ~~~bash
            ords --config /opt/ords/config install --admin-user SYS --proxy-user --db-hostname dbhost --db-port 1521 --db-servicename FREEPDB1 --feature-sdw true --feature-rest-enabled-sql true --gateway-mode proxied --log-folder /opt/ords/logs --password-stdin < senhas.txt
            ~~~

            O modo do gateway pode ser «proxied» (o recomendado para o APEX), «direct» ou «disabled». Para conferir ou ajustar:

            ~~~bash
            ords --config /opt/ords/config config get plsql.gateway.mode
            ords --config /opt/ords/config config set plsql.gateway.mode proxied
            ~~~

            ## Rodando em standalone
            ~~~bash
            # Imagens do APEX servidas pelo próprio ORDS em /i/
            ords --config /opt/ords/config config set standalone.static.path /opt/apex/images
            ords --config /opt/ords/config config set standalone.context.path /ords

            # HTTPS (opcional)
            ords --config /opt/ords/config config set standalone.https.port 8443
            ords --config /opt/ords/config config set standalone.https.cert /opt/ords/cert/server.crt
            ords --config /opt/ords/config config set standalone.https.cert.key /opt/ords/cert/server.key

            ords --config /opt/ords/config serve
            ~~~

            Por padrão o ORDS escuta na porta 8080 com contexto «/ords». O «serve» também aceita opções diretas, como «--port» e
            «--apex-images /opt/apex/images». Em Tomcat, as imagens são copiadas para «webapps/i».

            ## Pools de conexão
            Cada banco atendido é um **pool** (o primeiro se chama «default»). A configuração fica em arquivos XML dentro da pasta
            de configuração (configurações globais e uma subpasta por pool). Você pode criar pools adicionais com «--db-pool» na
            instalação e ajustar o tamanho de cada um:

            ~~~bash
            ords --config /opt/ords/config config --db-pool default set jdbc.InitialLimit 10
            ords --config /opt/ords/config config --db-pool default set jdbc.MaxLimit 50
            ~~~

            :::dica Teste rápido
            Abra «http://servidor:8080/i/apex_version.txt»: se mostrar a versão do APEX, as imagens estão corretas. Depois,
            «http://servidor:8080/ords» deve abrir o login do APEX.
            :::

            :::atencao ORDS atualizado depois do APEX
            Se você atualizar o ORDS **depois** de instalar o APEX, rode como SYS «exec sys.validate_apex» para revalidar o
            APEX. E sempre confira se a versão das imagens em «/i/» corresponde à versão do APEX no banco — imagens desatualizadas
            causam erros de JavaScript difíceis de diagnosticar.
            :::

            Atrás de um balanceador ou proxy reverso, lembre-se de repassar os cabeçalhos de host e protocolo corretamente — a
            documentação do ORDS tem uma seção específica para esse cenário.
        `
    },
    en: {
        titulo: 'ORDS: the APEX web listener',
        resumo: 'What Oracle REST Data Services does, versioning, deployment modes (standalone, Tomcat, WebLogic), CLI installation, pools and configuration.',
        tags: ['ORDS', 'Oracle REST Data Services', 'standalone', 'ords serve', 'ords install', 'Tomcat', 'WebLogic', 'Jetty', 'pool', 'plsql.gateway.mode', 'proxied', 'Java'],
        conteudo: `
            **ORDS (Oracle REST Data Services)** is the Java application that sits between the browser and the database. For APEX
            it acts as the *PL/SQL gateway*: it receives HTTP requests, takes a pooled connection and calls the APEX engine. It
            also publishes **RESTful Services** and AutoREST, **Database Actions** (SQL Developer Web) and, since release 22.1 (APEX and ORDS),
            serves Friendly URLs and application static files directly.

            ## Versions
            - ORDS ships about **four releases a year**, numbered year.quarter.patch: 26.1.0 (April 2026), 26.2 (July 2026,
              which added an MCP server) and so on.
            - **APEX 26.1 requires ORDS 26.1.1 or later** (24.2 required 23.3+). Upgrade ORDS together with APEX.
            - It needs **Java 17 or 21** (Oracle Java or GraalVM).
            - Since ORDS 22.1 administration happens through the «ords» command line («ords install», «ords config»,
              «ords serve»), which replaced the old «java -jar ords.war».

            ## Deployment modes
            | Mode | How it runs | When to use |
            |---|---|---|
            | Standalone | Embedded Jetty server, «ords serve» | The most common today: simple, for dev and production |
            | Apache Tomcat 9.0.x | WAR deployed to Tomcat | When the company standardizes on Tomcat |
            | Oracle WebLogic 14.1.2 | WAR deployed to WebLogic | Oracle Fusion Middleware shops |
            | Container | Official image on Oracle Container Registry | Docker/Kubernetes |

            ## Installing (non-interactive)
            The «install» command creates the ORDS schemas in the database («ORDS_METADATA» and «ORDS_PUBLIC_USER») and writes the
            configuration to the folder given in «--config». Running just «ords --config /opt/ords/config install» asks everything
            interactively. In scripts, pass the options and feed the passwords through standard input (first SYS, then the proxy
            user):

            ~~~bash
            ords --config /opt/ords/config install --admin-user SYS --proxy-user --db-hostname dbhost --db-port 1521 --db-servicename FREEPDB1 --feature-sdw true --feature-rest-enabled-sql true --gateway-mode proxied --log-folder /opt/ords/logs --password-stdin < passwords.txt
            ~~~

            The gateway mode can be «proxied» (recommended for APEX), «direct» or «disabled». To check or change it:

            ~~~bash
            ords --config /opt/ords/config config get plsql.gateway.mode
            ords --config /opt/ords/config config set plsql.gateway.mode proxied
            ~~~

            ## Running standalone
            ~~~bash
            # APEX images served by ORDS itself under /i/
            ords --config /opt/ords/config config set standalone.static.path /opt/apex/images
            ords --config /opt/ords/config config set standalone.context.path /ords

            # HTTPS (optional)
            ords --config /opt/ords/config config set standalone.https.port 8443
            ords --config /opt/ords/config config set standalone.https.cert /opt/ords/cert/server.crt
            ords --config /opt/ords/config config set standalone.https.cert.key /opt/ords/cert/server.key

            ords --config /opt/ords/config serve
            ~~~

            By default ORDS listens on port 8080 with the «/ords» context. «serve» also accepts direct options such as «--port»
            and «--apex-images /opt/apex/images». On Tomcat, the images are copied to «webapps/i».

            ## Connection pools
            Each database served is a **pool** (the first one is called «default»). Its configuration lives in XML files inside the
            configuration folder (global settings plus one subfolder per pool). You can create extra pools with «--db-pool» at
            install time and size each one:

            ~~~bash
            ords --config /opt/ords/config config --db-pool default set jdbc.InitialLimit 10
            ords --config /opt/ords/config config --db-pool default set jdbc.MaxLimit 50
            ~~~

            :::dica Quick test
            Open «http://server:8080/i/apex_version.txt»: if it shows the APEX version, the images are fine. Then
            «http://server:8080/ords» should bring up the APEX sign-in page.
            :::

            :::atencao ORDS upgraded after APEX
            If you upgrade ORDS **after** installing APEX, run «exec sys.validate_apex» as SYS to revalidate APEX. And always check
            that the image version under «/i/» matches the APEX version in the database — stale images cause JavaScript errors
            that are hard to diagnose.
            :::

            Behind a load balancer or reverse proxy, make sure host and protocol headers are forwarded correctly — the ORDS
            documentation has a dedicated section for that scenario.
        `
    }
});

DOC.topico({
    id: 'upgrade-e-patches',
    cat: 'instalacao',
    nivel: 'avancado',
    links: [
        { t: 'Installation Guide 26.1 — Upgrading from a Previous Release', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/upgrading-from-previous-apex-release.html' },
        { t: 'Installation Guide 26.1 — Maximizing Uptime During an Upgrade', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/maximizing-uptime-during-apex-upgrade.html' },
        { t: 'Installation Guide 26.1 — About Patch Sets', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/understanding-installation-process.html' }
    ],
    relacionados: ['instalacao-apex', 'ords', 'onde-rodar-apex', 'arquivos-estaticos-e-cdn', 'exportar-importar'],
    pt: {
        titulo: 'Upgrade de versão e patch sets',
        resumo: 'Como atualizar o APEX para uma nova versão (ex.: 24.2 para 26.1), aplicar patch sets 26.1.x, reduzir a indisponibilidade e o que fazer depois.',
        tags: ['upgrade', 'atualização', 'patch set', 'PSE', 'apexins1.sql', 'apex_patches', 'APEX_260100', 'downtime', 'Upgrade Application', 'reverter'],
        conteudo: `
            Há dois tipos de atualização no APEX, com processos bem diferentes:

            | Tipo | Exemplo | O que traz | Como aplicar |
            |---|---|---|---|
            | Nova versão (upgrade) | 24.2 para 26.1 | Novos recursos, novo schema | Mesmo «apexins.sql» da instalação |
            | Patch set bundle | 26.1.4 para 26.1.5 | Apenas correções, cumulativas | Patch baixado do My Oracle Support |

            Em **Autonomous Database** e **APEX Service** a Oracle aplica os dois automaticamente; o texto abaixo vale para
            instalações próprias.

            ## Como funciona um upgrade
            Cada versão do APEX tem seu próprio schema («APEX_240200», «APEX_260100»...). O upgrade **cria o schema novo**, copia os
            metadados (workspaces, aplicações, usuários) e, no final, troca sinônimos públicos e grants para apontar para ele. O
            schema antigo continua lá — por isso **reverter** é relativamente simples (basta voltar sinônimos e grants), mas tudo o
            que foi alterado na versão nova se perde.

            - Upgrade direto para o 26.1: só a partir do **18.1 ou superior**. Versões mais antigas sobem primeiro para o 24.2.
            - Os mesmos requisitos da instalação valem: banco 19c RU 19.18+ ou 26ai, ORDS 26.1.1+.

            ## Antes de começar
            1. Leia as notas de versão (recursos deprecados e mudanças de comportamento).
            2. Faça backup do banco e copie a pasta de imagens atual com o número da versão (ex.: «images_24_2»).
            3. Teste o upgrade e suas aplicações em um ambiente que não seja produção.
            4. Confirme que «JOB_QUEUE_PROCESSES» é maior que zero.

            ## Executando
            ~~~sql
            -- No diretório apex/ do novo ZIP, conectado como SYS AS SYSDBA no PDB
            @apexins.sql SYSAUX SYSAUX TEMP /i/
            ~~~

            Depois: copie as **novas imagens** (ou use a CDN, que se atualiza sozinha), atualize/reinicie o ORDS e confira a
            versão em «APEX_RELEASE».

            ## Upgrade com tempo mínimo de indisponibilidade
            O upgrade pode ser dividido em três fases, cada uma com o mesmo conjunto de parâmetros:

            | Script | Efeito durante a execução |
            |---|---|
            | «apexins1.sql» | Desenvolvimento e execução continuam normais |
            | «apexins2.sql» | Desenvolvimento bloqueado; aplicações continuam rodando |
            | «apexins3.sql» | APEX indisponível (janela curta) |

            Esse modo não é suportado quando o APEX está instalado no «CDB$ROOT».

            ## Patch sets
            Patch sets só corrigem bugs, são **cumulativos** e mantêm o mesmo schema. Para o 26.1, o patch no My Oracle Support é o
            39179920 (em 30/09/2026 estava no 26.1.5). Siga o README do patch: em geral você roda o script do patch como SYS e
            atualiza a pasta de imagens (desnecessário com a CDN). Para ver o que já foi aplicado:

            ~~~sql
            select patch_number, patch_version, installed_on
              from apex_patches
             order by installed_on;
            ~~~

            ## Depois do upgrade
            - As aplicações existentes **continuam funcionando** sem alteração.
            - Para aproveitar os recursos novos, rode o assistente **Upgrade Application** em cada app. No 26.1 ele também
              aparece na região *New Features Available* da home da aplicação (pode ser dispensado com *Dismiss*).
            - Atualize o Universal Theme com o *refresh* da subscription do tema e revise o *Compatibility Mode*.
            - No 26.1, confira o relatório **Install / Upgrade Logs** no Administration Services.
            - Após algumas semanas de estabilidade, remova o schema da versão anterior para liberar espaço.

            :::atencao Exports entre versões
            Não é possível importar uma aplicação exportada de uma versão **mais nova** em uma mais antiga. E, a partir do 26.1,
            exports de **páginas isoladas ou componentes** de versões anteriores não podem mais ser importados — apenas
            aplicações completas.
            :::

            :::dica Ambiente por ambiente
            Atualize na ordem dev, teste e produção, e só mova aplicações entre ambientes que estejam na **mesma versão**. Uma
            app exportada de um dev já em 26.1 não instala em uma produção ainda em 24.2.
            :::
        `
    },
    en: {
        titulo: 'Release upgrades and patch sets',
        resumo: 'How to upgrade APEX to a new release (e.g. 24.2 to 26.1), apply 26.1.x patch sets, reduce downtime and what to do afterwards.',
        tags: ['upgrade', 'update', 'patch set', 'PSE', 'apexins1.sql', 'apex_patches', 'APEX_260100', 'downtime', 'Upgrade Application', 'revert'],
        conteudo: `
            There are two kinds of APEX updates, with very different processes:

            | Type | Example | What it brings | How to apply |
            |---|---|---|---|
            | New release (upgrade) | 24.2 to 26.1 | New features, new schema | The same «apexins.sql» used to install |
            | Patch set bundle | 26.1.4 to 26.1.5 | Bug fixes only, cumulative | Patch downloaded from My Oracle Support |

            On **Autonomous Database** and **APEX Service** Oracle applies both automatically; what follows applies to self-managed
            installations.

            ## How an upgrade works
            Each APEX release has its own schema («APEX_240200», «APEX_260100»...). The upgrade **creates the new schema**, copies
            the metadata (workspaces, applications, users) and finally switches public synonyms and grants to point at it. The old
            schema stays in place — so **reverting** is relatively simple (switch synonyms and grants back), but anything changed
            in the new release is lost.

            - Direct upgrade to 26.1: only from **18.1 or later**. Older releases go to 24.2 first.
            - The installation requirements apply: database 19c RU 19.18+ or 26ai, ORDS 26.1.1+.

            ## Before you start
            1. Read the release notes (deprecated features and changed behavior).
            2. Back up the database and copy the current images folder with the release number (e.g. «images_24_2»).
            3. Test the upgrade and your applications in a non-production environment.
            4. Make sure «JOB_QUEUE_PROCESSES» is greater than zero.

            ## Running it
            ~~~sql
            -- From the apex/ directory of the new ZIP, connected as SYS AS SYSDBA to the PDB
            @apexins.sql SYSAUX SYSAUX TEMP /i/
            ~~~

            Then copy the **new images** (or use the CDN, which updates itself), upgrade/restart ORDS and check the version in
            «APEX_RELEASE».

            ## Minimal-downtime upgrade
            The upgrade can be split into three phases, each taking the same arguments:

            | Script | Effect while it runs |
            |---|---|
            | «apexins1.sql» | Development and runtime keep working |
            | «apexins2.sql» | Development disabled; applications keep running |
            | «apexins3.sql» | APEX unavailable (short window) |

            This mode is not supported when APEX is installed in «CDB$ROOT».

            ## Patch sets
            Patch sets only fix bugs, are **cumulative** and keep the same schema. For 26.1, the My Oracle Support patch is
            39179920 (at 2026-09-30 it was at 26.1.5). Follow the patch README: typically you run the patch script as SYS and
            refresh the images folder (not needed with the CDN). To see what has been applied:

            ~~~sql
            select patch_number, patch_version, installed_on
              from apex_patches
             order by installed_on;
            ~~~

            ## After the upgrade
            - Existing applications **keep working** without changes.
            - To use new features, run the **Upgrade Application** wizard on each app. In 26.1 it also shows up in the
              *New Features Available* region of the application home page (you can *Dismiss* it).
            - Refresh Universal Theme through the theme subscription and review the *Compatibility Mode*.
            - In 26.1, check the **Install / Upgrade Logs** report in Administration Services.
            - After a few stable weeks, drop the previous release's schema to free space.

            :::atencao Exports across releases
            You cannot import an application exported from a **newer** release into an older one. And starting with 26.1,
            **single page or component** exports from earlier releases can no longer be imported — only full applications.
            :::

            :::dica One environment at a time
            Upgrade in order — dev, test, then production — and only move applications between environments on the **same
            release**. An app exported from a dev already on 26.1 will not install into a production still on 24.2.
            :::
        `
    }
});

DOC.topico({
    id: 'administracao-instancia',
    cat: 'instalacao',
    nivel: 'avancado',
    links: [
        { t: 'Administration Guide 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeadm/' },
        { t: 'APEX_INSTANCE_ADMIN — Available Parameter Values', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_INSTANCE_ADMIN.Available-Parameter-Values.html' },
        { t: 'Release Notes 26.1 — Enabling Network Services', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmrn/changed-behavior.html' }
    ],
    relacionados: ['gerenciando-workspaces', 'instalacao-apex', 'apex-mail', 'monitoramento', 'web-credentials'],
    pt: {
        titulo: 'Administração da instância',
        resumo: 'Administration Services e APEX_INSTANCE_ADMIN: configurações da instância, SMTP, wallet, ACL de rede, segurança e as novidades do 26.1.',
        tags: ['Administration Services', 'INTERNAL', 'apex_admin', 'APEX_INSTANCE_ADMIN', 'SET_PARAMETER', 'SMTP', 'wallet', 'ACL', 'instance settings', 'APEX_ADMINISTRATOR_ROLE'],
        conteudo: `
            Uma **instância** APEX é a instalação inteira em um banco (ou PDB): todos os workspaces, aplicações e configurações
            globais. Quem cuida dela é o **administrador da instância**, usando o *Administration Services* ou a API PL/SQL
            «APEX_INSTANCE_ADMIN».

            ## Acessando o Administration Services
            - URL: «/ords/apex_admin» (ou entre no workspace **INTERNAL** pela tela de login).
            - On-premises, o usuário é criado com «apxchpwd.sql». No Autonomous Database você entra com o usuário ADMIN do banco.
            - Pela API, conecte-se como um usuário com a role «APEX_ADMINISTRATOR_ROLE» (ou como SYS/schema do APEX).

            ## O que dá para configurar
            | Área | Exemplos |
            |---|---|
            | Manage Requests | Aprovar pedidos de workspace e de schema/espaço extra |
            | Instance Settings | Provisionamento (Manual, Request, Automatic), e-mail, wallet, impressão, armazenamento |
            | Security | Tempo de sessão, bloqueio por tentativas de login, política de senhas, HTTPS, restrição por IP |
            | Feature Configuration | Liga/desliga recursos do App Builder e do SQL Workshop |
            | Manage Workspaces | Criar, travar, exportar e remover workspaces |
            | Monitor Activity | Acessos, erros, sessões e uso por workspace |

            ## Parâmetros via PL/SQL
            Quase tudo da tela tem um parâmetro equivalente, ótimo para automatizar e versionar a configuração:

            ~~~plsql
            begin
                apex_instance_admin.set_parameter('SMTP_HOST_ADDRESS', 'smtp.empresa.com.br');
                apex_instance_admin.set_parameter('SMTP_HOST_PORT',    '587');
                apex_instance_admin.set_parameter('SMTP_TLS_MODE',     'STARTTLS');
                apex_instance_admin.set_parameter('SMTP_USERNAME',     'apex@empresa.com.br');
                apex_instance_admin.set_parameter('SMTP_PASSWORD',     'senha-do-smtp');
                apex_instance_admin.set_parameter('SMTP_FROM',         'nao-responda@empresa.com.br');
                -- Wallet com os certificados raiz (HTTPS de saída e SMTP com TLS)
                apex_instance_admin.set_parameter('WALLET_PATH', 'file:/u01/app/oracle/wallets/apex');
                apex_instance_admin.set_parameter('WALLET_PWD',  'senha-do-wallet');
                commit;
            end;
            /

            select apex_instance_admin.get_parameter('SMTP_HOST_ADDRESS') from dual;
            ~~~

            Outros parâmetros úteis: «IMAGE_PREFIX» (caminho ou CDN das imagens), «INSTANCE_PROXY» e
            «INSTANCE_NO_PROXY_DOMAINS» (proxy de saída), «MAX_SESSION_LENGTH_SEC» e «MAX_SESSION_IDLE_SEC» (sessões do ambiente
            de desenvolvimento), «RESTRICT_IP_RANGE», «LOGIN_THROTTLE_DELAY», os «PASSWORD_*» (política de senhas),
            «APPLICATION_ACTIVITY_LOGGING», «DISABLE_ADMIN_LOGIN» e «DISABLE_WORKSPACE_LOGIN».

            ## Rede: ACL e wallet
            Fora do Autonomous, o banco bloqueia conexões de saída por padrão. É preciso conceder «connect» ao schema do APEX
            (por exemplo «APEX_260100») para cada host e porta usados — servidor SMTP, APIs REST, LDAP, servidor de impressão:

            ~~~plsql
            begin
                dbms_network_acl_admin.append_host_ace(
                    host       => 'smtp.empresa.com.br',
                    lower_port => 587,
                    upper_port => 587,
                    ace        => xs$ace_type(
                                      privilege_list => xs$name_list('connect'),
                                      principal_name => apex_application.g_flow_schema_owner,
                                      principal_type => xs_acl.ptype_db));
            end;
            /
            ~~~

            Para HTTPS de saída, crie um **wallet** com os certificados das autoridades certificadoras (ferramenta «orapki») e
            informe caminho e senha em *Instance Settings → Wallet* ou pelos parâmetros acima. No Autonomous Database nada disso
            é necessário.

            ## Testando o e-mail
            ~~~plsql
            begin
                apex_util.set_workspace(p_workspace => 'VENDAS');
                apex_mail.send(
                    p_to   => 'voce@empresa.com.br',
                    p_from => 'nao-responda@empresa.com.br',
                    p_subj => 'Teste do APEX',
                    p_body => 'Se chegou, o SMTP está ok.');
                apex_mail.push_queue;   -- envia agora, sem esperar o job
            end;
            /
            ~~~

            :::novo Novidades do 26.1
            - Relatório **Install / Upgrade Logs** com todas as fases da instalação e do upgrade.
            - **SMTP por workspace**: com «SMTP_ALLOW_WORKSPACE_CREDENTIALS» = Y, cada workspace pode usar sua própria Web
              Credential para o SMTP (configurada em *Workspace Preferences*).
            - «ALLOW_EXTERNAL_LINKS» = N esconde links para documentação, fóruns e blogs — útil em redes isoladas.
            - «AI_MAX_TOKENS» limita os tokens de IA generativa por workspace em uma janela de 24 horas.
            :::

            :::atencao Produção
            Em produção, considere uma instalação **runtime-only** e/ou «DISABLE_ADMIN_LOGIN» = Y, restrinja o acesso ao
            «apex_admin» por IP e use senhas fortes para o administrador da instância.
            :::
        `
    },
    en: {
        titulo: 'Instance administration',
        resumo: 'Administration Services and APEX_INSTANCE_ADMIN: instance settings, SMTP, wallet, network ACL, security and what is new in 26.1.',
        tags: ['Administration Services', 'INTERNAL', 'apex_admin', 'APEX_INSTANCE_ADMIN', 'SET_PARAMETER', 'SMTP', 'wallet', 'ACL', 'instance settings', 'APEX_ADMINISTRATOR_ROLE'],
        conteudo: `
            An APEX **instance** is the whole installation in one database (or PDB): every workspace, application and global
            setting. It is looked after by the **instance administrator**, through *Administration Services* or the
            «APEX_INSTANCE_ADMIN» PL/SQL API.

            ## Accessing Administration Services
            - URL: «/ords/apex_admin» (or sign in to the **INTERNAL** workspace from the login page).
            - On-premises, the user is created with «apxchpwd.sql». On Autonomous Database you sign in with the database ADMIN user.
            - For the API, connect as a user granted «APEX_ADMINISTRATOR_ROLE» (or as SYS/the APEX schema).

            ## What you can configure
            | Area | Examples |
            |---|---|
            | Manage Requests | Approve workspace and extra schema/space requests |
            | Instance Settings | Provisioning (Manual, Request, Automatic), e-mail, wallet, printing, storage |
            | Security | Session timeouts, login throttling, password policy, HTTPS, IP restrictions |
            | Feature Configuration | Turn App Builder and SQL Workshop features on or off |
            | Manage Workspaces | Create, lock, export and remove workspaces |
            | Monitor Activity | Page views, errors, sessions and usage per workspace |

            ## Parameters through PL/SQL
            Nearly every screen setting has an equivalent parameter — great for automating and versioning the configuration:

            ~~~plsql
            begin
                apex_instance_admin.set_parameter('SMTP_HOST_ADDRESS', 'smtp.example.com');
                apex_instance_admin.set_parameter('SMTP_HOST_PORT',    '587');
                apex_instance_admin.set_parameter('SMTP_TLS_MODE',     'STARTTLS');
                apex_instance_admin.set_parameter('SMTP_USERNAME',     'apex@example.com');
                apex_instance_admin.set_parameter('SMTP_PASSWORD',     'smtp-password');
                apex_instance_admin.set_parameter('SMTP_FROM',         'no-reply@example.com');
                -- Wallet with root certificates (outbound HTTPS and SMTP over TLS)
                apex_instance_admin.set_parameter('WALLET_PATH', 'file:/u01/app/oracle/wallets/apex');
                apex_instance_admin.set_parameter('WALLET_PWD',  'wallet-password');
                commit;
            end;
            /

            select apex_instance_admin.get_parameter('SMTP_HOST_ADDRESS') from dual;
            ~~~

            Other useful parameters: «IMAGE_PREFIX» (images path or CDN), «INSTANCE_PROXY» and «INSTANCE_NO_PROXY_DOMAINS»
            (outbound proxy), «MAX_SESSION_LENGTH_SEC» and «MAX_SESSION_IDLE_SEC» (development environment sessions),
            «RESTRICT_IP_RANGE», «LOGIN_THROTTLE_DELAY», the «PASSWORD_*» family (password policy),
            «APPLICATION_ACTIVITY_LOGGING», «DISABLE_ADMIN_LOGIN» and «DISABLE_WORKSPACE_LOGIN».

            ## Network: ACL and wallet
            Outside Autonomous, the database blocks outbound connections by default. You must grant «connect» to the APEX schema
            (e.g. «APEX_260100») for every host and port in use — SMTP server, REST APIs, LDAP, print server:

            ~~~plsql
            begin
                dbms_network_acl_admin.append_host_ace(
                    host       => 'smtp.example.com',
                    lower_port => 587,
                    upper_port => 587,
                    ace        => xs$ace_type(
                                      privilege_list => xs$name_list('connect'),
                                      principal_name => apex_application.g_flow_schema_owner,
                                      principal_type => xs_acl.ptype_db));
            end;
            /
            ~~~

            For outbound HTTPS, create a **wallet** containing the certificate authorities' certificates (the «orapki» tool) and
            set its path and password under *Instance Settings → Wallet* or through the parameters above. None of this is needed
            on Autonomous Database.

            ## Testing e-mail
            ~~~plsql
            begin
                apex_util.set_workspace(p_workspace => 'SALES');
                apex_mail.send(
                    p_to   => 'you@example.com',
                    p_from => 'no-reply@example.com',
                    p_subj => 'APEX test',
                    p_body => 'If this arrived, SMTP works.');
                apex_mail.push_queue;   -- send now instead of waiting for the job
            end;
            /
            ~~~

            :::novo New in 26.1
            - **Install / Upgrade Logs** report covering every installation and upgrade phase.
            - **Workspace-level SMTP**: with «SMTP_ALLOW_WORKSPACE_CREDENTIALS» = Y, each workspace can use its own Web
              Credential for SMTP (set under *Workspace Preferences*).
            - «ALLOW_EXTERNAL_LINKS» = N hides links to documentation, forums and blogs — useful on isolated networks.
            - «AI_MAX_TOKENS» caps generative AI tokens per workspace over a rolling 24-hour window.
            :::

            :::atencao Production
            In production, consider a **runtime-only** installation and/or «DISABLE_ADMIN_LOGIN» = Y, restrict access to
            «apex_admin» by IP and use strong passwords for the instance administrator.
            :::
        `
    }
});

DOC.topico({
    id: 'gerenciando-workspaces',
    cat: 'instalacao',
    nivel: 'intermediario',
    links: [
        { t: 'Administration Guide 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeadm/' },
        { t: 'APEX_INSTANCE_ADMIN.ADD_WORKSPACE', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/ADD_WORKSPACE-Procedure.html' },
        { t: 'APEX_UTIL.CREATE_USER', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/CREATE_USER-Procedure.html' }
    ],
    relacionados: ['workspaces-e-aplicacoes', 'administracao-instancia', 'ambientes-dev-test-prod', 'autenticacao', 'dicionario-apex'],
    pt: {
        titulo: 'Gerenciando workspaces, schemas e usuários',
        resumo: 'Criar workspaces pela interface ou por API, associar schemas, criar usuários e grupos, exportar/importar workspaces e boas práticas de organização.',
        tags: ['workspace', 'schema', 'usuários', 'ADD_WORKSPACE', 'ADD_SCHEMA', 'APEX_UTIL.CREATE_USER', 'provisionamento', 'export workspace', 'REMOVE_WORKSPACE', 'developer'],
        conteudo: `
            Todo trabalho no APEX acontece dentro de um **workspace**. Criar e organizar workspaces é tarefa do administrador da
            instância; gerenciar usuários e schemas do dia a dia, do administrador do workspace.

            ## Formas de criar um workspace
            1. **Administration Services → Manage Workspaces → Create Workspace**: informe nome, ID (opcional), schema (novo ou
               existente), cota de espaço e o administrador inicial.
            2. **Provisionamento por pedido**: com o modo *Request* ou *Automatic* em *Instance Settings*, aparece um link na tela de
               login para solicitar workspace (exige e-mail da instância configurado).
            3. **API PL/SQL** — ideal para scripts e ambientes repetíveis (dev, teste, produção, treinamentos).

            ## Criando tudo por script
            ~~~plsql
            -- Como DBA: o schema de dados/parsing
            create user vendas identified by "Troque-Esta-Senha#1"
                default tablespace users quota unlimited on users;

            begin
                apex_instance_admin.add_workspace(
                    p_workspace          => 'VENDAS',
                    p_primary_schema     => 'VENDAS',
                    p_additional_schemas => null);

                -- Schemas extras podem ser associados depois
                -- apex_instance_admin.add_schema(p_workspace => 'VENDAS', p_schema => 'VENDAS_API', p_grant_apex_privileges => true);

                apex_util.set_workspace(p_workspace => 'VENDAS');
                apex_util.create_user(
                    p_user_name                    => 'MARIA',
                    p_email_address                => 'maria@empresa.com.br',
                    p_web_password                 => 'Senha-Inicial#2026',
                    p_developer_privs              => 'ADMIN:CREATE:DATA_LOADER:EDIT:HELP:MONITOR:SQL',
                    p_default_schema               => 'VENDAS',
                    p_change_password_on_first_use => 'Y');
                commit;
            end;
            /
            ~~~

            ## Tipos de usuário
            | Tipo | «p_developer_privs» | Pode |
            |---|---|---|
            | Administrador do workspace | «ADMIN:CREATE:DATA_LOADER:EDIT:HELP:MONITOR:SQL» | Tudo, inclusive gerenciar usuários e schemas |
            | Desenvolvedor | «CREATE:DATA_LOADER:EDIT:HELP:MONITOR:SQL» | App Builder e SQL Workshop |
            | Usuário final | (nulo) | Apenas logar nas aplicações que usam *Oracle APEX Accounts* |

            Na interface (*Administration → Manage Users and Groups*) também dá para restringir o acesso de um desenvolvedor ao
            App Builder ou ao SQL Workshop, travar contas, forçar troca de senha e organizar usuários em **grupos** — que podem
            ser usados em esquemas de autorização.

            ## Schemas e workspaces
            - Um workspace pode ter **vários schemas**; o *parsing schema* de cada aplicação precisa ser um deles.
            - Um schema pode estar associado a mais de um workspace (use com moderação).
            - Para ver as associações: «select workspace_name, schema from apex_workspace_schemas».

            ## Exportar, importar e remover
            ~~~sql
            -- SQLcl: exporta a definição do workspace (usuários, grupos, RESTful Services...)
            apex export -expWorkspace -workspaceid 1908816359534887
            -- No destino, como usuário com APEX_ADMINISTRATOR_ROLE:
            @w1908816359534887.sql
            ~~~

            ~~~plsql
            begin
                apex_instance_admin.remove_workspace(
                    p_workspace        => 'TREINAMENTO_01',
                    p_drop_users       => 'N',   -- 'Y' também apaga os schemas
                    p_drop_tablespaces => 'N');
            end;
            /
            ~~~

            :::dica Organização que funciona
            - Um workspace por sistema ou equipe, com o **mesmo nome e ID** em dev, teste e produção — isso simplifica muito a
              importação de aplicações entre ambientes.
            - Separe o schema de **dados** do schema de **parsing** e conceda ao parsing só o necessário (views, pacotes).
            - Em produção runtime-only, crie workspaces e usuários por script, já que não há Administration Services.
            :::

            :::atencao Exportar workspace não leva as aplicações
            O export de workspace traz usuários, grupos, RESTful Services e definições do workspace — **não** traz aplicações
            nem os dados dos schemas. Exporte as apps separadamente e, como boa prática, importe o workspace primeiro, depois as
            aplicações e por último os arquivos estáticos.
            :::

            :::novo 26.1
            Se o administrador da instância permitir, cada workspace pode configurar o **seu próprio SMTP** (via Web Credential) em
            *Workspace Preferences*.
            :::
        `
    },
    en: {
        titulo: 'Managing workspaces, schemas and users',
        resumo: 'Create workspaces through the UI or the API, associate schemas, create users and groups, export/import workspaces and organization tips.',
        tags: ['workspace', 'schema', 'users', 'ADD_WORKSPACE', 'ADD_SCHEMA', 'APEX_UTIL.CREATE_USER', 'provisioning', 'export workspace', 'REMOVE_WORKSPACE', 'developer'],
        conteudo: `
            All APEX work happens inside a **workspace**. Creating and organizing workspaces is the instance administrator's job;
            day-to-day user and schema management belongs to the workspace administrator.

            ## Ways to create a workspace
            1. **Administration Services → Manage Workspaces → Create Workspace**: enter name, ID (optional), schema (new or
               existing), space quota and the initial administrator.
            2. **Request-based provisioning**: with the *Request* or *Automatic* mode in *Instance Settings*, the login page shows
               a link to request a workspace (instance e-mail must be configured).
            3. **PL/SQL API** — ideal for scripts and repeatable environments (dev, test, production, training).

            ## Creating everything by script
            ~~~plsql
            -- As a DBA: the data/parsing schema
            create user sales identified by "Change-This-Password#1"
                default tablespace users quota unlimited on users;

            begin
                apex_instance_admin.add_workspace(
                    p_workspace          => 'SALES',
                    p_primary_schema     => 'SALES',
                    p_additional_schemas => null);

                -- Extra schemas can be associated later
                -- apex_instance_admin.add_schema(p_workspace => 'SALES', p_schema => 'SALES_API', p_grant_apex_privileges => true);

                apex_util.set_workspace(p_workspace => 'SALES');
                apex_util.create_user(
                    p_user_name                    => 'MARY',
                    p_email_address                => 'mary@example.com',
                    p_web_password                 => 'Initial-Password#2026',
                    p_developer_privs              => 'ADMIN:CREATE:DATA_LOADER:EDIT:HELP:MONITOR:SQL',
                    p_default_schema               => 'SALES',
                    p_change_password_on_first_use => 'Y');
                commit;
            end;
            /
            ~~~

            ## User types
            | Type | «p_developer_privs» | Can |
            |---|---|---|
            | Workspace administrator | «ADMIN:CREATE:DATA_LOADER:EDIT:HELP:MONITOR:SQL» | Everything, including managing users and schemas |
            | Developer | «CREATE:DATA_LOADER:EDIT:HELP:MONITOR:SQL» | App Builder and SQL Workshop |
            | End user | (null) | Only sign in to apps that use *Oracle APEX Accounts* |

            In the UI (*Administration → Manage Users and Groups*) you can also limit a developer to App Builder or SQL Workshop,
            lock accounts, force password changes and organize users into **groups** — which authorization schemes can use.

            ## Schemas and workspaces
            - A workspace can have **several schemas**; each application's *parsing schema* must be one of them.
            - A schema can be associated with more than one workspace (use sparingly).
            - To list the mappings: «select workspace_name, schema from apex_workspace_schemas».

            ## Export, import and remove
            ~~~sql
            -- SQLcl: exports the workspace definition (users, groups, RESTful Services...)
            apex export -expWorkspace -workspaceid 1908816359534887
            -- On the target, as a user with APEX_ADMINISTRATOR_ROLE:
            @w1908816359534887.sql
            ~~~

            ~~~plsql
            begin
                apex_instance_admin.remove_workspace(
                    p_workspace        => 'TRAINING_01',
                    p_drop_users       => 'N',   -- 'Y' also drops the schemas
                    p_drop_tablespaces => 'N');
            end;
            /
            ~~~

            :::dica An organization that works
            - One workspace per system or team, with the **same name and ID** in dev, test and production — this makes moving
              applications between environments much simpler.
            - Keep the **data** schema separate from the **parsing** schema and grant the parsing schema only what it needs
              (views, packages).
            - On a runtime-only production instance, create workspaces and users by script, since there is no Administration
              Services.
            :::

            :::atencao A workspace export does not include applications
            The workspace export carries users, groups, RESTful Services and workspace definitions — **not** applications or schema
            data. Export apps separately and, as a best practice, import the workspace first, then the applications and finally
            the static files.
            :::

            :::novo 26.1
            If the instance administrator allows it, each workspace can configure **its own SMTP** (through a Web Credential) under
            *Workspace Preferences*.
            :::
        `
    }
});

DOC.topico({
    id: 'arquivos-estaticos-e-cdn',
    cat: 'instalacao',
    nivel: 'intermediario',
    links: [
        { t: 'Installation Guide 26.1 — Using a Static Resources CDN', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmig/configuring-ords.html' },
        { t: 'App Builder Guide — Managing Static Application Files', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-static-application-files.html' },
        { t: 'App Builder Guide — Managing Static Workspace Files', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-static-workspace-files.html' }
    ],
    relacionados: ['js-e-css-na-pagina', 'substituicoes', 'ords', 'otimizacao-performance', 'upgrade-e-patches'],
    pt: {
        titulo: 'Arquivos estáticos e CDN',
        resumo: 'De onde vêm o /i/ e os arquivos da sua app: CDN da Oracle, Static Application/Workspace Files, #APP_FILES#, #MIN# e controle de cache.',
        tags: ['arquivos estáticos', 'static files', '/i/', 'CDN', 'static.oracle.com', 'IMAGE_PREFIX', '#APP_FILES#', '#WORKSPACE_FILES#', '#MIN#', 'cache', 'minificação'],
        conteudo: `
            Uma página APEX carrega dois grupos de arquivos estáticos: os **do próprio APEX** (JavaScript do motor, Universal
            Theme, Font APEX, bibliotecas como jQuery e Oracle JET) e os **seus** (CSS, JS, imagens, fontes).

            ## Os prefixos
            | Substituição | Aponta para | Nome antigo |
            |---|---|---|
            | «#APEX_FILES#» | Arquivos do APEX (o famoso «/i/» ou a CDN) | «#IMAGE_PREFIX#» |
            | «#THEME_FILES#» | Arquivos do tema | «#THEME_IMAGES#» |
            | «#WORKSPACE_FILES#» | Static Workspace Files (compartilhados entre apps do workspace) | «#WORKSPACE_IMAGES#» |
            | «#APP_FILES#» | Static Application Files (só daquela app) | «#APP_IMAGES#» |
            | «#PLUGIN_FILES#» | Arquivos de um plug-in | — |

            ## Os arquivos do APEX: /i/ ou CDN
            Na instalação você escolhe o diretório virtual (normalmente «/i/») e precisa **copiar a pasta images** para o servidor
            web (no ORDS standalone, «standalone.static.path»; no Tomcat, «webapps/i»). A cada upgrade ou patch a pasta precisa
            ser atualizada — e esquecer isso é causa clássica de erros de JavaScript.

            A alternativa é a **CDN da Oracle** em «static.oracle.com»: distribui os arquivos a partir de servidores próximos do
            usuário e, uma vez configurada, é **atualizada automaticamente** em patches e upgrades. Conectado com
            «APEX_ADMINISTRATOR_ROLE»:

            ~~~plsql
            begin
                for c1 in (select version_no from apex_release) loop
                    apex_instance_admin.set_parameter(
                        p_parameter => 'IMAGE_PREFIX',
                        p_value     => 'https://static.oracle.com/cdn/apex/' || c1.version_no || '/');
                end loop;
                commit;
            end;
            /
            -- Resultado típico: https://static.oracle.com/cdn/apex/26.1.5/
            ~~~

            :::atencao CDN e redes fechadas
            Com a CDN, o **navegador do usuário** precisa acessar «static.oracle.com». Em redes internas sem internet, ou com uma
            Content Security Policy restritiva, sirva os arquivos localmente ou libere o domínio.
            :::

            ## Seus arquivos: Static Application e Workspace Files
            Em *Shared Components → Static Application Files* você envia arquivos que ficam guardados **no banco** junto com a
            aplicação e vão no export. Use pastas para organizar: «css/app.css», «js/app.js», «img/logo.svg». Para arquivos
            usados por várias apps, prefira *Static Workspace Files*. Também é possível servir os arquivos da app a partir de
            um servidor web ou CDN próprio, preenchendo o atributo *#APP_FILES# Path* da aplicação.

            Esses arquivos são servidos pelo ORDS (por isso a instalação exige «apex_rest_config.sql»), em URLs gerenciadas pelo
            APEX.

            ## Referenciando com #MIN#
            Nos atributos *JavaScript → File URLs* e *CSS → File URLs* (da página ou em *User Interface Attributes* para a app
            inteira):

            ~~~html
            #APP_FILES#js/app#MIN#.js
            #APP_FILES#css/app#MIN#.css
            #WORKSPACE_FILES#libs/grafico#MIN#.js
            ~~~

            - «#MIN#» vira «.min» em execução normal e some em **modo debug** — você depura o arquivo legível e entrega o
              minificado em produção.
            - «#MIN_DIRECTORY#» faz o mesmo para pastas («minified/»).
            - Ao editar CSS/JS no editor de arquivos estáticos do APEX (21.2+), a versão minificada pode ser gerada
              automaticamente ao salvar.

            ## Cache
            Arquivos estáticos devem ser cacheados pelo navegador por muito tempo. As URLs geradas para «#APP_FILES#» e
            «#WORKSPACE_FILES#» incluem um identificador de versão que muda quando os arquivos são alterados, então o navegador
            baixa a versão nova sem que você precise limpar cache. Para arquivos hospedados fora do APEX, uma técnica comum é
            acrescentar a versão da aplicação à URL:

            ~~~html
            https://cdn.empresa.com.br/vendas/app.js?v=#APP_VERSION#
            ~~~

            :::dica Boas práticas
            - Tire o JavaScript e o CSS dos atributos inline da página e coloque em arquivos — ficam cacheáveis, versionáveis e
              compatíveis com CSP.
            - Use a CDN da Oracle sempre que a rede permitir: é um passo a menos em cada upgrade.
            - Para mídia pesada (vídeos, muitos PDFs), considere um servidor web ou armazenamento de objetos em vez do banco.
            :::
        `
    },
    en: {
        titulo: 'Static files and CDN',
        resumo: 'Where /i/ and your app files come from: Oracle CDN, Static Application/Workspace Files, #APP_FILES#, #MIN# and cache control.',
        tags: ['static files', '/i/', 'CDN', 'static.oracle.com', 'IMAGE_PREFIX', '#APP_FILES#', '#WORKSPACE_FILES#', '#MIN#', 'cache', 'minification'],
        conteudo: `
            An APEX page loads two groups of static files: **APEX's own** (engine JavaScript, Universal Theme, Font APEX, libraries
            such as jQuery and Oracle JET) and **yours** (CSS, JS, images, fonts).

            ## The prefixes
            | Substitution | Points to | Old name |
            |---|---|---|
            | «#APEX_FILES#» | APEX files (the famous «/i/» or the CDN) | «#IMAGE_PREFIX#» |
            | «#THEME_FILES#» | Theme files | «#THEME_IMAGES#» |
            | «#WORKSPACE_FILES#» | Static Workspace Files (shared by the workspace's apps) | «#WORKSPACE_IMAGES#» |
            | «#APP_FILES#» | Static Application Files (that app only) | «#APP_IMAGES#» |
            | «#PLUGIN_FILES#» | A plug-in's files | — |

            ## APEX files: /i/ or CDN
            At install time you choose the virtual directory (usually «/i/») and must **copy the images folder** to the web
            server (ORDS standalone: «standalone.static.path»; Tomcat: «webapps/i»). Every upgrade or patch requires refreshing
            that folder — forgetting it is a classic cause of JavaScript errors.

            The alternative is **Oracle's CDN** at «static.oracle.com»: it serves files from servers close to the user and, once
            configured, is **updated automatically** on patches and upgrades. Connected with «APEX_ADMINISTRATOR_ROLE»:

            ~~~plsql
            begin
                for c1 in (select version_no from apex_release) loop
                    apex_instance_admin.set_parameter(
                        p_parameter => 'IMAGE_PREFIX',
                        p_value     => 'https://static.oracle.com/cdn/apex/' || c1.version_no || '/');
                end loop;
                commit;
            end;
            /
            -- Typical result: https://static.oracle.com/cdn/apex/26.1.5/
            ~~~

            :::atencao CDN and closed networks
            With the CDN, the **user's browser** must reach «static.oracle.com». On internal networks without internet access, or
            with a strict Content Security Policy, serve the files locally or allow the domain.
            :::

            ## Your files: Static Application and Workspace Files
            Under *Shared Components → Static Application Files* you upload files that are stored **in the database** with the
            application and travel with its export. Use folders to organize them: «css/app.css», «js/app.js», «img/logo.svg».
            For files used by several apps, prefer *Static Workspace Files*. You can also serve an app's files from your own web
            server or CDN by filling in the application's *#APP_FILES# Path* attribute.

            These files are served by ORDS (that is why installation requires «apex_rest_config.sql»), through URLs managed by
            APEX.

            ## Referencing with #MIN#
            In the *JavaScript → File URLs* and *CSS → File URLs* attributes (on the page, or in *User Interface Attributes* for the
            whole app):

            ~~~html
            #APP_FILES#js/app#MIN#.js
            #APP_FILES#css/app#MIN#.css
            #WORKSPACE_FILES#libs/chart#MIN#.js
            ~~~

            - «#MIN#» becomes «.min» during normal execution and disappears in **debug mode** — you debug the readable file and
              ship the minified one in production.
            - «#MIN_DIRECTORY#» does the same for folders («minified/»).
            - When you edit CSS/JS in the APEX static file editor (21.2+), the minified version can be generated automatically on
              save.

            ## Caching
            Static files should be cached by the browser for a long time. The URLs generated for «#APP_FILES#» and
            «#WORKSPACE_FILES#» include a version identifier that changes when files change, so browsers fetch the new version
            without anyone clearing caches. For files hosted outside APEX, a common technique is appending the application version
            to the URL:

            ~~~html
            https://cdn.example.com/sales/app.js?v=#APP_VERSION#
            ~~~

            :::dica Best practices
            - Move JavaScript and CSS out of inline page attributes into files — they become cacheable, versionable and
              CSP-friendly.
            - Use Oracle's CDN whenever the network allows: one less step in every upgrade.
            - For heavy media (videos, many PDFs), consider a web server or object storage instead of the database.
            :::
        `
    }
});
