import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export const ConfettiEffect = () => {
  const createConfetti = useCallback(() => {
    const duration = 1500; // Réduit de 2000ms à 1500ms
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 20, // Réduit de 25 à 20
      spread: 200, // Réduit de 300 à 200
      ticks: 40, // Réduit de 50 à 40
      zIndex: 0,
      particleCount: 20, // Réduit de 30 à 20 particules
      origin: { y: 0.6 },
      disableForReducedMotion: true
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

      // Lance les confettis depuis deux côtés avec une quantité fixe
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