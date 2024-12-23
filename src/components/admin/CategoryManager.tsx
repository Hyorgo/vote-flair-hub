import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useCategoryManager } from "@/hooks/useCategories";
import { useNominees } from "@/hooks/useNominees";
import { AddCategoryForm } from "./AddCategoryForm";
import { CategoriesList } from "./CategoriesList";
import { ImportCategoriesForm } from "./ImportCategoriesForm";
import { DeleteAllCategoriesButton } from "./DeleteAllCategoriesButton";
import { Separator } from "@/components/ui/separator";
import { useCategoryDragAndDrop } from "@/hooks/useCategoryDragAndDrop";
import { Category, Nominee } from "@/types/airtable";

interface CategoryWithNomineeCount extends Omit<Category, 'nominees'> {
  nominees: number;
  nomineesList?: Nominee[];
  display_order: number;
}

export const CategoryManager = () => {
  const { isLoading } = useAdminAuth();
  const { categories, deleteCategory } = useCategoryManager();
  const { addNominee } = useNominees();
  const { handleDragEnd } = useCategoryDragAndDrop();
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithNomineeCount | null>(null);
  const [newNomineeName, setNewNomineeName] = useState("");
  const [newNomineeDescription, setNewNomineeDescription] = useState("");

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
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Gestion des catégories</h2>
        <DeleteAllCategoriesButton />
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

      <div className="overflow-x-auto">
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
          onReorder={(event) => handleDragEnd(event, categories)}
        />
      </div>
    </div>
  );
};