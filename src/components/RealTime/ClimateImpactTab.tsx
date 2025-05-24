
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Cloud, CloudRain, Thermometer, AlertTriangle, Droplets } from "lucide-react";

// Helper function to safely format values
const safeToFixed = (value: any, digits: number = 1): string => {
  if (typeof value === 'number') {
    return value.toFixed(digits);
  }
  return String(value);
};

// Mock data generators
const generateTemperatureData = (stateId: string) => {
  const baseYear = 1990;
  const multiplier = stateId === 'IN' ? 1 : (parseInt(stateId.charAt(0), 36) % 5 + 0.8);
  
  return Array.from({ length: 8 }, (_, i) => {
    const year = baseYear + i * 5;
    const averageTemp = 25 + (i * 0.4 * multiplier);
    const anomaly = i * 0.15 * multiplier;
    return {
      year: year,
      average: averageTemp,
      anomaly: anomaly
    };
  });
};

const generateRainfallData = (stateId: string) => {
  const baseYear = 1990;
  const multiplier = stateId === 'IN' ? 1 : (parseInt(stateId.charAt(1), 36) % 3 + 0.9);
  
  return Array.from({ length: 8 }, (_, i) => {
    const year = baseYear + i * 5;
    let baseRainfall = 1200 - (i * 15 * multiplier);
    
    // Add some variability
    if (i % 2 === 0) {
      baseRainfall += 50 * multiplier;
    } else {
      baseRainfall -= 30 * multiplier;
    }
    
    return {
      year: year,
      rainfall: baseRainfall
    };
  });
};

const generateExtremeWeatherData = (stateId: string) => {
  const stateMultiplier = stateId === 'IN' ? 1 : (parseInt(stateId, 36) % 5 + 0.7);
  
  return [
    { name: 'Floods', events: Math.floor(8 * stateMultiplier), impact: Math.floor(7 * stateMultiplier) },
    { name: 'Droughts', events: Math.floor(5 * stateMultiplier), impact: Math.floor(9 * stateMultiplier) },
    { name: 'Heat Waves', events: Math.floor(12 * stateMultiplier), impact: Math.floor(6 * stateMultiplier) },
    { name: 'Cyclones', events: Math.floor(3 * stateMultiplier), impact: Math.floor(8 * stateMultiplier) },
  ];
};

const generateForestHealthData = (stateId: string) => {
  const baseScore = stateId === 'IN' ? 75 : (70 + (parseInt(stateId.charAt(0), 36) % 20));
  
  return [
    { metric: 'Biodiversity', score: baseScore - 5 },
    { metric: 'Tree Health', score: baseScore - 10 },
    { metric: 'Soil Quality', score: baseScore - 8 },
    { metric: 'Water Retention', score: baseScore - 15 },
    { metric: 'Fire Resistance', score: baseScore - 18 },
  ];
};

interface ClimateImpactTabProps {
  stateId: string;
}

const ClimateImpactTab: React.FC<ClimateImpactTabProps> = ({ stateId }) => {
  const [activeTab, setActiveTab] = useState<string>('temperature');
  
  // Generate data based on state
  const temperatureData = generateTemperatureData(stateId);
  const rainfallData = generateRainfallData(stateId);
  const extremeWeatherData = generateExtremeWeatherData(stateId);
  const forestHealthData = generateForestHealthData(stateId);
  
  // Calculate current temperature anomaly
  const currentAnomalyPercent = temperatureData[temperatureData.length - 1].anomaly / 0.8 * 100;
  
  // Calculate average rainfall change
  const earliestRainfall = rainfallData[0].rainfall;
  const latestRainfall = rainfallData[rainfallData.length - 1].rainfall;
  const rainfallChangePercent = ((latestRainfall - earliestRainfall) / earliestRainfall) * 100;
  
  // Determine severity classes
  const getAnomalySeverityClass = (percent: number) => {
    if (percent > 150) return "text-red-600";
    if (percent > 100) return "text-amber-600";
    return "text-yellow-600";
  };
  
  const getRainfallChangeClass = (percent: number) => {
    if (percent < -15) return "text-red-600";
    if (percent < -5) return "text-amber-600";
    if (percent < 0) return "text-yellow-600";
    return "text-green-600";
  };
  
  return (
    <Card className="bg-white shadow-md overflow-hidden">
      <CardContent className="p-0">
        {/* Summary Stats */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-cyan-100 flex items-center">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Thermometer className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Temperature Change</h3>
              <p className={`text-xl font-bold ${getAnomalySeverityClass(currentAnomalyPercent)}`}>
                +{safeToFixed(temperatureData[temperatureData.length - 1].anomaly)}°C
                <span className="text-sm ml-1">since 1990</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-cyan-100 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <CloudRain className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Rainfall Change</h3>
              <p className={`text-xl font-bold ${getRainfallChangeClass(rainfallChangePercent)}`}>
                {safeToFixed(rainfallChangePercent)}%
                <span className="text-sm ml-1">since 1990</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-cyan-100 flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Extreme Weather</h3>
              <p className="text-xl font-bold text-red-600">
                {extremeWeatherData.reduce((sum, item) => sum + item.events, 0)}
                <span className="text-sm ml-1">events last decade</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Climate Impact Data Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-gradient-to-r from-blue-800 to-cyan-700 rounded-none grid grid-cols-4 p-0">
            <TabsTrigger 
              value="temperature" 
              className="data-[state=active]:bg-white rounded-none py-3 text-blue-50 data-[state=active]:text-blue-700"
            >
              Temperature
            </TabsTrigger>
            <TabsTrigger 
              value="rainfall" 
              className="data-[state=active]:bg-white rounded-none py-3 text-blue-50 data-[state=active]:text-blue-700"
            >
              Rainfall
            </TabsTrigger>
            <TabsTrigger 
              value="extreme" 
              className="data-[state=active]:bg-white rounded-none py-3 text-blue-50 data-[state=active]:text-blue-700"
            >
              Extreme Weather
            </TabsTrigger>
            <TabsTrigger 
              value="impact" 
              className="data-[state=active]:bg-white rounded-none py-3 text-blue-50 data-[state=active]:text-blue-700"
            >
              Forest Health
            </TabsTrigger>
          </TabsList>
          
          {/* Temperature Tab */}
          <TabsContent value="temperature" className="p-6 bg-white animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Thermometer className="mr-2 h-6 w-6 text-amber-600" />
              Temperature Trends (1990-2025)
            </h3>
            <div className="mb-4">
              <p className="text-gray-600">
                Average temperatures have increased by <strong className="text-amber-600">
                {safeToFixed(temperatureData[temperatureData.length - 1].anomaly)}°C
                </strong> since 1990, with accelerating warming in recent decades. This warming trend is 
                {currentAnomalyPercent > 120 ? " significantly" : ""} impacting forest ecosystems.
              </p>
            </div>
            <div className="h-72 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="average" name="Avg. Temperature (°C)" stroke="#e67700" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="anomaly" name="Anomaly (°C)" stroke="#ff4d4f" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h4 className="font-medium text-amber-800">Key Impacts on Forests</h4>
              <ul className="list-disc pl-5 text-amber-700 mt-2">
                <li>Extended growing seasons affecting forest composition</li>
                <li>Increased vulnerability to pests and diseases</li>
                <li>Higher risk of wildfires during hot and dry periods</li>
                <li>Shifts in species distribution towards higher elevations</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* Rainfall Tab */}
          <TabsContent value="rainfall" className="p-6 bg-white animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Cloud className="mr-2 h-6 w-6 text-blue-600" />
              Rainfall Patterns (1990-2025)
            </h3>
            <div className="mb-4">
              <p className="text-gray-600">
                Annual rainfall has changed by <strong className={getRainfallChangeClass(rainfallChangePercent)}>
                {safeToFixed(rainfallChangePercent)}%
                </strong> since 1990. Changing precipitation patterns are affecting forest hydrology and ecosystem stability.
              </p>
            </div>
            <div className="h-72 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rainfallData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rainfall" name="Annual Rainfall (mm)" stroke="#0284c7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800">Hydrological Impacts</h4>
              <ul className="list-disc pl-5 text-blue-700 mt-2">
                <li>Altered soil moisture availability affecting tree growth</li>
                <li>Increased runoff leading to soil erosion in deforested areas</li>
                <li>Changing water table levels affecting groundwater-dependent ecosystems</li>
                <li>More frequent drought stress in forest ecosystems</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* Extreme Weather Tab */}
          <TabsContent value="extreme" className="p-6 bg-white animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-red-600" />
              Extreme Weather Events (Past Decade)
            </h3>
            <div className="mb-4">
              <p className="text-gray-600">
                The region has experienced <strong className="text-red-600">
                {extremeWeatherData.reduce((sum, item) => sum + item.events, 0)}</strong> extreme weather events 
                in the past decade, with increasing frequency and intensity affecting forest resilience.
              </p>
            </div>
            <div className="h-72 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={extremeWeatherData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" name="Number of Events" fill="#f43f5e" />
                  <Bar dataKey="impact" name="Impact Severity (1-10)" fill="#881337" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h4 className="font-medium text-red-800">Forest Disturbances</h4>
              <ul className="list-disc pl-5 text-red-700 mt-2">
                <li>Widespread tree damage from increased storm intensity</li>
                <li>Flash floods causing accelerated soil erosion in forested watersheds</li>
                <li>Extended drought periods inducing physiological stress in trees</li>
                <li>Cascading impacts on forest-dependent wildlife and plant communities</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* Forest Health Impact Tab */}
          <TabsContent value="impact" className="p-6 bg-white animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Droplets className="mr-2 h-6 w-6 text-emerald-600" />
              Forest Health Impact Scores
            </h3>
            <div className="mb-4">
              <p className="text-gray-600">
                Climate change is affecting multiple aspects of forest health, with varying impacts across different forest attributes.
                Lower scores indicate higher vulnerability to climate impacts.
              </p>
            </div>
            <div className="h-72 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forestHealthData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="metric" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Health Score (0-100)" fill="#059669">
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <h4 className="font-medium text-emerald-800">Adaptation Strategies</h4>
              <ul className="list-disc pl-5 text-emerald-700 mt-2">
                <li>Promoting drought-resistant native species in reforestation efforts</li>
                <li>Creating habitat corridors to facilitate species migration</li>
                <li>Implementing early warning systems for forest fires and pest outbreaks</li>
                <li>Integrated watershed management to improve water retention</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ClimateImpactTab;
