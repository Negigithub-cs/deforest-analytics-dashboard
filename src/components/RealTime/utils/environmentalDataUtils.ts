// src/utils/environmentalDataUtils.ts

import { getAllStates } from '@/data/mainData';
// Ensure stateMappings is correctly imported and has stateIdToName for country names
import { stateIdToName } from '@/components/Map/utils/stateMappings';

// --- News API Interfaces ---
export interface NewsSource {
    id: string | null;
    name: string;
}

export interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string; // ISO 8601 format
    content: string | null;
}

// Your existing NewsItem interface, adapted to map from NewsArticle
export interface NewsItem {
    id: string; // Can be article.url or generated
    title: string;
    summary: string; // Maps to description or content
    source: string; // Maps to source.name
    date: string; // Maps to publishedAt
    url: string;
    // NewsAPI.org does not provide specific categories like yours.
    // You can add logic to categorize based on keywords in title/summary if needed,
    // or just use a generic 'Environment' category for fetched news.
    category: 'conservation' | 'policy' | 'disaster' | 'research' | 'Environment';
}

// --- Climate Data Interfaces ---
export interface ClimateRecord {
    stateId: string;
    stateName: string;
    temperature: number;
    rainfall: number;
    droughts: number;
    floods: number;
    heatwaves: number;
}

// --- District Names Utility ---
export const getDistrictNames = (stateId: string): string[] => {
    const districtMap: Record<string, string[]> = {
        'AP': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore'],
        'AR': ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi'],
        'AS': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang'],
        'BR': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur'],
        'CT': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur'],
        'GA': ['North Goa', 'South Goa'],
        'GJ': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar'],
        'HR': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar'],
        'HP': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti'],
        'JH': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa'],
        'KA': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar'],
        'KL': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam'],
        'MP': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul'],
        'MH': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana'],
        'IN': [], // No districts for overall
    };

    return districtMap[stateId] || ['Central', 'Eastern', 'Northern', 'Southern', 'Western'];
};

// --- Climate Data Generators (remain as mock for now) ---
export const generateStateClimateData = (): ClimateRecord[] => {
    const states = getAllStates().filter(state => state.id !== 'IN');

    return states.map(state => ({
        stateId: state.id,
        stateName: state.name,
        temperature: 20 + Math.random() * 20, // 20-40°C
        rainfall: 500 + Math.random() * 2000, // 500-2500mm
        droughts: Math.floor(Math.random() * 5),
        floods: Math.floor(Math.random() * 5),
        heatwaves: Math.floor(Math.random() * 6)
    }));
};

export const generateDistrictClimateData = (stateId: string): ClimateRecord[] => {
    const districts = getDistrictNames(stateId);

    return districts.map(district => ({
        stateId,
        stateName: district,
        temperature: 20 + Math.random() * 20, // 20-40°C
        rainfall: 500 + Math.random() * 2000, // 500-2500mm
        droughts: Math.floor(Math.random() * 5),
        floods: Math.floor(Math.random() * 5),
        heatwaves: Math.floor(Math.random() * 6)
    }));
};

// --- News API Integration ---
// Access API key from environment variables
// For Create React App: process.env.REACT_APP_NEWS_API_KEY
// For Vite: import.meta.env.VITE_NEWS_API_KEY
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetches environmental news from NewsAPI.org.
 * Filters by keywords and optionally by country.
 * @param query Keywords to search for.
 * @param countryCode 2-letter ISO 3166-1 code (e.g., 'in' for India, 'us' for United States).
 * If null, it will perform a global search using the 'everything' endpoint.
 * @returns A Promise that resolves to an array of NewsItem.
 */
// This is the correct way for an async function to declare its return type as a Promise
export const fetchNewsData = async (
    query: string = 'climate change OR environment OR pollution OR conservation',
    countryCode: string | null = 'in' // Defaulting to 'in' for India
): Promise<NewsItem[]> => { // <-- This '=> {' correctly starts the function body
    // ... rest of your function code here
    if (!NEWS_API_KEY) {
        console.error("NewsAPI Key is not set in environment variables!");
        return [];
    }

    try {
        let effectiveQuery = query;
        // ... (rest of the logic for constructing effectiveQuery and URL)
        const url = `...`; // Your constructed URL

        console.log("Fetching news from URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("NewsAPI Error Response:", errorData);
            throw new Error(`NewsAPI error: ${errorData.message || 'Unknown error occurred.'}`);
        }

        const data = await response.json();
        console.log("NewsAPI Raw Data:", data);

        if (data.articles) {
            return data.articles.map((article: NewsArticle) => ({
                id: article.url || `${article.publishedAt}-${article.title}`,
                title: article.title || 'Untitled Article',
                summary: article.description || article.content?.substring(0, 150) + '...' || 'No summary available.',
                source: article.source.name || 'Unknown Source',
                date: article.publishedAt,
                url: article.url,
                category: 'Environment'
            })).filter(item => item.url && item.title && item.summary);
        }
        return [];
    } catch (error) {
        console.error("Error fetching news from NewsAPI:", error);
        return [];
    }
};

export const getClimateData = (stateId: string) => {
    // This part remains unchanged as it uses mock data generators
    if (stateId === 'IN') {
        const allStateData = generateStateClimateData();

        const topTemperatureStates = [...allStateData].sort((a, b) => b.temperature - a.temperature).slice(0, 5);
        const topRainfallStates = [...allStateData].sort((a, b) => b.rainfall - a.rainfall).slice(0, 5);
        const topExtremeStates = [...allStateData].sort((a, b) => {
            const aTotal = a.droughts + a.floods + a.heatwaves;
            const bTotal = b.droughts + b.floods + b.heatwaves;
            return bTotal - aTotal;
        }).slice(0, 5);

        return {
            isState: true,
            temperatureData: topTemperatureStates,
            rainfallData: topRainfallStates,
            extremeData: topExtremeStates,
            current: {
                temperature: {
                    current: 28.5,
                    anomaly: 1.2,
                    trend: '+1.2°C per decade'
                },
                rainfall: {
                    current: 1150,
                    anomaly: -7.3,
                    trend: '-8% per decade'
                },
                extremeEvents: {
                    droughts: 4,
                    floods: 7,
                    heatwaves: 9
                }
            }
        };
    } else {
        const districtData = generateDistrictClimateData(stateId);

        const topTemperatureDistricts = [...districtData].sort((a, b) => b.temperature - a.temperature).slice(0, 5);
        const topRainfallDistricts = [...districtData].sort((a, b) => b.rainfall - a.rainfall).slice(0, 5);
        const topExtremeDistricts = [...districtData].sort((a, b) => {
            const aTotal = a.droughts + a.floods + a.heatwaves;
            const bTotal = b.droughts + b.floods + b.heatwaves;
            return bTotal - aTotal;
        }).slice(0, 5);

        return {
            isState: false,
            temperatureData: topTemperatureDistricts,
            rainfallData: topRainfallDistricts,
            extremeData: topExtremeDistricts,
            current: {
                temperature: {
                    current: 25 + Math.random() * 10,
                    anomaly: 0.8 + Math.random() * 1.2,
                    trend: '+1.2°C per decade'
                },
                rainfall: {
                    current: 1200 + Math.random() * 800,
                    anomaly: -5 - Math.random() * 10,
                    trend: '-8% per decade'
                },
                extremeEvents: {
                    droughts: Math.floor(Math.random() * 3) + 1,
                    floods: Math.floor(Math.random() * 4) + 2,
                    heatwaves: Math.floor(Math.random() * 5) + 3
                }
            }
        };
    }
};