const body = elem({ htmlElement: document.body });
const main = elem({ id: 'main' });
const resumePageLink = elem({ id: 'resume_page_link' });
function buildResumePage() {
    main
        .empty()
        .append(elem({ tag: 'h2' }).text('Resume'), elem({ tag: 'h4' }).html(`I'd been a concert pianist since I was 5. By high school I started composing movie soundtracks.<br>
                                    I joined the military band as a composer and producer, and after my release I studied Classical Composition and Orchestration
                                    at Jerusalem Academy for Music and Dance.`), elem({ tag: 'h4' }).html(`Music production is done with a computer, and as I produced more, I understood computers better, and eventually
                                    started learning Python by myself.`), elem({ tag: 'h4' }).html(`Soon I decided that my music was best left as a hobby, and signed up for a 1-year .NET full-stack course at Sela College.<br>
                                   I graduated by late 2017, got back to Python, and have been working as a full stack developer since,
                                   mostly around web systems.`));
}
resumePageLink.pointerdown(buildResumePage);
buildResumePage();
//# sourceMappingURL=index.js.map