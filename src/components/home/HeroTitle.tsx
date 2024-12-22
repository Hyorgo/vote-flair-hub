import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-4xl mx-auto px-4"
    >
      <motion.div
        animate={{ rotate: [-5, 5] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="relative w-fit mx-auto mb-4"
      >
        <Crown 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" 
          color="#FFD700"
        />
      </motion.div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold font-heading">
        <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent font-extrabold">
          Lyon d'Or
        </span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mx-auto leading-relaxed font-medium">
        Célébrez l'excellence et participez à la reconnaissance des talents exceptionnels
      </p>
    </motion.div>
  );
};