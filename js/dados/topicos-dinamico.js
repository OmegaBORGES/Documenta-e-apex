DOC.topico({
    id: 'dynamic-actions',
    cat: 'dinamico',
    nivel: 'basico',
    desde: '4.0',
    links: [
        { t: 'App Builder Guide — Understanding Dynamic Actions', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-dynamic-actions.html' },
        { t: 'App Builder Guide — Creating and Editing Dynamic Actions', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-and-editing-dynamic-actions.html' },
        { t: 'App Builder Guide — Debugging Dynamic Actions', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/debugging-dynamic-actions.html' }
    ],
    relacionados: ['eventos-javascript', 'javascript-api', 'ajax-callbacks', 'itens-de-pagina', 'ciclo-de-vida-da-pagina'],
    pt: {
        titulo: 'Dynamic Actions',
        resumo: 'Comportamento no navegador sem escrever JavaScript: eventos, condições, ações verdadeiras e falsas, affected elements e as novidades do 26.1.',
        tags: ['dynamic action', 'DA', 'evento', 'Change', 'Click', 'Page Load', 'Set Value', 'Execute Server-side Code', 'Fire on Initialization', 'Trigger Actions', 'Show Success Message'],
        conteudo: `
            Uma **Dynamic Action (DA)** define comportamento no navegador de forma declarativa: quando um evento acontece em um
            elemento, e opcionalmente se uma condição for verdadeira, executa uma lista de ações (e outra lista quando a condição
            for falsa). Introduzidas no APEX 4.0, cobrem a maior parte do que antes exigia JavaScript escrito à mão.

            ## Anatomia
            | Parte | Atributos | Exemplo |
            |---|---|---|
            | When | **Event**, **Selection Type** e o elemento (item, botão, região, coluna, jQuery Selector, JavaScript Expression) | Change em «P10_TIPO» |
            | Client-side Condition | Item = Value, Item is null, Item in list, JavaScript Expression... | «P10_TIPO» = «PJ» |
            | True Actions | Rodam quando a condição é verdadeira (ou quando não há condição) | Show «P10_CNPJ» |
            | False Actions | Rodam quando a condição é falsa | Hide «P10_CNPJ» |
            | Affected Elements | Em quem cada ação age | «P10_CNPJ,P10_RAZAO_SOCIAL» |

            ## Atributos que fazem diferença
            - **Fire on Initialization** (na ação): executa também ao carregar a página — essencial em mostrar/ocultar, para a
              tela já abrir no estado certo.
            - **Wait For Result**: em ações AJAX (Execute Server-side Code, Refresh), segura as ações seguintes até a resposta.
            - **Stop Execution On Error**: interrompe a lista se uma ação falhar.
            - **Event Scope** (na DA): *Static*, *Dynamic* (para elementos recriados por refresh, usando um *Static Container*) ou *Once*.
            - **Server-side Condition**: avaliada na renderização — se falsa, a DA nem vai para a página.
            - Desde o 21.1 cada ação pode ter a sua própria condição no cliente, e desde o 22.2 a DA pode aplicar *debounce* ou
              *throttle* (útil com eventos de digitação).

            ## Eventos
            | Tipo | Eventos |
            |---|---|
            | Navegador | Change, Input (24.1, a cada alteração do valor), Click, Double Click, Get Focus, Lose Focus, Key Down/Press/Release, Mouse..., Page Load, Resize, Scroll, Select, Tap, Swipe |
            | Framework | After Refresh, Before Refresh, Before Page Submit, Dialog Closed, Dialog Closed or Canceled |
            | Componente | Eventos de itens, regiões e plug-ins, ex.: *Selection Change [Interactive Grid]* |
            | Custom | Qualquer nome, disparado por JavaScript — veja [Eventos do APEX](#/topico/eventos-javascript) |

            O evento *Page Unload* foi depreciado no 24.1. Para avisar sobre alterações não salvas, use o atributo
            **Warn on Unsaved Changes** da página.

            ## Ações por categoria
            | Categoria | Ações |
            |---|---|
            | Component | Show, Hide, Enable, Disable, Clear, Set Value, Refresh, Set Focus, Open Region, Close Region, Collapse/Expand Tree |
            | Execute | Execute JavaScript Code, Execute Server-side Code, Download (24.1), Print Report, Invoke Interactive Report Dialog (26.1) |
            | Navigation | Submit Page, Close Dialog, Cancel Dialog |
            | Notification | Alert, Confirm, Show Success Message, Show Error Message e Clear Errors (26.1) |
            | Style | Add Class, Remove Class, Set Style |
            | AI | Show AI Assistant (24.1), Generate Text with AI (24.2) |
            | Miscellaneous | Cancel Event, Get Current Position, Share |

            ## Exemplo: buscar dados no servidor
            DA **Change** em «P10_CLIENTE_ID», ação **Execute Server-side Code** com *Items to Submit* = «P10_CLIENTE_ID» e
            *Items to Return* = «P10_NOME,P10_LIMITE»:

            ~~~plsql
            begin
                select nome, limite_credito
                  into :P10_NOME, :P10_LIMITE
                  from clientes
                 where id = :P10_CLIENTE_ID;
            exception
                when no_data_found then
                    :P10_NOME   := null;
                    :P10_LIMITE := null;
            end;
            ~~~

            Na sequência, uma ação **Show Success Message** (26.1) ou **Refresh** de uma região. Com *Wait For Result* ligado, a
            ação seguinte só roda depois que os valores voltarem.

            :::atencao O erro mais comum
            O código no servidor só enxerga os itens listados em **Items to Submit**, e o navegador só recebe de volta os listados
            em **Items to Return**. Item esquecido = valor nulo no PL/SQL ou tela sem atualizar.
            :::

            ## Execute JavaScript Code: o objeto this
            ~~~js
            var el    = this.triggeringElement;   // elemento que disparou o evento
            var alvos = this.affectedElements;    // jQuery com os Affected Elements
            var ev    = this.browserEvent;        // evento original do navegador
            var dados = this.data;                // dados extras (Dialog Closed, eventos custom)

            apex.debug.info('DA disparada por', el.id);
            alvos.addClass('is-highlight');
            ~~~

            :::novo Trigger Actions e mensagens declarativas (26.1)
            - **Trigger Actions**: botões, ações de Cards e Template Components e menus podem ter Dynamic Actions definidas
              direto na árvore do Page Designer. Em regiões com várias linhas, colunas marcadas como **Available on Client** ficam
              acessíveis durante as ações («$v('COLUNA')» em JavaScript, «&COLUNA.» nas mensagens).
            - **Show Success Message**, **Show Error Message** e **Clear Errors** dispensam JavaScript para dar feedback.
            - **Execute Server-side Code** ganhou **Show Processing** (spinner automático) e os botões ganharam o tipo **Menu**.
            :::

            ## Depurando
            - Rode a página em modo **Debug** e abra o console do navegador: o framework registra cada DA disparada.
            - Dê nomes claros às DAs e às ações — eles aparecem no log e facilitam a manutenção.
            - Muitas DAs aumentam o tamanho da página; lógica repetida rende mais como função em um arquivo JavaScript.
        `
    },
    en: {
        titulo: 'Dynamic Actions',
        resumo: 'Browser behavior without writing JavaScript: events, conditions, true and false actions, affected elements and what is new in 26.1.',
        tags: ['dynamic action', 'DA', 'event', 'Change', 'Click', 'Page Load', 'Set Value', 'Execute Server-side Code', 'Fire on Initialization', 'Trigger Actions', 'Show Success Message'],
        conteudo: `
            A **Dynamic Action (DA)** defines browser behavior declaratively: when an event happens on an element, and optionally
            if a condition is true, it runs a list of actions (and another list when the condition is false). Introduced in
            APEX 4.0, they cover most of what used to require hand-written JavaScript.

            ## Anatomy
            | Part | Attributes | Example |
            |---|---|---|
            | When | **Event**, **Selection Type** and the element (item, button, region, column, jQuery Selector, JavaScript Expression) | Change on «P10_TYPE» |
            | Client-side Condition | Item = Value, Item is null, Item in list, JavaScript Expression... | «P10_TYPE» = «COMPANY» |
            | True Actions | Run when the condition is true (or when there is no condition) | Show «P10_TAX_ID» |
            | False Actions | Run when the condition is false | Hide «P10_TAX_ID» |
            | Affected Elements | What each action acts on | «P10_TAX_ID,P10_COMPANY_NAME» |

            ## Attributes that make a difference
            - **Fire on Initialization** (on the action): also runs on page load — essential for show/hide, so the page opens in
              the right state.
            - **Wait For Result**: on AJAX actions (Execute Server-side Code, Refresh), holds the next actions until the response.
            - **Stop Execution On Error**: stops the list if an action fails.
            - **Event Scope** (on the DA): *Static*, *Dynamic* (for elements re-created by a refresh, using a *Static Container*) or *Once*.
            - **Server-side Condition**: evaluated at render time — if false, the DA is not even sent to the page.
            - Since 21.1 each action can have its own client-side condition, and since 22.2 a DA can apply *debounce* or
              *throttle* (handy with typing events).

            ## Events
            | Type | Events |
            |---|---|
            | Browser | Change, Input (24.1, on every value change), Click, Double Click, Get Focus, Lose Focus, Key Down/Press/Release, Mouse..., Page Load, Resize, Scroll, Select, Tap, Swipe |
            | Framework | After Refresh, Before Refresh, Before Page Submit, Dialog Closed, Dialog Closed or Canceled |
            | Component | Item, region and plug-in events, e.g. *Selection Change [Interactive Grid]* |
            | Custom | Any name, triggered from JavaScript — see [APEX events](#/topico/eventos-javascript) |

            The *Page Unload* event was deprecated in 24.1. To warn about unsaved changes use the page's
            **Warn on Unsaved Changes** attribute.

            ## Actions by category
            | Category | Actions |
            |---|---|
            | Component | Show, Hide, Enable, Disable, Clear, Set Value, Refresh, Set Focus, Open Region, Close Region, Collapse/Expand Tree |
            | Execute | Execute JavaScript Code, Execute Server-side Code, Download (24.1), Print Report, Invoke Interactive Report Dialog (26.1) |
            | Navigation | Submit Page, Close Dialog, Cancel Dialog |
            | Notification | Alert, Confirm, Show Success Message, Show Error Message and Clear Errors (26.1) |
            | Style | Add Class, Remove Class, Set Style |
            | AI | Show AI Assistant (24.1), Generate Text with AI (24.2) |
            | Miscellaneous | Cancel Event, Get Current Position, Share |

            ## Example: fetching data from the server
            A **Change** DA on «P10_CUSTOMER_ID» with an **Execute Server-side Code** action, *Items to Submit* =
            «P10_CUSTOMER_ID» and *Items to Return* = «P10_NAME,P10_CREDIT_LIMIT»:

            ~~~plsql
            begin
                select name, credit_limit
                  into :P10_NAME, :P10_CREDIT_LIMIT
                  from customers
                 where id = :P10_CUSTOMER_ID;
            exception
                when no_data_found then
                    :P10_NAME         := null;
                    :P10_CREDIT_LIMIT := null;
            end;
            ~~~

            Follow it with a **Show Success Message** (26.1) or a region **Refresh** action. With *Wait For Result* on, the next
            action runs only after the values come back.

            :::atencao The most common mistake
            Server code only sees the items listed in **Items to Submit**, and the browser only receives back those listed in
            **Items to Return**. A missing item means a null value in PL/SQL or a page that does not update.
            :::

            ## Execute JavaScript Code: the this object
            ~~~js
            var el      = this.triggeringElement;   // element that fired the event
            var targets = this.affectedElements;    // jQuery object with the Affected Elements
            var ev      = this.browserEvent;        // original browser event
            var data    = this.data;                // extra data (Dialog Closed, custom events)

            apex.debug.info('DA fired by', el.id);
            targets.addClass('is-highlight');
            ~~~

            :::novo Trigger Actions and declarative messages (26.1)
            - **Trigger Actions**: buttons, Cards and Template Component actions and menus can have Dynamic Actions defined right
              in the Page Designer tree. In multi-row regions, columns flagged **Available on Client** are accessible during the
              actions («$v('COLUMN')» in JavaScript, «&COLUMN.» in messages).
            - **Show Success Message**, **Show Error Message** and **Clear Errors** give feedback without JavaScript.
            - **Execute Server-side Code** gained **Show Processing** (automatic spinner) and buttons gained the **Menu** type.
            :::

            ## Debugging
            - Run the page in **Debug** mode and open the browser console: the framework logs every DA that fires.
            - Give DAs and actions clear names — they show up in the log and make maintenance easier.
            - Many DAs increase page size; repeated logic is better as a function in a JavaScript file.
        `
    }
});

DOC.topico({
    id: 'javascript-api',
    cat: 'dinamico',
    nivel: 'intermediario',
    links: [
        { t: 'Oracle APEX JavaScript API Reference 26.1', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/' },
        { t: 'JavaScript API — item interface', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/item.html' },
        { t: 'JavaScript API — apex.message', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.message.html' }
    ],
    relacionados: ['dynamic-actions', 'ajax-callbacks', 'eventos-javascript', 'js-e-css-na-pagina', 'interactive-grid'],
    pt: {
        titulo: 'A API JavaScript do APEX',
        resumo: 'Os namespaces do objeto apex — item, region, server, message, page, navigation, util, locale — com exemplos práticos do dia a dia.',
        tags: ['JavaScript', 'apex.item', 'apex.region', 'apex.message', 'apex.navigation', 'apex.page.submit', 'apex.util', 'apex.env', '$v', '$s', 'showPageSuccess', 'showErrors'],
        conteudo: `
            O APEX traz uma biblioteca JavaScript oficial sob o objeto global «apex». Prefira-a a manipular o DOM diretamente: ela
            conhece os tipos de item, o session state, os templates de mensagem do tema e o protocolo AJAX do APEX — e continua
            funcionando quando o HTML gerado muda entre versões.

            ## Mapa dos namespaces
            | Namespace | Para quê | Exemplo |
            |---|---|---|
            | «apex.item» / «apex.items» | Ler e alterar itens | «apex.item('P1_X').setValue('A')» |
            | «apex.region» / «apex.regions» | Refresh, foco e widget de regiões | «apex.region('pedidos').refresh()» |
            | «apex.server» | Chamadas AJAX | «apex.server.process('PROC', dados)» |
            | «apex.message» | Mensagens, alertas e confirmações | «apex.message.showPageSuccess('Ok')» |
            | «apex.page» | Submit, validação, alterações não salvas | «apex.page.submit('SAVE')» |
            | «apex.navigation» | Redirecionar, diálogos e popups | «apex.navigation.redirect(url)» |
            | «apex.util» | Escape, templates, spinner, debounce | «apex.util.escapeHTML(texto)» |
            | «apex.lang», «apex.locale», «apex.date» | Mensagens traduzíveis, números e datas | «apex.locale.toNumber('1.234,5')» |
            | «apex.debug» | Log que respeita o nível de debug | «apex.debug.info('x')» |
            | «apex.env» | Dados do ambiente (21.2) | «apex.env.APP_USER», «apex.env.APP_ID» |
            | «apex.event», «apex.actions», «apex.storage», «apex.theme» | Eventos, actions e atalhos, storage local, UI do tema | — |

            ## Itens
            ~~~js
            var item = apex.item('P10_CLIENTE');
            item.getValue();                        // string (array em itens multivalorados)
            item.setValue('42', 'ACME Ltda', true); // valor, exibição, suprimir change
            item.isEmpty();
            item.isChanged();
            item.hide();
            item.disable();
            item.refresh();                         // recarrega a LOV (cascata)
            apex.items.P10_TOTAL.setValue('0');     // atalho via coleção apex.items
            ~~~

            ## Regiões
            ~~~js
            apex.region('pedidos').refresh();
            apex.region('pedidos').focus();
            var grid = apex.region('itens').call('getViews', 'grid');   // Interactive Grid
            ~~~

            :::info HTML DOM ID
            «apex.region()» recebe o identificador DOM da região. No 26.1 o atributo *Static ID* de regiões e botões foi
            renomeado para **HTML DOM ID** — é ali que você define «pedidos» para usar no JavaScript.
            :::

            ## Mensagens e confirmações
            ~~~js
            apex.message.showPageSuccess('Pedido salvo!');

            apex.message.clearErrors();
            apex.message.showErrors([{
                type: 'error',
                location: ['page', 'inline'],
                pageItem: 'P10_EMAIL',
                message: 'E-mail inválido.',
                unsafe: false
            }]);

            apex.message.confirm('Excluir o pedido?', function (ok) {
                if (ok) {
                    apex.page.submit({ request: 'DELETE', showWait: true });
                }
            });
            ~~~

            :::atencao confirm não bloqueia
            Diferente do «window.confirm» do navegador, «apex.message.confirm» retorna na hora: o código que depende da resposta
            precisa ficar **dentro do callback**.
            :::

            ## Navegação e diálogos
            ~~~js
            // URL gerada no servidor (checksum!), ex.: em P10_URL_DIALOGO via APEX_PAGE.GET_URL
            apex.navigation.dialog(apex.items.P10_URL_DIALOGO.value,
                { title: 'Pedido', height: '480', width: '800', modal: true },
                't-Dialog-page--standard', '#btnNovo');

            // Dentro do modal: fechar devolvendo itens para o evento Dialog Closed
            apex.navigation.dialog.close(true, ['P20_ID']);
            ~~~

            ## Utilitários
            ~~~js
            var spinner = apex.util.showSpinner(apex.jQuery('#pedidos'));
            spinner.remove();                        // quando terminar

            var seguro = apex.util.escapeHTML(apex.item('P10_OBS').getValue());

            var buscar = apex.util.debounce(function () {
                apex.region('pedidos').refresh();
            }, 400);

            apex.locale.formatNumber(1234.5, '999G999G990D00');      // conforme o idioma da sessão
            apex.lang.formatMessage('PEDIDO_SALVO', '1234');           // Text Message com %0
            ~~~

            Para usar «apex.lang» com mensagens da aplicação, marque a Text Message como **Used in JavaScript**.

            ## Submit, ambiente e depuração
            ~~~js
            // Submit com REQUEST, ajuste de itens antes do envio e indicador de espera
            apex.page.submit({
                request: 'APROVAR',
                set: { 'P10_ORIGEM': 'BOTAO_TOOLBAR' },
                showWait: true
            });

            if (apex.env.APP_PAGE_ID === '10') {
                apex.debug.info('Usuário', apex.env.APP_USER, 'sessão', apex.env.APP_SESSION);
            }
            ~~~

            Diferente de «console.log», as mensagens de «apex.debug» só aparecem no console quando a página roda em modo
            **Debug** — podem ficar no código de produção sem poluir o console do usuário. Já «apex.page.submit» respeita as
            validações no cliente e os eventos de submit, o que um «form.submit()» manual ignoraria.

            ## Legado e jQuery
            «$v», «$s», «$x» e «$nvl» ainda funcionam, mas prefira «apex.item». Use «apex.jQuery» em vez de «$» global para
            garantir a mesma versão de jQuery do APEX. Os widgets do jQuery UI estão depreciados desde o 20.1.

            :::novo Novidades do 26.1
            - Interface **interactiveReportRegion**, com seleção de linhas e linha atual no Interactive Report.
            - «apex.util.applyNamedTemplate», «defineTemplates», «getTemplateDef» e «listTemplates».
            - Grid com «getSelectedRanges», «allowCut» e «allowPaste» (copiar, recortar e colar na IG).
            - «apex.lang» aceita parâmetros nomeados nas mensagens.
            :::
        `
    },
    en: {
        titulo: 'The APEX JavaScript API',
        resumo: 'The namespaces of the apex object — item, region, server, message, page, navigation, util, locale — with practical everyday examples.',
        tags: ['JavaScript', 'apex.item', 'apex.region', 'apex.message', 'apex.navigation', 'apex.page.submit', 'apex.util', 'apex.env', '$v', '$s', 'showPageSuccess', 'showErrors'],
        conteudo: `
            APEX ships an official JavaScript library under the global «apex» object. Prefer it over manipulating the DOM
            directly: it knows item types, session state, the theme's message templates and the APEX AJAX protocol — and keeps
            working when the generated HTML changes between releases.

            ## Namespace map
            | Namespace | Purpose | Example |
            |---|---|---|
            | «apex.item» / «apex.items» | Read and change items | «apex.item('P1_X').setValue('A')» |
            | «apex.region» / «apex.regions» | Refresh, focus and region widgets | «apex.region('orders').refresh()» |
            | «apex.server» | AJAX calls | «apex.server.process('PROC', data)» |
            | «apex.message» | Messages, alerts and confirmations | «apex.message.showPageSuccess('Ok')» |
            | «apex.page» | Submit, validation, unsaved changes | «apex.page.submit('SAVE')» |
            | «apex.navigation» | Redirects, dialogs and popups | «apex.navigation.redirect(url)» |
            | «apex.util» | Escaping, templates, spinner, debounce | «apex.util.escapeHTML(text)» |
            | «apex.lang», «apex.locale», «apex.date» | Translatable messages, numbers and dates | «apex.locale.toNumber('1,234.5')» |
            | «apex.debug» | Logging that honors the debug level | «apex.debug.info('x')» |
            | «apex.env» | Environment values (21.2) | «apex.env.APP_USER», «apex.env.APP_ID» |
            | «apex.event», «apex.actions», «apex.storage», «apex.theme» | Events, actions and shortcuts, local storage, theme UI | — |

            ## Items
            ~~~js
            var item = apex.item('P10_CUSTOMER');
            item.getValue();                        // string (array for multi-value items)
            item.setValue('42', 'ACME Inc.', true); // value, display value, suppress change
            item.isEmpty();
            item.isChanged();
            item.hide();
            item.disable();
            item.refresh();                         // reloads the LOV (cascade)
            apex.items.P10_TOTAL.setValue('0');     // shortcut through the apex.items collection
            ~~~

            ## Regions
            ~~~js
            apex.region('orders').refresh();
            apex.region('orders').focus();
            var grid = apex.region('lines').call('getViews', 'grid');   // Interactive Grid
            ~~~

            :::info HTML DOM ID
            «apex.region()» takes the region DOM identifier. In 26.1 the *Static ID* attribute of regions and buttons was renamed
            **HTML DOM ID** — that is where you set «orders» to use it from JavaScript.
            :::

            ## Messages and confirmations
            ~~~js
            apex.message.showPageSuccess('Order saved!');

            apex.message.clearErrors();
            apex.message.showErrors([{
                type: 'error',
                location: ['page', 'inline'],
                pageItem: 'P10_EMAIL',
                message: 'Invalid e-mail.',
                unsafe: false
            }]);

            apex.message.confirm('Delete this order?', function (ok) {
                if (ok) {
                    apex.page.submit({ request: 'DELETE', showWait: true });
                }
            });
            ~~~

            :::atencao confirm does not block
            Unlike the browser's «window.confirm», «apex.message.confirm» returns immediately: code that depends on the answer
            must live **inside the callback**.
            :::

            ## Navigation and dialogs
            ~~~js
            // URL generated on the server (checksum!), e.g. in P10_DIALOG_URL via APEX_PAGE.GET_URL
            apex.navigation.dialog(apex.items.P10_DIALOG_URL.value,
                { title: 'Order', height: '480', width: '800', modal: true },
                't-Dialog-page--standard', '#btnNew');

            // Inside the modal: close and return items to the Dialog Closed event
            apex.navigation.dialog.close(true, ['P20_ID']);
            ~~~

            ## Utilities
            ~~~js
            var spinner = apex.util.showSpinner(apex.jQuery('#orders'));
            spinner.remove();                        // when done

            var safe = apex.util.escapeHTML(apex.item('P10_NOTE').getValue());

            var search = apex.util.debounce(function () {
                apex.region('orders').refresh();
            }, 400);

            apex.locale.formatNumber(1234.5, '999G999G990D00');      // honors the session language
            apex.lang.formatMessage('ORDER_SAVED', '1234');            // Text Message with %0
            ~~~

            To use «apex.lang» with application messages, flag the Text Message as **Used in JavaScript**.

            ## Submit, environment and debugging
            ~~~js
            // Submit with a REQUEST, set items before posting and show a wait indicator
            apex.page.submit({
                request: 'APPROVE',
                set: { 'P10_SOURCE': 'TOOLBAR_BUTTON' },
                showWait: true
            });

            if (apex.env.APP_PAGE_ID === '10') {
                apex.debug.info('User', apex.env.APP_USER, 'session', apex.env.APP_SESSION);
            }
            ~~~

            Unlike «console.log», «apex.debug» messages only reach the console when the page runs in **Debug** mode — they can
            stay in production code without cluttering the user's console. And «apex.page.submit» honors client-side validation
            and the submit events, which a manual «form.submit()» would bypass.

            ## Legacy and jQuery
            «$v», «$s», «$x» and «$nvl» still work, but prefer «apex.item». Use «apex.jQuery» instead of the global «$» to be sure
            you get the same jQuery version APEX uses. jQuery UI widgets have been deprecated since 20.1.

            :::novo What is new in 26.1
            - The **interactiveReportRegion** interface, with row selection and current row in Interactive Reports.
            - «apex.util.applyNamedTemplate», «defineTemplates», «getTemplateDef» and «listTemplates».
            - Grid «getSelectedRanges», «allowCut» and «allowPaste» (copy, cut and paste in the IG).
            - «apex.lang» supports named parameters in messages.
            :::
        `
    }
});

DOC.topico({
    id: 'ajax-callbacks',
    cat: 'dinamico',
    nivel: 'avancado',
    links: [
        { t: 'JavaScript API — apex.server', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.server.html' },
        { t: 'App Builder Guide — Understanding Application Processes', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-application-processes.html' },
        { t: 'APEX_JSON (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_JSON.html' }
    ],
    relacionados: ['javascript-api', 'dynamic-actions', 'sessao-e-session-state', 'apex-json', 'tratamento-de-erros'],
    pt: {
        titulo: 'AJAX: Ajax Callback, apex.server.process e Execute Server-side Code',
        resumo: 'Como executar PL/SQL sem recarregar a página: Execute Server-side Code, processos Ajax Callback com apex.server.process, x01/f01, JSON e segurança.',
        tags: ['AJAX', 'Ajax Callback', 'apex.server.process', 'Execute Server-side Code', 'x01', 'f01', 'g_x01', 'g_f01', 'pageItems', 'APEX_JSON', 'dataType', 'On Demand'],
        conteudo: `
            AJAX permite executar código no servidor sem recarregar a página. No APEX há três caminhos:

            | Recurso | Onde | Bom para |
            |---|---|---|
            | DA **Execute Server-side Code** | Ação de uma Dynamic Action | Lógica curta ligada a um evento; troca de dados apenas via itens. |
            | Processo **Ajax Callback** + «apex.server.process» | Page Designer → Processing → Ajax Callback (ou Application Process) | Respostas ricas (JSON), parâmetros livres, chamadas a partir de qualquer JavaScript. |
            | «apex.server.plugin» | Plug-ins | Quem desenvolve plug-ins. |

            ## 1. Execute Server-side Code
            - **Items to Submit**: itens enviados ao session state antes de executar.
            - **Items to Return**: itens que o código altera e que voltam atualizados para o navegador.
            - **Show Processing** (26.1): spinner automático nos Items to Return, ou na página se não houver itens.
            - Um erro (ex.: «raise_application_error») é exibido ao usuário e, com *Stop Execution On Error*, interrompe as
              ações seguintes.

            Exemplo e armadilhas em [Dynamic Actions](#/topico/dynamic-actions).

            ## 2. Ajax Callback + apex.server.process
            Crie um processo no ponto **Ajax Callback** (em Processing, ou como Application Process para usar em várias páginas)
            e chame-o pelo nome. A resposta é o que o PL/SQL escrever no buffer HTP — por padrão o JavaScript espera **JSON**.

            ~~~plsql Processo RESUMO_CLIENTE (ponto: Ajax Callback)
            declare
                l_qtd   number;
                l_total number;
            begin
                select count(*), nvl(sum(valor), 0)
                  into l_qtd, l_total
                  from pedidos
                 where cliente_id = :P10_CLIENTE_ID           -- enviado em pageItems
                   and status     = apex_application.g_x01;   -- enviado em x01

                apex_json.open_object;
                apex_json.write('success', true);
                apex_json.write('qtd', l_qtd);
                apex_json.write('total', l_total);
                apex_json.close_object;
            exception
                when others then
                    apex_debug.error('RESUMO_CLIENTE: %s', sqlerrm);
                    apex_json.open_object;
                    apex_json.write('success', false);
                    apex_json.write('message', 'Não foi possível calcular o resumo.');
                    apex_json.close_object;
            end;
            ~~~

            ~~~js
            apex.server.process('RESUMO_CLIENTE', {
                x01: 'ABERTO',
                pageItems: '#P10_CLIENTE_ID'
            }, {
                loadingIndicator: '#resumo',
                loadingIndicatorPosition: 'centered'
            }).done(function (data) {
                if (data.success) {
                    apex.item('P10_QTD').setValue(String(data.qtd));
                    apex.item('P10_TOTAL').setValue(apex.locale.formatNumber(data.total, '999G999G990D00'));
                } else {
                    apex.message.clearErrors();
                    apex.message.showErrors([{ type: 'error', location: 'page', message: data.message }]);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                apex.debug.error('Falha no AJAX', textStatus, errorThrown);
            });
            ~~~

            ## O que dá para enviar
            | Propriedade em pData | No PL/SQL | Uso |
            |---|---|---|
            | «pageItems» | «:P10_X» (bind) | Itens gravados no session state antes do processo. |
            | «x01» a «x10» | «apex_application.g_x01» ... «g_x10» | Valores escalares (filtros, IDs, JSON em texto). |
            | «f01», «f02»... | «apex_application.g_f01(i)» | Arrays — listas de IDs, textos longos quebrados com «apex.server.chunk». |

            ~~~js
            // IDs das linhas selecionadas numa Interactive Grid (HTML DOM ID "pedidos")
            var ig    = apex.region('pedidos');
            var model = ig.call('getViews', 'grid').model;
            var ids   = ig.call('getSelectedRecords').map(function (rec) {
                return model.getValue(rec, 'ID');
            });

            apex.server.process('APROVAR_PEDIDOS', { f01: ids }, { dataType: 'text' })
                .done(function (resposta) {
                    apex.message.showPageSuccess(resposta);
                    ig.refresh();
                });
            ~~~

            ~~~plsql Processo APROVAR_PEDIDOS (Ajax Callback, resposta em texto)
            declare
                l_qtd pls_integer := 0;
            begin
                for i in 1 .. apex_application.g_f01.count loop
                    update pedidos
                       set status = 'APROVADO'
                     where id     = to_number(apex_application.g_f01(i))
                       and status = 'PENDENTE';
                    l_qtd := l_qtd + sql%rowcount;
                end loop;
                htp.p(l_qtd || ' pedido(s) aprovado(s).');
            end;
            ~~~

            :::dica dataType e erros de parse
            Se o processo escreve texto puro e você não passa «dataType: 'text'», a chamada cai no «fail» com *parsererror*.
            Para buscas enquanto o usuário digita, use a opção «queue: { name: 'busca', action: 'replace' }»: só a última
            requisição vale.
            :::

            ## Qual escolher?
            - Só precisa ler e gravar itens em resposta a um evento → **Execute Server-side Code**: zero JavaScript.
            - Precisa devolver listas ou objetos, enviar arrays ou chamar a partir do seu próprio código → **Ajax Callback** com
              «apex.server.process».
            - A mesma chamada em várias páginas → **Application Process** com ponto *Ajax Callback* (Shared Components).
            - Em todos os casos, mantenha o PL/SQL do processo curto: só a chamada ao pacote que contém a regra de negócio.

            ## Erros: técnico x negócio
            Um erro não tratado no processo faz a promise cair em «fail»; para respostas de erro do próprio APEX, o
            «textStatus» é «APEX». Erros de negócio ("cliente bloqueado") ficam melhores como resposta normal com
            «success: false» e uma mensagem, exibida com «apex.message.showErrors» — o usuário vê um texto amigável e você
            registra o detalhe técnico com «apex_debug».

            :::atencao Segurança
            Qualquer JavaScript da página (inclusive o console do navegador) pode chamar um Ajax Callback com quaisquer valores.
            Atribua um **Authorization Scheme** ao processo, valide os parâmetros, use binds e nunca confie em «x01» para decidir
            permissões. Itens Hidden com **Value Protected** não podem ter o valor alterado no navegador e reenviado.
            :::
        `
    },
    en: {
        titulo: 'AJAX: Ajax Callback, apex.server.process and Execute Server-side Code',
        resumo: 'How to run PL/SQL without reloading the page: Execute Server-side Code, Ajax Callback processes with apex.server.process, x01/f01, JSON and security.',
        tags: ['AJAX', 'Ajax Callback', 'apex.server.process', 'Execute Server-side Code', 'x01', 'f01', 'g_x01', 'g_f01', 'pageItems', 'APEX_JSON', 'dataType', 'On Demand'],
        conteudo: `
            AJAX lets you run server code without reloading the page. APEX offers three paths:

            | Feature | Where | Good for |
            |---|---|---|
            | **Execute Server-side Code** DA | A Dynamic Action action | Short logic tied to an event; data exchanged through items only. |
            | **Ajax Callback** process + «apex.server.process» | Page Designer → Processing → Ajax Callback (or an Application Process) | Rich responses (JSON), free-form parameters, calls from any JavaScript. |
            | «apex.server.plugin» | Plug-ins | Plug-in developers. |

            ## 1. Execute Server-side Code
            - **Items to Submit**: items sent to session state before the code runs.
            - **Items to Return**: items the code changes, sent back to the browser.
            - **Show Processing** (26.1): automatic spinner on the Items to Return, or on the page when there are none.
            - An error (e.g. «raise_application_error») is shown to the user and, with *Stop Execution On Error*, stops the
              following actions.

            Example and pitfalls in [Dynamic Actions](#/topico/dynamic-actions).

            ## 2. Ajax Callback + apex.server.process
            Create a process at the **Ajax Callback** point (under Processing, or as an Application Process to reuse it on many
            pages) and call it by name. The response is whatever the PL/SQL writes to the HTP buffer — by default JavaScript
            expects **JSON**.

            ~~~plsql CUSTOMER_SUMMARY process (point: Ajax Callback)
            declare
                l_count number;
                l_total number;
            begin
                select count(*), nvl(sum(amount), 0)
                  into l_count, l_total
                  from orders
                 where customer_id = :P10_CUSTOMER_ID         -- sent in pageItems
                   and status      = apex_application.g_x01;  -- sent in x01

                apex_json.open_object;
                apex_json.write('success', true);
                apex_json.write('count', l_count);
                apex_json.write('total', l_total);
                apex_json.close_object;
            exception
                when others then
                    apex_debug.error('CUSTOMER_SUMMARY: %s', sqlerrm);
                    apex_json.open_object;
                    apex_json.write('success', false);
                    apex_json.write('message', 'Could not compute the summary.');
                    apex_json.close_object;
            end;
            ~~~

            ~~~js
            apex.server.process('CUSTOMER_SUMMARY', {
                x01: 'OPEN',
                pageItems: '#P10_CUSTOMER_ID'
            }, {
                loadingIndicator: '#summary',
                loadingIndicatorPosition: 'centered'
            }).done(function (data) {
                if (data.success) {
                    apex.item('P10_COUNT').setValue(String(data.count));
                    apex.item('P10_TOTAL').setValue(apex.locale.formatNumber(data.total, '999G999G990D00'));
                } else {
                    apex.message.clearErrors();
                    apex.message.showErrors([{ type: 'error', location: 'page', message: data.message }]);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                apex.debug.error('AJAX failed', textStatus, errorThrown);
            });
            ~~~

            ## What you can send
            | Property in pData | In PL/SQL | Use |
            |---|---|---|
            | «pageItems» | «:P10_X» (bind) | Items saved to session state before the process runs. |
            | «x01» to «x10» | «apex_application.g_x01» ... «g_x10» | Scalar values (filters, IDs, JSON as text). |
            | «f01», «f02»... | «apex_application.g_f01(i)» | Arrays — ID lists, long text split with «apex.server.chunk». |

            ~~~js
            // IDs of the selected rows in an Interactive Grid (HTML DOM ID "orders")
            var ig    = apex.region('orders');
            var model = ig.call('getViews', 'grid').model;
            var ids   = ig.call('getSelectedRecords').map(function (rec) {
                return model.getValue(rec, 'ID');
            });

            apex.server.process('APPROVE_ORDERS', { f01: ids }, { dataType: 'text' })
                .done(function (response) {
                    apex.message.showPageSuccess(response);
                    ig.refresh();
                });
            ~~~

            ~~~plsql APPROVE_ORDERS process (Ajax Callback, text response)
            declare
                l_count pls_integer := 0;
            begin
                for i in 1 .. apex_application.g_f01.count loop
                    update orders
                       set status = 'APPROVED'
                     where id     = to_number(apex_application.g_f01(i))
                       and status = 'PENDING';
                    l_count := l_count + sql%rowcount;
                end loop;
                htp.p(l_count || ' order(s) approved.');
            end;
            ~~~

            :::dica dataType and parse errors
            If the process writes plain text and you do not pass «dataType: 'text'», the call ends up in «fail» with
            *parsererror*. For search-as-you-type calls use «queue: { name: 'search', action: 'replace' }»: only the latest
            request counts.
            :::

            ## Which one to choose?
            - You only need to read and write items in response to an event → **Execute Server-side Code**: zero JavaScript.
            - You need to return lists or objects, send arrays or call it from your own code → **Ajax Callback** with
              «apex.server.process».
            - The same call on several pages → an **Application Process** at the *Ajax Callback* point (Shared Components).
            - In every case keep the process PL/SQL short: just the call to the package holding the business rule.

            ## Errors: technical vs business
            An unhandled error in the process sends the promise to «fail»; for error responses from APEX itself the
            «textStatus» is «APEX». Business errors ("customer blocked") work better as a normal response with
            «success: false» and a message, shown with «apex.message.showErrors» — the user sees friendly text and you log the
            technical detail with «apex_debug».

            :::atencao Security
            Any JavaScript on the page (including the browser console) can call an Ajax Callback with any values. Assign an
            **Authorization Scheme** to the process, validate parameters, use bind variables and never rely on «x01» to decide
            permissions. Hidden items with **Value Protected** cannot have their value changed in the browser and resubmitted.
            :::
        `
    }
});

DOC.topico({
    id: 'eventos-javascript',
    cat: 'dinamico',
    nivel: 'intermediario',
    links: [
        { t: 'JavaScript API — apex namespace (events)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.html' },
        { t: 'JavaScript API — apex.event', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.event.html' },
        { t: 'App Builder Guide — Understanding Dynamic Actions (events)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-dynamic-actions.html' }
    ],
    relacionados: ['dynamic-actions', 'javascript-api', 'paginas-modais', 'interactive-grid', 'ajax-callbacks'],
    pt: {
        titulo: 'Eventos do APEX no JavaScript',
        resumo: 'apexafterrefresh, Dialog Closed, apexpagesubmit, apexreadyend, eventos de componentes e eventos customizados com apex.event.trigger.',
        tags: ['eventos', 'apexafterrefresh', 'apexafterclosedialog', 'Dialog Closed', 'apexbeforepagesubmit', 'apexpagesubmit', 'apexreadyend', 'apex.event.trigger', 'custom event', 'selectionchange'],
        conteudo: `
            Além dos eventos do navegador (click, change...), o APEX dispara **eventos jQuery próprios** em momentos-chave: antes
            e depois de um refresh, ao fechar um diálogo, antes do submit. Você pode ouvi-los com Dynamic Actions (eventos de
            *Framework*) ou com JavaScript.

            ## Eventos principais
            | Evento | Onde é disparado | Equivalente em DA |
            |---|---|---|
            | «apexbeforerefresh» / «apexafterrefresh» | Região ou item (LOV em cascata) atualizado via AJAX | Before Refresh / After Refresh |
            | «apexbeforepagesubmit» | document, antes de validar o submit | Before Page Submit |
            | «apexpagesubmit» | document, depois da validação: última chance de ajustar itens | — |
            | «apexafterclosedialog» | Elemento que abriu o diálogo, quando ele fecha via Close Dialog | Dialog Closed |
            | «apexafterclosecanceldialog» | Idem, também ao cancelar, clicar no X ou pressionar ESC | Dialog Closed or Canceled |
            | «apexreadyend» | document, ao final de todo o carregamento (inclusive itens com carga tardia) | — |
            | «apexwindowresized» | window, depois que o redimensionamento termina | — |
            | «apexselectionchange» / «apexcurrentrowchange» | Regiões com seleção ou navegação por teclado (24.1) | Eventos de componente |
            | «apexbeginrecordedit» / «apexendrecordedit» | Edição de registros do modelo (ex.: Interactive Grid) | — |

            ## Dialog Closed: abrir modal, salvar, atualizar
            1. Na página modal, o processo **Close Dialog** (depois do DML) define **Items to Return** = «P20_ID».
            2. Na página de origem, uma DA **Dialog Closed** no botão ou região que abre o modal executa **Refresh** do relatório.
            3. Para usar o valor devolvido: ação **Set Value** com *Set Type* = **Dialog Return Item**, ou JavaScript com «this.data».

            ~~~js
            // Execute JavaScript Code na DA Dialog Closed
            var id = this.data.P20_ID;
            apex.message.showPageSuccess('Pedido ' + id + ' salvo.');
            apex.region('pedidos').refresh();
            ~~~

            O mesmo em JavaScript puro (o objeto data traz «dialogPageId», «closeAction» e os itens devolvidos):

            ~~~js
            apex.gPageContext$.on('apexafterclosedialog', function (event, data) {
                if (String(data.dialogPageId) === '20') {
                    apex.region('pedidos').refresh();
                }
            });
            ~~~

            :::atencao Onde o evento acontece
            O evento é disparado no **elemento que abriu o diálogo** (botão, região da lista, link) — ou no document quando esse
            elemento não pode ser determinado, como em menus de navegação. Como o evento sobe pelo DOM, uma DA com Selection Type
            *JavaScript Expression* = «document» captura todos os fechamentos.
            :::

            ## After Refresh: reagir ao conteúdo novo
            Depois de um refresh, o HTML da região é substituído. Código que formata ou liga comportamentos precisa rodar de novo:

            ~~~js
            apex.jQuery('#pedidos').on('apexafterrefresh', function () {
                var linhas = apex.jQuery(this).find('.status-atrasado').length;
                apex.item('P10_QTD_ATRASADOS').setValue(String(linhas));
            });
            ~~~

            Para cliques em elementos recriados, use uma DA com **Event Scope = Dynamic** ou delegação jQuery
            («.on('click', '.seletor', fn)» no container).

            ## Eventos customizados
            Desacoplam partes da página: um componente anuncia "algo aconteceu" e quem quiser reage.

            ~~~js
            // Disparar, de qualquer lugar (plug-in, callback AJAX, outra DA)
            apex.event.trigger('#P10_CLIENTE_ID', 'clienteselecionado', { id: '42', origem: 'mapa' });

            // Ouvir em JavaScript
            apex.jQuery('#P10_CLIENTE_ID').on('clienteselecionado', function (event, data) {
                apex.debug.info('Cliente escolhido', data.id, data.origem);
            });
            ~~~

            Com DA: Event = **Custom**, *Custom Event* = «clienteselecionado», Selection Type = Item «P10_CLIENTE_ID»; dentro
            das ações, os dados chegam em «this.data».

            ## Eventos de componentes
            A Interactive Grid expõe eventos como *Selection Change [Interactive Grid]* (jQuery: «interactivegridselectionchange»),
            com os registros selecionados. Desde o 24.1, regiões com seleção também disparam o evento genérico
            «apexselectionchange», com «data.selectedValues».

            :::dica Antes do submit
            «apexbeforepagesubmit» pode ser cancelado (por exemplo, por uma ação Confirm). Para ajustes finais nos itens use
            «apexpagesubmit» — e nunca faça chamadas AJAX nesses handlers.
            :::
        `
    },
    en: {
        titulo: 'APEX events in JavaScript',
        resumo: 'apexafterrefresh, Dialog Closed, apexpagesubmit, apexreadyend, component events and custom events with apex.event.trigger.',
        tags: ['events', 'apexafterrefresh', 'apexafterclosedialog', 'Dialog Closed', 'apexbeforepagesubmit', 'apexpagesubmit', 'apexreadyend', 'apex.event.trigger', 'custom event', 'selectionchange'],
        conteudo: `
            Besides browser events (click, change...), APEX triggers its **own jQuery events** at key moments: before and after a
            refresh, when a dialog closes, before submit. You can listen to them with Dynamic Actions (*Framework* events) or with
            JavaScript.

            ## Main events
            | Event | Triggered on | DA equivalent |
            |---|---|---|
            | «apexbeforerefresh» / «apexafterrefresh» | Region or item (cascading LOV) refreshed via AJAX | Before Refresh / After Refresh |
            | «apexbeforepagesubmit» | document, before the submit is validated | Before Page Submit |
            | «apexpagesubmit» | document, after validation: last chance to adjust items | — |
            | «apexafterclosedialog» | The element that opened the dialog, when it closes via Close Dialog | Dialog Closed |
            | «apexafterclosecanceldialog» | Same, also on cancel, the X button or ESC | Dialog Closed or Canceled |
            | «apexreadyend» | document, at the end of all page load work (including delay-loading items) | — |
            | «apexwindowresized» | window, after resizing stops | — |
            | «apexselectionchange» / «apexcurrentrowchange» | Regions with selection or keyboard navigation (24.1) | Component events |
            | «apexbeginrecordedit» / «apexendrecordedit» | Model record editing (e.g. Interactive Grid) | — |

            ## Dialog Closed: open modal, save, refresh
            1. On the modal page, the **Close Dialog** process (after the DML) sets **Items to Return** = «P20_ID».
            2. On the calling page, a **Dialog Closed** DA on the button or region that opens the modal runs a report **Refresh**.
            3. To use the returned value: a **Set Value** action with *Set Type* = **Dialog Return Item**, or JavaScript with «this.data».

            ~~~js
            // Execute JavaScript Code in the Dialog Closed DA
            var id = this.data.P20_ID;
            apex.message.showPageSuccess('Order ' + id + ' saved.');
            apex.region('orders').refresh();
            ~~~

            The same in plain JavaScript (the data object carries «dialogPageId», «closeAction» and the returned items):

            ~~~js
            apex.gPageContext$.on('apexafterclosedialog', function (event, data) {
                if (String(data.dialogPageId) === '20') {
                    apex.region('orders').refresh();
                }
            });
            ~~~

            :::atencao Where the event fires
            The event is triggered on the **element that opened the dialog** (button, list region, link) — or on the document
            when that element cannot be determined, as with navigation menus. Since the event bubbles up the DOM, a DA with
            Selection Type *JavaScript Expression* = «document» catches every close.
            :::

            ## After Refresh: reacting to new content
            After a refresh the region HTML is replaced. Code that formats it or binds behavior must run again:

            ~~~js
            apex.jQuery('#orders').on('apexafterrefresh', function () {
                var late = apex.jQuery(this).find('.status-late').length;
                apex.item('P10_LATE_COUNT').setValue(String(late));
            });
            ~~~

            For clicks on re-created elements use a DA with **Event Scope = Dynamic** or jQuery delegation
            («.on('click', '.selector', fn)» on the container).

            ## Custom events
            They decouple parts of the page: one component announces "something happened" and whoever cares reacts.

            ~~~js
            // Trigger from anywhere (plug-in, AJAX callback, another DA)
            apex.event.trigger('#P10_CUSTOMER_ID', 'customerselected', { id: '42', source: 'map' });

            // Listen in JavaScript
            apex.jQuery('#P10_CUSTOMER_ID').on('customerselected', function (event, data) {
                apex.debug.info('Customer picked', data.id, data.source);
            });
            ~~~

            With a DA: Event = **Custom**, *Custom Event* = «customerselected», Selection Type = Item «P10_CUSTOMER_ID»; inside
            the actions the data arrives in «this.data».

            ## Component events
            The Interactive Grid exposes events such as *Selection Change [Interactive Grid]* (jQuery:
            «interactivegridselectionchange»), carrying the selected records. Since 24.1, regions that support selection also
            trigger the generic «apexselectionchange» event, with «data.selectedValues».

            :::dica Before submit
            «apexbeforepagesubmit» can be cancelled (for example by a Confirm action). For final item tweaks use
            «apexpagesubmit» — and never make AJAX calls in these handlers.
            :::
        `
    }
});

DOC.topico({
    id: 'js-e-css-na-pagina',
    cat: 'dinamico',
    nivel: 'intermediario',
    links: [
        { t: 'App Builder Guide — Editing Page Attributes (JavaScript)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/editing-page-attributes-in-page-designer.html' },
        { t: 'App Builder Guide — About Incorporating JavaScript into an Application', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/about-incorporating-javascript-into-an-application.html' },
        { t: 'App Builder Guide — Managing Static Application Files', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/managing-static-application-files.html' }
    ],
    relacionados: ['arquivos-estaticos-e-cdn', 'javascript-api', 'csp-e-cabecalhos', 'theme-roller-e-estilos', 'template-options-e-css'],
    pt: {
        titulo: 'Onde colocar JavaScript e CSS',
        resumo: 'Atributos de página, User Interface Attributes, Theme Roller e arquivos estáticos: onde cada código deve morar, #MIN#, #APP_FILES# e boas práticas.',
        tags: ['JavaScript', 'CSS', 'Function and Global Variable Declaration', 'Execute when Page Loads', 'File URLs', '#MIN#', '#APP_FILES#', 'static files', 'minificação', 'CSP'],
        conteudo: `
            Código JavaScript e CSS pode morar em vários lugares no APEX. Escolher bem afeta **manutenção**, **cache do navegador**
            e **segurança** (CSP).

            ## Mapa: onde colocar cada coisa
            | Local | Escopo | Use para |
            |---|---|---|
            | Página → JavaScript → **Function and Global Variable Declaration** | Página | Funções chamadas por DAs e botões da página. |
            | Página → JavaScript → **Execute when Page Loads** | Página | Inicializações; roda depois do código gerado pelo APEX. |
            | Página → JavaScript → **File URLs** | Página | Arquivos «.js» usados só ali (um por linha). |
            | Página → CSS → **File URLs** / **Inline** | Página | Estilos específicos da página. |
            | Shared Components → **User Interface Attributes** → JavaScript / CSS File URLs | Aplicação | O seu «app.js» e «app.css» globais. |
            | **Theme Roller** → Custom CSS | Theme style | Ajustes visuais ligados ao estilo do tema. |
            | **Static Application Files** / **Static Workspace Files** | App / workspace | Guardar os arquivos («#APP_FILES#», «#WORKSPACE_FILES#»). |
            | DA → **Execute JavaScript Code** | Evento | Trechos curtos ligados a um evento. |

            :::dica Regra prática
            Se o código aparece em mais de uma página ou passa de algumas linhas, mova-o para um **arquivo estático**: ele é
            cacheado pelo navegador, versionado com a aplicação e fica fora do HTML de cada página.
            :::

            ## Um arquivo global organizado
            ~~~js app.js (Static Application File)
            var minhaApp = minhaApp || {};

            minhaApp.pedidos = {
                recalcular: function () {
                    var qtd   = apex.locale.toNumber(apex.item('P10_QUANTIDADE').getValue()) || 0;
                    var preco = apex.locale.toNumber(apex.item('P10_PRECO').getValue()) || 0;
                    apex.item('P10_TOTAL').setValue(
                        apex.locale.formatNumber(qtd * preco, '999G999G990D00'));
                },
                marcarAtrasados: function (regiaoId) {
                    apex.jQuery('#' + regiaoId)
                        .find('.status-atrasado')
                        .closest('tr')
                        .addClass('pedido-atrasado');
                }
            };
            ~~~

            Referência em *User Interface Attributes → JavaScript → File URLs*:

            ~~~texto
            #APP_FILES#js/app#MIN#.js
            ~~~

            E nas DAs basta chamar «minhaApp.pedidos.recalcular();».

            ## #MIN#, #MIN_DIRECTORY# e #APP_VERSION#
            | Substituição | Página normal | Em modo Debug |
            |---|---|---|
            | «#MIN#» | «.min» | vazio |
            | «#MIN_DIRECTORY#» | «minified/» | vazio |
            | «#APP_VERSION#» | versão da aplicação | versão da aplicação |

            Assim, em produção o navegador baixa «app.min.js» e, em Debug, o «app.js» legível. «#APP_VERSION#» na URL ajuda a
            invalidar o cache quando você publica uma versão nova. Desde o 21.2, o **editor de arquivos estáticos** do App Builder
            minifica JavaScript e CSS automaticamente e compila arquivos LESS — você edita o original e a versão minificada é gerada.

            ## CSS
            ~~~css app.css
            /* Prefira variáveis CSS do tema a cores fixas */
            .pedido-atrasado {
                color: var(--ut-palette-danger);
                font-weight: 600;
            }
            ~~~

            Antes de escrever CSS, veja se uma **Template Option**, uma classe utilitária do Universal Theme ou o
            **Theme Roller** já resolve — e use o atributo **CSS Classes** de regiões, itens e botões para aplicar suas classes.

            :::novo CSP mais estrita no 26.1
            O núcleo do APEX 26.1 deixou de depender de «unsafe-inline» e «unsafe-hashes», permitindo uma Content Security Policy
            rigorosa. Para aproveitar: evite handlers inline («onclick="..."»), atributos «style="..."» e blocos «script» soltos
            em HTML; prefira Dynamic Actions e arquivos estáticos. Scripts inline inevitáveis devem levar o nonce «#APEX_CSP_NONCE#».
            :::

            ## Boas práticas
            - Use um **namespace** («minhaApp») em vez de funções globais soltas.
            - Use «apex.jQuery» e as APIs «apex.*» em vez de depender da estrutura HTML gerada pelo tema.
            - Carregue bibliotecas só nas páginas que as usam (File URLs da página) ou sob demanda com «apex.server.loadScript».
            - Teste com **Debug** ligado para depurar o código não minificado.
        `
    },
    en: {
        titulo: 'Where to put JavaScript and CSS',
        resumo: 'Page attributes, User Interface Attributes, Theme Roller and static files: where each piece of code should live, #MIN#, #APP_FILES# and best practices.',
        tags: ['JavaScript', 'CSS', 'Function and Global Variable Declaration', 'Execute when Page Loads', 'File URLs', '#MIN#', '#APP_FILES#', 'static files', 'minification', 'CSP'],
        conteudo: `
            JavaScript and CSS can live in many places in APEX. Choosing well affects **maintenance**, **browser caching** and
            **security** (CSP).

            ## Map: where to put what
            | Location | Scope | Use for |
            |---|---|---|
            | Page → JavaScript → **Function and Global Variable Declaration** | Page | Functions called by the page's DAs and buttons. |
            | Page → JavaScript → **Execute when Page Loads** | Page | Initialization; runs after the code APEX generates. |
            | Page → JavaScript → **File URLs** | Page | «.js» files used only there (one per line). |
            | Page → CSS → **File URLs** / **Inline** | Page | Page-specific styles. |
            | Shared Components → **User Interface Attributes** → JavaScript / CSS File URLs | Application | Your global «app.js» and «app.css». |
            | **Theme Roller** → Custom CSS | Theme style | Visual tweaks tied to the theme style. |
            | **Static Application Files** / **Static Workspace Files** | App / workspace | Storing the files («#APP_FILES#», «#WORKSPACE_FILES#»). |
            | DA → **Execute JavaScript Code** | Event | Short snippets tied to an event. |

            :::dica Rule of thumb
            If code shows up on more than one page or grows beyond a few lines, move it to a **static file**: the browser caches
            it, it is versioned with the application and it stays out of every page's HTML.
            :::

            ## An organized global file
            ~~~js app.js (Static Application File)
            var myApp = myApp || {};

            myApp.orders = {
                recalc: function () {
                    var qty   = apex.locale.toNumber(apex.item('P10_QUANTITY').getValue()) || 0;
                    var price = apex.locale.toNumber(apex.item('P10_PRICE').getValue()) || 0;
                    apex.item('P10_TOTAL').setValue(
                        apex.locale.formatNumber(qty * price, '999G999G990D00'));
                },
                flagLate: function (regionId) {
                    apex.jQuery('#' + regionId)
                        .find('.status-late')
                        .closest('tr')
                        .addClass('order-late');
                }
            };
            ~~~

            Reference it under *User Interface Attributes → JavaScript → File URLs*:

            ~~~texto
            #APP_FILES#js/app#MIN#.js
            ~~~

            Then your DAs simply call «myApp.orders.recalc();».

            ## #MIN#, #MIN_DIRECTORY# and #APP_VERSION#
            | Substitution | Normal page | Debug mode |
            |---|---|---|
            | «#MIN#» | «.min» | empty |
            | «#MIN_DIRECTORY#» | «minified/» | empty |
            | «#APP_VERSION#» | application version | application version |

            So in production the browser downloads «app.min.js» and, in Debug, the readable «app.js». «#APP_VERSION#» in the URL
            helps bust the cache when you ship a new version. Since 21.2 the App Builder **static file editor** minifies JavaScript
            and CSS automatically and compiles LESS files — you edit the original and the minified version is generated.

            ## CSS
            ~~~css app.css
            /* Prefer theme CSS variables over hard-coded colors */
            .order-late {
                color: var(--ut-palette-danger);
                font-weight: 600;
            }
            ~~~

            Before writing CSS, check whether a **Template Option**, a Universal Theme utility class or **Theme Roller** already
            does the job — and use the **CSS Classes** attribute of regions, items and buttons to apply your classes.

            :::novo Stricter CSP in 26.1
            The APEX 26.1 core no longer depends on «unsafe-inline» and «unsafe-hashes», enabling a strict Content Security
            Policy. To benefit: avoid inline handlers («onclick="..."»), «style="..."» attributes and loose «script» blocks in
            HTML; prefer Dynamic Actions and static files. Unavoidable inline scripts must carry the «#APEX_CSP_NONCE#» nonce.
            :::

            ## Best practices
            - Use a **namespace** («myApp») instead of loose global functions.
            - Use «apex.jQuery» and the «apex.*» APIs instead of relying on the HTML structure the theme generates.
            - Load libraries only on the pages that need them (page File URLs) or on demand with «apex.server.loadScript».
            - Test with **Debug** on to debug the unminified code.
        `
    }
});
