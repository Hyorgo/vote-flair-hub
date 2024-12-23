import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from './stats/StatCard';
import { VotingDateConfig } from './stats/VotingDateConfig';
import { CategoryStatsTable } from './stats/CategoryStatsTable';
import { CategoryCharts } from './stats/CategoryCharts';
import { VoteStatistic, CategoryStats } from './types';

export const Statistics = () => {
  const { data: stats } = useQuery<VoteStatistic[]>({
    queryKey: ['vote-statistics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vote_statistics')
        .select('*');
      
      if (error) throw error;
      return data as VoteStatistic[];
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

  const votesByCategory: CategoryStats = stats?.reduce((acc, curr) => {
    const categoryName = curr.category_name || '';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(curr);
    return acc;
  }, {} as CategoryStats) || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total des votes" value={totalVotes?.toString() || "0"} />
        <StatCard title="Catégories" value={categoriesCount?.toString() || "0"} />
        <VotingDateConfig />
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="table">Vue Tableau</TabsTrigger>
          <TabsTrigger value="charts">Vue Graphiques</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <CategoryStatsTable votesByCategory={votesByCategory} />
        </TabsContent>

        <TabsContent value="charts">
          <CategoryCharts votesByCategory={votesByCategory} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
