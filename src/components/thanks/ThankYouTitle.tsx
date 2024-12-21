import { PartyPopper } from "lucide-react";

export const ThankYouTitle = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <PartyPopper className="w-16 h-16 text-[#FFD700]" strokeWidth={1.5} />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent animate-bounce">
        Merci pour votre vote !
      </h1>
    </div>
  );
};