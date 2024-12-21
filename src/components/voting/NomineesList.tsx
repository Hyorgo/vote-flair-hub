import React from "react";
import { NomineeCard } from "@/components/NomineeCard";
import { Category } from "@/types/airtable";

interface NomineesListProps {
  category: Category;
  selections: Record<string, string>;
  onVote: (nomineeId: string) => void;
}

export const NomineesList = ({ category, selections, onVote }: NomineesListProps) => {
  const nominees = Array.isArray(category?.nominees) ? category.nominees : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
      {nominees.map((nominee) => (
        <NomineeCard
          key={nominee.id}
          nominee={nominee}
          isSelected={selections[category?.id || ""] === nominee.id}
          onSelect={onVote}
        />
      ))}
    </div>
  );
};