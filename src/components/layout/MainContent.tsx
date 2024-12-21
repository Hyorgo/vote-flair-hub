import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  return (
    <main className="flex-1 overflow-auto">
      {children}
    </main>
  );
};