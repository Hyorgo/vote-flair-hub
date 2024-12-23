import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DateUpdates {
  startDate: Date;
  endDate: Date;
}

export const useVotingConfig = () => {
  const queryClient = useQueryClient();

  const { data: config, isLoading, error } = useQuery({
    queryKey: ["voting-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("voting_config")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateDates = useMutation({
    mutationFn: async ({ startDate, endDate }: DateUpdates) => {
      const { data, error } = await supabase
        .from("voting_config")
        .update({ 
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          updated_at: new Date().toISOString() 
        })
        .eq("id", config?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voting-config"] });
    },
  });

  return {
    config,
    isLoading,
    error,
    updateDates,
  };
};