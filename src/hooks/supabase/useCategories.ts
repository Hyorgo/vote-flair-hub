import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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

      if (error) throw error;

      return (data || []).map((category): Category => ({
        id: category.id,
        name: category.name,
        nominees: category.nominees || []
      }));
    },
  });
};