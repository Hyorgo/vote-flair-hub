import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Nominee {
  id: string;
  name: string;
  description: string;
  image_url?: string;
}

export const useNomineeManagement = (categoryId: string) => {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [showNominees, setShowNominees] = useState(false);
  const { toast } = useToast();

  const loadNominees = useCallback(async () => {
    const { data, error } = await supabase
      .from('nominees')
      .select('*')
      .eq('category_id', categoryId);

    if (error) {
      console.error("Error loading nominees:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les nominés",
        variant: "destructive",
      });
      return;
    }

    setNominees(data || []);
  }, [categoryId, toast]);

  const handleDeleteNominee = async (nomineeId: string) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .delete()
        .eq('id', nomineeId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Le nominé a été supprimé",
      });

      loadNominees();
    } catch (error) {
      console.error("Error deleting nominee:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le nominé",
        variant: "destructive",
      });
    }
  };

  const handleAddNomineeWithImage = async (
    name: string,
    description: string,
    imageUrl?: string
  ) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .insert([{
          category_id: categoryId,
          name: name.trim(),
          description: description.trim(),
          image_url: imageUrl
        }]);

      if (error) {
        console.error("Error adding nominee:", error);
        throw error;
      }

      toast({
        title: "Succès",
        description: "Le nominé a été ajouté",
      });

      await loadNominees();
    } catch (error) {
      console.error("Error adding nominee:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le nominé",
        variant: "destructive",
      });
    }
  };

  return {
    nominees,
    showNominees,
    setShowNominees,
    loadNominees,
    handleDeleteNominee,
    handleAddNomineeWithImage
  };
};