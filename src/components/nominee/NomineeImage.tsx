import React, { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface NomineeImageProps {
  imageUrl?: string;
  altText: string;
}

export const NomineeImage = ({ imageUrl, altText }: NomineeImageProps) => {
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

  if (!imageUrl) return null;

  return (
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
          src={imageUrl} 
          alt={altText}
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
  );
};