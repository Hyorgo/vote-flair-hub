import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Papa from 'papaparse';

export const ImportCategoriesForm = () => {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      toast({
        title: "Format invalide",
        description: "Veuillez sélectionner un fichier CSV",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);

    try {
      const text = await file.text();
      Papa.parse(text, {
        header: true,
        complete: async (results) => {
          const categories = new Map();

          // Get the highest current display_order
          const { data: existingCategories } = await supabase
            .from('categories')
            .select('display_order')
            .order('display_order', { ascending: false })
            .limit(1);

          let nextOrder = (existingCategories?.[0]?.display_order || 0) + 1;

          // Première passe : créer les catégories
          for (const row of results.data as any[]) {
            if (!row.category || !row.nominee || !row.description) continue;

            if (!categories.has(row.category)) {
              const { data: categoryData, error: categoryError } = await supabase
                .from('categories')
                .insert([{ 
                  name: row.category,
                  display_order: nextOrder
                }])
                .select()
                .single();

              if (categoryError) throw categoryError;
              categories.set(row.category, categoryData.id);
              nextOrder++;
            }
          }

          // Deuxième passe : créer les nominés
          for (const row of results.data as any[]) {
            if (!row.category || !row.nominee || !row.description) continue;

            const categoryId = categories.get(row.category);
            await supabase
              .from('nominees')
              .insert([{
                category_id: categoryId,
                name: row.nominee,
                description: row.description,
                image_url: row.image_url || null
              }]);
          }

          toast({
            title: "Import réussi",
            description: "Les catégories et nominés ont été importés avec succès",
          });
        },
        error: (error) => {
          throw new Error(error.message);
        }
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Erreur lors de l'import",
        description: "Une erreur est survenue lors de l'import du fichier",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={isImporting}
          className="max-w-sm"
        />
        {isImporting && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
        )}
      </div>
      <div className="text-sm text-gray-500">
        <p>Format du fichier CSV attendu :</p>
        <pre className="mt-2 p-2 bg-gray-100 rounded">
          category,nominee,description,image_url
        </pre>
        <p className="mt-2">L'image_url est optionnelle</p>
      </div>
    </div>
  );
};