
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import StateSelector from '@/components/UI/StateSelector';
import TimeRangeSelector from '@/components/UI/TimeRangeSelector';
import StateInfo from '@/components/Layout/Dashboard/StateInfo';
import KeyInsights from '@/components/Layout/Dashboard/KeyInsights';
import ForestCoverChange from '@/components/Charts/ForestCoverChange';
import ForestConservationStatus from '@/components/Charts/ForestConservationStatus';
import ForestTypeDistribution from '@/components/Charts/ForestTypeDistribution';
import ForestCoverTrend from '@/components/Charts/ForestCoverTrend';
import ForestCoverSummary from '@/components/RealTime/Reports/ForestCoverSummary';
import { getStateById } from '@/data/mockData';

const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('IN');
  const [timeRange, setTimeRange] = useState('historical');
  const [selectedYear, setSelectedYear] = useState(2024);

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    if (range === 'historical') {
      setSelectedYear(2024);
    } else if (range === 'projected') {
      setSelectedYear(2030);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <div className="container mx-auto py-6">
        {/* Back Navigation */}
        <motion.button 
          className="mb-6 flex items-center text-green-700 hover:text-green-800 transition-colors"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Navigation
        </motion.button>
        
        {/* Page Title */}
        <motion.div 
          className="relative bg-gradient-to-r from-green-900/90 to-green-600/90 p-6 rounded-xl mb-8 overflow-hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1601821236989-99924dff697a?q=80&w=1200&auto=format')` }}>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h1 className="text-3xl font-bold text-white">Forest Overview</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <StateSelector 
                selectedState={selectedState} 
                onStateChange={handleStateChange} 
              />
              <TimeRangeSelector 
                selectedTimeRange={timeRange} 
                onTimeRangeChange={handleTimeRangeChange} 
              />
            </div>
          </div>
        </motion.div>

        {/* Content with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* State Info */}
          <StateInfo selectedState={selectedState} />
          
          {/* Key Insights */}
          <KeyInsights selectedState={selectedState} showInsights={true} />
          
          {/* Forest Cover Summary */}
          <div className="mb-6">
            <ForestCoverSummary 
              stateId={selectedState}
              stateName={selectedState === 'IN' ? 'India' : getStateById(selectedState)?.name || ''}
              deforestationRate={selectedState === 'IN' ? 2.1 : (getStateById(selectedState)?.deforestationRate || 2.0)}
            />
          </div>
          
          {/* Forest Cover Change */}
          <div className="mb-6">
            <ForestCoverChange stateId={selectedState} />
          </div>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="card-bg-green rounded-lg p-1">
              <ForestConservationStatus 
                stateId={selectedState} 
                selectedYear={selectedYear}
              />
            </div>
            <div className="card-bg-blue rounded-lg p-1">
              <ForestTypeDistribution 
                stateId={selectedState} 
                year={selectedYear} 
              />
            </div>
          </div>
          
          {/* Forest Cover Trend */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="card-bg-purple rounded-lg p-1">
              <ForestCoverTrend 
                stateId={selectedState} 
                timeRange={timeRange} 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewPage;
