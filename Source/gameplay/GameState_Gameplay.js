class GameState_Gameplay extends GameState {

	constructor(gsm) {
		super(gsm);
		this.shipManager = new ShipManager();

		this.level = new Level();
		this.ship = this.shipManager.defaultShip;
	}

	initiate() {
		this.ship = this.shipManager.defaultShip;
	}

	deinitiate() {
	}

	update(deltaTime) {
	}

	display() {
		this.ship.display();
	}

	print() {
		return '(Base)';
	}
}
