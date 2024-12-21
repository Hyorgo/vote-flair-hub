import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useVotingConfig } from '@/hooks/supabase/useVotingConfig';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  // Organiser les données par catégorie
  const votesByCategory = stats?.reduce((acc, curr) => {
    if (!acc[curr.category_name || '']) {
      acc[curr.category_name || ''] = [];
    }
    acc[curr.category_name || ''].push(curr);
    return acc;
  }, {} as Record<string, typeof stats>);

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="table">Vue Tableau</TabsTrigger>
          <TabsTrigger value="charts">Vue Graphiques</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Détail des votes par catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(votesByCategory || {}).map(([category, nominees]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nominé</TableHead>
                        <TableHead className="text-right">Nombre de votes</TableHead>
                        <TableHead className="text-right">Pourcentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {nominees.map((nominee) => {
                        const totalCategoryVotes = nominees.reduce((sum, n) => sum + (n.vote_count || 0), 0);
                        const percentage = totalCategoryVotes > 0 
                          ? ((nominee.vote_count || 0) / totalCategoryVotes * 100).toFixed(1)
                          : "0.0";
                        
                        return (
                          <TableRow key={nominee.nominee_id}>
                            <TableCell>{nominee.nominee_name}</TableCell>
                            <TableCell className="text-right">{nominee.vote_count || 0}</TableCell>
                            <TableCell className="text-right">{percentage}%</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(votesByCategory || {}).map(([category, nominees]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={nominees}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nominee_name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="vote_count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);