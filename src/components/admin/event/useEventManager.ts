import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { EventInfo, EventFormData } from "./types";

const fetchEventInformation = async () => {
  const { data, error } = await supabase
    .from("event_information")
    .select("*")
    .single();

  if (error) throw error;
  return data as EventInfo;
};

export const useEventManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    event_date: "",
    location: "",
    address: "",
    total_tickets: "",
    remaining_tickets: "",
  });

  const { data: eventInfo, isLoading } = useQuery({
    queryKey: ["eventInformation"],
    queryFn: fetchEventInformation,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
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

  const handleEdit = () => {
    if (!eventInfo) return;
    
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

  return {
    eventInfo,
    isLoading,
    isEditing,
    formData,
    setFormData,
    handleEdit,
    handleSubmit,
    updateMutation,
    setIsEditing,
  };
};