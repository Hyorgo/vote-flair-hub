import { useState, useEffect } from "react";

interface VideoBackgroundProps {
  videoUrl: string;
  children: React.ReactNode;
}

export const VideoBackground = ({ videoUrl, children }: VideoBackgroundProps) => {
  const [videoKey, setVideoKey] = useState(Date.now());
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoKey(Date.now());
    setIsVideoLoaded(false);
  }, [videoUrl]);

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
        src={videoUrl}
        onLoadedData={() => setIsVideoLoaded(true)}
        onError={(e) => {
          console.error("Video loading error:", e);
          console.log("Video URL:", videoUrl);
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};