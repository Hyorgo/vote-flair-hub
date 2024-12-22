import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CreateNomineeData {
  categoryId: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export const useNominees = () => {
  const queryClient = useQueryClient();

  const createNominee = useMutation({
    mutationFn: async ({ categoryId, name, description, imageUrl }: CreateNomineeData) => {
      const { data, error } = await supabase
        .from("nominees")
        .insert([{
          category_id: categoryId,
          name,
          description,
          image_url: imageUrl
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    createNominee,
  };
};
