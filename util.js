function bold(s) {
    return [`%c${s}`, 'font-weight: 600'];
}
async function waitUntil(cond, timeout = Infinity, checkInterval = 20) {
    const loops = timeout / checkInterval;
    let count = 0;
    while (count < loops) {
        if (cond())
            return true;
        await wait(checkInterval);
        count++;
    }
    return false;
}
//# sourceMappingURL=util.js.map