
import React, { useState } from 'react';
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
  Label,
  ReferenceArea
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById, getAQIColor } from '@/data/mockData';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Info, ZoomIn, ZoomOut } from "lucide-react";

interface AirQualityCorrelationProps {
  stateId: string;
  timeRange: string;
}

const AirQualityCorrelation: React.FC<AirQualityCorrelationProps> = ({ stateId, timeRange }) => {
  const stateData = getStateById(stateId);
  const [zoomDomain, setZoomDomain] = useState<any>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomBoxStart, setZoomBoxStart] = useState<any>(null);
  
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
      isProjected: yearData.year >= 2025
    }));
  };
  
  const data = getData();
  const currentYear = new Date().getFullYear();
  
  const handleChartMouseDown = (e: any) => {
    if (!isZooming || !e) return;
    
    setZoomBoxStart({
      x: e.xValue,
      y: e.yValue
    });
  };
  
  const handleChartMouseMove = (e: any) => {
    // Implementation for zooming preview if needed
  };
  
  const handleChartMouseUp = (e: any) => {
    if (!isZooming || !zoomBoxStart || !e) return;
    
    const xMin = Math.min(zoomBoxStart.x, e.xValue);
    const xMax = Math.max(zoomBoxStart.x, e.xValue);
    const yMin = Math.min(zoomBoxStart.y, e.yValue);
    const yMax = Math.max(zoomBoxStart.y, e.yValue);
    
    // Only zoom if area is significant
    if (xMax - xMin > 100 && yMax - yMin > 5) {
      setZoomDomain({
        x: [xMin, xMax],
        y: [yMin, yMax]
      });
    }
    
    setZoomBoxStart(null);
  };
  
  const resetZoom = () => {
    setZoomDomain(null);
    setIsZooming(false);
    setZoomBoxStart(null);
  };
  
  const toggleZoom = () => {
    if (isZooming) {
      setIsZooming(false);
      setZoomBoxStart(null);
    } else {
      setIsZooming(true);
    }
  };
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const aqiLevel = getAQICategory(data.airQualityIndex);
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm text-sm">
          <p className="font-medium mb-1">{`Year: ${data.year}`} {data.isProjected && "(Projected)"}</p>
          <div className="flex justify-between gap-4">
            <span>Forest Cover:</span>
            <span className="font-bold">{Number(data.forestCover).toLocaleString()} sq km</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Air Quality Index:</span>
            <span className="font-bold" style={{ color: data.color }}>{data.airQualityIndex.toFixed(1)} ({aqiLevel})</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {getAQIDescription(data.airQualityIndex)}
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Function to determine AQI category
  const getAQICategory = (aqi: number): string => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };
  
  // Function to get AQI description
  const getAQIDescription = (aqi: number): string => {
    if (aqi <= 50) return "Air quality is considered satisfactory";
    if (aqi <= 100) return "Air quality is acceptable but may be a concern for sensitive people";
    if (aqi <= 150) return "Sensitive groups may experience health effects";
    if (aqi <= 200) return "Everyone may begin to experience health effects";
    if (aqi <= 300) return "Health warnings of emergency conditions for everyone";
    return "Health alert: everyone may experience more serious health effects";
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <CardTitle>Air Quality Correlation</CardTitle>
              <CardDescription>
                Relationship between forest cover and air quality in {stateData.name}
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
                  <h4 className="font-medium">Understanding Air Quality Correlation</h4>
                  <p className="text-sm text-muted-foreground">
                    This chart shows how forest cover impacts air quality. Each point represents a year of data, 
                    with points colored according to the Air Quality Index (AQI).
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    <p className="font-medium mb-1">AQI Scale:</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> 0-50: Good</div>
                      <div className="flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span> 51-100: Moderate</div>
                      <div className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span> 101-150: Unhealthy for Sensitive Groups</div>
                      <div className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span> 151-200: Unhealthy</div>
                      <div className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span> 201-300: Very Unhealthy</div>
                      <div className="flex items-center"><span className="w-2 h-2 bg-rose-900 rounded-full mr-1"></span> 301+: Hazardous</div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={toggleZoom}
          >
            {isZooming ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
            <span className="hidden sm:inline">{isZooming ? "Cancel" : "Zoom"}</span>
          </Button>
          
          {zoomDomain && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={resetZoom}
            >
              Reset View
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 30, left: 30 }}
              onMouseDown={handleChartMouseDown}
              onMouseMove={handleChartMouseMove}
              onMouseUp={handleChartMouseUp}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="forestCover" 
                name="Forest Cover"
                domain={zoomDomain ? zoomDomain.x : ['auto', 'auto']}
                padding={{ left: 10, right: 10 }}
                tickCount={5}
                tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
              >
                <Label value="Forest Cover (sq km)" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="airQualityIndex" 
                name="Air Quality Index"
                domain={zoomDomain ? zoomDomain.y : [0, 'dataMax + 20']}
                padding={{ top: 10 }}
              >
                <Label value="Air Quality Index" angle={-90} position="insideLeft" offset={-10} />
              </YAxis>
              <ZAxis type="number" range={[100, 500]} />
              <Tooltip content={customTooltip} />
              <Legend 
                verticalAlign="top" 
                align="center"
                payload={[
                  { value: 'Historical', type: 'circle', color: '#2E7D32' },
                  { value: 'Projected', type: 'diamond', color: '#2E7D32' }
                ]}
              />
              <Scatter 
                name="Historical" 
                data={data.filter(d => !d.isProjected)} 
                shape={(props) => {
                  const { cx, cy, payload } = props;
                  const size = payload.year === currentYear ? 12 : 8;
                  
                  return (
                    <g>
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={size} 
                        fill={payload.color} 
                        fillOpacity={0.8}
                        stroke="#fff" 
                        strokeWidth={1} 
                      />
                      {payload.year === currentYear && (
                        <text x={cx + 10} y={cy} textAnchor="start" fill="#333" fontSize={10}>
                          Current
                        </text>
                      )}
                    </g>
                  );
                }}
              />
              <Scatter 
                name="Projected" 
                data={data.filter(d => d.isProjected)} 
                shape={(props) => {
                  const { cx, cy, payload } = props;
                  
                  return (
                    <g>
                      <polygon
                        points={`${cx},${cy-7} ${cx+7},${cy} ${cx},${cy+7} ${cx-7},${cy}`}
                        fill={payload.color}
                        fillOpacity={0.8}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                      {payload.year % 5 === 0 && (
                        <text x={cx + 10} y={cy} textAnchor="start" fill="#333" fontSize={10}>
                          {payload.year}
                        </text>
                      )}
                    </g>
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 bg-muted/20 p-3 rounded-md text-xs">
          <p className="font-medium mb-1">Key Insights:</p>
          <p className="text-muted-foreground">
            {stateData.deforestationRate < 0.5 
              ? `As forest cover increases in ${stateData.name}, air quality tends to improve (lower AQI). This demonstrates the importance of forests in maintaining clean air.`
              : `The declining forest cover in ${stateData.name} correlates with worsening air quality (higher AQI), highlighting the environmental impact of deforestation.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCorrelation;
