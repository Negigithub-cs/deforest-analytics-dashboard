
import React, { useEffect } from 'react';
import { BarChart4 } from 'lucide-react';

interface TrendAnalysisProps {
  stateId: string;
  stateName: string;
  growthRate: number;
  annualData: number[];
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({
  stateId,
  stateName,
  growthRate,
  annualData
}) => {
  // Generate this state's specific forest growth trend
  const generateStateSpecificTrend = (stateId: string) => {
    const idSum = stateId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Create unique values based on stateId
    return Array.from({ length: 12 }, (_, i) => {
      const base = 15 + (idSum % 10);
      const amplitude = 8 + (idSum % 6);
      const phase = (idSum % 12) / 10;
      return base + amplitude * Math.sin((i / 12 + phase) * Math.PI * 2);
    });
  };

  const monthlyData = generateStateSpecificTrend(stateId);

  // Add CSS for trend analysis chart animations
  useEffect(() => {
    const styleForTrendChart = document.createElement('style');
    styleForTrendChart.textContent = `
      .trend-bar {
        animation: scale-in 0.5s ease-out forwards;
        transform-origin: bottom;
        opacity: 0;
      }
      
      .trend-line {
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
        animation: draw-path 1.5s forwards;
      }
      
      .trend-area {
        opacity: 0;
        animation: fade-in 1s forwards;
        animation-delay: 0.5s;
      }
      
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(styleForTrendChart);
    
    return () => {
      document.head.removeChild(styleForTrendChart);
    };
  }, [stateId]); // Re-run when stateId changes

  return (
    <div className="p-6 bg-green-50 border-t border-green-100">
      <div className="flex items-center gap-2 mb-4">
        <BarChart4 className="h-5 w-5 text-green-700" />
        <h4 className="text-lg font-semibold text-green-800">Trend Analysis</h4>
      </div>
      
      <p className="text-green-700 mb-4">
        Forest cover in {stateName} has shown a {growthRate > 0.5 ? 'positive' : 'moderate'} trend with an annual growth rate of {growthRate.toFixed(1)}% over the last 5 years. 
        The most significant growth has been observed in {stateId === 'IN' ? 'the northeastern states' : 'moderate density forests'} in {stateName}.
      </p>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
        <div className="h-48 flex items-end justify-between gap-3">
          {annualData.map((value, i) => (
            <div key={`bar-${i}`} className="relative group flex flex-col items-center flex-1">
              <div className="text-xs text-gray-500 mb-1 opacity-0 group-hover:opacity-100 absolute -top-6 transition-opacity">
                {value}%
              </div>
              <div 
                className="w-full bg-gradient-to-t from-green-700 to-green-400 rounded-t trend-bar"
                style={{ 
                  height: `${value}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 border-t pt-2">
          <span>2018</span>
          <span>2019</span>
          <span>2020</span>
          <span>2021</span>
          <span>2022</span>
          <span>2023</span>
          <span>2024</span>
        </div>
        
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-2 mr-4">
            <div className="w-3 h-3 rounded-sm bg-green-700"></div>
            <span className="text-xs">Dense Forest</span>
          </div>
          <div className="flex items-center gap-2 mr-4">
            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
            <span className="text-xs">Moderately Dense</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-green-300"></div>
            <span className="text-xs">Open Forest</span>
          </div>
        </div>
      </div>
      
      {/* Monthly trends area chart */}
      <div className="mt-6 bg-white rounded-lg p-4 shadow-sm border border-green-100">
        <h5 className="text-sm font-medium text-green-800 mb-3">Monthly Forest Growth (Last 12 Months)</h5>
        
        <div className="relative h-36">
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id={`areaGradient-${stateId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            
            {/* Create the SVG path for the area chart */}
            {(() => {
              // Convert the monthlyData array to SVG path coordinates
              const pathPoints = monthlyData.map((value, index) => {
                const x = (index / (monthlyData.length - 1)) * 100;
                const y = 50 - value; // SVG coordinate system is top-down
                return `${x},${y}`;
              }).join(' L');
              
              // Create the area path
              const areaPath = `M0,${50 - monthlyData[0]} L${pathPoints} L100,50 L0,50 Z`;
              
              // Create the line path
              const linePath = `M0,${50 - monthlyData[0]} L${pathPoints}`;
              
              return (
                <>
                  {/* Area chart path with animation */}
                  <path
                    d={areaPath}
                    fill={`url(#areaGradient-${stateId})`}
                    className="trend-area"
                  />
                  
                  {/* Line for the area chart */}
                  <path
                    d={linePath}
                    fill="none"
                    strokeWidth="2"
                    stroke="#16A34A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="trend-line"
                  />
                  
                  {/* Data points */}
                  {monthlyData.map((value, i) => (
                    <circle
                      key={`point-${i}`}
                      cx={(i / (monthlyData.length - 1)) * 100}
                      cy={50 - value}
                      r="1.5"
                      fill="#FFF"
                      stroke="#16A34A"
                      strokeWidth="1"
                      style={{
                        animation: `scale-in 0.3s ease-out forwards`,
                        animationDelay: `${1.5 + (i * 0.05)}s`,
                        opacity: 0
                      }}
                    />
                  ))}
                </>
              );
            })()}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;
