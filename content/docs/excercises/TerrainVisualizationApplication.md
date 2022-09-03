# Excercise 2

{{< hint info >}}
**Excercise 2**  
Develop a terrain visualization application.
{{< /hint >}}

## Problem statement

Develop an application that allows visualizing terrain with Perlin noise

## Background

**Perling Noise:** According to wikipedia, Perlin Noise is a mathematical function that uses interpolation between a large number of precalculated vector gradients that construct a value that varies pseudo-randomly in space or time. It resembles white noise, and is frequently used in computer-generated images to simulate variability in all kinds of phenomena, thus approaching a more natural appearance. [Wikipedia] (https://en.wikipedia.org/wiki/Perlin_noise)

**Mach band:** Mach Bands is an optical illusion that exaggerates the contrast between edges of nearby grayscale bands. [Wikipedia] (https://en.wikipedia.org/wiki/Mach_bands)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Bandes_de_mach.PNG/330px-Bandes_de_mach.PNG" alt="Mach Band" style="width: 50%;"/>

## Code (solution) & results

### Terrain Visualization Application
{{< details title="Terrain Visualization Application" open=false >}}
{{< highlight javascript >}}
// Source code https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html
// Modified 

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

let fSlider
let strokeCheckbox

var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  fSlider = createSlider(0,0.02, 0.005, 0.005)
  fSlider.position(10, 10);
  fSlider.style('width', '80px');
  strokeCheckbox = createCheckbox('stroke', false);
  strokeCheckbox.position(10, 30);
}

function draw() {

  flying -= fSlider.value();
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  if(strokeCheckbox.checked()) {
    noStroke()
  } else {
    stroke(200)
  }
  
  background(0,0,200);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 120);

  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
{{< /highlight >}}
{{< /details >}}


{{< p5-global-iframe id="breath" width="625" height="400" >}}
// Source code https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html
// Modified 

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

let fSlider
let strokeCheckbox

var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  fSlider = createSlider(0,0.02, 0.005, 0.005)
  fSlider.position(10, 10);
  fSlider.style('width', '80px');
  strokeCheckbox = createCheckbox('stroke', false);
  strokeCheckbox.position(10, 30);
}

function draw() {

  flying -= fSlider.value();
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  if(strokeCheckbox.checked()) {
    noStroke()
  } else {
    stroke(200)
  }
  
  background(0,0,200);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 120);

  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
{{< /p5-global-iframe >}}

{{< details title="Mach Bands" open=false >}}
{{< highlight javascript >}}
// Original code: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/MachBands.js
// Modified
var height = 70;

function setup() {
  createCanvas(400, 280);
  smooth();  
}

function draw() {
  background(255);         
  if( height < 35 )
    height = 35;
  if( height > 70 )
    height = 70;
  noStroke();        
  fill(60,60,60);
  rect(0,0,400,height);
  fill(80,80,80);
  rect(0,70,400,height);
  fill(120,120,120);
  rect(0,140,400,height);
  fill(150,150,150);
  rect(0,210,400,height);
  fill(180,180,180);
}

function mouseClicked() {        
  if(height == 70) {
    height -= 30;
  } else {
    height += 30
  }  
};
{{< /highlight >}}
{{< /details >}}


{{< p5-global-iframe id="breath" width="420" height="310" >}}
var height = 70;

function setup() {
  createCanvas(400, 280);
  smooth();  
}

function draw() {
  background(255);         
  if( height < 35 )
    height = 35;
  if( height > 70 )
    height = 70;
  noStroke();        
  fill(60,60,60);
  rect(0,0,400,height);
  fill(80,80,80);
  rect(0,70,400,height);
  fill(120,120,120);
  rect(0,140,400,height);
  fill(150,150,150);
  rect(0,210,400,height);
  fill(180,180,180);
}

function mouseClicked() {        
  if(height == 70) {
    height -= 30;
  } else {
    height += 30
  }  
};
{{< /p5-global-iframe >}}

## Conclusions & future work
Mach band is an interesting optical illusion that activates the edge detection of the eye.
Perlin noise is very useful for producing pseudorandomness resembling natural terrain.
For future work it is recommended to analyze the mach band in different shades of colors.