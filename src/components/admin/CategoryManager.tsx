import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CategoryManager = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([
    { id: "1", name: "Meilleur Restaurant", nominees: 3 },
    // ... autres catégories
  ]);

  const handleAddCategory = () => {
    toast({
      title: "Catégorie ajoutée",
      description: "La nouvelle catégorie a été créée avec succès.",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Input placeholder="Nom de la nouvelle catégorie" className="max-w-sm" />
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Nominés</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.nominees}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};