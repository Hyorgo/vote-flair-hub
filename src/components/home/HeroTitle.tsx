import React from "react";

export const HeroTitle = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Logo container with refined styling */}
      <div className="w-full max-w-3xl">
        <img 
          src="/lovable-uploads/fc2b4a26-5140-4c2d-bbb9-5945e90f7f78.png" 
          alt="Sortir Lyon x Sixtynine Event"
          className="w-full h-auto opacity-85 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Les Awards du Nightlife
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Votez pour vos établissements préférés et célébrez avec nous le meilleur de la vie nocturne lyonnaise !
        </p>
      </div>
    </div>
  );
};