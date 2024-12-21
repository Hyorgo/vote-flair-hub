import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CategoryTitleProps {
  categoryName: string;
}

export const CategoryTitle = ({ categoryName }: CategoryTitleProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 order-first sm:order-none">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
            {categoryName}
          </span>
        </h1>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-5 w-5 text-[#DAA520] cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Sélectionnez votre nominé préféré dans cette catégorie</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};