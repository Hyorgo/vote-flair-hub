import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Category } from "@/types/airtable";

interface CategoryTitleProps {
  category: Category;
}

export const CategoryTitle = ({ category }: CategoryTitleProps) => {
  return (
    <TooltipProvider>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 order-first sm:order-none group"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center relative">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
            {category.name}
          </span>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </h1>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <Info className="h-5 w-5 text-[#DAA520] cursor-help transition-colors duration-300 hover:text-[#FFD700]" />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg">
            <p>Sélectionnez votre nominé préféré dans cette catégorie</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  );
};