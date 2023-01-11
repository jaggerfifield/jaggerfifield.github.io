const vertexShaderSource = `
	uniform vec2 screenSize;
	attribute vec2 spritePosition;

	void main(){
		vec4 screenTransform = vec4(2.0 / screenSize.x, -2.0 / screenSize.y, -1.0, 1.0);
		gl_Position = vec4(spritePosition * screenTransform.xy + screenTransform.zw, 0.0, 1.0);
		gl_PointSize = 64.0;
	}
`;
 
const fragmentShaderSource = `
	void main(){
		gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
	}
`;

const jcan = document.createElement("canvas");
document.body.appendChild(jcan);   

jcan.width = window.innerWidth;
jcan.height = window.innerHeight;

const gl = jcan.getContext("webgl");

const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const jshader = gl.createProgram();
gl.attachShader(jshader, vertexShader);
gl.attachShader(jshader, fragmentShader);
gl.linkProgram(jshader);

const status = gl.getProgramParameter(jshader, gl.LINK_STATUS);

let key_w = false;
let key_a = false;
let key_s = false;
let key_d = false;

let x = 0;
let y = 0;

if(!status){
	throw new TypeError(`Could not link shader program:\n${gl.getProgramInfoLog(jshader)}`)
}
function main(){
	if(gl == null){
		alert("WebGL not initalized! Your browser may not support it!");
		return; 
	}

	gl.useProgram(jshader);
	gl.uniform2f(gl.getUniformLocation(jshader, 'screenSize'), window.innerWidth, window.innerHeight);

	const array = new Float32Array(1000);
	array[0] = x + 32;
	array[1] = y + 32;

	const glBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, array, gl.DYNAMIC_DRAW);

	const loc = gl.getAttribLocation(jshader, 'spritePosition');
	gl.enableVertexAttribArray(loc);
	gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

	draw();
}

function draw(){
	// Clear color is set to black
    gl.clearColor(76/255, 86/255, 106/255, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(jshader);
	gl.drawArrays(gl.POINTS, 0, 1);
}

function compileShader(gl, type, source){
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

	if(!status){
		throw new TypeError(`Could not compile shader:\n${gl.getShaderInfoLog(shader)}`);
	}
	return shader;
}	

function updateSize(){
	jcan.width = window.innerWidth;
	jcan.height = window.innerHeight;
	main();
}

function update(event){
	let v = 10;
	if(key_w){
		if(y > 0){
			y = y - v;
		}
	}
	if(key_a){
		if(x > 0){
			x = x - v;
		}
	}
	if(key_d){
		if(x < window.innerWidth - 64){
			x = x + v;
		}
	}
	if(key_s){
		if(y < window.innerHeight - 64){
			y = y + v;
		}
	}
	main();
}

function keyDown(event){

	console.log("Key %s pressed.", event.key);

	switch(event.key){
		case 'w':
			key_w = true;
			break;
		case 'a':
			key_a = true;
			break;
		case 's':
			key_s = true;
			break;
		case 'd':
			key_d = true;
			break;
	}
}

function keyUp(event){
	switch(event.key){
		case 'w':
			key_w = false;
			break;
		case 'a':
			key_a = false;
			break;
		case 's': 
			key_s = false;
			break;
		case 'd':
			key_d = false
			break;
	}
}

window.onload = main;
window.onresize = updateSize;
window.onkeydown = keyDown, event;
window.onkeyup = keyUp, event;
window.onkeypress = update;
