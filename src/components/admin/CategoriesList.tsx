import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NomineeForm } from "./NomineeForm";
import { Input } from "@/components/ui/input";
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
  selectedCategory,
  setSelectedCategory,
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNominee,
}: CategoriesListProps) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { toast } = useToast();

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleSaveEdit = async (categoryId: string) => {
    if (!newCategoryName.trim()) {
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
        .update({ name: newCategoryName.trim() })
        .eq('id', categoryId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "La catégorie a été mise à jour",
      });
      
      setEditingCategory(null);
      // Force a page refresh to update the data
      window.location.reload();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la catégorie",
        variant: "destructive",
      });
    }
  };

  return (
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
          <TableRow key={category.id}>
            <TableCell>
              {editingCategory?.id === category.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="max-w-[200px]"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSaveEdit(category.id)}
                  >
                    Sauvegarder
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setEditingCategory(null)}
                  >
                    Annuler
                  </Button>
                </div>
              ) : (
                category.name
              )}
            </TableCell>
            <TableCell>{category.nominees}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedCategory(category)}
                    >
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
                  onClick={() => handleEditClick(category)}
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
        ))}
      </TableBody>
    </Table>
  );
};