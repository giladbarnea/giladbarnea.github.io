let GLOB = {
    isMobile: undefined,
    pressInAction: undefined,
    pressOutAction: undefined,
    strictGet(target, p) {
        if (target[p] === undefined)
            throw new Error(`${p} is undefined`);
        return target[p]
    }
};

try {
    document.createEvent("TouchEvent");
    GLOB.isMobile = true;
    // ! if mobile, has to be pointerdown. otherwise text is selected
    GLOB.pressInAction = "pointerdown";
} catch {
    GLOB.isMobile = false;
    GLOB.pressInAction = "pointerenter";
    GLOB.pressOutAction = "pointerleave"
}

GLOB = new Proxy(GLOB, {
    get(target: any, p: string | number | symbol, receiver: any): any {
        switch (p) {
            case "isMobile":
            case "pressInAction":
            case "pressOutAction":
                return target.strictGet(target, p);
            
            default:
                return target[p]
        }
    }
});

console.log(...bold('GLOB: '), GLOB);

// const pressInAction = GLOB.isMobile ? "pointerdown" : "pointerenter";

function bold(s: string): [string, string] {
    return [`%c${s}`, 'font-weight: 600']
}

async function waitUntil(cond: () => boolean, timeout: number = Infinity, checkInterval: number = 20): Promise<boolean> {
    // const dur = 200;
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
