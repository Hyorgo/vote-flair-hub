import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useCategoryManager } from "@/hooks/useCategories";
import { useNominees } from "@/hooks/useNominees";
import { AddCategoryForm } from "./AddCategoryForm";
import { CategoriesList } from "./CategoriesList";
import { ImportCategoriesForm } from "./ImportCategoriesForm";
import { Category, Nominee } from "@/types/airtable";
import { Separator } from "@/components/ui/separator";

interface CategoryWithNomineeCount extends Omit<Category, 'nominees'> {
  nominees: number;
  nomineesList?: Nominee[];
}

export const CategoryManager = () => {
  const { isLoading } = useAdminAuth();
  const { categories, deleteCategory } = useCategoryManager();
  const { addNominee } = useNominees();
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

  const categoriesWithCount = categories.map(category => ({
    ...category,
    nominees: category.nominees.length,
    nomineesList: category.nominees
  }));

  if (isLoading) {
    return <div>Chargement de l'interface d'administration...</div>;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
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
      />
    </div>
  );
};