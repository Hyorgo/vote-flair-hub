import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseKeyboardNavigationProps {
  onNavigation: (direction: "prev" | "next") => void;
  isFirstCategory: boolean;
  isLastCategory: boolean;
}

export const useKeyboardNavigation = ({
  onNavigation,
  isFirstCategory,
  isLastCategory,
}: UseKeyboardNavigationProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Éviter la navigation si l'utilisateur est en train de taper dans un champ
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          if (!isFirstCategory) {
            onNavigation('prev');
            toast({
              title: "Navigation",
              description: "Catégorie précédente",
              duration: 1500,
            });
          }
          break;
        case 'ArrowRight':
          if (!isLastCategory) {
            onNavigation('next');
            toast({
              title: "Navigation",
              description: "Catégorie suivante",
              duration: 1500,
            });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigation, isFirstCategory, isLastCategory, toast]);
};