
import React from 'react';
import { Clock, TrendingUp, TrendingDown, Activity, Leaf } from 'lucide-react';

interface KeyStatisticsProps {
  forestDensity: number;
  deforestation: number;
  biodiversity: string;
  forestHealth: string;
}

const KeyStatistics: React.FC<KeyStatisticsProps> = ({
  forestDensity,
  deforestation,
  biodiversity,
  forestHealth
}) => {
  return (
    <div className="p-6 bg-blue-50">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-blue-700" />
        <h4 className="text-lg font-semibold text-blue-800">Key Statistics</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Forest Density</span>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-blue-700">{forestDensity.toFixed(2)}%</p>
          <div className="h-1 w-full bg-gray-200 mt-2">
            <div className="h-1 bg-green-500" style={{ width: `${forestDensity}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Deforestation</span>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{deforestation.toFixed(2)}%</p>
          <div className="h-1 w-full bg-gray-200 mt-2">
            <div className="h-1 bg-red-500" style={{ width: `${deforestation * 10}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Biodiversity</span>
            <Activity className="h-4 w-4 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{biodiversity}</p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-500">Low</span>
            <div className="h-1 flex-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mx-2"></div>
            <span className="text-xs text-gray-500">High</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Forest Health</span>
            <Leaf className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{forestHealth}</p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-500">Poor</span>
            <div className="h-1 flex-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mx-2"></div>
            <span className="text-xs text-gray-500">Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyStatistics;
