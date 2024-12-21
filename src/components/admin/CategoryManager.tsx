import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CategoriesList } from "./CategoriesList";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newNomineeName, setNewNomineeName] = useState("");
  const [newNomineeDescription, setNewNomineeDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Connexion automatique pour l'administration
  useEffect(() => {
    const signIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'g.sauvat@ideai.fr',
        password: 'Gregolimano009:)'
      });
      
      if (error) {
        console.error('Erreur de connexion:', error.message);
        toast({
          title: "Erreur de connexion",
          description: "Impossible de se connecter à l'interface d'administration.",
          variant: "destructive",
        });
      } else {
        setIsLoading(false);
      }
    };

    signIn();
  }, []);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          nominees:nominees(count)
        `);

      if (error) throw error;
      return data.map(category => ({
        ...category,
        nominees: category.nominees[0].count || 0
      }));
    },
    enabled: !isLoading // N'exécute la requête que lorsque l'authentification est terminée
  });

  const addCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Catégorie ajoutée",
        description: "La nouvelle catégorie a été créée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la catégorie.",
        variant: "destructive",
      });
    }
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès.",
      });
    }
  });

  // Add nominee mutation
  const addNomineeMutation = useMutation({
    mutationFn: async ({ categoryId, name, description }: { categoryId: string, name: string, description: string }) => {
      const { data, error } = await supabase
        .from('nominees')
        .insert([{
          category_id: categoryId,
          name,
          description,
          image_url: "https://images.unsplash.com/photo-1527576539890-dfa815648363"
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Nominé ajouté",
        description: "Le nouveau nominé a été ajouté avec succès.",
      });
    }
  });

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }

    addCategoryMutation.mutate(newCategoryName.trim());
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id);
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

    addNomineeMutation.mutate({
      categoryId,
      name: newNomineeName.trim(),
      description: newNomineeDescription.trim()
    });
    
    setNewNomineeName("");
    setNewNomineeDescription("");
    setSelectedCategory(null);
  };

  if (isLoading) {
    return <div>Chargement de l'interface d'administration...</div>;
  }

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
