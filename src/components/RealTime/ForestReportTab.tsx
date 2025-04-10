
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  BadgeAlert, 
  PieChart, 
  BarChart4, 
  Leaf,
  TrendingUp,
  TrendingDown,
  Activity,
  ListChecks,
  Clock,
  AlertTriangle
} from "lucide-react";
import { getStateById } from '@/data/mockData';

interface ForestReportTabProps {
  stateId: string;
}

const ForestReportTab: React.FC<ForestReportTabProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  const stateName = stateData ? stateData.name : 'India';
  
  // Generate state-specific data based on stateId
  const getStateSpecificStats = () => {
    // Create unique variation based on stateId
    const idSum = stateId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseForestDensity = 28 + (idSum % 10);
    const baseDeforestation = 1 + ((idSum % 5) / 10);
    
    // Generate yearly data that's unique per state
    const getYearlyData = () => {
      const years = 7; // 7 years of data
      const baseValue = 32 + (idSum % 15);
      const result = [];
      
      let currentValue = baseValue;
      for (let i = 0; i < years; i++) {
        // Create a state-specific pattern using the stateId
        const multiplier = ((i + 1) * (parseInt(stateId.substring(1), 36) % 5 + 1)) / 10;
        const delta = Math.sin((i / years) * Math.PI * 2) * multiplier * (idSum % 6);
        
        // Make sure different states have different patterns
        currentValue = baseValue + delta + ((i * idSum) % 10);
        result.push(Math.round(currentValue));
      }
      
      return result;
    };
    
    return {
      forestDensity: baseForestDensity + (idSum % 9) / 10,
      deforestation: baseDeforestation + (idSum % 8) / 10,
      biodiversity: ['Low', 'Moderate', 'High', 'Very High'][idSum % 4],
      forestHealth: ['Poor', 'Fair', 'Good', 'Excellent'][idSum % 4],
      growthRate: 0.3 + (idSum % 10) / 10,
      annualData: getYearlyData(),
      conservationTimeline: [
        {
          year: 2005 + (idSum % 5),
          event: `First ${stateName} Forest Conservation Act implemented`
        },
        {
          year: 2011 + (idSum % 3),
          event: `${stateName} Sustainable Forestry Initiative launched`
        },
        {
          year: 2016 + (idSum % 4),
          event: `${stateName} began Protected Forest Area expansion`
        },
        {
          year: 2019 + (idSum % 2),
          event: `Community Forest Management program in ${stateName}`
        },
        {
          year: 2022,
          event: `New ${stateName} Forest Monitoring System deployed`
        }
      ].sort((a, b) => a.year - b.year) // Sort by year
    };
  };
  
  const stateStats = getStateSpecificStats();
  
  // CSS for animating the bars in the chart
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scale-in {
        from {
          transform: scaleY(0);
          opacity: 0;
        }
        to {
          transform: scaleY(1);
          opacity: 1;
        }
      }
      
      @keyframes draw-path {
        to {
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
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
    <Card className="bg-white shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-green-900 to-green-700 p-4 flex items-center gap-3">
          <FileText className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">
            Forest Status Report: {stateName}
          </h3>
        </div>
        
        {/* Executive Summary */}
        <div className="p-6 bg-amber-50 border-b border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <BadgeAlert className="h-5 w-5 text-amber-700" />
            <h4 className="text-lg font-semibold text-amber-800">Executive Summary</h4>
          </div>
          <p className="text-amber-800">
            The forest coverage in {stateName} shows varied patterns across regions. Dense forests represent {(39 + (stateId === 'IN' ? 0 : parseInt(stateId.charAt(1), 36) % 10))}% of total forest cover, 
            while open forests constitute {(42 - (stateId === 'IN' ? 0 : parseInt(stateId.charAt(0), 36) % 10))}%. There's been a moderate {stateStats.growthRate.toFixed(1)}% increase in overall forest cover since the last assessment.
          </p>
        </div>
        
        {/* Key Statistics */}
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
              <p className="text-3xl font-bold text-blue-700">{stateStats.forestDensity.toFixed(2)}%</p>
              <div className="h-1 w-full bg-gray-200 mt-2">
                <div className="h-1 bg-green-500" style={{ width: `${stateStats.forestDensity}%` }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Deforestation</span>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">{stateStats.deforestation.toFixed(2)}%</p>
              <div className="h-1 w-full bg-gray-200 mt-2">
                <div className="h-1 bg-red-500" style={{ width: `${stateStats.deforestation * 10}%` }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Biodiversity</span>
                <Activity className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stateStats.biodiversity}</p>
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
              <p className="text-3xl font-bold text-green-600">{stateStats.forestHealth}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">Poor</span>
                <div className="h-1 flex-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mx-2"></div>
                <span className="text-xs text-gray-500">Excellent</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trend Analysis */}
        <div className="p-6 bg-green-50 border-t border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <BarChart4 className="h-5 w-5 text-green-700" />
            <h4 className="text-lg font-semibold text-green-800">Trend Analysis</h4>
          </div>
          
          <p className="text-green-700 mb-4">
            Forest cover has shown a positive trend with an annual growth rate of {stateStats.growthRate.toFixed(1)}% over the last 5 years. 
            The most significant growth has been observed in moderate density forests in {stateName}.
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <div className="h-48 flex items-end justify-between gap-3">
              {stateStats.annualData.map((value, i) => (
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
          
          {/* Monthly trends area chart - improved to ensure it displays */}
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
        
        {/* Conservation Timeline - State-specific */}
        <div className="p-6 bg-indigo-50 border-t border-indigo-100">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-indigo-700" />
            <h4 className="text-lg font-semibold text-indigo-800">Conservation Timeline: {stateName}</h4>
          </div>
          
          <div className="relative pb-2">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-16 w-1 bg-indigo-200"></div>
            
            {/* Timeline events */}
            {stateStats.conservationTimeline.map((event, index) => (
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
        
        {/* Recommendations */}
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
              <p className="text-gray-700">Expand community-based forest management programs in {stateStats.conservationTimeline[2]?.year || '2020'}</p>
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
      </CardContent>
    </Card>
  );
};

export default ForestReportTab;
