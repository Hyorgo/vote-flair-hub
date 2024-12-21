import React from "react";
import { Globe, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const ContactLinks = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-lg text-white">Contactez-nous</h3>
      <div className="space-y-4">
        <motion.a 
          href="https://www.ideai.fr" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white hover:text-navy transition-all group"
          whileHover={{ x: 5 }}
        >
          <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Globe className="h-5 w-5" />
          </div>
          <span className="flex items-center gap-2">
            www.ideai.fr
            <ExternalLink className="h-4 w-4 opacity-50" />
          </span>
        </motion.a>
        
        <motion.a 
          href="mailto:contact@ideai.fr"
          className="flex items-center gap-3 text-white hover:text-navy transition-all group"
          whileHover={{ x: 5 }}
        >
          <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Mail className="h-5 w-5" />
          </div>
          <span>contact@ideai.fr</span>
        </motion.a>
      </div>
    </div>
  );
};