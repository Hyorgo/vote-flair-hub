import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useVotingConfig } from '@/hooks/supabase/useVotingConfig';
import { useToast } from '@/hooks/use-toast';

export const Statistics = () => {
  const { toast } = useToast();
  const { config, updateEndDate } = useVotingConfig();
  
  const { data: stats } = useQuery({
    queryKey: ['vote-statistics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vote_statistics')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: totalVotes } = useQuery({
    queryKey: ['total-votes'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: categoriesCount } = useQuery({
    queryKey: ['categories-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const handleEndDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateEndDate.mutateAsync(new Date(e.target.value));
      toast({
        title: "Date de fin mise à jour",
        description: "La nouvelle date de fin des votes a été enregistrée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la date de fin des votes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total des votes" value={totalVotes?.toString() || "0"} />
        <StatCard title="Catégories" value={categoriesCount?.toString() || "0"} />
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Date de fin des votes</h3>
          <input
            type="datetime-local"
            className="mt-1 w-full rounded-md border-gray-300"
            value={config?.end_date ? new Date(config.end_date).toISOString().slice(0, 16) : ''}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      <div className="h-[400px]">
        <h3 className="text-lg font-semibold mb-4">Répartition des votes</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nominee_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vote_count" fill="#3b82f6" />
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