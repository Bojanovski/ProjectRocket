
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
	  translate(width/2, height/2);
	  for (i = 0; i < this.stack.length; i++) {
	  	this.stack[i].display();
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