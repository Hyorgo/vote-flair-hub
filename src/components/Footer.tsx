import React from "react";
import { Building, Briefcase, Globe, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="mt-auto py-12 bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-sm border-t border-primary/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {/* Branding Section */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-3 text-primary"
              whileHover={{ scale: 1.02 }}
            >
              <Building className="h-8 w-8" />
              <span className="font-heading font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                Lyon Digital Services
              </span>
            </motion.div>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Votre partenaire digital de confiance pour des solutions web innovantes et sur mesure.
            </p>
          </div>

          {/* Contact Links */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-lg text-gray-800">Contactez-nous</h3>
            <div className="space-y-4">
              <motion.a 
                href="https://lyondigitalservices.fr" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 hover:text-primary transition-all group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="flex items-center gap-2">
                  Notre site web
                  <ExternalLink className="h-4 w-4 opacity-50" />
                </span>
              </motion.a>
              
              <motion.a 
                href="mailto:contact@lyondigitalservices.fr"
                className="flex items-center gap-3 text-gray-600 hover:text-primary transition-all group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span>contact@lyondigitalservices.fr</span>
              </motion.a>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-lg text-gray-800">Nos Services</h3>
            <ul className="space-y-3 text-gray-600">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                Développement Web
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                Applications Mobiles
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                Solutions Cloud
              </motion.li>
            </ul>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-6 border-t border-gray-100 text-center text-sm text-gray-500"
        >
          © {new Date().getFullYear()} Lyon Digital Services. Tous droits réservés.
        </motion.div>
      </div>
    </footer>
  );
};