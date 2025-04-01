import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine,
  ReferenceArea,
  DataKey
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById, StateData, ForestData } from '@/data/mockData';
import { Button } from "@/components/ui/button";
import { ChevronDown, Maximize2, RefreshCw, ZoomIn } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ForestCoverTrendProps {
  stateId: string;
  timeRange: string;
}

const ForestCoverTrend: React.FC<ForestCoverTrendProps> = ({ stateId, timeRange }) => {
  const stateData = getStateById(stateId);
  const [focusDataKey, setFocusDataKey] = useState<string | null>(null);
  const [showAllLines, setShowAllLines] = useState(true);
  const [showProjectionArea, setShowProjectionArea] = useState(true);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
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
  const projectionStartYear = Math.max(...stateData.forestData.map(d => d.year));
  
  const handleLegendClick = (dataKey: DataKey<any>) => {
    const key = dataKey as string;
    if (focusDataKey === key) {
      setFocusDataKey(null);
      setShowAllLines(true);
    } else {
      setFocusDataKey(key);
      setShowAllLines(false);
    }
  };
  
  const resetView = () => {
    setFocusDataKey(null);
    setShowAllLines(true);
  };
  
  const formatYAxis = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };
  
  const getDataKeyVisibility = (dataKey: string) => {
    if (showAllLines) return true;
    return focusDataKey === dataKey;
  };
  
  const renderLegendText = (value: string) => {
    const mapping: Record<string, string> = {
      "totalForestCover": "Total Forest Cover",
      "veryDenseForest": "Very Dense Forest",
      "moderatelyDenseForest": "Moderately Dense Forest",
      "openForest": "Open Forest",
      "scrub": "Scrub"
    };
    
    return mapping[value] || value;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md text-sm">
          <p className="font-bold mb-1">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="flex justify-between gap-4">
              <span>{renderLegendText(entry.dataKey as string)}:</span> 
              <span className="font-semibold">{Number(entry.value).toLocaleString()} sq km</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Forest Cover Trend</CardTitle>
          <CardDescription>
            {stateData.name}'s forest cover changes over time
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetView}
            className="h-8 gap-1"
            disabled={showAllLines}
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ZoomIn size={14} />
                <span className="hidden sm:inline">Options</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowAllLines(!showAllLines)}>
                {showAllLines ? "Focus on one line at a time" : "Show all lines"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowProjectionArea(!showProjectionArea)}>
                {showProjectionArea ? "Hide projection area" : "Show projection area"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                domain={['dataMin', 'dataMax']}
                type="number"
                tickCount={7}
                allowDecimals={false}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tickFormatter={formatYAxis}
                label={{ value: 'Area (sq km)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                onClick={(e) => handleLegendClick(e.dataKey)}
                formatter={(value) => renderLegendText(value as string)}
                wrapperStyle={{ paddingTop: '10px' }}
              />
              
              <ReferenceLine 
                x={currentYear} 
                stroke="#F44336" 
                strokeDasharray="3 3"
                yAxisId="left"
                label={{ value: 'Current Year', position: 'top', fill: '#F44336' }}
              />
              
              {showProjectionArea && timeRange === 'all' && (
                <ReferenceArea 
                  x1={projectionStartYear} 
                  x2={data[data.length-1].year} 
                  yAxisId="left"
                  fill="#8884d808" 
                  fillOpacity={0.3} 
                  stroke="#8884d8" 
                  strokeOpacity={0.3}
                  strokeDasharray="3 3"
                  label={{ 
                    value: 'Projected Data', 
                    position: 'insideTopRight',
                    fill: '#8884d8'
                  }}
                />
              )}
              
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="totalForestCover" 
                name="Total Forest Cover"
                stroke="#2E7D32" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
                hide={!getDataKeyVisibility("totalForestCover")}
                animationDuration={500}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="veryDenseForest" 
                name="Very Dense Forest"
                stroke="#1B5E20" 
                dot={{ r: 3 }}
                hide={!getDataKeyVisibility("veryDenseForest")}
                animationDuration={500}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="moderatelyDenseForest" 
                name="Moderately Dense Forest"
                stroke="#4CAF50" 
                dot={{ r: 3 }}
                hide={!getDataKeyVisibility("moderatelyDenseForest")}
                animationDuration={500}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="openForest" 
                name="Open Forest"
                stroke="#8BC34A" 
                dot={{ r: 3 }}
                hide={!getDataKeyVisibility("openForest")}
                animationDuration={500}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="scrub" 
                name="Scrub"
                stroke="#A1887F" 
                dot={{ r: 3 }}
                hide={!getDataKeyVisibility("scrub")}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {!showAllLines && focusDataKey && (
          <div className="mt-4 bg-muted/30 p-3 rounded-md text-sm">
            <p className="font-medium">Currently focused on: {renderLegendText(focusDataKey)}</p>
            <p className="text-muted-foreground text-xs mt-1">Click on the same legend item again or the Reset button to show all lines</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ForestCoverTrend;
