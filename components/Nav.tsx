'use client';

import Link from 'next/link';
import { gsap, useGSAP } from '@/lib/gsap';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);
  const midRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    // Initial reveal
    gsap.from(navRef.current, {
      y: -20,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
      delay: pathname === '/' ? 2 : 0 // Delay only on homepage for preloader
    });
  }, { scope: navRef, dependencies: [pathname] });

  // Menu Animation
  useGSAP(() => {
    if (isOpen) {
      // Open Menu
      gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power3.inOut' });
      gsap.fromTo('.menu-link', 
        { y: 40, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );
      // Hamburger to X
      gsap.to(topRef.current, { y: 7, rotation: 45, duration: 0.4, ease: 'power3.inOut' });
      gsap.to(midRef.current, { autoAlpha: 0, duration: 0.2 });
      gsap.to(botRef.current, { y: -7, rotation: -45, duration: 0.4, ease: 'power3.inOut' });
    } else {
      // Close Menu
      gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power3.inOut', delay: 0.2 });
      gsap.to('.menu-link', { y: -20, autoAlpha: 0, duration: 0.3, ease: 'power3.in' });
      // X to Hamburger
      gsap.to([topRef.current, botRef.current], { y: 0, rotation: 0, duration: 0.4, ease: 'power3.inOut' });
      gsap.to(midRef.current, { autoAlpha: 1, duration: 0.4, delay: 0.2 });
    }
  }, { dependencies: [isOpen] });

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-[60] px-6 py-8 flex justify-between items-center text-white mix-blend-difference">
        {/* Menu Icon */}
        <button onClick={toggleMenu} className="flex flex-col gap-[6px] w-[24px] h-[15px] cursor-pointer hover:opacity-70 transition-opacity relative z-[60]">
          <span ref={topRef} className="w-full h-[1px] bg-white absolute top-0 left-0 origin-center"></span>
          <span ref={midRef} className="w-full h-[1px] bg-white absolute top-[7px] left-0"></span>
          <span ref={botRef} className="w-full h-[1px] bg-white absolute top-[14px] left-0 origin-center"></span>
        </button>

        {/* Brand Name */}
        <Link href="/" onClick={closeMenu} className="text-sm uppercase tracking-[0.25em] font-sans font-medium text-center absolute left-1/2 -translate-x-1/2 z-[60]">
          FORMA
        </Link>

        {/* Right Link */}
        <Link href="/projects" onClick={closeMenu} className="text-[0.7rem] uppercase tracking-[0.2em] font-sans font-medium hover:opacity-70 transition-opacity z-[60]">
          Work
        </Link>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 w-full h-[100dvh] bg-[#F7F4F0] z-50 invisible flex flex-col justify-center items-center"
      >
        <div className="flex flex-col items-center gap-6 text-display text-5xl md:text-7xl lg:text-[6vw] text-[#1A1A1A]">
          <Link href="/" onClick={closeMenu} className="menu-link hover:text-accent-italic transition-colors">Home</Link>
          <Link href="/projects" onClick={closeMenu} className="menu-link hover:text-accent-italic transition-colors">Projects</Link>
          <Link href="/#process" onClick={closeMenu} className="menu-link hover:text-accent-italic transition-colors">Process</Link>
          <Link href="#contact" onClick={closeMenu} className="menu-link hover:text-accent-italic transition-colors">Contact</Link>
        </div>
      </div>
    </>
  );
}
