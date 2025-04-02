
import React, { useState, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById, getConservationStatusColor } from '@/data/mockData';
import { AlertCircle, Info, Maximize } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Use a reliable GeoJSON source for India (this was causing the 404 error)
const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/rawgraphs/rawgraphs-core/master/data/india-states.geojson";

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
  "West Bengal": "WB",
  "Andaman and Nicobar Islands": "AN",
  "Chandigarh": "CH",
  "Dadra and Nagar Haveli and Daman and Diu": "DN",
  "Delhi": "DL",
  "Jammu and Kashmir": "JK",
  "Ladakh": "LA", 
  "Lakshadweep": "LD",
  "Puducherry": "PY"
};

const IndiaMap: React.FC<IndiaMapProps> = ({ selectedState, onStateSelect }) => {
  const [tooltipData, setTooltipData] = useState<MapStateData | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState({ coordinates: [82, 22], zoom: 4 });
  const [showInfo, setShowInfo] = useState(false);
  const [forestDensityView, setForestDensityView] = useState(false);
  
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
    if (forestDensityView) {
      const stateData = getStateById(stateId);
      if (!stateData) return "#EEEEEE";
      
      const latestData = stateData.forestData[stateData.forestData.length - 1];
      const totalArea = latestData.totalForestCover + latestData.nonForest;
      const forestPercent = (latestData.totalForestCover / totalArea) * 100;
      
      if (forestPercent > 60) return "#1B5E20"; // Dark green - very dense
      if (forestPercent > 40) return "#2E7D32"; // Medium green - moderately dense
      if (forestPercent > 20) return "#4CAF50"; // Light green - open forest
      if (forestPercent > 10) return "#A5D6A7"; // Very light green - minimal forest
      return "#EEEEEE"; // Gray - almost no forest
    } else {
      if (stateId === selectedState) {
        return "#2E7D32"; // Highlight selected state
      }
      
      const stateData = getStateById(stateId);
      if (!stateData) return "#EEEEEE";
      
      return getConservationStatusColor(stateData.conservationStatus);
    }
  };
  
  const handleStateMouseEnter = (geo: any) => {
    const stateName = geo.properties.NAME_1 || geo.properties.name;
    const stateId = getStateIdFromName(stateName);
    setTooltipData({ id: stateId, state: stateName });
  };
  
  const handleStateMouseLeave = () => {
    setTooltipData(null);
  };
  
  const handleStateClick = (geo: any) => {
    const stateName = geo.properties.NAME_1 || geo.properties.name;
    const stateId = getStateIdFromName(stateName);
    if (stateId) {
      onStateSelect(stateId);
    }
  };

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }));
  };

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };
  
  const renderMap = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-2">
          <div className="w-8 h-8 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
          <p>Loading map data...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-red-500 gap-2">
          <AlertCircle size={24} />
          <p>{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      );
    }
    
    return (
      <TooltipProvider>
        <div className="relative h-[400px]">
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleZoomIn}
              className="bg-white/90 hover:bg-white"
            >
              <span className="text-xl">+</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleZoomOut}
              className="bg-white/90 hover:bg-white"
            >
              <span className="text-xl">-</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowInfo(!showInfo)}
              className="bg-white/90 hover:bg-white"
            >
              <Info size={18} />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setForestDensityView(!forestDensityView)}
              className="bg-white/90 hover:bg-white text-xs px-2"
            >
              {forestDensityView ? "Conservation View" : "Forest Density View"}
            </Button>
          </div>
          
          {showInfo && (
            <div className="absolute top-14 right-2 w-64 p-3 bg-white/90 rounded-md shadow-md text-xs z-10 border border-gray-200">
              <h4 className="font-bold mb-1">Map Legend</h4>
              <div className="grid grid-cols-2 gap-1">
                {forestDensityView ? (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-green-900"></div>
                      <span>Very Dense ({'>'}60%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-green-700"></div>
                      <span>Moderately Dense ({'>'}40%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                      <span>Open Forest ({'>'}20%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-green-200"></div>
                      <span>Minimal Forest ({'>'}10%)</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-green-800"></div>
                      <span>Excellent</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                      <span>Good</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-yellow-500"></div>
                      <span>Fair</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
                      <span>Poor</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-red-500"></div>
                      <span>Critical</span>
                    </div>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Click on any state to view detailed information</p>
            </div>
          )}
          
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1000
            }}
            width={450}
            height={450}
            className="transition-all duration-300"
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates as [number, number]}
              onMoveEnd={handleMoveEnd}
              translateExtent={[
                [0, 0],
                [450, 450]
              ]}
            >
              {geoData && (
                <Geographies geography={geoData}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const stateName = geo.properties.NAME_1 || geo.properties.name;
                      if (!stateName) return null;
                      const stateId = getStateIdFromName(stateName);
                      
                      return (
                        <Tooltip key={geo.rsmKey}>
                          <TooltipTrigger asChild>
                            <Geography
                              geography={geo}
                              fill={getStateFill(stateId)}
                              stroke="#FFFFFF"
                              strokeWidth={0.75}
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
                                    {forestDensityView && getStateById(stateId)?.forestData.length > 0 && (
                                      <p>Forest Cover: {Math.round((getStateById(stateId)?.forestData[getStateById(stateId)!.forestData.length - 1].totalForestCover || 0) / 
                                        ((getStateById(stateId)?.forestData[getStateById(stateId)!.forestData.length - 1].totalForestCover || 0) + 
                                         (getStateById(stateId)?.forestData[getStateById(stateId)!.forestData.length - 1].nonForest || 0)) * 100)}%</p>
                                    )}
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
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </TooltipProvider>
    );
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          {forestDensityView ? "Forest Density View" : "State-wise Forest Status"}
        </CardTitle>
        <CardDescription>
          {forestDensityView 
            ? "Visualizing the percentage of land covered by forests across states" 
            : "Click on a state to view detailed information"}
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
