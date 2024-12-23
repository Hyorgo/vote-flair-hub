import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./BookingFormSchema";

interface TicketSelectionProps {
  form: UseFormReturn<BookingFormValues>;
}

export const TicketSelection = ({ form }: TicketSelectionProps) => {
  return (
    <FormField
      control={form.control}
      name="numberOfTickets"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Nombre de places</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-11">
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
  );
};