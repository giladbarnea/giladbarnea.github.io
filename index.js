const BodyElem = elem({ htmlElement: document.body });
const DocumentElem = elem({ htmlElement: document.documentElement })
    .click(() => {
    if (!Expando.expanded)
        return;
    console.log('DocumentElem click');
    Expando.close();
})
    .keydown((event) => {
    if (!Expando.expanded)
        return;
    if (event.key === "Escape") {
        Expando.close();
    }
});
const App = elem({ id: 'app' });
const expandables = Array.from(document.querySelectorAll('.expandable'))
    .map(expandable => elem({ htmlElement: expandable }));
function fromExpandableToText(expandable) {
    const id = expandable.id();
    const italic = s => `<span class="italic">${s}</span>`;
    const bold = s => `<span class="bold">${s}</span>`;
    switch (id) {
        case 'bingoal':
            return `I’m the lead developer of <span class="italic">Bingoal</span>, a second-screen, real-time, multiplayer gaming startup.
            <p>I built everything from scratch. The product is being released these days. Development is managed by Tal Franji.</p>
	<p><span class="bold">Tech used</span>: Python 2 and 3, Google Cloud Platform (AppEngine + Datasatore + Firebase), Typescript.</p>`;
        case 'pyano':
            return `<span class="italic">Pyano</span> is a cross-platform app that teaches piano playing.
            <p>Requested by Dr. Ido Tavor’s lab for neuroscience at TAU.</p>
            <p>Pyano is used to create brain-plasticity prediction models.</p>
		<p><span class="bold">Tech used</span>: Python 3, Django, Node.js (Electron.js, Piano.js), Bash.</p>
<p>I’ve also built Dr. Tavor’s personal website.</p>`;
        case 'rox':
            return `<span class="italic">RealOneX</span> is an online real estate exchange platform.
<p>I built their serverless infrastructure (Mar-May 19).</p>
<p><span class="bold">Tech used</span>: Python 3, Docker, AWS (Lambda + S3 + Elastic Beanstalk), Google Photos / Places APIs.</p>`;
        case 'pythonlang':
            return `Javascript can behave almost arbitrarily, sometimes.
            <p>Yes, <code class="pointer" onclick="window.open('https://www.youtube.com/watch?v=et8xNAc2ic8')">[] <span class="red">== !</span>[]; <span class="comment">// -> true</span></code>, I’m looking at you.</p>
            <p>What if it could be more like Python? As consistent, reliable and coherent?</p>
            <p>I set out to implement Python 3 Built-ins in Javascript. Tests are taken from CPython, PyPy and MyPy. There’s still a lot of work, though.</p>`;
        case 'piano':
            return `<span class="italic">Piano</span> is an open-source Web Audio instrument.
            <p>I transitioned the project to Typescript, added some features, and improved its compilation and tests.</p>
            <p>It’s a sublib of <span class="italic">Tone.js</span>.</p>`;
        case 'autosyntax':
            return `<span class="italic">autosyntax</span> is my first project.
            <p>I wanted a way to avoid typing boilerplate code. Especially when it didn’t do much and consisted of many awkward keystrokes.</p>
            <p>So I built a tool that "understands" whitespace-separated words and turns them into Python.</p>
            <img src="autosyntax2.gif">`;
        case 'angrysearch':
            return `Windows has an excellent search app called ${italic('Everything')}.
            <p>${italic('angrysearch')} gets it right for the most part, but I missed the way ${italic('Everything')} lets your filter and manipulate results.</p>
            <p>${italic('angrysearch')}’s last commit was in July 2018, so I forked it and expanded on it.</p>`;
        case 'betterhtmlelement':
            const indent = s => `<span class="indent">${s}</span>`;
            const blue = s => `<span class="lightblue">${s}</span>`;
            const purple = s => `<span class="purple">${s}</span>`;
            const yellow = s => `<span class="yellow">${s}</span>`;
            const clay = s => `<span class="clay">${s}</span>`;
            return `<span class="italic">betterhtmlelement</span> was born out of frustration with jQuery’s performance and lack of flexibility.
            <p>It does 2 things:</p>
            <p>1. what jQuery does, but with virtually no performance hit; eg </br></br>
            <code>${blue("mydiv")}</br>
                ${indent(`.${yellow('html')}(${clay('"foo"')})</br>`)}
                ${indent(`.${yellow('class')}(${clay('"bar"')})</br>`)}
                ${indent(`.${yellow('on')}(${clay('"click"')}, ...)`)}</code> and</br></br>
            2. recursively handles HTML elements and their child-elements like a tree, which lets you access the whole DOM, down to the bottom, like a regular "dot prop" object.</p>
            <p>It’s the cornerstone of every web system I’ve built in the past year.</p>`;
        default:
            return '';
    }
}
for (let expandable of expandables) {
    expandable.pointerHovering = false;
    expandable.on({
        pointerenter: (ev) => {
            console.log(...bold('expandable pointerenter (EPE)'));
            if (Expando.expanded) {
                console.log('\tEPE | Expando.expanded => returning');
            }
            else {
                expandable.pointerHovering = true;
                Expando.expand(expandable);
            }
        },
        pointerleave: async (ev) => {
            console.log(...bold('expandable pointerleave (EPL)'));
            expandable.pointerHovering = false;
            startCancelableFadeout();
        }
    });
}
function buildResumePage() {
    App
        .empty()
        .append(elem({ tag: 'h3' }).text('Resume'), elem({ tag: 'h5' }).html(`<span class="fontsize-25 indent-30">I started out</span> as a concert pianist since I was five. By high school I started composing movie soundtracks.<br>
                                    I joined the military band as a composer and producer, and after my release I studied Classical Composition and Orchestration
                                    at Jerusalem Academy for Music and Dance.`), elem({ tag: 'h5' }).html(`Music production is done with a computer, and as I produced more, I understood computers better; Eventually
                                    I started learning Python by myself.`), elem({ tag: 'h5' }).html(`Soon I decided that my music was best left as a hobby, and signed up for a 1-year .NET full-stack course at Sela College.<br>
                                   I graduated by late 2017, got back to Python, and have been working as a full stack developer since,
                                   mostly around web systems.`)
        .addClass('block'), elem({ tag: 'h5' }).html(`<span class="fontsize-25 indent-30">My experience</span> comes from serveral different jobs.<br>
                                    I held my first position (June 18 --) at a small startup, as the only developer. It's a real-time multiplayer game
                                    for "second screen", where you play against hundreds of other players with your phone, while watching TV. The stack is Python and GCloud.<br>
                                    I built the product from scratch, and it's currently undergoing a purchase deal by Sport1.`), elem({ tag: 'h5' }).html(`At my second position (Dec 18 --) I built a Python/node.js desktop app for Dr. Ido Tavor, a neuroscientist at TAU. He's building prediction
                                    models to learning processes in humans via fMRI scans; the app dynamically teaches how to play the piano, analyzes the user's performance,
                                    and changes its behavior accordingly to suit the user's ability and maximize learning.<br>
                                    This job taught me what it means to work closely with the end-user.`), elem({ tag: 'h5' }).html(`By March 19 I was hired as a freelancer by a startup that combines machine learning and real estate, to help users
                                    make better purchases; I built their serverless infrastructure, integrating Python microservices with AWS Lambda and S3,
                                    wrapped with Docker.`), elem({ tag: 'h5' }).html(`I worked as a teaching assistant to Tal Franji in his Spark Big Data Course. This job required of me to learn
                                    the technologies involved very quickly, including basic Scala, and then transfer that knowledge to a class of
                                    experienced developers.`)
        .addClass('block'), elem({ tag: 'h5' }).html(`<span class="fontsize-25 indent-30">I have a few side-projects</span>, some were created by me,
                                    others I enjoy contributing to.`));
}
//# sourceMappingURL=index.js.map