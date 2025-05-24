
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, LineChart, Thermometer, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const NavigationGrid: React.FC = () => {
  const navigate = useNavigate();
  
  const navigationItems = [
    {
      id: 'overview',
      title: 'Forest Overview',
      description: 'Explore forest cover distribution and conservation status',
      icon: <BarChart3 className="h-12 w-12" />,
      color: 'from-green-600 to-green-400',
      bgImage: 'https://images.unsplash.com/photo-1601821236989-99924dff697a?q=80&w=1200&auto=format',
      path: '/overview'
    },
    {
      id: 'trends',
      title: 'Trends & Analysis',
      description: 'Discover long-term forest cover trends and correlations',
      icon: <LineChart className="h-12 w-12" />,
      color: 'from-blue-600 to-blue-400',
      bgImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200&auto=format',
      path: '/trends'
    },
    {
      id: 'climate',
      title: 'Climate Impact',
      description: 'Analyze climate change effects on forest ecosystems',
      icon: <Thermometer className="h-12 w-12" />,
      color: 'from-amber-600 to-amber-400',
      bgImage: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?q=80&w=1200&auto=format',
      path: '/climate'
    },
    {
      id: 'forest',
      title: 'Forest Reports',
      description: 'Access detailed forest coverage and conservation reports',
      icon: <Leaf className="h-12 w-12" />,
      color: 'from-emerald-600 to-emerald-400',
      bgImage: 'https://images.unsplash.com/photo-1516575438296-6a7562bdee6c?q=80&w=1200&auto=format',
      path: '/forest'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
      transition: { 
        type: "spring", 
        stiffness: 300
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 p-6 md:p-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">India Forest Analysis</h1>
          <p className="text-lg text-gray-600">Select a section to explore detailed forest analytics</p>
        </motion.div>

        {/* Navigation Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navigationItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative h-60 md:h-80 rounded-xl overflow-hidden cursor-pointer"
              variants={itemVariants}
              whileHover="hover"
              onClick={() => navigate(item.path)}
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url('${item.bgImage}')` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-80`}></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center">
                  <div className="bg-white/30 p-3 rounded-lg mr-4">
                    {item.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{item.title}</h2>
                </div>
                
                <div>
                  <p className="text-lg opacity-90 mb-4">{item.description}</p>
                  <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-white font-medium">
                    Explore <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NavigationGrid;
