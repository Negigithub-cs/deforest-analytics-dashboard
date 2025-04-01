
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
import { 
  getTopDeforestationStates, 
  getTopConservationStates, 
  getConservationStatusColor 
} from '@/data/mockData';

interface StateComparisonProps {
  mode: 'positive' | 'negative';
}

const StateComparison: React.FC<StateComparisonProps> = ({ mode }) => {
  const states = mode === 'positive' 
    ? getTopConservationStates(5) 
    : getTopDeforestationStates(5);
  
  const getStatusText = (status: string): string => {
    return status;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          {mode === 'positive' 
            ? 'Top Conservation Performers' 
            : 'Highest Deforestation Risk States'}
        </CardTitle>
        <CardDescription>
          {mode === 'positive' 
            ? 'States showing positive forest conservation trends' 
            : 'States with concerning forest degradation trends'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {mode === 'positive' 
              ? 'States with lowest annual deforestation rates' 
              : 'States with highest annual deforestation rates'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Annual Deforestation Rate</TableHead>
              <TableHead>Conservation Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {states.map((state, index) => (
              <TableRow key={state.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{state.name}</TableCell>
                <TableCell>
                  {state.deforestationRate.toFixed(1)}% per year
                </TableCell>
                <TableCell>
                  <Badge 
                    style={{ 
                      backgroundColor: getConservationStatusColor(state.conservationStatus),
                      color: '#fff' 
                    }}
                  >
                    {getStatusText(state.conservationStatus)}
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

export default StateComparison;
