# Excercises: Lighting 

## Background
Lighting aims at modelling light interactions on different material types to simulate both, photorealistic and non-photorealistic scenes.



{{< hint info >}}

### Ambient light

**Excercise**  
Implement a scene having the following lighting equation: \mathbf{a} = ambient \, ambient4a=ambientambient4, where ambient4ambient4 is the ambient light color. It should produce something like the sketch below:
{{< /hint >}}

## Code & Results

#### Code
{{< details title="Ambient light" open=false >}}
```js
let easycam;
let models;
let modelsDisplayed;
let lightShader;
let ambient, ambient4;

function preload() {
  lightShader = readShader('/VisualComputing2022-2/docs/excercises/ambient_color.frag', { varyings: Tree.NONE });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  textureMode(NORMAL);
  noStroke();
  setAttributes('antialias', true);
  let state = {
    distance: 300,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  document.oncontextmenu = function () { return false; }
  colorMode(RGB, 1);
  let trange = 100;
  models = [];
  for (let i = 0; i < 100; i++) {
    models.push(
      {
        position: createVector((random() * 2 - 1) * trange, (random() * 2 - 1) * trange, (random() * 2 - 1) * trange),
        size: random() * 25 + 8,
        color: color(random(), random(), random())
      }
    );
  }
  
  modelsDisplayed = createSlider(1, models.length, int(models.length / 4), 1);
  modelsDisplayed.position(10, 10);
  modelsDisplayed.style('width', '80px');
  ambient = createSlider(0, 1, 0.5, 0.05);
  ambient.position(420, 10);
  ambient.style('width', '80px');
  ambient.input(() => { lightShader.setUniform('ambient', ambient.value()) });
  shader(lightShader);
  lightShader.setUniform('ambient', ambient.value());
  ambient4 = createColorPicker('white');
  ambient4.position(420, 45);
  ambient4.input(() => {
    
    let ambient4Color = ambient4.color();
    lightShader.setUniform('ambient4', [red(ambient4Color) / 255, green(ambient4Color) / 255, blue(ambient4Color) / 255, 1]);
  });
  lightShader.setUniform('ambient4', [1, 1, 1, 1]);
}

function draw() {
  background(0);
  push();
  stroke('green');
  axes();
  grid();
  pop();
  for (let i = 0; i < modelsDisplayed.value(); i++) {
    push();
    fill(models[i].color);
    translate(models[i].position);
    let radius = models[i].size / 2;
    i % 3 === 0 ? box(radius * 2) : i % 3 === 1 ? sphere(radius) : torus(radius, radius / 4);
    pop();
  }
}
```
{{< /details >}}
#### Execution
{{< p5-global-iframe id="breath" width="600" height="600" >}}
let easycam;
let models;
let modelsDisplayed;
let lightShader;
let ambient, ambient4;

function preload() {
  lightShader = readShader('/VisualComputing2022-2/docs/excercises/ambient_color.frag', { varyings: Tree.NONE });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  textureMode(NORMAL);
  noStroke();
  setAttributes('antialias', true);
  let state = {
    distance: 300,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  document.oncontextmenu = function () { return false; }
  colorMode(RGB, 1);
  let trange = 100;
  models = [];
  for (let i = 0; i < 100; i++) {
    models.push(
      {
        position: createVector((random() * 2 - 1) * trange, (random() * 2 - 1) * trange, (random() * 2 - 1) * trange),
        size: random() * 25 + 8,
        color: color(random(), random(), random())
      }
    );
  }
  
  modelsDisplayed = createSlider(1, models.length, int(models.length / 4), 1);
  modelsDisplayed.position(10, 10);
  modelsDisplayed.style('width', '80px');
  ambient = createSlider(0, 1, 0.5, 0.05);
  ambient.position(420, 10);
  ambient.style('width', '80px');
  ambient.input(() => { lightShader.setUniform('ambient', ambient.value()) });
  shader(lightShader);
  lightShader.setUniform('ambient', ambient.value());
  ambient4 = createColorPicker('white');
  ambient4.position(420, 45);
  ambient4.input(() => {
    
    let ambient4Color = ambient4.color();
    lightShader.setUniform('ambient4', [red(ambient4Color) / 255, green(ambient4Color) / 255, blue(ambient4Color) / 255, 1]);
  });
  lightShader.setUniform('ambient4', [1, 1, 1, 1]);
}

function draw() {
  background(0);
  push();
  stroke('green');
  axes();
  grid();
  pop();
  for (let i = 0; i < modelsDisplayed.value(); i++) {
    push();
    fill(models[i].color);
    translate(models[i].position);
    let radius = models[i].size / 2;
    i % 3 === 0 ? box(radius * 2) : i % 3 === 1 ? sphere(radius) : torus(radius, radius / 4);
    pop();
  }
}
{{< /p5-global-iframe >}}

{{< hint info >}}

### Toon shading

**Excercise**  
Tweak the above diffuse shader to implement a toon shading scene. It should produce something like the sketch below:
{{< /hint >}}

## Code & Results

#### Code
{{< details title="Toon shading" open=false >}}
```js
'use strict';

let easycam;
let models;
let modelsDisplayed;
let lightShader;
let depth, ambient4;

function preload() {
  lightShader = readShader('/VisualComputing2022-2/docs/excercises/toon.frag', { varyings: Tree.normal3 });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  colorMode(RGB, 1);
  textureMode(NORMAL);
  noStroke();
  setAttributes('antialias', true);
  let state = {
    distance: 300,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer);
  //easycam.attachMouseListeners(this._renderer);
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  // suppress right-click context menu
  document.oncontextmenu = function () { return false; }
  let trange = 100;
  models = [];
  for (let i = 0; i < 100; i++) {
    models.push(
      {
        position: createVector((random() * 2 - 1) * trange, (random() * 2 - 1) * trange, (random() * 2 - 1) * trange),
        angle: random(0, TWO_PI),
        axis: p5.Vector.random3D(),
        size: random() * 25 + 8,
        color: color(random(), random(), random())
      }
    );
  }
  // gui
  modelsDisplayed = createSlider(1, models.length, int(models.length / 4), 1);
  modelsDisplayed.position(10, 10);
  modelsDisplayed.style('width', '80px');
  depth = createSlider(-1, 1, -0.4, 0.05);
  depth.position(420, 10);
  depth.style('width', '80px');
  shader(lightShader);
  lightShader.setUniform('ambient', depth.value());
  ambient4 = createColorPicker('white');
  ambient4.position(420, 45);
  ambient4.input(() => {
    let ambient4Color = ambient4.color();
    lightShader.setUniform('ambient4', [red(ambient4Color) / 255, green(ambient4Color) / 255, blue(ambient4Color) / 255, 1]);
  });
  lightShader.setUniform('ambient4', [1, 1, 1, 1]);
}

function draw() {
  background(0);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  lightShader.setUniform('lightNormal', createVector(-dirX, -dirY, depth.value()).array());
  push();
  stroke('green');
  axes();
  grid();
  pop();
  for (let i = 0; i < modelsDisplayed.value(); i++) {
    push();
    fill(models[i].color);
    translate(models[i].position);
    rotate(models[i].angle, models[i].axis);
    let radius = models[i].size / 2;
    i % 3 === 0 ? cone(radius) : i % 3 === 1 ? sphere(radius) : torus(radius, radius / 4);
    pop();
  }
}
```
{{< /details >}}
#### Execution
{{< p5-global-iframe id="breath" width="600" height="600" >}}
'use strict';

let easycam;
let models;
let modelsDisplayed;
let lightShader;
let depth, ambient4;

function preload() {
  lightShader = readShader('/VisualComputing2022-2/docs/excercises/toon.frag', { varyings: Tree.normal3 });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  colorMode(RGB, 1);
  textureMode(NORMAL);
  noStroke();
  setAttributes('antialias', true);
  let state = {
    distance: 300,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer);
  //easycam.attachMouseListeners(this._renderer);
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  // suppress right-click context menu
  document.oncontextmenu = function () { return false; }
  let trange = 100;
  models = [];
  for (let i = 0; i < 100; i++) {
    models.push(
      {
        position: createVector((random() * 2 - 1) * trange, (random() * 2 - 1) * trange, (random() * 2 - 1) * trange),
        angle: random(0, TWO_PI),
        axis: p5.Vector.random3D(),
        size: random() * 25 + 8,
        color: color(random(), random(), random())
      }
    );
  }
  // gui
  modelsDisplayed = createSlider(1, models.length, int(models.length / 4), 1);
  modelsDisplayed.position(10, 10);
  modelsDisplayed.style('width', '80px');
  depth = createSlider(-1, 1, -0.4, 0.05);
  depth.position(420, 10);
  depth.style('width', '80px');
  shader(lightShader);
  lightShader.setUniform('ambient', depth.value());
  ambient4 = createColorPicker('white');
  ambient4.position(420, 45);
  ambient4.input(() => {
    let ambient4Color = ambient4.color();
    lightShader.setUniform('ambient4', [red(ambient4Color) / 255, green(ambient4Color) / 255, blue(ambient4Color) / 255, 1]);
  });
  lightShader.setUniform('ambient4', [1, 1, 1, 1]);
}

function draw() {
  background(0);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  lightShader.setUniform('lightNormal', createVector(-dirX, -dirY, depth.value()).array());
  push();
  stroke('green');
  axes();
  grid();
  pop();
  for (let i = 0; i < modelsDisplayed.value(); i++) {
    push();
    fill(models[i].color);
    translate(models[i].position);
    rotate(models[i].angle, models[i].axis);
    let radius = models[i].size / 2;
    i % 3 === 0 ? cone(radius) : i % 3 === 1 ? sphere(radius) : torus(radius, radius / 4);
    pop();
  }
}
{{< /p5-global-iframe >}}

{{< hint info >}}

### Specular reflection

**Excercise**  
Implement a specular reflection scene producing a result like the sketch below:
{{< /hint >}}

## Code & Results

#### Code
{{< details title="Specular reflection" open=false >}}
```js
'use strict';

let easycam;
let models;
let modelsDisplayed;
let lightShader;
let ambient /*, ambient4*/;
let point_light;
let lightPath;

function preload() {
  lightShader = readShader('/VisualComputing2022-2/docs/excercises/specular.frag', { varyings: Tree.normal3 | Tree.position4 });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  noLights();
  colorMode(RGB, 1);
  setAttributes('antialias', true);
  // define initial state
  let state = {
    distance: 300,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  document.oncontextmenu = function () { return false; }
  // models
  let trange = 100;
  models = [];
  for (let i = 0; i < 100; i++) {
    models.push(
      {
        position: createVector((random() * 2 - 1) * trange, (random() * 2 - 1) * trange, (random() * 2 - 1) * trange),
        size: random() * 25 + 8,
        color: color(random(), random(), random())
      }
    );
  }
  // light
  point_light = {};
  // gui
  modelsDisplayed = createSlider(1, models.length, int(models.length / 4), 1);
  modelsDisplayed.position(10, 10);
  modelsDisplayed.style('width', '80px');
  ambient = createSlider(0, 1, 0.2, 0.05);
  ambient.position(420, 10);
  ambient.style('width', '80px');
  ambient.input(() => { lightShader.setUniform('ambient', ambient.value()) });
  shader(lightShader);
  lightShader.setUniform('ambient', ambient.value());
  lightPath = createSelect();
  lightPath.position(10, 40);
  //lightPath.option('0');
  lightPath.option('1');
  lightPath.option('2');
  lightPath.option('3');
  lightPath.selected('1');
}

function draw() {
  background(0);
  let pointLight = updatePointLight();
  resetShader();
  push();
  stroke('green');
  axes();
  grid();
  pop();
  push();
  translate(pointLight.position);
  noStroke();
  //fill(point_light.color);
  fill('white');
  sphere(3);
  pop();
  shader(lightShader);
  lightShader.setUniform('uLightPosition', treeLocation(pointLight.position, { from: Tree.WORLD, to: Tree.EYE }).array());
  for (let i = 0; i < modelsDisplayed.value(); i++) {
    push();
    noStroke();
    fill(models[i].color);
    translate(models[i].position);
    let radius = models[i].size / 2;
    i % 3 === 0 ? box(radius * 2) : i % 3 === 1 ? sphere(radius) : torus(radius, radius / 4);
    pop();
  }
}

function updatePointLight() {
  //if (lightPath.value() === '0') return;
  let angle = frameCount * 0.03;
  let rad = 30;
  let px = cos(angle) * rad;
  let py = sin(angle) * rad;
  let r = (sin(angle) * 0.5 + 0.5);
  let g = (sin(angle * 0.5 + PI / 2) * 0.5 + 0.5);
  let b = (sin(frameCount * 0.02) * 0.5 + 0.5);
  let pz = sin(frameCount * 0.02);
  return {
    position: lightPath.value() === '1' ? createVector(px, py, 0) : lightPath.value() === '2' ?
      createVector(50, 50, pz * 40) : createVector(-50, -50, -pz * 40),
    color: lightPath.value() === '1' ? color(1 - r, r / 2, r) : lightPath.value() === '2' ?
      color(r, 1, g) : color(1, r, g)
  };
}
```
{{< /details >}}
#### Execution
{{< p5-global-iframe id="breath" width="600" height="600" >}}
'use strict';

let easycam;
let models;
let modelsDisplayed;
let lightShader;
let ambient /*, ambient4*/;
let point_light;
let lightPath;

function preload() {
  lightShader = readShader('/VisualComputing2022-2/docs/excercises/specular.frag', { varyings: Tree.normal3 | Tree.position4 });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  noLights();
  colorMode(RGB, 1);
  setAttributes('antialias', true);
  // define initial state
  let state = {
    distance: 300,
    center: [0, 0, 0],
    rotation: [-0.285, -0.257, -0.619, 0.685],
  };
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  document.oncontextmenu = function () { return false; }
  // models
  let trange = 100;
  models = [];
  for (let i = 0; i < 100; i++) {
    models.push(
      {
        position: createVector((random() * 2 - 1) * trange, (random() * 2 - 1) * trange, (random() * 2 - 1) * trange),
        size: random() * 25 + 8,
        color: color(random(), random(), random())
      }
    );
  }
  // light
  point_light = {};
  // gui
  modelsDisplayed = createSlider(1, models.length, int(models.length / 4), 1);
  modelsDisplayed.position(10, 10);
  modelsDisplayed.style('width', '80px');
  ambient = createSlider(0, 1, 0.2, 0.05);
  ambient.position(420, 10);
  ambient.style('width', '80px');
  ambient.input(() => { lightShader.setUniform('ambient', ambient.value()) });
  shader(lightShader);
  lightShader.setUniform('ambient', ambient.value());
  lightPath = createSelect();
  lightPath.position(10, 40);
  //lightPath.option('0');
  lightPath.option('1');
  lightPath.option('2');
  lightPath.option('3');
  lightPath.selected('1');
}

function draw() {
  background(0);
  let pointLight = updatePointLight();
  resetShader();
  push();
  stroke('green');
  axes();
  grid();
  pop();
  push();
  translate(pointLight.position);
  noStroke();
  //fill(point_light.color);
  fill('white');
  sphere(3);
  pop();
  shader(lightShader);
  lightShader.setUniform('uLightPosition', treeLocation(pointLight.position, { from: Tree.WORLD, to: Tree.EYE }).array());
  for (let i = 0; i < modelsDisplayed.value(); i++) {
    push();
    noStroke();
    fill(models[i].color);
    translate(models[i].position);
    let radius = models[i].size / 2;
    i % 3 === 0 ? box(radius * 2) : i % 3 === 1 ? sphere(radius) : torus(radius, radius / 4);
    pop();
  }
}

function updatePointLight() {
  //if (lightPath.value() === '0') return;
  let angle = frameCount * 0.03;
  let rad = 30;
  let px = cos(angle) * rad;
  let py = sin(angle) * rad;
  let r = (sin(angle) * 0.5 + 0.5);
  let g = (sin(angle * 0.5 + PI / 2) * 0.5 + 0.5);
  let b = (sin(frameCount * 0.02) * 0.5 + 0.5);
  let pz = sin(frameCount * 0.02);
  return {
    position: lightPath.value() === '1' ? createVector(px, py, 0) : lightPath.value() === '2' ?
      createVector(50, 50, pz * 40) : createVector(-50, -50, -pz * 40),
    color: lightPath.value() === '1' ? color(1 - r, r / 2, r) : lightPath.value() === '2' ?
      color(r, 1, g) : color(1, r, g)
  };
}
{{< /p5-global-iframe >}}



## Conclusions


## References

* [Visual Computing - Lighting](https://visualcomputing.github.io/docs/shaders/lighting/)
* [p5.EasyCam - Random Boxes Examples](https://github.com/freshfork/p5.EasyCam/blob/master/examples/RandomBoxes/RandomBoxes.js)