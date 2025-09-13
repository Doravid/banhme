// WebGL Obstacle Avoidance Simulation with Edge Bouncing

let gl;
let program;
let points = [];
let obstacles = [];
let obstacleRadius = 0.2;
let velocity = vec2(0.00, 0.00);
let position = vec2(0, 0.0);
document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
	if(keyName == 'w'){
		velocity[1] = 0.01;
	}if(keyName == 'a'){
		velocity[0] = -0.01;
	}if(keyName == 's'){
		velocity[1] = -0.01;
	}if(keyName == 'd'){
		velocity[0] = 0.01;
	}
  },
  false,
);
document.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.key;
	if(keyName == 'w'){
		velocity[1] = 0;
	}if(keyName == 'a'){
		velocity[0] = 0;
	}if(keyName == 's'){
		velocity[1] = 0;
	}if(keyName == 'd'){
		velocity[0] = 0;
	}
  },
  false,
);
window.onload = function init() {
	const canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas, null);
	if (!gl) { alert("WebGL isn't available"); }

	// Define simple square geometry
	points = [
		vec2(-0.05, -0.05),
		vec2( 0.05, -0.05),
		vec2( 0.05,  0.05),
		vec2(-0.05, -0.05),
		vec2( 0.05,  0.05),
		vec2(-0.05,  0.05),
	];

	// Initialize random obstacles
	for (let i = 0; i < 0; i++) {
		let x = Math.random() * 1.6 - 0.8;
		let y = Math.random() * 1.6 - 0.8;
		obstacles.push(vec2(x, y));
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.9, 0.9, 0.9, 1.0);

	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	const bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	const vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	render();
};

function updatePosition() {

	//Normalize the Velocity
	position = [position[0] + velocity[0],position[1] + velocity[1]];
	
	if(Math.abs(position[0]) >= 1){
		velocity[0] *= -1;
	}
	if(Math.abs(position[1]) >= 1){
		velocity[1] *= -1;
	}
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);

	updatePosition();

	// Draw moving object
	let modelMatrix = mat4();
	modelMatrix = mult(modelMatrix, translate(position[0], position[1], 0));
	gl.uniformMatrix4fv(gl.getUniformLocation(program, "modelMatrix"), false, flatten(modelMatrix));
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	// Draw obstacles
	for (let i = 0; i < obstacles.length; i++) {
		let obsMatrix = mat4();
		obsMatrix = mult(obsMatrix, translate(obstacles[i][0], obstacles[i][1], 0));
		obsMatrix = mult(obsMatrix, scalem(obstacleRadius, obstacleRadius, 1));
		gl.uniformMatrix4fv(gl.getUniformLocation(program, "modelMatrix"), false, flatten(obsMatrix));
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	requestAnimationFrame(render);
}