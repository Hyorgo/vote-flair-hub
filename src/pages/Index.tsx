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
      
      <div className="min-h-[80vh] flex flex-col items-center justify-center 
        space-y-8 sm:space-y-10 lg:space-y-12 
        py-6 sm:py-8 lg:py-12"
      >
        <HeroTitle />
        <Features />
        <RegistrationCard />
      </div>
    </Layout>
  );
};

export default Index;