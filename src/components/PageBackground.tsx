import React, { useState, memo } from "react";
import { usePageBackground } from "@/hooks/usePageBackground";
import { LoadingState } from "./page-background/LoadingState";
import { DefaultBackground } from "./page-background/DefaultBackground";
import { VideoBackground } from "./page-background/VideoBackground";
import { ImageBackground } from "./page-background/ImageBackground";
import { StaticBackground } from "./page-background/StaticBackground";

interface PageBackgroundProps {
  pageName: string;
  children: React.ReactNode;
}

export const PageBackground = memo(({ pageName, children }: PageBackgroundProps) => {
  const { background, isLoading, error } = usePageBackground(pageName);
  const [imageLoadError, setImageLoadError] = useState(false);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!background || error || imageLoadError) {
    return <DefaultBackground pageName={pageName}>{children}</DefaultBackground>;
  }

  if (background.background_type === "video") {
    return <VideoBackground videoUrl={background.background_value}>{children}</VideoBackground>;
  }

  if (background.background_type === "image") {
    return (
      <ImageBackground 
        imageUrl={background.background_value} 
        onError={() => setImageLoadError(true)}
      >
        {children}
      </ImageBackground>
    );
  }

  const style = {
    ...(background.background_type === "color" && { 
      backgroundColor: background.background_value,
      transition: 'background-color 300ms ease-in-out'
    }),
    ...(background.background_type === "gradient" && { 
      background: background.background_value,
      transition: 'background 300ms ease-in-out'
    })
  };
  
  return <StaticBackground style={style}>{children}</StaticBackground>;
});

PageBackground.displayName = 'PageBackground';