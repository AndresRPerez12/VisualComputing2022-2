# Excercise 2

{{< hint info >}}
**Excercise 1**  
Let rgb1 and rgb2 be two rgb colors. What would rgb1 * rgb2 mean?
{{< /hint >}}

## Problem statement
Color may be specified through the use of 3 channels, namely : Red, Green and Blue. Given this archetype for defining colors in a quantitative manner, what would color multiplication mean?

## Background
The magnitude of each selected channel is, normaly, standardized as a number between 0 and 255. However, these values can easily be normalized between 0 to 1. 

Color multiplication can be defined as the color component-wise multiplication for each channel. Meaning, if we had pure yellow: RGB(255,255,0) and cyan blue: (0,255,255) we would first normalize them to (1,1,0) and (0,1,1) respectively; followed by their multiplication: 1\*0 for red, 1\*1 for green, and 0\*1 for blue. The result would then be pure green color (0,1,0) or, equivalently: RGB(0,255,0)

Color multiplication will, as a rule of thumb, yield a darker color than the two colors being multiplied. This is due to the fact two numbers from 0 to 1 are being multiplied per channel, the result per channel will always be less than or equal to the largest component.

<img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Color_Multiplication.png" alt="color multiplication examples" style="width: 50%;"/>


Color multiplication can be used to turn greyscale images to equivalent unicolorized images. In the example underneath, the greyscale portrait of a house determines the magnitude of the red channel in every pixel.

<img src="http://www.laurenscorijn.com/wp-content/uploads/2009/08/colorizemultiply.jpg" alt="colorized greyscale" style="padding: 10px; width: 80%;"/>


## Code (solution) & results

{{< details title="p5-global-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-global-iframe id="breath" width="410" height="450" >}}
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


{{< p5-global-iframe id="breath" width="410" height="450" >}}
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


## Conclusions
Color multiplication is rather easy to define and implement, past this first convenient consensus, its utility is rather limited. In developed frameworks such as canva or p5, it has already been integrated as one of many possible blendmodes, however, its popularity suffers mainly because its heavy darkening effect for most colors than may happen to overlap. 