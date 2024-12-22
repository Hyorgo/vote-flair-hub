import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiDefaults {
  startVelocity: number;
  spread: number;
  ticks: number;
  zIndex: number;
  particleCount: number;
  origin: { y: number };
  gravity: number;
  scalar: number;
  disableForReducedMotion: boolean;
  colors: string[];
}

export const ConfettiEffect = () => {
  const createConfetti = useCallback(() => {
    const duration = 600;
    const animationEnd = Date.now() + duration;
    
    const defaults: ConfettiDefaults = { 
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

    const randomInRange = (min: number, max: number): number => {
      return Math.random() * (max - min) + min;
    };

    const launchConfettiFromPosition = (x: number) => {
      confetti({
        ...defaults,
        origin: { x, y: 0 }
      });
    };

    let frame: number;
    const animate = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return;

      // Launch confetti from three positions across the top
      launchConfettiFromPosition(randomInRange(0.1, 0.3));
      launchConfettiFromPosition(randomInRange(0.4, 0.6));
      launchConfettiFromPosition(randomInRange(0.7, 0.9));

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