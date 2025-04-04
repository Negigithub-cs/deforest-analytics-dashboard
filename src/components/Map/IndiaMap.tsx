
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
  const [forestDensityView, setForestDensityView] = useState(true);
  
  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };
  
  const handleToggleView = () => {
    setForestDensityView(!forestDensityView);
  };
  
  const getMapTitle = () => {
    const currentYear = new Date().getFullYear();
    const yearDisplay = selectedYear > currentYear ? `${selectedYear} (Projected)` : selectedYear;
    
    return forestDensityView 
      ? `Forest Density View - ${yearDisplay}` 
      : `State-wise Forest Status - ${yearDisplay}`;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          {getMapTitle()}
        </CardTitle>
        <CardDescription>
          {forestDensityView 
            ? "Visualizing the percentage of land covered by forests across states" 
            : "View conservation status of forests across states"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-full mb-4 flex justify-end gap-2">
            <button 
              onClick={handleToggleView}
              className="px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors text-sm"
            >
              {forestDensityView ? "Conservation View" : "Forest Density View"}
            </button>
            <button 
              onClick={handleToggleInfo}
              className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors text-sm"
            >
              {showInfo ? "Hide Legend" : "Show Legend"}
            </button>
          </div>
          
          <div className="relative w-full">
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
