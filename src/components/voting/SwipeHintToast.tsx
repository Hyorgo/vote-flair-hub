import React from "react";
import { SwipeHorizontal } from "lucide-react";

export const SwipeHintToast = () => {
  return (
    <div className="flex items-center gap-2">
      <SwipeHorizontal className="h-5 w-5 text-primary animate-pulse" />
      <span>Glissez horizontalement pour naviguer entre les catégories</span>
    </div>
  );
};