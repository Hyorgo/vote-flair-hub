import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CategoryRow } from "./CategoryRow";
import { Nominee } from "@/types/airtable";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface Category {
  id: string;
  name: string;
  nominees: number;
  nomineesList?: Nominee[];
  display_order: number;
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
  onReorder: (event: DragEndEvent) => void;
}

export const CategoriesList = ({
  categories,
  handleDeleteCategory,
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNominee,
  onReorder,
}: CategoriesListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onReorder}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Nominés</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <SortableContext
            items={categories.map(cat => cat.id)}
            strategy={verticalListSortingStrategy}
          >
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
          </SortableContext>
        </Table>
      </DndContext>
    </div>
  );
};