import { ForestData, StateData } from 'src/data/types/forestTypes'; // Assuming forestTypes.ts is in the same directory or adjust path accordingly

/**
 * Represents specific forest cover prediction data for various Indian states/union territories.
 * This data now includes integrated Air Quality Index (AQI) values.
 * AQI values are based on the latest fetched data and are applied to all projected years.
 */
export const predictedForestData: StateData[] = [
  {
    id: 'DL',
    name: 'Delhi',
    forestData: [], // Historical data not provided, leaving empty
    projectedData: [
      { year: 2025, veryDenseForest: 6.67, moderatelyDenseForest: 56.1, openForest: 137.94, totalForestCover: 200.71, scrub: 0, nonForest: 0, airQualityIndex: 95 },
      { year: 2027, veryDenseForest: 6.66, moderatelyDenseForest: 56.43, openForest: 140.57, totalForestCover: 203.66, scrub: 0, nonForest: 0, airQualityIndex: 95 },
      { year: 2029, veryDenseForest: 6.64, moderatelyDenseForest: 56.77, openForest: 143.19, totalForestCover: 206.6, scrub: 0, nonForest: 0, airQualityIndex: 95 },
      { year: 2030, veryDenseForest: 6.63, moderatelyDenseForest: 56.94, openForest: 144.5, totalForestCover: 208.07, scrub: 0, nonForest: 0, airQualityIndex: 95 },
    ],
    deforestationRate: 0, // Placeholder
    conservationStatus: 'Fair', // Placeholder
    ranking: 0, // Placeholder
  },
  {
    id: 'CH',
    name: 'Chandigarh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 1.36, moderatelyDenseForest: 13.85, openForest: 8.02, totalForestCover: 23.23, scrub: 0, nonForest: 0, airQualityIndex: 103 },
      { year: 2027, veryDenseForest: 1.36, moderatelyDenseForest: 14.03, openForest: 8.03, totalForestCover: 23.42, scrub: 0, nonForest: 0, airQualityIndex: 103 },
      { year: 2029, veryDenseForest: 1.36, moderatelyDenseForest: 14.22, openForest: 8.03, totalForestCover: 23.61, scrub: 0, nonForest: 0, airQualityIndex: 103 },
      { year: 2030, veryDenseForest: 1.36, moderatelyDenseForest: 14.31, openForest: 8.03, totalForestCover: 23.7, scrub: 0, nonForest: 0, airQualityIndex: 103 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'PY',
    name: 'Puducherry',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 0.0, moderatelyDenseForest: 12.67, openForest: 39.8, totalForestCover: 52.47, scrub: 0, nonForest: 0, airQualityIndex: 44 },
      { year: 2027, veryDenseForest: 0.0, moderatelyDenseForest: 9.55, openForest: 42.39, totalForestCover: 51.93, scrub: 0, nonForest: 0, airQualityIndex: 44 },
      { year: 2029, veryDenseForest: 0.0, moderatelyDenseForest: 6.42, openForest: 44.98, totalForestCover: 51.4, scrub: 0, nonForest: 0, airQualityIndex: 44 },
      { year: 2030, veryDenseForest: 0.0, moderatelyDenseForest: 4.86, openForest: 46.27, totalForestCover: 51.13, scrub: 0, nonForest: 0, airQualityIndex: 44 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'AN',
    name: 'Andaman & Nicobar Islands',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 5678.0, moderatelyDenseForest: 683.33, openForest: 383.67, totalForestCover: 6745.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2027, veryDenseForest: 5678.0, moderatelyDenseForest: 683.19, openForest: 384.38, totalForestCover: 6745.57, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2029, veryDenseForest: 5678.0, moderatelyDenseForest: 683.05, openForest: 385.1, totalForestCover: 6746.14, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2030, veryDenseForest: 5678.0, moderatelyDenseForest: 682.98, openForest: 385.45, totalForestCover: 6746.43, scrub: 0, nonForest: 0, airQualityIndex: 0 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'LA',
    name: 'Ladakh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 2.8, moderatelyDenseForest: 512.0, openForest: 1758.0, totalForestCover: 2272.8, scrub: 0, nonForest: 0, airQualityIndex: 13 },
      { year: 2027, veryDenseForest: 3.31, moderatelyDenseForest: 512.0, openForest: 1758.0, totalForestCover: 2273.31, scrub: 0, nonForest: 0, airQualityIndex: 13 },
      { year: 2029, veryDenseForest: 3.83, moderatelyDenseForest: 512.0, openForest: 1758.0, totalForestCover: 2273.83, scrub: 0, nonForest: 0, airQualityIndex: 13 },
      { year: 2030, veryDenseForest: 4.09, moderatelyDenseForest: 512.0, openForest: 1758.0, totalForestCover: 2274.09, scrub: 0, nonForest: 0, airQualityIndex: 13 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'JK',
    name: 'Jammu & Kashmir',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 4142.65, moderatelyDenseForest: 7900.19, openForest: 8610.71, totalForestCover: 20653.55, scrub: 0, nonForest: 0, airQualityIndex: 107 },
      { year: 2027, veryDenseForest: 4128.31, moderatelyDenseForest: 7827.75, openForest: 8396.51, totalForestCover: 20352.57, scrub: 0, nonForest: 0, airQualityIndex: 107 },
      { year: 2029, veryDenseForest: 4113.96, moderatelyDenseForest: 7755.31, openForest: 8182.32, totalForestCover: 20051.59, scrub: 0, nonForest: 0, airQualityIndex: 107 },
      { year: 2030, veryDenseForest: 4106.79, moderatelyDenseForest: 7719.09, openForest: 8075.22, totalForestCover: 19901.1, scrub: 0, nonForest: 0, airQualityIndex: 107 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'LD',
    name: 'Lakshadweep',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 0.0, moderatelyDenseForest: 15.73, openForest: 11.39, totalForestCover: 27.11, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2027, veryDenseForest: 0.0, moderatelyDenseForest: 15.57, openForest: 11.55, totalForestCover: 27.12, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2029, veryDenseForest: 0.0, moderatelyDenseForest: 15.42, openForest: 11.71, totalForestCover: 27.12, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2030, veryDenseForest: 0.0, moderatelyDenseForest: 15.34, openForest: 11.79, totalForestCover: 27.13, scrub: 0, nonForest: 0, airQualityIndex: 0 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'DNH_DD',
    name: 'Dadra and Nagar Haveli and Daman & Diu',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 1.4, moderatelyDenseForest: 85.56, openForest: 140.79, totalForestCover: 227.75, scrub: 0, nonForest: 0, airQualityIndex: 144 },
      { year: 2027, veryDenseForest: 1.4, moderatelyDenseForest: 85.56, openForest: 140.79, totalForestCover: 227.75, scrub: 0, nonForest: 0, airQualityIndex: 144 },
      { year: 2029, veryDenseForest: 1.4, moderatelyDenseForest: 85.56, openForest: 140.79, totalForestCover: 227.75, scrub: 0, nonForest: 0, airQualityIndex: 144 },
      { year: 2030, veryDenseForest: 1.4, moderatelyDenseForest: 85.56, openForest: 140.79, totalForestCover: 227.75, scrub: 0, nonForest: 0, airQualityIndex: 144 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 1993.93, moderatelyDenseForest: 13938.91, openForest: 10408.89, totalForestCover: 26341.73, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2027, veryDenseForest: 1993.92, moderatelyDenseForest: 13938.89, openForest: 10408.86, totalForestCover: 26341.67, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2029, veryDenseForest: 1993.9, moderatelyDenseForest: 13938.87, openForest: 10408.84, totalForestCover: 26341.61, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2030, veryDenseForest: 1993.9, moderatelyDenseForest: 13938.86, openForest: 10408.83, totalForestCover: 26341.58, scrub: 0, nonForest: 0, airQualityIndex: 0 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'AR',
    name: 'Arunachal Pradesh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 21095.01, moderatelyDenseForest: 30214.98, openForest: 16738.0, totalForestCover: 68047.99, scrub: 0, nonForest: 0, airQualityIndex: 70 },
      { year: 2027, veryDenseForest: 21095.01, moderatelyDenseForest: 30214.98, openForest: 16738.0, totalForestCover: 68047.98, scrub: 0, nonForest: 0, airQualityIndex: 70 },
      { year: 2029, veryDenseForest: 21095.01, moderatelyDenseForest: 30214.97, openForest: 16738.0, totalForestCover: 68047.98, scrub: 0, nonForest: 0, airQualityIndex: 70 },
      { year: 2030, veryDenseForest: 21095.01, moderatelyDenseForest: 30214.97, openForest: 16738.0, totalForestCover: 68047.98, scrub: 0, nonForest: 0, airQualityIndex: 70 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Excellent',
    ranking: 0,
  },
  {
    id: 'AS',
    name: 'Assam',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 2795.0, moderatelyDenseForest: 10243.0, openForest: 15309.0, totalForestCover: 28347.0, scrub: 0, nonForest: 0, airQualityIndex: 42 },
      { year: 2027, veryDenseForest: 2795.0, moderatelyDenseForest: 10243.0, openForest: 15309.0, totalForestCover: 28347.0, scrub: 0, nonForest: 0, airQualityIndex: 42 },
      { year: 2029, veryDenseForest: 2795.0, moderatelyDenseForest: 10243.0, openForest: 15309.0, totalForestCover: 28347.0, scrub: 0, nonForest: 0, airQualityIndex: 42 },
      { year: 2030, veryDenseForest: 2795.0, moderatelyDenseForest: 10243.0, openForest: 15309.0, totalForestCover: 28347.0, scrub: 0, nonForest: 0, airQualityIndex: 42 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'BR',
    name: 'Bihar',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 333.28, moderatelyDenseForest: 3280.99, openForest: 3669.83, totalForestCover: 7284.11, scrub: 0, nonForest: 0, airQualityIndex: 124 },
      { year: 2027, veryDenseForest: 333.34, moderatelyDenseForest: 3280.99, openForest: 3669.8, totalForestCover: 7284.13, scrub: 0, nonForest: 0, airQualityIndex: 124 },
      { year: 2029, veryDenseForest: 333.4, moderatelyDenseForest: 3280.99, openForest: 3669.76, totalForestCover: 7284.15, scrub: 0, nonForest: 0, airQualityIndex: 124 },
      { year: 2030, veryDenseForest: 333.43, moderatelyDenseForest: 3280.99, openForest: 3669.74, totalForestCover: 7284.16, scrub: 0, nonForest: 0, airQualityIndex: 124 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Poor',
    ranking: 0,
  },
  {
    id: 'CT',
    name: 'Chhattisgarh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 25721.0, moderatelyDenseForest: 32197.0, openForest: 10427.0, totalForestCover: 68345.0, scrub: 0, nonForest: 0, airQualityIndex: 80 },
      { year: 2027, veryDenseForest: 25721.0, moderatelyDenseForest: 32197.0, openForest: 10427.0, totalForestCover: 68345.0, scrub: 0, nonForest: 0, airQualityIndex: 80 },
      { year: 2029, veryDenseForest: 25721.0, moderatelyDenseForest: 32197.0, openForest: 10427.0, totalForestCover: 68345.0, scrub: 0, nonForest: 0, airQualityIndex: 80 },
      { year: 2030, veryDenseForest: 25721.0, moderatelyDenseForest: 32197.0, openForest: 10427.0, totalForestCover: 68345.0, scrub: 0, nonForest: 0, airQualityIndex: 80 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'GA',
    name: 'Goa',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 224.0, moderatelyDenseForest: 785.0, openForest: 1060.0, totalForestCover: 2069.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2027, veryDenseForest: 224.0, moderatelyDenseForest: 785.0, openForest: 1060.0, totalForestCover: 2069.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2029, veryDenseForest: 224.0, moderatelyDenseForest: 785.0, openForest: 1060.0, totalForestCover: 2069.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2030, veryDenseForest: 224.0, moderatelyDenseForest: 785.0, openForest: 1060.0, totalForestCover: 2069.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 379.0, moderatelyDenseForest: 5207.0, openForest: 9211.0, totalForestCover: 14797.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2027, veryDenseForest: 379.0, moderatelyDenseForest: 5207.0, openForest: 9211.0, totalForestCover: 14797.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2029, veryDenseForest: 379.0, moderatelyDenseForest: 5207.0, openForest: 9211.0, totalForestCover: 14797.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2030, veryDenseForest: 379.0, moderatelyDenseForest: 5207.0, openForest: 9211.0, totalForestCover: 14797.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'HR',
    name: 'Haryana',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 28.0, moderatelyDenseForest: 486.0, openForest: 1141.0, totalForestCover: 1655.0, scrub: 0, nonForest: 0, airQualityIndex: 144 },
      { year: 2027, veryDenseForest: 28.0, moderatelyDenseForest: 486.0, openForest: 1141.0, totalForestCover: 1655.0, scrub: 0, nonForest: 0, airQualityIndex: 144 },
      { year: 2029, veryDenseForest: 28.0, moderatelyDenseForest: 486.0, openForest: 1141.0, totalForestCover: 1655.0, scrub: 0, nonForest: 0, airQualityIndex: 144 },
      { year: 2030, veryDenseForest: 28.0, moderatelyDenseForest: 486.0, openForest: 1141.0, totalForestCover: 1655.0, scrub: 0, nonForest: 0, airQualityIndex: 144 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Poor',
    ranking: 0,
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 3110.0, moderatelyDenseForest: 7125.0, openForest: 5040.0, totalForestCover: 15275.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2027, veryDenseForest: 3110.0, moderatelyDenseForest: 7125.0, openForest: 5040.0, totalForestCover: 15275.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2029, veryDenseForest: 3110.0, moderatelyDenseForest: 7125.0, openForest: 5040.0, totalForestCover: 15275.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2030, veryDenseForest: 3110.0, moderatelyDenseForest: 7125.0, openForest: 5040.0, totalForestCover: 15275.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 2603.0, moderatelyDenseForest: 9687.0, openForest: 11847.0, totalForestCover: 24137.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2027, veryDenseForest: 2603.0, moderatelyDenseForest: 9687.0, openForest: 11847.0, totalForestCover: 24137.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2029, veryDenseForest: 2603.0, moderatelyDenseForest: 9687.0, openForest: 11847.0, totalForestCover: 24137.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2030, veryDenseForest: 2603.0, moderatelyDenseForest: 9687.0, openForest: 11847.0, totalForestCover: 24137.0, scrub: 0, nonForest: 0, airQualityIndex: 0 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'KA',
    name: 'Karnataka',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 4501.0, moderatelyDenseForest: 20950.0, openForest: 14002.0, totalForestCover: 39453.0, scrub: 0, nonForest: 0, airQualityIndex: 36 },
      { year: 2027, veryDenseForest: 4501.0, moderatelyDenseForest: 20950.0, openForest: 14002.0, totalForestCover: 39453.0, scrub: 0, nonForest: 0, airQualityIndex: 36 },
      { year: 2029, veryDenseForest: 4501.0, moderatelyDenseForest: 20950.0, openForest: 14002.0, totalForestCover: 39453.0, scrub: 0, nonForest: 0, airQualityIndex: 36 },
      { year: 2030, veryDenseForest: 4501.0, moderatelyDenseForest: 20950.0, openForest: 14002.0, totalForestCover: 39453.0, scrub: 0, nonForest: 0, airQualityIndex: 36 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'KL',
    name: 'Kerala',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 1658.0, moderatelyDenseForest: 9474.0, openForest: 11867.0, totalForestCover: 22999.0, scrub: 0, nonForest: 0, airQualityIndex: 19 },
      { year: 2027, veryDenseForest: 1658.0, moderatelyDenseForest: 9474.0, openForest: 11867.0, totalForestCover: 22999.0, scrub: 0, nonForest: 0, airQualityIndex: 19 },
      { year: 2029, veryDenseForest: 1658.0, moderatelyDenseForest: 9474.0, openForest: 11867.0, totalForestCover: 22999.0, scrub: 0, nonForest: 0, airQualityIndex: 19 },
      { year: 2030, veryDenseForest: 1658.0, moderatelyDenseForest: 9474.0, openForest: 11867.0, totalForestCover: 22999.0, scrub: 0, nonForest: 0, airQualityIndex: 19 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 6667.0, moderatelyDenseForest: 30040.0, openForest: 31086.0, totalForestCover: 67793.0, scrub: 0, nonForest: 0, airQualityIndex: 70 },
      { year: 2027, veryDenseForest: 6667.0, moderatelyDenseForest: 30040.0, openForest: 31086.0, totalForestCover: 67793.0, scrub: 0, nonForest: 0, airQualityIndex: 70 },
      { year: 2029, veryDenseForest: 6667.0, moderatelyDenseForest: 30040.0, openForest: 31086.0, totalForestCover: 67793.0, scrub: 0, nonForest: 0, airQualityIndex: 70 },
      { year: 2030, veryDenseForest: 6667.0, moderatelyDenseForest: 30040.0, openForest: 31086.0, totalForestCover: 67793.0, scrub: 0, nonForest: 0, airQualityIndex: 70 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Excellent',
    ranking: 0,
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 8720.0, moderatelyDenseForest: 20650.0, openForest: 21379.0, totalForestCover: 50749.0, scrub: 0, nonForest: 0, airQualityIndex: 114 },
      { year: 2027, veryDenseForest: 8720.0, moderatelyDenseForest: 20650.0, openForest: 21379.0, totalForestCover: 50749.0, scrub: 0, nonForest: 0, airQualityIndex: 114 },
      { year: 2029, veryDenseForest: 8720.0, moderatelyDenseForest: 20650.0, openForest: 21379.0, totalForestCover: 50749.0, scrub: 0, nonForest: 0, airQualityIndex: 114 },
      { year: 2030, veryDenseForest: 8720.0, moderatelyDenseForest: 20650.0, openForest: 21379.0, totalForestCover: 50749.0, scrub: 0, nonForest: 0, airQualityIndex: 114 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'MN',
    name: 'Manipur',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 893.33, moderatelyDenseForest: 6325.67, openForest: 9255.67, totalForestCover: 16474.67, scrub: 0, nonForest: 0, airQualityIndex: 51 },
      { year: 2027, veryDenseForest: 891.9, moderatelyDenseForest: 6314.67, openForest: 9248.95, totalForestCover: 16455.52, scrub: 0, nonForest: 0, airQualityIndex: 51 },
      { year: 2029, veryDenseForest: 890.48, moderatelyDenseForest: 6303.67, openForest: 9242.24, totalForestCover: 16436.38, scrub: 0, nonForest: 0, airQualityIndex: 51 },
      { year: 2030, veryDenseForest: 889.76, moderatelyDenseForest: 6298.17, openForest: 9238.88, totalForestCover: 16426.81, scrub: 0, nonForest: 0, airQualityIndex: 51 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'ML',
    name: 'Meghalaya',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 426.67, moderatelyDenseForest: 9328.33, openForest: 7422.0, totalForestCover: 17177.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2027, veryDenseForest: 425.95, moderatelyDenseForest: 9316.19, openForest: 7412.57, totalForestCover: 17154.71, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2029, veryDenseForest: 425.24, moderatelyDenseForest: 9304.05, openForest: 7403.14, totalForestCover: 17132.43, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2030, veryDenseForest: 424.88, moderatelyDenseForest: 9297.98, openForest: 7398.43, totalForestCover: 17121.29, scrub: 0, nonForest: 0, airQualityIndex: 120 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'MZ',
    name: 'Mizoram',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 174.33, moderatelyDenseForest: 5979.0, openForest: 16064.33, totalForestCover: 22217.67, scrub: 0, nonForest: 0, airQualityIndex: 15 },
      { year: 2027, veryDenseForest: 176.76, moderatelyDenseForest: 5988.0, openForest: 16079.62, totalForestCover: 22244.38, scrub: 0, nonForest: 0, airQualityIndex: 15 },
      { year: 2029, veryDenseForest: 179.19, moderatelyDenseForest: 5997.0, openForest: 16094.9, totalForestCover: 22271.1, scrub: 0, nonForest: 0, airQualityIndex: 15 },
      { year: 2030, veryDenseForest: 180.4, moderatelyDenseForest: 6001.5, openForest: 16102.55, totalForestCover: 22284.45, scrub: 0, nonForest: 0, airQualityIndex: 15 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'NL',
    name: 'Nagaland',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 1259.67, moderatelyDenseForest: 4833.0, openForest: 6446.33, totalForestCover: 12539.0, scrub: 0, nonForest: 0, airQualityIndex: 26 },
      { year: 2027, veryDenseForest: 1255.52, moderatelyDenseForest: 4818.86, openForest: 6435.05, totalForestCover: 12509.43, scrub: 0, nonForest: 0, airQualityIndex: 26 },
      { year: 2029, veryDenseForest: 1251.38, moderatelyDenseForest: 4804.71, openForest: 6423.76, totalForestCover: 12479.86, scrub: 0, nonForest: 0, airQualityIndex: 26 },
      { year: 2030, veryDenseForest: 1249.31, moderatelyDenseForest: 4797.64, openForest: 6418.12, totalForestCover: 12465.07, scrub: 0, nonForest: 0, airQualityIndex: 26 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'OD',
    name: 'Odisha',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 5391.0, moderatelyDenseForest: 21416.67, openForest: 25257.67, totalForestCover: 52065.33, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2027, veryDenseForest: 5394.86, moderatelyDenseForest: 21430.95, openForest: 25271.95, totalForestCover: 52097.76, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2029, veryDenseForest: 5398.71, moderatelyDenseForest: 21445.24, openForest: 25286.24, totalForestCover: 52130.19, scrub: 0, nonForest: 0, airQualityIndex: 0 },
      { year: 2030, veryDenseForest: 5400.64, moderatelyDenseForest: 21452.38, openForest: 25293.38, totalForestCover: 52146.4, scrub: 0, nonForest: 0, airQualityIndex: 0 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'PB',
    name: 'Punjab',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 40.0, moderatelyDenseForest: 803.0, openForest: 1640.0, totalForestCover: 2483.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2027, veryDenseForest: 40.0, moderatelyDenseForest: 803.0, openForest: 1640.0, totalForestCover: 2483.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2029, veryDenseForest: 40.0, moderatelyDenseForest: 803.0, openForest: 1640.0, totalForestCover: 2483.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
      { year: 2030, veryDenseForest: 40.0, moderatelyDenseForest: 803.0, openForest: 1640.0, totalForestCover: 2483.0, scrub: 0, nonForest: 0, airQualityIndex: 120 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Poor',
    ranking: 0,
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 82.67, moderatelyDenseForest: 4422.67, openForest: 12336.0, totalForestCover: 16841.33, scrub: 0, nonForest: 0, airQualityIndex: 129 },
      { year: 2027, veryDenseForest: 83.67, moderatelyDenseForest: 4434.38, openForest: 12363.43, totalForestCover: 16881.48, scrub: 0, nonForest: 0, airQualityIndex: 129 },
      { year: 2029, veryDenseForest: 84.67, moderatelyDenseForest: 4446.1, openForest: 12390.86, totalForestCover: 16921.62, scrub: 0, nonForest: 0, airQualityIndex: 129 },
      { year: 2030, veryDenseForest: 85.17, moderatelyDenseForest: 4451.95, openForest: 12404.57, totalForestCover: 16941.69, scrub: 0, nonForest: 0, airQualityIndex: 129 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'SK',
    name: 'Sikkim',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 500.0, moderatelyDenseForest: 1800.0, openForest: 1100.0, totalForestCover: 3400.0, scrub: 0, nonForest: 0, airQualityIndex: 52 },
      { year: 2027, veryDenseForest: 500.0, moderatelyDenseForest: 1800.0, openForest: 1100.0, totalForestCover: 3400.0, scrub: 0, nonForest: 0, airQualityIndex: 52 },
      { year: 2029, veryDenseForest: 500.0, moderatelyDenseForest: 1800.0, openForest: 1100.0, totalForestCover: 3400.0, scrub: 0, nonForest: 0, airQualityIndex: 52 },
      { year: 2030, veryDenseForest: 500.0, moderatelyDenseForest: 1800.0, openForest: 1100.0, totalForestCover: 3400.0, scrub: 0, nonForest: 0, airQualityIndex: 52 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 3672.0, moderatelyDenseForest: 11026.0, openForest: 11116.0, totalForestCover: 25814.0, scrub: 0, nonForest: 0, airQualityIndex: 75 },
      { year: 2027, veryDenseForest: 3672.0, moderatelyDenseForest: 11026.0, openForest: 11116.0, totalForestCover: 25814.0, scrub: 0, nonForest: 0, airQualityIndex: 75 },
      { year: 2029, veryDenseForest: 3672.0, moderatelyDenseForest: 11026.0, openForest: 11116.0, totalForestCover: 25814.0, scrub: 0, nonForest: 0, airQualityIndex: 75 },
      { year: 2030, veryDenseForest: 3672.0, moderatelyDenseForest: 11026.0, openForest: 11116.0, totalForestCover: 25814.0, scrub: 0, nonForest: 0, airQualityIndex: 75 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'TS',
    name: 'Telangana',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 2902.0, moderatelyDenseForest: 9327.0, openForest: 9810.0, totalForestCover: 22039.0, scrub: 0, nonForest: 0, airQualityIndex: 150 },
      { year: 2027, veryDenseForest: 2902.0, moderatelyDenseForest: 9327.0, openForest: 9810.0, totalForestCover: 22039.0, scrub: 0, nonForest: 0, airQualityIndex: 150 },
      { year: 2029, veryDenseForest: 2902.0, moderatelyDenseForest: 9327.0, openForest: 9810.0, totalForestCover: 22039.0, scrub: 0, nonForest: 0, airQualityIndex: 150 },
      { year: 2030, veryDenseForest: 2902.0, moderatelyDenseForest: 9327.0, openForest: 9810.0, totalForestCover: 22039.0, scrub: 0, nonForest: 0, airQualityIndex: 150 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'TR',
    name: 'Tripura',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 652.0, moderatelyDenseForest: 4766.33, openForest: 2165.67, totalForestCover: 7584.0, scrub: 0, nonForest: 0, airQualityIndex: 34 },
      { year: 2027, veryDenseForest: 651.14, moderatelyDenseForest: 4759.33, openForest: 2158.95, totalForestCover: 7569.43, scrub: 0, nonForest: 0, airQualityIndex: 34 },
      { year: 2029, veryDenseForest: 650.29, moderatelyDenseForest: 4752.33, openForest: 2152.24, totalForestCover: 7554.86, scrub: 0, nonForest: 0, airQualityIndex: 34 },
      { year: 2030, veryDenseForest: 649.86, moderatelyDenseForest: 4748.83, openForest: 2148.88, totalForestCover: 7547.57, scrub: 0, nonForest: 0, airQualityIndex: 34 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 2642.33, moderatelyDenseForest: 4126.67, openForest: 8169.67, totalForestCover: 14938.67, scrub: 0, nonForest: 0, airQualityIndex: 134 },
      { year: 2027, veryDenseForest: 2645.62, moderatelyDenseForest: 4136.67, openForest: 8182.67, totalForestCover: 14964.95, scrub: 0, nonForest: 0, airQualityIndex: 134 },
      { year: 2029, veryDenseForest: 2648.9, moderatelyDenseForest: 4146.67, openForest: 8195.67, totalForestCover: 14991.24, scrub: 0, nonForest: 0, airQualityIndex: 134 },
      { year: 2030, veryDenseForest: 2650.55, moderatelyDenseForest: 4151.67, openForest: 8202.17, totalForestCover: 15004.38, scrub: 0, nonForest: 0, airQualityIndex: 134 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
  {
    id: 'UT',
    name: 'Uttarakhand',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 5052.0, moderatelyDenseForest: 12894.0, openForest: 7416.0, totalForestCover: 25362.0, scrub: 0, nonForest: 0, airQualityIndex: 104 },
      { year: 2027, veryDenseForest: 5052.0, moderatelyDenseForest: 12894.0, openForest: 7416.0, totalForestCover: 25362.0, scrub: 0, nonForest: 0, airQualityIndex: 104 },
      { year: 2029, veryDenseForest: 5052.0, moderatelyDenseForest: 12894.0, openForest: 7416.0, totalForestCover: 25362.0, scrub: 0, nonForest: 0, airQualityIndex: 104 },
      { year: 2030, veryDenseForest: 5052.0, moderatelyDenseForest: 12894.0, openForest: 7416.0, totalForestCover: 25362.0, scrub: 0, nonForest: 0, airQualityIndex: 104 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Good',
    ranking: 0,
  },
  {
    id: 'WB',
    name: 'West Bengal',
    forestData: [],
    projectedData: [
      { year: 2025, veryDenseForest: 2974.0, moderatelyDenseForest: 4162.0, openForest: 9789.31, totalForestCover: 16925.31, scrub: 0, nonForest: 0, airQualityIndex: 72 },
      { year: 2027, veryDenseForest: 2974.0, moderatelyDenseForest: 4162.0, openForest: 9789.37, totalForestCover: 16925.37, scrub: 0, nonForest: 0, airQualityIndex: 72 },
      { year: 2029, veryDenseForest: 2974.0, moderatelyDenseForest: 4162.0, openForest: 9789.44, totalForestCover: 16925.44, scrub: 0, nonForest: 0, airQualityIndex: 72 },
      { year: 2030, veryDenseForest: 2974.0, moderatelyDenseForest: 4162.0, openForest: 9789.47, totalForestCover: 16925.47, scrub: 0, nonForest: 0, airQualityIndex: 72 },
    ],
    deforestationRate: 0,
    conservationStatus: 'Fair',
    ranking: 0,
  },
];


export function generateStateData(
    id: string,
    name: string,
    baseTotalForestCover: number, 
    baseAqi: number,             
    deforestationRate: number = 0, 
    conservationStatus: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent' = 'Good', // <--- CORRECTED TYPE HERE ,
    ranking: number = 0
): StateData {
    const historicalForestData: ForestData[] = [];
    const projectedForestData: ForestData[] = [];

    const currentYear = new Date().getFullYear();

    // Generate mock historical data for the past 3 years (e.g., 2022, 2023, 2024)
    for (let i = -2; i <= 0; i++) {
        const year = currentYear + i;
        const total = baseTotalForestCover * (1 + (Math.random() - 0.5) * 0.02); // Small random variation
        historicalForestData.push({
            year: year,
            veryDenseForest: parseFloat((total * 0.2).toFixed(2)),
            moderatelyDenseForest: parseFloat((total * 0.4).toFixed(2)),
            openForest: parseFloat((total * 0.3).toFixed(2)),
            totalForestCover: parseFloat(total.toFixed(2)),
            scrub: parseFloat((total * 0.05).toFixed(2)),
            nonForest: parseFloat((total * 0.05).toFixed(2)),
            airQualityIndex: baseAqi + Math.floor(Math.random() * 30) - 15, // Some random variation for historical AQI
        });
    }

    // Generate projected data for 2025, 2027, 2029, 2030 (as per your main data)
    const projectedYears = [2025, 2027, 2029, 2030];
    // Calculate a growth/decline factor based on deforestationRate
    // If deforestationRate is 0.1 (0.1%), then factor is 1 - 0.001 = 0.999
    // If deforestationRate is -0.05 (-0.05% -> 0.05% growth), then factor is 1 - (-0.0005) = 1.0005
    const annualChangeFactor = 1 - (deforestationRate / 100);

    // Start projected data from the last known total forest cover
    let currentProjectedTotal = historicalForestData.length > 0
        ? historicalForestData[historicalForestData.length - 1].totalForestCover
        : baseTotalForestCover;

    let currentYearForProjection = historicalForestData.length > 0
        ? historicalForestData[historicalForestData.length - 1].year
        : currentYear -1; 

    projectedYears.forEach(targetYear => {
        const yearsToProject = targetYear - currentYearForProjection;

        
        currentProjectedTotal = currentProjectedTotal * Math.pow(annualChangeFactor, yearsToProject);

        projectedForestData.push({
            year: targetYear,
            veryDenseForest: parseFloat((currentProjectedTotal * 0.2).toFixed(2)),
            moderatelyDenseForest: parseFloat((currentProjectedTotal * 0.4).toFixed(2)),
            openForest: parseFloat((currentProjectedTotal * 0.3).toFixed(2)),
            totalForestCover: parseFloat(currentProjectedTotal.toFixed(2)),
            scrub: parseFloat((currentProjectedTotal * 0.05).toFixed(2)),
            nonForest: parseFloat((currentProjectedTotal * 0.05).toFixed(2)),
            airQualityIndex: baseAqi, // AQI is constant for projected years, as per your static data example
        });
        currentYearForProjection = targetYear; // Update the base year for the next projection
    });

    return {
        id,
        name,
        forestData: historicalForestData,
        projectedData: projectedForestData,
        deforestationRate,
        conservationStatus,
        ranking
    };
}
