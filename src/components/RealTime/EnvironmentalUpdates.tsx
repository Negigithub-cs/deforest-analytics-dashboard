
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
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Environmental Updates</CardTitle>
        <CardDescription>
          Recent environmental news, forest fire risk, and climate impact analysis for {stateId === 'IN' ? 'India' : stateData.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-2">
            <TabsTrigger value="news" className="flex items-center gap-1">
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </TabsTrigger>
            <TabsTrigger value="fires" className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              <span>Forest Fires</span>
            </TabsTrigger>
            <TabsTrigger value="climate" className="flex items-center gap-1">
              <Thermometer className="h-4 w-4" />
              <span>Climate Impact</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Report</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="news">
            <NewsTab />
          </TabsContent>
          
          <TabsContent value="fires">
            <ForestFireAnalysis stateId={stateId} />
          </TabsContent>
          
          <TabsContent value="climate">
            <ClimateImpactTab stateId={stateId} />
          </TabsContent>
          
          <TabsContent value="report">
            <ForestReportTab stateId={stateId} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalUpdates;
