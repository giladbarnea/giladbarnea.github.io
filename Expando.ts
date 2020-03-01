// ***  Expando
interface IExpando extends Div {
    expanded: boolean;
    pointerHovering: boolean;

    expand(expandable: IExpandable): Promise<void>;

    close(): void;
}

const Expando = elem({id: 'expando'}) as IExpando;
Expando.expanded = false;
Expando.pointerHovering = false;
const expandoEvFnMap = {};
if (!GLOB.isMobile) {
    expandoEvFnMap[GLOB.pressOutAction] = async (ev: PointerEvent) => {
        console.log(...bold(`Expando ${ev.type} (XPL)`));

        Expando.pointerHovering = false;
        if (Expando.expanded) {
            startCancelableFadeout();
        }

    }
}
expandoEvFnMap[GLOB.pressInAction] = (ev: PointerEvent) => {
    console.log(...bold(`Expando ${ev.type} (XPE)`));
    ev.stopPropagation();
    Expando.pointerHovering = true;
    if (Expando.expanded === false) {
        console.error(`XPE | Expando ${ev.type} but was NOT expanded`)
    } else {
    }
};
Expando.on(expandoEvFnMap);

function onDoneCollapse_Hide() {
    console.log('Expando.close() transitionend');
    Expando.attr({hidden: ''})
}

function onDoneExpansion_AddSlowColorBorderTransition(expandable: IExpandable) {
    console.log('Expando onDoneExpansion_AddSlowColorBorderTransition(). adding "slow-transition-color-border"');
    Expando.addClass('slow-transition-color-border');
    if (GLOB.isMobile) {
        let block = expandable.id() === "betterhtmlelement" ? "start" : "center";
        // @ts-ignore
        Expando.e.scrollIntoView({behavior: "smooth", block})
    }
}

async function startCancelableFadeout() {
    Expando.addClass('reset-color-border');
    const pointerOnExpando = await waitUntil(() => Expando.pointerHovering, 200, 10);
    console.log('\tEPL', {pointerOnExpando});
    if (pointerOnExpando) {
        await wait(2000);
        // Immediately fade in, then re-add slow transition
        Expando.removeClass('slow-transition-color-border', 'reset-color-border');
        await wait(0);
        Expando.addClass('slow-transition-color-border');
    } else {
        Expando.close();
    }
}

Expando.close = function () {
    App.removeClass('unfocused');
    this
        .one('transitionend', onDoneCollapse_Hide)
        .class('collapsed');
    this.expanded = false;
};


Expando.expand = async function (expandable: IExpandable) {
    console.log('%cExpando.expand(expandable)', 'color: #ffb02e');
    const text = fromExpandableToText(expandable);
    if (text === '')
        return;
    this.expanded = true;
    App.addClass('unfocused');


    // 44px
    const lineHeight = parseInt(getComputedStyle(expandable.e).lineHeight);


    const css = {
        top: `${expandable.e.offsetTop + lineHeight + App.e.offsetTop}px`,
    };
    if (!GLOB.isMobile) {
        // 30px
        const expandoPaddingLeft = parseInt(getComputedStyle(this.e).paddingLeft);
        css["marginLeft"] = `${expandable.e.offsetLeft + App.e.offsetLeft - expandoPaddingLeft}px`;
        css["width"] = `${expandable.id() === 'autosyntax' ? 519 : expandable.e.offsetWidth}px`;
    }
    this
        .one("transitionend", () => onDoneExpansion_AddSlowColorBorderTransition(expandable))
        .removeAttr('hidden')
        .replaceClass('collapsed', 'expanded')
        .addClass(expandable.hasClass('cyan') ? 'cyan' : 'orange')
        .css(css)
        .html(text);
};
