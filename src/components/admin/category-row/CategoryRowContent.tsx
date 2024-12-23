import { TableCell } from "@/components/ui/table";
import { CategoryNameCell } from "../CategoryNameCell";
import { CategoryActions } from "../CategoryActions";

interface CategoryRowContentProps {
  category: {
    id: string;
    name: string;
    nominees: number;
  };
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  showNominees: boolean;
  setShowNominees: (value: boolean) => void;
  handleDeleteCategory: (id: string) => void;
  newNomineeName: string;
  setNewNomineeName: (name: string) => void;
  newNomineeDescription: string;
  setNewNomineeDescription: (description: string) => void;
  handleAddNomineeToCategory: (name: string, description: string, imageUrl?: string) => void;
}

export const CategoryRowContent = ({
  category,
  isEditing,
  setIsEditing,
  showNominees,
  setShowNominees,
  handleDeleteCategory,
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNomineeToCategory,
}: CategoryRowContentProps) => {
  return (
    <>
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
      <TableCell className="text-center">{category.nominees}</TableCell>
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
    </>
  );
};