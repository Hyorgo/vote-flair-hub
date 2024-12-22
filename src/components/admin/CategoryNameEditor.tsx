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
        onClick={onCancel}
      >
        Annuler
      </Button>
    </div>
  );
};
