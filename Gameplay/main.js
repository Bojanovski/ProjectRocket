
var gameplay = new Gameplay();

function setup() {
  createCanvas(500, 500);
  frameRate(15);
}

function draw() {
	background(random(25));
	gameplay.update();

	translate(width/2.0, height/2.0);
	gameplay.display();
}