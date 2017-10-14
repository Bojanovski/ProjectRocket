function designClicked(){
	gsm.popState();
	gsm.pushState(gsDesigner);
}

function playClicked(){
	gsm.popState();
	gsm.pushState(gsGameplay);
}

class GameState_MainMenu extends GameState {

	constructor(gsm) {
		super(gsm);
	}

	initiate() {
		this.designButton = createButton('DESIGN');
		this.designButton.position(width/2.0, height/2.0 - 40);
		this.designButton.mousePressed(designClicked);

		this.playButton = createButton('PLAY');
		this.playButton.position(width/2.0, height/2.0);
		this.playButton.mousePressed(playClicked);
	}

	deinitiate() {
		this.designButton.remove();
		this.playButton.remove();
	}

	update(deltaTime) {

	}

	display() {
	}

	print() {
		return '(GameState_MainMenu)';
	}

}
