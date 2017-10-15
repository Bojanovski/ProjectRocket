
class GameState_Gameplay extends GameState {

	constructor(gsm, seed) {
		super(gsm);

		this.seed = seed;
		print("seed " + this.seed);

		this.physicsEngine = new PhysicsEngine();
		this.shipManager = new ShipManager();
		this.geneticAlgorithm = new GeneticAlgorithm();
		this.ships = [];
	}

	startSimulation() {

		// build level
		this.level = new Level(this.seed);

		// get training genome batch
		var trainingGenomeBatch = this.geneticAlgorithm.getTrainingBatch();

		// spawn ships
		this.ships = [];
		for (var i = 0; i < trainingGenomeBatch.length; i++) {
			var ship = _.cloneDeep(this.geneticAlgorithm.shipPrototype);
			ship.initiate(trainingGenomeBatch[i], this.physicsEngine);
			this.ships.push(ship);
		}

		// Create static colliders for rocks
		for (var i = 0; i < this.level.rocks.length; i++) {
			var rock = this.level.rocks[i];
			this.physicsEngine.staticColliders.push(new StaticCollider(rock.points[0], rock.points[1], rock.points[2], rock.points[3]));
		}
	}

	initiate() {
		
		// get ship prototype
		var shipPrototype = this.shipManager.defaultShip;

		// populate genetic algorithm
		this.geneticAlgorithm.populate(this.seed, shipPrototype, 10);

		// first simulation start
		this.startSimulation();
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
			this.ships[i].update(deltaTime, this.level.rocks);
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
