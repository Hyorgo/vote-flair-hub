import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Settings, PartyPopper } from "lucide-react";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-festive-gradient flex flex-col">
      <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/10 shadow-lg supports-[backdrop-filter]:bg-white/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
            <PartyPopper className="h-6 w-6 animate-party" />
            Application de Vote
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
  );
};