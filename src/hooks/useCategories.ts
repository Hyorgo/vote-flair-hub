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
          display_order,
          nominees (
            id,
            name,
            description,
            image_url,
            category_id
          )
        `)
        .order('display_order');

      if (error) {
        console.error("Error loading categories:", error);
        throw error;
      }

      return (data || []).map((category): Category => ({
        id: category.id,
        name: category.name,
        display_order: category.display_order,
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
      // Get the highest display_order
      const { data: categories, error: fetchError } = await supabase
        .from('categories')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const nextOrder = categories && categories.length > 0 
        ? (categories[0].display_order || 0) + 1 
        : 1;

      const { data, error } = await supabase
        .from('categories')
        .insert([{ name, display_order: nextOrder }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Succès",
        description: "La catégorie a été ajoutée avec succès.",
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
        title: "Succès",
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