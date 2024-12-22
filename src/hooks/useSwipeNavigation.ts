import { useAnimation, PanInfo } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UseSwipeNavigationProps {
  onNavigation: (direction: "prev" | "next") => void;
  isFirstCategory: boolean;
  isLastCategory: boolean;
}

export const useSwipeNavigation = ({
  onNavigation,
  isFirstCategory,
  isLastCategory,
}: UseSwipeNavigationProps) => {
  const controls = useAnimation();
  const { toast } = useToast();

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) >= 500 || Math.abs(offset) >= 50) {
      if (offset > 0 && !isFirstCategory) {
        await controls.start({ x: "100%", opacity: 0 });
        onNavigation("prev");
        controls.set({ x: "-100%" });
        await controls.start({ x: 0, opacity: 1 });
      } else if (offset < 0 && !isLastCategory) {
        await controls.start({ x: "-100%", opacity: 0 });
        onNavigation("next");
        controls.set({ x: "100%" });
        await controls.start({ x: 0, opacity: 1 });
      } else {
        controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
        
        toast({
          title: offset > 0 ? "Première catégorie" : "Dernière catégorie",
          description: "Vous ne pouvez pas aller plus loin",
          duration: 1500,
        });
      }
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  return {
    controls,
    handleDragEnd,
  };
};