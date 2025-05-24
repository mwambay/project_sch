import { useState } from 'react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import { MapPin, Search } from 'lucide-react';

interface SchoolData {
  id: string;
  name: string;
  location: string;
  average: number;
  successRate: number;
  mainOption: string;
  otherOptions: string[];
  rank: number;
}

function SearchByOption() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchResults, setSearchResults] = useState<SchoolData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Sample data
  const options = ['Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'];
  const locations = ['Toutes les villes', 'Ville A', 'Ville B', 'Ville C', 'Ville D', 'Ville E'];
  
  // Sample school data
  const schools: SchoolData[] = [
    { 
      id: '1', 
      name: 'École C', 
      location: 'Ville A', 
      average: 92, 
      successRate: 96, 
      mainOption: 'Math-Info',
      otherOptions: ['Biochimie', 'Sciences Sociales'],
      rank: 1 
    },
    { 
      id: '2', 
      name: 'École A', 
      location: 'Ville B', 
      average: 86, 
      successRate: 90, 
      mainOption: 'Biochimie',
      otherOptions: ['Math-Info', 'Littérature'],
      rank: 2 
    },
    { 
      id: '3', 
      name: 'École E', 
      location: 'Ville A', 
      average: 84, 
      successRate: 88, 
      mainOption: 'Math-Info',
      otherOptions: ['Sciences Sociales', 'Art'],
      rank: 3 
    },
    { 
      id: '4', 
      name: 'École G', 
      location: 'Ville C', 
      average: 83, 
      successRate: 87, 
      mainOption: 'Art',
      otherOptions: ['Littérature'],
      rank: 4 
    },
    { 
      id: '5', 
      name: 'École D', 
      location: 'Ville B', 
      average: 82, 
      successRate: 86, 
      mainOption: 'Littérature',
      otherOptions: ['Art', 'Sciences Sociales'],
      rank: 5 
    },
  ];

  const handleSearch = () => {
    if (!selectedOption) return;
    
    // Filter schools based on selected options
    let results = schools.filter(school => 
      school.mainOption === selectedOption || school.otherOptions.includes(selectedOption)
    );
    
    // Further filter by location if selected
    if (selectedLocation && selectedLocation !== 'Toutes les villes') {
      results = results.filter(school => school.location === selectedLocation);
    }
    
    // Sort by rank
    results.sort((a, b) => a.rank - b.rank);
    
    setSearchResults(results);
    setHasSearched(true);
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
    { key: 'average', header: 'Moyenne' },
    { key: 'successRate', header: 'Taux de réussite (%)' },
    { 
      key: 'mainOption', 
      header: 'Option principale',
      render: (value: string, item: SchoolData) => (
        <div>
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              value === selectedOption ? 'bg-blue-100 text-blue-800 border border-blue-300' : 
              value === 'Math-Info' ? 'bg-blue-100 text-blue-800' : 
              value === 'Biochimie' ? 'bg-green-100 text-green-800' :
              value === 'Littérature' ? 'bg-purple-100 text-purple-800' :
              value === 'Sciences Sociales' ? 'bg-yellow-100 text-yellow-800' :
              'bg-pink-100 text-pink-800'
            }`}
          >
            {value}
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            {item.otherOptions.map(option => (
              <span
                key={option}
                className={`px-2 py-0.5 text-xs leading-4 rounded-full ${
                  option === selectedOption ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                  'bg-gray-100 text-gray-600'
                }`}
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Rechercher une école par option</h1>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filière / Option
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionnez une option</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localisation
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-1 flex items-end">
            <button
              onClick={handleSearch}
              disabled={!selectedOption}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={18} className="inline mr-2" />
              Rechercher
            </button>
          </div>
        </div>
      </Card>
      
      {hasSearched && (
        <Card title="Résultats de recherche">
          {searchResults.length > 0 ? (
            <>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  {searchResults.length} école(s) trouvée(s) avec l'option {selectedOption}
                  {selectedLocation && selectedLocation !== 'Toutes les villes' ? ` à ${selectedLocation}` : ''}
                </p>
              </div>
              
              <DataTable
                columns={columns}
                data={searchResults}
                pagination={false}
              />
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Aucune école ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
              </p>
            </div>
          )}
        </Card>
      )}
      
      <Card title="Informations sur les options">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Math-Info</h3>
            <p className="text-blue-700 mb-2">
              Option axée sur les mathématiques, l'informatique et les sciences exactes.
            </p>
            <p className="text-sm text-blue-600">
              Débouchés : ingénierie, programmation, finance, recherche scientifique.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Biochimie</h3>
            <p className="text-green-700 mb-2">
              Option centrée sur la biologie, la chimie et les sciences de la vie.
            </p>
            <p className="text-sm text-green-600">
              Débouchés : médecine, pharmacie, agronomie, recherche biologique.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-2">Littérature</h3>
            <p className="text-purple-700 mb-2">
              Option focalisée sur les langues, la littérature et la philosophie.
            </p>
            <p className="text-sm text-purple-600">
              Débouchés : journalisme, édition, enseignement, communication.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Sciences Sociales</h3>
            <p className="text-yellow-700 mb-2">
              Option orientée vers l'histoire, la géographie, l'économie et la sociologie.
            </p>
            <p className="text-sm text-yellow-600">
              Débouchés : droit, économie, sciences politiques, travail social.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SearchByOption;