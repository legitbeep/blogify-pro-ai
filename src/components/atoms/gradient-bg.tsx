import React, { useState, useEffect } from "react";

const GradientBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const animateGradient = () => {
      const newX = 50 + Math.sin(Date.now() / 2000) * 10;
      const newY = 50 + Math.cos(Date.now() / 2000) * 10;
      setPosition({ x: newX, y: newY });
    };

    const intervalId = setInterval(animateGradient, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,165,0,0.3) 0%, rgba(255,140,0,0.2) 25%, rgba(255,127,80,0.1) 50%, rgba(255,99,71,0.05) 75%, rgba(255,69,0,0) 100%)`,
        filter: "blur(40px)",
        opacity: 0.7,
      }}
    />
  );
};

export default GradientBackground;
