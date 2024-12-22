import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export const ConfettiEffect = () => {
  const createConfetti = useCallback(() => {
    const duration = 2000; // Increased duration
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, // Increased velocity
      spread: 360, // Full spread for wider dispersion
      ticks: 60, // More ticks for longer particle life
      zIndex: 0,
      particleCount: 50, // More particles
      origin: { y: 0.5 }, // Start from middle of screen
      disableForReducedMotion: true,
      colors: ['#FFD700', '#FEC6A1', '#F97316', '#B8860B', '#FF69B4', '#4B0082'] // Added more colors
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
        origin: { x: randomInRange(0.1, 0.3), y: 0.5 }
      });
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.4, 0.6), y: 0.5 }
      });
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.7, 0.9), y: 0.5 }
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