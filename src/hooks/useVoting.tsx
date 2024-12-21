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
        duration: 3000, // Ajout d'une durée de 3 secondes
      });
      return;
    }

    const isModifying = selections[categoryId] === nomineeId;

    try {
      const { data: existingVotes } = await supabase
        .from("votes")
        .select("id")
        .eq("category_id", categoryId)
        .eq("email", userEmail)
        .single();

      if (existingVotes) {
        if (isModifying) {
          const { error: deleteError } = await supabase
            .from("votes")
            .delete()
            .eq("id", existingVotes.id);

          if (deleteError) throw deleteError;
        } else {
          const { error: updateError } = await supabase
            .from("votes")
            .update({ nominee_id: nomineeId })
            .eq("id", existingVotes.id);

          if (updateError) throw updateError;
        }
      } else if (!isModifying) {
        const { error: insertError } = await supabase
          .from("votes")
          .insert([
            {
              nominee_id: nomineeId,
              category_id: categoryId,
              email: userEmail,
            },
          ]);

        if (insertError) throw insertError;
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
        duration: 3000, // Ajout d'une durée de 3 secondes
      });
    } catch (error: any) {
      console.error("Error voting:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du vote",
        variant: "destructive",
        duration: 3000, // Ajout d'une durée de 3 secondes
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