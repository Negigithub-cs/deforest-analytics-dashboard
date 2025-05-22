
import React from 'react';
import { BadgeAlert, TreeDeciduous } from 'lucide-react';

interface ExecutiveSummaryProps {
  stateName: string;
  stateId: string;
  denseForestPercentage: number;
  openForestPercentage: number;
  growthRate: number;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  stateName,
  stateId,
  denseForestPercentage,
  openForestPercentage,
  growthRate
}) => {
  // Generate state-specific conservation initiatives based on stateId
  const generateInitiatives = (stateId: string, stateName: string) => {
    const baseInitiatives = [
      `${stateName} Forest Protection Act implementation`,
      `${stateName} Biodiversity Conservation Initiative`,
      `Community-based forest management in ${stateName}`,
      `Sustainable forestry practices in ${stateName} woodlands`
    ];
    
    // Add state-specific initiatives based on stateId
    const stateSpecific = {
      'KL': ['Western Ghats Conservation Program', 'Mangrove Restoration Project'],
      'TN': ['Nilgiri Biosphere Protection', 'Eastern Ghats Restoration'],
      'KA': ['Sacred Groves Protection', 'Western Ghats Monitoring System'],
      'AP': ['Coastal Forest Rehabilitation', 'Eastern Ghats Conservation Network'],
      'MH': ['Sahyadri Tiger Reserve Expansion', 'Community Forest Rights Initiative'],
      'MP': ['Satpura-Maikal Landscape Protection', 'Tribal Forest Management Rights'],
      'GJ': ['Gir Forest Protection Program', 'Coastal Mangrove Restoration'],
      'RJ': ['Desert Afforestation Project', 'Aravalli Hills Conservation'],
      'UK': ['Himalayan Ecosystem Services Project', 'High-altitude Forest Monitoring'],
      'HP': ['Himalayan Cedar Conservation', 'Snow Leopard Habitat Protection'],
      'JH': ['Saranda Forest Protection', 'Tribal Community Forest Initiative'],
      'OD': ['Similipal Biosphere Protection', 'Mangrove Conservation Program'],
      'WB': ['Sundarbans Protection Initiative', 'North Bengal Elephant Corridor'],
      'BR': ['Gangetic Plains Reforestation', 'Valmiki Tiger Reserve Expansion'],
      'UP': ['Terai Arc Landscape Conservation', 'Sacred Grove Protection Network'],
      'AS': ['Brahmaputra Floodplain Restoration', 'Community Bamboo Forestry'],
      'AR': ['Eastern Himalayan Biodiversity Project', 'High-altitude Wetland Protection'],
      'SK': ['Khangchendzonga Landscape Conservation', 'Alpine Forest Monitoring'],
      'MN': ['Indo-Myanmar Biodiversity Corridor', 'Community-based Forest Management'],
      'MZ': ['Bamboo Resource Development', 'Shifting Cultivation Transformation'],
      'TR': ['Clouded Leopard Habitat Protection', 'Community Forest Management'],
      'NL': ['Dzukou Valley Conservation', 'Sustainable Jhum Cultivation Project'],
      'ML': ['Sacred Forest Protection', 'Community-led Forest Restoration'],
      'GA': ['Western Ghats Evergreen Forest Protection', 'Mangrove Ecosystem Conservation'],
      'PB': ['Shivalik Forest Conservation', 'Farm Forestry Initiative'],
      'HR': ['Yamuna Basin Restoration', 'Shivalik Ecosystem Protection'],
      'CT': ['Bastar Forest Conservation', 'Tribal Rights and Forest Protection']
    };
    
    // Return combined initiatives (2 base + up to 2 specific)
    const specificInitiatives = stateSpecific[stateId as keyof typeof stateSpecific] || [];
    return [...baseInitiatives.slice(0, 2), ...(specificInitiatives.slice(0, 2))];
  };
  
  const initiatives = generateInitiatives(stateId, stateName);
  
  return (
    <div className="p-6 bg-amber-50 border-b border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <BadgeAlert className="h-5 w-5 text-amber-700" />
        <h4 className="text-lg font-semibold text-amber-800">Executive Summary</h4>
      </div>
      <p className="text-amber-800 mb-4">
        The forest coverage in {stateName} shows varied patterns across regions. Dense forests represent {denseForestPercentage}% of total forest cover, 
        while open forests constitute {openForestPercentage}%. There's been a moderate {growthRate.toFixed(1)}% increase in overall forest cover since the last assessment.
      </p>
      
      {/* Active Conservation Initiatives */}
      <div className="mt-4 bg-white rounded-lg p-3 shadow-sm border border-amber-100">
        <div className="flex items-center gap-2 mb-2">
          <TreeDeciduous className="h-4 w-4 text-amber-700" />
          <h5 className="font-medium text-amber-800">Active Conservation Initiatives</h5>
        </div>
        <ul className="list-disc pl-5 text-sm text-amber-700 space-y-1">
          {initiatives.map((initiative, index) => (
            <li key={`initiative-${index}`}>{initiative}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
