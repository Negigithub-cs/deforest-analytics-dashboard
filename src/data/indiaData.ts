
import { ForestData, StateData } from './types/forestTypes';
import { statesData } from './statesData';

/
export const indiaData: StateData = {
  id: 'IN',
  name: 'India',
  forestData: [],
  projectedData: [],
  deforestationRate: statesData.reduce((avg, state) => avg + state.deforestationRate, 0) / statesData.length,
  conservationStatus: 'Fair',
  ranking: 0
};


for (let i = 0; i < 12; i++) {
  const year = 2013 + i;
  const aggregatedData: ForestData = {
    year,
    veryDenseForest: 0,
    moderatelyDenseForest: 0,
    openForest: 0,
    totalForestCover: 0,
    scrub: 0,
    nonForest: 0,
    airQualityIndex: 0
  };
  
  statesData.forEach(state => {
    const stateYearData = state.forestData[i];
    aggregatedData.veryDenseForest += stateYearData.veryDenseForest;
    aggregatedData.moderatelyDenseForest += stateYearData.moderatelyDenseForest;
    aggregatedData.openForest += stateYearData.openForest;
    aggregatedData.totalForestCover += stateYearData.totalForestCover;
    aggregatedData.scrub += stateYearData.scrub;
    aggregatedData.nonForest += stateYearData.nonForest;
  });
  
  // Average AQI across states
  aggregatedData.airQualityIndex = statesData.reduce((sum, state) => 
    sum + state.forestData[i].airQualityIndex, 0) / statesData.length;
  
  indiaData.forestData.push(aggregatedData);
}

// Aggregate projected data for all of India
for (let i = 0; i < 6; i++) {
  const year = 2025 + i;
  const aggregatedData: ForestData = {
    year,
    veryDenseForest: 0,
    moderatelyDenseForest: 0,
    openForest: 0,
    totalForestCover: 0,
    scrub: 0,
    nonForest: 0,
    airQualityIndex: 0
  };
  
  statesData.forEach(state => {
    const stateYearData = state.projectedData[i];
    aggregatedData.veryDenseForest += stateYearData.veryDenseForest;
    aggregatedData.moderatelyDenseForest += stateYearData.moderatelyDenseForest;
    aggregatedData.openForest += stateYearData.openForest;
    aggregatedData.totalForestCover += stateYearData.totalForestCover;
    aggregatedData.scrub += stateYearData.scrub;
    aggregatedData.nonForest += stateYearData.nonForest;
  });
  
  // Average AQI across states
  aggregatedData.airQualityIndex = statesData.reduce((sum, state) => 
    sum + state.projectedData[i].airQualityIndex, 0) / statesData.length;
  
  indiaData.projectedData.push(aggregatedData);
}
