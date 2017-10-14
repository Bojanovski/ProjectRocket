class ShipManager {

  constructor() {
    this.ships = [];
  }

  addShip(ship) {
    this.ships.push(ship);
  }

  findShipByName(name) {
    for (var i = 0; i < this.ships.length; i++) {
      if (this.ships[i].name == name) {
        return this.ships[i];
      }
    }
  }

}
