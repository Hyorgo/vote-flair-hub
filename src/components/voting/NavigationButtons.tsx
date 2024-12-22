import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

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
      <div className="flex flex-row justify-between items-center w-full gap-2 sm:gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 sm:w-auto"
            >
              <Button
                variant="outline"
                onClick={() => onNavigation("prev")}
                disabled={isFirstCategory}
                className="w-full group relative px-3 sm:px-6 py-2 sm:py-3 border-2 border-white/20 rounded-xl 
                  shadow-lg backdrop-blur-sm bg-white/20
                  transition-all duration-500 ease-in-out
                  hover:shadow-xl hover:border-[#DAA520]
                  hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white 
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none 
                  disabled:hover:scale-100 disabled:hover:border-white/20
                  active:scale-95"
              >
                <ChevronLeft className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#DAA520] group-hover:text-white transition-colors duration-300" />
                <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                  Précédent
                </span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="bg-white/90 backdrop-blur-sm border-white/20">
            <p>Catégorie précédente</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 sm:w-auto"
            >
              <Button
                variant="outline"
                onClick={() => onNavigation("next")}
                disabled={isLastCategory}
                className="w-full group relative px-3 sm:px-6 py-2 sm:py-3 border-2 border-white/20 rounded-xl 
                  shadow-lg backdrop-blur-sm bg-white/20
                  transition-all duration-500 ease-in-out
                  hover:shadow-xl hover:border-[#DAA520]
                  hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white 
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none 
                  disabled:hover:scale-100 disabled:hover:border-white/20
                  active:scale-95"
              >
                <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                  Suivant
                </span>
                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-[#DAA520] group-hover:text-white transition-colors duration-300" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="bg-white/90 backdrop-blur-sm border-white/20">
            <p>Catégorie suivante</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};