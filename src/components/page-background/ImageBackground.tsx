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
    console.log("Attempting to load image:", imageUrl);
  }, [imageUrl]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const currentAttempt = loadAttempts + 1;
    console.error("Image loading error details:", {
      src: e.currentTarget.src,
      naturalWidth: e.currentTarget.naturalWidth,
      naturalHeight: e.currentTarget.naturalHeight,
      attempt: currentAttempt,
      error: e,
    });

    if (loadAttempts < maxAttempts) {
      setLoadAttempts(prev => prev + 1);
      // Force cache bypass with timestamp
      const timestamp = Date.now();
      const newUrl = `${imageUrl}?retry=${currentAttempt}&t=${timestamp}`;
      console.log(`Retrying with URL: ${newUrl}`);
      e.currentTarget.src = newUrl;
    } else {
      console.error("Max load attempts reached for image:", imageUrl);
      onError();
    }
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", imageUrl);
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
          backgroundImage: isImageLoaded ? `url(${imageUrl})` : 'none',
        }}
      />
      <img
        src={imageUrl}
        alt=""
        className="hidden"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};