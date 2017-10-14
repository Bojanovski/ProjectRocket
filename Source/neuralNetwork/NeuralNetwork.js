class NeuralNetwork {

	constructor() {
    this.neurons = [];
	}

	update() {
    // calculate values
    for (var i = 0; i < this.neurons.length; i++) {
      this.neurons[i].calculateValue();
    }
    // update outputs
    for (var i = 0; i < this.neurons.length; i++) {
      this.neurons[i].updateOutput();
    }
	}
  
}
