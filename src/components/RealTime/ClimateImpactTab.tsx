
import React from 'react';
import { Thermometer, CloudRain, AlertTriangle } from "lucide-react";
import { getClimateData } from './utils/environmentalDataUtils';
import { getStateById } from '@/data/mockData';

interface ClimateImpactTabProps {
  stateId: string;
}

const ClimateImpactTab: React.FC<ClimateImpactTabProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  const climateData = getClimateData(stateId);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <h3 className="font-medium">Temperature Analysis</h3>
          </div>
          {climateData.current && (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Average Temperature</div>
                <div className="text-xl font-bold">{climateData.current.temperature.current.toFixed(1)}°C</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Temperature Anomaly</div>
                <div className="text-lg font-semibold text-red-600">+{climateData.current.temperature.anomaly.toFixed(1)}°C</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Long-term Trend</div>
                <div className="text-base">{climateData.current.temperature.trend}</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Precipitation Analysis</h3>
          </div>
          {climateData.current && (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Annual Rainfall</div>
                <div className="text-xl font-bold">{climateData.current.rainfall.current.toFixed(0)} mm</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Rainfall Anomaly</div>
                <div className="text-lg font-semibold text-amber-600">{climateData.current.rainfall.anomaly.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Long-term Trend</div>
                <div className="text-base">{climateData.current.rainfall.trend}</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="font-medium">Extreme Weather Events</h3>
          </div>
          {climateData.current && (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Drought Events (Last 5 Years)</div>
                <div className="text-xl font-bold">{climateData.current.extremeEvents.droughts}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Flood Events (Last 5 Years)</div>
                <div className="text-xl font-bold">{climateData.current.extremeEvents.floods}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Heat Waves (Last 5 Years)</div>
                <div className="text-xl font-bold">{climateData.current.extremeEvents.heatwaves}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            Top {climateData.isState ? 'States' : 'Districts'} by Temperature
          </h3>
          <div className="space-y-2">
            {climateData.temperatureData.map((item, index) => (
              <div key={`temp-${index}`} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{index + 1}. {item.stateName}</span>
                <span className="text-red-600 font-semibold">{item.temperature.toFixed(1)}°C</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            Top {climateData.isState ? 'States' : 'Districts'} by Rainfall
          </h3>
          <div className="space-y-2">
            {climateData.rainfallData.map((item, index) => (
              <div key={`rain-${index}`} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{index + 1}. {item.stateName}</span>
                <span className="text-blue-600 font-semibold">{item.rainfall.toFixed(0)} mm</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Top {climateData.isState ? 'States' : 'Districts'} by Extreme Events
          </h3>
          <div className="space-y-2">
            {climateData.extremeData.map((item, index) => (
              <div key={`extreme-${index}`} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{index + 1}. {item.stateName}</span>
                <div className="flex gap-2">
                  <span className="text-amber-600 text-xs px-1.5 py-0.5 bg-amber-50 rounded-full">D: {item.droughts}</span>
                  <span className="text-blue-600 text-xs px-1.5 py-0.5 bg-blue-50 rounded-full">F: {item.floods}</span>
                  <span className="text-red-600 text-xs px-1.5 py-0.5 bg-red-50 rounded-full">H: {item.heatwaves}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500">D: Droughts, F: Floods, H: Heat waves (5 year totals)</div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium mb-2">Climate Impact on Forests in {stateId === 'IN' ? 'India' : stateData?.name}</h3>
        <p className="text-gray-700">
          Climate change is significantly affecting forest ecosystems in {stateId === 'IN' ? 'India' : stateData?.name}. Rising temperatures are 
          extending the growing season but also increasing water stress and fire risk. Changing rainfall patterns 
          are altering species composition, with drought-tolerant species potentially replacing moisture-dependent ones.
        </p>
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800">Key Vulnerabilities</h4>
          <ul className="list-disc list-inside text-sm text-yellow-700 mt-1">
            <li>Increased forest fire frequency and intensity due to hotter, drier conditions</li>
            <li>Shifting tree species distribution as climate zones move northward and to higher elevations</li>
            <li>Greater susceptibility to pest outbreaks and disease as trees experience climate stress</li>
            <li>Reduced forest regeneration rates in areas experiencing more frequent drought</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClimateImpactTab;
