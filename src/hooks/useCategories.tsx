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

      // Vérification et transformation des données
      if (!categories || !Array.isArray(categories)) {
        console.warn("Categories data is not an array:", categories);
        return [];
      }

      const formattedCategories = categories.map((category): Category => {
        // Vérification que category.nominees est un tableau
        const nominees = Array.isArray(category.nominees) 
          ? category.nominees 
          : [];

        return {
          id: category.id,
          name: category.name,
          nominees: nominees.map((nominee): Nominee => ({
            id: nominee.id,
            name: nominee.name,
            description: nominee.description || "",
            image_url: nominee.image_url,
            category_id: nominee.category_id
          }))
        };
      });

      console.log("Formatted categories:", formattedCategories);
      return formattedCategories;
    },
  });
};