
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
		
		// Create a particle for every node in the ship.
		if (this.ship.nodes !== undefined) {
			for (var i = 0; i < this.ship.nodes.length; i++) {
				
				var node = this.ship.nodes[i];
				var posX = node.x;
				var posY = node.y;
				var newParticle = new Particle(posX, posY);
				this.physicsEngine.particles.push(newParticle);
				this.particleNodeMap[node.id] = newParticle;
			}
		}
	}

	deinitiate() {
	}

	update(deltaTime) {
		
		// Generate particle forces.
		if (this.ship.links !== undefined) {
			for (var i = 0; i < this.ship.links.length; i++) {
				var restingLength = this.ship.links[i].restingLength;
				var node1 = this.ship.links[i].nodes[0];
				var node2 = this.ship.links[i].nodes[1];
				var particle1 = this.particleNodeMap[node1.id];
				var particle2 = this.particleNodeMap[node2.id];
				var diff = p5.Vector.sub(particle1.pos, particle2.pos);
				var dist = p5.Vector.mag(diff);
				var forceMagnitude = (dist - restingLength) * elasticityCoefficient;
				var dir = diff;
				dir.normalize();
				var force = p5.Vector.mult(dir, forceMagnitude);				
				particle2.addForce(force);
				var forceNeg = p5.Vector.mult(force, -1.0);
				particle1.addForce(forceNeg);
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
		this.ship.display();
	}

	print() {
		return '(Base)';
	}
}
