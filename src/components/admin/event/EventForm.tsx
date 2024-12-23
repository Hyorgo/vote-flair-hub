import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { EventFormData } from "./types";

interface EventFormProps {
  formData: EventFormData;
  setFormData: (data: EventFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isPending: boolean;
}

export const EventForm = ({ formData, setFormData, onSubmit, onCancel, isPending }: EventFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white/50 backdrop-blur-sm rounded-lg p-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Date et heure</label>
        <Input
          type="datetime-local"
          value={formData.event_date}
          onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Lieu</label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Adresse</label>
        <Input
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Nombre total de billets</label>
        <Input
          type="number"
          min="0"
          value={formData.total_tickets}
          onChange={(e) => setFormData({ ...formData, total_tickets: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Billets restants</label>
        <Input
          type="number"
          min="0"
          max={formData.total_tickets}
          value={formData.remaining_tickets}
          onChange={(e) => setFormData({ ...formData, remaining_tickets: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Mise à jour..." : "Enregistrer"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};