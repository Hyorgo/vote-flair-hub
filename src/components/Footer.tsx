import React from "react";
import { motion } from "framer-motion";
import { BrandingSection } from "./footer/BrandingSection";
import { ContactLinks } from "./footer/ContactLinks";
import { ServicesSection } from "./footer/ServicesSection";
import { Copyright } from "./footer/Copyright";

export const Footer = () => {
  return (
    <footer className="mt-auto py-12 bg-white/30 backdrop-blur-md border-t border-white/10 shadow-lg supports-[backdrop-filter]:bg-white/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
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