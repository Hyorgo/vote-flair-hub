import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VoteStatistic } from "../types";

interface CategoryChartsProps {
  votesByCategory: Record<string, VoteStatistic[]>;
}

export const CategoryCharts = ({ votesByCategory }: CategoryChartsProps) => (
  <div className="grid grid-cols-1 gap-6">
    {Object.entries(votesByCategory).map(([category, nominees]) => (
      <Card key={category}>
        <CardHeader>
          <CardTitle>{category}</CardTitle>
        </CardHeader>
        <CardContent className="bg-white rounded-lg">
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
);