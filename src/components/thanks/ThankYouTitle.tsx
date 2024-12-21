import { PartyPopper, Sparkles, Heart, Gift } from "lucide-react";

export const ThankYouTitle = () => {
  return (
    <div className="flex flex-col items-center gap-8 mb-8">
      <div className="flex items-center gap-4">
        <PartyPopper className="w-12 h-12 text-[#FFD700] animate-party" strokeWidth={1.5} />
        <Sparkles className="w-8 h-8 text-[#FEC6A1] animate-shimmer" strokeWidth={1.5} />
        <Gift className="w-10 h-10 text-[#F97316] animate-bounce-light" strokeWidth={1.5} />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FEC6A1] to-[#F97316] bg-clip-text text-transparent animate-float">
        Merci pour votre vote !
      </h1>
      
      <div className="flex items-center gap-4">
        <Heart className="w-8 h-8 text-pink-500 animate-bounce-light" strokeWidth={1.5} />
        <Sparkles className="w-6 h-6 text-[#FFD700] animate-shimmer" strokeWidth={1.5} />
      </div>
    </div>
  );
};