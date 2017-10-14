
var gsm;
var gsMainMenu;
var gsGameplay;
var gsDesigner;

var unit;

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(15);
  unit = windowHeight / 100;

  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  gsm = new GameStateManager();
  gsMainMenu = new GameState_MainMenu();
  gsGameplay = new GameState_Gameplay();
  gsDesigner = new GameState_Designer();
  //gsm.pushState(gsGameplay);
  //gsm.pushState(gsDesigner);
  gsm.pushState(gsMainMenu);
}

function draw() {
  background(random(30));
  gsm.tick(1/15);
}
