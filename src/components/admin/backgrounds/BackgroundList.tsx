import { Button } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PageBackground } from "@/integrations/supabase/types/background";

interface BackgroundListProps {
  backgrounds: PageBackground[];
  onBackgroundChange: () => void;
}

export const BackgroundList = ({ backgrounds, onBackgroundChange }: BackgroundListProps) => {
  const { toast } = useToast();

  const deleteBackground = async (background: PageBackground) => {
    try {
      if (background.background_type !== "color" && background.background_value) {
        const fileName = background.background_value.split('/').pop();
        if (fileName) {
          const { error: deleteStorageError } = await supabase.storage
            .from('backgrounds')
            .remove([fileName]);

          if (deleteStorageError) throw deleteStorageError;
        }
      }

      const { error } = await supabase
        .from("page_backgrounds")
        .delete()
        .eq("id", background.id);

      if (error) throw error;

      toast({
        title: "Fond supprimé",
        description: "Le fond a été supprimé avec succès.",
      });

      onBackgroundChange();
    } catch (error) {
      console.error("Error deleting background:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le fond.",
        variant: "destructive",
      });
    }
  };

  const toggleBackgroundActive = async (background: PageBackground) => {
    try {
      // Si on active un fond, on désactive d'abord tous les autres fonds de la même page
      if (!background.is_active) {
        const { error: deactivateError } = await supabase
          .from("page_backgrounds")
          .update({ is_active: false })
          .eq("page_name", background.page_name);

        if (deactivateError) throw deactivateError;
      }

      // Puis on met à jour le statut du fond sélectionné
      const { error } = await supabase
        .from("page_backgrounds")
        .update({ is_active: !background.is_active })
        .eq("id", background.id);

      if (error) throw error;

      toast({
        title: background.is_active ? "Fond désactivé" : "Fond activé",
        description: `Le fond a été ${background.is_active ? "désactivé" : "activé"} avec succès.`,
      });

      onBackgroundChange();
    } catch (error) {
      console.error("Error toggling background:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut du fond.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fonds existants</h2>
      <div className="grid gap-4">
        {backgrounds.map((background) => (
          <div
            key={background.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">
                Page: {background.page_name}
                {background.is_active && (
                  <span className="ml-2 text-sm text-green-600">(Actif)</span>
                )}
              </h3>
              <p className="text-sm text-gray-600">
                Type: {background.background_type}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleBackgroundActive(background)}
                title={background.is_active ? "Désactiver" : "Activer"}
              >
                {background.is_active ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteBackground(background)}
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};