import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { CategoryNameCell } from "./CategoryNameCell";
import { CategoryActions } from "./CategoryActions";
import { NomineeList } from "./NomineeList";
import { useNomineeManagement } from "@/hooks/useNomineeManagement";

interface Category {
  id: string;
  name: string;
  nominees: number;
}

interface CategoryRowProps {
  category: Category;
  handleDeleteCategory: (id: string) => void;
  newNomineeName: string;
  setNewNomineeName: (name: string) => void;
  newNomineeDescription: string;
  setNewNomineeDescription: (description: string) => void;
  handleAddNominee: (categoryId: string) => void;
}

export const CategoryRow = ({
  category,
  handleDeleteCategory,
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNominee,
}: CategoryRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    nominees,
    showNominees,
    setShowNominees,
    loadNominees,
    handleDeleteNominee,
    handleAddNomineeWithImage
  } = useNomineeManagement(category.id);

  React.useEffect(() => {
    if (showNominees) {
      loadNominees();
    }
  }, [showNominees, loadNominees]);

  const handleAddNomineeToCategory = async (name: string, description: string, imageUrl?: string) => {
    await handleAddNomineeWithImage(name, description, imageUrl);
    loadNominees(); // Recharger la liste après l'ajout
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <CategoryNameCell
            categoryId={category.id}
            categoryName={category.name}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            showNominees={showNominees}
            setShowNominees={setShowNominees}
          />
        </TableCell>
        <TableCell>{category.nominees}</TableCell>
        <TableCell>
          <CategoryActions
            categoryId={category.id}
            categoryName={category.name}
            onEdit={() => setIsEditing(true)}
            onDelete={() => handleDeleteCategory(category.id)}
            newNomineeName={newNomineeName}
            setNewNomineeName={setNewNomineeName}
            newNomineeDescription={newNomineeDescription}
            setNewNomineeDescription={setNewNomineeDescription}
            handleAddNominee={handleAddNomineeToCategory}
          />
        </TableCell>
      </TableRow>
      {showNominees && (
        <TableRow>
          <TableCell colSpan={3}>
            <NomineeList 
              nominees={nominees} 
              categoryId={category.id}
              onDeleteNominee={handleDeleteNominee}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};