import { useEffect, useRef } from 'react';

interface Flower {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  createdAt: number;
}

interface FlowerBurstProps {
  trigger: boolean;
  x: number;
  y: number;
  onComplete?: () => void;
}

export default function FlowerBurst({ trigger, x, y, onComplete }: FlowerBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const animationFrameRef = useRef<number>();
  const flowerIdRef = useRef(0);
  const createBurstRef = useRef<((centerX: number, centerY: number) => void) | null>(null);

  const colors = [
    '#FF6B9D', // Pink
    '#C44569', // Rose
    '#F8B500', // Yellow
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Light Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Gold
    '#BB8FCE', // Purple
    '#FF9FF3', // Hot Pink
    '#54A0FF', // Bright Blue
    '#5F27CD', // Purple
    '#00D2D3', // Cyan
    '#FF6348', // Tomato
    '#FFA502', // Orange
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create flower shape
    const drawFlower = (flower: Flower) => {
      ctx.save();
      ctx.translate(flower.x, flower.y);
      ctx.rotate((flower.rotation * Math.PI) / 180);
      ctx.globalAlpha = flower.opacity;

      const size = flower.size;
      const petals = 5;
      const centerRadius = size * 0.15;

      // Draw petals
      ctx.fillStyle = flower.color;
      for (let i = 0; i < petals; i++) {
        ctx.beginPath();
        const angle = (i * 2 * Math.PI) / petals;
        const petalX = Math.cos(angle) * (size * 0.3);
        const petalY = Math.sin(angle) * (size * 0.3);

        // Draw petal as rounded shape
        ctx.ellipse(petalX, petalY, size * 0.25, size * 0.4, angle, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw center
      ctx.fillStyle = '#FFD700'; // Gold center
      ctx.beginPath();
      ctx.arc(0, 0, centerRadius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    };

    // Create burst of flowers
    const createBurst = (centerX: number, centerY: number) => {
      const particleCount = 30; // Number of flowers in the burst
      const speed = 3 + Math.random() * 4; // Random speed between 3-7

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = speed + Math.random() * 2;
        
        const flower: Flower = {
          id: flowerIdRef.current++,
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: getRandomColor(),
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10, // Random rotation speed
          size: 8 + Math.random() * 12, // Random size between 8-20px
          opacity: 1,
          createdAt: Date.now(),
        };

        flowersRef.current.push(flower);
      }
    };

    // Store createBurst in ref so it can be accessed from other useEffects
    createBurstRef.current = createBurst;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const maxAge = 1000; // 1 second lifetime

      // Update and draw flowers
      flowersRef.current = flowersRef.current
        .map((flower) => {
          // Update position
          flower.x += flower.vx;
          flower.y += flower.vy;
          
          // Apply gravity/friction
          flower.vx *= 0.98;
          flower.vy *= 0.98;
          
          // Update rotation
          flower.rotation += flower.rotationSpeed;
          
          // Update opacity (fade out)
          const age = now - flower.createdAt;
          const progress = age / maxAge;
          flower.opacity = Math.max(0, 1 - progress * progress); // Quadratic fade
          
          return flower;
        })
        .filter((flower) => {
          const age = now - flower.createdAt;
          return age < maxAge && flower.opacity > 0;
        });

      // Draw all flowers
      flowersRef.current.forEach((flower) => {
        drawFlower(flower);
      });

      // Check if animation is complete
      if (flowersRef.current.length === 0 && onComplete) {
        onComplete();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  // Trigger burst when trigger changes to true
  useEffect(() => {
    if (trigger && createBurstRef.current) {
      createBurstRef.current(x, y);
    }
  }, [trigger, x, y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
