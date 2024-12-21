import React, { useEffect, useState, memo } from "react";
import { usePageBackground } from "@/hooks/usePageBackground";
import { Loader2 } from "lucide-react";

interface PageBackgroundProps {
  pageName: string;
  children: React.ReactNode;
}

// Utilisation de memo pour éviter les re-renders inutiles
export const PageBackground = memo(({ pageName, children }: PageBackgroundProps) => {
  const { background, isLoading, error } = usePageBackground(pageName);
  const [videoKey, setVideoKey] = useState(Date.now());
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (background?.background_type === "video") {
      setVideoKey(Date.now());
      setIsVideoLoaded(false);
    }
  }, [background?.background_value]);

  // Optimisation du chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Fallback avec transition douce
  if (!background || error) {
    const defaultBackground = pageName === "thanks" 
      ? "bg-festive-gradient" 
      : "bg-gradient-to-b from-gray-900 to-gray-800";
    
    return (
      <div className={`min-h-screen ${defaultBackground} transition-colors duration-300`}>
        {children}
      </div>
    );
  }

  if (background.background_type === "video") {
    return (
      <div className="min-h-screen relative">
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 transition-opacity duration-300" />
        )}
        <video
          key={videoKey}
          autoPlay
          loop
          muted
          playsInline
          className={`fixed inset-0 w-full h-full object-cover -z-10 transition-opacity duration-300 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={background.background_value}
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={(e) => {
            console.error("Video loading error:", e);
            console.log("Video URL:", background.background_value);
          }}
        />
        <div className="relative z-0">{children}</div>
      </div>
    );
  }

  // Optimisation du rendu des backgrounds statiques
  const style = {
    ...(background.background_type === "color" && { 
      backgroundColor: background.background_value,
      transition: 'background-color 300ms ease-in-out'
    }),
    ...(background.background_type === "gradient" && { 
      background: background.background_value,
      transition: 'background 300ms ease-in-out'
    }),
    ...(background.background_type === "image" && {
      backgroundImage: `url(${background.background_value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      transition: 'background-image 300ms ease-in-out'
    })
  };
  
  return (
    <div className="min-h-screen relative" style={style}>
      {children}
    </div>
  );
});

PageBackground.displayName = 'PageBackground';