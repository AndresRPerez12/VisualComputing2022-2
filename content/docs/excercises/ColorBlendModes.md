# Excercise Color Blending with shaders 

{{< hint info >}}
**Excercise 1**  
Let rgb1 and rgb2 be two rgb colors. through the use of shaders, implement various color blendmodes.
{{< /hint >}}

## Problem statement
Color blendmodes compute particular ways in which superposition of colors may be approached. explain and show how some of them can be applied through the use of vertex shaders and fragment shaders.

## Background
Vertex shaders and fragment shaders based programming paradigm through glsl is a great alternative for this problem.Fragment shaders are one of the last steps in the rendering process and are executed in the GPU in parallelized manner.

<img src="data:image/png;base64,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" alt="shading process" style="width: 90%;"/>

Most blendmodes are comprised of pixel-wise computation given the 2 colors in question, Given the independence of the calculations, this enables the GPU procedures to be carried on without race condition worries.

In the following application two color may be picked out of the color palette, one of 6 blendmode chosen and the alpha slider set to demonstrate different possible combinations. Namely, the blendmodes implemented are:

* Addition: as the name implies, both rgb values are simply summed up, easy way to produce lighter colors
* Difference: Analog to addition, rgb values are substracted, most color combinations will result in darkesr shades.
* Mutiply: RGB values are normalized and multiplied, will most likely end up in dark results
* Screen: The inverse of each color is multiplied with one another, inverse defined as 1-rgb_component.
* Lightest: The lightest color is superposed.
* Darkest: The darker color is superposed 

## Code (solution) & results

{{< details title="App.js" open=false >}}
{{< highlight html >}}
{{</* p5-global-iframe id="breath" width="410" height="450" >}}
let colorShader;
let slider;

function preload() {
  colorShader = readShader('/VisualComputing2022-2/docs/excercises/color.frag',
                          { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  // Color pickers
  colorPickerA = createColorPicker('yellow');
  colorPickerA.position(5, 5);
  colorPickerB = createColorPicker('cyan');
  colorPickerB.position(80, 5);
  slider = createSlider(0, 255, 200);
  slider.position(160, 200);
  slider.style('width', '80px');
  sel = createSelect();
  sel.position(200, 10);
  sel.option('ADD');
  sel.option('DIFFERENCE');
  sel.option('MULTIPLY');
  sel.option('SCREEN');
  sel.option('LIGHTEST');
  sel.option('DARKEST');
}

function draw() {
  background(0);
  // Update the color variables in the shader
  updateShaderColors();
  // Draw the two regular rectangles
  resetShader();
  fill(colorPickerA.color());
  rect(-150, -150, 100, 100);
  fill(colorPickerB.color());
  rect(0, -150, 100, 100);
  // Draw with blend mode shader
  shader(colorShader);
  beginShape();
  vertex(-0.25, -0.75);
  vertex(-0.25, -0.25);
  vertex(0.25, -0.25);
  vertex(0.25, -0.75);
  endShape(CLOSE);
}

function updateShaderColors(){
    colorShader.setUniform('colorA', [ red(colorPickerA.color())/255,
                                        green(colorPickerA.color())/255,
                                        blue(colorPickerA.color())/255,
                                        alpha(colorPickerA.color())/255]);
    colorShader.setUniform('colorB', [  red(colorPickerB.color())/255,
                                        green(colorPickerB.color())/255,
                                        blue(colorPickerB.color())/255,
                                        alpha(colorPickerB.color())/255]);
    colorShader.setUniform('alphaValue', slider.value()/255.0);
    let item = 1;
    if( sel.value() == 'ADD' ) item = 1;
    else if( sel.value() == 'DIFFERENCE' ) item = 2;
    else if( sel.value() == 'MULTIPLY' ) item = 3;
    else if( sel.value() == 'SCREEN' ) item = 4;
    else if( sel.value() == 'LIGHTEST' ) item = 5;
    else if( sel.value() == 'DARKEST' ) item = 6;
    //print(item);
    colorShader.setUniform('blendMode', item);                                      
}
{{< /p5-global-iframe */>}}
{{< /highlight >}}
{{< /details >}}

{{< details title="color.frag" open=false >}}
{{< highlight html >}}
{{</* p5-global-iframe id="breath" width="410" height="450" >}}
precision mediump float;

uniform vec4 colorA;
uniform vec4 colorB;
uniform float alphaValue;
uniform int blendMode;

// interpolated color is emitted from the vertex shader
// where the variable is defined in the same exact way
// see your console!
varying vec4 color4;

float luminosity(vec4 color) {
  return (color.r + color.g + color.b)/3.0;
}

void main() {
  if( blendMode == 1 ){ // ADD
    gl_FragColor = (colorA + colorB) * alphaValue;
  }else if( blendMode == 2 ){ // DIFFERENCE
    gl_FragColor = (colorA - colorB) * alphaValue;
  }else if( blendMode == 3 ){ // MULTIPLY
    gl_FragColor = colorA * colorB * alphaValue;
  }else if( blendMode == 4 ){ // SCREEN
    gl_FragColor = (vec4((vec3(1.0) - colorA.rgb), colorA.a) * vec4((vec3(1.0) - colorB.rgb), colorB.a)) * alphaValue;
  }else if( blendMode == 5 ){ // LIGHTEST
    if( luminosity(colorA) >= luminosity(colorB) ) gl_FragColor = colorA * alphaValue;
    else gl_FragColor = colorB * alphaValue;
  }else if( blendMode == 6 ){ // DARKEST
    if( luminosity(colorA) <= luminosity(colorB) ) gl_FragColor = colorA * alphaValue;
    else gl_FragColor = colorB * alphaValue;
  }
}
{{< /p5-global-iframe */>}}
{{< /highlight >}}
{{< /details >}}


{{< p5-global-iframe lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420" >}}
let colorShader;
let slider;

function preload() {
  // The vertex shader defines how vertices are projected onto clip space.
  // Most of the times a projection and modelview matrix are needed for it:
  // https://visualcomputing.github.io/docs/shaders/programming_paradigm/
  // Here, however, we are going to:
  // 1. Define the triangle vertices directly in clip space, thus bypassing
  // both of these matrices (matrices: Tree.NONE). The p5 mandelbrot vertex
  // shader does just the same: https://p5js.org/reference/#/p5/loadShader
  // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
  // color data is defined in a per vertex basis with the p5 fill command.
  // Have a look at the generated vertex shader in the console!
  // readShader: https://github.com/VisualComputing/p5.treegl#handling
  colorShader = readShader('/VisualComputing2022-2/docs/excercises/color.frag',
                          { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  // Color pickers
  colorPickerA = createColorPicker('yellow');
  colorPickerA.position(5, 5);
  colorPickerB = createColorPicker('cyan');
  colorPickerB.position(80, 5);
  slider = createSlider(0, 255, 200);
  slider.position(160, 200);
  slider.style('width', '80px');
  sel = createSelect();
  sel.position(200, 10);
  sel.option('ADD');
  sel.option('DIFFERENCE');
  sel.option('MULTIPLY');
  sel.option('SCREEN');
  sel.option('LIGHTEST');
  sel.option('DARKEST');
}

function draw() {
  background(0);
  // Update the color variables in the shader
  updateShaderColors();
  // Draw the two regular rectangles
  resetShader();
  fill(colorPickerA.color());
  rect(-150, -150, 100, 100);
  fill(colorPickerB.color());
  rect(0, -150, 100, 100);
  // Draw with blend mode shader
  shader(colorShader);
  beginShape();
  vertex(-0.25, -0.75);
  vertex(-0.25, -0.25);
  vertex(0.25, -0.25);
  vertex(0.25, -0.75);
  endShape(CLOSE);
}

function updateShaderColors(){
    colorShader.setUniform('colorA', [ red(colorPickerA.color())/255,
                                        green(colorPickerA.color())/255,
                                        blue(colorPickerA.color())/255,
                                        alpha(colorPickerA.color())/255]);
    colorShader.setUniform('colorB', [  red(colorPickerB.color())/255,
                                        green(colorPickerB.color())/255,
                                        blue(colorPickerB.color())/255,
                                        alpha(colorPickerB.color())/255]);
    colorShader.setUniform('alphaValue', slider.value()/255.0);
    let item = 1;
    if( sel.value() == 'ADD' ) item = 1;
    else if( sel.value() == 'DIFFERENCE' ) item = 2;
    else if( sel.value() == 'MULTIPLY' ) item = 3;
    else if( sel.value() == 'SCREEN' ) item = 4;
    else if( sel.value() == 'LIGHTEST' ) item = 5;
    else if( sel.value() == 'DARKEST' ) item = 6;
    //print(item);
    colorShader.setUniform('blendMode', item);                                      
}
{{< /p5-global-iframe >}}


## Conclusions
There are a vast variety of color blendmodes, from simple ones like addition to more complex ones like screen blendmodes. Even these complex ones still are independent of vecinity or other possible dependences, this means each pixel can be always computed separately from the others. This important characteristic makes color shaders more than ideal to solve this kind of problems. 