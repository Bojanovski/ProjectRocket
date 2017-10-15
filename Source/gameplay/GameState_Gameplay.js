// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class GameState_Gameplay extends GameState {

	constructor(gsm, seed) {
		super(gsm);

		this.timeRunning = 0.0;
		this.seed = seed;
		print("seed " + this.seed);

		this.physicsEngine = new PhysicsEngine();
		this.shipManager = new ShipManager();
		this.geneticAlgorithm = new GeneticAlgorithm();
		this.ships = [];

		var scoreElem = createDiv('POWER');
		scoreElem.position(width/2 * 1.85, height/2 * 0.34);
		scoreElem.id = 'score';
		scoreElem.style('color', 'white');
	}

	initiate() {

		this.timeRunning = 0.0;

		// get ship prototype
		var shipPrototype = this.shipManager.defaultShip;

		// populate genetic algorithm
		this.geneticAlgorithm.populate(this.seed, shipPrototype, 50);

		// first simulation start
		this.startSimulation();
	}

	deinitiate() {
	}

	update(deltaTime) {
		this.timeRunning += deltaTime;
		// simulation update
		this.updateSimulation(deltaTime);
	}

	display() {

		// get center of the best ship
		var bestX = 0.0;
		var bestY = 0.0;
		for (var i = 0; i < this.ships.length; i++) {
			var currX = this.ships[i].nodes[0].x;
			var currY = this.ships[i].nodes[0].y;
			if (currY < bestY) {
				bestX = currX;
				bestY = currY;
			}
		}

		// follow the winner
		translate(width/2 - bestX, height/2 - bestY);

		// display level and ships
		this.level.display();
		for (var i = 0; i < this.ships.length; i++) {
			this.ships[i].display();
		}

		// Power bar
		fill(250);
		stroke(250);
		strokeWeight(3);
		rect(width/2 - 60.0 + bestX, -200.0 + bestY,
		
		width * 0.025, height * 0.5);
		
		//20, 450);

		fill(0);
		stroke(250);
		strokeWeight(3);
		rect(width/2 - 60.0 + bestX, -200.0 + bestY,
		width * 0.025, (this.simulationTimer / this.simulationDuration) * height * 0.5);
	}

	startSimulation() {

		this.timeRunning = 0.0;

		// simulation basics
		this.simulationTimer = 0.0;
		this.simulationDuration = 30.0;
		this.simulationStatus = "on";

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

	updateSimulation(deltaTime) {

		// check if playing
		if (this.simulationStatus == "on") {

			// check ending condition
			if (this.simulationTimer > this.simulationDuration) {

				// turn it off
				this.simulationStatus = "off";

				// evaluate and apply
				var results = this.evaluateSimulation();
				this.geneticAlgorithm.applySimulationResults(results);

				// repeat simulation
				this.startSimulation();
			}
			else {
				// update the level
				this.level.update(deltaTime);

				// Update the physics.
				this.physicsEngine.update(deltaTime);

				// Update ships
				for (var i = 0; i < this.ships.length; i++) {
					this.ships[i].update(deltaTime, this.level.rocks);
				}

				// progress timer
				this.simulationTimer += deltaTime;
			}
		}
	}

	evaluateSimulation() {
		// get current ship altitude
		var altitudes = [];
		for (var i = 0; i < this.ships.length; i++) {
			var centerOfMass = this.ships[i].centerOfMass();
			var altitude = centerOfMass.y;
			altitude *= -1.0;
			altitudes.push(altitude);
		}
		// return altitudes
		return altitudes;
	}

	print() {
		return '(Base)';
	}
}
