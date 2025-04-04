
import React from 'react';

interface MapLegendProps {
  showForestDensity: boolean;
}

const MapLegend: React.FC<MapLegendProps> = ({ showForestDensity }) => {
  return (
    <div className="w-full p-3 mb-3 bg-white rounded-md shadow-md text-sm z-10 border border-gray-200">
      <h4 className="font-bold mb-2">Map Legend</h4>
      <div className="grid grid-cols-3 gap-2">
        {showForestDensity ? (
          <>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-green-800"></div>
              <span>Very Dense ({'>'}60%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-green-600"></div>
              <span>Moderately Dense ({'>'}40%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-green-400"></div>
              <span>Open Forest ({'>'}20%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-green-200"></div>
              <span>Minimal Forest ({'>'}10%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-gray-200"></div>
              <span>Minimal ({'>'}0%)</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-green-800"></div>
              <span>Excellent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-green-500"></div>
              <span>Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
              <span>Fair</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-orange-500"></div>
              <span>Poor</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-sm bg-red-500"></div>
              <span>Critical</span>
            </div>
          </>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Click on any state to view detailed information</p>
    </div>
  );
};

export default MapLegend;
