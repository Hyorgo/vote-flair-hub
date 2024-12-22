import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddNomineeParams {
  categoryId: string;
  name: string;
  description: string;
}

export const useNominees = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addNominee = useMutation({
    mutationFn: async ({ categoryId, name, description }: AddNomineeParams) => {
      const { data, error } = await supabase
        .from('nominees')
        .insert([{
          category_id: categoryId,
          name,
          description,
          image_url: "https://images.unsplash.com/photo-1527576539890-dfa815648363"
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Nominé ajouté",
        description: "Le nouveau nominé a été ajouté avec succès.",
      });
    }
  });

  return { addNominee };
};