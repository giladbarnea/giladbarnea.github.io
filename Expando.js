const Expando = elem({ id: 'expando' });
Expando.expanded = false;
Expando.pointerHovering = false;
Expando
    .on({
    click: (ev) => {
        console.log('Expando click, stopPropagation to doc');
        ev.stopPropagation();
    },
    pointerenter: (ev) => {
        console.log(...bold('Expando pointerenter (XPE)'));
        Expando.pointerHovering = true;
        if (Expando.expanded === false) {
            console.error('XPE | Expando pointerenter but was NOT expanded');
        }
        else {
        }
    },
    pointerleave: async (ev) => {
        console.log(...bold('Expando pointerleave (XPL)'));
        Expando.pointerHovering = false;
        if (Expando.expanded) {
            startCancelableFadeout();
        }
    }
});
function onDoneCollapse_Hide() {
    console.log('Expando.close() transitionend');
    Expando.attr({ hidden: '' });
}
function onDoneExpansion_AddSlowColorBorderTransition() {
    console.log('Expando onDoneExpansion_AddSlowColorBorderTransition(). adding "slow-transition-color-border"');
    Expando.addClass('slow-transition-color-border');
}
async function startCancelableFadeout() {
    Expando.addClass('reset-color-border');
    const pointerOnExpando = await waitUntil(() => Expando.pointerHovering, 500, 10);
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
    const expandoPaddingLeft = parseInt(getComputedStyle(this.e).paddingLeft);
    const lineHeight = parseInt(getComputedStyle(expandable.e).lineHeight);
    this
        .one("transitionend", onDoneExpansion_AddSlowColorBorderTransition)
        .removeAttr('hidden')
        .replaceClass('collapsed', 'expanded')
        .css({
        top: `${expandable.e.offsetTop + lineHeight + App.e.offsetTop}px`,
        marginLeft: `${expandable.e.offsetLeft + App.e.offsetLeft - expandoPaddingLeft}px`,
        width: `${expandable.id() === 'autosyntax' ? 519 : expandable.e.offsetWidth}px`
    })
        .html(text);
};
//# sourceMappingURL=Expando.js.map