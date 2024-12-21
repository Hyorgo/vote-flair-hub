import React from "react";
import { motion } from "framer-motion";
import { RegistrationForm } from "@/components/RegistrationForm";

export const RegistrationCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.8,
        type: "spring",
        damping: 12,
        stiffness: 100
      }}
      className="w-full flex justify-center"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 w-full max-w-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
            Inscription pour voter
          </h2>
          <RegistrationForm />
        </div>
      </motion.div>
    </motion.div>
  );
};