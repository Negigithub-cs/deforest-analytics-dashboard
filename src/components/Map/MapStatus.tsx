
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MapStatusProps {
  isLoading: boolean;
  error: string | null;
}

const MapStatus: React.FC<MapStatusProps> = ({ isLoading, error }) => {
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
  
  return null;
};

export default MapStatus;
