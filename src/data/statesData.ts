import { ForestData, StateData } from './types/forestTypes'; // Assuming forestTypes.ts is in src/types/

/**
 * Generates mock StateData with hypothetical forest cover and AQI predictions.
 * This function can be used for creating sample data for testing or demonstration.
 *
 * @param id The unique ID of the state (e.g., 'DL', 'UT').
 * @param name The full name of the state (e.g., 'Delhi', 'Uttarakhand').
 * @param baseTotalForestCover A base value for the total forest cover (in sq km) to start calculations from.
 * @param baseAqi The base Air Quality Index (AQI) to use for projected years.
 * @param deforestationRate The annual change rate for forest cover (positive for decrease, negative for increase). Default is 0.
 * @param conservationStatus The conservation status of the state. Default is 'Good'.
 * @param ranking The ranking of the state. Default is 0.
 * @returns A StateData object with generated mock historical and projected data.
 */
export function generateStateMockData(
    id: string,
    name: string,
    baseTotalForestCover: number, // e.g., 200 for Delhi, 25000 for Uttarakhand
    baseAqi: number,             // e.g., 95 for Delhi, 104 for Uttarakhand
    deforestationRate: number = 0, // e.g., 0.1 for 0.1% decrease, -0.05 for 0.05% increase
    conservationStatus: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent' = 'Good',
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
        : currentYear -1; // Assuming projection starts slightly after last historical

    projectedYears.forEach(targetYear => {
        // Calculate the number of years since the last projection point or historical data
        const yearsToProject = targetYear - currentYearForProjection;

        // Apply the annual change factor for each year
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

// Map for AQI data, using the IDs from your previously generated aqi_data.json
const aqiDataMap: { [key: string]: number } = {
  "AN": 0,    // Andaman & Nicobar Islands
  "CH": 103,  // Chandigarh
  "DNH_DD": 144, // Dadra and Nagar Haveli and Daman & Diu
  "DL": 95,   // Delhi
  "JK": 107,  // Jammu & Kashmir
  "LA": 13,   // Ladakh
  "LD": 0,    // Lakshadweep
  "PY": 44,   // Puducherry
  "AP": 0,    // Andhra Pradesh
  "AR": 70,   // Arunachal Pradesh
  "AS": 42,   // Assam
  "BR": 124,  // Bihar
  "CT": 80,   // Chhattisgarh
  "GA": 0,    // Goa
  "GJ": 120,  // Gujarat
  "HR": 144,  // Haryana
  "HP": 0,    // Himachal Pradesh
  "JH": 0,    // Jharkhand
  "KA": 36,   // Karnataka
  "KL": 19,   // Kerala
  "MP": 70,   // Madhya Pradesh
  "MH": 114,  // Maharashtra
  "MN": 51,   // Manipur
  "ML": 120,  // Meghalaya
  "MZ": 15,   // Mizoram
  "NL": 26,   // Nagaland
  "OD": 0,    // Odisha
  "PB": 120,  // Punjab
  "RJ": 129,  // Rajasthan
  "SK": 52,   // Sikkim
  "TN": 75,   // Tamil Nadu
  "TS": 150,  // Telangana
  "TR": 34,   // Tripura
  "UP": 134,  // Uttar Pradesh
  "UT": 104,  // Uttarakhand
  "WB": 72
};

// Helper function to get AQI based on the ID, handling discrepancies
const getAqiForId = (id: string): number => {
    // Handle ID discrepancies between your calls and the aqiDataMap
    if (id === 'DN') return aqiDataMap['DNH_DD'];
    if (id === 'CG') return aqiDataMap['CT'];
    if (id === 'UK') return aqiDataMap['UT'];
    return aqiDataMap[id] !== undefined ? aqiDataMap[id] : 0; // Default to 0 if not found
};

// Create mock data for Indian states
const unionTerritoriesData: StateData[] = [
  // Corrected order: id, name, baseTotalForestCover, baseAqi, deforestationRate, conservationStatus, ranking
  generateStateMockData('AN', 'Andaman and Nicobar Islands', 8000, getAqiForId('AN'), 0.2, 'Good', 3),
  generateStateMockData('CH', 'Chandigarh', 114, getAqiForId('CH'), 0.1, 'Fair', 15),
  generateStateMockData('DNH_DD', 'Dadra and Nagar Haveli and Daman and Diu', 500, getAqiForId('DNH_DD'), 0.3, 'Good', 7),
  generateStateMockData('DL', 'Delhi', 30, getAqiForId('DL'), 1.5, 'Poor', 25),
  generateStateMockData('JK', 'Jammu and Kashmir', 15400, getAqiForId('JK'), 0.6, 'Fair', 12),
  generateStateMockData('LA', 'Ladakh', 45000, getAqiForId('LA'), 0.1, 'Excellent', 2),
  generateStateMockData('LD', 'Lakshadweep', 12, getAqiForId('LD'), 0.05, 'Excellent', 1),
  generateStateMockData('PY', 'Puducherry', 480, getAqiForId('PY'), 0.2, 'Good', 6),
];

export const statesData: StateData[] = [
  // Corrected order: id, name, baseTotalForestCover, baseAqi, deforestationRate, conservationStatus, ranking
  generateStateMockData('AP', 'Andhra Pradesh', 28000, getAqiForId('AP'), 0.6, 'Fair', 13),
  generateStateMockData('AR', 'Arunachal Pradesh', 67000, getAqiForId('AR'), 0.3, 'Good', 4),
  generateStateMockData('AS', 'Assam', 28500, getAqiForId('AS'), 0.8, 'Fair', 12),
  generateStateMockData('BR', 'Bihar', 7700, getAqiForId('BR'), 1.2, 'Poor', 21),
  generateStateMockData('CT', 'Chhattisgarh', 55700, getAqiForId('CT'), 0.7, 'Good', 5),
  generateStateMockData('GA', 'Goa', 2240, getAqiForId('GA'), 0.4, 'Good', 7),
  generateStateMockData('GJ', 'Gujarat', 14600, getAqiForId('GJ'), 0.9, 'Fair', 15),
  generateStateMockData('HR', 'Haryana', 1600, getAqiForId('HR'), 1.5, 'Poor', 22),
  generateStateMockData('HP', 'Himachal Pradesh', 15100, getAqiForId('HP'), 0.3, 'Excellent', 3),
  generateStateMockData('JH', 'Jharkhand', 23600, getAqiForId('JH'), 1.0, 'Fair', 14),
  generateStateMockData('KA', 'Karnataka', 38300, getAqiForId('KA'), 0.6, 'Good', 8),
  generateStateMockData('KL', 'Kerala', 21200, getAqiForId('KL'), 0.2, 'Excellent', 2),
  generateStateMockData('MP', 'Madhya Pradesh', 77700, getAqiForId('MP'), 0.8, 'Fair', 11),
  generateStateMockData('MH', 'Maharashtra', 50700, getAqiForId('MH'), 0.7, 'Fair', 10),
  generateStateMockData('MN', 'Manipur', 17400, getAqiForId('MN'), 0.9, 'Fair', 16),
  generateStateMockData('ML', 'Meghalaya', 17100, getAqiForId('ML'), 0.5, 'Good', 6),
  generateStateMockData('MZ', 'Mizoram', 18200, getAqiForId('MZ'), 1.3, 'Poor', 20),
  generateStateMockData('NL', 'Nagaland', 12500, getAqiForId('NL'), 0.7, 'Fair', 9),
  generateStateMockData('OD', 'Odisha', 51600, getAqiForId('OD'), 0.4, 'Good', 7),
  generateStateMockData('PB', 'Punjab', 1800, getAqiForId('PB'), 1.8, 'Critical', 25),
  generateStateMockData('RJ', 'Rajasthan', 16600, getAqiForId('RJ'), 1.0, 'Poor', 19),
  generateStateMockData('SK', 'Sikkim', 3400, getAqiForId('SK'), 0.1, 'Excellent', 1),
  generateStateMockData('TN', 'Tamil Nadu', 26300, getAqiForId('TN'), 0.5, 'Good', 8),
  generateStateMockData('TS', 'Telangana', 21200, getAqiForId('TS'), 0.9, 'Fair', 17),
  generateStateMockData('TR', 'Tripura', 7700, getAqiForId('TR'), 1.1, 'Poor', 23),
  generateStateMockData('UP', 'Uttar Pradesh', 14800, getAqiForId('UP'), 1.4, 'Poor', 24),
  generateStateMockData('UT', 'Uttarakhand', 24500, getAqiForId('UT'), 0.4, 'Good', 5),
  generateStateMockData('WB', 'West Bengal', 16800, getAqiForId('WB'), 1.0, 'Poor', 18),
  ...unionTerritoriesData
];
