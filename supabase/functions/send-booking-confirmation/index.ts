import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailData {
  firstName: string;
  lastName: string;
  email: string;
  numberOfTickets: number;
  eventDate: string;
  eventLocation: string;
  eventAddress: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, numberOfTickets, eventDate, eventLocation, eventAddress }: BookingEmailData = await req.json();

    const emailHtml = `
      <h1>Confirmation de réservation - Soirée des Trophées</h1>
      <p>Bonjour ${firstName} ${lastName},</p>
      <p>Nous vous confirmons votre réservation pour la Soirée des Trophées.</p>
      <h2>Détails de votre réservation :</h2>
      <ul>
        <li>Nombre de places : ${numberOfTickets}</li>
        <li>Date : ${eventDate}</li>
        <li>Lieu : ${eventLocation}</li>
        <li>Adresse : ${eventAddress}</li>
      </ul>
      <p>Nous avons hâte de vous accueillir !</p>
      <p>Cordialement,<br>L'équipe de la Soirée des Trophées</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Soirée des Trophées <onboarding@resend.dev>",
        to: [email],
        subject: "Confirmation de votre réservation - Soirée des Trophées",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send confirmation email" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);