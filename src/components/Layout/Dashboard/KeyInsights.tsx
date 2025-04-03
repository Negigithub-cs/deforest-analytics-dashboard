
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import { getStateById } from '@/data/mockData';

interface KeyInsightsProps {
  selectedState: string;
  showInsights: boolean;
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ selectedState, showInsights }) => {
  if (!showInsights) return null;
  
  const stateData = getStateById(selectedState);
  if (!stateData) return null;
  
  const { name, forestData, projectedData, deforestationRate } = stateData;
  const currentData = forestData[forestData.length - 1];
  const futureData = projectedData[projectedData.length - 1];
  const totalArea = currentData.totalForestCover + currentData.nonForest;
  const forestPercent = ((currentData.totalForestCover / totalArea) * 100).toFixed(1);
  const forecastChange = ((futureData.totalForestCover - currentData.totalForestCover) / currentData.totalForestCover * 100).toFixed(1);
  
  return (
    <Alert className="mb-6 border-l-4 border-l-green-600 bg-gradient-to-r from-green-50 to-blue-50 animate-fade-in">
      <Info className="h-4 w-4 text-green-700" />
      <AlertTitle className="text-green-800">Key Insights for {name}</AlertTitle>
      <AlertDescription>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="bg-white/60 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-800">Current Forest Cover</p>
            <p className="text-2xl font-bold text-green-700">{forestPercent}%</p>
            <p className="text-xs text-muted-foreground">of total geographical area</p>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-800">Annual Change Rate</p>
            <p className="text-2xl font-bold" style={{ color: deforestationRate < 0.5 ? '#2E7D32' : '#F44336' }}>
              {deforestationRate < 0 ? '+' : ''}{Math.abs(deforestationRate).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">{deforestationRate < 0.5 ? 'Growing' : 'Declining'} forest cover</p>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-800">2030 Forecast</p>
            <p className="text-2xl font-bold" style={{ color: Number(forecastChange) >= 0 ? '#2E7D32' : '#F44336' }}>
              {forecastChange}%
            </p>
            <p className="text-xs text-muted-foreground">Projected change by 2030</p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default KeyInsights;
