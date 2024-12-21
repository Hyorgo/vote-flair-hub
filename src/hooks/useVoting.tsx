import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "./supabase/useCategories";
import { supabase } from "@/lib/supabase";

export const useVoting = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { data: categories, isLoading, error } = useCategories();

  const handleVote = async (nomineeId: string) => {
    const categoryId = categories?.[currentCategory]?.id;
    if (!categoryId) return;

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      toast({
        title: "Session expirée",
        description: "Veuillez vous reconnecter",
        variant: "destructive",
      });
      return;
    }

    const isModifying = selections[categoryId] === nomineeId;

    try {
      if (!isModifying) {
        const { error: voteError } = await supabase
          .from("votes")
          .insert([
            {
              nominee_id: nomineeId,
              category_id: categoryId,
              email: userEmail,
            },
          ]);

        if (voteError) throw voteError;
      }

      setSelections((prev) => ({
        ...prev,
        [categoryId]: isModifying ? "" : nomineeId,
      }));

      toast({
        title: isModifying ? "Vote annulé !" : "Vote enregistré !",
        description: isModifying
          ? "Vous pouvez maintenant choisir un autre nominé"
          : "Cliquez à nouveau sur le même nominé pour modifier votre vote",
        className: "animate-bounce",
      });
    } catch (error: any) {
      console.error("Error voting:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du vote",
        variant: "destructive",
      });
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentCategory((prev) =>
      direction === "next"
        ? Math.min(prev + 1, (categories?.length || 1) - 1)
        : Math.max(prev - 1, 0)
    );
  };

  return {
    currentCategory,
    setCurrentCategory,
    selections,
    handleVote,
    handleNavigation,
    categories: categories || [],
    isLoading,
    error,
  };
};