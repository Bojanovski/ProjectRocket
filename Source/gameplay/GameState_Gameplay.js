
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
				
				print(node.id);
			}
		}
		
		this.particleNodeMap['dsfsdf'] = 4;
		print(this.particleNodeMap);
	}

	deinitiate() {
	}

	update(deltaTime) {
		
		this.physicsEngine.update(deltaTime);
		
		// Create a particle for every node in the ship.
		if (this.ship.nodes !== undefined) {
			for (var i = 0; i < this.ship.nodes.length; i++) {
				
				var node = this.ship.nodes[i];
				var particle = this.particleNodeMap[node.id];
				node.x = particle.pos.x;
				node.y = particle.pos.y;
				
				//print(node);
				//alert();
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
