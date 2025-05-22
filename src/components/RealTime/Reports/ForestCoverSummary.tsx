
import React from 'react';
import { AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { getStateById } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ForestCoverSummaryProps {
  stateId: string;
  stateName: string;
  deforestationRate: number;
}

const ForestCoverSummary: React.FC<ForestCoverSummaryProps> = ({ 
  stateId, 
  stateName,
  deforestationRate
}) => {
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div className="p-6">No forest data available</div>;
  }
  
  const latestData = stateData.forestData[stateData.forestData.length - 1];
  const totalForestCover = latestData.totalForestCover;
  
  // Determine if forest is increasing or decreasing based on deforestation rate
  const isForestDecreasing = deforestationRate > 1.5;
  
  // Forest composition data for donut chart
  const forestCompositionData = [
    { name: 'Very Dense Forest', value: latestData.veryDenseForest, color: '#1b5e20' },
    { name: 'Moderately Dense Forest', value: latestData.moderatelyDenseForest, color: '#388e3c' },
    { name: 'Open Forest', value: latestData.openForest, color: '#66bb6a' }
  ];
  
  // Historical comparison data (2011, 2021, 2024)
  const years = [2011, 2021, 2024];
  const historicalData = years.map(year => {
    const yearIndex = stateData.forestData.findIndex(data => data.year === year);
    if (yearIndex !== -1) {
      return stateData.forestData[yearIndex];
    }
    
    // If exact year not found, use closest available data
    return stateData.forestData[Math.min(year - 2010, stateData.forestData.length - 1)];
  });
  
  // Calculate global rank (mock data)
  const globalRank = stateId === 'IN' ? 10 : Math.floor(Math.random() * 50) + 1;
  const forestCoverTarget = Math.round(totalForestCover * 1.15); // 15% increase target for 2030
  
  return (
    <div className="p-6 bg-green-50 border-b border-green-100">
      <h4 className="text-lg font-semibold text-green-800 mb-4">Forest Cover Summary</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Summary Stats */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
          <h5 className="text-sm font-medium text-green-700 mb-4">Key Metrics</h5>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total Forest Cover</p>
              <p className="text-3xl font-bold text-green-700">{totalForestCover.toLocaleString()} km²</p>
            </div>
            
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm text-gray-600">Deforestation Rate</p>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{deforestationRate.toFixed(2)}%/year</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-gray-600">Forest Cover Trend</p>
                <p className="font-medium">{isForestDecreasing ? 'Decreasing' : 'Increasing'}</p>
              </div>
              {isForestDecreasing ? (
                <ArrowDown className="h-6 w-6 text-red-500" />
              ) : (
                <ArrowUp className="h-6 w-6 text-green-500" />
              )}
            </div>
          </div>
        </div>
        
        {/* Middle Column - Composition Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 flex flex-col">
          <h5 className="text-sm font-medium text-green-700 mb-2">Forest Composition (2024)</h5>
          
          <div className="h-[200px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={forestCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ value }) => `${value.toLocaleString()} km²`}
                >
                  {forestCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Right Column - Historical Comparison */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
          <h5 className="text-sm font-medium text-green-700 mb-3">Historical Comparison</h5>
          
          <div className="space-y-3">
            {historicalData.map((data, index) => (
              <div key={years[index]} className="relative">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{years[index]}</span>
                  <span>{data?.totalForestCover.toLocaleString()} km²</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-green-800 h-full" 
                    style={{ width: `${(data?.veryDenseForest / data?.totalForestCover) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-green-600 h-full" 
                    style={{ width: `${(data?.moderatelyDenseForest / data?.totalForestCover) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-green-400 h-full" 
                    style={{ width: `${(data?.openForest / data?.totalForestCover) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Global Rank</p>
                <p className="font-semibold">{globalRank}{getOrdinal(globalRank)}</p>
              </div>
              <div>
                <p className="text-gray-500">2030 Target</p>
                <p className="font-semibold">{forestCoverTarget.toLocaleString()} km²</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get ordinal suffix for numbers
function getOrdinal(n: number): string {
  let ord = 'th';
  
  if (n % 10 === 1 && n % 100 !== 11) {
    ord = 'st';
  } else if (n % 10 === 2 && n % 100 !== 12) {
    ord = 'nd';
  } else if (n % 10 === 3 && n % 100 !== 13) {
    ord = 'rd';
  }
  
  return ord;
}

export default ForestCoverSummary;
