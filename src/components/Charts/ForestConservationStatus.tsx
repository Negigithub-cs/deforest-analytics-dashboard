
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreeDeciduous, Sprout, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { getStateById } from '@/data/mockData';
import { stateIdToName } from '@/components/Map/utils/stateMappings';

interface ForestConservationStatusProps {
  stateId: string;
  selectedYear: number;
}

const ForestConservationStatus: React.FC<ForestConservationStatusProps> = ({ stateId, selectedYear }) => {
  const stateData = getStateById(stateId);
  const stateName = stateIdToName[stateId] || 'Selected Region';
  
  if (!stateData) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Forest Conservation Status</CardTitle>
          <CardDescription>
            Please select a state to view conservation status
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const getStatus = () => {
    return stateData.conservationStatus;
  };
  
  const getStatusColor = () => {
    const status = getStatus();
    switch(status) {
      case 'Excellent': return 'bg-green-600 text-white';
      case 'Good': return 'bg-green-500 text-white';
      case 'Fair': return 'bg-yellow-500 text-white';
      case 'Poor': return 'bg-orange-500 text-white';
      case 'Critical': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  const getStatusIcon = () => {
    const status = getStatus();
    switch(status) {
      case 'Excellent': return <CheckCircle className="h-5 w-5" />;
      case 'Good': return <Shield className="h-5 w-5" />;
      case 'Fair': return <Sprout className="h-5 w-5" />;
      case 'Poor': return <AlertTriangle className="h-5 w-5" />;
      case 'Critical': return <AlertTriangle className="h-5 w-5" />;
      default: return <TreeDeciduous className="h-5 w-5" />;
    }
  };
  
  const renderInitiative = (title: string, details: string, progress: number) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 mb-3">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
          {progress}% Complete
        </span>
      </div>
      <p className="text-xs text-gray-600 mb-2">{details}</p>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, animationDelay: '300ms' }}
        ></div>
      </div>
    </div>
  );
  
  return (
    <Card className="h-full bg-gradient-to-br from-green-50 via-white to-green-50 shadow-lg border-green-100">
      <CardHeader className="pb-0 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <span>Forest Conservation Status</span>
          <TreeDeciduous className="h-5 w-5" />
        </CardTitle>
        <CardDescription className="text-green-100">
          Conservation initiatives and status for {stateName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-green-800">Current Status</h3>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor()}`}>
                {getStatusIcon()}
                <span>{getStatus()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <TreeDeciduous className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Forest Cover</p>
                  <p className="text-2xl font-bold">{stateData.forestData[stateData.forestData.length-1].totalForestCover.toLocaleString()} sq km</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Deforestation Rate</p>
                  <p className="text-2xl font-bold">{stateData.deforestationRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100 shadow-sm">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">Conservation Timeline</h3>
            
            <div className="relative pl-6 border-l-2 border-amber-300 space-y-6">
              <div className="relative">
                <div className="absolute -left-[26px] bg-green-600 p-1 rounded-full border-2 border-amber-100">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs font-bold text-amber-800">2021</p>
                <p className="text-sm">Conservation program initiated</p>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="absolute -left-[26px] bg-green-600 p-1 rounded-full border-2 border-amber-100">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs font-bold text-amber-800">2022</p>
                <p className="text-sm">Reforestation of 1,200 hectares</p>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '600ms' }}>
                <div className="absolute -left-[26px] bg-amber-500 p-1 rounded-full border-2 border-amber-100">
                  <Sprout className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs font-bold text-amber-800">2023</p>
                <p className="text-sm">Wildlife corridor establishment</p>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '900ms' }}>
                <div className="absolute -left-[26px] bg-blue-500 p-1 rounded-full border-2 border-amber-100">
                  <Shield className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs font-bold text-amber-800">2024</p>
                <p className="text-sm">Community-based protection</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-100 shadow-sm mb-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Active Conservation Initiatives</h3>
          
          {renderInitiative(
            "Afforestation Project", 
            "Planting native tree species in degraded forest areas",
            75
          )}
          
          {renderInitiative(
            "Biodiversity Corridors", 
            "Creating wildlife corridors between fragmented forests",
            42
          )}
          
          {renderInitiative(
            "Sustainable Forestry", 
            "Training local communities in sustainable harvesting methods",
            88
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestConservationStatus;
