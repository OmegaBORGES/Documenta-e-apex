DOC.topico({
    id: 'autenticacao',
    cat: 'seguranca',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Establishing User Identity Through Authentication', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/establishing-user-identity-through-authentication.html' },
        { t: 'App Builder Guide — Custom Authentication', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/custom-authentication.html' },
        { t: 'APEX_AUTHENTICATION (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_AUTHENTICATION.html' }
    ],
    relacionados: ['social-sign-in-e-saml', 'autorizacao', 'sessao-e-session-state', 'apex-session-e-contexto', 'gerenciando-workspaces'],
    pt: {
        titulo: 'Autenticação: esquemas, login customizado, pós-login e logout',
        resumo: 'Como o APEX identifica o usuário: tipos de authentication scheme, função de autenticação customizada, hash de senhas, pós-login e logout.',
        tags: ['autenticação', 'login', 'authentication scheme', 'custom authentication', 'APEX_AUTHENTICATION', 'post-authentication', 'senha', 'hash', 'DBMS_CRYPTO', 'logout', 'APP_USER'],
        conteudo: `
            A **autenticação** responde à pergunta "quem é você?". Quando o login dá certo, o APEX grava o nome do usuário na
            sessão e o expõe em «APP_USER» («:APP_USER» em SQL/PL/SQL, «V('APP_USER')» em pacotes ou
            «sys_context('APEX$SESSION','APP_USER')»). O que esse usuário *pode fazer* é assunto da [autorização](#/topico/autorizacao).

            ## Esquemas de autenticação
            Os esquemas ficam em *Shared Components → Authentication Schemes*. Uma aplicação pode ter vários, mas apenas um é o
            **atual** (botão *Make Current Scheme*). Tipos nativos:

            | Tipo | Quando usar |
            |---|---|
            | Oracle APEX Accounts | Usuários do próprio workspace; bom para protótipos e apps internas pequenas. |
            | Database Accounts | Usuário e senha de contas do banco de dados. |
            | LDAP Directory | Active Directory ou outro diretório LDAP corporativo. |
            | Social Sign-In | Google, Microsoft Entra ID, Oracle IAM e qualquer provedor OpenID Connect/OAuth2. |
            | SAML Sign-In | SSO corporativo via SAML 2.0 (configurado na instância). |
            | HTTP Header Variable | Um proxy ou SSO à frente do ORDS já autenticou e envia o usuário num cabeçalho HTTP. |
            | Custom | Sua própria função PL/SQL valida usuário e senha. |
            | Open Door Credentials | Aceita qualquer nome, sem senha — apenas para testes. |
            | No Authentication (using DAD) | Usa o usuário da conexão; raro hoje em dia. |
            | Oracle Application Server Single Sign-On | Legado (Oracle SSO). |
            | Builder Extension Sign-in | Apps que estendem o App Builder (Builder Extensions). |

            Também é possível criar esquemas como **plug-ins** de autenticação (recurso existente desde o APEX 4.1).

            :::atencao Oracle APEX Accounts em produção
            A documentação oficial **não recomenda** Oracle APEX Accounts em produção, pois as credenciais da aplicação podem
            coincidir com as do workspace. Prefira um provedor de identidade (OpenID Connect ou SAML), LDAP ou um esquema
            customizado bem implementado.
            :::

            ## O que acontece no login
            A página de login chama «APEX_AUTHENTICATION.LOGIN», que executa nesta ordem:
            1. O **Pre-Authentication Procedure**, se configurado.
            2. A **função de autenticação**, recebendo «p_username» e «p_password» e retornando «TRUE» ou «FALSE».
            3. Em caso de sucesso: o **Post-Authentication Procedure**, a gravação do usuário na sessão e o redirecionamento para
               a página pedida originalmente (*deep link*) ou para a home.
            4. Em caso de falha: volta para a página de login com a mensagem de erro. Toda tentativa fica registrada.

            ## Autenticação customizada
            No esquema do tipo *Custom*, o atributo **Authentication Function Name** aponta para uma função com exatamente esta
            assinatura:

            ~~~plsql
            function autenticar (
                p_username in varchar2,
                p_password in varchar2
            ) return boolean;
            ~~~

            ### Nunca guarde senhas em texto puro
            Guarde apenas um **hash com salt** (valor aleatório por usuário) e repita o cálculo milhares de vezes (*key stretching*)
            para encarecer ataques de força bruta. O schema precisa de «grant execute on sys.dbms_crypto». A função SQL
            «STANDARD_HASH» também gera hashes, mas sozinha (sem salt e sem iterações) não é suficiente para senhas.

            ~~~plsql
            create table usuarios (
                username     varchar2(100) primary key,
                nome         varchar2(200),
                salt         raw(32)     not null,
                senha_hash   raw(64)     not null,
                ativo        varchar2(1) default 'S' not null,
                ultimo_login timestamp
            );

            create or replace package seg_auth as
                function gerar_hash (p_senha in varchar2, p_salt in raw) return raw;
                function autenticar (p_username in varchar2, p_password in varchar2) return boolean;
                procedure pos_login;
            end seg_auth;
            /
            create or replace package body seg_auth as

                function gerar_hash (p_senha in varchar2, p_salt in raw) return raw is
                    l_hash raw(64);
                begin
                    l_hash := dbms_crypto.mac(
                                  src => utl_i18n.string_to_raw(p_senha, 'AL32UTF8'),
                                  typ => dbms_crypto.hmac_sh512,
                                  key => p_salt);
                    for i in 1 .. 10000 loop   -- key stretching
                        l_hash := dbms_crypto.mac(src => l_hash, typ => dbms_crypto.hmac_sh512, key => p_salt);
                    end loop;
                    return l_hash;
                end gerar_hash;

                function autenticar (p_username in varchar2, p_password in varchar2) return boolean is
                    l_salt raw(32);
                    l_hash raw(64);
                begin
                    select salt, senha_hash
                      into l_salt, l_hash
                      from usuarios
                     where username = upper(p_username)
                       and ativo    = 'S';
                    return gerar_hash(p_password, l_salt) = l_hash;
                exception
                    when no_data_found then
                        return false;   -- não revele se o usuário existe
                end autenticar;

                procedure pos_login is
                begin
                    update usuarios
                       set ultimo_login = systimestamp
                     where username = v('APP_USER');
                    for r in (select nome from usuarios where username = v('APP_USER')) loop
                        apex_util.set_session_state('G_NOME_USUARIO', r.nome);
                    end loop;
                end pos_login;

            end seg_auth;
            /
            ~~~

            Ao cadastrar um usuário, gere o salt com «dbms_crypto.randombytes(32)» e grave «seg_auth.gerar_hash(senha, salt)».
            No esquema, use **Authentication Function Name** = «seg_auth.autenticar» e **Post-Authentication Procedure Name** =
            «seg_auth.pos_login».

            ## Pós-login: o lugar certo para preparar a sessão
            O **Post-Authentication Procedure** roda uma vez por login. Use-o para carregar itens de aplicação (nome, filial,
            perfil), registrar auditoria, habilitar grupos dinâmicos com «APEX_AUTHORIZATION.ENABLE_DYNAMIC_GROUPS» e aplicar
            regras extras (conta bloqueada, horário permitido).

            ## Sessão, logout e "lembrar de mim"
            - **Session Not Valid**: para onde ir quando não há sessão válida — normalmente a página de login.
            - **Post-Logout URL**: destino depois de sair. O menu do Universal Theme usa «&LOGOUT_URL.»; em PL/SQL existe
              «APEX_AUTHENTICATION.LOGOUT(p_session_id, p_app_id)».
            - **Maximum Session Length** e **Maximum Session Idle Time** ficam em *Security Attributes → Session Management*.
            - **Persistent Authentication** ("lembrar de mim", desde o 22.1) precisa ser habilitada na instância; a página de login
              passa «p_set_persistent_auth => true» para «APEX_AUTHENTICATION.LOGIN».
            - **Switch in Session** permite trocar de esquema dentro da mesma sessão (útil com vários provedores sociais).

            :::dica APIs úteis
            «APEX_AUTHENTICATION.IS_AUTHENTICATED» e «APEX_AUTHENTICATION.IS_PUBLIC_USER» dizem se há usuário logado;
            «APEX_AUTHENTICATION.POST_LOGIN» conclui o login quando a credencial já foi verificada fora do APEX (por exemplo,
            um código enviado por e-mail). Para scripts e jobs, crie sessões com [APEX_SESSION](#/topico/apex-session-e-contexto).
            :::
        `
    },
    en: {
        titulo: 'Authentication: schemes, custom login, post-login and logout',
        resumo: 'How APEX identifies users: authentication scheme types, custom authentication functions, password hashing, post-login and logout.',
        tags: ['authentication', 'login', 'authentication scheme', 'custom authentication', 'APEX_AUTHENTICATION', 'post-authentication', 'password', 'hash', 'DBMS_CRYPTO', 'logout', 'APP_USER'],
        conteudo: `
            **Authentication** answers the question "who are you?". When login succeeds, APEX stores the user name in the session
            and exposes it as «APP_USER» («:APP_USER» in SQL/PL/SQL, «V('APP_USER')» in packages or
            «sys_context('APEX$SESSION','APP_USER')»). What that user *may do* is handled by [authorization](#/topico/autorizacao).

            ## Authentication schemes
            Schemes live under *Shared Components → Authentication Schemes*. An application can have several, but only one is
            **current** (the *Make Current Scheme* button). Built-in types:

            | Type | When to use |
            |---|---|
            | Oracle APEX Accounts | Users of the workspace itself; fine for prototypes and small internal apps. |
            | Database Accounts | Database account user name and password. |
            | LDAP Directory | Active Directory or another corporate LDAP directory. |
            | Social Sign-In | Google, Microsoft Entra ID, Oracle IAM and any OpenID Connect/OAuth2 provider. |
            | SAML Sign-In | Corporate SSO via SAML 2.0 (configured at instance level). |
            | HTTP Header Variable | A proxy or SSO in front of ORDS already authenticated the user and sends it in an HTTP header. |
            | Custom | Your own PL/SQL function validates user name and password. |
            | Open Door Credentials | Accepts any name, no password — testing only. |
            | No Authentication (using DAD) | Uses the connection user; rare nowadays. |
            | Oracle Application Server Single Sign-On | Legacy (Oracle SSO). |
            | Builder Extension Sign-in | Apps that extend App Builder (Builder Extensions). |

            You can also build schemes as authentication **plug-ins** (available since APEX 4.1).

            :::atencao Oracle APEX Accounts in production
            The official documentation **does not recommend** Oracle APEX Accounts in production, because application credentials
            may be the same as workspace credentials. Prefer an identity provider (OpenID Connect or SAML), LDAP or a well-built
            custom scheme.
            :::

            ## What happens at login
            The login page calls «APEX_AUTHENTICATION.LOGIN», which runs, in order:
            1. The **Pre-Authentication Procedure**, if configured.
            2. The **authentication function**, receiving «p_username» and «p_password» and returning «TRUE» or «FALSE».
            3. On success: the **Post-Authentication Procedure**, saving the user in the session and redirecting to the originally
               requested page (*deep link*) or the home page.
            4. On failure: back to the login page with an error message. Every attempt is logged.

            ## Custom authentication
            In a *Custom* scheme, the **Authentication Function Name** attribute points to a function with exactly this signature:

            ~~~plsql
            function authenticate (
                p_username in varchar2,
                p_password in varchar2
            ) return boolean;
            ~~~

            ### Never store plain-text passwords
            Store only a **salted hash** (a random value per user) and repeat the computation thousands of times (*key
            stretching*) to make brute force expensive. The schema needs «grant execute on sys.dbms_crypto». The SQL function
            «STANDARD_HASH» also produces hashes, but on its own (no salt, no iterations) it is not enough for passwords.

            ~~~plsql
            create table app_users (
                username      varchar2(100) primary key,
                full_name     varchar2(200),
                salt          raw(32)     not null,
                password_hash raw(64)     not null,
                active        varchar2(1) default 'Y' not null,
                last_login    timestamp
            );

            create or replace package sec_auth as
                function hash_password (p_password in varchar2, p_salt in raw) return raw;
                function authenticate (p_username in varchar2, p_password in varchar2) return boolean;
                procedure post_login;
            end sec_auth;
            /
            create or replace package body sec_auth as

                function hash_password (p_password in varchar2, p_salt in raw) return raw is
                    l_hash raw(64);
                begin
                    l_hash := dbms_crypto.mac(
                                  src => utl_i18n.string_to_raw(p_password, 'AL32UTF8'),
                                  typ => dbms_crypto.hmac_sh512,
                                  key => p_salt);
                    for i in 1 .. 10000 loop   -- key stretching
                        l_hash := dbms_crypto.mac(src => l_hash, typ => dbms_crypto.hmac_sh512, key => p_salt);
                    end loop;
                    return l_hash;
                end hash_password;

                function authenticate (p_username in varchar2, p_password in varchar2) return boolean is
                    l_salt raw(32);
                    l_hash raw(64);
                begin
                    select salt, password_hash
                      into l_salt, l_hash
                      from app_users
                     where username = upper(p_username)
                       and active   = 'Y';
                    return hash_password(p_password, l_salt) = l_hash;
                exception
                    when no_data_found then
                        return false;   -- do not reveal whether the user exists
                end authenticate;

                procedure post_login is
                begin
                    update app_users
                       set last_login = systimestamp
                     where username = v('APP_USER');
                    for r in (select full_name from app_users where username = v('APP_USER')) loop
                        apex_util.set_session_state('G_USER_NAME', r.full_name);
                    end loop;
                end post_login;

            end sec_auth;
            /
            ~~~

            When creating a user, generate the salt with «dbms_crypto.randombytes(32)» and store
            «sec_auth.hash_password(password, salt)». In the scheme, set **Authentication Function Name** =
            «sec_auth.authenticate» and **Post-Authentication Procedure Name** = «sec_auth.post_login».

            ## Post-login: the right place to prepare the session
            The **Post-Authentication Procedure** runs once per login. Use it to load application items (name, branch, profile),
            write audit records, enable dynamic groups with «APEX_AUTHORIZATION.ENABLE_DYNAMIC_GROUPS» and enforce extra rules
            (locked account, allowed hours).

            ## Session, logout and "remember me"
            - **Session Not Valid**: where to go when there is no valid session — usually the login page.
            - **Post-Logout URL**: destination after signing out. The Universal Theme menu uses «&LOGOUT_URL.»; in PL/SQL there is
              «APEX_AUTHENTICATION.LOGOUT(p_session_id, p_app_id)».
            - **Maximum Session Length** and **Maximum Session Idle Time** live in *Security Attributes → Session Management*.
            - **Persistent Authentication** ("remember me", since 22.1) must be enabled at instance level; the login page passes
              «p_set_persistent_auth => true» to «APEX_AUTHENTICATION.LOGIN».
            - **Switch in Session** lets the user switch schemes within the same session (handy with several social providers).

            :::dica Useful APIs
            «APEX_AUTHENTICATION.IS_AUTHENTICATED» and «APEX_AUTHENTICATION.IS_PUBLIC_USER» tell whether a user is signed in;
            «APEX_AUTHENTICATION.POST_LOGIN» completes the login when credentials were verified outside APEX (for example, a code
            sent by e-mail). For scripts and jobs, create sessions with [APEX_SESSION](#/topico/apex-session-e-contexto).
            :::
        `
    }
});

DOC.topico({
    id: 'social-sign-in-e-saml',
    cat: 'seguranca',
    nivel: 'intermediario',
    desde: '18.1',
    links: [
        { t: 'App Builder Guide — Social Sign-In', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/social-sign-in.html' },
        { t: 'App Builder Guide — SAML Sign-In', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/saml-sign-in.html' },
        { t: 'Administration Guide — Editing SAML Sign-In', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeadm/editing-saml-sign-in.html' }
    ],
    relacionados: ['autenticacao', 'web-credentials', 'autorizacao', 'administracao-instancia', 'apex-web-service'],
    pt: {
        titulo: 'Social Sign-In (OpenID Connect/OAuth2) e SAML',
        resumo: 'Delegue o login a Google, Microsoft Entra ID, Oracle IAM ou qualquer provedor OpenID Connect, ou a um provedor corporativo via SAML.',
        tags: ['Social Sign-In', 'OpenID Connect', 'OIDC', 'OAuth2', 'SAML', 'SSO', 'Microsoft Entra ID', 'Azure AD', 'Google', 'discovery URL', 'apex_authentication.callback', 'APEX_JSON'],
        conteudo: `
            Em vez de guardar senhas, a aplicação pode **delegar o login** a um provedor de identidade (IdP). O APEX tem dois
            caminhos nativos: **Social Sign-In** (OpenID Connect e OAuth2, desde o 18.1) e **SAML Sign-In** (desde o 21.2).

            | | Social Sign-In | SAML Sign-In |
            |---|---|---|
            | Protocolo | OpenID Connect / OAuth2 | SAML 2.0 |
            | Onde configurar | Na aplicação (com uma Web Credential) | Na instância (Administration Services) e na aplicação |
            | Provedores típicos | Google, Microsoft Entra ID, Oracle IAM, Okta, Keycloak | ADFS, Entra ID, Okta, Oracle Access Manager |
            | URL de retorno | «.../apex_authentication.callback» | «.../apex_authentication.saml_callback» |

            ## Social Sign-In passo a passo (Microsoft Entra ID)
            1. **Registre a aplicação no IdP** (no Entra: *App registrations*). Como *Redirect URI*, informe a URL de callback do
               APEX, por exemplo «https://apex.empresa.com/ords/apex_authentication.callback» (existe também «callback2»).
               Gere um *client secret*.
            2. **Crie uma Web Credential** (*Shared Components → Credentials*) com o *Client ID* e o *Client Secret*.
            3. **Crie o esquema**: *Authentication Schemes → Create → Based on a pre-configured scheme* → **Social Sign-In**:
               - **Credential Store**: a credencial do passo 2.
               - **Authentication Provider**: *OpenID Connect Provider*.
               - **Discovery URL**: «https://login.microsoftonline.com/ID_DO_TENANT/v2.0/.well-known/openid-configuration».
               - **Scope**: «profile,email» — para OpenID Connect e Google o APEX acrescenta «openid» sozinho.
               - **Username**: «preferred_username» ou «email»; aceita texto com substituições, como «#email#».
               - **Additional User Attributes** e **Map Additional User Attributes To**: ex. «name,email» → «G_NOME,G_EMAIL».
            4. Torne o esquema **atual** e teste em uma janela anônima.

            | Provedor | Configuração |
            |---|---|
            | Google | Authentication Provider = *Google* (sem Discovery URL); Username = «email». |
            | Microsoft Entra ID | *OpenID Connect Provider* com a Discovery URL v2.0 do tenant. |
            | Oracle Cloud IAM / IDCS | *OpenID Connect Provider* com a Discovery URL do domínio de identidade. |
            | Qualquer OIDC | URL do emissor + «/.well-known/openid-configuration». |
            | OAuth2 sem OIDC | *Generic OAuth2 Provider*: informe as URLs de authorization, token e userinfo. |

            ### Lendo atributos no pós-login
            Além do mapeamento declarativo, o **Post-Authentication Procedure** pode ler os atributos do usuário com as funções
            «APEX_JSON.GET_%»:

            ~~~plsql
            procedure pos_login_social is
                l_grupos apex_t_varchar2 := apex_t_varchar2();
            begin
                apex_util.set_session_state('G_EMAIL', apex_json.get_varchar2('email'));
                apex_util.set_session_state('G_NOME',  apex_json.get_varchar2('name'));

                -- se o provedor enviar uma lista "groups", vire grupos dinâmicos da sessão
                for i in 1 .. nvl(apex_json.get_count('groups'), 0) loop
                    apex_string.push(l_grupos, apex_json.get_varchar2('groups[%d]', i));
                end loop;
                apex_authorization.enable_dynamic_groups(p_group_names => l_grupos);
            end pos_login_social;
            ~~~

            Depois, esquemas de autorização do tipo **Is In Group** checam esses grupos.

            :::atencao Qualquer conta do provedor consegue entrar
            Com Google (ou um app Entra multi-tenant), qualquer pessoa com conta se autentica. A própria documentação alerta:
            combine o login com um **esquema de autorização** (lista de usuários, domínio do e-mail, grupos). Mantenha
            **Verify Attributes** ligado: o APEX ignora um «email» quando o IdP envia «email_verified» como falso.
            :::

            ## Rede e certificados
            O navegador conversa com o IdP, mas a troca do *code* pelo token é feita **pelo banco de dados**. O schema do APEX
            precisa de ACL de rede para o host do provedor e o certificado TLS precisa ser confiável (wallet da instância; no
            Oracle AI Database 26ai a configuração de wallet pode ficar vazia). Erros como ORA-24247 ou ORA-29024 no debug indicam
            esse problema — veja [APEX_WEB_SERVICE](#/topico/apex-web-service).

            ## SAML Sign-In
            1. O **administrador da instância** configura o SAML em *Administration Services → Manage Instance → Security →
               Authentication Control* (editando o esquema SAML): marca **Enable SAML for Applications**, informa certificado e
               chave privada do lado APEX e, do IdP, o **Issuer**, o **Signing Certificate**, a **Sign-In URL** e a **Sign-Out URL**.
               Por padrão o usuário vem do *NameID*, mas é possível escolher outro atributo (**Username Attribute**).
            2. A URL de ACS padrão é «https://servidor/ords/apex_authentication.saml_callback». Os metadados do lado APEX podem
               ser obtidos em «.../apex_authentication.saml_metadata» (opcionalmente com «?p_app_id=»).
            3. Na aplicação, crie um esquema **SAML Sign-In** (*Use SAML Attributes of* = *Instance*) e torne-o atual.

            O SAML exige Oracle Database 19c com RU 19.9 ou superior, ou 26ai. Desde o 24.1 a mesma instância atende **vários
            domínios**: liste as URLs de callback e o APEX envia o «AssertionConsumerServiceIndex» correspondente.

            :::novo Asserções assinadas (26.1)
            No 26.1 o APEX pode gerar **Client e User Assertions assinadas** (JWT) para pedir tokens OAuth. Para isso o cliente
            OAuth precisa ser cadastrado no IdP como *Trusted* (não *Confidential*), e as Web Credentials ganharam tipos como
            *Signed User Assertion* e *User Assertion Signing Certificate*.
            :::
        `
    },
    en: {
        titulo: 'Social Sign-In (OpenID Connect/OAuth2) and SAML',
        resumo: 'Delegate login to Google, Microsoft Entra ID, Oracle IAM or any OpenID Connect provider, or to a corporate identity provider via SAML.',
        tags: ['Social Sign-In', 'OpenID Connect', 'OIDC', 'OAuth2', 'SAML', 'SSO', 'Microsoft Entra ID', 'Azure AD', 'Google', 'discovery URL', 'apex_authentication.callback', 'APEX_JSON'],
        conteudo: `
            Instead of storing passwords, an application can **delegate login** to an identity provider (IdP). APEX has two
            built-in paths: **Social Sign-In** (OpenID Connect and OAuth2, since 18.1) and **SAML Sign-In** (since 21.2).

            | | Social Sign-In | SAML Sign-In |
            |---|---|---|
            | Protocol | OpenID Connect / OAuth2 | SAML 2.0 |
            | Where to configure | In the application (with a Web Credential) | At instance level (Administration Services) and in the app |
            | Typical providers | Google, Microsoft Entra ID, Oracle IAM, Okta, Keycloak | ADFS, Entra ID, Okta, Oracle Access Manager |
            | Return URL | «.../apex_authentication.callback» | «.../apex_authentication.saml_callback» |

            ## Social Sign-In step by step (Microsoft Entra ID)
            1. **Register the application with the IdP** (in Entra: *App registrations*). As *Redirect URI*, enter the APEX
               callback URL, e.g. «https://apex.company.com/ords/apex_authentication.callback» («callback2» also exists).
               Generate a *client secret*.
            2. **Create a Web Credential** (*Shared Components → Credentials*) holding the *Client ID* and *Client Secret*.
            3. **Create the scheme**: *Authentication Schemes → Create → Based on a pre-configured scheme* → **Social Sign-In**:
               - **Credential Store**: the credential from step 2.
               - **Authentication Provider**: *OpenID Connect Provider*.
               - **Discovery URL**: «https://login.microsoftonline.com/TENANT_ID/v2.0/.well-known/openid-configuration».
               - **Scope**: «profile,email» — for OpenID Connect and Google, APEX adds «openid» automatically.
               - **Username**: «preferred_username» or «email»; free text with substitutions such as «#email#» also works.
               - **Additional User Attributes** and **Map Additional User Attributes To**: e.g. «name,email» → «G_NAME,G_EMAIL».
            4. Make the scheme **current** and test it in a private browser window.

            | Provider | Configuration |
            |---|---|
            | Google | Authentication Provider = *Google* (no Discovery URL); Username = «email». |
            | Microsoft Entra ID | *OpenID Connect Provider* with the tenant v2.0 Discovery URL. |
            | Oracle Cloud IAM / IDCS | *OpenID Connect Provider* with the identity domain Discovery URL. |
            | Any OIDC provider | Issuer URL + «/.well-known/openid-configuration». |
            | OAuth2 without OIDC | *Generic OAuth2 Provider*: enter the authorization, token and userinfo URLs. |

            ### Reading attributes after login
            Besides declarative mapping, the **Post-Authentication Procedure** can read user attributes with the «APEX_JSON.GET_%»
            functions:

            ~~~plsql
            procedure post_login_social is
                l_groups apex_t_varchar2 := apex_t_varchar2();
            begin
                apex_util.set_session_state('G_EMAIL', apex_json.get_varchar2('email'));
                apex_util.set_session_state('G_NAME',  apex_json.get_varchar2('name'));

                -- if the provider sends a "groups" list, turn it into dynamic session groups
                for i in 1 .. nvl(apex_json.get_count('groups'), 0) loop
                    apex_string.push(l_groups, apex_json.get_varchar2('groups[%d]', i));
                end loop;
                apex_authorization.enable_dynamic_groups(p_group_names => l_groups);
            end post_login_social;
            ~~~

            Authorization schemes of type **Is In Group** can then check those groups.

            :::atencao Any account at the provider can sign in
            With Google (or a multi-tenant Entra app), anyone with an account can authenticate. The documentation itself warns
            about it: combine login with an **authorization scheme** (allowed users, e-mail domain, groups). Keep **Verify
            Attributes** on: APEX ignores an «email» attribute when the IdP sends «email_verified» as false.
            :::

            ## Network and certificates
            The browser talks to the IdP, but exchanging the *code* for a token is done **by the database**. The APEX schema needs
            a network ACL for the provider host and the TLS certificate must be trusted (instance wallet; on Oracle AI Database
            26ai the wallet setting can stay empty). Errors such as ORA-24247 or ORA-29024 in debug output point to this — see
            [APEX_WEB_SERVICE](#/topico/apex-web-service).

            ## SAML Sign-In
            1. The **instance administrator** configures SAML under *Administration Services → Manage Instance → Security →
               Authentication Control* (editing the SAML scheme): enables **Enable SAML for Applications**, enters the APEX-side
               certificate and private key and, from the IdP, the **Issuer**, **Signing Certificate**, **Sign-In URL** and
               **Sign-Out URL**. By default the user comes from *NameID*, but another attribute can be chosen (**Username Attribute**).
            2. The default ACS URL is «https://server/ords/apex_authentication.saml_callback». APEX-side metadata is available at
               «.../apex_authentication.saml_metadata» (optionally with «?p_app_id=»).
            3. In the application, create a **SAML Sign-In** scheme (*Use SAML Attributes of* = *Instance*) and make it current.

            SAML requires Oracle Database 19c with RU 19.9 or later, or 26ai. Since 24.1 one instance can serve **multiple
            domains**: list the callback URLs and APEX sends the matching «AssertionConsumerServiceIndex».

            :::novo Signed assertions (26.1)
            In 26.1 APEX can generate **signed Client and User Assertions** (JWT) to request OAuth tokens. The OAuth client must be
            registered in the IdP as *Trusted* (not *Confidential*), and Web Credentials gained types such as *Signed User
            Assertion* and *User Assertion Signing Certificate*.
            :::
        `
    }
});

DOC.topico({
    id: 'autorizacao',
    cat: 'seguranca',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — About Authorization Scheme Types', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-authorization-scheme-types.html' },
        { t: 'App Builder Guide — Controlling Access to Applications, Pages and Components', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/controlling-access-to-applications-pages-and-page-components.html' },
        { t: 'APEX_ACL (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_ACL.html' }
    ],
    relacionados: ['autenticacao', 'social-sign-in-e-saml', 'session-state-protection', 'ciclo-de-vida-da-pagina', 'navegacao'],
    pt: {
        titulo: 'Autorização e Access Control (ACL)',
        resumo: 'Authorization schemes, evaluation point, APEX_AUTHORIZATION.IS_AUTHORIZED e o recurso Access Control com papéis e a API APEX_ACL.',
        tags: ['autorização', 'authorization scheme', 'permissão', 'papéis', 'roles', 'APEX_AUTHORIZATION', 'IS_AUTHORIZED', 'APEX_ACL', 'Access Control', 'evaluation point', 'grupos'],
        conteudo: `
            Se a autenticação diz *quem* é o usuário, a **autorização** decide *o que* ele pode ver e fazer. No APEX ela é feita com
            **authorization schemes** (*Shared Components → Authorization Schemes*): regras que resultam em verdadeiro ou falso e
            que você associa, pelo atributo **Authorization Scheme**, à aplicação, a páginas, regiões, itens, botões, colunas,
            processos, entradas de menu/lista, Dynamic Actions e outros componentes.

            ## Tipos de esquema
            | Tipo | Passa quando... |
            |---|---|
            | Exists SQL Query | A consulta retorna pelo menos uma linha. |
            | NOT Exists SQL Query | A consulta não retorna nenhuma linha. |
            | PL/SQL Function Returning Boolean | O bloco retorna «true». |
            | Item in Expression 1 is NULL / is NOT NULL | O item está (ou não) vazio. |
            | Value of Item in Expression 1 Equals / Does NOT Equal Expression 2 | O valor do item é (ou não) igual ao informado. |
            | Value of Preference in Expression 1 Equals / Does NOT Equal Expression 2 | Idem, para uma preferência do usuário. |
            | Is In Group / Is Not In Group | O grupo está (ou não) habilitado na sessão. |

            Ao escolher o esquema em um componente, a lista também oferece a forma negada (**{Not ...}**) e a opção
            **Must Not Be Public User** (basta estar logado).

            ## Exemplo com uma tabela de papéis
            ~~~sql
            create table usuario_papeis (
                username varchar2(100) not null,
                papel    varchar2(30)  not null,
                constraint usuario_papeis_pk primary key (username, papel)
            );

            -- Esquema "Gerente" (tipo Exists SQL Query)
            select 1
              from usuario_papeis
             where username = :APP_USER
               and papel    = 'GERENTE'
            ~~~

            ~~~plsql
            -- Esquema "Pode aprovar" (tipo PL/SQL Function Returning Boolean)
            return regras_acesso.pode_aprovar(
                       p_username => :APP_USER,
                       p_valor    => :P20_VALOR);
            ~~~

            ## Evaluation Point: quando o resultado é recalculado
            | Opção | Comportamento |
            |---|---|
            | Once per session | Avalia uma vez e memoriza para toda a sessão (padrão, o mais eficiente). |
            | Once per page view | Avalia uma vez por requisição; componentes da mesma página reaproveitam o resultado. |
            | Once per component | Avalia uma vez para cada componente que referencia o esquema e memoriza na sessão. |
            | Always (No Caching) | Avalia toda vez que é verificado. |

            O segundo exemplo depende de «:P20_VALOR», que muda a cada registro — portanto deve usar **Always (No Caching)**.
            Com «Once per session», o primeiro resultado valeria até o logout.

            ## Usando em PL/SQL
            ~~~plsql
            begin
                if not apex_authorization.is_authorized(p_authorization_name => 'Gerente') then
                    raise_application_error(-20001, 'Acesso negado.');
                end if;
            end;
            ~~~

            Se os papéis do usuário mudarem durante a sessão, chame «APEX_AUTHORIZATION.RESET_CACHE» para forçar uma nova avaliação.

            :::atencao Esconder não é proteger
            Não dependa apenas de esconder um botão ou uma entrada de menu. Aplique o mesmo esquema à **página**, ao **processo**
            que executa a ação e aos **Ajax Callbacks** — defesa em profundidade. Para lógica puramente visual, use *Server-side
            Condition*; para segurança, use autorização.
            :::

            ## Access Control (ACL) pronto
            O assistente **Access Control** (no Create App Wizard ou em *Create Page → Access Control*) gera tudo de uma vez:
            - os papéis **Administrator**, **Contributor** e **Reader**;
            - os esquemas **Administration Rights**, **Contribution Rights** e **Reader Rights**;
            - a build option **Feature: Access Control** e o application setting «ACCESS_CONTROL_SCOPE» (se qualquer usuário
              autenticado entra ou apenas quem está na lista);
            - uma região na página de administração para gerenciar usuários.

            Novos papéis e atribuições ficam em *Shared Components → Application Access Control*; para consultas use as views
            «APEX_APPL_ACL_ROLES», «APEX_APPL_ACL_USERS» e «APEX_APPL_ACL_USER_ROLES». Por código, use «APEX_ACL»:

            ~~~plsql
            begin
                apex_acl.add_user_role(
                    p_application_id => 100,
                    p_user_name      => 'MARIA',
                    p_role_static_id => 'CONTRIBUTOR');

                if apex_acl.has_user_role(
                       p_application_id => 100,
                       p_user_name      => 'MARIA',
                       p_role_static_id => 'ADMINISTRATOR') then
                    apex_debug.info('MARIA é administradora');
                end if;
            end;
            ~~~

            :::dica Grupos
            **Is In Group** considera grupos do workspace (com Oracle APEX Accounts), roles do banco (com Database Accounts) e
            grupos dinâmicos habilitados no pós-login com «APEX_AUTHORIZATION.ENABLE_DYNAMIC_GROUPS» — ótimo para mapear grupos
            do LDAP ou do provedor de identidade.
            :::
        `
    },
    en: {
        titulo: 'Authorization and Access Control (ACL)',
        resumo: 'Authorization schemes, evaluation points, APEX_AUTHORIZATION.IS_AUTHORIZED and the Access Control feature with roles and the APEX_ACL API.',
        tags: ['authorization', 'authorization scheme', 'permission', 'roles', 'APEX_AUTHORIZATION', 'IS_AUTHORIZED', 'APEX_ACL', 'Access Control', 'evaluation point', 'groups'],
        conteudo: `
            Authentication tells *who* the user is; **authorization** decides *what* they may see and do. In APEX it is built with
            **authorization schemes** (*Shared Components → Authorization Schemes*): rules that evaluate to true or false and that
            you attach, through the **Authorization Scheme** attribute, to the application, pages, regions, items, buttons, columns,
            processes, menu/list entries, dynamic actions and other components.

            ## Scheme types
            | Type | Passes when... |
            |---|---|
            | Exists SQL Query | The query returns at least one row. |
            | NOT Exists SQL Query | The query returns no rows. |
            | PL/SQL Function Returning Boolean | The block returns «true». |
            | Item in Expression 1 is NULL / is NOT NULL | The item is (or is not) empty. |
            | Value of Item in Expression 1 Equals / Does NOT Equal Expression 2 | The item value is (or is not) the given value. |
            | Value of Preference in Expression 1 Equals / Does NOT Equal Expression 2 | Same, for a user preference. |
            | Is In Group / Is Not In Group | The group is (or is not) enabled for the session. |

            When you pick a scheme on a component, the list also offers the negated form (**{Not ...}**) and the
            **Must Not Be Public User** option (any signed-in user).

            ## Example with a roles table
            ~~~sql
            create table user_roles (
                username varchar2(100) not null,
                role     varchar2(30)  not null,
                constraint user_roles_pk primary key (username, role)
            );

            -- "Manager" scheme (Exists SQL Query)
            select 1
              from user_roles
             where username = :APP_USER
               and role     = 'MANAGER'
            ~~~

            ~~~plsql
            -- "Can approve" scheme (PL/SQL Function Returning Boolean)
            return access_rules.can_approve(
                       p_username => :APP_USER,
                       p_amount   => :P20_AMOUNT);
            ~~~

            ## Evaluation Point: when the result is recomputed
            | Option | Behavior |
            |---|---|
            | Once per session | Evaluates once and memorizes it for the whole session (default, most efficient). |
            | Once per page view | Evaluates once per request; components on the same page reuse the result. |
            | Once per component | Evaluates once for each component referencing the scheme and memorizes it in the session. |
            | Always (No Caching) | Evaluates every time it is checked. |

            The second example depends on «:P20_AMOUNT», which changes for every record — so it must use **Always (No Caching)**.
            With «Once per session», the first result would stick until logout.

            ## Using it in PL/SQL
            ~~~plsql
            begin
                if not apex_authorization.is_authorized(p_authorization_name => 'Manager') then
                    raise_application_error(-20001, 'Access denied.');
                end if;
            end;
            ~~~

            If the user's roles change during the session, call «APEX_AUTHORIZATION.RESET_CACHE» to force re-evaluation.

            :::atencao Hiding is not protecting
            Do not rely only on hiding a button or a menu entry. Attach the same scheme to the **page**, to the **process** that
            performs the action and to **Ajax Callbacks** — defense in depth. Use *Server-side Conditions* for purely visual logic
            and authorization for security.
            :::

            ## Ready-made Access Control (ACL)
            The **Access Control** wizard (in the Create App Wizard or *Create Page → Access Control*) generates everything at once:
            - the **Administrator**, **Contributor** and **Reader** roles;
            - the **Administration Rights**, **Contribution Rights** and **Reader Rights** schemes;
            - the **Feature: Access Control** build option and the «ACCESS_CONTROL_SCOPE» application setting (whether any
              authenticated user gets in or only listed users);
            - a region on the administration page to manage users.

            Additional roles and assignments live under *Shared Components → Application Access Control*; for queries use the
            «APEX_APPL_ACL_ROLES», «APEX_APPL_ACL_USERS» and «APEX_APPL_ACL_USER_ROLES» views. In code, use «APEX_ACL»:

            ~~~plsql
            begin
                apex_acl.add_user_role(
                    p_application_id => 100,
                    p_user_name      => 'MARIA',
                    p_role_static_id => 'CONTRIBUTOR');

                if apex_acl.has_user_role(
                       p_application_id => 100,
                       p_user_name      => 'MARIA',
                       p_role_static_id => 'ADMINISTRATOR') then
                    apex_debug.info('MARIA is an administrator');
                end if;
            end;
            ~~~

            :::dica Groups
            **Is In Group** checks workspace groups (with Oracle APEX Accounts), database roles (with Database Accounts) and
            dynamic groups enabled after login with «APEX_AUTHORIZATION.ENABLE_DYNAMIC_GROUPS» — great for mapping LDAP or
            identity provider groups.
            :::
        `
    }
});

DOC.topico({
    id: 'session-state-protection',
    cat: 'seguranca',
    nivel: 'intermediario',
    desde: '2.0',
    links: [
        { t: 'App Builder Guide — Preventing URL Tampering', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/preventing-url-tampering.html' },
        { t: 'App Builder Guide — Configuring Security Attributes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/configuring-security-attributes.html' }
    ],
    relacionados: ['sessao-e-session-state', 'urls-do-apex', 'autorizacao', 'escaping-e-xss'],
    pt: {
        titulo: 'Session State Protection (proteção contra adulteração de URL)',
        resumo: 'Como checksums nas URLs e atributos de página e item impedem que alguém altere valores do session state editando a URL.',
        tags: ['session state protection', 'SSP', 'checksum', 'URL tampering', 'cs=', 'Page Access Protection', 'Value Protected', 'APEX_PAGE.GET_URL', 'segurança'],
        conteudo: `
            Imagine a URL «.../pedido?p10_id=42». Sem proteção, qualquer usuário pode trocar «42» por «43» e tentar abrir o pedido
            de outra pessoa. A **Session State Protection (SSP)**, existente desde o APEX 2.0, impede essa *adulteração de URL*:
            o APEX acrescenta um **checksum** («cs=...») às URLs que gera e rejeita valores alterados.

            ## Ativando em duas etapas
            1. *Shared Components → Session State Protection → Set Protection* → **Enable**. Isso liga a verificação para a
               aplicação inteira.
            2. Defina os atributos de **páginas** e **itens** — pelo assistente (aplica um valor para todas as páginas e itens de
               uma vez) ou manualmente no Page Designer.

            Com a SSP desabilitada, os atributos continuam gravados, mas são ignorados e as URLs geradas não levam checksum.

            ## Page Access Protection (atributo da página)
            | Valor | Efeito |
            |---|---|
            | Unrestricted | A página aceita request, clear cache e valores de itens pela URL, sem checksum. |
            | Arguments Must Have Checksum | Se a URL trouxer request, clear cache ou itens, precisa do checksum. **Boa escolha padrão.** |
            | No Arguments Allowed | A página pode ser chamada pela URL, mas sem nenhum argumento. |
            | No URL Access | Não pode ser acessada pela URL; só por um branch do tipo *Branch to Page* (sem redirect). |

            ## Proteção de itens
            | Valor | Quando usar |
            |---|---|
            | Unrestricted | O item pode ser alterado pela URL ou pelo formulário. |
            | Checksum Required: Application Level | Links gerados por qualquer usuário da mesma aplicação valem (bom para links compartilhados). |
            | Checksum Required: User Level | Só links gerados pelo mesmo usuário (ex.: favoritos pessoais). |
            | Checksum Required: Session Level | Só links gerados na sessão atual (mais restritivo). |
            | Restricted - May not be set from browser | Nunca aceito da URL nem do POST; só processos e computações alteram. Vale mesmo com a SSP desligada. |

            O último valor serve para itens que não são de entrada de dados (ex.: *Display Only* sem salvar estado) e para
            **itens de aplicação** que guardam dados sensíveis, como o perfil do usuário carregado no pós-login.

            ## Gere URLs pela API
            Checksums só existem em URLs geradas pelo APEX. Links declarativos (colunas de link, botões, branches do tipo
            *Page in this application*) já saem protegidos. Em código, use «APEX_PAGE.GET_URL»:

            ~~~sql
            select numero,
                   cliente,
                   apex_page.get_url(
                       p_page   => 10,
                       p_items  => 'P10_ID',
                       p_values => id) as link_editar
              from pedidos
             where vendedor = :APP_USER
            ~~~

            Uma URL montada "na mão" («'f?p=' || :APP_ID || ':10:...'») falha com o erro *Session state protection violation*
            quando a página exige checksum.

            ## Outras proteções relacionadas
            - **Itens Hidden** têm o atributo **Value Protected** (padrão *On*): se alguém mudar o valor no navegador antes do
              submit, o APEX recusa a requisição. Desligue apenas se um JavaScript precisar alterar o item.
            - **Store value encrypted in session state** (atributo de segurança do item) criptografa o valor guardado no banco.
            - **Expire Bookmarks** (*Security Attributes*) troca o *salt* dos checksums e invalida favoritos antigos; o atributo
              **Bookmark Hash Function** define o algoritmo de hash usado nos checksums de aplicação e de usuário.

            :::atencao SSP não substitui autorização
            O checksum garante que a URL não foi alterada, mas não que o usuário *pode* ver aquele registro — um link legítimo
            pode ser repassado. Continue filtrando no SQL («where id = :P10_ID and vendedor = :APP_USER») ou com
            [autorização](#/topico/autorizacao). E lembre que valores enviados por formulário ou AJAX não carregam checksum:
            valide-os no servidor.
            :::

            :::dica Revisão rápida
            A primeira tela do assistente de SSP mostra um resumo das configurações de páginas, itens e itens de aplicação — use-a
            em revisões de segurança antes de cada publicação.
            :::
        `
    },
    en: {
        titulo: 'Session State Protection (preventing URL tampering)',
        resumo: 'How URL checksums plus page and item attributes stop people from changing session state values by editing the URL.',
        tags: ['session state protection', 'SSP', 'checksum', 'URL tampering', 'cs=', 'Page Access Protection', 'Value Protected', 'APEX_PAGE.GET_URL', 'security'],
        conteudo: `
            Picture the URL «.../order?p10_id=42». Without protection, any user can change «42» to «43» and try to open someone
            else's order. **Session State Protection (SSP)**, available since APEX 2.0, prevents this *URL tampering*: APEX adds a
            **checksum** («cs=...») to the URLs it generates and rejects altered values.

            ## Enabling it in two steps
            1. *Shared Components → Session State Protection → Set Protection* → **Enable**. This turns checking on for the whole
               application.
            2. Set the **page** and **item** attributes — with the wizard (applies one value to all pages and items at once) or
               manually in Page Designer.

            With SSP disabled, the attributes remain stored but are ignored, and generated URLs carry no checksum.

            ## Page Access Protection (page attribute)
            | Value | Effect |
            |---|---|
            | Unrestricted | The page accepts request, clear cache and item values in the URL, no checksum needed. |
            | Arguments Must Have Checksum | If the URL carries request, clear cache or items, a checksum is required. **A good default.** |
            | No Arguments Allowed | The page can be requested by URL, but without any arguments. |
            | No URL Access | Not reachable by URL; only through a *Branch to Page* branch (no redirect). |

            ## Item protection
            | Value | When to use |
            |---|---|
            | Unrestricted | The item can be set by URL or by the form. |
            | Checksum Required: Application Level | Links generated by any user of the same app are valid (good for shared links). |
            | Checksum Required: User Level | Only links generated by the same user (e.g. personal bookmarks). |
            | Checksum Required: Session Level | Only links generated in the current session (most restrictive). |
            | Restricted - May not be set from browser | Never accepted from URL or POST; only processes and computations can set it. Honored even with SSP disabled. |

            The last value is meant for items that are not data-entry items (e.g. *Display Only* without saving state) and for
            **application items** holding sensitive data, such as the user profile loaded after login.

            ## Generate URLs with the API
            Checksums only exist in URLs generated by APEX. Declarative links (link columns, buttons, *Page in this application*
            branches) are already protected. In code, use «APEX_PAGE.GET_URL»:

            ~~~sql
            select order_no,
                   customer,
                   apex_page.get_url(
                       p_page   => 10,
                       p_items  => 'P10_ID',
                       p_values => id) as edit_link
              from orders
             where sales_rep = :APP_USER
            ~~~

            A hand-built URL («'f?p=' || :APP_ID || ':10:...'») fails with the *Session state protection violation* error when the
            page requires a checksum.

            ## Related protections
            - **Hidden items** have the **Value Protected** attribute (default *On*): if someone changes the value in the browser
              before submitting, APEX rejects the request. Turn it off only when JavaScript must change the item.
            - **Store value encrypted in session state** (item security attribute) encrypts the value stored in the database.
            - **Expire Bookmarks** (*Security Attributes*) resets the checksum *salt* and invalidates old bookmarks; the
              **Bookmark Hash Function** attribute sets the hash algorithm used for application- and user-level checksums.

            :::atencao SSP does not replace authorization
            A checksum guarantees the URL was not altered, not that the user *may* see that record — a legitimate link can be
            forwarded. Keep filtering in SQL («where id = :P10_ID and sales_rep = :APP_USER») or with
            [authorization](#/topico/autorizacao). And remember that values posted by forms or AJAX carry no checksum: validate
            them on the server.
            :::

            :::dica Quick review
            The first screen of the SSP wizard shows a summary of page, item and application item settings — use it in security
            reviews before each release.
            :::
        `
    }
});

DOC.topico({
    id: 'escaping-e-xss',
    cat: 'seguranca',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Understanding Cross-Site Scripting Protection', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/cross-site-scripting-protection.html' },
        { t: 'APEX_ESCAPE (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_ESCAPE.html' },
        { t: 'App Builder Guide — Controlling Output Escaping in Substitution Strings', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/controlling-output-escaping-in-substitution-strings.html' }
    ],
    relacionados: ['substituicoes', 'csp-e-cabecalhos', 'apex-string-e-utilitarios', 'sql-injection', 'template-directives'],
    pt: {
        titulo: 'XSS e escaping no APEX',
        resumo: 'Onde o APEX já escapa valores automaticamente, onde a responsabilidade é sua e como usar APEX_ESCAPE, filtros !HTML/!ATTR/!JS e escapeHTML.',
        tags: ['XSS', 'cross-site scripting', 'escape', 'APEX_ESCAPE', 'htp.p', 'Escape special characters', '!RAW', 'HTML Expression', 'apex.util.escapeHTML', 'Restricted Characters', 'HTML_ALLOWLIST'],
        conteudo: `
            **Cross-site scripting (XSS)** acontece quando um texto digitado por alguém (um nome, um comentário, um parâmetro de
            URL) é enviado de volta ao navegador como HTML ou JavaScript e **executa** na sessão de outro usuário — podendo roubar
            dados ou agir em nome dele. A defesa principal é simples: **escapar** todo valor no momento em que ele é escrito na
            página, de acordo com o contexto.

            ## O que o APEX já faz por você
            - **Relatórios** (Classic Report, Interactive Report, Interactive Grid) escapam os valores das colunas enquanto **Escape special
              characters** estiver ligado — o padrão.
            - **Itens** de formulário (inclusive Hidden) são escapados ao renderizar.
            - Substituições como «&P1_ITEM.» em regiões estáticas, títulos e templates seguem regras de escape automáticas.
            - O **HTML Escaping Mode** da aplicação (*Security Attributes*) pode ser **Basic** (escapa «&», aspas duplas, «<» e
              «>») ou **Extended** (também apóstrofo, «/» e, se o banco não for AL32UTF8, caracteres não ASCII).

            ## Onde a responsabilidade é sua
            | Situação | Risco | Como corrigir |
            |---|---|---|
            | HTML montado no SQL com *Escape special characters* desligado | O texto do usuário vira HTML | Deixe o escape ligado e use **HTML Expression** com «#COLUNA#» |
            | «htp.p(v('P1_X'))» ou HTML montado em PL/SQL | Saída sem escape | «apex_escape.html(...)» |
            | «&P1_X!RAW.» ou «#COL!RAW#» | Desliga o escape | Use «!HTML», «!ATTR» ou «!JS» conforme o contexto |
            | Valor dentro de atributo HTML | Fecha as aspas e injeta atributos | «apex_escape.html_attribute» ou «!ATTR» |
            | Valor dentro de string JavaScript | Fecha a string e injeta código | «apex_escape.js_literal» ou «!JS» |
            | «innerHTML» com dados do usuário no JS | Executa HTML | «textContent» ou «apex.util.escapeHTML» |

            ## Exemplos corretos
            Região **Dynamic Content** (PL/SQL Function Body returning a CLOB, desde o 22.2):

            ~~~plsql
            declare
                l_html clob;
            begin
                for r in (select autor, texto
                            from comentarios
                           where pedido_id = :P10_ID
                           order by criado_em) loop
                    l_html := l_html
                           || '<li><strong>' || apex_escape.html(r.autor) || '</strong>: '
                           || apex_escape.html(r.texto) || '</li>';
                end loop;
                return '<ul class="comentarios">' || l_html || '</ul>';
            end;
            ~~~

            **HTML Expression** de coluna, escapando por contexto:

            ~~~html
            <a href="#" class="js-excluir" data-id="#ID#" title="Excluir #NOME!ATTR#">
              <span class="fa fa-trash" aria-hidden="true"></span> #NOME!HTML#
            </a>
            ~~~

            No JavaScript:

            ~~~js
            var nome = apex.item('P1_NOME').getValue();
            // Errado: el.innerHTML = 'Olá, ' + nome;
            document.getElementById('saudacao').textContent = 'Olá, ' + nome;
            // Se precisar montar HTML:
            $('#lista').append('<li>' + apex.util.escapeHTML(nome) + '</li>');
            ~~~

            ## APEX_ESCAPE: escolha a função pelo contexto
            | Função | Contexto |
            |---|---|
            | «HTML» | Conteúdo entre tags |
            | «HTML_ATTRIBUTE» | Valor de atributo HTML |
            | «JS_LITERAL» | String JavaScript (já devolve entre aspas) |
            | «JSON» | Valor dentro de JSON montado à mão |
            | «CSS_SELECTOR» | Seletores CSS/jQuery dinâmicos |
            | «STRIPHTML» | Remove as tags |
            | «HTML_ALLOWLIST» | Mantém só tags permitidas (ex.: «b», «i», «p») e escapa o resto |
            | «CSV», «LDAP_DN», «REGEXP» | Outros formatos |

            Para textos ricos (comentários com negrito, itálico), «APEX_ESCAPE.HTML_ALLOWLIST» é uma alternativa segura a
            desligar o escape.

            ## Restringindo a entrada
            O atributo **Restricted Characters** do item rejeita caracteres no session state: *Allowlist for a-Z, 0-9 and space*,
            *Blocklist HTML command characters*, entre outros. É uma camada extra — **não** substitui o escape na saída.

            :::atencao Escape na saída, não na entrada
            Guarde o dado original no banco e escape **ao exibir**, conforme o destino (HTML, atributo, JS, JSON). Escapar na
            gravação suja os dados e ainda deixa brechas em outros contextos.
            :::

            :::dica Segunda camada: CSP
            Uma [Content Security Policy](#/topico/csp-e-cabecalhos) bem configurada faz o navegador bloquear scripts injetados
            mesmo que algum escape tenha escapado da revisão.
            :::
        `
    },
    en: {
        titulo: 'XSS and escaping in APEX',
        resumo: 'Where APEX escapes values automatically, where it is your job, and how to use APEX_ESCAPE, the !HTML/!ATTR/!JS filters and escapeHTML.',
        tags: ['XSS', 'cross-site scripting', 'escape', 'APEX_ESCAPE', 'htp.p', 'Escape special characters', '!RAW', 'HTML Expression', 'apex.util.escapeHTML', 'Restricted Characters', 'HTML_ALLOWLIST'],
        conteudo: `
            **Cross-site scripting (XSS)** happens when text typed by someone (a name, a comment, a URL parameter) is sent back to
            the browser as HTML or JavaScript and **runs** in another user's session — stealing data or acting on their behalf. The
            main defense is simple: **escape** every value at the moment it is written to the page, according to the context.

            ## What APEX already does for you
            - **Reports** (Classic Report, Interactive Report, Interactive Grid) escape column values while **Escape special characters** is on —
              the default.
            - Form **items** (including Hidden) are escaped when rendered.
            - Substitutions such as «&P1_ITEM.» in static regions, titles and templates follow automatic escaping rules.
            - The application **HTML Escaping Mode** (*Security Attributes*) can be **Basic** (escapes «&», double quotes, «<» and
              «>») or **Extended** (also apostrophe, «/» and, if the database is not AL32UTF8, non-ASCII characters).

            ## Where it is your job
            | Situation | Risk | Fix |
            |---|---|---|
            | HTML built in SQL with *Escape special characters* off | User text becomes HTML | Keep escaping on and use an **HTML Expression** with «#COLUMN#» |
            | «htp.p(v('P1_X'))» or HTML built in PL/SQL | Unescaped output | «apex_escape.html(...)» |
            | «&P1_X!RAW.» or «#COL!RAW#» | Turns escaping off | Use «!HTML», «!ATTR» or «!JS» as appropriate |
            | Value inside an HTML attribute | Closes the quotes and injects attributes | «apex_escape.html_attribute» or «!ATTR» |
            | Value inside a JavaScript string | Closes the string and injects code | «apex_escape.js_literal» or «!JS» |
            | «innerHTML» with user data in JS | Executes HTML | «textContent» or «apex.util.escapeHTML» |

            ## Correct examples
            **Dynamic Content** region (PL/SQL Function Body returning a CLOB, since 22.2):

            ~~~plsql
            declare
                l_html clob;
            begin
                for r in (select author, body
                            from comments
                           where order_id = :P10_ID
                           order by created_on) loop
                    l_html := l_html
                           || '<li><strong>' || apex_escape.html(r.author) || '</strong>: '
                           || apex_escape.html(r.body) || '</li>';
                end loop;
                return '<ul class="comments">' || l_html || '</ul>';
            end;
            ~~~

            Column **HTML Expression**, escaping per context:

            ~~~html
            <a href="#" class="js-delete" data-id="#ID#" title="Delete #NAME!ATTR#">
              <span class="fa fa-trash" aria-hidden="true"></span> #NAME!HTML#
            </a>
            ~~~

            In JavaScript:

            ~~~js
            var name = apex.item('P1_NAME').getValue();
            // Wrong: el.innerHTML = 'Hello, ' + name;
            document.getElementById('greeting').textContent = 'Hello, ' + name;
            // If you must build HTML:
            $('#list').append('<li>' + apex.util.escapeHTML(name) + '</li>');
            ~~~

            ## APEX_ESCAPE: pick the function by context
            | Function | Context |
            |---|---|
            | «HTML» | Content between tags |
            | «HTML_ATTRIBUTE» | HTML attribute value |
            | «JS_LITERAL» | JavaScript string (returned already quoted) |
            | «JSON» | Value inside hand-built JSON |
            | «CSS_SELECTOR» | Dynamic CSS/jQuery selectors |
            | «STRIPHTML» | Removes tags |
            | «HTML_ALLOWLIST» | Keeps only allowed tags (e.g. «b», «i», «p») and escapes the rest |
            | «CSV», «LDAP_DN», «REGEXP» | Other formats |

            For rich text (comments with bold or italics), «APEX_ESCAPE.HTML_ALLOWLIST» is a safe alternative to switching
            escaping off.

            ## Restricting input
            The item **Restricted Characters** attribute rejects characters in session state: *Allowlist for a-Z, 0-9 and space*,
            *Blocklist HTML command characters* and more. It is an extra layer — it does **not** replace output escaping.

            :::atencao Escape on output, not on input
            Store the original data and escape **when displaying it**, according to the destination (HTML, attribute, JS, JSON).
            Escaping on save corrupts data and still leaves gaps in other contexts.
            :::

            :::dica Second layer: CSP
            A well-configured [Content Security Policy](#/topico/csp-e-cabecalhos) makes the browser block injected scripts even if
            some escaping slipped through review.
            :::
        `
    }
});

DOC.topico({
    id: 'sql-injection',
    cat: 'seguranca',
    nivel: 'avancado',
    links: [
        { t: 'App Builder Guide — Understanding Developer Security Best Practices', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-developer-security-best-practices.html' },
        { t: 'PL/SQL Language Reference — Dynamic SQL (SQL injection)', u: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/lnpls/dynamic-sql.html' },
        { t: 'DBMS_ASSERT (PL/SQL Packages and Types Reference)', u: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/arpls/DBMS_ASSERT.html' }
    ],
    relacionados: ['substituicoes', 'escaping-e-xss', 'apex-exec', 'classic-report', 'checklist-de-qualidade'],
    pt: {
        titulo: 'SQL injection no APEX',
        resumo: 'Onde o risco realmente aparece (&ITEM. no SQL, SQL dinâmico, Function Body returning SQL Query) e como evitá-lo com bind variables e DBMS_ASSERT.',
        tags: ['SQL injection', 'injeção de SQL', 'bind variable', 'SQL dinâmico', 'EXECUTE IMMEDIATE', 'DBMS_ASSERT', 'Function Body returning SQL Query', '&ITEM.', 'segurança'],
        conteudo: `
            **SQL injection** é quando um valor fornecido pelo usuário altera a *estrutura* de um comando SQL. A boa notícia: no
            uso normal do APEX — regiões com SQL estático, «:P1_ITEM», filtros de Interactive Report e Grid — tudo já usa
            **bind variables** e é seguro. O risco aparece quando **você** monta SQL concatenando texto.

            ## Onde o risco aparece
            | Padrão | Por que é perigoso |
            |---|---|
            | «where id = &P1_ID.» numa região | A substituição acontece **antes** do parse: o valor vira código SQL |
            | *PL/SQL Function Body returning SQL Query* concatenando valores | O texto devolvido é executado como está |
            | «execute immediate» / «open ... for» com concatenação | Mesmo problema em PL/SQL |
            | «APEX_EXEC.OPEN_QUERY_CONTEXT» com SQL montado | Idem |
            | ORDER BY, nomes de tabela ou coluna vindos de itens | Identificadores não aceitam bind |

            ## Function Body returning SQL Query
            ~~~plsql
            -- ERRADO: concatena o valor do item
            declare
                l_sql varchar2(32767) := 'select id, cliente, status, total from pedidos where 1 = 1';
            begin
                if :P10_STATUS is not null then
                    l_sql := l_sql || ' and status = ''' || :P10_STATUS || '''';
                end if;
                return l_sql;
            end;
            ~~~

            Basta digitar «X' or '1'='1» para listar tudo. A forma correta deixa a **bind variable** no texto — o APEX faz o bind
            na execução:

            ~~~plsql
            -- CERTO: o texto contém :P10_STATUS, não o valor
            declare
                l_sql varchar2(32767) := 'select id, cliente, status, total from pedidos where 1 = 1';
            begin
                if :P10_STATUS is not null then
                    l_sql := l_sql || ' and status = :P10_STATUS';
                end if;
                if :P10_CLIENTE is not null then
                    l_sql := l_sql || q'[ and upper(cliente) like '%' || upper(:P10_CLIENTE) || '%']';
                end if;
                return l_sql;
            end;
            ~~~

            Muitas vezes nem é preciso SQL dinâmico: «where (:P10_STATUS is null or status = :P10_STATUS)» resolve com SQL
            estático. Para listas (Checkbox Group, Select Many) use
            «status in (select column_value from table(apex_string.split(:P10_STATUS, ':')))».

            ## Identificadores dinâmicos: lista branca + DBMS_ASSERT
            Nomes de colunas e tabelas não aceitam bind. Mapeie o valor recebido para uma **lista fechada**:

            ~~~plsql
            declare
                l_ordem varchar2(30);
            begin
                l_ordem := case :P10_ORDEM
                               when 'CLIENTE' then 'cliente'
                               when 'TOTAL'   then 'total desc'
                               else 'id'
                           end;
                return 'select id, cliente, total from pedidos order by ' || l_ordem;
            end;
            ~~~

            Quando a lista fechada não é viável, valide com «DBMS_ASSERT» e passe os **valores** sempre com «USING»:

            ~~~plsql
            begin
                execute immediate
                    'update ' || dbms_assert.sql_object_name(:P30_TABELA)
                 || ' set status = :1 where id = :2'
                  using :P30_STATUS, :P30_ID;
            end;
            ~~~

            | Função DBMS_ASSERT | Verifica |
            |---|---|
            | «SIMPLE_SQL_NAME» | Nome simples válido (sem ponto, espaço ou aspas indevidas) |
            | «QUALIFIED_SQL_NAME» | Nome qualificado válido (ex.: «schema.tabela») |
            | «SQL_OBJECT_NAME» | Objeto que existe de fato |
            | «SCHEMA_NAME» | Schema existente |
            | «ENQUOTE_NAME» | Envolve em aspas duplas (maiúsculas por padrão) |
            | «ENQUOTE_LITERAL» | Envolve um literal em aspas simples, validando aspas internas |

            :::atencao DBMS_ASSERT.NOOP não valida nada
            «NOOP» devolve o texto sem verificação — serve apenas para marcar, em revisões, que o ponto foi analisado.
            :::

            ## Outras regras de ouro
            - Nunca use «&ITEM.» em SQL ou PL/SQL; use «:ITEM» ou «V('ITEM')».
            - Em «APEX_EXEC», passe valores com «apex_exec.add_parameter» e o argumento «p_sql_parameters».
            - Prefira pacotes PL/SQL a SQL dinâmico espalhado em páginas: fica mais fácil revisar.
            - Dê ao **schema de parsing** só os privilégios necessários — limita o estrago se algo escapar.
            - Rode o **APEX Advisor** e revise páginas com SQL dinâmico antes de publicar.

            :::dica Bind também é performance
            SQL com bind variables reaproveita o plano de execução no shared pool. Concatenar valores gera um cursor novo para
            cada valor — além de inseguro, é mais lento.
            :::
        `
    },
    en: {
        titulo: 'SQL injection in APEX',
        resumo: 'Where the risk really appears (&ITEM. in SQL, dynamic SQL, Function Body returning SQL Query) and how to avoid it with bind variables and DBMS_ASSERT.',
        tags: ['SQL injection', 'bind variable', 'dynamic SQL', 'EXECUTE IMMEDIATE', 'DBMS_ASSERT', 'Function Body returning SQL Query', '&ITEM.', 'security'],
        conteudo: `
            **SQL injection** is when a user-supplied value changes the *structure* of a SQL statement. The good news: in normal
            APEX usage — regions with static SQL, «:P1_ITEM», Interactive Report and Grid filters — everything already uses
            **bind variables** and is safe. The risk appears when **you** build SQL by concatenating text.

            ## Where the risk appears
            | Pattern | Why it is dangerous |
            |---|---|
            | «where id = &P1_ID.» in a region | Substitution happens **before** parsing: the value becomes SQL code |
            | *PL/SQL Function Body returning SQL Query* concatenating values | The returned text runs as-is |
            | «execute immediate» / «open ... for» with concatenation | Same problem in PL/SQL |
            | «APEX_EXEC.OPEN_QUERY_CONTEXT» with built-up SQL | Same |
            | ORDER BY, table or column names coming from items | Identifiers cannot be bound |

            ## Function Body returning SQL Query
            ~~~plsql
            -- WRONG: concatenates the item value
            declare
                l_sql varchar2(32767) := 'select id, customer, status, total from orders where 1 = 1';
            begin
                if :P10_STATUS is not null then
                    l_sql := l_sql || ' and status = ''' || :P10_STATUS || '''';
                end if;
                return l_sql;
            end;
            ~~~

            Typing «X' or '1'='1» lists everything. The correct form keeps the **bind variable** in the text — APEX binds it at
            execution time:

            ~~~plsql
            -- RIGHT: the text contains :P10_STATUS, not the value
            declare
                l_sql varchar2(32767) := 'select id, customer, status, total from orders where 1 = 1';
            begin
                if :P10_STATUS is not null then
                    l_sql := l_sql || ' and status = :P10_STATUS';
                end if;
                if :P10_CUSTOMER is not null then
                    l_sql := l_sql || q'[ and upper(customer) like '%' || upper(:P10_CUSTOMER) || '%']';
                end if;
                return l_sql;
            end;
            ~~~

            Often you do not even need dynamic SQL: «where (:P10_STATUS is null or status = :P10_STATUS)» works with static SQL.
            For lists (Checkbox Group, Select Many) use
            «status in (select column_value from table(apex_string.split(:P10_STATUS, ':')))».

            ## Dynamic identifiers: allowlist + DBMS_ASSERT
            Column and table names cannot be bound. Map the incoming value to a **closed list**:

            ~~~plsql
            declare
                l_order varchar2(30);
            begin
                l_order := case :P10_SORT
                               when 'CUSTOMER' then 'customer'
                               when 'TOTAL'    then 'total desc'
                               else 'id'
                           end;
                return 'select id, customer, total from orders order by ' || l_order;
            end;
            ~~~

            When a closed list is not feasible, validate with «DBMS_ASSERT» and always pass **values** with «USING»:

            ~~~plsql
            begin
                execute immediate
                    'update ' || dbms_assert.sql_object_name(:P30_TABLE)
                 || ' set status = :1 where id = :2'
                  using :P30_STATUS, :P30_ID;
            end;
            ~~~

            | DBMS_ASSERT function | Checks |
            |---|---|
            | «SIMPLE_SQL_NAME» | A valid simple name (no dots, spaces or stray quotes) |
            | «QUALIFIED_SQL_NAME» | A valid qualified name (e.g. «schema.table») |
            | «SQL_OBJECT_NAME» | An object that actually exists |
            | «SCHEMA_NAME» | An existing schema |
            | «ENQUOTE_NAME» | Wraps in double quotes (uppercased by default) |
            | «ENQUOTE_LITERAL» | Wraps a literal in single quotes, validating inner quotes |

            :::atencao DBMS_ASSERT.NOOP validates nothing
            «NOOP» returns the text unchecked — it only marks, for reviewers, that the spot has been analyzed.
            :::

            ## Other golden rules
            - Never use «&ITEM.» in SQL or PL/SQL; use «:ITEM» or «V('ITEM')».
            - With «APEX_EXEC», pass values with «apex_exec.add_parameter» and the «p_sql_parameters» argument.
            - Prefer PL/SQL packages over dynamic SQL scattered across pages: much easier to review.
            - Grant the **parsing schema** only the privileges it needs — it limits the damage if something slips through.
            - Run the **APEX Advisor** and review pages with dynamic SQL before releasing.

            :::dica Binding is also performance
            SQL with bind variables reuses the execution plan in the shared pool. Concatenating values creates a new cursor per
            value — insecure and slower.
            :::
        `
    }
});

DOC.topico({
    id: 'csp-e-cabecalhos',
    cat: 'seguranca',
    nivel: 'avancado',
    links: [
        { t: 'App Builder Guide — Configuring Content Security Policy (CSP)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/configuring-content-security-policy-csp.html' },
        { t: 'App Builder Guide — Using CSP in APEX', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-csp-in-apex.html' },
        { t: 'Administration Guide — Configuring HTTP Protocol Attributes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeadm/configuring-http-attributes.html' }
    ],
    relacionados: ['escaping-e-xss', 'js-e-css-na-pagina', 'arquivos-estaticos-e-cdn', 'administracao-instancia', 'plugins'],
    pt: {
        titulo: 'Content Security Policy e cabeçalhos HTTP de segurança',
        resumo: 'Como configurar CSP com #APEX_CSP_NONCE#, testar com Report-Only e enviar cabeçalhos como HSTS, nosniff e Referrer-Policy no APEX.',
        tags: ['CSP', 'Content Security Policy', 'nonce', '#APEX_CSP_NONCE#', 'unsafe-inline', 'HTTP Response Headers', 'HSTS', 'X-Frame-Options', 'Embed in Frames', 'Report-Only', 'cabeçalhos'],
        conteudo: `
            A **Content Security Policy (CSP)** é um cabeçalho HTTP que diz ao navegador de onde scripts, estilos, imagens e
            fontes podem vir. Se um atacante conseguir injetar um «<script>» (XSS), o navegador simplesmente **não executa**.
            É a segunda camada de defesa depois do [escaping](#/topico/escaping-e-xss).

            ## Evolução no APEX
            | Versão | O que mudou |
            |---|---|
            | Antes do 24.2 | O atributo **HTTP Response Headers** já permitia enviar uma CSP, mas o APEX dependia de «'unsafe-inline'». |
            | 24.2 | O motor passou a emitir «<script>» e «<style>» com **nonce** e moveu handlers inline para arquivos externos. |
            | 26.1 | O core dispensa «'unsafe-inline'» nos seus arquivos JavaScript e «'unsafe-hashes'» para estilos inline. |

            ## Configurando
            Em *Shared Components → Security Attributes → Browser Security → HTTP Response Headers* (ou *Edit Application
            Definition → Security*), cada linha é um cabeçalho. Comece **sempre** em modo de teste:

            ~~~texto
            Content-Security-Policy-Report-Only: default-src 'self' #APEX_CSP_NONCE#; object-src 'none'; img-src 'self' data:;
            ~~~

            Navegue por todas as páginas com o console do navegador aberto: cada violação aparece lá, sem bloquear nada. Depois de
            corrigir, troque para o cabeçalho efetivo:

            ~~~texto
            Content-Security-Policy: default-src 'self' #APEX_CSP_NONCE#; object-src 'none'; img-src 'self' data:; base-uri 'self'; frame-ancestors 'self';
            X-Content-Type-Options: nosniff
            Referrer-Policy: strict-origin-when-cross-origin
            ~~~

            Se os arquivos do APEX vêm da CDN da Oracle (veja [arquivos estáticos e CDN](#/topico/arquivos-estaticos-e-cdn)),
            acrescente «https://static.oracle.com» às origens permitidas (por exemplo em «script-src», «style-src» e «font-src»).

            ## Substituições para CSP
            | Substituição | Resolve para |
            |---|---|
            | «#APEX_CSP_NONCE#» | O nonce da requisição já no formato do cabeçalho (ex.: «'nonce-abc123'») |
            | «#APEX_CSP_NONCE_ATTRIBUTE#» | O atributo HTML completo (ex.: «nonce="abc123"») |
            | «#APEX_CSP_NONCE_VALUE#» | Só o valor do nonce |
            | «#APEX_CSP_DISPLAY_NONE#» | «style="display:none;"» emitido de forma segura (usado em templates) |

            ## O que costuma quebrar (e como resolver)
            - **Handlers inline** («onclick="..."») e links «javascript:» em HTML Expressions ou templates: troque por Dynamic
              Actions (com seletor jQuery) ou por listeners em um arquivo JS.
            - **«<script>» digitado em regiões Static Content**: mova o código para *Function and Global Variable Declaration*,
              *Execute when Page Loads* ou para um arquivo estático — o APEX emite esses blocos com nonce.
            - **Atributos «style="..."»**: use classes CSS (Template Options, classes utilitárias do Universal Theme).
            - **Bibliotecas e plug-ins de terceiros** de outras origens: adicione o domínio ou hospede o arquivo localmente.

            :::atencao Compatibilidade não é garantida
            As notas do 26.1 avisam que a conformidade vale para o código e os componentes do APEX; bibliotecas de terceiros
            podem violar uma política estrita — no lançamento, **MapLibre** e **CKEditor** tinham limitações conhecidas. Por isso,
            teste com *Report-Only* antes de aplicar.
            :::

            ## Outros cabeçalhos de segurança
            | Cabeçalho | Onde configurar |
            |---|---|
            | «X-Frame-Options» (clickjacking) | Atributo **Embed in Frames**: *Deny*, *Allow from same origin* ou *Allow* |
            | «Cache-Control» | Atributo **Cache** (desligado: o navegador não guarda as páginas) |
            | «Strict-Transport-Security» (HSTS) | Instância: **Require HTTPS = Always** exibe o *Max Age* do HSTS |
            | «X-Content-Type-Options», «Referrer-Policy», «Permissions-Policy» | HTTP Response Headers da aplicação ou da instância |

            Na instância, o administrador define cabeçalhos para **todas** as aplicações em *Administration Services → Manage
            Instance → Security → HTTP Protocol → HTTP Response Headers*. Proxies e balanceadores na frente do ORDS também podem
            acrescentar cabeçalhos — evite duplicá-los com valores conflitantes.

            :::novo CSP estrita no 26.1
            Com o 26.1, aplicações novas podem usar uma política sem «'unsafe-inline'» e sem «'unsafe-hashes'». Em aplicações
            antigas, o trabalho maior costuma ser no seu próprio código: JavaScript inline, estilos inline e plug-ins.
            :::
        `
    },
    en: {
        titulo: 'Content Security Policy and HTTP security headers',
        resumo: 'How to configure CSP with #APEX_CSP_NONCE#, test it in Report-Only mode and send headers such as HSTS, nosniff and Referrer-Policy in APEX.',
        tags: ['CSP', 'Content Security Policy', 'nonce', '#APEX_CSP_NONCE#', 'unsafe-inline', 'HTTP Response Headers', 'HSTS', 'X-Frame-Options', 'Embed in Frames', 'Report-Only', 'headers'],
        conteudo: `
            **Content Security Policy (CSP)** is an HTTP header that tells the browser where scripts, styles, images and fonts may
            come from. If an attacker manages to inject a «<script>» (XSS), the browser simply **does not run it**. It is the
            second line of defense after [escaping](#/topico/escaping-e-xss).

            ## How it evolved in APEX
            | Release | What changed |
            |---|---|
            | Before 24.2 | The **HTTP Response Headers** attribute already allowed sending a CSP, but APEX relied on «'unsafe-inline'». |
            | 24.2 | The engine started emitting «<script>» and «<style>» with a **nonce** and moved inline handlers to external files. |
            | 26.1 | The core no longer needs «'unsafe-inline'» for its JavaScript files nor «'unsafe-hashes'» for inline styles. |

            ## Configuring it
            In *Shared Components → Security Attributes → Browser Security → HTTP Response Headers* (or *Edit Application
            Definition → Security*), each line is one header. **Always** start in test mode:

            ~~~texto
            Content-Security-Policy-Report-Only: default-src 'self' #APEX_CSP_NONCE#; object-src 'none'; img-src 'self' data:;
            ~~~

            Browse every page with the browser console open: each violation shows up there without blocking anything. Once fixed,
            switch to the enforcing header:

            ~~~texto
            Content-Security-Policy: default-src 'self' #APEX_CSP_NONCE#; object-src 'none'; img-src 'self' data:; base-uri 'self'; frame-ancestors 'self';
            X-Content-Type-Options: nosniff
            Referrer-Policy: strict-origin-when-cross-origin
            ~~~

            If APEX files are served from Oracle's CDN (see [static files and CDN](#/topico/arquivos-estaticos-e-cdn)), add
            «https://static.oracle.com» to the allowed sources (for example in «script-src», «style-src» and «font-src»).

            ## CSP substitution strings
            | Substitution | Resolves to |
            |---|---|
            | «#APEX_CSP_NONCE#» | The request nonce in header format (e.g. «'nonce-abc123'») |
            | «#APEX_CSP_NONCE_ATTRIBUTE#» | The full HTML attribute (e.g. «nonce="abc123"») |
            | «#APEX_CSP_NONCE_VALUE#» | Just the nonce value |
            | «#APEX_CSP_DISPLAY_NONE#» | «style="display:none;"» emitted safely (used in templates) |

            ## What usually breaks (and how to fix it)
            - **Inline handlers** («onclick="..."») and «javascript:» links in HTML Expressions or templates: replace them with
              Dynamic Actions (jQuery selector) or listeners in a JS file.
            - **«<script>» typed into Static Content regions**: move the code to *Function and Global Variable Declaration*,
              *Execute when Page Loads* or a static file — APEX emits those blocks with a nonce.
            - **«style="..."» attributes**: use CSS classes (Template Options, Universal Theme utility classes).
            - **Third-party libraries and plug-ins** from other origins: add the domain or host the file locally.

            :::atencao Compatibility is not guaranteed
            The 26.1 release notes state that compliance covers APEX code and built-in components; third-party libraries may
            violate a strict policy — at release time **MapLibre** and **CKEditor** had known limitations. That is why you test with
            *Report-Only* first.
            :::

            ## Other security headers
            | Header | Where to configure |
            |---|---|
            | «X-Frame-Options» (clickjacking) | **Embed in Frames** attribute: *Deny*, *Allow from same origin* or *Allow* |
            | «Cache-Control» | **Cache** attribute (off: the browser does not keep pages) |
            | «Strict-Transport-Security» (HSTS) | Instance: **Require HTTPS = Always** shows the HSTS *Max Age* |
            | «X-Content-Type-Options», «Referrer-Policy», «Permissions-Policy» | Application or instance HTTP Response Headers |

            At instance level, the administrator sets headers for **all** applications under *Administration Services → Manage
            Instance → Security → HTTP Protocol → HTTP Response Headers*. Proxies and load balancers in front of ORDS can add
            headers too — avoid duplicating them with conflicting values.

            :::novo Strict CSP in 26.1
            With 26.1, new applications can run a policy without «'unsafe-inline'» and without «'unsafe-hashes'». In older apps
            the bulk of the work is usually in your own code: inline JavaScript, inline styles and plug-ins.
            :::
        `
    }
});
