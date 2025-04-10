
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { getStateById } from '@/data/mockData';
import ExecutiveSummary from './Reports/ExecutiveSummary';
import KeyStatistics from './Reports/KeyStatistics';
import TrendAnalysis from './Reports/TrendAnalysis';
import ConservationTimeline from './Reports/ConservationTimeline';
import Recommendations from './Reports/Recommendations';
import { generateStateSpecificStats } from './Reports/utils/reportHelpers';

interface ForestReportTabProps {
  stateId: string;
}

const ForestReportTab: React.FC<ForestReportTabProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  const stateName = stateData ? stateData.name : 'India';
  
  // Generate state-specific data based on stateId
  const stateStats = generateStateSpecificStats(stateId);
  const conservationTimeline = stateStats.generateConservationTimeline(stateName);
  
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
        
        {/* Conservation Timeline - State-specific */}
        <ConservationTimeline 
          stateName={stateName}
          conservationTimeline={conservationTimeline}
        />
        
        {/* Recommendations */}
        <Recommendations 
          stateName={stateName} 
          timelineYear={conservationTimeline[2]?.year || 2020}
        />
      </CardContent>
    </Card>
  );
};

export default ForestReportTab;
