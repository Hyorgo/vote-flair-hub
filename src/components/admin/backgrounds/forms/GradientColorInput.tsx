import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GradientColorInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const GradientColorInput = ({ value, onChange }: GradientColorInputProps) => {
  const [startColor, setStartColor] = useState("#ffffff");
  const [endColor, setEndColor] = useState("#000000");
  const [direction, setDirection] = useState("to right");

  const handleGradientChange = () => {
    const gradientValue = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    onChange(gradientValue);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Direction du dégradé</Label>
        <Select 
          value={direction} 
          onValueChange={(value) => {
            setDirection(value);
            handleGradientChange();
          }}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Choisir une direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="to right">Gauche à droite</SelectItem>
            <SelectItem value="to left">Droite à gauche</SelectItem>
            <SelectItem value="to bottom">Haut en bas</SelectItem>
            <SelectItem value="to top">Bas en haut</SelectItem>
            <SelectItem value="45deg">Diagonale (45°)</SelectItem>
            <SelectItem value="135deg">Diagonale inversée (135°)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Couleur de début</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={startColor}
              onChange={(e) => {
                setStartColor(e.target.value);
                handleGradientChange();
              }}
              className="h-10 w-full"
            />
            <Input
              type="text"
              value={startColor}
              onChange={(e) => {
                setStartColor(e.target.value);
                handleGradientChange();
              }}
              className="w-28"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Couleur de fin</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={endColor}
              onChange={(e) => {
                setEndColor(e.target.value);
                handleGradientChange();
              }}
              className="h-10 w-full"
            />
            <Input
              type="text"
              value={endColor}
              onChange={(e) => {
                setEndColor(e.target.value);
                handleGradientChange();
              }}
              className="w-28"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div 
          className="w-full h-20 rounded-lg border"
          style={{ background: `linear-gradient(${direction}, ${startColor}, ${endColor})` }}
        />
      </div>
    </div>
  );
};