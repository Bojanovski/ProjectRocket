
class Particle{
	
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
	}
	
	update(dt) {
		
		this.vel = p5.Vector.add(this.vel, p5.Vector.mult(this.acc, dt));
		this.pos = p5.Vector.add(this.pos, p5.Vector.mult(this.vel, dt));
		
		// Resets the acceleration accumulator
		this.acc.set(0, 9.81);
	}
}