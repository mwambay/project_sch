import { Search, TrendingUp, BookOpen } from 'lucide-react';
import Card from '../../components/Card';
import BarChart from '../../components/BarChart';

function StudentDashboard() {
  // Sample data for top options chart
  const optionsData = {
    labels: ['Math-Info', 'Biochimie', 'Sciences Sociales', 'Littérature', 'Art'],
    datasets: [
      {
        label: 'Taux de réussite moyen (%)',
        data: [85, 80, 76, 72, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de bord élève</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center text-center p-6">
          <div className="p-3 bg-blue-100 rounded-full mb-4">
            <Search size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Rechercher une école</h3>
          <p className="text-gray-600 mb-4">
            Trouvez les meilleures écoles selon vos critères et préférences
          </p>
          <button
            onClick={() => window.location.href = '/student/search-option'}
            className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Commencer la recherche
          </button>
        </Card>
        
        <Card className="flex flex-col items-center justify-center text-center p-6">
          <div className="p-3 bg-green-100 rounded-full mb-4">
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Tendances de réussite</h3>
          <p className="text-gray-600 mb-4">
            Analysez l'évolution des taux de réussite des écoles sur plusieurs années
          </p>
          <button
            onClick={() => window.location.href = '/student/success-trends'}
            className="mt-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Voir les tendances
          </button>
        </Card>
        
        <Card className="flex flex-col items-center justify-center text-center p-6">
          <div className="p-3 bg-purple-100 rounded-full mb-4">
            <BookOpen size={24} className="text-purple-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Ressources pour élèves</h3>
          <p className="text-gray-600 mb-4">
            Accédez à des conseils et des guides pour choisir votre parcours scolaire
          </p>
          <button
            className="mt-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Explorer les ressources
          </button>
        </Card>
      </div>
      
      <Card title="Performance des options">
        <p className="text-gray-600 mb-4">
          Découvrez les options qui ont les meilleurs taux de réussite dans l'ensemble des écoles.
        </p>
        <BarChart 
          title="Taux de réussite par option" 
          labels={optionsData.labels} 
          datasets={optionsData.datasets}
        />
      </Card>
      
      <Card title="Conseils d'orientation">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Choisir son orientation</h3>
            <p className="text-blue-700">
              Le choix d'une option doit correspondre à vos intérêts et aptitudes, pas seulement aux taux de réussite. Prenez le temps d'explorer différents domaines.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Préparer son avenir</h3>
            <p className="text-green-700">
              Renseignez-vous sur les débouchés professionnels de chaque option et les possibilités d'études supérieures qui s'y rattachent.
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="font-medium text-amber-800 mb-2">Visiter les écoles</h3>
            <p className="text-amber-700">
              N'hésitez pas à participer aux journées portes ouvertes pour découvrir l'ambiance des écoles et rencontrer les enseignants.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default StudentDashboard;