
import React from 'react';
import { BadgeAlert } from 'lucide-react';

interface ExecutiveSummaryProps {
  stateName: string;
  stateId: string;
  denseForestPercentage: number;
  openForestPercentage: number;
  growthRate: number;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  stateName,
  stateId,
  denseForestPercentage,
  openForestPercentage,
  growthRate
}) => {
  return (
    <div className="p-6 bg-amber-50 border-b border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <BadgeAlert className="h-5 w-5 text-amber-700" />
        <h4 className="text-lg font-semibold text-amber-800">Executive Summary</h4>
      </div>
      <p className="text-amber-800">
        The forest coverage in {stateName} shows varied patterns across regions. Dense forests represent {denseForestPercentage}% of total forest cover, 
        while open forests constitute {openForestPercentage}%. There's been a moderate {growthRate.toFixed(1)}% increase in overall forest cover since the last assessment.
      </p>
    </div>
  );
};

export default ExecutiveSummary;
