
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { getStateById } from '@/data/mockData';
import ExecutiveSummary from './Reports/ExecutiveSummary';
import KeyStatistics from './Reports/KeyStatistics';
import TrendAnalysis from './Reports/TrendAnalysis';
import Recommendations from './Reports/Recommendations';
import { generateStateSpecificStats } from './Reports/utils/reportHelpers';
import StateComparison from '../Tables/StateComparison';
import DistrictComparison from '../Tables/DistrictComparison';

interface ForestReportTabProps {
  stateId: string;
}

const ForestReportTab: React.FC<ForestReportTabProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  const stateName = stateData ? stateData.name : 'India';
  
  // Generate state-specific data based on stateId
  const stateStats = generateStateSpecificStats(stateId);
  
  // CSS for animating the bars in the chart
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scale-in {
        from {
          transform: scaleY(0);
          opacity: 0;
        }
        to {
          transform: scaleY(1);
          opacity: 1;
        }
      }
      
      @keyframes draw-path {
        to {
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Calculate state-specific forest percentages
  const denseForestPercentage = 39 + (stateId === 'IN' ? 0 : parseInt(stateId.charAt(1), 36) % 10);
  const openForestPercentage = 42 - (stateId === 'IN' ? 0 : parseInt(stateId.charAt(0), 36) % 10);
  
  return (
    <Card className="bg-white shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-green-900 to-green-700 p-4 flex items-center gap-3">
          <FileText className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">
            Forest Status Report: {stateName}
          </h3>
        </div>
        
        {/* Executive Summary */}
        <ExecutiveSummary 
          stateName={stateName}
          stateId={stateId}
          denseForestPercentage={denseForestPercentage}
          openForestPercentage={openForestPercentage}
          growthRate={stateStats.growthRate}
        />
        
        {/* Key Statistics */}
        <KeyStatistics 
          forestDensity={stateStats.forestDensity}
          deforestation={stateStats.deforestation}
          biodiversity={stateStats.biodiversity}
          forestHealth={stateStats.forestHealth}
        />
        
        {/* Trend Analysis */}
        <TrendAnalysis 
          stateId={stateId}
          stateName={stateName}
          growthRate={stateStats.growthRate}
          annualData={stateStats.annualData}
        />
        
        {/* State & District Comparison Analysis */}
        <div className="p-6 bg-blue-50 border-t border-blue-100">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">State & District Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StateComparison mode="positive" />
            <StateComparison mode="negative" />
          </div>
          
          <div className="mt-6">
            <DistrictComparison mode="positive" stateId={stateId} />
          </div>
          
          <div className="mt-6">
            <DistrictComparison mode="negative" stateId={stateId} />
          </div>
        </div>
        
        {/* Recommendations */}
        <Recommendations 
          stateName={stateName} 
          timelineYear={2020}
        />
      </CardContent>
    </Card>
  );
};

export default ForestReportTab;
