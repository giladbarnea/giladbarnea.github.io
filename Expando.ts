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
Expando
    .on({
        click: (ev: MouseEvent) => {
            console.log('Expando click, stopPropagation to doc');
            ev.stopPropagation();
        },
        pointerenter: (ev: PointerEvent) => {
            console.log(...bold('Expando pointerenter (XPE)'));
            Expando.pointerHovering = true;
            if (Expando.expanded === false) {
                console.error('XPE | Expando pointerenter but was NOT expanded')
            } else {
            
            }
        },
        pointerleave: (ev: PointerEvent) => {
            console.log(...bold('Expando pointerleave (XPL)'));
            Expando.pointerHovering = false;
            
        }
        
    });

function onDoneCollapse_Hide() {
    console.log('Expando.close() transitionend');
    Expando.attr({hidden: ''})
}

function onDoneExpansion_AddSlowColorBorderTransition() {
    console.log('Expando onDoneExpansion_AddSlowColorBorderTransition(). adding "slow-transition-color-border"');
    Expando.addClass('slow-transition-color-border')
}

function onDoneResetColorBorder_Close() {
    console.log('EPL | Expando transitionend. calling Expando.close()');
    Expando.close();
}

Expando.close = function () {
    App.removeClass('unfocused');
    this
        .class('collapsed')
        .on({
            transitionend: onDoneCollapse_Hide
        }, {once: true});
    this.expanded = false;
};


Expando.expand = async function (expandable: IExpandable) {
    console.log('%cExpando.expand(expandable)', 'color: #ffb02e');
    const text = fromExpandableToText(expandable);
    this.expanded = true;
    App
        .addClass('unfocused')
        .on({
            // filter
            transitionend: () => {
                // console.log('App transitionend (Expando.expand())');
            }
        }, {once: true});
    
    
    // 30px
    const expandoPaddingLeft = parseInt(getComputedStyle(this.e).paddingLeft);
    // 44px
    const lineHeight = parseInt(getComputedStyle(expandable.e).lineHeight);
    
    
    this
        .on({
            transitionend: onDoneExpansion_AddSlowColorBorderTransition
        }, {once: true})
        .removeAttr('hidden')
        .replaceClass('collapsed', 'expanded')
        .css({
            top: `${expandable.e.offsetTop + lineHeight + App.e.offsetTop}px`,
            marginLeft: `${expandable.e.offsetLeft + App.e.offsetLeft - expandoPaddingLeft}px`,
            width: `${expandable.e.offsetWidth}px`
        })
        .html(text);
};
