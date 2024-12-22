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
      className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:shadow-2xl border border-primary/10 h-full w-full"
    >
      <div className="relative mb-3 sm:mb-4">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto text-primary relative z-10" />
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-navy">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};