
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, Thermometer, MapPin, Info } from 'lucide-react';
import IndiaMap from '@/components/Map/IndiaMap';
import ForestTypeDistribution from '@/components/Charts/ForestTypeDistribution';
import ForestCoverTrend from '@/components/Charts/ForestCoverTrend';
import AirQualityTrend from '@/components/Charts/AirQualityTrend';
import CorrelationAnalysis from '@/components/Charts/CorrelationAnalysis';
import PredictiveModel from '@/components/Charts/PredictiveModel';
import DistrictComparison from '@/components/Tables/DistrictComparison';
import EnvironmentalUpdates from '@/components/RealTime/EnvironmentalUpdates';
import ForestFireAnalysis from '@/components/RealTime/ForestFireAnalysis';

interface DashboardTabsProps {
  selectedState: string;
  timeRange: string;
  selectedYear: number;
  activeTab: string;
  showInsights: boolean;
  setActiveTab: (tab: string) => void;
  setShowInsights: (show: boolean) => void;
  onStateSelect: (stateId: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  selectedState,
  timeRange,
  selectedYear,
  activeTab,
  showInsights,
  setActiveTab,
  setShowInsights,
  onStateSelect
}) => {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="relative mt-6">
      <div className="flex justify-between items-center mb-2">
        <TabsList className="mb-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-1 shadow-md">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg transition-all"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg transition-all"
          >
            <LineChart className="h-4 w-4 mr-2" />
            Trends & Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="environment" 
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg transition-all"
          >
            <Thermometer className="h-4 w-4 mr-2" />
            Climate Impact
          </TabsTrigger>
          <TabsTrigger 
            value="comparison" 
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg transition-all"
          >
            <MapPin className="h-4 w-4 mr-2" />
            {selectedState === 'IN' ? 'State Analysis' : 'District Analysis'}
          </TabsTrigger>
        </TabsList>
        
        <button 
          className="flex items-center gap-1 text-xs text-white hover:text-white/90 mb-4 bg-gradient-to-r from-blue-500 to-green-500 px-3 py-1 rounded-md"
          onClick={() => setShowInsights(!showInsights)}
        >
          <Info size={14} />
          {showInsights ? 'Hide' : 'Show'} Insights
        </button>
      </div>
      
      <TabsContent value="overview" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IndiaMap 
            selectedState={selectedState} 
            onStateSelect={onStateSelect}
            selectedYear={selectedYear}
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
      
      <TabsContent value="trends" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AirQualityTrend
            stateId={selectedState}
            timeRange={timeRange}
          />
          <CorrelationAnalysis 
            stateId={selectedState} 
          />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <PredictiveModel 
            stateId={selectedState} 
          />
        </div>
      </TabsContent>
      
      <TabsContent value="environment" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 gap-6">
          <EnvironmentalUpdates 
            stateId={selectedState} 
          />
        </div>
      </TabsContent>
      
      <TabsContent value="comparison" className="space-y-6 animate-fade-in">
        {selectedState === 'IN' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <DistrictComparison mode="positive" stateId={selectedState} />
            <DistrictComparison mode="negative" stateId={selectedState} />
            <ForestFireAnalysis stateId={selectedState} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <DistrictComparison mode="positive" stateId={selectedState} />
            <DistrictComparison mode="negative" stateId={selectedState} />
            <ForestFireAnalysis stateId={selectedState} />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
