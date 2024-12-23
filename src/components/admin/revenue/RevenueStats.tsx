import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "../stats/StatCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const fetchBookingsCount = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("number_of_tickets")
    .throwOnError();

  if (error) throw error;

  const totalTickets = data.reduce((sum, booking) => sum + booking.number_of_tickets, 0);
  return totalTickets;
};

const fetchPricing = async () => {
  const { data, error } = await supabase
    .from("ticket_pricing")
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

export const RevenueStats = () => {
  const { data: totalTickets = 0, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["bookings-count"],
    queryFn: fetchBookingsCount,
  });

  const { data: pricing, isLoading: isLoadingPricing } = useQuery({
    queryKey: ["ticket-pricing"],
    queryFn: fetchPricing,
  });

  const isLoading = isLoadingTickets || isLoadingPricing;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pricing) return null;

  const revenueHT = totalTickets * pricing.price_ht;
  const formattedRevenueHT = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(revenueHT);

  return (
    <div className="space-y-8 p-4">
      <ScrollArea className="w-full">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 min-w-[600px]">
          <StatCard
            title="Chiffre d'affaires HT"
            value={formattedRevenueHT}
          />
          <StatCard
            title="Nombre de billets vendus"
            value={totalTickets.toString()}
          />
          <StatCard
            title="Prix unitaire HT"
            value={`${pricing.price_ht} €`}
          />
        </div>
      </ScrollArea>
    </div>
  );
};