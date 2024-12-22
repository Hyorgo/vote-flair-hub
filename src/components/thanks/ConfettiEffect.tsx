import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export const ConfettiEffect = () => {
  const createConfetti = useCallback(() => {
    const duration = 800; // Reduced from 1500 to 800ms
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30,
      spread: 360,
      ticks: 50,
      zIndex: 0,
      particleCount: 50,
      origin: { y: 0 },
      gravity: 1,
      scalar: 0.7,
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

      // Launch confetti from multiple points across the top of the screen
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.1, 0.3), y: 0 }
      });
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.4, 0.6), y: 0 }
      });
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.7, 0.9), y: 0 }
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