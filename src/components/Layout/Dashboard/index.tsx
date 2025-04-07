
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getStateById } from '@/data/mockData';
import DashboardHeader from './DashboardHeader';
import StateInfo from './StateInfo';
import KeyInsights from './KeyInsights';
import ForestCoverChange from '@/components/Charts/ForestCoverChange';
import DashboardTabs from './DashboardTabs';
import DashboardFooter from './DashboardFooter';
import { TreeDeciduous, TreePine, Trees, Mountain, Leaf, Sprout, CloudRain, Sun } from 'lucide-react';

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
          <div className="relative w-72 h-72">
            {/* Sun element */}
            <Sun 
              className="absolute top-3 left-3 text-amber-400 animate-pulse" 
              style={{ animationDuration: '3s' }}
              size={48}
            />
            
            {/* Background */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-b from-blue-100 to-blue-50 opacity-70"></div>
            
            {/* Ground/Earth element */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-800 to-amber-700 rounded-full"></div>
            
            {/* Clouds */}
            <CloudRain 
              className="absolute top-6 right-12 text-blue-300 animate-bounce opacity-80" 
              style={{ animationDuration: '4s', animationDelay: '0.2s' }}
              size={28}
            />
            
            <CloudRain 
              className="absolute top-12 left-20 text-blue-200 animate-bounce opacity-70" 
              style={{ animationDuration: '3.5s', animationDelay: '0.7s' }}
              size={24}
            />
            
            {/* Trees growing animation */}
            <div className="absolute bottom-14 left-1/4 transform -translate-x-1/2" 
              style={{ 
                animation: 'scale-in 1.2s ease-out forwards',
                transformOrigin: 'bottom center'
              }}>
              <TreePine className="h-16 w-16 text-green-800" />
            </div>
            
            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2" 
              style={{ 
                animation: 'scale-in 1.8s ease-out forwards',
                animationDelay: '0.3s',
                transformOrigin: 'bottom center'
              }}>
              <Trees className="h-24 w-24 text-green-700" />
            </div>
            
            <div className="absolute bottom-14 right-1/4 transform translate-x-1/2" 
              style={{ 
                animation: 'scale-in 1.5s ease-out forwards',
                animationDelay: '0.6s',
                transformOrigin: 'bottom center'
              }}>
              <TreeDeciduous className="h-20 w-20 text-green-600" />
            </div>
            
            {/* Small vegetation */}
            <div className="absolute bottom-12 left-12" 
              style={{ 
                animation: 'scale-in 1s ease-out forwards',
                animationDelay: '0.9s',
                transformOrigin: 'bottom center'
              }}>
              <Sprout className="h-8 w-8 text-green-500" />
            </div>
            
            <div className="absolute bottom-12 right-12" 
              style={{ 
                animation: 'scale-in 1s ease-out forwards',
                animationDelay: '1.1s',
                transformOrigin: 'bottom center'
              }}>
              <Sprout className="h-6 w-6 text-green-400" />
            </div>
            
            {/* Floating elements */}
            <Leaf 
              className="absolute top-1/3 left-1/4 text-green-400 animate-spin" 
              style={{ animationDuration: '6s' }}
              size={16}
            />
            
            <Leaf 
              className="absolute top-1/2 right-1/3 text-green-300 animate-spin" 
              style={{ animationDuration: '7s', animationDirection: 'reverse' }}
              size={14}
            />
            
            <Mountain 
              className="absolute top-1/3 right-1/4 text-green-200 animate-pulse" 
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
            <div className="relative w-64 h-3 bg-green-100 rounded-full overflow-hidden">
              {/* Growing plant loader */}
              <div className="h-full bg-gradient-to-r from-green-400 via-green-600 to-green-500 rounded-full" 
                style={{
                  width: '90%',
                  animation: 'grow-width 2s ease-in-out'
                }}
              ></div>
              {/* Small sprouts on loader */}
              <div className="absolute top-0 left-1/4 transform -translate-y-1/2">
                <Sprout className="h-4 w-4 text-green-700" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute top-0 left-2/4 transform -translate-y-1/2">
                <Sprout className="h-4 w-4 text-green-700" style={{ animationDelay: '1s' }} />
              </div>
              <div className="absolute top-0 left-3/4 transform -translate-y-1/2">
                <Sprout className="h-4 w-4 text-green-700" style={{ animationDelay: '1.5s' }} />
              </div>
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
