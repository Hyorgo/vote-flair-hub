import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorBackgroundInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorBackgroundInput = ({ value, onChange }: ColorBackgroundInputProps) => {
  // Ensure we always have a valid hex color
  const safeValue = value || "#ffffff";
  
  return (
    <div className="space-y-2">
      <Label htmlFor="background-value">Couleur</Label>
      <Input
        id="background-value"
        type="color"
        value={safeValue}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full"
      />
    </div>
  );
};