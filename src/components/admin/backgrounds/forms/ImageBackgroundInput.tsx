import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

interface ImageBackgroundInputProps {
  onFileChange: (file: File | null) => void;
}

export const ImageBackgroundInput = ({ onFileChange }: ImageBackgroundInputProps) => {
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast({
          title: "Erreur",
          description: "Le fichier est trop volumineux. La taille maximale est de 50MB.",
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="background-image-file">
        Fichier image (max 50MB)
      </Label>
      <Input
        id="background-image-file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};