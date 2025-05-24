
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, Flame, Thermometer } from "lucide-react";
import { getStateById } from '@/data/mockData';
import ForestFireAnalysis from './ForestFireAnalysis';
import NewsTab from './NewsTab';
import ClimateImpactTab from './ClimateImpactTab';

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
    <Card className="h-full bg-gradient-to-br from-green-50 via-white to-green-50 shadow-lg border-green-100 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-t-lg">
        <CardTitle>Environmental Updates</CardTitle>
        <CardDescription className="text-green-50">
          Recent environmental news, forest fire risk, and climate impact analysis for {stateId === 'IN' ? 'India' : stateData.name}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 gap-0 bg-green-700 p-0 rounded-none">
            <TabsTrigger 
              value="news" 
              className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-none transition-all py-3 border-r border-green-600 text-green-50"
            >
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fires" 
              className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-none transition-all py-3 border-r border-green-600 text-green-50"
            >
              <Flame className="h-4 w-4" />
              <span>Forest Fires</span>
            </TabsTrigger>
            <TabsTrigger 
              value="climate" 
              className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-none transition-all py-3 text-green-50"
            >
              <Thermometer className="h-4 w-4" />
              <span>Climate Impact</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="news" className="mt-0 animate-fade-in">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4">
              <NewsTab />
            </div>
          </TabsContent>
          
          <TabsContent value="fires" className="mt-0 animate-fade-in">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4">
              <ForestFireAnalysis stateId={stateId} />
            </div>
          </TabsContent>
          
          <TabsContent value="climate" className="mt-0 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
              <ClimateImpactTab stateId={stateId} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalUpdates;
