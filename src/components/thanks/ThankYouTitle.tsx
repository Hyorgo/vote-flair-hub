import { Heart } from "lucide-react";

export const ThankYouTitle = () => {
  return (
    <div className="flex flex-col items-center gap-8 mb-8">
      <Heart 
        className="w-12 h-12 text-pink-500 animate-heart-beat" 
        strokeWidth={1.5} 
      />
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FEC6A1] to-[#F97316] bg-clip-text text-transparent animate-float">
        Merci pour votre vote !
      </h1>
    </div>
  );
};