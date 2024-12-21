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
  const nominees = Array.isArray(category?.nominees) ? category.nominees : [];

  console.log("Category:", category);
  console.log("Nominees array:", nominees);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={() => onNavigation("prev")}
          disabled={isFirstCategory}
          className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none"
        >
          <ChevronLeft className="mr-2 h-4 w-4 text-[#DAA520]/80 group-hover:text-white transition-colors" />
          <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
            Précédent
          </span>
        </Button>
        <h1 className="text-3xl font-bold text-center">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
            {category?.name || ""}
          </span>
        </h1>
        <Button
          variant="outline"
          onClick={() => onNavigation("next")}
          disabled={isLastCategory}
          className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-none"
        >
          <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
            Suivant
          </span>
          <ChevronRight className="ml-2 h-4 w-4 text-[#DAA520]/80 group-hover:text-white transition-colors" />
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