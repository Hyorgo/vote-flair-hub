import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NomineeFormProps {
  newNomineeName: string;
  setNewNomineeName: (name: string) => void;
  newNomineeDescription: string;
  setNewNomineeDescription: (description: string) => void;
  handleAddNominee: () => void;
}

export const NomineeForm = ({
  newNomineeName,
  setNewNomineeName,
  newNomineeDescription,
  setNewNomineeDescription,
  handleAddNominee,
}: NomineeFormProps) => {
  return (
    <div className="space-y-4 mt-4">
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
      <div>
        <Input
          type="url"
          placeholder="URL de l'image (optionnel)"
          className="mb-4"
          defaultValue="https://images.unsplash.com/photo-1527576539890-dfa815648363"
        />
      </div>
      <Button 
        className="w-full" 
        onClick={handleAddNominee}
      >
        Ajouter le nominé
      </Button>
    </div>
  );
};