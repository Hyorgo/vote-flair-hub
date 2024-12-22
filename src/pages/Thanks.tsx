import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SocialShareButtons } from "@/components/thanks/SocialShareButtons";
import { ThankYouTitle } from "@/components/thanks/ThankYouTitle";
import { ConfettiEffect } from "@/components/thanks/ConfettiEffect";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Thanks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const shareMessage = encodeURIComponent("Je viens de voter pour les Lyon d'Or ! 🏆 Votez vous aussi pour vos nominés préférés !");
  const shareUrl = encodeURIComponent(window.location.origin);

  useEffect(() => {
    // Afficher un toast de confirmation
    toast({
      title: "Vote enregistré !",
      description: "Merci de votre participation aux Lyon d'Or.",
      duration: 5000,
    });

    // Mettre à jour le titre de la page
    document.title = "Merci de votre vote ! | Lyon d'Or";

    // Nettoyer lors du démontage
    return () => {
      document.title = "Lyon d'Or";
    };
  }, [toast]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-center mt-16 md:mt-24 animate-fade-in">
        <ConfettiEffect />
        <ThankYouTitle />
        
        <p className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Votre vote a bien été pris en compte. Partagez votre participation et invitez vos amis à voter !
        </p>

        <SocialShareButtons shareMessage={shareMessage} shareUrl={shareUrl} />

        <Button
          onClick={() => navigate("/")}
          className="group relative px-6 py-3 rounded-lg shadow-sm transition-all duration-300 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] text-white hover:shadow-lg hover:scale-102 focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520] focus:outline-none"
          aria-label="Retourner à la page d'accueil"
        >
          Retour à l'accueil
        </Button>
      </div>
    </Layout>
  );
};

export default Thanks;