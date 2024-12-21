import React from "react";
import { motion } from "framer-motion";

export const ServicesSection = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-lg text-gray-800">Nos Services</h3>
      <ul className="space-y-3 text-gray-600">
        <motion.li 
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          Développement Web
        </motion.li>
        <motion.li 
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          Applications Mobiles
        </motion.li>
        <motion.li 
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          Solutions Cloud
        </motion.li>
      </ul>
    </div>
  );
};