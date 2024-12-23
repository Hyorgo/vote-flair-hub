import React from "react";
import { Timer } from "lucide-react";

export const TimerIcon = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl" />
      <Timer className="h-16 w-16 text-primary relative animate-pulse" />
    </div>
  );
};