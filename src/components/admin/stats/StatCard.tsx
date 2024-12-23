interface StatCardProps {
  title: string;
  value: string;
}

export const StatCard = ({ title, value }: StatCardProps) => (
  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    <p className="text-2xl sm:text-3xl font-bold">{value}</p>
  </div>
);