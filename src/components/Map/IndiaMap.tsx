
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
  const [showInfo, setShowInfo] = useState(false);
  
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          {getMapTitle()}
        </CardTitle>
        <CardDescription>
          Visualizing the geographic distribution of forest cover
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-full mb-4 flex justify-end gap-2">
            <button 
              onClick={handleToggleInfo}
              className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors text-sm"
            >
              {showInfo ? "Hide Legend" : "Show Legend"}
            </button>
          </div>
          
          <div className="relative w-full">
            {showInfo && <MapLegend showForestDensity={true} />}
            <SimpleStateMap 
              selectedState={selectedState}
              onStateSelect={onStateSelect}
              forestDensityView={true}
              selectedYear={selectedYear}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaMap;
