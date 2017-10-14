
function designClicked(){
	var gsDesigner = new GameState_Designer(gsm);
	gsm.pushState(gsDesigner);
}

function playClicked(){
	var gsGameplay = new GameState_Gameplay(gsm, 666);
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

		this.emitter1 = new ParticleEmitter();
		this.emitter1.randomSize = true;
		this.emitter1.randomDirection = true;
		this.emitter1.setup(60, createVector(0, 0), 400, 600, createVector(30, 30), createVector(8, 8), createVector(2, 2), createVector(10, 10), 1, color('#FFFC3000'), color('#FFFC30FF'));

		this.emitter2 = new ParticleEmitter();
		this.emitter2.randomSize = false;
		this.emitter2.randomDirection = false;
		this.emitter2.setup(10, createVector(0, 0), 400, 600, createVector(0, 0), createVector(8, 8), createVector(2, 2), createVector(2000, 2000), 2, color('#5810C012'), color('#5810C000'));


	}

	deinitiate() {
		this.designButton.remove();
		this.playButton.remove();

		this.emitter1.isActive = false;
		this.emitter2.isActive = false;
	}

	update(deltaTime) {

		this.emitter1.update(deltaTime);
		this.emitter2.update(deltaTime);

	}

	display()
	{
		background(color('#12117D'));
		this.emitter1.draw();
		this.emitter2.draw();
	}

	print() {
		return '(GameState_MainMenu)';
	}

}
