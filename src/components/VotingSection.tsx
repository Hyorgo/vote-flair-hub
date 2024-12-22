import React, { useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { NomineesList } from "@/components/voting/NomineesList";
import { NavigationButtons } from "@/components/voting/NavigationButtons";
import { CategoryTitle } from "@/components/voting/CategoryTitle";
import { Category } from "@/types/airtable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VotingSectionProps {
  category: Category;
  selections: Record<string, string>;
  onVote: (nomineeId: string) => void;
  onNavigation: (direction: "prev" | "next") => void;
  isFirstCategory: boolean;
  isLastCategory: boolean;
}

export const VotingSection = ({
  category,
  selections,
  onVote,
  onNavigation,
  isFirstCategory,
  isLastCategory,
}: VotingSectionProps) => {
  const controls = useAnimation();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    if (isMobile) {
      const hasSeenSwipeHint = localStorage.getItem("hasSeenSwipeHint");
      if (!hasSeenSwipeHint) {
        toast({
          title: "Astuce de navigation",
          description: (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-5 w-5 animate-bounce-light" />
                Swipez pour naviguer
                <ChevronRight className="h-5 w-5 animate-bounce-light" />
              </div>
              <motion.div
                animate={{
                  x: [0, 50, -50, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: 2,
                  ease: "easeInOut",
                }}
                className="w-16 h-1 bg-primary rounded-full"
              />
            </div>
          ),
          duration: 5000,
        });
        localStorage.setItem("hasSeenSwipeHint", "true");
      }
    }
  }, [isMobile, toast]);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) >= 500 || Math.abs(offset) >= 50) {
      if (offset > 0 && !isFirstCategory) {
        await controls.start({ x: "100%", opacity: 0 });
        onNavigation("prev");
        controls.set({ x: "-100%" });
        await controls.start({ x: 0, opacity: 1 });
      } else if (offset < 0 && !isLastCategory) {
        await controls.start({ x: "-100%", opacity: 0 });
        onNavigation("next");
        controls.set({ x: "100%" });
        await controls.start({ x: 0, opacity: 1 });
      } else {
        // Rebond élastique si on ne peut pas naviguer plus loin
        controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
        
        // Feedback visuel
        toast({
          title: offset > 0 ? "Première catégorie" : "Dernière catégorie",
          description: "Vous ne pouvez pas aller plus loin",
          duration: 1500,
        });
      }
    } else {
      // Retour à la position initiale si le swipe n'est pas assez fort
      controls.start({ x: 0, opacity: 1 });
    }
  };

  return (
    <div className="w-full">
      <CategoryTitle category={category} />
      
      <motion.div
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: 0, opacity: 1 }}
        className="w-full touch-pan-y"
      >
        <NomineesList
          category={category}
          selections={selections}
          onVote={onVote}
        />
      </motion.div>

      <div className="mt-8 px-4 sm:px-0">
        <NavigationButtons
          onNavigation={onNavigation}
          isFirstCategory={isFirstCategory}
          isLastCategory={isLastCategory}
        />
      </div>
    </div>
  );
};