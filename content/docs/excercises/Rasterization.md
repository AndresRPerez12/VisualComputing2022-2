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

## Conclusions
Real-time PC graphics have long used a technique called "rasterization" to display three-dimensional objects on a two-dimensional screen. It is a fast technique and the results have become very good over the last few years.
Rasterization is still a topic that continues to be studied and improved to make modern applications faster and lighter. It has many applications at the level of video games and computer graphics.

## References

* [Rasterisation](https://en.wikipedia.org/wiki/Rasterisation)