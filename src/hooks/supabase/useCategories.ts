import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/airtable";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
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

      return (data || []).map((category): Category => ({
        id: category.id,
        name: category.name,
        display_order: category.display_order,
        nominees: Array.isArray(category.nominees) ? category.nominees : []
      }));
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on reconnection
  });
};