import { useVotingConfig } from '@/hooks/supabase/useVotingConfig';
import { useToast } from '@/hooks/use-toast';

export const VotingEndDate = () => {
  const { toast } = useToast();
  const { config, updateEndDate } = useVotingConfig();

  const handleEndDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateEndDate.mutateAsync(new Date(e.target.value));
      toast({
        title: "Date de fin mise à jour",
        description: "La nouvelle date de fin des votes a été enregistrée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la date de fin des votes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">Date de fin des votes</h3>
      <input
        type="datetime-local"
        className="mt-1 w-full rounded-md border-gray-300"
        value={config?.end_date ? new Date(config.end_date).toISOString().slice(0, 16) : ''}
        onChange={handleEndDateChange}
      />
    </div>
  );
};