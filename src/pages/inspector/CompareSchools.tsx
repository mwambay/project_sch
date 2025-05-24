import { useState } from 'react';
import Card from '../../components/Card';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import DataTable from '../../components/DataTable';

function CompareSchools() {
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  
  // Sample data
  const schools = ['École A', 'École B', 'École C', 'École D', 'École E'];
  const classes = ['Tous', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
  const options = ['Tous', 'Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'];
  const years = ['2024', '2023', '2022', '2021', '2020'];
  
  // Sample comparison data
  const comparisonData = {
    labels: selectedSchools.length > 0 ? selectedSchools : ['École A', 'École B', 'École C'],
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
        label: 'École A',
        data: [65, 68, 72, 74, 76],
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

  // Sample detailed comparison data
  const comparisonDetails = [
    { 
      school: 'École A', 
      avgScore: 76, 
      successRate: 85, 
      topStudent: 95, 
      genderBalance: '55% M / 45% F',
      ranking: 2
    },
    { 
      school: 'École B', 
      avgScore: 68, 
      successRate: 72, 
      topStudent: 88, 
      genderBalance: '48% M / 52% F',
      ranking: 3
    },
    { 
      school: 'École C', 
      avgScore: 82, 
      successRate: 90, 
      topStudent: 98, 
      genderBalance: '50% M / 50% F',
      ranking: 1
    },
  ];

  // Table columns
  const columns = [
    { key: 'school', header: 'École' },
    { key: 'avgScore', header: 'Moyenne' },
    { key: 'successRate', header: 'Taux de réussite (%)' },
    { key: 'topStudent', header: 'Meilleure note' },
    { key: 'genderBalance', header: 'Répartition genre' },
    { 
      key: 'ranking', 
      header: 'Classement',
      render: (value: number) => (
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === 1 ? 'bg-green-100 text-green-800' : 
            value === 2 ? 'bg-blue-100 text-blue-800' : 
            'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      )
    },
  ];

  const handleSchoolToggle = (school: string) => {
    if (selectedSchools.includes(school)) {
      setSelectedSchools(selectedSchools.filter(s => s !== school));
    } else if (selectedSchools.length < 3) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  const exportData = (format: string) => {
    alert(`Données exportées au format ${format}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Comparer les écoles</h1>
      
      <Card>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sélectionner des écoles à comparer (max 3)
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Année
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
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
      
      <Card title="Comparaison détaillée">
        <DataTable
          columns={columns}
          data={comparisonDetails}
          pagination={false}
        />
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => exportData('CSV')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Exporter en CSV
          </button>
          <button
            onClick={() => exportData('PDF')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Exporter en PDF
          </button>
        </div>
      </Card>
    </div>
  );
}

export default CompareSchools;