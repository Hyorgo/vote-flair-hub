import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const MAILJET_API_KEY = Deno.env.get("MAILJET_API_KEY");
const MAILJET_SECRET_KEY = Deno.env.get("MAILJET_SECRET_KEY");

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
  console.log("New booking confirmation request received:", req.method);
  
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting booking confirmation email function...");
    
    if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
      const error = "Mailjet API keys are not configured";
      console.error(error);
      throw new Error(error);
    }

    const { firstName, lastName, email, numberOfTickets, eventDate, eventLocation, eventAddress }: BookingEmailData = await req.json();
    console.log("Received booking confirmation for:", email);

    const auth = btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);
    console.log("Auth token generated");

    // Email pour le client et l'administrateur
    console.log("Preparing confirmation emails...");
    const emailPayload = {
      Messages: [
        {
          From: {
            Email: "contact@lyon-dor.fr",
            Name: "Lyon d'Or"
          },
          To: [
            {
              Email: email,
              Name: `${firstName} ${lastName}`
            }
          ],
          Cc: [
            {
              Email: "g.sauvat@ideai.fr",
              Name: "Administration Lyon d'Or"
            }
          ],
          Subject: "Confirmation de votre réservation - Lyon d'Or",
          TextPart: `
            Cher(e) ${firstName} ${lastName},
            
            Nous vous confirmons votre réservation pour la Soirée des Trophées Lyon d'Or.
            
            Détails de votre réservation :
            - Nombre de places : ${numberOfTickets}
            - Date : ${eventDate}
            - Lieu : ${eventLocation}
            - Adresse : ${eventAddress}
            
            Conservez précieusement cet email, il vous sera demandé lors de votre arrivée à l'événement.
            
            Nous avons hâte de vous accueillir !
            
            Cordialement,
            L'équipe Lyon d'Or
          `,
          HTMLPart: `
            <h2>Confirmation de réservation</h2>
            <p>Cher(e) ${firstName} ${lastName},</p>
            <p>Nous vous confirmons votre réservation pour la Soirée des Trophées Lyon d'Or.</p>
            <h3>Détails de votre réservation :</h3>
            <ul>
              <li>Nombre de places : ${numberOfTickets}</li>
              <li>Date : ${eventDate}</li>
              <li>Lieu : ${eventLocation}</li>
              <li>Adresse : ${eventAddress}</li>
            </ul>
            <p><strong>Conservez précieusement cet email, il vous sera demandé lors de votre arrivée à l'événement.</strong></p>
            <p>Nous avons hâte de vous accueillir !</p>
            <p>Cordialement,<br>L'équipe Lyon d'Or</p>
          `
        }
      ]
    };

    console.log("Sending confirmation email via Mailjet...");
    const emailResponse = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(emailPayload),
    });

    console.log("Email response status:", emailResponse.status);
    const emailResponseText = await emailResponse.text();
    console.log("Email response body:", emailResponseText);

    if (!emailResponse.ok) {
      throw new Error(`Mailjet API error: ${emailResponseText}`);
    }

    console.log("Booking confirmation email sent successfully!");

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erreur lors de l'envoi de l'email de confirmation",
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