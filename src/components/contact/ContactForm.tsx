import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      // Récupérer l'IP via notre Edge Function
      const { data: ipData, error: ipError } = await supabase.functions.invoke('get-ip');
      
      if (ipError) throw ipError;
      
      const { data: rateCheck, error: rateError } = await supabase
        .rpc('check_contact_rate_limit', { 
          user_email: values.email,
          user_ip: ipData.ip
        });

      if (rateError) throw rateError;

      if (!rateCheck) {
        toast({
          title: "Limite de messages atteinte",
          description: "Veuillez patienter avant d'envoyer un nouveau message.",
          variant: "destructive",
        });
        return;
      }

      // Enregistrer la tentative de contact
      await supabase
        .from('contact_attempts')
        .insert({
          email: values.email,
          ip_address: ipData.ip,
        });
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: values.name,
          email: values.email,
          message: values.message,
        },
      });

      if (error) throw error;

      // Mettre à jour le statut de succès de la tentative
      await supabase
        .from('contact_attempts')
        .update({ success: true })
        .eq('email', values.email)
        .order('created_at', { ascending: false })
        .limit(1);

      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      form.reset();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Nom
        </label>
        <Input
          id="name"
          type="text"
          {...form.register("name")}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          placeholder="Votre nom"
        />
        {form.formState.errors.name && (
          <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          placeholder="votre@email.com"
        />
        {form.formState.errors.email && (
          <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-white">
          Message
        </label>
        <Textarea
          id="message"
          {...form.register("message")}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-[150px]"
          placeholder="Votre message..."
        />
        {form.formState.errors.message && (
          <p className="text-red-400 text-sm">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-accent via-primary to-primary-dark text-white hover:opacity-90"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
};