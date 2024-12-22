import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Vote {
  nominee_id: string;
  category_id: string;
  email: string;
}

export const useVotes = () => {
  const queryClient = useQueryClient();

  const addVotes = useMutation({
    mutationFn: async (votes: Vote[]) => {
      const { data, error } = await supabase
        .from('votes')
        .insert(votes)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });

  return {
    addVotes,
  };
};