# Workshop: Masking

{{< hint info >}}
**Workshop 2**  
Implement an image processing web app supporting different image kernels.
{{< /hint >}}

## Problem statement
Implement an image processing web app supporting different [image kernels](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29) and supporting:

- [Image histogram](https://en.wikipedia.org/wiki/Image_histogram) visualization.
- Different [lightness](https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness) (coloring brightness) tools.

## Background

### Image Kernel
In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image.

### Image histogram
An image histogram is a type of histogram that acts as a graphical representation of the tonal distribution in a digital image. It plots the number of pixels for each tonal value. By looking at the histogram for a specific image a viewer will be able to judge the entire tonal distribution at a glance.

### Lightness
The simplest definition is just the arithmetic mean, i.e. average, of the three components, in the HSI model called intensity. This is simply the projection of a point onto the neutral axis—the vertical height of a point in our tilted cube. The advantage is that, together with Euclidean-distance calculations of hue and chroma, this representation preserves distances and angles from the geometry of the RGB cube.

## Code (solution) & results

### Utility functions

{{< details title="Generate histogram" open=false >}}
```js
const IMAGE_MAX_HEIGHT = 400;
const IMAGE_MAX_WIDTH = 400;

function getImageHeight(img){
  if(img.width <= img.height)
    return IMAGE_MAX_HEIGHT;
  return img.height * (1 - (img.width - IMAGE_MAX_WIDTH) / img.width);
}

function getImageWidth(img){
  if(img.height <= img.width)
    return IMAGE_MAX_WIDTH;
  return img.width * (1 - (img.height - IMAGE_MAX_HEIGHT) / img.height);
}

function generateHistogram(imageBuffer, isRGB, yPosition, start, end){
  let histBrightness = (new Array(256)).fill(0);
  let histR = (new Array(256)).fill(0);
  let histG = (new Array(256)).fill(0);
  let histB = (new Array(256)).fill(0);
  for (let i = start; i < end; i+=4) {
    let r = imageBuffer[i];
    let g = imageBuffer[i + 1];
    let b = imageBuffer[i + 2];
    histBrightness[r]++;
    histBrightness[g]++;
    histBrightness[b]++;
    histR[r]++;
    histG[g]++;
    histB[b]++;
  }
  
  let maxBrightness = 0;
  if (isRGB) {
    for (let i = 0; i < 256; i++) {
      if (maxBrightness < histR[i]) {
        maxBrightness = histR[i]
      } else if (maxBrightness < histG[i]) {
        maxBrightness = histG[i]
      } else if (maxBrightness < histB[i]) {
        maxBrightness = histB[i]
      }
    }
  } else {
    for (let i = 1; i < 256; i++) {
      if (maxBrightness < histBrightness[i]) {
        maxBrightness = histBrightness[i]
      }
    }
  }
  
  const guideHeight = 8;
  const startY = yPosition + 400;
  const dx = width / 256;
  const dy = 400 / maxBrightness;
  rect(0, yPosition, 400, 400);
  strokeWeight(dx);
    
  for (let i = 0; i < 256; i++) {
    let x = i * dx;
    if (!isRGB) {
      // Value
      stroke("#000000");
      line(x, startY, x, startY - histBrightness[i] * dy);
    } else {
      // Red
      stroke("rgba(220,0,0,0.5)");
      line(x, startY, x, startY - histR[i] * dy);
      // Green
      stroke("rgba(0,210,0,0.5)");
      line(x, startY, x, startY - histG[i] * dy);
      // Blue
      stroke("rgba(0,0,255,0.5)");
      line(x, startY, x, startY - histB[i] * dy);
    }
    // Guide
    stroke('rgb(' + i + ', ' + i + ', ' + i + ')');
    line(x, startY, x, startY + guideHeight);
  }
}
```
{{< /details >}}

{{< details title="Convolve" open=false >}}
```js
function applyLuma(yPosition){
  const w = 200;
  const xstart = 0;
  const ystart = 0;
  const xend = 400;
  const yend = 400;
  
  loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let pos = (x + y * 400) * 4
      
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + (y + yPosition)  * 400) * 4;
      pixels[loc] = 0;
      pixels[loc + 1] = 0;
      pixels[loc + 2] = 0;
      pixels[loc + 3] = (originalImage.pixels[pos] + originalImage.pixels[pos + 1] + originalImage.pixels[pos + 2]) / 3
    }
  }
  updatePixels();
}

function convolve(matrix, yPosition){
  const w = 200;
  const xstart = 0;
  const ystart = 0;
  const xend = 400;
  const yend = 400;
  
  loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let c = convolution(x, y, matrix, originalImage);
      
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + (y + yPosition)  * 400) * 4;
      pixels[loc] = red(c);
      pixels[loc + 1] = green(c);
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = alpha(c);
    }
  }
  updatePixels();
}

function convolution(x, y, matrix, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrix.length / 2);
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix.length; j++){
      
      // What pixel are we testing
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + img.width * yloc) * 4;

      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc, 0 , img.pixels.length - 1);

      // Calculate the convolution
      // retrieve RGB values
      rtotal += (img.pixels[loc]) * matrix[i][j];
      gtotal += (img.pixels[loc + 1]) * matrix[i][j];
      btotal += (img.pixels[loc + 2]) * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
{{< /details >}}

### P5.js

{{< details title="P5.js" open=false >}}
```js
let originalImage;
let histogramTypeSelect;
let kernelTypeSelect;

let convolutionCount = 0;

function preload() {
  originalImage = loadImage('https://cms-assets.tutsplus.com/uploads/users/1191/profiles/19701/profileImage/ngc2237_400.jpg');
}

let kernels = {
  "Sharpen" : [[0,-1,0],
               [-1,5,-1],
               [0,-1,0]],
  "Box blur" : [[1/9,1/9,1/9],
                [1/9,1/9,1/9],
                [1/9,1/9,1/9]],
  "Gaussian blur 3 × 3" : [[1/16,1/8,1/16],
                           [1/8,1/4,1/8],
                           [1/16,1/8,1/16]],
  "Gaussian blur 5 × 5" : [[1/256,4/256,6/256,4/256,1/256],
                           [4/256,16/256,1/256,16/256,4/256],
                           [6/256,24/256,36/256,24/256,6/256],
                           [4/256,16/256,1/256,16/256,4/256],
                           [1/256,4/256,6/256,4/256,1/256]],
  "Unsharp masking 5 × 5" : [[-1/256,-4/256,-6/256,-4/256,-1/256],
                             [-4/256,-16/256,-1/256,-16/256,-4/256],
                             [-6/256,-24/256,476/256,-24/256,-6/256],
                             [-4/256,-16/256,-1/256,-16/256,-4/256],
                             [-1/256,-4/256,-6/256,-4/256,-1/256]],
};

function setup() {
  createCanvas(400, 1800);
  
  histogramTypeSelect = createSelect();
  histogramTypeSelect.position(0, 30)
  histogramTypeSelect.option('Brightness histogram');
  histogramTypeSelect.option('RGB histogram'); 
  
  kernelTypeSelect = createSelect();
  kernelTypeSelect.position(0, 60)
  kernelTypeSelect.option('Sharpen'); 
  kernelTypeSelect.option('Box blur'); 
  kernelTypeSelect.option('Gaussian blur 3 × 3'); 
  kernelTypeSelect.option('Gaussian blur 5 × 5'); 
  kernelTypeSelect.option('Unsharp masking 5 × 5'); 
  
  originalImage.loadPixels();
  pixelDensity(1);
}

function draw() {
  background(255);
  if (originalImage) {
    stroke("#000000");
    rect(0, 100, getImageWidth(originalImage), getImageHeight(originalImage));
    
    const imageHeight = getImageHeight(originalImage);
    image(originalImage, 0, 100, getImageWidth(originalImage), imageHeight);
    
    const isRGBHistogram = histogramTypeSelect.value() === 'RGB histogram';
    
    generateHistogram(originalImage.pixels, isRGBHistogram, imageHeight + 100, 0, originalImage.pixels.length / 4)
    
    convolve(kernels[kernelTypeSelect.value()] ,imageHeight + 508)

    stroke("#000000");
    generateHistogram(pixels, isRGBHistogram, imageHeight + 908, (imageHeight + 508) * 400, (imageHeight + 909) * 400)

    applyLuma(imageHeight + 1316)
  }
}
```
{{< /details >}}


### Execution

{{< p5-global-iframe id="breath" width="500" height="2200" >}}
const IMAGE_MAX_HEIGHT = 400;
const IMAGE_MAX_WIDTH = 400;

function getImageHeight(img){
  if(img.width <= img.height)
    return IMAGE_MAX_HEIGHT;
  return img.height * (1 - (img.width - IMAGE_MAX_WIDTH) / img.width);
}

function getImageWidth(img){
  if(img.height <= img.width)
    return IMAGE_MAX_WIDTH;
  return img.width * (1 - (img.height - IMAGE_MAX_HEIGHT) / img.height);
}

function generateHistogram(imageBuffer, isRGB, yPosition, start, end){
  let histBrightness = (new Array(256)).fill(0);
  let histR = (new Array(256)).fill(0);
  let histG = (new Array(256)).fill(0);
  let histB = (new Array(256)).fill(0);
  for (let i = start; i < end; i+=4) {
    let r = imageBuffer[i];
    let g = imageBuffer[i + 1];
    let b = imageBuffer[i + 2];
    histBrightness[r]++;
    histBrightness[g]++;
    histBrightness[b]++;
    histR[r]++;
    histG[g]++;
    histB[b]++;
  }
  
  let maxBrightness = 0;
  if (isRGB) {
    for (let i = 0; i < 256; i++) {
      if (maxBrightness < histR[i]) {
        maxBrightness = histR[i]
      } else if (maxBrightness < histG[i]) {
        maxBrightness = histG[i]
      } else if (maxBrightness < histB[i]) {
        maxBrightness = histB[i]
      }
    }
  } else {
    for (let i = 1; i < 256; i++) {
      if (maxBrightness < histBrightness[i]) {
        maxBrightness = histBrightness[i]
      }
    }
  }
  
  const guideHeight = 8;
  const startY = yPosition + 400;
  const dx = width / 256;
  const dy = 400 / maxBrightness;
  rect(0, yPosition, 400, 400);
  strokeWeight(dx);
    
  for (let i = 0; i < 256; i++) {
    let x = i * dx;
    if (!isRGB) {
      // Value
      stroke("#000000");
      line(x, startY, x, startY - histBrightness[i] * dy);
    } else {
      // Red
      stroke("rgba(220,0,0,0.5)");
      line(x, startY, x, startY - histR[i] * dy);
      // Green
      stroke("rgba(0,210,0,0.5)");
      line(x, startY, x, startY - histG[i] * dy);
      // Blue
      stroke("rgba(0,0,255,0.5)");
      line(x, startY, x, startY - histB[i] * dy);
    }
    // Guide
    stroke('rgb(' + i + ', ' + i + ', ' + i + ')');
    line(x, startY, x, startY + guideHeight);
  }
}

function convolve(matrix, yPosition){
  convolutionCount++;
  const w = 200;
  const xstart = 0;
  const ystart = 0;
  const xend = 400;
  const yend = 400;
  
  loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let c = convolution(x, y, matrix, originalImage);
      
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + (y + yPosition)  * 400) * 4;
      pixels[loc] = red(c);
      pixels[loc + 1] = green(c);
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = lightnessSlider.value() * alpha(c) / 100;
    }
  }
  updatePixels();
}

function applyLuma(yPosition){
  const w = 200;
  const xstart = 0;
  const ystart = 0;
  const xend = 400;
  const yend = 400;
  
  loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let pos = (x + y * 400) * 4
      
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + (y + yPosition)  * 400) * 4;
      pixels[loc] = 0;
      pixels[loc + 1] = 0;
      pixels[loc + 2] = 0;
      pixels[loc + 3] = (originalImage.pixels[pos] + originalImage.pixels[pos + 1] + originalImage.pixels[pos + 2]) / 3
    }
  }
  updatePixels();
}

function convolution(x, y, matrix, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrix.length / 2);
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix.length; j++){
      
      // What pixel are we testing
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + img.width * yloc) * 4;

      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc, 0 , img.pixels.length - 1);

      // Calculate the convolution
      // retrieve RGB values
      rtotal += (img.pixels[loc]) * matrix[i][j];
      gtotal += (img.pixels[loc + 1]) * matrix[i][j];
      btotal += (img.pixels[loc + 2]) * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}

let originalImage;
let histogramTypeSelect;
let kernelTypeSelect;
let lightnessSlider;

let convolutionCount = 0;

function preload() {
  originalImage = loadImage('https://cms-assets.tutsplus.com/uploads/users/1191/profiles/19701/profileImage/ngc2237_400.jpg');
}

let kernels = {
  "Sharpen" : [[0,-1,0],
               [-1,5,-1],
               [0,-1,0]],
  "Box blur" : [[1/9,1/9,1/9],
                [1/9,1/9,1/9],
                [1/9,1/9,1/9]],
  "Gaussian blur 3 × 3" : [[1/16,1/8,1/16],
                           [1/8,1/4,1/8],
                           [1/16,1/8,1/16]],
  "Gaussian blur 5 × 5" : [[1/256,4/256,6/256,4/256,1/256],
                           [4/256,16/256,1/256,16/256,4/256],
                           [6/256,24/256,36/256,24/256,6/256],
                           [4/256,16/256,1/256,16/256,4/256],
                           [1/256,4/256,6/256,4/256,1/256]],
  "Unsharp masking 5 × 5" : [[-1/256,-4/256,-6/256,-4/256,-1/256],
                             [-4/256,-16/256,-1/256,-16/256,-4/256],
                             [-6/256,-24/256,476/256,-24/256,-6/256],
                             [-4/256,-16/256,-1/256,-16/256,-4/256],
                             [-1/256,-4/256,-6/256,-4/256,-1/256]],
};

function setup() {
  createCanvas(400, 2200);
  
  histogramTypeSelect = createSelect();
  histogramTypeSelect.position(0, 30)
  histogramTypeSelect.option('Brightness histogram');
  histogramTypeSelect.option('RGB histogram'); 
  
  kernelTypeSelect = createSelect();
  kernelTypeSelect.position(0, 60)
  kernelTypeSelect.option('Sharpen'); 
  kernelTypeSelect.option('Box blur'); 
  kernelTypeSelect.option('Gaussian blur 3 × 3'); 
  kernelTypeSelect.option('Gaussian blur 5 × 5'); 
  kernelTypeSelect.option('Unsharp masking 5 × 5'); 

  lightnessSlider = createSlider(0, 100, 100);
  lightnessSlider.position(200, 50)
  
  originalImage.loadPixels();
  pixelDensity(1);
}

function draw() {
  background(255);
  if (originalImage) {
    stroke("#000000");
    rect(0, 100, getImageWidth(originalImage), getImageHeight(originalImage));
    
    const imageHeight = getImageHeight(originalImage);
    image(originalImage, 0, 100, getImageWidth(originalImage), imageHeight);
    
    const isRGBHistogram = histogramTypeSelect.value() === 'RGB histogram';
    
    generateHistogram(originalImage.pixels, isRGBHistogram, imageHeight + 100, 0, originalImage.pixels.length / 4)
    
    convolve(kernels[kernelTypeSelect.value()] ,imageHeight + 508)

    stroke("#000000");
    generateHistogram(pixels, isRGBHistogram, imageHeight + 908, (imageHeight + 508) * 400, (imageHeight + 909) * 400)

    applyLuma(imageHeight + 1316)
  }
}
{{< /p5-global-iframe >}}

## Future work
- In the future we could experiment with more types of kernels and analyze the difference between histograms.
- We coudld implement more Lightness coversions and test with it.
- Additionally we could improve the user experiece and add the option to change the image.

## Conclusions
- The image histogram allows a general understanding of how the tonal distribution of an image varies when a kernel is applied to it.
- Image kernels are an interesting way to apply effects to an image, highlighting the properties that interest us through arrays.

## Sources

* [Convolution implementation on p5js](https://p5js.org/examples/image-convolution.html)
* [Image histogram implementation o js](https://codepen.io/aNNiMON/pen/OqjGVP)
* [Image histogram](https://en.wikipedia.org/wiki/Image_histogram)
* [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness)
* [Kernel (image processing)](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)