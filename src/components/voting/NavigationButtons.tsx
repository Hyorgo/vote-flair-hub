import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigationButtonsProps {
  onNavigation: (direction: "prev" | "next") => void;
  isFirstCategory: boolean;
  isLastCategory: boolean;
}

export const NavigationButtons = ({
  onNavigation,
  isFirstCategory,
  isLastCategory,
}: NavigationButtonsProps) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => onNavigation("prev")}
              disabled={isFirstCategory}
              className="w-full sm:w-auto group relative px-6 py-3 border-2 border-gray-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none disabled:hover:scale-100"
            >
              <ChevronLeft className="mr-2 h-5 w-5 text-[#DAA520] group-hover:text-white transition-colors" />
              <span className="font-semibold text-gray-700 group-hover:text-white transition-colors">
                Précédent
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Catégorie précédente</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => onNavigation("next")}
              disabled={isLastCategory}
              className="w-full sm:w-auto group relative px-6 py-3 border-2 border-gray-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none disabled:hover:scale-100"
            >
              <span className="font-semibold text-gray-700 group-hover:text-white transition-colors">
                Suivant
              </span>
              <ChevronRight className="ml-2 h-5 w-5 text-[#DAA520] group-hover:text-white transition-colors" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Catégorie suivante</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};