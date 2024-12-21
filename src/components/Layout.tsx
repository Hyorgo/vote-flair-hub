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
    <div className="flex flex-col min-h-screen max-h-fit relative">
      {/* Background elements with lower z-index */}
      <div className="fixed inset-0 z-0">
        {!isAdmin && (
          <div className="absolute inset-0 bg-navy" />
        )}
        <div className="absolute inset-0">
          <div className="golden-halo" />
          <div className="bokeh-1" />
          <div className="bokeh-2" />
          <div className="bokeh-3" />
          <div className="bokeh-4" />
          <div className="bokeh-corners" />
          <div className="bokeh-corners-bottom" />
        </div>
      </div>
      
      {/* Main content with higher z-index */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header isAdmin={isAdmin} />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
    </div>
  );
};