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

interface VoteButtonProps {
  isSelected: boolean;
  onSelect: () => void;
}

export const VoteButton = ({ isSelected, onSelect }: VoteButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onSelect}
            variant="outline"
            className={cn(
              "w-full transition-all duration-300 mt-auto group relative",
              "border-2 border-white/40 rounded-lg shadow-sm",
              "transform hover:scale-102 hover:shadow-md",
              isSelected 
                ? "bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] text-white hover:opacity-90" 
                : "hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white bg-white"
            )}
            aria-pressed={isSelected}
          >
            {isSelected ? (
              <>
                <Check className="mr-2 h-4 w-4 animate-scale-in" aria-hidden="true" />
                <span className="font-medium">Sélectionné</span>
              </>
            ) : (
              <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
                Voter
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isSelected 
              ? "Cliquez à nouveau pour annuler votre vote" 
              : "Cliquez pour voter pour ce nominé"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};