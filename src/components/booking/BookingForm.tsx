import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./form/PersonalInfoFields";
import { EmailField } from "./form/EmailField";
import { TicketSelection } from "./form/TicketSelection";
import { useBookingForm } from "./form/useBookingForm";

export const BookingForm = () => {
  const { form, onSubmit } = useBookingForm();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-8 border border-white/20">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
          <PersonalInfoFields form={form} />
          <EmailField form={form} />
          <TicketSelection form={form} />
          
          <Button type="submit" className="w-full h-11 text-base">
            Réserver
          </Button>
        </form>
      </Form>
    </div>
  );
};