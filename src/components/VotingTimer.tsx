import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { Timer } from "lucide-react";
import { useVotingConfig } from "@/hooks/supabase/useVotingConfig";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const VotingTimer = () => {
  const { config, isLoading } = useVotingConfig();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!config?.end_date) return;

    const endDate = new Date(config.end_date);
    const totalDuration = endDate.getTime() - new Date(config.created_at).getTime();

    const updateTimer = () => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();
      
      if (distance <= 0) {
        setTimeLeft("Votes terminés");
        setProgress(0);
        return;
      }

      setTimeLeft(
        formatDistanceToNow(endDate, {
          locale: fr,
          addSuffix: true,
        })
      );

      setProgress((distance / totalDuration) * 100);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [config]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold relative">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
            Temps restant
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] opacity-10 blur-sm" aria-hidden="true"></span>
        </h2>
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary animate-pulse" />
          <span className="font-mono text-lg">{timeLeft}</span>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};