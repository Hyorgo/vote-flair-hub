import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { PageSelector } from "./forms/PageSelector";
import { BackgroundTypeSelector } from "./forms/BackgroundTypeSelector";
import { ColorBackgroundInput } from "./forms/ColorBackgroundInput";
import { ImageBackgroundInput } from "./forms/ImageBackgroundInput";
import { VideoBackgroundInput } from "./forms/VideoBackgroundInput";

interface BackgroundFormProps {
  onSuccess: () => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

export const BackgroundForm = ({ onSuccess }: BackgroundFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pageName, setPageName] = useState("");
  const [backgroundType, setBackgroundType] = useState<"color" | "image" | "video">("color");
  const [backgroundValue, setBackgroundValue] = useState("#ffffff"); // Default white color
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalBackgroundValue = backgroundValue;

      if (backgroundType === "video") {
        finalBackgroundValue = backgroundValue;
      } else if (file && backgroundType === "image") {
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
      setBackgroundValue("#ffffff"); // Reset to default white color
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau fond</h2>
      
      <PageSelector 
        value={pageName}
        onChange={setPageName}
      />

      <BackgroundTypeSelector
        value={backgroundType}
        onChange={setBackgroundType}
      />

      {backgroundType === "color" ? (
        <ColorBackgroundInput
          value={backgroundValue}
          onChange={setBackgroundValue}
        />
      ) : backgroundType === "video" ? (
        <VideoBackgroundInput
          value={backgroundValue}
          onChange={setBackgroundValue}
        />
      ) : (
        <ImageBackgroundInput
          onFileChange={setFile}
        />
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Ajout en cours..." : "Ajouter le fond"}
      </Button>
    </form>
  );
};