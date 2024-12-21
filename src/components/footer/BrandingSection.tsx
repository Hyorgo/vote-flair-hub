import React from "react";
import { Building } from "lucide-react";
import { motion } from "framer-motion";

export const BrandingSection = () => {
  return (
    <div className="space-y-4">
      <motion.div 
        className="flex items-center gap-3 text-primary"
        whileHover={{ scale: 1.02 }}
      >
        <Building className="h-8 w-8" />
        <span className="font-heading font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
          Lyon Digital Services
        </span>
      </motion.div>
      <p className="text-gray-600 leading-relaxed max-w-sm">
        Votre partenaire digital de confiance pour des solutions web innovantes et sur mesure.
      </p>
    </div>
  );
};