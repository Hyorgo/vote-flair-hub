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
      <ScrollArea className="w-full">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Prénom</TableHead>
                <TableHead className="min-w-[150px]">Nom</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
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
      </ScrollArea>
    </div>
  );
};