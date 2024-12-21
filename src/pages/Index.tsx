import React from "react";
import { Layout } from "@/components/Layout";
import { HeroTitle } from "@/components/home/HeroTitle";
import { Features } from "@/components/home/Features";
import { RegistrationCard } from "@/components/home/RegistrationCard";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 px-4 mt-8 sm:mt-16">
        <HeroTitle />
        <Features />
        <RegistrationCard />
      </div>
    </Layout>
  );
};

export default Index;