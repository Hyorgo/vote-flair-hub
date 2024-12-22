import React from "react";
import { motion } from "framer-motion";
import { NomineeImage } from "./nominee/NomineeImage";
import { NomineeTitle } from "./nominee/NomineeTitle";
import { VoteButton } from "./nominee/VoteButton";
import { cn } from "@/lib/utils";

interface NomineeCardProps {
  nominee: {
    id: string;
    name: string;
    description: string;
    image_url?: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const NomineeCard = ({ nominee, isSelected, onSelect }: NomineeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      className="relative h-full group"
      role="article"
      aria-label={`Nominé : ${nominee.name}`}
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-lg ring-4 ring-yellow-400/50 animate-pulse pointer-events-none" />
      )}
      <div 
        className={cn(
          "nominee-card relative bg-white/90 backdrop-blur-sm border-2",
          "shadow-lg p-3 sm:p-6 rounded-lg flex flex-col h-full",
          "transform transition-all duration-500 ease-out",
          "group-hover:bg-white/95 group-hover:shadow-xl group-hover:-translate-y-1",
          "group-hover:border-yellow-400/50",
          isSelected ? "border-yellow-400 ring-2 ring-yellow-400" : "border-white/40",
        )}
      >
        <NomineeImage 
          imageUrl={nominee.image_url} 
          altText={`Photo de ${nominee.name}`}
        />
        
        <NomineeTitle 
          name={nominee.name}
          isSelected={isSelected}
        />

        <p className="text-sm sm:text-base text-navy/90 mb-4 flex-grow leading-relaxed group-hover:text-navy transition-colors duration-300">
          {nominee.description}
        </p>

        <VoteButton 
          isSelected={isSelected}
          onSelect={() => onSelect(nominee.id)}
        />
      </div>
    </motion.div>
  );
};