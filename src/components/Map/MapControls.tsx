
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleInfo: () => void;
  onToggleView: () => void;
  forestDensityView: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onToggleInfo,
  onToggleView,
  forestDensityView
}) => {
  return (
    <div className="absolute top-2 right-2 z-10 flex gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onZoomIn}
        className="bg-white/90 hover:bg-white"
      >
        <span className="text-xl">+</span>
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onZoomOut}
        className="bg-white/90 hover:bg-white"
      >
        <span className="text-xl">-</span>
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onToggleInfo}
        className="bg-white/90 hover:bg-white"
      >
        <Info size={18} />
      </Button>
      <Button 
        variant="outline" 
        onClick={onToggleView}
        className="bg-white/90 hover:bg-white text-xs px-2"
      >
        {forestDensityView ? "Conservation View" : "Forest Density View"}
      </Button>
    </div>
  );
};

export default MapControls;
