import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryManager } from "./CategoryManager";
import { Statistics } from "./Statistics";
import { Database, ChartBar } from "lucide-react";

export const AdminTabs = () => {
  return (
    <Tabs defaultValue="categories" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="categories" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          Gestion des catégories
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <ChartBar className="h-4 w-4" />
          Statistiques
        </TabsTrigger>
      </TabsList>
      <TabsContent value="categories">
        <CategoryManager />
      </TabsContent>
      <TabsContent value="stats">
        <Statistics />
      </TabsContent>
    </Tabs>
  );
};