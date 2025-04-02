
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
      <TabsList className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-1 shadow-md">
        <TabsTrigger 
          value="historical" 
          className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm flex items-center gap-1.5 rounded-lg transition-all"
        >
          <CalendarDays className="h-4 w-4" />
          <span className="hidden sm:inline">Historical</span>
          <span className="sm:hidden">2013-24</span>
        </TabsTrigger>
        <TabsTrigger 
          value="projected" 
          className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm flex items-center gap-1.5 rounded-lg transition-all"
        >
          <CalendarClock className="h-4 w-4" />
          <span className="hidden sm:inline">Projected</span>
          <span className="sm:hidden">2025-30</span>
        </TabsTrigger>
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm flex items-center gap-1.5 rounded-lg transition-all"
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
