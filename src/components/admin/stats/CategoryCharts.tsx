import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VoteStatistic } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryChartsProps {
  votesByCategory: Record<string, VoteStatistic[]>;
}

export const CategoryCharts = ({ votesByCategory }: CategoryChartsProps) => (
  <div className="grid grid-cols-1 gap-6">
    {Object.entries(votesByCategory).map(([category, nominees]) => (
      <Card key={category} className="overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">{category}</CardTitle>
        </CardHeader>
        <CardContent className="bg-white rounded-lg p-2 sm:p-6">
          <ScrollArea className="w-full">
            <div className="h-[300px] min-w-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nominees} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="nominee_name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vote_count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    ))}
  </div>
);