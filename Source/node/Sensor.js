// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class Sensor extends Node {

	constructor(x, y, r) {
		super(x, y, r);
		this.dir;
		this.signalValue;
	}

	update(deltaTime) {
	}

	isSensor() { return true; }
}

class RotationSensor extends Sensor {

	constructor(x, y, r) {
		super(x, y, r);
		this.dir;
		this.signalValue;
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [0, 0, 255]);
	}

	updateDir(listOfNodes) {
		this.dir = createVector(0.0, 0.0);
		var myPos = createVector(this.x, this.y);
		for (var ni = 0; ni < listOfNodes.length; ni++) {
			var nodePos = createVector(listOfNodes[ni].x, listOfNodes[ni].y);
			var diff = p5.Vector.sub(myPos, nodePos);
			this.dir = p5.Vector.add(this.dir, diff);
		}

		this.dir.normalize();
		var angleNormalized = Math.acos(p5.Vector.dot(this.dir, createVector(0.0, -1.0))) / Math.PI;
		var sign = p5.Vector.dot(this.dir, createVector(1.0, 0.0));
		if (sign < 0.0) sign = -1.0;
		else sign = 1.0;
		this.signalValue = sign * angleNormalized;
	}

	isRotationSensor() { return true; }

	getDir() {
		return this.dir;
	}
}

function pointLineClosestPoint_returnT(point, lineStart, lineEnd) {

	var lineDir = p5.Vector.sub(lineEnd, lineStart);
	lineDir.normalize();
	var relativePoint = p5.Vector.sub(point, lineStart);
	var projPoint = p5.Vector.dot(relativePoint, lineDir);
	var t = projPoint / p5.Vector.dist(lineStart, lineEnd);
	return t;
}

function pointLineClosestPoint_returnPoint(point, lineStart, lineEnd) {

	var t = pointLineClosestPoint_returnT(point, lineStart, lineEnd);
	if (t < 0.0) t = 0.0;
	if (t > 1.0) t = 1.0;
	var point = p5.Vector.lerp(lineStart, lineEnd, t);
	return point;
}

class DistanceSensor extends Sensor {

	constructor(x, y, r) {
		super(x, y, r);
		// basically a distance value
		this.signalValue = 0.0;
		this.closestPoint;
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [50, 180, 200]);

		//if (this.signalValue !== 0.0) {
		//	stroke([50, 180, 200]);
		//	strokeWeight(2);
		//	line(this.closestPoint.x, this.closestPoint.y, this.x, this.y);
		//}
	}

	updateDistance(listOfRocks) {

		var distance = 100000.0;
		var myPos = createVector(this.x, this.y);
		for (var i = 0; i < listOfRocks.length; i++) { // for each rock
			var rock = listOfRocks[i];
			var upLeft = createVector(rock.points[0], 						rock.points[1]);
			var upRight = createVector(rock.points[0] + rock.points[2], 	rock.points[1]);
			var downLeft = createVector(rock.points[0], 					rock.points[1] + rock.points[3]);
			var downRight = createVector(rock.points[0] + rock.points[2], 	rock.points[1] + rock.points[3]);

			var points = [];
			points[0] = pointLineClosestPoint_returnPoint(myPos, upLeft, upRight);
			points[1] = pointLineClosestPoint_returnPoint(myPos, upRight, downRight);
			points[2] = pointLineClosestPoint_returnPoint(myPos, downRight, downLeft);
			points[3] = pointLineClosestPoint_returnPoint(myPos, downLeft, upLeft);

			var dist = [];
			dist[0] = p5.Vector.dist(myPos, points[0]);
			dist[1] = p5.Vector.dist(myPos, points[1]);
			dist[2] = p5.Vector.dist(myPos, points[2]);
			dist[3] = p5.Vector.dist(myPos, points[3]);

			// find the closest
			var smallestI = 0;
			for (var j = 0; j < 4; j++) {
				if (dist[j] < dist[smallestI]) {
					smallestI = j;
				}
			}

			if (dist[smallestI] < distance) {
				distance = dist[smallestI];
				this.closestPoint = points[smallestI];
			}
		}

		this.signalValue = 1.0 - (distance / windowWidth);
		if (this.signalValue > 1.0) this.signalValue = 1.0;
		if (this.signalValue < 0.0) this.signalValue = 0.0;
		//print(this.signalValue);
	}

	isDistanceSensor() { return true; }

	getDist() {
		return this.distance;
	}
}
