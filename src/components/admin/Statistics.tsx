import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Le Gourmet', votes: 24 },
  { name: 'Sushi Master', votes: 18 },
  { name: 'La Trattoria', votes: 12 },
];

export const Statistics = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total des votes" value="54" />
        <StatCard title="Catégories" value="3" />
        <StatCard title="Temps restant" value="12h 30m" />
      </div>

      <div className="h-[400px]">
        <h3 className="text-lg font-semibold mb-4">Répartition des votes</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="votes" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);