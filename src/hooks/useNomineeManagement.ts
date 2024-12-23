import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Nominee {
  id: string;
  name: string;
  description: string;
  image_url?: string;
}

export const useNomineeManagement = (categoryId: string) => {
  const [showNominees, setShowNominees] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: nominees = [], isLoading, error } = useQuery({
    queryKey: ['nominees', categoryId],
    queryFn: async () => {
      console.log("Loading nominees for category:", categoryId);
      const { data, error } = await supabase
        .from('nominees')
        .select('*')
        .eq('category_id', categoryId);

      if (error) {
        console.error("Error loading nominees:", error);
        throw new Error(`Impossible de charger les nominés: ${error.message}`);
      }

      return data || [];
    },
    enabled: showNominees, // Ne charge que si showNominees est true
    staleTime: 5 * 60 * 1000, // Cache pendant 5 minutes
    retry: 3,
  });

  const deleteMutation = useMutation({
    mutationFn: async (nomineeId: string) => {
      const { error } = await supabase
        .from('nominees')
        .delete()
        .eq('id', nomineeId);

      if (error) throw new Error(`Impossible de supprimer le nominé: ${error.message}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nominees', categoryId] });
      toast({
        title: "Succès",
        description: "Le nominé a été supprimé",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addNomineeMutation = useMutation({
    mutationFn: async ({
      name,
      description,
      imageUrl
    }: {
      name: string;
      description: string;
      imageUrl?: string;
    }) => {
      const { error, data } = await supabase
        .from('nominees')
        .insert([{
          category_id: categoryId,
          name: name.trim(),
          description: description.trim(),
          image_url: imageUrl
        }])
        .select();

      if (error) throw new Error(`Impossible d'ajouter le nominé: ${error.message}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nominees', categoryId] });
      toast({
        title: "Succès",
        description: "Le nominé a été ajouté",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    nominees,
    isLoading,
    error,
    showNominees,
    setShowNominees,
    handleDeleteNominee: deleteMutation.mutate,
    handleAddNomineeWithImage: (name: string, description: string, imageUrl?: string) =>
      addNomineeMutation.mutate({ name, description, imageUrl })
  };
};