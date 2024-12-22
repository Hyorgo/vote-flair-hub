import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useCategoryManager } from "@/hooks/useCategories";
import { useNominees } from "@/hooks/useNominees";
import { AddCategoryForm } from "./AddCategoryForm";
import { CategoriesList } from "./CategoriesList";
import { ImportCategoriesForm } from "./ImportCategoriesForm";
import { Category, Nominee } from "@/types/airtable";
import { Separator } from "@/components/ui/separator";
import { DragEndEvent } from "@dnd-kit/core";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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

interface CategoryWithNomineeCount extends Omit<Category, 'nominees'> {
  nominees: number;
  nomineesList?: Nominee[];
  display_order: number;
}

export const CategoryManager = () => {
  const { isLoading } = useAdminAuth();
  const { categories, deleteCategory } = useCategoryManager();
  const { addNominee } = useNominees();
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithNomineeCount | null>(null);
  const [newNomineeName, setNewNomineeName] = useState("");
  const [newNomineeDescription, setNewNomineeDescription] = useState("");
  const { toast } = useToast();

  const handleDeleteAllCategories = async () => {
    try {
      // Supprimer d'abord tous les nominés (la suppression en cascade s'occupera des votes)
      const { error: nomineesError } = await supabase
        .from('nominees')
        .delete()
        .neq('id', ''); // Condition pour supprimer tous les enregistrements

      if (nomineesError) throw nomineesError;

      // Ensuite, supprimer toutes les catégories
      const { error: categoriesError } = await supabase
        .from('categories')
        .delete()
        .neq('id', ''); // Condition pour supprimer tous les enregistrements

      if (categoriesError) throw categoriesError;

      toast({
        title: "Succès",
        description: "Toutes les catégories et nominés ont été supprimés",
      });

      // Recharger la page pour mettre à jour l'interface
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

  const handleAddNominee = (categoryId: string) => {
    if (!newNomineeName.trim() || !newNomineeDescription.trim()) return;

    addNominee.mutate({
      categoryId,
      name: newNomineeName.trim(),
      description: newNomineeDescription.trim()
    });
    
    setNewNomineeName("");
    setNewNomineeDescription("");
    setSelectedCategory(null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    const activeCategory = categories.find(cat => cat.id === active.id);
    const overCategory = categories.find(cat => cat.id === over.id);

    if (!activeCategory || !overCategory) {
      return;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .update({ display_order: overCategory.display_order })
        .eq('id', activeCategory.id);

      if (error) throw error;

      const { error: error2 } = await supabase
        .from('categories')
        .update({ display_order: activeCategory.display_order })
        .eq('id', overCategory.id);

      if (error2) throw error2;

      toast({
        title: "Succès",
        description: "L'ordre des catégories a été mis à jour",
      });

      window.location.reload();
    } catch (error) {
      console.error('Error updating category order:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'ordre des catégories",
        variant: "destructive",
      });
    }
  };

  const categoriesWithCount = categories
    .map(category => ({
      ...category,
      nominees: category.nominees.length,
      nomineesList: category.nominees,
      display_order: category.display_order || 0
    }))
    .sort((a, b) => a.display_order - b.display_order);

  if (isLoading) {
    return <div>Chargement de l'interface d'administration...</div>;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des catégories</h2>
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
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Ajouter une catégorie</h3>
          <AddCategoryForm />
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Importer des catégories</h3>
          <ImportCategoriesForm />
        </div>
        
        <Separator />
      </div>

      <CategoriesList
        categories={categoriesWithCount}
        handleDeleteCategory={(id) => deleteCategory.mutate(id)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        newNomineeName={newNomineeName}
        setNewNomineeName={setNewNomineeName}
        newNomineeDescription={newNomineeDescription}
        setNewNomineeDescription={setNewNomineeDescription}
        handleAddNominee={handleAddNominee}
        onReorder={handleDragEnd}
      />
    </div>
  );
};