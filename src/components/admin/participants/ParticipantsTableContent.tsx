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
import type { Participant } from "./useParticipants";

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
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              setEditForm={setEditForm}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};