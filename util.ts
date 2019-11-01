let GLOB = {isMobile: undefined};

try {
    document.createEvent("TouchEvent");
    GLOB.isMobile = true;
} catch {
    GLOB.isMobile = false;
}

GLOB = new Proxy(GLOB, {
    get(target: any, p: string | number | symbol, receiver: any): any {
        switch (p) {
            case "isMobile":
                if (target.isMobile === true)
                    return true;
                else if (target.isMobile === false)
                    return false;
                else
                    throw new Error('isMobile not strictly true not false')
            
            default:
                return target[p]
        }
    },
});

console.log(...bold('MOBILE: '), GLOB.isMobile);

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
