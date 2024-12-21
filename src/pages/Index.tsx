import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAirtableData } from "@/hooks/useAirtableData";
import { VotingSection } from "@/components/VotingSection";
import { VotingTimer } from "@/components/VotingTimer";

const END_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime();

const Index = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { toast } = useToast();
  const { categories, nominees, voteMutation } = useAirtableData();

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

  const handleVote = async (nomineeId: string) => {
    const categoryId = categories.data?.[currentCategory]?.id;
    if (!categoryId) return;

    const isModifying = selections[categoryId] === nomineeId;

    try {
      if (!isModifying) {
        await voteMutation.mutateAsync(nomineeId);
      }

      setSelections((prev) => ({
        ...prev,
        [categoryId]: isModifying ? "" : nomineeId,
      }));

      toast({
        title: isModifying ? "Vote annulé !" : "Vote enregistré !",
        description: isModifying
          ? "Vous pouvez maintenant choisir un autre nominé"
          : "Cliquez à nouveau sur le même nominé pour modifier votre vote",
        className: "animate-bounce",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du vote",
        variant: "destructive",
      });
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentCategory((prev) =>
      direction === "next"
        ? Math.min(prev + 1, (categories.data?.length || 1) - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const handleTabChange = (value: string) => {
    setCurrentCategory(Number(value));
  };

  if (categories.isLoading || nominees.isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (categories.error || nominees.error) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-600">
            Une erreur est survenue
          </h2>
          <p className="text-gray-600 mt-2">
            Impossible de charger les données
          </p>
        </div>
      </Layout>
    );
  }

  if (!categories.data?.length) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Aucune catégorie disponible
          </h2>
          <p className="text-gray-600 mt-2">
            Les catégories seront bientôt ajoutées
          </p>
        </div>
      </Layout>
    );
  }

  const category = categories.data[currentCategory];
  const progress = ((currentCategory + 1) / categories.data.length) * 100;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <VotingTimer timeLeft={timeLeft} progress={progress} />

        <Tabs
          value={currentCategory.toString()}
          onValueChange={handleTabChange}
          className="mb-6"
        >
          <TabsList className="w-full flex-wrap h-auto gap-2 bg-white/80 backdrop-blur-sm p-2">
            {categories.data.map((cat, index) => (
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

        <VotingSection
          category={category}
          selections={selections}
          onVote={handleVote}
          onNavigation={handleNavigation}
          isFirstCategory={currentCategory === 0}
          isLastCategory={currentCategory === categories.data.length - 1}
        />

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handleNavigation("prev")}
                className={
                  currentCategory === 0 ? "opacity-50 cursor-not-allowed" : ""
                }
              />
            </PaginationItem>
            {categories.data.map((_, index) => (
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
                className={
                  currentCategory === categories.data.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
};

export default Index;