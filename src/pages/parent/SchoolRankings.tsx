import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import { MapPin, School, Filter } from 'lucide-react';
import { ClasseService, ClasseData } from '../../api/Classe.service';
import { OptionService, OptionData } from '../../api/Option.service';
import { AnneeService, AnneeData } from '../../api/Annee.service';
import { CalculationService, SchoolRankingData, GlobalStats } from '../../api/Calculation.service';

function SchoolRankings() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('rang');
  const [isLoading, setIsLoading] = useState(false);
  
  // États pour les données dynamiques
  const [classes, setClasses] = useState<ClasseData[]>([]);
  const [options, setOptions] = useState<OptionData[]>([]);
  const [years, setYears] = useState<AnneeData[]>([]);
  const [schools, setSchools] = useState<SchoolRankingData[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  
  // Sample data pour les villes
  const cities = ['Toutes', 'Kolwezi', 'Lubumbashi', 'Likasi', 'Fungurume', 'Kambove'];
  
  // Chargement des données de base depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les listes déroulantes
        const [classesData, optionsData, yearsData] = await Promise.all([
          ClasseService.getAllClasses(),
          OptionService.getAllOptions(),
          AnneeService.getAllAnnees()
        ]);
        
        setClasses(classesData);
        setOptions(optionsData);
        setYears(yearsData);
        
        // Définir l'année par défaut à l'année la plus récente
        if (yearsData.length > 0) {
          const latestYear = yearsData[yearsData.length - 1].id.toString();
          setSelectedYear(latestYear);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données de base:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Charger les classements lorsque les filtres changent
  useEffect(() => {
    const fetchRankings = async () => {
      if (!selectedYear) return;
      
      setIsLoading(true);
      try {
        const rankingsData = await CalculationService.getSchoolRankings(
          Number(selectedYear),
          selectedCity === 'Toutes' || selectedCity === '' ? undefined : selectedCity,
          selectedClass ? Number(selectedClass) : undefined,
          selectedOption ? Number(selectedOption) : undefined
        );

        console.log('Données de classement récupérées:', rankingsData);
        
        // Trier les données selon le critère sélectionné
        const sortedData = rankingsData.sort((a, b) => {
          if (sortBy === 'rang') return a.rang - b.rang;
          if (sortBy === 'moyenne') return b.moyenne - a.moyenne;
          if (sortBy === 'tauxReussite') return b.tauxReussite - a.tauxReussite;
          return 0;
        });
        
        setSchools(sortedData);
        
        // Charger aussi les statistiques globales
        const stats = await CalculationService.getGlobalStats(Number(selectedYear));
        setGlobalStats(stats);
        
      } catch (error) {
        console.error('Erreur lors du chargement des classements:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRankings();
  }, [selectedCity, selectedClass, selectedOption, selectedYear, sortBy]);
  
  // Vérifier si l'option doit être activée (uniquement pour les classes du secondaire)
  const isOptionEnabled = selectedClass && ['1ère Secondaire', '2ème Secondaire', '3ème Secondaire', '4ème Secondaire'].includes(
    classes.find(c => c.id.toString() === selectedClass)?.nom || ''
  );

  // Table columns
  const columns = [
    { 
      key: 'rang', 
      header: 'Rang',
      render: (value: number) => (
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            value <= 3 ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      )
    },
    { key: 'nom', header: 'École' },
    { 
      key: 'ville', 
      header: 'Localisation',
      render: (value: string) => (
        <span className="flex items-center">
          <MapPin size={16} className="mr-1 text-gray-400" />
          {value}
        </span>
      )
    },
    { key: 'moyenne', header: 'Moyenne', render: (value: number) => value.toFixed(2) },
    { key: 'tauxReussite', header: 'Taux de réussite (%)', render: (value: number) => value.toFixed(1) },
    { 
      key: 'optionPrincipale', 
      header: 'Option principale',
      render: (value: string) => (
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === 'Math-Info' ? 'bg-blue-100 text-blue-800' : 
            value === 'Biochimie' ? 'bg-green-100 text-green-800' :
            value === 'Littérature' ? 'bg-purple-100 text-purple-800' :
            value === 'Sciences Sociales' ? 'bg-yellow-100 text-yellow-800' :
            'bg-pink-100 text-pink-800'
          }`}
        >
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Classement des écoles</h1>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les villes</option>
              {cities.filter(c => c !== 'Toutes').map((city) => (
                <option key={city} value={city}>
                  {city}
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
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedOption(''); // Réinitialiser l'option lors du changement de classe
              }}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les classes</option>
              {classes.map((classe) => (
                <option key={classe.id} value={classe.id.toString()}>
                  {classe.nom}
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
              disabled={!isOptionEnabled}
              className={`w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                !isOptionEnabled ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Toutes les options</option>
              {options.map((option) => (
                <option key={option.id} value={option.id.toString()}>
                  {option.nom}
                </option>
              ))}
            </select>
            {!isOptionEnabled && selectedClass && (
              <p className="text-xs text-gray-500 mt-1">
                Options disponibles uniquement pour le secondaire
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Année scolaire
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les années</option>
              {years.map((year) => (
                <option key={year.id} value={year.id.toString()}>
                  {year.libelle}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trier par
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rang">Classement</option>
              <option value="moyenne">Moyenne</option>
              <option value="tauxReussite">Taux de réussite</option>
            </select>
          </div>
        </div>
      </Card>
      
      {globalStats && (
        <Card title="Statistiques générales">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Moyenne générale</h4>
              <p className="text-2xl font-bold text-blue-800">{globalStats.moyenneGenerale.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Taux de réussite global</h4>
              <p className="text-2xl font-bold text-green-800">{globalStats.tauxReussiteGlobal.toFixed(1)}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Nombre d'écoles</h4>
              <p className="text-2xl font-bold text-purple-800">{globalStats.nombreEcoles}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Nombre d'élèves</h4>
              <p className="text-2xl font-bold text-yellow-800">{globalStats.nombreEleves}</p>
            </div>
          </div>
        </Card>
      )}
      
      <Card>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center space-x-3">
          <Filter size={20} className="text-blue-500" />
          <div>
            <h3 className="font-medium">Résultats filtrés</h3>
            <p className="text-sm text-gray-600">
              Affichage de {schools.length} écoles
              {selectedCity && selectedCity !== 'Toutes' ? ` à ${selectedCity}` : ''}
              {selectedClass ? ` pour la classe de ${classes.find(c => c.id.toString() === selectedClass)?.nom || ''}` : ''}
              {isOptionEnabled && selectedOption ? ` avec l'option ${options.find(o => o.id.toString() === selectedOption)?.nom || ''}` : ''}
              {selectedYear ? ` pour l'année ${years.find(y => y.id.toString() === selectedYear)?.libelle || ''}` : ''}
              {sortBy === 'rang' ? ' triées par classement' : 
               sortBy === 'moyenne' ? ' triées par moyenne' : 
               ' triées par taux de réussite'}
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Chargement des données...</p>
          </div>
        ) : schools.length > 0 ? (
          <DataTable
            columns={columns}
            data={schools}
          />
        ) : (
          <div className="py-12 text-center text-gray-500">
            <School size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Aucune école ne correspond aux critères sélectionnés.</p>
            <p className="text-sm mt-2">Essayez de modifier vos filtres pour voir plus de résultats.</p>
          </div>
        )}
      </Card>
      
      <Card title="Comment est calculé le classement ?">
        <div className="space-y-4 text-gray-600">
          <p>
            Le classement des écoles est basé sur plusieurs facteurs, principalement :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>La moyenne générale des élèves (50% du score)</li>
            <li>Le taux de réussite aux examens (30% du score)</li>
            <li>La progression par rapport aux années précédentes (10% du score)</li>
            <li>La diversité des options proposées (10% du score)</li>
          </ul>
          <p>
            Ce classement est mis à jour chaque année après la publication des résultats d'examens officiels.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default SchoolRankings;