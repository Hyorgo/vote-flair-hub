import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VideoBackgroundInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const VideoBackgroundInput = ({ value, onChange }: VideoBackgroundInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="background-video-value">URL de la vidéo</Label>
      <Input
        id="background-video-value"
        type="url"
        placeholder="https://example.com/video.mp4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};