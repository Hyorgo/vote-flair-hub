import React from 'react';
import Features from '../components/home/Features';
import HeroTitle from '../components/home/HeroTitle';
import RegistrationCard from '../components/home/RegistrationCard';

const Index = () => {
  return (
    <div className="relative w-full">
      <div className="golden-halo" />
      <div className="bokeh-1" />
      <div className="bokeh-2" />
      <div className="bokeh-3" />
      <div className="bokeh-4" />
      <div className="bokeh-5" />
      <div className="bokeh-6" />
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 sm:space-y-10 lg:space-y-12 py-6 sm:py-8 lg:py-12">
        <HeroTitle />
        <Features />
        <RegistrationCard />
      </div>
    </div>
  );
};

export default Index;