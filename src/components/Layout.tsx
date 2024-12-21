import React from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./layout/Header";
import { MainContent } from "./layout/MainContent";
import { useGlobalKeyboardNavigation } from "@/hooks/useGlobalKeyboardNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  
  useGlobalKeyboardNavigation();

  return (
    <div className="flex flex-col min-h-screen max-h-fit">
      {/* Fond bleu marine pour toutes les pages sauf admin */}
      {!isAdmin && (
        <div className="fixed inset-0 bg-navy z-0" />
      )}
      
      {/* Effets de fond festifs */}
      <div className="golden-halo z-10" />
      <div className="bokeh-1 z-10" />
      <div className="bokeh-2 z-10" />
      <div className="bokeh-3 z-10" />
      <div className="bokeh-4 z-10" />
      <div className="bokeh-corners z-10" />
      <div className="bokeh-corners-bottom z-10" />
      
      <Header isAdmin={isAdmin} />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};