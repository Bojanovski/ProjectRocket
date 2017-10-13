class GameState_Gameplay extends GameState {

  	constructor(gsm) {
	  	super(gsm);

  		this.level = new Level();
  		this.ship = new Ship(0.0,0.0);
  		this.ship.generateRandom();
	}

  update(deltaTime) {
  }
  
  draw() {
		this.ship.display();
  }
  
  print() {
	  return '(Base)';
  }
}