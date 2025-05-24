import { useState } from 'react';
import Card from '../../components/Card';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import DataTable from '../../components/DataTable';

function DirectorStats() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  
  // Sample school name
  const schoolName = "École A";
  
  // Sample data
  const classes = ['Tous', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
  const options = ['Tous', 'Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'];
  
  // Sample student data
  const studentData = [
    { id: 1, gender: 'M', average: 86, status: 'Réussi', className: '3ème', option: 'Math-Info' },
    { id: 2, gender: 'F', average: 92, status: 'Réussi', className: '3ème', option: 'Math-Info' },
    { id: 3, gender: 'M', average: 64, status: 'Réussi', className: '3ème', option: 'Littérature' },
    { id: 4, gender: 'F', average: 78, status: 'Réussi', className: '3ème', option: 'Biochimie' },
    { id: 5, gender: 'M', average: 45, status: 'Échec', className: '3ème', option: 'Math-Info' },
    { id: 6, gender: 'F', average: 52, status: 'Réussi', className: '3ème', option: 'Sciences Sociales' },
    { id: 7, gender: 'M', average: 73, status: 'Réussi', className: '3ème', option: 'Biochimie' },
    { id: 8, gender: 'F', average: 38, status: 'Échec', className: '3ème', option: 'Art' },
  ];

  // Filter data based on selection
  const filteredData = studentData.filter(student => {
    if (selectedClass && selectedClass !== 'Tous' && student.className !== selectedClass) return false;
    if (selectedOption && selectedOption !== 'Tous' && student.option !== selectedOption) return false;
    if (filterBy === 'male' && student.gender !== 'M') return false;
    if (filterBy === 'female' && student.gender !== 'F') return false;
    return true;
  });

  // Calculate statistics
  const avgScore = filteredData.length > 0 ? 
    (filteredData.reduce((sum, student) => sum + student.average, 0) / filteredData.length).toFixed(1) : 
    '0';
  
  const successRate = filteredData.length > 0 ? 
    ((filteredData.filter(student => student.status === 'Réussi').length / filteredData.length) * 100).toFixed(1) : 
    '0';

  // Data for option comparison chart
  const optionPerformance = {
    labels: ['Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'],
    datasets: [
      {
        label: 'Moyenne par option',
        data: [76, 72, 68, 70, 85],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  // Data for gender comparison chart
  const genderData = {
    labels: ['Moyenne par genre'],
    datasets: [
      {
        label: 'Garçons',
        data: [72],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Filles',
        data: [78],
        backgroundColor: 'rgba(236, 72, 153, 0.6)',
      }
    ],
  };

  // Table columns
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'gender', header: 'Genre' },
    { key: 'className', header: 'Classe' },
    { key: 'option', header: 'Option' },
    { key: 'average', header: 'Moyenne' },
    { 
      key: 'status', 
      header: 'Statut',
      render: (value: string) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === 'Réussi' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      )
    },
  ];

  const exportData = () => {
    alert("Données exportées avec succès");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Statistiques - {schoolName}</h1>
        <button
          onClick={exportData}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2 md:mt-0"
        >
          Exporter les données
        </button>
      </div>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              Filtrer par
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les élèves</option>
              <option value="male">Garçons uniquement</option>
              <option value="female">Filles uniquement</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Moyenne générale</h3>
            <p className="text-3xl font-bold text-blue-600">{avgScore}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Taux de réussite</h3>
            <p className="text-3xl font-bold text-green-600">{successRate}%</p>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Performance par option">
          <BarChart 
            title="Moyenne par option" 
            labels={optionPerformance.labels} 
            datasets={optionPerformance.datasets}
          />
        </Card>
        
        <Card title="Comparaison par genre">
          <BarChart 
            title="Moyenne par genre" 
            labels={genderData.labels} 
            datasets={genderData.datasets}
          />
        </Card>
      </div>
      
      <Card title="Données des élèves">
        <DataTable
          columns={columns}
          data={filteredData}
        />
      </Card>
    </div>
  );
}

export default DirectorStats;