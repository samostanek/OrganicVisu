class Compound {
    constructor(name) {
        this.name = name;
        [this.coreLength, this.parsed] = this.parse();
        this.baseFree = []; // this.baseFree[i] is an bool array (top, right, bottom, left).
        for (let i = 0; i < this.coreLength; i++) this.baseFree.push([true, true, true, true]);
        this.base = this.generateBase();
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
            let positioning = x.match(/[0-9]+/g);
            if (positioning == null) positioning = ["1"];
            return {
                indexes: positioning.map((x) => parseInt(x) - 1),
                l: parseInt(
                    baseStr[x.replace(new RegExp(Object.keys(numbersStr).join("|") + "|,|-|yl|[0-9]+", "gi"), "")]
                ),
            };
        });
        return [baseStr[core.split("an")[0]], parsed];
    }

    generateBase() {
        let base = [];
        for (let i = 0; i < this.coreLength; i++) {
            base.push(new Carbon(this.getH(i), createVector(100 + 50 * i, 200)));
        }
        for (let i of this.parsed) {
            for (let j of i.indexes) {
                base[j].addYl(i.l, this.getFree(j, i.l));
            }
        }
        return base;
    }

    getFree(i, l) {
        if (this.isFree(i, l, 0)) {
            for (let j = i; j <= i + l; j++) if (this.baseFree[j]) this.baseFree[j][0] = false;
            return 0;
        }
        for (let j = i; j <= i + l; j++) if (this.baseFree[j]) this.baseFree[j][2] = false;
        return 2;
    }

    isFree(i, l, side) {
        for (let j = i; j <= i + l; j++) if (this.baseFree[j] && !this.baseFree[j][side]) return false;
        return true;
    }

    getH(i) {
        let o = 2;
        if (i == 0 || i == this.coreLength - 1) o++;
        return o;
    }

    render() {
        // Render base string
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
        // Render alkyls
        for (let i of this.parsed) {
        }
    }
}
