import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CategoryNameEditorProps {
  categoryId: string;
  initialName: string;
  onCancel: () => void;
}

export const CategoryNameEditor = ({ categoryId, initialName, onCancel }: CategoryNameEditorProps) => {
  const [newName, setNewName] = React.useState(initialName);
  const { toast } = useToast();

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
        .eq('id', categoryId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "La catégorie a été mise à jour",
      });
      
      onCancel();
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="w-full sm:max-w-[200px]"
      />
      <div className="flex gap-2 w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSaveEdit}
          className="flex-1 sm:flex-none"
        >
          Sauvegarder
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onCancel}
          className="flex-1 sm:flex-none"
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};