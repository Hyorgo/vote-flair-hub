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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <TooltipProvider>
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajouter un nominé</p>
            </TooltipContent>
          </Tooltip>
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

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onEdit}
              className="hover:bg-blue-500/10 hover:text-blue-500 transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Modifier la catégorie</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onDelete}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Supprimer la catégorie</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};