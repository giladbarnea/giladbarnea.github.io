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
