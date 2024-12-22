import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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

export const DeleteAllCategoriesButton = () => {
  const { toast } = useToast();

  const handleDeleteAllCategories = async () => {
    try {
      const { error: nomineesError } = await supabase
        .from('nominees')
        .delete()
        .neq('id', '');

      if (nomineesError) throw nomineesError;

      const { error: categoriesError } = await supabase
        .from('categories')
        .delete()
        .neq('id', '');

      if (categoriesError) throw categoriesError;

      toast({
        title: "Succès",
        description: "Toutes les catégories et nominés ont été supprimés",
      });

      window.location.reload();
    } catch (error) {
      console.error('Error deleting all categories:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          Tout supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action supprimera définitivement toutes les catégories et leurs nominés associés.
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAllCategories} className="bg-red-500 hover:bg-red-600">
            Supprimer tout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};