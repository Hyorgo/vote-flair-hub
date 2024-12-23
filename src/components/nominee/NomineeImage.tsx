import React from "react";
import { cn } from "@/lib/utils";

interface NomineeImageProps {
  imageUrl?: string;
  altText: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
}

export const NomineeImage = ({ 
  imageUrl, 
  altText,
  loading = "lazy",
  decoding = "async"
}: NomineeImageProps) => {
  return (
    <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden bg-gray-100">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={altText}
          loading={loading}
          decoding={decoding}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            "group-hover:scale-105 will-change-transform",
            "transform-gpu" // Utilisation du GPU pour les transformations
          )}
          onError={(e) => {
            console.error(`Error loading image: ${imageUrl}`);
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Image non disponible</span>
        </div>
      )}
    </div>
  );
};