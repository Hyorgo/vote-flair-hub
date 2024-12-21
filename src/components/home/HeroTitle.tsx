import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-6 relative"
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 sm:-top-16">
        <motion.div
          animate={{ 
            rotate: [-10, 10],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Crown 
            className="w-16 h-16 sm:w-24 sm:h-24 opacity-90 [&>path]:fill-[url(#crown-gradient)]" 
            strokeWidth={0}
          />
          <svg width="0" height="0">
            <linearGradient id="crown-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </svg>
        </motion.div>
      </div>
      
      <motion.h1 
        className="text-5xl sm:text-6xl md:text-8xl font-bold relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="relative font-heading tracking-tight">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent font-extrabold drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Les Lyon d'Or
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] opacity-10 blur-sm" aria-hidden="true"></span>
        </span>
      </motion.h1>

      <p className="text-lg sm:text-xl md:text-2xl text-gray-900 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
        Célébrez l'excellence et participez à la reconnaissance des talents exceptionnels
      </p>
    </motion.div>
  );
};