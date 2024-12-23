import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface PricingData {
  id: string;
  price_ht: number;
  tva_rate: number;
}

export const PriceManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [priceHT, setPriceHT] = useState("");
  const [tvaRate, setTvaRate] = useState("");

  const { data: pricing, isLoading } = useQuery({
    queryKey: ["ticket-pricing"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_pricing")
        .select("*")
        .single();

      if (error) throw error;
      return data as PricingData;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: { price_ht: number; tva_rate: number }) => {
      const { error } = await supabase
        .from("ticket_pricing")
        .update({
          price_ht: values.price_ht,
          tva_rate: values.tva_rate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pricing?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket-pricing"] });
      toast({
        title: "Prix mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des prix.",
        variant: "destructive",
      });
      console.error("Error updating pricing:", error);
    },
  });

  const handleEdit = () => {
    if (pricing) {
      setPriceHT(pricing.price_ht.toString());
      setTvaRate(pricing.tva_rate.toString());
      setIsEditing(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPriceHT = parseFloat(priceHT);
    const numericTVARate = parseFloat(tvaRate);

    if (isNaN(numericPriceHT) || isNaN(numericTVARate)) {
      toast({
        title: "Erreur de validation",
        description: "Les valeurs entrées doivent être des nombres valides.",
        variant: "destructive",
      });
      return;
    }

    updateMutation.mutate({
      price_ht: numericPriceHT,
      tva_rate: numericTVARate,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pricing) return null;

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
        <div>
          <label className="block text-sm font-medium mb-2">Prix HT (€)</label>
          <Input
            type="number"
            step="0.01"
            value={priceHT}
            onChange={(e) => setPriceHT(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Taux de TVA (%)</label>
          <Input
            type="number"
            step="0.01"
            value={tvaRate}
            onChange={(e) => setTvaRate(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={updateMutation.isPending}
            className="w-full sm:w-auto"
          >
            Annuler
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
          <h3 className="font-semibold mb-2 text-lg">Prix HT</h3>
          <p className="text-2xl sm:text-3xl">{pricing.price_ht} €</p>
        </div>
        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
          <h3 className="font-semibold mb-2 text-lg">Taux de TVA</h3>
          <p className="text-2xl sm:text-3xl">{pricing.tva_rate} %</p>
        </div>
        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
          <h3 className="font-semibold mb-2 text-lg">Prix TTC</h3>
          <p className="text-2xl sm:text-3xl">
            {(pricing.price_ht * (1 + pricing.tva_rate / 100)).toFixed(2)} €
          </p>
        </div>
      </div>
      <Button onClick={handleEdit} className="w-full sm:w-auto">
        Modifier les prix
      </Button>
    </div>
  );
};