import { useState } from 'react';
import Card from '../../components/Card';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';

function SuccessTrends() {
  const [selectedSchool, setSelectedSchool] = useState('École A');
  const [selectedYears, setSelectedYears] = useState<string[]>(['3', '5']);
  
  // Sample data
  const schools = ['École A', 'École B', 'École C', 'École D', 'École E'];
  
  // Sample trend data for 3 years
  const trend3Years = {
    labels: ['2022', '2023', '2024'],
    datasets: [
      {
        label: 'Taux de réussite (%)',
        data: [78, 82, 85],
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Moyenne générale',
        data: [72, 74, 76],
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      },
    ],
  };

  // Sample trend data for 5 years
  const trend5Years = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Taux de réussite (%)',
        data: [75, 76, 78, 82, 85],
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Moyenne générale',
        data: [68, 70, 72, 74, 76],
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      },
    ],
  };

  // Sample data for option trends
  const optionTrends = {
    labels: ['Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'],
    datasets: [
      {
        label: '2020',
        data: [72, 68, 65, 70, 78],
        backgroundColor: 'rgba(209, 213, 219, 0.6)',
      },
      {
        label: '2024',
        data: [85, 78, 74, 76, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const handleYearToggle = (year: string) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter(y => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tendances de réussite</h1>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              École
            </label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Période
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => handleYearToggle('3')}
                className={`flex-1 px-4 py-2 rounded-md text-sm ${
                  selectedYears.includes('3')
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                3 dernières années
              </button>
              <button
                onClick={() => handleYearToggle('5')}
                className={`flex-1 px-4 py-2 rounded-md text-sm ${
                  selectedYears.includes('5')
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                5 dernières années
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      {selectedYears.includes('3') && (
        <Card title={`${selectedSchool} - Tendance sur 3 ans`}>
          <LineChart 
            title="Évolution sur 3 ans" 
            labels={trend3Years.labels} 
            datasets={trend3Years.datasets}
          />
        </Card>
      )}
      
      {selectedYears.includes('5') && (
        <Card title={`${selectedSchool} - Tendance sur 5 ans`}>
          <LineChart 
            title="Évolution sur 5 ans" 
            labels={trend5Years.labels} 
            datasets={trend5Years.datasets}
          />
        </Card>
      )}
      
      <Card title="Évolution par option">
        <p className="text-gray-600 mb-4">
          Comparaison des performances par option entre 2020 et 2024 pour {selectedSchool}.
        </p>
        <BarChart 
          title="Comparaison 2020 vs 2024" 
          labels={optionTrends.labels} 
          datasets={optionTrends.datasets}
        />
      </Card>
      
      <Card title="Analyse des tendances">
        <div className="space-y-4 text-gray-600">
          <p>
            L'analyse des tendances de réussite pour {selectedSchool} montre une amélioration constante des performances au cours des dernières années.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Points forts</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Augmentation régulière du taux de réussite (+10% sur 5 ans)</li>
              <li>Progression notable en Math-Info et Art</li>
              <li>Stabilité des résultats malgré les changements de programmes</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="font-medium text-amber-800 mb-2">Points d'amélioration</h3>
            <ul className="list-disc pl-5 space-y-1 text-amber-700">
              <li>Progression plus lente en Littérature</li>
              <li>Légère stagnation entre 2021 et 2022</li>
              <li>Écarts importants entre les différentes options</li>
            </ul>
          </div>
          
          <p className="italic">
            Ces tendances peuvent vous aider à identifier les options où l'école excelle particulièrement et à évaluer la constance des résultats dans le temps.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default SuccessTrends;