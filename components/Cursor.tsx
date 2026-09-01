'use client';

import { useRef, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check if device has a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial positioning
    gsap.set(cursor, { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div ref={dotRef} className="w-[12px] h-[12px] bg-[#1A1A1A] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
      <div
        ref={circleRef}
        className="w-[80px] h-[80px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-300 ease-out flex items-center justify-center origin-center"
        id="cursor-circle"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
          <defs>
            <path id="circlePath" d="M50,50 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0"/>
          </defs>
          <text fontSize="11" fill="white" fontFamily="var(--font-sans)" letterSpacing="4">
            <textPath href="#circlePath">DRAG · DRAG · DRAG · </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
