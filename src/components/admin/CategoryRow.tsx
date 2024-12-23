import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useNomineeManagement } from "@/hooks/useNomineeManagement";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./category-row/DragHandle";
import { CategoryRowContent } from "./category-row/CategoryRowContent";
import { NomineesExpansion } from "./category-row/NomineesExpansion";

interface Category {
  id: string;
  name: string;
  nominees: number;
  display_order: number;
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
    handleDeleteNominee,
    handleAddNomineeWithImage,
    loadNominees
  } = useNomineeManagement(category.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  React.useEffect(() => {
    if (showNominees) {
      loadNominees();
    }
  }, [showNominees, loadNominees]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAddNomineeToCategory = async (name: string, description: string, imageUrl?: string) => {
    await handleAddNomineeWithImage(name, description, imageUrl);
    loadNominees();
  };

  return (
    <>
      <TableRow ref={setNodeRef} style={style}>
        <TableCell>
          <DragHandle attributes={attributes} listeners={listeners} />
        </TableCell>
        <CategoryRowContent
          category={category}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          showNominees={showNominees}
          setShowNominees={setShowNominees}
          handleDeleteCategory={handleDeleteCategory}
          newNomineeName={newNomineeName}
          setNewNomineeName={setNewNomineeName}
          newNomineeDescription={newNomineeDescription}
          setNewNomineeDescription={setNewNomineeDescription}
          handleAddNomineeToCategory={handleAddNomineeToCategory}
        />
      </TableRow>
      <NomineesExpansion
        showNominees={showNominees}
        nominees={nominees}
        categoryId={category.id}
        onDeleteNominee={handleDeleteNominee}
      />
    </>
  );
};