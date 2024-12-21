import React from "react";
import { NomineeEditDialog } from "./NomineeEditDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

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
  return (
    <div className="space-y-4 mt-4">
      <h4 className="font-medium">Liste des nominés</h4>
      <div className="grid gap-4">
        {nominees.map((nominee) => (
          <div 
            key={nominee.id}
            className="flex items-center justify-between p-4 bg-white/50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {nominee.image_url && (
                <img 
                  src={nominee.image_url} 
                  alt={nominee.name} 
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div>
                <h5 className="font-medium">{nominee.name}</h5>
                <p className="text-sm text-gray-600">{nominee.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NomineeEditDialog nominee={nominee} categoryId={categoryId} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteNominee(nominee.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};