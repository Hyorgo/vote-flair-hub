import { useState, useEffect } from "react";

interface ImageBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  onError: () => void;
}

export const ImageBackground = ({ imageUrl, children, onError }: ImageBackgroundProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const maxAttempts = 3;

  useEffect(() => {
    setIsImageLoaded(false);
    setLoadAttempts(0);
  }, [imageUrl]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Image loading error details:", {
      src: e.currentTarget.src,
      naturalWidth: e.currentTarget.naturalWidth,
      naturalHeight: e.currentTarget.naturalHeight,
      attempt: loadAttempts + 1,
    });

    if (loadAttempts < maxAttempts) {
      setLoadAttempts(prev => prev + 1);
      // Retry loading with a cache-busting parameter
      e.currentTarget.src = `${imageUrl}?retry=${loadAttempts + 1}`;
    } else {
      console.error("Max retry attempts reached for image:", imageUrl);
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