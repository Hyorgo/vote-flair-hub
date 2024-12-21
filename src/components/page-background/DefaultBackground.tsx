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

      {/* Halos animés au-dessus */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {/* Halo violet plus grand et plus opaque */}
        <div className="absolute w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-[100px] animate-float top-[-30%] left-[-20%]" />
        
        {/* Halo bleu plus grand et plus opaque */}
        <div className="absolute w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[80px] animate-float delay-1000 top-[50%] right-[-10%]" />
        
        {/* Halo rose plus grand et plus opaque */}
        <div className="absolute w-[900px] h-[900px] bg-pink-500/20 rounded-full blur-[120px] animate-bounce-light top-[20%] left-[40%]" />
        
        {/* Nouveau halo violet clair pour plus de profondeur */}
        <div className="absolute w-[700px] h-[700px] bg-violet-400/20 rounded-full blur-[90px] animate-float delay-500 top-[40%] left-[10%]" />
      </div>

      {/* Fond de base avec dégradé plus sombre */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0F172A] to-gray-900 opacity-95" />

      {/* Contenu de la page avec z-index plus élevé */}
      <div className="relative z-[2] min-h-screen">
        {children}
      </div>
    </div>
  );
};