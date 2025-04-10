
import React from 'react';
import { ListChecks, AlertTriangle } from 'lucide-react';

interface RecommendationsProps {
  stateName: string;
  timelineYear?: number;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  stateName,
  timelineYear = 2020
}) => {
  return (
    <div className="p-6 bg-purple-50">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="h-5 w-5 text-purple-700" />
        <h4 className="text-lg font-semibold text-purple-800">Recommendations</h4>
      </div>
      
      <ul className="space-y-3">
        <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
          <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
          <p className="text-gray-700">Implement stricter enforcement of forest protection laws in {stateName}</p>
        </li>
        <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
          <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
          <p className="text-gray-700">Expand community-based forest management programs in {timelineYear}</p>
        </li>
        <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
          <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
          <p className="text-gray-700">Prioritize reforestation of degraded areas with native species typical to {stateName}</p>
        </li>
        <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
          <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
          <p className="text-gray-700">Develop sustainable forestry practices for timber extraction suitable for {stateName}'s climate</p>
        </li>
        <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
          <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
          <p className="text-gray-700">Integrate forest conservation into {stateName}'s climate adaptation planning</p>
        </li>
      </ul>
    </div>
  );
};

export default Recommendations;
