// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class Rock {

  constructor(points) {
    this.points = points;
  }

  update(deltaTime) {

  }

  display() {
    fill(100);
    stroke(150);
    strokeWeight(3);
    rect(this.points[0],this.points[1],this.points[2],this.points[3]);
  }

}
