
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { getStateById } from '@/data/mockData';
import MapLegend from './MapLegend';
import SimpleStateMap from './SimpleStateMap';
import { Leaf, Trees, Mountain } from 'lucide-react';

interface IndiaMapProps {
  selectedState: string;
  onStateSelect: (stateId: string) => void;
  selectedYear?: number;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ 
  selectedState, 
  onStateSelect,
  selectedYear = 2024 
}) => {
  const [showInfo, setShowInfo] = useState(true);
  const [forestDensityView, setForestDensityView] = useState(true);
  const [animateIcons, setAnimateIcons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Start the animation after a delay
    const timer = setTimeout(() => {
      setAnimateIcons(true);
    }, 500);
    
    // Simulate map loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(loadTimer);
    };
  }, []);
  
  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };
  
  const getMapTitle = () => {
    const currentYear = new Date().getFullYear();
    const yearDisplay = selectedYear > currentYear ? `${selectedYear} (Projected)` : selectedYear;
    
    if (selectedState === 'IN') {
      return `India Forest Cover Map - ${yearDisplay}`;
    } else {
      const state = getStateById(selectedState);
      return state ? `${state.name} Forest Cover Map - ${yearDisplay}` : `India Forest Cover Map - ${yearDisplay}`;
    }
  };
  
  return (
    <Card className="h-full overflow-visible shadow-lg border-green-200">
      <CardHeader className="bg-gradient-to-r from-green-800 to-green-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
            {getMapTitle()}
          </CardTitle>
          
          <div className="flex space-x-3">
            <Leaf 
              className={`h-5 w-5 text-green-200 transition-all duration-1000 ${animateIcons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
              style={{ transitionDelay: '200ms' }}
            />
            <Trees 
              className={`h-5 w-5 text-green-100 transition-all duration-1000 ${animateIcons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '400ms' }}
            />
            <Mountain 
              className={`h-5 w-5 text-green-200 transition-all duration-1000 ${animateIcons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '600ms' }}
            />
          </div>
        </div>
        <CardDescription className="text-green-50">
          Interactive visualization of forest coverage across the region
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[340px] bg-green-50 rounded-lg">
            <div className="flex gap-2 items-end mb-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center"
                >
                  <div 
                    className="w-1 bg-green-600 rounded-full"
                    style={{ 
                      height: `${20 + i * 10}px`,
                      animation: `scale-in 0.6s ease-out infinite alternate`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                  <Trees 
                    className="h-6 w-6 text-green-700 mt-1"
                    style={{ 
                      animation: `fade-in 0.5s ease-out forwards`,
                      animationDelay: `${i * 0.15}s`,
                      opacity: 0
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="text-green-700 animate-pulse">Loading forest coverage data...</p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-full animate-fade-in">
              {showInfo && <MapLegend showForestDensity={forestDensityView} />}
              <SimpleStateMap 
                selectedState={selectedState}
                onStateSelect={onStateSelect}
                forestDensityView={forestDensityView}
                selectedYear={selectedYear}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IndiaMap;
