var start, speed;
const feetHeight = 20, feetWidth = 50;

let checkbox;
var barsColor;

function setup() {
  createCanvas(600, 400);
  noStroke();
  start = 0;
  // Speed of the moving feet.
  speed = 0.5;
  // Checkbox to toggle the background.
  checkbox = createCheckbox('background', true);
  checkbox.changed(backgroundCheckbox);
  barsColor = color('black');
  const number_of_bars = 30;
}

function draw() {
  background(220);
  // Draw the bars using the color from the checkbox.
  for( var i = 0 ; i < number_of_bars ; i ++ ){
    if( i%2 == 0 ) fill(barsColor);
    else fill('white');
    var x = (width/number_of_bars) * i;
    rect(x, 0, width/number_of_bars, height);
  }
  // Draw the feet.
  fill('yellow');
  rect(start, 100, feetWidth, feetHeight);
  fill('blue');
  rect(start, 200, feetWidth, feetHeight);
  // Update the speed if necessary.
  if( start + feetWidth + speed > width || start + speed < 0 )
    speed *= -1;
  start += speed;
}

function backgroundCheckbox() {
  // If the chack box is active, draw the black bars.
  if (checkbox.checked()) {
    barsColor = color('black');
  } else {
    barsColor = color('white');
  }
}