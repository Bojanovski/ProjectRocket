
var gGSM;

function setup() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  
  createCanvas(500, 500);
  frameRate(15);
  stroke(255);
  strokeWeight(10);
  
  gGSM = new GameStateManager();
  var gs = new GameState_MainMenu();
  gGSM.pushState(gs);
}

function draw() {
  background(0);
  
  gGSM.tick(1/15);
  
  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
  point(xFruit, yFruit);
}
