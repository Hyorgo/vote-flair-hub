import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const SwipeHintToast = () => {
  return (
    <div className="flex items-center gap-2">
      <ArrowLeft className="h-5 w-5 text-primary animate-pulse" />
      <span>Glissez horizontalement pour naviguer entre les catégories</span>
      <ArrowRight className="h-5 w-5 text-primary animate-pulse" />
    </div>
  );
};