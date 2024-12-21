import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryNameEditor } from "./CategoryNameEditor";

interface CategoryNameCellProps {
  categoryId: string;
  categoryName: string;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  showNominees: boolean;
  setShowNominees: (value: boolean) => void;
}

export const CategoryNameCell = ({
  categoryId,
  categoryName,
  isEditing,
  setIsEditing,
  showNominees,
  setShowNominees,
}: CategoryNameCellProps) => {
  if (isEditing) {
    return (
      <CategoryNameEditor
        categoryId={categoryId}
        initialName={categoryName}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Button 
      variant="ghost" 
      className="p-0 hover:bg-transparent"
      onClick={() => setShowNominees(!showNominees)}
    >
      {categoryName}
    </Button>
  );
};