class Carbon {
    constructor(n, pos) {
        this.H = n;
        this.pos = pos;
        this.r = 15;
    }

    render() {
        push();
        translate(-2, 1);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("CH", this.pos.x, this.pos.y);
        textAlign(CENTER, TOP);
        textSize(textSize() / 1.3);
        text(this.H, this.pos.x + 11, this.pos.y);
        pop();
    }

    getInputPos(pos) {
        let v = p5.Vector.sub(pos, this.pos);
        v.setMag(this.r);
        return p5.Vector.add(v, this.pos);
    }
}
