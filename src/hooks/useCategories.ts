import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/airtable";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(`
          id,
          name,
          nominees (
            id,
            name,
            description,
            image_url,
            category_id
          )
        `);

      if (error) {
        console.error("Error loading categories:", error);
        throw error;
      }

      return (data || []).map((category): Category => ({
        id: category.id,
        name: category.name,
        nominees: Array.isArray(category.nominees) ? category.nominees : []
      }));
    },
  });
};

export const useCategoryManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const categoriesQuery = useCategories();

  const addCategory = useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Catégorie ajoutée",
        description: "La nouvelle catégorie a été ajoutée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la catégorie.",
        variant: "destructive",
      });
      console.error("Error adding category:", error);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la catégorie.",
        variant: "destructive",
      });
      console.error("Error deleting category:", error);
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error,
    addCategory,
    deleteCategory,
  };
};