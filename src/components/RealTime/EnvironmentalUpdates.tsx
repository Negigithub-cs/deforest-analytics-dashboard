
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, Flame, Thermometer, FileText } from "lucide-react";
import { getStateById } from '@/data/mockData';
import ForestFireAnalysis from './ForestFireAnalysis';
import NewsTab from './NewsTab';
import ClimateImpactTab from './ClimateImpactTab';
import ForestReportTab from './ForestReportTab';

interface EnvironmentalUpdatesProps {
  stateId: string;
}

const EnvironmentalUpdates: React.FC<EnvironmentalUpdatesProps> = ({ stateId }) => {
  const [activeTab, setActiveTab] = useState<string>('news');
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Environmental Updates</CardTitle>
          <CardDescription>
            Please select a state to view environmental updates
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="h-full bg-gradient-to-br from-green-50 via-white to-green-50 shadow-lg border-green-100">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-t-lg">
        <CardTitle>Environmental Updates</CardTitle>
        <CardDescription className="text-green-50">
          Recent environmental news, forest fire risk, and climate impact analysis for {stateId === 'IN' ? 'India' : stateData.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-2 bg-green-100 p-1.5 rounded-xl">
            <TabsTrigger 
              value="news" 
              className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fires" 
              className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Flame className="h-4 w-4" />
              <span>Forest Fires</span>
            </TabsTrigger>
            <TabsTrigger 
              value="climate" 
              className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Thermometer className="h-4 w-4" />
              <span>Climate Impact</span>
            </TabsTrigger>
            <TabsTrigger 
              value="report" 
              className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>Report</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-2 rounded-lg border border-amber-100">
            <TabsContent value="news" className="mt-0 animate-fade-in">
              <NewsTab />
            </TabsContent>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-2 rounded-lg border border-red-100">
            <TabsContent value="fires" className="mt-0 animate-fade-in">
              <ForestFireAnalysis stateId={stateId} />
            </TabsContent>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-2 rounded-lg border border-blue-100">
            <TabsContent value="climate" className="mt-0 animate-fade-in">
              <ClimateImpactTab stateId={stateId} />
            </TabsContent>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2 rounded-lg border border-green-100">
            <TabsContent value="report" className="mt-0 animate-fade-in">
              <ForestReportTab stateId={stateId} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalUpdates;
