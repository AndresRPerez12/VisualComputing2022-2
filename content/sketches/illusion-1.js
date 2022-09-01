var start, speed;

function setup() {
  createCanvas(400, 400);
  start = 0;
  // Slider that controls the truning speed.
  slider = createSlider(0, 120, 20);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  background(220);
  speed = slider.value();
  // Draw the three circular sections.
  fill('red');
  arc(200, 200, 100, 100, start, start + 2*PI/3);
  fill('green');
  arc(200, 200, 100, 100, start + 2*PI/3, start + 4*PI/3);
  fill('blue');
  arc(200, 200, 100, 100, start + 4*PI/3, start);
  // Update the start point to turn in the next frame.
  start += speed*PI/180;
}