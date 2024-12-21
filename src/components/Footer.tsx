import React from "react";
import { Building, Briefcase, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="mt-auto py-8 bg-white/80 backdrop-blur-sm border-t border-primary/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-2 text-primary">
            <Building className="h-6 w-6" />
            <span className="font-heading font-semibold">Lyon Digital Services</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <motion.a 
              href="https://lyondigitalservices.fr" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="h-5 w-5" />
              <span>Notre site web</span>
            </motion.a>
            
            <motion.a 
              href="mailto:contact@lyondigitalservices.fr"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Briefcase className="h-5 w-5" />
              <span>Contactez-nous</span>
            </motion.a>
          </div>
          
          <div className="text-sm text-gray-500">
            © 2024 Lyon Digital Services
          </div>
        </motion.div>
      </div>
    </footer>
  );
};