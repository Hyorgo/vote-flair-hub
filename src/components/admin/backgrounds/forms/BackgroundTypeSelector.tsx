import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BackgroundTypeSelectorProps {
  value: "color" | "image" | "video";
  onChange: (value: "color" | "image" | "video") => void;
}

export const BackgroundTypeSelector = ({ value, onChange }: BackgroundTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="background-type">Type de fond</Label>
      <Select
        value={value}
        onValueChange={(value: "color" | "image" | "video") => onChange(value)}
      >
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Sélectionnez un type" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg border-0">
          <SelectItem value="color">Couleur</SelectItem>
          <SelectItem value="image">Image</SelectItem>
          <SelectItem value="video">Vidéo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};