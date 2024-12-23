import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./BookingFormSchema";

interface EmailFieldProps {
  form: UseFormReturn<BookingFormValues>;
}

export const EmailField = ({ form }: EmailFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Email</FormLabel>
          <FormControl>
            <Input 
              type="email" 
              placeholder="jean.dupont@example.com" 
              {...field} 
              className="h-11"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};