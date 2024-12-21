import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegistrationFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

export const RegistrationFields = ({
  firstName,
  lastName,
  email,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
}: RegistrationFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-navy">Prénom</Label>
          <Input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="Jean"
            className="bg-white/20 backdrop-blur-sm border-white/20 focus:border-primary/50 focus:ring-primary/50 h-9"
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-navy">Nom</Label>
          <Input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="Dupont"
            className="bg-white/20 backdrop-blur-sm border-white/20 focus:border-primary/50 focus:ring-primary/50 h-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-navy">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="jean.dupont@example.com"
          className="bg-white/20 backdrop-blur-sm border-white/20 focus:border-primary/50 focus:ring-primary/50 h-9"
        />
      </div>
    </>
  );
};