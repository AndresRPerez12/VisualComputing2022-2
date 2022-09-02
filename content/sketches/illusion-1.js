var start, speed;
var color_1, color_2, color_3;

function setup() {
  createCanvas(400, 400);
  start = 0;
  // Slider that controls the truning speed.
  slider = createSlider(0, 120, 20);
  slider.position(10, 10);
  slider.style('width', '80px');
  // Color pickers for the three sections.
  color_1 = createColorPicker('red');
  color_1.position(width + 5, 5);
  color_2 = createColorPicker('green');
  color_2.position(width + 5, 35);
  color_3 = createColorPicker('blue');
  color_3.position(width + 5, 65);
}

function draw() {
  background(220);
  speed = slider.value();
  // Draw the three circular sections.
  fill(color_1.color());
  arc(200, 200, 100, 100, start, start + 2*PI/3);
  fill(color_2.color());
  arc(200, 200, 100, 100, start + 2*PI/3, start + 4*PI/3);
  fill(color_3.color());
  arc(200, 200, 100, 100, start + 4*PI/3, start);
  // Update the start point to turn in the next frame.
  start += speed*PI/180;
}