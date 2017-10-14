class GameState_Gameplay extends GameState {

	constructor(gsm) {
		super(gsm);

		this.level = new Level();
		this.ship = new Ship("Default Ship", 0.0, 0.0);
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
