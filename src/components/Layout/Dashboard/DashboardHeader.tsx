
import React from 'react';
import { TreeDeciduous, Globe2 } from 'lucide-react';
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
    <div className="relative overflow-hidden rounded-xl shadow-lg mb-8">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1601821236989-99924dff697a?q=80&w=1200&auto=format')`
      }}></div>
      <div className="relative z-10 bg-gradient-to-r from-green-900/90 to-green-600/90 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-3 rounded-full shadow-lg animate-pulse">
                <Globe2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                <span className="animate-fade-in">India Forest Analysis</span>
              </h1>
            </div>
            <div className="relative">
              <p className="text-green-50 font-medium text-lg ml-16">
                Tracking forest cover changes with advanced analytics
              </p>
              <div className="absolute -top-6 -right-12 opacity-20">
                <TreeDeciduous className="h-28 w-28 text-green-50" />
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default DashboardHeader;
