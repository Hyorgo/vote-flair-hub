import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface VoteButtonProps {
  isSelected: boolean;
  onSelect: () => void;
}

export const VoteButton = ({ isSelected, onSelect }: VoteButtonProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Button
              onClick={onSelect}
              variant="outline"
              className={cn(
                "w-full transition-all duration-500 mt-auto group relative",
                "border-2 rounded-lg shadow-sm",
                "transform hover:shadow-lg hover:translate-y-[-2px]",
                "focus-visible:ring-2 focus-visible:ring-focus-outline focus-visible:ring-offset-2",
                "focus-visible:outline-none focus-visible:z-10",
                isSelected 
                  ? "bg-gradient-to-r from-accent via-primary to-primary-dark text-white border-primary hover:opacity-90 animate-scale-in" 
                  : "hover:bg-gradient-to-r hover:from-accent hover:via-primary hover:to-primary-dark hover:text-white hover:border-primary bg-white border-white/40"
              )}
              aria-pressed={isSelected}
              aria-label={isSelected ? "Annuler le vote" : "Voter pour ce nominé"}
            >
              {isSelected ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Check className="h-5 w-5 animate-scale-in" aria-hidden="true" />
                  <span className="font-medium text-lg">Sélectionné</span>
                </motion.div>
              ) : (
                <span className="font-medium text-lg text-navy transition-colors duration-300">
                  Voter
                </span>
              )}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          sideOffset={4}
          className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg"
          role="tooltip"
        >
          <p className="text-navy">
            {isSelected 
              ? "Cliquez à nouveau pour annuler votre vote" 
              : "Cliquez pour voter pour ce nominé"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};