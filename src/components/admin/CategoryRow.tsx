import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NomineeForm } from "./NomineeForm";
import { NomineeList } from "./NomineeList";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

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
  const [newName, setNewName] = useState(category.name);
  const { toast } = useToast();
  const [nominees, setNominees] = useState<any[]>([]);
  const [showNominees, setShowNominees] = useState(false);

  const handleSaveEdit = async () => {
    if (!newName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: newName.trim() })
        .eq('id', category.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "La catégorie a été mise à jour",
      });
      
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la catégorie",
        variant: "destructive",
      });
    }
  };

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
            <div className="flex items-center gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="max-w-[200px]"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSaveEdit}
              >
                Sauvegarder
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </Button>
            </div>
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
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nominé à {category.name}</DialogTitle>
                </DialogHeader>
                <NomineeForm
                  newNomineeName={newNomineeName}
                  setNewNomineeName={setNewNomineeName}
                  newNomineeDescription={newNomineeDescription}
                  setNewNomineeDescription={setNewNomineeDescription}
                  handleAddNominee={() => handleAddNominee(category.id)}
                />
              </DialogContent>
            </Dialog>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDeleteCategory(category.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
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