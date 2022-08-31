# Excercise 2

{{< hint info >}}
**Excercise 1**  
Let rgb1 and rgb2 be two rgb colors. What would rgb1 * rgb2 mean?
{{< /hint >}}

## Problem statement
Color may be specified through the use of 3 channels, namely : Red, Green and Blue. The magnitude of each selected channel is, normaly, standardized as a number between 0 and 255. However, these values can easily be normalized between 0 to 1. 

Color multiplication can be defined as the color component-wise multiplication for each channel. Meaning, if we had pure yellow: RGB(255,255,0) and cyan blue: (0,255,255) we would first normalize them to (1,1,0) and (0,1,1) respectively; followed by their multiplication: 1*0 for red, 1*1 for green, and 0*1 for blue. The result woyld then be pure green color (0,1,0) or, equivalently: RGB(0,255,0) 

## Background
TODO: define background
## Code (solution) & results

### Terrain Visualization Application
{{< details title="p5-global-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-global-iframe id="breath" width="625" height="625" >}}
function setup() {
  createCanvas(400, 400);
  direction="left"
  colorPickerLeft = createColorPicker('yellow');
  colorPickerLeft.position(0, height);
  colorPickerLeft.style('width','200px');
  colorPickerRight = createColorPicker('rgb(0,255,255)');
  colorPickerRight.position(width/2, height);
  colorPickerRight.style('width','200px');
  
  speed = 1;
  start = 0;
}

function draw() {
  blendMode(BLEND)
  background('white');
  blendMode(MULTIPLY);
  fill(colorPickerLeft.color());
  square(start,150,100);
  if (direction == "right"){
    start += speed
    if(start>=width/2)
      direction = "left"
  }
  else if (direction == "left"){
    start -= speed
    if(start<=0)
      direction = "right"
  }
  fill(colorPickerRight.color())
  square(width-start-100,150,100);
}
{{< /p5-global-iframe */>}}
{{< /highlight >}}
{{< /details >}}


{{< p5-global-iframe id="breath" width="625" height="400" >}}
function setup() {
  createCanvas(400, 400);
  direction="left"
  colorPickerLeft = createColorPicker('yellow');
  colorPickerLeft.position(0, height);
  colorPickerLeft.style('width','200px');
  colorPickerRight = createColorPicker('rgb(0,255,255)');
  colorPickerRight.position(width/2, height);
  colorPickerRight.style('width','200px');
  
  speed = 1;
  start = 0;
}

function draw() {
  blendMode(BLEND)
  background('white');
  blendMode(MULTIPLY);
  fill(colorPickerLeft.color());
  square(start,150,100);
  if (direction == "right"){
    start += speed
    if(start>=width/2)
      direction = "left"
  }
  else if (direction == "left"){
    start -= speed
    if(start<=0)
      direction = "right"
  }
  fill(colorPickerRight.color())
  square(width-start-100,150,100);
}
{{< /p5-global-iframe >}}


## Conclusions & future work
TODO: define conclusions