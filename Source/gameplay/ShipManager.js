// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class ShipManager {

  constructor() {
    this.ships = [];
    this.defaultShip = new Ship("Default Ship", 0.0, 0.0);
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
