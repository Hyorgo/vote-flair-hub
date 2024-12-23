import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/airtable";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 mb-6 px-3 sm:px-0"
    >
      <div className="flex items-center justify-between mb-0 pb-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-sm font-medium text-white/90 backdrop-blur-sm px-2 py-1 rounded-md bg-white/10">
            Progression : {votedCategories} / {totalCategories} catégories
          </span>
          <span className="text-sm font-medium text-white/80 backdrop-blur-sm px-2 py-1 rounded-md bg-white/10">
            (Catégorie {currentCategory + 1} sur {totalCategories})
          </span>
        </div>
        <motion.span 
          key={progressPercentage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-medium text-white/90 backdrop-blur-sm px-3 py-1 rounded-full bg-white/20"
        >
          {Math.round(progressPercentage)}%
        </motion.span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2.5 bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-700 ease-in-out"
        indicatorClassName="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] transition-all duration-700 ease-in-out"
      />
      <Tabs
        value={currentCategory.toString()}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList 
          className="w-full flex-wrap h-auto gap-2 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg p-2 rounded-xl overflow-x-auto"
          aria-label="Navigation des catégories"
        >
          {categories.map((cat, index) => (
            <TabsTrigger
              key={cat.id}
              value={index.toString()}
              className={cn(
                "transition-all duration-300 relative whitespace-nowrap min-w-[100px]",
                "text-sm sm:text-base py-2 px-3 sm:px-4",
                "focus-visible:ring-2 focus-visible:ring-focus-outline focus-visible:ring-offset-2",
                "focus-visible:outline-none focus-visible:z-10",
                "hover:bg-white/50 active:scale-95",
                selections[cat.id] 
                  ? "text-primary border-primary bg-white/60 after:content-['✓'] after:ml-1 after:text-green-500" 
                  : "hover:bg-white/50"
              )}
              aria-label={`Catégorie ${cat.name}${selections[cat.id] ? ' (Votée)' : ''}`}
            >
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};