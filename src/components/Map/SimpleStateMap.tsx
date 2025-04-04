
import React from 'react';
import { getStateById, getAllStates } from '@/data/mockData';
import { 
  TooltipProvider, 
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";

interface SimpleStateMapProps {
  selectedState: string;
  onStateSelect: (stateId: string) => void;
  forestDensityView: boolean;
  selectedYear: number;
}

const SimpleStateMap: React.FC<SimpleStateMapProps> = ({
  selectedState,
  onStateSelect,
  forestDensityView,
  selectedYear
}) => {
  const states = getAllStates().filter(state => state.id !== 'IN');
  const currentYear = new Date().getFullYear();
  const isProjected = selectedYear > currentYear;
  
  const getForestCoverPercentage = (stateId: string) => {
    const stateData = getStateById(stateId);
    if (!stateData) return 0;
    
    // Find data for the specific year
    const allYearData = [...stateData.forestData, ...stateData.projectedData];
    const yearData = allYearData.find(data => data.year === selectedYear);
    
    if (!yearData) return 0;
    
    const totalArea = yearData.totalForestCover + yearData.nonForest;
    return (yearData.totalForestCover / totalArea) * 100;
  };
  
  const getStateFill = (stateId: string) => {
    if (stateId === selectedState) {
      return "border-4 border-blue-600";
    }
    
    if (forestDensityView) {
      const forestPercent = getForestCoverPercentage(stateId);
      
      if (forestPercent > 60) return "bg-green-800"; // Dark green - very dense
      if (forestPercent > 40) return "bg-green-600"; // Medium green - moderately dense
      if (forestPercent > 20) return "bg-green-400"; // Light green - open forest
      if (forestPercent > 10) return "bg-green-200"; // Very light green - minimal forest
      return "bg-gray-200"; // Gray - almost no forest
    } else {
      const stateData = getStateById(stateId);
      if (!stateData) return "bg-gray-200";
      
      switch (stateData.conservationStatus) {
        case 'Excellent': return "bg-green-800";
        case 'Good': return "bg-green-500";
        case 'Fair': return "bg-yellow-500";
        case 'Poor': return "bg-orange-500";
        case 'Critical': return "bg-red-500";
        default: return "bg-gray-200";
      }
    }
  };
  
  return (
    <TooltipProvider>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-wrap justify-center items-start gap-3 max-h-[320px] overflow-y-auto">
        {states.sort((a, b) => a.name.localeCompare(b.name)).map(state => {
          const forestPercent = getForestCoverPercentage(state.id);
          const stateData = getStateById(state.id);
          
          return (
            <Tooltip key={state.id}>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => onStateSelect(state.id)}
                  className={`w-16 h-16 rounded-md flex items-center justify-center transition-all hover:scale-105 ${getStateFill(state.id)}`}
                >
                  <span className="text-xs font-semibold text-white drop-shadow-md">{state.id}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  <p className="font-bold">{state.name}</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {isProjected ? `Projected for ${selectedYear}` : `Data for ${selectedYear}`}
                  </p>
                  
                  {stateData && (
                    <>
                      <p>Conservation Status: {stateData.conservationStatus}</p>
                      <p>Deforestation Rate: {stateData.deforestationRate.toFixed(1)}%</p>
                      {forestDensityView && (
                        <p>Forest Cover: {Math.round(forestPercent)}%</p>
                      )}
                    </>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default SimpleStateMap;
