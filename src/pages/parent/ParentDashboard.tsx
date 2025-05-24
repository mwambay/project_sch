import { TrendingUp, Award, School } from 'lucide-react';
import Card from '../../components/Card';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';

function ParentDashboard() {
  // Sample data for statistics
  const stats = {
    totalSchools: 85,
    topPerformingSchool: 'École C',
    topPerformance: 92,
    topImprovingSchool: 'École E',
    improvementRate: 8.5,
  };

  // Sample data for top schools chart
  const topSchools = {
    labels: ['École C', 'École A', 'École E', 'École G', 'École D'],
    datasets: [
      {
        label: 'Moyenne générale',
        data: [92, 86, 84, 83, 82],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de bord parent</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Écoles dans le système" 
          value={stats.totalSchools} 
          icon={<School size={24} />} 
        />
        <StatCard 
          title="École la plus performante" 
          value={stats.topPerformingSchool} 
          icon={<Award size={24} />} 
        />
        <StatCard 
          title="Meilleure progression" 
          value={stats.topImprovingSchool} 
          icon={<TrendingUp size={24} />} 
          trend={{ value: stats.improvementRate, isPositive: true }}
        />
      </div>
      
      <Card title="Meilleures écoles">
        <BarChart 
          title="Top 5 des écoles par performance" 
          labels={topSchools.labels} 
          datasets={topSchools.datasets}
        />
      </Card>
      
      <Card title="Recommandations pour les parents">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Comment utiliser ce portail</h3>
            <p className="text-blue-700">
              Ce portail vous permet de consulter les performances des écoles, de les comparer et de prendre des décisions éclairées pour l'éducation de vos enfants.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Choisir une école</h3>
            <p className="text-green-700">
              Utilisez les classements et les comparaisons pour identifier les écoles qui correspondent le mieux aux besoins et aux intérêts de votre enfant.
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="font-medium text-amber-800 mb-2">Comprendre les indicateurs</h3>
            <p className="text-amber-700">
              La moyenne générale et le taux de réussite sont des indicateurs importants, mais tenez également compte d'autres facteurs comme les options proposées et l'emplacement.
            </p>
          </div>
        </div>
      </Card>
      
      <Card title="Actualités éducatives">
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-medium mb-1">Réforme du programme scolaire annoncée</h3>
            <p className="text-gray-600 text-sm mb-2">
              Le ministère de l'Éducation a annoncé des changements majeurs dans le programme scolaire qui entreront en vigueur l'année prochaine.
            </p>
            <p className="text-sm text-blue-600">Lire la suite →</p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-medium mb-1">Journée portes ouvertes dans les écoles</h3>
            <p className="text-gray-600 text-sm mb-2">
              Plusieurs écoles organisent des journées portes ouvertes ce mois-ci. Une excellente occasion de visiter et de poser vos questions.
            </p>
            <p className="text-sm text-blue-600">Voir le calendrier →</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Guide des options scolaires</h3>
            <p className="text-gray-600 text-sm mb-2">
              Nous avons publié un guide complet pour aider les parents à comprendre les différentes options proposées dans les écoles.
            </p>
            <p className="text-sm text-blue-600">Télécharger le guide →</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ParentDashboard;