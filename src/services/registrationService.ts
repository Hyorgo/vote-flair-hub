import { supabase } from "@/integrations/supabase/client";

export const checkExistingUser = async (email: string) => {
  const { data: existingUser, error } = await supabase
    .from("user_profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  return existingUser;
};

export const createUserProfile = async (
  firstName: string,
  lastName: string,
  email: string
) => {
  const { error: profileError } = await supabase.from("user_profiles").insert([
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
    },
  ]);

  if (profileError) throw profileError;
};

export const validateEmail = async (email: string) => {
  const { error: emailError } = await supabase
    .from("validated_emails")
    .insert([{ email }]);

  if (emailError) throw emailError;
};