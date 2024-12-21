import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ConfettiEffect } from "@/components/thanks/ConfettiEffect";
import { SocialShareButtons } from "@/components/thanks/SocialShareButtons";
import { ThankYouTitle } from "@/components/thanks/ThankYouTitle";

const Thanks = () => {
  const navigate = useNavigate();
  const shareMessage = encodeURIComponent("Je viens de voter pour les Lyon d'Or ! 🏆 Votez vous aussi pour vos nominés préférés !");
  const shareUrl = encodeURIComponent(window.location.origin);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <ConfettiEffect />
        <ThankYouTitle />
        
        <p className="text-xl mb-12 text-gray-200">
          Partagez votre participation et invitez vos amis à voter !
        </p>

        <SocialShareButtons shareMessage={shareMessage} shareUrl={shareUrl} />

        <Button
          onClick={() => navigate("/")}
          className="group relative px-6 py-2 rounded-lg shadow-sm transition-all duration-300 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] text-white hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:border hover:border-[#DAA520] hover:bg-opacity-100"
        >
          Retour à l'accueil
        </Button>
      </div>
    </Layout>
  );
};

export default Thanks;