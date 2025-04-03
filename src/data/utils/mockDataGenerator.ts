
import { ForestData, StateData } from '../types/forestTypes';

// Generate mock data for states
export const generateStateMockData = (
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
