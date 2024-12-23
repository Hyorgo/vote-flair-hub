import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { firstName, lastName, email, numberOfTickets } = await req.json()
    console.log('Creating checkout session for:', { firstName, lastName, email, numberOfTickets })

    // Vérifier que la clé Stripe est présente
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      throw new Error('Stripe secret key is not configured')
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Créer la session de paiement avec des paramètres optimisés
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Billet Lyon d\'Or',
              description: `Réservation pour ${numberOfTickets} ${numberOfTickets > 1 ? 'places' : 'place'}`,
            },
            unit_amount: 1000, // 10€ en centimes
          },
          quantity: parseInt(numberOfTickets),
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/booking?success=true`,
      cancel_url: `${req.headers.get('origin')}/booking?canceled=true`,
      customer_email: email,
      metadata: {
        firstName,
        lastName,
        numberOfTickets,
      },
      payment_intent_data: {
        metadata: {
          firstName,
          lastName,
          email,
          numberOfTickets,
        },
      },
      locale: 'fr',
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      submit_type: 'pay',
      payment_method_options: {
        card: {
          setup_future_usage: 'off_session', // Correction de la valeur
        },
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // Session expire après 30 minutes
    })

    console.log('Checkout session created:', session.id)

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})