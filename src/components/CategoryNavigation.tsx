import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/airtable";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  // Calculer le pourcentage de progression
  const totalCategories = categories.length;
  const votedCategories = Object.keys(selections).length;
  const progressPercentage = (votedCategories / totalCategories) * 100;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progression : {votedCategories} / {totalCategories} catégories
        </span>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-gray-200"
        indicatorClassName="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B]"
      />
      <Tabs
        value={currentCategory.toString()}
        onValueChange={onTabChange}
      >
        <TabsList className="w-full flex-wrap h-auto gap-2 bg-white/40 backdrop-blur-md border border-white/20 shadow-lg p-2 rounded-xl">
          {categories.map((cat, index) => (
            <TabsTrigger
              key={cat.id}
              value={index.toString()}
              className={cn(
                "transition-all duration-300 relative",
                selections[cat.id] 
                  ? "text-primary border-primary bg-white/60 after:content-['✓'] after:ml-2 after:text-green-500" 
                  : "hover:bg-white/50"
              )}
            >
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};