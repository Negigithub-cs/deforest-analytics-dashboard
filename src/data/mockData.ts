
export interface ForestData {
  year: number;
  veryDenseForest: number;
  moderatelyDenseForest: number;
  openForest: number;
  totalForestCover: number;
  scrub: number;
  nonForest: number;
  airQualityIndex: number;
}

export interface StateData {
  id: string;
  name: string;
  forestData: ForestData[];
  projectedData: ForestData[];
  deforestationRate: number;
  conservationStatus: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent';
  ranking: number;
}

// Generate mock data for states
const generateStateMockData = (
  stateName: string, 
  id: string, 
  baseForestCover: number, 
  deforestationRate: number,
  conservationStatus: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent',
  ranking: number
): StateData => {
  const forestData: ForestData[] = [];
  const projectedData: ForestData[] = [];
  
  // Historical data (2013-2024)
  for (let i = 0; i < 12; i++) {
    const year = 2013 + i;
    const yearlyDeforestationFactor = 1 - (deforestationRate * i / 100);
    const totalForestCover = baseForestCover * yearlyDeforestationFactor;
    
    forestData.push({
      year,
      veryDenseForest: totalForestCover * 0.2 * (1 - (Math.random() * 0.1)),
      moderatelyDenseForest: totalForestCover * 0.3 * (1 - (Math.random() * 0.1)),
      openForest: totalForestCover * 0.5 * (1 - (Math.random() * 0.1)),
      totalForestCover,
      scrub: baseForestCover * 0.1 * (1 + (i * deforestationRate / 1000)),
      nonForest: baseForestCover * (1 - yearlyDeforestationFactor) + baseForestCover * 0.1,
      airQualityIndex: 50 + (deforestationRate * i / 2) + (Math.random() * 30)
    });
  }
  
  // Projected data (2025-2030)
  for (let i = 0; i < 6; i++) {
    const year = 2025 + i;
    const yearlyDeforestationFactor = 1 - (deforestationRate * (12 + i) / 100);
    const totalForestCover = baseForestCover * yearlyDeforestationFactor;
    
    projectedData.push({
      year,
      veryDenseForest: totalForestCover * 0.2 * (1 - (Math.random() * 0.1)),
      moderatelyDenseForest: totalForestCover * 0.3 * (1 - (Math.random() * 0.1)),
      openForest: totalForestCover * 0.5 * (1 - (Math.random() * 0.1)),
      totalForestCover,
      scrub: baseForestCover * 0.1 * (1 + (i * deforestationRate / 1000)),
      nonForest: baseForestCover * (1 - yearlyDeforestationFactor) + baseForestCover * 0.1,
      airQualityIndex: 50 + (deforestationRate * (12 + i) / 2) + (Math.random() * 30)
    });
  }
  
  return {
    id,
    name: stateName,
    forestData,
    projectedData,
    deforestationRate,
    conservationStatus,
    ranking
  };
};

// Create mock data for Indian states
export const statesData: StateData[] = [
  generateStateMockData('Andhra Pradesh', 'AP', 28000, 0.6, 'Fair', 13),
  generateStateMockData('Arunachal Pradesh', 'AR', 67000, 0.3, 'Good', 4),
  generateStateMockData('Assam', 'AS', 28500, 0.8, 'Fair', 12),
  generateStateMockData('Bihar', 'BR', 7700, 1.2, 'Poor', 21),
  generateStateMockData('Chhattisgarh', 'CG', 55700, 0.7, 'Good', 5),
  generateStateMockData('Goa', 'GA', 2240, 0.4, 'Good', 7),
  generateStateMockData('Gujarat', 'GJ', 14600, 0.9, 'Fair', 15),
  generateStateMockData('Haryana', 'HR', 1600, 1.5, 'Poor', 22),
  generateStateMockData('Himachal Pradesh', 'HP', 15100, 0.3, 'Excellent', 3),
  generateStateMockData('Jharkhand', 'JH', 23600, 1.0, 'Fair', 14),
  generateStateMockData('Karnataka', 'KA', 38300, 0.6, 'Good', 8),
  generateStateMockData('Kerala', 'KL', 21200, 0.2, 'Excellent', 2),
  generateStateMockData('Madhya Pradesh', 'MP', 77700, 0.8, 'Fair', 11),
  generateStateMockData('Maharashtra', 'MH', 50700, 0.7, 'Fair', 10),
  generateStateMockData('Manipur', 'MN', 17400, 0.9, 'Fair', 16),
  generateStateMockData('Meghalaya', 'ML', 17100, 0.5, 'Good', 6),
  generateStateMockData('Mizoram', 'MZ', 18200, 1.3, 'Poor', 20),
  generateStateMockData('Nagaland', 'NL', 12500, 0.7, 'Fair', 9),
  generateStateMockData('Odisha', 'OD', 51600, 0.4, 'Good', 7),
  generateStateMockData('Punjab', 'PB', 1800, 1.8, 'Critical', 25),
  generateStateMockData('Rajasthan', 'RJ', 16600, 1.0, 'Poor', 19),
  generateStateMockData('Sikkim', 'SK', 3400, 0.1, 'Excellent', 1),
  generateStateMockData('Tamil Nadu', 'TN', 26300, 0.5, 'Good', 8),
  generateStateMockData('Telangana', 'TS', 21200, 0.9, 'Fair', 17),
  generateStateMockData('Tripura', 'TR', 7700, 1.1, 'Poor', 23),
  generateStateMockData('Uttar Pradesh', 'UP', 14800, 1.4, 'Poor', 24),
  generateStateMockData('Uttarakhand', 'UK', 24500, 0.4, 'Good', 5),
  generateStateMockData('West Bengal', 'WB', 16800, 1.0, 'Poor', 18),
];

// Generate all-India data by aggregating state data
export const indiaData: StateData = {
  id: 'IN',
  name: 'India',
  forestData: [],
  projectedData: [],
  deforestationRate: statesData.reduce((avg, state) => avg + state.deforestationRate, 0) / statesData.length,
  conservationStatus: 'Fair',
  ranking: 0
};

// Aggregate data for all of India
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

// Helper functions for data access
export const getStateById = (id: string): StateData | undefined => {
  if (id === 'IN') return indiaData;
  return statesData.find(state => state.id === id);
};

export const getAllStates = (): StateData[] => {
  return [indiaData, ...statesData];
};

export const getTopDeforestationStates = (count: number = 5): StateData[] => {
  return [...statesData].sort((a, b) => b.deforestationRate - a.deforestationRate).slice(0, count);
};

export const getTopConservationStates = (count: number = 5): StateData[] => {
  return [...statesData].sort((a, b) => a.deforestationRate - b.deforestationRate).slice(0, count);
};

export const getConservationStatusColor = (status: string): string => {
  switch (status) {
    case 'Excellent': return '#1B5E20';
    case 'Good': return '#4CAF50';
    case 'Fair': return '#FFC107';
    case 'Poor': return '#FF9800';
    case 'Critical': return '#F44336';
    default: return '#4CAF50';
  }
};

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return '#4CAF50'; // Good
  if (aqi <= 100) return '#FFEB3B'; // Moderate
  if (aqi <= 150) return '#FF9800'; // Unhealthy for Sensitive Groups
  if (aqi <= 200) return '#F44336'; // Unhealthy
  if (aqi <= 300) return '#9C27B0'; // Very Unhealthy
  return '#7D1E1E'; // Hazardous
};
