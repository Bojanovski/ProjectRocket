
class PhysicsEngine{
	
	constructor() {
		this.particles = []
	}
	
	update(dt) {
		
		for (i = 0; i < this.particles.length; i++) {
	  	this.particles[i].update(dt);
	  }
		
	}
}