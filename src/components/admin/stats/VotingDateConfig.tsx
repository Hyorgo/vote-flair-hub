import { useVotingConfig } from '@/hooks/supabase/useVotingConfig';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-base sm:text-lg">Configuration des dates</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Date de début des votes</label>
          <input
            type="datetime-local"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={config?.start_date ? new Date(config.start_date).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleDateChange('start', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Date de fin des votes</label>
          <input
            type="datetime-local"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={config?.end_date ? new Date(config.end_date).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleDateChange('end', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};