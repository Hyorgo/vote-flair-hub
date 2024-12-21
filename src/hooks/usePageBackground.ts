import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const usePageBackground = (pageName: string) => {
  const { data: background, isLoading, error, refetch } = useQuery({
    queryKey: ["page-background", pageName],
    queryFn: async () => {
      console.log("Fetching background for page:", pageName);
      
      const { data, error } = await supabase
        .from("page_backgrounds")
        .select("*")
        .eq("page_name", pageName)
        .eq("is_active", true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Background data received:", data);
      return data;
    },
    retry: 2,
    refetchOnWindowFocus: true,
    refetchInterval: 2000,
    staleTime: 0,
    gcTime: 0,
  });

  const getBackgroundStyle = () => {
    if (!background) return {};

    switch (background.background_type) {
      case "color":
        return { background: background.background_value };
      case "image":
        return { 
          backgroundImage: `url(${background.background_value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        };
      case "video":
        return {};
      default:
        return {};
    }
  };

  return {
    background,
    isLoading,
    error,
    getBackgroundStyle,
    refetch,
  };
};