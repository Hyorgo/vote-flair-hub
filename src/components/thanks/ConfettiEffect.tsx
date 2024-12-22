import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export const ConfettiEffect = () => {
  const createConfetti = useCallback(() => {
    const duration = 1500;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 20,
      spread: 200,
      ticks: 40,
      zIndex: 0,
      particleCount: 20,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
      colors: ['#FFD700', '#FEC6A1', '#F97316', '#B8860B']
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

      confetti({
        ...defaults,
        origin: { x: randomInRange(0.2, 0.3), y: 0.6 }
      });
      confetti({
        ...defaults,
        origin: { x: randomInRange(0.7, 0.8), y: 0.6 }
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