import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Star, Users, ArrowRight, Award, Crown, Medal } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6 relative"
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-24 h-24 text-primary opacity-20" />
            </motion.div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Les Lyon d'Or
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
          className="text-center space-y-6"
        >
          <Link to="/categories">
            <Button
              size="lg"
              className="text-lg group bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-6"
            >
              Participer aux votes
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 animate-pulse">
            Les votes sont ouverts - Faites entendre votre voix !
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;