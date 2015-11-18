const computePopulationSize = (lifespan, simLen, populationAges) => {
  populationAges = populationAges || [0]
  if (simLen === 0) { return populationAges.length }
  return computePopulationSize(lifespan, --simLen, updatePopulationSize(populationAges, lifespan))
}

const updatePopulationSize = (populationAges, lifespan) => {
  return populationAges.reduce((updatedPopulation, currentChildAge) => {
    if (++currentChildAge === lifespan) { return updatedPopulation }
    return updatedPopulation.concat(currentChildAge > 1 ? [currentChildAge, 0] : [currentChildAge])
  }, [])
}

for (let i = 0; i < 10; ++i) {
  console.log(computePopulationSize(4, 10))
}

// 1
// 1
// 2
// 3
// 3
// 5
// 6
// 8
// 11
// 14
