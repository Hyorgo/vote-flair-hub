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
          className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] opacity-0 group-hover:opacity-10 transition-opacity" />
          <ChevronLeft className="mr-2 h-4 w-4 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent transition-transform group-hover:-translate-x-0.5" />
          <span className="font-medium bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent transition-colors">
            Précédent
          </span>
        </Button>
        <h1 className="text-3xl font-bold text-center">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
            {category?.name || ""}
          </span>
        </h1>
        <Button
          variant="outline"
          onClick={() => onNavigation("next")}
          disabled={isLastCategory}
          className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] opacity-0 group-hover:opacity-10 transition-opacity" />
          <span className="font-medium bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent transition-colors">
            Suivant
          </span>
          <ChevronRight className="ml-2 h-4 w-4 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent transition-transform group-hover:translate-x-0.5" />
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