
class Contact{
	
	constructor(particle, staticCollider) {
		this.particle = particle;
		this.staticCollider = staticCollider;
	}
}

function applyHookeLaw(particle1, particle2, restingLength) {
	var diff = p5.Vector.sub(particle1.pos, particle2.pos);
	var dist = p5.Vector.mag(diff);
	var forceMagnitude = (dist - restingLength) * elasticityCoefficient;
	var dir = diff;
	dir.normalize();
	var force = p5.Vector.mult(dir, forceMagnitude);
	particle2.addForce(force);
	var forceNeg = p5.Vector.mult(force, -1.0);
	particle1.addForce(forceNeg);
}

function applyDamping(particle1, particle2) {
	var diff = p5.Vector.sub(particle1.pos, particle2.pos);
	var dir = diff;
	dir.normalize();
	var velocityDiff = p5.Vector.sub(particle1.vel, particle2.vel);
	var velocityDiffProj1 = p5.Vector.mult(dir, -0.5 * dampingCoefficient * p5.Vector.dot(dir, velocityDiff));
	var velocityDiffProj2 = p5.Vector.mult(dir, 0.5 * dampingCoefficient * p5.Vector.dot(dir, velocityDiff));
	particle1.vel = p5.Vector.add(particle1.vel, velocityDiffProj1);
	particle2.vel = p5.Vector.add(particle2.vel, velocityDiffProj2);
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
