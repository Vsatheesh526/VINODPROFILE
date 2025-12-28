import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Flower {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  createdAt: number;
}

export default function RoamingSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number>();
  const pathRef = useRef<Point[]>([]);
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const currentRef = useRef<Point>({ x: 0, y: 0 });
  const hueRef = useRef(0);
  const flowersRef = useRef<Flower[]>([]);
  const flowerIdRef = useRef(0);
  const lastFlowerSpawnRef = useRef(0);
  const pathLength = 50;
  const boundsRef = useRef({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 });

  const flowerColors = [
    '#FF6B9D', '#C44569', '#F8B500', '#FF6B6B', '#4ECDC4',
    '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#FF9FF3', '#54A0FF', '#5F27CD',
    '#00D2D3', '#FF6348', '#FFA502',
  ];

  const getRandomColor = () => flowerColors[Math.floor(Math.random() * flowerColors.length)];

  // Update header bounds
  const updateBounds = () => {
    const header = document.querySelector('header');
    if (header) {
      headerRef.current = header;
      const rect = header.getBoundingClientRect();
      boundsRef.current = {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    }
  };

  // Get random target within header bounds
  const getRandomTarget = () => {
    const bounds = boundsRef.current;
    const padding = 30; // Padding from edges
    return {
      x: bounds.left + padding + Math.random() * (bounds.width - padding * 2),
      y: bounds.top + padding + Math.random() * (bounds.height - padding * 2),
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateBounds();
      
      // Initialize snake in header center
      const bounds = boundsRef.current;
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      
      pathRef.current = [];
      for (let i = 0; i < pathLength; i++) {
        pathRef.current.push({ x: centerX, y: centerY });
      }
      
      currentRef.current = { x: centerX, y: centerY };
      targetRef.current = getRandomTarget();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', updateBounds);

    // Initialize target
    updateBounds();
    targetRef.current = getRandomTarget();

    // Create flower shape
    const drawFlower = (flower: Flower) => {
      ctx.save();
      ctx.translate(flower.x, flower.y);
      ctx.rotate((flower.rotation * Math.PI) / 180);
      ctx.globalAlpha = flower.opacity;

      const size = flower.size;
      const petals = 5;
      const centerRadius = size * 0.15;

      ctx.fillStyle = flower.color;
      for (let i = 0; i < petals; i++) {
        ctx.beginPath();
        const angle = (i * 2 * Math.PI) / petals;
        const petalX = Math.cos(angle) * (size * 0.3);
        const petalY = Math.sin(angle) * (size * 0.3);
        ctx.ellipse(petalX, petalY, size * 0.25, size * 0.4, angle, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(0, 0, centerRadius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      // Update bounds periodically
      if (Math.random() < 0.01) {
        updateBounds();
      }

      // Clear only the header area
      const bounds = boundsRef.current;
      ctx.clearRect(bounds.left - 50, bounds.top - 50, bounds.width + 100, bounds.height + 100);

      // Move current position towards target
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Slow, smooth movement
      const speed = 0.5;
      if (distance > 5) {
        currentRef.current.x += (dx / distance) * speed;
        currentRef.current.y += (dy / distance) * speed;
        
        // Keep within bounds
        const padding = 20;
        currentRef.current.x = Math.max(bounds.left + padding, Math.min(bounds.right - padding, currentRef.current.x));
        currentRef.current.y = Math.max(bounds.top + padding, Math.min(bounds.bottom - padding, currentRef.current.y));
      } else {
        // Reached target, get new random target within header
        targetRef.current = getRandomTarget();
      }

      // Add current position to path
      pathRef.current.push({ ...currentRef.current });
      
      // Keep path length constant
      if (pathRef.current.length > pathLength) {
        pathRef.current.shift();
      }

      // Update hue for color animation
      hueRef.current = (hueRef.current + 0.5) % 360;

      // Spawn flowers along the snake's path (behind it)
      const now = Date.now();
      if (pathRef.current.length > 10 && now - lastFlowerSpawnRef.current > 120) {
        const spawnIndex = Math.max(0, pathRef.current.length - 20 - Math.floor(Math.random() * 15));
        if (spawnIndex < pathRef.current.length) {
          const spawnPoint = pathRef.current[spawnIndex];
          
          let offsetX = 0;
          let offsetY = 0;
          if (spawnIndex > 0) {
            const prevPoint = pathRef.current[spawnIndex - 1];
            const dx = spawnPoint.x - prevPoint.x;
            const dy = spawnPoint.y - prevPoint.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            if (len > 0) {
              offsetX = (-dy / len) * (8 + Math.random() * 8);
              offsetY = (dx / len) * (8 + Math.random() * 8);
            }
          }
          
          const flower: Flower = {
            id: flowerIdRef.current++,
            x: spawnPoint.x + offsetX + (Math.random() - 0.5) * 5,
            y: spawnPoint.y + offsetY + (Math.random() - 0.5) * 5,
            color: getRandomColor(),
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 3,
            size: 6 + Math.random() * 8,
            opacity: 0.5 + Math.random() * 0.4,
            createdAt: now,
          };
          
          flowersRef.current.push(flower);
          lastFlowerSpawnRef.current = now;
        }
      }

      // Update and draw flowers (only within header bounds)
      const maxFlowerAge = 3000;
      flowersRef.current = flowersRef.current
        .map((flower) => {
          flower.rotation += flower.rotationSpeed;
          const age = now - flower.createdAt;
          const progress = age / maxFlowerAge;
          const driftAmount = progress * 0.3;
          flower.x += (Math.sin(age * 0.001) * driftAmount);
          flower.y += (Math.cos(age * 0.001) * driftAmount);
          flower.opacity = Math.max(0, (0.5 + Math.random() * 0.4) * (1 - progress));
          return flower;
        })
        .filter((flower) => {
          const age = now - flower.createdAt;
          const bounds = boundsRef.current;
          // Keep flowers that are within header bounds or just outside
          const inBounds = flower.x >= bounds.left - 50 && 
                          flower.x <= bounds.right + 50 &&
                          flower.y >= bounds.top - 50 && 
                          flower.y <= bounds.bottom + 50;
          return age < maxFlowerAge && flower.opacity > 0 && inBounds;
        });

      if (flowersRef.current.length > 40) {
        flowersRef.current = flowersRef.current.slice(-40);
      }

      // Draw flowers
      flowersRef.current.forEach((flower) => {
        drawFlower(flower);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateBounds);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      style={{ opacity: 0.7 }}
    />
  );
}
