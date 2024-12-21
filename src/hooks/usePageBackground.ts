import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const usePageBackground = (pageName: string) => {
  const { data: background, isLoading, error, refetch } = useQuery({
    queryKey: ["page-background", pageName],
    queryFn: async () => {
      console.log("Fetching background for page:", pageName); // Debug log
      
      const { data, error } = await supabase
        .from("page_backgrounds")
        .select("*")
        .eq("page_name", pageName)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error); // Debug log
        throw error;
      }

      console.log("Background data received:", data); // Debug log
      return data;
    },
    retry: 2, // Retry failed requests twice
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
        };
      case "video":
        return {}; // Video background will be handled separately in the component
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