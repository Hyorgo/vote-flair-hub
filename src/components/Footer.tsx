import React from "react";
import { motion } from "framer-motion";
import { BrandingSection } from "./footer/BrandingSection";
import { ContactLinks } from "./footer/ContactLinks";
import { ServicesSection } from "./footer/ServicesSection";
import { Copyright } from "./footer/Copyright";

export const Footer = () => {
  return (
    <footer className="relative mt-auto py-12 bg-white/30 backdrop-blur-md border-t border-white/10 shadow-lg supports-[backdrop-filter]:bg-white/30 overflow-hidden">
      {/* Halos animés du footer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Halo violet */}
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[80px] animate-float bottom-[-20%] left-[-10%]" />
        
        {/* Halo bleu */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[70px] animate-float delay-1000 bottom-[-30%] right-[-5%]" />
        
        {/* Halo rose */}
        <div className="absolute w-[700px] h-[700px] bg-pink-500/15 rounded-full blur-[90px] animate-bounce-light bottom-[-40%] left-[30%]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start"
        >
          <BrandingSection />
          <ContactLinks />
          <ServicesSection />
        </motion.div>
        <Copyright />
      </div>
    </footer>
  );
};