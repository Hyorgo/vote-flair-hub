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
        py-4 sm:py-6 md:py-8 lg:py-12"
      >
        <HeroTitle />
        <Features />
        <RegistrationCard />
      </div>
    </Layout>
  );
};

export default Index;