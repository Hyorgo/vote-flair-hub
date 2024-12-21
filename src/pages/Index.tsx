import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { VotingSection } from "@/components/VotingSection";
import { VotingTimer } from "@/components/VotingTimer";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { useVoting } from "@/hooks/useVoting";

const END_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime();

const Index = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const {
    currentCategory,
    setCurrentCategory,
    selections,
    handleVote,
    handleNavigation,
    categories,
    isLoading,
    error,
  } = useVoting();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = END_TIME - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("VOTES TERMINÉS");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-600">
            Une erreur est survenue
          </h2>
          <p className="text-gray-600 mt-2">
            Impossible de charger les données
          </p>
        </div>
      </Layout>
    );
  }

  if (!categories.length) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Aucune catégorie disponible
          </h2>
          <p className="text-gray-600 mt-2">
            Les catégories seront bientôt ajoutées
          </p>
        </div>
      </Layout>
    );
  }

  const progress = ((currentCategory + 1) / categories.length) * 100;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <VotingTimer timeLeft={timeLeft} progress={progress} />

        <CategoryNavigation
          categories={categories}
          currentCategory={currentCategory}
          selections={selections}
          onTabChange={(value) => setCurrentCategory(Number(value))}
        />

        <VotingSection
          category={categories[currentCategory]}
          selections={selections}
          onVote={handleVote}
          onNavigation={handleNavigation}
          isFirstCategory={currentCategory === 0}
          isLastCategory={currentCategory === categories.length - 1}
        />
      </div>
    </Layout>
  );
};

export default Index;