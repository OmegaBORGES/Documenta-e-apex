DOC.termo({
    id: 'oracle-apex',
    termo: 'Oracle APEX',
    aliases: ['APEX', 'Application Express', 'Oracle Application Express', 'low-code'],
    ver: 'o-que-e-apex',
    pt: { def: 'Plataforma **low-code** da Oracle para criar aplicações web sobre o Oracle Database, sem custo adicional ao banco: o motor é um conjunto de pacotes PL/SQL e as aplicações são metadados guardados em tabelas. Chamava-se HTML DB (2004), foi renomeada para *Oracle Application Express* na versão 2.1 (2006) e hoje a marca oficial é simplesmente **Oracle APEX** (versão atual: 26.1).' },
    en: { def: 'Oracle\'s **low-code** platform for building web applications on Oracle Database at no extra cost: the engine is a set of PL/SQL packages and applications are metadata stored in tables. Originally called HTML DB (2004), it was renamed *Oracle Application Express* in release 2.1 (2006); today the official brand is simply **Oracle APEX** (current release: 26.1).' }
});

DOC.termo({
    id: 'app-builder',
    termo: 'App Builder',
    aliases: ['Application Builder', 'Builder', 'construtor de aplicações', 'aplicação 4000'],
    ver: 'workspaces-e-aplicacoes',
    pt: { def: 'Ambiente de desenvolvimento do APEX, usado no navegador, onde se criam e editam aplicações (Page Designer, Shared Components, utilitários, import/export). O próprio App Builder é uma aplicação APEX (a de ID 4000) — por isso IDs de aplicação entre 3000 e 8999 são reservados para uso interno.' },
    en: { def: 'The browser-based APEX development environment where applications are created and edited (Page Designer, Shared Components, utilities, import/export). App Builder is itself an APEX application (ID 4000), which is why application IDs between 3000 and 8999 are reserved for internal use.' }
});

DOC.termo({
    id: 'workspace',
    termo: 'Workspace',
    aliases: ['espaço de trabalho', 'INTERNAL', 'multi-tenant', 'tenant'],
    ver: 'workspaces-e-aplicacoes',
    pt: { def: 'Área de trabalho isolada dentro de uma instância APEX, com seus próprios desenvolvedores, usuários finais, aplicações e arquivos, associada a um ou mais schemas do banco. Uma instância pode hospedar muitos workspaces; o workspace especial **INTERNAL** é o do Administration Services.' },
    en: { def: 'An isolated work area inside an APEX instance, with its own developers, end users, applications and files, linked to one or more database schemas. One instance can host many workspaces; the special **INTERNAL** workspace hosts Administration Services.' }
});

DOC.termo({
    id: 'instance',
    termo: 'Instance',
    aliases: ['instância', 'Administration Services', 'instance administrator', 'administrador da instância', 'APEX_INSTANCE_ADMIN'],
    ver: 'administracao-instancia',
    pt: { def: 'Uma instalação do APEX em um banco de dados (um schema «APEX_xxxxxx» por versão, ex.: «APEX_260100»). É gerenciada pelo **administrador da instância** no Administration Services ou pela API «APEX_INSTANCE_ADMIN»: parâmetros globais, workspaces, SMTP, wallet, segurança e logs.' },
    en: { def: 'One APEX installation in a database (one «APEX_xxxxxx» schema per release, e.g. «APEX_260100»). It is managed by the **instance administrator** in Administration Services or through the «APEX_INSTANCE_ADMIN» API: global parameters, workspaces, SMTP, wallet, security and logs.' }
});

DOC.termo({
    id: 'parsing-schema',
    termo: 'Parsing Schema',
    aliases: ['schema de parsing', 'owner', '#OWNER#', 'grants'],
    ver: 'workspaces-e-aplicacoes',
    pt: { def: 'Schema do banco com cujos privilégios todo o SQL e PL/SQL de uma aplicação é executado; é definido nos atributos da aplicação e precisa estar associado ao workspace. Objetos de outros schemas exigem privilégios concedidos **diretamente** ao parsing schema — privilégios recebidos via role não valem.' },
    en: { def: 'The database schema whose privileges are used to run all SQL and PL/SQL of an application; it is set in the application attributes and must be assigned to the workspace. Objects in other schemas need privileges granted **directly** to the parsing schema — privileges received through roles do not apply.' }
});

DOC.termo({
    id: 'page-rendering-processing',
    termo: 'Page Rendering / Page Processing',
    aliases: ['renderização', 'processamento', 'show', 'accept', 'submit', 'ciclo de vida'],
    ver: 'ciclo-de-vida-da-pagina',
    pt: { def: 'As duas fases do ciclo de vida de uma página: a **renderização** (show), que executa computações e processos de carga e gera o HTML, e o **processamento** (accept), disparado no submit, que executa computações, validações, processos e branches. Entre as duas não há estado em memória — só o session state gravado no banco.' },
    en: { def: 'The two phases of the page life cycle: **rendering** (show), which runs computations and load processes and produces the HTML, and **processing** (accept), triggered by a submit, which runs computations, validations, processes and branches. Nothing is kept in memory between them — only the session state stored in the database.' }
});

DOC.termo({
    id: 'region',
    termo: 'Region',
    aliases: ['região', 'plug', 'WWV_FLOW_PAGE_PLUGS'],
    ver: 'outras-regioes',
    pt: { def: 'Bloco de conteúdo de uma página: relatório, formulário, gráfico, cards, mapa, calendário, conteúdo estático etc. Cada região tem fonte de dados, template, posição e atributos próprios; internamente o APEX chama as regiões de *plugs*.' },
    en: { def: 'A content block on a page: report, form, chart, cards, map, calendar, static content and so on. Each region has its own data source, template, position and attributes; internally APEX calls regions *plugs*.' }
});

DOC.termo({
    id: 'page-item',
    termo: 'Page Item',
    aliases: ['item', 'item de página', 'campo', 'P1_'],
    ver: 'itens-de-pagina',
    pt: { def: 'Campo de uma página (Text Field, Select List, Date Picker, Switch, Hidden etc.) cujo valor fica no session state; é lido no servidor como «:P1_NOME» e no navegador com «apex.item("P1_NOME").getValue()». Por convenção o nome começa com «P» + número da página.' },
    en: { def: 'A field on a page (Text Field, Select List, Date Picker, Switch, Hidden and so on) whose value lives in session state; it is read on the server as «:P1_NAME» and in the browser with «apex.item("P1_NAME").getValue()». By convention its name starts with «P» + the page number.' }
});

DOC.termo({
    id: 'application-item',
    termo: 'Application Item',
    aliases: ['item de aplicação', 'variável global', 'G_'],
    ver: 'sessao-e-session-state',
    pt: { def: 'Item sem representação visual, definido em Shared Components, que guarda um valor no session state com escopo da aplicação inteira — por exemplo, o ID ou o perfil do usuário logado. Costuma ser preenchido no login ou por computações de aplicação; é comum usar um prefixo como «G_».' },
    en: { def: 'A non-displayed item, defined in Shared Components, that holds a session state value scoped to the whole application — for example the ID or profile of the signed-in user. It is usually set at login or by application computations; a prefix such as «G_» is common.' }
});

DOC.termo({
    id: 'session',
    termo: 'Session',
    aliases: ['sessão', 'session ID', 'APP_SESSION', 'Rejoin Sessions', 'timeout', 'Maximum Idle Time'],
    ver: 'sessao-e-session-state',
    pt: { def: 'Contexto lógico do APEX, identificado por um número (o session ID, visível na URL e em «:APP_SESSION»), que liga um usuário ao seu session state entre requisições HTTP sem estado. Não é uma sessão do banco; expira por **Maximum Session Length** ou **Maximum Idle Time** e pode ser criada fora do navegador com «APEX_SESSION.CREATE_SESSION».' },
    en: { def: 'An APEX logical context identified by a number (the session ID, visible in the URL and in «:APP_SESSION») that ties a user to their session state across stateless HTTP requests. It is not a database session; it expires through **Maximum Session Length** or **Maximum Idle Time** and can be created outside the browser with «APEX_SESSION.CREATE_SESSION».' }
});

DOC.termo({
    id: 'session-state',
    termo: 'Session State',
    aliases: ['estado da sessão', 'V()', 'APEX_SESSION_STATE', 'APEX_UTIL.SET_SESSION_STATE'],
    ver: 'sessao-e-session-state',
    pt: { def: 'Valores de itens de página e de aplicação guardados no banco para uma sessão APEX, persistindo entre requisições. São lidos com bind variables, «V()», «APEX_SESSION_STATE.GET_*» ou «&ITEM.» e gravados em submits, computações, processos ou «APEX_UTIL.SET_SESSION_STATE»; no 26.1 (com Oracle AI Database 26ai), Checkbox, Switch e Hidden podem usar o tipo BOOLEAN.' },
    en: { def: 'Page and application item values stored in the database for an APEX session, persisting across requests. They are read with bind variables, «V()», «APEX_SESSION_STATE.GET_*» or «&ITEM.» and written by submits, computations, processes or «APEX_UTIL.SET_SESSION_STATE»; in 26.1 (on Oracle AI Database 26ai), Checkbox, Switch and Hidden items can use the BOOLEAN type.' }
});

DOC.termo({
    id: 'substitution-string',
    termo: 'Substitution String',
    aliases: ['substituição', '&ITEM.', '#COLUMN#', 'APP_USER', 'APP_ID', '!HTML'],
    ver: 'substituicoes',
    pt: { def: 'Marcador que o APEX troca por um valor ao renderizar: «&P1_ITEM.» (com ponto final), «&APP_USER.», «#COLUMN#» em relatórios clássicos e templates, ou strings internas como «&APP_ID.» e «#APP_FILES#». Em HTML use filtros de escape como «&P1_ITEM!HTML.» — e nunca use substituição para montar SQL.' },
    en: { def: 'A placeholder APEX replaces with a value at render time: «&P1_ITEM.» (with a trailing period), «&APP_USER.», «#COLUMN#» in classic reports and templates, or built-in strings such as «&APP_ID.» and «#APP_FILES#». In HTML use escape filters such as «&P1_ITEM!HTML.» — and never use substitutions to build SQL.' }
});

DOC.termo({
    id: 'bind-variable',
    termo: 'Bind Variable',
    aliases: ['variável de ligação', ':P1_ITEM', ':APP_USER', 'bind'],
    ver: 'substituicoes',
    pt: { def: 'Referência a um item em SQL ou PL/SQL no formato «:P1_ITEM» (ou «:APP_USER»), resolvida pelo APEX com o valor atual do session state. É a forma correta de usar valores do usuário em consultas, porque evita SQL injection e permite reuso de cursores; o nome do bind tem no máximo 30 caracteres.' },
    en: { def: 'A reference to an item in SQL or PL/SQL written as «:P1_ITEM» (or «:APP_USER»), resolved by APEX with the current session state value. It is the right way to use user input in queries because it prevents SQL injection and allows cursor reuse; bind names are limited to 30 characters.' }
});

DOC.termo({
    id: 'shared-components',
    termo: 'Shared Components',
    aliases: ['componentes compartilhados', 'componentes da aplicação'],
    ver: 'componentes-compartilhados',
    pt: { def: 'Componentes definidos uma única vez no nível da aplicação e reutilizados em várias páginas: esquemas de autenticação e autorização, LOVs, listas, breadcrumbs, temas e templates, application items e processes, REST Data Sources, credenciais, text messages, build options, AI Agents e outros.' },
    en: { def: 'Components defined once at application level and reused across pages: authentication and authorization schemes, LOVs, lists, breadcrumbs, themes and templates, application items and processes, REST Data Sources, credentials, text messages, build options, AI Agents and more.' }
});

DOC.termo({
    id: 'request',
    termo: 'REQUEST',
    aliases: ['request', ':REQUEST', 'botão pressionado', 'When Button Pressed'],
    ver: 'botoes-e-branches',
    pt: { def: 'Valor especial que indica o que disparou a requisição: no submit recebe o nome do botão (ex.: «SAVE»), e na URL é a 4ª posição do «f?p» ou o parâmetro «request». Lido com «:REQUEST», é usado em condições de processos, validações e branches («Request = Value», «When Button Pressed»).' },
    en: { def: 'A special value telling what triggered the request: on submit it holds the button name (e.g. «SAVE»), and in the URL it is the 4th position of «f?p» or the «request» parameter. Read with «:REQUEST», it drives conditions on processes, validations and branches («Request = Value», «When Button Pressed»).' }
});

DOC.termo({
    id: 'html-db',
    termo: 'HTML DB',
    aliases: ['Oracle HTML DB', 'HTMLDB', 'htmldb_Get'],
    ver: 'o-que-e-apex',
    pt: { def: 'Nome comercial do APEX nas primeiras versões públicas: HTML DB 1.5 (2004), 1.6 e 2.0. Em 2006, na versão 2.1 — a que acompanhava o Oracle Database 10g Express Edition (XE) —, o produto passou a se chamar Oracle Application Express. O nome sobreviveu por anos em funções JavaScript antigas como «htmldb_Get» (já removida).' },
    en: { def: 'The commercial name of APEX in its first public releases: HTML DB 1.5 (2004), 1.6 and 2.0. In 2006, with release 2.1 — the one bundled with Oracle Database 10g Express Edition (XE) — the product was renamed Oracle Application Express. The name lived on for years in old JavaScript functions such as «htmldb_Get» (now removed).' }
});

DOC.termo({
    id: 'flows',
    termo: 'Flows',
    aliases: ['Project Marvel', 'FLOWS_FILES', 'FLOWS_030100', 'APEX_030200', 'APEX_260100'],
    ver: 'o-que-e-apex',
    pt: { def: 'Nome interno do projeto que deu origem ao APEX, iniciado na Oracle em 1999 por Mike Hichwa e Joel Kallman (também chamado *Project Marvel*). O nome sobrevive no prefixo dos objetos internos («WWV_FLOW»), no schema «FLOWS_FILES» e nos schemas das versões antigas (ex.: «FLOWS_030100» no 3.1); a partir do 3.2 o schema passou a se chamar «APEX_xxxxxx» (ex.: «APEX_260100» no 26.1).' },
    en: { def: 'The internal name of the project that became APEX, started at Oracle in 1999 by Mike Hichwa and Joel Kallman (also called *Project Marvel*). The name survives in the prefix of internal objects («WWV_FLOW»), in the «FLOWS_FILES» schema and in the schemas of old releases (e.g. «FLOWS_030100» in 3.1); since 3.2 the schema has been named «APEX_xxxxxx» (e.g. «APEX_260100» in 26.1).' }
});

DOC.termo({
    id: 'wwv-flow',
    termo: 'wwv_flow',
    aliases: ['WWV_FLOW', 'wwv_flow.show', 'wwv_flow.accept', 'wwv_flow_imp', 'wwv_flow_api', 'WWV_FLOW_STEPS'],
    ver: 'arquitetura',
    pt: { def: 'Prefixo dos pacotes, tabelas e views internos do motor do APEX — ex.: o pacote «WWV_FLOW» (rotinas show e accept) e as tabelas «WWV_FLOWS» e «WWV_FLOW_STEPS», onde as páginas ainda se chamam *steps*. Os scripts de export chamam pacotes internos («wwv_flow_imp», antes «wwv_flow_api»), mas no seu código use sempre as APIs públicas «APEX_*» (existentes desde o 2.2) e as views do dicionário.' },
    en: { def: 'The prefix of the internal packages, tables and views of the APEX engine — e.g. the «WWV_FLOW» package (show and accept routines) and the «WWV_FLOWS» and «WWV_FLOW_STEPS» tables, where pages are still called *steps*. Export scripts call internal packages («wwv_flow_imp», formerly «wwv_flow_api»), but your own code should always use the public «APEX_*» APIs (available since 2.2) and dictionary views.' }
});

DOC.termo({
    id: 'f-p',
    termo: 'f?p',
    aliases: ['URL f?p', 'Clear Cache', 'ClearCache', 'RP', 'PrinterFriendly', 'URL clássica'],
    ver: 'urls-do-apex',
    pt: { def: 'Sintaxe clássica de URL do APEX: «f?p=App:Page:Session:Request:Debug:ClearCache:itemNames:itemValues:PrinterFriendly», em que «f» é um procedimento PL/SQL público. A posição ClearCache aceita números de página, «RP» (reset pagination), «APP» ou «SESSION»; desde o 20.1 as aplicações novas usam Friendly URLs, mas a sintaxe f?p continua suportada.' },
    en: { def: 'The classic APEX URL syntax: «f?p=App:Page:Session:Request:Debug:ClearCache:itemNames:itemValues:PrinterFriendly», where «f» is a public PL/SQL procedure. The ClearCache position accepts page numbers, «RP» (reset pagination), «APP» or «SESSION»; since 20.1 new applications use Friendly URLs, but the f?p syntax is still supported.' }
});

DOC.termo({
    id: 'mod-plsql',
    termo: 'mod_plsql',
    aliases: ['OHS', 'Oracle HTTP Server', 'DAD', 'Database Access Descriptor', '/pls/apex'],
    ver: 'arquitetura',
    pt: { def: 'Módulo do Oracle HTTP Server (baseado no Apache) que traduzia URLs em chamadas a procedimentos PL/SQL por meio de um **DAD** (Database Access Descriptor) — daí as antigas URLs «/pls/apex/f?p=...». Foi o gateway original do APEX; ficou deprecated no 20.1 e desupported no 20.2, substituído pelo ORDS.' },
    en: { def: 'An Oracle HTTP Server (Apache-based) module that mapped URLs to PL/SQL procedure calls through a **DAD** (Database Access Descriptor) — hence the old «/pls/apex/f?p=...» URLs. It was the original APEX gateway; it was deprecated in 20.1 and desupported in 20.2, replaced by ORDS.' }
});

DOC.termo({
    id: 'epg',
    termo: 'Embedded PL/SQL Gateway',
    sigla: 'EPG',
    aliases: ['DBMS_EPG', 'XML DB HTTP', 'apex_epg_config.sql'],
    ver: 'arquitetura',
    pt: { def: 'Gateway PL/SQL embutido no próprio banco (servidor HTTP do XML DB), configurado com «DBMS_EPG» e o script «apex_epg_config.sql»; dispensava um servidor web separado e era comum em instalações com o Oracle XE. Ficou deprecated no APEX 20.1 e desupported no 20.2 — hoje só o ORDS é suportado.' },
    en: { def: 'A PL/SQL gateway built into the database itself (the XML DB HTTP server), configured with «DBMS_EPG» and the «apex_epg_config.sql» script; it needed no separate web server and was common on Oracle XE installs. It was deprecated in APEX 20.1 and desupported in 20.2 — only ORDS is supported today.' }
});

DOC.termo({
    id: 'tabular-form',
    termo: 'Tabular Form',
    aliases: ['formulário tabular', 'Legacy Tabular Form', 'APEX_ITEM', 'APEX_APPLICATION.G_F01', 'G_F01', 'MRU', 'MRD'],
    ver: 'interactive-grid',
    pt: { def: 'Formulário de edição em grade da era clássica, gerado com a API «APEX_ITEM» e processado pelos arrays «APEX_APPLICATION.G_F01»…«G_F50» ou pelos processos MRU/MRD. Foi substituído pelo **Interactive Grid** no 5.1 e, no 20.2, a criação de novos tabular forms foi desupported — os existentes ainda funcionam como *Legacy Tabular Form*, e «APEX_ITEM» é considerada legada.' },
    en: { def: 'The classic grid-editing form, built with the «APEX_ITEM» API and processed through the «APEX_APPLICATION.G_F01»…«G_F50» arrays or the MRU/MRD processes. It was superseded by the **Interactive Grid** in 5.1 and, in 20.2, creating new tabular forms was desupported — existing ones still run as *Legacy Tabular Form*, and «APEX_ITEM» is considered legacy.' }
});

DOC.termo({
    id: 'websheets',
    termo: 'Websheets',
    aliases: ['Websheet', 'websheet application'],
    pt: { def: 'Tipo de aplicação introduzido no APEX 4.0 que permitia a usuários finais criar páginas no estilo wiki e planilhas de dados (data grids) direto no navegador, sem desenvolvedor. Ficou deprecated no 20.2 e foi desupported e removido no 21.1.' },
    en: { def: 'An application type introduced in APEX 4.0 that let end users build wiki-style pages and data grids right in the browser, without a developer. It was deprecated in 20.2 and desupported and removed in 21.1.' }
});

DOC.termo({
    id: 'team-development',
    termo: 'Team Development',
    aliases: ['issues', 'milestones', 'feedback', 'labels'],
    pt: { def: 'Módulo do APEX, ao lado do App Builder e do SQL Workshop, para acompanhar o trabalho da equipe. Surgiu no 4.0 (features, to-dos, bugs e feedback); no 19.2 foi reescrito em torno de **issues**, labels e milestones, e a versão antiga foi desupported no 20.1.' },
    en: { def: 'An APEX module, next to App Builder and SQL Workshop, for tracking team work. It appeared in 4.0 (features, to-dos, bugs and feedback); in 19.2 it was rewritten around **issues**, labels and milestones, and the legacy version was desupported in 20.1.' }
});

DOC.termo({
    id: 'global-page',
    termo: 'Global Page',
    aliases: ['Page 0', 'Page Zero', 'página 0', 'página global'],
    ver: 'page-designer',
    pt: { def: 'Página especial (normalmente a página 0) cujas regiões, itens, botões e Dynamic Actions aparecem em todas as páginas da aplicação — útil para banners, avisos e scripts comuns. Nas versões antigas era chamada de *Page Zero*; ela não é executada diretamente.' },
    en: { def: 'A special page (usually page 0) whose regions, items, buttons and Dynamic Actions show up on every page of the application — handy for banners, notices and shared scripts. In old releases it was called *Page Zero*; it is never run directly.' }
});

DOC.termo({
    id: 'ords',
    termo: 'Oracle REST Data Services',
    sigla: 'ORDS',
    aliases: ['APEX Listener', 'Application Express Listener', 'APEX_PUBLIC_USER', 'servidor web', 'Jetty', 'Tomcat'],
    ver: 'ords',
    pt: { def: 'Aplicação Java que serve de servidor web do APEX: recebe as requisições HTTP, mantém o pool de conexões (o motor do APEX roda como «APEX_PUBLIC_USER»), entrega arquivos estáticos e publica serviços REST. Surgiu com o APEX 4.0 como *Oracle Application Express Listener* e foi renomeado para ORDS a partir da versão 2.0.6; roda standalone (Jetty), no Tomcat ou no WebLogic, e o APEX 26.1 exige ORDS 26.1.1 ou superior.' },
    en: { def: 'The Java application that acts as the APEX web listener: it receives HTTP requests, keeps the connection pool (the APEX engine runs as «APEX_PUBLIC_USER»), serves static files and publishes REST services. It debuted with APEX 4.0 as *Oracle Application Express Listener* and was renamed ORDS from version 2.0.6; it runs standalone (Jetty), on Tomcat or on WebLogic, and APEX 26.1 requires ORDS 26.1.1 or later.' }
});

DOC.termo({
    id: 'oracle-database-free',
    termo: 'Oracle Database Free',
    aliases: ['XE', 'Express Edition', 'Oracle XE', '26ai Free', '23ai Free', 'container', 'Docker'],
    ver: 'onde-rodar-apex',
    pt: { def: 'Edição gratuita do Oracle Database para desenvolvimento e aprendizado, sucessora do antigo **Express Edition (XE)**, com limites de CPU, memória e armazenamento. A versão atual pertence à linha Oracle AI Database 26ai, também distribuída como imagem de container — uma forma comum de rodar APEX + ORDS localmente.' },
    en: { def: 'The free edition of Oracle Database for development and learning, successor of the old **Express Edition (XE)**, with CPU, memory and storage limits. The current release belongs to the Oracle AI Database 26ai line and is also shipped as a container image — a common way to run APEX + ORDS locally.' }
});

DOC.termo({
    id: 'oracle-ai-database-26ai',
    termo: 'Oracle AI Database 26ai',
    aliases: ['26ai', '23ai', 'Oracle Database 23ai', '23.26', 'banco de dados'],
    ver: 'instalacao-apex',
    pt: { def: 'Nome atual da geração mais recente do Oracle Database, que substituiu o Oracle Database 23ai (versão 23.26 em diante), com recursos como AI Vector Search, tipo BOOLEAN em SQL e JSON-Relational Duality Views. O APEX 26.1 roda nele (23.26.0+) ou no 19c com RU 19.18+, mas alguns recursos novos, como itens com session state BOOLEAN, exigem o 26ai.' },
    en: { def: 'The current name of the newest Oracle Database generation, which replaced Oracle Database 23ai (version 23.26 onwards), with features such as AI Vector Search, a SQL BOOLEAN type and JSON-Relational Duality Views. APEX 26.1 runs on it (23.26.0+) or on 19c with RU 19.18+, but some new features, such as BOOLEAN session state items, require 26ai.' }
});

DOC.termo({
    id: 'autonomous-database',
    termo: 'Autonomous Database',
    sigla: 'ADB',
    aliases: ['Always Free', 'APEX Service', 'APEX Application Development', 'OCI', 'Oracle Cloud', 'ATP', 'ADW'],
    ver: 'onde-rodar-apex',
    pt: { def: 'Banco de dados gerenciado da Oracle Cloud (OCI) que já vem com APEX e ORDS instalados, com patches aplicados automaticamente pela Oracle. Inclui o nível **Always Free** (até 2 bancos gratuitos de 20 GB) e o **APEX Service** (Oracle APEX Application Development), uma variante de menor custo dedicada a aplicações APEX.' },
    en: { def: 'Oracle Cloud (OCI) managed database that comes with APEX and ORDS preinstalled, with patches applied automatically by Oracle. It includes the **Always Free** tier (up to 2 free 20 GB databases) and the **APEX Service** (Oracle APEX Application Development), a lower-cost variant dedicated to APEX workloads.' }
});

DOC.termo({
    id: 'apex-oracle-com',
    termo: 'apex.oracle.com',
    aliases: ['workspace gratuito', 'free workspace', 'ambiente de avaliação'],
    ver: 'onde-rodar-apex',
    pt: { def: 'Serviço hospedado pela Oracle em que qualquer pessoa pode pedir um workspace gratuito para aprender, testar e prototipar. Não se destina a produção (é um ambiente de avaliação, com limites de espaço) e costuma ser um dos primeiros a receber cada nova versão do APEX.' },
    en: { def: 'An Oracle-hosted service where anyone can request a free workspace to learn, test and prototype. It is not meant for production (it is an evaluation environment with storage limits) and it is usually one of the first places to get each new APEX release.' }
});

DOC.termo({
    id: 'patch-set-bundle',
    termo: 'Patch Set Bundle',
    aliases: ['patch', 'PSE', 'patch set', 'apex_patches', 'catpatch.sql', 'My Oracle Support'],
    ver: 'upgrade-e-patches',
    pt: { def: 'Pacote cumulativo de correções de uma versão do APEX, baixado no My Oracle Support e aplicado com o script «catpatch.sql», que eleva a versão para AA.N.x (ex.: 26.1.5). Para conferir o que está aplicado use «select * from apex_patches»; no Autonomous Database a Oracle aplica os patches automaticamente.' },
    en: { def: 'A cumulative bundle of fixes for an APEX release, downloaded from My Oracle Support and applied with the «catpatch.sql» script, raising the version to YY.N.x (e.g. 26.1.5). Check what is applied with «select * from apex_patches»; on Autonomous Database Oracle applies patches automatically.' }
});

DOC.termo({
    id: 'runtime-only-environment',
    termo: 'Runtime-Only Environment',
    aliases: ['runtime', 'apxrtins.sql', 'apxdvins.sql', 'apxdevrm.sql', 'produção'],
    ver: 'ambientes-dev-test-prod',
    pt: { def: 'Instalação do APEX sem o App Builder (feita com «apxrtins.sql» ou convertida com «apxdevrm.sql»), disponível desde o 3.1 e recomendada para produção por reduzir a superfície de ataque: as aplicações rodam, mas são importadas e administradas por scripts e APIs. Pode virar instalação completa com «apxdvins.sql»; não está disponível nos serviços da Oracle Cloud.' },
    en: { def: 'An APEX install without App Builder (created with «apxrtins.sql» or converted with «apxdevrm.sql»), available since 3.1 and recommended for production because it reduces the attack surface: applications run, but are imported and managed through scripts and APIs. It can become a full install with «apxdvins.sql»; it is not available on Oracle Cloud services.' }
});

DOC.termo({
    id: 'cdn',
    termo: 'Content Delivery Network',
    sigla: 'CDN',
    aliases: ['static.oracle.com', 'IMAGE_PREFIX', '/i/', '#APEX_FILES#'],
    ver: 'arquivos-estaticos-e-cdn',
    pt: { def: 'Rede de distribuição de conteúdo da Oracle («https://static.oracle.com/cdn/apex/<versão>/») que pode servir os arquivos estáticos do APEX (JavaScript, CSS, imagens) no lugar da pasta «/i/» do ORDS. Configura-se com o parâmetro de instância «IMAGE_PREFIX»; nas aplicações esse caminho é exposto por «#APEX_FILES#».' },
    en: { def: 'Oracle\'s content delivery network («https://static.oracle.com/cdn/apex/<version>/») that can serve the APEX static files (JavaScript, CSS, images) instead of the ORDS «/i/» folder. It is set with the «IMAGE_PREFIX» instance parameter; inside applications that path is exposed as «#APEX_FILES#».' }
});

DOC.termo({
    id: 'static-application-files',
    termo: 'Static Application Files',
    aliases: ['arquivos estáticos', '#APP_FILES#', '#WORKSPACE_FILES#', '#MIN#', 'APP_IMAGES', 'Static Workspace Files'],
    ver: 'arquivos-estaticos-e-cdn',
    pt: { def: 'Arquivos (JS, CSS, imagens, fontes) enviados para a aplicação e referenciados por «#APP_FILES#», ou para o workspace, via «#WORKSPACE_FILES#». Esses nomes substituíram «#APP_IMAGES#» e «#WORKSPACE_IMAGES#», marcados como legados no 21.2; o marcador «#MIN#» carrega a versão minificada quando a página não está em modo debug.' },
    en: { def: 'Files (JS, CSS, images, fonts) uploaded to the application and referenced with «#APP_FILES#», or to the workspace, via «#WORKSPACE_FILES#». These names replaced «#APP_IMAGES#» and «#WORKSPACE_IMAGES#», marked as legacy in 21.2; the «#MIN#» token loads the minified version when the page is not in debug mode.' }
});

DOC.termo({
    id: 'network-acl',
    termo: 'Network ACL',
    aliases: ['ACL de rede', 'DBMS_NETWORK_ACL_ADMIN', 'ORA-24247', 'wallet', 'Oracle Wallet', 'HTTPS', 'certificado'],
    ver: 'administracao-instancia',
    pt: { def: 'Lista de controle de acesso do banco que define a quais hosts e portas um schema pode se conectar. Para o APEX chamar APIs REST, enviar e-mail por SMTP ou usar autenticação externa, conceda acesso ao schema «APEX_xxxxxx» com «DBMS_NETWORK_ACL_ADMIN.APPEND_HOST_ACE» (sem isso ocorre ORA-24247); chamadas HTTPS normalmente também exigem um **Oracle Wallet** com os certificados confiáveis.' },
    en: { def: 'A database access control list defining which hosts and ports a schema may connect to. For APEX to call REST APIs, send e-mail over SMTP or use external authentication, grant access to the «APEX_xxxxxx» schema with «DBMS_NETWORK_ACL_ADMIN.APPEND_HOST_ACE» (otherwise you get ORA-24247); HTTPS calls usually also need an **Oracle Wallet** holding the trusted certificates.' }
});

DOC.termo({
    id: 'page-designer',
    termo: 'Page Designer',
    aliases: ['editor de páginas', 'Property Editor', 'Component View', 'Rendering tree', 'árvore de componentes'],
    ver: 'page-designer',
    pt: { def: 'Editor visual de páginas introduzido no APEX 5.0, com a árvore de componentes (Rendering, Dynamic Actions, Processing, Shared Components) à esquerda, o layout em grid ao centro e o Property Editor à direita. Substituiu as antigas telas de edição; a última forma do *Component View*, uma aba do próprio Page Designer, foi removida no 21.2.' },
    en: { def: 'The visual page editor introduced in APEX 5.0, with the component tree (Rendering, Dynamic Actions, Processing, Shared Components) on the left, the grid layout in the middle and the Property Editor on the right. It replaced the old edit screens; the last form of the *Component View*, a tab inside Page Designer itself, was removed in 21.2.' }
});

DOC.termo({
    id: 'create-app-wizard',
    termo: 'Create Application Wizard',
    aliases: ['Create App Wizard', 'criar aplicação', 'features', 'Gallery', 'Sample Apps', 'Starter Apps'],
    ver: 'create-app-wizard',
    pt: { def: 'Assistente que cria uma aplicação completa a partir de páginas e **features** (controle de acesso, activity reporting, feedback, configurações, about etc.), redesenhado no 18.1. Também é possível criar a partir de um arquivo, de linguagem natural com IA (24.1) ou instalar apps de exemplo e iniciais da **Gallery**.' },
    en: { def: 'The wizard that builds a complete application from pages and **features** (access control, activity reporting, feedback, configuration options, about page and so on), redesigned in 18.1. You can also start from a file, from natural language with AI (24.1), or install sample and starter apps from the **Gallery**.' }
});

DOC.termo({
    id: 'navigation-menu',
    termo: 'Navigation Menu',
    aliases: ['menu de navegação', 'Navigation Bar', 'Breadcrumb', 'List', 'lista', 'Mega Menu'],
    ver: 'navegacao',
    pt: { def: 'Menu principal da aplicação (lateral ou superior), baseado em uma **List** dos Shared Components. Completam a navegação a **Navigation Bar** (links no topo, como usuário e logout) e os **Breadcrumbs**, que mostram o caminho hierárquico até a página atual.' },
    en: { def: 'The main application menu (side or top), driven by a **List** from Shared Components. Navigation is completed by the **Navigation Bar** (top links such as user name and sign out) and **Breadcrumbs**, which show the hierarchical path to the current page.' }
});

DOC.termo({
    id: 'modal-dialog',
    termo: 'Modal Dialog',
    aliases: ['diálogo modal', 'página modal', 'Drawer', 'Inline Dialog', 'Close Dialog', 'Dialog Closed'],
    ver: 'paginas-modais',
    pt: { def: 'Modo de página (desde o 5.0) que abre a página sobre a atual, em um iframe; ela é fechada pelo processo ou pela Dynamic Action **Close Dialog**, que pode devolver itens à página de origem (evento *Dialog Closed*). Variações: o **Drawer** (painel lateral, 21.2; no topo ou no rodapé desde o 26.1) e o *Inline Dialog*, uma região da própria página exibida como diálogo.' },
    en: { def: 'A page mode (since 5.0) that opens the page on top of the current one, inside an iframe; it is closed by the **Close Dialog** process or Dynamic Action, which can return items to the calling page (the *Dialog Closed* event). Variations: the **Drawer** (side panel, 21.2; top or bottom since 26.1) and the *Inline Dialog*, a region of the same page displayed as a dialog.' }
});

DOC.termo({
    id: 'branch',
    termo: 'Branch',
    aliases: ['desvio', 'redirecionamento', 'redirect', 'After Processing'],
    ver: 'botoes-e-branches',
    pt: { def: 'Instrução, normalmente executada depois dos processos, que define para onde o usuário vai após o submit (outra página, uma URL ou a mesma página), podendo depender do botão pressionado. Também é possível redirecionar em PL/SQL com «apex_util.redirect_url»; páginas modais costumam usar Close Dialog em vez de branch.' },
    en: { def: 'An instruction, usually run after the processes, that decides where the user goes after a submit (another page, a URL or the same page), optionally depending on the button pressed. You can also redirect from PL/SQL with «apex_util.redirect_url»; modal pages usually use Close Dialog instead of a branch.' }
});

DOC.termo({
    id: 'plug-in',
    termo: 'Plug-in',
    aliases: ['plugin', 'apex.world', 'extensão'],
    ver: 'plugins',
    pt: { def: 'Componente personalizado que estende o APEX com novos tipos de região, item, Dynamic Action, processo, autenticação, autorização, REST Data Source, Template Component e (26.1) AI Tool, escrito em PL/SQL, JavaScript e CSS. Introduzidos no 4.0, são exportados como script SQL, e muitos estão disponíveis gratuitamente na comunidade (apex.world).' },
    en: { def: 'A custom component that extends APEX with new region, item, Dynamic Action, process, authentication, authorization, REST Data Source, Template Component and (26.1) AI Tool types, written in PL/SQL, JavaScript and CSS. Introduced in 4.0, they are exported as SQL scripts, and many are freely available from the community (apex.world).' }
});

DOC.termo({
    id: 'sql-workshop',
    termo: 'SQL Workshop',
    aliases: ['Object Browser', 'SQL Commands', 'SQL Scripts', 'Data Workshop', 'Query Builder', 'Describe Tables'],
    ver: 'sql-workshop',
    pt: { def: 'Conjunto de ferramentas web do APEX para trabalhar no banco: **Object Browser**, **SQL Commands**, **SQL Scripts**, Query Builder e utilitários como Quick SQL, Data Workshop (carga e descarga de dados) e, no 26.1, Describe Tables. A tela de RESTful Services do SQL Workshop ficou deprecated no 26.1.' },
    en: { def: 'The APEX set of web tools for working with the database: **Object Browser**, **SQL Commands**, **SQL Scripts**, Query Builder and utilities such as Quick SQL, Data Workshop (data loading and unloading) and, in 26.1, Describe Tables. The SQL Workshop RESTful Services screen was deprecated in 26.1.' }
});

DOC.termo({
    id: 'quick-sql',
    termo: 'Quick SQL',
    aliases: ['DDL', 'modelagem', 'ERD', 'shorthand'],
    ver: 'sql-workshop',
    pt: { def: 'Utilitário que gera DDL (tabelas, chaves, índices, triggers, views e até dados de exemplo) a partir de uma notação abreviada baseada em indentação. Nasceu como packaged app no 5.1, foi incorporado ao SQL Workshop e reescrito no 23.2, com diagrama ER.' },
    en: { def: 'A utility that generates DDL (tables, keys, indexes, triggers, views and even sample data) from an indentation-based shorthand. It started as a packaged app in 5.1, became part of SQL Workshop and was rewritten in 23.2, with an ER diagram.' }
});

DOC.termo({
    id: 'friendly-url',
    termo: 'Friendly URL',
    aliases: ['URL amigável', 'alias', 'page alias', 'application alias', '/r/', 'APEX_PAGE.GET_URL'],
    ver: 'urls-do-apex',
    pt: { def: 'Formato de URL legível introduzido no 20.1 e padrão nas aplicações novas: «/ords/r/<workspace>/<alias-da-app>/<alias-da-pagina>?session=...». Depende dos aliases da aplicação e das páginas; «APEX_PAGE.GET_URL» gera o formato certo conforme a configuração da aplicação.' },
    en: { def: 'A readable URL format introduced in 20.1 and the default for new applications: «/ords/r/<workspace>/<app-alias>/<page-alias>?session=...». It relies on application and page aliases; «APEX_PAGE.GET_URL» builds the right format for the application settings.' }
});

DOC.termo({
    id: 'advisor',
    termo: 'Advisor',
    aliases: ['APEX Advisor', 'qualidade', 'boas práticas', 'checklist'],
    ver: 'checklist-de-qualidade',
    pt: { def: 'Utilitário do App Builder (Utilities > Advisor) que verifica a aplicação em busca de erros de programação, problemas de segurança, de performance e desvios de boas práticas, listando cada achado com link para o componente. Vale rodar antes de cada entrega.' },
    en: { def: 'An App Builder utility (Utilities > Advisor) that scans an application for programming errors, security and performance issues and best-practice violations, listing each finding with a link to the component. Worth running before every release.' }
});

DOC.termo({
    id: 'classic-report',
    termo: 'Classic Report',
    aliases: ['relatório clássico', 'report template', '#COLUMN#'],
    ver: 'classic-report',
    pt: { def: 'Região de relatório baseada em SQL (ou tabela, REST Data Source etc.) cuja aparência é controlada por templates, com paginação e ordenação simples. Mais leve e personalizável que o Interactive Report; as colunas usam a sintaxe «#COLUMN#» em templates e HTML Expressions.' },
    en: { def: 'A report region based on SQL (or a table, REST Data Source and so on) whose look is driven by templates, with simple pagination and sorting. Lighter and more customizable than the Interactive Report; columns use the «#COLUMN#» syntax in templates and HTML Expressions.' }
});

DOC.termo({
    id: 'interactive-report',
    termo: 'Interactive Report',
    sigla: 'IR',
    aliases: ['relatório interativo', 'APEX_IR', 'saved report', 'relatório salvo', 'NL2IR'],
    ver: 'interactive-report',
    pt: { def: 'Região de relatório introduzida no APEX 3.1 em que o próprio usuário filtra, ordena, destaca, agrupa (control break, group by, pivot), cria gráficos, salva relatórios e baixa os dados (CSV, XLSX, PDF etc.). Desde o 5.0 pode haver vários por página, e no 26.1 aceita pedidos em linguagem natural (NL2IR).' },
    en: { def: 'A report region introduced in APEX 3.1 where end users filter, sort, highlight, group (control break, group by, pivot), chart, save reports and download data (CSV, XLSX, PDF and more). Since 5.0 a page can hold several of them, and in 26.1 they accept natural-language requests (NL2IR).' }
});

DOC.termo({
    id: 'interactive-grid',
    termo: 'Interactive Grid',
    sigla: 'IG',
    aliases: ['grade interativa', 'grid', 'APEX_IG', 'editable grid'],
    ver: 'interactive-grid',
    pt: { def: 'Região introduzida no APEX 5.1 que combina relatório interativo e edição em linha estilo planilha: seleção de células, edição em lote, master-detail, relatórios salvos e uma API JavaScript rica (interactiveGrid, model, grid). Substituiu os tabular forms; no 26.1 ganhou copiar, recortar e colar, inclusive a partir de planilhas.' },
    en: { def: 'A region introduced in APEX 5.1 that combines an interactive report with spreadsheet-like inline editing: cell selection, batch editing, master-detail, saved reports and a rich JavaScript API (interactiveGrid, model, grid). It replaced tabular forms; 26.1 added copy, cut and paste, including from spreadsheets.' }
});

DOC.termo({
    id: 'cards',
    termo: 'Cards',
    aliases: ['cartões', 'cards region', 'região de cards'],
    ver: 'cards',
    pt: { def: 'Região introduzida no 20.2 que exibe cada linha como um cartão, com título, subtítulo, corpo, ícone ou iniciais, badge, mídia (imagem, BLOB ou vídeo) e ações (botões e links) configuradas declarativamente. Suporta template directives e é uma das melhores opções para telas responsivas.' },
    en: { def: 'A region introduced in 20.2 that renders each row as a card, with title, subtitle, body, icon or initials, badge, media (image, BLOB or video) and actions (buttons and links) configured declaratively. It supports template directives and is one of the best choices for responsive screens.' }
});

DOC.termo({
    id: 'chart',
    termo: 'Chart',
    aliases: ['gráfico', 'Oracle JET', 'JET', 'AnyChart', 'Flash charts'],
    ver: 'charts',
    pt: { def: 'Região de gráficos baseada no **Oracle JET** (JavaScript Extension Toolkit) desde o 5.1: barras, linhas, áreas, pizza, donut, dispersão, bolhas, funil, radar, gauge, Gantt e outros. Os gráficos antigos, da biblioteca AnyChart (inicialmente em Flash), foram desupported no 21.1; o APEX 26.1 usa o Oracle JET 20.0.2.' },
    en: { def: 'The chart region powered by **Oracle JET** (JavaScript Extension Toolkit) since 5.1: bar, line, area, pie, donut, scatter, bubble, funnel, radar, gauge, Gantt and more. The old charts, based on the AnyChart library (originally Flash), were desupported in 21.1; APEX 26.1 ships Oracle JET 20.0.2.' }
});

DOC.termo({
    id: 'map-region',
    termo: 'Map Region',
    aliases: ['mapa', 'MapLibre', 'SDO_GEOMETRY', 'GeoJSON', 'spatial', 'heat map'],
    ver: 'map-region',
    pt: { def: 'Região nativa de mapas introduzida no 21.1, com camadas de pontos, linhas, polígonos, heat map e polígonos 3D (extruded), a partir de colunas SDO_GEOMETRY, GeoJSON ou latitude/longitude. Usa a biblioteca MapLibre; o 26.1 trouxe vector tiles e uma API JavaScript para mostrar, ocultar e reordenar camadas.' },
    en: { def: 'The native map region introduced in 21.1, with point, line, polygon, heat map and 3D (extruded) polygon layers built from SDO_GEOMETRY, GeoJSON or latitude/longitude columns. It uses the MapLibre library; 26.1 added vector tiles and a JavaScript API to show, hide and reorder layers.' }
});

DOC.termo({
    id: 'calendar',
    termo: 'Calendar',
    aliases: ['calendário', 'FullCalendar', 'agenda'],
    ver: 'calendar',
    pt: { def: 'Região de calendário que, desde o APEX 5, é baseada na biblioteca FullCalendar, com visões de mês, semana, dia e lista, arrastar e soltar para alterar datas e links para criar e editar eventos. No 26.1 usa o FullCalendar 6.1, e os *Legacy Calendar Templates* foram marcados como deprecated.' },
    en: { def: 'The calendar region, based on the FullCalendar library since APEX 5, with month, week, day and list views, drag and drop to change dates, and links to create and edit events. In 26.1 it uses FullCalendar 6.1, and the *Legacy Calendar Templates* were deprecated.' }
});

DOC.termo({
    id: 'faceted-search',
    termo: 'Faceted Search',
    aliases: ['busca facetada', 'facets', 'facetas', 'filtros'],
    ver: 'faceted-search-e-smart-filters',
    pt: { def: 'Região introduzida no 19.2 que exibe filtros (facets) — checkboxes, radio, intervalos, pesquisa, estrelas etc. — com a contagem de resultados de cada valor, e filtra outra região (Classic Report, Cards, Map...). As facets se ajustam conforme o usuário filtra; no 26.1 ganharam a opção de **excluir** valores.' },
    en: { def: 'A region introduced in 19.2 that displays filters (facets) — checkboxes, radio buttons, ranges, search, stars and so on — with result counts per value, filtering another region (Classic Report, Cards, Map...). Facets adapt as the user filters; 26.1 added an option to **exclude** values.' }
});

DOC.termo({
    id: 'smart-filters',
    termo: 'Smart Filters',
    aliases: ['filtros inteligentes', 'chips', 'barra de pesquisa'],
    ver: 'faceted-search-e-smart-filters',
    pt: { def: 'Variante compacta do Faceted Search, introduzida no 21.2: uma barra de pesquisa com chips de filtro e sugestões com contagens, ideal para economizar espaço acima de um relatório ou de cards.' },
    en: { def: 'A compact variant of Faceted Search introduced in 21.2: a search bar with filter chips and suggestions with counts, ideal for saving space above a report or cards.' }
});

DOC.termo({
    id: 'search-configuration',
    termo: 'Search Configuration',
    aliases: ['APEX_SEARCH', 'Search region', 'região Search', 'busca', 'Oracle Text'],
    ver: 'search-configurations',
    pt: { def: 'Shared Component (22.2) que define uma fonte pesquisável — tabela local, Oracle Text, REST Data Source e, desde o 24.2, busca vetorial — e como cada resultado é exibido. É usado pela região **Search**, que pode combinar várias configurações, e pela API «APEX_SEARCH».' },
    en: { def: 'A Shared Component (22.2) that defines a searchable source — local table, Oracle Text, REST Data Source and, since 24.2, vector search — and how each result is displayed. It is used by the **Search** region, which can combine several configurations, and by the «APEX_SEARCH» API.' }
});

DOC.termo({
    id: 'data-reporter',
    termo: 'Data Reporter',
    aliases: ['relatórios ad hoc', 'datasets', 'ad hoc reporting'],
    ver: 'impressao-e-exportacao',
    pt: { def: 'Ferramenta nova do APEX 26.1, irmã do App Builder e do SQL Workshop, para criar relatórios ad hoc: administradores definem *datasets* a partir de objetos do workspace e os usuários montam relatórios sobre eles. As páginas do Data Reporter não são editadas no Page Designer, mas podem ser exportadas e importadas.' },
    en: { def: 'A new APEX 26.1 tool, a peer of App Builder and SQL Workshop, for ad hoc reporting: administrators define *datasets* from workspace objects and users build reports on top of them. Data Reporter pages are not edited in Page Designer, but they can be exported and imported.' }
});

DOC.termo({
    id: 'document-generator',
    termo: 'Document Generator',
    aliases: ['APEX_PRINT', 'Print Report', 'PDF', 'template Word', 'OCI Document Generator'],
    ver: 'impressao-e-exportacao',
    pt: { def: 'Tipo de servidor de impressão (24.1) que usa o serviço OCI Document Generator para gerar PDFs a partir de templates do Microsoft Word combinados com os dados da aplicação — via report queries, layouts de relatórios, processo ou Dynamic Action **Print Report** e a API «APEX_PRINT». Requer «DBMS_CLOUD»; o 26.1 adicionou PDFs protegidos por senha.' },
    en: { def: 'A print server type (24.1) that uses the OCI Document Generator service to produce PDFs from Microsoft Word templates merged with application data — through report queries, report layouts, the **Print Report** process or Dynamic Action and the «APEX_PRINT» API. It requires «DBMS_CLOUD»; 26.1 added password-protected PDFs.' }
});

DOC.termo({
    id: 'bi-publisher',
    termo: 'BI Publisher',
    aliases: ['Oracle BI Publisher', 'Report Query', 'Report Layout', 'Print Server', 'RTF', 'XSL-FO'],
    ver: 'impressao-e-exportacao',
    pt: { def: 'Servidor de relatórios da Oracle usado como opção clássica de impressão do APEX (Report Printing nas configurações da instância): **Report Queries** fornecem os dados e **Report Layouts** (RTF ou XSL-FO) definem o documento. No 26.1 passou a aceitar credenciais de usuário e senha; em projetos novos, avalie também o Document Generator e «APEX_DATA_EXPORT».' },
    en: { def: 'Oracle\'s reporting server, the classic APEX printing option (Report Printing in instance settings): **Report Queries** supply the data and **Report Layouts** (RTF or XSL-FO) define the document. In 26.1 it accepts username and password credentials; for new projects also consider Document Generator and «APEX_DATA_EXPORT».' }
});

DOC.termo({
    id: 'apex-data-export',
    termo: 'APEX_DATA_EXPORT',
    aliases: ['exportar dados', 'CSV', 'XLSX', 'Excel', 'PDF', 'download'],
    ver: 'impressao-e-exportacao',
    pt: { def: 'Pacote PL/SQL (20.2) que exporta o resultado de um contexto «APEX_EXEC» para CSV, XLSX, PDF, HTML, XML ou JSON, com opções de colunas, destaques e agrupamentos. O arquivo gerado pode ser baixado com «APEX_DATA_EXPORT.DOWNLOAD» ou anexado a um e-mail.' },
    en: { def: 'A PL/SQL package (20.2) that exports the result of an «APEX_EXEC» context to CSV, XLSX, PDF, HTML, XML or JSON, with options for columns, highlights and grouping. The generated file can be downloaded with «APEX_DATA_EXPORT.DOWNLOAD» or attached to an e-mail.' }
});

DOC.termo({
    id: 'lov',
    termo: 'List of Values',
    sigla: 'LOV',
    aliases: ['lista de valores', 'shared LOV', 'cascading LOV', 'display value', 'return value'],
    ver: 'listas-de-valores',
    pt: { def: 'Conjunto de pares valor de exibição / valor de retorno usado por Select List, Popup LOV, Radio Group, Select One/Many e colunas de relatório. Pode ser estática ou dinâmica (SQL, tabela, REST), local ao item ou compartilhada (Shared Components), e pode depender de outro item (*cascading LOV*).' },
    en: { def: 'A set of display value / return value pairs used by Select List, Popup LOV, Radio Group, Select One/Many and report columns. It can be static or dynamic (SQL, table, REST), local to the item or shared (Shared Components), and it can depend on another item (*cascading LOV*).' }
});

DOC.termo({
    id: 'popup-lov',
    termo: 'Popup LOV',
    aliases: ['lista popup', 'search as you type', 'seleção múltipla'],
    ver: 'listas-de-valores',
    pt: { def: 'Item que abre a lista de valores em um diálogo ou popup com pesquisa, indicado para listas grandes. Desde o 19.2 suporta várias colunas de exibição, busca enquanto digita e seleção de múltiplos valores.' },
    en: { def: 'An item that opens its list of values in a searchable dialog or popup, well suited for large lists. Since 19.2 it supports multiple display columns, search as you type and multiple value selection.' }
});

DOC.termo({
    id: 'select-one-select-many',
    termo: 'Select One / Select Many',
    aliases: ['Select One', 'Select Many', 'chips', 'multi-select', 'multisseleção'],
    ver: 'listas-de-valores',
    pt: { def: 'Tipos de item baseados em LOV introduzidos no 24.1 que só aceitam valores da lista, com busca, ícones, grupos, várias colunas e HTML customizado via template directives. O Select Many mostra as escolhas como chips e pode guardar o session state como JSON ou lista delimitada; no 26.1 ambos ganharam rolagem infinita.' },
    en: { def: 'LOV-based item types introduced in 24.1 that only accept values from the list, with search, icons, groups, multiple columns and custom HTML through template directives. Select Many shows the choices as chips and can store session state as JSON or a delimited list; in 26.1 both gained infinite scrolling.' }
});

DOC.termo({
    id: 'combobox',
    termo: 'Combobox',
    aliases: ['combo box', 'manual entries', 'chips', 'tags'],
    ver: 'listas-de-valores',
    pt: { def: 'Tipo de item introduzido no 23.2 que combina campo de texto e lista de valores: o usuário escolhe da LOV ou digita valores novos (manual entries), com suporte a múltiplos valores exibidos como chips.' },
    en: { def: 'An item type introduced in 23.2 that combines a text field with a list of values: users pick from the LOV or type new values (manual entries), with support for multiple values shown as chips.' }
});

DOC.termo({
    id: 'form-region',
    termo: 'Form Region',
    aliases: ['formulário', 'Form - Initialization', 'chave primária', 'primary key'],
    ver: 'formularios',
    pt: { def: 'Região nativa introduzida no 19.1 que liga itens de página a uma fonte de dados (tabela, SQL, REST Data Source ou REST Enabled SQL) por meio da chave primária. Trabalha com os processos **Form - Initialization**, que busca a linha, e **Form - Automatic Row Processing (DML)**, que grava as alterações.' },
    en: { def: 'A native region introduced in 19.1 that binds page items to a data source (table, SQL, REST Data Source or REST Enabled SQL) through the primary key. It works with the **Form - Initialization** process, which fetches the row, and **Form - Automatic Row Processing (DML)**, which saves the changes.' }
});

DOC.termo({
    id: 'automatic-row-processing',
    termo: 'Automatic Row Processing (DML)',
    aliases: ['ARP', 'DML', 'lost update', 'Form - Automatic Row Processing', 'Interactive Grid - Automatic Row Processing'],
    ver: 'formularios',
    pt: { def: 'Processo que executa INSERT, UPDATE ou DELETE automaticamente para um Form ou Interactive Grid, conforme o botão (REQUEST) ou o status de cada linha. Inclui **lost update detection** (checksum da linha), que impede um usuário de sobrescrever alterações de outro, e pode ser trocado por código PL/SQL próprio.' },
    en: { def: 'A process that automatically runs INSERT, UPDATE or DELETE for a Form or an Interactive Grid, based on the button (REQUEST) or each row status. It includes **lost update detection** (a row checksum) so one user cannot overwrite changes made by another, and it can be replaced by your own PL/SQL code.' }
});

DOC.termo({
    id: 'master-detail',
    termo: 'Master Detail',
    aliases: ['mestre-detalhe', 'mestre detalhe', 'Stacked', 'Side by Side', 'Drill Down'],
    ver: 'mestre-detalhe',
    pt: { def: 'Padrão de página que mostra um registro mestre e seus detalhes relacionados (ex.: pedido e itens do pedido), normalmente com Interactive Grids editáveis ligados por chave estrangeira. O assistente oferece os estilos *Stacked*, *Side by Side* e *Drill Down*.' },
    en: { def: 'A page pattern that shows a master record and its related details (e.g. an order and its lines), usually with editable Interactive Grids linked by a foreign key. The wizard offers the *Stacked*, *Side by Side* and *Drill Down* styles.' }
});

DOC.termo({
    id: 'process',
    termo: 'Process',
    aliases: ['processo', 'Execute Code', 'Invoke API', 'Application Process', 'processo de aplicação'],
    ver: 'processos-computacoes-validacoes',
    pt: { def: 'Lógica executada no servidor em um ponto da página (Pre-Rendering, Processing, Ajax Callback etc.): código PL/SQL, DML automático, envio de e-mail, Invoke API (22.2), workflow, download, IA e outros tipos. Os Application Processes, definidos em Shared Components, rodam em todas as páginas ou sob demanda.' },
    en: { def: 'Server-side logic run at a point of the page (Pre-Rendering, Processing, Ajax Callback and so on): PL/SQL code, automatic DML, sending e-mail, Invoke API (22.2), workflow, download, AI and more. Application Processes, defined in Shared Components, run on every page or on demand.' }
});

DOC.termo({
    id: 'computation',
    termo: 'Computation',
    aliases: ['computação', 'cálculo', 'valor derivado'],
    ver: 'processos-computacoes-validacoes',
    pt: { def: 'Atribui um valor a um item de página ou de aplicação em um ponto da renderização ou do processamento, a partir de valor estático, outro item, SQL, expressão ou função PL/SQL. É a forma declarativa de inicializar ou derivar valores sem escrever um processo.' },
    en: { def: 'Assigns a value to a page or application item at a point of rendering or processing, from a static value, another item, SQL, an expression or a PL/SQL function. It is the declarative way to initialize or derive values without writing a process.' }
});

DOC.termo({
    id: 'validation',
    termo: 'Validation',
    aliases: ['validação', 'regra', 'mensagem de erro'],
    ver: 'processos-computacoes-validacoes',
    pt: { def: 'Regra executada no submit, antes dos processos, que impede o processamento se o dado for inválido — por exemplo, item NOT NULL, expressão, consulta «exists» ou função PL/SQL que devolve a mensagem de erro. As mensagens aparecem junto ao item ou no topo da página; no Interactive Grid, as validações podem rodar para cada linha.' },
    en: { def: 'A rule run on submit, before the processes, that stops processing when data is invalid — for example item NOT NULL, an expression, an «exists» query or a PL/SQL function returning the error message. Messages show next to the item or at the top of the page; in an Interactive Grid, validations can run for each row.' }
});

DOC.termo({
    id: 'dynamic-action',
    termo: 'Dynamic Action',
    sigla: 'DA',
    aliases: ['ação dinâmica', 'ações dinâmicas', 'True Action', 'False Action', 'Affected Elements'],
    ver: 'dynamic-actions',
    pt: { def: 'Comportamento declarativo no navegador, introduzido no APEX 4.0: um evento (Change, Click, Page Load, Dialog Closed...) com condição opcional dispara ações *true* ou *false* (Show, Hide, Set Value, Refresh, Execute JavaScript Code, Execute Server-side Code etc.). Reduz muito a necessidade de JavaScript escrito à mão.' },
    en: { def: 'Declarative browser-side behavior introduced in APEX 4.0: an event (Change, Click, Page Load, Dialog Closed...) with an optional condition fires *true* or *false* actions (Show, Hide, Set Value, Refresh, Execute JavaScript Code, Execute Server-side Code and more). It greatly reduces the need for hand-written JavaScript.' }
});

DOC.termo({
    id: 'trigger-actions',
    termo: 'Trigger Actions',
    aliases: ['ações em botões', 'menu button', 'botão menu', 'actions'],
    ver: 'dynamic-actions',
    pt: { def: 'Recurso do APEX 26.1 que permite anexar Dynamic Actions diretamente a ações, botões, cards e menus na árvore do Page Designer. Em regiões com várias linhas, os valores da linha acionada ficam acessíveis durante a execução com «&COLUNA.» ou «$v("COLUNA")»; os botões também ganharam o tipo **Menu**.' },
    en: { def: 'An APEX 26.1 feature that attaches Dynamic Actions directly to actions, buttons, cards and menus in the Page Designer tree. In multi-row regions the values of the triggering row are available during execution through «&COLUMN.» or «$v("COLUMN")»; buttons also gained the **Menu** type.' }
});

DOC.termo({
    id: 'ajax-callback',
    termo: 'Ajax Callback',
    aliases: ['On Demand', 'apex.server.process', 'AJAX', 'x01', 'APEX_APPLICATION.G_X01'],
    ver: 'ajax-callbacks',
    pt: { def: 'Ponto de processo (antes chamado *On Demand*) cujo PL/SQL só roda quando chamado pelo navegador via AJAX, normalmente com «apex.server.process("NOME", { x01: valor, pageItems: "#P1_ID" })». Os parâmetros chegam em «APEX_APPLICATION.G_X01»…«G_X10», e a resposta costuma ser JSON escrito com «APEX_JSON» ou «htp.p».' },
    en: { def: 'A process point (formerly *On Demand*) whose PL/SQL runs only when called from the browser through AJAX, typically with «apex.server.process("NAME", { x01: value, pageItems: "#P1_ID" })». Parameters arrive in «APEX_APPLICATION.G_X01»…«G_X10», and the response is usually JSON written with «APEX_JSON» or «htp.p».' }
});

DOC.termo({
    id: 'apex-javascript-namespace',
    termo: 'apex (JavaScript API)',
    aliases: ['apex.item', 'apex.region', 'apex.server', 'apex.message', 'apex.env', '$v', '$s'],
    ver: 'javascript-api',
    pt: { def: 'Namespace JavaScript global do APEX com a API pública do lado do cliente: «apex.item()», «apex.region()», «apex.server», «apex.message», «apex.navigation», «apex.page», «apex.env» e outros. É a forma recomendada de interagir com a página; atalhos antigos como «$v» e «$s» ainda existem.' },
    en: { def: 'The global APEX JavaScript namespace holding the public client-side API: «apex.item()», «apex.region()», «apex.server», «apex.message», «apex.navigation», «apex.page», «apex.env» and more. It is the recommended way to interact with the page; old shortcuts such as «$v» and «$s» still exist.' }
});

DOC.termo({
    id: 'jquery',
    termo: 'jQuery',
    aliases: ['jQuery UI', 'apex.jQuery', '$'],
    ver: 'javascript-api',
    pt: { def: 'Biblioteca JavaScript usada internamente pelo APEX e disponível aos desenvolvedores (também como «apex.jQuery»); o 26.1 traz o jQuery 3.7.1. O **jQuery UI**, base de widgets antigos, está deprecated desde o 20.1 — prefira a API «apex.*» e evite novas dependências dele em plug-ins.' },
    en: { def: 'A JavaScript library used internally by APEX and available to developers (also as «apex.jQuery»); 26.1 ships jQuery 3.7.1. **jQuery UI**, the base of older widgets, has been deprecated since 20.1 — prefer the «apex.*» API and avoid new dependencies on it in plug-ins.' }
});

DOC.termo({
    id: 'apex-collection',
    termo: 'APEX_COLLECTION',
    aliases: ['collection', 'coleção', 'APEX_COLLECTIONS', 'c001', 'carrinho'],
    ver: 'apex-collection',
    pt: { def: 'API para *collections*: tabelas temporárias nomeadas, vinculadas à sessão APEX, com colunas genéricas (c001–c050, n001–n005, d001–d005, clob001, blob001, xmltype001). Muito usadas como carrinho de compras, área de staging ou destino de chamadas REST, e consultadas pela view «APEX_COLLECTIONS».' },
    en: { def: 'The API for *collections*: named temporary tables tied to the APEX session, with generic columns (c001–c050, n001–n005, d001–d005, clob001, blob001, xmltype001). Often used as a shopping cart, a staging area or a target for REST calls, and queried through the «APEX_COLLECTIONS» view.' }
});

DOC.termo({
    id: 'apex-exec',
    termo: 'APEX_EXEC',
    aliases: ['fonte de dados', 'data source', 'open_query_context'],
    ver: 'apex-exec',
    pt: { def: 'Pacote que abstrai a origem dos dados — tabela local, REST Data Source ou REST Enabled SQL — com uma interface única para consultar («open_query_context», «next_row», «get_varchar2»...) e fazer DML. É o que permite aos componentes do APEX funcionarem com qualquer fonte, e é usado em conjunto com «APEX_DATA_EXPORT».' },
    en: { def: 'A package that abstracts the data source — local table, REST Data Source or REST Enabled SQL — behind a single interface to query («open_query_context», «next_row», «get_varchar2»...) and perform DML. It is what lets APEX components work with any source, and it is used together with «APEX_DATA_EXPORT».' }
});

DOC.termo({
    id: 'apex-web-service',
    termo: 'APEX_WEB_SERVICE',
    aliases: ['MAKE_REST_REQUEST', 'chamar API', 'consumir REST', 'HTTP'],
    ver: 'apex-web-service',
    pt: { def: 'Pacote para consumir APIs externas em PL/SQL, principalmente com «MAKE_REST_REQUEST» (resposta CLOB) e «MAKE_REST_REQUEST_B» (BLOB), com cabeçalhos em «g_request_headers» e o status HTTP em «g_status_code». Integra-se a Web Credentials («p_credential_static_id») e depende da ACL de rede e, para HTTPS, de wallet.' },
    en: { def: 'A package for calling external APIs from PL/SQL, mainly with «MAKE_REST_REQUEST» (CLOB response) and «MAKE_REST_REQUEST_B» (BLOB), with headers in «g_request_headers» and the HTTP status in «g_status_code». It integrates with Web Credentials («p_credential_static_id») and depends on the network ACL and, for HTTPS, a wallet.' }
});

DOC.termo({
    id: 'apex-mail',
    termo: 'APEX_MAIL',
    aliases: ['e-mail', 'email', 'SMTP', 'Email Template', 'PUSH_QUEUE', 'Send E-Mail'],
    ver: 'apex-mail',
    pt: { def: 'Pacote para enviar e-mails pelo APEX: «APEX_MAIL.SEND» coloca a mensagem na fila, «ADD_ATTACHMENT» anexa arquivos e «PUSH_QUEUE» força o envio imediato. Suporta **Email Templates** dos Shared Components; o servidor SMTP é configurado na instância e, desde o 26.1, também pode ser definido por workspace.' },
    en: { def: 'The package for sending e-mail from APEX: «APEX_MAIL.SEND» queues the message, «ADD_ATTACHMENT» attaches files and «PUSH_QUEUE» forces immediate delivery. It supports **Email Templates** from Shared Components; the SMTP server is configured at instance level and, since 26.1, can also be set per workspace.' }
});

DOC.termo({
    id: 'apex-dictionary',
    termo: 'APEX Dictionary',
    aliases: ['dicionário do APEX', 'APEX_DICTIONARY', 'APEX_APPLICATIONS', 'APEX_APPLICATION_PAGES', 'views'],
    ver: 'dicionario-apex',
    pt: { def: 'Conjunto de views públicas que expõem os metadados das aplicações e do workspace, como «APEX_APPLICATIONS», «APEX_APPLICATION_PAGES», «APEX_APPLICATION_PAGE_ITEMS» e «APEX_WORKSPACE_ACTIVITY_LOG». A view «APEX_DICTIONARY» lista todas elas — ótimo para auditorias, relatórios de qualidade e automação.' },
    en: { def: 'A set of public views exposing application and workspace metadata, such as «APEX_APPLICATIONS», «APEX_APPLICATION_PAGES», «APEX_APPLICATION_PAGE_ITEMS» and «APEX_WORKSPACE_ACTIVITY_LOG». The «APEX_DICTIONARY» view lists all of them — great for audits, quality reports and automation.' }
});

DOC.termo({
    id: 'error-handling-function',
    termo: 'Error Handling Function',
    aliases: ['tratamento de erros', 'APEX_ERROR', 't_error', 'mensagem amigável'],
    ver: 'tratamento-de-erros',
    pt: { def: 'Função PL/SQL (desde o APEX 4.1), configurada na aplicação ou na página, que intercepta os erros antes de exibi-los, recebendo «apex_error.t_error» e devolvendo «apex_error.t_error_result». Serve para transformar erros de constraint em mensagens amigáveis, registrar logs e esconder detalhes técnicos do usuário.' },
    en: { def: 'A PL/SQL function (since APEX 4.1), set at application or page level, that intercepts errors before they are displayed, receiving «apex_error.t_error» and returning «apex_error.t_error_result». Use it to turn constraint errors into friendly messages, log errors and hide technical details from users.' }
});

DOC.termo({
    id: 'authentication-scheme',
    termo: 'Authentication Scheme',
    aliases: ['autenticação', 'login', 'APEX_AUTHENTICATION', 'Oracle APEX Accounts', 'Custom Authentication', 'LDAP'],
    ver: 'autenticacao',
    pt: { def: 'Define **como** o usuário prova quem é: Oracle APEX Accounts, Database Accounts, LDAP Directory, Social Sign-In, SAML Sign-In, HTTP Header Variable, Custom (função PL/SQL) e outros. Cada aplicação tem um esquema atual, com post-authentication procedure, URL de logout e tratamento de sessão inválida.' },
    en: { def: 'Defines **how** users prove who they are: Oracle APEX Accounts, Database Accounts, LDAP Directory, Social Sign-In, SAML Sign-In, HTTP Header Variable, Custom (PL/SQL function) and others. Each application has one current scheme, with a post-authentication procedure, a logout URL and invalid-session handling.' }
});

DOC.termo({
    id: 'authorization-scheme',
    termo: 'Authorization Scheme',
    aliases: ['autorização', 'permissão', 'APEX_AUTHORIZATION', 'Evaluation Point'],
    ver: 'autorizacao',
    pt: { def: 'Regra que define **o que** o usuário pode acessar — aplicação, páginas, regiões, botões, itens, processos —, baseada em SQL, função PL/SQL booleana, grupos ou valores de itens. O *Evaluation Point* define se o resultado é guardado por sessão, por page view, por componente ou se é sempre reavaliado.' },
    en: { def: 'A rule defining **what** a user may access — application, pages, regions, buttons, items, processes — based on SQL, a Boolean PL/SQL function, groups or item values. The *Evaluation Point* decides whether the result is cached per session, per page view, per component or always re-evaluated.' }
});

DOC.termo({
    id: 'access-control',
    termo: 'Access Control',
    sigla: 'ACL',
    aliases: ['Application Access Control', 'APEX_ACL', 'roles', 'papéis', 'controle de acesso'],
    ver: 'autorizacao',
    pt: { def: 'Controle de acesso por papéis (roles) do APEX: o recurso cria os papéis Administrator, Contributor e Reader, os esquemas de autorização correspondentes e as páginas para atribuir usuários. A API «APEX_ACL» gerencia as atribuições — não confundir com a ACL de rede do banco.' },
    en: { def: 'APEX role-based access control: the feature creates the Administrator, Contributor and Reader roles, the matching authorization schemes and the pages to assign users. The «APEX_ACL» API manages assignments — not to be confused with the database network ACL.' }
});

DOC.termo({
    id: 'session-state-protection',
    termo: 'Session State Protection',
    sigla: 'SSP',
    aliases: ['checksum', 'cs', 'Page Access Protection', 'URL tampering', 'adulteração de URL'],
    ver: 'session-state-protection',
    pt: { def: 'Proteção contra adulteração de URLs, introduzida no APEX 2.0: quando ativa, links que definem itens ou acessam páginas precisam de um **checksum** (parâmetro «cs») gerado pelo APEX, e itens podem ser marcados como não alteráveis pelo navegador. É configurada por página (*Page Access Protection*) e por item; gere os links com «APEX_PAGE.GET_URL» para que o checksum seja incluído.' },
    en: { def: 'Protection against URL tampering, introduced in APEX 2.0: when enabled, links that set items or open pages need an APEX-generated **checksum** (the «cs» parameter), and items can be marked as not settable from the browser. It is configured per page (*Page Access Protection*) and per item; build links with «APEX_PAGE.GET_URL» so the checksum is included.' }
});

DOC.termo({
    id: 'xss',
    termo: 'Cross-Site Scripting',
    sigla: 'XSS',
    aliases: ['escaping', 'escape', 'APEX_ESCAPE', '!HTML', 'injeção de script'],
    ver: 'escaping-e-xss',
    pt: { def: 'Ataque em que dados maliciosos injetam JavaScript na página de outro usuário. No APEX a defesa é manter o escape padrão de colunas e itens, usar filtros como «&P1_ITEM!HTML.» e funções como «APEX_ESCAPE.HTML» ao gerar HTML em PL/SQL, e nunca desligar o escape sem sanitizar o conteúdo.' },
    en: { def: 'An attack where malicious data injects JavaScript into another user\'s page. In APEX the defense is to keep the default escaping of columns and items, use filters such as «&P1_ITEM!HTML.» and functions such as «APEX_ESCAPE.HTML» when generating HTML in PL/SQL, and never turn escaping off without sanitizing the content.' }
});

DOC.termo({
    id: 'sql-injection',
    termo: 'SQL Injection',
    aliases: ['injeção de SQL', 'bind variables', 'DBMS_ASSERT', 'SQL dinâmico'],
    ver: 'sql-injection',
    pt: { def: 'Ataque que altera um comando SQL concatenando entrada do usuário. No APEX o risco aparece ao usar «&ITEM.» dentro de SQL ou ao montar SQL dinâmico por concatenação; a prevenção é usar sempre bind variables («:P1_ITEM», «USING» no EXECUTE IMMEDIATE) e, quando nomes de objetos forem dinâmicos, validá-los com «DBMS_ASSERT».' },
    en: { def: 'An attack that alters a SQL statement by concatenating user input. In APEX the risk appears when using «&ITEM.» inside SQL or building dynamic SQL by concatenation; prevent it by always using bind variables («:P1_ITEM», «USING» in EXECUTE IMMEDIATE) and, when object names are dynamic, validating them with «DBMS_ASSERT».' }
});

DOC.termo({
    id: 'csp',
    termo: 'Content Security Policy',
    sigla: 'CSP',
    aliases: ['nonce', '#APEX_CSP_NONCE#', 'cabeçalhos HTTP', 'unsafe-inline', 'HTTP headers'],
    ver: 'csp-e-cabecalhos',
    pt: { def: 'Cabeçalho HTTP que diz ao navegador de quais origens scripts, estilos e outros recursos podem ser carregados, mitigando XSS. O APEX suporta *nonces* («#APEX_CSP_NONCE#») e, no 26.1, o núcleo deixou de exigir «unsafe-inline» e «unsafe-hashes», permitindo políticas bem mais restritivas.' },
    en: { def: 'An HTTP header telling the browser which origins scripts, styles and other resources may load from, mitigating XSS. APEX supports *nonces* («#APEX_CSP_NONCE#») and, in 26.1, its core no longer requires «unsafe-inline» or «unsafe-hashes», allowing much stricter policies.' }
});

DOC.termo({
    id: 'social-sign-in',
    termo: 'Social Sign-In',
    aliases: ['OAuth2', 'OAuth 2.0', 'OpenID Connect', 'OIDC', 'Google', 'Microsoft Entra ID', 'login social'],
    ver: 'social-sign-in-e-saml',
    pt: { def: 'Esquema de autenticação introduzido no 18.1 que delega o login a um provedor **OpenID Connect** ou **OAuth2** — Google, Facebook, Microsoft Entra ID, OCI IAM, Okta e outros. O client ID e o secret ficam em uma Web Credential, e atributos como e-mail ou grupos podem ser lidos após o login.' },
    en: { def: 'An authentication scheme introduced in 18.1 that delegates sign-in to an **OpenID Connect** or **OAuth2** provider — Google, Facebook, Microsoft Entra ID, OCI IAM, Okta and others. The client ID and secret are kept in a Web Credential, and attributes such as e-mail or groups can be read after sign-in.' }
});

DOC.termo({
    id: 'saml',
    termo: 'SAML',
    aliases: ['SAML 2.0', 'SAML Sign-In', 'SSO', 'single sign-on', 'Security Assertion Markup Language'],
    ver: 'social-sign-in-e-saml',
    pt: { def: 'Padrão XML de single sign-on corporativo (Security Assertion Markup Language). O APEX oferece o esquema de autenticação **SAML Sign-In** desde o 21.2, configurado em parte na instância (certificados do service provider) e em parte na aplicação; o 24.1 adicionou suporte a múltiplos domínios.' },
    en: { def: 'An XML standard for enterprise single sign-on (Security Assertion Markup Language). APEX has offered the **SAML Sign-In** authentication scheme since 21.2, configured partly at instance level (service provider certificates) and partly in the application; 24.1 added multi-domain support.' }
});

DOC.termo({
    id: 'web-credentials',
    termo: 'Web Credentials',
    aliases: ['credencial', 'APEX_CREDENTIAL', 'OAuth2 Client Credentials', 'Basic Auth', 'Allowed URLs'],
    ver: 'web-credentials',
    pt: { def: 'Shared Component que guarda credenciais de APIs de forma criptografada — Basic, OAuth2 Client Credentials, OCI Native, HTTP Header, URL Query String e (26.1) OAuth2 Password Flow — sem expô-las no código. São usadas por REST Data Sources, «APEX_WEB_SERVICE», Social Sign-In e serviços de IA, e podem ser restritas a URLs permitidas.' },
    en: { def: 'A Shared Component that stores API credentials encrypted — Basic, OAuth2 Client Credentials, OCI Native, HTTP Header, URL Query String and (26.1) OAuth2 Password Flow — without exposing them in code. They are used by REST Data Sources, «APEX_WEB_SERVICE», Social Sign-In and AI services, and can be restricted to allowed URLs.' }
});

DOC.termo({
    id: 'rest-data-source',
    termo: 'REST Data Source',
    aliases: ['Web Source Module', 'REST Source', 'Data Profile', 'APEX_REST_SOURCE_SYNC', 'sincronização'],
    ver: 'rest-data-sources',
    pt: { def: 'Shared Component que descreve uma API REST externa — URL, operações, parâmetros e um *Data Profile* que mapeia o JSON ou XML em colunas — para que regiões, processos e «APEX_EXEC» a usem como se fosse uma tabela. Surgiu no 18.1 como *Web Source Module*, foi renomeado no 20.2 e pode sincronizar os dados com uma tabela local.' },
    en: { def: 'A Shared Component that describes an external REST API — URL, operations, parameters and a *Data Profile* mapping the JSON or XML into columns — so regions, processes and «APEX_EXEC» can use it like a table. It appeared in 18.1 as *Web Source Module*, was renamed in 20.2 and can synchronize the data into a local table.' }
});

DOC.termo({
    id: 'rest-enabled-sql',
    termo: 'REST Enabled SQL',
    aliases: ['Remote Server', 'servidor remoto', '/_/sql', 'banco remoto'],
    ver: 'rest-enabled-sql',
    pt: { def: 'Recurso do ORDS que executa SQL e PL/SQL em um banco remoto via HTTPS (endpoint «/ords/<schema>/_/sql»). No APEX, desde o 18.1, ele é cadastrado como **Remote Server** e permite que regiões e processos usem dados de outro banco sem database link.' },
    en: { def: 'An ORDS feature that runs SQL and PL/SQL on a remote database over HTTPS (the «/ords/<schema>/_/sql» endpoint). In APEX, since 18.1, it is registered as a **Remote Server** and lets regions and processes use data from another database without a database link.' }
});

DOC.termo({
    id: 'restful-services',
    termo: 'RESTful Services',
    aliases: ['ORDS REST', 'AutoREST', 'módulo', 'handler', 'ORDS.DEFINE_MODULE', 'ORDS.ENABLE_OBJECT', 'API REST'],
    ver: 'restful-services-ords',
    pt: { def: 'APIs REST publicadas pelo ORDS a partir do banco, organizadas em **módulos**, **templates** (URIs) e **handlers** (GET, POST, PUT, DELETE com SQL ou PL/SQL) e definidas com o pacote «ORDS» ou pelo Database Actions. O **AutoREST** («ORDS.ENABLE_OBJECT») expõe uma tabela ou view com CRUD automático; a tela de RESTful Services do SQL Workshop (surgida no 4.2) ficou deprecated no 26.1.' },
    en: { def: 'REST APIs published by ORDS from the database, organized in **modules**, **templates** (URIs) and **handlers** (GET, POST, PUT, DELETE with SQL or PL/SQL), defined with the «ORDS» package or in Database Actions. **AutoREST** («ORDS.ENABLE_OBJECT») exposes a table or view with automatic CRUD; the SQL Workshop RESTful Services screen (added in 4.2) was deprecated in 26.1.' }
});

DOC.termo({
    id: 'data-load-definition',
    termo: 'Data Load Definition',
    aliases: ['carga de dados', 'APEX_DATA_LOADING', 'APEX_DATA_PARSER', 'upload de CSV', 'Excel', 'Data Loading'],
    ver: 'carga-de-dados',
    pt: { def: 'Shared Component (21.1) que define como carregar arquivos CSV, XLSX, XML ou JSON em uma tabela ou collection: mapeamento de colunas, transformações, lookups e modo (append, merge ou replace). É usado pelo processo **Data Loading** e pela API «APEX_DATA_LOADING»; a leitura dos arquivos fica a cargo do «APEX_DATA_PARSER» (19.1).' },
    en: { def: 'A Shared Component (21.1) that defines how CSV, XLSX, XML or JSON files are loaded into a table or collection: column mapping, transformations, lookups and mode (append, merge or replace). It is used by the **Data Loading** process and the «APEX_DATA_LOADING» API; file parsing is handled by «APEX_DATA_PARSER» (19.1).' }
});

DOC.termo({
    id: 'universal-theme',
    termo: 'Universal Theme',
    sigla: 'UT',
    aliases: ['Theme 42', 'tema', 'responsivo', 'theme'],
    ver: 'universal-theme',
    pt: { def: 'Tema padrão do APEX desde o 5.0 (theme 42): responsivo, acessível e personalizável sem CSS por meio de Template Options, Theme Roller e theme styles. Os temas antigos (1–26 e os móveis 50–51) foram removidos no 18.1; no 26.1 o estilo padrão passou a ser o **Iris**.' },
    en: { def: 'The default APEX theme since 5.0 (theme 42): responsive, accessible and customizable without CSS through Template Options, Theme Roller and theme styles. The old themes (1–26 and the mobile 50–51) were removed in 18.1; in 26.1 the default style became **Iris**.' }
});

DOC.termo({
    id: 'theme-roller',
    termo: 'Theme Roller',
    aliases: ['personalizar tema', 'cores', 'variáveis CSS'],
    ver: 'theme-roller-e-estilos',
    pt: { def: 'Ferramenta visual (desde o 5.0), aberta pela Developer Toolbar, que altera cores, fontes, arredondamentos e outras variáveis CSS do Universal Theme em tempo real e salva o resultado como um novo theme style. No 26.1 ganhou personalizações avançadas e propriedades condicionais.' },
    en: { def: 'A visual tool (since 5.0), opened from the Developer Toolbar, that changes colors, fonts, roundness and other Universal Theme CSS variables in real time and saves the result as a new theme style. 26.1 added advanced customizations and conditional properties.' }
});

DOC.termo({
    id: 'theme-style',
    termo: 'Theme Style',
    aliases: ['estilo do tema', 'Vita', 'Iris', 'Redwood Light', 'Vita - Dark', 'Vita - Slate'],
    ver: 'theme-roller-e-estilos',
    pt: { def: 'Variação visual (conjunto de CSS) de um tema. O Universal Theme traz estilos como **Vita** (com as variações Dark e Slate), **Redwood Light** (20.2) e **Iris**, novo padrão do 26.1, baseado no Vita e alinhado ao Redwood; o usuário final pode ter permissão para escolher o próprio estilo.' },
    en: { def: 'A visual variation (a set of CSS) of a theme. Universal Theme ships styles such as **Vita** (with Dark and Slate variants), **Redwood Light** (20.2) and **Iris**, the new 26.1 default, based on Vita and aligned with Redwood; end users can be allowed to pick their own style.' }
});

DOC.termo({
    id: 'template-options',
    termo: 'Template Options',
    aliases: ['opções de template', 'modificadores CSS', 'classes CSS'],
    ver: 'template-options-e-css',
    pt: { def: 'Opções declarativas (desde o 5.0) que aplicam classes CSS modificadoras a regiões, botões, itens, listas e páginas — por exemplo, remover o padding, destacar um botão ou mudar o layout de um relatório — sem escrever CSS.' },
    en: { def: 'Declarative options (since 5.0) that apply CSS modifier classes to regions, buttons, items, lists and pages — for example removing padding, highlighting a button or changing a report layout — without writing CSS.' }
});

DOC.termo({
    id: 'template-component',
    termo: 'Template Component',
    aliases: ['componente de template', 'Avatar', 'Badge', 'Timeline', 'Content Row', 'Metric Card', 'slots'],
    ver: 'template-components',
    pt: { def: 'Tipo de plug-in introduzido no 23.1 que define um componente reutilizável a partir de HTML com template directives, usado como região, coluna de relatório ou item. O Universal Theme traz Avatar, Badge, Comments, Content Row, Media List, Timeline e, no 26.1, Metric Card e Blank Page.' },
    en: { def: 'A plug-in type introduced in 23.1 that defines a reusable component from HTML with template directives, usable as a region, a report column or an item. Universal Theme ships Avatar, Badge, Comments, Content Row, Media List, Timeline and, in 26.1, Metric Card and Blank Page.' }
});

DOC.termo({
    id: 'template-directives',
    termo: 'Template Directives',
    aliases: ['diretivas de template', '{if}', '{loop}', '{case}', 'apex.util.applyTemplate'],
    ver: 'template-directives',
    pt: { def: 'Mini-linguagem de templates do APEX, introduzida no 20.2, com condições e repetições como «{if ITEM/}…{else/}…{endif/}», «{case}» e «{loop}», além de filtros de escape. Funciona em Cards, HTML Expressions, Template Components, e-mails e, no 26.1, também em templates de botões, listas, itens, regiões e páginas.' },
    en: { def: 'The APEX template mini-language, introduced in 20.2, with conditions and loops such as «{if ITEM/}…{else/}…{endif/}», «{case}» and «{loop}», plus escape filters. It works in Cards, HTML Expressions, Template Components, e-mails and, in 26.1, also in button, list, item, region and page templates.' }
});

DOC.termo({
    id: 'font-apex',
    termo: 'Font APEX',
    aliases: ['ícones', 'icons', 'fa fa-', 'Font Awesome'],
    ver: 'icones-font-apex',
    pt: { def: 'Biblioteca de ícones criada para o APEX, lançada no 5.1 e padrão desde o 18.1 (Font APEX 2), quando substituiu o Font Awesome. Os ícones usam classes como «fa fa-user» e modificadores de tamanho, animação e sobreposição; o 26.1 traz o Font APEX 2.5.' },
    en: { def: 'The icon library built for APEX, released in 5.1 and the default since 18.1 (Font APEX 2), when it replaced Font Awesome. Icons use classes such as «fa fa-user» plus size, animation and overlay modifiers; 26.1 ships Font APEX 2.5.' }
});

DOC.termo({
    id: 'pwa',
    termo: 'Progressive Web App',
    sigla: 'PWA',
    aliases: ['app instalável', 'service worker', 'push notification', 'notificações push', 'APEX_PWA'],
    ver: 'pwa',
    pt: { def: 'Aplicação web instalável no celular ou no desktop como se fosse nativa, com service worker e cache. O APEX suporta PWA desde o 21.2 (ativado nos atributos da aplicação), permite personalizar o service worker desde o 22.1 e enviar **push notifications** desde o 23.1 («APEX_PWA», processo Send Push Notification).' },
    en: { def: 'A web application that installs on phones or desktops like a native app, with a service worker and caching. APEX has supported PWAs since 21.2 (enabled in application attributes), custom service worker settings since 22.1 and **push notifications** since 23.1 («APEX_PWA», Send Push Notification process).' }
});

DOC.termo({
    id: 'llm',
    termo: 'Large Language Model',
    sigla: 'LLM',
    aliases: ['modelo de linguagem', 'IA generativa', 'generative AI', 'GPT', 'Claude', 'Gemini'],
    ver: 'ia-no-apex-visao-geral',
    pt: { def: 'Modelo de IA treinado com grandes volumes de texto, capaz de gerar e interpretar linguagem natural e código. O APEX não traz um LLM embutido: ele se conecta a provedores configurados como Generative AI Services — OCI Generative AI, OpenAI, Cohere e, no 26.1, Anthropic Claude, Google Gemini, Mistral e Ollama.' },
    en: { def: 'An AI model trained on large amounts of text, able to generate and understand natural language and code. APEX does not embed an LLM: it connects to providers configured as Generative AI Services — OCI Generative AI, OpenAI, Cohere and, in 26.1, Anthropic Claude, Google Gemini, Mistral and Ollama.' }
});

DOC.termo({
    id: 'generative-ai-service',
    termo: 'Generative AI Service',
    aliases: ['serviço de IA', 'OCI Generative AI', 'OpenAI', 'Cohere', 'Ollama', 'AI Attributes', 'Max AI Tokens'],
    ver: 'servicos-de-ia-generativa',
    pt: { def: 'Configuração (24.1) que conecta o APEX a um provedor de LLM — endpoint, modelo e credencial —, criada na instância ou em Workspace Utilities. É usada pelo APEX Assistant, pela API «APEX_AI» e pelos componentes de IA das aplicações; no 26.1 o consumo pode ser limitado com **Max AI Tokens**.' },
    en: { def: 'A configuration (24.1) that connects APEX to an LLM provider — endpoint, model and credential — created at instance level or in Workspace Utilities. It is used by APEX Assistant, the «APEX_AI» API and AI components in applications; in 26.1 usage can be capped with **Max AI Tokens**.' }
});

DOC.termo({
    id: 'apex-assistant',
    termo: 'APEX Assistant',
    aliases: ['assistente de IA', 'AI assistant', 'gerar SQL', 'Create App Using Generative AI'],
    ver: 'apex-assistant',
    pt: { def: 'Assistente de IA do App Builder (24.1), disponível nos editores de código para gerar, explicar e corrigir SQL, PL/SQL e JavaScript, e na criação de aplicações e páginas a partir de linguagem natural. Requer um Generative AI Service habilitado para uso no App Builder.' },
    en: { def: 'The App Builder AI assistant (24.1), available in code editors to generate, explain and fix SQL, PL/SQL and JavaScript, and when creating applications and pages from natural language. It requires a Generative AI Service enabled for App Builder use.' }
});

DOC.termo({
    id: 'apex-ai',
    termo: 'APEX_AI',
    aliases: ['apex_ai.generate', 'GENERATE', 'CHAT', 'GET_VECTOR_EMBEDDINGS'],
    ver: 'apex-ai-pacote',
    pt: { def: 'Pacote PL/SQL (24.1) para conversar com LLMs a partir do código: «GENERATE» (prompt único), «CHAT» (com histórico), «GET_VECTOR_EMBEDDINGS» (24.2) e outros. No 26.1 aceita anexos (imagens, PDFs), respostas JSON validadas por JSON Schema e tools definidas em tempo de execução; exige uma sessão APEX.' },
    en: { def: 'A PL/SQL package (24.1) for talking to LLMs from code: «GENERATE» (single prompt), «CHAT» (with history), «GET_VECTOR_EMBEDDINGS» (24.2) and more. In 26.1 it accepts attachments (images, PDFs), JSON responses validated by a JSON Schema and tools defined at runtime; it requires an APEX session.' }
});

DOC.termo({
    id: 'ai-agent',
    termo: 'AI Agent',
    aliases: ['agente de IA', 'AI Agents', 'system prompt', 'tools'],
    ver: 'ai-agents-e-rag',
    pt: { def: 'Shared Component do APEX 26.1 que reúne system prompt, mensagem de boas-vindas, serviço de IA e as **AI Tools** que o modelo pode usar. Substituiu as AI Configurations do 24.2 e é usado pela Dynamic Action Show AI Assistant e pela API «APEX_AI».' },
    en: { def: 'An APEX 26.1 Shared Component that bundles a system prompt, a welcome message, an AI service and the **AI Tools** the model may use. It replaced the 24.2 AI Configurations and is used by the Show AI Assistant Dynamic Action and the «APEX_AI» API.' }
});

DOC.termo({
    id: 'ai-tool',
    termo: 'AI Tool',
    aliases: ['tool calling', 'function calling', 'Retrieve Data', 'Augment System Prompt', 'On Demand', 'guardrails'],
    ver: 'ai-agents-e-rag',
    pt: { def: 'Capacidade que um AI Agent (26.1) expõe ao modelo: **Retrieve Data** (SQL ou função que devolve dados), **Execute Server-side Code** (PL/SQL ou JavaScript MLE) e **Execute Client-side Code** (no navegador), além de plug-ins próprios. Roda *On Demand* (quando o LLM decide chamar) ou em *Augment System Prompt* (antes da conversa, o antigo RAG Source) e pode exigir aprovação do usuário.' },
    en: { def: 'A capability an AI Agent (26.1) exposes to the model: **Retrieve Data** (SQL or a function returning data), **Execute Server-side Code** (PL/SQL or MLE JavaScript) and **Execute Client-side Code** (in the browser), plus custom plug-ins. It runs *On Demand* (when the LLM decides to call it) or as *Augment System Prompt* (before the conversation, the former RAG Source) and can require user approval.' }
});

DOC.termo({
    id: 'ai-configuration',
    termo: 'AI Configuration',
    aliases: ['AI Configurations', 'RAG Source', 'RAG Sources'],
    ver: 'ai-agents-e-rag',
    pt: { def: 'Shared Component do APEX 24.2 que guardava system prompt, mensagem de boas-vindas e **RAG Sources** (consultas que enriquecem o prompt com dados da aplicação). No 26.1 foi substituído pelos AI Agents: as configurações viraram agentes e as RAG Sources viraram tools do tipo *Augment System Prompt*.' },
    en: { def: 'An APEX 24.2 Shared Component that held a system prompt, a welcome message and **RAG Sources** (queries that enrich the prompt with application data). In 26.1 it was replaced by AI Agents: configurations became agents and RAG Sources became *Augment System Prompt* tools.' }
});

DOC.termo({
    id: 'rag',
    termo: 'Retrieval-Augmented Generation',
    sigla: 'RAG',
    aliases: ['geração aumentada por recuperação', 'grounding', 'contexto'],
    ver: 'ai-agents-e-rag',
    pt: { def: 'Técnica que busca dados relevantes (por SQL, busca textual ou vetorial) e os inclui no prompt para que o LLM responda com base em informação real e atual. No APEX foi implementada com as RAG Sources (24.2) e, no 26.1, com AI Tools em modo *Augment System Prompt* ou chamadas sob demanda.' },
    en: { def: 'A technique that retrieves relevant data (through SQL, text or vector search) and adds it to the prompt so the LLM answers from real, current information. APEX implemented it with RAG Sources (24.2) and, in 26.1, with AI Tools in *Augment System Prompt* mode or called on demand.' }
});

DOC.termo({
    id: 'vector-search',
    termo: 'Vector Search',
    aliases: ['AI Vector Search', 'busca vetorial', 'embeddings', 'VECTOR', 'Vector Provider', 'VECTOR_DISTANCE'],
    ver: 'select-ai-e-vetores',
    pt: { def: 'Busca por similaridade semântica usando *embeddings* (vetores numéricos que representam o significado de textos), com o tipo VECTOR e funções como «VECTOR_DISTANCE» do Oracle Database 23ai/26ai. No APEX 24.2 surgiram os **Vector Providers**, as Search Configurations vetoriais e «APEX_AI.GET_VECTOR_EMBEDDINGS».' },
    en: { def: 'Semantic similarity search using *embeddings* (numeric vectors representing the meaning of text), with the VECTOR type and functions such as «VECTOR_DISTANCE» in Oracle Database 23ai/26ai. APEX 24.2 introduced **Vector Providers**, vector Search Configurations and «APEX_AI.GET_VECTOR_EMBEDDINGS».' }
});

DOC.termo({
    id: 'select-ai',
    termo: 'Select AI',
    aliases: ['DBMS_CLOUD_AI', 'NL2SQL', 'linguagem natural para SQL', 'AI profile'],
    ver: 'select-ai-e-vetores',
    pt: { def: 'Recurso do banco (Autonomous Database e versões recentes) que transforma perguntas em linguagem natural em SQL, por meio do pacote «DBMS_CLOUD_AI» e de perfis de IA. Não é um componente declarativo do APEX, mas pode ser chamado em PL/SQL a partir das aplicações.' },
    en: { def: 'A database feature (Autonomous Database and recent releases) that turns natural-language questions into SQL through the «DBMS_CLOUD_AI» package and AI profiles. It is not a declarative APEX component, but applications can call it from PL/SQL.' }
});

DOC.termo({
    id: 'nl2ir',
    termo: 'Natural Language Interactive Report',
    sigla: 'NL2IR',
    aliases: ['IR com linguagem natural', 'Interactive Report com IA', 'linguagem natural'],
    ver: 'select-ai-e-vetores',
    pt: { def: 'Recurso do APEX 26.1 em que o usuário descreve em linguagem natural o que quer ver em um Interactive Report (ex.: «vendas por região em gráfico de barras») e o LLM aplica as configurações correspondentes — filtros, quebras, gráficos. Exige um Generative AI Service definido nos AI Attributes da aplicação.' },
    en: { def: 'An APEX 26.1 feature where users describe in natural language what they want to see in an Interactive Report (e.g. «sales by region as a bar chart») and the LLM applies the matching settings — filters, breaks, charts. It requires a Generative AI Service set in the application AI Attributes.' }
});

DOC.termo({
    id: 'blueprint',
    termo: 'Blueprint',
    aliases: ['APEX_GENDEV', 'Spec-Driven Development', 'SDD', 'especificação', 'Markdown'],
    ver: 'blueprints-e-spec-driven',
    pt: { def: 'No APEX 26.1, especificação em Markdown que descreve páginas, navegação, regiões, formulários, gráficos, filtros e ações de uma aplicação, usada no *spec-driven development* com assistentes de IA: pode ser inspecionada, importada pelo App Builder e regenerada quando a especificação muda («APEX_GENDEV»). Não confundir com os blueprints do Data Generator (22.1), que descrevem dados de teste.' },
    en: { def: 'In APEX 26.1, a Markdown specification describing the pages, navigation, regions, forms, charts, filters and actions of an application, used for *spec-driven development* with AI assistants: it can be inspected, imported through App Builder and regenerated when the spec changes («APEX_GENDEV»). Not to be confused with Data Generator blueprints (22.1), which describe test data.' }
});

DOC.termo({
    id: 'show-ai-assistant',
    termo: 'Show AI Assistant',
    aliases: ['chat', 'AI chat widget', 'chatbot', 'assistente de IA'],
    ver: 'chat-e-geracao-de-texto',
    pt: { def: 'Dynamic Action (24.1) que abre um widget de chat com IA, em diálogo ou embutido na página, usando o serviço configurado e, a partir do 24.2/26.1, uma AI Configuration ou um AI Agent. No 26.1 ganhou **Items to Submit**, que envia valores de itens ao servidor e ao system prompt.' },
    en: { def: 'A Dynamic Action (24.1) that opens an AI chat widget, as a dialog or inline on the page, using the configured service and, from 24.2/26.1, an AI Configuration or AI Agent. In 26.1 it gained **Items to Submit**, which sends item values to the server and the system prompt.' }
});

DOC.termo({
    id: 'generate-text-with-ai',
    termo: 'Generate Text with AI',
    aliases: ['gerar texto', 'resumir', 'traduzir', 'summarize'],
    ver: 'chat-e-geracao-de-texto',
    pt: { def: 'Ação declarativa que envia um prompt ao LLM e grava a resposta em um item — útil para resumir, traduzir, classificar ou redigir textos. Surgiu como Dynamic Action no 24.2 e, no 26.1, também como processo de página e como atividade de Workflow.' },
    en: { def: 'A declarative action that sends a prompt to the LLM and stores the answer in an item — useful to summarize, translate, classify or draft text. It appeared as a Dynamic Action in 24.2 and, in 26.1, also as a page process and a Workflow activity.' }
});

DOC.termo({
    id: 'mcp',
    termo: 'Model Context Protocol',
    sigla: 'MCP',
    aliases: ['servidor MCP', 'MCP server', 'SQLcl MCP'],
    ver: 'ia-no-apex-visao-geral',
    pt: { def: 'Protocolo aberto, criado pela Anthropic em 2024, que permite a assistentes de IA usar ferramentas e dados externos de forma padronizada. O APEX não tem servidor MCP nativo; no ecossistema Oracle, o **SQLcl** (desde o 25.2) e o **ORDS** (desde o 26.2) funcionam como servidores MCP e podem ser usados para trabalhar com schemas e aplicações APEX.' },
    en: { def: 'An open protocol, created by Anthropic in 2024, that lets AI assistants use external tools and data in a standard way. APEX has no native MCP server; in the Oracle ecosystem, **SQLcl** (since 25.2) and **ORDS** (since 26.2) act as MCP servers and can be used to work with APEX schemas and applications.' }
});

DOC.termo({
    id: 'automation',
    termo: 'Automation',
    aliases: ['automação', 'APEX_AUTOMATION', 'agendamento', 'scheduler', 'DBMS_SCHEDULER'],
    ver: 'automations',
    pt: { def: 'Shared Component (20.2) que executa ações PL/SQL de forma agendada ou sob demanda, normalmente para cada linha retornada por uma consulta — ex.: enviar lembretes ou aprovar pedidos automaticamente. Roda via DBMS_SCHEDULER, mantém log das execuções e é controlado pela API «APEX_AUTOMATION».' },
    en: { def: 'A Shared Component (20.2) that runs PL/SQL actions on a schedule or on demand, usually for each row returned by a query — e.g. sending reminders or auto-approving requests. It runs through DBMS_SCHEDULER, logs its executions and is controlled with the «APEX_AUTOMATION» API.' }
});

DOC.termo({
    id: 'execution-chain',
    termo: 'Execution Chain',
    aliases: ['background', 'segundo plano', 'APEX_BACKGROUND_PROCESS', 'processo assíncrono'],
    ver: 'execution-chains-background',
    pt: { def: 'Tipo de processo (23.1) que agrupa outros processos e pode executá-los **em segundo plano**, liberando a página enquanto um trabalho longo roda. O progresso e o status são acompanhados e controlados pela API «APEX_BACKGROUND_PROCESS».' },
    en: { def: 'A process type (23.1) that groups other processes and can run them **in the background**, freeing the page while a long job runs. Progress and status are tracked and controlled through the «APEX_BACKGROUND_PROCESS» API.' }
});

DOC.termo({
    id: 'human-task',
    termo: 'Human Task',
    aliases: ['Approvals', 'aprovação', 'Task Definition', 'APEX_HUMAN_TASK', 'APEX_APPROVAL', 'Action Task'],
    ver: 'human-tasks-e-aprovacoes',
    pt: { def: 'Tarefa que exige ação de uma pessoa, definida em uma **Task Definition** com participantes (potential owners, business admins), parâmetros, prazos e ações. Surgiu no 22.1 como componente de aprovações; o 23.2 trouxe as Action Tasks e a API «APEX_HUMAN_TASK», que substitui «APEX_APPROVAL».' },
    en: { def: 'A task that needs a person to act, defined in a **Task Definition** with participants (potential owners, business admins), parameters, deadlines and actions. It appeared in 22.1 as the approvals component; 23.2 added Action Tasks and the «APEX_HUMAN_TASK» API, which replaces «APEX_APPROVAL».' }
});

DOC.termo({
    id: 'unified-task-list',
    termo: 'Unified Task List',
    aliases: ['lista de tarefas', 'inbox', 'caixa de tarefas'],
    ver: 'human-tasks-e-aprovacoes',
    pt: { def: 'Tipo de página (22.1) que reúne em um só lugar as tarefas humanas do usuário — aprovar, rejeitar, reivindicar, delegar, pedir informação —, as tarefas que ele iniciou ou, para administradores, todas as tarefas. É criada pelo assistente de página e funciona com qualquer Task Definition.' },
    en: { def: 'A page type (22.1) that gathers in one place the human tasks of a user — approve, reject, claim, delegate, request information —, the tasks they initiated or, for administrators, all tasks. It is created by the page wizard and works with any Task Definition.' }
});

DOC.termo({
    id: 'workflow',
    termo: 'Workflow',
    aliases: ['fluxo', 'APEX_WORKFLOW', 'Workflow Diagram', 'Workflow Console', 'Parallel Flow'],
    ver: 'workflow',
    pt: { def: 'Recurso (23.2) para modelar processos de negócio de longa duração em um designer gráfico, com atividades como Human Task, Execute Code, Send E-Mail, Invoke API, Wait e Switch, além de versões e console de monitoramento. A região Workflow Diagram veio no 24.1, os subworkflows no 24.2 e os caminhos paralelos (Parallel Flow) no 26.1; a API é «APEX_WORKFLOW».' },
    en: { def: 'A feature (23.2) for modeling long-running business processes in a graphical designer, with activities such as Human Task, Execute Code, Send E-Mail, Invoke API, Wait and Switch, plus versions and a monitoring console. The Workflow Diagram region came in 24.1, sub-workflows in 24.2 and parallel paths (Parallel Flow) in 26.1; the API is «APEX_WORKFLOW».' }
});

DOC.termo({
    id: 'application-export-import',
    termo: 'Application Export / Import',
    aliases: ['export', 'import', 'exportar', 'importar', 'f100.sql', 'split', 'APEX_EXPORT', 'Import Application'],
    ver: 'exportar-importar',
    pt: { def: 'A aplicação é exportada como script SQL (ex.: «f100.sql», opcionalmente dividido em vários arquivos dentro de um ZIP) que recria seus metadados ao ser importado em outro workspace ou instância. Pode ser feito pelo App Builder, por «APEX_EXPORT» ou pelo SQLcl («apex export»); no 26.1 há os tipos Standard, Runtime, Full e Custom, em SQL ou APEXlang.' },
    en: { def: 'An application is exported as a SQL script (e.g. «f100.sql», optionally split into several files inside a ZIP) that recreates its metadata when imported into another workspace or instance. It can be done from App Builder, with «APEX_EXPORT» or with SQLcl («apex export»); 26.1 offers the Standard, Runtime, Full and Custom types, in SQL or APEXlang.' }
});

DOC.termo({
    id: 'readable-export',
    termo: 'Readable Export',
    aliases: ['export legível', 'YAML', 'JSON', 'diff', 'readable format'],
    ver: 'controle-de-versao',
    pt: { def: 'Formato de export legível para revisão e diff em controle de versão, introduzido no 22.1 (JSON e YAML; desde o 24.1, apenas YAML, também por página). Serve para comparar, não para importar — papel que no 26.1 passa a ser cumprido pelo APEXlang, que é legível *e* importável.' },
    en: { def: 'A human-readable export format for review and diffs in version control, introduced in 22.1 (JSON and YAML; since 24.1 YAML only, also per page). It is meant for comparing, not importing — a role taken over in 26.1 by APEXlang, which is readable *and* importable.' }
});

DOC.termo({
    id: 'supporting-objects',
    termo: 'Supporting Objects',
    aliases: ['objetos de suporte', 'scripts de instalação', 'Data Package', 'deinstall'],
    ver: 'supporting-objects',
    pt: { def: 'Scripts e definições (desde o APEX 2.2) que acompanham o export da aplicação para instalar, atualizar e remover os objetos de banco de que ela depende (tabelas, pacotes, dados iniciais), com pré-requisitos e mensagens. Desde o 21.2 o *Data Package* também permite incluir dados de tabelas.' },
    en: { def: 'Scripts and definitions (since APEX 2.2) shipped with the application export to install, upgrade and remove the database objects it depends on (tables, packages, seed data), with prerequisites and messages. Since 21.2 the *Data Package* can also include table data.' }
});

DOC.termo({
    id: 'working-copy',
    termo: 'Working Copy',
    aliases: ['cópia de trabalho', 'merge', 'branch', 'Main', 'MAIN_APP_ID'],
    ver: 'working-copies',
    pt: { def: 'Cópia de uma aplicação (23.2) em que o desenvolvedor trabalha isolado da versão principal (*Main*), podendo comparar as diferenças e fazer merge de volta. O 24.1 adicionou a comparação de páginas com a Main e indicadores de páginas bloqueadas; no 26.1 o diff pode ser revisado em APEXlang.' },
    en: { def: 'A copy of an application (23.2) where a developer works isolated from the main version (*Main*), then compares the differences and merges back. 24.1 added page comparison with Main and indicators for locked pages; in 26.1 the diff can be reviewed in APEXlang.' }
});

DOC.termo({
    id: 'apexlang',
    termo: 'APEXlang',
    aliases: ['.apx', 'linguagem de especificação', 'apex validate', 'SQL Developer for VS Code'],
    ver: 'apexlang',
    pt: { def: 'Linguagem aberta de especificação de aplicações lançada no APEX 26.1: a aplicação é exportada como arquivos «.apx» legíveis, importáveis e amigáveis para Git e LLMs, com suporte no SQL Developer for VS Code. O SQLcl (26.1.2+) exporta, valida e importa APEXlang; a importação exige ORDS 26.1.1 e um schema REST-enabled.' },
    en: { def: 'An open application specification language launched in APEX 26.1: the application is exported as readable, importable «.apx» files friendly to Git and LLMs, supported in SQL Developer for VS Code. SQLcl (26.1.2+) exports, validates and imports APEXlang; importing requires ORDS 26.1.1 and a REST-enabled schema.' }
});

DOC.termo({
    id: 'application-lock',
    termo: 'Application Lock',
    aliases: ['bloqueio de aplicação', 'lock', 'aplicação bloqueada'],
    ver: 'apexlang',
    pt: { def: 'Atributo do APEX 26.1 que impede alterações na aplicação pelo App Builder: uma aplicação bloqueada só pode ser modificada via APEXlang. Útil quando o código-fonte oficial vive no Git; com Working Copies, a versão Main pode ser bloqueada separadamente.' },
    en: { def: 'An APEX 26.1 attribute that prevents changes to the application through App Builder: a locked application can only be modified through APEXlang. Useful when the source of truth lives in Git; with Working Copies, the Main version can be locked separately.' }
});

DOC.termo({
    id: 'static-id',
    termo: 'Static ID',
    aliases: ['HTML DOM ID', 'identificador', 'id da região', 'apex.region'],
    ver: 'apexlang',
    pt: { def: 'Identificador legível e estável de um componente. No 26.1 todos os componentes passaram a ter Static IDs únicos (gerados no upgrade, para diffs limpos em APEXlang), e o antigo "Static ID" de regiões e botões — usado como id no HTML e em «apex.region("id")» — passou a se chamar **HTML DOM ID**.' },
    en: { def: 'A readable, stable identifier of a component. In 26.1 every component got a unique Static ID (generated on upgrade, for clean APEXlang diffs), and the former "Static ID" of regions and buttons — used as the HTML id and in «apex.region("id")» — was renamed **HTML DOM ID**.' }
});

DOC.termo({
    id: 'sqlcl',
    termo: 'SQLcl',
    aliases: ['SQL Developer Command Line', 'SQLcl Projects', 'Liquibase', 'apex export', 'CI/CD'],
    ver: 'sqlcl-projects-e-cicd',
    pt: { def: 'Cliente de linha de comando moderno da Oracle (alternativa ao «SQL*Plus»), com comandos para exportar e importar aplicações APEX. Desde o 24.3 tem os **SQLcl Projects** (CI/CD baseado em Liquibase), desde o 25.2 funciona como servidor MCP e, a partir do 26.1.2, trabalha com APEXlang.' },
    en: { def: 'Oracle\'s modern command-line client (an alternative to «SQL*Plus»), with commands to export and import APEX applications. Since 24.3 it offers **SQLcl Projects** (Liquibase-based CI/CD), since 25.2 it works as an MCP server and, from 26.1.2, it handles APEXlang.' }
});

DOC.termo({
    id: 'build-option',
    termo: 'Build Option',
    aliases: ['opção de build', 'feature flag', 'Include', 'Exclude', 'APEX_APPLICATION_ADMIN'],
    ver: 'ambientes-dev-test-prod',
    pt: { def: 'Chave liga/desliga (Include/Exclude) associada a componentes — páginas, regiões, itens, processos — para incluí-los ou excluí-los da aplicação sem apagá-los. Útil para features em desenvolvimento e diferenças entre ambientes; o status também pode ser alterado por API («APEX_APPLICATION_ADMIN», 23.1).' },
    en: { def: 'An on/off switch (Include/Exclude) attached to components — pages, regions, items, processes — to include or exclude them from the application without deleting them. Useful for features under development and differences between environments; the status can also be changed through an API («APEX_APPLICATION_ADMIN», 23.1).' }
});

DOC.termo({
    id: 'subscription',
    termo: 'Subscription',
    aliases: ['assinatura', 'master app', 'aplicação mestre', 'APEX_SHARED_COMPONENT', 'refresh', 'publish'],
    ver: 'reutilizacao-e-subscriptions',
    pt: { def: 'Vínculo em que um Shared Component (tema, template, LOV, esquema de autenticação, lista etc.) é cópia de um componente-mestre de outra aplicação, podendo ser atualizado a partir dele (refresh) ou receber publicações (publish). No 24.2 surgiu a API «APEX_SHARED_COMPONENT» e, no 26.1, as Library e Theme applications formalizaram esse modelo.' },
    en: { def: 'A link where a Shared Component (theme, template, LOV, authentication scheme, list and so on) is a copy of a master component in another application and can be refreshed from it or receive publications (publish). 24.2 introduced the «APEX_SHARED_COMPONENT» API and, in 26.1, Library and Theme applications formalized this model.' }
});

DOC.termo({
    id: 'theme-application',
    termo: 'Theme Application',
    aliases: ['aplicação de tema', 'tipo de aplicação', 'application type'],
    ver: 'reutilizacao-e-subscriptions',
    pt: { def: 'Tipo de aplicação do APEX 26.1 que contém apenas definições de tema e ativos visuais (estilos, templates, Template Components) para serem assinados pelas aplicações do tipo Standard, centralizando a identidade visual da empresa.' },
    en: { def: 'An APEX 26.1 application type that holds only theme definitions and visual assets (styles, templates, Template Components) for Standard applications to subscribe to, centralizing the company look and feel.' }
});

DOC.termo({
    id: 'library-application',
    termo: 'Library Application',
    aliases: ['aplicação biblioteca', 'tipo de aplicação', 'application type', 'componentes reutilizáveis'],
    ver: 'reutilizacao-e-subscriptions',
    pt: { def: 'Tipo de aplicação do APEX 26.1 que reúne Shared Components reutilizáveis — esquemas de autenticação, LOVs e outros — para serem assinados (subscriptions) pelas aplicações do tipo Standard.' },
    en: { def: 'An APEX 26.1 application type that gathers reusable Shared Components — authentication schemes, LOVs and more — for Standard applications to subscribe to.' }
});

DOC.termo({
    id: 'boilerplate-application',
    termo: 'Boilerplate Application',
    aliases: ['aplicação modelo', 'template de aplicação', 'tipo de aplicação', 'application type', 'starter'],
    ver: 'reutilizacao-e-subscriptions',
    pt: { def: 'Tipo de aplicação do APEX 26.1 que serve de ponto de partida para novas aplicações, já com subscriptions de Shared Components e páginas prontas — um esqueleto padronizado da empresa. Os demais tipos são Standard (o padrão), Theme e Library.' },
    en: { def: 'An APEX 26.1 application type that serves as the starting point for new applications, with seeded Shared Component subscriptions and ready-made pages — a standardized company skeleton. The other types are Standard (the default), Theme and Library.' }
});

DOC.termo({
    id: 'application-translation',
    termo: 'Application Translation',
    aliases: ['tradução', 'XLIFF', 'seed', 'publish', 'idioma', 'translated application'],
    ver: 'traducao-de-aplicacoes',
    pt: { def: 'Processo de gerar versões em outros idiomas a partir da aplicação primária: mapear os idiomas, fazer o *seed*, exportar os textos em **XLIFF**, traduzir, importar e publicar as cópias traduzidas. O idioma em uso pode vir do navegador, de uma preferência, de um item ou da sessão; no 26.1 as Text Messages também podem ser traduzidas via XLIFF ou CSV.' },
    en: { def: 'The process of producing other-language versions of the primary application: map the languages, *seed*, export the strings as **XLIFF**, translate, import and publish the translated copies. The active language can come from the browser, a preference, an item or the session; in 26.1 Text Messages can also be translated through XLIFF or CSV.' }
});

DOC.termo({
    id: 'text-messages',
    termo: 'Text Messages',
    aliases: ['mensagens', 'APEX_LANG', 'APEX_LANG.GET_MESSAGE', 'apex.lang.getMessage', 'i18n'],
    ver: 'mensagens-de-texto',
    pt: { def: 'Mensagens nomeadas e traduzíveis definidas em Shared Components, obtidas em PL/SQL com «APEX_LANG.GET_MESSAGE» e, quando marcadas para uso em JavaScript, com «apex.lang.getMessage». Também permitem substituir mensagens internas do APEX, como textos de erro e de relatórios.' },
    en: { def: 'Named, translatable messages defined in Shared Components, retrieved in PL/SQL with «APEX_LANG.GET_MESSAGE» and, when flagged for JavaScript, with «apex.lang.getMessage». They also let you override built-in APEX messages, such as error and report texts.' }
});

DOC.termo({
    id: 'debug-mode',
    termo: 'Debug Mode',
    aliases: ['debug', 'depuração', 'Developer Toolbar', 'APEX_DEBUG', 'APEX_DEBUG_MESSAGES', 'View Debug'],
    ver: 'modo-debug',
    pt: { def: 'Modo em que o APEX registra mensagens detalhadas do processamento da página (níveis 1 a 9), ativado pela Developer Toolbar, pela URL (posição Debug do f?p, com YES ou LEVELn) ou por «APEX_SESSION.SET_DEBUG». As mensagens, inclusive as suas gravadas com «APEX_DEBUG», ficam na view «APEX_DEBUG_MESSAGES».' },
    en: { def: 'A mode in which APEX logs detailed messages about page processing (levels 1 to 9), enabled from the Developer Toolbar, the URL (the f?p Debug position, with YES or LEVELn) or «APEX_SESSION.SET_DEBUG». The messages, including your own written with «APEX_DEBUG», are stored in the «APEX_DEBUG_MESSAGES» view.' }
});

DOC.termo({
    id: 'activity-log',
    termo: 'Activity Log',
    aliases: ['APEX_WORKSPACE_ACTIVITY_LOG', 'page views', 'log de acesso', 'Monitor Activity'],
    ver: 'apex-debug-e-logs',
    pt: { def: 'Registro automático de cada page view — usuário, página, tempo de execução, erros —, consultável pela view «APEX_WORKSPACE_ACTIVITY_LOG» e pelos relatórios de Monitor Activity. É a principal fonte para medir o uso e encontrar páginas lentas; o logging pode ser ajustado por aplicação.' },
    en: { def: 'An automatic record of every page view — user, page, elapsed time, errors — available through the «APEX_WORKSPACE_ACTIVITY_LOG» view and the Monitor Activity reports. It is the main source for measuring usage and finding slow pages; logging can be tuned per application.' }
});

DOC.termo({
    id: 'oracle-forms',
    termo: 'Oracle Forms',
    aliases: ['Forms', 'migração', 'modernização', 'Forms to APEX'],
    ver: 'migrando-do-oracle-forms',
    pt: { def: 'Ferramenta clássica da Oracle para aplicações cliente-servidor sobre o banco, ainda muito presente em empresas. O APEX é o caminho natural de modernização porque reaproveita o SQL e o PL/SQL. O APEX 3.2 chegou a trazer um assistente de conversão de Forms, depois descontinuado; hoje não há conversão automática oficial, e o recomendado é redesenhar a interface para a web, levando a lógica para pacotes no banco.' },
    en: { def: 'Oracle\'s classic tool for client-server applications on the database, still common in enterprises. APEX is the natural modernization path because it reuses SQL and PL/SQL. APEX 3.2 shipped a Forms conversion wizard that was later discontinued; today there is no official automatic conversion, and the recommended approach is to redesign the UI for the web while moving logic into database packages.' }
});
