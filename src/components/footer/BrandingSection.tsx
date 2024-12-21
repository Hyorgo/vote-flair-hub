import React from "react";
import { motion } from "framer-motion";

export const BrandingSection = () => {
  return (
    <div className="space-y-4">
      <motion.a 
        href="https://www.ideai.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start"
        whileHover={{ scale: 1.02 }}
      >
        <img 
          src="/lovable-uploads/4589adf3-7c86-46b1-963e-59e9b6b2c632.png" 
          alt="ideAI Logo" 
          className="h-20 w-20 object-contain"
        />
      </motion.a>
      <p className="text-white leading-relaxed max-w-sm">
        Votre partenaire digital de confiance pour des solutions web innovantes et sur mesure.
      </p>
    </div>
  );
};