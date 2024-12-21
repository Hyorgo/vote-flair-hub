import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PageSelector = ({ value, onChange }: PageSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="page-name">Nom de la page</Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Sélectionnez une page" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg border-0">
          <SelectItem value="index">Accueil</SelectItem>
          <SelectItem value="admin">Administration</SelectItem>
          <SelectItem value="categories">Catégories</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};