import { useState } from 'react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import { MapPin, School, Filter } from 'lucide-react';

interface SchoolData {
  id: string;
  name: string;
  location: string;
  average: number;
  successRate: number;
  mainOption: string;
  rank: number;
}

function SchoolRankings() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  
  // Sample data
  const cities = ['Toutes', 'Kolwezi', 'Lubumbashi', 'Likasi', 'Fungurume', 'Kambove'];
  const options = ['Toutes', 'Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'];
  
  // Sample school data
  const schools: SchoolData[] = [
    { id: '1', name: 'IT Salama', location: 'Lubumbashi', average: 92, successRate: 96, mainOption: 'Electronique', rank: 1 },
    { id: '2', name: 'Saint Francois Xavier', location: 'Likasi', average: 86, successRate: 90, mainOption: 'Biochimie', rank: 2 },
    { id: '3', name: 'École E', location: 'Ville A', average: 84, successRate: 88, mainOption: 'Math-Info', rank: 3 },
    { id: '4', name: 'École G', location: 'Ville C', average: 83, successRate: 87, mainOption: 'Art', rank: 4 },
    { id: '5', name: 'École D', location: 'Ville B', average: 82, successRate: 86, mainOption: 'Littérature', rank: 5 },
    { id: '6', name: 'École B', location: 'Ville D', average: 80, successRate: 85, mainOption: 'Sciences Sociales', rank: 6 },
    { id: '7', name: 'École F', location: 'Ville E', average: 78, successRate: 82, mainOption: 'Biochimie', rank: 7 },
    { id: '8', name: 'École H', location: 'Ville A', average: 76, successRate: 80, mainOption: 'Math-Info', rank: 8 },
    { id: '9', name: 'École I', location: 'Ville C', average: 74, successRate: 78, mainOption: 'Art', rank: 9 },
    { id: '10', name: 'École J', location: 'Ville B', average: 72, successRate: 76, mainOption: 'Littérature', rank: 10 },
  ];

  // Filter data based on selection
  const filteredSchools = schools.filter(school => {
    if (selectedCity && selectedCity !== 'Toutes' && school.location !== selectedCity) return false;
    if (selectedOption && selectedOption !== 'Toutes' && school.mainOption !== selectedOption) return false;
    return true;
  });

  // Sort data based on selection
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (sortBy === 'average') return b.average - a.average;
    if (sortBy === 'successRate') return b.successRate - a.successRate;
    return 0;
  });

  // Table columns
  const columns = [
    { 
      key: 'rank', 
      header: 'Rang',
      render: (value: number) => (
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            value <= 3 ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      )
    },
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
      <h1 className="text-2xl font-bold text-gray-800">Classement des écoles</h1>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les villes</option>
              {cities.filter(c => c !== 'Toutes').map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option et classe
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les classes</option>
              {options.filter(o => o !== 'Toutes').map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trier par
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rank">Classement</option>
              <option value="average">Moyenne</option>
              <option value="successRate">Taux de réussite</option>
            </select>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center space-x-3">
          <Filter size={20} className="text-blue-500" />
          <div>
            <h3 className="font-medium">Résultats filtrés</h3>
            <p className="text-sm text-gray-600">
              Affichage de {sortedSchools.length} écoles
              {selectedCity && selectedCity !== 'Toutes' ? ` à ${selectedCity}` : ''}
              {selectedOption && selectedOption !== 'Toutes' ? ` avec l'option ${selectedOption}` : ''}
              {sortBy === 'rank' ? ' triées par classement' : 
               sortBy === 'average' ? ' triées par moyenne' : 
               ' triées par taux de réussite'}
            </p>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={sortedSchools}
        />
      </Card>
      
      <Card title="Comment est calculé le classement ?">
        <div className="space-y-4 text-gray-600">
          <p>
            Le classement des écoles est basé sur plusieurs facteurs, principalement :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>La moyenne générale des élèves (50% du score)</li>
            <li>Le taux de réussite aux examens (30% du score)</li>
            <li>La progression par rapport aux années précédentes (10% du score)</li>
            <li>La diversité des options proposées (10% du score)</li>
          </ul>
          <p>
            Ce classement est mis à jour chaque année après la publication des résultats d'examens officiels.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default SchoolRankings;