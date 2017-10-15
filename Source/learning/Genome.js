class Genome {

  constructor() {
    this.neurons = []; // [bias,[weight, weight, ..., weight]]
  }

  randomize() {
    for (var ni = 0; ni < this.neurons.length; ni++) {
      this.neurons[ni][0] = random(-1.0,1.0);
      for (var wi = 0; wi < this.neurons[ni][1].length; wi++) {
        this.neurons[ni][1][wi] = random(-1.0,1.0);
      }
    }
  }

  randomMutation(delta) {
    var deltaMin = -delta;
    var deltaMax = delta;
    for (var ni = 0; ni < this.neurons.length; ni++) {
      this.neurons[ni][0] += random(deltaMin,deltaMax);
      this.neurons[ni][0] = this.clamp(this.neurons[ni][0], -1.0, 1.0);
      for (var wi = 0; wi < this.neurons[ni][1].length; wi++) {
        this.neurons[ni][1][wi] += random(deltaMin,deltaMax);
        this.neurons[ni][1][wi] = this.clamp(this.neurons[ni][1][wi], -1.0, 1.0);
      }
    }
  }

  clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

}
