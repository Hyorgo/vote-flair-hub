import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface BackgroundFormProps {
  onSuccess: () => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

export const BackgroundForm = ({ onSuccess }: BackgroundFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pageName, setPageName] = useState("");
  const [backgroundType, setBackgroundType] = useState<"color" | "image" | "video">("color");
  const [backgroundValue, setBackgroundValue] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalBackgroundValue = backgroundValue;

      if (file && (backgroundType === "image" || backgroundType === "video")) {
        if (file.size > MAX_FILE_SIZE) {
          toast({
            title: "Erreur",
            description: "Le fichier est trop volumineux. La taille maximale est de 50MB.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('backgrounds')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('backgrounds')
          .getPublicUrl(filePath);

        finalBackgroundValue = publicUrl;
      }

      const { error } = await supabase
        .from("page_backgrounds")
        .insert([
          {
            page_name: pageName,
            background_type: backgroundType,
            background_value: finalBackgroundValue,
            is_active: true,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Fond ajouté",
        description: "Le nouveau fond a été ajouté avec succès.",
      });

      setPageName("");
      setBackgroundType("color");
      setBackgroundValue("");
      setFile(null);
      onSuccess();
    } catch (error) {
      console.error("Error adding background:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le fond.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast({
          title: "Erreur",
          description: "Le fichier est trop volumineux. La taille maximale est de 50MB.",
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau fond</h2>
      
      <div className="space-y-2">
        <Label htmlFor="page-name">Nom de la page</Label>
        <Select
          value={pageName}
          onValueChange={setPageName}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="index">Accueil</SelectItem>
            <SelectItem value="admin">Administration</SelectItem>
            <SelectItem value="categories">Catégories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="background-type">Type de fond</Label>
        <Select
          value={backgroundType}
          onValueChange={(value: "color" | "image" | "video") => setBackgroundType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="color">Couleur</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Vidéo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {backgroundType === "color" ? (
        <div className="space-y-2">
          <Label htmlFor="background-value">Couleur</Label>
          <Input
            id="background-value"
            type="color"
            value={backgroundValue}
            onChange={(e) => setBackgroundValue(e.target.value)}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="file">
            Fichier {backgroundType === "image" ? "image" : "vidéo"} (max 50MB)
          </Label>
          <Input
            id="file"
            type="file"
            accept={backgroundType === "image" ? "image/*" : "video/*"}
            onChange={handleFileChange}
          />
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Ajout en cours..." : "Ajouter le fond"}
      </Button>
    </form>
  );
};