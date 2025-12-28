import { useEffect, useRef } from 'react';

interface Flower {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  size: number;
  opacity: number;
  createdAt: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const animationFrameRef = useRef<number>();
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const flowerIdRef = useRef(0);

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

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const maxAge = 800; // 800ms lifetime
      const maxFlowers = 20; // Limit for performance

      // Update and draw flowers
      flowersRef.current = flowersRef.current
        .map((flower) => {
          const age = now - flower.createdAt;
          const progress = age / maxAge;
          
          // Fade out
          flower.opacity = Math.max(0, 1 - progress);
          
          return flower;
        })
        .filter((flower) => {
          const age = now - flower.createdAt;
          return age < maxAge && flower.opacity > 0;
        });

      // Limit total flowers
      if (flowersRef.current.length > maxFlowers) {
        flowersRef.current = flowersRef.current.slice(-maxFlowers);
      }

      // Draw all flowers
      flowersRef.current.forEach((flower) => {
        drawFlower(flower);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastMousePosRef.current.x, 2) +
        Math.pow(e.clientY - lastMousePosRef.current.y, 2)
      );

      // Only create flower if mouse moved enough (performance optimization)
      if (distance > 15) {
        const flower: Flower = {
          id: flowerIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          color: getRandomColor(),
          rotation: Math.random() * 360,
          size: 8 + Math.random() * 6, // 8-14px
          opacity: 1,
          createdAt: currentTime,
        };

        flowersRef.current.push(flower);
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}


