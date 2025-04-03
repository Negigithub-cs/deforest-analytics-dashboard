
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatYear } from '@/lib/utils';

interface TimeSliderProps {
  minYear: number;
  maxYear: number;
  currentYear: number;
  onChange: (year: number) => void;
  showProjected?: boolean;
}

const TimeSlider: React.FC<TimeSliderProps> = ({ 
  minYear, 
  maxYear, 
  currentYear, 
  onChange,
  showProjected = true
}) => {
  const currentYearDate = new Date().getFullYear();
  
  const handleSliderChange = (value: number[]) => {
    onChange(value[0]);
  };
  
  const getYearLabel = (year: number): string => {
    if (year > currentYearDate) {
      return `${year} (Projected)`;
    }
    return year.toString();
  };
  
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Forest Cover Time Machine</span>
          <span className="text-base font-medium">
            {getYearLabel(currentYear)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="px-1">
          <Slider
            defaultValue={[currentYear]}
            min={minYear}
            max={maxYear}
            step={1}
            value={[currentYear]}
            onValueChange={handleSliderChange}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minYear}</span>
            <span className={currentYearDate >= minYear && currentYearDate <= maxYear ? "text-primary font-medium" : ""}>
              {currentYearDate}
            </span>
            <span>{showProjected && maxYear > currentYearDate ? `${maxYear} (Projected)` : maxYear}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSlider;
