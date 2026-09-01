'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, useGSAP, SplitText } from '@/lib/gsap';
import Image from 'next/image';

const slides = [
  { id: 1, src: '/images/hero-1.jpg', alt: 'Luxury living room' },
  { id: 2, src: '/images/hero-2.jpg', alt: 'Minimalist bedroom' }, // Note: We only have 2 images right now, so we can re-use 1 and 4. I'll use unsplash for the missing ones.
  { id: 3, src: '/images/hero-3.jpg', alt: 'Brutalist kitchen' },
  { id: 4, src: '/images/hero-4.jpg', alt: 'Sculptural dining' },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useGSAP(() => {
    // 1. Headline masked reveal (runs once after preloader)
    if (headlineRef.current) {
      const splitOuter = new SplitText(headlineRef.current, { type: 'words', wordsClass: 'overflow-hidden inline-flex' });
      const splitInner = new SplitText(splitOuter.words, { type: 'words', wordsClass: 'inline-block' });
      
      gsap.from(splitInner.words, {
        yPercent: 120,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 2.8 // Wait for preloader to finish
      });
    }

    // 2. Ken Burns & Crossfade loop
    if (!slidesRef.current) return;
    const slideElements = gsap.utils.toArray('.hero-slide') as HTMLElement[];
    
    // Initial setup: first slide visible, scaled up slightly for Ken Burns
    gsap.set(slideElements, { autoAlpha: 0, scale: 1.06 });
    gsap.set(slideElements[0], { autoAlpha: 1 });
    gsap.to(slideElements[0], { scale: 1, duration: 6, ease: 'none' });

    let active = 0;
    const timer = setInterval(() => {
      const next = (active + 1) % slideElements.length;
      
      const tl = gsap.timeline();
      // Fade out current
      tl.to(slideElements[active], { autoAlpha: 0, scale: 1.0, duration: 1.2, ease: 'power2.inOut' }, 0)
      // Fade in next and Ken Burns
        .fromTo(slideElements[next], 
          { autoAlpha: 0, scale: 1.06 }, 
          { autoAlpha: 1, scale: 1.0, duration: 6, ease: 'none' }, 
          0
        );

      active = next;
      setCurrentSlide(active);
    }, 5000);

    return () => clearInterval(timer);
  }, { scope: sectionRef });

  const handleMouseEnter = () => {
    const circle = document.getElementById('cursor-circle');
    if (circle) circle.classList.add('opacity-100', 'scale-100');
  };

  const handleMouseLeave = () => {
    const circle = document.getElementById('cursor-circle');
    if (circle) circle.classList.remove('opacity-100', 'scale-100');
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[100dvh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slideshow */}
      <div ref={slidesRef} className="absolute inset-0 w-full h-full">
        {slides.map((slide, i) => (
          <div key={slide.id} className="hero-slide absolute inset-0 w-full h-full opacity-0">
            {/* If the image isn't downloaded, we can use an external URL but since we are copying, we'll use local. 
                Wait, I need to place the images in /public/images */}
            <Image 
              src={slide.src} 
              alt={slide.alt} 
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Bottom Left Copy */}
      <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 text-white z-10 pointer-events-none w-full max-w-4xl">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] opacity-80 block mb-6">Our Studio</span>
        <h1 
          ref={headlineRef} 
          className="text-display text-5xl md:text-7xl lg:text-[7vw] leading-[1.1] text-white italic invisible"
        >
          Spaces designed to outlive the moment.
        </h1>
        <div className="mt-12 text-sm opacity-60 flex items-center gap-2">
          <span>↓</span>
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30 overflow-hidden relative">
            <div 
              className={`absolute inset-0 bg-white transition-opacity duration-500 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
