
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getStateById } from '@/data/mockData';
import DashboardHeader from './DashboardHeader';
import StateInfo from './StateInfo';
import KeyInsights from './KeyInsights';
import ForestCoverChange from '@/components/Charts/ForestCoverChange';
import DashboardTabs from './DashboardTabs';
import DashboardFooter from './DashboardFooter';
import { TreeDeciduous, TreePine, Trees, Mountain, Leaf, Sprout, CloudRain } from 'lucide-react';

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
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100">
        <div className="flex flex-col items-center gap-6">
          {/* Enhanced forest-themed loading animation */}
          <div className="relative w-64 h-64">
            {/* Background elements */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-b from-blue-50 to-blue-100 opacity-50"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-t from-green-50 to-green-100 opacity-70"></div>
            
            {/* Ground/Earth element */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-amber-700 to-amber-600 rounded-full"></div>
            
            {/* Rain cloud */}
            <CloudRain 
              className="absolute top-2 right-8 text-blue-300 animate-bounce opacity-70" 
              style={{ animationDuration: '3s', animationDelay: '0.5s' }}
              size={24}
            />
            
            {/* Trees & Plants */}
            <Trees 
              className="absolute bottom-8 left-6 text-green-700 animate-bounce" 
              style={{ animationDuration: '2s', animationDelay: '0.1s' }}
              size={48}
            />
            <TreeDeciduous 
              className="absolute bottom-8 left-24 text-green-600 animate-bounce" 
              style={{ animationDuration: '2.2s', animationDelay: '0.3s' }}
              size={42}
            />
            <TreePine 
              className="absolute bottom-8 right-10 text-green-800 animate-bounce" 
              style={{ animationDuration: '1.8s', animationDelay: '0.5s' }}
              size={46}
            />
            <Sprout 
              className="absolute bottom-8 right-32 text-green-500 animate-bounce" 
              style={{ animationDuration: '1.5s', animationDelay: '0.7s' }}
              size={28}
            />
            
            {/* Foreground elements */}
            <Leaf 
              className="absolute top-16 left-10 text-green-400 animate-spin" 
              style={{ animationDuration: '8s' }}
              size={18}
            />
            <Leaf 
              className="absolute top-24 right-16 text-green-300 animate-spin" 
              style={{ animationDuration: '6s', animationDirection: 'reverse' }}
              size={14}
            />
            <Mountain 
              className="absolute top-28 left-32 text-green-200 animate-pulse" 
              style={{ animationDuration: '4s' }}
              size={20}
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-3 animate-pulse">
              Forest Analytics Dashboard
            </h2>
            <p className="text-green-600 mb-4">
              Loading the latest forest coverage data...
            </p>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 via-green-600 to-green-500 rounded-full" 
                style={{
                  width: '85%',
                  animation: 'grow-width 2.2s ease-in-out'
                }}></div>
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
