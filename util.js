let GLOB = { isMobile: undefined };
try {
    document.createEvent("TouchEvent");
    GLOB.isMobile = true;
}
catch (_a) {
    GLOB.isMobile = false;
}
GLOB = new Proxy(GLOB, {
    get(target, p, receiver) {
        switch (p) {
            case "isMobile":
                if (target.isMobile === true)
                    return true;
                else if (target.isMobile === false)
                    return false;
                else
                    throw new Error('isMobile not strictly true not false');
            default:
                return target[p];
        }
    },
});
console.log(...bold('MOBILE: '), GLOB.isMobile);
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