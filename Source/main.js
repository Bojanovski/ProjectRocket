
var gsm;
var FPS = 60;

var unit;

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(FPS);
  unit = windowHeight / 100;

  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  gsm = new GameStateManager();
  //var gsFirst = new GameState_MainMenu(gsm);
  var gsFirst = new GameState_Gameplay(gsm,777);
  //gsm.pushState(gsGameplay);
  //gsm.pushState(gsDesigner);
  gsm.pushState(gsFirst);
}

function draw() {
  background(10);
  gsm.tick(1/FPS);
}
