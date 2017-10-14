
class Level {

	constructor() {
		this.rocks = [];
		this.generateGround(666);
	}

	generateGround(seed) {
		this.rocks.push(new Rock([-15, 90, 500, 50]));
		this.rocks.push(new Rock([-50, -180, 500, 50]));
	}

	generatePlatforms(seed) {
		for (var i = 0; i < 10; i++)
		{

		}
	}

	update() {
		// update rocks
		for (var ri = 0; ri < this.rocks.length; ri++) {
			this.rocks[ri].update();
		}
	}

	display() {
		// display rocks
		for (var ri = 0; ri < this.rocks.length; ri++) {
			this.rocks[ri].display();
		}
	}
}
