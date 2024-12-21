import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ImageBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  onError: () => void;
}

export const ImageBackground = ({ imageUrl, children, onError }: ImageBackgroundProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const maxAttempts = 3;
  const { toast } = useToast();

  useEffect(() => {
    setIsImageLoaded(false);
    setLoadAttempts(0);
    console.log("Tentative de chargement de l'image:", imageUrl);
  }, [imageUrl]);

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
      // Ajout d'un timestamp pour éviter le cache
      const newUrl = imageUrl.startsWith('http') 
        ? `${imageUrl}?retry=${currentAttempt}&t=${Date.now()}`
        : `${window.location.origin}${imageUrl}?retry=${currentAttempt}&t=${Date.now()}`;
      
      console.log(`Nouvelle tentative avec l'URL: ${newUrl}`);
      e.currentTarget.src = newUrl;
      
      toast({
        title: "Chargement de l'image",
        description: `Tentative ${currentAttempt}/${maxAttempts}...`,
        variant: "default",
      });
    } else {
      console.error("Nombre maximum de tentatives atteint pour l'image:", imageUrl);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger l'image de fond",
        variant: "destructive",
      });
      onError();
    }
  };

  const handleImageLoad = () => {
    console.log("Image chargée avec succès:", imageUrl);
    setIsImageLoaded(true);
    toast({
      title: "Image chargée",
      description: "L'image de fond a été chargée avec succès",
      variant: "default",
    });
  };

  // Construire l'URL complète si c'est un chemin relatif
  const fullImageUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `${window.location.origin}${imageUrl}`;

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
          backgroundImage: isImageLoaded ? `url(${fullImageUrl})` : 'none',
        }}
      />
      <img
        src={fullImageUrl}
        alt=""
        className="hidden"
        onLoad={handleImageLoad}
        onError={handleImageError}
        crossOrigin="anonymous"
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};