
import React, { useState, useEffect } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const stateData = getStateById(stateId);
  
  // Motion images for each tab - these would ideally be replaced with actual relevant imagery
  const tabImages = {
    news: [
      "https://images.unsplash.com/photo-1601821236989-99924dff697a?q=80&w=1200&auto=format",
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=1200&auto=format",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200&auto=format"
    ],
    fires: [
      "https://images.unsplash.com/photo-1516575438296-6a7562bdee6c?q=80&w=1200&auto=format",
      "https://images.unsplash.com/photo-1516575438296-6a7562bdee6c?q=80&w=1200&auto=format", 
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=1200&auto=format"
    ],
    climate: [
      "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?q=80&w=1200&auto=format",
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=1200&auto=format",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=1200&auto=format"
    ]
  };

  // Effect to handle image transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % tabImages[activeTab as keyof typeof tabImages].length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [activeTab]);
  
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
      <CardHeader className="pb-2 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-t-lg relative overflow-hidden">
        {/* Motion background image */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url('${tabImages[activeTab as keyof typeof tabImages][currentImageIndex]}')`,
          }}
        ></div>
        <div className="relative z-10">
          <CardTitle>Environmental Updates</CardTitle>
          <CardDescription className="text-green-50">
            Recent environmental news, forest fire risk, and climate impact analysis for {stateId === 'IN' ? 'India' : stateData.name}
          </CardDescription>
        </div>
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
              {/* Motion image for news tab */}
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-fade-in"
                  style={{ 
                    backgroundImage: `url('${tabImages.news[currentImageIndex]}')`,
                    transition: 'opacity 1s ease-in-out'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">Environmental News</h3>
                    <p className="text-sm">Latest updates on forest conservation</p>
                  </div>
                </div>
              </div>
              <NewsTab />
            </div>
          </TabsContent>
          
          <TabsContent value="fires" className="mt-0 animate-fade-in">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4">
              {/* Motion image for fires tab */}
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-fade-in"
                  style={{ 
                    backgroundImage: `url('${tabImages.fires[currentImageIndex]}')`,
                    transition: 'opacity 1s ease-in-out'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">Forest Fire Analysis</h3>
                    <p className="text-sm">Monitoring and predicting fire risks</p>
                  </div>
                </div>
              </div>
              <ForestFireAnalysis stateId={stateId} />
            </div>
          </TabsContent>
          
          <TabsContent value="climate" className="mt-0 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
              {/* Motion image for climate tab */}
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-fade-in"
                  style={{ 
                    backgroundImage: `url('${tabImages.climate[currentImageIndex]}')`,
                    transition: 'opacity 1s ease-in-out'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">Climate Impact</h3>
                    <p className="text-sm">How climate change affects forests</p>
                  </div>
                </div>
              </div>
              <ClimateImpactTab stateId={stateId} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalUpdates;
