
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import StateSelector from '@/components/UI/StateSelector';
import TimeRangeSelector from '@/components/UI/TimeRangeSelector';
import AirQualityTrend from '@/components/Charts/AirQualityTrend';
import CorrelationAnalysis from '@/components/Charts/CorrelationAnalysis';
import PredictiveModel from '@/components/Charts/PredictiveModel';

const TrendsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('IN');
  const [timeRange, setTimeRange] = useState('historical');

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="container mx-auto py-6">
        {/* Back Navigation */}
        <motion.button 
          className="mb-6 flex items-center text-blue-700 hover:text-blue-800 transition-colors"
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
          className="relative bg-gradient-to-r from-blue-900/90 to-blue-600/90 p-6 rounded-xl mb-8 overflow-hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200&auto=format')` }}>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h1 className="text-3xl font-bold text-white">Trends & Analysis</h1>
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
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="card-bg-yellow rounded-lg p-1">
              <AirQualityTrend
                stateId={selectedState}
                timeRange={timeRange}
              />
            </div>
            <div className="card-bg-peach rounded-lg p-1">
              <CorrelationAnalysis 
                stateId={selectedState} 
              />
            </div>
          </div>
          
          {/* Predictive Model */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="card-bg-green rounded-lg p-1">
              <PredictiveModel 
                stateId={selectedState} 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrendsPage;
