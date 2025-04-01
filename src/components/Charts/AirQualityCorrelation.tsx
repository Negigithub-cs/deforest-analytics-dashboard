
import React from 'react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ZAxis,
  Legend,
  Label
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById, getAQIColor } from '@/data/mockData';

interface AirQualityCorrelationProps {
  stateId: string;
  timeRange: string;
}

const AirQualityCorrelation: React.FC<AirQualityCorrelationProps> = ({ stateId, timeRange }) => {
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  // Prepare data based on selected time range
  const getData = () => {
    let data;
    if (timeRange === 'historical') {
      data = stateData.forestData;
    } else if (timeRange === 'projected') {
      data = stateData.projectedData;
    } else {
      data = [...stateData.forestData, ...stateData.projectedData];
    }
    
    return data.map(yearData => ({
      year: yearData.year,
      forestCover: yearData.totalForestCover,
      airQualityIndex: yearData.airQualityIndex,
      aqi: yearData.airQualityIndex, // For tooltip labeling
      color: getAQIColor(yearData.airQualityIndex),
    }));
  };
  
  const data = getData();
  
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="font-medium mb-1">{`Year: ${payload[0].payload.year}`}</p>
          <p className="text-sm">{`Forest Cover: ${Number(payload[0].payload.forestCover).toLocaleString()} sq km`}</p>
          <p className="text-sm">{`Air Quality Index: ${payload[0].payload.airQualityIndex.toFixed(1)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Air Quality Correlation</CardTitle>
        <CardDescription>
          Relationship between forest cover and air quality in {stateData.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="forestCover" 
                name="Forest Cover"
                domain={['auto', 'auto']}
              >
                <Label value="Forest Cover (sq km)" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="airQualityIndex" 
                name="Air Quality Index"
                domain={[0, 'dataMax + 20']}
              >
                <Label value="Air Quality Index" angle={-90} position="insideLeft" />
              </YAxis>
              <ZAxis type="number" range={[100, 100]} />
              <Tooltip content={customTooltip} />
              <Legend />
              <Scatter 
                name="Year Data" 
                data={data} 
                fill="#8884d8"
                shape={(props) => {
                  const { cx, cy } = props;
                  const { color, year } = props.payload;
                  const currentYear = new Date().getFullYear();
                  const size = year === currentYear ? 10 : 8;
                  const label = year >= 2025 ? `${year}` : '';
                  
                  return (
                    <g>
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={size} 
                        fill={color} 
                        stroke="#fff" 
                        strokeWidth={1} 
                      />
                      {year === currentYear && (
                        <text x={cx + 10} y={cy} textAnchor="start" fill="#333" fontSize={10}>
                          Current Year
                        </text>
                      )}
                      {label && (
                        <text x={cx + 10} y={cy} textAnchor="start" fill="#333" fontSize={10}>
                          {label}
                        </text>
                      )}
                    </g>
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCorrelation;
