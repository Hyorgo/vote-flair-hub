import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { NomineeCard } from "@/components/NomineeCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Données de test
const categories = [
  {
    id: "1",
    name: "Meilleur Restaurant",
    nominees: [
      {
        id: "1",
        name: "Le Gourmet",
        description: "Cuisine française raffinée dans un cadre élégant",
      },
      {
        id: "2",
        name: "Sushi Master",
        description: "Les meilleurs sushis de la ville",
      },
      {
        id: "3",
        name: "La Trattoria",
        description: "Authentique cuisine italienne",
      },
    ],
  },
  // Autres catégories...
];

const Index = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleVote = (nomineeId: string) => {
    setSelections(prev => ({
      ...prev,
      [categories[currentCategory].id]: nomineeId
    }));
    
    toast({
      title: "Vote enregistré !",
      description: "Votre choix a été sauvegardé avec succès.",
    });
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentCategory(prev => 
      direction === "next" 
        ? Math.min(prev + 1, categories.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const category = categories[currentCategory];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => handleNavigation("prev")}
            disabled={currentCategory === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          <h1 className="text-3xl font-bold text-center text-primary">
            {category.name}
          </h1>
          <Button
            variant="outline"
            onClick={() => handleNavigation("next")}
            disabled={currentCategory === categories.length - 1}
          >
            Suivant
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.nominees.map((nominee) => (
            <NomineeCard
              key={nominee.id}
              nominee={nominee}
              isSelected={selections[category.id] === nominee.id}
              onSelect={handleVote}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;