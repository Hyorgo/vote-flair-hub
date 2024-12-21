import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorBackgroundInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorBackgroundInput = ({ value, onChange }: ColorBackgroundInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="background-value">Couleur</Label>
      <Input
        id="background-value"
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};