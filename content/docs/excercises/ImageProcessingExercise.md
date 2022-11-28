# Excercise - Image Processing

{{< hint info >}}
**Excercise**  
Implement an image / video processing app supporting different masks, and:
* A region-of-interest base tool to selectively apply a given mask.
* A magnifier tool
* Integrate luma
{{< /hint >}}

## Problem statement
Color may be specified through the use of 3 channels, namely : Red, Green and Blue. Given this archetype for defining colors in a quantitative manner, what would color multiplication mean?

## Background
The magnitude of each selected channel is, normaly, standardized as a number between 0 and 255. However, these values can easily be normalized between 0 to 1. 

## Code (solution) & results


{{< details title="p5-global-iframe markdown" open=false >}}
{{< highlight js >}}
let maskShader;
let img;
let vid;
let grey_scale;

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
  // Set up the checkboxes
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
  // Send mouse position in every frame
  maskShader.setUniform('mouse', [mouseX/width, mouseY/height]);
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

{{< p5-global-iframe lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="640" height="640" >}}
let maskShader;
let img;
let vid;
let grey_scale;

function preload() {
  maskShader = readShader('../../../shaders/mask.frag',
                        { varyings: Tree.texcoords2 });
  // Load image and video files
  img = loadImage('../../../media/image.jpg');
  vid = createVideo('../../../media/videoSquare.mp4');

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
  // Set up the checkboxes
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
  // Send mouse position in every frame
  maskShader.setUniform('mouse', [mouseX/width, mouseY/height]);
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