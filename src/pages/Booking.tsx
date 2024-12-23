import React from "react";
import { Layout } from "@/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const EVENT_DATE = new Date(2025, 2, 10); // Mois commence à 0, donc 2 = mars

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }).refine((date) => {
    if (!date) return false;
    return date.getTime() === EVENT_DATE.getTime();
  }, "La soirée a lieu uniquement le 10 mars 2025"),
  numberOfTickets: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 10, {
    message: "Veuillez sélectionner entre 1 et 10 places",
  }),
});

const Booking = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      date: EVENT_DATE,
      numberOfTickets: "1",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Réservation en cours de traitement",
      description: "Nous vous enverrons un email de confirmation.",
    });
    console.log(values);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Réserver des places</h1>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4 text-white">
            <MapPin className="h-6 w-6 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Informations sur l'événement</h2>
              <p className="text-white/80">
                La soirée aura lieu le lundi 10 mars 2025 au Matmut Stadium<br />
                353 Avenue Jean Jaurès, 69007 Lyon
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Date</FormLabel>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        onClick={(e) => e.preventDefault()}
                      >
                        {field.value ? (
                          format(field.value, "EEEE d MMMM yyyy", { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date.getTime() !== EVENT_DATE.getTime()}
                      initialFocus
                      className="rounded-md border bg-white"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfTickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nombre de places</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le nombre de places" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                          <SelectItem key={number} value={number.toString()}>
                            {number} {number === 1 ? "place" : "places"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Réserver
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;