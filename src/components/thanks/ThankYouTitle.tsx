import { Heart } from "lucide-react";
import { memo } from "react";

export const ThankYouTitle = memo(() => {
  return (
    <div className="flex flex-col items-center gap-6 mb-12">
      <Heart 
        className="w-12 h-12 text-pink-500 animate-heart-beat" 
        strokeWidth={1.5}
        aria-hidden="true"
      />
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FEC6A1] to-[#F97316] bg-clip-text text-transparent animate-float">
        Merci pour votre vote !
      </h1>
    </div>
  );
});

ThankYouTitle.displayName = "ThankYouTitle";