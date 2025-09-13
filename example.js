let gl;
let program;
let programInfo = {};
let velocity = vec2(0.0, 0.0);
let position = vec2(0, 0.0);
let currentNpcs = [];
const npcSize = 0.2;
let playerScale = 0.25;
let npcTexture;
let backgroundTexture;
let playerTexture;
let squarePositionBuffer;
let squareTexCoordBuffer;
let backgroundPositionBuffer;
let backgroundTexCoordBuffer;
let dialogElement;
let dialogNode;
let canvas;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas, null);
    if (!gl) { alert("WebGL isn't available"); }

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    programInfo = {
        vPosition: gl.getAttribLocation(program, "vPosition"),
        vTexCoord: gl.getAttribLocation(program, "vTexCoord"),
        modelMatrix: gl.getUniformLocation(program, "modelMatrix"),
        u_texture: gl.getUniformLocation(program, "u_texture"),
    };

    const squareVertices = [
        vec2(-0.5, -0.5), vec2(0.5, -0.5), vec2(0.5, 0.5),
        vec2(-0.5, -0.5), vec2(0.5, 0.5), vec2(-0.5, 0.5),
    ];
    const squareTexCoords = [
        vec2(0, 1), vec2(1, 1), vec2(1, 0),
        vec2(0, 1), vec2(1, 0), vec2(0, 0),
    ];
    
    const backgroundVertices = [
        vec2(-1, -1), vec2(1, -1), vec2(1, 1),
        vec2(-1, -1), vec2(1, 1), vec2(-1, 1),
    ];

    squarePositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squarePositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(squareVertices), gl.STATIC_DRAW);

    squareTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(squareTexCoords), gl.STATIC_DRAW);

    backgroundPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(backgroundVertices), gl.STATIC_DRAW);
    
    backgroundTexCoordBuffer = squareTexCoordBuffer;

    npcTexture = loadTexture(gl, "https://www.dev-fern.com/Untitled.png");
    backgroundTexture = loadTexture(gl, "https://www.dev-fern.com/Untitled.png");
    playerTexture = loadTexture(gl, "https://www.dev-fern.com/character.png");
    
    currentNpcs.push(vec2(0.5, 0.5));
    currentNpcs.push(vec2(-0.2, 0.3));
    
    dialogElement = document.querySelector("#dialog");
    dialogNode = document.createTextNode("");
    dialogElement.appendChild(dialogNode);
    dialogElement.parentElement.parentElement.classList.add("hidden");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    render();
};

document.addEventListener("keydown", (e) => {
    if (e.key == 'w') velocity[1] = 0.01;
    if (e.key == 'a') velocity[0] = -0.01;
    if (e.key == 's') velocity[1] = -0.01;
    if (e.key == 'd') velocity[0] = 0.01;
}, false);

document.addEventListener("keyup", (e) => {
    if (e.key == 'w' || e.key == 's') velocity[1] = 0;
    if (e.key == 'a' || e.key == 'd') velocity[0] = 0;
}, false);

function updatePosition() {
    position = add(position, velocity);
    if (Math.abs(position[0]) > 0.95) position[0] = 0.95 * Math.sign(position[0]);
    if (Math.abs(position[1]) > 0.95) position[1] = 0.95 * Math.sign(position[1]);
}

function handleNpc() {
    const minDistance = 0.25;
    let isNearAnNpc = false;
    const overlay = dialogElement.parentElement.parentElement;

    for (const npcPosition of currentNpcs) {
        if (length(subtract(npcPosition, position)) < minDistance) {
            isNearAnNpc = true;
            const pixelX = (npcPosition[0] * 0.5 + 0.5) * canvas.width;
            const pixelY = (npcPosition[1] * -0.5 + 0.5) * canvas.height;
            overlay.style.left = `${Math.floor(pixelX)}px`;
            overlay.style.top = `${Math.floor(pixelY) - 40}px`;
            dialogNode.nodeValue = "Cho tôi xin một bánh mì chay?";
            overlay.classList.remove("hidden");
            break; 
        }
    }

    if (!isNearAnNpc) {
        overlay.classList.add("hidden");
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    updatePosition();
    handleNpc();

    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareTexCoordBuffer);
    gl.vertexAttribPointer(programInfo.vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.vTexCoord);

    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundPositionBuffer);
    gl.vertexAttribPointer(programInfo.vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.vPosition);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
    gl.uniform1i(programInfo.u_texture, 0);

    gl.uniformMatrix4fv(programInfo.modelMatrix, false, flatten(mat4()));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, squarePositionBuffer);
    gl.vertexAttribPointer(programInfo.vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, npcTexture);
    for (const npcPos of currentNpcs) {
        let modelMatrix = mult(translate(npcPos[0], npcPos[1], 0), scalem(npcSize, npcSize, 1));
        gl.uniformMatrix4fv(programInfo.modelMatrix, false, flatten(modelMatrix));
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    
    gl.bindTexture(gl.TEXTURE_2D, playerTexture);
	
    let playerMatrix = mult(translate(position[0], position[1], 0), scalem(playerScale, playerScale, 1));
    gl.uniformMatrix4fv(programInfo.modelMatrix, false, flatten(playerMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}

function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    };
    image.src = url;

    return texture;
}