import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-4 relative"
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 sm:-top-16">
        <motion.div
          animate={{ rotate: [-10, 10] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Crown className="w-16 h-16 sm:w-24 sm:h-24 text-primary opacity-20" />
        </motion.div>
      </div>
      
      <motion.h1 
        className="text-5xl sm:text-6xl md:text-8xl font-bold relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="relative font-heading tracking-tight">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent font-extrabold">
            Les Lyon d'Or
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] opacity-10 blur-sm" aria-hidden="true"></span>
        </span>
      </motion.h1>

      <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-medium">
        Célébrez l'excellence et participez à la reconnaissance des talents exceptionnels
      </p>
    </motion.div>
  );
};