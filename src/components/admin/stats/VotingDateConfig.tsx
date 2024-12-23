import { useVotingConfig } from '@/hooks/supabase/useVotingConfig';
import { useToast } from '@/hooks/use-toast';

export const VotingDateConfig = () => {
  const { toast } = useToast();
  const { config, updateDates } = useVotingConfig();

  const handleDateChange = async (type: 'start' | 'end', value: string) => {
    try {
      const newDate = new Date(value);
      const updates = {
        startDate: type === 'start' ? newDate : config?.start_date ? new Date(config.start_date) : new Date(),
        endDate: type === 'end' ? newDate : config?.end_date ? new Date(config.end_date) : new Date()
      };

      await updateDates.mutateAsync(updates);
      toast({
        title: "Dates mises à jour",
        description: "Les nouvelles dates ont été enregistrées.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les dates.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Date de début des votes</h3>
        <input
          type="datetime-local"
          className="w-full rounded-md border-gray-300"
          value={config?.start_date ? new Date(config.start_date).toISOString().slice(0, 16) : ''}
          onChange={(e) => handleDateChange('start', e.target.value)}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Date de fin des votes</h3>
        <input
          type="datetime-local"
          className="w-full rounded-md border-gray-300"
          value={config?.end_date ? new Date(config.end_date).toISOString().slice(0, 16) : ''}
          onChange={(e) => handleDateChange('end', e.target.value)}
        />
      </div>
    </div>
  );
};