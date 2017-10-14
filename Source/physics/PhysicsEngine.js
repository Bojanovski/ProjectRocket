
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
		
		// Collision resolution
		for (var i = 0; i < contacts.length; i++) {
			var particle = contacts[i].particle;
			var staticCollider = contacts[i].staticCollider;
			var dist = [];
			dist[0] = (staticCollider.pos.x - particle.radius) - particle.pos.x;
			dist[1] = particle.pos.x - (particle.radius + staticCollider.pos.x + staticCollider.size.x);
			dist[2] = (staticCollider.pos.y - particle.radius) - particle.pos.y;
			dist[3] = particle.pos.y - (particle.radius + staticCollider.pos.y + staticCollider.size.y);
			
			// surface normals
			var normals = [];
			normals[0] = createVector(-1.0, 0.0);
			normals[1] = createVector(1.0, 0.0);
			normals[2] = createVector(0.0, -1.0);
			normals[3] = createVector(0.0, 1.0);
			
			// find the shallowest penetration
			var smallestI = 0;
			for (var j = 0; j < 4; j++) {
				if (dist[j] > dist[smallestI]) {
					smallestI = j;
				}
			}

			// resolve position
			var posResolve = p5.Vector.mult(normals[smallestI], -dist[smallestI]);
			particle.pos = p5.Vector.add(particle.pos, posResolve);
			
			// resolve velocity
			var velProj = p5.Vector.dot(normals[smallestI], particle.vel);
			if (velProj < 0.0) {
				var velResolve = p5.Vector.mult(normals[smallestI], -(particle.restitutionCoefficient + 1.0) * velProj);
				particle.vel = p5.Vector.add(particle.vel, velResolve);
			}
		}
	}
}
