
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StateSelector from '@/components/UI/StateSelector';
import TimeRangeSelector from '@/components/UI/TimeRangeSelector';
import IndiaMap from '@/components/Map/IndiaMap';
import ForestCoverTrend from '@/components/Charts/ForestCoverTrend';
import ForestTypeDistribution from '@/components/Charts/ForestTypeDistribution';
import AirQualityCorrelation from '@/components/Charts/AirQualityCorrelation';
import PredictiveModel from '@/components/Charts/PredictiveModel';
import StateComparison from '@/components/Tables/StateComparison';
import { getStateById } from '@/data/mockData';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Tree, TreeDeciduous } from 'lucide-react';

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState('IN');
  const [timeRange, setTimeRange] = useState('historical');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeTab, setActiveTab] = useState('overview');
  
  const stateData = getStateById(selectedState);
  
  // Update selected year when time range changes
  useEffect(() => {
    if (timeRange === 'historical') {
      setSelectedYear(2024);
    } else if (timeRange === 'projected') {
      setSelectedYear(2030);
    }
  }, [timeRange]);
  
  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };
  
  const renderStatusIndicator = () => {
    if (!stateData) return null;
    
    const { deforestationRate, conservationStatus } = stateData;
    const isPositive = deforestationRate < 0.5;
    
    return (
      <div className="flex items-center gap-2">
        <Badge 
          className={`text-white ${isPositive ? 'bg-forest-dark' : 'bg-alert'}`}
        >
          {isPositive ? (
            <ArrowUp className="mr-1 h-4 w-4" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4" />
          )}
          {deforestationRate.toFixed(1)}% Annual Change
        </Badge>
        <Badge 
          variant="outline" 
          className="border-2"
          style={{ 
            borderColor: isPositive ? '#2E7D32' : '#F44336',
            color: isPositive ? '#2E7D32' : '#F44336'
          }}
        >
          {conservationStatus}
        </Badge>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TreeDeciduous className="h-8 w-8 text-forest" />
            India Deforestation Analytics
          </h1>
          <p className="text-muted-foreground">
            Tracking forest cover changes and environmental impacts from 2013-2030
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <StateSelector 
            selectedState={selectedState} 
            onStateChange={handleStateChange} 
          />
          <TimeRangeSelector 
            selectedTimeRange={timeRange} 
            onTimeRangeChange={handleTimeRangeChange} 
          />
        </div>
      </div>
      
      {/* State Info */}
      {stateData && (
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Tree className="h-5 w-5 text-forest" />
                  {stateData.name} Forest Analysis
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedState === 'IN' 
                    ? 'Nationwide forest cover and deforestation trends'
                    : 'State-level forest cover and deforestation analysis'}
                </p>
              </div>
              {renderStatusIndicator()}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends & Predictions</TabsTrigger>
          <TabsTrigger value="comparison">State Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IndiaMap 
              selectedState={selectedState} 
              onStateSelect={handleStateChange} 
            />
            <ForestTypeDistribution 
              stateId={selectedState} 
              year={selectedYear} 
            />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <ForestCoverTrend 
              stateId={selectedState} 
              timeRange={timeRange} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AirQualityCorrelation 
              stateId={selectedState} 
              timeRange={timeRange} 
            />
            <PredictiveModel 
              stateId={selectedState} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StateComparison mode="positive" />
            <StateComparison mode="negative" />
          </div>
        </TabsContent>
      </Tabs>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Data visualization of forest cover trends in India from 2013-2030</p>
        <p className="mt-1">Explore the impact of deforestation on air quality and climate</p>
      </footer>
    </div>
  );
};

export default Dashboard;
