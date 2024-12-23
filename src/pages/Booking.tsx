import React from "react";
import { Layout } from "@/components/Layout";
import { EventInformation } from "@/components/booking/EventInformation";
import { BookingForm } from "@/components/booking/BookingForm";

const Booking = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Réserver des places</h1>
        <EventInformation />
        <BookingForm />
      </div>
    </Layout>
  );
};

export default Booking;