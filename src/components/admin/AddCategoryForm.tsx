import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCategoryManager } from "@/hooks/useCategories";

export const AddCategoryForm = () => {
  const { toast } = useToast();
  const { addCategory } = useCategoryManager();
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }

    addCategory.mutate(newCategoryName.trim());
    setNewCategoryName("");
  };

  return (
    <div className="flex items-center gap-4">
      <Input 
        placeholder="Nom de la nouvelle catégorie" 
        className="max-w-sm"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddCategory();
          }
        }}
      />
      <Button onClick={handleAddCategory}>
        <Plus className="h-4 w-4 mr-2" />
        Ajouter
      </Button>
    </div>
  );
};