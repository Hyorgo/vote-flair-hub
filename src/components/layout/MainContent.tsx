import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  return (
    <main className="flex-1 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {children}
      </div>
    </main>
  );
};