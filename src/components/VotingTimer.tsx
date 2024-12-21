import React from "react";
import { Progress } from "./ui/progress";
import { Timer } from "lucide-react";

interface VotingTimerProps {
  timeLeft: string;
  progress: number;
}

export const VotingTimer = ({ timeLeft, progress }: VotingTimerProps) => {
  return (
    <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-primary">Temps restant</h2>
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary animate-pulse" />
          <span className="font-mono text-lg">{timeLeft}</span>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};