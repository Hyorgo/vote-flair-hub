import { Heart } from "lucide-react";
import { memo } from "react";

export const ThankYouTitle = memo(() => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
      <Heart 
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-500 animate-heart-beat" 
        strokeWidth={1.5}
        aria-hidden="true"
      />
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FEC6A1] to-[#F97316] bg-clip-text text-transparent animate-float px-4">
        Merci pour votre vote !
      </h1>
    </div>
  );
});

ThankYouTitle.displayName = "ThankYouTitle";