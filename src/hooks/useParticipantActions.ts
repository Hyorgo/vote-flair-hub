import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { exportToCSV } from "@/utils/csvExport";
import type { Participant } from "./useParticipantsData";

export const useParticipantActions = (
  participants: Participant[],
  refreshParticipants: () => Promise<void>
) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Participant | null>(null);
  const { toast } = useToast();

  const handleDeleteAll = async () => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .delete()
        .not("id", "is", null);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Tous les participants ont été supprimés",
      });
      refreshParticipants();
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

      toast({
        title: "Succès",
        description: "Les informations ont été mises à jour",
      });
      refreshParticipants();
    } catch (error) {
      console.error("Error updating participant:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les informations",
        variant: "destructive",
      });
    } finally {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  return {
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