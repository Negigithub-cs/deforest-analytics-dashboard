
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById, StateData, ForestData } from '@/data/mockData';

interface ForestCoverTrendProps {
  stateId: string;
  timeRange: string;
}

const ForestCoverTrend: React.FC<ForestCoverTrendProps> = ({ stateId, timeRange }) => {
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  // Prepare data based on selected time range
  const getData = (): ForestData[] => {
    if (timeRange === 'historical') {
      return stateData.forestData;
    } else if (timeRange === 'projected') {
      return stateData.projectedData;
    } else {
      return [...stateData.forestData, ...stateData.projectedData];
    }
  };
  
  const data = getData();
  const currentYear = new Date().getFullYear();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Forest Cover Trend</CardTitle>
        <CardDescription>
          {stateData.name}'s forest cover changes over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                domain={['dataMin', 'dataMax']}
                type="number"
                tickCount={7}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                label={{ value: 'Area (sq km)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} sq km`, undefined]} />
              <Legend />
              <ReferenceLine 
                x={currentYear} 
                stroke="#F44336" 
                strokeDasharray="3 3"
                label={{ value: 'Current Year', position: 'top', fill: '#F44336' }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="totalForestCover" 
                name="Total Forest Cover"
                stroke="#2E7D32" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="veryDenseForest" 
                name="Very Dense Forest"
                stroke="#1B5E20" 
                dot={{ r: 3 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="moderatelyDenseForest" 
                name="Moderately Dense Forest"
                stroke="#4CAF50" 
                dot={{ r: 3 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="openForest" 
                name="Open Forest"
                stroke="#8BC34A" 
                dot={{ r: 3 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="scrub" 
                name="Scrub"
                stroke="#A1887F" 
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestCoverTrend;
