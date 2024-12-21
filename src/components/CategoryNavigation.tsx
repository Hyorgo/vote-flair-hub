import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/airtable";

interface CategoryNavigationProps {
  categories: Category[];
  currentCategory: number;
  selections: Record<string, string>;
  onTabChange: (value: string) => void;
}

export const CategoryNavigation = ({
  categories,
  currentCategory,
  selections,
  onTabChange,
}: CategoryNavigationProps) => {
  return (
    <Tabs
      value={currentCategory.toString()}
      onValueChange={onTabChange}
      className="mb-6"
    >
      <TabsList className="w-full flex-wrap h-auto gap-2 bg-white/40 backdrop-blur-md border border-white/20 shadow-lg p-2 rounded-xl">
        {categories.map((cat, index) => (
          <TabsTrigger
            key={cat.id}
            value={index.toString()}
            className={`${
              selections[cat.id] ? "text-primary border-primary bg-white/60" : "hover:bg-white/50"
            } animate-scale-in backdrop-blur-sm transition-all duration-300`}
          >
            {cat.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};