import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SwipeHintToast = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <ChevronLeft className="h-5 w-5" />
        Swipez pour naviguer entre les catégories
        <ChevronRight className="h-5 w-5" />
      </div>
      <img 
        src="/lovable-uploads/1994ce01-1680-423f-b265-20f815b07ab2.png" 
        alt="Geste de swipe"
        className="w-24 h-24 object-contain"
      />
    </div>
  );
};