import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import { ResultatService, ResultatData } from '../../api/Resultat.service';
import { SchoolService, SchoolData } from '../../api/School.service';
import { ClasseService, ClasseData } from '../../api/Classe.service';
import { OptionService, OptionData } from '../../api/Option.service';
import { AnneeService, AnneeData } from '../../api/Annee.service';

function CorrectData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<ResultatData | null>(null);
  const [editedAverage, setEditedAverage] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [comment, setComment] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [results, setResults] = useState<ResultatData[]>([]);
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [classes, setClasses] = useState<ClasseData[]>([]);
  const [options, setOptions] = useState<OptionData[]>([]);
  const [annees, setAnnees] = useState<AnneeData[]>([]);

  useEffect(() => {
    // Charger toutes les données nécessaires
    ResultatService.getAllResultats().then(setResults);
    SchoolService.getAllSchools().then(setSchools);
    ClasseService.getAllClasses().then(setClasses);
    OptionService.getAllOptions().then(setOptions);
    AnneeService.getAllAnnees().then(setAnnees);
  }, []);

  // Helpers pour afficher les labels au lieu des IDs
  const getSchoolName = (id: number) => schools.find(e => e.id === id)?.nom || '';
  const getClassName = (id: number) => classes.find(c => c.id === id)?.nom || '';
  const getOptionName = (id: number) => options.find(o => o.id === id)?.nom || '';
  const getAnneeLabel = (id: number) => annees.find(a => a.id === id)?.libelle || '';

  const filteredResults = results.filter(
    result =>
      getSchoolName(typeof result.ecole === 'object' ? (result.ecole as any).id : Number(result.ecole)).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClassName(typeof result.classe === 'object' ? (result.classe as any).id : Number(result.classe)).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'school', header: 'École', render: (_: any, item: ResultatData) => getSchoolName(typeof item.ecole === 'object' ? (item.ecole as any).id : Number(item.ecole)) },
    { key: 'class', header: 'Classe', render: (_: any, item: ResultatData) => getClassName(typeof item.classe === 'object' ? (item.classe as any).id : Number(item.classe)) },
    { key: 'option', header: 'Option', render: (_: any, item: ResultatData) => getOptionName(typeof item.option === 'object' ? (item.option as any).id : Number(item.option)) },
    { key: 'year', header: 'Année', render: (_: any, item: ResultatData) => getAnneeLabel(typeof item.annee === 'object' ? (item.annee as any).id : Number(item.annee)) },
    { key: 'genre', header: 'Genre', render: (v: string, item: ResultatData) => item.genre },
    { key: 'moyenne', header: 'Moyenne', render: (v: number, item: ResultatData) => item.moyenne },
    {
      key: 'mention',
      header: 'Statut',
      render: (value: string, item: ResultatData) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.mention === 'Réussi' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {item.mention}
        </span>
      )
    },
    {
      key: 'id',
      header: 'Action',
      render: (_: string, item: ResultatData) => (
        <button
          onClick={() => handleEdit(item)}
          className="text-blue-600 hover:text-blue-900"
        >
          Modifier
        </button>
      )
    }
  ];

  const handleEdit = (result: ResultatData) => {
    setSelectedResult(result);
    setEditedAverage(result.moyenne.toString());
    setEditedGender(result.genre);
    setComment('');
  };

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    if (!selectedResult) return;
    try {
      await ResultatService.updateResultat(selectedResult.id, {
        moyenne: Number(editedAverage),
        genre: editedGender,
        mention: Number(editedAverage) >= 50 ? 'Réussi' : 'Échec'
        // Vous pouvez aussi envoyer le commentaire si le backend le gère
      });
      // Rafraîchir la liste
      const updated = await ResultatService.getAllResultats();
      setResults(updated);
      alert("Modifications enregistrées avec succès");
    } catch (e) {
      alert("Erreur lors de la modification");
    }
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
              <p className="font-medium">{getSchoolName(typeof selectedResult.ecole === 'object' ? (selectedResult.ecole as any).id : Number(selectedResult.ecole))}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Classe</p>
              <p className="font-medium">{getClassName(typeof selectedResult.classe === 'object' ? (selectedResult.classe as any).id : Number(selectedResult.classe))}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Option</p>
              <p className="font-medium">{getOptionName(typeof selectedResult.option === 'object' ? (selectedResult.option as any).id : Number(selectedResult.option))}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Année</p>
              <p className="font-medium">{getAnneeLabel(typeof selectedResult.annee === 'object' ? (selectedResult.annee as any).id : Number(selectedResult.annee))}</p>
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