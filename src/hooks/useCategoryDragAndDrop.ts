import { DragEndEvent } from "@dnd-kit/core";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/airtable";

export const useCategoryDragAndDrop = () => {
  const { toast } = useToast();

  const handleDragEnd = async (event: DragEndEvent, categories: Category[]) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    const activeCategory = categories.find(cat => cat.id === active.id);
    const overCategory = categories.find(cat => cat.id === over.id);

    if (!activeCategory || !overCategory) {
      return;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .update({ display_order: overCategory.display_order })
        .eq('id', activeCategory.id);

      if (error) throw error;

      const { error: error2 } = await supabase
        .from('categories')
        .update({ display_order: activeCategory.display_order })
        .eq('id', overCategory.id);

      if (error2) throw error2;

      toast({
        title: "Succès",
        description: "L'ordre des catégories a été mis à jour",
      });

      window.location.reload();
    } catch (error) {
      console.error('Error updating category order:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'ordre des catégories",
        variant: "destructive",
      });
    }
  };

  return { handleDragEnd };
};