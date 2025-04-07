
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllStates } from '@/data/mockData';

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (stateId: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ selectedState, onStateChange }) => {
  const allStates = getAllStates();
  
  // Find the selected state name to display
  const getDisplayValue = () => {
    if (selectedState === "IN") return "Overall";
    
    const state = allStates.find(state => state.id === selectedState);
    return state ? state.name : "Select state";
  };
  
  return (
    <Select value={selectedState} onValueChange={onStateChange}>
      <SelectTrigger className="w-[280px] bg-white font-semibold text-green-800 shadow-md">
        <SelectValue>{getDisplayValue()}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel className="text-green-700 font-medium">National Overview</SelectLabel>
          <SelectItem value="IN" className="hover:bg-green-50">Overall</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-green-700 font-medium">States & Union Territories</SelectLabel>
          {allStates
            .filter(state => state.id !== 'IN')
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(state => (
              <SelectItem key={state.id} value={state.id} className="hover:bg-green-50">
                {state.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StateSelector;
