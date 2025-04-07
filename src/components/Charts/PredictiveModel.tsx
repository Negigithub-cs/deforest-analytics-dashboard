
import React, { useState } from 'react';
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
  ReferenceLine,
  Brush
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById } from '@/data/mockData';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PredictiveModelProps {
  stateId: string;
}

const PredictiveModel: React.FC<PredictiveModelProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  const [showAlert, setShowAlert] = useState(true);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  // Get all data from 2013 including projections
  const data = [
    ...stateData.forestData,
    ...stateData.projectedData
  ];
  
  // Calculate if forest is declining or improving
  const firstProjected = stateData.projectedData[0];
  const lastProjected = stateData.projectedData[stateData.projectedData.length - 1];
  const isImproving = lastProjected.totalForestCover > firstProjected.totalForestCover;
  
  // Calculate percentage change for projection
  const projectedChange = ((lastProjected.totalForestCover - firstProjected.totalForestCover) / 
                          firstProjected.totalForestCover * 100).toFixed(1);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentYear = new Date().getFullYear();
      const isProjectedYear = label > currentYear;
      
      return (
        <div className="bg-white p-3 border rounded-md shadow-md text-sm">
          <p className="font-bold mb-1 flex items-center gap-1">
            Year: {label} {isProjectedYear && <span className="text-xs font-normal text-muted-foreground">(Projected)</span>}
          </p>
          
          {payload.map((entry: any, index: number) => {
            // Skip showing totalForestCover in the tooltip for readability
            if (entry.dataKey === 'totalForestCover') return null;
            
            const name = entry.dataKey === 'veryDenseForest' ? 'Very Dense Forest' :
                         entry.dataKey === 'moderatelyDenseForest' ? 'Moderately Dense' :
                         entry.dataKey === 'openForest' ? 'Open Forest' : entry.name;
                         
            return (
              <div key={`item-${index}`} className="flex justify-between gap-4">
                <span style={{ color: entry.color }}>{name}:</span>
                <span className="font-semibold">{Number(entry.value).toLocaleString()} sq km</span>
              </div>
            );
          })}
          
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex justify-between gap-4">
              <span className="text-forest-dark font-medium">Total Forest:</span>
              <span className="font-semibold">{Number(payload[0].payload.totalForestCover).toLocaleString()} sq km</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Find the transition year between historical and projected data
  const lastHistoricalIndex = stateData.forestData.length - 1;
  const lastHistoricalData = stateData.forestData[lastHistoricalIndex];
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <CardTitle className="text-xl text-green-800">Forest Cover History & Projection</CardTitle>
              <CardDescription>
                Historical data (2013-2024) and future projections (2025-2030) for {stateData.name}
              </CardDescription>
            </div>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info size={16} />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Understanding the Forest Cover Model</h4>
                  <p className="text-sm text-muted-foreground">
                    This chart shows historical forest cover since 2013 and projected changes through 2030 based on current trends.
                    The model accounts for existing conservation efforts, climate impacts, and land use patterns.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • The stacked bars show forest composition by density category<br />
                    • The dashed line shows projected total forest cover<br />
                    • The vertical red line indicates where projections begin<br />
                    • Use the brush below to zoom into specific years
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showAlert && (
          <Alert 
            className={`mb-4 border-l-4 ${isImproving ? 'border-l-green-700' : 'border-l-orange-500'}`}
            variant="default"
          >
            {isImproving ? null : <AlertTriangle className="h-4 w-4 text-orange-500" />}
            <AlertDescription className="text-sm">
              {isImproving 
                ? <span>Forest cover in {stateData.name} is projected to <strong className="text-green-700">increase by {Math.abs(Number(projectedChange))}%</strong> by 2030 based on current conservation trends.</span>
                : <span>Forest cover in {stateData.name} is projected to <strong className="text-orange-500">decrease by {Math.abs(Number(projectedChange))}%</strong> by 2030 if current deforestation trends continue.</span>
              }
              <button 
                className="ml-2 text-xs underline text-muted-foreground"
                onClick={() => setShowAlert(false)}
              >
                Dismiss
              </button>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis 
                dataKey="year" 
                scale="auto"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                label={{ value: 'Area (sq km)', angle: -90, position: 'insideLeft', offset: -5 }} 
                tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                iconType="circle" 
                iconSize={10}
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <ReferenceLine 
                x={lastHistoricalData.year} 
                stroke="#FF5722" 
                strokeDasharray="3 3"
                label={{ 
                  value: 'Projection Start', 
                  position: 'top',
                  fill: '#FF5722',
                  fontSize: 11
                }}
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
                legendType="none"
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
                activeDot={{ r: 6, strokeWidth: 1 }}
              />
              
              <Bar 
                dataKey="veryDenseForest" 
                name="Very Dense Forest" 
                stackId="a" 
                fill="#1B5E20"
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="moderatelyDenseForest" 
                name="Moderately Dense" 
                stackId="a" 
                fill="#4CAF50" 
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="openForest" 
                name="Open Forest" 
                stackId="a" 
                fill="#8BC34A" 
                radius={[0, 0, 4, 4]}
              />
              
              <Brush 
                dataKey="year" 
                height={20} 
                stroke="#2E7D32" 
                startIndex={0}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 bg-muted/20 p-3 rounded-md text-xs">
          <p className="font-medium mb-1">Model Insights:</p>
          <p className="text-muted-foreground">
            {isImproving 
              ? `${stateData.name}'s conservation efforts are projected to yield positive results, with dense forest areas showing the most significant improvements by 2030.`
              : `${stateData.name} faces significant challenges in forest preservation. Without intervention, open forest areas are most vulnerable to continued loss.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveModel;
