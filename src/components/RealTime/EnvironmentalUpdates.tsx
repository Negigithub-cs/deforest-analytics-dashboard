
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Thermometer, Wind, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStateById } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface AQIReading {
  id: string;
  location: string;
  value: number;
  category: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  timestamp: string;
  primaryPollutant: string;
}

interface TemperatureData {
  id: string;
  location: string;
  current: number;
  min: number;
  max: number;
  humidity: number;
  timestamp: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  category: 'deforestation' | 'climate' | 'conservation' | 'policy';
  url: string;
}

interface ClimateFactorData {
  factor: string;
  impact: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  mainContributors: string[];
  description: string;
}

interface DistrictData {
  name: string;
  state: string;
  forestChange: number;
  primaryCause: string;
  year: number;
}

const EnvironmentalUpdates: React.FC<{ stateId: string }> = ({ stateId }) => {
  const [activeTab, setActiveTab] = useState('aqi');
  const [aqiData, setAqiData] = useState<AQIReading[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [climateFactors, setClimateFactors] = useState<ClimateFactorData[]>([]);
  const [temperatureTrend, setTemperatureTrend] = useState<any[]>([]);
  const [topDistrictsLoss, setTopDistrictsLoss] = useState<DistrictData[]>([]);
  const [topDistrictsGain, setTopDistrictsGain] = useState<DistrictData[]>([]);
  
  const stateName = getStateById(stateId)?.name || 'India';
  
  useEffect(() => {
    // Mock data fetching - in a real app, these would be API calls
    // Generate mock data based on the state
    generateMockData(stateId);
  }, [stateId]);
  
  const generateMockData = (stateId: string) => {
    // Mock AQI readings
    const mockAqiData: AQIReading[] = [
      {
        id: '1',
        location: `${stateId === 'IN' ? 'Delhi' : stateName} Urban Center`,
        value: 165,
        category: 'unhealthy',
        timestamp: new Date().toISOString(),
        primaryPollutant: 'PM2.5',
      },
      {
        id: '2',
        location: `${stateId === 'IN' ? 'Mumbai' : stateName} Coastal Area`,
        value: 85,
        category: 'moderate',
        timestamp: new Date().toISOString(),
        primaryPollutant: 'O3',
      },
      {
        id: '3',
        location: `${stateId === 'IN' ? 'Bengaluru' : stateName} Industrial Zone`,
        value: 45,
        category: 'good',
        timestamp: new Date().toISOString(),
        primaryPollutant: 'NO2',
      },
    ];
    
    // Mock temperature data
    const mockTemperatureData: TemperatureData[] = [
      {
        id: '1',
        location: `${stateId === 'IN' ? 'Chennai' : stateName} Urban Center`,
        current: 32,
        min: 26,
        max: 35,
        humidity: 78,
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        location: `${stateId === 'IN' ? 'Jaipur' : stateName} Desert Region`,
        current: 38,
        min: 24,
        max: 42,
        humidity: 35,
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        location: `${stateId === 'IN' ? 'Shimla' : stateName} Highland Area`,
        current: 22,
        min: 15,
        max: 25,
        humidity: 65,
        timestamp: new Date().toISOString(),
      },
    ];
    
    // Mock news items with real URLs
    const mockNewsItems: NewsItem[] = [
      {
        id: '1',
        title: `New Conservation Efforts Launched in ${stateId === 'IN' ? 'Western Ghats' : stateName}`,
        source: 'Environmental Times',
        date: new Date().toLocaleDateString(),
        summary: 'Government announces major funding for forest restoration and conservation projects to combat rising deforestation rates.',
        category: 'conservation',
        url: 'https://www.downtoearth.org.in/news/forests',
      },
      {
        id: '2',
        title: `Temperature Rise Affecting Biodiversity in ${stateId === 'IN' ? 'Northeast India' : stateName}`,
        source: 'Climate Science Journal',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        summary: 'Research shows concerning patterns of habitat loss due to changing temperature patterns, threatening endemic species.',
        category: 'climate',
        url: 'https://www.carbonbrief.org/state-of-the-climate-how-the-world-warmed-in-2019/',
      },
      {
        id: '3',
        title: `Illegal Logging Operations Discovered in ${stateId === 'IN' ? 'Central India' : stateName} Forests`,
        source: 'Forest Watch',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        summary: 'Authorities have uncovered a major illegal logging operation affecting protected forest areas, leading to arrests of multiple individuals.',
        category: 'deforestation',
        url: 'https://www.globalforestwatch.org/',
      },
      {
        id: '4',
        title: `New Climate Policy Framework Adopted by ${stateId === 'IN' ? 'Indian Government' : stateName + ' Administration'}`,
        source: 'Policy Digest',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        summary: 'Regional government implements stringent regulations on industrial emissions and forest management practices.',
        category: 'policy',
        url: 'https://www.moef.gov.in/en/environment/forest-and-climate-change/forest-conservation',
      },
      {
        id: '5',
        title: `Community-Led Reforestation Initiative Shows Promise in ${stateId === 'IN' ? 'Tribal Regions' : stateName}`,
        source: 'Sustainability Now',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        summary: 'Local communities partner with NGOs to restore degraded forest land, creating sustainable livelihoods.',
        category: 'conservation',
        url: 'https://www.worldagroforestry.org/story/forestry-news-india',
      },
    ];

    // Climate change factors data
    const mockClimateFactors: ClimateFactorData[] = [
      {
        factor: 'Deforestation',
        impact: 27,
        trend: 'decreasing',
        mainContributors: ['Madhya Pradesh', 'Chhattisgarh', 'Maharashtra'],
        description: 'Clearing forests for agriculture and development releases stored carbon and reduces future carbon sequestration capacity.'
      },
      {
        factor: 'Industrial Emissions',
        impact: 31,
        trend: 'increasing',
        mainContributors: ['Gujarat', 'Maharashtra', 'Tamil Nadu'],
        description: 'Manufacturing, power generation, and chemical production emit significant greenhouse gases.'
      },
      {
        factor: 'Transportation',
        impact: 18,
        trend: 'increasing',
        mainContributors: ['Delhi', 'Maharashtra', 'Karnataka'],
        description: 'Vehicle emissions contribute to both greenhouse gas levels and particulate matter pollution.'
      },
      {
        factor: 'Agricultural Practices',
        impact: 14,
        trend: 'stable',
        mainContributors: ['Punjab', 'Haryana', 'Uttar Pradesh'],
        description: 'Rice cultivation, livestock farming, and crop burning release methane and other greenhouse gases.'
      },
      {
        factor: 'Waste Management',
        impact: 10,
        trend: 'increasing',
        mainContributors: ['Maharashtra', 'Delhi', 'West Bengal'],
        description: 'Improper waste disposal and landfills generate methane, a potent greenhouse gas.'
      }
    ];

    // Temperature trend data over 10 years
    const mockTemperatureTrend = Array.from({ length: 10 }, (_, i) => {
      const year = 2015 + i;
      // Gradually increasing temperatures with some realistic fluctuation
      const baseMax = 35 + (i * 0.15) + (Math.random() * 0.8 - 0.4);
      const baseMin = 23 + (i * 0.1) + (Math.random() * 0.6 - 0.3);
      
      return {
        year,
        averageMax: baseMax,
        averageMin: baseMin,
        extremeMax: baseMax + 3 + (Math.random() * 2),
        extremeMin: baseMin - 3 - (Math.random() * 2)
      };
    });

    // Top districts with forest loss
    const mockTopDistrictsLoss: DistrictData[] = [
      {
        name: 'Singrauli',
        state: 'Madhya Pradesh',
        forestChange: -14.3,
        primaryCause: 'Mining expansion',
        year: 2023
      },
      {
        name: 'Raigarh',
        state: 'Chhattisgarh',
        forestChange: -12.7,
        primaryCause: 'Industrial development',
        year: 2023
      },
      {
        name: 'Dantewada',
        state: 'Chhattisgarh',
        forestChange: -9.5,
        primaryCause: 'Mining operations',
        year: 2023
      },
      {
        name: 'East Godavari',
        state: 'Andhra Pradesh',
        forestChange: -8.2,
        primaryCause: 'Agricultural expansion',
        year: 2023
      },
      {
        name: 'Khordha',
        state: 'Odisha',
        forestChange: -7.6,
        primaryCause: 'Urban development',
        year: 2023
      }
    ];

    // Top districts with forest gain
    const mockTopDistrictsGain: DistrictData[] = [
      {
        name: 'Chamoli',
        state: 'Uttarakhand',
        forestChange: 8.7,
        primaryCause: 'Conservation efforts',
        year: 2023
      },
      {
        name: 'Anantapur',
        state: 'Andhra Pradesh',
        forestChange: 6.9,
        primaryCause: 'Reforestation programs',
        year: 2023
      },
      {
        name: 'Leh',
        state: 'Ladakh',
        forestChange: 5.8,
        primaryCause: 'Climate adaptation initiatives',
        year: 2023
      },
      {
        name: 'Lahaul and Spiti',
        state: 'Himachal Pradesh',
        forestChange: 5.3,
        primaryCause: 'Natural regeneration',
        year: 2023
      },
      {
        name: 'Wayanad',
        state: 'Kerala',
        forestChange: 4.5,
        primaryCause: 'Community forest management',
        year: 2023
      }
    ];
    
    setAqiData(mockAqiData);
    setTemperatureData(mockTemperatureData);
    setNewsItems(mockNewsItems);
    setClimateFactors(mockClimateFactors);
    setTemperatureTrend(mockTemperatureTrend);
    setTopDistrictsLoss(mockTopDistrictsLoss);
    setTopDistrictsGain(mockTopDistrictsGain);
  };
  
  const getAQIColor = (category: string) => {
    switch (category) {
      case 'good': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'unhealthy': return 'bg-orange-500';
      case 'hazardous': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getNewsCategoryColor = (category: string) => {
    switch (category) {
      case 'deforestation': return 'bg-red-500';
      case 'climate': return 'bg-blue-500';
      case 'conservation': return 'bg-green-500';
      case 'policy': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'increasing': return <Badge className="bg-red-500">↑ Increasing</Badge>;
      case 'decreasing': return <Badge className="bg-green-500">↓ Decreasing</Badge>;
      case 'stable': return <Badge className="bg-blue-500">→ Stable</Badge>;
      default: return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  // Function to properly open news links in a new tab
  const openNewsLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-forest" />
          Environmental Monitoring & Climate Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="aqi" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
              <Wind className="h-4 w-4 mr-2" />
              Air Quality
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
              <Thermometer className="h-4 w-4 mr-2" />
              News & Updates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="aqi" className="animate-fade-in">
            <div className="text-sm text-muted-foreground mb-3">
              <p>Current Air Quality Index readings across {stateName}. AQI measures pollution levels and their potential health impacts.</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>AQI Value</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Primary Pollutant</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aqiData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.location}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>
                      <Badge className={`${getAQIColor(item.category)} text-white`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.primaryPollutant}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Alert className="mt-4 bg-muted/50">
              <AlertDescription>
                <strong>What this means:</strong> Air quality directly correlates with forest cover. Areas with higher forest density typically show better AQI readings due to trees' natural air filtering capacity.
              </AlertDescription>
            </Alert>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Top Forest Cover Change by {stateId === 'IN' ? 'State' : 'District'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium text-red-500">Top 5 {stateId === 'IN' ? 'States' : 'Districts'} with Forest Loss</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{stateId === 'IN' ? 'State' : 'District'}</TableHead>
                          <TableHead>{stateId === 'IN' ? 'Region' : 'State'}</TableHead>
                          <TableHead>Change (%)</TableHead>
                          <TableHead>Primary Cause</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topDistrictsLoss.map((district) => (
                          <TableRow key={district.name}>
                            <TableCell className="font-medium">{district.name}</TableCell>
                            <TableCell>{district.state}</TableCell>
                            <TableCell className="text-red-500">{district.forestChange}%</TableCell>
                            <TableCell>{district.primaryCause}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium text-green-500">Top 5 {stateId === 'IN' ? 'States' : 'Districts'} with Forest Gain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{stateId === 'IN' ? 'State' : 'District'}</TableHead>
                          <TableHead>{stateId === 'IN' ? 'Region' : 'State'}</TableHead>
                          <TableHead>Change (%)</TableHead>
                          <TableHead>Primary Cause</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topDistrictsGain.map((district) => (
                          <TableRow key={district.name}>
                            <TableCell className="font-medium">{district.name}</TableCell>
                            <TableCell>{district.state}</TableCell>
                            <TableCell className="text-green-500">+{district.forestChange}%</TableCell>
                            <TableCell>{district.primaryCause}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="animate-fade-in">
            <div className="text-sm text-muted-foreground mb-3">
              <p>Recent environmental news and alerts related to forest conservation and climate in {stateName}.</p>
            </div>
            <div className="space-y-4">
              {newsItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden transition-all duration-200 hover:shadow-md border-l-4 hover:bg-blue-50/30 cursor-pointer" 
                  style={{ borderLeftColor: item.category === 'deforestation' ? '#F44336' : 
                                          item.category === 'climate' ? '#2196F3' : 
                                          item.category === 'conservation' ? '#4CAF50' : '#9C27B0' }}
                  onClick={() => openNewsLink(item.url)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{item.title}</h3>
                      <Badge className={`${getNewsCategoryColor(item.category)} text-white ml-2`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{item.source}</span>
                      <span className="flex items-center">
                        {item.date} 
                        <span className="ml-2 text-blue-600">Read more →</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Alert className="mt-4 bg-muted/50">
              <AlertDescription>
                <strong>What this means:</strong> Staying informed about environmental policy changes, conservation efforts, and climate research helps connect forest cover data to broader ecological and social contexts. Recent trends show increasing community involvement in conservation and growing awareness about climate impacts.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalUpdates;
