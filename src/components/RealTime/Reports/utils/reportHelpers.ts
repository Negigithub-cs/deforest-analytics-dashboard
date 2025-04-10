
export const generateStateSpecificStats = (stateId: string) => {
  // Create unique variation based on stateId
  const idSum = stateId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseForestDensity = 28 + (idSum % 10);
  const baseDeforestation = 1 + ((idSum % 5) / 10);
  
  // Generate yearly data that's unique per state
  const getYearlyData = () => {
    const years = 7; // 7 years of data
    const baseValue = 32 + (idSum % 15);
    const result = [];
    
    let currentValue = baseValue;
    for (let i = 0; i < years; i++) {
      // Create a state-specific pattern using the stateId
      const multiplier = ((i + 1) * (parseInt(stateId.substring(1), 36) % 5 + 1)) / 10;
      const delta = Math.sin((i / years) * Math.PI * 2) * multiplier * (idSum % 6);
      
      // Make sure different states have different patterns
      currentValue = baseValue + delta + ((i * idSum) % 10);
      result.push(Math.round(currentValue));
    }
    
    return result;
  };

  // Generate completely unique conservation timeline per state
  const generateConservationTimeline = (stateName: string) => {
    // Use stateId to create unique years and events
    const startYear = 2000 + (idSum % 10);
    const yearGap = 3 + (idSum % 5);
    
    // Create state-specific events
    const events = [
      {
        year: startYear,
        event: `${stateName} Forest Protection Act established`
      },
      {
        year: startYear + yearGap,
        event: `Creation of ${stateName} Biodiversity Conservation Zones`
      },
      {
        year: startYear + (yearGap * 2),
        event: `${stateName} Sustainable Forestry Initiative launched`
      },
      {
        year: startYear + (yearGap * 3),
        event: `Implementation of ${stateName} Forest Restoration Program`
      },
      {
        year: startYear + (yearGap * 4),
        event: `${stateName} created Green Corridor Network`
      }
    ];
    
    return events.sort((a, b) => a.year - b.year);
  };
  
  return {
    forestDensity: baseForestDensity + (idSum % 9) / 10,
    deforestation: baseDeforestation + (idSum % 8) / 10,
    biodiversity: ['Low', 'Moderate', 'High', 'Very High'][idSum % 4],
    forestHealth: ['Poor', 'Fair', 'Good', 'Excellent'][idSum % 4],
    growthRate: 0.3 + (idSum % 10) / 10,
    annualData: getYearlyData(),
    generateConservationTimeline
  };
};
