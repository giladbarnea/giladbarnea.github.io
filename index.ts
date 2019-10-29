const BodyElem = elem({htmlElement: document.body});
const App = elem({id: 'app'});
const Expando = elem({id: 'expando'});
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

interface IExpandable extends BetterHTMLElement {
    pointerHovering: boolean;
    
    expand(): Promise<void>;
}

const expandables = Array.from(document.querySelectorAll('.expandable'))
    .map(exp => elem({htmlElement: exp as HTMLElement}) as IExpandable);

async function expand() {
    const ms = 25;
    const loops = 500 / ms;
    let count = 0;
    console.log('before while', {this: this, offsetTop: this.e.offsetTop, offsetLeft: this.e.offsetLeft});
    App.addClass('will-change-filter');
    while (count < loops) {
        if (!this.pointerHovering) {
            console.log('breaking');
            App.removeClass('will-change-filter');
            return;
        }
        await wait(ms);
        count++;
    }
    console.log('done while', {this: this, offsetTop: this.e.offsetTop, offsetLeft: this.e.offsetLeft});
    App.addClass('unfocused');
    wait(500).then(() => {
        console.log({this: this, offsetTop: this.e.offsetTop, offsetLeft: this.e.offsetLeft});
    });
    // TODO: remove will-change-filter after transitionend
    Expando
        .removeAttr('hidden')
        .css({
            top: `${this.e.offsetTop + parseInt(getComputedStyle(this.e).lineHeight) + App.e.offsetTop}px`,
            transform: `translateX(${this.e.offsetLeft / -2}px)`,
            width: `${this.e.offsetWidth + 20}px`
        })
}

for (let exp of expandables) {
    exp.pointerHovering = false;
    exp.expand = expand;
    
    
    exp.on({
        pointerenter: (ev: PointerEvent) => {
            exp.pointerHovering = true;
            console.log('pointerenter');
            exp.expand();
            
        },
        pointerleave: (ev: PointerEvent) => {
            exp.pointerHovering = false;
            console.log('pointerleave');
            
        }
    })
}
