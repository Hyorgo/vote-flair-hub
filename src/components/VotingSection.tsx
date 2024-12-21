import React from "react";
import { Category } from "@/types/airtable";
import { useToast } from "@/hooks/use-toast";
import { NavigationButtons } from "./voting/NavigationButtons";
import { CategoryTitle } from "./voting/CategoryTitle";
import { NomineesList } from "./voting/NomineesList";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { motion, AnimatePresence } from "framer-motion";

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
  const { toast } = useToast();

  useKeyboardNavigation({
    onNavigation,
    isFirstCategory,
    isLastCategory,
  });

  const handleVote = (nomineeId: string) => {
    const isModifying = selections[category?.id || ""] === nomineeId;
    const nominee = category?.nominees?.find((n) => n.id === nomineeId);
    
    onVote(nomineeId);
    
    toast({
      title: isModifying ? "Vote annulé !" : "Vote enregistré !",
      description: isModifying 
        ? `Vous pouvez maintenant choisir un autre nominé dans la catégorie "${category.name}"`
        : `Vous avez voté pour "${nominee?.name}" dans la catégorie "${category.name}". Cliquez à nouveau sur le même nominé pour modifier votre vote.`,
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category?.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="space-y-6 sm:space-y-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-3 sm:px-0 transition-all duration-300">
          <NavigationButtons
            onNavigation={onNavigation}
            isFirstCategory={isFirstCategory}
            isLastCategory={isLastCategory}
          />
          <CategoryTitle categoryName={category?.name || ""} />
        </div>

        <NomineesList
          category={category}
          selections={selections}
          onVote={handleVote}
        />
      </motion.div>
    </AnimatePresence>
  );
};