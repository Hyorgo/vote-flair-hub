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
    <Tabs defaultValue="categories" className="space-y-6">
      <div className="overflow-x-auto pb-2">
        <TabsList className="bg-white/50 backdrop-blur-sm w-full sm:w-auto flex flex-nowrap">
          <TabsTrigger value="categories" className="whitespace-nowrap">Catégories</TabsTrigger>
          <TabsTrigger value="statistics" className="whitespace-nowrap">Statistiques</TabsTrigger>
          <TabsTrigger value="backgrounds" className="whitespace-nowrap">Fonds</TabsTrigger>
          <TabsTrigger value="participants" className="whitespace-nowrap">Participants</TabsTrigger>
          <TabsTrigger value="event" className="whitespace-nowrap">Événement</TabsTrigger>
          <TabsTrigger value="revenue" className="whitespace-nowrap">CA</TabsTrigger>
          <TabsTrigger value="pricing" className="whitespace-nowrap">Prix</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="categories" className="space-y-6">
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