
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, Thermometer, Leaf } from 'lucide-react';
import ForestTypeDistribution from '@/components/Charts/ForestTypeDistribution';
import ForestCoverTrend from '@/components/Charts/ForestCoverTrend';
import AirQualityTrend from '@/components/Charts/AirQualityTrend';
import CorrelationAnalysis from '@/components/Charts/CorrelationAnalysis';
import PredictiveModel from '@/components/Charts/PredictiveModel';
import ForestConservationStatus from '@/components/Charts/ForestConservationStatus';
import ForestReportTab from '@/components/RealTime/ForestReportTab';
import EnvironmentalUpdates from '@/components/RealTime/EnvironmentalUpdates';
import ForestCoverSummary from '@/components/RealTime/Reports/ForestCoverSummary';
import { getStateById } from '@/data/mockData'; 

interface DashboardTabsProps {
  selectedState: string;
  timeRange: string;
  selectedYear: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStateSelect: (stateId: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  selectedState,
  timeRange,
  selectedYear,
  activeTab,
  setActiveTab,
  onStateSelect
}) => {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="relative mt-6">
      <div className="flex justify-between items-center mb-2">
        <TabsList className="mb-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-1.5 shadow-md">
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
            value="sustainability" 
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg transition-all"
          >
            <Leaf className="h-4 w-4 mr-2" />
            Forest Report
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="overview" className="space-y-6 animate-fade-in">
        {/* Forest Cover Summary added to the top of the Overview tab */}
        <div className="grid grid-cols-1 gap-6">
          <ForestCoverSummary 
            stateId={selectedState}
            stateName={selectedState === 'IN' ? 'India' : getStateById(selectedState)?.name || ''}
            deforestationRate={selectedState === 'IN' ? 2.1 : (getStateById(selectedState)?.deforestationRate || 2.0)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-bg-green rounded-lg p-1">
            <ForestConservationStatus 
              stateId={selectedState} 
              selectedYear={selectedYear}
            />
          </div>
          <div className="card-bg-blue rounded-lg p-1">
            <ForestTypeDistribution 
              stateId={selectedState} 
              year={selectedYear} 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="card-bg-purple rounded-lg p-1">
            <ForestCoverTrend 
              stateId={selectedState} 
              timeRange={timeRange} 
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="trends" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-bg-yellow rounded-lg p-1">
            <AirQualityTrend
              stateId={selectedState}
              timeRange={timeRange}
            />
          </div>
          <div className="card-bg-peach rounded-lg p-1">
            <CorrelationAnalysis 
              stateId={selectedState} 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="card-bg-green rounded-lg p-1">
            <PredictiveModel 
              stateId={selectedState} 
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="environment" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 gap-6">
          <EnvironmentalUpdates 
            stateId={selectedState} 
          />
        </div>
      </TabsContent>
      
      <TabsContent value="sustainability" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 gap-6">
          <ForestReportTab stateId={selectedState} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
