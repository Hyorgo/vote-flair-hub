import React from "react";
import { motion } from "framer-motion";
import { RegistrationForm } from "@/components/RegistrationForm";
import { useVotingConfig } from "@/hooks/supabase/useVotingConfig";
import { VotingEndedMessage } from "./VotingEndedMessage";
import { VotingNotStartedMessage } from "./VotingNotStartedMessage";

export const RegistrationCard = () => {
  const { config } = useVotingConfig();

  if (!config) {
    return null;
  }

  const now = new Date();
  const startDate = new Date(config.start_date);
  const endDate = new Date(config.end_date);

  if (now > endDate) {
    return <VotingEndedMessage />;
  }

  if (now < startDate) {
    return <VotingNotStartedMessage startDate={startDate} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4 sm:px-6"
    >
      <div className="bg-white/30 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center font-heading">
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent 
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
            Inscription pour voter
          </span>
        </h2>
        <RegistrationForm />
      </div>
    </motion.div>
  );
};