import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export const ConfettiEffect = () => {
  const createConfetti = useCallback(() => {
    const duration = 1500; // Reduced duration from 2000 to 1500
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 45, // Increased velocity for higher launch
      spread: 360,
      ticks: 50, // Slightly reduced ticks for shorter particle life
      zIndex: 0,
      particleCount: 50,
      origin: { y: 0.8 }, // Start from lower to shoot higher
      disableForReducedMotion: true,
      colors: ['#FFD700', '#FEC6A1', '#F97316', '#B8860B', '#FF69B4', '#4B0082']
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    let frame: number;
    const animate = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return;
      }

      // Launch confetti from multiple points
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.1, 0.3), y: 0.8 }
      });
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.4, 0.6), y: 0.8 }
      });
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.7, 0.9), y: 0.8 }
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      const cleanup = createConfetti();
      return cleanup;
    }
  }, [createConfetti]);

  return null;
};