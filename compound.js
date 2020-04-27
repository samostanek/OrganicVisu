class Compound {
    constructor(name) {
        this.name = name;
        this.parse();
        this.generateBase();
    }

    parse() {
        let parsed = [];
        let buffer = "";
        for (let i of this.name) {
            buffer += i;
            if (buffer.endsWith("yl")) {
                parsed.push(buffer);
                buffer = "";
            }
        }
        let core = buffer;
        parsed = parsed.map(function (x) {
            return {
                indexes: x.match(/[0-9]+/g).map(x => parseInt(x)),
                l: parseInt(
                    baseStr[x.replace(new RegExp(Object.keys(numbersStr).join("|") + "|,|-|yl|[0-9]+", "gi"), "")]
                ),
            };
        });
        this.coreLength = baseStr[core.split("an")[0]];
        this.parsed = parsed;
    }

    generateBase() {
        this.base = [];
        for (let i = 0; i < this.coreLength; i++) {
            this.base.push(new Carbon(this.getH(i), createVector(100 + 50 * i, 200)));
        }
    }

    getH(i) {
        let o = 2;
        if (i == 0 || i == this.coreLength - 1) o++;
        this.parsed.forEach((el) => {
            // debugger;
            if (el.indexes.includes(i)) o--;
        });
        return o;
    }

    render() {
        let previous = undefined;
        for (let i of this.base) {
            i.render();
            if (previous) {
                let ip = i.getInputPos(previous.pos);
                let pip = previous.getInputPos(i.pos);
                line(pip.x, pip.y, ip.x, ip.y);
            }
            previous = i;
        }
    }
}
