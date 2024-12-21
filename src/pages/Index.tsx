import React from "react";
import { Layout } from "@/components/Layout";
import { HeroTitle } from "@/components/home/HeroTitle";
import { Features } from "@/components/home/Features";
import { RegistrationCard } from "@/components/home/RegistrationCard";

const Index = () => {
  return (
    <Layout>
      {/* Effets de fond festifs */}
      <div className="golden-halo" />
      <div className="bokeh-1" />
      <div className="bokeh-2" />
      <div className="bokeh-3" />
      <div className="bokeh-4" />
      <div className="bokeh-corners" />
      <div className="bokeh-corners-bottom" />
      
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 sm:space-y-10 lg:space-y-12 py-6 sm:py-8 lg:py-12">
        <HeroTitle />
        <Features />
        <RegistrationCard />
      </div>
    </Layout>
  );
};

export default Index;