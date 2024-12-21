import React from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./layout/Header";
import { MainContent } from "./layout/MainContent";
import { PageBackground } from "./PageBackground";
import { useGlobalKeyboardNavigation } from "@/hooks/useGlobalKeyboardNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const pageName = location.pathname === "/" ? "index" : location.pathname.slice(1);
  
  useGlobalKeyboardNavigation();

  return (
    <PageBackground pageName={pageName}>
      <div className="flex flex-col min-h-screen max-h-fit">
        <Header isAdmin={isAdmin} />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
    </PageBackground>
  );
};