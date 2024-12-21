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
      <TabsList className="w-full flex-wrap h-auto gap-2 bg-white/80 backdrop-blur-sm p-2">
        {categories.map((cat, index) => (
          <TabsTrigger
            key={cat.id}
            value={index.toString()}
            className={`${
              selections[cat.id] ? "text-primary border-primary" : ""
            } animate-scale-in`}
          >
            {cat.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};