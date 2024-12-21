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
      setIsImageLoaded(false);
      setLoadAttempts(0);
      
      try {
        // Si l'URL commence par /lovable-uploads/, c'est une image du dossier public
        if (imageUrl.startsWith('/lovable-uploads/')) {
          setFinalImageUrl(imageUrl);
          return;
        }

        // Sinon, on considère que c'est une image du bucket Supabase
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

    if (loadAttempts < maxAttempts) {
      setLoadAttempts(prev => prev + 1);
      // Forcer le rechargement de l'image
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
    <div className="min-h-screen relative">
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 transition-opacity duration-300" />
      )}
      <div 
        className={`fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-300 -z-10 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          backgroundImage: isImageLoaded && finalImageUrl ? `url(${finalImageUrl})` : 'none',
        }}
      />
      <img
        src={finalImageUrl}
        alt=""
        className="hidden"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};