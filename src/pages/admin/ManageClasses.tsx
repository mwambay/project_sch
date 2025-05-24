import { useState } from 'react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import { GraduationCap, Search } from 'lucide-react';

interface ClassData {
  id: number;
  nom: string;
  niveau: string;
  numero_ordre: number;
}

function ManageClasses() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const classes: ClassData[] = [
    { id: 1, nom: '6ème', niveau: 'Secondaire', numero_ordre: 1 },
    { id: 2, nom: '5ème', niveau: 'Secondaire', numero_ordre: 2 },
    { id: 3, nom: '4ème', niveau: 'Secondaire', numero_ordre: 3 },
    { id: 4, nom: '3ème', niveau: 'Secondaire', numero_ordre: 4 },
    { id: 5, nom: '2nde', niveau: 'Secondaire', numero_ordre: 5 },
    { id: 6, nom: '1ère', niveau: 'Secondaire', numero_ordre: 6 },
    { id: 7, nom: 'Terminale', niveau: 'Secondaire', numero_ordre: 7 }
  ];

  const columns = [
    { key: 'nom', header: 'Nom de la classe' },
    { key: 'niveau', header: 'Niveau' },
    { key: 'numero_ordre', header: 'Ordre' },
    {
      key: 'id',
      header: 'Action',
      render: (_: number, item: ClassData) => (
        <button
          onClick={() => setSelectedClass(item)}
          className="text-blue-600 hover:text-blue-900"
        >
          Modifier
        </button>
      )
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(selectedClass ? 'Classe modifiée' : 'Classe ajoutée');
    setShowAddForm(false);
    setSelectedClass(null);
  };

  const filteredClasses = classes.filter(cls =>
    cls.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.niveau.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des classes</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ajouter une classe
        </button>
      </div>

      <Card>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une classe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredClasses}
        />
      </Card>

      {(showAddForm || selectedClass) && (
        <Card title={selectedClass ? "Modifier la classe" : "Ajouter une classe"}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la classe
                </label>
                <input
                  type="text"
                  defaultValue={selectedClass?.nom}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau
                </label>
                <select
                  defaultValue={selectedClass?.niveau}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Primaire">Primaire</option>
                  <option value="Secondaire">Secondaire</option>
                  <option value="Secondaire - Base">Secondaire - Base</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro d'ordre
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue={selectedClass?.numero_ordre}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedClass(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {selectedClass ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

export default ManageClasses;