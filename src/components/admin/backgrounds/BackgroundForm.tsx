import React from "react";
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
import { supabase } from "@/lib/supabase";

export const BackgroundForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const pages = ["index", "categories", "admin"];

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
    onSuccess();
  };

  return (
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
  );
};