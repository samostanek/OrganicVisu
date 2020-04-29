class Yl {
    // TODO: Would be nice to merge this with the compound class.
    /*
    Direction: 0, 1, 2, 3 <=> top, right, bottom, left
    */
    constructor(direction, len, parent, pos) {
        this.direction = direction;
        this.len = len;
        this.parent = parent;
        this.pos = pos;
        this.base = this.generateBase();
    }

    generateBase() {
        let base = [];
        for (let i = 0; i < this.len; i++) {
            base.push(new Carbon(this.getH(i), createVector(this.pos.x + 50 * i, this.pos.y)));
        }
        return base;
    }

    getH(i) {
        let o = 2;
        if (i == this.len - 1) o++;
        return o;
    }

    render() {
        // Render base string
        let previous = this.parent;
        for (let i of this.base) {
            i.render();
            let ip = i.getInputPos(previous.pos);
            let pip = previous.getInputPos(i.pos);
            line(pip.x, pip.y, ip.x, ip.y);
            previous = i;
        }
    }
}

class Carbon {
    constructor(n, pos) {
        this.H = n;
        this.pos = pos;
        this.r = 15;
        this.yls = [];
    }

    addYl(l, direction) {
        let pos;
        switch (direction) {
            case 0:
                pos = createVector(this.pos.x, this.pos.y - 50);
                break;
            case 1:
                pos = createVector(this.pos.x + 50, this.pos.y);
                break;
            case 2:
                pos = createVector(this.pos.x, this.pos.y + 50);
                break;
            case 3:
                pos = createVector(this.pos.x - 50, this.pos.y);
                break;
            default:
                break;
        }
        this.yls.push(new Yl(0, l, this, pos));
        this.H--;
    }

    render() {
        // Render this
        push();
        translate(-2, 1);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("CH", this.pos.x, this.pos.y);
        textAlign(CENTER, TOP);
        textSize(textSize() / 1.3);
        text(this.H == 1 ? '' : this.H, this.pos.x + 11, this.pos.y);
        pop();
        // Render alkyls
        this.yls.forEach((el) => el.render());
    }

    getInputPos(pos) {
        let v = p5.Vector.sub(pos, this.pos);
        v.setMag(this.r);
        return p5.Vector.add(v, this.pos);
    }
}
