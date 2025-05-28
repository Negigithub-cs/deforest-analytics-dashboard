
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { getStateById } from '@/data/mainData';
import ExecutiveSummary from './Reports/ExecutiveSummary';
import KeyStatistics from './Reports/KeyStatistics';
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
  
  // Calculate state-specific forest percentages
  const denseForestPercentage = 39 + (stateId === 'IN' ? 0 : parseInt(stateId.charAt(1), 36) % 10);
  const openForestPercentage = 42 - (stateId === 'IN' ? 0 : parseInt(stateId.charAt(0), 36) % 10);
  
  return (
    <Card className="bg-white shadow-md overflow-hidden">
      <CardContent className="p-0">
        {/* Report Header */}
        <div className="bg-gradient-to-r from-green-900 to-green-700 p-6 flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-lg">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">
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
        
        {/* State & District Comparison Analysis - Improved Visual Design */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-white border-t border-blue-100">
          <h4 className="text-xl font-semibold text-blue-800 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-md mr-2">
              <FileText className="h-5 w-5" />
            </span>
            State & District Analysis
          </h4>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Top Performers Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
              <h5 className="text-lg font-semibold text-green-700 mb-4">Conservation Leaders</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stateId === 'IN' ? (
                  <StateComparison mode="positive" />
                ) : (
                  <DistrictComparison mode="positive" stateId={stateId} />
                )}
                {stateId === 'IN' ? (
                  <StateComparison mode="negative" />
                ) : (
                  <DistrictComparison mode="negative" stateId={stateId} />
                )}
              </div>
            </div>
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
