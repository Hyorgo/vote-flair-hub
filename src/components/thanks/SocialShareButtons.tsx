import { memo } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SocialShareButtonsProps {
  shareMessage: string;
  shareUrl: string;
}

interface SocialButton {
  platform: string;
  label: string;
  icon: typeof Facebook;
  delay: string;
}

export const SocialShareButtons = memo(({ shareMessage, shareUrl }: SocialShareButtonsProps) => {
  const { toast } = useToast();

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
        navigator.clipboard.writeText(`${shareMessage}\n${window.location.origin}`);
        toast({
          title: "Lien copié !",
          description: "Le message a été copié dans votre presse-papiers.",
          duration: 3000,
        });
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400,noopener,noreferrer");
    }
  };

  const buttons: SocialButton[] = [
    { platform: "facebook", label: "Facebook", icon: Facebook, delay: "0" },
    { platform: "twitter", label: "Twitter", icon: Twitter, delay: "100" },
    { platform: "linkedin", label: "LinkedIn", icon: Linkedin, delay: "200" },
    { platform: "instagram", label: "Instagram", icon: Instagram, delay: "300" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
      {buttons.map(({ platform, label, icon: Icon, delay }) => (
        <Button
          key={platform}
          variant="outline"
          onClick={() => handleShare(platform)}
          className="w-full sm:w-auto group relative px-3 sm:px-4 md:px-6 py-2 border border-[#FEC6A1] rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-[#FDE1D3] hover:via-[#FEC6A1] hover:to-[#F2FCE2] hover:text-gray-800 animate-fade-in text-sm md:text-base"
          style={{ animationDelay: `${delay}ms` }}
          aria-label={`Partager sur ${label}`}
        >
          <Icon className="mr-2 h-4 w-4 md:h-5 md:w-5 text-[#FEC6A1] group-hover:text-gray-800 transition-colors" strokeWidth={1.5} />
          <span>{label}</span>
        </Button>
      ))}
    </div>
  );
});

SocialShareButtons.displayName = "SocialShareButtons";