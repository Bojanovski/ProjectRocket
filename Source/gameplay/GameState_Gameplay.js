
class GameState_Gameplay extends GameState {

	constructor(gsm, seed) {
		super(gsm);

		this.seed = seed;
		print("seed " + this.seed);

		this.physicsEngine = new PhysicsEngine();
		this.shipManager = new ShipManager();
		this.ships = [];
	}

	startSimulation(shipPrototype, numberOfShips) {

		// build level
		this.level = new Level(this.seed);

		// spawn ships
		this.ships = [];
		for (var i = 0; i < numberOfShips; i++) {
			var ship = _.cloneDeep(shipPrototype);
			ship.initiate(random(10000));
			this.ships.push(ship);
		}

		// Create static colliders for rocks
		for (var i = 0; i < this.level.rocks.length; i++) {
			var rock = this.level.rocks[i];
			this.physicsEngine.staticColliders.push(new StaticCollider(rock.points[0], rock.points[1], rock.points[2], rock.points[3]));
		}

		// Create a particle for every node in the ship.
		for (var i = 0; i < this.ships.length; i++) {
			if (this.ships[i] !== undefined && this.ships[i].nodes !== undefined) {
					for (var i = 0; i < this.ships[i].nodes.length; i++) {

					var node = this.ships[i].nodes[i];
					var posX = node.x;
					var posY = node.y;
					var newParticle = new Particle(posX, posY, node.r);
					this.physicsEngine.particles.push(newParticle);
					this.ships[i].particleNodeMap[node.id] = newParticle;

					if (node.isThruster()) { // ship needs to apply forces to thrusters (the actual thrust).
						this.ships[i].thrusterParticles[node.id] = newParticle;
					}
				}
			}
		}
	}

	initiate() {
		this.startSimulation(this.shipManager.defaultShip, 1);
	}

	deinitiate() {
	}

	update(deltaTime) {

		// update the level
		this.level.update(deltaTime);

		// Update the physics.
		this.physicsEngine.update(deltaTime);

		// Update the ship
		for (var i = 0; i < this.ships.length; i++) {
			this.ships[i].update(deltaTime);
		}
	}

	display() {
		this.level.display();

		for (var i = 0; i < this.ships.length; i++) {
			this.ships[i].display();
		}
	}

	print() {
		return '(Base)';
	}
}
