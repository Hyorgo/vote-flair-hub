import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface NomineeTitleProps {
  name: string;
  isSelected: boolean;
}

export const NomineeTitle = ({ name, isSelected }: NomineeTitleProps) => {
  return (
    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
      <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
        {name}
      </span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Star 
            className="h-5 w-5 text-primary animate-bounce-light" 
            aria-label="Sélectionné"
          />
        </motion.div>
      )}
    </h3>
  );
};