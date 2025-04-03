
import { StateData } from './types/forestTypes';
import { generateStateMockData } from './utils/mockDataGenerator';

// Create mock data for Indian states
const unionTerritoriesData: StateData[] = [
  generateStateMockData('Andaman and Nicobar Islands', 'AN', 8000, 0.2, 'Good', 3),
  generateStateMockData('Chandigarh', 'CH', 114, 0.1, 'Fair', 15),
  generateStateMockData('Dadra and Nagar Haveli and Daman and Diu', 'DN', 500, 0.3, 'Good', 7),
  generateStateMockData('Delhi', 'DL', 30, 1.5, 'Poor', 25),
  generateStateMockData('Jammu and Kashmir', 'JK', 15400, 0.6, 'Fair', 12),
  generateStateMockData('Ladakh', 'LA', 45000, 0.1, 'Excellent', 2),
  generateStateMockData('Lakshadweep', 'LD', 12, 0.05, 'Excellent', 1),
  generateStateMockData('Puducherry', 'PY', 480, 0.2, 'Good', 6),
];

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
  ...unionTerritoriesData
];
