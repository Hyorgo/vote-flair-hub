import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Keyboard, ArrowBigDown } from "lucide-react";
import { Footer } from "./Footer";
import { PageBackground } from "./PageBackground";
import { useGlobalKeyboardNavigation } from "@/hooks/useGlobalKeyboardNavigation";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const pageName = location.pathname === "/" ? "index" : location.pathname.slice(1);
  const { toast } = useToast();
  
  useGlobalKeyboardNavigation();

  const showKeyboardShortcuts = () => {
    toast({
      title: "Raccourcis clavier disponibles",
      description: "Alt + H: Accueil | Alt + C: Catégories | Alt + ←: Retour | ?: Aide",
    });
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageBackground pageName={pageName}>
      <div className="min-h-screen flex flex-col">
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
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />

        {/* Bouton d'ascenseur */}
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full p-3 shadow-lg hover:scale-102 transition-transform z-50 bg-white/70 hover:bg-white/90"
          onClick={scrollToFooter}
          aria-label="Descendre vers le bas de la page"
        >
          <ArrowBigDown className="h-6 w-6" />
        </Button>
      </div>
    </PageBackground>
  );
};