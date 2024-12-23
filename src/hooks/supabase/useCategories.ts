import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/airtable";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      console.log("Fetching categories from Supabase...");
      const { data: categories, error } = await supabase
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

      return (categories || []).map((category): Category => ({
        id: category.id,
        name: category.name,
        display_order: category.display_order,
        nominees: Array.isArray(category.nominees) ? category.nominees : []
      }));
    },
    staleTime: 5 * 60 * 1000, // Considérer les données comme fraîches pendant 5 minutes
    gcTime: 30 * 60 * 1000, // Garder en cache pendant 30 minutes
    refetchOnWindowFocus: false, // Ne pas recharger quand la fenêtre reprend le focus
    refetchOnReconnect: false, // Ne pas recharger lors de la reconnexion
  });
};