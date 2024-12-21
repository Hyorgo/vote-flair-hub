import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { BackgroundForm } from "./backgrounds/BackgroundForm";
import { BackgroundList } from "./backgrounds/BackgroundList";
import { PageBackground } from "@/integrations/supabase/types/background";

export const BackgroundManager = () => {
  const { data: backgrounds, refetch } = useQuery({
    queryKey: ["page-backgrounds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_backgrounds")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PageBackground[];
    },
  });

  return (
    <div className="space-y-8">
      <BackgroundForm onSuccess={refetch} />
      <BackgroundList 
        backgrounds={backgrounds || []} 
        onBackgroundChange={refetch} 
      />
    </div>
  );
};