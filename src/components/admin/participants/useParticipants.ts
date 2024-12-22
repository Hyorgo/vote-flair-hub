import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { exportToCSV } from "@/utils/csvExport";

export interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Participant | null>(null);
  const { toast } = useToast();

  const fetchParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les participants",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .delete()
        .neq("id", "dummy");

      if (error) throw error;

      setParticipants([]);
      toast({
        title: "Succès",
        description: "Tous les participants ont été supprimés",
      });
    } catch (error) {
      console.error("Error deleting all participants:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les participants",
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = () => {
    const exportData = participants.map(({ first_name, last_name, email }) => ({
      first_name,
      last_name,
      email,
    }));
    exportToCSV(exportData, "participants");
    toast({
      title: "Succès",
      description: "Le fichier CSV a été téléchargé",
    });
  };

  const handleEdit = (participant: Participant) => {
    setEditingId(participant.id);
    setEditForm({ ...participant });
  };

  const handleSave = async () => {
    if (!editForm) return;

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
        })
        .eq("id", editForm.id);

      if (error) throw error;

      setParticipants(
        participants.map((p) => (p.id === editForm.id ? editForm : p))
      );
      toast({
        title: "Succès",
        description: "Les informations ont été mises à jour",
      });
    } catch (error) {
      console.error("Error updating participant:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les informations",
        variant: "destructive",
      });
    } finally {
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return {
    participants,
    isLoading,
    editingId,
    editForm,
    setEditForm,
    handleDeleteAll,
    handleExportCSV,
    handleEdit,
    handleSave,
    handleCancel,
  };
};