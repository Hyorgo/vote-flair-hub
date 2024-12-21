import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Trophy, Crown, Award, Medal } from "lucide-react";

const Index = () => {
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

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 px-4 mt-8 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-20 sm:-top-24">
            <motion.div
              animate={{ rotate: [-10, 10] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <Crown className="w-16 h-16 sm:w-24 sm:h-24 text-primary opacity-20" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Les Lyon d'Or
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Célébrez l'excellence et participez à la reconnaissance des talents exceptionnels
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:shadow-2xl border border-primary/10"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
              <Trophy className="w-16 h-16 mx-auto text-primary relative z-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Excellence</h3>
            <p className="text-gray-600">Découvrez et récompensez les talents qui façonnent notre communauté</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:shadow-2xl border border-primary/10"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
              <Award className="w-16 h-16 mx-auto text-primary relative z-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Prestige</h3>
            <p className="text-gray-600">Une cérémonie unique célébrant l'innovation et le talent</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:shadow-2xl border border-primary/10"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
              <Medal className="w-16 h-16 mx-auto text-primary relative z-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Impact</h3>
            <p className="text-gray-600">Votre vote compte dans la reconnaissance de l'excellence</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="w-full flex justify-center"
        >
          <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">Inscription pour voter</h2>
            <RegistrationForm />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;