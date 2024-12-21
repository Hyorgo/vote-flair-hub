import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { Timer, AlertTriangle } from "lucide-react";
import { useVotingConfig } from "@/hooks/supabase/useVotingConfig";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

export const VotingTimer = () => {
  const { config, isLoading } = useVotingConfig();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [progress, setProgress] = useState(100);
  const [isUrgent, setIsUrgent] = useState(false);

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
        setIsUrgent(false);
        return;
      }

      setTimeLeft(
        formatDistanceToNow(endDate, {
          locale: fr,
          addSuffix: true,
        })
      );

      const currentProgress = (distance / totalDuration) * 100;
      setProgress(currentProgress);
      setIsUrgent(currentProgress < 20);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [config]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <TooltipProvider>
      <div className={cn(
        "mb-6 p-6 rounded-lg shadow-lg transition-all duration-300",
        "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm",
        "border-2 border-white/40",
        isUrgent && "animate-pulse"
      )}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold relative">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              Temps restant
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] opacity-10 blur-sm" />
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3">
                {isUrgent && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500 animate-bounce" />
                )}
                <Timer className="h-6 w-6 text-[#DAA520]" />
                <span className="font-mono text-xl font-semibold">{timeLeft}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Temps restant pour voter</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Progress 
          value={progress} 
          className="h-3 bg-gradient-to-r from-[#FFD700]/20 via-[#DAA520]/20 to-[#B8860B]/20"
          indicatorClassName={cn(
            "bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B]",
            "transition-all duration-300"
          )}
        />
      </div>
    </TooltipProvider>
  );
};