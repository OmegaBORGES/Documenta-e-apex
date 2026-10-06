DOC.topico({
    id: 'traducao-de-aplicacoes',
    cat: 'globalizacao',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Understanding the Translation Process', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-the-translation-process.html' },
        { t: 'App Builder Guide — Creating a Text Message-Based Translation', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-a-text-message-based-translation.html' },
        { t: 'API Reference — APEX_LANG', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_LANG.html' }
    ],
    relacionados: ['mensagens-de-texto', 'formatos-data-numero-e-fuso', 'exportar-importar', 'substituicoes', 'ambientes-dev-test-prod'],
    pt: {
        titulo: 'Traduzindo aplicações (XLIFF, seed, publish e Text Messages)',
        resumo: 'Os dois métodos de tradução do APEX 26.1 — Application-Based com XLIFF e Text Message-Based — e como automatizar seed e publish com APEX_LANG.',
        tags: ['tradução', 'translation', 'XLIFF', 'seed', 'publish', 'APEX_LANG', 'idiomas', 'multilíngue', 'Translate Application', 'dynamic translations', 'FSP_LANGUAGE_PREFERENCE', 'i18n'],
        conteudo: `
            Uma aplicação APEX é desenvolvida em um **idioma primário** e pode ser exibida em outros idiomas. O 26.1 oferece
            dois métodos: o clássico **Application-Based** (uma réplica traduzida da aplicação por idioma, alimentada por
            arquivos XLIFF) e o novo **Text Message-Based** (uma única aplicação cujos textos viram Text Messages).

            ## Como o APEX escolhe o idioma
            O atributo **Application Language Derived From** (*Shared Components → Globalization Attributes*) define a fonte:

            | Opção | De onde vem o idioma |
            |---|---|
            | No NLS / Application Primary Language | Sempre o idioma primário (app não traduzida). |
            | Browser | Preferência de idioma do navegador. |
            | Application Preference | Preferência de usuário «FSP_LANGUAGE_PREFERENCE». |
            | Item Preference | Valor de um item da aplicação. |
            | Session | Definido com «APEX_UTIL.SET_SESSION_LANG» ou pelo parâmetro de URL «p_lang». |

            A correspondência segue esta ordem: código exato (ex.: «pt-br»), código sem a região («pt») e, por fim, o idioma
            primário. Exemplo: app primária em alemão («de») com tradução «en-us» — quem usa «en-us» vê inglês; quem usa
            «en-gb» vê alemão.

            ## Método 1: Application-Based (XLIFF)
            1. Em **Globalization Attributes**, ligue *Translate Application* e escolha *Translate Method = Application-Based*.
            2. Em **Application Translations → Define application languages**, crie o mapeamento: idioma de destino e um
               **Translation Application ID** único na instância (pela API, ele não pode terminar em 0).
            3. **Seed translatable text**: copia todos os textos traduzíveis para o repositório de tradução.
            4. **Download XLIFF**: da app inteira ou de uma página, com todos os elementos ou só os novos/alterados.
            5. Traduza o arquivo (UTF-8; ferramentas de tradução e fornecedores entendem XLIFF). A tradução pode ser
               incremental: o que faltar aparece no idioma primário.
            6. **Apply XLIFF translation files** e, por fim, **Publish translated applications**.

            A app traduzida é uma réplica oculta: não aparece na lista do App Builder e não é editada diretamente.
            **Toda alteração na app primária exige novo seed e novo publish** — desde o 24.2 a exportação avisa quando as
            traduções estão fora de sincronia. Desde o 23.2 o XLIFF também inclui os textos dos relatórios padrão de
            Interactive Reports e Interactive Grids.

            ### Automatizando com APEX_LANG
            Em pipelines de deploy, seed e publish rodam por script:

            ~~~plsql
            begin
                -- fora do App Builder (SQLcl, jobs) é preciso definir o workspace
                apex_util.set_workspace( 'MEU_WORKSPACE' );

                -- executado uma única vez: inglês publicado como app 10001
                apex_lang.create_language_mapping(
                    p_application_id             => 100,
                    p_language                   => 'en',
                    p_translation_application_id => 10001 );

                -- a cada nova versão da app primária
                apex_lang.seed_translations(   p_application_id => 100, p_language => 'en' );
                apex_lang.publish_application( p_application_id => 100, p_language => 'en' );
                commit;
            end;
            ~~~

            Para aplicar um XLIFF por código existe «APEX_LANG.APPLY_XLIFF_DOCUMENT», e «APEX_LANG.UPDATE_TRANSLATED_STRING»
            altera strings pontuais do repositório.

            ## Método 2: Text Message-Based

            :::novo Uma aplicação, vários idiomas (26.1)
            Com *Translate Method = Text Message-Based*, o assistente **Convert to Text Messages** transforma os textos
            traduzíveis em Text Messages referenciadas com «&{NOME}.». Depois você adiciona idiomas (*Add Language*), exporta
            com **Export Text Messages** em **XLIFF ou CSV** (um idioma ou todos num ZIP), traduz e importa com
            **Import Text Messages**. Não há réplicas: a mesma aplicação roda em todos os idiomas. As APIs
            «APEX_LANG.EXPORT_TEXT_MESSAGES» e «APEX_LANG.IMPORT_TEXT_MESSAGES» automatizam a troca de arquivos.
            :::

            A conversão não alcança template directives, textos numéricos, componentes marcados como não traduzíveis nem
            componentes assinados (subscriptions); rode-a de novo sempre que a aplicação mudar.

            | | Application-Based | Text Message-Based |
            |---|---|---|
            | Aplicações | Uma réplica publicada por idioma | Uma só aplicação |
            | Formato de troca | XLIFF | XLIFF ou CSV |
            | Depois de alterar a app | Seed, XLIFF e publish | Converter de novo e exportar/importar mensagens |
            | Disponível | Há muitas versões | A partir do 26.1 |

            ## Traduzindo dados
            Textos que vêm de tabelas (LOVs, categorias) não estão no XLIFF. Use **Dynamic Translations**
            (*Application Translations → Dynamic Translations*: texto de origem, idioma e texto traduzido) lidas com
            «APEX_LANG.LANG», ou modele tabelas de tradução no seu próprio schema.

            ~~~sql LOV com tradução dinâmica
            select apex_lang.lang( descricao ) as d,
                   codigo                      as r
              from status_pedido
             order by 1
            ~~~

            ## Mensagens internas do APEX
            Os textos do próprio APEX (paginação, "1 error has occurred", mensagens do IG e do IR) existem traduzidos para
            mais de 30 idiomas — incluindo português do Brasil — quando os arquivos de idioma do APEX estão instalados na
            instância. Para trocar um texto padrão, crie uma Text Message com o mesmo nome, como «APEX.PAGE_ITEM_IS_REQUIRED».
            Veja [Text Messages](#/topico/mensagens-de-texto).

            :::atencao Cuidados
            - Os IDs das apps traduzidas precisam ser únicos na instância: reserve uma faixa por ambiente.
            - Textos montados em PL/SQL não entram no XLIFF — use Text Messages e «APEX_LANG.GET_MESSAGE».
            - Ao promover para outro ambiente, garanta que a exportação inclua as traduções e confira se as versões
              traduzidas estão publicadas no destino.
            :::
        `
    },
    en: {
        titulo: 'Translating applications (XLIFF, seed, publish and Text Messages)',
        resumo: 'The two translation methods in APEX 26.1 — Application-Based with XLIFF and Text Message-Based — and how to automate seed and publish with APEX_LANG.',
        tags: ['translation', 'XLIFF', 'seed', 'publish', 'APEX_LANG', 'languages', 'multilingual', 'Translate Application', 'dynamic translations', 'FSP_LANGUAGE_PREFERENCE', 'i18n'],
        conteudo: `
            An APEX application is built in a **primary language** and can be displayed in other languages. Release 26.1
            offers two methods: the classic **Application-Based** one (a translated replica of the app per language, fed by
            XLIFF files) and the new **Text Message-Based** one (a single application whose texts become Text Messages).

            ## How APEX picks the language
            The **Application Language Derived From** attribute (*Shared Components → Globalization Attributes*) sets the source:

            | Option | Where the language comes from |
            |---|---|
            | No NLS / Application Primary Language | Always the primary language (app not translated). |
            | Browser | The browser's language preference. |
            | Application Preference | The «FSP_LANGUAGE_PREFERENCE» user preference. |
            | Item Preference | The value of an application item. |
            | Session | Set with «APEX_UTIL.SET_SESSION_LANG» or the «p_lang» URL parameter. |

            Matching follows this order: exact code (e.g. «pt-br»), code without the region («pt») and finally the primary
            language. Example: a German («de») primary app with an «en-us» translation — «en-us» users see English; «en-gb»
            users see German.

            ## Method 1: Application-Based (XLIFF)
            1. In **Globalization Attributes**, turn on *Translate Application* and pick *Translate Method = Application-Based*.
            2. In **Application Translations → Define application languages**, create the mapping: target language and a
               **Translation Application ID** unique in the instance (through the API it cannot end in 0).
            3. **Seed translatable text**: copies every translatable string into the translation repository.
            4. **Download XLIFF**: for the whole app or one page, all elements or only new/updated ones.
            5. Translate the file (UTF-8; translation tools and vendors understand XLIFF). Translation can be incremental:
               anything missing shows up in the primary language.
            6. **Apply XLIFF translation files** and finally **Publish translated applications**.

            The translated app is a hidden replica: it does not appear in the App Builder list and is not edited directly.
            **Every change to the primary app requires a new seed and publish** — since 24.2 the export warns you when
            translations are out of sync. Since 23.2 the XLIFF also includes the texts of Interactive Report and Interactive
            Grid default reports.

            ### Automating with APEX_LANG
            In deployment pipelines, seed and publish run from a script:

            ~~~plsql
            begin
                -- outside App Builder (SQLcl, jobs) the workspace must be set
                apex_util.set_workspace( 'MY_WORKSPACE' );

                -- run once: Spanish published as app 10001
                apex_lang.create_language_mapping(
                    p_application_id             => 100,
                    p_language                   => 'es',
                    p_translation_application_id => 10001 );

                -- on every new version of the primary app
                apex_lang.seed_translations(   p_application_id => 100, p_language => 'es' );
                apex_lang.publish_application( p_application_id => 100, p_language => 'es' );
                commit;
            end;
            ~~~

            To apply an XLIFF from code there is «APEX_LANG.APPLY_XLIFF_DOCUMENT», and «APEX_LANG.UPDATE_TRANSLATED_STRING»
            changes individual strings in the repository.

            ## Method 2: Text Message-Based

            :::novo One application, many languages (26.1)
            With *Translate Method = Text Message-Based*, the **Convert to Text Messages** wizard turns translatable texts
            into Text Messages referenced as «&{NAME}.». You then add languages (*Add Language*), export with
            **Export Text Messages** in **XLIFF or CSV** (one language or all of them zipped), translate and import with
            **Import Text Messages**. No replicas: the same application runs in every language. The
            «APEX_LANG.EXPORT_TEXT_MESSAGES» and «APEX_LANG.IMPORT_TEXT_MESSAGES» APIs automate the file exchange.
            :::

            The conversion does not cover template directives, numeric text, components marked as not translatable or
            subscribed components; run it again whenever the application changes.

            | | Application-Based | Text Message-Based |
            |---|---|---|
            | Applications | One published replica per language | A single application |
            | Exchange format | XLIFF | XLIFF or CSV |
            | After changing the app | Seed, XLIFF and publish | Convert again and export/import messages |
            | Available | For many releases | Since 26.1 |

            ## Translating data
            Text coming from tables (LOVs, categories) is not in the XLIFF. Use **Dynamic Translations**
            (*Application Translations → Dynamic Translations*: source text, language and translated text) read with
            «APEX_LANG.LANG», or model translation tables in your own schema.

            ~~~sql LOV with dynamic translation
            select apex_lang.lang( description ) as d,
                   code                          as r
              from order_status
             order by 1
            ~~~

            ## APEX internal messages
            APEX's own texts (pagination, "1 error has occurred", IG and IR messages) ship translated into more than 30
            languages when the APEX language files are installed in the instance. To change a default text, create a Text
            Message with the same name, such as «APEX.PAGE_ITEM_IS_REQUIRED». See [Text Messages](#/topico/mensagens-de-texto).

            :::atencao Watch out
            - Translated app IDs must be unique in the instance: reserve a range per environment.
            - Text built in PL/SQL is not part of the XLIFF — use Text Messages and «APEX_LANG.GET_MESSAGE».
            - When promoting to another environment, make sure the export includes the translations and check that the
              translated versions are published on the target.
            :::
        `
    }
});

DOC.topico({
    id: 'formatos-data-numero-e-fuso',
    cat: 'globalizacao',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Configuring Globalization Attributes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/configuring-globalization-attributes.html' },
        { t: 'API Reference — APEX_UTIL.SET_SESSION_TIME_ZONE', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/SET_SESSION_TIME_ZONE-Procedure.html' },
        { t: 'JavaScript API — apex.locale', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.locale.html' }
    ],
    relacionados: ['traducao-de-aplicacoes', 'mensagens-de-texto', 'itens-de-pagina', 'sessao-e-session-state', 'javascript-api'],
    pt: {
        titulo: 'Formatos de data e número, NLS e fusos horários',
        resumo: 'Configure formatos de data, timestamp e número, entenda como o idioma define o NLS da sessão e trate fusos horários com Automatic Time Zone.',
        tags: ['NLS', 'formato de data', 'format mask', 'máscara', 'NLS_DATE_FORMAT', 'fuso horário', 'time zone', 'Automatic Time Zone', 'TIMESTAMP WITH LOCAL TIME ZONE', 'APEX_UTIL.SET_SESSION_TIME_ZONE', 'apex.locale', 'separador decimal'],
        conteudo: `
            Formatos e fusos horários são a origem mais comum dos bugs do tipo "na minha máquina funciona" em aplicações
            usadas em vários países. No APEX quase tudo é controlado pelos atributos de **Globalization** e pelos parâmetros
            **NLS** da sessão do banco, que o APEX ajusta a cada requisição.

            ## Atributos de globalização
            Em *Shared Components → Globalization Attributes*:

            | Atributo | Efeito |
            |---|---|
            | Application Primary Language | Idioma base da aplicação. |
            | Application Language Derived From | De onde vem o idioma do usuário (navegador, preferência, item, sessão). |
            | Application Date Format | Altera «NLS_DATE_FORMAT» da sessão. |
            | Application Date Time Format | Fica disponível em «APP_DATE_TIME_FORMAT» (não altera NLS). |
            | Application Timestamp Format | Altera «NLS_TIMESTAMP_FORMAT». |
            | Application Timestamp Time Zone Format | Altera «NLS_TIMESTAMP_TZ_FORMAT». |
            | Character Value Comparison | Altera «NLS_SORT» (ordenação linguística) em Classic e Interactive Reports. |
            | Character Value Comparison Behavior | Altera «NLS_COMP» (comparação binária ou linguística). |
            | Automatic Time Zone | Aplica o fuso do navegador à sessão do banco. |
            | Automatic CSV Encoding | Gera CSV no conjunto de caracteres esperado pelas planilhas do idioma do usuário. |
            | Document Direction | Esquerda-direita, direita-esquerda ou o padrão do idioma (padrão desde o 24.2). |

            Os formatos aceitam máscaras literais («DD/MM/YYYY») ou referência a item («&AI_FORMATO_DATA.»), o que permite
            formato por usuário.

            ## Idioma, território e separadores
            O código de idioma da sessão também define «NLS_LANGUAGE» e «NLS_TERRITORY». Com «pt-br», por exemplo, o
            território é Brasil: vírgula decimal, ponto de milhar e moeda R$. Por isso, nas máscaras numéricas use **G**
            (separador de grupo), **D** (decimal) e **L** (moeda local) em vez de vírgula e ponto literais:

            | Máscara | Sessão pt-br | Sessão en-us |
            |---|---|---|
            | «999G999G990D00» | 1.234,50 | 1,234.50 |
            | «FML999G999G990D00» | R$1.234,50 | $1,234.50 |
            | «DD-MON-YYYY» | 05-OUT-2026 | 05-OCT-2026 |
            | «SINCE» (máscara do APEX) | tempo relativo traduzido | "3 hours ago" |

            Para mudar só o território use «APEX_UTIL.SET_SESSION_TERRITORY»; para mudar o idioma (com *Application Language
            Derived From = Session*), «APEX_UTIL.SET_SESSION_LANG».

            ## Formatando no navegador
            «apex.locale» conhece os separadores da sessão e entende as mesmas máscaras do Oracle; «apex.date» (21.2+) soma,
            formata e interpreta datas:

            ~~~js
            var total = apex.locale.toNumber( apex.item( "P10_TOTAL" ).getValue() );
            apex.item( "P10_TOTAL_COM_TAXA" ).setValue(
                apex.locale.formatNumber( total * 1.1, "FML999G999G990D00" ) );

            var vencimento = apex.date.add( new Date(), 30, apex.date.UNIT.DAY );
            apex.item( "P10_VENCIMENTO" ).setValue( apex.date.format( vencimento, "DD/MM/YYYY" ) );
            ~~~

            ## Fusos horários
            - «DATE» e «TIMESTAMP» não guardam fuso; «SYSDATE» e «SYSTIMESTAMP» usam o relógio do **servidor do banco**.
            - Com **Automatic Time Zone = On**, o APEX obtém o fuso do navegador e o aplica à sessão do banco a cada page view.
              A partir daí «CURRENT_DATE», «LOCALTIMESTAMP» e colunas «TIMESTAMP WITH LOCAL TIME ZONE» refletem o fuso do usuário.
            - Para sobrescrever: «APEX_UTIL.SET_SESSION_TIME_ZONE( p_time_zone => '-03:00' )» (formato de deslocamento);
              «APEX_UTIL.RESET_SESSION_TIME_ZONE» volta ao automático e «APEX_UTIL.GET_SESSION_TIME_ZONE» devolve o valor atual.

            ~~~sql
            create table eventos (
                id         number generated by default as identity primary key,
                titulo     varchar2(200) not null,
                inicio_em  timestamp with local time zone not null
            );

            -- O banco normaliza o valor gravado e o exibe
            -- convertido para o fuso da sessão de quem consulta.
            select titulo,
                   inicio_em,
                   sessiontimezone as fuso_da_sessao
              from eventos
             where inicio_em >= localtimestamp
             order by inicio_em;
            ~~~

            :::atencao A armadilha do SYSDATE
            Com usuários em fusos diferentes, «SYSDATE» não é "agora" para o usuário: é o relógio do servidor — que no
            Autonomous Database está em UTC por padrão. Para o "hoje" do usuário use «CURRENT_DATE» ou «LOCALTIMESTAMP»; para
            registrar o instante de um evento, prefira colunas «TIMESTAMP WITH TIME ZONE» ou «TIMESTAMP WITH LOCAL TIME ZONE».
            :::

            :::novo No 26.1
            O **Automatic Time Zone** passou a trabalhar com **nomes de região** (como «America/Sao_Paulo» ou
            «Europe/Paris») em vez de deslocamentos fixos — «SESSIONTIMEZONE» pode devolver um nome, o que lida melhor com
            horário de verão. Os timeouts de sessão também passaram a ser calculados em UTC.
            :::

            :::dica Formato por usuário
            Guarde a preferência (formato de data, território) em uma tabela, carregue-a em um Application Item no login e
            referencie-a nos atributos de globalização com «&AI_FORMATO_DATA.».
            :::
        `
    },
    en: {
        titulo: 'Date and number formats, NLS and time zones',
        resumo: 'Configure date, timestamp and number formats, understand how the language drives session NLS settings and handle time zones with Automatic Time Zone.',
        tags: ['NLS', 'date format', 'format mask', 'NLS_DATE_FORMAT', 'time zone', 'Automatic Time Zone', 'TIMESTAMP WITH LOCAL TIME ZONE', 'APEX_UTIL.SET_SESSION_TIME_ZONE', 'apex.locale', 'decimal separator'],
        conteudo: `
            Formats and time zones are the most common source of "works on my machine" bugs in apps used across countries. In
            APEX almost everything is driven by the **Globalization** attributes and by the database session **NLS**
            parameters, which APEX sets on every request.

            ## Globalization attributes
            Under *Shared Components → Globalization Attributes*:

            | Attribute | Effect |
            |---|---|
            | Application Primary Language | The app's base language. |
            | Application Language Derived From | Where the user's language comes from (browser, preference, item, session). |
            | Application Date Format | Sets the session «NLS_DATE_FORMAT». |
            | Application Date Time Format | Exposed as «APP_DATE_TIME_FORMAT» (does not change NLS). |
            | Application Timestamp Format | Sets «NLS_TIMESTAMP_FORMAT». |
            | Application Timestamp Time Zone Format | Sets «NLS_TIMESTAMP_TZ_FORMAT». |
            | Character Value Comparison | Sets «NLS_SORT» (linguistic sorting) for Classic and Interactive Reports. |
            | Character Value Comparison Behavior | Sets «NLS_COMP» (binary or linguistic comparison). |
            | Automatic Time Zone | Applies the browser's time zone to the database session. |
            | Automatic CSV Encoding | Produces CSV in the character set spreadsheets expect for the user's language. |
            | Document Direction | Left-to-right, right-to-left or the language default (the default since 24.2). |

            Formats accept literal masks («MM/DD/YYYY») or an item reference («&AI_DATE_FORMAT.»), which enables per-user formats.

            ## Language, territory and separators
            The session language code also sets «NLS_LANGUAGE» and «NLS_TERRITORY». With «pt-br», for instance, the territory
            is Brazil: decimal comma, dot as group separator and the R$ currency. That is why number masks should use **G**
            (group separator), **D** (decimal) and **L** (local currency) instead of literal commas and dots:

            | Mask | pt-br session | en-us session |
            |---|---|---|
            | «999G999G990D00» | 1.234,50 | 1,234.50 |
            | «FML999G999G990D00» | R$1.234,50 | $1,234.50 |
            | «DD-MON-YYYY» | 05-OUT-2026 | 05-OCT-2026 |
            | «SINCE» (APEX mask) | translated relative time | "3 hours ago" |

            To change only the territory use «APEX_UTIL.SET_SESSION_TERRITORY»; to change the language (with *Application
            Language Derived From = Session*), «APEX_UTIL.SET_SESSION_LANG».

            ## Formatting in the browser
            «apex.locale» knows the session separators and understands the same Oracle masks; «apex.date» (21.2+) adds,
            formats and parses dates:

            ~~~js
            var total = apex.locale.toNumber( apex.item( "P10_TOTAL" ).getValue() );
            apex.item( "P10_TOTAL_WITH_TAX" ).setValue(
                apex.locale.formatNumber( total * 1.1, "FML999G999G990D00" ) );

            var dueDate = apex.date.add( new Date(), 30, apex.date.UNIT.DAY );
            apex.item( "P10_DUE_DATE" ).setValue( apex.date.format( dueDate, "MM/DD/YYYY" ) );
            ~~~

            ## Time zones
            - «DATE» and «TIMESTAMP» store no time zone; «SYSDATE» and «SYSTIMESTAMP» use the **database server** clock.
            - With **Automatic Time Zone = On**, APEX gets the browser's time zone and applies it to the database session on
              every page view. From then on «CURRENT_DATE», «LOCALTIMESTAMP» and «TIMESTAMP WITH LOCAL TIME ZONE» columns
              reflect the user's time zone.
            - To override: «APEX_UTIL.SET_SESSION_TIME_ZONE( p_time_zone => '-05:00' )» (offset format);
              «APEX_UTIL.RESET_SESSION_TIME_ZONE» goes back to automatic and «APEX_UTIL.GET_SESSION_TIME_ZONE» returns the
              current value.

            ~~~sql
            create table events (
                id         number generated by default as identity primary key,
                title      varchar2(200) not null,
                starts_at  timestamp with local time zone not null
            );

            -- The database normalizes the stored value and shows it
            -- converted to the time zone of whoever queries it.
            select title,
                   starts_at,
                   sessiontimezone as session_tz
              from events
             where starts_at >= localtimestamp
             order by starts_at;
            ~~~

            :::atencao The SYSDATE trap
            With users in different time zones, «SYSDATE» is not "now" for the user: it is the server clock — which is UTC by
            default on Autonomous Database. For the user's "today" use «CURRENT_DATE» or «LOCALTIMESTAMP»; to record when an
            event happened, prefer «TIMESTAMP WITH TIME ZONE» or «TIMESTAMP WITH LOCAL TIME ZONE» columns.
            :::

            :::novo In 26.1
            **Automatic Time Zone** now works with **region names** (such as «America/New_York» or «Europe/Paris») instead of
            fixed offsets — «SESSIONTIMEZONE» may return a name, which copes better with daylight saving time. Session
            timeouts are now calculated in UTC as well.
            :::

            :::dica Per-user formats
            Store the preference (date format, territory) in a table, load it into an Application Item at login and reference
            it in the globalization attributes as «&AI_DATE_FORMAT.».
            :::
        `
    }
});

DOC.topico({
    id: 'mensagens-de-texto',
    cat: 'globalizacao',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Managing Text Messages', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-text-messages.html' },
        { t: 'API Reference — APEX_LANG.GET_MESSAGE', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_LANG.GET_MESSAGE-Function.html' },
        { t: 'JavaScript API — apex.lang', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.lang.html' }
    ],
    relacionados: ['traducao-de-aplicacoes', 'substituicoes', 'tratamento-de-erros', 'javascript-api', 'formatos-data-numero-e-fuso'],
    pt: {
        titulo: 'Text Messages e APEX_LANG',
        resumo: 'Crie mensagens traduzíveis em Shared Components e use-as em atributos, PL/SQL e JavaScript, com parâmetros nomeados e a sintaxe &{MENSAGEM}.',
        tags: ['Text Messages', 'mensagens', 'APEX_LANG', 'APEX_LANG.GET_MESSAGE', 'apex.lang.getMessage', 'formatMessage', 'Used in JavaScript', 'APP_TEXT$', 'tradução', 'mensagens internas'],
        conteudo: `
            **Text Messages** são textos traduzíveis guardados em *Shared Components → Globalization → Text Messages*. Cada
            mensagem tem um nome, um idioma e o texto — a mesma mensagem existe uma vez por idioma. Elas são a forma certa de
            traduzir o que não está nos metadados das páginas (mensagens geradas em PL/SQL, textos usados em JavaScript,
            e-mails) e, no 26.1, a base do método de tradução **Text Message-Based**.

            ## Criando uma mensagem
            Campos: **Static ID** (o nome usado nas APIs), **Language**, **Text**, **Used in JavaScript** (disponibiliza a
            mensagem para «apex.lang») e **Comment**. Desde o 24.2 há também metadados opcionais, carregados por API, para
            integrar com repositórios externos de strings.

            O texto aceita **parâmetros nomeados** («%nome») ou **posicionais** («%0» a «%9»):

            | Nome | Idioma | Texto |
            |---|---|---|
            | LIMITE_EXCEDIDO | en | The amount %valor exceeds your limit of %limite. |
            | LIMITE_EXCEDIDO | pt-br | O valor %valor ultrapassa o seu limite de %limite. |

            ## Onde usar
            | Contexto | Sintaxe |
            |---|---|
            | Atributos e HTML (Compatibility Mode 24.2+) | «&{LIMITE_EXCEDIDO valor=&P20_VALOR. limite=&AI_LIMITE.}.» |
            | Atributos (sintaxe legada) | «&APP_TEXT$LIMITE_EXCEDIDO.» |
            | PL/SQL | «APEX_LANG.GET_MESSAGE» (24.2+; «APEX_LANG.MESSAGE» está depreciada) |
            | JavaScript | «apex.lang.getMessage» e «apex.lang.formatMessage» (exige *Used in JavaScript*) |

            Na sintaxe «&{...}.» os valores substituídos são escapados como HTML por padrão, e o parâmetro especial «$lang»
            força o idioma da mensagem.

            ~~~plsql Validação "Function Body (returning Error Text)"
            declare
                l_valor  number := to_number( :P20_VALOR );
                l_limite number := to_number( :AI_LIMITE );
            begin
                if l_valor > l_limite then
                    return apex_lang.get_message(
                               p_name   => 'LIMITE_EXCEDIDO',
                               p_params => apex_t_varchar2(
                                               'valor',  to_char( l_valor,  'FML999G999G990D00' ),
                                               'limite', to_char( l_limite, 'FML999G999G990D00' ) ) );
                end if;
                return null;
            end;
            ~~~

            ~~~js Mesma mensagem no navegador (Used in JavaScript = On)
            var texto = apex.lang.formatMessage( "LIMITE_EXCEDIDO", { valor: "R$ 900,00", limite: "R$ 500,00" } );
            apex.message.alert( texto );
            ~~~

            ## Criando e mantendo por API
            «APEX_LANG.CREATE_MESSAGE», «UPDATE_MESSAGE» e «DELETE_MESSAGE» mantêm mensagens por script (ótimo para versionar
            textos junto com o código). No 26.1, «EXPORT_TEXT_MESSAGES» e «IMPORT_TEXT_MESSAGES» trocam arquivos XLIFF ou CSV
            com os tradutores.

            ~~~plsql
            begin
                apex_util.set_workspace( 'MEU_WORKSPACE' );
                apex_lang.create_message(
                    p_application_id     => 100,
                    p_name               => 'LIMITE_EXCEDIDO',
                    p_language           => 'pt-br',
                    p_message_text       => 'O valor %valor ultrapassa o seu limite de %limite.',
                    p_used_in_javascript => true );
                commit;
            end;
            ~~~

            ## Personalizando mensagens do próprio APEX
            As mensagens internas do APEX também são Text Messages. Para trocar um texto padrão, crie uma mensagem com o
            **mesmo nome** no idioma desejado:

            | Nome interno | Texto padrão (en) |
            |---|---|
            | APEX.PAGE_ITEM_IS_REQUIRED | #LABEL# must have some value. |
            | FLOW.SINGLE_VALIDATION_ERROR | 1 error has occurred. |
            | APEX.ERROR_MESSAGE_HEADING | Error Message |

            :::dica Text Messages Picker
            No Page Designer (24.2+), ative *Utilities → Show → Text Messages Picker*: um ícone de globo ao lado dos campos
            lista as mensagens da aplicação e mostra uma prévia do texto. No editor de código, digitar «&{» sugere as
            mensagens disponíveis.
            :::

            :::novo No 26.1
            Se a mensagem não existir no idioma do usuário, o APEX passa a usar a do **idioma primário**. As Text Messages
            viraram a base da tradução *Text Message-Based*, com exportação e importação em XLIFF ou CSV — veja
            [Traduzindo aplicações](#/topico/traducao-de-aplicacoes). E as funções de formatação de «apex.lang» aceitam
            parâmetros nomeados.
            :::

            :::atencao Escape
            «APEX_LANG.GET_MESSAGE» devolve texto puro: escape com «apex_escape.html» antes de emitir em HTML. Nos atributos,
            evite «!RAW» em mensagens que recebem dados do usuário como parâmetro.
            :::
        `
    },
    en: {
        titulo: 'Text Messages and APEX_LANG',
        resumo: 'Create translatable messages in Shared Components and use them in attributes, PL/SQL and JavaScript, with named parameters and the &{MESSAGE} syntax.',
        tags: ['Text Messages', 'messages', 'APEX_LANG', 'APEX_LANG.GET_MESSAGE', 'apex.lang.getMessage', 'formatMessage', 'Used in JavaScript', 'APP_TEXT$', 'translation', 'internal messages'],
        conteudo: `
            **Text Messages** are translatable strings stored under *Shared Components → Globalization → Text Messages*.
            Each message has a name, a language and the text — the same message exists once per language. They are the right
            way to translate whatever is not part of page metadata (messages built in PL/SQL, strings used in JavaScript,
            e-mails) and, in 26.1, the foundation of the **Text Message-Based** translation method.

            ## Creating a message
            Fields: **Static ID** (the name used by the APIs), **Language**, **Text**, **Used in JavaScript** (makes the
            message available to «apex.lang») and **Comment**. Since 24.2 there is also optional metadata, loaded through the
            API, for integrating with external string repositories.

            The text accepts **named** («%name») or **positional** («%0» to «%9») parameters:

            | Name | Language | Text |
            |---|---|---|
            | LIMIT_EXCEEDED | en | The amount %amount exceeds your limit of %limit. |
            | LIMIT_EXCEEDED | es | El importe %amount supera su límite de %limit. |

            ## Where to use them
            | Context | Syntax |
            |---|---|
            | Attributes and HTML (Compatibility Mode 24.2+) | «&{LIMIT_EXCEEDED amount=&P20_AMOUNT. limit=&AI_LIMIT.}.» |
            | Attributes (legacy syntax) | «&APP_TEXT$LIMIT_EXCEEDED.» |
            | PL/SQL | «APEX_LANG.GET_MESSAGE» (24.2+; «APEX_LANG.MESSAGE» is deprecated) |
            | JavaScript | «apex.lang.getMessage» and «apex.lang.formatMessage» (requires *Used in JavaScript*) |

            In the «&{...}.» syntax substituted values are HTML-escaped by default, and the special «$lang» parameter forces
            the message language.

            ~~~plsql "Function Body (returning Error Text)" validation
            declare
                l_amount number := to_number( :P20_AMOUNT );
                l_limit  number := to_number( :AI_LIMIT );
            begin
                if l_amount > l_limit then
                    return apex_lang.get_message(
                               p_name   => 'LIMIT_EXCEEDED',
                               p_params => apex_t_varchar2(
                                               'amount', to_char( l_amount, 'FML999G999G990D00' ),
                                               'limit',  to_char( l_limit,  'FML999G999G990D00' ) ) );
                end if;
                return null;
            end;
            ~~~

            ~~~js The same message in the browser (Used in JavaScript = On)
            var text = apex.lang.formatMessage( "LIMIT_EXCEEDED", { amount: "$900.00", limit: "$500.00" } );
            apex.message.alert( text );
            ~~~

            ## Creating and maintaining them through the API
            «APEX_LANG.CREATE_MESSAGE», «UPDATE_MESSAGE» and «DELETE_MESSAGE» maintain messages from scripts (great for
            versioning strings together with the code). In 26.1, «EXPORT_TEXT_MESSAGES» and «IMPORT_TEXT_MESSAGES» exchange
            XLIFF or CSV files with translators.

            ~~~plsql
            begin
                apex_util.set_workspace( 'MY_WORKSPACE' );
                apex_lang.create_message(
                    p_application_id     => 100,
                    p_name               => 'LIMIT_EXCEEDED',
                    p_language           => 'en',
                    p_message_text       => 'The amount %amount exceeds your limit of %limit.',
                    p_used_in_javascript => true );
                commit;
            end;
            ~~~

            ## Customizing APEX's own messages
            APEX internal messages are Text Messages too. To change a default text, create a message with the **same name** in
            the desired language:

            | Internal name | Default text (en) |
            |---|---|
            | APEX.PAGE_ITEM_IS_REQUIRED | #LABEL# must have some value. |
            | FLOW.SINGLE_VALIDATION_ERROR | 1 error has occurred. |
            | APEX.ERROR_MESSAGE_HEADING | Error Message |

            :::dica Text Messages Picker
            In Page Designer (24.2+), turn on *Utilities → Show → Text Messages Picker*: a globe icon next to fields lists the
            application's messages and previews the text. In the code editor, typing «&{» suggests the available messages.
            :::

            :::novo In 26.1
            If a message does not exist in the user's language, APEX now falls back to the **primary language** one. Text
            Messages became the foundation of *Text Message-Based* translation, with XLIFF or CSV export and import — see
            [Translating applications](#/topico/traducao-de-aplicacoes). And the «apex.lang» formatting functions accept named
            parameters.
            :::

            :::atencao Escaping
            «APEX_LANG.GET_MESSAGE» returns plain text: escape it with «apex_escape.html» before emitting HTML. In attributes,
            avoid «!RAW» on messages that take user data as parameters.
            :::
        `
    }
});
