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
    <div className="flex flex-col min-h-screen h-screen max-h-screen overflow-y-auto">
      {/* Background elements with lower z-index */}
      <div className="fixed inset-0 z-0">
        {!isAdmin && (
          <>
            {/* Navy background below everything */}
            <div className="absolute inset-0 bg-navy-dark -z-10" />
            {/* Halos above the navy background */}
            <div className="golden-halo" />
            <div className="fuchsia-halo" />
            <div className="blue-halo" />
          </>
        )}
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