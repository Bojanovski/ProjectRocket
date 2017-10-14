class Ship {

	constructor(name, x, y) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.neuralNetwork = new NeuralNetwork();
		this.generateDefault();
	}

	generateDefault() {
		var shipSettings = new ShipSettings();
		shipSettings.layout = [[1,1], [0,0,0], [2]];
		this.generateFromSettings(shipSettings);
	}

	generateFromSettings(shipSettings) {
		// clear previous nodes and links and neurons
		this.nodes = [];
		this.links = [];
		this.neuralNetwork.neurons = [];
		// iterate over layers, from the bottom
		if (shipSettings !== undefined && shipSettings.layout !== undefined) {
			for (var layerIndex = 0; layerIndex < shipSettings.layout.length; layerIndex++) {
				// iterate over nodes from the left
				if (shipSettings.layout[layerIndex] !== undefined) {
					for (var nodeIndexInLayer = 0; nodeIndexInLayer < shipSettings.layout[layerIndex].length; nodeIndexInLayer++) {
						// get parameters for node spawning
						var type = shipSettings.layout[layerIndex][nodeIndexInLayer];
						var x = shipSettings.horizontalDistance * (nodeIndexInLayer - shipSettings.layout[layerIndex].length / 2.0 + 0.5);
						var y = - shipSettings.verticalDistance * layerIndex;
						var r = shipSettings.nodeRadius;
						// spawn node
						var node;
						if (type == 0) node = new Cell(x, y, r);
						else if (type == 1) node = new Thruster(x, y, r);
						else if (type == 2) node = new Sensor(x, y, r);
						this.nodes.push(node);
						// add a neuron
						var neuron = new Neuron();
						this.neuralNetwork.neurons.push(neuron);
						// link to previous node with strut
						if (nodeIndexInLayer > 0) {
							var strut = new Strut([this.nodes[this.nodes.length - 2], this.nodes[this.nodes.length - 1]]);
							this.links.push(strut);
						}
						// link to previous layer with pipes
						if (layerIndex > 0) {
							for (var bottomNodeIndex = 0; bottomNodeIndex < shipSettings.layout[layerIndex - 1].length; bottomNodeIndex++) {
								var currentNodeContainerIndex = this.nodes.length - 1;
								var bottomNodeContainerIndex = this.nodes.length - bottomNodeIndex - nodeIndexInLayer - 2;
								// make a pipe
								var pipe = new Pipe([this.nodes[currentNodeContainerIndex], this.nodes[bottomNodeContainerIndex]]);
								this.links.push(pipe);
								// add a neural connection
								var connection = [this.neuralNetwork.neurons[currentNodeContainerIndex], 0.5];
								this.neuralNetwork.neurons[bottomNodeContainerIndex].inputs.push(connection);
							}
						}
					}
				}
			}
		}
	}

	setInputsForNeuralNetwork() {
	}

	getOutputsFromNeuralNetwork() {
	}

	update() {
	}

	display() {
		// display links
		if (this.links !== undefined) {
			for (var i = 0; i < this.links.length; i++) {
				this.links[i].display(this.x, this.y);
			}
		}
		// display nodes
		if (this.nodes !== undefined) {
			for (var i = 0; i < this.nodes.length; i++) {
				this.nodes[i].display(this.x, this.y);
			}
		}
		// print ship center point
		fill(0, 255, 0);
		ellipse(this.x, this.y, 10, 10);
	}
}
