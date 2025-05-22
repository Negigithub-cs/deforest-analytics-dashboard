
import React from 'react';
import StateInfo from './StateInfo';
import KeyInsights from './KeyInsights';
import ForestCoverChange from '@/components/Charts/ForestCoverChange';
import DashboardTabs from './DashboardTabs';

interface DashboardContentProps {
  selectedState: string;
  timeRange: string;
  selectedYear: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleStateChange: (stateId: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  selectedState,
  timeRange,
  selectedYear,
  activeTab,
  setActiveTab,
  handleStateChange
}) => {
  return (
    <>
      {/* State Info */}
      <StateInfo selectedState={selectedState} />
      
      {/* Key Insights Section - Always show */}
      <KeyInsights 
        selectedState={selectedState} 
        showInsights={true} 
      />
      
      {/* Forest Cover Change Summary */}
      <ForestCoverChange stateId={selectedState} />
      
      {/* Dashboard Tabs */}
      <DashboardTabs 
        selectedState={selectedState}
        timeRange={timeRange}
        selectedYear={selectedYear}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStateSelect={handleStateChange}
      />
    </>
  );
};

export default DashboardContent;
