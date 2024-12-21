import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Thanks = () => {
  const navigate = useNavigate();
  const shareMessage = encodeURIComponent("Je viens de voter pour les Lyon d'Or ! 🏆 Votez vous aussi pour vos nominés préférés !");
  const shareUrl = encodeURIComponent(window.location.origin);

  const handleShare = (platform: string) => {
    let shareLink = "";
    
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareMessage}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${shareMessage}&url=${shareUrl}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case "instagram":
        // Instagram doesn't support direct sharing via URL, we'll copy the message to clipboard
        navigator.clipboard.writeText(`${shareMessage}\n${window.location.origin}`);
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
          Merci pour votre vote !
        </h1>
        
        <p className="text-xl mb-12 text-gray-200">
          Partagez votre participation et invitez vos amis à voter !
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant="outline"
            onClick={() => handleShare("facebook")}
            className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white"
          >
            <Facebook className="mr-2 h-5 w-5 text-[#DAA520]/80 group-hover:text-white transition-colors" strokeWidth={1.5} />
            <span>Facebook</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleShare("twitter")}
            className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white"
          >
            <Twitter className="mr-2 h-5 w-5 text-[#DAA520]/80 group-hover:text-white transition-colors" strokeWidth={1.5} />
            <span>Twitter</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleShare("linkedin")}
            className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white"
          >
            <Linkedin className="mr-2 h-5 w-5 text-[#DAA520]/80 group-hover:text-white transition-colors" strokeWidth={1.5} />
            <span>LinkedIn</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleShare("instagram")}
            className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white"
          >
            <Instagram className="mr-2 h-5 w-5 text-[#DAA520]/80 group-hover:text-white transition-colors" strokeWidth={1.5} />
            <span>Instagram</span>
          </Button>
        </div>

        <Button
          onClick={() => navigate("/")}
          className="group relative px-6 py-2 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] hover:text-white"
        >
          Retour à l'accueil
        </Button>
      </div>
    </Layout>
  );
};

export default Thanks;