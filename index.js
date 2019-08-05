const body = elem({ htmlElement: document.body });
const resumePageLink = elem({ id: 'resume_page_link' });
resumePageLink.pointerdown(() => {
    window.location.assign('/resume');
});
//# sourceMappingURL=index.js.map