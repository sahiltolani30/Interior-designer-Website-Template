'use client';

import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.to(barRef.current, { 
      scaleX: 1, 
      duration: 2.0, 
      ease: 'power3.inOut', 
      transformOrigin: 'left' 
    })
    .to(brandRef.current, { 
      autoAlpha: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power3.out' 
    }, '-=0.4')
    .to(loaderRef.current, { 
      yPercent: -100, 
      duration: 1.2, 
      ease: 'power4.inOut',
      onComplete: () => {
        // Optional: remove from DOM or just keep it translated
      }
    }, '+=0.4');

  }, { scope: loaderRef });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Atmosphere background animation (drifting vertical light folds)
    let time = 0;
    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);
      
      // Base dark color
      ctx.fillStyle = '#0d0c0b';
      ctx.fillRect(0, 0, width, height);

      // Create vertical drifting folds
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = 0; i < 5; i++) {
        const xOffset = Math.sin(time + i * 1.5) * (width * 0.2);
        const xPos = (width / 5) * i + xOffset;
        
        const grad = ctx.createLinearGradient(xPos - 200, 0, xPos + 200, 0);
        const alpha = 0.03 + Math.sin(time * 2 + i) * 0.02;
        grad.addColorStop(0, 'rgba(139, 32, 32, 0)');
        grad.addColorStop(0.5, `rgba(139, 32, 32, ${alpha})`); // Rust accent glow
        grad.addColorStop(1, 'rgba(139, 32, 32, 0)');
        
        ctx.fillStyle = grad;
        ctx.fillRect(xPos - 200, 0, 400, height);
      }

      // Bottom right corner bloom
      const bloom = ctx.createRadialGradient(width * 0.8, height * 0.9, 0, width * 0.8, height * 0.9, width * 0.6);
      bloom.addColorStop(0, 'rgba(139, 32, 32, 0.08)');
      bloom.addColorStop(1, 'rgba(139, 32, 32, 0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-[#0d0c0b] flex flex-col items-center justify-center text-white"
    >
      <canvas ref={canvasRef} className="preloader-canvas" />
      
      <div 
        ref={brandRef} 
        className="opacity-0 translate-y-4 text-display text-4xl md:text-5xl mb-12 tracking-wide absolute top-1/3"
      >
        FORMA
      </div>

      <div className="w-[60vw] max-w-[400px] h-[1px] bg-white/20 absolute top-1/2 mt-8">
        <div ref={barRef} className="h-full bg-white w-full scale-x-0" />
      </div>
    </div>
  );
}
