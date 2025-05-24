
import React from 'react';
import { Thermometer, CloudRain, AlertTriangle, Wind, CloudLightning } from "lucide-react";
import { getClimateData } from './utils/environmentalDataUtils';
import { getStateById } from '@/data/mockData';
import { Card } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface ClimateImpactTabProps {
  stateId: string;
}

const ClimateImpactTab: React.FC<ClimateImpactTabProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  const climateData = getClimateData(stateId);
  
  // Generate temperature trend data
  const temperatureTrendData = [
    { year: 2015, temperature: climateData.current.temperature.current - 1.2 },
    { year: 2016, temperature: climateData.current.temperature.current - 1.0 },
    { year: 2017, temperature: climateData.current.temperature.current - 0.8 },
    { year: 2018, temperature: climateData.current.temperature.current - 0.6 },
    { year: 2019, temperature: climateData.current.temperature.current - 0.4 },
    { year: 2020, temperature: climateData.current.temperature.current - 0.3 },
    { year: 2021, temperature: climateData.current.temperature.current - 0.1 },
    { year: 2022, temperature: climateData.current.temperature.current },
    { year: 2023, temperature: climateData.current.temperature.current + 0.2 },
    { year: 2024, temperature: climateData.current.temperature.current + 0.4 },
    { year: 2025, temperature: climateData.current.temperature.current + 0.6 },
  ];
  
  // Rainfall trend data
  const rainfallTrendData = [
    { year: 2015, rainfall: climateData.current.rainfall.current * 1.08 },
    { year: 2016, rainfall: climateData.current.rainfall.current * 1.06 },
    { year: 2017, rainfall: climateData.current.rainfall.current * 1.04 },
    { year: 2018, rainfall: climateData.current.rainfall.current * 1.02 },
    { year: 2019, rainfall: climateData.current.rainfall.current * 1.00 },
    { year: 2020, rainfall: climateData.current.rainfall.current * 0.98 },
    { year: 2021, rainfall: climateData.current.rainfall.current * 0.96 },
    { year: 2022, rainfall: climateData.current.rainfall.current * 0.94 },
    { year: 2023, rainfall: climateData.current.rainfall.current * 0.92 },
    { year: 2024, rainfall: climateData.current.rainfall.current * 0.90 },
  ];
  
  // Extreme weather data
  const extremeEventsData = [
    { name: 'Droughts', value: climateData.current.extremeEvents.droughts },
    { name: 'Floods', value: climateData.current.extremeEvents.floods },
    { name: 'Heat Waves', value: climateData.current.extremeEvents.heatwaves },
  ];
  
  // Forest impact data
  const forestImpactData = [
    { impact: 'Water Stress', score: 65 + Math.floor(Math.random() * 15) },
    { impact: 'Fire Risk', score: 70 + Math.floor(Math.random() * 20) },
    { impact: 'Species Loss', score: 45 + Math.floor(Math.random() * 25) },
    { impact: 'Soil Erosion', score: 50 + Math.floor(Math.random() * 20) },
    { impact: 'Disease Risk', score: 40 + Math.floor(Math.random() * 30) },
  ];
  
  // Annual temperature cycle
  const temperatureCycleData = [
    { month: 'Jan', temp: 18 + Math.random() * 5 },
    { month: 'Feb', temp: 20 + Math.random() * 5 },
    { month: 'Mar', temp: 25 + Math.random() * 5 },
    { month: 'Apr', temp: 30 + Math.random() * 5 },
    { month: 'May', temp: 35 + Math.random() * 5 },
    { month: 'Jun', temp: 32 + Math.random() * 5 },
    { month: 'Jul', temp: 30 + Math.random() * 5 },
    { month: 'Aug', temp: 29 + Math.random() * 5 },
    { month: 'Sep', temp: 28 + Math.random() * 5 },
    { month: 'Oct', temp: 26 + Math.random() * 5 },
    { month: 'Nov', temp: 22 + Math.random() * 5 },
    { month: 'Dec', temp: 19 + Math.random() * 5 },
  ];
  
  // Colors for pie chart
  const COLORS = ['#FFA07A', '#20B2AA', '#B22222'];

  return (
    <div className="space-y-6">
      {/* Current Climate Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <h3 className="font-medium">Temperature Analysis</h3>
          </div>
          {climateData.current && (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Average Temperature</div>
                <div className="text-xl font-bold">{climateData.current.temperature.current.toFixed(1)}°C</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Temperature Anomaly</div>
                <div className="text-lg font-semibold text-red-600">+{climateData.current.temperature.anomaly.toFixed(1)}°C</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Long-term Trend</div>
                <div className="text-base">{climateData.current.temperature.trend}</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Precipitation Analysis</h3>
          </div>
          {climateData.current && (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Annual Rainfall</div>
                <div className="text-xl font-bold">{climateData.current.rainfall.current.toFixed(0)} mm</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Rainfall Anomaly</div>
                <div className="text-lg font-semibold text-amber-600">{climateData.current.rainfall.anomaly.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Long-term Trend</div>
                <div className="text-base">{climateData.current.rainfall.trend}</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="font-medium">Extreme Weather Events</h3>
          </div>
          {climateData.current && (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Drought Events (Last 5 Years)</div>
                <div className="text-xl font-bold">{climateData.current.extremeEvents.droughts}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Flood Events (Last 5 Years)</div>
                <div className="text-xl font-bold">{climateData.current.extremeEvents.floods}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Heat Waves (Last 5 Years)</div>
                <div className="text-xl font-bold">{climateData.current.extremeEvents.heatwaves}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Temperature Trend Chart */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Thermometer className="h-5 w-5 text-red-500 mr-2" />
          Temperature Trend (2015-2025)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={temperatureTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value}°C`, 'Temperature']} />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#FF7043"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Rainfall Trend Chart */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
          Annual Rainfall Trend (2015-2024)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={rainfallTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'mm', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value.toFixed(0)} mm`, 'Rainfall']} />
              <Legend />
              <Bar dataKey="rainfall" fill="#4FC3F7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Grid of additional charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Extreme Events Pie Chart */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            Extreme Weather Events Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={extremeEventsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {extremeEventsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} events`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Forest Impact Chart */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Wind className="h-5 w-5 text-green-600 mr-2" />
            Climate Impact on Forest Health
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={forestImpactData}
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="impact" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value}/100`, 'Impact Score']} />
                <Legend />
                <Bar dataKey="score" fill="#66BB6A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Monthly Temperature Cycle */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
            Monthly Temperature Cycle
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={temperatureCycleData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip formatter={(value) => [`${value.toFixed(1)}°C`, 'Temperature']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#FF9800"
                  strokeWidth={2}
                  dot={{ stroke: '#FF9800', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Climate Anomalies Visualization */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <CloudLightning className="h-5 w-5 text-purple-500 mr-2" />
            Climate Anomalies by Region
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={climateData.temperatureData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="stateName" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toFixed(1)}°C`, 'Temperature']} />
                <Legend />
                <Bar dataKey="temperature" name="Temperature (°C)" fill="#9575CD" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {/* Climate Impact on Forests */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium mb-2">Climate Impact on Forests in {stateId === 'IN' ? 'India' : stateData?.name}</h3>
        <p className="text-gray-700">
          Climate change is significantly affecting forest ecosystems in {stateId === 'IN' ? 'India' : stateData?.name}. Rising temperatures are 
          extending the growing season but also increasing water stress and fire risk. Changing rainfall patterns 
          are altering species composition, with drought-tolerant species potentially replacing moisture-dependent ones.
        </p>
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800">Key Vulnerabilities</h4>
          <ul className="list-disc list-inside text-sm text-yellow-700 mt-1">
            <li>Increased forest fire frequency and intensity due to hotter, drier conditions</li>
            <li>Shifting tree species distribution as climate zones move northward and to higher elevations</li>
            <li>Greater susceptibility to pest outbreaks and disease as trees experience climate stress</li>
            <li>Reduced forest regeneration rates in areas experiencing more frequent drought</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClimateImpactTab;
