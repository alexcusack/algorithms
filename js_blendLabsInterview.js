const computePopulationSize = (lifespan, simLen, populationAges) => {
  populationAges = populationAges || [0]
  if (simLen === 0) { return populationAges.length }
  return computePopulationSize(lifespan, --simLen, updatePopulationAgeList(populationAges, lifespan))
}

const updatePopulationAgeList = (populationAges, lifespan, reproductionAge) => {
  reproductionAge = reproductionAge || 1
  return populationAges.reduce((updatedPopulation, currentChildAge) => {
    if (++currentChildAge === lifespan) { return updatedPopulation }
    return updatedPopulation.concat(currentChildAge > reproductionAge
      ? [currentChildAge, 0]
      : [currentChildAge]
    )
  }, [])
}

// for (let i = 0; i < 10; ++i) {
//   console.log(computePopulationSize(4, i))
// }

// TESTS
;[
  {
    input: [4, 0],
    expected: 1,
  },
  {
    input: [4, 5],
    expected: 5,
  },
  {
    input: [4, 9],
    expected: 14,
  },
].forEach((td) => {
  const actual = computePopulationSize(td.input[0], td.input[1])
  const pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass) {
    console.log('passed input:', td.input)
  } else {
    console.log('actual:', actual)
    console.log('expected:', td.expected)
    process.exit()
  }
})
