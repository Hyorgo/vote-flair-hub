import React from "react";
import { NomineeCard } from "@/components/NomineeCard";
import { Category } from "@/types/airtable";
import { motion } from "framer-motion";

interface NomineesListProps {
  category: Category;
  selections: Record<string, string>;
  onVote: (nomineeId: string) => void;
}

export const NomineesList = ({ category, selections, onVote }: NomineesListProps) => {
  const nominees = Array.isArray(category?.nominees) ? category.nominees : [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-3 sm:px-6 max-w-7xl mx-auto"
    >
      {nominees.map((nominee) => (
        <motion.div
          key={nominee.id}
          variants={item}
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <NomineeCard
            nominee={nominee}
            isSelected={selections[category?.id || ""] === nominee.id}
            onSelect={onVote}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};