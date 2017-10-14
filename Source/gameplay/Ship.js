class Ship {

	constructor(name, x, y) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.generateDefault();
	}

	generateDefault() {
		var shipSettings = new ShipSettings();
		shipSettings.layout = [[0,0], [0,0,0], [0]];
		this.generateFromSettings(shipSettings);
	}

	generateFromSettings(shipSettings) {
		// clear previous nodes and links
		this.nodes = [];
		this.links = [];
		// iterate over layers, from the bottom
		if (shipSettings !== undefined && shipSettings.layout !== undefined) {
			for (var layerIndex = 0; layerIndex < shipSettings.layout.length; layerIndex++) {
				// iterate over nodes from the left
				if (shipSettings.layout[layerIndex] !== undefined) {
					for (var nodeIndexInLayer = 0; nodeIndexInLayer < shipSettings.layout[layerIndex].length; nodeIndexInLayer++) {
						// spawn node
						var x = shipSettings.horizontalDistance * (nodeIndexInLayer - shipSettings.layout[layerIndex].length / 2.0 + 0.5);
						var y = - shipSettings.verticalDistance * layerIndex;
						var node = new Node(x, y, shipSettings.nodeRadius);
						this.nodes.push(node);
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
								var pipe = new Pipe([this.nodes[currentNodeContainerIndex], this.nodes[bottomNodeContainerIndex]]);
								this.links.push(pipe);
							}
						}
					}
				}
			}
		}
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
