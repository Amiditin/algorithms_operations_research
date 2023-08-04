import fs from 'fs';

/** @type {(path: string) => string | undefined} */
const getFileData = (path) => {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf-8' });

    return data;
  } catch (err) {
    console.log(err);
  }
};

/** @type {(nameFile: string) => { capacity: number, weights: number, profits: number, optimum: number}} */
const getParameters = (nameFile) => {
  const getArrNumbers = (str) => {
    return str.trim().split('\n').map(Number);
  };

  const capacity = +getFileData(`${nameFile}_c.txt`);
  const weights = getArrNumbers(getFileData(`${nameFile}_w.txt`));
  const profits = getArrNumbers(getFileData(`${nameFile}_p.txt`));
  const optimum = getArrNumbers(getFileData(`${nameFile}_s.txt`));

  return { capacity, weights, profits, optimum };
};

/** @type {(min: number, max: number) => number} */
export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** @type {(size: number) => number[]} */
const getInitPopulation = (sizePopulation, sizeChromosome) => {
  return Array.from({ length: sizePopulation }, () =>
    Array.from({ length: sizeChromosome }, () => getRandomNumber(0, 1)),
  );
};
const filesPath = 'src/utils/lab3_genetic/assets/knapsack/';

const params = getParameters(filesPath + 'p01');
const sizePopulation = 8;
const population = getInitPopulation(sizePopulation, params.weights.length);

/** @type {(weights: number[], profits: number[], population: number[][], capacity: number) => number[]} */
const fitness = (weights, profits, population, capacity) => {
  let fitnessValues = Array.from({ length: population.length }, () => 0);

  population.forEach((chromosome, i) => {
    const sumWeights = weights.reduce((sum, curValue, i) => sum + curValue * chromosome[i], 0);
    const sumProfits = profits.reduce((sum, curValue, i) => sum + curValue * chromosome[i], 0);

    if (sumWeights <= capacity) {
      fitnessValues[i] = sumProfits;
    }
  });

  return fitnessValues;
};

/** @type {(fitnessValues: number[], numParents: number, population: number[][]) => number[]} */
const selection = (fitnessValues, numParents, population) => {
  let parents = [];

  const values = fitnessValues
    .map((value, index) => ({ value, index }))
    .sort((a, b) => (a.value < b.value ? 1 : -1));

  console.log(values);

  for (let i = 0; i < numParents; i++) {
    parents.push(population[values[i].index]);
  }

  return parents;
};

const fitnessValues = fitness(params.weights, params.profits, population, params.capacity);

const parents = selection(fitnessValues, population.length / 2, population);

console.log({ population, fitnessValues, parents });
