class Thruster extends Node {

	constructor(x, y, r) {
		super(x, y, r);
		this.value = 0.0;
		
		this.emitter = new ParticleEmitter();
		this.emitter.setup(60, createVector(0, 0), 400, 600, createVector(30, 30), createVector(8, 8), createVector(2, 2), createVector(10, 10), 1, color('#FFFC3000'), color('#FFFC30FF'));		
	}

	update(deltaTime) {
		this.emitter.update(deltaTime);
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [255, 0, 0]);
		
		this.emitter.emit(true, createVector(this.x, this.y), createVector(0.0, 1.0));
		this.emitter.draw();
	}

	isThruster() { return true; }
}
