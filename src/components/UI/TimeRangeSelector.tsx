
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarClock, Calendar } from "lucide-react";

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
        <TabsTrigger 
          value="historical" 
          className="data-[state=active]:bg-forest-light data-[state=active]:text-white flex items-center gap-1.5"
        >
          <CalendarDays className="h-4 w-4" />
          <span className="hidden sm:inline">Historical</span>
          <span className="sm:hidden">2013-24</span>
        </TabsTrigger>
        <TabsTrigger 
          value="projected" 
          className="data-[state=active]:bg-forest-light data-[state=active]:text-white flex items-center gap-1.5"
        >
          <CalendarClock className="h-4 w-4" />
          <span className="hidden sm:inline">Projected</span>
          <span className="sm:hidden">2025-30</span>
        </TabsTrigger>
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-forest-light data-[state=active]:text-white flex items-center gap-1.5"
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">All Data</span>
          <span className="sm:hidden">All</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TimeRangeSelector;
