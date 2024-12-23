import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ParticipantRow } from "./ParticipantRow";
import type { Participant } from "@/hooks/useParticipantsData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface ParticipantsTableContentProps {
  participants: Participant[];
  editingId: string | null;
  editForm: Participant | null;
  onEdit: (participant: Participant) => void;
  onSave: () => void;
  onCancel: () => void;
  setEditForm: (form: Participant) => void;
}

export const ParticipantsTableContent = ({
  participants,
  editingId,
  editForm,
  onEdit,
  onSave,
  onCancel,
  setEditForm,
}: ParticipantsTableContentProps) => {
  return (
    <Card className="mt-6 overflow-hidden bg-white/50 backdrop-blur-sm">
      <ScrollArea className="w-full rounded-md border">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Prénom</TableHead>
                <TableHead className="w-[200px]">Nom</TableHead>
                <TableHead className="min-w-[250px]">Email</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Aucun participant trouvé
                  </TableCell>
                </TableRow>
              ) : (
                participants.map((participant) => (
                  <ParticipantRow
                    key={participant.id}
                    participant={participant}
                    editingId={editingId}
                    editForm={editForm}
                    onEdit={onEdit}
                    onSave={onSave}
                    onCancel={onCancel}
                    setEditForm={setEditForm}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </Card>
  );
};