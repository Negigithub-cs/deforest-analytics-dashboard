
import React from 'react';
import { Clock } from 'lucide-react';

interface TimelineEvent {
  year: number;
  event: string;
}

interface ConservationTimelineProps {
  stateName: string;
  conservationTimeline: TimelineEvent[];
}

const ConservationTimeline: React.FC<ConservationTimelineProps> = ({
  stateName,
  conservationTimeline
}) => {
  return (
    <div className="p-6 bg-indigo-50 border-t border-indigo-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-indigo-700" />
        <h4 className="text-lg font-semibold text-indigo-800">Conservation Timeline: {stateName}</h4>
      </div>
      
      <div className="relative pb-2">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-16 w-1 bg-indigo-200"></div>
        
        {/* Timeline events */}
        {conservationTimeline.map((event, index) => (
          <div 
            key={`timeline-${index}`} 
            className="relative flex items-start mb-6"
            style={{ 
              animation: 'fade-in 0.5s ease-out forwards',
              animationDelay: `${index * 0.15}s` 
            }}
          >
            <div className="flex items-center justify-center min-w-32 pr-4 text-right">
              <span className="text-indigo-800 font-bold">{event.year}</span>
            </div>
            
            <div className="absolute left-16 transform -translate-x-1/2 mt-1.5">
              <div className="h-4 w-4 rounded-full bg-indigo-400 border-4 border-indigo-50"></div>
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-sm ml-6 border-l-4 border-indigo-400">
              <p className="text-gray-700">{event.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConservationTimeline;
