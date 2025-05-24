import { useState } from 'react';
import Card from '../../components/Card';
import { CheckCircle } from 'lucide-react';

interface Student {
  id: string;
  gender: string;
  average: number;
  status: string;
}

function RegisterResults() {
  const [school, setSchool] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  const [option, setOption] = useState('');
  const [year, setYear] = useState('2024');
  const [students, setStudents] = useState<Student[]>([
    { id: '1', gender: 'M', average: 78, status: 'Réussi' },
    { id: '2', gender: 'F', average: 82, status: 'Réussi' },
    { id: '3', gender: 'M', average: 45, status: 'Échec' },
  ]);
  const [newGender, setNewGender] = useState('M');
  const [newAverage, setNewAverage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schools = ['IT SALAMA', 'SAINT FRANCOIS XAVIER', 'EP KAMALONDO', 'IMARA', 'CFP LIKASI'];
  const classes = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
  const options = ['Math-Info', 'Biochimie', 'Littérature', 'Sciences Sociales', 'Art'];
  const years = ['2020', '2021', '2022', '2023', '2024'];

  const addStudent = () => {
    const validationErrors: Record<string, string> = {};
    
    if (!newAverage) {
      validationErrors.average = 'La moyenne est requise';
    } else {
      const averageNum = parseFloat(newAverage);
      if (isNaN(averageNum) || averageNum < 0 || averageNum > 100) {
        validationErrors.average = 'La moyenne doit être entre 0 et 100';
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const averageNum = parseFloat(newAverage);
    const newStudent: Student = {
      id: Date.now().toString(),
      gender: newGender,
      average: averageNum,
      status: averageNum >= 50 ? 'Réussi' : 'Échec',
    };

    setStudents([...students, newStudent]);
    setNewGender('M');
    setNewAverage('');
    setErrors({});
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: Record<string, string> = {};
    
    if (!school) validationErrors.school = 'L\'école est requise';
    if (!schoolClass) validationErrors.class = 'La classe est requise';
    if (!option) validationErrors.option = 'L\'option est requise';
    if (!year) validationErrors.year = 'L\'année est requise';
    
    if (students.length === 0) {
      validationErrors.students = 'Veuillez ajouter au moins un élève';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setErrors({});
    }, 1000);
  };

  const resetForm = () => {
    setSchool('');
    setSchoolClass('');
    setOption('');
    setYear('2024');
    setStudents([]);
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Enregistrer un palmarès</h1>
      
      {isSubmitted ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Enregistrement réussi</h2>
            <p className="text-gray-600 mb-6 text-center">
              Le palmarès pour {school}, classe {schoolClass}, option {option}, année {year} a été enregistré avec succès.
            </p>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enregistrer un nouveau palmarès
            </button>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  École <span className="text-red-500">*</span>
                </label>
                <select
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner une école</option>
                  {schools.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.school && <p className="mt-1 text-sm text-red-600">{errors.school}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classe <span className="text-red-500">*</span>
                </label>
                <select
                  value={schoolClass}
                  onChange={(e) => setSchoolClass(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner une classe</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option <span className="text-red-500">*</span>
                </label>
                <select
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner une option</option>
                  {options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.option && <p className="mt-1 text-sm text-red-600">{errors.option}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Année <span className="text-red-500">*</span>
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
              </div>
            </div>
          </Card>
          
          <Card title="Moyennes par élève" className="mb-6">
            <div className="mb-6">
              <div className="grid grid-cols-12 gap-4 mb-2">
                <div className="col-span-3 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                  </label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
                
                <div className="col-span-6 sm:col-span-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moyenne
                  </label>
                  <input
                    type="number"
                    value={newAverage}
                    onChange={(e) => setNewAverage(e.target.value)}
                    min="0"
                    max="100"
                    placeholder="Entrez une moyenne entre 0 et 100"
                    className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.average && <p className="mt-1 text-sm text-red-600">{errors.average}</p>}
                </div>
                
                <div className="col-span-3 sm:col-span-2 flex items-end">
                  <button
                    type="button"
                    onClick={addStudent}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
            
            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Genre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Moyenne
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.average}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.status === 'Réussi'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            type="button"
                            onClick={() => removeStudent(student.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500">
                Aucun élève ajouté. Veuillez ajouter des moyennes d'élèves.
                {errors.students && <p className="mt-1 text-sm text-red-600">{errors.students}</p>}
              </div>
            )}
          </Card>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enregistrer
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterResults;