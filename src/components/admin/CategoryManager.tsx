import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useCategoryManager } from "@/hooks/useCategories";
import { useNominees } from "@/hooks/useNominees";
import { AddCategoryForm } from "./AddCategoryForm";
import { CategoriesList } from "./CategoriesList";

interface Category {
  id: string;
  name: string;
  nominees: number;
  nomineesList?: Array<{
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
  }>;
}

export const CategoryManager = () => {
  const { isLoading } = useAdminAuth();
  const { categories, deleteCategory } = useCategoryManager();
  const { addNominee } = useNominees();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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

  if (isLoading) {
    return <div>Chargement de l'interface d'administration...</div>;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <AddCategoryForm />
      <CategoriesList
        categories={categories}
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