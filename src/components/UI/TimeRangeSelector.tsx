
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeRangeSelectorProps {
  selectedTimeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  selectedTimeRange, 
  onTimeRangeChange 
}) => {
  return (
    <Tabs defaultValue={selectedTimeRange} onValueChange={onTimeRangeChange}>
      <TabsList className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <TabsTrigger value="historical" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
          Historical (2013-2024)
        </TabsTrigger>
        <TabsTrigger value="projected" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
          Projected (2025-2030)
        </TabsTrigger>
        <TabsTrigger value="all" className="data-[state=active]:bg-forest-light data-[state=active]:text-white">
          All Data
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TimeRangeSelector;
