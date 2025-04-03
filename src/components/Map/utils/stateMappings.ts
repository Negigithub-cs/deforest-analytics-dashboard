
// Simple mapping between topojson state names and our state ids
export const stateMapping: Record<string, string> = {
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

// Reverse mapping for displaying state names
export const stateIdToName: Record<string, string> = {};
Object.entries(stateMapping).forEach(([name, id]) => {
  stateIdToName[id] = name;
});

export const getStateIdFromName = (name: string): string => {
  return stateMapping[name] || "";
};
