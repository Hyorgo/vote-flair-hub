import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, numberOfTickets } = await req.json();
    
    const bookingData = {
      firstName,
      lastName,
      email,
      numberOfTickets,
      eventDate: new Date(), // Vous devriez récupérer la vraie date de l'événement
      eventLocation: "Salle des fêtes", // À remplacer par la vraie localisation
      eventAddress: "123 rue de la fête", // À remplacer par la vraie adresse
    };

    const encodedBookingData = encodeURIComponent(JSON.stringify(bookingData));
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Billet(s) événement',
              description: `Réservation pour ${numberOfTickets} personne(s)`,
            },
            unit_amount: 1000, // Prix en centimes (10€)
          },
          quantity: parseInt(numberOfTickets),
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/booking?success=true&bookingData=${encodedBookingData}`,
      cancel_url: `${req.headers.get('origin')}/booking?canceled=true`,
      customer_email: email,
      metadata: {
        firstName,
        lastName,
        numberOfTickets,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});