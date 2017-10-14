class Ship {

	constructor(name, x, y) {
		// basic fields
		this.name = name;
		this.x = x;
		this.y = y;

		// physics fields
		this.thrusterParticles = {};
		this.particleNodeMap = {};

		// setup neural network
		this.setupNeuralNetwork();

		// generate default ship layout
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
						// add a neuron-node map record
						this.neuronNodeMap[node.id] = neuron;
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

		// randomize genome
		var genome = this.neuralNetwork.getGenome();
		genome.randomize();
		this.neuralNetwork.setGenome(genome);
	}

	setupNeuralNetwork() {
		// setup neural network
		this.neuralNetwork = new NeuralNetwork();
		this.neuronNodeMap = {};
	}

	setInputsForNeuralNetwork() {
		for (var ni = 0; ni < this.nodes.length; ni++) {
			if (this.nodes[ni].isSensor()) {
				this.neuronNodeMap[this.nodes[ni].id].value = this.nodes[ni].value;
				this.neuronNodeMap[this.nodes[ni].id].output = this.nodes[ni].value;
			}
		}
	}

	getOutputsFromNeuralNetwork() {
		for (var ni = 0; ni < this.nodes.length; ni++) {
			if (this.nodes[ni].isThruster()) {
				this.nodes[ni].value = this.neuronNodeMap[this.nodes[ni].id].value;
			}
		}
	}

	update(deltaTime) {

		// neural net step
		this.setInputsForNeuralNetwork();
		this.neuralNetwork.step();
		this.getOutputsFromNeuralNetwork();

		// Generate particle forces.
		if (this.links !== undefined) {
			for (var i = 0; i < this.links.length; i++) {
				var restingLength = this.links[i].restingLength;
				var node1 = this.links[i].nodes[0];
				var node2 = this.links[i].nodes[1];
				var particle1 = this.particleNodeMap[node1.id];
				var particle2 = this.particleNodeMap[node2.id];
				applyHookeLaw(particle1, particle2, restingLength);
			}
		}
		
		// temp testing code
		var node = this.nodes[0];
		var particle = this.particleNodeMap[node.id];
		if (keyIsDown(UP_ARROW))
			particle.addForce(createVector(0, -200));

		// Set the nodes of the ship to be at respective particle positions.
		if (this.nodes !== undefined) {
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				var particle = this.particleNodeMap[node.id];
				node.x = particle.pos.x;
				node.y = particle.pos.y;
			}
		}
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
