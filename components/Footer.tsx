'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Link from 'next/link';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Parallax reveal
    gsap.fromTo(footerRef.current,
      { yPercent: -15, autoAlpha: 0.8 },
      {
        yPercent: 0, 
        autoAlpha: 1, 
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative w-full bg-[#0d0c0b] text-white pt-32 pb-8 px-6 md:px-12 lg:px-24 flex flex-col">
      
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32 border-b border-white/10 pb-16">
        
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          <div className="text-display text-4xl mb-4">FORMA</div>
          <p className="text-white/50 text-sm font-sans max-w-xs leading-relaxed">
            Spaces designed to outlive the moment. An interior architecture practice based in London, working globally.
          </p>
        </div>

        <div className="flex gap-16 md:gap-24 w-full md:w-auto font-sans text-sm uppercase tracking-widest">
          <div className="flex flex-col gap-4">
            <span className="text-white/40 text-[0.65rem] mb-2">Studio</span>
            <Link href="/projects" className="hover:text-white/60 transition-colors">Work</Link>
            <Link href="/#process" className="hover:text-white/60 transition-colors">Process</Link>
            <Link href="#journal" className="hover:text-white/60 transition-colors">Journal</Link>
            <Link href="#contact" className="hover:text-white/60 transition-colors">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-white/40 text-[0.65rem] mb-2">Socials</span>
            <a href="#" className="hover:text-white/60 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/60 transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white/60 transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
        <div>© {new Date().getFullYear()} FORMA STUDIO</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

    </footer>
  );
}
