import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NomineeForm } from "./NomineeForm";

interface CategoryActionsProps {
  categoryId: string;
  categoryName: string;
  onEdit: () => void;
  onDelete: () => void;
  newNomineeName: string;
  setNewNomineeName: (name: string) => void;
  newNomineeDescription: string;
  setNewNomineeDescription: (description: string) => void;
  handleAddNominee: (name: string, description: string, imageUrl?: string) => void;
}

export const CategoryActions = ({
  categoryId,
  categoryName,
  onEdit,
  onDelete,
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNominee,
}: CategoryActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <UserPlus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nominé à {categoryName}</DialogTitle>
          </DialogHeader>
          <NomineeForm
            newNomineeName={newNomineeName}
            setNewNomineeName={setNewNomineeName}
            newNomineeDescription={newNomineeDescription}
            setNewNomineeDescription={setNewNomineeDescription}
            handleAddNominee={handleAddNominee}
          />
        </DialogContent>
      </Dialog>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};