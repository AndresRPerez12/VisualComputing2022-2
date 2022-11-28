# Excercises: Lighting 

## Background
Lighting aims at modelling light interactions on different material types to simulate both, photorealistic and non-photorealistic scenes. What the virtual camera sees in a scene is the result of light from a lightsource bouncing off an object and then going to the eye. To understand and emulate the interaction of light with the rendered objects, we must understand the diffenet kinds of illumination models.

### No Lighting (Emissive Lighting)

In this scenario, there are no light in the scene, and each object is self-luminous, since truly no lighting would be just a black scene. In this model, an object's color is not affected by anything else in the scene.

### Ambient Light

In this model, there is a non-directional light source such that light has been refleceted so many times from so many different surfaces that it appers to come equally from all directions. Therefore, its intensity is constant over all polygons and is not affected by anything in the world. It can be colored, such that the color of each object interacts with the color of the ambient light.

### Point Light

In this model, the lightsource is a point in space that gives off equal amounts of light in all directions. Polygons which are closer to the light appear brighter than those that are further away. The angle at which light from a point light source hits an object depends on the positions of both the object and the light source.

### Difuse Reflection

In a diffuse reflection model, light from a point source is reflected with equal intensity in all directions, and its intensity depends on the anglw between the normal vector of the surface and the light ray from the point light. Light reflect of dull surfaces.

### Specular Reflection

In a specular reflection model, light reflects of shiny surfaces in such a way that a highlight can be seen. The position of the eye or virtual camera is relevant since light bounces in a mirror-like fashion, in the same angle as it entered from the point light. If we take the angle in a discrete manner we can create a toon-like effect with discrete jumps in intensity.


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
{{< details title="Ambient light fragment shader" open=false >}}
```glsl
precision mediump float;

uniform float ambient;
uniform vec4 ambient4;
uniform vec4 uMaterialColor;

void main() {
  gl_FragColor = ambient * ambient4 * uMaterialColor;
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

{{< details title="Toon shading fragment shader" open=false >}}
```glsl
precision mediump float;

//uniform float ambient;
uniform vec4 ambient4;
uniform vec4 uMaterialColor;
uniform vec3 lightNormal;

varying vec3 normal3;

void main() {
  float intensity = max(0.0, dot(normalize(-lightNormal), normalize(normal3)));
  //float intensity = max(0.0, dot(direction3, normal3));
  float k = intensity > 0.95 ? 1.0 : intensity > 0.5 ? 0.6 : intensity > 0.25 ? 0.4 : 0.2;
  gl_FragColor = k * ambient4 * uMaterialColor;
  //gl_FragColor = (ambient + k) * ambient4 * uMaterialColor;
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
{{< details title="Specular reflection fragment shader" open=false >}}
```glsl
precision mediump float;

uniform float ambient;
uniform vec4 uMaterialColor;
uniform vec3 uLightPosition;

varying vec3 normal3;
varying vec4 position4;

void main() {
  vec3 direction3 = uLightPosition - position4.xyz;
  vec3 reflected3 = reflect(-direction3, normalize(normal3));
  vec3 camera3 = -position4.xyz;
  float specular = max(0.0, dot(normalize(reflected3), normalize(camera3)));
  gl_FragColor = (ambient + specular) * uMaterialColor;
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

The correct inclusion of light is one of the most important factors to make a scene, both photorealistic and non-photorealistic, seem more vivid, alive, and interactive. The inclusion of light in computer graphics isn't a one-size-fits-all approach. Different situations require the use of different lighting models to more adequately convey the environment we want to present. Understanding these models is key to presenting vivid and interesting scene to our users.

In terms of future work, analyzing and implementing different behaviors for light when it bounces on different materials would be a great step in creating immersive experiences. Creating a repository with all of their reflective characteristics under different lighting models would help build these kinds of applications faster and with a more consistent behavior all around. Furthermore, translucid materials present another challenge in our implementation of light, given that they modify the light as it goes through them. Modeling their behavior in such a way that it is reasonably simple to implemnent it for different lighting models would allow for mo complex worlds and scenarios to be developed.

## References

* [Visual Computing - Lighting](https://visualcomputing.github.io/docs/shaders/lighting/)
* [p5.EasyCam - Random Boxes Examples](https://github.com/freshfork/p5.EasyCam/blob/master/examples/RandomBoxes/RandomBoxes.js)
* [Lighting and Shading](https://www.cs.uic.edu/~jbell/CourseNotes/ComputerGraphics/LightingAndShading.html), University of Illinois, Chicago
* [Understanding Different Light Types](https://www.pluralsight.com/blog/film-games/understanding-different-light-types), Pluralsight