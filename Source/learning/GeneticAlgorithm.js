class GeneticAlgorithm {

  constructor() {
    this.population = []; //array of genomes
  }

  populate(seed, shipPrototype, populationSize) {
    // seed for random genomes
    this.seed = seed;
    randomSeed(this.seed);
    // set ship and genome prototypes
    this.shipPrototype = shipPrototype;
    var genomePrototype = this.shipPrototype.neuralNetwork.getGenome();
    // clear
    this.population = [];
    // populate
    for (var i = 0; i < populationSize; i++) {
      // new genome
      var newGenome = _.cloneDeep(genomePrototype);
  		// randomize genome
  		newGenome.randomize();
      // add to the container
      this.population.push(newGenome);
    }
  }

  getTrainingBatch() {
    return this.population;
  }



}
