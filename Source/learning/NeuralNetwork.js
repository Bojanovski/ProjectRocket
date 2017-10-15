// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class NeuralNetwork {

	constructor() {
    this.neurons = [];
	}

	step() {
    // calculate values
    for (var i = 0; i < this.neurons.length; i++) {
      this.neurons[i].calculateValue();
    }
    // update outputs
    for (var i = 0; i < this.neurons.length; i++) {
      this.neurons[i].updateOutput();
    }
	}

	getGenome() {
		var genome = new Genome();
    for (var i = 0; i < this.neurons.length; i++) {
			var bias = this.neurons[i].bias;
			var weights = [];
			for (var wi = 0; wi < this.neurons[i].inputs.length; wi++) {
				weights.push(this.neurons[i].inputs[wi][1]);
			}
			genome.neurons.push([bias, weights]);
		}
		return genome;
	}

	setGenome(genome) {
    for (var i = 0; i < this.neurons.length && i < genome.neurons.length; i++) {
			if (this.neurons[i] !== undefined && genome.neurons[i] !== undefined) {
				this.neurons[i].bias = genome.neurons[i][0];
				for (var wi = 0; wi < this.neurons[i].inputs.length && wi < genome.neurons[i][1].length; wi++) {
					this.neurons[i].inputs[wi][1] = genome.neurons[i][1][wi];
				}
			}
		}
	}

	printValues() {
		var message = "";
		for (var i = 0; i < this.neurons.length; i++) {
			message += this.neurons[i].value + " ";
		}
		print(message);
	}

}
