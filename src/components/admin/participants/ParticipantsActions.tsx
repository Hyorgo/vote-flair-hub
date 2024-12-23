import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, Trash2 } from "lucide-react";

interface ParticipantsActionsProps {
  onDeleteAll: () => Promise<void>;
  onExportCSV: () => void;
}

export const ParticipantsActions = ({
  onDeleteAll,
  onExportCSV,
}: ParticipantsActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full sm:w-auto">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer tous les participants
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Elle supprimera définitivement tous
              les participants de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDeleteAll}
              className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button onClick={onExportCSV} variant="outline" className="w-full sm:w-auto">
        <Download className="h-4 w-4 mr-2" />
        Exporter CSV
      </Button>
    </div>
  );
};