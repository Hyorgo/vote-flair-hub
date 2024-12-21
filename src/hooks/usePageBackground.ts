import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const usePageBackground = (pageName: string) => {
  const { data: background, isLoading, error, refetch } = useQuery({
    queryKey: ["page-background", pageName],
    queryFn: async () => {
      console.log("Fetching background for page:", pageName);
      
      try {
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
      } catch (error) {
        console.error("Failed to fetch background:", error);
        throw error;
      }
    },
    retry: 1, // Reduce retry attempts
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchInterval: 5000, // Increase interval to 5 seconds
    staleTime: 1000, // Add some stale time
  });

  const getBackgroundStyle = () => {
    if (!background) return {};

    switch (background.background_type) {
      case "color":
        return { background: background.background_value };
      case "gradient":
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