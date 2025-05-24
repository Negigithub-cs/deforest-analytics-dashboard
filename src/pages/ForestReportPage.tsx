
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import StateSelector from '@/components/UI/StateSelector';
import ForestReportTab from '@/components/RealTime/ForestReportTab';

const ForestReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('IN');

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
      <div className="container mx-auto py-6">
        {/* Back Navigation */}
        <motion.button 
          className="mb-6 flex items-center text-emerald-700 hover:text-emerald-800 transition-colors"
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
          className="relative bg-gradient-to-r from-emerald-900/90 to-emerald-600/90 p-6 rounded-xl mb-8 overflow-hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516575438296-6a7562bdee6c?q=80&w=1200&auto=format')` }}>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h1 className="text-3xl font-bold text-white">Forest Reports</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <StateSelector 
                selectedState={selectedState} 
                onStateChange={handleStateChange} 
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
          {/* Forest Report */}
          <div className="mb-6">
            <ForestReportTab stateId={selectedState} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForestReportPage;
