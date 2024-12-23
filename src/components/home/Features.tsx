import React from "react";
import { motion } from "framer-motion";

export const Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      {/* Empty container for spacing */}
    </motion.div>
  );
};