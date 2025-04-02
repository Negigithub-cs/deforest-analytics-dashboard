
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
  ReferenceArea,
  LineChart,
  Line,
  ReferenceLine
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AirQualityCorrelationProps {
  stateId: string;
  timeRange: string;
}

const AirQualityCorrelation: React.FC<AirQualityCorrelationProps> = ({ stateId, timeRange }) => {
  const stateData = getStateById(stateId);
  const [zoomDomain, setZoomDomain] = useState<any>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomBoxStart, setZoomBoxStart] = useState<any>(null);
  const [analysisTab, setAnalysisTab] = useState('correlation');
  
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
  
  // Prepare line chart data
  const getLineData = () => {
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
      aqi: yearData.airQualityIndex,
      color: getAQIColor(yearData.airQualityIndex),
      isProjected: yearData.year >= 2025
    }));
  };
  
  const data = getData();
  const lineData = getLineData();
  const currentYear = new Date().getFullYear();
  
  // Calculate correlation coefficient between forest cover and air quality
  const calculateCorrelation = () => {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    
    for (const item of data) {
      sumX += item.forestCover;
      sumY += item.airQualityIndex;
      sumXY += item.forestCover * item.airQualityIndex;
      sumX2 += item.forestCover * item.forestCover;
      sumY2 += item.airQualityIndex * item.airQualityIndex;
    }
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    if (denominator === 0) return 0;
    return numerator / denominator;
  };
  
  const correlationCoefficient = calculateCorrelation();
  const correlationStrength = Math.abs(correlationCoefficient);
  
  const getCorrelationDescription = () => {
    if (correlationStrength > 0.7) {
      return correlationCoefficient < 0 ? 
        "Strong negative correlation: As forest cover increases, air pollution decreases significantly." :
        "Strong positive correlation: As forest cover increases, air pollution increases significantly.";
    } else if (correlationStrength > 0.3) {
      return correlationCoefficient < 0 ? 
        "Moderate negative correlation: As forest cover increases, air pollution tends to decrease." :
        "Moderate positive correlation: As forest cover increases, air pollution tends to increase.";
    } else {
      return "Weak correlation: Forest cover and air pollution show limited relationship in this region.";
    }
  };
  
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
      const aqiLevel = getAQICategory(data.airQualityIndex || data.aqi);
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm text-sm">
          <p className="font-medium mb-1">{`Year: ${data.year}`} {data.isProjected && "(Projected)"}</p>
          {data.forestCover && (
            <div className="flex justify-between gap-4">
              <span>Forest Cover:</span>
              <span className="font-bold">{Number(data.forestCover).toLocaleString()} sq km</span>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <span>Air Quality Index:</span>
            <span className="font-bold" style={{ color: data.color }}>
              {(data.airQualityIndex || data.aqi).toFixed(1)} ({aqiLevel})
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {getAQIDescription(data.airQualityIndex || data.aqi)}
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
  
  // Analysis text based on the selected state and data
  const getDetailedAnalysis = () => {
    const firstYear = data[0];
    const lastYear = data[data.length - 1];
    const forestChange = ((lastYear.forestCover - firstYear.forestCover) / firstYear.forestCover * 100).toFixed(1);
    const aqiChange = (lastYear.airQualityIndex - firstYear.airQualityIndex).toFixed(1);
    
    return (
      <div className="text-sm space-y-3">
        <p>
          <span className="font-medium">Overview:</span> Forest cover in {stateData.name} has 
          {Number(forestChange) >= 0 ? " increased" : " decreased"} by {Math.abs(Number(forestChange))}% 
          from {firstYear.year} to {lastYear.year}, while the Air Quality Index has 
          {Number(aqiChange) >= 0 ? " increased" : " decreased"} by {Math.abs(Number(aqiChange))} points.
        </p>
        
        <p>
          <span className="font-medium">Statistical Analysis:</span> The correlation coefficient between 
          forest cover and air quality is {correlationCoefficient.toFixed(2)}, indicating a 
          {correlationCoefficient < 0 ? " negative" : " positive"} correlation of 
          {correlationStrength > 0.7 ? " strong" : correlationStrength > 0.3 ? " moderate" : " weak"} strength.
        </p>
        
        <p>
          <span className="font-medium">Interpretation:</span> {getCorrelationDescription()}
        </p>
        
        <p>
          <span className="font-medium">Contributing Factors:</span> The relationship between forest cover and air quality
          in {stateData.name} is influenced by industrial activity, urban density, geographical features, 
          and seasonal variations. Forests act as natural air filters by absorbing pollutants and producing oxygen.
        </p>
        
        <p>
          <span className="font-medium">Recommendations:</span> Based on this analysis, 
          {correlationCoefficient < -0.3 ? 
            " increasing forest cover could significantly improve air quality in this region." : 
            " additional factors beyond forest cover need to be addressed to improve air quality in this region."}
        </p>
      </div>
    );
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <CardTitle>Air Quality Analysis</CardTitle>
              <CardDescription>
                Air quality trends and correlation with forest cover in {stateData.name}
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
                  <h4 className="font-medium">Understanding Air Quality Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    This analysis shows how forest cover impacts air quality over time. 
                    The correlation chart shows the relationship between forest cover and AQI,
                    while the trend chart shows AQI changes over time.
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
        <Tabs value={analysisTab} onValueChange={setAnalysisTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
            <TabsTrigger value="trend">AQI Trend</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="correlation">
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
              <p className="font-medium mb-1">Correlation Analysis:</p>
              <p className="text-muted-foreground">
                {getCorrelationDescription()} The correlation coefficient is {correlationCoefficient.toFixed(2)}.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="trend">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{ top: 20, right: 20, bottom: 30, left: 30 }}
                  data={lineData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    type="number" 
                    domain={['dataMin', 'dataMax']}
                    tickCount={5}
                  >
                    <Label value="Year" offset={-10} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    domain={[0, 'dataMax + 20']}
                  >
                    <Label value="Air Quality Index" angle={-90} position="insideLeft" offset={-10} />
                  </YAxis>
                  <Tooltip content={customTooltip} />
                  <Legend 
                    verticalAlign="top" 
                    align="center"
                    payload={[
                      { value: 'AQI Over Time', type: 'line', color: '#FF9800' }
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="aqi"
                    stroke="#FF9800"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props as any;
                      return (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={6} 
                          fill={payload.color} 
                          stroke="#fff"
                          strokeWidth={1}
                        />
                      );
                    }}
                    activeDot={{ r: 8 }}
                  />
                  {/* Add a reference line for good air quality threshold */}
                  <ReferenceLine y={50} stroke="#4CAF50" strokeDasharray="3 3" label="Good AQI Threshold" />
                  {/* Add a reference line for moderate air quality threshold */}
                  <ReferenceLine y={100} stroke="#FFEB3B" strokeDasharray="3 3" label="Moderate AQI Threshold" />
                  {/* Add a reference line for unhealthy air quality threshold */}
                  <ReferenceLine y={150} stroke="#FF9800" strokeDasharray="3 3" label="Unhealthy AQI Threshold" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 bg-muted/20 p-3 rounded-md text-xs">
              <p className="font-medium mb-1">AQI Trend Analysis:</p>
              <p className="text-muted-foreground">
                The air quality in {stateData.name} has {
                  lineData[lineData.length-1].aqi > lineData[0].aqi 
                    ? "deteriorated" 
                    : "improved"
                } over time. {
                  lineData[lineData.length-1].aqi > 100 
                    ? "Current levels are concerning and pose health risks to sensitive groups or the general population."
                    : "Current levels are within acceptable ranges for most of the population."
                }
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="p-4 bg-muted/20 rounded-md">
              {getDetailedAnalysis()}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AirQualityCorrelation;
