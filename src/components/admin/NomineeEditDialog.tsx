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
import { Pencil } from "lucide-react";
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
}

export const NomineeEditDialog = ({ nominee, categoryId }: NomineeEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(nominee.name);
  const [description, setDescription] = useState(nominee.description);
  const [imageUrl, setImageUrl] = useState(nominee.image_url || "");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("nominees")
        .update({
          name,
          description,
          image_url: imageUrl,
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
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du nominé.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
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
          <div>
            <Input
              type="url"
              placeholder="URL de l'image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Enregistrer les modifications
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};