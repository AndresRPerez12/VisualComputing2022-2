/**
 * Adapted from here:
 * https://github.com/freshfork/p5.EasyCam/edit/master/examples/RandomBoxes/RandomBoxes.js
 */

 let easycam;
 let depth_map;
 let desder;
 let near, far;
 
 function preload() {
   depthShader = loadShader('shader.vert', 'depthmap.frag');
 }
 
 function setup() {
   pixelDensity(1);
 
   createCanvas(400, 400, WEBGL);
   setAttributes('antialias', true);
 
   // define initial state
   let state = {
     distance: 164.411,
     center: [0, 0, 0],
     rotation: [-0.285, -0.257, -0.619, 0.685],
   };
 
   near = 1;
   far = 500;
 
   console.log(Dw.EasyCam.INFO);
 
   easycam = new Dw.EasyCam(this._renderer);
   easycam.state_reset = state;   // state to use on reset (double-click/tap)
   easycam.setState(state, 2000); // now animate to that state
 
   // suppress right-click context menu
   document.oncontextmenu = function () { return false; }
 
   depth_map = false;
 }
 
 function keyPressed() {
   toggleShader();
 }
 
 function toggleShader() {
   depth_map = !depth_map;
   if (depth_map) {
     shader(depthShader);
     depthShader.setUniform('near', near);
     depthShader.setUniform('far', far);
   }
   else {
     resetShader();
   }
 }
 
 function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
   easycam.setViewport([0, 0, windowWidth, windowHeight]);
 }
 
 let m4_camera = new p5.Matrix();
 let m3_camera = new p5.Matrix('mat3');
 
 function backupCameraMatrix() {
   // camera matrix: for transforming positions
   m4_camera.set(easycam.renderer.uMVMatrix);
   // inverse transpose: for transforming directions
   m3_camera.inverseTranspose(m4_camera);
 }
 
 let matWhite = {
   diff: [1, 1, 1],
   spec: [1, 1, 1],
   spec_exp: 400.0,
 };
 let ambientlight = {
   col: [0.0006, 0.0004, 0.0006],
 };
 
 let directlights = [
   {
     dir: [-1, -1, -2],
     col: [0.0010, 0.0005, 0.00025],
   },
 ];
 
 function draw() {
   if (!depth_map) {
     // save current state of the modelview matrix
     backupCameraMatrix();
     let angle = frameCount * 0.03;
     let rad = 30;
     let px = cos(angle) * rad;
     let py = sin(angle) * rad;
 
     let r = (sin(angle) * 0.5 + 0.5);
     let g = (sin(angle * 0.5 + PI / 2) * 0.5 + 0.5);
     let b = (sin(frameCount * 0.02) * 0.5 + 0.5);
 
     let pz = sin(frameCount * 0.02);
     let pointlights = [
       {
         pos: [px, py, 0, 1],
         col: [1 - r, r / 2, r],
         att: 80,
       },
 
       {
         pos: [50, 50, pz * 40, 1],
         col: [r, 1, g],
         att: 80,
       },
 
       {
         pos: [-50, -50, -pz * 40, 1],
         col: [1, r, g],
         att: 80,
       },
     ];
 
     setAmbientlight(ambientlight);
     setDirectlight(directlights);
     setPointlight(pointlights);
 
     push();
     for (let i = 0; i < pointlights.length; i++) {
       let pl = pointlights[i];
       push();
       translate(pl.pos[0], pl.pos[1], pl.pos[2]);
       emissiveMaterial(pl.col[0] * 255, pl.col[1] * 255, pl.col[2] * 255);
       fill(pl.col[0] * 255, pl.col[1] * 255, pl.col[2] * 255);
       sphere(3);
       pop();
     }
     pop();
   }
 
   // projection
   perspective(60 * PI / 180, width / height, near, far);
 
   // clear BG
   background(0);
   noStroke();
 
   rand.seed = 0;
   let count = 100;
   let trange = 100;
   for (let i = 0; i < count; i++) {
     let dx = rand() * 10 + 8;
     let tx = (rand() * 2 - 1) * trange;
     let ty = (rand() * 2 - 1) * trange;
     let tz = (rand() * 2 - 1) * trange;
     push();
     translate(tx, ty, tz);
     torus(dx, dx/3)
     pop();
   }
 }
 
 let rand = function () {
   this.x = ++rand.seed;
   this.y = ++rand.seed;
   let val = Math.sin(this.x * 12.9898 + this.y * 78.233) * 43758.545;
   return (val - Math.floor(val));
 }
 
 rand.seed = 0;
 
 function setAmbientlight(ambientlight) {
   ambientLight(ambientlight.col[0] * 255, ambientlight.col[1] * 255, ambientlight.col[2] * 255);
 }
 
 function setDirectlight(directlights) {
   for (let i = 0; i < directlights.length; i++) {
     let light = directlights[i];
 
     // normalize
     let x = light.dir[0];
     let y = light.dir[1];
     let z = light.dir[2];
     let mag = Math.sqrt(x * x + y * y + z * z); // should not be zero length
     let light_dir = [x / mag, y / mag, z / mag];
 
     // transform to camera-space
     light_dir = m3_camera.multVec(light_dir);
 
     directionalLight(light.col[0] * 255, light.col[1] * 255, light.col[2] * 255,
       light_dir[0], light_dir[1], light_dir[2]);
   }
 }
 
 function setPointlight(pointlights) {
   for (let i = 0; i < pointlights.length; i++) {
     let light = pointlights[i];
     pointLight(light.col[0] * 255, light.col[1] * 255, light.col[2] * 255, light.pos[0], light.pos[1], light.pos[2]);
   }
 }
 
 //
 // multiplies: vdst = mat * vsrc
 //
 // vsrc can be euqal vdst
 //
 p5.Matrix.prototype.multVec = function (vsrc, vdst) {
 
   vdst = (vdst instanceof Array) ? vdst : [];
 
   let x = 0, y = 0, z = 0, w = 1;
 
   if (vsrc instanceof p5.Vector) {
     x = vsrc.x;
     y = vsrc.y;
     z = vsrc.z;
   } else if (vsrc instanceof Array) {
     x = vsrc[0];
     y = vsrc[1];
     z = vsrc[2];
     w = vsrc[3]; w = (w === undefined) ? 1 : w;
   }
 
   let mat = this.mat4 || this.mat3;
   if (mat.length === 16) {
     vdst[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
     vdst[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
     vdst[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
     vdst[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;
   } else {
     vdst[0] = mat[0] * x + mat[3] * y + mat[6] * z;
     vdst[1] = mat[1] * x + mat[4] * y + mat[7] * z;
     vdst[2] = mat[2] * x + mat[5] * y + mat[8] * z;
   }
 
   return vdst;
 }