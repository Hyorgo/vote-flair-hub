import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface ImageBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  onError: () => void;
}

export const ImageBackground = ({ imageUrl, children, onError }: ImageBackgroundProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [finalImageUrl, setFinalImageUrl] = useState<string>("");
  const maxAttempts = 3;
  const { toast } = useToast();

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (imageUrl.startsWith('/lovable-uploads/')) {
          setFinalImageUrl(imageUrl);
          return;
        }

        const { data: publicUrl } = supabase.storage
          .from('backgrounds')
          .getPublicUrl(imageUrl);

        if (publicUrl) {
          console.log("URL Supabase générée:", publicUrl.publicUrl);
          setFinalImageUrl(publicUrl.publicUrl);
        } else {
          console.error("Impossible de générer l'URL publique pour:", imageUrl);
          onError();
        }
      } catch (error) {
        console.error("Erreur lors de la génération de l'URL:", error);
        onError();
      }
    };

    setIsImageLoaded(false);
    setLoadAttempts(0);
    loadImage();
  }, [imageUrl, onError]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const currentAttempt = loadAttempts + 1;
    console.error("Détails de l'erreur de chargement:", {
      src: e.currentTarget.src,
      naturalWidth: e.currentTarget.naturalWidth,
      naturalHeight: e.currentTarget.naturalHeight,
      attempt: currentAttempt,
      error: e,
    });

    if (currentAttempt < maxAttempts) {
      setLoadAttempts(currentAttempt);
      e.currentTarget.src = finalImageUrl + '?t=' + new Date().getTime();
    } else {
      console.error("Nombre maximum de tentatives atteint pour l'image:", imageUrl);
      onError();
    }
  };

  const handleImageLoad = () => {
    console.log("Image chargée avec succès:", finalImageUrl);
    setIsImageLoaded(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Halos animés */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-float top-[-20%] left-[-10%]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl animate-float delay-1000 top-[60%] right-[-5%]" />
        <div className="absolute w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-bounce-light top-[30%] left-[50%]" />
      </div>

      <div 
        className={`absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-gray-800 transition-opacity duration-700 ${
          isImageLoaded ? 'opacity-0' : 'opacity-100'
        }`} 
      />
      
      {finalImageUrl && (
        <div 
          className={`absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
            isImageLoaded ? 'opacity-70' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${finalImageUrl})`,
          }}
        />
      )}
      
      {finalImageUrl && (
        <img
          src={finalImageUrl}
          alt=""
          className="hidden"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      <div className="relative z-[2]">{children}</div>
    </div>
  );
};