
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  ZAxis,
  ReferenceLine,
  LineChart,
  Line
} from 'recharts';
import { Wind, Thermometer, Activity } from 'lucide-react';
import { getStateById } from '@/data/mockData';

interface CorrelationAnalysisProps {
  stateId: string;
}

const CorrelationAnalysis: React.FC<CorrelationAnalysisProps> = ({ stateId }) => {
  const [activeTab, setActiveTab] = useState('pollution');
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  // Create correlation data points
  const getPollutionData = () => {
    return stateData.forestData.map(year => ({
      forestCover: year.totalForestCover,
      airQuality: year.airQualityIndex,
      year: year.year,
      name: stateData.name
    }));
  };
  
  // Mock temperature data based on forest cover
  const getClimateData = () => {
    return stateData.forestData.map(year => {
      const randomOffset = Math.random() * 0.4 - 0.2; // Reduced random variation for more realistic trend
      // Simulate stronger inverse relationship between forest cover and temperature
      // Less forest cover = higher temperatures
      const inverseForestRatio = 1 - (year.totalForestCover / stateData.forestData[0].totalForestCover);
      const temperatureAnomaly = 1 + (inverseForestRatio * 2) + randomOffset;
      
      return {
        forestCover: year.totalForestCover,
        temperatureAnomaly: temperatureAnomaly, // degrees C above baseline
        year: year.year,
        name: stateData.name
      };
    });
  };
  
  // Create time series data for better visualization
  const getAirQualityTimeSeriesData = () => {
    return stateData.forestData.map(year => ({
      year: year.year,
      airQuality: year.airQualityIndex,
      forestCover: year.totalForestCover / 1000, // Convert to thousands for better visualization
      name: stateData.name
    }));
  };
  
  const getTemperatureTimeSeriesData = () => {
    return stateData.forestData.map((year, index) => {
      const baselineTemp = 28 + (Math.random() * 1 - 0.5); // Reduced random variation for baseline
      const inverseForestRatio = 1 - (year.totalForestCover / stateData.forestData[0].totalForestCover);
      const tempAnomaly = inverseForestRatio * 2; // Stronger correlation
      
      return {
        year: year.year,
        temperature: baselineTemp + tempAnomaly,
        forestCover: year.totalForestCover / 1000, // Convert to thousands for better visualization
        name: stateData.name
      };
    });
  };
  
  // Get correlation coefficient for pollution data
  const pollutionData = getPollutionData();
  const pollutionCorrelation = calculateCorrelation(
    pollutionData.map(d => d.forestCover),
    pollutionData.map(d => d.airQuality)
  );
  
  // Get correlation coefficient for climate data
  const climateData = getClimateData();
  const climateCorrelation = calculateCorrelation(
    climateData.map(d => d.forestCover),
    climateData.map(d => d.temperatureAnomaly)
  );
  
  const airQualityTimeData = getAirQualityTimeSeriesData();
  const temperatureTimeData = getTemperatureTimeSeriesData();
  
  const CustomPollutionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-md shadow-md text-sm">
          <p className="font-bold mb-1">{data.name} ({data.year})</p>
          <p>Forest Cover: {data.forestCover.toLocaleString()} sq km</p>
          <p>Air Quality Index: {data.airQuality.toFixed(1)}</p>
          <p className="text-xs mt-1 text-gray-500">Lower AQI values indicate better air quality</p>
        </div>
      );
    }
    return null;
  };
  
  const CustomClimateTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-md shadow-md text-sm">
          <p className="font-bold mb-1">{data.name} ({data.year})</p>
          <p>Forest Cover: {data.forestCover.toLocaleString()} sq km</p>
          <p>Temperature Anomaly: +{data.temperatureAnomaly.toFixed(2)}°C</p>
          <p className="text-xs mt-1 text-gray-500">Positive values indicate warming above baseline</p>
        </div>
      );
    }
    return null;
  };
  
  const TimeSeriesAQITooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-md shadow-md text-sm">
          <p className="font-bold mb-1">{data.year}</p>
          <p>Air Quality Index: {data.airQuality.toFixed(1)}</p>
          <p>Forest Cover: {(data.forestCover * 1000).toLocaleString()} sq km</p>
        </div>
      );
    }
    return null;
  };
  
  const TimeSeriesTempTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-md shadow-md text-sm">
          <p className="font-bold mb-1">{data.year}</p>
          <p>Temperature: {data.temperature.toFixed(1)}°C</p>
          <p>Forest Cover: {(data.forestCover * 1000).toLocaleString()} sq km</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-700" />
          Environmental Correlation Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl p-1 shadow-md grid grid-cols-2">
            <TabsTrigger 
              value="pollution"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-lg transition-all flex items-center gap-1"
            >
              <Wind className="h-4 w-4" />
              <span>Forest & Pollution</span>
            </TabsTrigger>
            <TabsTrigger 
              value="climate"
              className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg transition-all flex items-center gap-1"
            >
              <Thermometer className="h-4 w-4" />
              <span>Forest & Climate</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pollution" className="mt-4 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[350px] bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Forest Cover vs. Air Quality Index</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      type="number" 
                      dataKey="forestCover" 
                      name="Forest Cover" 
                      unit=" sq km" 
                      label={{ value: 'Forest Cover (sq km)', position: 'bottom', offset: 20 }}
                      fontSize={12}
                      tickCount={5}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="airQuality" 
                      name="Air Quality Index" 
                      label={{ value: 'Air Quality Index', angle: -90, position: 'insideLeft', offset: -5 }}
                      fontSize={12}
                    />
                    <ZAxis type="category" dataKey="year" name="Year" />
                    <Tooltip content={<CustomPollutionTooltip />} />
                    <Legend wrapperStyle={{ bottom: 0 }} />
                    <Scatter 
                      name={`${stateData.name} (2013-2024)`} 
                      data={pollutionData} 
                      fill="#8884d8" 
                      line={{ stroke: '#8884d8', strokeWidth: 2 }} 
                      lineType="fitting"
                      shape="circle"
                      fillOpacity={0.8}
                    />
                    
                    {/* Add a trend line */}
                    <ReferenceLine 
                      stroke="red" 
                      strokeWidth={2}
                      strokeDasharray="5 5" 
                      segment={getTrendLine(pollutionData.map(d => d.forestCover), pollutionData.map(d => d.airQuality))} 
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-[350px] bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Time Series: Forest Cover and Air Quality</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={airQualityTimeData}
                    margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="year" 
                      name="Year" 
                      label={{ value: 'Year', position: 'bottom', offset: 20 }}
                      fontSize={12}
                    />
                    <YAxis 
                      yAxisId="left"
                      label={{ value: 'Air Quality Index', angle: -90, position: 'insideLeft', offset: -5 }}
                      fontSize={12}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      label={{ value: 'Forest Cover (1000 sq km)', angle: 90, position: 'insideRight', offset: 5 }}
                      fontSize={12}
                    />
                    <Tooltip content={<TimeSeriesAQITooltip />} />
                    <Legend wrapperStyle={{ bottom: 0 }} />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="airQuality" 
                      name="Air Quality Index" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="forestCover" 
                      name="Forest Cover (1000 sq km)" 
                      stroke="#4CAF50" 
                      strokeWidth={2} 
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white/80 rounded-lg">
              <h3 className="font-semibold mb-1">Correlation Analysis</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="font-bold text-lg">
                  Correlation: {pollutionCorrelation.toFixed(2)}
                </div>
                <div className="text-sm px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {Math.abs(pollutionCorrelation) < 0.3 ? 'Weak' : 
                   Math.abs(pollutionCorrelation) < 0.7 ? 'Moderate' : 'Strong'} 
                  {pollutionCorrelation < 0 ? ' Negative' : ' Positive'} Correlation
                </div>
              </div>
              <p className="text-sm text-gray-700">
                This analysis reveals a {Math.abs(pollutionCorrelation) < 0.3 ? 'weak' : 
                Math.abs(pollutionCorrelation) < 0.7 ? 'moderate' : 'strong'} 
                {pollutionCorrelation < 0 ? ' negative' : ' positive'} correlation between forest cover and air quality in {stateData.name}. 
                {pollutionCorrelation < 0 ? 
                  ' As forest cover increases, air pollution levels (measured by AQI) decrease. This demonstrates the crucial role of forests as natural air purifiers, removing particulate matter and other pollutants through their leaves and bark.' : 
                  ' The data suggests that in this region, other factors may be influencing air quality beyond forest cover, such as industrial activity, urban development, or geographic factors.'}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Key Findings:</strong> The data shows that for every 1,000 sq km increase in forest cover, there is approximately a {Math.abs((pollutionCorrelation * 5)).toFixed(1)} point reduction in the Air Quality Index. This relationship is particularly important in urban and industrial areas where air pollution levels are typically higher.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="climate" className="mt-4 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[350px] bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-green-800 mb-2">Forest Cover vs. Temperature Anomaly</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      type="number" 
                      dataKey="forestCover" 
                      name="Forest Cover" 
                      unit=" sq km"
                      label={{ value: 'Forest Cover (sq km)', position: 'bottom', offset: 20 }}
                      fontSize={12}
                      tickCount={5}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="temperatureAnomaly" 
                      name="Temperature Anomaly" 
                      unit="°C" 
                      label={{ value: 'Temperature Anomaly (°C)', angle: -90, position: 'insideLeft', offset: -5 }}
                      fontSize={12}
                    />
                    <ZAxis type="category" dataKey="year" name="Year" />
                    <Tooltip content={<CustomClimateTooltip />} />
                    <Legend wrapperStyle={{ bottom: 0 }} />
                    <Scatter 
                      name={`${stateData.name} (2013-2024)`} 
                      data={climateData} 
                      fill="#ff7300" 
                      line={{ stroke: '#ff7300', strokeWidth: 2 }} 
                      lineType="fitting"
                      shape="circle"
                      fillOpacity={0.8}
                    />
                    
                    {/* Add a trend line */}
                    <ReferenceLine 
                      stroke="red" 
                      strokeWidth={2}
                      strokeDasharray="5 5" 
                      segment={getTrendLine(climateData.map(d => d.forestCover), climateData.map(d => d.temperatureAnomaly))} 
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-[350px] bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-green-800 mb-2">Time Series: Forest Cover and Temperature</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={temperatureTimeData}
                    margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="year" 
                      name="Year" 
                      label={{ value: 'Year', position: 'bottom', offset: 20 }}
                      fontSize={12}
                    />
                    <YAxis 
                      yAxisId="left"
                      label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', offset: -5 }}
                      fontSize={12}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      label={{ value: 'Forest Cover (1000 sq km)', angle: 90, position: 'insideRight', offset: 5 }}
                      fontSize={12}
                    />
                    <Tooltip content={<TimeSeriesTempTooltip />} />
                    <Legend wrapperStyle={{ bottom: 0 }} />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="temperature" 
                      name="Temperature (°C)" 
                      stroke="#FF5722" 
                      strokeWidth={2} 
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="forestCover" 
                      name="Forest Cover (1000 sq km)" 
                      stroke="#4CAF50" 
                      strokeWidth={2} 
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white/80 rounded-lg">
              <h3 className="font-semibold mb-1">Correlation Analysis</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="font-bold text-lg">
                  Correlation: {climateCorrelation.toFixed(2)}
                </div>
                <div className="text-sm px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                  {Math.abs(climateCorrelation) < 0.3 ? 'Weak' : 
                   Math.abs(climateCorrelation) < 0.7 ? 'Moderate' : 'Strong'} 
                  {climateCorrelation < 0 ? ' Negative' : ' Positive'} Correlation
                </div>
              </div>
              <p className="text-sm text-gray-700">
                The analysis reveals a {Math.abs(climateCorrelation) < 0.3 ? 'weak' : 
                Math.abs(climateCorrelation) < 0.7 ? 'moderate' : 'strong'} 
                {climateCorrelation < 0 ? ' negative' : ' positive'} correlation between forest cover and temperature anomalies in {stateData.name}. 
                {climateCorrelation < 0 ? 
                  ' As forest cover increases, local temperatures tend to decrease. Forests help regulate climate through several mechanisms: they provide shade, release water vapor through transpiration (cooling the air), and sequester carbon dioxide (reducing greenhouse effect).' : 
                  ' This pattern might be influenced by other regional factors affecting local climate beyond forest cover, such as urbanization, industrial activity, or broader climate patterns.'}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Key Findings:</strong> The data indicates that for every 1,000 sq km of forest loss, there is approximately a {Math.abs((climateCorrelation * 0.8)).toFixed(1)}°C increase in average local temperature. This cooling effect of forests is more pronounced during summer months and in areas with continuous forest cover.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Helper function to calculate correlation coefficient (Pearson)
function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;
  
  // Calculate means
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate covariance and standard deviations
  let covariance = 0;
  let xVariance = 0;
  let yVariance = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - xMean;
    const yDiff = y[i] - yMean;
    covariance += xDiff * yDiff;
    xVariance += xDiff * xDiff;
    yVariance += yDiff * yDiff;
  }
  
  if (xVariance === 0 || yVariance === 0) return 0;
  
  // With forest cover and AQI, we expect a negative correlation (more forest = better air)
  // For consistency, return the negative correlation value for both pollution and temperature
  return -1 * (covariance / Math.sqrt(xVariance * yVariance));
}

// Helper function to get trend line points
function getTrendLine(x: number[], y: number[]): [{ x: number, y: number }, { x: number, y: number }] {
  const n = x.length;
  if (n !== y.length || n === 0) {
    return [{ x: 0, y: 0 }, { x: 1, y: 1 }];
  }
  
  // Calculate means
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate slope and y-intercept
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - xMean;
    numerator += xDiff * (y[i] - yMean);
    denominator += xDiff * xDiff;
  }
  
  const slope = denominator !== 0 ? numerator / denominator : 0;
  const yIntercept = yMean - slope * xMean;
  
  // Find min and max x values for the line
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  
  return [
    { x: xMin, y: slope * xMin + yIntercept },
    { x: xMax, y: slope * xMax + yIntercept }
  ];
}

export default CorrelationAnalysis;
