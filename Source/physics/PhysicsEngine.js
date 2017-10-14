
class PhysicsEngine{
	
	constructor() {
		this.particles = []
		this.staticColliders = []
	}
	
	update(dt) {
		
		// Integrate
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].update(dt);
		}
		
		// Collision detection
		var contacts = [];
		for (var i = 0; i < this.particles.length; i++) { // for each particle
			var particle = this.particles[i];
			for (var j = 0; j < this.particles.length; j++) { // for each static collider
				var staticCollider = this.staticColliders[j];
				
				
				
			}
		}
	}
}
