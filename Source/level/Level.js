
class Level {

	constructor() {
		this.floorLevel = height / 2.0;
		this.rocks = [];
		this.generateGround(666);
	}

	generateGround(seed) {
		var numberOfGroundPlates = 11;
		var currentX = - width;
		var groundPlateWidth = width * 2.0 / numberOfGroundPlates;
		for (var i = 0; i < numberOfGroundPlates; i++)
		{
			var randomValue = random(1.0);
			var groundPlateHeight = unit * 20 * randomValue * randomValue + unit * 5;
			this.rocks.push(new Rock([currentX, this.floorLevel - groundPlateHeight, groundPlateWidth, groundPlateHeight]));
			currentX += groundPlateWidth;
		}
	}

	generatePlatforms(seed) {
		for (var i = 0; i < 10; i++) {

		}
	}

	update(deltaTime) {
		// update rocks
		for (var ri = 0; ri < this.rocks.length; ri++) {
			this.rocks[ri].update(deltaTime);
		}
	}

	display() {
		// display rocks
		for (var ri = 0; ri < this.rocks.length; ri++) {
			this.rocks[ri].display();
		}
	}
}
