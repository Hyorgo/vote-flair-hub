import React from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

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
        {/* Halos décoratifs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="flex flex-col items-center gap-6 text-center relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl" />
            <Timer className="h-16 w-16 text-primary relative animate-pulse" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            <span className="bg-gradient-to-r from-accent via-primary to-primary-dark bg-clip-text text-transparent 
              drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
              Les votes ne sont pas encore ouverts
            </span>
          </h2>
          
          <p className="text-lg text-navy/80 leading-relaxed max-w-sm">
            Les votes seront ouverts {timeUntilStart}.
            <span className="block mt-2 font-medium text-primary-dark">
              Revenez à ce moment-là pour participer !
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};