import React from "react";
import { motion } from "framer-motion";
import { RegistrationForm } from "@/components/RegistrationForm";

export const RegistrationCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full flex justify-center"
    >
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Inscription pour voter
        </h2>
        <RegistrationForm />
      </div>
    </motion.div>
  );
};