import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useVotes = () => {
  const queryClient = useQueryClient();

  const createVote = useMutation({
    mutationFn: async (nomineeId: string) => {
      const { data, error } = await supabase
        .from("votes")
        .insert([{ nominee_id: nomineeId }])
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
    createVote,
  };
};