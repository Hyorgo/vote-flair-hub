import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";

interface ColorStop {
  color: string;
  position: number;
}

interface GradientColorInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const GradientColorInput = ({ value, onChange }: GradientColorInputProps) => {
  const [direction, setDirection] = useState("to right");
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: "#ffffff", position: 0 },
    { color: "#000000", position: 100 }
  ]);

  const handleGradientChange = () => {
    const gradientStops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
    
    const gradientValue = `linear-gradient(${direction}, ${gradientStops})`;
    onChange(gradientValue);
  };

  useEffect(() => {
    handleGradientChange();
  }, [direction, colorStops]);

  const addColorStop = () => {
    const lastPosition = colorStops[colorStops.length - 1]?.position || 0;
    const newPosition = Math.min(lastPosition + 25, 100);
    
    setColorStops([...colorStops, {
      color: "#808080",
      position: newPosition
    }]);
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      const newStops = colorStops.filter((_, i) => i !== index);
      setColorStops(newStops);
    }
  };

  const updateColorStop = (index: number, updates: Partial<ColorStop>) => {
    const newStops = colorStops.map((stop, i) => {
      if (i === index) {
        return { ...stop, ...updates };
      }
      return stop;
    });
    setColorStops(newStops);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Direction du dégradé</Label>
        <Select 
          value={direction} 
          onValueChange={setDirection}
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

      <div className="space-y-4">
        {colorStops.map((stop, index) => (
          <div key={index} className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label>Couleur {index + 1}</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateColorStop(index, { color: e.target.value })}
                  className="h-10 w-full"
                />
                <Input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateColorStop(index, { color: e.target.value })}
                  className="w-28"
                />
              </div>
            </div>
            <div className="w-24 space-y-2">
              <Label>Position (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={stop.position}
                onChange={(e) => updateColorStop(index, { position: Number(e.target.value) })}
              />
            </div>
            {colorStops.length > 2 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeColorStop(index)}
                className="mb-[2px]"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={addColorStop}
          variant="outline"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une couleur
        </Button>
      </div>

      <div className="mt-4">
        <div 
          className="w-full h-20 rounded-lg border"
          style={{ background: `linear-gradient(${direction}, ${colorStops
            .sort((a, b) => a.position - b.position)
            .map(stop => `${stop.color} ${stop.position}%`)
            .join(', ')})` 
          }}
        />
      </div>
    </div>
  );
};