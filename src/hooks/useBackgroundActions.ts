import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { PageBackground } from "@/integrations/supabase/types/background";

export const useBackgroundActions = (onSuccess: () => void) => {
  const { toast } = useToast();

  const deleteAllBackgrounds = async (pageName: string) => {
    const { error } = await supabase
      .from("page_backgrounds")
      .delete()
      .eq("page_name", pageName);

    if (error) {
      console.error("Error deleting backgrounds:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les fonds",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Les fonds ont été supprimés avec succès",
    });
    
    onSuccess();
  };

  const toggleBackgroundActive = async (background: PageBackground) => {
    const { error } = await supabase
      .from("page_backgrounds")
      .update({ is_active: !background.is_active })
      .eq("id", background.id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut du fond",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Le statut du fond a été modifié avec succès",
    });
    
    onSuccess();
  };

  const deleteBackground = async (backgroundId: string) => {
    const { error } = await supabase
      .from("page_backgrounds")
      .delete()
      .eq("id", backgroundId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le fond",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Le fond a été supprimé avec succès",
    });
    
    onSuccess();
  };

  return {
    toggleBackgroundActive,
    deleteBackground,
    deleteAllBackgrounds,
  };
};