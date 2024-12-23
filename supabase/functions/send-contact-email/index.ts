import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const MAILJET_API_KEY = Deno.env.get("MAILJET_API_KEY");
const MAILJET_SECRET_KEY = Deno.env.get("MAILJET_SECRET_KEY");
const TO_EMAIL = "g.sauvat@ideai.fr";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
      console.error("Mailjet API keys are not configured");
      throw new Error("Configuration des clés API Mailjet manquante");
    }

    const { name, email, message }: ContactRequest = await req.json();
    console.log("Received contact form submission:", { name, email });

    const auth = btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);

    const mailjetPayload = {
      Messages: [
        {
          From: {
            Email: "contact@ideai.fr",
            Name: "Lyon d'Or Contact"
          },
          To: [
            {
              Email: TO_EMAIL,
              Name: "Lyon d'Or"
            }
          ],
          ReplyTo: {
            Email: email,
            Name: name
          },
          Subject: `Nouveau message de contact de ${name}`,
          HTMLPart: `
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        }
      ]
    };

    console.log("Sending email via Mailjet with payload:", JSON.stringify(mailjetPayload, null, 2));
    const res = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify(mailjetPayload),
    });

    const responseData = await res.json();
    console.log("Mailjet API response:", JSON.stringify(responseData, null, 2));

    if (!res.ok) {
      console.error("Mailjet API error:", responseData);
      throw new Error(`Erreur Mailjet: ${JSON.stringify(responseData)}`);
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erreur lors de l'envoi de l'email",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);