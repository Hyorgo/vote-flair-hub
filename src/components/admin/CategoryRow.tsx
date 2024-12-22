import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { CategoryNameCell } from "./CategoryNameCell";
import { CategoryActions } from "./CategoryActions";
import { NomineeList } from "./NomineeList";
import { useNomineeManagement } from "@/hooks/useNomineeManagement";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

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
    loadNominees,
    handleDeleteNominee,
    handleAddNomineeWithImage
  } = useNomineeManagement(category.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  React.useEffect(() => {
    if (showNominees) {
      loadNominees();
    }
  }, [showNominees, loadNominees]);

  const handleAddNomineeToCategory = async (name: string, description: string, imageUrl?: string) => {
    await handleAddNomineeWithImage(name, description, imageUrl);
    loadNominees();
  };

  return (
    <>
      <TableRow ref={setNodeRef} style={style}>
        <TableCell>
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </button>
        </TableCell>
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
          <TableCell colSpan={4}>
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