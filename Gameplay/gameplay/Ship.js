class Ship {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	generateRandom() {
		this.nodes = [];
		this.links = [];

		this.nodes.push(new Node(0.0, 50.0));
		this.nodes.push(new Node(0.0, -50.0));
		this.links.push(new Link([this.nodes[0], this.nodes[1]]));
	}

	update() {
	}
	
	display() {

		// display links
		for (var i = 0; i < this.links.length; i++) {
			this.links[i].display(this.x, this.y);
		}

		// display nodes
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].display(this.x, this.y);
		}
	}	
}