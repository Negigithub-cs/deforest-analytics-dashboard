
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceArea,
  LineChart,
  Line
} from 'recharts';
import { Wind, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getStateById } from '@/data/mockData';

interface AirQualityTrendProps {
  stateId: string;
  timeRange: string;
}

const AirQualityTrend: React.FC<AirQualityTrendProps> = ({ stateId, timeRange }) => {
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  const getData = () => {
    if (timeRange === 'historical') {
      return stateData.forestData.map(year => ({
        year: year.year,
        aqi: year.airQualityIndex,
      }));
    } else if (timeRange === 'projected') {
      return stateData.projectedData.map(year => ({
        year: year.year,
        aqi: year.airQualityIndex,
      }));
    } else {
      return [...stateData.forestData, ...stateData.projectedData].map(year => ({
        year: year.year,
        aqi: year.airQualityIndex,
      }));
    }
  };
  
  const data = getData();
  
  // Calculate domain for Y axis
  const maxAQI = Math.max(...data.map(d => d.aqi));
  const yAxisMax = Math.max(100, Math.ceil(maxAQI / 20) * 20);
  
  // AQI category thresholds based on your image
  const aqiCategories = [
    { max: 20, label: 'Good', color: '#A3C4FF' },
    { max: 40, label: 'Fair', color: '#A8E1CD' },
    { max: 60, label: 'Moderate', color: '#FFF8B8' },
    { max: 100, label: 'Poor', color: '#FFBDBD' }
  ];
  
  const getAreaColor = (value: number) => {
    for (const category of aqiCategories) {
      if (value <= category.max) {
        return category.color;
      }
    }
    return aqiCategories[aqiCategories.length - 1].color;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const aqi = payload[0].value;
      let category = 'Hazardous';
      let color = '#8F3F3F';
      
      for (const cat of aqiCategories) {
        if (aqi <= cat.max) {
          category = cat.label;
          color = cat.color;
          break;
        }
      }
      
      return (
        <div className="bg-white p-3 border rounded-md shadow-md text-sm">
          <p className="font-bold mb-1">{`Year: ${label}`}</p>
          <p style={{ color: '#333' }}>
            <span>Air Quality Index: </span>
            <span className="font-semibold">{aqi.toFixed(1)}</span>
          </p>
          <p className="mt-1">
            <span>Status: </span>
            <span className="font-semibold" style={{ color }}>
              {category}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full bg-gradient-to-br from-blue-50 to-green-50 border border-green-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Wind className="h-5 w-5 text-green-700" />
              Air Quality Index Trend
            </CardTitle>
          </div>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info size={16} className="text-green-700" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Understanding AQI Trends</h4>
                <p className="text-sm text-muted-foreground">
                  This graph shows how air quality has changed over time, with colored 
                  zones representing different air quality categories:
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: aqiCategories[0].color }}></div>
                    <span>Good (0-20): Minimal health risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: aqiCategories[1].color }}></div>
                    <span>Fair (21-40): Low health risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: aqiCategories[2].color }}></div>
                    <span>Moderate (41-60): Moderate health concern</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: aqiCategories[3].color }}></div>
                    <span>Poor (61+): Health risks for sensitive groups</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" opacity={0.5} />
              <XAxis 
                dataKey="year"
                domain={['dataMin', 'dataMax']}
                type="number"
                allowDecimals={false}
                tickCount={6}
              />
              <YAxis 
                domain={[0, yAxisMax]}
                label={{ value: 'AQI Value', angle: -90, position: 'insideLeft', offset: -5 }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* AQI Category Zones */}
              <ReferenceArea y1={0} y2={20} fill={aqiCategories[0].color} fillOpacity={0.5} />
              <ReferenceArea y1={20} y2={40} fill={aqiCategories[1].color} fillOpacity={0.5} />
              <ReferenceArea y1={40} y2={60} fill={aqiCategories[2].color} fillOpacity={0.5} />
              <ReferenceArea y1={60} y2={yAxisMax} fill={aqiCategories[3].color} fillOpacity={0.5} />
              
              {/* AQI Line */}
              <Area 
                type="monotone" 
                dataKey="aqi" 
                stroke="#FF5252" 
                strokeWidth={3}
                fillOpacity={0}
                activeDot={{ r: 6, stroke: "#FF5252", strokeWidth: 2, fill: "white" }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-2">
          {aqiCategories.map((category, index) => (
            <div 
              key={index} 
              className="text-center p-2 rounded-md" 
              style={{ backgroundColor: category.color }}
            >
              <span className="font-medium text-sm">{category.label}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm">
          <p className="text-gray-600">
            There is a strong correlation between forest cover decline and increasing AQI values.
            Areas with higher forest density typically show better air quality readings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityTrend;
