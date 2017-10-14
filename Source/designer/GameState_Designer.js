
function designerDoneClicked(){
	gsm.popState();
}

class GameState_Designer extends GameState {

	constructor(gsm) {
		super(gsm);
		this.shipSettings = new ShipSettings();
		this.shipName = "Designed Ship";
	}

	initiate() {
		this.button = createButton('DONE');
		this.button.position(width/2.0, 100);
		this.button.mousePressed(designerDoneClicked);
	}

	deinitiate() {
		this.button.remove();
	}

	update(deltaTime) {
	}

	display() {
		var ship = new Ship(this.shipName, 0.0, 0.0, this.shipSettings);
		this.shipSettings.layout = [[0,0], [0,0,0,0,0], [0,0,0]];
		ship.generateFromSettings(this.shipSettings);
		ship.display();
	}

	print() {
		return '(Base)';
	}
}
