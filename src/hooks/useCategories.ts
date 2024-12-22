import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

      // Transform the data to match the expected type and ensure nominees is always an array
      return (data || []).map((category): Category => ({
        id: category.id,
        name: category.name,
        nominees: Array.isArray(category.nominees) ? category.nominees : []
      }));
    },
  });
};
