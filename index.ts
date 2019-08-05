const body = elem({htmlElement: document.body});
const main = elem({id: 'main'});
const resumePageLink = elem({id: 'resume_page_link'});
resumePageLink.pointerdown(() => {
    main
        .empty()
        .append(
            elem({tag: 'h2'}).text('Resume')
        )
});


