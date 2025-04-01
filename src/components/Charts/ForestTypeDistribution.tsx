
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStateById } from '@/data/mockData';

interface ForestTypeDistributionProps {
  stateId: string;
  year: number;
}

const ForestTypeDistribution: React.FC<ForestTypeDistributionProps> = ({ stateId, year }) => {
  const [view, setView] = useState<'types' | 'landUse'>('types');
  
  const stateData = getStateById(stateId);
  
  if (!stateData) {
    return <div>No data available</div>;
  }
  
  // Find data for the selected year
  const yearData = [...stateData.forestData, ...stateData.projectedData]
    .find(data => data.year === year);
  
  if (!yearData) {
    return <div>No data available for selected year</div>;
  }
  
  // Prepare data for the pie charts
  const forestTypeData = [
    { name: 'Very Dense Forest', value: yearData.veryDenseForest },
    { name: 'Moderately Dense Forest', value: yearData.moderatelyDenseForest },
    { name: 'Open Forest', value: yearData.openForest },
  ];
  
  const landUseData = [
    { name: 'Forest Cover', value: yearData.totalForestCover },
    { name: 'Scrub', value: yearData.scrub },
    { name: 'Non-Forest', value: yearData.nonForest },
  ];
  
  const FOREST_TYPE_COLORS = ['#1B5E20', '#4CAF50', '#8BC34A'];
  const LAND_USE_COLORS = ['#2E7D32', '#A1887F', '#E0E0E0'];
  
  const data = view === 'types' ? forestTypeData : landUseData;
  const colors = view === 'types' ? FOREST_TYPE_COLORS : LAND_USE_COLORS;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return percent * 100 > 5 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Forest Composition ({year})</CardTitle>
        <CardDescription>
          {stateData.name}'s forest type and land use distribution
        </CardDescription>
        <Tabs defaultValue="types" onValueChange={(v) => setView(v as 'types' | 'landUse')}>
          <TabsList>
            <TabsTrigger value="types">Forest Types</TabsTrigger>
            <TabsTrigger value="landUse">Land Use</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} sq km`, undefined]} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestTypeDistribution;
