import React from "react";
import { Star } from "lucide-react";

interface NomineeTitleProps {
  name: string;
  isSelected: boolean;
}

export const NomineeTitle = ({ name, isSelected }: NomineeTitleProps) => {
  return (
    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
      <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
        {name}
      </span>
      {isSelected && (
        <Star 
          className="h-4 w-4 text-yellow-400 animate-bounce-light" 
          aria-label="Sélectionné"
        />
      )}
    </h3>
  );
};