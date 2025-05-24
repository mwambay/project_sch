import { useState } from 'react';
import Card from '../../components/Card';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import DataTable from '../../components/DataTable';

function ViewPerformance() {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [filterBy, setFilterBy] = useState('all');
  
  // Sample data
  const schools = ['Tous', 'École A', 'École B', 'École C', 'École D', 'École E'];
  const classes = ['Tous', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
  const years = ['2024', '2023', '2022', '2021', '2020'];
  
  // Sample student data
  const studentData = [
    { id: 1, gender: 'M', average: 86, status: 'Réussi', className: '3ème', school: 'École A' },
    { id: 2, gender: 'F', average: 92, status: 'Réussi', className: '3ème', school: 'École A' },
    { id: 3, gender: 'M', average: 64, status: 'Réussi', className: '3ème', school: 'École A' },
    { id: 4, gender: 'F', average: 78, status: 'Réussi', className: '3ème', school: 'École A' },
    { id: 5, gender: 'M', average: 45, status: 'Échec', className: '3ème', school: 'École A' },
    { id: 6, gender: 'F', average: 52, status: 'Réussi', className: '3ème', school: 'École A' },
    { id: 7, gender: 'M', average: 73, status: 'Réussi', className: '3ème', school: 'École A' },
    { id: 8, gender: 'F', average: 38, status: 'Échec', className: '3ème', school: 'École A' },
  ];

  // Filter data based on selection
  const filteredData = studentData.filter(student => {
    if (selectedSchool && selectedSchool !== 'Tous' && student.school !== selectedSchool) return false;
    if (selectedClass && selectedClass !== 'Tous' && student.className !== selectedClass) return false;
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

  // Data for gender comparison chart
  const maleStudents = filteredData.filter(student => student.gender === 'M');
  const femaleStudents = filteredData.filter(student => student.gender === 'F');
  
  const maleAvg = maleStudents.length > 0 ? 
    (maleStudents.reduce((sum, student) => sum + student.average, 0) / maleStudents.length) : 
    0;
  
  const femaleAvg = femaleStudents.length > 0 ? 
    (femaleStudents.reduce((sum, student) => sum + student.average, 0) / femaleStudents.length) : 
    0;

  const genderData = {
    labels: ['Moyenne par genre'],
    datasets: [
      {
        label: 'Garçons',
        data: [maleAvg],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Filles',
        data: [femaleAvg],
        backgroundColor: 'rgba(236, 72, 153, 0.6)',
      }
    ],
  };

  // Data for performance trend
  const trendData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Moyenne',
        data: [68, 70, 71, 69, 73],
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Taux de réussite (%)',
        data: [75, 78, 80, 77, 82],
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      }
    ],
  };

  // Table columns
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'gender', header: 'Genre' },
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Visualiser les performances</h1>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              École
            </label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les écoles</option>
              {schools.filter(s => s !== 'Tous').map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>
          
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
        <Card title="Comparaison par genre">
          <BarChart 
            title="Moyenne par genre" 
            labels={genderData.labels} 
            datasets={genderData.datasets}
          />
        </Card>
        
        <Card title="Tendance de performance">
          <LineChart 
            title="Évolution sur 5 ans" 
            labels={trendData.labels} 
            datasets={trendData.datasets}
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

export default ViewPerformance;