
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStateById, getConservationStatusColor } from '@/data/mockData';

interface DistrictComparisonProps {
  mode: 'positive' | 'negative';
  stateId: string;
}

interface DistrictData {
  id: string;
  name: string;
  deforestationRate: number;
  conservationStatus: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent';
  forestCover: number;
}

const DistrictComparison: React.FC<DistrictComparisonProps> = ({ mode, stateId }) => {
  // Get state data
  const stateData = getStateById(stateId);
  
  // Generate mock district data for the selected state
  const generateDistrictData = (stateId: string, stateName: string): DistrictData[] => {
    // Create 10-15 districts for the state
    const numberOfDistricts = Math.floor(Math.random() * 6) + 10; // 10-15 districts
    const districts: DistrictData[] = [];
    
    const statusOptions = ['Critical', 'Poor', 'Fair', 'Good', 'Excellent'] as const;
    
    for (let i = 0; i < numberOfDistricts; i++) {
      const id = `${stateId}-D${i+1}`;
      const name = `${stateName} District ${i+1}`;
      
      // Add some variation to the data
      const deforestationRate = mode === 'positive' 
        ? Math.random() * 0.5  // Lower rates for positive performers
        : 0.5 + Math.random() * 2; // Higher rates for negative performers
        
      const statusIndex = mode === 'positive'
        ? Math.floor(Math.random() * 3) + 2 // Good to Excellent for positive
        : Math.floor(Math.random() * 3); // Critical to Fair for negative
        
      const conservationStatus = statusOptions[statusIndex];
      
      // Random forest cover between 100-5000 sq km
      const forestCover = Math.floor(100 + Math.random() * 4900);
      
      districts.push({
        id,
        name,
        deforestationRate,
        conservationStatus,
        forestCover
      });
    }
    
    // Sort by deforestation rate
    return mode === 'positive'
      ? districts.sort((a, b) => a.deforestationRate - b.deforestationRate)
      : districts.sort((a, b) => b.deforestationRate - a.deforestationRate);
  };
  
  // Get districts for the state (or use India-wide districts if "IN" is selected)
  const districts = stateData 
    ? generateDistrictData(stateData.id, stateData.name).slice(0, 5)
    : [];
    
  const getStatusText = (status: string): string => {
    return status;
  };
  
  if (!stateData || districts.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            {mode === 'positive' 
              ? 'Top Conservation Districts' 
              : 'Highest Deforestation Risk Districts'}
          </CardTitle>
          <CardDescription>
            Please select a state to view district comparison
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          {mode === 'positive' 
            ? `Top Conservation Districts in ${stateData.name}` 
            : `Highest Deforestation Risk Districts in ${stateData.name}`}
        </CardTitle>
        <CardDescription>
          {mode === 'positive' 
            ? 'Districts showing positive forest conservation trends' 
            : 'Districts with concerning forest degradation trends'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {mode === 'positive' 
              ? 'Districts with lowest annual deforestation rates' 
              : 'Districts with highest annual deforestation rates'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Forest Cover</TableHead>
              <TableHead>Annual Change</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {districts.map((district, index) => (
              <TableRow key={district.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{district.name}</TableCell>
                <TableCell>{district.forestCover.toLocaleString()} sq km</TableCell>
                <TableCell>
                  {district.deforestationRate.toFixed(1)}% per year
                </TableCell>
                <TableCell>
                  <Badge 
                    style={{ 
                      backgroundColor: getConservationStatusColor(district.conservationStatus),
                      color: '#fff' 
                    }}
                  >
                    {getStatusText(district.conservationStatus)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DistrictComparison;
