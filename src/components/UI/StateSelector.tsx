
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
      <SelectTrigger className="w-[280px] bg-white">
        <SelectValue placeholder="Select state">{getDisplayValue()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>National Overview</SelectLabel>
          <SelectItem value="IN">Overall</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>States & Union Territories</SelectLabel>
          {allStates
            .filter(state => state.id !== 'IN')
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(state => (
              <SelectItem key={state.id} value={state.id}>
                {state.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StateSelector;
