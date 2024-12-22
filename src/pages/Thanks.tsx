import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/Layout";
import { SocialShareButtons } from "@/components/thanks/SocialShareButtons";
import { ThankYouTitle } from "@/components/thanks/ThankYouTitle";
import { ConfettiEffect } from "@/components/thanks/ConfettiEffect";

const SHARE_MESSAGE = encodeURIComponent("Je viens de voter pour les Lyon d'Or ! 🏆 Votez vous aussi pour vos nominés préférés !");
const PAGE_TITLE = "Merci de votre vote ! | Lyon d'Or";
const DEFAULT_TITLE = "Lyon d'Or";

const Thanks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const shareUrl = encodeURIComponent(window.location.origin);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    toast({
      title: "Vote enregistré !",
      description: "Merci de votre participation aux Lyon d'Or.",
      duration: 5000,
    });

    document.title = PAGE_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [toast]);

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 md:py-12 text-center mt-4 sm:mt-8 md:mt-16 animate-fade-in">
        <ConfettiEffect />
        <ThankYouTitle />
        
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Votre vote a bien été pris en compte. Partagez votre participation et invitez vos amis à voter !
        </p>

        <div className="space-y-6 sm:space-y-8">
          <SocialShareButtons 
            shareMessage={SHARE_MESSAGE} 
            shareUrl={shareUrl} 
          />

          <Button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto group relative px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-sm transition-all duration-300 
              bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] text-white 
              hover:shadow-lg hover:scale-102 
              focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520] focus:outline-none"
            aria-label="Retourner à la page d'accueil"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Thanks;