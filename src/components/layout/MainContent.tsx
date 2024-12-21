import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  return (
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
  );
};