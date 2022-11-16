# Excercise: Mosaic

{{< hint info >}}
**Excercise**  
Implement a mosaic (or/and ascii art) visual application.
{{< /hint >}}

## Problem statement
Create an app that implements a mosaic or ascii art app.

## Background
In the field of photographic imaging, a photographic mosaic, also known under the term Photomosaic, is a picture (usually a photograph) that has been divided into (usually equal sized) tiled sections, each of which is replaced with another photograph that matches the target photo. [Reference](https://en.wikipedia.org/wiki/Photographic_mosaic)

ASCII art is a graphic design technique that uses computers for presentation and consists of pictures pieced together from the 95 printable (from a total of 128) characters defined by the ASCII Standard from 1963 and ASCII compliant character sets with proprietary extended characters (beyond the 128 characters of standard 7-bit ASCII).[Reference](https://en.wikipedia.org/wiki/ASCII_art)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Wikipedia_Logo_as_ASCII_Art.png/450px-Wikipedia_Logo_as_ASCII_Art.png" alt="banding illustration" style="width: 50%;"/>

## Code (solution) & results
TODO

{{< details title="Mosaic Visualization App Code" open=false >}}
```js
// Image to ASCII
// Adapted from: The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html

let density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let image1;
let selBg;
let bg = { bg: 0, color: 255}
let densityBtn;
let dStatus = true;

function preload() {
  image1 = loadImage('../../../media/chess48.jpg');
}

function setup() {
  createCanvas(400, 400); 
  selBg = createSelect();
  selBg.position(10,30);
  selBg.option('Dark');
  selBg.option('Light');
  selBg.option('Green');
  selBg.changed(selBgEvent);
  
  densityBtn = createButton('density');
  densityBtn.position(10, 5);
  densityBtn.mousePressed(changeDensity);
  
}

function changeDensity() {
  dStatus = !dStatus
  if (dStatus) {
    density = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft;:+=-,._ '
  } else {
    density = 'Ñ@#W$9876543210?!abc;:+=-,._ '
  }
}

function selBgEvent() {
  let opt = selBg.value();
  if (opt == 'Light') {
    bg.bg = 255;
    bg.color = 0; 
  } else if (opt == 'Dark') {
    bg.bg = 0;
    bg.color = 255; 
  } else {
    bg.bg = 0;
    bg.color = [0,255,0];  
  }
}

function draw() {
  background(bg.bg);
  image(image1, 350, 0);
  let w = width / image1.width;
  let h = height / image1.height;
  image1.loadPixels();
  for (let i = 0; i < image1.width; i++) {
    for (let j = 0; j < image1.height; j++) {
      const pixelIndex = (i + j * image1.width) * 4;
      const r = image1.pixels[pixelIndex + 0];
      const g = image1.pixels[pixelIndex + 1];
      const b = image1.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(bg.color)
      
      const len = density.length;
      const charIndex = floor(map(avg,0,255,len,0));    
      
      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);      
    }
  }
}
```
{{< /details >}}

{{< p5-global-iframe id="breath" width="450" height="450" >}}
// Image to ASCII
// Adapted from: The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html

let density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let image1;
let selBg;
let bg = { bg: 0, color: 255}
let densityBtn;
let dStatus = true;

function preload() {
  image1 = loadImage('../../../media/chess48.jpg');
}

function setup() {
  createCanvas(400, 400); 
  selBg = createSelect();
  selBg.position(10,30);
  selBg.option('Dark');
  selBg.option('Light');
  selBg.option('Green');
  selBg.changed(selBgEvent);
  
  densityBtn = createButton('density');
  densityBtn.position(10, 5);
  densityBtn.mousePressed(changeDensity);
  
}

function changeDensity() {
  dStatus = !dStatus
  if (dStatus) {
    density = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft;:+=-,._ '
  } else {
    density = 'Ñ@#W$9876543210?!abc;:+=-,._ '
  }
}

function selBgEvent() {
  let opt = selBg.value();
  if (opt == 'Light') {
    bg.bg = 255;
    bg.color = 0; 
  } else if (opt == 'Dark') {
    bg.bg = 0;
    bg.color = 255; 
  } else {
    bg.bg = 0;
    bg.color = [0,255,0];  
  }
}

function draw() {
  background(bg.bg);
  image(image1, 350, 0);
  let w = width / image1.width;
  let h = height / image1.height;
  image1.loadPixels();
  for (let i = 0; i < image1.width; i++) {
    for (let j = 0; j < image1.height; j++) {
      const pixelIndex = (i + j * image1.width) * 4;
      const r = image1.pixels[pixelIndex + 0];
      const g = image1.pixels[pixelIndex + 1];
      const b = image1.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(bg.color)
      
      const len = density.length;
      const charIndex = floor(map(avg,0,255,len,0));    
      
      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);      
    }
  }
}
{{< /p5-global-iframe >}}

## Conclusions
TODO