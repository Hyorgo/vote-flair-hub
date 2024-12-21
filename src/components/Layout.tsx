import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Footer } from "./Footer";
import { PageBackground } from "./PageBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const pageName = location.pathname === "/" ? "index" : location.pathname.slice(1);

  return (
    <PageBackground pageName={pageName}>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/10 shadow-lg supports-[backdrop-filter]:bg-white/30">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/f615e6d4-11eb-4499-a3a3-d69273ded6e7.png" 
                alt="Lyon d'Or Logo" 
                className="h-12 object-contain"
              />
            </Link>
            {!isAdmin ? (
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/">
                <Button variant="outline">Retour au vote</Button>
              </Link>
            )}
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </PageBackground>
  );
};