
class Contact{
	
	constructor(particle, staticCollider) {
		this.particle = particle;
		this.staticCollider = staticCollider;
	}
	
}

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
			for (var j = 0; j < this.staticColliders.length; j++) { // for each static collider
				var staticCollider = this.staticColliders[j];
				
				if ((staticCollider.pos.x - particle.radius) < particle.pos.x && particle.pos.x < (particle.radius + staticCollider.pos.x + staticCollider.size.x) &&
					(staticCollider.pos.y - particle.radius) < particle.pos.y && particle.pos.y < (particle.radius + staticCollider.pos.y + staticCollider.size.y)) {
					contacts.push(new Contact(particle, staticCollider));
				}
			}
		}
		
		// Collision resoulution
		for (var i = 0; i < contacts.length; i++) {
			//var dist1 = p5.Vector.add();
		}
	}
}
