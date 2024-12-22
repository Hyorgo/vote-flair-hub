import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useUserProfile = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", userEmail],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userEmail,
  });

  return { userProfile };
};