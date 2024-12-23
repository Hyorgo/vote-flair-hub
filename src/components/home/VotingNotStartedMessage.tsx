import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { TimerIcon } from "./voting/TimerIcon";
import { NotificationForm } from "./voting/NotificationForm";

interface VotingNotStartedMessageProps {
  startDate: Date;
}

export const VotingNotStartedMessage = ({ startDate }: VotingNotStartedMessageProps) => {
  const timeUntilStart = formatDistanceToNow(startDate, {
    locale: fr,
    addSuffix: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 w-full relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="flex flex-col items-center gap-6 text-center relative z-10">
          <TimerIcon />
          
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Les votes ne sont pas encore ouverts
          </h2>
          
          <p className="text-lg text-navy/80 leading-relaxed max-w-sm">
            Les votes seront ouverts {timeUntilStart}.
            <span className="block mt-2 font-medium text-primary-dark">
              Inscrivez-vous pour être notifié de l'ouverture des votes !
            </span>
          </p>

          <NotificationForm />
        </div>
      </div>
    </motion.div>
  );
};