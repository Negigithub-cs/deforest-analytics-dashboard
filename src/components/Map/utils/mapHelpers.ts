
import { getStateById, getConservationStatusColor } from '@/data/mockData';

export const getStateFill = (
  stateId: string, 
  selectedState: string, 
  forestDensityView: boolean,
  year: number = 2024
): string => {
  if (forestDensityView) {
    const stateData = getStateById(stateId);
    if (!stateData) return "#EEEEEE";
    
    // Find data for the specific year
    const allYearData = [...stateData.forestData, ...stateData.projectedData];
    const yearData = allYearData.find(data => data.year === year);
    
    if (!yearData) return "#EEEEEE";
    
    const totalArea = yearData.totalForestCover + yearData.nonForest;
    const forestPercent = (yearData.totalForestCover / totalArea) * 100;
    
    if (forestPercent > 60) return "#1B5E20"; // Dark green - very dense
    if (forestPercent > 40) return "#2E7D32"; // Medium green - moderately dense
    if (forestPercent > 20) return "#4CAF50"; // Light green - open forest
    if (forestPercent > 10) return "#A5D6A7"; // Very light green - minimal forest
    return "#EEEEEE"; // Gray - almost no forest
  } else {
    if (stateId === selectedState) {
      return "#2E7D32"; // Highlight selected state
    }
    
    const stateData = getStateById(stateId);
    if (!stateData) return "#EEEEEE";
    
    return getConservationStatusColor(stateData.conservationStatus);
  }
};
