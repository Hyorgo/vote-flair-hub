import React from "react";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const SocialShare = () => {
  const { toast } = useToast();
  const shareUrl = window.location.origin;
  const shareMessage = encodeURIComponent("Je participe au vote des Lyon d'Or ! 🏆 Votez vous aussi pour vos nominés préférés !");

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
      default:
        // Partage natif si disponible
        if (navigator.share) {
          navigator.share({
            title: "Lyon d'Or",
            text: decodeURIComponent(shareMessage),
            url: shareUrl,
          }).catch(() => {
            // En cas d'erreur ou d'annulation, on copie le lien
            copyToClipboard();
          });
          return;
        }
        // Si le partage natif n'est pas disponible, on copie le lien
        copyToClipboard();
        return;
    }

    window.open(shareLink, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${decodeURIComponent(shareMessage)}\n${shareUrl}`);
    toast({
      title: "Lien copié !",
      description: "Le lien a été copié dans votre presse-papiers.",
      duration: 3000,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:flex-row">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("facebook")}
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        aria-label="Partager sur Facebook"
      >
        <Facebook className="h-5 w-5 text-blue-600" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("twitter")}
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        aria-label="Partager sur Twitter"
      >
        <Twitter className="h-5 w-5 text-sky-500" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("linkedin")}
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="h-5 w-5 text-blue-700" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("native")}
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        aria-label="Partager"
      >
        <Share2 className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  );
};