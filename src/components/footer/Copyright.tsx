import React from "react";
import { motion } from "framer-motion";

export const Copyright = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-12 pt-6 border-t border-gray-100 text-center text-sm text-gray-500"
    >
      © {new Date().getFullYear()} Lyon Digital Services. Tous droits réservés.
    </motion.div>
  );
};