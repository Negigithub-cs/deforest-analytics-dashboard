
import React, { useState } from 'react';
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
    <Card className="h-full overflow-visible">
      <CardHeader className="bg-gradient-to-r from-green-800 to-green-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
          {getMapTitle()}
        </CardTitle>
        <CardDescription className="text-green-50">
          Visualizing the geographic distribution of forest cover
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
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
      </CardContent>
    </Card>
  );
};

export default IndiaMap;
