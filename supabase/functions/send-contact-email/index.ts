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
  console.log("New request received:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting contact email function...");
    console.log("Checking environment variables...");
    console.log("MAILJET_API_KEY exists:", !!MAILJET_API_KEY);
    console.log("MAILJET_SECRET_KEY exists:", !!MAILJET_SECRET_KEY);
    
    if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
      const error = "Mailjet API keys are not configured";
      console.error(error);
      throw new Error(error);
    }

    const { name, email, message }: ContactRequest = await req.json();
    console.log("Received contact form submission:", { name, email, messageLength: message.length });

    const auth = btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);
    console.log("Auth token generated successfully");

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
    console.log("Using Mailjet API URL:", "https://api.mailjet.com/v3.1/send");
    
    const res = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify(mailjetPayload),
    });

    console.log("Mailjet API response status:", res.status);
    console.log("Mailjet API response headers:", Object.fromEntries(res.headers.entries()));
    
    const responseData = await res.json();
    console.log("Mailjet API response body:", JSON.stringify(responseData, null, 2));

    if (!res.ok) {
      console.error("Mailjet API error:", responseData);
      throw new Error(`Erreur Mailjet: ${JSON.stringify(responseData)}`);
    }

    console.log("Email sent successfully!");
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