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
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:shadow-2xl border border-primary/10 h-full"
    >
      <div className="relative mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
        <Icon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto text-primary relative z-10" />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-navy">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};