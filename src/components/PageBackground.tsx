import React, { useEffect, useState } from "react";
import { usePageBackground } from "@/hooks/usePageBackground";
import { Loader2 } from "lucide-react";

interface PageBackgroundProps {
  pageName: string;
  children: React.ReactNode;
}

export const PageBackground = ({ pageName, children }: PageBackgroundProps) => {
  const { background, isLoading, error, getBackgroundStyle } = usePageBackground(pageName);
  const [videoKey, setVideoKey] = useState(Date.now());

  useEffect(() => {
    // Force video reload when background changes
    if (background?.background_type === "video") {
      setVideoKey(Date.now());
    }
  }, [background?.background_value]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show error state
  if (error) {
    console.error("Background loading error:", error);
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  if (background?.background_type === "video") {
    return (
      <div className="min-h-screen relative">
        <video
          key={videoKey}
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
          src={background.background_value}
          onError={(e) => {
            console.error("Video loading error:", e);
            console.log("Video URL:", background.background_value);
          }}
        />
        <div className="relative z-0">{children}</div>
      </div>
    );
  }

  const style = getBackgroundStyle();
  
  return (
    <div 
      className="min-h-screen relative" 
      style={{
        ...style,
        backgroundColor: background?.background_type === "color" ? background.background_value : undefined,
      }}
    >
      {children}
    </div>
  );
};