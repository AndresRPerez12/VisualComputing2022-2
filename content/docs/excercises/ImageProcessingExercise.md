# Excercise - Image Processing

{{< hint info >}}
**Excercise**  
Implement an image / video processing app supporting different masks, and:
* A region-of-interest base tool to selectively apply a given mask.
* A magnifier tool
* Integrate luma
{{< /hint >}}

## Problem statement
How can we apply different masks to a media source via shaders? Is it possible to add features like a region of interest, magnifier tool and luma?

## Background
Convolutions can be used as a general purpose filter effect that can be applied to an image or the frame of a video. It is defined as a matrix, that is used to determine the new value of each central pixel as a linear combination of its neighbors. In the case that the image has several channels, the operation is applied over each individual channel independently. This matrix is also known as a kernel.

One of the most common kernel sizes is 3x3. In this case, the central pixel value is calculated as a combination of itself, and the values of its 8 neighbors. Usually they are normalized by dividing by the total sum of the kernel, or by 1 if the sum is zero.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/2D_Convolution_Animation.gif/220px-2D_Convolution_Animation.gif" alt="Kernel example" style="width: 40%;"/>

A selection of important kernels were implemented with shaders for this exercise, including:

* Gaussian Blur

This effect reduces the amount of detail by blurring the image according to a gaussian function. Applying this kernel results in the same image as convolving the input with a Gaussian function. The formula for this functions in two dimensions is:

<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/6717136818f2166eba2db0cfc915d732add9c64f" alt="Gaussian function" style="width: 20%; background-color: white;"/>

The 3x3 kernel for this efect is:

| <!-- -->    | <!-- -->    | <!-- -->    |
|-------------|-------------|-------------|
| 1/16        | 2/16         | 1/16         |
| 2/16         | 4/16         | 2/16         |
| 1/16         | 2/16         | 1/16         |

* Sharpening

This effect accentuates the differences between the central pixel and its neighbors, resulting in a sharper, more vivid image.

The 3x3 kernel for this efect is:

| <!-- -->    | <!-- -->    | <!-- -->    |
|-------------|-------------|-------------|
| 0        | -1         | 0         |
| -1         | 5         | -1         |
| 0         | -1         | 0         |

* Edges (also know as ridges)

This effect highlights significant diffetences with the neighboring pixels, resulting in a pixel very similar to its surroundings turning black, and one very different to its surroundings wil be vrey bright. In the resulting image, the outline of the objects is highlighted.

The 3x3 kernel for this efect is:

| <!-- -->    | <!-- -->    | <!-- -->    |
|-------------|-------------|-------------|
| -1        | -1         | -1         |
| -1         | 8         | -1         |
| -1         | -1         | -1         |

* Emboss

This effect creates the illusion of depth by highlighting the diffence in pixels in a specific direction. For the standard kernel, this direction is taken from the top left to the bottom right.

The 3x3 kernel for this efect is:

| <!-- -->    | <!-- -->    | <!-- -->    |
|-------------|-------------|-------------|
| -2        | -1         | 0         |
| -1         | 1         | 1         |
| 0         | 1         | 2         |

### Addtional features

* Region of interest

A region of interest shader can be directly implemented in the fragment shader. This feature allows a user to define where the kernel should me applied by moving the mouse.

## Code (solution) & results

{{< details title="p5-global-iframe markdown" open=false >}}
{{< highlight js >}}
let maskShader;
let img;
let vid;
let video_checkbox;
let mask_checkbox;
let luma_checkbox;
let roi_checkbox;
let magnifier_checkbox;
let radius_slider;

function preload() {
  maskShader = readShader('/shaders/mask.frag',
                        { varyings: Tree.texcoords2 });
  // Load image and video files
  img = loadImage('/media/image.jpg');
  vid = createVideo('media/videoSquare.mp4',vidLoad);
}

function setup() {
  createCanvas(640, 640, WEBGL);
  noStroke();
  // Set up video and hide it HTML element
  vid.hide();
  vid.loop();
  // Set up the shader
  textureMode(NORMAL);
  shader(maskShader);
  // Set up the checkboxes and slider
  video_checkbox = createCheckbox('video', false);
  video_checkbox.position(10, 10);
  video_checkbox.style('color', 'white');
  video_checkbox.input(uniformUpdate);
  mask_checkbox = createCheckbox('mask', false);
  mask_checkbox.position(10, 30);
  mask_checkbox.style('color', 'white');
  mask_checkbox.input(uniformUpdate);
  luma_checkbox = createCheckbox('luma', false);
  luma_checkbox.position(10, 50);
  luma_checkbox.style('color', 'white');
  luma_checkbox.input(uniformUpdate);
  roi_checkbox = createCheckbox('Region of interest', false);
  roi_checkbox.position(10, 70);
  roi_checkbox.style('color', 'white');
  roi_checkbox.input(uniformUpdate);
  magnifier_checkbox = createCheckbox('Magnifier', false);
  magnifier_checkbox.position(10, 90);
  magnifier_checkbox.style('color', 'white');
  magnifier_checkbox.input(uniformUpdate);
  radius_slider = createSlider(0, 100, 20);
  radius_slider.position(10, 110);
  radius_slider.style('width', '80px');
  // Masl selector
  sel = createSelect();
  sel.position(500,10);
  sel.option('Gaussian blur');
  sel.option('Sharpening');
  sel.option('Edges');
  sel.option('Emboss');
  sel.input(uniformUpdate);
  // Initialize mask
  uniformUpdate();
  
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  // Send mouse position and radius in every frame
  maskShader.setUniform('mouse', [mouseX/width, mouseY/height]);
  maskShader.setUniform('actionRadius', radius_slider.value()/100.0);
}

function vidLoad() {
  // Play the video
  vid.loop();
  vid.volume(0);
}

function uniformUpdate(){
  // Media source
  if(video_checkbox.checked()){
    maskShader.setUniform('texture', vid);
    maskShader.setUniform('texOffset', [1 / vid.width, 1 / vid.height])
  }else{
    maskShader.setUniform('texture', img);
    maskShader.setUniform('texOffset', [1 / img.width, 1 / img.height])
  }
  // Mask application
  maskShader.setUniform('apply_mask',mask_checkbox.checked());
  // Luma application
  maskShader.setUniform('luma',luma_checkbox.checked());
  // Mask selection
  if( sel.value() == 'Gaussian blur' ){
    maskShader.setUniform('mask', [1.0/16.0,2.0/16.0,1.0/16.0, 2.0/16.0,4.0/16.0,2.0/16.0, 1.0/16.0,2.0/16.0,1.0/16.0]);
  }else if( sel.value() == 'Sharpening' ){
    maskShader.setUniform('mask', [0.0,-1.0,0.0, -1.0,5.0,-1.0, 0.0,-1.0,0.0]);
  }else if( sel.value() == 'Edges' ){
    maskShader.setUniform('mask', [-1.0,-1.0,-1.0, -1.0,8.0,-1.0, -1.0,-1.0,-1.0,]);
  }else if( sel.value() == 'Emboss' ){
    maskShader.setUniform('mask', [-2.0,-1.0,0.0, -1.0,1.0,1.0, 0.0,1.0,2.0]);
  }
  // Region of interest
  maskShader.setUniform('roi',roi_checkbox.checked());
  // Magnifier
  maskShader.setUniform('magnifier',magnifier_checkbox.checked());
}
{{< /highlight >}}
{{< /details >}}

{{< details title="mask.frag" open=false >}}
{{< highlight glsl >}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

uniform vec2 texOffset;
uniform vec2 mouse;

// holds the 3x3 kernel
uniform float mask[9];

uniform bool apply_mask;
uniform bool luma;
uniform bool roi;
uniform bool magnifier;

// Magnifier zoom
const float Zoom = 2.0;
// Radius for magnifier/region of interest
uniform float actionRadius;

float lumaFunction(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

vec4 magnifiedTexture(sampler2D currTexture, vec2 point){
  // Returns the color at the point after applying the maginifier operations if needed
  if(magnifier && distance(point,mouse) <= actionRadius){
    vec2 centerVector = point-mouse;
    centerVector = (1.0/Zoom) * centerVector;
    return texture2D(currTexture,mouse+centerVector);
  }
  return texture2D(currTexture,point);
}

void main() {
  if(apply_mask && (roi == false || distance(texcoords2,mouse) <= actionRadius)){
    // 1. Use offset to move along texture space.
    // In this case to find the texcoords of the texel neighbours.
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
    // origin (current fragment texcoords)
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    // 2. Sample texel neighbours within the rgba array
    vec4 rgba[9];
    rgba[0] = magnifiedTexture(texture, tc0);
    rgba[1] = magnifiedTexture(texture, tc1);
    rgba[2] = magnifiedTexture(texture, tc2);
    rgba[3] = magnifiedTexture(texture, tc3);
    rgba[4] = magnifiedTexture(texture, tc4);
    rgba[5] = magnifiedTexture(texture, tc5);
    rgba[6] = magnifiedTexture(texture, tc6);
    rgba[7] = magnifiedTexture(texture, tc7);
    rgba[8] = magnifiedTexture(texture, tc8);

    // 3. Apply convolution kernel
    vec4 convolution = vec4(0.0,0.0,0.0,0.0);
    for (int i = 0; i < 9; i++) {
      convolution += rgba[i]*mask[i];
    }

    gl_FragColor = convolution;
  }else{
    gl_FragColor = magnifiedTexture(texture, texcoords2);
  }
  // Apply Luma
  if(luma){
    gl_FragColor = vec4((vec3(lumaFunction(gl_FragColor.rgb))), 1.0);
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="680" height="680" >}}
let maskShader;
let img;
let vid;
let video_checkbox;
let mask_checkbox;
let luma_checkbox;
let roi_checkbox;
let magnifier_checkbox;
let radius_slider;

function preload() {
  maskShader = readShader('../../../shaders/mask.frag',
                        { varyings: Tree.texcoords2 });
  // Load image and video files
  img = loadImage('../../../media/image.jpg');
  vid = createVideo('../../../media/videoSquare.mp4',vidLoad);
}

function setup() {
  createCanvas(640, 640, WEBGL);
  noStroke();
  // Set up video and hide it HTML element
  vid.hide();
  vid.loop();
  // Set up the shader
  textureMode(NORMAL);
  shader(maskShader);
  // Set up the checkboxes and slider
  video_checkbox = createCheckbox('video', false);
  video_checkbox.position(10, 10);
  video_checkbox.style('color', 'white');
  video_checkbox.input(uniformUpdate);
  mask_checkbox = createCheckbox('mask', false);
  mask_checkbox.position(10, 30);
  mask_checkbox.style('color', 'white');
  mask_checkbox.input(uniformUpdate);
  luma_checkbox = createCheckbox('luma', false);
  luma_checkbox.position(10, 50);
  luma_checkbox.style('color', 'white');
  luma_checkbox.input(uniformUpdate);
  roi_checkbox = createCheckbox('Region of interest', false);
  roi_checkbox.position(10, 70);
  roi_checkbox.style('color', 'white');
  roi_checkbox.input(uniformUpdate);
  magnifier_checkbox = createCheckbox('Magnifier', false);
  magnifier_checkbox.position(10, 90);
  magnifier_checkbox.style('color', 'white');
  magnifier_checkbox.input(uniformUpdate);
  radius_slider = createSlider(0, 100, 20);
  radius_slider.position(10, 110);
  radius_slider.style('width', '80px');
  // Masl selector
  sel = createSelect();
  sel.position(500,10);
  sel.option('Gaussian blur');
  sel.option('Sharpening');
  sel.option('Edges');
  sel.option('Emboss');
  sel.input(uniformUpdate);
  // Initialize mask
  uniformUpdate();
  
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  // Send mouse position and radius in every frame
  maskShader.setUniform('mouse', [mouseX/width, mouseY/height]);
  maskShader.setUniform('actionRadius', radius_slider.value()/100.0);
}

function vidLoad() {
  // Play the video
  vid.loop();
  vid.volume(0);
}

function uniformUpdate(){
  // Media source
  if(video_checkbox.checked()){
    maskShader.setUniform('texture', vid);
    maskShader.setUniform('texOffset', [1 / vid.width, 1 / vid.height])
  }else{
    maskShader.setUniform('texture', img);
    maskShader.setUniform('texOffset', [1 / img.width, 1 / img.height])
  }
  // Mask application
  maskShader.setUniform('apply_mask',mask_checkbox.checked());
  // Luma application
  maskShader.setUniform('luma',luma_checkbox.checked());
  // Mask selection
  if( sel.value() == 'Gaussian blur' ){
    maskShader.setUniform('mask', [1.0/16.0,2.0/16.0,1.0/16.0, 2.0/16.0,4.0/16.0,2.0/16.0, 1.0/16.0,2.0/16.0,1.0/16.0]);
  }else if( sel.value() == 'Sharpening' ){
    maskShader.setUniform('mask', [0.0,-1.0,0.0, -1.0,5.0,-1.0, 0.0,-1.0,0.0]);
  }else if( sel.value() == 'Edges' ){
    maskShader.setUniform('mask', [-1.0,-1.0,-1.0, -1.0,8.0,-1.0, -1.0,-1.0,-1.0,]);
  }else if( sel.value() == 'Emboss' ){
    maskShader.setUniform('mask', [-2.0,-1.0,0.0, -1.0,1.0,1.0, 0.0,1.0,2.0]);
  }
  // Region of interest
  maskShader.setUniform('roi',roi_checkbox.checked());
  // Magnifier
  maskShader.setUniform('magnifier',magnifier_checkbox.checked());
}
{{< /p5-global-iframe >}}

## Conclusions
Color multiplication is rather easy to define and implement, past this first convenient consensus, its utility is rather limited. In developed frameworks such as canva or p5, it has already been integrated as one of many possible blendmodes, however, its popularity suffers mainly because its heavy darkening effect for most colors than may happen to overlap. 

## References
* [Convolution](https://www.songho.ca/dsp/convolution/convolution.html) by Song Ho Ahn
* [Image Convolution](https://web.pdx.edu/~jduh/courses/Archive/geog481w07/Students/Ludwig_ImageConvolution.pdf) by Jamie Ludwig, Portland State University
* [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur)
* [Image Kernels Explained Visually](https://setosa.io/ev/image-kernels/#:~:text=The%20sharpen%20kernel%20emphasizes%20differences,differences%20in%20adjacent%20pixel%20values.) by Victor Powell
* [Sample Magnifier ](https://www.shadertoy.com/view/mdfXzX) by valdis, Shadertoy
* [Female Hiker Walking With Backpack Through Tropical Rain Forest.](https://www.videezy.com/travel/50554-female-hiker-walking-with-backpack-through-tropical-rain-forest), Videezy