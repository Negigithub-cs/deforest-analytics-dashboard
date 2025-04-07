
import React from 'react';
import { getStateById, getAllStates } from '@/data/mockData';
import { 
  TooltipProvider, 
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import { MapPin, Trees, TreePine, TreeDeciduous, Map } from 'lucide-react';

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

  // India visualization with map icon
  const renderIndiaVisualization = () => (
    <div className="relative bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border border-green-200 flex flex-col justify-center items-center h-[320px]">
      <div className="absolute top-4 left-4">
        <span className="font-bold text-green-800 text-xl">India</span>
      </div>
      
      <div className="mb-6 relative">
        <div className="mb-4 flex justify-center">
          <Map className="h-24 w-24 text-green-700 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-5 gap-3 mb-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={`tree-${i}`}
              className="flex justify-center"
              style={{
                animation: `scale-in 0.6s ease-out forwards`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0
              }}
            >
              {i % 3 === 0 ? (
                <Trees className={`h-6 w-6 text-green-${600 + (i % 3) * 100}`} />
              ) : i % 3 === 1 ? (
                <TreePine className={`h-6 w-6 text-green-${700 - (i % 2) * 100}`} />
              ) : (
                <TreeDeciduous className={`h-6 w-6 text-green-${500 + (i % 4) * 100}`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">India's Forest Coverage</h3>
        <p className="text-green-700 mb-4">Explore state-specific data by selecting individual states</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Forest Area</p>
            <p className="text-xl font-bold text-green-700">7,12,249 sq km</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Coverage</p>
            <p className="text-xl font-bold text-green-700">21.67%</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Specific state visualization
  const renderStateVisualization = () => {
    const stateData = getStateById(selectedState);
    if (!stateData) return null;
    
    const latestData = stateData.forestData[stateData.forestData.length - 1];
    const forestPercent = (latestData.totalForestCover / (latestData.totalForestCover + latestData.nonForest)) * 100;
    const stateName = stateData.name;
    
    return (
      <div className="relative bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border border-green-200 flex flex-col justify-center items-center h-[320px]">
        <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-green-700" />
          <span className="font-medium text-green-800">{stateName}</span>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <React.Fragment key={i}>
                {i % 2 === 0 ? (
                  <TreePine 
                    className={`absolute h-12 w-12 text-green-${600 + i * 100}`}
                    style={{
                      top: `${Math.sin(i * 1.25) * 20}px`,
                      left: `${Math.cos(i * 1.25) * 20 + 24}px`,
                      animation: `fade-in 0.5s ease-out forwards`,
                      animationDelay: `${i * 0.15}s`,
                      opacity: 0,
                      zIndex: 5 - i
                    }}
                  />
                ) : (
                  <TreeDeciduous 
                    className={`absolute h-12 w-12 text-green-${600 + i * 100}`}
                    style={{
                      top: `${Math.sin(i * 1.25) * 20}px`,
                      left: `${Math.cos(i * 1.25) * 20 + 24}px`,
                      animation: `fade-in 0.5s ease-out forwards`,
                      animationDelay: `${i * 0.15}s`,
                      opacity: 0,
                      zIndex: 5 - i
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <h3 className="text-xl font-bold text-green-800 mb-3">
            {stateName} Forest Data
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Conservation Status</p>
            <p className="text-lg font-bold text-green-700">{stateData.conservationStatus}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Forest Coverage</p>
            <p className="text-lg font-bold text-green-700">{forestPercent.toFixed(1)}%</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Total Forest Area</p>
            <p className="text-lg font-bold text-green-700">{Math.round(latestData.totalForestCover).toLocaleString()} sq km</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Deforestation Rate</p>
            <p className="text-lg font-bold text-green-700">{stateData.deforestationRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render state blocks grid
  const renderStateBlocksGrid = () => (
    <TooltipProvider>
      <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border border-green-200 flex flex-wrap justify-center items-start gap-3 max-h-[320px] overflow-y-auto">
        {states.sort((a, b) => a.name.localeCompare(b.name)).map((state, index) => {
          const forestPercent = getForestCoverPercentage(state.id);
          const stateData = getStateById(state.id);
          
          return (
            <Tooltip key={state.id}>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => onStateSelect(state.id)}
                  className={`w-16 h-16 rounded-md flex items-center justify-center transition-all hover:scale-105 ${getStateFill(state.id)}`}
                  style={{
                    animation: 'scale-in 0.3s ease-out forwards',
                    animationDelay: `${index * 0.03}s`,
                    opacity: 0
                  }}
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

  // Main rendering decision tree
  const renderForestVisualization = () => {
    if (selectedState === "IN") {
      return renderIndiaVisualization();
    } else if (selectedState && selectedState !== "IN") {
      return renderStateVisualization();
    } else {
      return renderStateBlocksGrid();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {renderForestVisualization()}
    </div>
  );
};

export default SimpleStateMap;
