import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export const VotingEndedMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Votes terminés
          </h2>
          <p className="text-lg text-gray-600">
            La période de vote est maintenant terminée. Merci de votre intérêt !
          </p>
        </div>
      </div>
    </motion.div>
  );
};