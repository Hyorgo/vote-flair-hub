import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareButtonsProps {
  shareMessage: string;
  shareUrl: string;
}

export const SocialShareButtons = ({ shareMessage, shareUrl }: SocialShareButtonsProps) => {
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
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <Button
        variant="outline"
        onClick={() => handleShare("facebook")}
        className="group relative px-6 py-2 border border-[#FEC6A1] rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-[#FDE1D3] hover:via-[#FEC6A1] hover:to-[#F2FCE2] hover:text-gray-800 animate-fade-in"
      >
        <Facebook className="mr-2 h-5 w-5 text-[#FEC6A1] group-hover:text-gray-800 transition-colors" strokeWidth={1.5} />
        <span>Facebook</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => handleShare("twitter")}
        className="group relative px-6 py-2 border border-[#FEC6A1] rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-[#FDE1D3] hover:via-[#FEC6A1] hover:to-[#F2FCE2] hover:text-gray-800 animate-fade-in delay-100"
      >
        <Twitter className="mr-2 h-5 w-5 text-[#FEC6A1] group-hover:text-gray-800 transition-colors" strokeWidth={1.5} />
        <span>Twitter</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => handleShare("linkedin")}
        className="group relative px-6 py-2 border border-[#FEC6A1] rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-[#FDE1D3] hover:via-[#FEC6A1] hover:to-[#F2FCE2] hover:text-gray-800 animate-fade-in delay-200"
      >
        <Linkedin className="mr-2 h-5 w-5 text-[#FEC6A1] group-hover:text-gray-800 transition-colors" strokeWidth={1.5} />
        <span>LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => handleShare("instagram")}
        className="group relative px-6 py-2 border border-[#FEC6A1] rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-[#FDE1D3] hover:via-[#FEC6A1] hover:to-[#F2FCE2] hover:text-gray-800 animate-fade-in delay-300"
      >
        <Instagram className="mr-2 h-5 w-5 text-[#FEC6A1] group-hover:text-gray-800 transition-colors" strokeWidth={1.5} />
        <span>Instagram</span>
      </Button>
    </div>
  );
};