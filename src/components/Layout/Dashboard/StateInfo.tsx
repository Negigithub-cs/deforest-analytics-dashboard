
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Trees } from 'lucide-react';
import { getStateById } from '@/data/mockData';

interface StateInfoProps {
  selectedState: string;
}

const StateInfo: React.FC<StateInfoProps> = ({ selectedState }) => {
  const stateData = getStateById(selectedState);
  
  if (!stateData) return null;
  
  const renderStatusIndicator = () => {
    const { deforestationRate, conservationStatus } = stateData;
    const isPositive = deforestationRate < 0.5;
    
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Badge 
          className={`text-white ${isPositive ? 'bg-green-600' : 'bg-orange-500'}`}
        >
          {isPositive ? (
            <ArrowUp className="mr-1 h-4 w-4" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4" />
          )}
          {deforestationRate.toFixed(1)}% Annual Change
        </Badge>
        <Badge 
          variant="outline" 
          className="border-2"
          style={{ 
            borderColor: isPositive ? '#2E7D32' : '#F44336',
            color: isPositive ? '#2E7D32' : '#F44336'
          }}
        >
          {conservationStatus}
        </Badge>
      </div>
    );
  };

  return (
    <Card className="mb-6 border-l-4 hover:shadow-md transition-shadow duration-200 bg-gradient-to-r from-green-50 to-blue-50" 
      style={{ borderLeftColor: stateData.deforestationRate < 0.5 ? '#2E7D32' : '#F44336' }}>
      <CardContent className="py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-green-800">
              <Trees className="h-5 w-5 text-green-700" />
              {stateData.name} Forest Analysis
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedState === 'IN' 
                ? 'Nationwide forest cover trends and environmental impact analysis'
                : 'State-level forest cover analysis and district comparison'}
            </p>
          </div>
          {renderStatusIndicator()}
        </div>
      </CardContent>
    </Card>
  );
};

export default StateInfo;
