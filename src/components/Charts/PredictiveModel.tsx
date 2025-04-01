
import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById } from '@/data/mockData';

interface PredictiveModelProps {
  stateId: string;
}

const PredictiveModel: React.FC<PredictiveModelProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  // Get the last historical data point and all projected data
  const lastHistoricalIndex = stateData.forestData.length - 1;
  const lastHistoricalData = stateData.forestData[lastHistoricalIndex];
  
  // Combine last few historical points with projections for continuity
  const data = [
    ...stateData.forestData.slice(-3),
    ...stateData.projectedData
  ];
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Predictive Forest Cover Model</CardTitle>
        <CardDescription>
          Projected forest cover changes for {stateData.name} (2025-2030)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="year" scale="auto" />
              <YAxis 
                label={{ value: 'Area (sq km)', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} sq km`, undefined]} 
              />
              <Legend />
              <ReferenceLine 
                x={lastHistoricalData.year} 
                stroke="#FF5722" 
                strokeDasharray="3 3"
                label={{ value: 'Projection Start', position: 'top' }}
              />
              
              {/* Historical Data */}
              <Area 
                type="monotone" 
                dataKey="totalForestCover" 
                name="Historical Total Cover"
                fill="#4CAF50" 
                stroke="#2E7D32"
                fillOpacity={0.3}
                activeDot={false}
                connectNulls
                isAnimationActive={false}
              />
              
              {/* Projected Data */}
              <Line 
                type="monotone" 
                dataKey="totalForestCover" 
                name="Projected Total Cover"
                stroke="#2E7D32" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
                connectNulls
              />
              
              <Bar 
                dataKey="veryDenseForest" 
                name="Very Dense Forest" 
                stackId="a" 
                fill="#1B5E20"
                barSize={20}
              />
              <Bar 
                dataKey="moderatelyDenseForest" 
                name="Moderately Dense" 
                stackId="a" 
                fill="#4CAF50" 
              />
              <Bar 
                dataKey="openForest" 
                name="Open Forest" 
                stackId="a" 
                fill="#8BC34A" 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveModel;
