import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { PageBackground } from "@/integrations/supabase/types/background";
import { useBackgroundActions } from "@/hooks/useBackgroundActions";

interface BackgroundListProps {
  backgrounds: PageBackground[];
  onBackgroundChange: () => void;
}

export const BackgroundList = ({ backgrounds, onBackgroundChange }: BackgroundListProps) => {
  const { toggleBackgroundActive, deleteBackground } = useBackgroundActions(onBackgroundChange);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Fonds existants</h3>
      <div className="space-y-4">
        {backgrounds?.map((background) => (
          <div
            key={background.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <p className="font-medium">{background.page_name}</p>
              <p className="text-sm text-gray-500">
                Type: {background.background_type}
              </p>
              <p className="text-sm text-gray-500 truncate max-w-md">
                Valeur: {background.background_value}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={background.is_active ? "default" : "secondary"}
                onClick={() => toggleBackgroundActive(background)}
              >
                {background.is_active ? "Actif" : "Inactif"}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteBackground(background.id)}
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