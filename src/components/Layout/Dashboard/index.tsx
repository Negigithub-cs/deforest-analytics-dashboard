
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getStateById } from '@/data/mockData';
import DashboardHeader from './DashboardHeader';
import StateInfo from './StateInfo';
import KeyInsights from './KeyInsights';
import ForestCoverChange from '@/components/Charts/ForestCoverChange';
import DashboardTabs from './DashboardTabs';
import DashboardFooter from './DashboardFooter';

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState('IN');
  const [timeRange, setTimeRange] = useState('historical');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Update selected year when time range changes
  useEffect(() => {
    if (timeRange === 'historical') {
      setSelectedYear(2024);
    } else if (timeRange === 'projected') {
      setSelectedYear(2030);
    }
  }, [timeRange]);

  // Loading effect
  useEffect(() => {
    // Add loading animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    // Show welcome toast on initial load
    toast({
      title: "Welcome to the Forest Cover Analytics",
      description: "Explore forest cover changes across India. Select a state to begin.",
      duration: 5000,
    });
    
    return () => clearTimeout(timer);
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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 border-4 border-t-green-600 border-r-green-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <h2 className="text-2xl font-semibold text-green-800 animate-pulse">Loading Forest Analytics...</h2>
        </div>
      </div>
    );
  }

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
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
