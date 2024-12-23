import React from "react";
import { Layout } from "@/components/Layout";
import { HeroTitle } from "@/components/home/HeroTitle";
import { Features } from "@/components/home/Features";
import { RegistrationCard } from "@/components/home/RegistrationCard";
import { BackgroundEffects } from "@/components/home/BackgroundEffects";

const Index = () => {
  return (
    <Layout>
      <BackgroundEffects />
      
      <div className="min-h-screen w-full flex flex-col items-center justify-center 
        space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16
        px-4 sm:px-6 py-4 sm:py-6 md:py-8 lg:py-12"
      >
        {/* Logos des organisateurs */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <img 
              src="/lovable-uploads/fc2b4a26-5140-4c2d-bbb9-5945e90f7f78.png" 
              alt="Sortir Lyon x Sixtynine Event"
              className="w-full max-w-[600px] h-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <HeroTitle />
        <Features />
        <RegistrationCard />
      </div>
    </Layout>
  );
};

export default Index;