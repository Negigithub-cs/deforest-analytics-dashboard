
import React, { useState, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { 
  TooltipProvider, 
  Tooltip
} from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStateById } from '@/data/mockData';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapStatus from './MapStatus';
import StateTooltip from './StateTooltip';
import { getStateIdFromName } from './utils/stateMappings';
import { getStateFill } from './utils/mapHelpers';

// Use a reliable GeoJSON source for India with CORS support
const INDIA_TOPO_JSON = "https://gist.githubusercontent.com/AnimeshN/88d7735728663a8aec3141298cefb3fa/raw/india_state_boundaries.geojson";

interface IndiaMapProps {
  selectedState: string;
  onStateSelect: (stateId: string) => void;
  selectedYear?: number;
}

interface MapStateData {
  id: string;
  state: string;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ 
  selectedState, 
  onStateSelect,
  selectedYear = 2024 
}) => {
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

  const getStateFillForYear = (stateId: string): string => {
    return getStateFill(stateId, selectedState, forestDensityView, selectedYear);
  };
  
  const renderMap = () => {
    if (isLoading || error) {
      return <MapStatus isLoading={isLoading} error={error} />;
    }
    
    return (
      <TooltipProvider>
        <div className="relative h-[400px]">
          <MapControls 
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onToggleInfo={() => setShowInfo(!showInfo)}
            onToggleView={() => setForestDensityView(!forestDensityView)}
            forestDensityView={forestDensityView}
          />
          
          {showInfo && <MapLegend showForestDensity={forestDensityView} />}
          
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
                      const stateName = geo.properties.NAME_1 || geo.properties.name || geo.properties.ST_NM;
                      if (!stateName) return null;
                      const stateId = getStateIdFromName(stateName);
                      
                      return (
                        <Tooltip key={geo.rsmKey}>
                          <StateTooltip 
                            geo={geo}
                            stateId={stateId}
                            stateName={stateName}
                            getStateFill={getStateFillForYear}
                            handleStateMouseEnter={handleStateMouseEnter}
                            handleStateMouseLeave={handleStateMouseLeave}
                            handleStateClick={handleStateClick}
                            forestDensityView={forestDensityView}
                            selectedYear={selectedYear}
                          />
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
  
  // Get appropriate title based on year
  const getMapTitle = () => {
    const currentYear = new Date().getFullYear();
    const yearDisplay = selectedYear > currentYear ? `${selectedYear} (Projected)` : selectedYear;
    
    return forestDensityView 
      ? `Forest Density View - ${yearDisplay}` 
      : `State-wise Forest Status - ${yearDisplay}`;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          {getMapTitle()}
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
