import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Pencil, Save, X } from "lucide-react";

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
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
            <TableRow key={participant.id}>
              <TableCell>
                {editingId === participant.id ? (
                  <Input
                    value={editForm?.first_name || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm!,
                        first_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  participant.first_name
                )}
              </TableCell>
              <TableCell>
                {editingId === participant.id ? (
                  <Input
                    value={editForm?.last_name || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm!,
                        last_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  participant.last_name
                )}
              </TableCell>
              <TableCell>
                {editingId === participant.id ? (
                  <Input
                    value={editForm?.email || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm!,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  participant.email
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === participant.id ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(participant)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};