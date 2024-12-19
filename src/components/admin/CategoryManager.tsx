import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CategoriesList } from "./CategoriesList";

interface Nominee {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
  nominees: number;
  nomineesList?: Nominee[];
}

export const CategoryManager = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: "1", 
      name: "Meilleur Restaurant", 
      nominees: 0,
      nomineesList: []
    },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newNomineeName, setNewNomineeName] = useState("");
  const [newNomineeDescription, setNewNomineeDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }

    const newCategory = {
      id: (categories.length + 1).toString(),
      name: newCategoryName.trim(),
      nominees: 0,
      nomineesList: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    
    toast({
      title: "Catégorie ajoutée",
      description: "La nouvelle catégorie a été créée avec succès.",
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
    toast({
      title: "Catégorie supprimée",
      description: "La catégorie a été supprimée avec succès.",
    });
  };

  const handleAddNominee = (categoryId: string) => {
    if (!newNomineeName.trim() || !newNomineeDescription.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom et la description du nominé sont requis.",
        variant: "destructive",
      });
      return;
    }

    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        const newNominee = {
          id: (category.nomineesList?.length || 0 + 1).toString(),
          name: newNomineeName.trim(),
          description: newNomineeDescription.trim(),
          imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363"
        };
        
        return {
          ...category,
          nominees: (category.nominees || 0) + 1,
          nomineesList: [...(category.nomineesList || []), newNominee],
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    setNewNomineeName("");
    setNewNomineeDescription("");
    setSelectedCategory(null);

    toast({
      title: "Nominé ajouté",
      description: "Le nouveau nominé a été ajouté avec succès.",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Nom de la nouvelle catégorie" 
          className="max-w-sm"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddCategory();
            }
          }}
        />
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      <CategoriesList
        categories={categories}
        handleDeleteCategory={handleDeleteCategory}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        newNomineeName={newNomineeName}
        setNewNomineeName={setNewNomineeName}
        newNomineeDescription={newNomineeDescription}
        setNewNomineeDescription={setNewNomineeDescription}
        handleAddNominee={handleAddNominee}
      />
    </div>
  );
};