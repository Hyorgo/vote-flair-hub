import React from "react";
import { Layout } from "@/components/Layout";
import { VotingSection } from "@/components/VotingSection";
import { VotingTimer } from "@/components/VotingTimer";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { useVoting } from "@/hooks/useVoting";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
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

  // Récupérer les informations de l'utilisateur depuis le localStorage
  const userEmail = localStorage.getItem("userEmail");

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", userEmail],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userEmail,
  });

  // Rediriger vers la page d'accueil si pas d'email
  React.useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

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

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <VotingTimer />

        {userProfile && (
          <div className="mb-6 text-2xl font-bold text-primary text-center">
            Bienvenue {userProfile.first_name} ! 🎉
          </div>
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
      </div>
    </Layout>
  );
};

export default Categories;