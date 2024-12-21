import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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
    <TooltipProvider>
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
            "shadow-lg hover:shadow-xl p-4 sm:p-6 rounded-lg flex flex-col h-full",
            "transform transition-all duration-300 ease-out",
            "hover:bg-white hover:-translate-y-1",
            isSelected && "ring-2 ring-yellow-400"
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
                    "w-full h-full object-cover transition-all duration-500",
                    "transform hover:scale-105",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                  width={400}
                  height={225}
                />
              )}
            </div>
          )}
          <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              {nominee.name}
            </span>
            {isSelected && (
              <Star 
                className="h-4 w-4 text-yellow-400 animate-bounce-light" 
                aria-label="Sélectionné"
              />
            )}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow leading-relaxed">
            {nominee.description}
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => onSelect(nominee.id)}
                variant="outline"
                className={cn(
                  "w-full transition-all duration-300 mt-auto group relative",
                  "border-2 border-white/40 rounded-lg shadow-sm",
                  "transform hover:scale-102 hover:shadow-md",
                  isSelected 
                    ? "bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] text-white hover:opacity-90" 
                    : "hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white bg-white"
                )}
                aria-pressed={isSelected}
              >
                {isSelected ? (
                  <>
                    <Check className="mr-2 h-4 w-4 animate-scale-in" aria-hidden="true" />
                    <span className="font-medium">Sélectionné</span>
                  </>
                ) : (
                  <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
                    Voter
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isSelected 
                  ? "Cliquez à nouveau pour annuler votre vote" 
                  : "Cliquez pour voter pour ce nominé"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};