import React from "react";
import { Layout } from "@/components/Layout";
import { VotingSection } from "@/components/VotingSection";
import { VotingTimer } from "@/components/VotingTimer";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { useVoting } from "@/hooks/useVoting";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

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

  React.useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  const handleComplete = () => {
    navigate("/thanks");
  };

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
      {/* Effets de fond festifs */}
      <div className="golden-halo" />
      <div className="bokeh-1" />
      <div className="bokeh-2" />
      <div className="bokeh-3" />
      <div className="bokeh-4" />
      <div className="bokeh-corners" />
      <div className="bokeh-corners-bottom" />
      
      <div className="max-w-5xl mx-auto">
        <VotingTimer />

        {userProfile && (
          <div className="mb-6 text-2xl font-bold text-white">
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

        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleComplete}
            variant="outline"
            size="lg"
            className="text-lg gap-2 py-6 px-8 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white group relative"
          >
            <CheckCircle className="h-6 w-6 text-[#DAA520]/80 group-hover:text-white transition-colors" />
            <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
              J'ai terminé mon vote !
            </span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;