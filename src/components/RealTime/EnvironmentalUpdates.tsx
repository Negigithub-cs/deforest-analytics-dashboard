
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Flame, Thermometer, Wind, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStateById } from '@/data/mockData';

interface FireUpdate {
  id: string;
  location: string;
  status: 'active' | 'contained' | 'extinguished';
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  affectedArea: number;
}

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

const EnvironmentalUpdates: React.FC<{ stateId: string }> = ({ stateId }) => {
  const [activeTab, setActiveTab] = useState('aqi');
  const [fireUpdates, setFireUpdates] = useState<FireUpdate[]>([]);
  const [aqiData, setAqiData] = useState<AQIReading[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  
  const stateName = getStateById(stateId)?.name || 'India';
  
  useEffect(() => {
    // Mock data fetching - in a real app, these would be API calls
    // Generate mock data based on the state
    generateMockData(stateId);
  }, [stateId]);
  
  const generateMockData = (stateId: string) => {
    // Mock fire updates
    const mockFireUpdates: FireUpdate[] = [
      {
        id: '1',
        location: `${stateId === 'IN' ? 'Uttarakhand' : stateName} Forest Reserve`,
        status: 'active',
        severity: 'high',
        timestamp: new Date().toISOString(),
        affectedArea: 120,
      },
      {
        id: '2',
        location: `${stateId === 'IN' ? 'Madhya Pradesh' : stateName} Wildlife Sanctuary`,
        status: 'contained',
        severity: 'medium',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        affectedArea: 75,
      },
      {
        id: '3',
        location: `${stateId === 'IN' ? 'Kerala' : stateName} National Park`,
        status: 'extinguished',
        severity: 'low',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        affectedArea: 25,
      },
    ];
    
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
    
    // Mock news items
    const mockNewsItems: NewsItem[] = [
      {
        id: '1',
        title: `New Conservation Efforts Launched in ${stateId === 'IN' ? 'Western Ghats' : stateName}`,
        source: 'Environmental Times',
        date: new Date().toLocaleDateString(),
        summary: 'Government announces major funding for forest restoration and conservation projects.',
        category: 'conservation',
        url: '#',
      },
      {
        id: '2',
        title: `Temperature Rise Affecting Biodiversity in ${stateId === 'IN' ? 'Northeast India' : stateName}`,
        source: 'Climate Science Journal',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        summary: 'Research shows concerning patterns of habitat loss due to changing temperature patterns.',
        category: 'climate',
        url: '#',
      },
      {
        id: '3',
        title: `Illegal Logging Operations Discovered in ${stateId === 'IN' ? 'Central India' : stateName} Forests`,
        source: 'Forest Watch',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        summary: 'Authorities have uncovered a major illegal logging operation affecting protected forest areas.',
        category: 'deforestation',
        url: '#',
      },
    ];
    
    setFireUpdates(mockFireUpdates);
    setAqiData(mockAqiData);
    setTemperatureData(mockTemperatureData);
    setNewsItems(mockNewsItems);
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
  
  const getFireStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500';
      case 'contained': return 'bg-orange-500';
      case 'extinguished': return 'bg-green-500';
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
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-forest" />
          Real-Time Environmental Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="aqi" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
              <Wind className="h-4 w-4 mr-2" />
              Air Quality
            </TabsTrigger>
            <TabsTrigger value="fires" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
              <Flame className="h-4 w-4 mr-2" />
              Forest Fires
            </TabsTrigger>
            <TabsTrigger value="temperature" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
              <Thermometer className="h-4 w-4 mr-2" />
              Temperature
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              News & Alerts
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
          </TabsContent>
          
          <TabsContent value="fires" className="animate-fade-in">
            <div className="text-sm text-muted-foreground mb-3">
              <p>Latest forest fire incidents and status updates in {stateName}. Tracking active fires, containment progress, and affected areas.</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Affected Area (ha)</TableHead>
                  <TableHead>Reported</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fireUpdates.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.location}</TableCell>
                    <TableCell>
                      <Badge className={`${getFireStatusColor(item.status)} text-white`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}</TableCell>
                    <TableCell>{item.affectedArea}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.timestamp).toLocaleString([], { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Alert className="mt-4 bg-muted/50">
              <AlertDescription>
                <strong>What this means:</strong> Forest fires are a significant contributor to deforestation and carbon emissions. Monitoring helps with early intervention and understanding patterns related to climate change.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="temperature" className="animate-fade-in">
            <div className="text-sm text-muted-foreground mb-3">
              <p>Current temperature readings across different regions of {stateName}, showing relationship between forest cover and local climate patterns.</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Current (°C)</TableHead>
                  <TableHead>Min/Max (°C)</TableHead>
                  <TableHead>Humidity (%)</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {temperatureData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.location}</TableCell>
                    <TableCell>{item.current}°C</TableCell>
                    <TableCell>{item.min}° / {item.max}°</TableCell>
                    <TableCell>{item.humidity}%</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Alert className="mt-4 bg-muted/50">
              <AlertDescription>
                <strong>What this means:</strong> Forests regulate local temperatures and humidity. Areas with depleted forest cover often experience more extreme temperature fluctuations and decreased humidity.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="news" className="animate-fade-in">
            <div className="text-sm text-muted-foreground mb-3">
              <p>Recent environmental news and alerts related to forest conservation and climate in {stateName}.</p>
            </div>
            <div className="space-y-4">
              {newsItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: item.category === 'deforestation' ? '#F44336' : '#2E7D32' }}>
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
                      <span>{item.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Alert className="mt-4 bg-muted/50">
              <AlertDescription>
                <strong>What this means:</strong> Staying informed about environmental policy changes, conservation efforts, and climate research helps connect forest cover data to broader ecological and social contexts.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalUpdates;
