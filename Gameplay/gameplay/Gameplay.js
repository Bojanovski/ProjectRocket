class Gameplay {

  	constructor() {
  		this.level = new Level();
  		this.ship = new Ship(0.0,0.0);
  		this.ship.generateRandom();
	}

	update() {
	}
	
	display() {
		this.ship.display();
	}	
}