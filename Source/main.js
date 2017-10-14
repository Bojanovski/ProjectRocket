
var gsm;

function setup() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  createCanvas(500, 500);
  frameRate(15);

  gsm = new GameStateManager();
  var gsMainMenu = new GameState_MainMenu();
  var gsGameplay = new GameState_Gameplay();
  var gsDesigner = new GameState_Designer();
  //gsm.pushState(gsGameplay);
  gsm.pushState(gsDesigner);
}

function draw() {
  background(0);

  gsm.tick(1/15);

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
  point(xFruit, yFruit);
}
