// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class Particle{

	constructor(x, y, radius) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.mass = 1.0;
		this.radius = radius;
		this.restitutionCoefficient = 0.01;
	}

	update(dt) {

		this.vel = p5.Vector.add(this.vel, p5.Vector.mult(this.acc, dt));
		this.pos = p5.Vector.add(this.pos, p5.Vector.mult(this.vel, dt));

		// Resets the acceleration accumulator
		this.acc.set(0, 9.81);
	}

	addForce(force) {
		var invMass = 1.0 / this.mass;
		this.acc = p5.Vector.add(this.acc, p5.Vector.mult(force, invMass));
	}

}
