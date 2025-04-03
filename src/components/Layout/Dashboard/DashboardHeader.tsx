
import React from 'react';
import { TreeDeciduous } from 'lucide-react';
import StateSelector from '@/components/UI/StateSelector';
import TimeRangeSelector from '@/components/UI/TimeRangeSelector';

interface DashboardHeaderProps {
  selectedState: string;
  timeRange: string;
  onStateChange: (stateId: string) => void;
  onTimeRangeChange: (range: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  selectedState, 
  timeRange, 
  onStateChange, 
  onTimeRangeChange 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-gradient-to-r from-green-600 to-green-500 p-4 rounded-lg shadow-lg text-white">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TreeDeciduous className="h-8 w-8" />
          India Forest Cover Analysis
        </h1>
        <p className="text-green-100">
          Tracking forest cover changes and environmental impacts from 2013-2030
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <StateSelector 
          selectedState={selectedState} 
          onStateChange={onStateChange} 
        />
        <TimeRangeSelector 
          selectedTimeRange={timeRange} 
          onTimeRangeChange={onTimeRangeChange} 
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
