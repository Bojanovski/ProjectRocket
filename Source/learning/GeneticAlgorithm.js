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

  applySimulationResults(results) {
    // map the results with population
    var resultsPopulationMap = [];
    for (var i = 0; i < results.length && i < this.population.length; i++) {
      resultsPopulationMap.push([this.population[i], results[i]]);
    }

    // declare comperator function for sorting
    function Comparator(a, b) {
      if (a[1] > b[1]) return -1;
      if (a[1] < b[1]) return 1;
      return 0;
    }

    // sort
    resultsPopulationMap.sort(Comparator);

    // list elite
    var eliteSize = 3;
    var elite = [];
    for (var i = 0; i < eliteSize && i < resultsPopulationMap.length; i++) {
      elite.push(resultsPopulationMap[i][0]);
    }

    // repopulate from elite
    this.populateFromElite(elite);
  }

  populateFromElite(elite) {
    // previous population size
    var previousPopulationSize = this.population.length;
    // clear
    this.population = [];
    // add elite
    for (var i = 0; i < elite.length; i++) {
      this.population.push(_.cloneDeep(elite[i]));
    }
    // add mutated elite
    var currentEliteIndex = 0;
    while (this.population.length < previousPopulationSize && currentEliteIndex < elite.length) {
        var newGenome = _.cloneDeep(elite[currentEliteIndex]);
        newGenome.randomMutation();
        this.population.push(newGenome);
        currentEliteIndex = (currentEliteIndex + 1) % elite.length;
    }
  }

}
