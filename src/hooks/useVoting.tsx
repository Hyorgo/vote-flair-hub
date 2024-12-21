import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "./supabase/useCategories";
import { useVotes } from "./supabase/useVotes";

export const useVoting = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { data: categories, isLoading, error } = useCategories();
  const { createVote } = useVotes();

  const handleVote = async (nomineeId: string) => {
    const categoryId = categories?.[currentCategory]?.id;
    if (!categoryId) return;

    const isModifying = selections[categoryId] === nomineeId;

    try {
      if (!isModifying) {
        await createVote.mutateAsync(nomineeId);
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
    } catch (error) {
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