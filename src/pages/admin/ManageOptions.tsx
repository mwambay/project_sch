import { useState } from 'react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import { BookOpen, Search } from 'lucide-react';

interface OptionData {
  id: number;
  nom: string;
}

function ManageOptions() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const options: OptionData[] = [
    { id: 1, nom: 'Math-Info' },
    { id: 2, nom: 'Biochimie' },
    { id: 3, nom: 'Littérature' },
    { id: 4, nom: 'Sciences Sociales' },
    { id: 5, nom: 'Art' }
  ];

  const columns = [
    { key: 'nom', header: 'Nom de l\'option' },
    {
      key: 'id',
      header: 'Action',
      render: (_: number, item: OptionData) => (
        <button
          onClick={() => setSelectedOption(item)}
          className="text-blue-600 hover:text-blue-900"
        >
          Modifier
        </button>
      )
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(selectedOption ? 'Option modifiée' : 'Option ajoutée');
    setShowAddForm(false);
    setSelectedOption(null);
  };

  const filteredOptions = options.filter(option =>
    option.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des options</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ajouter une option
        </button>
      </div>

      <Card>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une option..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredOptions}
        />
      </Card>

      {(showAddForm || selectedOption) && (
        <Card title={selectedOption ? "Modifier l'option" : "Ajouter une option"}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'option
              </label>
              <input
                type="text"
                defaultValue={selectedOption?.nom}
                required
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedOption(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {selectedOption ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

export default ManageOptions;