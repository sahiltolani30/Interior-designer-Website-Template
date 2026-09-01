'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import Link from 'next/link';

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const q1Ref = useRef<HTMLDivElement>(null);
  const q2Ref = useRef<HTMLDivElement>(null);
  const q3Ref = useRef<HTMLDivElement>(null);

  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // 1. Magnetic button
    if (btnRef.current) {
      const xTo = gsap.quickTo(btnRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(btnRef.current, 'y', { duration: 0.4, ease: 'power3.out' });

      const handleMove = (e: PointerEvent) => {
        const rect = btnRef.current!.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
        yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
      };
      
      const handleLeave = () => { xTo(0); yTo(0); };

      btnRef.current.addEventListener('pointermove', handleMove);
      btnRef.current.addEventListener('pointerleave', handleLeave);
    }

    // 2. Pin and Quote Swap Animation
    const q1 = new SplitText(q1Ref.current, { type: 'words', wordsClass: 'overflow-hidden inline-flex' });
    const q1Inner = new SplitText(q1.words, { type: 'words', wordsClass: 'inline-block' });
    
    const q2 = new SplitText(q2Ref.current, { type: 'words', wordsClass: 'overflow-hidden inline-flex' });
    const q2Inner = new SplitText(q2.words, { type: 'words', wordsClass: 'inline-block' });

    const q3 = new SplitText(q3Ref.current, { type: 'words', wordsClass: 'overflow-hidden inline-flex' });
    const q3Inner = new SplitText(q3.words, { type: 'words', wordsClass: 'inline-block' });

    // Initial state
    gsap.set(q2Inner.words, { yPercent: 110 });
    gsap.set(q3Inner.words, { yPercent: 110 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // State 1 -> 2
    tl.to(q1Inner.words, { yPercent: -110, duration: 0.3, stagger: 0.01 }, 0.25)
      .to(q2Inner.words, { yPercent: 0, duration: 0.3, stagger: 0.01 }, 0.3)
      .to('.word-design', { color: 'rgba(26,26,26,0.12)', duration: 0.2 }, 0.25)
      .to('.word-build', { color: '#1A1A1A', duration: 0.2 }, 0.3);

    // State 2 -> 3
    tl.to(q2Inner.words, { yPercent: -110, duration: 0.3, stagger: 0.01 }, 0.65)
      .to(q3Inner.words, { yPercent: 0, duration: 0.3, stagger: 0.01 }, 0.7)
      .to('.word-build', { color: 'rgba(26,26,26,0.12)', duration: 0.2 }, 0.65)
      .to('.word-design-build', { color: '#1A1A1A', duration: 0.2 }, 0.7);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-[100dvh] bg-[#F7F4F0] flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Top Labels */}
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 text-[0.65rem] tracking-[0.25em] uppercase text-muted">
        Expertise
      </div>
      <div className="absolute top-12 right-6 md:right-12 lg:right-24 text-[8vw] md:text-[6vw] font-bold text-ghost leading-none select-none pointer-events-none">
        PROJECTS
      </div>

      {/* Main Container */}
      <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-end mt-12 md:mt-24 gap-8 md:gap-0">
        
        {/* Right Stack (Moved to top on mobile for flow) */}
        <div className="flex flex-row md:flex-col items-start md:items-end gap-3 md:gap-1 text-[3.5vw] md:text-[2.5vw] font-sans font-medium uppercase leading-none md:pb-4 order-1 md:order-2">
          <div className="word-design text-[#1A1A1A]">Design</div>
          <div className="word-build text-border-soft">Build</div>
          <div className="word-design-build text-border-soft">Design + Build</div>
        </div>

        {/* Quotes Area */}
        <div ref={quotesRef} className="w-[90%] md:w-[70%] lg:w-[65%] relative h-[40vh] md:h-[30vh] order-2 md:order-1">
          {/* Quote 1 */}
          <div ref={q1Ref} className="absolute inset-0 text-3xl md:text-5xl lg:text-[5vw] leading-[1.2] font-sans text-main">
            Design begins with an idea, a possibility shaped through <span className="text-accent-italic">exploration</span> and <span className="text-accent-italic">intent.</span>
          </div>
          
          {/* Quote 2 */}
          <div ref={q2Ref} className="absolute inset-0 text-3xl md:text-5xl lg:text-[5vw] leading-[1.2] font-sans text-main">
            If a building becomes <span className="text-accent-italic">architecture</span> then it is <span className="text-accent-italic">art.</span>
          </div>

          {/* Quote 3 */}
          <div ref={q3Ref} className="absolute inset-0 text-3xl md:text-5xl lg:text-[5vw] leading-[1.2] font-sans text-main">
            Design + Build = <span className="text-accent-italic">Time</span>
          </div>
        </div>
      </div>

      {/* Expanding CTA Button */}
      <Link 
        href="#contact" 
        ref={btnRef}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 h-12 md:h-16 w-12 md:w-16 hover:w-40 md:hover:w-48 hover:px-6 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white cursor-pointer z-10 group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase whitespace-nowrap overflow-hidden max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:mr-2 md:group-hover:mr-3">
          Contact Us
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="scale-75 md:scale-100 flex-shrink-0">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </section>
  );
}
