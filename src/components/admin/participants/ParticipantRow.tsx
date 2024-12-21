import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface ParticipantRowProps {
  participant: Participant;
  editingId: string | null;
  editForm: Participant | null;
  onEdit: (participant: Participant) => void;
  onSave: () => void;
  onCancel: () => void;
  setEditForm: (form: Participant) => void;
}

export const ParticipantRow = ({
  participant,
  editingId,
  editForm,
  onEdit,
  onSave,
  onCancel,
  setEditForm,
}: ParticipantRowProps) => {
  return (
    <TableRow>
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
            <Button variant="outline" size="icon" onClick={onSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(participant)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};