import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { CategoryNameEditor } from "./CategoryNameEditor";
import { CategoryActions } from "./CategoryActions";
import { NomineeList } from "./NomineeList";

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
  const [showNominees, setShowNominees] = useState(false);
  const [nominees, setNominees] = useState<any[]>([]);
  const { toast } = useToast();

  const loadNominees = async () => {
    const { data, error } = await supabase
      .from('nominees')
      .select('*')
      .eq('category_id', category.id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les nominés",
        variant: "destructive",
      });
      return;
    }

    setNominees(data);
  };

  const handleAddNomineeWithImage = async (imageUrl?: string) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .insert([{
          category_id: category.id,
          name: newNomineeName.trim(),
          description: newNomineeDescription.trim(),
          image_url: imageUrl
        }]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Le nominé a été ajouté",
      });

      setNewNomineeName("");
      setNewNomineeDescription("");
      loadNominees();
    } catch (error) {
      console.error("Error adding nominee:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le nominé",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNominee = async (nomineeId: string) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .delete()
        .eq('id', nomineeId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Le nominé a été supprimé",
      });

      loadNominees();
    } catch (error) {
      console.error("Error deleting nominee:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le nominé",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (showNominees) {
      loadNominees();
    }
  }, [showNominees]);

  return (
    <>
      <TableRow>
        <TableCell>
          {isEditing ? (
            <CategoryNameEditor
              categoryId={category.id}
              initialName={category.name}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent"
              onClick={() => setShowNominees(!showNominees)}
            >
              {category.name}
            </Button>
          )}
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
            handleAddNominee={handleAddNomineeWithImage}
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