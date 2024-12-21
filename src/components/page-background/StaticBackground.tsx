interface StaticBackgroundProps {
  style: React.CSSProperties;
  children: React.ReactNode;
}

export const StaticBackground = ({ style, children }: StaticBackgroundProps) => {
  return (
    <div className="min-h-screen relative" style={style}>
      {children}
    </div>
  );
};