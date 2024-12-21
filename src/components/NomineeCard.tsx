import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, ImageOff } from "lucide-react";
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Image loading error:", e);
    setImageError(true);
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <div 
      className="relative" 
      role="article" 
      aria-label={`Nominé : ${nominee.name}`}
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-lg ring-1 ring-yellow-400 animate-shimmer pointer-events-none" />
      )}
      <div 
        className={cn(
          "nominee-card relative animate-scale-in bg-white border border-white/40 shadow-xl p-4 rounded-lg flex flex-col h-full hover:bg-white/90 transition-all duration-300",
        )}
      >
        {nominee.image_url && (
          <div className="aspect-video rounded-lg overflow-hidden mb-4 relative bg-gray-100">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {imageError ? (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <ImageOff className="w-8 h-8 text-gray-400" />
              </div>
            ) : (
              <img 
                src={nominee.image_url} 
                alt={`Photo de ${nominee.name}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0",
                  "hover:scale-105"
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            )}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
            {nominee.name}
          </span>
          {isSelected && (
            <Star 
              className="h-4 w-4 text-yellow-400 animate-party" 
              aria-label="Sélectionné"
            />
          )}
        </h3>
        <p className="text-gray-700 mb-4 flex-grow">{nominee.description}</p>
        <Button
          onClick={() => onSelect(nominee.id)}
          variant="outline"
          className={cn(
            "w-full transition-all duration-300 mt-auto group relative border border-white/40 rounded-lg shadow-sm",
            isSelected 
              ? "bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] text-white hover:opacity-90" 
              : "hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white bg-white"
          )}
          aria-pressed={isSelected}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="font-medium">Sélectionné</span>
            </>
          ) : (
            <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
              Voter
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};