
class Particle{
	
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
	}
	
	update(dt) {
		
		this.vel = add(this.vel, mult(this.acc, dt));
		this.pos = add(this.pos, mult(this.vel, dt));
		
		// Resets the acceleration accumulator
		this.acc.set(0, 0);
	}
}