interface DefaultBackgroundProps {
  pageName: string;
  children: React.ReactNode;
}

export const DefaultBackground = ({ pageName, children }: DefaultBackgroundProps) => {
  const isAdminPage = pageName.startsWith("admin");
  
  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 transition-colors duration-300">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Effets de fond festifs */}
      <div className="golden-halo" />
      <div className="bokeh-1" />
      <div className="bokeh-2" />
      <div className="bokeh-3" />
      <div className="bokeh-4" />
      <div className="bokeh-corners" />
      <div className="bokeh-corners-bottom" />

      {/* Fond de base avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-90" />

      {/* Contenu de la page avec z-index plus élevé */}
      <div className="relative z-[2] min-h-screen">
        {children}
      </div>
    </div>
  );
};