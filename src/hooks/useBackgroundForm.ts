import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export type BackgroundType = "color" | "image" | "video" | "gradient";

interface UseBackgroundFormProps {
  onSuccess: () => void;
}

export const useBackgroundForm = ({ onSuccess }: UseBackgroundFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pageName, setPageName] = useState("");
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("color");
  const [backgroundValue, setBackgroundValue] = useState("#ffffff");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalBackgroundValue = backgroundValue;

      if (file && backgroundType === "image") {
        if (file.size > MAX_FILE_SIZE) {
          toast({
            title: "Erreur",
            description: "Le fichier est trop volumineux. La taille maximale est de 50MB.",
            variant: "destructive",
          });
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

      resetForm();
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

  const resetForm = () => {
    setPageName("");
    setBackgroundType("color");
    setBackgroundValue("#ffffff");
    setFile(null);
  };

  return {
    isLoading,
    pageName,
    setPageName,
    backgroundType,
    setBackgroundType,
    backgroundValue,
    setBackgroundValue,
    file,
    setFile,
    handleSubmit,
  };
};