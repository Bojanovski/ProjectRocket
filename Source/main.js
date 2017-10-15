
var gsm;
var FPS = 60;
var timeMul = 4.0;

var unit;

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(FPS);
  unit = windowHeight / 100;

  gsm = new GameStateManager();
  //var gsFirst = new GameState_MainMenu(gsm);
  var gsFirst = new GameState_Gameplay(gsm,random(10000));
  //gsm.pushState(gsGameplay);
  //gsm.pushState(gsDesigner);
  gsm.pushState(gsFirst);
}

function draw() {
  background(10);
  gsm.tick(timeMul * 1.0 / FPS);
}
