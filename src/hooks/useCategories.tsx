import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Category, Nominee } from "@/types/airtable";

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
            image_url,
            category_id
          )
        `);

      if (error) {
        console.error("Error loading categories:", error);
        throw error;
      }

      // Ajouter des logs pour déboguer
      console.log("Raw categories data:", categories);

      // S'assurer que les données sont correctement formatées
      const formattedCategories = (categories || []).map((category): Category => ({
        id: category.id,
        name: category.name,
        nominees: Array.isArray(category.nominees) ? category.nominees.map((nominee): Nominee => ({
          id: nominee.id,
          name: nominee.name,
          description: nominee.description,
          image_url: nominee.image_url,
          category_id: nominee.category_id
        })) : []
      }));

      console.log("Formatted categories:", formattedCategories);
      return formattedCategories;
    },
  });
};