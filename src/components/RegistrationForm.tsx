import React from "react";
import { RegistrationFields } from "./registration/RegistrationFields";
import { RegistrationButtons } from "./registration/RegistrationButtons";
import { useRegistration } from "./registration/useRegistration";

export const RegistrationForm = () => {
  const {
    firstName,
    lastName,
    email,
    isSubmitting,
    setFirstName,
    setLastName,
    setEmail,
    handleSubmit,
    handleExistingUser,
  } = useRegistration();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <RegistrationFields
        firstName={firstName}
        lastName={lastName}
        email={email}
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
        onEmailChange={setEmail}
      />
      <RegistrationButtons
        isSubmitting={isSubmitting}
        onExistingUser={handleExistingUser}
      />
    </form>
  );
};