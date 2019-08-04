let globalLog = false;
class Int extends Number {
    toString(radix) {
        let ret = super.toString(radix);
        return ret;
    }
    valueOf() {
        let ret = super.valueOf();
        if (globalLog)
            console.log(cc('bright magenta', 'valueOf, returning: '), ret, {
                'typeof ret': typeof ret,
                this: this,
                'typeof this': typeof this
            });
        return ret;
    }
    divide(y) {
        if (y == 0) {
            throw new ZeroDivisionError("division by zero");
        }
        else {
            return this / y;
        }
    }
    static get ArgsParser() {
        return {
            isOptions(obj) {
                return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
            },
            isIntable(x) {
                if (typeof x !== "object" || x === null)
                    return false;
                x = x;
                const intable = '__int__' in x;
                return intable;
            },
            parseIntable(x, log) {
                const number = x.__int__();
                let typeofnumber = typeof number;
                if (typeofnumber === "number") {
                    if (parseFloat(number) - parseInt(number) === 0) {
                        if (log)
                            console.log(cc('magenta', `\tnumber is float, returning: ${number}`));
                        return number;
                    }
                    else {
                        typeofnumber = 'float';
                    }
                }
                if (log)
                    console.log(cc('bright yellow', `int(x.__int__()) returned non-int. TypeError`));
                throw new TypeError(`__int__ returned non-int (type ${typeofnumber})`);
            },
            parseOptions(x, base, log) {
                const typeofx = typeof x;
                const typeofbase = typeof base;
                if (base === undefined) {
                    if (log)
                        console.log(cc('magenta', `\tbase === undefined, returning [x.x, x.base]`));
                    x = x;
                    return [x.x, x.base];
                }
                if (x === undefined) {
                    throw new Error('what');
                    if (log)
                        console.log(cc('blue', `\tx === undefined`), { base, typeofbase });
                    return [base.x, base.base];
                }
                if (log)
                    console.log(cc('blue', `\tneither x nor base are undefined`), { x, base, typeofx, typeofbase });
                let xinbase = false;
                let baseinbase = false;
                let xinx = false;
                let baseinx = false;
                const isXObject = typeofx !== 'string' && typeofx !== "number";
                const isBaseObject = typeofbase !== 'string' && typeofbase !== "number";
                if (isXObject && isBaseObject) {
                    base = base;
                    x = x;
                    xinx = 'x' in x;
                    baseinx = 'base' in x;
                    xinbase = 'x' in base;
                    baseinbase = 'base' in base;
                    if (log)
                        console.log(cc('blue', `\tbase and x are both objects`), {
                            xinbase,
                            baseinbase,
                            xinx,
                            baseinx
                        });
                    if ((xinbase && xinx) || (baseinbase && baseinx)) {
                        if (log)
                            console.log(cc('bright yellow', `\tkeyword argument repeated, TypeError`));
                        throw new SyntaxError("keyword argument repeated");
                    }
                    if (log)
                        console.log(cc('blue', `\tNo repeated kwarg`));
                    if (xinbase) {
                        if (log)
                            console.log(cc('magenta', `\txinbase, returning [base.x, x.base]`));
                        return [base.x, x.base];
                    }
                    if (log)
                        console.log(cc('magenta', `\txinx, returning [x.x, base.base]`));
                    return [x.x, base.base];
                }
                if (isBaseObject) {
                    base = base;
                    x = x;
                    xinbase = 'x' in base;
                    baseinbase = 'base' in base;
                    if (log)
                        console.log(cc('blue', `\tx is primitive. base is object.`), { xinbase, baseinbase });
                    if (xinbase) {
                        if (log)
                            console.log(cc('blue', `\txinbase`));
                        if (baseinbase) {
                            if (log)
                                console.log(cc('bright yellow', `\txinbase && baseinbase, TypeError`));
                            throw new TypeError(`int() takes at most 2 arguments (3 given)`);
                        }
                        if (log)
                            console.log(cc('bright yellow', `\txinbase, TypeError`));
                        throw new TypeError(`Argument given by name ('x') and position (1)`);
                    }
                    if (baseinbase) {
                        if (log)
                            console.log(cc('magenta', `\tbaseinbase, returning [x, base.base]`));
                        return [x, base.base];
                    }
                    if (log)
                        console.log(cc('magenta', `!\txinbase && !baseinbase, returning [x, undefined]`));
                    return [x, undefined];
                }
                x = x;
                base = base;
                xinx = 'x' in x;
                baseinx = 'base' in x;
                if (log)
                    console.log(cc('blue', `\tbase is primitive. x is object`), { xinx, baseinx });
                if (baseinx) {
                    if (log)
                        console.log(cc('blue', `\tbaseinx`));
                    if (xinx) {
                        if (log)
                            console.log(cc('bright yellow', `\txinbase && baseinbase, TypeError`));
                        throw new TypeError(`int() takes at most 2 arguments (3 given)`);
                    }
                    if (log)
                        console.log(cc('bright yellow', `\tbaseinx, TypeError`));
                    throw new TypeError(`Argument given by name ('base') and position (1)`);
                }
                if (log)
                    console.log(cc('magenta', `\treturning [x.x, base]`));
                return [x.x, base];
            },
        };
    }
    constructor(x = undefined, base, log) {
        globalLog = log;
        if (log)
            console.log(cc('black', 'constructor before ArgsParser'), { x, base, log });
        if (Int.ArgsParser.isIntable(x)) {
            if (log)
                console.log(cc('blue', 'x is Intable'));
            const number = Int.ArgsParser.parseIntable(x, log);
            super(number);
            if (log)
                console.log(cc('bright magenta', `super(parseIntable(x)) and return. this: ${this}`));
            return;
        }
        if (Int.ArgsParser.isOptions(x) || Int.ArgsParser.isOptions(base)) {
            if (log)
                console.log(cc('blue', `Got objects, calling Int.OptionsParser.parse(x, base)`));
            [x, base] = Int.ArgsParser.parseOptions(x, base, log);
            if (log)
                console.log(cc('cyan', `Int.OptionsParser.parse(x, base) => x: ${x}, base: ${base}`));
        }
        const typeofx = typeof x;
        const typeofbase = typeof base;
        let parsedInt = parseInt(x, base);
        const origbase = base;
        if (log)
            console.log(cc(`black`, `constructor after ArgsParser, x: ${x}, base: ${base}, parsedInt: ${parsedInt}, Number(x): ${Number(x)}`));
        if (x === undefined) {
            if (log)
                console.log(cc(`blue`, `x === undefined`));
            if (typeofbase === 'number') {
                if (log)
                    console.log(cc('bright yellow', `x === undefined, typeofbase === 'number'. TypeError`));
                throw new TypeError("int() missing string argument");
            }
            super(0);
            if (log)
                console.log(cc('bright magenta', `x is undefined, super(0) return. this: ${this}`));
            return;
        }
        else if (x === false) {
            super(0);
            if (log)
                console.log(cc('bright magenta', `x is false, super(0) return. this: ${this}`));
            return;
        }
        if (typeofx !== 'number' && typeofx !== 'string') {
            if (log)
                console.log(cc('bright yellow', 'typeof x isnt number or string, TypeError'));
            throw new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeofx}'`);
        }
        if (base === undefined) {
            base = 10;
            if (log)
                console.log(cc('cyan', `base === undefined => base=10`));
        }
        else {
            if (!util.isInteger(base)) {
                if (log)
                    console.log(cc('bright yellow', `!isInteger(base)', TypeError`));
                throw new TypeError(`'${typeofbase}' object cannot be interpreted as an integer`);
            }
            if (base !== 0 && base < 2 || base > 36) {
                if (log)
                    console.log(cc('bright yellow', 'base out of range, ValueError'));
                throw new ValueError("int() base must be >= 2 and <= 36, or 0");
            }
            if (typeofx === 'number') {
                if (log)
                    console.log(cc('bright yellow', 'x is number, TypeError'));
                throw new TypeError(`int() can't convert non-string with explicit base`);
            }
        }
        const orig = x;
        let sign = undefined;
        let nosign = x;
        if (typeofx === 'string') {
            x = x;
            x = x.trim();
            nosign = x;
            if (log && orig !== x)
                console.log(cc('cyan', `after x.trim(): '${x}'`));
            if (x[0] === '-' || x[0] === '+') {
                sign = x[0] === '-' ? -1 : 1;
                nosign = x.slice(1);
                if (log)
                    console.log(cc('cyan', `x[0] is '${x[0]}', sign is: ${sign}', nosign is: '${nosign}'`));
            }
            if (x.includes('_')) {
                if (log)
                    console.log(cc('blue', "x.includes('_')"));
                if (x.startsWith('_') || nosign.startsWith('_') || x.includes('__') || x.endsWith('_')) {
                    if (log)
                        console.log(cc('bright yellow', `Leading / trailing / multiple underscore, ValueError`));
                    throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
                }
                x = x.split('_').join('');
                parsedInt = parseInt(x, base);
                if (log)
                    console.log(cc('cyan', `No leading / trailing / multiple underscore => x = '${x}', parsedInt = ${parsedInt}`));
            }
        }
        let prefix = null;
        let isBinary = false;
        let isOctal = false;
        let isHexaDecimal = false;
        let isSpecial = false;
        let specialBase = undefined;
        let isFloat = false;
        if (nosign[0] === '0' && nosign[1] && RegExp(/[box]/, 'i').test(nosign[1])) {
            if (log)
                console.log(cc('cyan', `nosign[0] === '0', nosign[1] is [boxBOX] => prefix = nosign[1] = '${nosign[1]}'`));
            prefix = nosign[1];
            isBinary = prefix === 'b' || prefix === 'B';
            isOctal = prefix === 'o' || prefix === 'O';
            isHexaDecimal = prefix === 'x' || prefix === 'X';
            isSpecial = isBinary || isOctal || isHexaDecimal;
            specialBase = isBinary ? 2 : isOctal ? 8 : isHexaDecimal ? 16 : undefined;
        }
        else if (!isSpecial) {
            if (typeofx === 'string') {
                isFloat = x.indexOf('.') !== -1;
            }
            else {
                isFloat = parseFloat(x) - parseInt(x) !== 0;
            }
            if (log)
                console.log(cc('cyan', `!isSpecial => isFloat = ${isFloat}`));
        }
        if (base === 0) {
            if (log)
                console.log(cc('blue', `base === 0`));
            if (nosign[0] !== '0') {
                if (log)
                    console.log(cc('cyan', `nosign[0] !== '0' => base = 10`));
                base = 10;
            }
            else if (isSpecial) {
                if (log)
                    console.log(cc('blue', `nosign[0] === '0' && isSpecial`));
                if (isHexaDecimal)
                    base = 16;
                else if (isOctal)
                    base = 8;
                else if (isBinary)
                    base = 2;
                if (log)
                    console.log(cc('cyan', `${isBinary ? 'isBinary' : isOctal ? 'isOctal' : isHexaDecimal ? 'isHexaDecimal' : ''} => base = ${base}`));
            }
            else {
                if (log)
                    console.log(cc('blue', `base === 0 but !isSpecial`));
            }
        }
        if (isSpecial && base === specialBase) {
            x = x;
            if (sign === undefined) {
                x = x.slice(2);
                parsedInt = parseInt(x, base);
            }
            else {
                x = x.slice(3);
                parsedInt = parseInt(x * sign, base);
            }
            nosign = x;
            if (log)
                console.log(cc('cyan', `isSpecial && base === specialBase => x = '${x}', nosign = '${nosign}', parsedInt = ${parsedInt}`));
        }
        if (typeofx === 'string') {
            x = x;
            if (log) {
                console.log(cc('blue', "typeofx === 'string'"));
                console.table({
                    'nosign[0]': nosign[0],
                    prefix,
                    x,
                    nosign,
                    isBinary,
                    isOctal,
                    isHexaDecimal,
                    isSpecial,
                    specialBase,
                    base,
                    origbase,
                    isFloat,
                    parsedInt,
                    'Number(x)': Number(x),
                    'Number(nosign)': Number(nosign),
                });
            }
            if (isFloat) {
                if (log)
                    console.log(cc('bright yellow', 'isFloat, ValueError'));
                throw new ValueError(`invalid literal for int() with base ${base}: '${orig}'`);
            }
            if (isSpecial && origbase === undefined) {
                if (log)
                    console.log(cc(`bright yellow`, `isSpecial && origbase === undefined, ValueError`));
                throw new ValueError(`invalid literal for int() with base ${base}: '${orig}'`);
            }
            for (let c of nosign) {
                if (c === '_')
                    continue;
                let convertedC;
                if (RegExp(/[a-zA-Z ]/).test(c)) {
                    convertedC = parseInt(c, 36);
                    if (log)
                        console.log(cc('cyan', `in for loop, converted '${c}' to: ${convertedC}`));
                }
                else {
                    convertedC = c;
                }
                if (isNaN(convertedC) || (convertedC >= base && c !== '0')) {
                    if (log)
                        console.log(cc('bright yellow', `Either ${convertedC} isNaN or is >= base ${base}, ValueError`));
                    throw new ValueError(`invalid literal for int() with base ${origbase === undefined ? base : origbase}: '${orig}'`);
                }
            }
            if (Number.isInteger(parsedInt)) {
                super(parsedInt);
                if (log)
                    console.log(cc('bright magenta', `Number.isInteger(parsedInt) => super(parsedInt = ${parsedInt}) and return. this: ${this}`));
                return;
            }
            if (!RegExp(/\d/).test(x) ||
                x.includes(' ')) {
                if (log)
                    console.log(cc('bright yellow', `Either ${x} includes(' ') or no /\d/ in x, ValueError`));
                throw new ValueError(`invalid literal for int() with base ${origbase === undefined ? base : origbase}: '${orig}'`);
            }
        }
        if (isFloat) {
            if (x < 0) {
                super(Math.ceil(x));
                if (log)
                    console.log(cc('bright magenta', `x < 0, super(Math.ceil(${x})) return. this: ${this}`));
            }
            else {
                super(Math.floor(x));
                if (log)
                    console.log(cc('bright magenta', `x >= 0, super(Math.floor(${x})) return. this: ${this}`));
            }
            return;
        }
        if (base !== 10) {
            super(parsedInt);
            if (log)
                console.log(cc('bright magenta', `base !== 10, super(parsedInt = ${parsedInt}}) and return.`), { this: this });
        }
        else {
            super(x);
            if (log)
                console.log(cc('bright magenta', `base === 10, super(${x}) and return.`), { this: this });
        }
    }
}
function int(x = undefined, base, log) {
    return new Int(x, base, log);
}
//# sourceMappingURL=int.js.map