
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
import { Flame, AlertTriangle } from "lucide-react";
import { getStateById } from '@/data/mockData';
import { stateIdToName } from '@/components/Map/utils/stateMappings';

interface ForestFireAnalysisProps {
  stateId: string;
}

interface FireRiskData {
  id: string;
  name: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Extreme';
  vulnerableArea: number;
  drySeasonMonths: string;
}

const ForestFireAnalysis: React.FC<ForestFireAnalysisProps> = ({ stateId }) => {
  const stateData = getStateById(stateId);
  
  // Generate mock fire risk data
  const generateFireRiskData = (): FireRiskData[] => {
    if (stateId === 'IN') {
      // For India overall, show states with highest fire risk
      const highRiskStates = [
        { id: 'UK', riskLevel: 'Extreme' as const },
        { id: 'HP', riskLevel: 'Extreme' as const },
        { id: 'MP', riskLevel: 'High' as const },
        { id: 'CG', riskLevel: 'High' as const },
        { id: 'OD', riskLevel: 'High' as const },
        { id: 'AR', riskLevel: 'High' as const },
        { id: 'AP', riskLevel: 'Moderate' as const },
        { id: 'MH', riskLevel: 'Moderate' as const }
      ];
      
      return highRiskStates.map(state => ({
        id: state.id,
        name: stateIdToName[state.id] || state.id,
        riskLevel: state.riskLevel,
        vulnerableArea: Math.floor(Math.random() * 10000) + 1000,
        drySeasonMonths: 'Feb-Jun'
      }));
    } else {
      // For specific state, show districts with fire risk
      const districtCount = Math.floor(Math.random() * 5) + 5; // 5-10 districts
      const riskLevels = ['Low', 'Moderate', 'High', 'Extreme'] as const;
      const districts = [];
      
      // Get district names for the state
      const stateDistrictMap: Record<string, string[]> = {
        'MP': ['Balaghat', 'Betul', 'Chhindwara', 'Dindori', 'Hoshangabad', 'Mandla', 'Seoni', 'Shahdol', 'Umaria'],
        'UK': ['Almora', 'Chamoli', 'Champawat', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Uttarkashi'],
        'HP': ['Chamba', 'Kangra', 'Kinnaur', 'Kullu', 'Mandi', 'Shimla', 'Sirmaur', 'Solan'],
        'CG': ['Bastar', 'Bijapur', 'Dantewada', 'Kanker', 'Kondagaon', 'Narayanpur', 'Sukma'],
        'AR': ['Anjaw', 'Changlang', 'Dibang Valley', 'Lohit', 'Lower Dibang Valley', 'Tirap', 'Upper Siang'],
        'AP': ['Anantapur', 'Chittoor', 'Kadapa', 'Kurnool', 'Nellore'],
        'OD': ['Angul', 'Deogarh', 'Kandhamal', 'Koraput', 'Mayurbhanj', 'Sambalpur', 'Sundargarh']
      };
      
      const districtNames = stateDistrictMap[stateId] || 
        ['Northern District', 'Southern District', 'Eastern District', 'Western District', 
         'Central District', 'Northeast District', 'Southwest District', 'Northwest District', 
         'Southeast District', 'Forest District', 'Mountain District', 'Valley District'];
      
      for (let i = 0; i < districtCount; i++) {
        const riskIndex = Math.floor(Math.random() * riskLevels.length);
        districts.push({
          id: `${stateId}-D${i+1}`,
          name: districtNames[i % districtNames.length],
          riskLevel: riskLevels[riskIndex],
          vulnerableArea: Math.floor(Math.random() * 1000) + 100,
          drySeasonMonths: 'Mar-Jun'
        });
      }
      
      // Sort by risk level (highest first)
      return districts.sort((a, b) => {
        const riskOrder = { 'Extreme': 3, 'High': 2, 'Moderate': 1, 'Low': 0 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      });
    }
  };
  
  const fireRiskData = generateFireRiskData();
  
  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'Low': return '#4CAF50';
      case 'Moderate': return '#FFC107';
      case 'High': return '#FF9800';
      case 'Extreme': return '#F44336';
      default: return '#FFC107';
    }
  };
  
  if (!stateData) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Forest Fire Risk Analysis</CardTitle>
          <CardDescription>
            Please select a state to view forest fire risk analysis
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Forest Fire Risk Analysis
        </CardTitle>
        <CardDescription>
          {stateId === 'IN' 
            ? 'States with highest forest fire risk in India' 
            : `Districts with highest forest fire risk in ${stateData.name}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-orange-50 p-3 rounded-md mb-4 border border-orange-200">
          <div className="flex gap-2 items-start">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-orange-800">Fire Season Alert</h3>
              <p className="text-sm text-orange-700">
                {stateId === 'IN' 
                  ? 'The Northern and Central regions of India are currently in peak fire season (February to June).' 
                  : `${stateData.name} is currently ${Math.random() > 0.5 ? 'in' : 'approaching'} its high-risk fire season.`}
                {' '}Dry conditions and rising temperatures increase wildfire risk.
              </p>
            </div>
          </div>
        </div>
        
        <Table>
          <TableCaption>
            Regions ranked by forest fire risk level
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Vulnerable Area</TableHead>
              <TableHead>Dry Season</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fireRiskData.map((region) => (
              <TableRow key={region.id}>
                <TableCell className="font-medium">{region.name}</TableCell>
                <TableCell>
                  <Badge 
                    style={{ 
                      backgroundColor: getRiskColor(region.riskLevel),
                      color: region.riskLevel === 'Low' || region.riskLevel === 'Moderate' ? '#000' : '#fff' 
                    }}
                  >
                    {region.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell>{region.vulnerableArea.toLocaleString()} sq km</TableCell>
                <TableCell>{region.drySeasonMonths}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ForestFireAnalysis;
