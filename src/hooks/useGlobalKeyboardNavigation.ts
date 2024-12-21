import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useGlobalKeyboardNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Éviter la navigation si l'utilisateur est en train de taper dans un champ
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'h':
          if (event.altKey) {
            navigate('/');
            toast({
              title: "Navigation",
              description: "Retour à l'accueil",
              duration: 1500,
            });
          }
          break;
        case 'c':
          if (event.altKey) {
            navigate('/categories');
            toast({
              title: "Navigation",
              description: "Page des catégories",
              duration: 1500,
            });
          }
          break;
        case 'ArrowLeft':
          if (event.altKey) {
            window.history.back();
            toast({
              title: "Navigation",
              description: "Page précédente",
              duration: 1500,
            });
          }
          break;
        case '?':
          toast({
            title: "Raccourcis clavier",
            description: "Alt + H: Accueil | Alt + C: Catégories | Alt + ←: Retour",
            duration: 3000,
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, toast]);
};