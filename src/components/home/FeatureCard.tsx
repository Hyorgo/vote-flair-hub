import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:shadow-2xl border border-primary/10 relative overflow-hidden group"
    >
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-0 bg-primary/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Icon className="w-16 h-16 mx-auto text-primary relative z-10" />
        </motion.div>
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};