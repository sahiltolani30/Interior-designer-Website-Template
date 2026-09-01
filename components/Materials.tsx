'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Image from 'next/image';

const row1 = [
  { name: 'OAK VENEER', src: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&q=80&w=600' },
  { name: 'TRAVERTINE', src: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&q=80&w=600' },
  { name: 'LINEN', src: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=80&w=600' },
  { name: 'AGED BRASS', src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' },
];

const row2 = [
  { name: 'SMOKED CONCRETE', src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
  { name: 'WASHI PAPER', src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
  { name: 'ZELLIGE TILE', src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=600' },
  { name: 'TURKISH MARBLE', src: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&q=80&w=600' },
];

export function Materials() {
  const sectionRef = useRef<HTMLElement>(null);
  const r1Ref = useRef<HTMLDivElement>(null);
  const r2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance reveal
    gsap.from([r1Ref.current, r2Ref.current], {
      autoAlpha: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: 'top 80%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#1A1A1A] py-32 overflow-hidden">
      
      <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24 flex justify-between items-end">
        <h2 className="text-display text-4xl md:text-5xl lg:text-[4vw] text-white">
          A tactile <span className="text-accent-italic text-[#A43B3B]">vocabulary.</span>
        </h2>
        <div className="text-[0.65rem] tracking-[0.25em] uppercase text-white/50 hidden md:block">Materiality</div>
      </div>

      {/* Row 1 */}
      <div ref={r1Ref} className="w-full flex overflow-hidden mb-12 group">
        <div className="flex animate-marquee w-max">
          {[...row1, ...row1, ...row1].map((item, i) => (
            <div key={i} className="flex items-center gap-6 mx-6">
              <div className="relative w-32 h-40 md:w-48 md:h-64 overflow-hidden grayscale opacity-70 transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                <Image src={item.src} alt={item.name} fill className="object-cover" />
              </div>
              <span className="text-xl md:text-3xl lg:text-[3vw] font-sans font-medium text-white/30 uppercase whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div ref={r2Ref} className="w-full flex overflow-hidden group">
        <div className="flex animate-marquee-slow w-max">
          {[...row2, ...row2, ...row2].map((item, i) => (
            <div key={i} className="flex items-center gap-6 mx-6">
              <div className="relative w-32 h-40 md:w-48 md:h-64 overflow-hidden grayscale opacity-70 transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                <Image src={item.src} alt={item.name} fill className="object-cover" />
              </div>
              <span className="text-xl md:text-3xl lg:text-[3vw] font-sans font-medium text-white/30 uppercase whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
