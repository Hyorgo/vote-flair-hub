import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryManager } from "./CategoryManager";
import { Statistics } from "./Statistics";
import { BackgroundManager } from "./BackgroundManager";
import { ParticipantsTable } from "./participants/ParticipantsTable";
import { EventInformationManager } from "./EventInformationManager";
import { RevenueStats } from "./revenue/RevenueStats";
import { PriceManager } from "./pricing/PriceManager";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export const AdminTabs = () => {
  const { isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="categories" className="space-y-4">
      <TabsList className="bg-white/50 backdrop-blur-sm">
        <TabsTrigger value="categories">Catégories</TabsTrigger>
        <TabsTrigger value="statistics">Statistiques</TabsTrigger>
        <TabsTrigger value="backgrounds">Fonds</TabsTrigger>
        <TabsTrigger value="participants">Participants</TabsTrigger>
        <TabsTrigger value="event">Événement</TabsTrigger>
        <TabsTrigger value="revenue">CA</TabsTrigger>
        <TabsTrigger value="pricing">Prix</TabsTrigger>
      </TabsList>

      <TabsContent value="categories" className="space-y-4">
        <CategoryManager />
      </TabsContent>

      <TabsContent value="statistics">
        <Statistics />
      </TabsContent>

      <TabsContent value="backgrounds">
        <BackgroundManager />
      </TabsContent>

      <TabsContent value="participants">
        <ParticipantsTable />
      </TabsContent>

      <TabsContent value="event">
        <EventInformationManager />
      </TabsContent>

      <TabsContent value="revenue">
        <RevenueStats />
      </TabsContent>

      <TabsContent value="pricing">
        <PriceManager />
      </TabsContent>
    </Tabs>
  );
};