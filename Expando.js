const Expando = elem({ id: 'expando' });
Expando.expanded = false;
Expando.pointerHovering = false;
const expandoEvFnMap = {};
if (!GLOB.isMobile) {
    expandoEvFnMap[GLOB.pressOutAction] = async (ev) => {
        console.log(...bold(`Expando ${ev.type} (XPL)`));
        Expando.pointerHovering = false;
        if (Expando.expanded) {
            startCancelableFadeout();
        }
    };
}
expandoEvFnMap[GLOB.pressInAction] = (ev) => {
    console.log(...bold(`Expando ${ev.type} (XPE)`));
    ev.stopPropagation();
    Expando.pointerHovering = true;
    if (Expando.expanded === false) {
        console.error(`XPE | Expando ${ev.type} but was NOT expanded`);
    }
    else {
    }
};
Expando.on(expandoEvFnMap);
function onDoneCollapse_Hide() {
    console.log('Expando.close() transitionend');
    Expando.attr({ hidden: '' });
}
function onDoneExpansion_AddSlowColorBorderTransition() {
    console.log('Expando onDoneExpansion_AddSlowColorBorderTransition(). adding "slow-transition-color-border"');
    Expando.addClass('slow-transition-color-border');
    if (GLOB.isMobile) {
        Expando.e.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
async function startCancelableFadeout() {
    Expando.addClass('reset-color-border');
    const pointerOnExpando = await waitUntil(() => Expando.pointerHovering, 200, 10);
    console.log('\tEPL', { pointerOnExpando });
    if (pointerOnExpando) {
        Expando.removeClass('slow-transition-color-border', 'reset-color-border');
        await wait(0);
        Expando.addClass('slow-transition-color-border');
    }
    else {
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
Expando.expand = async function (expandable) {
    console.log('%cExpando.expand(expandable)', 'color: #ffb02e');
    const text = fromExpandableToText(expandable);
    if (text === '')
        return;
    this.expanded = true;
    App.addClass('unfocused');
    const lineHeight = parseInt(getComputedStyle(expandable.e).lineHeight);
    const css = {
        top: `${expandable.e.offsetTop + lineHeight + App.e.offsetTop}px`,
    };
    if (!GLOB.isMobile) {
        const expandoPaddingLeft = parseInt(getComputedStyle(this.e).paddingLeft);
        css["marginLeft"] = `${expandable.e.offsetLeft + App.e.offsetLeft - expandoPaddingLeft}px`;
        css["width"] = `${expandable.id() === 'autosyntax' ? 519 : expandable.e.offsetWidth}px`;
    }
    this
        .one("transitionend", onDoneExpansion_AddSlowColorBorderTransition)
        .removeAttr('hidden')
        .replaceClass('collapsed', 'expanded')
        .addClass(expandable.e.tagName === "A" ? 'cyan' : 'orange')
        .css(css)
        .html(text);
};
//# sourceMappingURL=Expando.js.map