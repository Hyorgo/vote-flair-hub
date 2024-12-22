import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";

import { ParticipantRow } from "./ParticipantRow";
import { exportToCSV } from "@/utils/csvExport";

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const ParticipantsTable = () => {
  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Participant | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetchParticipants();
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleExportCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exporter CSV
        </Button>
      </div>
      <div className="bg-white rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prénom</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <ParticipantRow
                key={participant.id}
                participant={participant}
                editingId={editingId}
                editForm={editForm}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                setEditForm={setEditForm}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
