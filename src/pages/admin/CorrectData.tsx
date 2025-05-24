import { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';

interface ResultData {
  id: string;
  school: string;
  class: string;
  option: string;
  year: string;
  gender: string;
  average: number;
  status: string;
}

function CorrectData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<ResultData | null>(null);
  const [editedAverage, setEditedAverage] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [comment, setComment] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Sample data
  const mockResults: ResultData[] = [
    { id: '1', school: 'École A', class: '3ème', option: 'Math-Info', year: '2024', gender: 'M', average: 78, status: 'Réussi' },
    { id: '2', school: 'École A', class: '3ème', option: 'Math-Info', year: '2024', gender: 'F', average: 82, status: 'Réussi' },
    { id: '3', school: 'École B', class: 'Terminale', option: 'Biochimie', year: '2024', gender: 'M', average: 45, status: 'Échec' },
    { id: '4', school: 'École C', class: '4ème', option: 'Littérature', year: '2023', gender: 'F', average: 92, status: 'Réussi' },
    { id: '5', school: 'École D', class: '1ère', option: 'Sciences Sociales', year: '2023', gender: 'M', average: 65, status: 'Réussi' },
  ];

  const filteredResults = mockResults.filter(
    result => 
      result.school.toLowerCase().includes(searchTerm.toLowerCase()) || 
      result.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'school', header: 'École' },
    { key: 'class', header: 'Classe' },
    { key: 'option', header: 'Option' },
    { key: 'year', header: 'Année' },
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
    {
      key: 'id',
      header: 'Action',
      render: (_: string, item: ResultData) => (
        <button
          onClick={() => handleEdit(item)}
          className="text-blue-600 hover:text-blue-900"
        >
          Modifier
        </button>
      )
    }
  ];

  const handleEdit = (result: ResultData) => {
    setSelectedResult(result);
    setEditedAverage(result.average.toString());
    setEditedGender(result.gender);
    setComment('');
  };

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const confirmSave = () => {
    // In a real app, this would update the database
    alert("Modifications enregistrées avec succès");
    setSelectedResult(null);
    setShowConfirmation(false);
  };

  const cancelEdit = () => {
    setSelectedResult(null);
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Corriger des données</h1>
      
      <Card>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par école ou classe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <DataTable
          columns={columns}
          data={filteredResults}
        />
      </Card>
      
      {selectedResult && (
        <Card title="Modifier les données">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">École</p>
              <p className="font-medium">{selectedResult.school}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Classe</p>
              <p className="font-medium">{selectedResult.class}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Option</p>
              <p className="font-medium">{selectedResult.option}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Année</p>
              <p className="font-medium">{selectedResult.year}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Modifier les champs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <select
                  value={editedGender}
                  onChange={(e) => setEditedGender(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moyenne
                </label>
                <input
                  type="number"
                  value={editedAverage}
                  onChange={(e) => setEditedAverage(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commentaire (justification de la modification)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Indiquez la raison de cette modification..."
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </Card>
      )}
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirmer la modification</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir modifier ces données ? Cette action sera enregistrée dans l'historique.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CorrectData;