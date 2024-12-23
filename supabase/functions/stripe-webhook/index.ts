import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!signature || !webhookSecret) {
      return new Response('Webhook signature missing', { status: 400 });
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { firstName, lastName, numberOfTickets } = session.metadata;
      const customerEmail = session.customer_email;

      // Récupérer les informations de l'événement
      const { data: eventInfo } = await supabase
        .from('event_information')
        .select('*')
        .single();

      if (!eventInfo) {
        throw new Error('Event information not found');
      }

      // Sauvegarder la réservation en base de données
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email: customerEmail,
            number_of_tickets: parseInt(numberOfTickets),
            event_id: eventInfo.id,
          },
        ]);

      if (bookingError) {
        throw bookingError;
      }

      // Envoyer l'email de confirmation via la fonction existante
      const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-booking-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: customerEmail,
          numberOfTickets: parseInt(numberOfTickets),
          eventDate: eventInfo.event_date,
          eventLocation: eventInfo.location,
          eventAddress: eventInfo.address,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send confirmation email:', await response.text());
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});