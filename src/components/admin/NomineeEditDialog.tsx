import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Nominee {
  id: string;
  name: string;
  description: string;
  image_url?: string;
}

interface NomineeEditDialogProps {
  nominee: Nominee;
  categoryId: string;
  children: React.ReactNode;
}

export const NomineeEditDialog = ({ nominee, categoryId, children }: NomineeEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(nominee.name);
  const [description, setDescription] = useState(nominee.description);
  const [imageUrl, setImageUrl] = useState(nominee.image_url || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from('nominees-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('nominees-images')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      const { error } = await supabase
        .from("nominees")
        .update({
          name,
          description,
          image_url: finalImageUrl,
        })
        .eq("id", nominee.id);

      if (error) throw error;

      toast({
        title: "Nominé modifié",
        description: "Les modifications ont été enregistrées avec succès.",
      });

      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating nominee:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du nominé.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le nominé</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nom du nominé"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder="Description du nominé"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {nominee.image_url && (
              <img 
                src={nominee.image_url} 
                alt={nominee.name} 
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            <p className="text-sm text-gray-500">ou</p>
            <Input
              type="url"
              placeholder="URL de l'image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? "Téléchargement en cours..." : "Enregistrer les modifications"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};