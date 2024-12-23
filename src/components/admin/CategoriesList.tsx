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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  error?: Error;
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
  error,
}: CategoriesListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur est survenue lors du chargement des catégories : {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onReorder}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="w-24 text-center">Nominés</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
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
    </div>
  );
};