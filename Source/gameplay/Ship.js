
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
		shipSettings.layout = [[1,1], [0,0,0], [3,2,3]];
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
						else if (type == 2) node = new RotationSensor(x, y, r);
						else if (type == 3) node = new DistanceSensor(x, y, r);
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
								var connection = [neuron, 0.5];
								this.neuralNetwork.neurons[bottomNodeContainerIndex].inputs.push(connection);
							}
						}
					}
				}
			}
		}
	}

	initiate(genome, physicsEngine) {
		// set genome
		this.neuralNetwork.setGenome(genome);

		// Create a particle for every node in the ship.
		if (this.nodes !== undefined) {
				for (var i = 0; i < this.nodes.length; i++) {

				var node = this.nodes[i];
				var posX = node.x;
				var posY = node.y;
				var newParticle = new Particle(posX, posY, node.r);
				physicsEngine.particles.push(newParticle);
				this.particleNodeMap[node.id] = newParticle;

				if (node.isThruster()) { // ship needs to apply forces to thrusters (the actual thrust).
					this.thrusterParticles[node.id] = newParticle;
				}
			}
		}
	}

	setupNeuralNetwork() {
		// setup neural network
		this.neuralNetwork = new NeuralNetwork();
		this.neuronNodeMap = {};
	}

	setInputsForNeuralNetwork() {
		for (var ni = 0; ni < this.nodes.length; ni++) {
			if (this.nodes[ni].isRotationSensor()) {
				this.neuronNodeMap[this.nodes[ni].id].value = this.nodes[ni].signalValue;
				this.neuronNodeMap[this.nodes[ni].id].output = this.nodes[ni].signalValue;
			}
		}
	}

	update(deltaTime, listOfRocks) {

		// Calculate sensor data.
		var thrusterDir = createVector(0, -1);
		for (var ni = 0; ni < this.nodes.length; ni++) {
			if (this.nodes[ni].isRotationSensor()) {
				this.nodes[ni].updateDir(this.nodes);
				thrusterDir = this.nodes[ni].getDir();
			} else if (this.nodes[ni].isDistanceSensor()) {
				this.nodes[ni].updateDistance(listOfRocks);
			}
		}

		// Update the nodes
		for (var ni = 0; ni < this.nodes.length; ni++) {
			this.nodes[ni].update(deltaTime);
		}

		// neural net step
		this.setInputsForNeuralNetwork();
		this.neuralNetwork.step();

		// Apply thrust.
		for (var ni = 0; ni < this.nodes.length; ni++) {
			if (this.nodes[ni].isThruster()) {
				var particle = this.particleNodeMap[this.nodes[ni].id];
				var value = this.neuronNodeMap[this.nodes[ni].id].value;

				if (value > 0.0) {
					//value = 1.0;
					this.nodes[ni].thrusterDir = p5.Vector.mult(thrusterDir, -1.0);
					this.nodes[ni].thrusterOn = true;
					var forceVector = p5.Vector.mult(thrusterDir, 100.0 * value);
					particle.addForce(forceVector);
				}
				else{
					this.nodes[ni].thrusterOn = false;
				}
			}
		}

		// Generate particle forces.
		if (this.links !== undefined) {
			for (var i = 0; i < this.links.length; i++) {
				var restingLength = this.links[i].restingLength;
				var node1 = this.links[i].nodes[0];
				var node2 = this.links[i].nodes[1];
				var particle1 = this.particleNodeMap[node1.id];
				var particle2 = this.particleNodeMap[node2.id];
				applyHookeLaw(particle1, particle2, restingLength);
				applyDamping(particle1,  particle2);
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
	
	centerOfMass() {
		var center = createVector(0, 0);
		if (this.nodes !== undefined) {
			for (var i = 0; i < this.nodes.length; i++) {
				center = p5.Vector.add(center, createVector(this.nodes[i].x, this.nodes[i].y));
			}
			center = p5.Vector.mult(center, 1.0 / this.nodes.length);
		}
		return center;
	}
}
