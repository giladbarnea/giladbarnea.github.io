const BodyElem = elem({htmlElement: document.body});
const DocumentElem = elem({htmlElement: document.documentElement});
DocumentElem
    .click(() => {
        if (!Expando.expanded)
            return;
        Expando.close();
    })
    .keydown((event: KeyboardEvent) => {
        if (!Expando.expanded)
            return;
        
        if (event.key === "Escape") {
            Expando.close();
        }
        
        
    });
const App = elem({id: 'app'});

// ***  Expando
interface IExpando extends Div {
    expanded: boolean;
    
    expand(exp: IExpandable): Promise<void>;
    
    close(): void;
}

const Expando = elem({id: 'expando'}) as IExpando;
Expando.expanded = false;
Expando.close = function () {
    App.removeClass('unfocused');
    this
        .on({
            transitionend: () => {
                console.log('EXPANDO transitionend');
                Expando.attr({hidden: ''})
            }
        }, {once: true})
        .addClass('collapsed');
    this.expanded = false;
};
Expando.expand = async function (exp: IExpandable) {
    const text = fromExpandableToText(exp);
    const ms = 25;
    const loops = 500 / ms;
    let count = 0;
    console.log('before while');
    App.addClass('will-change-filter');
    while (count < loops) {
        if (!exp.pointerHovering) {
            console.log('breaking');
            App.removeClass('will-change-filter');
            return;
        }
        await wait(ms);
        count++;
    }
    this.expanded = true;
    console.log('done while');
    App
        .on({
            transitionend: () => {
                console.log('APP transitionend');
                App.removeClass('will-change-filter');
            }
        }, {once: true})
        .addClass('unfocused');
    
    
    // 30px
    const expandoPaddingLeft = parseInt(getComputedStyle(this.e).paddingLeft);
    this
        .removeAttr('hidden')
        .removeClass('collapsed')
        .css({
            top: `${exp.e.offsetTop + parseInt(getComputedStyle(exp.e).lineHeight) + App.e.offsetTop}px`,
            // transform: `translateX(${exp.e.offsetLeft / -2}px)`,
            marginLeft: `${exp.e.offsetLeft + App.e.offsetLeft - expandoPaddingLeft}px`,
            width: `${exp.e.offsetWidth}px` // -40 because +20 looks good, and compensate for padding==30 TWICE
        })
        .text(text)
};

// ***  expandables
interface IExpandable extends BetterHTMLElement {
    pointerHovering: boolean;
    
}

const expandables = Array.from(document.querySelectorAll('.expandable'))
    .map(exp => elem({htmlElement: exp as HTMLElement}) as IExpandable);


function fromExpandableToText(exp: BetterHTMLElement): string {
    const cls = exp.class().filter(cls => cls !== 'expandable')[0]; // assume eg "expandable bingoal"
    switch (cls) {
        case 'bingoal':
            return `Lead developer at Bingoal, a second-screen, real-time, multiplayer gaming startup.
            
            I built everything from scratch. The product is being released these days. Development is managed by Tal Franji.
	
	Tech used: Python 2 and 3, Google Cloud Platform (AppEngine + Datasatore + Firebase), Typescript.`;
        case 'pyano':
            return `Part time developer at Pyano, a cross-platform app that teaches piano playing.
            Requested by Dr. Ido Tavor’s lab for neuroscience at TAU.
            
            Pyano is used to create brain-plasticity prediction models.
				
		Tech used: Python 3, Django, Node.js (Electron.js, Piano.js), Bash.

I've also built Dr. Tavor’s personal website.`;
        default:
            return ''
    }
}

for (let exp of expandables) {
    exp.pointerHovering = false;
    
    
    exp.on({
        pointerenter: (ev: PointerEvent) => {
            if (Expando.expanded) {
                console.log('pointerenter, Expando.expanded => returning');
                return;
            }
            exp.pointerHovering = true;
            Expando.expand(exp);
            
        },
        pointerleave: (ev: PointerEvent) => {
            exp.pointerHovering = false;
            console.log('pointerleave');
            
        }
    })
}
const resumePageLink = elem({id: 'resume_page_link'});

function buildResumePage() {
    App
        .empty()
        .append(
            elem({tag: 'h3'}).text('Resume'),
            elem({tag: 'h5'}).html(`<span class="fontsize-25 indent-30">I started out</span> as a concert pianist since I was five. By high school I started composing movie soundtracks.<br>
                                    I joined the military band as a composer and producer, and after my release I studied Classical Composition and Orchestration
                                    at Jerusalem Academy for Music and Dance.`),
            elem({tag: 'h5'}).html(`Music production is done with a computer, and as I produced more, I understood computers better; Eventually
                                    I started learning Python by myself.`),
            elem({tag: 'h5'}).html(`Soon I decided that my music was best left as a hobby, and signed up for a 1-year .NET full-stack course at Sela College.<br>
                                   I graduated by late 2017, got back to Python, and have been working as a full stack developer since,
                                   mostly around web systems.`)
                .addClass('mb-60'),
            elem({tag: 'h5'}).html(`<span class="fontsize-25 indent-30">My experience</span> comes from serveral different jobs.<br>
                                    I held my first position (June 18 --) at a small startup, as the only developer. It's a real-time multiplayer game
                                    for "second screen", where you play against hundreds of other players with your phone, while watching TV. The stack is Python and GCloud.<br>
                                    I built the product from scratch, and it's currently undergoing a purchase deal by Sport1.`),
            elem({tag: 'h5'}).html(`At my second position (Dec 18 --) I built a Python/node.js desktop app for Dr. Ido Tavor, a neuroscientist at TAU. He's building prediction
                                    models to learning processes in humans via fMRI scans; the app dynamically teaches how to play the piano, analyzes the user's performance,
                                    and changes its behavior accordingly to suit the user's ability and maximize learning.<br>
                                    This job taught me what it means to work closely with the end-user.`),
            elem({tag: 'h5'}).html(`By March 19 I was hired as a freelancer by a startup that combines machine learning and real estate, to help users
                                    make better purchases; I built their serverless infrastructure, integrating Python microservices with AWS Lambda and S3,
                                    wrapped with Docker.`),
            elem({tag: 'h5'}).html(`I worked as a teaching assistant to Tal Franji in his Spark Big Data Course. This job required of me to learn
                                    the technologies involved very quickly, including basic Scala, and then transfer that knowledge to a class of
                                    experienced developers.`)
                .addClass('mb-60'),
            elem({tag: 'h5'}).html(`<span class="fontsize-25 indent-30">I have a few side-projects</span>, some were created by me,
                                    others I enjoy contributing to.`)
        )
}

resumePageLink.click(buildResumePage);
