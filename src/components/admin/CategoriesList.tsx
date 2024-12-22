import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CategoryRow } from "./CategoryRow";
import { Nominee } from "@/types/airtable";

interface Category {
  id: string;
  name: string;
  nominees: number;
  nomineesList?: Nominee[];
}

interface CategoriesListProps {
  categories: Category[];
  handleDeleteCategory: (id: string) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  newNomineeName: string;
  setNewNomineeName: (name: string) => void;
  newNomineeDescription: string;
  setNewNomineeDescription: (description: string) => void;
  handleAddNominee: (categoryId: string) => void;
}

export const CategoriesList = ({
  categories,
  handleDeleteCategory,
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNominee,
}: CategoriesListProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Nominés</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              handleDeleteCategory={handleDeleteCategory}
              newNomineeName={newNomineeName}
              setNewNomineeName={setNewNomineeName}
              newNomineeDescription={newNomineeDescription}
              setNewNomineeDescription={setNewNomineeDescription}
              handleAddNominee={handleAddNominee}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};