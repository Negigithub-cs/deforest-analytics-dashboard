
import React from 'react';
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

interface ForestReportTabProps {
  stateId: string;
}

const ForestReportTab: React.FC<ForestReportTabProps> = ({ stateId }) => {
  const stateName = stateId === 'IN' ? 'India' : stateId;
  
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
            The forest coverage in {stateName} shows varied patterns across regions. Dense forests represent 39% of total forest cover, 
            while open forests constitute 42%. There's been a moderate 1.2% increase in overall forest cover since the last assessment.
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
              <p className="text-3xl font-bold text-blue-700">28.63%</p>
              <div className="h-1 w-full bg-gray-200 mt-2">
                <div className="h-1 bg-green-500" style={{ width: '28.63%' }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Deforestation</span>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">1.45%</p>
              <div className="h-1 w-full bg-gray-200 mt-2">
                <div className="h-1 bg-red-500" style={{ width: '14.5%' }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Biodiversity</span>
                <Activity className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">Moderate</p>
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
              <p className="text-3xl font-bold text-green-600">Good</p>
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
            Forest cover has shown a positive trend with an annual growth rate of 0.5% over the last 5 years. 
            The most significant growth has been observed in moderate density forests.
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <div className="h-24 flex items-end justify-between gap-3">
              {[32, 45, 40, 50, 42, 48, 55].map((value, i) => (
                <div key={`bar-${i}`} className="relative group flex flex-col items-center flex-1">
                  <div className="text-xs text-gray-500 mb-1 opacity-0 group-hover:opacity-100 absolute -top-6 transition-opacity">
                    {value}%
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-green-700 to-green-400 rounded-t"
                    style={{ 
                      height: `${value}%`,
                      animation: 'scale-in 0.5s ease-out forwards',
                      animationDelay: `${i * 0.1}s`,
                      opacity: 0,
                      transformOrigin: 'bottom'
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
              <p className="text-gray-700">Implement stricter enforcement of forest protection laws</p>
            </li>
            <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">Expand community-based forest management programs</p>
            </li>
            <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">Prioritize reforestation of degraded areas with native species</p>
            </li>
            <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">Develop sustainable forestry practices for timber extraction</p>
            </li>
            <li className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm border border-purple-100">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-gray-700">Integrate forest conservation into climate adaptation planning</p>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestReportTab;
