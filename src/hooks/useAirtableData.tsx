import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, getNominees, addVote } from '@/lib/airtable';

export const useAirtableData = () => {
  const queryClient = useQueryClient();

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const nominees = useQuery({
    queryKey: ['nominees'],
    queryFn: getNominees,
  });

  const voteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nominees'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    categories,
    nominees,
    voteMutation,
  };
};