// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

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
	  	this.stack[i].display();
	  }
	}

	pushState(state) {

		// First deinitiate the state that is currently on top.
		if (this.stack.length > 0) this.stack[this.stack.length - 1].deinitiate();

		// Now initiate the new sate and put it on top.
		this.stack.push(state);
		print('GameStateManager: state ' + state.print() + ' pushed.');
		state.initiate();
	}

	popState() {
		// First deinitiate the state that is currently on top.
		this.stack[this.stack.length - 1].deinitiate();
		var state = this.stack.pop();
		print('GameStateManager: state ' + state.print() + ' poped.');

		// Now initiate the old sate that is now on top.
		this.stack[this.stack.length - 1].initiate();
	}
}
