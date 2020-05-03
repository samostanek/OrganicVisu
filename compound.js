class Compound {
    constructor(name) {
        this.name = name;   // Input string
        [this.coreLength, this.parsed] = this.parse();
        this.baseFree = []; // this.baseFree[i] is an bool array (top, right, bottom, left).
        // this.baseFree[] represents free space around Carbon i of base string
        for (let i = 0; i < this.coreLength; i++)
            this.baseFree.push([true, i == this.coreLength - 1 ? true : false, true, i == 0 ? true : false, true]);
        this.base = this.generateBase();    // Array of Carbons in base string
    }

    parse() {
        // Parse prefixes
        let parsed = [];
        let buffer = "";
        for (let i of this.name) {
            buffer += i;
            if (buffer.endsWith("yl")) {
                parsed.push(buffer);
                buffer = "";
            }
        }
        let core = buffer.split("an");

        // Generate return value
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

        // Parse suffixes
        buffer = "";
        let suffixes = [];
        if (core[1] != "") {
            for (let i of core[1]) {
                buffer += i;
                if (buffer.endsWith("ol")) {
                    parsed.push({ indexes: buffer.match(/[0-9]+/g).map((x) => parseInt(x) - 1), l: -1 });
                }
            }
        }
        return [baseStr[core[0]], parsed];
    }

    generateBase() {
        // Returns array of Carbon objects - base string (for ex. etan - CH3CH3)
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
        // Returns, where (top, right, bottom or left) can be placed new alkyl
        // of length l connected to Carbon i of base string
        if (l < 1) l = 1;
        if (this.isFree(i, l, 0)) {
            for (let j = i; j <= i + l; j++) if (this.baseFree[j]) this.baseFree[j][0] = false;
            return 0;
        }
        if (this.isFree(i, l, 2)) {
            for (let j = i; j <= i + l; j++) if (this.baseFree[j]) this.baseFree[j][2] = false;
            return 2;
        }
        if (this.isFree(i, l, 1)) {
            for (let j = i; j <= i + l; j++) if (this.baseFree[j]) this.baseFree[j][1] = false;
            return 1;
        }
        throw new Error('Too many connections to C.');
    }

    isFree(i, l, side) {
        // Checks, if there is free space for alkyl of length l on given side of Carbon i of base string
        for (let j = i; j < i + l; j++) if (this.baseFree[j] && !this.baseFree[j][side]) return false;
        return true;
    }

    getH(i) {
        // Gets number of hydrogens for Carbon i
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
    }
}
