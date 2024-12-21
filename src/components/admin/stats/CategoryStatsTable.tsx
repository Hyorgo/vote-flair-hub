import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoteStatistic } from "../types";

interface CategoryStatsTableProps {
  votesByCategory: Record<string, VoteStatistic[]>;
}

export const CategoryStatsTable = ({ votesByCategory }: CategoryStatsTableProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Détail des votes par catégorie</CardTitle>
    </CardHeader>
    <CardContent>
      {Object.entries(votesByCategory).map(([category, nominees]) => (
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
);