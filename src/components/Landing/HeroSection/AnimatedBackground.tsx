// src/pages/LandingPage/components/HeroSection/AnimatedBackground.tsx
import { useEffect, useState } from "react";
import FloatingParticles from "../Particles/FloatingParticles";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
  speed: number;
}

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 3,
      color: ["#FFD500", "#46BEF6", "#D7263D", "#ffffff"][
        Math.floor(Math.random() * 4)
      ],
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 50 + 30,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00274D]/90 via-[#003D6B]/80 to-[#00274D]/90" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 213, 0, 0.1) 0%, transparent 50%)`,
        }}
      />

      <FloatingParticles particles={particles} />
    </div>
  );
};

export default AnimatedBackground;
