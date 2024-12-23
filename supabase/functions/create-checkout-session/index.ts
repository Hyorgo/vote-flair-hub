import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

// Schéma de validation des données de réservation
const bookingSchema = z.object({
  firstName: z.string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, "Le prénom ne doit contenir que des lettres, espaces et tirets"),
  
  lastName: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, "Le nom ne doit contenir que des lettres, espaces et tirets"),
  
  email: z.string()
    .email("Format d'email invalide")
    .max(100, "L'email ne peut pas dépasser 100 caractères")
    .refine(email => !email.includes('+'), "Les emails avec '+' ne sont pas acceptés")
    .transform(email => email.toLowerCase()),
  
  numberOfTickets: z.string()
    .transform(val => parseInt(val))
    .refine(val => !isNaN(val) && val > 0 && val <= 10, {
      message: "Le nombre de places doit être entre 1 et 10",
    }),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log('Données reçues:', requestData);

    // Valider les données reçues
    const validationResult = bookingSchema.safeParse(requestData);
    
    if (!validationResult.success) {
      console.error('Erreur de validation:', validationResult.error);
      return new Response(
        JSON.stringify({
          error: 'Données de réservation invalides',
          details: validationResult.error.errors
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const validatedData = validationResult.data;
    
    const bookingData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      numberOfTickets: validatedData.numberOfTickets,
      eventDate: new Date(),
      eventLocation: "Salle des fêtes",
      eventAddress: "123 rue de la fête",
    };

    const encodedBookingData = encodeURIComponent(JSON.stringify(bookingData));
    
    // Créer la session Stripe avec les données validées
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Billet(s) événement',
              description: `Réservation pour ${validatedData.numberOfTickets} personne(s)`,
            },
            unit_amount: 1000,
          },
          quantity: validatedData.numberOfTickets,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/booking?success=true&bookingData=${encodedBookingData}`,
      cancel_url: `${req.headers.get('origin')}/booking?canceled=true`,
      customer_email: validatedData.email,
      metadata: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        numberOfTickets: validatedData.numberOfTickets.toString(),
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }), 
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erreur lors de la création de la session de paiement',
        details: error.message 
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});