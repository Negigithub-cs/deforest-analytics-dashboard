
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
        Forest cover has shown a positive trend with an annual growth rate of {growthRate.toFixed(1)}% over the last 5 years. 
        The most significant growth has been observed in moderate density forests in {stateName}.
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
            
            {/* Area chart path with animation */}
            <path
              d={`M0,50 L0,${35 - (parseInt(stateId || 'IN', 36) % 15)} C5,${33 + (parseInt(stateId || 'IN', 36) % 10)} 10,${38 - (parseInt(stateId || 'IN', 36) % 8)} 15,${30 + (parseInt(stateId || 'IN', 36) % 6)} C20,${22 - (parseInt(stateId || 'IN', 36) % 12)} 25,${28 + (parseInt(stateId || 'IN', 36) % 7)} 30,${20 - (parseInt(stateId || 'IN', 36) % 5)} C35,${12 + (parseInt(stateId || 'IN', 36) % 8)} 40,${25 - (parseInt(stateId || 'IN', 36) % 10)} 45,${18 + (parseInt(stateId || 'IN', 36) % 7)} C50,${11 - (parseInt(stateId || 'IN', 36) % 6)} 55,${15 + (parseInt(stateId || 'IN', 36) % 10)} 60,${10 - (parseInt(stateId || 'IN', 36) % 5)} C65,${5 + (parseInt(stateId || 'IN', 36) % 10)} 70,${15 - (parseInt(stateId || 'IN', 36) % 5)} 75,${12 + (parseInt(stateId || 'IN', 36) % 8)} C80,${9 - (parseInt(stateId || 'IN', 36) % 7)} 85,${2 + (parseInt(stateId || 'IN', 36) % 10)} 90,${8 - (parseInt(stateId || 'IN', 36) % 6)} C95,${14 + (parseInt(stateId || 'IN', 36) % 6)} 100,10 100,10 L100,50 Z`}
              fill={`url(#areaGradient-${stateId})`}
              className="trend-area"
            />
            
            {/* Line for the area chart */}
            <path
              d={`M0,${35 - (parseInt(stateId || 'IN', 36) % 15)} C5,${33 + (parseInt(stateId || 'IN', 36) % 10)} 10,${38 - (parseInt(stateId || 'IN', 36) % 8)} 15,${30 + (parseInt(stateId || 'IN', 36) % 6)} C20,${22 - (parseInt(stateId || 'IN', 36) % 12)} 25,${28 + (parseInt(stateId || 'IN', 36) % 7)} 30,${20 - (parseInt(stateId || 'IN', 36) % 5)} C35,${12 + (parseInt(stateId || 'IN', 36) % 8)} 40,${25 - (parseInt(stateId || 'IN', 36) % 10)} 45,${18 + (parseInt(stateId || 'IN', 36) % 7)} C50,${11 - (parseInt(stateId || 'IN', 36) % 6)} 55,${15 + (parseInt(stateId || 'IN', 36) % 10)} 60,${10 - (parseInt(stateId || 'IN', 36) % 5)} C65,${5 + (parseInt(stateId || 'IN', 36) % 10)} 70,${15 - (parseInt(stateId || 'IN', 36) % 5)} 75,${12 + (parseInt(stateId || 'IN', 36) % 8)} C80,${9 - (parseInt(stateId || 'IN', 36) % 7)} 85,${2 + (parseInt(stateId || 'IN', 36) % 10)} 90,${8 - (parseInt(stateId || 'IN', 36) % 6)} C95,${14 + (parseInt(stateId || 'IN', 36) % 6)} 100,10 100,10`}
              fill="none"
              strokeWidth="2"
              stroke="#16A34A"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="trend-line"
            />
            
            {/* Data points */}
            {[
              35 - (parseInt(stateId || 'IN', 36) % 15),
              33 + (parseInt(stateId || 'IN', 36) % 10),
              38 - (parseInt(stateId || 'IN', 36) % 8),
              30 + (parseInt(stateId || 'IN', 36) % 6),
              22 - (parseInt(stateId || 'IN', 36) % 12),
              28 + (parseInt(stateId || 'IN', 36) % 7),
              20 - (parseInt(stateId || 'IN', 36) % 5),
              12 + (parseInt(stateId || 'IN', 36) % 8),
              25 - (parseInt(stateId || 'IN', 36) % 10),
              18 + (parseInt(stateId || 'IN', 36) % 7),
              11 - (parseInt(stateId || 'IN', 36) % 6),
              10 + (parseInt(stateId || 'IN', 36) % 5)
            ].map((point, i) => (
              <circle
                key={`point-${i}`}
                cx={i * 9}
                cy={point}
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
