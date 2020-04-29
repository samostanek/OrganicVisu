let c, inp;

function setup() {
    createCanvas(500, 500);
    // c = new Compound("4-etyl2,5-dimetylhexan");
    // c.render();
    inp = createInput('');
    let B = createButton("Draw");
    B.mousePressed(drawCompound);
}

function drawCompound() {
    background(255);
    c = new Compound(inp.value());
    c.render();
}

function draw() {}

