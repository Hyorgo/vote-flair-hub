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
  
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting contact email function...");
    
    if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
      const error = "Mailjet API keys are not configured";
      console.error(error);
      throw new Error(error);
    }

    const { name, email, message }: ContactRequest = await req.json();
    console.log("Received contact form submission from:", email);
    console.log("Sender name:", name);
    console.log("Message length:", message.length);

    const auth = btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);

    // Email pour l'administrateur
    const adminEmailResponse = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "contact@lyon-dor.fr",
              Name: "Lyon d'Or"
            },
            To: [
              {
                Email: TO_EMAIL,
                Name: "Admin"
              }
            ],
            ReplyTo: {
              Email: email,
              Name: name
            },
            Subject: `[Lyon d'Or] Nouveau message de contact de ${name}`,
            HTMLPart: `
              <h2>Nouveau message de contact</h2>
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            `
          }
        ]
      }),
    });

    // Email de confirmation pour l'expéditeur
    const userEmailResponse = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "contact@lyon-dor.fr",
              Name: "Lyon d'Or"
            },
            To: [
              {
                Email: email,
                Name: name
              }
            ],
            Subject: "Confirmation de votre message - Lyon d'Or",
            HTMLPart: `
              <h2>Merci pour votre message</h2>
              <p>Cher(e) ${name},</p>
              <p>Nous avons bien reçu votre message et nous vous en remercions. Notre équipe le traitera dans les plus brefs délais.</p>
              <p>Pour rappel, voici votre message :</p>
              <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 5px;">
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p>Cordialement,</p>
              <p>L'équipe Lyon d'Or</p>
            `
          }
        ]
      }),
    });

    if (!adminEmailResponse.ok || !userEmailResponse.ok) {
      const adminError = await adminEmailResponse.text();
      const userError = await userEmailResponse.text();
      console.error("Mailjet API error - Admin:", adminError);
      console.error("Mailjet API error - User:", userError);
      throw new Error(`Erreur Mailjet: ${JSON.stringify({ admin: adminError, user: userError })}`);
    }

    const adminResult = await adminEmailResponse.json();
    const userResult = await userEmailResponse.json();

    console.log("Emails sent successfully!");
    console.log("Admin email result:", adminResult);
    console.log("User email result:", userResult);

    return new Response(
      JSON.stringify({ success: true, admin: adminResult, user: userResult }), 
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
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