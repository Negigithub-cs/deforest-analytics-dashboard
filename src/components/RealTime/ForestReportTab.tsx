
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
  ListChecks
} from "lucide-react";

interface ForestReportTabProps {
  stateId: string;
}

const ForestReportTab: React.FC<ForestReportTabProps> = ({ stateId }) => {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-5 w-5 text-green-700" />
          <h3 className="text-xl font-bold text-green-800">
            Forest Health Analysis Report
          </h3>
        </div>
        
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100">
            <h4 className="text-amber-800 font-semibold flex items-center gap-2 mb-2">
              <BadgeAlert className="h-4 w-4" />
              Executive Summary
            </h4>
            <p className="text-amber-700 text-sm">
              The forest coverage in {stateId === 'IN' ? 'India' : stateId} shows varied patterns across regions. 
              Dense forests represent 39% of total forest cover, while open forests constitute 42%. 
              There's been a moderate 1.2% increase in overall forest cover since the last assessment.
            </p>
          </div>
          
          {/* Key Statistics */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-blue-800 font-semibold flex items-center gap-2 mb-3">
              <PieChart className="h-4 w-4" />
              Key Statistics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Forest Density</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-lg font-bold text-blue-700">28.63%</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Deforestation</span>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <p className="text-lg font-bold text-blue-700">1.45%</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Biodiversity</span>
                  <Activity className="h-4 w-4 text-yellow-600" />
                </div>
                <p className="text-lg font-bold text-blue-700">Moderate</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Forest Health</span>
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-lg font-bold text-blue-700">Good</p>
              </div>
            </div>
          </div>
          
          {/* Trend Analysis */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
            <h4 className="text-green-800 font-semibold flex items-center gap-2 mb-2">
              <BarChart4 className="h-4 w-4" />
              Trend Analysis
            </h4>
            <p className="text-green-700 text-sm mb-3">
              Forest cover has shown a positive trend with an annual growth rate of 0.5% over the last 5 years. 
              The most significant growth has been observed in moderate density forests.
            </p>
            
            <div className="w-full bg-white rounded-lg p-3">
              <div className="h-16 flex items-end justify-around gap-1">
                {[32, 45, 40, 50, 42, 48, 55].map((value, i) => (
                  <div 
                    key={`bar-${i}`} 
                    className="w-[10%] bg-gradient-to-t from-green-700 to-green-500 rounded-t"
                    style={{ 
                      height: `${value}%`,
                      animation: 'scale-in 0.5s ease-out forwards',
                      animationDelay: `${i * 0.1}s`,
                      opacity: 0,
                      transformOrigin: 'bottom'
                    }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
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
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-100">
            <h4 className="text-purple-800 font-semibold flex items-center gap-2 mb-2">
              <ListChecks className="h-4 w-4" />
              Recommendations
            </h4>
            <ul className="text-purple-700 text-sm space-y-1">
              <li className="flex gap-2 items-start">
                <div className="min-w-4 mt-1">•</div>
                <p>Implement stricter monitoring in areas with high deforestation rates</p>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-4 mt-1">•</div>
                <p>Increase community participation in forest conservation efforts</p>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-4 mt-1">•</div>
                <p>Develop sustainable forestry practices in buffer zones</p>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-4 mt-1">•</div>
                <p>Enhance biodiversity conservation measures in critical habitats</p>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestReportTab;
