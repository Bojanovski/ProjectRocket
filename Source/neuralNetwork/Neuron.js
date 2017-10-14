class Neuron {

	constructor() {
    this.inputs = [];
    this.bias = 0.0;
    this.value = 0.0;
    this.output = 0.0;
	}

  calculateValue() {
    // add bias
    var h = this.bias;
    // add outputs multiplied by weights
    for (var i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i] !== undefined && this.inputs[0] !== undefined && this.inputs[1] !== undefined) {
        h += this.inputs[0].output * this.inputs[1];
      }
    }
    // apply relux
    this.value = relu(h);
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
