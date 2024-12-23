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

    // Envoi du message à l'administrateur
    const adminMailjetPayload = {
      Messages: [
        {
          From: {
            Email: "contact@lyon-dor.fr",
            Name: "Lyon d'Or - Contact"
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
    };

    // Email de confirmation à l'expéditeur
    const userConfirmationPayload = {
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
    };

    // Envoi des deux emails
    console.log("Sending admin notification email...");
    const adminRes = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify(adminMailjetPayload),
    });

    console.log("Sending user confirmation email...");
    const userRes = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify(userConfirmationPayload),
    });

    const adminResponseData = await adminRes.json();
    const userResponseData = await userRes.json();

    console.log("Admin email response:", JSON.stringify(adminResponseData, null, 2));
    console.log("User confirmation email response:", JSON.stringify(userResponseData, null, 2));

    if (!adminRes.ok || !userRes.ok) {
      console.error("Mailjet API error - Admin:", adminResponseData);
      console.error("Mailjet API error - User:", userResponseData);
      throw new Error(`Erreur Mailjet: ${JSON.stringify({ admin: adminResponseData, user: userResponseData })}`);
    }

    console.log("Emails sent successfully!");
    return new Response(JSON.stringify({ admin: adminResponseData, user: userResponseData }), {
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