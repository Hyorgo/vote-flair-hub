import React from "react";
import { NomineeCard } from "./NomineeCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/types/airtable";

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
  // Vérification explicite que nominees est un tableau
  const nominees = Array.isArray(category?.nominees) ? category.nominees : [];

  // Log pour déboguer
  console.log("Category:", category);
  console.log("Nominees array:", nominees);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={() => onNavigation("prev")}
          disabled={isFirstCategory}
          className="group"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          <span className="bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:via-[#DAA520] group-hover:to-[#B8860B] group-hover:text-transparent transition-all">
            Précédent
          </span>
        </Button>
        <h1 className="text-3xl font-bold text-center text-primary">
          {category?.name || ""}
        </h1>
        <Button
          variant="outline"
          onClick={() => onNavigation("next")}
          disabled={isLastCategory}
          className="group"
        >
          <span className="bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:via-[#DAA520] group-hover:to-[#B8860B] group-hover:text-transparent transition-all">
            Suivant
          </span>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nominees.map((nominee) => (
          <NomineeCard
            key={nominee.id}
            nominee={nominee}
            isSelected={selections[category?.id || ""] === nominee.id}
            onSelect={onVote}
          />
        ))}
      </div>
    </>
  );
};