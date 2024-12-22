import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: Trophy,
    title: "Excellence",
    description: "Découvrez et récompensez les talents qui façonnent notre communauté",
  },
  {
    icon: Award,
    title: "Prestige",
    description: "Une cérémonie unique célébrant l'innovation et le talent",
  },
  {
    icon: Medal,
    title: "Impact",
    description: "Votre vote compte dans la reconnaissance de l'excellence",
  },
];

export const Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <FeatureCard {...feature} />
        </motion.div>
      ))}
    </motion.div>
  );
};