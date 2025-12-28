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

export default function FloatingFlowers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const animationFrameRef = useRef<number>();
  const flowerIdRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);

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

    // Spawn new flower at random position
    const spawnFlower = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Random position on screen
      const x = Math.random() * canvas.width;
      const y = canvas.height + 20; // Start from bottom or random position
      
      // Random movement direction (mostly upward, some outward)
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 3; // Mostly upward with slight variation
      const speed = 0.3 + Math.random() * 0.5; // Slow, gentle movement
      
      const flower: Flower = {
        id: flowerIdRef.current++,
        x,
        y: Math.random() > 0.5 ? y : Math.random() * canvas.height, // Sometimes start from bottom, sometimes random
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: getRandomColor(),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2, // Slow rotation
        size: 6 + Math.random() * 8, // Small flowers, 6-14px
        opacity: 0.3 + Math.random() * 0.4, // Start with lower opacity for subtlety
        createdAt: Date.now(),
      };

      flowersRef.current.push(flower);
    };

    // Animation loop
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const maxAge = 8000; // 8 seconds lifetime
      const maxFlowers = 25; // Limit for performance
      const spawnInterval = 800; // Spawn new flower every 800ms

      // Spawn new flowers continuously
      if (now - lastSpawnTimeRef.current > spawnInterval && flowersRef.current.length < maxFlowers) {
        spawnFlower();
        lastSpawnTimeRef.current = now;
      }

      // Update and draw flowers
      flowersRef.current = flowersRef.current
        .map((flower) => {
          // Update position
          flower.x += flower.vx;
          flower.y += flower.vy;
          
          // Update rotation
          flower.rotation += flower.rotationSpeed;
          
          // Update opacity (fade in then fade out)
          const age = now - flower.createdAt;
          const progress = age / maxAge;
          
          if (progress < 0.1) {
            // Fade in during first 10% of lifetime
            flower.opacity = Math.min(0.7, flower.opacity + 0.01);
          } else if (progress > 0.7) {
            // Fade out during last 30% of lifetime
            const fadeProgress = (progress - 0.7) / 0.3;
            flower.opacity = Math.max(0, 0.7 * (1 - fadeProgress));
          }
          
          return flower;
        })
        .filter((flower) => {
          const age = now - flower.createdAt;
          const canvas = canvasRef.current;
          if (!canvas) return false;
          
          // Remove if too old, too faded, or off screen
          return (
            age < maxAge &&
            flower.opacity > 0 &&
            flower.x > -50 &&
            flower.x < canvas.width + 50 &&
            flower.y > -50 &&
            flower.y < canvas.height + 50
          );
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

    // Start animation
    animate();

    // Initial spawn of a few flowers
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnFlower(), i * 200);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply', opacity: 0.6 }}
    />
  );
}


