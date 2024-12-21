import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
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
    <div 
      className={cn(
        "nominee-card relative animate-scale-in backdrop-blur-md bg-white/40 border border-white/20 shadow-xl p-4 rounded-lg flex flex-col h-full hover:bg-white/50 transition-all duration-300",
        isSelected && "ring-2 ring-primary-light before:absolute before:inset-0 before:bg-primary/5"
      )}
    >
      {nominee.image_url && (
        <div className="aspect-video rounded-lg overflow-hidden mb-4">
          <img 
            src={nominee.image_url} 
            alt={nominee.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        {nominee.name}
        {isSelected && <Star className="h-4 w-4 text-primary animate-party" />}
      </h3>
      <p className="text-gray-600 mb-4 flex-grow">{nominee.description}</p>
      <Button
        onClick={() => onSelect(nominee.id)}
        variant={isSelected ? "default" : "outline"}
        className={cn(
          "w-full transition-all duration-300 mt-auto backdrop-blur-sm",
          isSelected ? "bg-primary/90 hover:bg-primary-dark" : "bg-white/50 hover:bg-white/70"
        )}
      >
        {isSelected ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Sélectionné
          </>
        ) : (
          "Voter"
        )}
      </Button>
    </div>
  );
};