
class GameStateManager {
	
  constructor() {
	  this.stack = [];
	  print('GameStateManager: initialized.');
  }
  
  tick(deltaTime) {
	  
	  // First update
	  var i;
	  for (i = 0; i < this.stack.length; i++) {
		  this.stack[i].update(deltaTime);
	  }
	  
	  // Then draw
	  for (i = 0; i < this.stack.length; i++) {
		  this.stack[i].draw();
	  }	  
  }
  
  pushState(state) {
	  this.stack.push(state);
	  print('GameStateManager: state ' + state.print() + ' pushed.');
  }
  
  popState() {
	  var state = this.stack.pop();
	  print('GameStateManager: state ' + state.print() + ' poped.');
  }
  
}

class GameState {
	
  constructor(gsm) {
	  this.gsm = gsm;
  }
  
  update(deltaTime) {
  }
  
  draw() {
  }
  
  print() {
	  return '(Base)';
  }
  
}
