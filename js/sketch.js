//variables

let timeOfDay = "night";
let skyBrightness = 0;

let sunY = 0;
let moonY = 0;

let cloudX = 0;
let fogX = 0;

let particles = [];

let postShader;
let shaderLayer;

function preload() {

    postShader = loadShader(
        "js/shader.vert",
        "js/shader.frag"
    );

}

function setup() {

    pixelDensity(1);

    frameRate(30);

    createCanvas(
        windowWidth,
        windowHeight
    );

    shaderLayer = createGraphics(
        windowWidth,
        windowHeight,
        WEBGL
    );

    shaderLayer.pixelDensity(1);

    moonY = height * 0.2;
    sunY = height * 1.2;

    for (let i = 0; i < 40; i++) {

        particles.push({
            x: random(width),
            y: random(height * 0.7),
            size: random(1, 4),
            speed: random(0.1, 0.4)
        });

    }

}

function draw() {
    // sky   / background
    if (timeOfDay === "night") {

        skyBrightness = lerp(
            skyBrightness,
            0,
            0.02
        );

    } else {

        skyBrightness = lerp(
            skyBrightness,
            255,
            0.02
        );

    }

    background(
        8 + skyBrightness * 0.5,
        12 + skyBrightness * 0.76,
        30 + skyBrightness * 0.8
    );


    //stars

    if (timeOfDay === "night") {

        randomSeed(10);

        fill(255);
        noStroke();

        for (let i = 0; i < 100; i++) {

            let x = random(width);
            let y = random(height * 0.9);

            rect(x, y, 6, 6);

        }

    }


    //moon

    let moonX = width * 0.8;

    moonY = lerp(
        moonY,
        timeOfDay === "night"
            ? height * 0.2
            : height * 1.2,
        0.02
    );

    noStroke();

    fill(240, 240, 210, 10);
    circle(moonX, moonY, 330);

    fill(240, 240, 210, 15);
    circle(moonX, moonY, 280);

    fill(240, 240, 210, 25);
    circle(moonX, moonY, 240);

    fill(240, 240, 210);
    circle(moonX, moonY, 200);


    //sun

    let sunX = width * 0.8;

    sunY = lerp(
        sunY,
        timeOfDay === "day"
            ? height * 0.2
            : height * 1.2,
        0.02
    );

    fill(255, 220, 80, 15);
    circle(sunX, sunY, 300);

    fill(255, 220, 80, 25);
    circle(sunX, sunY, 240);

    fill(255, 220, 80);
    circle(sunX, sunY, 200);


    // nubes

    cloudX += 0.1;

    if (cloudX > width + 300) {

        cloudX = -300;

    }

    drawCloud(
        cloudX + map(mouseX, 0, width, -20, 20),
        height * 0.35,
        1
    );

    drawCloud(
        cloudX + 400 + map(mouseX, 0, width, -10, 10),
        height * 0.45,
        0.7
    );

    drawCloud(
        cloudX + 800 + map(mouseX, 0, width, -5, 5),
        height * 0.30,
        1.2
    );


    // partículas

    for (let i = 0; i < particles.length; i++) {

        let particle = particles[i];

        particle.x += particle.speed;

        if (particle.x > width) {

            particle.x = 0;

        }

        let offsetX = map(
            mouseX,
            0,
            width,
            -10,
            10
        );

        fill(
            255,
            255,
            255,
            timeOfDay === "night" ? 80 : 25
        );

        circle(
            particle.x + offsetX,
            particle.y,
            particle.size
        );

    }


    // niebla

    fogX += 0.2;

    if (fogX > width + 500) {

        fogX = -500;

    }

    noStroke();

    fill(180, 190, 200, 12);

    ellipse(
        fogX,
        height * 0.65,
        500,
        120
    );

    ellipse(
        fogX + 400,
        height * 0.70,
        600,
        140
    );

    ellipse(
        fogX + 900,
        height * 0.63,
        500,
        100
    );


    //terreno

    drawGround();

    shaderLayer.clear();

    postShader.setUniform(
        "uTime",
        millis() * 0.001
    );

    postShader.setUniform(
        "uBrightness",
        skyBrightness / 255
    );

    shaderLayer.shader(postShader);

    shaderLayer.rect(
        -shaderLayer.width / 2,
        -shaderLayer.height / 2,
        shaderLayer.width,
        shaderLayer.height
    );

    image(
        shaderLayer,
        0,
        0,
        width,
        height
    );

    //fin draw
}

// bloques

function drawGround() {

    let blockSize = 90;

    let groundOffset = map(
        mouseX,
        0,
        width,
        -8,
        8
    );


    // Primera capa

    fill(45, 100, 45);

    for (
        let x = -blockSize;
        x < width + blockSize;
        x += blockSize
    ) {

        rect(
            x + groundOffset,
            height * 0.7,
            blockSize,
            blockSize
        );

    }


    // Segunda capa

    fill(80, 50, 30);

    for (
        let x = -blockSize;
        x < width + blockSize;
        x += blockSize
    ) {

        rect(
            x + groundOffset,
            height * 0.7 + blockSize,
            blockSize,
            blockSize
        );

    }


    // Tercera capa

    fill(65, 40, 25);

    for (
        let x = -blockSize;
        x < width + blockSize;
        x += blockSize
    ) {

        rect(
            x + groundOffset,
            height * 0.7 + blockSize * 2,
            blockSize,
            blockSize
        );

    }

}

function drawCloud(x, y, cloudScale) {

    push();

    translate(x, y);
    scale(cloudScale);

    noStroke();

    fill(255, 255, 255, 40);

    circle(0, 30, 80);
    circle(60, 20, 100);
    circle(120, 30, 80);

    rect(
        0,
        30,
        120,
        50
    );

    pop();

}

//cambiar hora

function changeTime() {

    if (timeOfDay === "night") {

        timeOfDay = "day";

    } else {

        timeOfDay = "night";

    }

}

function setTimeOfDay(time) {

    timeOfDay = time;

}

function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );

    shaderLayer.resizeCanvas(
        windowWidth,
        windowHeight
    );

}