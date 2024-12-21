import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Features = () => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl w-full px-4 sm:px-6 lg:px-8"
    >
      {features.map((feature, index) => (
        <motion.div key={index} variants={itemVariants}>
          <FeatureCard {...feature} />
        </motion.div>
      ))}
    </motion.div>
  );
};