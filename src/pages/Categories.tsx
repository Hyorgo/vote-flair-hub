import React from "react";
import { Layout } from "@/components/Layout";
import { VotingSection } from "@/components/VotingSection";
import { VotingTimer } from "@/components/VotingTimer";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { useVoting } from "@/hooks/useVoting";
import { useUserProfile } from "@/hooks/useUserProfile";
import { CompleteVotingButton } from "@/components/voting/CompleteVotingButton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorDisplay } from "@/components/ui/error-display";
import { SocialShare } from "@/components/voting/SocialShare";

const Categories = () => {
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

  const { userProfile } = useUserProfile();

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorDisplay 
          title="Une erreur est survenue"
          description="Impossible de charger les données"
        />
      </Layout>
    );
  }

  if (!categories.length) {
    return (
      <Layout>
        <ErrorDisplay 
          title="Aucune catégorie disponible"
          description="Les catégories seront bientôt ajoutées"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <BackgroundEffects />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <VotingTimer />

        {userProfile && (
          <WelcomeMessage name={userProfile.first_name} />
        )}

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

        <div className="mt-8 space-y-6">
          <CompleteVotingButton />
          <SocialShare />
        </div>
      </div>
    </Layout>
  );
};

const BackgroundEffects = () => (
  <>
    <div className="golden-halo" />
    <div className="bokeh-1" />
    <div className="bokeh-2" />
    <div className="bokeh-3" />
    <div className="bokeh-4" />
    <div className="bokeh-corners" />
    <div className="bokeh-corners-bottom" />
  </>
);

const WelcomeMessage = ({ name }: { name: string }) => (
  <div className="space-y-2 mb-6">
    <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
      Bienvenue {name} ! 🎉
    </h2>
    <p className="text-white/90 text-base sm:text-lg text-center sm:text-left animate-fade-in">
      C'est le moment de faire entendre votre voix ! Parcourez les catégories et votez pour vos nominés préférés. Chaque vote compte pour célébrer l'excellence ! ✨
    </p>
  </div>
);

export default Categories;