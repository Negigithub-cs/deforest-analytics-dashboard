
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStateById, getConservationStatusColor } from '@/data/mockData';

interface DistrictComparisonProps {
  mode: 'positive' | 'negative';
  stateId: string;
}

interface DistrictData {
  id: string;
  name: string;
  deforestationRate: number;
  conservationStatus: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent';
  forestCover: number;
}

// Sample district names by state to use instead of District 1, District 2, etc.
const stateDistrictMap: Record<string, string[]> = {
  'AP': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
  'AR': ['Anjaw', 'Changlang', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Dibang Valley', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
  'AS': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
  'BR': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
  'CT': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'],
  'GA': ['North Goa', 'South Goa'],
  'GJ': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
  'HR': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
  'HP': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
  'JH': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela-Kharsawan', 'Simdega', 'West Singhbhum'],
  'KA': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
  'KL': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wa,yanad'],
  'MP': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
  'MH': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal']
};

// Default district names for any other state not in the map
const defaultDistricts = ['Central', 'Eastern', 'Northern', 'Southern', 'Western', 'North Eastern', 'South Western', 'North Western', 'South Eastern', 'Central Eastern', 'Central Western'];

const DistrictComparison: React.FC<DistrictComparisonProps> = ({ mode, stateId }) => {
  // Get state data
  const stateData = getStateById(stateId);
  
  // Generate mock district data for the selected state
  const generateDistrictData = (stateId: string, stateName: string): DistrictData[] => {
    // Use the appropriate district names based on state ID
    let districtNames = stateDistrictMap[stateId] || defaultDistricts;
    
    // If this is India overall, use state names from mock data
    if (stateId === 'IN') {
      const allStates = getStateById('IN');
      if (allStates) {
        return allStates.forestData.map((_, index) => ({
          id: `IN-S${index+1}`,
          name: `State ${index+1}`,
          deforestationRate: mode === 'positive' 
            ? Math.random() * 0.5  // Lower rates for positive performers
            : 0.5 + Math.random() * 2, // Higher rates for negative performers
          conservationStatus: mode === 'positive' 
            ? (Math.random() > 0.5 ? 'Excellent' : 'Good') as any
            : (Math.random() > 0.5 ? 'Critical' : 'Poor') as any,
          forestCover: Math.floor(100 + Math.random() * 4900)
        }));
      }
    }
    
    // Create 10-15 districts for the state
    const numberOfDistricts = Math.min(districtNames.length, Math.floor(Math.random() * 6) + 10); // 10-15 districts
    const districts: DistrictData[] = [];
    
    const statusOptions = ['Critical', 'Poor', 'Fair', 'Good', 'Excellent'] as const;
    
    // Use real district names from the map
    for (let i = 0; i < numberOfDistricts; i++) {
      const id = `${stateId}-D${i+1}`;
      const name = districtNames[i % districtNames.length];
      
      // Add some variation to the data
      const deforestationRate = mode === 'positive' 
        ? Math.random() * 0.5  // Lower rates for positive performers
        : 0.5 + Math.random() * 2; // Higher rates for negative performers
        
      const statusIndex = mode === 'positive'
        ? Math.floor(Math.random() * 3) + 2 // Good to Excellent for positive
        : Math.floor(Math.random() * 3); // Critical to Fair for negative
        
      const conservationStatus = statusOptions[statusIndex];
      
      // Random forest cover between 100-5000 sq km
      const forestCover = Math.floor(100 + Math.random() * 4900);
      
      districts.push({
        id,
        name,
        deforestationRate,
        conservationStatus,
        forestCover
      });
    }
    
    // Sort by deforestation rate
    return mode === 'positive'
      ? districts.sort((a, b) => a.deforestationRate - b.deforestationRate)
      : districts.sort((a, b) => b.deforestationRate - a.deforestationRate);
  };
  
  // Get districts for the state (or use India-wide states if "IN" is selected)
  const districts = stateData 
    ? generateDistrictData(stateData.id, stateData.name).slice(0, 5)
    : [];
    
  const getStatusText = (status: string): string => {
    return status;
  };
  
  if (!stateData || districts.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            {mode === 'positive' 
              ? 'Top Conservation Districts' 
              : 'Highest Deforestation Risk Districts'}
          </CardTitle>
          <CardDescription>
            Please select a state to view district comparison
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          {mode === 'positive' 
            ? `Top Conservation ${stateId === 'IN' ? 'States' : 'Districts'} in ${stateData.name}` 
            : `Highest Deforestation Risk ${stateId === 'IN' ? 'States' : 'Districts'} in ${stateData.name}`}
        </CardTitle>
        <CardDescription>
          {mode === 'positive' 
            ? `${stateId === 'IN' ? 'States' : 'Districts'} showing positive forest conservation trends` 
            : `${stateId === 'IN' ? 'States' : 'Districts'} with concerning forest degradation trends`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {mode === 'positive' 
              ? `${stateId === 'IN' ? 'States' : 'Districts'} with lowest annual deforestation rates` 
              : `${stateId === 'IN' ? 'States' : 'Districts'} with highest annual deforestation rates`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>{stateId === 'IN' ? 'State' : 'District'}</TableHead>
              <TableHead>Forest Cover</TableHead>
              <TableHead>Annual Change</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {districts.map((district, index) => (
              <TableRow key={district.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{district.name}</TableCell>
                <TableCell>{district.forestCover.toLocaleString()} sq km</TableCell>
                <TableCell>
                  {district.deforestationRate.toFixed(1)}% per year
                </TableCell>
                <TableCell>
                  <Badge 
                    style={{ 
                      backgroundColor: getConservationStatusColor(district.conservationStatus),
                      color: '#fff' 
                    }}
                  >
                    {getStatusText(district.conservationStatus)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DistrictComparison;
