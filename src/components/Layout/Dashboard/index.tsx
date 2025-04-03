
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getStateById } from '@/data/mockData';
import DashboardHeader from './DashboardHeader';
import StateInfo from './StateInfo';
import KeyInsights from './KeyInsights';
import ForestCoverChange from '@/components/Charts/ForestCoverChange';
import DashboardTabs from './DashboardTabs';
import DashboardFooter from './DashboardFooter';
import TimeSlider from '@/components/UI/TimeSlider';

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState('IN');
  const [timeRange, setTimeRange] = useState('historical');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeTab, setActiveTab] = useState('overview');
  const [showInsights, setShowInsights] = useState(true);
  const { toast } = useToast();
  
  // Update selected year when time range changes
  useEffect(() => {
    if (timeRange === 'historical') {
      setSelectedYear(2024);
    } else if (timeRange === 'projected') {
      setSelectedYear(2030);
    }
  }, [timeRange]);

  useEffect(() => {
    // Show welcome toast on initial load
    toast({
      title: "Welcome to the Forest Cover Analytics",
      description: "Explore forest cover changes across India. Select a state to begin.",
      duration: 5000,
    });
  }, []);
  
  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    
    // Show notification on state change
    if (stateId !== 'IN') {
      const state = getStateById(stateId);
      if (state) {
        toast({
          title: `${state.name} Selected`,
          description: `Forest cover: ${state.forestData[state.forestData.length-1].totalForestCover.toLocaleString()} sq km`,
          duration: 3000,
        });
      }
    }
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    
    // Update time range based on year
    if (year <= 2024) {
      setTimeRange('historical');
    } else {
      setTimeRange('projected');
    }
  };

  return (
    <div className="container mx-auto py-6 min-h-screen">
      {/* Header */}
      <DashboardHeader 
        selectedState={selectedState}
        timeRange={timeRange}
        onStateChange={handleStateChange}
        onTimeRangeChange={handleTimeRangeChange}
      />
      
      {/* State Info */}
      <StateInfo selectedState={selectedState} />
      
      {/* Key Insights Section */}
      <KeyInsights 
        selectedState={selectedState} 
        showInsights={showInsights} 
      />
      
      {/* Time Slider */}
      <TimeSlider 
        minYear={2013}
        maxYear={2030}
        currentYear={selectedYear}
        onChange={handleYearChange}
      />
      
      {/* Forest Cover Change Summary */}
      <ForestCoverChange stateId={selectedState} />
      
      {/* Dashboard Tabs */}
      <DashboardTabs 
        selectedState={selectedState}
        timeRange={timeRange}
        selectedYear={selectedYear}
        activeTab={activeTab}
        showInsights={showInsights}
        setActiveTab={setActiveTab}
        setShowInsights={setShowInsights}
        onStateSelect={handleStateChange}
      />
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
