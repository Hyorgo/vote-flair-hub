import React from "react";
import { Button } from "@/components/ui/button";

interface RegistrationButtonsProps {
  isSubmitting: boolean;
  onExistingUser: () => void;
}

export const RegistrationButtons = ({ isSubmitting, onExistingUser }: RegistrationButtonsProps) => {
  return (
    <div className="space-y-2">
      <Button
        type="submit"
        className="w-full bg-primary/80 hover:bg-primary backdrop-blur-sm text-white shadow-lg h-9"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Inscription en cours..." : "S'inscrire pour voter"}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onExistingUser}
        className="w-full backdrop-blur-sm border-white/20 hover:bg-white/10 text-gray-800 h-9"
      >
        Déjà inscrit
      </Button>
    </div>
  );
};