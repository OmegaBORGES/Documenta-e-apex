DOC.topico({
    id: 'universal-theme',
    cat: 'ui',
    nivel: 'basico',
    desde: '5.0',
    links: [
        { t: 'App Builder Guide — Understanding the Universal Theme', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-the-universal-theme.html' },
        { t: 'Accessing the Universal Theme Reference App', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/accessing-the-universal-theme-reference-app.html' },
        { t: 'Universal Theme Reference (apex.oracle.com/ut)', u: 'https://apex.oracle.com/ut' }
    ],
    relacionados: ['theme-roller-e-estilos', 'template-options-e-css', 'template-components', 'navegacao', 'acessibilidade'],
    pt: {
        titulo: 'Universal Theme',
        resumo: 'O tema padrão do APEX (Theme 42): grid responsivo, templates, Template Options, theme styles e como mantê-lo atualizado.',
        tags: ['Universal Theme', 'Theme 42', 'UT', 'tema', 'responsivo', 'page template', 'region template', 'Refresh Theme', 'Iris', 'Vita', 'Redwood Light', 'apex.theme'],
        conteudo: `
            O **Universal Theme** (também chamado de **Theme 42** ou simplesmente **UT**) é o tema padrão das aplicações APEX
            desde o **APEX 5.0**. Ele entrega todo o HTML, CSS e JavaScript da interface — templates de página, região, relatório,
            lista, botão e label de item — e foi desenhado para que você monte telas responsivas e acessíveis **sem escrever CSS**,
            ajustando a aparência de forma declarativa.

            ## O que vem no pacote
            - **Grid responsivo de 12 colunas**: regiões, itens e botões se reorganizam em telas pequenas. No Page Designer o
              posicionamento é controlado pelos atributos de *Layout* (*Start New Row*, *Column*, *Column Span*).
            - **Templates** para cada tipo de componente, com **Template Options** que viram classes CSS (cor, espaçamento,
              tamanho, cabeçalho oculto...).
            - **Theme Styles** e **Theme Roller** para trocar cores, fontes e o visual inteiro sem tocar nos templates.
            - **Template Components** (23.1+): Avatar, Badge, Comments, Content Row, Media List e Timeline — e, no 26.1,
              **Metric Card** e **Blank Page**.
            - **Font APEX** (ícones), **classes utilitárias** e **variáveis CSS** documentadas.
            - **Acessibilidade** desde a concepção: landmarks, hierarquia de títulos, navegação por teclado e textos para leitores de tela.

            ## Templates de página
            | Template | Quando usar |
            |---|---|
            | Standard | A maioria das páginas, com o menu de navegação. |
            | Left Side Column / Right Side Column | Página com coluna lateral (filtros, Faceted Search, resumo). |
            | Left and Right Side Columns | Duas colunas laterais. |
            | Marquee | Detalhe de um registro, com cabeçalho rico e coluna lateral. |
            | Minimal (No Navigation) | Telas sem menu, como páginas públicas simples. |
            | Login | Página de login. |
            | Modal Dialog, Wizard Modal Dialog e Drawer | Páginas abertas como diálogo ou como gaveta lateral. |

            A navegação pode ser um **menu lateral** recolhível, um **menu no topo** ou um **Mega Menu** (desde o 20.1),
            definidos nos atributos de interface (*Shared Components → User Interface Attributes*). Veja [Navegação](#/topico/navegacao).

            ## Theme styles do Universal Theme
            | Estilo | Observação |
            |---|---|
            | **Iris** | Novo estilo padrão no 26.1: baseado no Vita e alinhado ao Redwood, com a fonte Oracle Sans como primeira opção. |
            | Vita | O padrão por muitos anos; marcado como *accessibility tested*. |
            | Vita - Dark, Vita - Red, Vita - Slate | Variações do Vita (o Vita - Dark chegou no 19.2). |
            | Redwood Light | Desde o 20.2; segue o Redwood Design System e tem opções próprias no Theme Roller. |

            Para personalizar cores e criar seus estilos, veja [Theme Roller e theme styles](#/topico/theme-roller-e-estilos).

            ## Um pouco de JavaScript do tema
            O namespace «apex.theme» reúne funções ligadas ao tema, como abrir e fechar regiões *Inline Dialog*, *Inline Drawer*,
            *Inline Popup* ou *Collapsible* e testar media queries:

            ~~~js
            // Abre a região cujo HTML DOM ID (antigo "Static ID") é "filtros"
            apex.theme.openRegion( "filtros" );

            // Reage ao redimensionamento da janela
            apex.jQuery( window ).on( "apexwindowresized", function () {
                if ( apex.theme.mq( "(min-width: 640px)" ) ) {
                    apex.theme.closeRegion( "filtros" );
                }
            } );
            ~~~

            ## Mantendo o tema atualizado
            Uma aplicação continua com a versão do UT em que foi criada até que você faça o **Refresh Theme**. Depois de um upgrade
            do APEX, o botão aparece na home da aplicação (em destaque ali desde o 24.2) e traz templates, Template Options e
            correções da nova versão. Depois do refresh, rode a aplicação e teste as telas principais.

            :::atencao Não altere os templates do UT diretamente
            Os templates do Universal Theme ficam inscritos (*subscribed*) no tema mestre: um **Refresh Theme** sobrescreve
            alterações feitas neles. Para personalizar, use **Template Options**, **CSS próprio** (arquivo estático ou Theme Roller)
            e **Template Components**. Se precisar mesmo de outro HTML, **copie** o template e altere a cópia.
            :::

            :::novo Novidades recentes
            - **24.2**: os metadados do tema (templates, estilos, Template Components) passam a ser armazenados de forma
              centralizada, desacoplados da aplicação — exports menores e mais rápidos. A escolha do estilo ativo foi para o nível do tema.
            - **26.1**: estilo **Iris**, Template Components **Metric Card** e **Blank Page**, grupos em Avatar, Timeline, Comments e
              Media List, drawers no topo e na base da tela, **Font APEX 2.5**, novas classes utilitárias (overflow, números
              tabulares, flex) e Template Directives nos templates de botão, lista, item, região e página.
            :::

            ## A referência oficial
            O **Universal Theme Reference** ([apex.oracle.com/ut](https://apex.oracle.com/ut)) é uma aplicação APEX com exemplos
            vivos de cada template, Template Option, classe utilitária e componente, incluindo a marcação HTML gerada. Sempre que
            surgir a dúvida "como faço isso no UT?", comece por lá — e confira a versão do tema no menu da própria referência.
        `
    },
    en: {
        titulo: 'Universal Theme',
        resumo: 'The default APEX theme (Theme 42): responsive grid, templates, Template Options, theme styles and how to keep it up to date.',
        tags: ['Universal Theme', 'Theme 42', 'UT', 'theme', 'responsive', 'page template', 'region template', 'Refresh Theme', 'Iris', 'Vita', 'Redwood Light', 'apex.theme'],
        conteudo: `
            **Universal Theme** (also called **Theme 42** or simply **UT**) has been the default theme for APEX applications since
            **APEX 5.0**. It provides all the HTML, CSS and JavaScript of the UI — page, region, report, list, button and item label
            templates — and is designed so you can build responsive, accessible screens **without writing CSS**, adjusting the
            look declaratively.

            ## What is in the box
            - **12-column responsive grid**: regions, items and buttons reflow on small screens. In Page Designer you control
              placement with the *Layout* attributes (*Start New Row*, *Column*, *Column Span*).
            - **Templates** for every component type, with **Template Options** that turn into CSS classes (color, spacing, size,
              hidden header...).
            - **Theme Styles** and **Theme Roller** to change colors, fonts and the overall look without touching templates.
            - **Template Components** (23.1+): Avatar, Badge, Comments, Content Row, Media List and Timeline — plus **Metric Card**
              and **Blank Page** in 26.1.
            - **Font APEX** (icons), **utility classes** and documented **CSS variables**.
            - **Accessibility** by design: landmarks, heading hierarchy, keyboard navigation and screen reader text.

            ## Page templates
            | Template | When to use |
            |---|---|
            | Standard | Most pages, with the navigation menu. |
            | Left Side Column / Right Side Column | A page with a side column (filters, Faceted Search, summary). |
            | Left and Right Side Columns | Two side columns. |
            | Marquee | Record detail with a rich header and a side column. |
            | Minimal (No Navigation) | Screens without a menu, such as simple public pages. |
            | Login | Login page. |
            | Modal Dialog, Wizard Modal Dialog and Drawer | Pages opened as a dialog or as a side drawer. |

            Navigation can be a collapsible **side menu**, a **top menu** or a **Mega Menu** (since 20.1), set in the user interface
            attributes (*Shared Components → User Interface Attributes*). See [Navigation](#/topico/navegacao).

            ## Universal Theme styles
            | Style | Note |
            |---|---|
            | **Iris** | New default style in 26.1: built on Vita and aligned with Redwood, with Oracle Sans as the first-choice font. |
            | Vita | The default for many years; flagged as *accessibility tested*. |
            | Vita - Dark, Vita - Red, Vita - Slate | Vita variations (Vita - Dark arrived in 19.2). |
            | Redwood Light | Since 20.2; follows the Redwood Design System and has its own Theme Roller options. |

            To customize colors and create your own styles, see [Theme Roller and theme styles](#/topico/theme-roller-e-estilos).

            ## A bit of theme JavaScript
            The «apex.theme» namespace groups theme-related functions, such as opening and closing *Inline Dialog*, *Inline Drawer*,
            *Inline Popup* or *Collapsible* regions and testing media queries:

            ~~~js
            // Open the region whose HTML DOM ID (formerly "Static ID") is "filters"
            apex.theme.openRegion( "filters" );

            // React to window resizing
            apex.jQuery( window ).on( "apexwindowresized", function () {
                if ( apex.theme.mq( "(min-width: 640px)" ) ) {
                    apex.theme.closeRegion( "filters" );
                }
            } );
            ~~~

            ## Keeping the theme up to date
            An application keeps the UT version it was created with until you run **Refresh Theme**. After an APEX upgrade the
            button shows up on the application home page (prominently placed there since 24.2) and brings the new release's
            templates, Template Options and fixes. After refreshing, run the app and test the main screens.

            :::atencao Do not edit UT templates directly
            Universal Theme templates are *subscribed* to the master theme: a **Refresh Theme** overwrites changes made to them.
            To customize, use **Template Options**, **your own CSS** (static file or Theme Roller) and **Template Components**.
            If you really need different HTML, **copy** the template and change the copy.
            :::

            :::novo Recent news
            - **24.2**: theme metadata (templates, styles, Template Components) is stored centrally, decoupled from the
              application — smaller, faster exports. Active style selection moved to the theme level.
            - **26.1**: **Iris** style, **Metric Card** and **Blank Page** Template Components, grouping in Avatar, Timeline,
              Comments and Media List, top and bottom drawers, **Font APEX 2.5**, new utility classes (overflow, tabular numbers,
              flex) and Template Directives in button, list, item, region and page templates.
            :::

            ## The official reference
            The **Universal Theme Reference** ([apex.oracle.com/ut](https://apex.oracle.com/ut)) is an APEX application with live
            examples of every template, Template Option, utility class and component, including the generated HTML markup.
            Whenever you wonder "how do I do this in UT?", start there — and check the theme version in the reference's own menu.
        `
    }
});

DOC.topico({
    id: 'theme-roller-e-estilos',
    cat: 'ui',
    nivel: 'intermediario',
    desde: '5.0',
    links: [
        { t: 'App Builder Guide — Using Theme Roller', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-theme-roller.html' },
        { t: 'App Builder Guide — Using Theme Styles', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/theme-styles.html' },
        { t: 'APEX_THEME (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_THEME.html' }
    ],
    relacionados: ['universal-theme', 'template-options-e-css', 'js-e-css-na-pagina', 'acessibilidade'],
    pt: {
        titulo: 'Theme Roller e theme styles',
        resumo: 'Personalize cores e o visual do Universal Theme com o Theme Roller, crie seus próprios theme styles e deixe o usuário escolher o estilo.',
        tags: ['Theme Roller', 'theme style', 'estilo', 'cores', 'paleta', 'Vita', 'Iris', 'Redwood Light', 'APEX_THEME', 'variáveis CSS', 'apex.utr'],
        conteudo: `
            Um **theme style** é uma folha de estilos aplicada sobre o CSS base do tema. Trocar o estilo muda cores, fontes e
            detalhes visuais da aplicação inteira, sem alterar nenhum template. O **Theme Roller** é a ferramenta visual — executada
            na própria aplicação, em tempo de execução — para criar e ajustar esses estilos. Os dois existem desde o **APEX 5.0**,
            junto com o Universal Theme.

            ## Abrindo o Theme Roller
            1. Execute a aplicação a partir do App Builder, com a *Developer Toolbar* visível.
            2. Na toolbar, clique em **Customize → Theme Roller**.
            3. Escolha o estilo de partida e ajuste os atributos: o resultado aparece na hora, na própria página.

            O diálogo é organizado em seções expansíveis (cores principais, cabeçalho, navegação, corpo, regiões etc.), tem busca
            de atributos, desfazer/refazer e uma seção **Custom CSS**, que aceita CSS ou LESS (switch *Enable LESS Compilation*).

            :::dica Contraste verificado automaticamente
            O Theme Roller analisa o contraste das combinações de cores segundo os critérios do WCAG e mostra um sinal de aprovação
            com a razão de contraste ao lado de cada par. Use isso antes de "inventar" uma paleta.
            :::

            ## Salvando
            | Ação | O que faz |
            |---|---|
            | **Save** | Grava as alterações em um estilo editável e o torna o estilo atual. |
            | **Save As** | Cria um novo estilo com as alterações e o torna o atual. |
            | **Reset** | Descarta as alterações ainda não salvas. |

            Os estilos que acompanham o tema (Iris, Vita, Redwood Light...) são somente leitura: para personalizá-los, use
            **Save As** e dê um nome ao seu estilo.

            ## Atributos de um theme style
            Em *Shared Components → Themes → (tema) → Styles* você edita cada estilo:

            | Atributo | Para que serve |
            |---|---|
            | Is Public | Permite que o usuário final escolha este estilo. |
            | Accessibility Tested | Indica que o estilo foi testado para acessibilidade (o Advisor verifica isso). |
            | File URLs | Arquivos CSS carregados quando o estilo está ativo. |
            | CSS Classes | Classes acrescentadas ao «#PAGE_CSS_CLASSES#» da página. |
            | Read Only | Ligado, impede que o Theme Roller altere o estilo. |
            | Input Parameter File URLs / Output CSS File URL | Arquivos LESS de entrada e o CSS gerado pelo Theme Roller. |

            O estilo ativo da aplicação é escolhido em *Shared Components → User Interface Attributes*.

            ## Deixando o usuário escolher
            Ative **Enable End Users to choose Theme Style** e marque os estilos desejados como **Is Public**: o APEX exibe um link
            **Customize** onde o usuário troca o estilo, e a escolha fica gravada como preferência dele (recurso do 5.1). Pela API
            «APEX_THEME» você faz o mesmo por código:

            ~~~plsql
            -- Usa o estilo "Vita" apenas na sessão atual (ex.: em um processo After Authentication)
            declare
                l_theme_number number;
            begin
                select theme_number
                  into l_theme_number
                  from apex_application_themes
                 where application_id = :APP_ID;

                apex_theme.set_session_style(
                    p_theme_number => l_theme_number,
                    p_name         => 'Vita' );
            end;
            ~~~

            Outras rotinas: «SET_USER_STYLE» (preferência permanente, que tem prioridade sobre o estilo de sessão),
            «GET_USER_STYLE», «CLEAR_USER_STYLE», «CLEAR_ALL_USERS_STYLE», «ENABLE_USER_STYLE» / «DISABLE_USER_STYLE» e
            «SET_CURRENT_STYLE».

            ## Exportar e importar estilos (23.1+)
            No menu de opções ao lado de **Save As** você exporta o estilo como JSON e o importa em outra aplicação:

            ~~~json
            {
                "classes": [],
                "vars": {},
                "customCSS": "",
                "useCustomLess": "N"
            }
            ~~~

            Vita e Iris compartilham o mesmo conjunto de variáveis e trocam exports entre si; o **Redwood Light** usa outro
            conjunto, então importar nele um export do Vita não tem efeito visível. No console do navegador, «apex.utr.config()»
            devolve a configuração atual — e aceita um objeto nesse mesmo formato para aplicá-la.

            ## Variáveis CSS: o jeito moderno de ajustar
            Desde o 21.1 o Universal Theme é construído sobre **variáveis CSS**. Em vez de sobrescrever seletores internos,
            redefina a variável:

            ~~~css
            :root {
                --ut-palette-primary: #0b5d83;
                --ut-palette-primary-contrast: #ffffff;
            }
            ~~~

            Coloque esse CSS no **Custom CSS** do Theme Roller (ele passa a fazer parte do estilo) ou em um arquivo estático da
            aplicação. As variáveis disponíveis estão documentadas no Universal Theme Reference.

            :::novo 26.1
            O estilo padrão passa a ser o **Iris**, e o Theme Roller ganhou personalizações avançadas, com suporte a propriedades
            condicionais e dinâmicas.
            :::
        `
    },
    en: {
        titulo: 'Theme Roller and theme styles',
        resumo: 'Customize Universal Theme colors and look with Theme Roller, create your own theme styles and let users pick a style.',
        tags: ['Theme Roller', 'theme style', 'style', 'colors', 'palette', 'Vita', 'Iris', 'Redwood Light', 'APEX_THEME', 'CSS variables', 'apex.utr'],
        conteudo: `
            A **theme style** is a style sheet applied on top of the theme's base CSS. Switching styles changes colors, fonts and
            visual details across the whole application without changing a single template. **Theme Roller** is the visual tool —
            running inside the application itself, at runtime — to create and tune those styles. Both have existed since
            **APEX 5.0**, together with Universal Theme.

            ## Opening Theme Roller
            1. Run the application from App Builder, with the *Developer Toolbar* visible.
            2. In the toolbar, click **Customize → Theme Roller**.
            3. Pick the starting style and adjust attributes: the result shows up immediately on the page.

            The dialog is organized in expandable sections (main colors, header, navigation, body, regions and so on), has an
            attribute search, undo/redo and a **Custom CSS** section that accepts CSS or LESS (*Enable LESS Compilation* switch).

            :::dica Contrast is checked for you
            Theme Roller analyzes the contrast of color combinations against the WCAG criteria and shows a pass mark with the
            contrast ratio next to each pair. Use it before "inventing" a palette.
            :::

            ## Saving
            | Action | What it does |
            |---|---|
            | **Save** | Saves changes to an editable style and makes it the current style. |
            | **Save As** | Creates a new style with the changes and makes it current. |
            | **Reset** | Discards unsaved changes. |

            The styles shipped with the theme (Iris, Vita, Redwood Light...) are read-only: to customize them, use **Save As** and
            give your style a name.

            ## Theme style attributes
            Under *Shared Components → Themes → (theme) → Styles* you edit each style:

            | Attribute | Purpose |
            |---|---|
            | Is Public | Lets end users choose this style. |
            | Accessibility Tested | Flags the style as tested for accessibility (Advisor checks it). |
            | File URLs | CSS files loaded when the style is active. |
            | CSS Classes | Classes appended to the page's «#PAGE_CSS_CLASSES#». |
            | Read Only | When on, Theme Roller cannot change the style. |
            | Input Parameter File URLs / Output CSS File URL | LESS input files and the CSS generated by Theme Roller. |

            The application's active style is chosen under *Shared Components → User Interface Attributes*.

            ## Letting users choose
            Turn on **Enable End Users to choose Theme Style** and mark the desired styles as **Is Public**: APEX shows a
            **Customize** link where users switch styles, and the choice is stored as their preference (a 5.1 feature). With the
            «APEX_THEME» API you can do the same in code:

            ~~~plsql
            -- Use the "Vita" style for the current session only (e.g. in an After Authentication process)
            declare
                l_theme_number number;
            begin
                select theme_number
                  into l_theme_number
                  from apex_application_themes
                 where application_id = :APP_ID;

                apex_theme.set_session_style(
                    p_theme_number => l_theme_number,
                    p_name         => 'Vita' );
            end;
            ~~~

            Other routines: «SET_USER_STYLE» (permanent preference, which takes precedence over the session style),
            «GET_USER_STYLE», «CLEAR_USER_STYLE», «CLEAR_ALL_USERS_STYLE», «ENABLE_USER_STYLE» / «DISABLE_USER_STYLE» and
            «SET_CURRENT_STYLE».

            ## Exporting and importing styles (23.1+)
            From the options menu next to **Save As** you export a style as JSON and import it into another application:

            ~~~json
            {
                "classes": [],
                "vars": {},
                "customCSS": "",
                "useCustomLess": "N"
            }
            ~~~

            Vita and Iris share the same variable set and can exchange exports; **Redwood Light** uses a different set, so importing
            a Vita export into it has no visible effect. In the browser console, «apex.utr.config()» returns the current
            configuration — and accepts an object in the same format to apply it.

            ## CSS variables: the modern way to tweak
            Since 21.1 Universal Theme is built on **CSS variables**. Instead of overriding internal selectors, redefine the variable:

            ~~~css
            :root {
                --ut-palette-primary: #0b5d83;
                --ut-palette-primary-contrast: #ffffff;
            }
            ~~~

            Put this CSS in Theme Roller's **Custom CSS** (it becomes part of the style) or in an application static file. The
            available variables are documented in the Universal Theme Reference.

            :::novo 26.1
            **Iris** becomes the default style, and Theme Roller gained advanced customizations, with support for conditional and
            dynamic properties.
            :::
        `
    }
});

DOC.topico({
    id: 'template-options-e-css',
    cat: 'ui',
    nivel: 'intermediario',
    desde: '5.0',
    links: [
        { t: 'App Builder Guide — Understanding Template Options', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/understanding-template-options.html' },
        { t: 'Universal Theme Reference — utilitários e exemplos', u: 'https://apex.oracle.com/ut' }
    ],
    relacionados: ['universal-theme', 'theme-roller-e-estilos', 'icones-font-apex', 'js-e-css-na-pagina'],
    pt: {
        titulo: 'Template Options e classes utilitárias CSS',
        resumo: 'Mude a aparência de regiões, botões e itens sem CSS usando Template Options, e use as classes utilitárias do Universal Theme nos ajustes finos.',
        tags: ['Template Options', 'CSS Classes', 'classes utilitárias', 'u-color', 'u-hidden', 'u-VisuallyHidden', 'padding', 'margin', 'flex', 'Live Template Options', '#DEFAULT#', 't-Button--hot'],
        conteudo: `
            **Template Options** são modificadores declarativos dos templates do Universal Theme. Cada opção corresponde a uma ou
            mais **classes CSS**: ao marcar *Hot* em um botão, por exemplo, o APEX acrescenta a classe «t-Button--hot» ao HTML.
            O mesmo template gera visuais diferentes sem uma linha de CSS. Elas existem desde o **APEX 5.0**; o **5.1** trouxe as
            *Live Template Options*, que permitem ajustar componentes com a aplicação em execução.

            ## Onde ficam
            No Page Designer, selecione uma página, região, relatório, lista, breadcrumb, item, label ou botão e clique em
            **Template Options** (grupo *Appearance*). As opções são organizadas em **grupos** — como tamanho e estilo de botão,
            ou posição do label de um formulário.

            | Conceito | Significado |
            |---|---|
            | Grupo | Conjunto de opções mutuamente exclusivas (ex.: o tamanho de um botão). |
            | Preset | Valor padrão de um grupo, aplicado a componentes novos. |
            | «#DEFAULT#» | Representa as opções padrão do template. Não é gravado no componente: mudar o padrão no template afeta todos os componentes que o usam. |
            | Live Template Options | Diálogo para testar opções na página em execução, sem recarregá-la. |

            ## Exemplos de opções e classes geradas
            | Componente | Template Option | Classe |
            |---|---|---|
            | Botão | Hot | «t-Button--hot» |
            | Botão | Type: Danger / Success / Warning | «t-Button--danger», «t-Button--success», «t-Button--warning» |
            | Botão | Size: Small / Large | «t-Button--small», «t-Button--large» |
            | Região | Accent (cor de destaque) | «t-Region--accent1» a «t-Region--accent15» |
            | Região | Remove Body Padding | «t-Region--noPadding» |
            | Item | Stretch Form Item | «t-Form-fieldContainer--stretchInputs» |

            ## Classes utilitárias
            Além das Template Options, o Universal Theme traz **classes utilitárias** para usar no atributo **CSS Classes** de
            regiões, itens e botões, ou no seu próprio HTML:

            | Categoria | Exemplos |
            |---|---|
            | Cores da paleta | «u-color-1» a «u-color-45», com variações «-text», «-bg» e «-border» (ex.: «u-color-7-text») |
            | Cores de estado | «u-success», «u-danger», «u-warning», «u-info», «u-hot», «u-normal» e variações como «u-danger-text» |
            | Espaçamento | «padding-none», «padding-sm», «padding-md», «margin-top-lg», «margin-bottom-none» (também com prefixo «u-») |
            | Texto | «u-textCenter», «u-textRight», «u-textUpper», «u-bold», «u-nowrap», «u-truncate», «u-lineclamp-2» |
            | Tipografia (24.2+) | «u-text-heading-md», «u-text-body-sm», «u-text-bold» |
            | Visibilidade | «u-hidden», «u-visible», «u-VisuallyHidden» (oculta só visualmente), «hidden-xs-down», «hidden-md-up» |
            | Flexbox | «u-flex», «u-justify-content-space-between», «u-align-items-center», «u-gap-2», «u-flex-grow-1» |
            | Outros | «u-shadow-md», «u-opacity-50» e, no 26.1, «u-overflow-auto» e «u-tabular-nums» |

            ~~~html
            <div class="u-flex u-justify-content-space-between u-align-items-center u-gap-2 padding-md">
              <span class="u-text-heading-sm">Pedido &P10_NUMERO!HTML.</span>
              <span class="u-success-text u-bold">Pago</span>
            </div>
            <p class="u-color-14-text margin-top-sm">Entrega prevista: &P10_ENTREGA!HTML.</p>
            <span class="u-VisuallyHidden">Texto lido apenas por leitores de tela</span>
            ~~~

            ## Quando escrever CSS próprio
            1. Primeiro procure uma **Template Option**.
            2. Depois, uma **classe utilitária** ou uma **variável CSS** do tema («--ut-...»).
            3. Só então escreva CSS — em um arquivo estático e com um prefixo próprio (ex.: «minhaapp-»), para não colidir com as
               classes do tema («t-»), as utilitárias («u-») e as do núcleo do APEX («a-»).

            ~~~css
            /* Arquivo estático app.css */
            .minhaapp-linha-atrasada {
                background-color: var(--ut-palette-danger);
                color: var(--ut-palette-danger-contrast);
            }
            ~~~

            :::atencao Não dependa de classes internas
            Classes de estrutura dos templates (como «t-Region-body») podem mudar entre versões do tema. Template Options, classes
            utilitárias e variáveis CSS documentadas formam o "contrato" estável — prefira-os e teste o CSS próprio após cada
            **Refresh Theme**.
            :::

            :::dica Template Options em massa
            O Page Designer permite selecionar vários componentes e editar propriedades em conjunto — útil para padronizar
            Template Options de várias regiões ou botões de uma vez.
            :::

            :::novo 24.2 e 26.1
            O 24.2 trouxe classes de tipografia, sombras, ordem de flex e padding/margin; o 26.1 acrescentou classes de overflow,
            números tabulares e flex, além de variáveis CSS em mais componentes do núcleo.
            :::
        `
    },
    en: {
        titulo: 'Template Options and CSS utility classes',
        resumo: 'Change how regions, buttons and items look without CSS using Template Options, and use Universal Theme utility classes for fine-tuning.',
        tags: ['Template Options', 'CSS Classes', 'utility classes', 'u-color', 'u-hidden', 'u-VisuallyHidden', 'padding', 'margin', 'flex', 'Live Template Options', '#DEFAULT#', 't-Button--hot'],
        conteudo: `
            **Template Options** are declarative modifiers of Universal Theme templates. Each option maps to one or more **CSS
            classes**: when you tick *Hot* on a button, for example, APEX adds the «t-Button--hot» class to the HTML. The same
            template produces different looks without a line of CSS. They have existed since **APEX 5.0**; **5.1** added *Live
            Template Options*, which let you tweak components while the application is running.

            ## Where to find them
            In Page Designer, select a page, region, report, list, breadcrumb, item, label or button and click **Template Options**
            (*Appearance* group). Options are organized in **groups** — such as button size and style, or form label position.

            | Concept | Meaning |
            |---|---|
            | Group | A set of mutually exclusive options (e.g. a button's size). |
            | Preset | A group's default value, applied to new components. |
            | «#DEFAULT#» | Stands for the template's default options. It is not stored on the component: changing the default in the template affects every component using it. |
            | Live Template Options | A dialog to try options on the running page without reloading it. |

            ## Sample options and generated classes
            | Component | Template Option | Class |
            |---|---|---|
            | Button | Hot | «t-Button--hot» |
            | Button | Type: Danger / Success / Warning | «t-Button--danger», «t-Button--success», «t-Button--warning» |
            | Button | Size: Small / Large | «t-Button--small», «t-Button--large» |
            | Region | Accent (highlight color) | «t-Region--accent1» to «t-Region--accent15» |
            | Region | Remove Body Padding | «t-Region--noPadding» |
            | Item | Stretch Form Item | «t-Form-fieldContainer--stretchInputs» |

            ## Utility classes
            Besides Template Options, Universal Theme ships **utility classes** you can put in the **CSS Classes** attribute of
            regions, items and buttons, or in your own HTML:

            | Category | Examples |
            |---|---|
            | Palette colors | «u-color-1» to «u-color-45», with «-text», «-bg» and «-border» variants (e.g. «u-color-7-text») |
            | State colors | «u-success», «u-danger», «u-warning», «u-info», «u-hot», «u-normal» and variants such as «u-danger-text» |
            | Spacing | «padding-none», «padding-sm», «padding-md», «margin-top-lg», «margin-bottom-none» (also with a «u-» prefix) |
            | Text | «u-textCenter», «u-textRight», «u-textUpper», «u-bold», «u-nowrap», «u-truncate», «u-lineclamp-2» |
            | Typography (24.2+) | «u-text-heading-md», «u-text-body-sm», «u-text-bold» |
            | Visibility | «u-hidden», «u-visible», «u-VisuallyHidden» (hidden only visually), «hidden-xs-down», «hidden-md-up» |
            | Flexbox | «u-flex», «u-justify-content-space-between», «u-align-items-center», «u-gap-2», «u-flex-grow-1» |
            | Other | «u-shadow-md», «u-opacity-50» and, in 26.1, «u-overflow-auto» and «u-tabular-nums» |

            ~~~html
            <div class="u-flex u-justify-content-space-between u-align-items-center u-gap-2 padding-md">
              <span class="u-text-heading-sm">Order &P10_NUMBER!HTML.</span>
              <span class="u-success-text u-bold">Paid</span>
            </div>
            <p class="u-color-14-text margin-top-sm">Expected delivery: &P10_DELIVERY!HTML.</p>
            <span class="u-VisuallyHidden">Text read only by screen readers</span>
            ~~~

            ## When to write your own CSS
            1. First look for a **Template Option**.
            2. Then for a **utility class** or a theme **CSS variable** («--ut-...»).
            3. Only then write CSS — in a static file and with your own prefix (e.g. «myapp-»), so it does not collide with theme
               classes («t-»), utilities («u-») or APEX core classes («a-»).

            ~~~css
            /* Static file app.css */
            .myapp-late-row {
                background-color: var(--ut-palette-danger);
                color: var(--ut-palette-danger-contrast);
            }
            ~~~

            :::atencao Do not rely on internal classes
            Template structure classes (such as «t-Region-body») may change between theme versions. Template Options, utility
            classes and documented CSS variables are the stable "contract" — prefer them and retest your own CSS after every
            **Refresh Theme**.
            :::

            :::dica Template Options in bulk
            Page Designer lets you select several components and edit shared properties together — handy to standardize the
            Template Options of many regions or buttons at once.
            :::

            :::novo 24.2 and 26.1
            24.2 added typography, shadow, flex order and padding/margin classes; 26.1 added overflow, tabular numbers and flex
            classes, plus CSS variables in more core components.
            :::
        `
    }
});

DOC.topico({
    id: 'template-components',
    cat: 'ui',
    nivel: 'avancado',
    desde: '23.1',
    links: [
        { t: 'App Builder Guide — Template Components', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/template-components.html' },
        { t: 'App Builder Guide — Template Component Type Plug-ins', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/template-component-type-plug-ins.html' }
    ],
    relacionados: ['template-directives', 'plugins', 'cards', 'interactive-report', 'universal-theme'],
    pt: {
        titulo: 'Template Components',
        resumo: 'Plug-ins baseados em HTML e Template Directives para criar componentes visuais reutilizáveis — como região, relatório ou coluna de relatório.',
        tags: ['Template Components', 'plug-in', 'partial', 'report', 'slots', 'actions', 'THEME$AVATAR', 'Avatar', 'Badge', 'Content Row', 'Metric Card', '{apply}', 'APEX$SELECTOR'],
        conteudo: `
            **Template Components** são um tipo de **plug-in** introduzido no **APEX 23.1** para criar componentes de interface
            reutilizáveis a partir de um **template HTML** com placeholders e [Template Directives](#/topico/template-directives) —
            sem escrever PL/SQL de renderização. No Page Designer eles se comportam como componentes nativos: aparecem como tipo de
            região (e como tipo de coluna de relatório), com atributos próprios no painel de propriedades.

            ## Os componentes do Universal Theme
            | Componente | Uso típico |
            |---|---|
            | Avatar | Foto, iniciais ou ícone de uma pessoa ou entidade. |
            | Badge | Rótulo e valor com cor de estado (ex.: "Status: Aprovado"). |
            | Comments | Lista de comentários (no 26.1, com estilos de mensagem enviada e recebida). |
            | Content Row | Linhas com título, descrição, ícone ou avatar e ações — ótimo para listas. |
            | Media List | Lista com imagem ou ícone, título e texto. |
            | Timeline | Eventos em ordem cronológica. |
            | Metric Card (26.1) | Cartão para exibir um indicador. |
            | Blank Page (26.1) | Novo componente do UT 26.1 (veja exemplos no Universal Theme Reference). |

            ## Formas de exibição
            | *Available as* | Como aparece |
            |---|---|
            | **Single (Partial)** | Região que mostra uma linha, ou coluna de Interactive Report (ex.: um Avatar dentro da coluna). |
            | **Multiple (Report)** | Região de relatório: várias linhas, paginação, Faceted Search e Smart Filters, ordenação externa, seleção e agrupamento. |
            | Region Only | Região com valores estáticos, sem fonte de dados. |

            ## Evolução
            | Versão | Novidade |
            |---|---|
            | 23.1 | Template Components como plug-in, 6 componentes no UT, uso como região ou coluna; ações e menus com condições por linha. |
            | 23.2 | Fim do limite de 25 atributos (coluna JSON «ATTRIBUTES» nas views do dicionário). |
            | 24.1 | **Slots**, seleção declarativa (simples ou múltipla) com o placeholder «APEX$SELECTOR», componentes sem fonte de dados e «#APEX$DOM_ID#». |
            | 24.2 | Quebras de controle (agrupamento) declarativas em relatórios. |
            | 26.1 | Metric Card e Blank Page, grupos em Avatar/Timeline/Comments/Media List e **partials no lado do cliente** (Combobox, Select One, Select Many, Maps, colunas de IG e Cards). |

            ## Aplicando um partial em qualquer HTML Expression
            Com as diretivas «{with/}» e «{apply/}» você aplica um componente em Cards, colunas de relatório e outros templates.
            Cada linha antes do «{apply}» atribui um valor a um atributo do componente:

            ~~~html
            {with/}
            TYPE:=IMAGE
            IMAGE:=&FOTO_URL.
            ALT:={if NOME/}&NOME.{else/}Foto do cliente{endif/}
            {apply THEME$AVATAR/}
            ~~~

            ## Criando o seu
            1. *Shared Components → Plug-ins → Create*, com tipo **Template Component**.
            2. Escreva o HTML em **Templates** (o *Partial* e, para relatórios, os templates de corpo e de linha), usando
               placeholders «#NOME#» e diretivas.
            3. Clique em **Synchronize from Templates** para criar os **Custom Attributes** a partir dos placeholders.
            4. Defina *Available as* e, se precisar, *Action Positions*, *Action Templates* (botão ou menu) e *Slots*.

            Partial de um "cartão de status":

            ~~~html
            <div class="minhaapp-status {if IS_LATE/}minhaapp-status--late{endif/}">
              <span class="fa #ICON#" aria-hidden="true"></span>
              <div>
                <h3 class="minhaapp-status-title">#TITLE#</h3>
                {if ?DESCRIPTION/}<p>#DESCRIPTION#</p>{endif/}
              </div>
            </div>
            ~~~

            No Page Designer, cada atributo (*Title*, *Description*, *Icon*, *Is Late*) recebe uma coluna da consulta — por exemplo
            «&NOME_CLIENTE.» — ou um valor fixo. Em uma HTML Expression, o mesmo componente pode ser aplicado com
            «{apply NOME_INTERNO/}», usando o nome interno do plug-in.

            :::dica Prefira Template Components a HTML montado no SQL
            Em vez de concatenar HTML na consulta (difícil de manter e um convite a XSS), devolva só os dados e deixe o componente
            cuidar da marcação. A aparência fica padronizada em um único lugar e pode ser compartilhada entre aplicações por
            [subscriptions](#/topico/reutilizacao-e-subscriptions).
            :::

            ## Consultando os atributos no dicionário
            Desde o 23.2, os valores dos atributos de Template Components não aparecem em «ATTRIBUTE_01» a «ATTRIBUTE_25»; use a
            coluna JSON «ATTRIBUTES», cuja chave é o Static ID do atributo:

            ~~~sql
            select r.region_name,
                   r.attributes
              from apex_application_page_regions r
             where r.application_id = 100
               and r.page_id        = 1;
            ~~~

            :::atencao Acessibilidade em relatórios
            Ao criar componentes do tipo relatório, cuide da semântica (listas, papéis ARIA, rótulos). Use «#APEX$DOM_ID#» para
            gerar IDs únicos e ligar títulos a conteúdos com «aria-labelledby».
            :::
        `
    },
    en: {
        titulo: 'Template Components',
        resumo: 'HTML and Template Directive based plug-ins to build reusable UI components — as a region, a report or a report column.',
        tags: ['Template Components', 'plug-in', 'partial', 'report', 'slots', 'actions', 'THEME$AVATAR', 'Avatar', 'Badge', 'Content Row', 'Metric Card', '{apply}', 'APEX$SELECTOR'],
        conteudo: `
            **Template Components** are a **plug-in** type introduced in **APEX 23.1** for building reusable UI components from an
            **HTML template** with placeholders and [Template Directives](#/topico/template-directives) — with no PL/SQL rendering
            code. In Page Designer they behave like native components: they appear as a region type (and as a report column type),
            with their own attributes in the property editor.

            ## Universal Theme components
            | Component | Typical use |
            |---|---|
            | Avatar | Photo, initials or icon of a person or entity. |
            | Badge | Label and value with a state color (e.g. "Status: Approved"). |
            | Comments | A list of comments (with sent/received message styles in 26.1). |
            | Content Row | Rows with title, description, icon or avatar and actions — great for lists. |
            | Media List | A list with image or icon, title and text. |
            | Timeline | Events in chronological order. |
            | Metric Card (26.1) | A card to display an indicator. |
            | Blank Page (26.1) | A new UT 26.1 component (see examples in the Universal Theme Reference). |

            ## Display modes
            | *Available as* | How it shows up |
            |---|---|
            | **Single (Partial)** | A region showing one row, or an Interactive Report column (e.g. an Avatar inside the column). |
            | **Multiple (Report)** | A report region: many rows, pagination, Faceted Search and Smart Filters, external ordering, selection and grouping. |
            | Region Only | A region with static values and no data source. |

            ## How it evolved
            | Release | What changed |
            |---|---|
            | 23.1 | Template Components as a plug-in type, 6 UT components, usable as region or column; actions and menus with per-row conditions. |
            | 23.2 | The 25-attribute limit was removed (JSON «ATTRIBUTES» column in dictionary views). |
            | 24.1 | **Slots**, declarative single/multiple selection with the «APEX$SELECTOR» placeholder, components without a data source and «#APEX$DOM_ID#». |
            | 24.2 | Declarative control breaks (grouping) in reports. |
            | 26.1 | Metric Card and Blank Page, grouping in Avatar/Timeline/Comments/Media List and **client-side partials** (Combobox, Select One, Select Many, Maps, IG columns and Cards). |

            ## Applying a partial in any HTML Expression
            With the «{with/}» and «{apply/}» directives you apply a component in Cards, report columns and other templates. Each
            line before «{apply}» assigns a value to one of the component's attributes:

            ~~~html
            {with/}
            TYPE:=IMAGE
            IMAGE:=&PHOTO_URL.
            ALT:={if NAME/}&NAME.{else/}Customer photo{endif/}
            {apply THEME$AVATAR/}
            ~~~

            ## Building your own
            1. *Shared Components → Plug-ins → Create*, with type **Template Component**.
            2. Write the HTML under **Templates** (the *Partial* and, for reports, the body and row templates), using «#NAME#»
               placeholders and directives.
            3. Click **Synchronize from Templates** to create the **Custom Attributes** from the placeholders.
            4. Set *Available as* and, if needed, *Action Positions*, *Action Templates* (button or menu) and *Slots*.

            Partial for a "status card":

            ~~~html
            <div class="myapp-status {if IS_LATE/}myapp-status--late{endif/}">
              <span class="fa #ICON#" aria-hidden="true"></span>
              <div>
                <h3 class="myapp-status-title">#TITLE#</h3>
                {if ?DESCRIPTION/}<p>#DESCRIPTION#</p>{endif/}
              </div>
            </div>
            ~~~

            In Page Designer each attribute (*Title*, *Description*, *Icon*, *Is Late*) gets a query column — for example
            «&CUSTOMER_NAME.» — or a fixed value. In an HTML Expression the same component can be applied with
            «{apply INTERNAL_NAME/}», using the plug-in's internal name.

            :::dica Prefer Template Components over HTML built in SQL
            Instead of concatenating HTML in the query (hard to maintain and an invitation to XSS), return only data and let the
            component handle the markup. The look is defined in a single place and can be shared across applications through
            [subscriptions](#/topico/reutilizacao-e-subscriptions).
            :::

            ## Querying attributes in the dictionary
            Since 23.2, Template Component attribute values no longer show up in «ATTRIBUTE_01» to «ATTRIBUTE_25»; use the JSON
            «ATTRIBUTES» column, keyed by the attribute's Static ID:

            ~~~sql
            select r.region_name,
                   r.attributes
              from apex_application_page_regions r
             where r.application_id = 100
               and r.page_id        = 1;
            ~~~

            :::atencao Accessibility in report components
            When building report-type components, take care of semantics (lists, ARIA roles, labels). Use «#APEX$DOM_ID#» to
            generate unique IDs and link headings to content with «aria-labelledby».
            :::
        `
    }
});

DOC.topico({
    id: 'template-directives',
    cat: 'ui',
    nivel: 'intermediario',
    desde: '20.2',
    links: [
        { t: 'App Builder Guide — Using Template Directives', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/using-template-directives.html' },
        { t: 'apex.util.applyTemplate (JavaScript API)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.util.html' }
    ],
    relacionados: ['template-components', 'substituicoes', 'escaping-e-xss', 'classic-report', 'cards'],
    pt: {
        titulo: 'Template Directives',
        resumo: 'A mini-linguagem de templates do APEX: {if}, {case}, {loop}, {with/}{apply/} e comentários — onde usar, regras de verdadeiro/falso e exemplos.',
        tags: ['template directives', 'diretivas', '{if}', '{case}', '{loop}', '{with}', '{apply}', 'HTML Expression', 'apex.util.applyTemplate', 'APEX$ITEM', 'APEX$DOM_ID'],
        conteudo: `
            **Template Directives** são instruções entre chaves que controlam o processamento de um template de texto ou HTML:
            condições, escolhas, laços e aplicação de componentes. Elas surgiram no **APEX 20.2** (Cards e HTML Expressions do
            Interactive Grid), chegaram às mensagens de alert/confirm no 21.2, às colunas de Classic Report e Interactive Report
            no **22.2** e, no **26.1**, aos próprios templates do tema. Com elas, a lógica de exibição sai do SQL e vai para o template.

            ## Onde funcionam
            - HTML Expressions de colunas de **Classic Report**, **Interactive Report** e **Interactive Grid**; regiões **Cards** e **Search**.
            - **Template Components**, onde são usadas o tempo todo.
            - Atributos específicos de **Email Templates**, o item **Combobox** e o *Request Body Template* de **REST Data Sources** (26.1).
            - No JavaScript, com «apex.util.applyTemplate».
            - No 26.1, nos templates de botão, lista, item, região e página.

            Alguns atributos processam as diretivas no servidor e outros no navegador: a ajuda do Page Designer indica qual
            ("Supports Server-side / Client-side Template Directives").

            ## Sintaxe
            | Diretiva | Para que serve |
            |---|---|
            | «{if NOME/} ... {elseif OUTRO/} ... {else/} ... {endif/}» | Condição |
            | «{case NOME/}{when VALOR/} ... {otherwise/} ... {endcase/}» | Escolha por valor (comparação sensível a maiúsculas) |
            | «{loop "," NOME/} ... {endloop/}» | Repete o trecho para cada item de uma lista delimitada |
            | «{with/} ATRIBUTO:=valor {apply COMPONENTE/}» | Aplica um Template Component |
            | «{!comentário/}» | Comentário (não aparece na saída) |
            | «{{/}» | Escreve uma chave literal quando ela puder ser confundida com uma diretiva |

            «NOME» pode ser uma coluna, um item de página ou um placeholder. As diretivas podem ser aninhadas.

            ## Verdadeiro ou falso?
            Para «{if}», um valor é **falso** quando, sem espaços, está vazio ou vale «F», «N» ou «0»; qualquer outro valor é
            verdadeiro. Prefixos mudam o teste:

            | Forma | Verdadeira quando |
            |---|---|
            | «{if X/}» | X não é vazio e não é F, N ou 0 |
            | «{if !X/}» | X é vazio ou vale F, N ou 0 |
            | «{if ?X/}» | X não é vazio (teste só de vazio: "N" conta como preenchido) |
            | «{if !?X/}» | X é vazio |
            | «{if =X/}» | X não vale F, N ou 0 (teste booleano explícito; vazio conta como verdadeiro) |
            | «{if !=X/}» | X vale F, N ou 0 |

            :::atencao A armadilha do "N" e do "0"
            Se uma coluna pode conter literalmente «N» (uma sigla) ou «0» (quantidade zero), «{if QTD/}» a considera falsa. Quando a
            pergunta é "está preenchido?", use «{if ?QTD/}».
            :::

            ## Exemplos
            Coluna de Classic ou Interactive Report (HTML Expression), trocando um CASE no SQL:

            ~~~html
            {case STATUS/}
            {when PAGO/}<span class="u-success-text">Pago</span>
            {when ATRASADO/}<span class="u-danger-text u-bold">Atrasado</span>
            {otherwise/}<span>#STATUS#</span>
            {endcase/}
            ~~~

            Lista de tags em um card (coluna TAGS com o valor "sql,plsql,apex"); dentro do laço, «APEX$ITEM» é o item atual e
            «APEX$I» a posição (a partir de 1):

            ~~~html
            <ul class="minhaapp-tags">{loop "," TAGS/}
              <li>&APEX$ITEM.</li>
            {endloop/}</ul>
            ~~~

            Valor alternativo com comentário:

            ~~~html
            {!mostra a descrição ou um texto padrão/}
            {if ?DESCRICAO/}&DESCRICAO.{else/}<em>Sem descrição</em>{endif/}
            ~~~

            Aplicando um Template Component (veja [Template Components](#/topico/template-components)):

            ~~~html
            {with/}
            TYPE:=INITIALS
            INITIALS:=&INICIAIS.
            {apply THEME$AVATAR/}
            ~~~

            ## No JavaScript
            «apex.util.applyTemplate» processa diretivas, placeholders («#NOME#», passados em «placeholders») e substituições de
            itens com os valores atuais do navegador:

            ~~~js
            var html = apex.util.applyTemplate(
                "{if ?P1_NOME/}Olá, &P1_NOME!HTML.{else/}Olá, visitante{endif/} — #TOTAL# pedidos",
                { placeholders: { TOTAL: "12" } } );

            apex.jQuery( "#saudacao" ).html( html );
            ~~~

            Desde o 24.1, «#APEX$DOM_ID#» gera um ID único a cada execução do template — útil para ligar elementos com ARIA:

            ~~~html
            <h3 id="#APEX$DOM_ID#_titulo">#TITLE#</h3>
            <div role="region" aria-labelledby="#APEX$DOM_ID#_titulo">#BODY#</div>
            ~~~

            :::dica O escape continua valendo
            Diretivas controlam a estrutura; o escape dos valores segue as regras normais de substituição. Use filtros como «!HTML»
            e «!ATTR» onde fizer sentido e nunca «!RAW» com dados digitados pelo usuário — veja [XSS e escaping](#/topico/escaping-e-xss).
            :::

            :::novo 26.1
            - Editor de código com realce de sintaxe para diretivas; digitar «{» lista as diretivas, e «#» ou «&» lista
              placeholders e substituições.
            - Diretivas nos templates de botão, lista, item, região e página (facilita manter templates e reutilizar partials).
            - Atributos de plug-ins ganham o ajuste *Template Support* (None, Substitutions, Template Directives - Client).
            - «apex.util» ganhou «applyNamedTemplate», «defineTemplates», «getTemplateDef» e «listTemplates».
            :::
        `
    },
    en: {
        titulo: 'Template Directives',
        resumo: 'The APEX template mini-language: {if}, {case}, {loop}, {with/}{apply/} and comments — where to use them, truthiness rules and examples.',
        tags: ['template directives', 'directives', '{if}', '{case}', '{loop}', '{with}', '{apply}', 'HTML Expression', 'apex.util.applyTemplate', 'APEX$ITEM', 'APEX$DOM_ID'],
        conteudo: `
            **Template Directives** are instructions in curly braces that control how a text or HTML template is processed:
            conditions, choices, loops and applying components. They appeared in **APEX 20.2** (Cards and Interactive Grid HTML
            Expressions), reached alert/confirm messages in 21.2, Classic Report and Interactive Report columns in **22.2** and,
            in **26.1**, the theme templates themselves. With them, display logic moves out of SQL and into the template.

            ## Where they work
            - HTML Expressions of **Classic Report**, **Interactive Report** and **Interactive Grid** columns; **Cards** and **Search** regions.
            - **Template Components**, where they are used all the time.
            - Specific **Email Templates** attributes, the **Combobox** item and the *Request Body Template* of **REST Data Sources** (26.1).
            - In JavaScript, through «apex.util.applyTemplate».
            - In 26.1, button, list, item, region and page templates.

            Some attributes process directives on the server and others in the browser: Page Designer help tells you which
            ("Supports Server-side / Client-side Template Directives").

            ## Syntax
            | Directive | Purpose |
            |---|---|
            | «{if NAME/} ... {elseif OTHER/} ... {else/} ... {endif/}» | Condition |
            | «{case NAME/}{when VALUE/} ... {otherwise/} ... {endcase/}» | Choice by value (case-sensitive comparison) |
            | «{loop "," NAME/} ... {endloop/}» | Repeats the block for each item of a delimited list |
            | «{with/} ATTRIBUTE:=value {apply COMPONENT/}» | Applies a Template Component |
            | «{!comment/}» | Comment (not rendered) |
            | «{{/}» | Outputs a literal brace when it could be mistaken for a directive |

            «NAME» can be a column, a page item or a placeholder. Directives can be nested.

            ## True or false?
            For «{if}», a value is **false** when, trimmed, it is empty or equals «F», «N» or «0»; anything else is true. Prefixes
            change the test:

            | Form | True when |
            |---|---|
            | «{if X/}» | X is not empty and not F, N or 0 |
            | «{if !X/}» | X is empty or F, N or 0 |
            | «{if ?X/}» | X is not empty (emptiness test only: "N" counts as filled in) |
            | «{if !?X/}» | X is empty |
            | «{if =X/}» | X is not F, N or 0 (explicit boolean test; empty counts as true) |
            | «{if !=X/}» | X is F, N or 0 |

            :::atencao The "N" and "0" trap
            If a column can literally hold «N» (an abbreviation) or «0» (a zero quantity), «{if QTY/}» treats it as false. When the
            question is "is it filled in?", use «{if ?QTY/}».
            :::

            ## Examples
            Classic or Interactive Report column (HTML Expression), replacing a CASE in SQL:

            ~~~html
            {case STATUS/}
            {when PAID/}<span class="u-success-text">Paid</span>
            {when LATE/}<span class="u-danger-text u-bold">Late</span>
            {otherwise/}<span>#STATUS#</span>
            {endcase/}
            ~~~

            Tag list in a card (TAGS column holding "sql,plsql,apex"); inside the loop, «APEX$ITEM» is the current item and
            «APEX$I» its 1-based position:

            ~~~html
            <ul class="myapp-tags">{loop "," TAGS/}
              <li>&APEX$ITEM.</li>
            {endloop/}</ul>
            ~~~

            Fallback value with a comment:

            ~~~html
            {!show the description or a default text/}
            {if ?DESCRIPTION/}&DESCRIPTION.{else/}<em>No description</em>{endif/}
            ~~~

            Applying a Template Component (see [Template Components](#/topico/template-components)):

            ~~~html
            {with/}
            TYPE:=INITIALS
            INITIALS:=&INITIALS.
            {apply THEME$AVATAR/}
            ~~~

            ## In JavaScript
            «apex.util.applyTemplate» processes directives, placeholders («#NAME#», passed in «placeholders») and item
            substitutions using the current browser values:

            ~~~js
            var html = apex.util.applyTemplate(
                "{if ?P1_NAME/}Hello, &P1_NAME!HTML.{else/}Hello, guest{endif/} — #TOTAL# orders",
                { placeholders: { TOTAL: "12" } } );

            apex.jQuery( "#greeting" ).html( html );
            ~~~

            Since 24.1, «#APEX$DOM_ID#» generates a unique ID on every template execution — handy to link elements with ARIA:

            ~~~html
            <h3 id="#APEX$DOM_ID#_title">#TITLE#</h3>
            <div role="region" aria-labelledby="#APEX$DOM_ID#_title">#BODY#</div>
            ~~~

            :::dica Escaping still applies
            Directives control structure; value escaping follows the normal substitution rules. Use filters such as «!HTML» and
            «!ATTR» where appropriate and never «!RAW» with user-entered data — see [XSS and escaping](#/topico/escaping-e-xss).
            :::

            :::novo 26.1
            - Code editor with directive syntax highlighting; typing «{» lists the directives, and «#» or «&» lists placeholders
              and substitutions.
            - Directives in button, list, item, region and page templates (easier template maintenance and partial reuse).
            - Plug-in attributes get a *Template Support* setting (None, Substitutions, Template Directives - Client).
            - «apex.util» gained «applyNamedTemplate», «defineTemplates», «getTemplateDef» and «listTemplates».
            :::
        `
    }
});

DOC.topico({
    id: 'icones-font-apex',
    cat: 'ui',
    nivel: 'basico',
    desde: '5.1',
    links: [
        { t: 'App Builder Guide — Accessing Font APEX', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/accessing-font-apex.html' },
        { t: 'Universal Theme Reference — ícones', u: 'https://apex.oracle.com/ut' }
    ],
    relacionados: ['universal-theme', 'template-options-e-css', 'acessibilidade', 'cards'],
    pt: {
        titulo: 'Ícones: Font APEX',
        resumo: 'A biblioteca de ícones do Universal Theme: classes fa-*, tamanhos, animações, modificadores, bandeiras e boas práticas de acessibilidade.',
        tags: ['Font APEX', 'ícones', 'icons', 'fa-', 'Font Awesome', 'fam-', 'Pick Icon', 'bandeiras', 'fa-flag', 'fa-lg', 'fa-anim-spin'],
        conteudo: `
            O **Font APEX** é a biblioteca de ícones do Universal Theme. Estreou no **APEX 5.1** — antes o UT usava o Font Awesome
            4.2 — e hoje reúne **mais de 1.150 ícones** desenhados em duas grades: **Small (16×16)**, para botões e menus, e
            **Large (32×32)**, para cards, media lists e regiões hero. Os componentes escolhem o tamanho adequado conforme o contexto.

            ## Versões
            | APEX | Font APEX | Destaque |
            |---|---|---|
            | 5.1 | Primeira versão | Substitui o Font Awesome no Universal Theme. |
            | 18.1 | 2 | Atualização da biblioteca. |
            | 18.2 | 2.1 | Ícones adicionais. |
            | 21.1 | 2.2 | 95 ícones novos (área médica, marcadores de mapa, tipos de arquivo). |
            | 24.2 | 2.4 | 244 bandeiras de países: «fa-flag-br», «fa-flag-pt», «fa-flag-us»... |
            | 26.1 | 2.5 | Mais de 66 ícones novos e novos modificadores. |

            ## Usando ícones
            Nos atributos **Icon** (regiões, botões, entradas de lista, Cards) informe só a classe do ícone, como «fa-user». No Page
            Designer, o botão de lista ao lado do atributo abre o diálogo **Pick Icon**, com busca, categorias e a aba *Utilized*
            (ícones já usados na aplicação). No seu HTML, combine a classe base «fa» com a classe do ícone:

            ~~~html
            <span class="fa fa-truck" aria-hidden="true"></span> Em trânsito
            <span class="fa fa-lg fa-check-circle u-success-text" aria-hidden="true"></span>
            <span class="fa fa-flag-br" aria-hidden="true"></span> Brasil
            ~~~

            ## Classes modificadoras
            | Classe | Efeito |
            |---|---|
            | «fa-lg» | Usa o desenho Large (32 px) do ícone; a classe «force-fa-lg» num contêiner faz o mesmo para os ícones internos |
            | «fa-2x» a «fa-5x» | Escala o ícone |
            | «fa-anim-spin», «fa-anim-flash», «fa-anim-horizontal-shake», «fa-anim-vertical-shake» | Animações |
            | «fa-rotate-90», «fa-rotate-180», «fa-rotate-270», «fa-flip-horizontal», «fa-flip-vertical» | Rotação e espelhamento |
            | «fam-check», «fam-plus», «fam-x», «fam-lock», «fam-clock», «fam-user»... | Sobrepõe um pequeno símbolo no canto do ícone |
            | «fam-is-success», «fam-is-danger», «fam-is-warning», «fam-is-info», «fam-is-disabled» | Cor de estado do modificador |

            ~~~html
            <!-- Usuário com um "check" verde sobreposto -->
            <span class="fa fa-user fam-check fam-is-success" aria-hidden="true"></span>

            <!-- Indicador de processamento -->
            <span class="fa fa-refresh fa-anim-spin" aria-hidden="true"></span>
            ~~~

            ## Ícones vindos dos dados
            Em relatórios e Cards é comum o ícone depender do registro: devolva a classe na consulta e use-a na HTML Expression
            (ou na coluna de ícone do Cards).

            ~~~sql
            select tarefa,
                   status,
                   case status
                       when 'CONCLUIDA' then 'fa-check-circle u-success-text'
                       when 'ATRASADA'  then 'fa-exclamation-triangle u-danger-text'
                       else 'fa-clock-o'
                   end as icone
              from tarefas
            ~~~

            ~~~html
            <span class="fa #ICONE#" aria-hidden="true"></span> #STATUS#
            ~~~

            ## Navegador de ícones
            Em *App Builder → (aplicação) → Utilities → Font APEX Icons* você filtra por tamanho, palavra-chave e categoria,
            configura tamanho, escala, animação, rotação e modificador e copia a marcação HTML ou o valor para o atributo *Icon*.
            O mesmo catálogo está no Universal Theme Reference.

            :::dica Acessibilidade dos ícones
            Ícones decorativos devem levar «aria-hidden="true"». Se o ícone **carrega significado** (ex.: um botão só com a
            lixeira), forneça texto: um label no botão (o template *Icon* esconde o texto visualmente, mas o mantém para leitores
            de tela) ou um «span» com a classe «u-VisuallyHidden». E não comunique estado apenas pela cor.
            :::

            :::info Compatibilidade com Font Awesome
            Para a maior parte dos ícones, o Font APEX segue a convenção de nomes do Font Awesome 4 (como «fa-pencil» e
            «fa-trash-o»), o que facilita migrar aplicações antigas. Ícones inexistentes simplesmente não aparecem — confira no
            navegador de ícones antes de usar um nome.
            :::
        `
    },
    en: {
        titulo: 'Icons: Font APEX',
        resumo: 'The Universal Theme icon library: fa-* classes, sizes, animations, modifiers, flags and accessibility best practices.',
        tags: ['Font APEX', 'icons', 'fa-', 'Font Awesome', 'fam-', 'Pick Icon', 'flags', 'fa-flag', 'fa-lg', 'fa-anim-spin'],
        conteudo: `
            **Font APEX** is the Universal Theme icon library. It debuted in **APEX 5.1** — before that UT used Font Awesome 4.2 —
            and today offers **over 1,150 icons** drawn on two grids: **Small (16×16)** for buttons and menus, and **Large
            (32×32)** for cards, media lists and hero regions. Components pick the right size for the context.

            ## Versions
            | APEX | Font APEX | Highlight |
            |---|---|---|
            | 5.1 | First version | Replaces Font Awesome in Universal Theme. |
            | 18.1 | 2 | Library update. |
            | 18.2 | 2.1 | Additional icons. |
            | 21.1 | 2.2 | 95 new icons (medical, map markers, file types). |
            | 24.2 | 2.4 | 244 country flags: «fa-flag-br», «fa-flag-pt», «fa-flag-us»... |
            | 26.1 | 2.5 | 66+ new icons and new modifiers. |

            ## Using icons
            In **Icon** attributes (regions, buttons, list entries, Cards) enter just the icon class, such as «fa-user». In Page
            Designer, the list button next to the attribute opens the **Pick Icon** dialog, with search, categories and the
            *Utilized* tab (icons already used in the app). In your own HTML, combine the «fa» base class with the icon class:

            ~~~html
            <span class="fa fa-truck" aria-hidden="true"></span> In transit
            <span class="fa fa-lg fa-check-circle u-success-text" aria-hidden="true"></span>
            <span class="fa fa-flag-br" aria-hidden="true"></span> Brazil
            ~~~

            ## Modifier classes
            | Class | Effect |
            |---|---|
            | «fa-lg» | Uses the icon's Large (32 px) drawing; the «force-fa-lg» class on a container does the same for icons inside it |
            | «fa-2x» to «fa-5x» | Scales the icon |
            | «fa-anim-spin», «fa-anim-flash», «fa-anim-horizontal-shake», «fa-anim-vertical-shake» | Animations |
            | «fa-rotate-90», «fa-rotate-180», «fa-rotate-270», «fa-flip-horizontal», «fa-flip-vertical» | Rotation and mirroring |
            | «fam-check», «fam-plus», «fam-x», «fam-lock», «fam-clock», «fam-user»... | Overlays a small symbol in the icon corner |
            | «fam-is-success», «fam-is-danger», «fam-is-warning», «fam-is-info», «fam-is-disabled» | State color for the modifier |

            ~~~html
            <!-- User with a green check overlay -->
            <span class="fa fa-user fam-check fam-is-success" aria-hidden="true"></span>

            <!-- Processing indicator -->
            <span class="fa fa-refresh fa-anim-spin" aria-hidden="true"></span>
            ~~~

            ## Data-driven icons
            In reports and Cards the icon often depends on the record: return the class from the query and use it in the HTML
            Expression (or in the Cards icon column).

            ~~~sql
            select task,
                   status,
                   case status
                       when 'DONE' then 'fa-check-circle u-success-text'
                       when 'LATE' then 'fa-exclamation-triangle u-danger-text'
                       else 'fa-clock-o'
                   end as icon
              from tasks
            ~~~

            ~~~html
            <span class="fa #ICON#" aria-hidden="true"></span> #STATUS#
            ~~~

            ## Icon browser
            Under *App Builder → (application) → Utilities → Font APEX Icons* you filter by size, keyword and category, configure
            size, scale, animation, rotation and modifier, and copy the HTML markup or the value for the *Icon* attribute. The same
            catalog is available in the Universal Theme Reference.

            :::dica Icon accessibility
            Decorative icons should carry «aria-hidden="true"». If an icon **conveys meaning** (e.g. a button showing only a trash
            can), provide text: a button label (the *Icon* template hides the text visually but keeps it for screen readers) or a
            «span» with the «u-VisuallyHidden» class. And never convey state through color alone.
            :::

            :::info Font Awesome compatibility
            For most icons Font APEX follows the Font Awesome 4 naming convention (such as «fa-pencil» and «fa-trash-o»), which
            makes migrating older apps easier. Missing icons simply do not show up — check the icon browser before using a name.
            :::
        `
    }
});

DOC.topico({
    id: 'pwa',
    cat: 'ui',
    nivel: 'intermediario',
    desde: '21.2',
    links: [
        { t: 'App Builder Guide — Creating a Progressive Web App', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/htmdb/creating-a-progressive-web-app.html' },
        { t: 'apex.pwa (JavaScript API)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aexjs/apex.pwa.html' },
        { t: 'APEX_PWA (API Reference)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeapi/APEX_PWA.html' }
    ],
    relacionados: ['notificacoes-push', 'urls-do-apex', 'universal-theme', 'arquivos-estaticos-e-cdn'],
    pt: {
        titulo: 'Progressive Web Apps (PWA)',
        resumo: 'Torne a aplicação instalável no celular e no desktop, com cache de arquivos, página offline e notificações push — tudo declarativo.',
        tags: ['PWA', 'Progressive Web App', 'instalar', 'instalável', 'service worker', 'manifest', 'offline', 'push', 'apex.pwa', 'APEX_PWA', 'mobile'],
        conteudo: `
            Uma **Progressive Web App** é uma aplicação web que o usuário pode **instalar** no celular ou no computador: ela ganha
            ícone próprio, abre em janela própria (sem a barra do navegador) e se parece com um app nativo. O APEX suporta PWA de
            forma declarativa desde o **21.2** e amplia o recurso a cada versão.

            ## Linha do tempo
            | Versão | Novidade |
            |---|---|
            | 21.2 | PWA instalável, cache de recursos via service worker e página offline personalizável |
            | 22.1 | Service worker customizável |
            | 22.2 | Screenshots e atalhos no manifest |
            | 23.1 | **Push notifications** (processo nativo e pacote «APEX_PWA») |
            | 26.1 | Propriedades de manifest «short_name», «handle_links», «sizes» e «form_factor» |

            ## Requisitos
            - A aplicação precisa ser servida por **HTTPS** (ou em «localhost»); sem isso, os recursos de PWA não são renderizados.
            - **Friendly URLs** ligadas (*Application Definition → Properties*).

            ## Ativando
            - **App nova**: no Create Application Wizard, marque a feature **Install Progressive Web App**.
            - **App existente**: em *Shared Components → Progressive Web App* (grupo *User Interface*), ligue **Enable Progressive
              Web App** e **Installable**. Com *Installable*, a barra de navegação ganha a entrada "Install App".

            ## Principais atributos
            | Atributo | Função |
            |---|---|
            | Display | Fullscreen, Standalone, Minimal UI ou Browser |
            | Screen Orientation | Orientação preferida em dispositivos móveis |
            | Theme Color / Background Color | Cor do tema e cor de fundo exibida enquanto a app abre |
            | App Description / Short Name | Texto do convite de instalação e nome curto exibido sob o ícone |
            | Custom Manifest | Propriedades JSON adicionais para o Web App Manifest |
            | Service Worker | *Default*, *Configure Hooks* (seu código em pontos de extensão) ou *File URL* |

            Alguns dispositivos e navegadores ignoram parte desses atributos (como display, orientação e cores). O ícone instalado
            vem do ícone da aplicação (*App Icon*).

            ## Offline: o que esperar
            O service worker padrão segue esta estratégia: servir do cache se o recurso estiver lá; senão, buscar na rede e
            guardar no cache; se a rede falhar, mostrar a **página offline**. Só isso já deixa a app mais rápida — os arquivos
            estáticos vêm do cache —, mesmo sem instalar.

            :::atencao PWA não é "modo offline completo"
            As páginas do APEX são geradas no banco de dados. Sem conexão, o usuário vê a página offline, não os dados. Trabalhar
            de fato sem rede (coletar dados e sincronizar depois) exige lógica própria: hooks no service worker, armazenamento
            local no navegador e um processo de sincronização. Avalie se o caso de uso realmente precisa disso.
            :::

            ## Instalação pelo JavaScript
            O namespace «apex.pwa» (21.2+) permite criar a sua própria experiência de instalação:

            ~~~js
            // Mostra o botão (HTML DOM ID "btn_instalar") só quando a instalação for possível
            apex.pwa.isInstallable().then( function ( podeInstalar ) {
                if ( podeInstalar ) {
                    apex.jQuery( "#btn_instalar" ).show();
                }
            } );

            apex.jQuery( "#btn_instalar" ).on( "click", function () {
                apex.pwa.openInstallDialog();
            } );

            // "standalone" ou "fullscreen" indicam que a app instalada está em uso
            apex.debug.info( "Modo de exibição: " + apex.pwa.getDisplayMode() );
            ~~~

            Sem código: qualquer elemento com a classe «a-pwaInstall», ou um link para «#action$a-pwa-install», dispara a
            instalação. Em navegadores sem instalação automática (como Safari no iOS), o APEX mostra instruções ao usuário.

            ## Push notifications
            Ligue **Enable Push Notifications** nos atributos de PWA (é preciso um par de chaves — *Credentials* — e um e-mail de
            contato). O usuário assina pela página de configurações da app, e você envia mensagens pelo processo **Send Push
            Notification** ou pela API:

            ~~~plsql
            begin
                apex_pwa.send_push_notification(
                    p_application_id => 100,
                    p_user_name      => 'MARIA',
                    p_title          => 'Pedido aprovado',
                    p_body           => 'O pedido 1234 foi aprovado.' );
            end;
            ~~~

            O parâmetro «p_target_url» define a página aberta ao tocar na notificação. No navegador, «apex.pwa.hasPushSubscription()»
            e «apex.pwa.subscribePushNotifications()» controlam a assinatura. Detalhes em [Push notifications](#/topico/notificacoes-push).

            :::novo 26.1
            Suporte às propriedades de manifest «short_name», «handle_links», «sizes» e «form_factor», melhorando a instalação e a
            compatibilidade com navegadores modernos. Screenshots existentes sem esses atributos continuam funcionando, mas não
            ficam otimizadas.
            :::

            :::dica Teste em dispositivos reais
            O comportamento de instalação varia entre Chrome, Edge, Safari e Firefox, e entre Android, iOS e desktop. Teste nos
            dispositivos que seus usuários realmente usam.
            :::
        `
    },
    en: {
        titulo: 'Progressive Web Apps (PWA)',
        resumo: 'Make your app installable on phones and desktops, with file caching, an offline page and push notifications — all declarative.',
        tags: ['PWA', 'Progressive Web App', 'install', 'installable', 'service worker', 'manifest', 'offline', 'push', 'apex.pwa', 'APEX_PWA', 'mobile'],
        conteudo: `
            A **Progressive Web App** is a web application users can **install** on their phone or computer: it gets its own icon,
            opens in its own window (without the browser bar) and feels like a native app. APEX has supported PWAs declaratively
            since **21.2** and extends the feature in every release.

            ## Timeline
            | Release | What was added |
            |---|---|
            | 21.2 | Installable PWA, resource caching through a service worker and a customizable offline page |
            | 22.1 | Customizable service worker |
            | 22.2 | Screenshots and shortcuts in the manifest |
            | 23.1 | **Push notifications** (native process and the «APEX_PWA» package) |
            | 26.1 | Manifest properties «short_name», «handle_links», «sizes» and «form_factor» |

            ## Requirements
            - The application must be served over **HTTPS** (or on «localhost»); otherwise PWA features are not rendered.
            - **Friendly URLs** turned on (*Application Definition → Properties*).

            ## Enabling it
            - **New app**: in the Create Application Wizard, check the **Install Progressive Web App** feature.
            - **Existing app**: under *Shared Components → Progressive Web App* (*User Interface* group), turn on **Enable
              Progressive Web App** and **Installable**. With *Installable*, the navigation bar gets an "Install App" entry.

            ## Main attributes
            | Attribute | Purpose |
            |---|---|
            | Display | Fullscreen, Standalone, Minimal UI or Browser |
            | Screen Orientation | Preferred orientation on mobile devices |
            | Theme Color / Background Color | Theme color and the background shown while the app opens |
            | App Description / Short Name | Install prompt text and the short name shown under the icon |
            | Custom Manifest | Additional JSON properties for the Web App Manifest |
            | Service Worker | *Default*, *Configure Hooks* (your code at extension points) or *File URL* |

            Some devices and browsers ignore some of these attributes (such as display, orientation and colors). The installed icon
            comes from the application icon (*App Icon*).

            ## Offline: what to expect
            The default service worker follows this strategy: serve from cache if the resource is there; otherwise fetch from the
            network and store it in the cache; if the network fails, show the **offline page**. That alone makes the app faster —
            static files come from the cache — even without installing it.

            :::atencao A PWA is not a "full offline mode"
            APEX pages are generated in the database. Without a connection, users see the offline page, not their data. Truly
            working offline (collecting data and syncing later) requires your own logic: service worker hooks, browser-side storage
            and a synchronization process. Check whether your use case really needs it.
            :::

            ## Installing through JavaScript
            The «apex.pwa» namespace (21.2+) lets you build your own install experience:

            ~~~js
            // Show the button (HTML DOM ID "btn_install") only when installing is possible
            apex.pwa.isInstallable().then( function ( canInstall ) {
                if ( canInstall ) {
                    apex.jQuery( "#btn_install" ).show();
                }
            } );

            apex.jQuery( "#btn_install" ).on( "click", function () {
                apex.pwa.openInstallDialog();
            } );

            // "standalone" or "fullscreen" mean the installed app is in use
            apex.debug.info( "Display mode: " + apex.pwa.getDisplayMode() );
            ~~~

            No code needed: any element with the «a-pwaInstall» class, or a link to «#action$a-pwa-install», triggers the install.
            In browsers without automatic installation (such as Safari on iOS), APEX shows instructions to the user.

            ## Push notifications
            Turn on **Enable Push Notifications** in the PWA attributes (you need a key pair — *Credentials* — and a contact
            e-mail). Users subscribe from the app's settings page, and you send messages with the **Send Push Notification**
            process or the API:

            ~~~plsql
            begin
                apex_pwa.send_push_notification(
                    p_application_id => 100,
                    p_user_name      => 'MARIA',
                    p_title          => 'Order approved',
                    p_body           => 'Order 1234 has been approved.' );
            end;
            ~~~

            The «p_target_url» parameter sets the page opened when the notification is tapped. In the browser,
            «apex.pwa.hasPushSubscription()» and «apex.pwa.subscribePushNotifications()» manage the subscription. More in
            [Push notifications](#/topico/notificacoes-push).

            :::novo 26.1
            Support for the «short_name», «handle_links», «sizes» and «form_factor» manifest properties, improving installation
            and compatibility with modern browsers. Existing screenshots without these attributes still work but are not optimized.
            :::

            :::dica Test on real devices
            Install behavior differs between Chrome, Edge, Safari and Firefox, and between Android, iOS and desktop. Test on the
            devices your users actually have.
            :::
        `
    }
});

DOC.topico({
    id: 'acessibilidade',
    cat: 'ui',
    nivel: 'intermediario',
    links: [
        { t: 'Oracle APEX Accessibility Guide (26.1)', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeacc/index.html' },
        { t: 'Accessibility Guide — Developing Accessible Apps', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeacc/developing-accessible-apps.html' },
        { t: 'Accessibility Guide — Testing Apps for Accessibility', u: 'https://docs.oracle.com/en/database/oracle/apex/26.1/aeacc/testing-apps-for-accessibility.html' }
    ],
    relacionados: ['universal-theme', 'checklist-de-qualidade', 'itens-de-pagina', 'theme-roller-e-estilos', 'icones-font-apex'],
    pt: {
        titulo: 'Acessibilidade no APEX',
        resumo: 'Como construir aplicações acessíveis: o que o Universal Theme já faz, títulos, landmarks, labels, relatórios, cores, Advisor e testes.',
        tags: ['acessibilidade', 'accessibility', 'a11y', 'WCAG', 'Section 508', 'leitor de tela', 'screen reader', 'landmark', 'ARIA', 'contraste', 'Advisor', 'teclado'],
        conteudo: `
            Acessibilidade é permitir que pessoas com deficiência visual, auditiva, motora, cognitiva ou neurológica consigam
            **perceber, entender, navegar e interagir** com a aplicação — e, de quebra, melhorar a experiência de todos. O APEX
            ajuda muito: o **Universal Theme** foi criado (no 5.0) com acessibilidade como premissa, o guia oficial de
            acessibilidade usa o **WCAG 2.1** como referência, e a Oracle publica um *Accessibility Conformance Report* (ACR) que
            acompanha a conformidade com Section 508 e WCAG. Mas a responsabilidade final é sua: configurações e conteúdo da app
            fazem toda a diferença.

            ## O que o APEX já entrega
            - Templates com landmarks, hierarquia de títulos e foco por teclado; diálogos modais que mantêm o foco dentro do
              diálogo e isolam o conteúdo para leitores de tela.
            - Interactive Grid totalmente operável pelo teclado.
            - Com *Reload on Submit = Only for Success*, erros de validação são exibidos no cliente com o papel ARIA *alert* e
              lidos imediatamente pelo leitor de tela.
            - **Accessibility help text** (24.1): orientações nos atributos-chave do Page Designer (texto alternativo, contraste,
              labels, landmarks).
            - **Accessible Read-Only Items** (24.1): itens somente leitura renderizados como campos «readonly» focáveis — ligado por
              padrão em aplicações novas.
            - Theme Roller com verificação automática de contraste.

            ## Checklist do desenvolvedor
            | Área | O que fazer |
            |---|---|
            | Título da página | Único e significativo, ex.: «Editar cliente: &P2_NOME.» (carregue o registro em *Before Header* para o título já sair preenchido). |
            | Headings | Um H1 por página (último item do breadcrumb ou uma região *Hero*); as regiões viram H2. |
            | Landmarks | Grupo **Accessibility** da região (22.2+): tipo de landmark (Region, Navigation, Search, Form...) e um *Landmark Label* claro. |
            | Itens | Sempre com label. Placeholder não substitui label; para esconder o label, use o template *Hidden*. |
            | Mudança de contexto | Evite select lists que submetem ou redirecionam ao mudar; use Dynamic Action com refresh. |
            | Relatórios | Marque **Value Identifies Row** nas colunas que identificam a linha (viram cabeçalho de linha). |
            | Imagens | Texto alternativo em *Display Image* e em toda imagem do seu HTML. |
            | Botões | Labels claros e únicos; botões só com ícone mantêm o label oculto para leitores de tela. |
            | Cores | Não comunique informação só por cor; respeite o contraste mínimo. |
            | Foco inicial | Em *Cursor Focus*, prefira *Do not focus cursor*, a menos que o primeiro campo seja de fato o próximo passo. |

            ## O seu HTML também conta
            ~~~html
            <!-- Ícone decorativo + texto para leitores de tela -->
            <span class="fa fa-exclamation-triangle u-danger-text" aria-hidden="true"></span>
            <span class="u-VisuallyHidden">Atenção:</span> pedido em atraso

            <!-- IDs únicos em Template Components e diretivas (24.1+) -->
            <h3 id="#APEX$DOM_ID#_titulo">#TITLE#</h3>
            <div role="region" aria-labelledby="#APEX$DOM_ID#_titulo">#BODY#</div>
            ~~~

            ## Advisor: verificações de acessibilidade
            Em *Utilities → Advisor* (aplicação inteira) ou no menu *Utilities* do Page Designer (uma página), as checagens de
            acessibilidade incluem:
            - theme style marcado como testado para acessibilidade;
            - página com título;
            - região com cabeçalho de linha (*Value Identifies Row*);
            - item de página com label;
            - item que não causa mudança inesperada de contexto;
            - *Display Image* com texto alternativo.

            A Oracle recomenda corrigir o que o Advisor aponta **antes** de testar com tecnologias assistivas. Veja também o
            [checklist de qualidade](#/topico/checklist-de-qualidade).

            :::dica Teste de verdade
            O Advisor encontra erros de configuração, não tudo. Teste durante todo o desenvolvimento: navegue só com o teclado
            (Tab, Shift+Tab, Enter, Esc), use um leitor de tela (NVDA, JAWS ou VoiceOver), aplique zoom de 200% e, se possível,
            envolva pessoas com deficiência. Dê atenção especial a plug-ins e bibliotecas de terceiros.
            :::

            :::info Modos de leitor de tela e alto contraste
            Desde o 4.1 o APEX oferece modos de sessão para leitor de tela e alto contraste (por exemplo
            «APEX_UTIL.SET_SESSION_SCREEN_READER_ON» e «APEX_UTIL.IS_HIGH_CONTRAST_SESSION»). As APIs continuam disponíveis, mas
            o caminho principal hoje é construir uma única interface acessível com o Universal Theme.
            :::

            :::novo 26.1
            «apex.util.showSpinner» ganhou opções de anúncio ARIA (*ariaProcessingStarted*, *ariaStillProcessing*, *ariaProcessed*,
            *suppressAria*), o widget de menu ganhou «popupMenuLabelId» e «aria-keyshortcuts», e as ações ganharam a propriedade
            «purpose» para links mais acessíveis.
            :::
        `
    },
    en: {
        titulo: 'Accessibility in APEX',
        resumo: 'How to build accessible apps: what Universal Theme already does, titles, landmarks, labels, reports, colors, Advisor and testing.',
        tags: ['accessibility', 'a11y', 'WCAG', 'Section 508', 'screen reader', 'landmark', 'ARIA', 'contrast', 'Advisor', 'keyboard'],
        conteudo: `
            Accessibility means enabling people with visual, hearing, motor, cognitive or neurological disabilities to
            **perceive, understand, navigate and interact** with your application — and it improves the experience for everyone.
            APEX helps a lot: **Universal Theme** was created (in 5.0) with accessibility as a premise, the official accessibility
            guide uses **WCAG 2.1** as its reference, and Oracle publishes an *Accessibility Conformance Report* (ACR) tracking
            conformance with Section 508 and WCAG. But the final responsibility is yours: app settings and content make all the
            difference.

            ## What APEX already provides
            - Templates with landmarks, heading hierarchy and keyboard focus; modal dialogs that keep focus inside the dialog and
              isolate content for screen readers.
            - An Interactive Grid that is fully keyboard operable.
            - With *Reload on Submit = Only for Success*, validation errors are rendered on the client with the ARIA *alert* role
              and read immediately by screen readers.
            - **Accessibility help text** (24.1): guidance on key Page Designer attributes (alternative text, contrast, labels,
              landmarks).
            - **Accessible Read-Only Items** (24.1): read-only items rendered as focusable «readonly» fields — on by default in
              new applications.
            - Theme Roller with automatic contrast checking.

            ## Developer checklist
            | Area | What to do |
            |---|---|
            | Page title | Unique and meaningful, e.g. «Edit customer: &P2_NAME.» (load the record *Before Header* so the title is filled in). |
            | Headings | One H1 per page (the last breadcrumb entry or a *Hero* region); regions become H2. |
            | Landmarks | Region **Accessibility** group (22.2+): landmark type (Region, Navigation, Search, Form...) and a clear *Landmark Label*. |
            | Items | Always labeled. A placeholder is not a label; to hide the label, use the *Hidden* label template. |
            | Context changes | Avoid select lists that submit or redirect on change; use a Dynamic Action with a refresh. |
            | Reports | Set **Value Identifies Row** on the columns that identify the row (they become row headers). |
            | Images | Alternative text on *Display Image* and on every image in your HTML. |
            | Buttons | Clear, unique labels; icon-only buttons keep a hidden label for screen readers. |
            | Colors | Do not convey information through color alone; respect minimum contrast. |
            | Initial focus | In *Cursor Focus*, prefer *Do not focus cursor* unless the first field really is the next step. |

            ## Your own HTML counts too
            ~~~html
            <!-- Decorative icon + text for screen readers -->
            <span class="fa fa-exclamation-triangle u-danger-text" aria-hidden="true"></span>
            <span class="u-VisuallyHidden">Warning:</span> order is late

            <!-- Unique IDs in Template Components and directives (24.1+) -->
            <h3 id="#APEX$DOM_ID#_title">#TITLE#</h3>
            <div role="region" aria-labelledby="#APEX$DOM_ID#_title">#BODY#</div>
            ~~~

            ## Advisor: accessibility checks
            Under *Utilities → Advisor* (whole application) or the Page Designer *Utilities* menu (one page), the accessibility
            checks include:
            - theme style flagged as accessibility tested;
            - page has a title;
            - region has a row header (*Value Identifies Row*);
            - page item has a label;
            - page item does not cause an unexpected context change;
            - *Display Image* has alternative text.

            Oracle recommends fixing what Advisor reports **before** testing with assistive technologies. See also the
            [quality checklist](#/topico/checklist-de-qualidade).

            :::dica Test for real
            Advisor catches configuration errors, not everything. Test throughout development: navigate with the keyboard only
            (Tab, Shift+Tab, Enter, Esc), use a screen reader (NVDA, JAWS or VoiceOver), zoom to 200% and, if possible, involve
            people with disabilities. Pay special attention to plug-ins and third-party libraries.
            :::

            :::info Screen reader and high contrast modes
            Since 4.1 APEX has session modes for screen readers and high contrast (for example
            «APEX_UTIL.SET_SESSION_SCREEN_READER_ON» and «APEX_UTIL.IS_HIGH_CONTRAST_SESSION»). The APIs are still available, but
            the main path today is a single accessible interface built with Universal Theme.
            :::

            :::novo 26.1
            «apex.util.showSpinner» gained ARIA announcement options (*ariaProcessingStarted*, *ariaStillProcessing*,
            *ariaProcessed*, *suppressAria*), the menu widget gained «popupMenuLabelId» and «aria-keyshortcuts», and actions gained
            a «purpose» property for more accessible links.
            :::
        `
    }
});
