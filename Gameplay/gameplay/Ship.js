class Ship {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	generateRandom() {
		this.nodes = [];
		this.nodes.push(new Node(0.0, 50.0));
		this.nodes.push(new Node(0.0, -50.0));
	}

	update() {
	}
	
	display() {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].display(this.x, this.y);
		}
	}	
}