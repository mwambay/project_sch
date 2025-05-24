import { useState } from 'react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import { School, Search } from 'lucide-react';

interface SchoolData {
  id: number;
  nom: string;
  code_ecole: string;
  province: string;
  ville: string;
  commune: string;
  statut: string;
  type_ecole: string;
}

function ManageSchools() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const schools: SchoolData[] = [
    {
      id: 1,
      nom: 'IT SALAMA',
      code_ecole: 'ITS001',
      province: 'Haut-Katanga',
      ville: 'Lubumbashi',
      commune: 'Lubumbashi',
      statut: 'privée',
      type_ecole: 'technique'
    },
    {
      id: 2,
      nom: 'SAINT FRANCOIS XAVIER',
      code_ecole: 'SFX001',
      province: 'Haut-Katanga',
      ville: 'Lubumbashi',
      commune: 'Kampemba',
      statut: 'privée',
      type_ecole: 'général'
    }
  ];

  const columns = [
    { key: 'nom', header: 'Nom' },
    { key: 'code_ecole', header: 'Code' },
    { key: 'province', header: 'Province' },
    { key: 'ville', header: 'Ville' },
    { key: 'commune', header: 'Commune' },
    { 
      key: 'statut', 
      header: 'Statut',
      render: (value: string) => (
        <span className="capitalize">{value}</span>
      )
    },
    { 
      key: 'type_ecole', 
      header: 'Type',
      render: (value: string) => (
        <span className="capitalize">{value}</span>
      )
    },
    {
      key: 'id',
      header: 'Action',
      render: (_: number, item: SchoolData) => (
        <button
          onClick={() => setSelectedSchool(item)}
          className="text-blue-600 hover:text-blue-900"
        >
          Modifier
        </button>
      )
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(selectedSchool ? 'École modifiée' : 'École ajoutée');
    setShowAddForm(false);
    setSelectedSchool(null);
  };

  const filteredSchools = schools.filter(school =>
    school.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.code_ecole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des écoles</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ajouter une école
        </button>
      </div>

      <Card>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par nom ou code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredSchools}
        />
      </Card>

      {(showAddForm || selectedSchool) && (
        <Card title={selectedSchool ? "Modifier l'école" : "Ajouter une école"}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'école
                </label>
                <input
                  type="text"
                  defaultValue={selectedSchool?.nom}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code de l'école
                </label>
                <input
                  type="text"
                  defaultValue={selectedSchool?.code_ecole}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  defaultValue={selectedSchool?.province}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  defaultValue={selectedSchool?.ville}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commune
                </label>
                <input
                  type="text"
                  defaultValue={selectedSchool?.commune}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  defaultValue={selectedSchool?.statut}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="publique">Publique</option>
                  <option value="privée">Privée</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'école
                </label>
                <select
                  defaultValue={selectedSchool?.type_ecole}
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="général">Général</option>
                  <option value="technique">Technique</option>
                  <option value="professionnel">Professionnel</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedSchool(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {selectedSchool ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

export default ManageSchools;