import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const usePageBackground = (pageName: string) => {
  const { data: background, isLoading, error } = useQuery({
    queryKey: ["page-background", pageName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_backgrounds")
        .select("*")
        .eq("page_name", pageName)
        .eq("is_active", true)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
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
  };
};