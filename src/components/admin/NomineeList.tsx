import React, { useState } from "react";
import { NomineeEditDialog } from "./NomineeEditDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Search } from "lucide-react";

interface Nominee {
  id: string;
  name: string;
  description: string;
  image_url?: string;
}

interface NomineeListProps {
  nominees: Nominee[];
  categoryId: string;
  onDeleteNominee: (nomineeId: string) => void;
}

export const NomineeList = ({ nominees, categoryId, onDeleteNominee }: NomineeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNominees = nominees.filter(nominee =>
    nominee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nominee.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Liste des nominés</h4>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Rechercher un nominé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="grid gap-4">
        {filteredNominees.map((nominee) => (
          <div 
            key={nominee.id}
            className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
          >
            <div className="flex items-center gap-4">
              {nominee.image_url ? (
                <img 
                  src={nominee.image_url} 
                  alt={nominee.name} 
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <ImageOff className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <h5 className="font-medium">{nominee.name}</h5>
                <p className="text-sm text-gray-600">{nominee.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NomineeEditDialog nominee={nominee} categoryId={categoryId}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Modifier
                </Button>
              </NomineeEditDialog>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onDeleteNominee(nominee.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {filteredNominees.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun nominé ne correspond à votre recherche
          </div>
        )}
      </div>
    </div>
  );
};