// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class Neuron {

	constructor() {
    this.inputs = []; // [neuron, weight]
    this.bias = 0.0;
    this.value = 0.5;
    this.output = 0.0;
	}

  calculateValue() {
    // add bias
    var h = this.bias;
    // add outputs multiplied by weights
    for (var i = 0; i < this.inputs.length; i++) {
        h += this.inputs[i][0].output * this.inputs[i][1];
    }
    // apply relux
    this.value = this.relu(h);
  }

  relu(h) {
    if (h <= 0.0) {
      return 0.0;
    }
    return h;
  }

  updateOutput() {
    this.output = this.value;
  }

}
