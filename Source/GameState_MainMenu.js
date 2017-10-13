
function newGameClicked(){
	  print('ajajaj ');
  }

class GameState_MainMenu extends GameState {
	
  constructor(gsm) {
	  super(gsm);
	  
	  //this.input = createInput();
	  //this.input.position(20, 65);
	  
	  this.button = createButton('submit');
	  this.button.position(10, 65);
	  this.button.mousePressed(newGameClicked);

	  //greeting = createElement('h2', 'what is your name?');
	  //greeting.position(20, 5);

	  //textAlign(CENTER);
	  //textSize(50);
  }
  
  update(deltaTime) {
	  
  }
  
  draw() {
  }
  
  print() {
	  return '(GameState_MainMenu)';
  }

}
