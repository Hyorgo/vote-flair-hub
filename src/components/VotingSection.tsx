import React from "react";
import { motion } from "framer-motion";
import { NomineesList } from "@/components/voting/NomineesList";
import { NavigationButtons } from "@/components/voting/NavigationButtons";
import { CategoryTitle } from "@/components/voting/CategoryTitle";
import { Category } from "@/types/airtable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { useSwipeHint } from "@/hooks/useSwipeHint";

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
  const isMobile = useIsMobile();
  const { controls, handleDragEnd } = useSwipeNavigation({
    onNavigation,
    isFirstCategory,
    isLastCategory,
  });

  useSwipeHint();

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