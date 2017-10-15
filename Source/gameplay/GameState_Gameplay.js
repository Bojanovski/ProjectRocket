
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
			ship.initiate(random(10000), this.physicsEngine);
			this.ships.push(ship);
		}

		// Create static colliders for rocks
		for (var i = 0; i < this.level.rocks.length; i++) {
			var rock = this.level.rocks[i];
			this.physicsEngine.staticColliders.push(new StaticCollider(rock.points[0], rock.points[1], rock.points[2], rock.points[3]));
		}
	}

	initiate() {
		this.startSimulation(this.shipManager.defaultShip, 10);
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
