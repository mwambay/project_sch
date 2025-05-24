import { useState } from 'react';
import Card from '../../components/Card';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';

function DirectorCompare() {
  const [selectedSchools, setSelectedSchools] = useState<string[]>(['École B', 'École C']);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  
  // Sample school name
  const schoolName = "École A";
  
  // Sample data
  const schools = ['École B', 'École C', 'École D', 'École E'];
  const classes = ['Tous', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
  const options = ['Tous', 'Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'];
  
  // Sample comparison data
  const comparisonData = {
    labels: [schoolName, ...selectedSchools],
    datasets: [
      {
        label: 'Moyenne générale',
        data: [76, 68, 82],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Taux de réussite (%)',
        data: [85, 72, 90],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
      }
    ],
  };

  // Sample trend data
  const trendData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: schoolName,
        data: [70, 72, 71, 74, 76],
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'École B',
        data: [62, 64, 65, 67, 68],
        borderColor: 'rgba(239, 68, 68, 0.8)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
      },
      {
        label: 'École C',
        data: [70, 75, 78, 80, 82],
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      }
    ],
  };

  const handleSchoolToggle = (school: string) => {
    if (selectedSchools.includes(school)) {
      setSelectedSchools(selectedSchools.filter(s => s !== school));
    } else if (selectedSchools.length < 2) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Comparer avec d'autres écoles</h1>
      
      <Card>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sélectionner des écoles à comparer avec {schoolName} (max 2)
          </label>
          <div className="flex flex-wrap gap-2">
            {schools.map((school) => (
              <button
                key={school}
                onClick={() => handleSchoolToggle(school)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedSchools.includes(school)
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                {school}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Classe
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les classes</option>
              {classes.filter(c => c !== 'Tous').map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les options</option>
              {options.filter(o => o !== 'Tous').map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Comparaison des performances">
          <BarChart 
            title="Moyenne et Taux de réussite" 
            labels={comparisonData.labels} 
            datasets={comparisonData.datasets}
          />
        </Card>
        
        <Card title="Évolution des performances">
          <LineChart 
            title="Tendance sur 5 ans" 
            labels={trendData.labels} 
            datasets={trendData.datasets}
          />
        </Card>
      </div>
      
      <Card title="Position relative de votre école">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{schoolName}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyenne des écoles comparées</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Écart</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Moyenne générale</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">76</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+1.0</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Taux de réussite</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">81%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+4.0%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Meilleure note</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">95</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">93</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+2.0</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Classement général</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default DirectorCompare;