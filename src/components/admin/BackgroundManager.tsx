import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PageBackground } from "@/integrations/supabase/types/background";
import { Trash2 } from "lucide-react";

export const BackgroundManager = () => {
  const { toast } = useToast();
  const pages = ["index", "categories", "admin"];

  const { data: backgrounds, refetch } = useQuery({
    queryKey: ["page-backgrounds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_backgrounds")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PageBackground[];
    },
  });

  const handleBackgroundSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const backgroundData = {
      page_name: formData.get("page_name"),
      background_type: formData.get("background_type"),
      background_value: formData.get("background_value"),
    };

    const { error } = await supabase
      .from("page_backgrounds")
      .insert([backgroundData]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le fond",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Le fond a été ajouté avec succès",
    });
    
    form.reset();
    refetch();
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
    
    refetch();
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
    
    refetch();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleBackgroundSubmit} className="space-y-4 bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Ajouter un nouveau fond</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="page_name">Page</label>
            <Select name="page_name" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page} value={page}>
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="background_type">Type de fond</label>
            <Select name="background_type" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Couleur</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="background_value">Valeur</label>
            <Input
              name="background_value"
              placeholder="URL de l'image/vidéo ou code couleur"
              required
            />
          </div>

          <Button type="submit">Ajouter</Button>
        </div>
      </form>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Fonds existants</h3>
        <div className="space-y-4">
          {backgrounds?.map((background) => (
            <div
              key={background.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div>
                <p className="font-medium">{background.page_name}</p>
                <p className="text-sm text-gray-500">
                  Type: {background.background_type}
                </p>
                <p className="text-sm text-gray-500 truncate max-w-md">
                  Valeur: {background.background_value}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={background.is_active ? "default" : "secondary"}
                  onClick={() => toggleBackgroundActive(background)}
                >
                  {background.is_active ? "Actif" : "Inactif"}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteBackground(background.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};