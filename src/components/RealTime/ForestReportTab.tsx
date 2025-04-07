
import React from 'react';
import { FileText } from "lucide-react";
import { getStateById } from '@/data/mockData';

interface ForestReportTabProps {
  stateId: string;
}

const ForestReportTab: React.FC<ForestReportTabProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  
  if (!stateData) return null;
  
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
            <FileText className="h-5 w-5"/>
            Forest Status Report: {stateId === 'IN' ? 'India' : stateData.name}
          </h2>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Executive Summary</h3>
              <p className="text-gray-700">
                This report provides a comprehensive analysis of forest cover status, trends, and environmental impacts 
                in {stateId === 'IN' ? 'India' : stateData.name}. 
                {stateId !== 'IN' && (
                  <>The region currently has a conservation status rated as 
                    <span className="font-medium"> {stateData.conservationStatus}</span>, with an annual deforestation 
                    rate of {stateData.deforestationRate.toFixed(1)}%.
                  </>
                )}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Key Findings</h3>
              {stateId === 'IN' ? (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Total forest area: 7,12,249 sq km (21.67% of geographical area)</li>
                  <li>Very dense forest: 99,779 sq km (3.04%)</li>
                  <li>Moderately dense forest: 3,06,890 sq km (9.33%)</li>
                  <li>Open forest: 3,05,580 sq km (9.29%)</li>
                  <li>Primary threats: Urbanization, mining, infrastructure development</li>
                  <li>Climate mitigation potential: High with proper conservation measures</li>
                </ul>
              ) : (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Total forest area: {Math.round(stateData.forestData[stateData.forestData.length-1].totalForestCover).toLocaleString()} sq km</li>
                  <li>Forest density classification: {stateData.conservationStatus}</li>
                  <li>Primary threats: {stateData.deforestationRate > 1 ? 'Agricultural expansion, logging, and urbanization' : 'Climate change and invasive species'}</li>
                  <li>Air quality correlation: {stateData.deforestationRate > 0.8 ? 'Strong negative impact observed' : 'Moderate positive influence on regional air quality'}</li>
                  <li>Climate mitigation potential: {stateData.conservationStatus === 'Excellent' || stateData.conservationStatus === 'Good' ? 'High carbon sequestration value' : 'Moderate to low carbon storage capacity'}</li>
                </ul>
              )}
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Historical Trends (2013-2024)</h3>
              {stateId === 'IN' ? (
                <p className="text-gray-700">
                  Forest cover in India has shown a mixed trend over the past decade with slight overall growth in certain regions, 
                  offset by significant losses in others. The Northeast region has experienced the most significant deforestation, 
                  while central India has shown positive gains in forest cover through successful reforestation programs.
                </p>
              ) : (
                <p className="text-gray-700">
                  Forest cover in {stateData.name} has shown a 
                  {stateData.deforestationRate > 0 ? ' decline ' : ' growth '} 
                  over the past decade at an average annual rate of 
                  {stateData.deforestationRate > 0 ? ' -' + stateData.deforestationRate.toFixed(1) : ' +' + Math.abs(stateData.deforestationRate).toFixed(1)}%. 
                  The most significant changes have occurred in the 
                  {stateData.forestData[0].veryDenseForest > stateData.forestData[0].openForest ? ' very dense forest ' : ' open forest '} 
                  category.
                </p>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Recommendations</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Implement stricter enforcement of forest protection laws</li>
                <li>Expand community-based forest management programs</li>
                <li>Prioritize reforestation of degraded areas with native species</li>
                <li>Develop sustainable forestry practices for timber extraction</li>
                <li>Integrate forest conservation into climate adaptation planning</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Conservation Potential Assessment</h3>
          {stateId === 'IN' ? (
            <div className="flex items-center gap-3">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="h-4 rounded-full bg-green-500 w-[70%]"></div>
              </div>
              <span className="text-sm font-medium w-16">70%</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${
                    stateData.conservationStatus === 'Excellent' ? 'bg-green-500 w-[95%]' :
                    stateData.conservationStatus === 'Good' ? 'bg-green-500 w-[75%]' :
                    stateData.conservationStatus === 'Fair' ? 'bg-yellow-500 w-[50%]' :
                    stateData.conservationStatus === 'Poor' ? 'bg-orange-500 w-[25%]' :
                    'bg-red-500 w-[10%]'
                  }`}
                ></div>
              </div>
              <span className="text-sm font-medium w-16">
                {stateData.conservationStatus === 'Excellent' ? '95%' :
                 stateData.conservationStatus === 'Good' ? '75%' :
                 stateData.conservationStatus === 'Fair' ? '50%' :
                 stateData.conservationStatus === 'Poor' ? '25%' : '10%'}
              </span>
            </div>
          )}
          <p className="mt-2 text-sm text-green-800">
            {stateId === 'IN' ? (
              'Based on current forest health, biodiversity metrics, and protection status, India shows moderate to good potential for successful conservation initiatives with proper policy implementation and community engagement.'
            ) : (
              `Based on current forest health, biodiversity metrics, and protection status, ${stateData.name} 
              shows ${stateData.conservationStatus === 'Excellent' || stateData.conservationStatus === 'Good' ? 
              'high potential' : stateData.conservationStatus === 'Fair' ? 'moderate potential' : 'limited potential'} 
              for successful conservation initiatives.`
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForestReportTab;
