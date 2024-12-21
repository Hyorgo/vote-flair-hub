import React from "react";
import { NomineeCard } from "./NomineeCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Category } from "@/types/airtable";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface VotingSectionProps {
  category: Category;
  selections: Record<string, string>;
  onVote: (nomineeId: string) => void;
  onNavigation: (direction: "prev" | "next") => void;
  isFirstCategory: boolean;
  isLastCategory: boolean;
}

export const VotingSection = ({
  category,
  selections,
  onVote,
  onNavigation,
  isFirstCategory,
  isLastCategory,
}: VotingSectionProps) => {
  const nominees = Array.isArray(category?.nominees) ? category.nominees : [];
  const { toast } = useToast();

  const handleVote = (nomineeId: string) => {
    const isModifying = selections[category?.id || ""] === nomineeId;
    
    onVote(nomineeId);
    
    toast({
      title: isModifying ? "Vote annulé" : "Vote enregistré !",
      description: isModifying 
        ? "Vous pouvez maintenant choisir un autre nominé"
        : "Cliquez à nouveau sur le même nominé pour modifier votre vote",
      variant: "default",
    });
  };

  return (
    <TooltipProvider>
      <>
        <div className="flex justify-between items-center mb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => onNavigation("prev")}
                disabled={isFirstCategory}
                className="group relative px-8 py-3 border-2 border-gray-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none disabled:hover:scale-100"
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

          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-center">
              <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
                {category?.name || ""}
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

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => onNavigation("next")}
                disabled={isLastCategory}
                className="group relative px-8 py-3 border-2 border-gray-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none disabled:hover:scale-100"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4">
          {nominees.map((nominee) => (
            <NomineeCard
              key={nominee.id}
              nominee={nominee}
              isSelected={selections[category?.id || ""] === nominee.id}
              onSelect={handleVote}
            />
          ))}
        </div>
      </>
    </TooltipProvider>
  );
};