import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { NomineeCard } from "@/components/NomineeCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

// Date de fin des votes (24h à partir de maintenant pour cet exemple)
const END_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime();

const Index = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = END_TIME - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("VOTES TERMINÉS");
        toast({
          title: "Les votes sont terminés !",
          description: "Merci de votre participation.",
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [toast]);

  const handleVote = (nomineeId: string) => {
    const categoryId = categories[currentCategory].id;
    const isModifying = selections[categoryId] === nomineeId;

    setSelections(prev => ({
      ...prev,
      [categoryId]: isModifying ? "" : nomineeId
    }));
    
    toast({
      title: isModifying ? "Vote annulé !" : "Vote enregistré !",
      description: isModifying 
        ? "Vous pouvez maintenant choisir un autre nominé" 
        : "Cliquez à nouveau sur le même nominé pour modifier votre vote",
      className: "animate-bounce",
    });
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentCategory(prev => 
      direction === "next" 
        ? Math.min(prev + 1, categories.length - 1)
        : Math.max(prev - 0, 0)
    );
  };

  const handleTabChange = (value: string) => {
    setCurrentCategory(Number(value));
  };

  const category = categories[currentCategory];
  const progress = ((currentCategory + 1) / categories.length) * 100;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-primary">Temps restant</h2>
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary animate-pulse" />
              <span className="font-mono text-lg">{timeLeft}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Menu rapide entre catégories */}
        <Tabs value={currentCategory.toString()} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="w-full flex-wrap h-auto gap-2 bg-white/80 backdrop-blur-sm p-2">
            {categories.map((cat, index) => (
              <TabsTrigger
                key={cat.id}
                value={index.toString()}
                className={`${
                  selections[cat.id] ? "text-primary border-primary" : ""
                } animate-scale-in`}
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

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

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handleNavigation("prev")}
                className={currentCategory === 0 ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>
            {categories.map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentCategory(index)}
                  isActive={currentCategory === index}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handleNavigation("next")}
                className={currentCategory === categories.length - 1 ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
};

export default Index;
