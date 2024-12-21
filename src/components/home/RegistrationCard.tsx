import React from "react";
import { motion } from "framer-motion";
import { RegistrationForm } from "@/components/RegistrationForm";

export const RegistrationCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full flex justify-center px-4 sm:px-6"
    >
      <div className="bg-white/30 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 w-full max-w-sm">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center font-heading">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
            Inscription pour voter
          </span>
        </h2>
        <RegistrationForm />
      </div>
    </motion.div>
  );
};