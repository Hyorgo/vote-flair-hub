import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data: categories, error } = await supabase
        .from("categories")
        .select(`
          id,
          name,
          nominees (
            id,
            name,
            description,
            image_url
          )
        `);

      if (error) {
        console.error("Error loading categories:", error);
        throw error;
      }

      return categories || [];
    },
  });
};