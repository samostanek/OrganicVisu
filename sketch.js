let c, inp;

function setup() {
    // Runs once, on init
    createCanvas(500, 500);
    // Create text field and button
    inp = createInput('');
    let B = createButton("Draw");
    B.mousePressed(drawCompound);
}

function drawCompound() {
    // Is called after 'Draw' is pressed
    background(255);
    c = new Compound(inp.value());
    c.render();
}

function draw() {}

