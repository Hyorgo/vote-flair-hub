import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Keyboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  isAdmin: boolean;
}

export const Header = ({ isAdmin }: HeaderProps) => {
  const { toast } = useToast();

  const showKeyboardShortcuts = () => {
    toast({
      title: "Raccourcis clavier disponibles",
      description: "Alt + H: Accueil | Alt + C: Catégories | Alt + ←: Retour | ?: Aide",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/10 shadow-lg supports-[backdrop-filter]:bg-white/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          aria-label="Retour à l'accueil"
        >
          <img 
            src="/lovable-uploads/f615e6d4-11eb-4499-a3a3-d69273ded6e7.png" 
            alt="Lyon d'Or Logo" 
            className="h-20 object-contain"
            loading="eager"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={showKeyboardShortcuts}
            aria-label="Afficher les raccourcis clavier"
          >
            <Keyboard className="h-5 w-5" />
          </Button>
          {!isAdmin ? (
            <Link to="/admin">
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Accéder à l'administration"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button 
                variant="outline"
                aria-label="Retourner à la page de vote"
              >
                Retour au vote
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};