import { Button } from "@/components/ui/button";
import { PageSelector } from "./forms/PageSelector";
import { BackgroundTypeSelector } from "./forms/BackgroundTypeSelector";
import { ColorBackgroundInput } from "./forms/ColorBackgroundInput";
import { ImageBackgroundInput } from "./forms/ImageBackgroundInput";
import { VideoBackgroundInput } from "./forms/VideoBackgroundInput";
import { GradientColorInput } from "./forms/GradientColorInput";
import { useBackgroundForm } from "@/hooks/useBackgroundForm";

interface BackgroundFormProps {
  onSuccess: () => void;
}

export const BackgroundForm = ({ onSuccess }: BackgroundFormProps) => {
  const {
    isLoading,
    pageName,
    setPageName,
    backgroundType,
    setBackgroundType,
    backgroundValue,
    setBackgroundValue,
    file,
    setFile,
    handleSubmit,
  } = useBackgroundForm({ onSuccess });

  const renderBackgroundInput = () => {
    switch (backgroundType) {
      case "color":
        return (
          <ColorBackgroundInput
            value={backgroundValue}
            onChange={setBackgroundValue}
          />
        );
      case "gradient":
        return (
          <GradientColorInput
            value={backgroundValue}
            onChange={setBackgroundValue}
          />
        );
      case "video":
        return (
          <VideoBackgroundInput
            value={backgroundValue}
            onChange={setBackgroundValue}
          />
        );
      case "image":
        return (
          <ImageBackgroundInput
            onFileChange={setFile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau fond</h2>
      
      <PageSelector 
        value={pageName}
        onChange={setPageName}
      />

      <BackgroundTypeSelector
        value={backgroundType}
        onChange={setBackgroundType}
      />

      {renderBackgroundInput()}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Ajout en cours..." : "Ajouter le fond"}
      </Button>
    </form>
  );
};