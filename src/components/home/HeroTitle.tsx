import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4 md:space-y-6 lg:space-y-8 w-full max-w-4xl mx-auto px-4"
    >
      <motion.div
        animate={{ rotate: [-5, 5] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="relative w-fit mx-auto mb-2 md:mb-4"
      >
        <Crown 
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" 
          color="#FFD700"
        />
      </motion.div>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading">
        <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent font-extrabold">
          Lyon d'Or
        </span>
      </h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 blur-xl animate-shimmer rounded-full" />
        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-extrabold relative">
          <span className="bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] bg-clip-text text-transparent 
            animate-shimmer bg-[length:200%_auto] motion-safe:hover:animate-shimmer">
            2025
          </span>
        </h2>
      </motion.div>

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white mx-auto leading-relaxed font-medium max-w-3xl">
        Le rendez-vous annuel des professionnels, établissements et partenaires de la nuit
      </p>
    </motion.div>
  );
};