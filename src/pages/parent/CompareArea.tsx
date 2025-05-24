import { useState } from 'react';
import Card from '../../components/Card';
import BarChart from '../../components/BarChart';
import DataTable from '../../components/DataTable';
import { MapPin } from 'lucide-react';

interface SchoolData {
  id: string;
  name: string;
  location: string;
  distance: number;
  average: number;
  successRate: number;
  mainOption: string;
  rank: number;
}

// Sample data structure for cities and communes
const cityCommunes: Record<string, string[]> = {
  'Lubumbashi': ['Lubumbashi', 'Kampemba', 'Kenya', 'Kamalondo', 'Rwashi', 'Annexe'],
  'Likasi': ['Likasi', 'Kikula', 'Shituru', 'Panda'],
  'Kolwezi': ['Dilala', 'Manika', 'Kanina'],
  'Fungurume': ['Fungurume Centre'],
  'Kambove': ['Kambove Centre']
};

function CompareArea() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [radius, setRadius] = useState('10');
  
  // Sample data
  const cities = Object.keys(cityCommunes);
  
  // Get communes for selected city
  const communes = selectedCity ? cityCommunes[selectedCity] : [];
  
  // Sample school data based on zone and radius
  const schools: SchoolData[] = [
    { 
      id: '1', 
      name: 'IT SALAMA', 
      location: 'Lubumbashi', 
      distance: 0, 
      average: 92, 
      successRate: 96, 
      mainOption: 'Math-Info', 
      rank: 1 
    },
    { 
      id: '2', 
      name: 'SAINT FRANCOIS XAVIER', 
      location: 'Lubumbashi', 
      distance: 2.5, 
      average: 84, 
      successRate: 88, 
      mainOption: 'Math-Info', 
      rank: 3 
    },
    { 
      id: '3', 
      name: 'EP KAMALONDO', 
      location: 'Kamalondo', 
      distance: 4.8, 
      average: 76, 
      successRate: 80, 
      mainOption: 'Math-Info', 
      rank: 8 
    },
    { 
      id: '4', 
      name: 'IMARA', 
      location: 'Kampemba', 
      distance: 6.2, 
      average: 70, 
      successRate: 75, 
      mainOption: 'Sciences Sociales', 
      rank: 11 
    },
    { 
      id: '5', 
      name: 'CFP LIKASI', 
      location: 'Likasi', 
      distance: 8.5, 
      average: 65, 
      successRate: 70, 
      mainOption: 'Littérature', 
      rank: 15 
    },
  ];

  // Filter schools based on radius and location
  const filteredSchools = schools.filter(school => {
    const matchesLocation = !selectedCity || school.location === selectedCity;
    const matchesCommune = !selectedCommune || school.location === selectedCommune;
    const withinRadius = school.distance <= parseInt(radius);
    return matchesLocation && matchesCommune && withinRadius;
  });

  // Chart data
  const chartData = {
    labels: filteredSchools.map(school => school.name),
    datasets: [
      {
        label: 'Moyenne générale',
        data: filteredSchools.map(school => school.average),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Taux de réussite (%)',
        data: filteredSchools.map(school => school.successRate),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
      }
    ],
  };

  // Handle city change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedCommune(''); // Reset commune when city changes
  };

  // Table columns
  const columns = [
    { key: 'name', header: 'École' },
    { 
      key: 'location', 
      header: 'Localisation',
      render: (value: string) => (
        <span className="flex items-center">
          <MapPin size={16} className="mr-1 text-gray-400" />
          {value}
        </span>
      )
    },
    { 
      key: 'distance', 
      header: 'Distance (km)',
      render: (value: number) => (
        <span>{value.toFixed(1)} km</span>
      )
    },
    { key: 'average', header: 'Moyenne' },
    { key: 'successRate', header: 'Taux de réussite (%)' },
    { 
      key: 'mainOption', 
      header: 'Option principale',
      render: (value: string) => (
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === 'Math-Info' ? 'bg-blue-100 text-blue-800' : 
            value === 'Biochimie' ? 'bg-green-100 text-green-800' :
            value === 'Littérature' ? 'bg-purple-100 text-purple-800' :
            value === 'Sciences Sociales' ? 'bg-yellow-100 text-yellow-800' :
            'bg-pink-100 text-pink-800'
          }`}
        >
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Comparer les écoles d'une zone</h1>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionner une ville</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commune
            </label>
            <select
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              disabled={!selectedCity}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Toutes les communes</option>
              {communes.map((commune) => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rayon de recherche (km)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="20"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="w-12 text-center font-medium">{radius} km</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Rest of the component remains the same */}
      <Card title={`Écoles dans un rayon de ${radius} km${selectedCity ? ` autour de ${selectedCity}` : ''}${selectedCommune ? ` - ${selectedCommune}` : ''}`}>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">
            {filteredSchools.length} écoles trouvées dans votre zone de recherche.
          </p>
        </div>
        
        <BarChart 
          title="Comparaison des performances" 
          labels={chartData.labels} 
          datasets={chartData.datasets}
        />
      </Card>
      
      <Card title="Détails des écoles">
        <DataTable
          columns={columns}
          data={filteredSchools}
          pagination={false}
        />
      </Card>
      
      <Card title="Conseils pour le choix d'une école">
        <div className="space-y-4 text-gray-600">
          <p>
            Lors de la comparaison des écoles dans votre zone, tenez compte des facteurs suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>La distance et l'accessibilité depuis votre domicile</li>
            <li>Les options proposées qui correspondent aux intérêts de votre enfant</li>
            <li>Les performances académiques (moyenne, taux de réussite)</li>
            <li>Les infrastructures et ressources disponibles</li>
            <li>L'environnement social et le cadre d'apprentissage</li>
          </ul>
          <p className="italic">
            N'hésitez pas à visiter les écoles qui vous intéressent pour vous faire une meilleure idée de l'ambiance et rencontrer l'équipe pédagogique.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default CompareArea;
