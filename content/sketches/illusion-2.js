let checkbox;
var barsColor;

var start, speedSlider, direction;
const feetHeight = 25, feetWidth = 80;

function setup() {
  createCanvas(700, 300);
  start = 0;
  noStroke();
  // Checkbox to toggle the background.
  checkbox = createCheckbox('background', true);
  checkbox.changed(backgroundCheckbox);
  // Start with the bars being drawn.
  barsColor = color('black');
  direction = 1;
  // Slider for the feet speed.
  speedSlider = createSlider(0, 100, 25);
  speedSlider.position(10, height + 20);
  speedSlider.style('width', '80px');
}

function draw() {
  background(220);
  const number_of_bars = 40;
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
  // Update the position of the feet.
  var speed = speedSlider.value() / 100 * 2;
  // Update the direction if necessary.
  if( start + feetWidth + speed * direction > width || start + speed * direction < 0 )
    direction *= -1;
  start += speed * direction;
}

function backgroundCheckbox() {
  // If the chack box is active, draw the black bars.
  if (checkbox.checked()) {
    barsColor = color('black');
  } else {
    barsColor = color('white');
  }
}