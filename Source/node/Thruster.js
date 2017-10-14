class Thruster extends Node {

	constructor(x, y, r) {
		super(x, y, r);
		this.value = 0.0;

		this.emitter = new ParticleEmitter();
		this.emitter.isActive = false;
		this.emitter.setup(30, createVector(0, 0), 30, 50, createVector(30, 30), createVector(1, 1), createVector(15, 15), createVector(2, 2), 0.7, color('#FF9400FF'), color('#6C3F0100'));

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
