# Excercise: Rasterization

{{< hint info >}}
**Excercise**  
Implement in software any of the following visualizations: primitive rasterization, color shading, z-depth and texture-mapping.
{{< /hint >}}

## Background
In computer graphics, rasterization is the task of taking an image described in a vector graphics format (shapes) and converting it into a raster image (a series of pixels, dots or lines, which, when displayed together, create the image which was represented via shapes). The rasterized image may then be displayed on a computer display, video display or printer, or stored in a bitmap file format. Rasterization may refer to the technique of drawing 3D models, or the conversion of 2D rendering primitives such as polygons, line segments into a rasterized format.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Raster_graphic_fish_20x23squares_sdtv-example.png/200px-Raster_graphic_fish_20x23squares_sdtv-example.png" alt="banding illustration" style="width: 50%;"/>

## Code & Results

### Primitive Rasterization
#### Code
{{< details title="Primitive Rasterization Code" open=false >}}
```js
const rows = [0, 0, 0];
const cols = [0, 0, 0];
const colors = [0, 0, 0];
const ROWS = 20;
const COLS = 20;
const LENGTH = 23;
let quadrille;

function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  quadrille = createQuadrille(20,20);
  generateNewRandomTriangle();
}

function draw() {
  background('white');
  drawQuadrille(quadrille, {cellLength: LENGTH, outlineWeight: 1, outline: 'gray', board: true});
  push();
  stroke('blue');
  strokeWeight(3);
  noFill();
  triangle(cols[0]*LENGTH + LENGTH/2, rows[0]*LENGTH + LENGTH/2, cols[1]*LENGTH + LENGTH/2, rows[1]*LENGTH + LENGTH/2, cols[2]*LENGTH + LENGTH/2, rows[2]*LENGTH + LENGTH/2);
  pop();
}

function keyPressed() {
  generateNewRandomTriangle();
}

function generateNewRandomTriangle() {
  rows[0] = int(random(0, ROWS));
  cols[0] = int(random(0, COLS));
  rows[1] = int(random(0, ROWS));
  cols[1] = int(random(0, COLS));
  rows[2] = int(random(0, ROWS));
  cols[2] = int(random(0, COLS));
  quadrille.clear();
  quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], 'green');
}
```
{{< /details >}}
#### Execution
(click on the canvas and press any key)
{{< p5-global-iframe id="breath" width="500" height="500" >}}
const rows = [0, 0, 0];
const cols = [0, 0, 0];
const colors = [0, 0, 0];
const ROWS = 20;
const COLS = 20;
const LENGTH = 23;
let quadrille;

function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  quadrille = createQuadrille(20,20);
  generateNewRandomTriangle();
}

function draw() {
  background('white');
  drawQuadrille(quadrille, {cellLength: LENGTH, outlineWeight: 1, outline: 'gray', board: true});
  push();
  stroke('blue');
  strokeWeight(3);
  noFill();
  triangle(cols[0]*LENGTH + LENGTH/2, rows[0]*LENGTH + LENGTH/2, cols[1]*LENGTH + LENGTH/2, rows[1]*LENGTH + LENGTH/2, cols[2]*LENGTH + LENGTH/2, rows[2]*LENGTH + LENGTH/2);
  pop();
}

function keyPressed() {
  generateNewRandomTriangle();
}

function generateNewRandomTriangle() {
  rows[0] = int(random(0, ROWS));
  cols[0] = int(random(0, COLS));
  rows[1] = int(random(0, ROWS));
  cols[1] = int(random(0, COLS));
  rows[2] = int(random(0, ROWS));
  cols[2] = int(random(0, COLS));
  quadrille.clear();
  quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], 'green');
}
{{< /p5-global-iframe >}}

### Color Shading
#### Code
{{< details title="Color Shading Code" open=false >}}
```js
const rows = [0, 0, 0];
const cols = [0, 0, 0];
const colors = [0, 0, 0];
const ROWS = 20;
const COLS = 20;
const LENGTH = 23;
let quadrille;

function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  quadrille = createQuadrille(20, 20);
  colors[0] = createColorPicker(color('yellow'));
  colors[1] = createColorPicker(color('blue'));
  colors[2] = createColorPicker(color('red'));
  colors[0].position(10, 10);
  colors[1].position(10, 40);
  colors[2].position(10, 70);
  colors[0].input(() => { quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color()) });
  colors[1].input(() => { quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color()) });
  colors[2].input(() => { quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color()) });
  generateNewRandomTriangle();
}

function draw() {
  background('#white');
  drawQuadrille(quadrille, { cellLength: LENGTH, outlineWeight: 1, outline: 'gray', board: true });
  
  push();
  stroke('blue');
  strokeWeight(3);
  noFill();
  triangle(cols[0] * LENGTH + LENGTH / 2, rows[0] * LENGTH + LENGTH / 2, cols[1] * LENGTH + LENGTH / 2, rows[1] * LENGTH + LENGTH / 2, cols[2] * LENGTH + LENGTH / 2, rows[2] * LENGTH + LENGTH / 2);
  pop();
}

function keyPressed() {
  generateNewRandomTriangle();
}

function generateNewRandomTriangle() {
  rows[0] = int(random(0, ROWS));
  cols[0] = int(random(0, COLS));
  rows[1] = int(random(0, ROWS));
  cols[1] = int(random(0, COLS));
  rows[2] = int(random(0, ROWS));
  cols[2] = int(random(0, COLS));
  quadrille.clear();
  quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color());
}
```
{{< /details >}}

#### Execution
(click on the canvas and press any key)
{{< p5-global-iframe id="breath" width="500" height="500" >}}
const rows = [0, 0, 0];
const cols = [0, 0, 0];
const colors = [0, 0, 0];
const ROWS = 20;
const COLS = 20;
const LENGTH = 23;
let quadrille;

function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  quadrille = createQuadrille(20, 20);
  colors[0] = createColorPicker(color('yellow'));
  colors[1] = createColorPicker(color('blue'));
  colors[2] = createColorPicker(color('red'));
  colors[0].position(10, 10);
  colors[1].position(10, 40);
  colors[2].position(10, 70);
  colors[0].input(() => { quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color()) });
  colors[1].input(() => { quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color()) });
  colors[2].input(() => { quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color()) });
  generateNewRandomTriangle();
}

function draw() {
  background('#white');
  drawQuadrille(quadrille, { cellLength: LENGTH, outlineWeight: 1, outline: 'gray', board: true });
  
  push();
  stroke('blue');
  strokeWeight(3);
  noFill();
  triangle(cols[0] * LENGTH + LENGTH / 2, rows[0] * LENGTH + LENGTH / 2, cols[1] * LENGTH + LENGTH / 2, rows[1] * LENGTH + LENGTH / 2, cols[2] * LENGTH + LENGTH / 2, rows[2] * LENGTH + LENGTH / 2);
  pop();
}

function keyPressed() {
  generateNewRandomTriangle();
}

function generateNewRandomTriangle() {
  rows[0] = int(random(0, ROWS));
  cols[0] = int(random(0, COLS));
  rows[1] = int(random(0, ROWS));
  cols[1] = int(random(0, COLS));
  rows[2] = int(random(0, ROWS));
  cols[2] = int(random(0, COLS));
  quadrille.clear();
  quadrille.colorizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], colors[0].color(), colors[1].color(), colors[2].color());
}
{{< /p5-global-iframe >}}

### Texture Mapping
#### Code
{{< details title="Texture Mapping Code" open=false >}}
```js
const rows = [0, 0, 0];
const cols = [0, 0, 0];
const colors = [0, 0, 0];
const u = [0, 0, 0];
const v = [0, 0, 0];

const ROWS = 20;
const COLS = 20;
let LENGTH;
let quadrille;
let pg2, pg1;
let img;

function preload() {
  img = loadImage('https://nationaltoday.com/wp-content/uploads/2021/05/Turtle-1.jpg');
}

function setup() {
  createCanvas(700, 350);
  pg1 = createGraphics(width / 2, height);
  pg2 = createGraphics(width / 2, height);
  LENGTH = width / (COLS * 2);
  quadrille = createQuadrille(20, 20);
  colors[0] = createColorPicker(color('yellow'));
  colors[1] = createColorPicker(color('blue'));
  colors[2] = createColorPicker(color('red'));
  colors[0].position(10, 10);
  colors[1].position(10, 40);
  colors[2].position(10, 70);
  
  pg2.rectMode(CENTER);
  img.resize(pg2.width, pg2.height);
  generateNewRandomTriangle();
}

function draw() {
  pg1.background('white');
  drawQuadrille(quadrille, { graphics: pg1, cellLength: LENGTH, outlineWeight: 1, outline: 'gray', board: true });
  pg1.push();
  pg1.stroke('blue');
  pg1.strokeWeight(3);
  pg1.noFill();
  pg1.triangle(cols[0] * LENGTH + LENGTH / 2, rows[0] * LENGTH + LENGTH / 2, cols[1] * LENGTH + LENGTH / 2, rows[1] * LENGTH + LENGTH / 2, cols[2] * LENGTH + LENGTH / 2, rows[2] * LENGTH + LENGTH / 2);
  pg1.fill(colors[0].color());
  pg1.rect(cols[0] * LENGTH, rows[0] * LENGTH, LENGTH);
  pg1.fill(colors[1].color());
  pg1.rect(cols[1] * LENGTH, rows[1] * LENGTH, LENGTH);
  pg1.fill(colors[2].color());
  pg1.rect(cols[2] * LENGTH, rows[2] * LENGTH, LENGTH);
  pg1.pop();
  image(pg1, 0, 0);
  pg2.image(img, 0, 0);
  pg2.push();
  pg2.stroke('white');
  pg2.strokeWeight(3);
  pg2.noFill();
  pg2.triangle(u[0], v[0], u[1], v[1], u[2], v[2]);
  pg2.fill(colors[0].color());
  pg2.rect(u[0], v[0], LENGTH);
  pg2.fill(colors[1].color());
  pg2.rect(u[1], v[1], LENGTH);
  pg2.fill(colors[2].color());
  pg2.rect(u[2], v[2], LENGTH);
  pg2.pop();
  image(pg2, width / 2, 0);
}

function keyPressed() {
  generateNewRandomTriangle();
}

function generateNewRandomTriangle() {
  u[0] = int(random(0, img.width));
  v[0] = int(random(0, img.height));
  u[1] = int(random(0, img.width));
  v[1] = int(random(0, img.height));
  u[2] = int(random(0, img.width));
  v[2] = int(random(0, img.height));
  rows[0] = round(map(v[0], 0, img.height, 0, COLS));
  cols[0] = round(map(u[0], 0, img.width, 0, ROWS));
  rows[1] = round(map(v[1], 0, img.height, 0, COLS));
  cols[1] = round(map(u[1], 0, img.width, 0, ROWS));
  rows[2] = round(map(v[2], 0, img.height, 0, COLS));
  cols[2] = round(map(u[2], 0, img.width, 0, ROWS));
  quadrille.clear();
  img.loadPixels();
  quadrille.rasterizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], texturize,
    [u[0], v[0]],
    [u[1], v[1]],
    [u[2], v[2]]
  );
}

function texturize({ pattern: texcoords2 }) {
  let index = 4 * (int(texcoords2[1]) * img.width + int(texcoords2[0]));
  return color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]);
}
```
{{< /details >}}

#### Execution
(click on the canvas and press any key)
{{< p5-global-iframe id="breath" width="730" height="380" >}}
const rows = [0, 0, 0];
const cols = [0, 0, 0];
const colors = [0, 0, 0];
const u = [0, 0, 0];
const v = [0, 0, 0];

const ROWS = 20;
const COLS = 20;
let LENGTH;
let quadrille;
let pg2, pg1;
let img;

function preload() {
  img = loadImage('https://nationaltoday.com/wp-content/uploads/2021/05/Turtle-1.jpg');
}

function setup() {
  createCanvas(700, 350);
  pg1 = createGraphics(width / 2, height);
  pg2 = createGraphics(width / 2, height);
  LENGTH = width / (COLS * 2);
  quadrille = createQuadrille(20, 20);
  colors[0] = createColorPicker(color('yellow'));
  colors[1] = createColorPicker(color('blue'));
  colors[2] = createColorPicker(color('red'));
  colors[0].position(10, 10);
  colors[1].position(10, 40);
  colors[2].position(10, 70);
  
  pg2.rectMode(CENTER);
  img.resize(pg2.width, pg2.height);
  generateNewRandomTriangle();
}

function draw() {
  pg1.background('white');
  drawQuadrille(quadrille, { graphics: pg1, cellLength: LENGTH, outlineWeight: 1, outline: 'gray', board: true });
  pg1.push();
  pg1.stroke('blue');
  pg1.strokeWeight(3);
  pg1.noFill();
  pg1.triangle(cols[0] * LENGTH + LENGTH / 2, rows[0] * LENGTH + LENGTH / 2, cols[1] * LENGTH + LENGTH / 2, rows[1] * LENGTH + LENGTH / 2, cols[2] * LENGTH + LENGTH / 2, rows[2] * LENGTH + LENGTH / 2);
  pg1.fill(colors[0].color());
  pg1.rect(cols[0] * LENGTH, rows[0] * LENGTH, LENGTH);
  pg1.fill(colors[1].color());
  pg1.rect(cols[1] * LENGTH, rows[1] * LENGTH, LENGTH);
  pg1.fill(colors[2].color());
  pg1.rect(cols[2] * LENGTH, rows[2] * LENGTH, LENGTH);
  pg1.pop();
  image(pg1, 0, 0);
  pg2.image(img, 0, 0);
  pg2.push();
  pg2.stroke('white');
  pg2.strokeWeight(3);
  pg2.noFill();
  pg2.triangle(u[0], v[0], u[1], v[1], u[2], v[2]);
  pg2.fill(colors[0].color());
  pg2.rect(u[0], v[0], LENGTH);
  pg2.fill(colors[1].color());
  pg2.rect(u[1], v[1], LENGTH);
  pg2.fill(colors[2].color());
  pg2.rect(u[2], v[2], LENGTH);
  pg2.pop();
  image(pg2, width / 2, 0);
}

function keyPressed() {
  generateNewRandomTriangle();
}

function generateNewRandomTriangle() {
  u[0] = int(random(0, img.width));
  v[0] = int(random(0, img.height));
  u[1] = int(random(0, img.width));
  v[1] = int(random(0, img.height));
  u[2] = int(random(0, img.width));
  v[2] = int(random(0, img.height));
  rows[0] = round(map(v[0], 0, img.height, 0, COLS));
  cols[0] = round(map(u[0], 0, img.width, 0, ROWS));
  rows[1] = round(map(v[1], 0, img.height, 0, COLS));
  cols[1] = round(map(u[1], 0, img.width, 0, ROWS));
  rows[2] = round(map(v[2], 0, img.height, 0, COLS));
  cols[2] = round(map(u[2], 0, img.width, 0, ROWS));
  quadrille.clear();
  img.loadPixels();
  quadrille.rasterizeTriangle(rows[0], cols[0], rows[1], cols[1], rows[2], cols[2], texturize,
    [u[0], v[0]],
    [u[1], v[1]],
    [u[2], v[2]]
  );
}

function texturize({ pattern: texcoords2 }) {
  let index = 4 * (int(texcoords2[1]) * img.width + int(texcoords2[0]));
  return color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]);
}
{{< /p5-global-iframe >}}

### Z-Depth
#### Code
{{< details title="Z-Depth Code" open=false >}}
```js
let easycam;
let depth_map;
let depthShader;
let near, far;

function preload() {
  depthShader = loadShader('/VisualComputing2022-2/docs/excercises/shader.vert', '/VisualComputing2022-2/docs/excercises/depthmap.frag');
}

function setup() {
  pixelDensity(1);

  createCanvas(400, 400, WEBGL);
  setAttributes('antialias', true);

  let state = {
    distance: 164.411,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };

  near = 1;
  far = 500;

  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = state;
  easycam.setState(state, 2000);

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
  m4_camera.set(easycam.renderer.uMVMatrix);
  m3_camera.inverseTranspose(m4_camera);
}

let matWhite = {
  diff: [1, 1, 1],
  spec: [1, 1, 1],
  spec_exp: 400.0,
};
let ambientlight = {
  col: [0.0002, 0.0004, 0.0006],
};

let directlights = [
  {
    dir: [-1, -1, -2],
    col: [0.0010, 0.0005, 0.00025],
  },
];

function draw() {
  if (!depth_map) {
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

  perspective(60 * PI / 180, width / height, near, far);

  background(255);
  noStroke();

  rand.seed = 0;
  let count = 100;
  let trange = 100;
  for (let i = 0; i < count; i++) {
    let dx = rand() * 25 + 8;
    let tx = (rand() * 2 - 1) * trange;
    let ty = (rand() * 2 - 1) * trange;
    let tz = (rand() * 2 - 1) * trange;
    push();
    translate(tx, ty, tz);
    box(dx);
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

    let x = light.dir[0];
    let y = light.dir[1];
    let z = light.dir[2];
    let mag = Math.sqrt(x * x + y * y + z * z);
    let light_dir = [x / mag, y / mag, z / mag];

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
```
{{< /details >}}

#### Execution
##### [1] (Click on the canvas and press any key)
##### [2] (Click on the canvas and move the cursor pointer)
##### [3] (Click on the canvas and zoom in)
{{< p5-global-iframe id="breath" width="430" height="430" >}}
let easycam;
let depth_map;
let depthShader;
let near, far;

function preload() {
  depthShader = loadShader('/VisualComputing2022-2/docs/excercises/shader.vert', '/VisualComputing2022-2/docs/excercises/depthmap.frag');
}

function setup() {
  pixelDensity(1);

  createCanvas(400, 400, WEBGL);
  setAttributes('antialias', true);

  let state = {
    distance: 164.411,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };

  near = 1;
  far = 500;

  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = state;
  easycam.setState(state, 2000);

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
  m4_camera.set(easycam.renderer.uMVMatrix);
  m3_camera.inverseTranspose(m4_camera);
}

let matWhite = {
  diff: [1, 1, 1],
  spec: [1, 1, 1],
  spec_exp: 400.0,
};
let ambientlight = {
  col: [0.0002, 0.0004, 0.0006],
};

let directlights = [
  {
    dir: [-1, -1, -2],
    col: [0.0010, 0.0005, 0.00025],
  },
];

function draw() {
  if (!depth_map) {
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

  perspective(60 * PI / 180, width / height, near, far);

  background(255);
  noStroke();

  rand.seed = 0;
  let count = 100;
  let trange = 100;
  for (let i = 0; i < count; i++) {
    let dx = rand() * 25 + 8;
    let tx = (rand() * 2 - 1) * trange;
    let ty = (rand() * 2 - 1) * trange;
    let tz = (rand() * 2 - 1) * trange;
    push();
    translate(tx, ty, tz);
    box(dx);
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

    let x = light.dir[0];
    let y = light.dir[1];
    let z = light.dir[2];
    let mag = Math.sqrt(x * x + y * y + z * z);
    let light_dir = [x / mag, y / mag, z / mag];

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
{{< /p5-global-iframe >}}

## Conclusions
Real-time PC graphics have long used a technique called "rasterization" to display three-dimensional objects on a two-dimensional screen. It is a fast technique and the results have become very good over the last few years.
Rasterization is still a topic that continues to be studied and improved to make modern applications faster and lighter. It has many applications at the level of video games and computer graphics.

## References

* [Rasterisation](https://en.wikipedia.org/wiki/Rasterisation)
* [p5.Quadrille](https://objetos.github.io/p5.quadrille.js/docs/vc/rasterize_triangle)
* [p5.EasyCam - Random Boxes Examples](https://github.com/freshfork/p5.EasyCam/blob/master/examples/RandomBoxes/RandomBoxes.js)