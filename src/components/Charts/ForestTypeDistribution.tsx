
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  Legend,
  Sector
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStateById } from '@/data/mockData';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ForestTypeDistributionProps {
  stateId: string;
  year: number;
}

const ForestTypeDistribution: React.FC<ForestTypeDistributionProps> = ({ stateId, year }) => {
  const [view, setView] = useState<'types' | 'landUse'>('types');
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  
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
    { name: 'Very Dense Forest', value: yearData.veryDenseForest, description: 'Canopy density >70%' },
    { name: 'Moderately Dense Forest', value: yearData.moderatelyDenseForest, description: 'Canopy density 40-70%' },
    { name: 'Open Forest', value: yearData.openForest, description: 'Canopy density 10-40%' },
  ];
  
  const landUseData = [
    { name: 'Forest Cover', value: yearData.totalForestCover, description: 'Total area under forest cover' },
    { name: 'Scrub', value: yearData.scrub, description: 'Degraded forest land with canopy density <10%' },
    { name: 'Non-Forest', value: yearData.nonForest, description: 'Area under non-forest use' },
  ];
  
  const FOREST_TYPE_COLORS = ['#1B5E20', '#4CAF50', '#8BC34A'];
  const LAND_USE_COLORS = ['#2E7D32', '#A1887F', '#E0E0E0'];
  
  const data = view === 'types' ? forestTypeData : landUseData;
  const colors = view === 'types' ? FOREST_TYPE_COLORS : LAND_USE_COLORS;
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(undefined);
  };
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    return (
      <g>
        <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill={fill} className="text-xs font-semibold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill={fill} className="text-xs">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 15}
          fill={fill}
        />
      </g>
    );
  };
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm text-sm">
          <p className="font-medium mb-1">{data.name}</p>
          <p className="text-xs text-gray-600 mb-1">{data.description}</p>
          <div className="flex justify-between gap-4">
            <span>Area:</span>
            <span className="font-bold">{Number(data.value).toLocaleString()} sq km</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Percentage:</span>
            <span className="font-bold">
              {(data.value / (view === 'types' 
                ? yearData.totalForestCover 
                : yearData.totalForestCover + yearData.scrub + yearData.nonForest) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <CardTitle>Forest Composition ({year})</CardTitle>
              <CardDescription>
                {stateData.name}'s forest type and land use distribution
              </CardDescription>
            </div>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info size={16} />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Understanding Forest Composition</h4>
                  <p className="text-sm text-muted-foreground">
                    This chart shows the breakdown of forest types and land use for the selected year. 
                    {year >= 2025 && " Data shown for this year is based on projections."}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • Click on segments to highlight them<br />
                    • Switch between forest types and land use views<br />
                    • Hover over segments for detailed information
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <Tabs defaultValue="types" onValueChange={(v) => setView(v as 'types' | 'landUse')}>
            <TabsList>
              <TabsTrigger value="types">Forest Types</TabsTrigger>
              <TabsTrigger value="landUse">Land Use</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationDuration={800}
                animationBegin={0}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconSize={10}
                iconType="circle"
                wrapperStyle={{ paddingTop: '15px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestTypeDistribution;
