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
  const totalCategories = categories.length;
  const votedCategories = Object.keys(selections).length;
  const progressPercentage = (votedCategories / totalCategories) * 100;

  return (
    <div className="space-y-4 mb-6 px-3 sm:px-0 transition-all duration-300">
      <div className="flex items-center justify-between mb-0 pb-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-sm font-medium text-white">
            Progression : {votedCategories} / {totalCategories} catégories
          </span>
          <span className="text-sm font-medium text-white/80">
            (Catégorie {currentCategory + 1} sur {totalCategories})
          </span>
        </div>
        <span className="text-sm font-medium text-white">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-gray-200 transition-all duration-700 ease-in-out"
        indicatorClassName="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] transition-all duration-700 ease-in-out"
      />
      <Tabs
        value={currentCategory.toString()}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="w-full flex-wrap h-auto gap-2 bg-white/40 backdrop-blur-md border border-white/20 shadow-lg p-2 rounded-xl overflow-x-auto">
          {categories.map((cat, index) => (
            <TabsTrigger
              key={cat.id}
              value={index.toString()}
              className={cn(
                "transition-all duration-300 relative whitespace-nowrap min-w-[100px]",
                "text-sm sm:text-base py-2 px-3 sm:px-4",
                selections[cat.id] 
                  ? "text-primary border-primary bg-white/60 after:content-['✓'] after:ml-1 after:text-green-500" 
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