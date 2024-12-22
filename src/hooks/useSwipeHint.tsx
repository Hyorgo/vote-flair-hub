import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { SwipeHintToast } from "@/components/voting/SwipeHintToast";

export const useSwipeHint = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  React.useEffect(() => {
    if (isMobile) {
      const hasSeenSwipeHint = localStorage.getItem("hasSeenSwipeHint");
      if (!hasSeenSwipeHint) {
        toast({
          title: "Astuce de navigation",
          description: <SwipeHintToast />,
          duration: 7000,
        });
        localStorage.setItem("hasSeenSwipeHint", "true");
      }
    }
  }, [isMobile, toast]);
};