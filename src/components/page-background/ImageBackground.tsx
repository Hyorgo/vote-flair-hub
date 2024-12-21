import { useState, useEffect } from "react";

interface ImageBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  onError: () => void;
}

export const ImageBackground = ({ imageUrl, children, onError }: ImageBackgroundProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [imageUrl]);

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
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <img
        src={imageUrl}
        alt=""
        className="hidden"
        onLoad={() => {
          console.log("Image loaded successfully");
          setIsImageLoaded(true);
        }}
        onError={(e) => {
          console.error("Image loading error:", e);
          onError();
          console.log("Image URL:", imageUrl);
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};