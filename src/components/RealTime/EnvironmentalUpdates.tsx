
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Newspaper, Flame, CloudRain, Thermometer, AlertTriangle, FileText } from "lucide-react";
import { getStateById } from '@/data/mockData';
import ForestFireAnalysis from './ForestFireAnalysis';

interface EnvironmentalUpdatesProps {
  stateId: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  category: 'conservation' | 'policy' | 'disaster' | 'research';
}

const EnvironmentalUpdates: React.FC<EnvironmentalUpdatesProps> = ({ stateId }) => {
  const [activeTab, setActiveTab] = useState<string>('news');
  const stateData = getStateById(stateId);
  
  const generateNewsData = (): NewsItem[] => {
    const conservationNews: NewsItem[] = [
      {
        id: 'news-1',
        title: 'New Reforestation Program Launched in Western Ghats',
        summary: 'The Ministry of Environment and Forests has announced a major reforestation initiative targeting 10,000 hectares in the Western Ghats over the next five years.',
        source: 'The Hindu',
        date: '2025-03-21',
        url: 'https://www.thehindu.com',
        category: 'conservation'
      },
      {
        id: 'news-2',
        title: 'Local Communities Lead Conservation Efforts in Northeast',
        summary: 'Indigenous communities in Arunachal Pradesh are spearheading forest protection efforts, resulting in a 15% increase in forest cover in the region.',
        source: 'Down To Earth',
        date: '2025-03-15',
        url: 'https://www.downtoearth.org.in',
        category: 'conservation'
      }
    ];
    
    const policyNews: NewsItem[] = [
      {
        id: 'news-3',
        title: 'Forest Conservation Act Amendment Passed',
        summary: 'Parliament has passed amendments to the Forest Conservation Act, introducing stricter penalties for illegal deforestation and providing greater protection for old-growth forests.',
        source: 'The Economic Times',
        date: '2025-03-25',
        url: 'https://economictimes.indiatimes.com',
        category: 'policy'
      },
      {
        id: 'news-4',
        title: 'Supreme Court Orders Buffer Zones Around Protected Forests',
        summary: 'In a landmark judgment, the Supreme Court has mandated the creation of buffer zones extending 5km around all protected forest areas to prevent encroachment.',
        source: 'Indian Express',
        date: '2025-03-18',
        url: 'https://indianexpress.com',
        category: 'policy'
      }
    ];
    
    const disasterNews: NewsItem[] = [
      {
        id: 'news-5',
        title: 'Forest Fires in Uttarakhand Under Control After Week-Long Battle',
        summary: 'After a coordinated effort from forest departments and disaster response teams, the major forest fires that ravaged parts of Uttarakhand have been brought under control.',
        source: 'Hindustan Times',
        date: '2025-03-27',
        url: 'https://www.hindustantimes.com',
        category: 'disaster'
      },
      {
        id: 'news-6',
        title: 'Landslides in Western Ghats Linked to Deforestation',
        summary: 'A new study has directly linked recent devastating landslides in the Western Ghats to deforestation, showing how forest loss undermined soil stability in the affected areas.',
        source: 'Times of India',
        date: '2025-03-22',
        url: 'https://timesofindia.indiatimes.com',
        category: 'disaster'
      }
    ];
    
    const researchNews: NewsItem[] = [
      {
        id: 'news-7',
        title: 'New Tree Species Discovered in Eastern Himalayas',
        summary: 'Scientists from the Botanical Survey of India have discovered a previously unknown tree species in the remote forests of Arunachal Pradesh, highlighting the biodiversity of the region.',
        source: 'Science Daily India',
        date: '2025-03-20',
        url: 'https://www.sciencedaily.com',
        category: 'research'
      },
      {
        id: 'news-8',
        title: 'Satellite Data Shows Forest Recovery in Central India',
        summary: 'Analysis of satellite imagery over the past decade reveals surprising forest recovery in parts of central India, attributed to successful community-based conservation programs.',
        source: 'Nature India',
        date: '2025-03-14',
        url: 'https://www.nature.com',
        category: 'research'
      }
    ];
    
    return [...conservationNews, ...policyNews, ...disasterNews, ...researchNews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };
  
  const news = generateNewsData();
  
  const generateClimateImpactData = () => {
    if (!stateData) return null;
    
    return {
      temperature: {
        current: 25 + Math.random() * 10,
        anomaly: 0.8 + Math.random() * 1.2,
        trend: '+1.2°C per decade'
      },
      rainfall: {
        current: 1200 + Math.random() * 800,
        anomaly: -5 - Math.random() * 10,
        trend: '-8% per decade'
      },
      extremeEvents: {
        droughts: Math.floor(Math.random() * 3) + 1,
        floods: Math.floor(Math.random() * 4) + 2,
        heatwaves: Math.floor(Math.random() * 5) + 3
      }
    };
  };
  
  const climateData = generateClimateImpactData();
  
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
          Recent environmental news, forest fire risk, and climate impact analysis for {stateData.name}
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
          
          <TabsContent value="news" className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{item.summary}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{item.source} • {new Date(item.date).toLocaleDateString()}</span>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                  >
                    Visit Source <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="fires">
            <ForestFireAnalysis stateId={stateId} />
          </TabsContent>
          
          <TabsContent value="climate">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Temperature Analysis</h3>
                  </div>
                  {climateData && (
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Average Temperature</div>
                        <div className="text-xl font-bold">{climateData.temperature.current.toFixed(1)}°C</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Temperature Anomaly</div>
                        <div className="text-lg font-semibold text-red-600">+{climateData.temperature.anomaly.toFixed(1)}°C</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Long-term Trend</div>
                        <div className="text-base">{climateData.temperature.trend}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudRain className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Precipitation Analysis</h3>
                  </div>
                  {climateData && (
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Annual Rainfall</div>
                        <div className="text-xl font-bold">{climateData.rainfall.current.toFixed(0)} mm</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Rainfall Anomaly</div>
                        <div className="text-lg font-semibold text-amber-600">{climateData.rainfall.anomaly.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Long-term Trend</div>
                        <div className="text-base">{climateData.rainfall.trend}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-medium">Extreme Weather Events</h3>
                  </div>
                  {climateData && (
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Drought Events (Last 5 Years)</div>
                        <div className="text-xl font-bold">{climateData.extremeEvents.droughts}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Flood Events (Last 5 Years)</div>
                        <div className="text-xl font-bold">{climateData.extremeEvents.floods}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Heat Waves (Last 5 Years)</div>
                        <div className="text-xl font-bold">{climateData.extremeEvents.heatwaves}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Climate Impact on Forests in {stateData.name}</h3>
                <p className="text-gray-700">
                  Climate change is significantly affecting forest ecosystems in {stateData.name}. Rising temperatures are 
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
          </TabsContent>
          
          <TabsContent value="report" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
                  <FileText className="h-5 w-5"/>
                  Forest Status Report: {stateData.name}
                </h2>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors">
                  <FileText className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-green-700">Executive Summary</h3>
                    <p className="text-gray-700">
                      This report provides a comprehensive analysis of forest cover status, trends, and environmental impacts 
                      in {stateData.name}. The region currently has a conservation status rated as 
                      <span className="font-medium"> {stateData.conservationStatus}</span>, with an annual deforestation 
                      rate of {stateData.deforestationRate.toFixed(1)}%.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-green-700">Key Findings</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Total forest area: {Math.round(stateData.forestData[stateData.forestData.length-1].totalForestCover).toLocaleString()} sq km</li>
                      <li>Forest density classification: {stateData.conservationStatus}</li>
                      <li>Primary threats: {stateData.deforestationRate > 1 ? 'Agricultural expansion, logging, and urbanization' : 'Climate change and invasive species'}</li>
                      <li>Air quality correlation: {stateData.deforestationRate > 0.8 ? 'Strong negative impact observed' : 'Moderate positive influence on regional air quality'}</li>
                      <li>Climate mitigation potential: {stateData.conservationStatus === 'Excellent' || stateData.conservationStatus === 'Good' ? 'High carbon sequestration value' : 'Moderate to low carbon storage capacity'}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-green-700">Historical Trends (2013-2024)</h3>
                    <p className="text-gray-700">
                      Forest cover in {stateData.name} has shown a 
                      {stateData.deforestationRate > 0 ? ' decline ' : ' growth '} 
                      over the past decade at an average annual rate of 
                      {stateData.deforestationRate > 0 ? ' -' + stateData.deforestationRate.toFixed(1) : ' +' + Math.abs(stateData.deforestationRate).toFixed(1)}%. 
                      The most significant changes have occurred in the 
                      {stateData.forestData[0].veryDenseForest > stateData.forestData[0].openForest ? ' very dense forest ' : ' open forest '} 
                      category.
                    </p>
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
                <p className="mt-2 text-sm text-green-800">
                  Based on current forest health, biodiversity metrics, and protection status, {stateData.name} 
                  shows {stateData.conservationStatus === 'Excellent' || stateData.conservationStatus === 'Good' ? 
                  'high potential' : stateData.conservationStatus === 'Fair' ? 'moderate potential' : 'limited potential'} 
                  for successful conservation initiatives.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalUpdates;
