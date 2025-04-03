
import { StateData } from '../types/forestTypes';

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

export const getStateById = (states: StateData[], indiaData: StateData, id: string): StateData | undefined => {
  if (id === 'IN') return indiaData;
  return states.find(state => state.id === id);
};

export const getAllStates = (states: StateData[], indiaData: StateData): StateData[] => {
  return [indiaData, ...states];
};

export const getTopDeforestationStates = (states: StateData[], count: number = 5): StateData[] => {
  return [...states].sort((a, b) => b.deforestationRate - a.deforestationRate).slice(0, count);
};

export const getTopConservationStates = (states: StateData[], count: number = 5): StateData[] => {
  return [...states].sort((a, b) => a.deforestationRate - b.deforestationRate).slice(0, count);
};
