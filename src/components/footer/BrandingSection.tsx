import React from "react";
import { motion } from "framer-motion";

export const BrandingSection = () => {
  return (
    <div className="space-y-4">
      <motion.div 
        className="flex items-center"
        whileHover={{ scale: 1.02 }}
      >
        <img 
          src="/lovable-uploads/4589adf3-7c86-46b1-963e-59e9b6b2c632.png" 
          alt="ideAI Logo" 
          className="h-20 w-20"
        />
      </motion.div>
      <p className="text-gray-600 leading-relaxed max-w-sm">
        Votre partenaire digital de confiance pour des solutions web innovantes et sur mesure.
      </p>
    </div>
  );
};