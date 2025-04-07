
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getStateById } from '@/data/mockData';
import DashboardHeader from './DashboardHeader';
import StateInfo from './StateInfo';
import KeyInsights from './KeyInsights';
import ForestCoverChange from '@/components/Charts/ForestCoverChange';
import DashboardTabs from './DashboardTabs';
import DashboardFooter from './DashboardFooter';
import { LeafyGreen, Sprout, Trees, Mountain, Leaf } from 'lucide-react';

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
    }, 2200);
    
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
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {/* Loading animation with forest elements */}
            <div className="relative w-32 h-32">
              <Trees 
                className="absolute top-4 left-0 text-green-600 animate-bounce" 
                style={{ animationDuration: '2s', animationDelay: '0.1s' }}
                size={48}
              />
              <Leaf 
                className="absolute top-0 left-14 text-green-500 animate-bounce" 
                style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}
                size={32}
              />
              <Mountain 
                className="absolute bottom-0 right-2 text-green-700 animate-bounce" 
                style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
                size={42}
              />
              <Sprout 
                className="absolute bottom-6 left-8 text-green-400 animate-bounce" 
                style={{ animationDuration: '1.7s', animationDelay: '0.2s' }}
                size={28}
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-2 animate-pulse">Forest Analytics Dashboard</h2>
            <p className="text-green-600">Loading the latest forest coverage data...</p>
            <div className="mt-3 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
          </div>
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
