
import React from 'react';
import { 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Geography } from 'react-simple-maps';
import { getStateById } from '@/data/mockData';
import { formatYear } from '@/lib/utils';

interface StateTooltipProps {
  geo: any;
  stateId: string;
  stateName: string;
  getStateFill: (stateId: string) => string;
  handleStateMouseEnter: (geo: any) => void;
  handleStateMouseLeave: () => void;
  handleStateClick: (geo: any) => void;
  forestDensityView: boolean;
  selectedYear?: number;
}

const StateTooltip: React.FC<StateTooltipProps> = ({
  geo,
  stateId,
  stateName,
  getStateFill,
  handleStateMouseEnter,
  handleStateMouseLeave,
  handleStateClick,
  forestDensityView,
  selectedYear = 2024
}) => {
  const stateData = getStateById(stateId);
  const currentYear = new Date().getFullYear();
  const isProjected = selectedYear > currentYear;
  
  // Get the data for the selected year
  const getYearData = () => {
    if (!stateData) return null;
    
    const allData = [...stateData.forestData, ...stateData.projectedData];
    return allData.find(data => data.year === selectedYear);
  };
  
  const yearData = getYearData();
  
  return (
    <>
      <TooltipTrigger asChild>
        <Geography
          geography={geo}
          fill={getStateFill(stateId)}
          stroke="#FFFFFF"
          strokeWidth={0.75}
          style={{
            default: {
              fill: getStateFill(stateId),
              stroke: "#FFFFFF",
              strokeWidth: 0.75,
              outline: "none"
            },
            hover: {
              fill: "#2E7D32",
              stroke: "#FFFFFF",
              strokeWidth: 0.75,
              outline: "none",
              cursor: "pointer"
            },
            pressed: {
              fill: "#1B5E20",
              stroke: "#FFFFFF",
              strokeWidth: 0.75,
              outline: "none"
            }
          }}
          onMouseEnter={() => handleStateMouseEnter(geo)}
          onMouseLeave={handleStateMouseLeave}
          onClick={() => handleStateClick(geo)}
        />
      </TooltipTrigger>
      {stateId && (
        <TooltipContent>
          <div>
            <p className="font-bold">{stateName}</p>
            <p className="text-xs text-muted-foreground mb-1">
              {isProjected ? `Projected for ${selectedYear}` : `Data for ${selectedYear}`}
            </p>
            
            {stateData && yearData && (
              <>
                <p>Conservation Status: {stateData.conservationStatus}</p>
                <p>Deforestation Rate: {stateData.deforestationRate.toFixed(1)}%</p>
                {forestDensityView && (
                  <p>Forest Cover: {Math.round((yearData.totalForestCover / 
                    (yearData.totalForestCover + yearData.nonForest)) * 100)}%</p>
                )}
                <p>Total Forest: {Math.round(yearData.totalForestCover).toLocaleString()} sq km</p>
              </>
            )}
          </div>
        </TooltipContent>
      )}
    </>
  );
};

export default StateTooltip;
