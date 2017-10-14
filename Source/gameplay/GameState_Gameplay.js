
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
			this.physicsEngine.staticColliders.push(new StaticCollider(rock.points[0], rock.points[1], rock.points[2], rock.points[3]));
		}

		// Create a particle for every node in the ship.
		if (this.ship.nodes !== undefined) {
			for (var i = 0; i < this.ship.nodes.length; i++) {

				var node = this.ship.nodes[i];
				var posX = node.x;
				var posY = node.y;
				var newParticle = new Particle(posX, posY, node.r);
				this.physicsEngine.particles.push(newParticle);
				this.ship.particleNodeMap[node.id] = newParticle;

				if (node.isThruster()) { // ship needs to apply forces to thrusters (the actual thrust).
					this.ship.thrusterParticles[node.id] = newParticle;
				}
			}
		}
	}

	deinitiate() {
	}

	update(deltaTime) {
		
		// Update the particles.
		this.physicsEngine.update(deltaTime);

		// call ship update
		this.ship.update(deltaTime);
	}

	display() {
		this.level.display();
		this.ship.display();
	}

	print() {
		return '(Base)';
	}
}
