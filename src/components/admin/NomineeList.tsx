import React, { useState } from "react";
import { NomineeEditDialog } from "./NomineeEditDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageOff, Pencil, Search, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="space-y-4 mt-4 px-2 sm:px-4 animate-slide-down">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h4 className="font-medium text-lg">Liste des nominés</h4>
        <div className="relative w-full sm:w-64">
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
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors gap-4 hover-lift animate-fade-scale"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              {nominee.image_url ? (
                <img 
                  src={nominee.image_url} 
                  alt={nominee.name} 
                  className="w-full sm:w-12 h-32 sm:h-12 object-cover rounded"
                />
              ) : (
                <div className="w-full sm:w-12 h-32 sm:h-12 bg-gray-100 rounded flex items-center justify-center">
                  <ImageOff className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="space-y-1 w-full sm:w-auto">
                <h5 className="font-medium text-base sm:text-lg">{nominee.name}</h5>
                <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-1">{nominee.description}</p>
              </div>
            </div>
            <TooltipProvider>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <NomineeEditDialog nominee={nominee} categoryId={categoryId}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sm:hidden">Modifier</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Modifier le nominé</p>
                    </TooltipContent>
                  </Tooltip>
                </NomineeEditDialog>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto justify-center transition-colors"
                      onClick={() => onDeleteNominee(nominee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sm:hidden ml-2">Supprimer</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Supprimer le nominé</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        ))}
        {filteredNominees.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white/50 rounded-lg animate-fade-scale">
            Aucun nominé ne correspond à votre recherche
          </div>
        )}
      </div>
    </div>
  );
};