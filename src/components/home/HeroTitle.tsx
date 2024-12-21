import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-6 md:space-y-8 px-4 md:px-0 relative"
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-8">
        <motion.div
          animate={{ rotate: [-10, 10] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Crown 
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 opacity-90 [&>path]:fill-[url(#crown-gradient)]" 
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
        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold relative"
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

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-medium px-4">
        Célébrez l'excellence et participez à la reconnaissance des talents exceptionnels
      </p>
    </motion.div>
  );
};