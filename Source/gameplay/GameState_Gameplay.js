
class GameState_Gameplay extends GameState {

	constructor(gsm) {
		super(gsm);

		this.physicsEngine = new PhysicsEngine();
		this.shipManager = new ShipManager();
		this.level = new Level();
		this.ship = this.shipManager.defaultShip;
		this.particleNodeMap = {};
	}

	initiate() {
		this.ship = this.shipManager.defaultShip;

		// Create static colliders for rocks
		for (var i = 0; i < this.level.rocks.length; i++) {
			var rock = this.level.rocks[i];
			this.physicsEngine.staticColliders.push(new StaticCollider(rock[0], rock[1], rock[2], rock[3]));
		}

		// Create a particle for every node in the ship.
		if (this.ship.nodes !== undefined) {
			for (var i = 0; i < this.ship.nodes.length; i++) {

				var node = this.ship.nodes[i];
				var posX = node.x;
				var posY = node.y;
				var newParticle = new Particle(posX, posY, node.r);
				this.physicsEngine.particles.push(newParticle);
				this.particleNodeMap[node.id] = newParticle;
			}
		}
	}

	deinitiate() {
	}

	update(deltaTime) {

		// neural net step
		this.ship.neuralNetwork.step();
		var genome = this.ship.neuralNetwork.getGenome();
		this.ship.neuralNetwork.setGenome(genome);

		// Generate particle forces.
		if (this.ship.links !== undefined) {
			for (var i = 0; i < this.ship.links.length; i++) {
				var restingLength = this.ship.links[i].restingLength;
				var node1 = this.ship.links[i].nodes[0];
				var node2 = this.ship.links[i].nodes[1];
				var particle1 = this.particleNodeMap[node1.id];
				var particle2 = this.particleNodeMap[node2.id];
				applyHookeLaw(particle1, particle2, restingLength);
			}
		}

		// temp testing code
		var node = this.ship.nodes[0];
		var particle = this.particleNodeMap[node.id];
		if (keyIsDown(UP_ARROW))
			particle.addForce(createVector(0, -200));

		// Update the particles.
		this.physicsEngine.update(deltaTime);

		// Set the nodes of the ship to be at respective particle positions.
		if (this.ship.nodes !== undefined) {
			for (var i = 0; i < this.ship.nodes.length; i++) {
				var node = this.ship.nodes[i];
				var particle = this.particleNodeMap[node.id];
				node.x = particle.pos.x;
				node.y = particle.pos.y;
			}
		}
	}

	display() {

		// Draw rocks
		fill(127, 127, 127, 127);
		stroke(147, 147, 147);
		for (var i = 0; i < this.level.rocks.length; i++) {
			var rock = this.level.rocks[i];
			rect(rock[0], rock[1], rock[2], rock[3]);
		}

		this.ship.display();
	}

	print() {
		return '(Base)';
	}
}
