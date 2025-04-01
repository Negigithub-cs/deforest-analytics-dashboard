
import React, { useState, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography
} from 'react-simple-maps';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById, getConservationStatusColor } from '@/data/mockData';
import { geoMercator } from 'd3-geo';

const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

interface IndiaMapProps {
  selectedState: string;
  onStateSelect: (stateId: string) => void;
}

interface MapStateData {
  id: string;
  state: string;
}

// Simple mapping between topojson state names and our state ids
const stateMapping: Record<string, string> = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  "Assam": "AS",
  "Bihar": "BR",
  "Chhattisgarh": "CG",
  "Goa": "GA",
  "Gujarat": "GJ",
  "Haryana": "HR",
  "Himachal Pradesh": "HP",
  "Jharkhand": "JH",
  "Karnataka": "KA",
  "Kerala": "KL",
  "Madhya Pradesh": "MP",
  "Maharashtra": "MH",
  "Manipur": "MN",
  "Meghalaya": "ML",
  "Mizoram": "MZ",
  "Nagaland": "NL",
  "Odisha": "OD",
  "Punjab": "PB",
  "Rajasthan": "RJ",
  "Sikkim": "SK",
  "Tamil Nadu": "TN",
  "Telangana": "TS",
  "Tripura": "TR",
  "Uttar Pradesh": "UP",
  "Uttarakhand": "UK",
  "West Bengal": "WB"
};

const IndiaMap: React.FC<IndiaMapProps> = ({ selectedState, onStateSelect }) => {
  const [tooltipData, setTooltipData] = useState<MapStateData | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch the GeoJSON data
  useEffect(() => {
    setIsLoading(true);
    
    fetch(INDIA_TOPO_JSON)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGeoData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching geography data:", err);
        setError("Failed to load map data. Please try again later.");
        setIsLoading(false);
      });
  }, []);
  
  const getStateIdFromName = (name: string): string => {
    return stateMapping[name] || "";
  };
  
  const getStateFill = (stateId: string): string => {
    if (stateId === selectedState) {
      return "#2E7D32"; // Highlight selected state
    }
    
    const stateData = getStateById(stateId);
    if (!stateData) return "#EEEEEE";
    
    return getConservationStatusColor(stateData.conservationStatus);
  };
  
  const handleStateMouseEnter = (geo: any) => {
    const stateName = geo.properties.NAME_1;
    const stateId = getStateIdFromName(stateName);
    setTooltipData({ id: stateId, state: stateName });
  };
  
  const handleStateMouseLeave = () => {
    setTooltipData(null);
  };
  
  const handleStateClick = (geo: any) => {
    const stateName = geo.properties.NAME_1;
    const stateId = getStateIdFromName(stateName);
    if (stateId) {
      onStateSelect(stateId);
    }
  };
  
  const renderMap = () => {
    if (isLoading) {
      return <div className="flex items-center justify-center h-64">Loading map data...</div>;
    }
    
    if (error) {
      return <div className="flex items-center justify-center h-64 text-red-500">{error}</div>;
    }
    
    return (
      <TooltipProvider>
        <ComposableMap
          projection={geoMercator}
          projectionConfig={{
            scale: 1000,
            center: [82, 22]
          }}
          width={450}
          height={450}
        >
          {geoData && (
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const stateName = geo.properties.NAME_1;
                  const stateId = getStateIdFromName(stateName);
                  
                  return (
                    <Tooltip key={geo.rsmKey}>
                      <TooltipTrigger asChild>
                        <Geography
                          geography={geo}
                          style={{
                            default: {
                              fill: getStateFill(stateId),
                              stroke: "#FFFFFF",
                              strokeWidth: 0.75,
                              outline: "none"
                            },
                            hover: {
                              fill: "#2E7D32",
                              stroke: "#FFFFFF",
                              strokeWidth: 0.75,
                              outline: "none",
                              cursor: "pointer"
                            },
                            pressed: {
                              fill: "#1B5E20",
                              stroke: "#FFFFFF",
                              strokeWidth: 0.75,
                              outline: "none"
                            }
                          }}
                          onMouseEnter={() => handleStateMouseEnter(geo)}
                          onMouseLeave={handleStateMouseLeave}
                          onClick={() => handleStateClick(geo)}
                        />
                      </TooltipTrigger>
                      {stateId && (
                        <TooltipContent>
                          <div>
                            <p className="font-bold">{stateName}</p>
                            {getStateById(stateId) && (
                              <>
                                <p>Conservation Status: {getStateById(stateId)?.conservationStatus}</p>
                                <p>Deforestation Rate: {getStateById(stateId)?.deforestationRate.toFixed(1)}%</p>
                              </>
                            )}
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })
              }
            </Geographies>
          )}
        </ComposableMap>
      </TooltipProvider>
    );
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>State-wise Forest Status</CardTitle>
        <CardDescription>
          Click on a state to view detailed information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-full flex items-center justify-center">
          {renderMap()}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaMap;
