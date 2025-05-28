
import { StateData } from './types/forestTypes';
import { statesData } from './statesData';
import { indiaData } from './indiaData';
import { 
  getStateById as getStateByIdUtil,
  getAllStates as getAllStatesUtil,
  getTopDeforestationStates as getTopDeforestationStatesUtil,
  getTopConservationStates as getTopConservationStatesUtil,
  getConservationStatusColor,
  getAQIColor
} from './utils/forestDataUtils';

// Re-export the types
export type { ForestData, StateData } from './types/forestTypes';

// Re-export the data
export { statesData, indiaData };

// Helper functions for data access with the same API as before
export const getStateById = (id: string): StateData | undefined => {
  return getStateByIdUtil(statesData, indiaData, id);
};

export const getAllStates = (): StateData[] => {
  return getAllStatesUtil(statesData, indiaData);
};

export const getTopDeforestationStates = (count: number = 5): StateData[] => {
  return getTopDeforestationStatesUtil(statesData, count);
};

export const getTopConservationStates = (count: number = 5): StateData[] => {
  return getTopConservationStatesUtil(statesData, count);
};

// Re-export utility functions
export { getConservationStatusColor, getAQIColor };
