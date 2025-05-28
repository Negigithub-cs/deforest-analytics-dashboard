
const FIRMS_API_KEY = import.meta.env.VITE_FIRMS_API_KEY;


console.log("FIRMS_API_KEY loaded:", FIRMS_API_KEY ? "Key loaded successfully" : "Key is undefined/null");


const FIRMS_SENSOR = 'VIIRS_SNPP_NRT';


const INDIA_BOUNDING_BOX = '68.0,8.0,98.0,36.0'; 

const staticFireData = [
    {
        "id": "Punjab",
        "name": "Punjab",
        "riskLevel": "Extreme",
        "vulnerableArea": 46000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 900
    },
    {
        "id": "MadhyaPradesh",
        "name": "MadhyaPradesh",
        "riskLevel": "Extreme",
        "vulnerableArea": 21800,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 416
    },
    {
        "id": "UttarPradesh",
        "name": "UttarPradesh",
        "riskLevel": "Extreme",
        "vulnerableArea": 11200,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 204
    },
    {
        "id": "Haryana",
        "name": "Haryana",
        "riskLevel": "Extreme",
        "vulnerableArea": 6700,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 114
    },
    {
        "id": "Gujarat",
        "name": "Gujarat",
        "riskLevel": "Extreme",
        "vulnerableArea": 6500,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 110
    },
    {
        "id": "Jharkhand",
        "name": "Jharkhand",
        "riskLevel": "High",
        "vulnerableArea": 5500,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 90
    },
    {
        "id": "Rajasthan",
        "name": "Rajasthan",
        "riskLevel": "High",
        "vulnerableArea": 5450,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 89
    },
    {
        "id": "JammuandKashmir",
        "name": "JammuandKashmir",
        "riskLevel": "High",
        "vulnerableArea": 5400,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 88
    },
    {
        "id": "Odisha",
        "name": "Odisha",
        "riskLevel": "High",
        "vulnerableArea": 4850,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 77
    },
    {
        "id": "Chhattisgarh",
        "name": "Chhattisgarh",
        "riskLevel": "High",
        "vulnerableArea": 4050,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 61
    },
    {
        "id": "TamilNadu",
        "name": "TamilNadu",
        "riskLevel": "Moderate",
        "vulnerableArea": 2950,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 39
    },
    {
        "id": "WestBengal",
        "name": "WestBengal",
        "riskLevel": "Moderate",
        "vulnerableArea": 2700,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 34
    },
    {
        "id": "Uttarakhand",
        "name": "Uttarakhand",
        "riskLevel": "Moderate",
        "vulnerableArea": 2200,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 24
    },
    {
        "id": "HimachalPradesh",
        "name": "HimachalPradesh",
        "riskLevel": "Moderate",
        "vulnerableArea": 2150,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 23
    },
    {
        "id": "AndhraPradesh",
        "name": "AndhraPradesh",
        "riskLevel": "Moderate",
        "vulnerableArea": 2100,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 22
    },
    {
        "id": "Telangana",
        "name": "Telangana",
        "riskLevel": "Moderate",
        "vulnerableArea": 2100,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 22
    },
    {
        "id": "Bihar",
        "name": "Bihar",
        "riskLevel": "Moderate",
        "vulnerableArea": 2050,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 21
    },
    {
        "id": "Maharashtra",
        "name": "Maharashtra",
        "riskLevel": "Moderate",
        "vulnerableArea": 1850,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 17
    },
    {
        "id": "ArunachalPradesh",
        "name": "ArunachalPradesh",
        "riskLevel": "Moderate",
        "vulnerableArea": 1700,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 14
    },
    {
        "id": "Assam",
        "name": "Assam",
        "riskLevel": "Low",
        "vulnerableArea": 1400,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 8
    },
    {
        "id": "Karnataka",
        "name": "Karnataka",
        "riskLevel": "Low",
        "vulnerableArea": 1100,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 2
    },
    {
        "id": "NCTofDelhi",
        "name": "NCTofDelhi",
        "riskLevel": "Low",
        "vulnerableArea": 1100,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 2
    },
    {
        "id": "Manipur",
        "name": "Manipur",
        "riskLevel": "Low",
        "vulnerableArea": 1050,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 1
    },
    {
        "id": "AndamanandNicobar",
        "name": "AndamanandNicobar",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Chandigarh",
        "name": "Chandigarh",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "DadraandNagarHaveli",
        "name": "DadraandNagarHaveli",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "DamanandDiu",
        "name": "DamanandDiu",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Goa",
        "name": "Goa",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Kerala",
        "name": "Kerala",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Lakshadweep",
        "name": "Lakshadweep",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Meghalaya",
        "name": "Meghalaya",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Mizoram",
        "name": "Mizoram",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Nagaland",
        "name": "Nagaland",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Puducherry",
        "name": "Puducherry",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Sikkim",
        "name": "Sikkim",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    },
    {
        "id": "Tripura",
        "name": "Tripura",
        "riskLevel": "Low",
        "vulnerableArea": 1000,
        "drySeasonMonths": "Feb-Jun",
        "activeFireCount": 0
    }
];

const mapRegionIdToStateName = (regionId: string): string => {
    switch (regionId.toUpperCase()) { 
        case 'AP': return 'AndhraPradesh';
        case 'AR': return 'ArunachalPradesh';
        case 'AS': return 'Assam';
        case 'BR': return 'Bihar';
        case 'CG': return 'Chhattisgarh';
        case 'GA': return 'Goa';
        case 'GJ': return 'Gujarat';
        case 'HR': return 'Haryana';
        case 'HP': return 'HimachalPradesh';
        case 'JH': return 'Jharkhand';
        case 'JK': return 'JammuandKashmir';
        case 'KA': return 'Karnataka';
        case 'KL': return 'Kerala';
        case 'MP': return 'MadhyaPradesh';
        case 'MH': return 'Maharashtra';
        case 'MN': return 'Manipur';
        case 'ML': return 'Meghalaya';
        case 'MZ': return 'Mizoram';
        case 'NL': return 'Nagaland';
        case 'OD': return 'Odisha';
        case 'PB': return 'Punjab';
        case 'RJ': return 'Rajasthan';
        case 'SK': return 'Sikkim';
        case 'TN': return 'TamilNadu';
        case 'TS': return 'Telangana';
        case 'TR': return 'Tripura';
        case 'UK': return 'Uttarakhand';
        case 'UP': return 'UttarPradesh';
        case 'WB': return 'WestBengal';
        case 'DL': return 'NCTofDelhi';
        case 'AN': return 'AndamanandNicobar';
        case 'CH': return 'Chandigarh';
        case 'DN': return 'DadraandNagarHaveli';
        case 'DD': return 'DamanandDiu';
        case 'LD': return 'Lakshadweep';
        case 'PY': return 'Puducherry';
        default: return regionId; 
    }
};


export const fetchFirmsFireData = async (
    regionId: string,
    days: number = 7
): Promise<Record<string, number>> => {
    
    if (!FIRMS_API_KEY) {
        console.error("FIRMS API Key (VITE_FIRMS_API_KEY) is not set in environment variables!");
        throw new Error("FIRMS API Key is missing. Please set VITE_FIRMS_API_KEY in your .env file.");
    }

    
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_API_KEY}/${FIRMS_SENSOR}/${INDIA_BOUNDING_BOX}/${days}`;

    console.log("Simulating FIRMS data fetch from URL:", url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("FIRMS API Error Response (during simulated fetch):", errorText);
            console.warn("FIRMS API call failed or returned an error. Using static fire data as a fallback for all counts.");
        } else {
            const csvText = await response.text();
            if (csvText.startsWith("Error") || csvText.trim() === '') {
                console.warn("FIRMS API returned an error or empty data for this query. Using static fire data for counts.");
            }
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        const fireCounts: Record<string, number> = {};

        if (regionId.toUpperCase() === 'IN') {
            staticFireData.forEach(stateData => {
                fireCounts[stateData.name] = stateData.activeFireCount;
            });
        } else {
            const stateName = mapRegionIdToStateName(regionId);
            const stateData = staticFireData.find(s => s.name === stateName || s.id.toUpperCase() === regionId.toUpperCase());

            let totalFiresForState = stateData ? stateData.activeFireCount : 0;

            if (totalFiresForState === 0) {
                console.warn(`No specific static fire data found for '${regionId}' or activeFireCount is 0. Simulating small counts for districts.`);
                totalFiresForState = 5 + Math.floor(Math.random() * 15);
            }

            const districtsForState = {
                'MadhyaPradesh': ['Balaghat', 'Betul', 'Chhindwara', 'Dindori', 'Mandla', 'Seoni'],
                'Uttarakhand': ['Almora', 'Chamoli', 'Nainital', 'Pauri Garhwal', 'Tehri Garhwal', 'Rudraprayag'],
                'HimachalPradesh': ['Chamba', 'Kangra', 'Kullu', 'Mandi', 'Shimla', 'Kinnaur'],
                'Chhattisgarh': ['Bastar', 'Kanker', 'Sukma', 'Raipur', 'Dhamtari', 'Rajnandgaon'],
                'Odisha': ['Angul', 'Mayurbhanj', 'Sundargarh', 'Koraput', 'Kalahandi', 'Gajapati'],
                'Punjab': ['Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar', 'Gurdaspur'],
                'UttarPradesh': ['Lakhimpur Kheri', 'Pilibhit', 'Siddharthnagar', 'Bahraich', 'Shravasti'],
                'Haryana': ['Ambala', 'Yamunanagar', 'Kurukshetra', 'Karnal'],
                'Gujarat': ['Dangs', 'Valsad', 'Tapi', 'Navsari'],
                'Jharkhand': ['Palamu', 'Garhwa', 'Chatra', 'Latehar'],
                'Rajasthan': ['Udaipur', 'Chittorgarh', 'Sirohi', 'Pali'],
                'JammuandKashmir': ['Rajouri', 'Poonch', 'Doda', 'Kupwara'],
                'TamilNadu': ['Dindigul', 'Theni', 'Coimbatore', 'Erode'],
                'WestBengal': ['Bankura', 'Purulia', 'West Medinipur', 'Darjeeling'],
                'AndhraPradesh': ['Chittoor', 'Kadapa', 'Kurnool', 'Nellore'],
                'Telangana': ['Adilabad', 'Kothagudem', 'Mahabubnagar', 'Nizamabad'],
                'Bihar': ['West Champaran', 'East Champaran', 'Rohtas', 'Kaimur'],
                'Maharashtra': ['Gadchiroli', 'Chandrapur', 'Nagpur', 'Nashik'],
                'ArunachalPradesh': ['Changlang', 'Tirap', 'Papum Pare', 'East Siang'],
                'Assam': ['Karbi Anglong', 'Dima Hasao', 'Goalpara', 'Cachar'],
                'Karnataka': ['Chikmagalur', 'Kodagu', 'Shivamogga', 'Uttara Kannada'],
                'NCTofDelhi': ['North West Delhi', 'South West Delhi', 'Central Delhi'],
                'Manipur': ['Chandel', 'Ukhrul', 'Tamenglong'],
            };

            const selectedDistricts = districtsForState[stateName] || ['District A', 'District B', 'District C'];

            let remainingFires = totalFiresForState;
            for (let i = 0; i < selectedDistricts.length; i++) {
                let fireCount = 0;
                if (remainingFires > 0) {
                    if (i === 0 && selectedDistricts.length > 1) {
                        fireCount = Math.floor(remainingFires * (0.3 + Math.random() * 0.3));
                    } else {
                        fireCount = Math.floor(remainingFires * (Math.random() * 0.2 + 0.05));
                    }
                }
                fireCounts[selectedDistricts[i]] = Math.max(0, fireCount);
                remainingFires -= fireCount;
            }
            if (remainingFires > 0 && selectedDistricts.length > 0) {
                fireCounts[selectedDistricts[0]] += remainingFires;
            }
        }

        return fireCounts;

    } catch (error) {
        console.error("Error fetching FIRMS data or processing fallback:", error);
        const fireCounts: Record<string, number> = {};
        if (regionId.toUpperCase() === 'IN') {
            staticFireData.forEach(stateData => {
                fireCounts[stateData.name] = stateData.activeFireCount;
            });
        } else {
            const stateName = mapRegionIdToStateName(regionId);
            const stateData = staticFireData.find(s => s.name === stateName || s.id.toUpperCase() === regionId.toUpperCase());
            let totalFiresForState = stateData ? stateData.activeFireCount : 0;
            if (totalFiresForState === 0) {
                totalFiresForState = 5 + Math.floor(Math.random() * 10);
            }
            fireCounts[stateName || regionId] = totalFiresForState;
        }
        return fireCounts;
    }
};