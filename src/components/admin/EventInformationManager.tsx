import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const fetchEventInformation = async () => {
  const { data, error } = await supabase
    .from("event_information")
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

export const EventInformationManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: eventInfo, isLoading } = useQuery({
    queryKey: ["eventInformation"],
    queryFn: fetchEventInformation,
  });

  const [formData, setFormData] = useState({
    event_date: "",
    location: "",
    address: "",
    total_tickets: "",
    remaining_tickets: "",
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from("event_information")
        .update({
          ...data,
          total_tickets: parseInt(data.total_tickets),
          remaining_tickets: parseInt(data.remaining_tickets),
          updated_at: new Date().toISOString(),
        })
        .eq("id", eventInfo?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventInformation"] });
      setIsEditing(false);
      toast({
        title: "Succès",
        description: "Les informations ont été mises à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      });
      console.error("Error updating event information:", error);
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!eventInfo) return null;

  const handleEdit = () => {
    setFormData({
      event_date: format(new Date(eventInfo.event_date), "yyyy-MM-dd'T'HH:mm"),
      location: eventInfo.location,
      address: eventInfo.address,
      total_tickets: eventInfo.total_tickets.toString(),
      remaining_tickets: eventInfo.remaining_tickets.toString(),
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white/50 backdrop-blur-sm rounded-lg p-6">
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
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Mise à jour..." : "Enregistrer"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
            Annuler
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Informations sur l'événement</h2>
        <Button onClick={handleEdit}>Modifier</Button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="font-medium">Date et heure</p>
          <p>{format(new Date(eventInfo.event_date), "dd/MM/yyyy HH:mm")}</p>
        </div>

        <div>
          <p className="font-medium">Lieu</p>
          <p>{eventInfo.location}</p>
        </div>

        <div>
          <p className="font-medium">Adresse</p>
          <p>{eventInfo.address}</p>
        </div>

        <div>
          <p className="font-medium">Nombre total de billets</p>
          <p>{eventInfo.total_tickets}</p>
        </div>

        <div>
          <p className="font-medium">Billets restants</p>
          <p>{eventInfo.remaining_tickets}</p>
        </div>
      </div>
    </div>
  );
};