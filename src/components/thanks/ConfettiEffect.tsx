import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export const ConfettiEffect = () => {
  const createConfetti = useCallback(() => {
    const duration = 2000; // Reduced from 3000ms to 2000ms
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 25, // Reduced from 30
      spread: 300, // Reduced from 360
      ticks: 50, // Reduced from 60
      zIndex: 0,
      particleCount: 30, // Fixed particle count instead of calculating
      origin: { y: 0.6 }, // Start lower in the screen
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

      // Launch confetti from two sides with fixed amount
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

    // Only run the animation once instead of continuously
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