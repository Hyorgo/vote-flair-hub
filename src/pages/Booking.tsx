import React from "react";
import { Layout } from "@/components/Layout";
import { EventInformation } from "@/components/booking/EventInformation";
import { BookingForm } from "@/components/booking/BookingForm";

const Booking = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
          Réserver des places
        </h1>
        <div className="space-y-6 sm:space-y-8">
          <EventInformation />
          <BookingForm />
        </div>
      </div>
    </Layout>
  );
};

export default Booking;