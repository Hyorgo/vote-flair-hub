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
      whileHover={{ scale: 1.02 }}
      className="relative h-full"
      role="article"
      aria-label={`Nominé : ${nominee.name}`}
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-yellow-400 animate-shimmer pointer-events-none" />
      )}
      <div 
        className={cn(
          "nominee-card relative bg-white/90 backdrop-blur-sm border-2 border-white/40",
          "shadow-lg p-3 sm:p-6 rounded-lg flex flex-col h-full",
          "transform transition-all duration-300 ease-out",
          "hover:bg-white hover:-translate-y-1",
          isSelected && "ring-2 ring-yellow-400"
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

        <p className="text-sm sm:text-base text-navy mb-4 flex-grow leading-relaxed">
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