DOC.topico({
    id: 'ia-no-apex-visao-geral',
    cat: 'ia',
    nivel: 'basico',
    desde: '24.1',
    links: [
        { t: 'App Builder Guide — Managing Generative AI in APEX', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-generative-ai-in-apex.html' },
        { t: 'Release Notes 26.1 — New Features', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmrn/new-features.html' },
        { t: 'APEX_AI (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_AI.html' }
    ],
    relacionados: ['servicos-de-ia-generativa', 'apex-assistant', 'ai-agents-e-rag', 'chat-e-geracao-de-texto', 'select-ai-e-vetores'],
    pt: {
        titulo: 'IA no APEX: visão geral',
        resumo: 'Como a IA generativa entrou no APEX — do APEX Assistant (24.1) aos AI Agents com tools (26.1) — e como as peças se encaixam.',
        tags: ['IA', 'inteligência artificial', 'IA generativa', 'GenAI', 'LLM', 'linha do tempo', 'AI Agents', 'APEX Assistant', 'APEX_AI', 'MCP', 'tokens', 'privacidade'],
        conteudo: `
            Desde o **APEX 24.1** a IA generativa é um recurso nativo da plataforma. Ela aparece em dois papéis bem diferentes:
            - **IA para quem desenvolve** (*build time*): o **APEX Assistant** escreve, explica e corrige SQL, PL/SQL e JavaScript
              nos editores de código, cria aplicações e páginas a partir de linguagem natural e gera modelos de dados.
            - **IA dentro da sua aplicação** (*runtime*): chat para o usuário final, geração de texto (resumos, traduções,
              classificação), relatórios que entendem pedidos em linguagem natural e busca semântica.

            Nos dois casos o APEX **não traz um modelo próprio**: ele conversa com um provedor de LLM que você configura
            (OCI Generative AI, OpenAI, Cohere, Anthropic Claude, Google Gemini, Mistral AI ou Ollama).

            ## Linha do tempo
            | Versão | O que chegou |
            |---|---|
            | Até 23.2 | Nada nativo: integrações eram feitas à mão, chamando as APIs REST dos provedores com «APEX_WEB_SERVICE». |
            | 24.1 | **Generative AI Services** (OpenAI, Cohere, OCI Generative AI), **APEX Assistant** nos editores, *Create App Using Generative AI*, Dynamic Action **Show AI Assistant** e o pacote «APEX_AI» (GENERATE, CHAT, consentimento). |
            | 24.2 | **AI Configurations** com **RAG Sources**, Dynamic Action **Generate Text with AI**, *Create Data Model Using AI* no SQL Workshop, **Vector Providers** e busca vetorial em Search Configurations, botão *Test Connection*. |
            | 26.1 | **AI Agents** com **AI Tools** e aprovação do usuário, respostas em **JSON Schema**, anexos no «APEX_AI», processo e atividade de workflow *Generate Text with AI*, Interactive Report em **linguagem natural**, criação de página por linguagem natural, limites de tokens, novos provedores e **Blueprints**. |

            :::info Por que não existe 25.x
            A Oracle saltou do 24.2 direto para o 26.1, alinhando a numeração ao Oracle AI Database 26ai.
            :::

            ## Como as peças se encaixam
            1. **Instância**: o administrador habilita a IA (*AI Enabled*, em Administration Services) e pode impor limites de tokens.
            2. **Workspace**: em *Workspace Utilities → Generative AI* você cadastra um **Generative AI Service** (provedor, URL,
               modelo e uma Web Credential com a chave). Um deles pode ser marcado como *Used by App Builder* para alimentar o APEX Assistant.
            3. **Aplicação**: em *Edit Application Definition → AI* você escolhe o serviço padrão e a mensagem de consentimento.
            4. **Shared Components → AI Agents**: system prompt, mensagem de boas-vindas, temperatura, formato de resposta e **tools**.
            5. **Componentes**: Dynamic Actions, processo e atividade de workflow *Generate Text with AI*, Interactive Report com
               *Natural Language Support* e o pacote «APEX_AI» para o que for programático.

            ## Mapa rápido
            | Quero... | Use |
            |---|---|
            | Ajuda para escrever ou consertar código | [APEX Assistant](#/topico/apex-assistant) |
            | Um chat na minha página | DA *Show AI Assistant* + AI Agent ([chat e geração de texto](#/topico/chat-e-geracao-de-texto)) |
            | Resumir, traduzir ou classificar um texto | DA, processo ou atividade *Generate Text with AI* |
            | Que a IA consulte dados ou execute ações | [AI Agents e tools](#/topico/ai-agents-e-rag) |
            | JSON estruturado, anexos, uso em jobs | [Pacote APEX_AI](#/topico/apex-ai-pacote) |
            | Filtrar relatórios ou buscar por significado | [Linguagem natural e vetores](#/topico/select-ai-e-vetores) |
            | Gerar uma app a partir de uma especificação | [Blueprints](#/topico/blueprints-e-spec-driven) |

            ## O caminho de uma chamada
            Toda chamada de IA parte do **servidor**, nunca do navegador: o APEX localiza o serviço configurado, monta o payload no
            formato do provedor, injeta a credencial, envia a requisição e **normaliza** a resposta. Por isso trocar de provedor é,
            em geral, só uma mudança de configuração — e a chave de API nunca chega ao JavaScript da página.

            ~~~plsql
            -- O "hello world" da IA no APEX (exige uma sessão APEX ativa)
            declare
                l_resposta clob;
            begin
                l_resposta := apex_ai.generate(
                                  p_prompt        => 'Explique o que é o Oracle APEX em uma frase.',
                                  p_system_prompt => 'Responda em português do Brasil, de forma objetiva.' );
                apex_debug.info('Resposta: %s', dbms_lob.substr(l_resposta, 200, 1));
            end;
            ~~~

            ## Boas práticas desde o primeiro dia
            - **Privacidade**: prompts, valores de itens, resultados de tools e anexos são enviados ao provedor. Envie só o
              necessário, configure a **mensagem de consentimento** e verifique contrato, região de processamento e LGPD.
            - **Custos**: os recursos de IA do APEX não têm custo adicional, mas os provedores cobram por **tokens** (entrada e
              saída). Use *Max AI Tokens* e «APEX_AI.GET_AVAILABLE_TOKENS» para manter o gasto sob controle.
            - **Prompt injection**: trate como não confiável todo texto vindo do usuário, de documentos e do próprio modelo.
            - **Revisão humana**: respostas podem estar erradas; deixe o usuário revisar antes de gravar ou agir.

            :::atencao O que o APEX não faz (ainda)
            Não há **servidor MCP nativo** no APEX: para expor o banco a agentes via *Model Context Protocol* use o SQLcl (servidor
            MCP desde a versão 25.2), o ORDS 26.2 ou o servidor MCP do Autonomous AI Database. E o **Select AI** («DBMS_CLOUD_AI») é
            um recurso do banco, sem componente declarativo no APEX — embora possa ser chamado em PL/SQL.
            :::

            :::novo Destaques do 26.1
            AI Agents com tools nativas (*Retrieve Data*, *Execute Server-side Code*, *Execute Client-side Code*), guardrails com
            aprovação do usuário, saída JSON validada por schema, anexos e Interactive Reports que entendem linguagem natural.
            :::
        `
    },
    en: {
        titulo: 'AI in APEX: overview',
        resumo: 'How generative AI arrived in APEX — from APEX Assistant (24.1) to AI Agents with tools (26.1) — and how the pieces fit together.',
        tags: ['AI', 'artificial intelligence', 'generative AI', 'GenAI', 'LLM', 'timeline', 'AI Agents', 'APEX Assistant', 'APEX_AI', 'MCP', 'tokens', 'privacy'],
        conteudo: `
            Since **APEX 24.1**, generative AI is a native platform feature. It shows up in two very different roles:
            - **AI for developers** (*build time*): **APEX Assistant** writes, explains and fixes SQL, PL/SQL and JavaScript in the
              code editors, creates applications and pages from natural language and generates data models.
            - **AI inside your application** (*runtime*): chat for end users, text generation (summaries, translations,
              classification), reports that understand natural-language requests and semantic search.

            In both cases APEX **does not ship its own model**: it talks to an LLM provider you configure (OCI Generative AI,
            OpenAI, Cohere, Anthropic Claude, Google Gemini, Mistral AI or Ollama).

            ## Timeline
            | Release | What arrived |
            |---|---|
            | Up to 23.2 | Nothing native: integrations were hand-made, calling provider REST APIs with «APEX_WEB_SERVICE». |
            | 24.1 | **Generative AI Services** (OpenAI, Cohere, OCI Generative AI), **APEX Assistant** in code editors, *Create App Using Generative AI*, the **Show AI Assistant** dynamic action and the «APEX_AI» package (GENERATE, CHAT, consent). |
            | 24.2 | **AI Configurations** with **RAG Sources**, the **Generate Text with AI** dynamic action, *Create Data Model Using AI* in SQL Workshop, **Vector Providers** and vector search in Search Configurations, a *Test Connection* button. |
            | 26.1 | **AI Agents** with **AI Tools** and user approval, **JSON Schema** responses, attachments in «APEX_AI», *Generate Text with AI* page process and workflow activity, **natural-language** Interactive Reports, create page from natural language, token limits, new providers and **Blueprints**. |

            :::info Why there is no 25.x
            Oracle jumped from 24.2 straight to 26.1, aligning the numbering with Oracle AI Database 26ai.
            :::

            ## How the pieces fit together
            1. **Instance**: the administrator enables AI (*AI Enabled*, in Administration Services) and can enforce token limits.
            2. **Workspace**: under *Workspace Utilities → Generative AI* you register a **Generative AI Service** (provider, URL,
               model and a Web Credential holding the key). One of them can be flagged *Used by App Builder* to power APEX Assistant.
            3. **Application**: under *Edit Application Definition → AI* you pick the default service and the consent message.
            4. **Shared Components → AI Agents**: system prompt, welcome message, temperature, response format and **tools**.
            5. **Components**: dynamic actions, the *Generate Text with AI* process and workflow activity, Interactive Reports with
               *Natural Language Support* and the «APEX_AI» package for anything programmatic.

            ## Quick map
            | I want... | Use |
            |---|---|
            | Help writing or fixing code | [APEX Assistant](#/topico/apex-assistant) |
            | A chat on my page | *Show AI Assistant* DA + AI Agent ([chat and text generation](#/topico/chat-e-geracao-de-texto)) |
            | Summarize, translate or classify text | *Generate Text with AI* DA, process or activity |
            | The AI to query data or take actions | [AI Agents and tools](#/topico/ai-agents-e-rag) |
            | Structured JSON, attachments, use in jobs | [The APEX_AI package](#/topico/apex-ai-pacote) |
            | Filter reports or search by meaning | [Natural language and vectors](#/topico/select-ai-e-vetores) |
            | Generate an app from a specification | [Blueprints](#/topico/blueprints-e-spec-driven) |

            ## The path of a call
            Every AI call starts on the **server**, never in the browser: APEX looks up the configured service, builds the payload
            in the provider's format, injects the credential, sends the request and **normalizes** the response. That is why
            switching providers is usually just a configuration change — and the API key never reaches page JavaScript.

            ~~~plsql
            -- The AI "hello world" in APEX (requires an active APEX session)
            declare
                l_answer clob;
            begin
                l_answer := apex_ai.generate(
                                p_prompt        => 'Explain what Oracle APEX is in one sentence.',
                                p_system_prompt => 'Answer in plain English, be concise.' );
                apex_debug.info('Answer: %s', dbms_lob.substr(l_answer, 200, 1));
            end;
            ~~~

            ## Good practices from day one
            - **Privacy**: prompts, item values, tool results and attachments are sent to the provider. Send only what is needed,
              configure the **consent message** and check the contract, processing region and data-protection rules (GDPR, LGPD).
            - **Cost**: APEX AI features have no extra cost, but providers charge per **token** (input and output). Use
              *Max AI Tokens* and «APEX_AI.GET_AVAILABLE_TOKENS» to keep spending under control.
            - **Prompt injection**: treat all text coming from users, documents and the model itself as untrusted.
            - **Human review**: answers can be wrong; let users review before saving or acting.

            :::atencao What APEX does not do (yet)
            There is **no native MCP server** in APEX: to expose the database to agents via the *Model Context Protocol* use SQLcl
            (an MCP server since release 25.2), ORDS 26.2 or the Autonomous AI Database MCP server. And **Select AI**
            («DBMS_CLOUD_AI») is a database feature with no declarative APEX component — although you can call it from PL/SQL.
            :::

            :::novo 26.1 highlights
            AI Agents with native tools (*Retrieve Data*, *Execute Server-side Code*, *Execute Client-side Code*), guardrails with
            user approval, schema-validated JSON output, attachments and Interactive Reports that understand natural language.
            :::
        `
    }
});

DOC.topico({
    id: 'servicos-de-ia-generativa',
    cat: 'ia',
    nivel: 'intermediario',
    desde: '24.1',
    links: [
        { t: 'App Builder Guide — Creating Generative AI Service Objects', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-generative-ai-service-objects.html' },
        { t: 'App Builder Guide — Configuring AI Attributes for an Application', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/configuring-ai-attributes-for-an-application.html' },
        { t: 'Administration Guide — Managing Support for AI Services', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeadm/configuring-service-level-security-settings.html' }
    ],
    relacionados: ['web-credentials', 'ia-no-apex-visao-geral', 'apex-ai-pacote', 'administracao-instancia', 'apex-assistant'],
    pt: {
        titulo: 'Configurando serviços de IA generativa',
        resumo: 'Como cadastrar um Generative AI Service (OCI, OpenAI, Cohere, Claude, Gemini, Mistral, Ollama): credencial, modelo, limites de tokens e consentimento.',
        tags: ['Generative AI Service', 'AI Service', 'provedor', 'OpenAI', 'OCI Generative AI', 'Cohere', 'Anthropic', 'Claude', 'Gemini', 'Mistral', 'Ollama', 'Max AI Tokens', 'Used by App Builder', 'Web Credential', 'API key', 'consentimento'],
        conteudo: `
            Um **Generative AI Service** diz ao APEX **qual provedor de LLM usar, em qual endpoint, com qual modelo e com qual
            credencial**. Ele é guardado no nível do **workspace** (*App Builder → Workspace Utilities → Generative AI*) e fica
            disponível para todas as aplicações — também dá para chegar lá por *Shared Components → Generative AI → AI Services*.

            ## Provedores suportados
            | Provedor | Desde | Observações |
            |---|---|---|
            | OCI Generative AI | 24.1 | Serviço gerenciado da Oracle Cloud, com modelos de chat e de embeddings. |
            | OpenAI | 24.1 | Endpoints de chat completions e embeddings; autenticação Bearer. |
            | Cohere | 24.1 | No 26.1 passou a usar a API v2 (configurações migradas automaticamente no upgrade ou import). |
            | Anthropic Claude | 26.1 | API de messages; chave enviada no header x-api-key. |
            | Google Gemini | 26.1 | Chat e embeddings; o APEX monta o payload e injeta a chave. |
            | Mistral AI | 26.1 | API parecida com a da OpenAI, com parâmetros próprios. |
            | Ollama | 26.1 | Modelos rodando localmente: a inferência fica na sua infraestrutura. |
            | Genérico compatível com OpenAI | listado no 26.1 | Qualquer gateway, proxy ou modelo self-hosted que siga a especificação da OpenAI. |

            O APEX traduz o formato de cada provedor e **normaliza** as respostas: trocar de provedor ou de modelo é uma mudança de
            configuração, não de código.

            ## Criando o serviço
            1. *Workspace Utilities → Generative AI → Create*.
            2. Escolha o **AI Provider** e dê um **Name** (ex.: "OpenAI - Produção").
            3. **Base URL**: o endpoint REST do provedor (para Ollama, o endereço do seu servidor).
            4. **Credential**: selecione ou crie uma **Web Credential** e informe a **API Key**. O segredo fica no repositório de
               credenciais do APEX e nunca é exposto ao navegador.
            5. Clique em **Test Connection** (24.2+) para validar URL, chave e modelo antes de salvar.
            6. Em *Advanced*: **Static ID** (usado no «APEX_AI»), **AI Model** (vazio = modelo padrão do provedor),
               **Maximum AI Tokens**, **HTTP Headers** extras e **Additional Attributes** (JSON acrescentado ao payload).

            ## Atributos que fazem diferença
            | Atributo | Para que serve |
            |---|---|
            | Used by App Builder | Habilita o APEX Assistant e os assistentes de criação com IA no App Builder, SQL Workshop e Data Reporter. Só **um** serviço por workspace pode ter essa opção. |
            | Default for New Apps | Torna o serviço o padrão das novas aplicações. |
            | Static ID | Nome estável usado pelas APIs, ex.: «p_service_static_id => 'OPENAI_PROD'». |
            | AI Model | Modelo a usar; os exemplos da documentação 26.1 citam «claude-sonnet-4-6» e «gemini-3.1-pro-preview». |
            | Maximum AI Tokens | Teto de tokens por período de 24 horas para este serviço. |

            ## Ligando o serviço à aplicação
            Em *Edit Application Definition → AI*, escolha o **Service** padrão da aplicação e escreva a **Consent Message**. Ela
            aparece na primeira interação do usuário com a IA; a decisão (aceitar ou recusar) é salva como preferência, então a
            pergunta é feita uma só vez. No 26.1 essa página também recebe as **Request/Response Handler Procedures** (veja o
            [pacote APEX_AI](#/topico/apex-ai-pacote)).

            ## Controles do administrador
            - **AI Enabled** (*Manage Instance → Security*) liga ou desliga a IA na instância; também é possível controlar por workspace.
            - **Max AI Tokens** por instância ou por workspace (26.1), somando-se aos limites por serviço e por Vector Provider.
            - **App Builder Proxy for AI Services**, para ambientes que acessam a internet através de proxy.
            - Em instalações próprias, o banco precisa de **ACL de rede** liberando o host do provedor e de wallet para HTTPS.

            ~~~plsql
            -- Antes de chamar a IA: está habilitada? ainda há cota?
            declare
                l_tokens number;
            begin
                if not apex_ai.is_enabled then
                    raise_application_error(-20001, 'IA desabilitada neste workspace.');
                end if;

                l_tokens := apex_ai.get_available_tokens(p_service_static_id => 'OPENAI_PROD');
                -- null significa que nenhum limite foi configurado
                if l_tokens is not null and l_tokens < 5000 then
                    apex_error.add_error(
                        p_message          => 'A cota diária de IA está quase esgotada.',
                        p_display_location => apex_error.c_inline_in_notification );
                end if;
            end;
            ~~~

            Nem todo provedor informa o consumo de tokens; nesses casos o APEX pode não conseguir aplicar o limite. O custo real é
            cobrado pelo provedor — acompanhe também o painel de faturamento dele.

            :::atencao Exportação não leva o segredo
            Ao exportar uma aplicação que usa um Generative AI Service, o arquivo **omite o segredo** da Web Credential. Após importar
            em outro ambiente, informe a chave manualmente (Workspace Utilities → Web Credentials) ou via «APEX_CREDENTIAL». Use os
            mesmos Static IDs em DEV, TEST e PROD para não precisar mudar código.
            :::

            :::dica Ollama para dados sensíveis
            Com o Ollama o modelo roda em servidores seus: os prompts não saem da sua rede e não há cobrança por token (só o custo da
            infraestrutura). Ótimo para provas de conceito e cenários regulados — mas avalie se a qualidade do modelo atende.
            :::

            :::info Modelos Cohere na OCI
            No 26.1 os modelos «cohere.command-r-08-2024», «cohere.command-r-plus-08-2024», «cohere.command-latest» e
            «cohere.command-plus-latest» do OCI Generative AI ficaram deprecated; a Oracle recomenda «cohere.command-a-03-2025»,
            que também permite usar tools e anexos.
            :::
        `
    },
    en: {
        titulo: 'Configuring generative AI services',
        resumo: 'How to register a Generative AI Service (OCI, OpenAI, Cohere, Claude, Gemini, Mistral, Ollama): credential, model, token limits and consent.',
        tags: ['Generative AI Service', 'AI Service', 'provider', 'OpenAI', 'OCI Generative AI', 'Cohere', 'Anthropic', 'Claude', 'Gemini', 'Mistral', 'Ollama', 'Max AI Tokens', 'Used by App Builder', 'Web Credential', 'API key', 'consent'],
        conteudo: `
            A **Generative AI Service** tells APEX **which LLM provider to use, at which endpoint, with which model and which
            credential**. It is stored at the **workspace** level (*App Builder → Workspace Utilities → Generative AI*) and is
            available to every application — you can also reach it via *Shared Components → Generative AI → AI Services*.

            ## Supported providers
            | Provider | Since | Notes |
            |---|---|---|
            | OCI Generative AI | 24.1 | Oracle Cloud managed service with chat and embedding models. |
            | OpenAI | 24.1 | Chat completions and embeddings endpoints; Bearer authentication. |
            | Cohere | 24.1 | 26.1 switched to the v2 API (configurations are migrated automatically on upgrade or import). |
            | Anthropic Claude | 26.1 | Messages API; key sent in the x-api-key header. |
            | Google Gemini | 26.1 | Chat and embeddings; APEX builds the payload and injects the key. |
            | Mistral AI | 26.1 | OpenAI-like API with its own extra parameters. |
            | Ollama | 26.1 | Locally hosted models: inference stays inside your infrastructure. |
            | Generic OpenAI-compatible | listed in 26.1 | Any gateway, proxy or self-hosted model that follows the OpenAI spec. |

            APEX translates each provider's format and **normalizes** responses: changing provider or model is a configuration
            change, not a code change.

            ## Creating the service
            1. *Workspace Utilities → Generative AI → Create*.
            2. Pick the **AI Provider** and enter a **Name** (e.g. "OpenAI - Production").
            3. **Base URL**: the provider REST endpoint (for Ollama, your own server's address).
            4. **Credential**: select or create a **Web Credential** and enter the **API Key**. The secret lives in the APEX
               credential store and is never exposed to the browser.
            5. Click **Test Connection** (24.2+) to validate URL, key and model before saving.
            6. Under *Advanced*: **Static ID** (used by «APEX_AI»), **AI Model** (empty = the provider default),
               **Maximum AI Tokens**, extra **HTTP Headers** and **Additional Attributes** (JSON merged into the payload).

            ## Attributes that matter
            | Attribute | Purpose |
            |---|---|
            | Used by App Builder | Enables APEX Assistant and the AI-powered creation wizards in App Builder, SQL Workshop and Data Reporter. Only **one** service per workspace can have it. |
            | Default for New Apps | Makes the service the default for newly created applications. |
            | Static ID | Stable name used by the APIs, e.g. «p_service_static_id => 'OPENAI_PROD'». |
            | AI Model | Model to use; the 26.1 documentation examples mention «claude-sonnet-4-6» and «gemini-3.1-pro-preview». |
            | Maximum AI Tokens | Token ceiling per 24-hour period for this service. |

            ## Linking the service to the application
            Under *Edit Application Definition → AI*, select the application's default **Service** and write the **Consent Message**.
            It appears the first time a user interacts with AI; the decision (accept or deny) is stored as a preference, so users
            are asked only once. In 26.1 this page also takes **Request/Response Handler Procedures** (see the
            [APEX_AI package](#/topico/apex-ai-pacote)).

            ## Administrator controls
            - **AI Enabled** (*Manage Instance → Security*) turns AI on or off for the instance; it can also be controlled per workspace.
            - **Max AI Tokens** per instance or per workspace (26.1), on top of per-service and per-Vector-Provider limits.
            - **App Builder Proxy for AI Services**, for environments that reach the internet through a proxy.
            - On self-managed installs the database needs a **network ACL** for the provider host and a wallet for HTTPS.

            ~~~plsql
            -- Before calling AI: is it enabled? is there quota left?
            declare
                l_tokens number;
            begin
                if not apex_ai.is_enabled then
                    raise_application_error(-20001, 'AI is disabled in this workspace.');
                end if;

                l_tokens := apex_ai.get_available_tokens(p_service_static_id => 'OPENAI_PROD');
                -- null means no limit has been configured
                if l_tokens is not null and l_tokens < 5000 then
                    apex_error.add_error(
                        p_message          => 'The daily AI quota is almost used up.',
                        p_display_location => apex_error.c_inline_in_notification );
                end if;
            end;
            ~~~

            Not every provider reports token usage; in that case APEX may not be able to enforce the limit. The actual cost is billed
            by the provider — keep an eye on its billing console too.

            :::atencao Exports do not carry the secret
            When you export an application that uses a Generative AI Service, the file **omits the Web Credential secret**. After
            importing into another environment, set the key manually (Workspace Utilities → Web Credentials) or through
            «APEX_CREDENTIAL». Keep the same Static IDs in DEV, TEST and PROD so no code changes are needed.
            :::

            :::dica Ollama for sensitive data
            With Ollama the model runs on your own servers: prompts never leave your network and there is no per-token charge (only
            infrastructure cost). Great for proofs of concept and regulated scenarios — but check that the model quality is good enough.
            :::

            :::info Cohere models on OCI
            In 26.1 the OCI Generative AI models «cohere.command-r-08-2024», «cohere.command-r-plus-08-2024»,
            «cohere.command-latest» and «cohere.command-plus-latest» are deprecated; Oracle recommends «cohere.command-a-03-2025»,
            which also supports tools and attachments.
            :::
        `
    }
});

DOC.topico({
    id: 'apex-assistant',
    cat: 'ia',
    nivel: 'basico',
    desde: '24.1',
    links: [
        { t: 'App Builder Guide — Using APEX Assistant', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-apex-assistant.html' },
        { t: 'App Builder Guide — Creating an App Using Generative AI', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-an-app-using-generative-ai.html' },
        { t: 'SQL Workshop Guide — Creating a Data Model Using AI', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeutl/creating-data-model-ai.html' }
    ],
    relacionados: ['servicos-de-ia-generativa', 'create-app-wizard', 'sql-workshop', 'page-designer', 'blueprints-e-spec-driven'],
    pt: {
        titulo: 'APEX Assistant no App Builder',
        resumo: 'O assistente de IA do desenvolvedor: gera, explica e corrige SQL, PL/SQL e JS nos editores, cria apps, páginas e modelos de dados.',
        tags: ['APEX Assistant', 'assistente', 'IA', 'Query Builder', 'General Assistance', 'Help me fix this', 'Create App Using Generative AI', 'Create Data Model Using AI', 'editor de código', 'linguagem natural'],
        conteudo: `
            O **APEX Assistant** é o assistente de IA do próprio App Builder. Ele não é um recurso para o usuário final: serve para
            **você, desenvolvedor**, escrever código mais rápido, entender código alheio e gerar estruturas iniciais.

            ## Pré-requisito
            Um Generative AI Service com **Used by App Builder** ligado (só um por workspace). Sem isso, os botões e as opções de IA
            simplesmente não aparecem. No primeiro uso surge um diálogo de consentimento que precisa ser aceito.

            ## Onde ele aparece
            | Lugar | O que faz | Desde |
            |---|---|---|
            | Editores de código (Page Designer, SQL Commands e outros) | Chat lateral para gerar, explicar, melhorar e corrigir SQL, PL/SQL e JavaScript | 24.1 |
            | Create Application → *Create App Using Generative AI* | Você descreve a app; o Assistant resume as páginas e abre o Create App Wizard preenchido | 24.1 |
            | SQL Workshop → Utilities → *Create Data Model Using AI* | Gera script de tabelas, constraints e triggers em Oracle SQL ou Quick SQL | 24.2 |
            | Create Page → *Using Generative AI* | Sugere nome, tipo de página e tabela a partir de uma frase | 26.1 |
            | Editores do Data Reporter | O mesmo chat dos editores | 26.1 |

            ## Os dois modos nos editores
            - **Query Builder**: devolve uma consulta SQL. Assume que a pergunta se refere aos objetos do seu schema (no 26.1 passou a
              considerar também **views**). Se você pedir algo sobre tabelas que não existem, o resultado será fraco.
            - **General Assistance**: conversa livre — "explique", "melhore", "converta para PL/SQL". Oferece os atalhos
              **Use Selection**, **Improve Selection** e **Explain Selection** sobre o trecho selecionado no editor.

            O chat **lembra o contexto** até você clicar em **Clear Chat**, então dá para refinar aos poucos ("agora inclua o nome do
            departamento"). As respostas podem ser copiadas (**Copy**) ou inseridas no editor (**Insert**). Quando uma consulta falha
            na validação, a mensagem de erro ganha o botão **Help me fix this**, que manda o código e o erro para o Assistant.

            ## Exemplo de uso
            Pedido no modo Query Builder: *"mostre o salário médio por departamento, do maior para o menor"*. Uma resposta típica:

            ~~~sql
            select d.dname              as departamento,
                   round(avg(e.sal), 2) as salario_medio
              from emp e
              join dept d on d.deptno = e.deptno
             group by d.dname
             order by salario_medio desc
            ~~~

            Em seguida, no modo General Assistance: *"transforme em uma função PL/SQL que receba o deptno e retorne a média"* — e
            revise o resultado antes de usar.

            ## Gerando aplicações, páginas e tabelas
            - **Create App Using Generative AI**: descreva a app e as tabelas ("Crie uma app com um interactive report sobre
              EBA_PROJECTS e um dashboard de custos"). O Assistant mostra um resumo, você itera e clica em **Create Application**
              para cair no Create App Wizard, onde ainda dá para revisar tudo. Se as tabelas mudaram, ele pode pedir para atualizar
              o cache do dicionário de dados.
            - **Create Page (26.1)**: "Crie um relatório sobre EBA_PROJECTS" — a IA sugere nome, tipo de página e fonte de dados, e
              você continua no wizard.
            - **Create Data Model Using AI (24.2)**: descreva o domínio ("controle de chamados com clientes, atendentes e SLA"),
              escolha Oracle SQL ou Quick SQL e revise o script antes de executar.

            :::atencao Revise sempre
            A própria documentação avisa: código gerado por IA pode conter erros **e riscos de segurança**. Verifique bind variables
            (nada de concatenar «&P1_X.» dentro de SQL), escaping de saída, privilégios e performance antes de aceitar a sugestão.
            :::

            :::dica Prompts melhores
            Seja específico (tabelas, colunas, filtros, ordenação), mostre um exemplo do formato desejado e peça uma coisa de cada
            vez. Nomes claros de tabelas e colunas — e comentários no banco — tendem a melhorar as respostas.
            :::

            ## Privacidade
            O que você digita, o código selecionado e, no modo Query Builder, informações sobre os objetos do schema são enviados ao
            provedor do serviço marcado como *Used by App Builder*. Em ambientes com código ou estruturas confidenciais, use um
            provedor aprovado pela empresa (ou um modelo local, como o Ollama) — ou não habilite a opção.

            :::info Agentes de código fora do App Builder
            Para trabalhar com agentes como Claude Code ou Codex sobre seus arquivos, o 26.1 oferece o **APEXlang** (definição da app
            legível por LLMs) e os **Blueprints**; o SQLcl também atua como servidor MCP. Veja
            [Blueprints e spec-driven development](#/topico/blueprints-e-spec-driven).
            :::
        `
    },
    en: {
        titulo: 'APEX Assistant in App Builder',
        resumo: 'The developer AI assistant: generates, explains and fixes SQL, PL/SQL and JS in the editors and creates apps, pages and data models.',
        tags: ['APEX Assistant', 'assistant', 'AI', 'Query Builder', 'General Assistance', 'Help me fix this', 'Create App Using Generative AI', 'Create Data Model Using AI', 'code editor', 'natural language'],
        conteudo: `
            **APEX Assistant** is App Builder's own AI assistant. It is not an end-user feature: it helps **you, the developer**,
            write code faster, understand someone else's code and generate starting structures.

            ## Prerequisite
            A Generative AI Service with **Used by App Builder** turned on (only one per workspace). Without it, the AI buttons and
            options simply do not show up. The first time you use it, a consent dialog must be accepted.

            ## Where it shows up
            | Place | What it does | Since |
            |---|---|---|
            | Code editors (Page Designer, SQL Commands and others) | Side chat to generate, explain, improve and fix SQL, PL/SQL and JavaScript | 24.1 |
            | Create Application → *Create App Using Generative AI* | You describe the app; the Assistant summarizes the pages and opens a pre-filled Create App Wizard | 24.1 |
            | SQL Workshop → Utilities → *Create Data Model Using AI* | Generates a script with tables, constraints and triggers in Oracle SQL or Quick SQL | 24.2 |
            | Create Page → *Using Generative AI* | Suggests page name, page type and table from one sentence | 26.1 |
            | Data Reporter editors | The same chat as the code editors | 26.1 |

            ## The two modes in the editors
            - **Query Builder**: returns a SQL query. It assumes the question is about objects in your schema (26.1 also considers
              **views**). If you ask about tables that do not exist, the result will be poor.
            - **General Assistance**: free conversation — "explain", "improve", "convert to PL/SQL". It offers the
              **Use Selection**, **Improve Selection** and **Explain Selection** shortcuts for the text selected in the editor.

            The chat **keeps context** until you click **Clear Chat**, so you can refine step by step ("now add the department
            name"). Answers can be copied (**Copy**) or inserted into the editor (**Insert**). When a query fails validation, the
            error message gets a **Help me fix this** button that sends the code and the error to the Assistant.

            ## Usage example
            Request in Query Builder mode: *"show the average salary per department, highest first"*. A typical answer:

            ~~~sql
            select d.dname              as department,
                   round(avg(e.sal), 2) as avg_salary
              from emp e
              join dept d on d.deptno = e.deptno
             group by d.dname
             order by avg_salary desc
            ~~~

            Then, in General Assistance mode: *"turn this into a PL/SQL function that takes a deptno and returns the average"* —
            and review the result before using it.

            ## Generating applications, pages and tables
            - **Create App Using Generative AI**: describe the app and tables ("Create an app with an interactive report on
              EBA_PROJECTS and a cost dashboard"). The Assistant shows a summary, you iterate and click **Create Application** to
              land in the Create App Wizard, where you can still review everything. If tables changed, it may ask you to refresh
              the data dictionary cache.
            - **Create Page (26.1)**: "Create a report on EBA_PROJECTS" — the AI suggests the page name, type and data source, and
              you continue in the wizard.
            - **Create Data Model Using AI (24.2)**: describe the domain ("help desk with customers, agents and SLAs"), choose
              Oracle SQL or Quick SQL and review the script before running it.

            :::atencao Always review
            The documentation itself warns that AI-generated code may contain errors **and security risks**. Check bind variables
            (never concatenate «&P1_X.» inside SQL), output escaping, privileges and performance before accepting a suggestion.
            :::

            :::dica Better prompts
            Be specific (tables, columns, filters, ordering), show an example of the desired format and ask for one thing at a
            time. Clear table and column names — and database comments — tend to improve the answers.
            :::

            ## Privacy
            What you type, the selected code and, in Query Builder mode, information about your schema objects are sent to the
            provider of the service flagged *Used by App Builder*. Where code or structures are confidential, use a provider approved
            by your company (or a local model such as Ollama) — or do not enable the option.

            :::info Coding agents outside App Builder
            To work with agents such as Claude Code or Codex on your files, 26.1 offers **APEXlang** (an LLM-readable app definition)
            and **Blueprints**; SQLcl can also act as an MCP server. See
            [Blueprints and spec-driven development](#/topico/blueprints-e-spec-driven).
            :::
        `
    }
});

DOC.topico({
    id: 'apex-ai-pacote',
    cat: 'ia',
    nivel: 'avancado',
    desde: '24.1',
    links: [
        { t: 'APEX_AI (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_AI.html' },
        { t: 'APEX_AI.GENERATE — Signature 2 (JSON Schema, tools)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_AI.GENERATE-Function-Signature-2.html' },
        { t: 'APEX_AI — Constants and Data Types', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_AI.Data-Types.html' }
    ],
    relacionados: ['ai-agents-e-rag', 'apex-session-e-contexto', 'apex-json', 'chat-e-geracao-de-texto', 'upload-download-arquivos'],
    pt: {
        titulo: 'O pacote APEX_AI',
        resumo: 'GENERATE, CHAT, embeddings, consentimento e tokens em PL/SQL — com as novidades do 26.1: AI Agents, JSON Schema, anexos e tools.',
        tags: ['APEX_AI', 'GENERATE', 'CHAT', 'GET_VECTOR_EMBEDDINGS', 'GET_AVAILABLE_TOKENS', 'SET_TOOL_RESULT', 'p_agent_static_id', 'p_response_json_schema', 't_attachments', 't_chat_messages', 'consentimento', 'PL/SQL'],
        conteudo: `
            O pacote **«APEX_AI»** (desde o 24.1) é a porta programática para os serviços de IA do workspace. Tudo o que os
            componentes declarativos fazem — e bastante coisa a mais — está disponível em PL/SQL.

            :::atencao Exige sessão APEX
            Todas as chamadas precisam de uma **sessão APEX válida**, ligada a uma aplicação com serviço de IA configurado. Em jobs,
            scripts e SQLcl, crie uma com «APEX_SESSION.CREATE_SESSION».
            :::

            ## Visão geral
            | Subprograma | Para que serve |
            |---|---|
            | «GENERATE» | Uma pergunta, uma resposta (sem histórico). No 26.1 aceita anexos, JSON Schema e tools. |
            | «CHAT» | Conversa com histórico em «t_chat_messages», atualizado a cada chamada. |
            | «GET_VECTOR_EMBEDDINGS» | Texto → «VECTOR», via Vector Provider, modelo ONNX no banco ou função PL/SQL. |
            | «GET_AVAILABLE_TOKENS» | Tokens restantes antes do limite (null = sem limite). |
            | «IS_ENABLED» | A IA está habilitada no workspace? |
            | «IS_USER_CONSENT_NEEDED», «SET_USER_CONSENT», «REVOKE_USER_CONSENT», «REVOKE_USER_CONSENT_FOR_ALL» | Gestão do consentimento do usuário. |
            | «SET_TOOL_RESULT» | (26.1) Define o resultado de uma tool executada. |

            ## Duas formas de chamar
            - **Por AI Agent** (recomendado): «p_agent_static_id» aponta para um AI Agent dos Shared Components, que já define
              serviço, system prompt, temperatura, tools e formato de resposta.
            - **Por parâmetros**: «p_prompt», «p_system_prompt», «p_service_static_id» (vazio = serviço padrão da app),
              «p_temperature» e, no 26.1, «p_attachments», «p_response_json_schema», «p_tools» e «p_max_tool_roundtrips».

            ## Exemplo 1 — job em segundo plano
            ~~~plsql
            declare
                l_texto    clob;
                l_resumo   clob;
            begin
                apex_session.create_session(
                    p_app_id   => 100,
                    p_page_id  => 1,
                    p_username => 'JOB_IA' );

                select descricao into l_texto from chamados where id = 42;

                l_resumo := apex_ai.generate(
                                p_agent_static_id => 'resumidor_chamados',
                                p_prompt          => l_texto );

                update chamados set resumo_ia = l_resumo where id = 42;
                apex_session.delete_session;
            exception
                when others then
                    apex_session.delete_session;
                    raise;
            end;
            ~~~

            ## Exemplo 2 — conversa com histórico
            ~~~plsql
            declare
                l_msgs apex_ai.t_chat_messages := apex_ai.c_chat_messages;
                l_r1   clob;
                l_r2   clob;
            begin
                l_r1 := apex_ai.chat(
                            p_agent_static_id => 'suporte',
                            p_prompt          => 'Meu pedido 1234 não chegou.',
                            p_messages        => l_msgs );
                -- l_msgs agora guarda pergunta e resposta: a próxima chamada leva o contexto
                l_r2 := apex_ai.chat(
                            p_agent_static_id => 'suporte',
                            p_prompt          => 'E qual é o prazo para reclamar?',
                            p_messages        => l_msgs );
            end;
            ~~~
            Entre requisições HTTP o histórico não sobrevive em variáveis: persista-o você mesmo ou use a Dynamic Action
            *Show AI Assistant*, que cuida da conversa.

            ## Exemplo 3 — saída JSON com schema (26.1)
            ~~~plsql
            declare
                l_json clob;
            begin
                l_json := apex_ai.generate(
                    p_prompt               => :P10_DESCRICAO,
                    p_system_prompt        => 'Classifique o chamado de suporte descrito pelo usuário.',
                    p_response_json_schema => q'~{
                        "type": "object",
                        "properties": {
                            "categoria":  { "type": "string", "enum": ["HARDWARE", "SOFTWARE", "ACESSO"] },
                            "prioridade": { "type": "integer" },
                            "resumo":     { "type": "string" }
                        },
                        "required": ["categoria", "prioridade", "resumo"],
                        "additionalProperties": false
                    }~' );

                select jt.categoria, jt.prioridade, jt.resumo
                  into :P10_CATEGORIA, :P10_PRIORIDADE, :P10_RESUMO
                  from json_table(l_json, '$'
                           columns ( categoria  varchar2(20)   path '$.categoria',
                                     prioridade number         path '$.prioridade',
                                     resumo     varchar2(4000) path '$.resumo' )) jt;
            end;
            ~~~
            No Oracle AI Database 26ai o APEX valida a saída contra o schema (via «DBMS_JSON_SCHEMA»); no 19c, valide você mesmo.
            A maioria dos provedores exige schema "estrito": «additionalProperties: false» e todos os campos em «required» (para
            opcionais, use o tipo «["string", "null"]»).

            ## Exemplo 4 — anexos (26.1)
            ~~~plsql
            declare
                l_anexos apex_ai.t_attachments := apex_ai.t_attachments();
            begin
                for f in ( select mime_type, blob_content, filename
                             from apex_application_temp_files
                            where name in ( select column_value
                                              from table(apex_string.split(:P20_ARQUIVOS, ':')) ) )
                loop
                    l_anexos.extend;
                    l_anexos(l_anexos.count) := apex_ai.t_attachment(
                                                    mime_type    => f.mime_type,
                                                    content_blob => f.blob_content,
                                                    file_name    => f.filename );
                end loop;

                :P20_RESULTADO := apex_ai.generate(
                                      p_prompt      => 'Extraia número, data e valor total desta nota fiscal.',
                                      p_attachments => l_anexos );
            end;
            ~~~
            Os tipos de arquivo aceitos dependem do provedor e do modelo (imagens são universais; PDF, nem sempre). Limite tamanho e
            resolução; o campo «detail_level» («low», «high», padrão «auto») troca velocidade por fidelidade em imagens.

            ## Tools e handlers (26.1)
            - **Tools em tempo de execução**: passe «p_tools» com registros «t_tool» (nome, descrição, parâmetros) e um
              «callback_procedure» com a assinatura «(p_param in apex_ai.t_tool_exec_param, p_result in out nocopy
              apex_ai.t_tool_exec_result)». O modelo decide quando chamar; o APEX executa e devolve o resultado.
            - **Response handler** («p_response_handler_procedure»): um procedimento único que percorre as tool calls pendentes e
              responde cada uma com «APEX_AI.SET_TOOL_RESULT» — útil para log e para ver o consumo de tokens.
            - **Handlers da aplicação**: na página *AI* da aplicação, *Request/Response Handler Procedure* rodam antes e depois de
              **toda** chamada — para mascarar dados, registrar logs, aplicar políticas ou detectar prompt injection:

            ~~~plsql
            procedure ia_request_handler (
                p_param  in            apex_ai.t_chat_request_handler_param,
                p_result in out nocopy apex_ai.t_chat_request_handler_result );
            ~~~

            :::novo Renomeação no 26.1
            As assinaturas com «p_config_static_id» (das AI Configurations do 24.2) estão **deprecated**: use as que recebem
            «p_agent_static_id». Agentes com tools que exigem aprovação do usuário não podem ser chamados via «APEX_AI».
            :::

            :::dica Erros e custos
            Envolva as chamadas em tratamento de exceção com mensagem amigável (timeouts e cotas acontecem), registre o uso com
            «APEX_DEBUG» e consulte «GET_AVAILABLE_TOKENS» antes de processamentos em lote.
            :::
        `
    },
    en: {
        titulo: 'The APEX_AI package',
        resumo: 'GENERATE, CHAT, embeddings, consent and tokens in PL/SQL — plus what 26.1 added: AI Agents, JSON Schema, attachments and tools.',
        tags: ['APEX_AI', 'GENERATE', 'CHAT', 'GET_VECTOR_EMBEDDINGS', 'GET_AVAILABLE_TOKENS', 'SET_TOOL_RESULT', 'p_agent_static_id', 'p_response_json_schema', 't_attachments', 't_chat_messages', 'consent', 'PL/SQL'],
        conteudo: `
            The **«APEX_AI»** package (since 24.1) is the programmatic gateway to the workspace AI services. Everything the
            declarative components do — and quite a bit more — is available in PL/SQL.

            :::atencao Requires an APEX session
            Every call needs a **valid APEX session** tied to an application with an AI service configured. In jobs, scripts and
            SQLcl, create one with «APEX_SESSION.CREATE_SESSION».
            :::

            ## Overview
            | Subprogram | Purpose |
            |---|---|
            | «GENERATE» | One question, one answer (no history). In 26.1 it accepts attachments, JSON Schema and tools. |
            | «CHAT» | Conversation with history in «t_chat_messages», updated on every call. |
            | «GET_VECTOR_EMBEDDINGS» | Text → «VECTOR», through a Vector Provider, an in-database ONNX model or a PL/SQL function. |
            | «GET_AVAILABLE_TOKENS» | Tokens left before the limit (null = no limit). |
            | «IS_ENABLED» | Is AI enabled in the workspace? |
            | «IS_USER_CONSENT_NEEDED», «SET_USER_CONSENT», «REVOKE_USER_CONSENT», «REVOKE_USER_CONSENT_FOR_ALL» | User consent management. |
            | «SET_TOOL_RESULT» | (26.1) Sets the result of an executed tool. |

            ## Two ways to call it
            - **Through an AI Agent** (recommended): «p_agent_static_id» points to an AI Agent in Shared Components, which already
              defines service, system prompt, temperature, tools and response format.
            - **Through parameters**: «p_prompt», «p_system_prompt», «p_service_static_id» (empty = the app default service),
              «p_temperature» and, in 26.1, «p_attachments», «p_response_json_schema», «p_tools» and «p_max_tool_roundtrips».

            ## Example 1 — background job
            ~~~plsql
            declare
                l_text    clob;
                l_summary clob;
            begin
                apex_session.create_session(
                    p_app_id   => 100,
                    p_page_id  => 1,
                    p_username => 'AI_JOB' );

                select description into l_text from tickets where id = 42;

                l_summary := apex_ai.generate(
                                 p_agent_static_id => 'ticket_summarizer',
                                 p_prompt          => l_text );

                update tickets set ai_summary = l_summary where id = 42;
                apex_session.delete_session;
            exception
                when others then
                    apex_session.delete_session;
                    raise;
            end;
            ~~~

            ## Example 2 — conversation with history
            ~~~plsql
            declare
                l_msgs apex_ai.t_chat_messages := apex_ai.c_chat_messages;
                l_r1   clob;
                l_r2   clob;
            begin
                l_r1 := apex_ai.chat(
                            p_agent_static_id => 'support',
                            p_prompt          => 'My order 1234 never arrived.',
                            p_messages        => l_msgs );
                -- l_msgs now holds question and answer: the next call carries the context
                l_r2 := apex_ai.chat(
                            p_agent_static_id => 'support',
                            p_prompt          => 'And how long do I have to file a claim?',
                            p_messages        => l_msgs );
            end;
            ~~~
            History does not survive in variables between HTTP requests: persist it yourself or use the *Show AI Assistant*
            dynamic action, which manages the conversation for you.

            ## Example 3 — JSON output with a schema (26.1)
            ~~~plsql
            declare
                l_json clob;
            begin
                l_json := apex_ai.generate(
                    p_prompt               => :P10_DESCRIPTION,
                    p_system_prompt        => 'Classify the support ticket described by the user.',
                    p_response_json_schema => q'~{
                        "type": "object",
                        "properties": {
                            "category": { "type": "string", "enum": ["HARDWARE", "SOFTWARE", "ACCESS"] },
                            "priority": { "type": "integer" },
                            "summary":  { "type": "string" }
                        },
                        "required": ["category", "priority", "summary"],
                        "additionalProperties": false
                    }~' );

                select jt.category, jt.priority, jt.summary
                  into :P10_CATEGORY, :P10_PRIORITY, :P10_SUMMARY
                  from json_table(l_json, '$'
                           columns ( category varchar2(20)   path '$.category',
                                     priority number         path '$.priority',
                                     summary  varchar2(4000) path '$.summary' )) jt;
            end;
            ~~~
            On Oracle AI Database 26ai APEX validates the output against the schema (via «DBMS_JSON_SCHEMA»); on 19c, validate it
            yourself. Most providers expect a "strict" schema: «additionalProperties: false» and every member listed in «required»
            (for optional ones, use the type «["string", "null"]»).

            ## Example 4 — attachments (26.1)
            ~~~plsql
            declare
                l_files apex_ai.t_attachments := apex_ai.t_attachments();
            begin
                for f in ( select mime_type, blob_content, filename
                             from apex_application_temp_files
                            where name in ( select column_value
                                              from table(apex_string.split(:P20_FILES, ':')) ) )
                loop
                    l_files.extend;
                    l_files(l_files.count) := apex_ai.t_attachment(
                                                  mime_type    => f.mime_type,
                                                  content_blob => f.blob_content,
                                                  file_name    => f.filename );
                end loop;

                :P20_RESULT := apex_ai.generate(
                                   p_prompt      => 'Extract the number, date and total amount of this invoice.',
                                   p_attachments => l_files );
            end;
            ~~~
            Supported file types depend on provider and model (images work everywhere; PDFs not always). Limit file size and
            resolution; the «detail_level» field («low», «high», default «auto») trades speed for fidelity on images.

            ## Tools and handlers (26.1)
            - **Runtime tools**: pass «p_tools» with «t_tool» records (name, description, parameters) and a «callback_procedure»
              with the signature «(p_param in apex_ai.t_tool_exec_param, p_result in out nocopy apex_ai.t_tool_exec_result)».
              The model decides when to call it; APEX runs it and sends back the result.
            - **Response handler** («p_response_handler_procedure»): a single procedure that loops over pending tool calls and
              answers each one with «APEX_AI.SET_TOOL_RESULT» — handy for logging and for inspecting token usage.
            - **Application handlers**: on the application's *AI* page, the *Request/Response Handler Procedure* run before and
              after **every** call — to mask data, log, enforce policies or detect prompt injection:

            ~~~plsql
            procedure ai_request_handler (
                p_param  in            apex_ai.t_chat_request_handler_param,
                p_result in out nocopy apex_ai.t_chat_request_handler_result );
            ~~~

            :::novo Renaming in 26.1
            The signatures taking «p_config_static_id» (from 24.2 AI Configurations) are **deprecated**: use the ones taking
            «p_agent_static_id». Agents with tools that require user approval cannot be invoked through «APEX_AI».
            :::

            :::dica Errors and costs
            Wrap calls in exception handling with a friendly message (timeouts and quota limits happen), log usage with
            «APEX_DEBUG» and check «GET_AVAILABLE_TOKENS» before batch processing.
            :::
        `
    }
});

DOC.topico({
    id: 'ai-agents-e-rag',
    cat: 'ia',
    nivel: 'avancado',
    desde: '24.2',
    links: [
        { t: 'App Builder Guide — Managing AI Agents and AI Tools', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-ai-agents-and-ai-tools.html' },
        { t: 'Release Notes 26.1 — AI Agent Tools and Guardrails', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmrn/new-features.html' },
        { t: 'APEX_AI.SET_TOOL_RESULT', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_AI.SET_TOOL_RESULT-Procedure-Signature-1.html' }
    ],
    relacionados: ['apex-ai-pacote', 'chat-e-geracao-de-texto', 'select-ai-e-vetores', 'autorizacao', 'sql-injection'],
    pt: {
        titulo: 'AI Agents, tools e RAG',
        resumo: 'AI Agents (26.1, ex-AI Configurations do 24.2) com tools Augment System Prompt (ex-RAG Sources) e On Demand, parâmetros e aprovação do usuário.',
        tags: ['AI Agent', 'AI Tools', 'RAG', 'Retrieval Augmented Generation', 'AI Configuration', 'RAG Sources', 'Augment System Prompt', 'On Demand', 'Retrieve Data', 'Execute Server-side Code', 'Execute Client-side Code', 'guardrails', 'prompt injection', 'APEX$AI_LAST_USER_PROMPT'],
        conteudo: `
            Um **AI Agent** (*Shared Components → Generative AI → AI Agents*) centraliza a "personalidade" e as capacidades de uma
            integração de IA: system prompt, mensagem de boas-vindas, temperatura, formato de resposta e **tools**. Os componentes
            (*Show AI Assistant*, *Generate Text with AI*) e o «APEX_AI» apenas referenciam o agente — mude-o em um lugar e todos
            os usos acompanham.

            ## De AI Configurations a AI Agents
            | Versão | Nome do componente | Como entra o contexto |
            |---|---|---|
            | 24.2 | AI Configuration | **RAG Sources**: SQL ou função que injeta dados no system prompt, com condições |
            | 26.1 | **AI Agent** | **AI Tools** *Augment System Prompt* (as RAG Sources viram isso automaticamente) e **On Demand** |

            A renomeação vale para UI, APIs e views: «p_config_static_id» e views como «APEX_APPL_AI_CONFIGS» ainda funcionam no
            26.1, mas estão deprecated.

            ## Atributos do agente
            | Atributo | Função |
            |---|---|
            | Service | Generative AI Service usado (padrão: o da aplicação) |
            | System Prompt | Papel, regras e tom; pode usar valores de itens enviados pelo componente |
            | Welcome Message | Primeira mensagem do chat (só em componentes com UI) |
            | Temperature | Criatividade × previsibilidade |
            | Response Format | *Text* ou *JSON Object* com JSON Schema (JSON só via «APEX_AI») |
            | Static ID | Referência nas APIs («p_agent_static_id») |

            ## Tools: como o agente age
            Cada tool tem **nome** (minúsculas com underscore, ex.: «buscar_pedido»), **tipo**, **ponto de execução** e, quando é On
            Demand, **descrição** e **parâmetros** — é com eles que o modelo decide se deve chamá-la.

            **Pontos de execução**
            - **Augment System Prompt**: roda a cada nova mensagem, **antes** de chamar o provedor; o resultado vira contexto extra
              no system prompt. É o RAG clássico: *você* decide quando os dados entram, normalmente com condições.
            - **On Demand**: a lista de tools vai para o provedor e **o modelo decide** se e quando chamar cada uma, com quais
              argumentos. O APEX executa, devolve o resultado e o laço continua até a resposta final.

            **Tipos nativos**
            | Tipo | Implementação | Uso típico |
            |---|---|---|
            | Retrieve Data | SQL Query, Function Body (retorna CLOB) ou texto estático | Consultar pedidos, políticas, catálogo |
            | Execute Server-side Code | PL/SQL ou JavaScript (MLE) | Criar registros, iniciar workflow, enviar e-mail |
            | Execute Client-side Code | JavaScript no navegador, em contexto assíncrono | Pedir confirmação, usar APIs do navegador |

            Também é possível criar tools reutilizáveis como plug-ins do tipo **Generative AI Tool**. Parâmetros aceitam VARCHAR2,
            CLOB, NUMBER e BOOLEAN; em SQL/PL/SQL viram bind variables («:PEDIDO_ID») e em JavaScript ficam em «this.data.PEDIDO_ID».

            ## Exemplo: agente de pedidos
            Tool On Demand «buscar_pedido» (Retrieve Data, SQL Query), parâmetro «PEDIDO_ID» (NUMBER, obrigatório), descrição
            "Retorna status, previsão e itens de um pedido do cliente logado":

            ~~~sql
            select p.numero, p.status, p.data_prevista, i.produto, i.quantidade
              from pedidos p
              join pedido_itens i on i.pedido_id = p.id
             where p.id = :PEDIDO_ID
               and p.cliente_login = :APP_USER   -- nunca confie só no argumento enviado pelo modelo
            ~~~

            Tool On Demand «cancelar_pedido» (Execute Server-side Code, PL/SQL), com **Requires Confirmation** ligado:

            ~~~plsql
            begin
                pedidos_pkg.cancelar(p_id => :PEDIDO_ID, p_usuario => :APP_USER);
                apex_ai.set_tool_result(
                    p_result               => 'Pedido ' || :PEDIDO_ID || ' cancelado.',
                    p_notification_message => 'Pedido cancelado com sucesso.',
                    p_notification_type    => apex_ai.c_notification_type_success );
            end;
            ~~~
            Sem «SET_TOOL_RESULT», o resultado padrão enviado ao modelo é "success".

            Tool On Demand «confirmar_envio» (Execute Client-side Code), parâmetro «EMAIL»:

            ~~~js
            var email = this.data.EMAIL;
            return new Promise(function (resolve) {
                apex.message.confirm('Enviar a segunda via para ' + email + '?', function (ok) {
                    resolve(ok ? 'Usuário confirmou o envio.' : 'Usuário recusou o envio.');
                });
            });
            ~~~
            O texto retornado vira o resultado da tool. Tools client-side só funcionam quando a conversa parte do navegador
            (*Show AI Assistant* ou a DA *Generate Text with AI*).

            ## Guardrails e controle
            - **Requires Confirmation** (On Demand): o usuário aprova antes da execução, com título, mensagem (aceita substituições)
              e rótulos configuráveis. Se ele recusar, o modelo recebe "user denied". Agentes com tools desse tipo só podem ser
              usados por componentes de UI — não pelo «APEX_AI».
            - **Server-side Condition**: inclui *Any User Prompt contains* e *Last User Prompt contains*, e os binds
              «:APEX$AI_LAST_USER_PROMPT» e «:APEX$AI_ALL_USER_PROMPTS».
            - **Authorization Scheme** e **Build Option** por tool.
            - **Maximum Tokens** em Retrieve Data com SQL: linhas que estourariam o limite são puladas.
            - **Notification**: mensagem exibida ao usuário quando a tool termina.
            - Por padrão, resultados de tools seguem para o modelo **encapsulados por uma proteção contra prompt injection**;
              «p_is_safe => true» desliga isso — use só com conteúdo totalmente confiável.

            :::atencao O modelo não é um usuário confiável
            Os argumentos das tools são escritos pelo LLM — que pode ter sido manipulado por texto do usuário ou de documentos
            (*prompt injection*). Valide parâmetros, filtre sempre pelo usuário logado, use bind variables e deixe ações
            destrutivas atrás de aprovação e de Authorization Schemes.
            :::

            :::dica RAG: Augment ou On Demand?
            A Oracle sugere considerar a migração das antigas RAG Sources para tools **On Demand**: o modelo busca só o que precisa,
            o agente fica mais simples e o consumo de tokens cai.
            :::

            ## Metadados
            ~~~sql
            -- Descubra as views de AI Agents disponíveis na sua versão
            select view_name, comments
              from apex_dictionary
             where view_name like '%AI_AGENT%'
               and column_id = 0
            ~~~
        `
    },
    en: {
        titulo: 'AI Agents, tools and RAG',
        resumo: 'AI Agents (26.1, formerly 24.2 AI Configurations) with Augment System Prompt (formerly RAG Sources) and On Demand tools, parameters and user approval.',
        tags: ['AI Agent', 'AI Tools', 'RAG', 'Retrieval Augmented Generation', 'AI Configuration', 'RAG Sources', 'Augment System Prompt', 'On Demand', 'Retrieve Data', 'Execute Server-side Code', 'Execute Client-side Code', 'guardrails', 'prompt injection', 'APEX$AI_LAST_USER_PROMPT'],
        conteudo: `
            An **AI Agent** (*Shared Components → Generative AI → AI Agents*) centralizes the "personality" and capabilities of an AI
            integration: system prompt, welcome message, temperature, response format and **tools**. Components (*Show AI
            Assistant*, *Generate Text with AI*) and «APEX_AI» simply reference the agent — change it in one place and every use
            follows.

            ## From AI Configurations to AI Agents
            | Release | Component name | How context gets in |
            |---|---|---|
            | 24.2 | AI Configuration | **RAG Sources**: SQL or a function that injects data into the system prompt, with conditions |
            | 26.1 | **AI Agent** | **AI Tools**: *Augment System Prompt* (RAG Sources are converted automatically) and **On Demand** |

            The rename applies to the UI, APIs and views: «p_config_static_id» and views such as «APEX_APPL_AI_CONFIGS» still work
            in 26.1 but are deprecated.

            ## Agent attributes
            | Attribute | Role |
            |---|---|
            | Service | Generative AI Service to use (default: the application's) |
            | System Prompt | Role, rules and tone; can use item values submitted by the component |
            | Welcome Message | First chat message (UI components only) |
            | Temperature | Creativity vs. predictability |
            | Response Format | *Text* or *JSON Object* with a JSON Schema (JSON only through «APEX_AI») |
            | Static ID | Reference for the APIs («p_agent_static_id») |

            ## Tools: how the agent acts
            Each tool has a **name** (lowercase with underscores, e.g. «get_order»), a **type**, an **execution point** and, when
            On Demand, a **description** and **parameters** — that is what the model uses to decide whether to call it.

            **Execution points**
            - **Augment System Prompt**: runs on every new message, **before** the provider is called; the result becomes extra
              context in the system prompt. This is classic RAG: *you* decide when data gets in, usually with conditions.
            - **On Demand**: the tool list is sent to the provider and **the model decides** whether and when to call each tool,
              with which arguments. APEX runs it, sends back the result and the loop continues until the final answer.

            **Native types**
            | Type | Implementation | Typical use |
            |---|---|---|
            | Retrieve Data | SQL Query, Function Body (returns CLOB) or static text | Look up orders, policies, catalog |
            | Execute Server-side Code | PL/SQL or JavaScript (MLE) | Create records, start a workflow, send e-mail |
            | Execute Client-side Code | Browser JavaScript, in an async context | Ask for confirmation, use browser APIs |

            You can also build reusable tools as **Generative AI Tool** plug-ins. Parameters support VARCHAR2, CLOB, NUMBER and
            BOOLEAN; in SQL/PL/SQL they are bind variables («:ORDER_ID») and in JavaScript they live in «this.data.ORDER_ID».

            ## Example: an orders agent
            On Demand tool «get_order» (Retrieve Data, SQL Query), parameter «ORDER_ID» (NUMBER, required), description
            "Returns status, expected date and items of an order of the signed-in customer":

            ~~~sql
            select o.order_no, o.status, o.expected_date, i.product, i.quantity
              from orders o
              join order_items i on i.order_id = o.id
             where o.id = :ORDER_ID
               and o.customer_login = :APP_USER   -- never trust only the argument sent by the model
            ~~~

            On Demand tool «cancel_order» (Execute Server-side Code, PL/SQL), with **Requires Confirmation** enabled:

            ~~~plsql
            begin
                orders_pkg.cancel(p_id => :ORDER_ID, p_user => :APP_USER);
                apex_ai.set_tool_result(
                    p_result               => 'Order ' || :ORDER_ID || ' cancelled.',
                    p_notification_message => 'Order cancelled successfully.',
                    p_notification_type    => apex_ai.c_notification_type_success );
            end;
            ~~~
            Without «SET_TOOL_RESULT», the default result sent to the model is "success".

            On Demand tool «confirm_send» (Execute Client-side Code), parameter «EMAIL»:

            ~~~js
            var email = this.data.EMAIL;
            return new Promise(function (resolve) {
                apex.message.confirm('Send a copy of the invoice to ' + email + '?', function (ok) {
                    resolve(ok ? 'User confirmed sending.' : 'User declined sending.');
                });
            });
            ~~~
            The returned text becomes the tool result. Client-side tools only work when the conversation starts in the browser
            (*Show AI Assistant* or the *Generate Text with AI* DA).

            ## Guardrails and control
            - **Requires Confirmation** (On Demand): the user approves before execution, with a configurable title, message
              (substitutions supported) and button labels. If the user denies, the model receives "user denied". Agents with such
              tools can only be used by UI components — not through «APEX_AI».
            - **Server-side Condition**: includes *Any User Prompt contains* and *Last User Prompt contains*, plus the
              «:APEX$AI_LAST_USER_PROMPT» and «:APEX$AI_ALL_USER_PROMPTS» binds.
            - **Authorization Scheme** and **Build Option** per tool.
            - **Maximum Tokens** on SQL-based Retrieve Data: rows that would exceed the limit are skipped.
            - **Notification**: a message shown to the user when the tool completes.
            - By default, tool results reach the model **wrapped by a prompt-injection guard**; «p_is_safe => true» turns that off —
              use it only for fully trusted content.

            :::atencao The model is not a trusted user
            Tool arguments are written by the LLM — which may have been manipulated by user or document text (*prompt
            injection*). Validate parameters, always filter by the signed-in user, use bind variables and keep destructive actions
            behind approval and Authorization Schemes.
            :::

            :::dica RAG: Augment or On Demand?
            Oracle suggests considering migrating old RAG Sources to **On Demand** tools: the model fetches only what it needs, the
            agent gets simpler and token usage drops.
            :::

            ## Metadata
            ~~~sql
            -- Find the AI Agent views available in your release
            select view_name, comments
              from apex_dictionary
             where view_name like '%AI_AGENT%'
               and column_id = 0
            ~~~
        `
    }
});

DOC.topico({
    id: 'chat-e-geracao-de-texto',
    cat: 'ia',
    nivel: 'intermediario',
    desde: '24.1',
    links: [
        { t: 'App Builder Guide — About Including Generative AI in Applications', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-including-generative-ai-in-applications.html' },
        { t: 'App Builder Guide — Creating a Dynamic Action to Display AI Assistant', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-a-dynamic-action-to-display-ai-assistant.html' },
        { t: 'App Builder Guide — Creating a Page Process to Generate Text with AI', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-a-page-process-to-generate-text-with-ai.html' }
    ],
    relacionados: ['dynamic-actions', 'ai-agents-e-rag', 'apex-ai-pacote', 'workflow', 'processos-computacoes-validacoes'],
    pt: {
        titulo: 'Chat e geração de texto na aplicação',
        resumo: 'Show AI Assistant (chat) e Generate Text with AI (DA, processo e atividade de workflow): atributos, exemplos e cuidados de UX e consentimento.',
        tags: ['Show AI Assistant', 'Generate Text with AI', 'chat', 'chatbot', 'assistente', 'Dynamic Action', 'processo', 'workflow', 'resumo', 'tradução', 'Items to Submit', 'Quick Actions', 'consentimento'],
        conteudo: `
            Há três formas declarativas de colocar IA generativa nas páginas: **Show AI Assistant** (conversa), **Generate Text with
            AI** (resposta única) e o Interactive Report com linguagem natural (veja [linguagem natural e vetores](#/topico/select-ai-e-vetores)).
            Todas exigem um Generative AI Service e o serviço padrão definido em *Edit Application Definition → AI*.

            ## Show AI Assistant (24.1)
            Dynamic Action que abre um **chat**, em diálogo ou embutido na página (*Display As: Dialog* ou *Inline*).

            | Atributo | Para que serve |
            |---|---|
            | Agent (ou Service + System Prompt + Welcome Message) | Quem a IA é e como se apresenta; no 26.1 prefira um AI Agent |
            | Items to Submit (26.1) | Itens enviados ao servidor, disponíveis no system prompt e nas tools |
            | Initial Prompt | Primeira mensagem "do usuário", vinda de um item ou de JavaScript |
            | Immediate Action Prompt | Junto do Initial Prompt, gera uma resposta logo ao abrir |
            | Quick Actions | Frases prontas que o usuário clica para enviar |
            | Use Response | Leva a resposta para um item (com um botão, ex.: "Aplicar sugestão") ou para código JavaScript |

            O exemplo clássico da documentação é um botão **Sugerir salário** no formulário de funcionário: um item oculto monta o
            contexto («Departamento: &P9_DEPARTMENT. Salário atual: &P9_SAL.»), o system prompt descreve as regras de reajuste por
            departamento e *Use Response* do tipo Item devolve o valor para «P9_SAL» quando o usuário clica em "Apply suggestion".

            Em *Shared Components → Component Settings → Show AI Assistant* você define os avatares da IA e do usuário (ícone,
            imagem ou iniciais).

            ## Generate Text with AI
            Chamada **única**, sem histórico — ideal para resumir, traduzir, extrair palavras-chave, classificar ou rascunhar e-mails.

            | Forma | Desde | Quando usar |
            |---|---|---|
            | Dynamic Action | 24.2 | Resultado imediato na tela, sem submit |
            | Processo de página | 26.1 | No processamento da página; equivalente declarativo de «APEX_AI.GENERATE» |
            | Atividade de workflow | 26.1 | Etapas automáticas, ex.: resumir uma solicitação antes da aprovação |

            Na DA você configura **Agent** (ou o serviço padrão), **System Prompt** (só na DA), **Input Value** (item ou expressão
            JavaScript) e **Use Response** (item ou código JavaScript; com item, escolhe se dispara o evento change):

            ~~~texto
            DA "Gerar resumo"  (When: Click no botão RESUMIR)
              Action ........ Generate Text with AI
              System Prompt . Resuma o chamado abaixo em até 3 frases, em português,
                              destacando o problema e o impacto para o cliente.
              Input Value ... Item: P5_DESCRICAO
              Use Response .. Item: P5_RESUMO
            ~~~

            No processo e no workflow a resposta pode ser grande: use **Session State Data Type = CLOB** no item de destino (ou uma
            variável de workflow CLOB).

            :::atencao Agentes JSON e aprovação
            Esses componentes só aceitam agentes com Response Format **Text** — para JSON estruturado use «APEX_AI.GENERATE». Já os
            agentes com tools que exigem aprovação do usuário funcionam **apenas** nos componentes de UI.
            :::

            ## Quando ir para PL/SQL
            Use «APEX_AI» quando precisar de saída JSON, anexos (imagens, PDFs), pós-processamento antes de gravar, log próprio ou
            execução em jobs e automations:

            ~~~plsql
            -- Processo "Execute Code" com tratamento de erro amigável
            begin
                :P5_RESUMO := apex_ai.generate(
                                  p_agent_static_id => 'resumidor_chamados',
                                  p_prompt          => :P5_DESCRICAO );
            exception
                when others then
                    apex_debug.error('Falha na IA: %s', sqlerrm);
                    apex_error.add_error(
                        p_message          => 'Não foi possível gerar o resumo agora. Tente novamente.',
                        p_display_location => apex_error.c_inline_in_notification );
            end;
            ~~~

            ## Consentimento e UX
            - Configure a **Consent Message** da aplicação: o usuário aceita uma vez e a escolha fica salva como preferência.
              «APEX_AI.IS_USER_CONSENT_NEEDED» permite adaptar a interface; «REVOKE_USER_CONSENT» desfaz.
            - Deixe claro na tela que o conteúdo foi gerado por IA e permita editar antes de salvar.
            - Respostas levam segundos: mostre indicador de processamento e evite cliques repetidos no botão.
            - Escreva system prompts curtos e objetivos, com o formato de saída esperado e o que a IA **não** deve fazer.

            :::dica Contexto sem concatenar
            Use *Items to Submit* (26.1) para levar valores da página ao system prompt («&P5_PRODUTO.») em vez de colar tudo no
            texto do usuário. Lembre que o conteúdo desses itens também é enviado ao provedor.
            :::
        `
    },
    en: {
        titulo: 'Chat and text generation in your app',
        resumo: 'Show AI Assistant (chat) and Generate Text with AI (DA, page process and workflow activity): attributes, examples, UX and consent.',
        tags: ['Show AI Assistant', 'Generate Text with AI', 'chat', 'chatbot', 'assistant', 'Dynamic Action', 'process', 'workflow', 'summary', 'translation', 'Items to Submit', 'Quick Actions', 'consent'],
        conteudo: `
            There are three declarative ways to put generative AI on your pages: **Show AI Assistant** (conversation), **Generate
            Text with AI** (single answer) and natural-language Interactive Reports (see [natural language and vectors](#/topico/select-ai-e-vetores)).
            All of them need a Generative AI Service and the default service set under *Edit Application Definition → AI*.

            ## Show AI Assistant (24.1)
            A dynamic action that opens a **chat**, either as a dialog or embedded in the page (*Display As: Dialog* or *Inline*).

            | Attribute | Purpose |
            |---|---|
            | Agent (or Service + System Prompt + Welcome Message) | Who the AI is and how it introduces itself; in 26.1 prefer an AI Agent |
            | Items to Submit (26.1) | Items sent to the server, available in the system prompt and in tools |
            | Initial Prompt | First "user" message, taken from an item or from JavaScript |
            | Immediate Action Prompt | Together with the Initial Prompt, produces an answer right when the chat opens |
            | Quick Actions | Ready-made phrases the user clicks to send |
            | Use Response | Sends the answer to an item (with a button, e.g. "Apply suggestion") or to JavaScript code |

            The classic documentation example is a **Suggest Salary** button on an employee form: a hidden item builds the context
            («Department: &P9_DEPARTMENT. Current salary: &P9_SAL.»), the system prompt describes the raise rules per department
            and an Item-type *Use Response* pushes the value into «P9_SAL» when the user clicks "Apply suggestion".

            Under *Shared Components → Component Settings → Show AI Assistant* you set the AI and user avatars (icon, image or
            initials).

            ## Generate Text with AI
            A **single** call with no history — ideal to summarize, translate, extract keywords, classify or draft e-mails.

            | Form | Since | When to use |
            |---|---|---|
            | Dynamic Action | 24.2 | Immediate result on screen, no submit |
            | Page process | 26.1 | During page processing; the declarative equivalent of «APEX_AI.GENERATE» |
            | Workflow activity | 26.1 | Automated steps, e.g. summarizing a request before approval |

            In the DA you set the **Agent** (or the default service), **System Prompt** (DA only), **Input Value** (item or JavaScript
            expression) and **Use Response** (item or JavaScript code; with an item, you choose whether to fire the change event):

            ~~~texto
            DA "Generate summary"  (When: Click on button SUMMARIZE)
              Action ........ Generate Text with AI
              System Prompt . Summarize the ticket below in at most 3 sentences,
                              highlighting the problem and the customer impact.
              Input Value ... Item: P5_DESCRIPTION
              Use Response .. Item: P5_SUMMARY
            ~~~

            In the process and in workflows the answer may be long: use **Session State Data Type = CLOB** on the target item (or a
            CLOB workflow variable).

            :::atencao JSON agents and approval
            These components only accept agents whose Response Format is **Text** — for structured JSON use «APEX_AI.GENERATE».
            Conversely, agents with tools that require user approval work **only** in UI components.
            :::

            ## When to switch to PL/SQL
            Use «APEX_AI» when you need JSON output, attachments (images, PDFs), post-processing before saving, custom logging or
            execution in jobs and automations:

            ~~~plsql
            -- "Execute Code" process with friendly error handling
            begin
                :P5_SUMMARY := apex_ai.generate(
                                   p_agent_static_id => 'ticket_summarizer',
                                   p_prompt          => :P5_DESCRIPTION );
            exception
                when others then
                    apex_debug.error('AI call failed: %s', sqlerrm);
                    apex_error.add_error(
                        p_message          => 'The summary could not be generated right now. Please try again.',
                        p_display_location => apex_error.c_inline_in_notification );
            end;
            ~~~

            ## Consent and UX
            - Configure the application's **Consent Message**: users accept once and the choice is stored as a preference.
              «APEX_AI.IS_USER_CONSENT_NEEDED» lets you adapt the UI; «REVOKE_USER_CONSENT» undoes it.
            - Make it clear on screen that the content is AI-generated and let users edit before saving.
            - Answers take seconds: show a processing indicator and prevent repeated clicks on the button.
            - Keep system prompts short and objective, with the expected output format and what the AI must **not** do.

            :::dica Context without concatenation
            Use *Items to Submit* (26.1) to bring page values into the system prompt («&P5_PRODUCT.») instead of pasting everything
            into the user text. Remember that the content of those items is also sent to the provider.
            :::
        `
    }
});

DOC.topico({
    id: 'select-ai-e-vetores',
    cat: 'ia',
    nivel: 'avancado',
    desde: '24.2',
    links: [
        { t: 'App Builder Guide — Adding Natural Language Support to Interactive Reports', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/adding-natural-language-support-to-interactive-reports.html' },
        { t: 'App Builder Guide — Creating an Oracle Vector Search', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-an-oracle-vector-search.html' },
        { t: 'Autonomous AI Database — DBMS_CLOUD_AI (Select AI)', u: 'https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/dbms-cloud-ai-package.html' }
    ],
    relacionados: ['interactive-report', 'search-configurations', 'apex-ai-pacote', 'servicos-de-ia-generativa', 'sql-injection'],
    pt: {
        titulo: 'Select AI, busca vetorial e linguagem natural',
        resumo: 'Três jeitos de "conversar com os dados": Interactive Report em linguagem natural (26.1), Oracle Vector Search (24.2) e Select AI do banco.',
        tags: ['Select AI', 'DBMS_CLOUD_AI', 'NL2SQL', 'NL2IR', 'linguagem natural', 'Search with AI', 'vector search', 'busca vetorial', 'busca semântica', 'VECTOR', 'VECTOR_DISTANCE', 'embeddings', 'Vector Provider', 'ONNX', '26ai', '23ai'],
        conteudo: `
            "Conversar com os dados" pode significar coisas bem diferentes. No ecossistema APEX + Oracle Database há três caminhos:

            | Recurso | Onde vive | O que faz | Executa SQL gerado por IA? |
            |---|---|---|---|
            | Interactive Report com linguagem natural (NL2IR) | APEX 26.1 | Traduz o pedido em filtros, destaques, quebras, gráficos e pivots nativos do IR | Não |
            | Oracle Vector Search | Banco 26ai + APEX 24.2+ | Busca por **significado** usando embeddings | Não |
            | Select AI («DBMS_CLOUD_AI») | Autonomous AI Database | Converte perguntas em SQL e pode executar, explicar ou narrar o resultado | Sim (ação runsql) |

            ## Interactive Report em linguagem natural (26.1)
            Na região IR, aba *Attributes*, ligue **Generative AI → Natural Language Support**. O modo de busca padrão passa a ser
            **Search with AI** (o *Row Search* tradicional continua disponível). Para melhorar a precisão:
            - **Report Context**: uma descrição curta do que o relatório mostra.
            - **Column Context** em cada coluna: significado, usos comuns e dicas para a IA.
            - **Reference Data** (LOV de Shared Components ou SQL Query): os valores válidos, para a IA acertar nomes e status.

            O usuário escreve *"projetos do Tyson King com custo acima de 5000, destaque em amarelo"* e o IR aplica filtro e destaque
            nativos, que ele pode ver, ajustar e salvar. Funciona para comandos de exibição ("Mostre...", "Agrupe por...",
            "Destaque..."); perguntas abertas ("por que as vendas caíram?") não são o objetivo.

            ## Busca vetorial
            Embeddings são vetores numéricos que representam o significado de um texto: textos parecidos ficam "próximos". O tipo
            **VECTOR** chegou com o Oracle Database 23ai (hoje Oracle AI Database 26ai), e o APEX usa **Vector Providers**
            (*Workspace Utilities*) para gerar embeddings: um Generative AI Service (OCI, OpenAI, Cohere, Gemini ou genérico
            compatível com OpenAI), um **modelo ONNX no banco** ou uma **função PL/SQL** sua.

            ~~~sql
            -- 1. Coluna vetorial (dimensão = a do seu modelo de embeddings) e índice
            alter table artigos add (embedding vector(1024, float32));

            -- índice HNSW (em memória): exige o Vector Pool configurado (VECTOR_MEMORY_SIZE)
            create vector index artigos_vec_ix on artigos (embedding)
                organization inmemory neighbor graph
                distance cosine
                with target accuracy 95;
            ~~~

            ~~~plsql
            -- 2. Gerar os embeddings com um Vector Provider (exige sessão APEX, ex.: SQL Commands)
            update artigos
               set embedding = apex_ai.get_vector_embeddings(
                                   p_value             => titulo || ' ' || resumo,
                                   p_service_static_id => 'VP_EMBEDDINGS' );
            ~~~

            ~~~sql
            -- 3. Consulta semântica numa região (P1_BUSCA = texto digitado)
            with consulta as (
                select /*+ materialize */
                       apex_ai.get_vector_embeddings(
                           p_value             => :P1_BUSCA,
                           p_service_static_id => 'VP_EMBEDDINGS' ) as vetor
                  from dual )
            select a.id, a.titulo,
                   vector_distance(a.embedding, c.vetor, cosine) as distancia
              from artigos a, consulta c
             order by distancia
             fetch approx first 10 rows only
            ~~~

            Com um modelo ONNX carregado no banco, tudo fica local: «vector_embedding(meu_modelo using :P1_BUSCA as data)».
            Atenção: a pergunta precisa ser convertida **pelo mesmo modelo** que gerou os vetores da tabela.

            Sem escrever SQL, crie uma **Search Configuration** do tipo *Oracle Vector Search* (Vector Provider, tabela ou query,
            coluna VECTOR, título e descrição) e uma página *Search*: o APEX ordena por similaridade e permite ajustar métrica de
            distância, distância máxima e número de resultados.

            ## Select AI
            Recurso do **Autonomous AI Database** (pacote «DBMS_CLOUD_AI»): você cria um *AI profile* com provedor, credencial e lista
            de objetos, e faz perguntas em linguagem natural. Não há componente declarativo no APEX, mas a documentação do Select AI
            indica «DBMS_CLOUD_AI.GENERATE» justamente para ambientes sem estado como o APEX.

            ~~~plsql
            -- Uma vez, como dono dos dados
            begin
                dbms_cloud_ai.create_profile(
                    profile_name => 'VENDAS_IA',
                    attributes   => '{"provider": "oci",
                                      "credential_name": "GENAI_CRED",
                                      "object_list": [{"owner": "VENDAS", "name": "PEDIDOS"},
                                                      {"owner": "VENDAS", "name": "CLIENTES"}]}' );
            end;
            ~~~

            ~~~plsql
            -- Processo da página: gera o SQL, mas não executa
            begin
                :P1_SQL := dbms_cloud_ai.generate(
                               prompt       => :P1_PERGUNTA,
                               profile_name => 'VENDAS_IA',
                               action       => 'showsql' );
            end;
            ~~~
            Outras ações: «runsql», «explainsql», «narrate», «chat», «summarize» e «translate».

            :::atencao SQL gerado é código não revisado
            A ação «runsql» executa SQL escrito por um modelo. Use um usuário com **acesso somente leitura** e lista de objetos
            restrita, prefira «showsql» com revisão (ou «narrate») e nunca rode o texto retornado com «EXECUTE IMMEDIATE» sem
            validação. Se o objetivo é só filtrar um relatório, o NL2IR é mais seguro — ele não gera SQL.
            :::

            :::dica Qual escolher?
            Usuários que querem fatiar um relatório: **NL2IR**. Busca em textos livres (chamados, artigos, contratos): **Vector
            Search**. Perguntas analíticas ad hoc sobre várias tabelas, com governança: **Select AI**. Para RAG em um chat, combine
            Vector Search com uma tool *Retrieve Data* de um [AI Agent](#/topico/ai-agents-e-rag).
            :::
        `
    },
    en: {
        titulo: 'Select AI, vector search and natural language',
        resumo: 'Three ways to "talk to your data": natural-language Interactive Reports (26.1), Oracle Vector Search (24.2) and database Select AI.',
        tags: ['Select AI', 'DBMS_CLOUD_AI', 'NL2SQL', 'NL2IR', 'natural language', 'Search with AI', 'vector search', 'semantic search', 'VECTOR', 'VECTOR_DISTANCE', 'embeddings', 'Vector Provider', 'ONNX', '26ai', '23ai'],
        conteudo: `
            "Talking to your data" can mean very different things. In the APEX + Oracle Database world there are three paths:

            | Feature | Where it lives | What it does | Runs AI-generated SQL? |
            |---|---|---|---|
            | Natural-language Interactive Report (NL2IR) | APEX 26.1 | Turns the request into native IR filters, highlights, breaks, charts and pivots | No |
            | Oracle Vector Search | 26ai database + APEX 24.2+ | Search by **meaning** using embeddings | No |
            | Select AI («DBMS_CLOUD_AI») | Autonomous AI Database | Turns questions into SQL and can run, explain or narrate the result | Yes (runsql action) |

            ## Natural-language Interactive Reports (26.1)
            In the IR region, *Attributes* tab, turn on **Generative AI → Natural Language Support**. The default search mode becomes
            **Search with AI** (the traditional *Row Search* is still available). To improve accuracy:
            - **Report Context**: a short description of what the report shows.
            - **Column Context** on each column: meaning, common uses and hints for the AI.
            - **Reference Data** (Shared Components LOV or SQL Query): valid values, so the AI gets names and statuses right.

            The user types *"projects assigned to Tyson King with cost above 5000, highlight in yellow"* and the IR applies a native
            filter and highlight that the user can see, adjust and save. It works for display commands ("Show...", "Group by...",
            "Highlight..."); open-ended questions ("why are sales down?") are not the goal.

            ## Vector search
            Embeddings are numeric vectors that represent the meaning of a text: similar texts end up "close". The **VECTOR** type
            arrived with Oracle Database 23ai (now Oracle AI Database 26ai), and APEX uses **Vector Providers** (*Workspace
            Utilities*) to produce embeddings: a Generative AI Service (OCI, OpenAI, Cohere, Gemini or generic OpenAI-compatible), an
            **in-database ONNX model** or your own **PL/SQL function**.

            ~~~sql
            -- 1. Vector column (dimensions = those of your embedding model) and index
            alter table articles add (embedding vector(1024, float32));

            -- HNSW (in-memory) index: requires the Vector Pool to be configured (VECTOR_MEMORY_SIZE)
            create vector index articles_vec_ix on articles (embedding)
                organization inmemory neighbor graph
                distance cosine
                with target accuracy 95;
            ~~~

            ~~~plsql
            -- 2. Generate embeddings with a Vector Provider (needs an APEX session, e.g. SQL Commands)
            update articles
               set embedding = apex_ai.get_vector_embeddings(
                                   p_value             => title || ' ' || abstract,
                                   p_service_static_id => 'VP_EMBEDDINGS' );
            ~~~

            ~~~sql
            -- 3. Semantic query in a region (P1_SEARCH = text typed by the user)
            with query_vec as (
                select /*+ materialize */
                       apex_ai.get_vector_embeddings(
                           p_value             => :P1_SEARCH,
                           p_service_static_id => 'VP_EMBEDDINGS' ) as vec
                  from dual )
            select a.id, a.title,
                   vector_distance(a.embedding, q.vec, cosine) as distance
              from articles a, query_vec q
             order by distance
             fetch approx first 10 rows only
            ~~~

            With an ONNX model loaded in the database everything stays local: «vector_embedding(my_model using :P1_SEARCH as data)».
            Note: the search text must be embedded **by the same model** that produced the table vectors.

            Without writing SQL, create a **Search Configuration** of type *Oracle Vector Search* (Vector Provider, table or query,
            VECTOR column, title and description) and a *Search* page: APEX orders by similarity and lets you tune the distance
            metric, maximum distance and number of results.

            ## Select AI
            A feature of **Autonomous AI Database** (the «DBMS_CLOUD_AI» package): you create an *AI profile* with provider,
            credential and object list, then ask questions in natural language. There is no declarative APEX component, but the
            Select AI documentation points to «DBMS_CLOUD_AI.GENERATE» precisely for stateless environments such as APEX.

            ~~~plsql
            -- Once, as the data owner
            begin
                dbms_cloud_ai.create_profile(
                    profile_name => 'SALES_AI',
                    attributes   => '{"provider": "oci",
                                      "credential_name": "GENAI_CRED",
                                      "object_list": [{"owner": "SALES", "name": "ORDERS"},
                                                      {"owner": "SALES", "name": "CUSTOMERS"}]}' );
            end;
            ~~~

            ~~~plsql
            -- Page process: generate the SQL but do not run it
            begin
                :P1_SQL := dbms_cloud_ai.generate(
                               prompt       => :P1_QUESTION,
                               profile_name => 'SALES_AI',
                               action       => 'showsql' );
            end;
            ~~~
            Other actions: «runsql», «explainsql», «narrate», «chat», «summarize» and «translate».

            :::atencao Generated SQL is unreviewed code
            The «runsql» action executes SQL written by a model. Use a **read-only** user with a restricted object list, prefer
            «showsql» with review (or «narrate») and never run the returned text with «EXECUTE IMMEDIATE» without validation. If the
            goal is just filtering a report, NL2IR is safer — it does not generate SQL.
            :::

            :::dica Which one?
            Users who want to slice a report: **NL2IR**. Searching free text (tickets, articles, contracts): **Vector Search**.
            Ad-hoc analytical questions across several tables, with governance: **Select AI**. For RAG in a chat, combine Vector
            Search with a *Retrieve Data* tool in an [AI Agent](#/topico/ai-agents-e-rag).
            :::
        `
    }
});

DOC.topico({
    id: 'blueprints-e-spec-driven',
    cat: 'ia',
    nivel: 'avancado',
    desde: '26.1',
    links: [
        { t: 'App Builder Guide — Creating an App Using AI and Spec-Driven Development', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-an-app-using-spec-driven-development.html' },
        { t: 'APEX_GENDEV.PROCESS_BLUEPRINT (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_GENDEV.PROCESS_BLUEPRINT-Procedure.html' },
        { t: 'GitHub oracle/apex — Blueprints 26.1 (prompt e exemplo)', u: 'https://github.com/oracle/apex/tree/26.1/blueprints' }
    ],
    relacionados: ['apexlang', 'create-app-wizard', 'apex-assistant', 'sqlcl-projects-e-cicd', 'controle-de-versao'],
    pt: {
        titulo: 'Blueprints e desenvolvimento orientado a especificação',
        resumo: 'No 26.1, agentes de IA geram um blueprint em Markdown a partir de requisitos e do schema; o APEX importa e cria a app (APEX_GENDEV).',
        tags: ['blueprint', 'Application Blueprint', 'spec-driven development', 'SDD', 'APEX_GENDEV', 'PROCESS_BLUEPRINT', 'Describe Tables', 'APEX_DB_DICTIONARY', 'APEXlang', 'agente de IA', 'Claude Code', 'Codex', 'scaffold', 'Markdown'],
        conteudo: `
            **Spec-driven development (SDD)** é desenvolver a partir de uma **especificação** que vira a fonte da verdade. Em vez de
            pedir "faça uma app" num chat, você escreve os requisitos, descreve o banco e deixa um agente de IA gerar um artefato
            revisável. No APEX 26.1 esse artefato é o **Blueprint**: um arquivo **Markdown** que descreve exatamente o que o APEX
            deve construir — páginas, navegação, regiões, relatórios, formulários, gráficos, filtros, ações e comportamento.

            ## O fluxo em três fases
            1. **Entradas**
               - *Especificação funcional*: o que a app faz, para quem, fluxos e telas.
               - *Metadados do schema*: tabelas, colunas, relacionamentos, comentários e anotações — gerados com o **Describe Tables**.
               - *System prompt*: o prompt oficial de geração de blueprints, publicado pela Oracle no repositório oracle/apex
                 (pasta blueprints), com padrões de página e regras.
            2. **Geração**: um agente de código (Claude Code, Codex etc.) combina as entradas e produz o blueprint. Como é legível,
               você revisa o desenho da app **antes** de criar qualquer coisa.
            3. **Importação**: *App Builder → Import*, **File Type = Application Blueprint**; escolha o Generative AI Service padrão,
               o parsing schema e o ID da aplicação. O APEX cria a aplicação base, que você continua no App Builder.

            ## Como é um blueprint
            Trecho ilustrativo, seguindo a estrutura do exemplo oficial *Order Entry*:

            ~~~texto
            # Application Definition
            - Name: Central de Chamados
            - Home Page: Page 1
            ## Pages
            ### Page 2: Chamados
            - Pattern: smart-filter
            - Page Mode: standard
            #### Regions
            ##### Region: Chamados
            - Component:
              - Component Type: Classic Report
            - Data Source:
              - Type: Table
              - Name: CHAMADOS
              - Primary Keys: CHAMADO_ID
            ~~~

            ## Metadados prontos para LLM: Describe Tables
            *SQL Workshop → Utilities → Describe Tables* gera uma descrição em Markdown ou texto (colunas, tipos, comentários,
            anotações e, opcionalmente, constraints e índices) para copiar ou baixar. O mesmo pela API «APEX_DB_DICTIONARY»
            (26.1), que usa «DBMS_DEVELOPER» — disponível no Oracle AI Database 26ai e em patches recentes do 19c:

            ~~~plsql
            declare
                l_md clob;
            begin
                if apex_db_dictionary.is_supported then
                    l_md := apex_db_dictionary.get_table_info(
                                p_table_names         => 'CHAMADOS, CLIENTES, ATENDENTES',
                                p_include_constraints => true,
                                p_include_indexes     => false,
                                p_format              => apex_db_dictionary.c_markdown );
                end if;
            end;
            ~~~

            Comentários de tabela e coluna («COMMENT ON») e anotações viram contexto para a IA: quanto melhor documentado o schema,
            melhor o blueprint.

            ## Do blueprint ao APEXlang
            O pacote **«APEX_GENDEV»** expõe o processamento: «PROCESS_BLUEPRINT» analisa o blueprint e devolve um ZIP com os
            arquivos **APEXlang** da aplicação — ou um log JSON com os erros.

            ~~~plsql
            declare
                l_blueprint clob;
                l_log       clob;
                l_zip       blob;
            begin
                select conteudo into l_blueprint from meus_blueprints where id = 1;

                apex_gendev.process_blueprint(
                    p_blueprint    => l_blueprint,
                    p_parsing_log  => l_log,
                    p_apexlang_zip => l_zip );

                if l_log is not null then
                    raise_application_error(-20001,
                        'Blueprint inválido: ' || dbms_lob.substr(l_log, 2000, 1));
                end if;
                -- l_zip pode ser baixado com APEX_HTTP.DOWNLOAD, versionado no Git ou importado pelo SQLcl
            end;
            ~~~

            ## Blueprint, APEXlang e JSON Blueprint
            | Artefato | O que é | Quem escreve |
            |---|---|---|
            | Blueprint (Markdown, 26.1) | Especificação de alto nível da app | Agente de IA, a partir de requisitos e schema |
            | APEXlang (.apx, 26.1) | Definição completa da app, legível e versionável | Export do APEX ou agentes de código |
            | JSON Application Blueprint | Rascunho interno do Create App Wizard (recurso antigo) | O próprio wizard |

            Gerar um blueprint costuma ser **mais rápido e gastar menos tokens** do que gerar APEXlang direto, porque ele codifica
            padrões de página comuns. Com a app criada, agentes podem continuar no [APEXlang](#/topico/apexlang): a Oracle publica
            *skills* para agentes no repositório oracle/skills, que o SQLcl sincroniza — e o SQLcl também atua como servidor MCP.

            :::dica Itere pela especificação
            Se a app gerada não ficou boa, corrija os **requisitos** ou os **comentários do schema** e gere de novo, em vez de remendar
            o blueprint à mão. Comece com poucas páginas e, se a importação acusar erro, devolva a mensagem ao agente pedindo a
            correção. Para a geração final, use um modelo forte em raciocínio e contexto longo.
            :::

            :::atencao Ponto de partida, não produto final
            A aplicação gerada é um *scaffold*. Revise autenticação, autorização, Session State Protection, validações e performance
            antes de levar para produção — e mantenha requisitos, blueprint e APEXlang no controle de versão.
            :::
        `
    },
    en: {
        titulo: 'Blueprints and spec-driven development',
        resumo: 'In 26.1, AI agents generate a Markdown blueprint from requirements and schema metadata; APEX imports it and builds the app (APEX_GENDEV).',
        tags: ['blueprint', 'Application Blueprint', 'spec-driven development', 'SDD', 'APEX_GENDEV', 'PROCESS_BLUEPRINT', 'Describe Tables', 'APEX_DB_DICTIONARY', 'APEXlang', 'AI agent', 'Claude Code', 'Codex', 'scaffold', 'Markdown'],
        conteudo: `
            **Spec-driven development (SDD)** means building from a **specification** that becomes the source of truth. Instead of
            asking a chat to "make an app", you write the requirements, describe the database and let an AI agent produce a
            reviewable artifact. In APEX 26.1 that artifact is the **Blueprint**: a **Markdown** file describing exactly what APEX
            should build — pages, navigation, regions, reports, forms, charts, filters, actions and page behavior.

            ## The three-phase flow
            1. **Inputs**
               - *Functional specification*: what the app does, for whom, flows and screens.
               - *Schema metadata*: tables, columns, relationships, comments and annotations — produced with **Describe Tables**.
               - *System prompt*: the official blueprint-generation prompt published by Oracle in the oracle/apex repository
                 (blueprints folder), with page patterns and rules.
            2. **Generation**: a coding agent (Claude Code, Codex and others) combines the inputs and produces the blueprint. Since
               it is human-readable, you review the app design **before** anything is created.
            3. **Import**: *App Builder → Import*, **File Type = Application Blueprint**; choose the default Generative AI Service,
               the parsing schema and the application ID. APEX creates the baseline application, which you keep refining in App Builder.

            ## What a blueprint looks like
            An illustrative excerpt following the structure of the official *Order Entry* example:

            ~~~texto
            # Application Definition
            - Name: Help Desk
            - Home Page: Page 1
            ## Pages
            ### Page 2: Tickets
            - Pattern: smart-filter
            - Page Mode: standard
            #### Regions
            ##### Region: Tickets
            - Component:
              - Component Type: Classic Report
            - Data Source:
              - Type: Table
              - Name: TICKETS
              - Primary Keys: TICKET_ID
            ~~~

            ## LLM-ready metadata: Describe Tables
            *SQL Workshop → Utilities → Describe Tables* produces a Markdown or plain-text description (columns, data types,
            comments, annotations and, optionally, constraints and indexes) to copy or download. The same is available through the
            «APEX_DB_DICTIONARY» API (26.1), which relies on «DBMS_DEVELOPER» — available on Oracle AI Database 26ai and recent 19c
            patches:

            ~~~plsql
            declare
                l_md clob;
            begin
                if apex_db_dictionary.is_supported then
                    l_md := apex_db_dictionary.get_table_info(
                                p_table_names         => 'TICKETS, CUSTOMERS, AGENTS',
                                p_include_constraints => true,
                                p_include_indexes     => false,
                                p_format              => apex_db_dictionary.c_markdown );
                end if;
            end;
            ~~~

            Table and column comments («COMMENT ON») and annotations become context for the AI: the better documented the schema,
            the better the blueprint.

            ## From blueprint to APEXlang
            The **«APEX_GENDEV»** package exposes the processing: «PROCESS_BLUEPRINT» parses the blueprint and returns a ZIP with the
            application's **APEXlang** files — or a JSON log listing the errors.

            ~~~plsql
            declare
                l_blueprint clob;
                l_log       clob;
                l_zip       blob;
            begin
                select content into l_blueprint from my_blueprints where id = 1;

                apex_gendev.process_blueprint(
                    p_blueprint    => l_blueprint,
                    p_parsing_log  => l_log,
                    p_apexlang_zip => l_zip );

                if l_log is not null then
                    raise_application_error(-20001,
                        'Invalid blueprint: ' || dbms_lob.substr(l_log, 2000, 1));
                end if;
                -- l_zip can be downloaded with APEX_HTTP.DOWNLOAD, committed to Git or imported with SQLcl
            end;
            ~~~

            ## Blueprint, APEXlang and JSON Blueprint
            | Artifact | What it is | Who writes it |
            |---|---|---|
            | Blueprint (Markdown, 26.1) | High-level specification of the app | An AI agent, from requirements and schema |
            | APEXlang (.apx, 26.1) | Complete, readable, versionable app definition | APEX export or coding agents |
            | JSON Application Blueprint | Internal draft of the Create App Wizard (older feature) | The wizard itself |

            Generating a blueprint is usually **faster and cheaper in tokens** than generating APEXlang directly, because it encodes
            common page patterns. Once the app exists, agents can keep working in [APEXlang](#/topico/apexlang): Oracle publishes
            agent *skills* in the oracle/skills repository, which SQLcl can sync — and SQLcl also acts as an MCP server.

            :::dica Iterate through the specification
            If the generated app is not right, fix the **requirements** or the **schema comments** and regenerate, instead of
            patching the blueprint by hand. Start with a few pages and, if the import reports an error, give the message back to the
            agent and ask for a fix. For the final generation, use a model strong in reasoning and long context.
            :::

            :::atencao A starting point, not the final product
            The generated application is a *scaffold*. Review authentication, authorization, Session State Protection,
            validations and performance before going to production — and keep requirements, blueprint and APEXlang under version
            control.
            :::
        `
    }
});
