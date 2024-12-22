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

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative py-8"
      >
        {/* Effet de bokeh/brillance en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-24 h-24 rounded-full bg-gradient-to-r 
                from-purple-500/30 via-pink-500/30 to-yellow-500/30 
                blur-xl animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Effet de halo lumineux */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 blur-2xl rounded-full" />
        
        {/* Le chiffre 2025 */}
        <motion.h2 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-extrabold relative"
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [-1, 1, -1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="relative inline-block">
            {/* Effet de reflet/brillance */}
            <span className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent blur-sm" />
            
            {/* Texte principal avec dégradé animé */}
            <span className="relative bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] 
              bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]
              motion-safe:hover:animate-party">
              2025
            </span>
          </span>
        </motion.h2>
      </motion.div>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mx-auto leading-relaxed font-medium">
        Célébrez l'excellence et participez à la reconnaissance des talents exceptionnels
      </p>
    </motion.div>
  );
};