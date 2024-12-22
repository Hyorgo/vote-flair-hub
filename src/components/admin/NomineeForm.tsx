import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImageOff } from "lucide-react";

interface NomineeFormProps {
  newNomineeName: string;
  setNewNomineeName: (name: string) => void;
  newNomineeDescription: string;
  setNewNomineeDescription: (description: string) => void;
  handleAddNominee: (name: string, description: string, imageUrl?: string) => void;
}

export const NomineeForm = ({
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNominee,
}: NomineeFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = undefined;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const { error: uploadError, data } = await supabase.storage
          .from('nominees-images')
          .upload(fileName, uint8Array, {
            contentType: imageFile.type,
            upsert: false
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('nominees-images')
          .getPublicUrl(fileName);

        console.log("Image uploaded successfully, public URL:", publicUrl);
        imageUrl = publicUrl;
      }

      await handleAddNominee(newNomineeName, newNomineeDescription, imageUrl);
      setImageFile(null);
      setPreviewUrl(null);
      setNewNomineeName("");
      setNewNomineeDescription("");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement de l'image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Input
          placeholder="Nom du nominé"
          value={newNomineeName}
          onChange={(e) => setNewNomineeName(e.target.value)}
        />
      </div>
      <div>
        <Textarea
          placeholder="Description du nominé"
          value={newNomineeDescription}
          onChange={(e) => setNewNomineeDescription(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        {previewUrl ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
            <img
              src={previewUrl}
              alt="Prévisualisation"
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setPreviewUrl(null);
                setImageFile(null);
              }}
            >
              ×
            </Button>
          </div>
        ) : (
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <ImageOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <Button 
        type="submit"
        className="w-full"
        disabled={isUploading || !newNomineeName.trim() || !newNomineeDescription.trim()}
      >
        {isUploading ? "Téléchargement en cours..." : "Ajouter le nominé"}
      </Button>
    </form>
  );
};