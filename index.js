const body = elem({ htmlElement: document.body });
const resumePageLink = elem({ id: 'resume_page_link' });
resumePageLink.pointerdown(() => {
    body.empty();
});
//# sourceMappingURL=index.js.map