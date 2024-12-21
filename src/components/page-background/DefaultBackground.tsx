interface DefaultBackgroundProps {
  pageName: string;
  children: React.ReactNode;
}

export const DefaultBackground = ({ pageName, children }: DefaultBackgroundProps) => {
  const defaultBackground = pageName === "thanks" 
    ? "bg-festive-gradient" 
    : "bg-gradient-to-b from-gray-900 to-gray-800";
  
  return (
    <div className={`min-h-screen ${defaultBackground} transition-colors duration-300`}>
      {children}
    </div>
  );
};