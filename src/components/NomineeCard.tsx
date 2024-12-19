import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface NomineeCardProps {
  nominee: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const NomineeCard = ({ nominee, isSelected, onSelect }: NomineeCardProps) => {
  return (
    <div 
      className={cn(
        "nominee-card relative animate-scale-in",
        isSelected && "ring-2 ring-primary-light"
      )}
    >
      {nominee.imageUrl && (
        <div className="aspect-video rounded-lg overflow-hidden mb-4">
          <img 
            src={nominee.imageUrl} 
            alt={nominee.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{nominee.name}</h3>
      <p className="text-gray-600 mb-4">{nominee.description}</p>
      <Button
        onClick={() => onSelect(nominee.id)}
        variant={isSelected ? "default" : "outline"}
        className="w-full"
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