let GLOB = {
    isMobile: undefined,
    pressInAction: undefined,
    pressOutAction: undefined,
    strictGet(target, p) {
        if (target[p] === undefined)
            throw new Error(`${p} is undefined`);
        return target[p];
    }
};
try {
    document.createEvent("TouchEvent");
    GLOB.isMobile = true;
    GLOB.pressInAction = "pointerdown";
}
catch (_a) {
    GLOB.isMobile = false;
    GLOB.pressInAction = "pointerenter";
    GLOB.pressOutAction = "pointerleave";
}
GLOB = new Proxy(GLOB, {
    get(target, p, receiver) {
        switch (p) {
            case "isMobile":
            case "pressInAction":
            case "pressOutAction":
                return target.strictGet(target, p);
            default:
                return target[p];
        }
    }
});
console.log(...bold('GLOB: '), GLOB);
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