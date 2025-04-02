
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TreeDeciduous, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getStateById } from '@/data/mockData';

interface ForestCoverChangeProps {
  stateId: string;
}

const ForestCoverChange: React.FC<ForestCoverChangeProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  // Calculate forest cover change in kha (kilohectares)
  const firstYearData = stateData.forestData[0];
  const lastYearData = stateData.forestData[stateData.forestData.length - 1];
  const lastProjectedData = stateData.projectedData[stateData.projectedData.length - 1];
  
  // Convert from sq km to kha (1 sq km = 100 hectares, 1 kha = 1000 hectares)
  const historicalChange = (lastYearData.totalForestCover - firstYearData.totalForestCover) / 10;
  const projectedChange = (lastProjectedData.totalForestCover - lastYearData.totalForestCover) / 10;
  
  // Calculate percentage changes
  const historicalPercentChange = (historicalChange / (firstYearData.totalForestCover / 10)) * 100;
  const projectedPercentChange = (projectedChange / (lastYearData.totalForestCover / 10)) * 100;
  
  // Gain/loss categories
  const isHistoricalGain = historicalChange >= 0;
  const isProjectedGain = projectedChange >= 0;
  
  return (
    <Card className="h-full bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-800 flex items-center gap-2">
          <TreeDeciduous className="h-5 w-5 text-green-700" />
          Forest Cover Change
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-lg p-4 ${isHistoricalGain ? 'bg-green-200' : 'bg-orange-200'}`}>
            <div className="text-lg font-semibold mb-1 flex items-center gap-2">
              <span>Historical Change</span>
              {isHistoricalGain ? (
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-orange-600" />
              )}
            </div>
            <div className="text-2xl font-bold mb-1">
              {isHistoricalGain ? '+' : ''}{historicalChange.toFixed(1)} kha
            </div>
            <div className="text-sm">
              {isHistoricalGain ? '+' : ''}{historicalPercentChange.toFixed(2)}% from {firstYearData.year} to {lastYearData.year}
            </div>
          </div>
          
          <div className={`rounded-lg p-4 ${isProjectedGain ? 'bg-green-200' : 'bg-orange-200'}`}>
            <div className="text-lg font-semibold mb-1 flex items-center gap-2">
              <span>Projected Change</span>
              {isProjectedGain ? (
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-orange-600" />
              )}
            </div>
            <div className="text-2xl font-bold mb-1">
              {isProjectedGain ? '+' : ''}{projectedChange.toFixed(1)} kha
            </div>
            <div className="text-sm">
              {isProjectedGain ? '+' : ''}{projectedPercentChange.toFixed(2)}% from {lastYearData.year} to {lastProjectedData.year}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white/80 rounded-lg">
          <h3 className="font-semibold mb-2">What this means</h3>
          <p className="text-sm text-gray-700">
            Forest cover change is measured in kilohectares (kha), where 1 kha equals 1,000 hectares or 10 sq km.
            {historicalChange >= 0 ? 
              ` ${stateData.name} has seen an overall forest gain of ${historicalChange.toFixed(1)} kha since ${firstYearData.year}.` : 
              ` ${stateData.name} has experienced a forest loss of ${Math.abs(historicalChange).toFixed(1)} kha since ${firstYearData.year}.`
            }
            {projectedChange >= 0 ?
              ` Future projections show continued forest recovery.` :
              ` Future projections show continued forest decline without intervention.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestCoverChange;
