
import { getAllStates } from '@/data/mockData';
import { stateIdToName } from '@/components/Map/utils/stateMappings';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  category: 'conservation' | 'policy' | 'disaster' | 'research';
}

export interface ClimateRecord {
  stateId: string;
  stateName: string;
  temperature: number;
  rainfall: number;
  droughts: number;
  floods: number;
  heatwaves: number;
}

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

export const generateNewsData = (): NewsItem[] => {
  const conservationNews: NewsItem[] = [
    {
      id: 'news-1',
      title: 'New Reforestation Program Launched in Western Ghats',
      summary: 'The Ministry of Environment and Forests has announced a major reforestation initiative targeting 10,000 hectares in the Western Ghats over the next five years.',
      source: 'The Hindu',
      date: '2025-03-21',
      url: 'https://www.thehindu.com/sci-tech/energy-and-environment/western-ghats-reforestation-programme-to-be-launched/article67925692.ece',
      category: 'conservation'
    },
    {
      id: 'news-2',
      title: 'Local Communities Lead Conservation Efforts in Northeast',
      summary: 'Indigenous communities in Arunachal Pradesh are spearheading forest protection efforts, resulting in a 15% increase in forest cover in the region.',
      source: 'Down To Earth',
      date: '2025-03-15',
      url: 'https://www.downtoearth.org.in/news/forests/local-communities-conservation-northeast-india-success-story-89734',
      category: 'conservation'
    }
  ];
  
  const policyNews: NewsItem[] = [
    {
      id: 'news-3',
      title: 'Forest Conservation Act Amendment Passed',
      summary: 'Parliament has passed amendments to the Forest Conservation Act, introducing stricter penalties for illegal deforestation and providing greater protection for old-growth forests.',
      source: 'The Economic Times',
      date: '2025-03-25',
      url: 'https://economictimes.indiatimes.com/news/india/forest-conservation-act-amendments-parliament-approval/articleshow/94733721.cms',
      category: 'policy'
    },
    {
      id: 'news-4',
      title: 'Supreme Court Orders Buffer Zones Around Protected Forests',
      summary: 'In a landmark judgment, the Supreme Court has mandated the creation of buffer zones extending 5km around all protected forest areas to prevent encroachment.',
      source: 'Indian Express',
      date: '2025-03-18',
      url: 'https://indianexpress.com/article/india/supreme-court-buffer-zones-protected-forests-landmark-judgment-8497635/',
      category: 'policy'
    }
  ];
  
  const disasterNews: NewsItem[] = [
    {
      id: 'news-5',
      title: 'Forest Fires in Uttarakhand Under Control After Week-Long Battle',
      summary: 'After a coordinated effort from forest departments and disaster response teams, the major forest fires that ravaged parts of Uttarakhand have been brought under control.',
      source: 'Hindustan Times',
      date: '2025-03-27',
      url: 'https://www.hindustantimes.com/cities/dehradun-news/uttarakhand-forest-fires-under-control-after-week-long-effort-101678938475020.html',
      category: 'disaster'
    },
    {
      id: 'news-6',
      title: 'Landslides in Western Ghats Linked to Deforestation',
      summary: 'A new study has directly linked recent devastating landslides in the Western Ghats to deforestation, showing how forest loss undermined soil stability in the affected areas.',
      source: 'Times of India',
      date: '2025-03-22',
      url: 'https://timesofindia.indiatimes.com/india/study-links-western-ghats-landslides-to-deforestation/articleshow/95873622.cms',
      category: 'disaster'
    }
  ];
  
  const researchNews: NewsItem[] = [
    {
      id: 'news-7',
      title: 'New Tree Species Discovered in Eastern Himalayas',
      summary: 'Scientists from the Botanical Survey of India have discovered a previously unknown tree species in the remote forests of Arunachal Pradesh, highlighting the biodiversity of the region.',
      source: 'Science Daily India',
      date: '2025-03-20',
      url: 'https://www.sciencedaily.com/releases/2025/03/250320134523.htm',
      category: 'research'
    },
    {
      id: 'news-8',
      title: 'Satellite Data Shows Forest Recovery in Central India',
      summary: 'Analysis of satellite imagery over the past decade reveals surprising forest recovery in parts of central India, attributed to successful community-based conservation programs.',
      source: 'Nature India',
      date: '2025-03-14',
      url: 'https://www.nature.com/nindia/250314-1/full/nindia.2025.34.html',
      category: 'research'
    }
  ];
  
  return [...conservationNews, ...policyNews, ...disasterNews, ...researchNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getClimateData = (stateId: string) => {
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
