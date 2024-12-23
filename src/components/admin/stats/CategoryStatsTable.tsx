import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoteStatistic } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryStatsTableProps {
  votesByCategory: Record<string, VoteStatistic[]>;
}

export const CategoryStatsTable = ({ votesByCategory }: CategoryStatsTableProps) => (
  <Card className="bg-white">
    <CardHeader>
      <CardTitle className="text-lg sm:text-xl">Détail des votes par catégorie</CardTitle>
    </CardHeader>
    <CardContent className="p-2 sm:p-6">
      {Object.entries(votesByCategory).map(([category, nominees]) => (
        <div key={category} className="mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-4 px-2">{category}</h3>
          <div className="bg-white rounded-lg overflow-hidden">
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Nominé</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Nombre de votes</TableHead>
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
                        <TableCell className="font-medium">{nominee.nominee_name}</TableCell>
                        <TableCell className="text-right">{nominee.vote_count || 0}</TableCell>
                        <TableCell className="text-right">{percentage}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);