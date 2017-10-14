class GameState_Designer extends GameState {

	constructor(gsm) {
		super(gsm);
		this.shipSettings = new ShipSettings();
		this.shipName = "Designed Ship";
	}

	update(deltaTime) {
	}

	display() {
		var ship = new Ship(this.shipName, 0.0, 0.0, this.shipSettings);
		this.shipSettings.layout = [[0,0,0], [0,0,0,0], [0,0]];
		ship.generateFromSettings(this.shipSettings);
		ship.display();
	}

	print() {
		return '(Base)';
	}
}
