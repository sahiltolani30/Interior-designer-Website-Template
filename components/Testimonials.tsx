'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap, Observer, SplitText, useGSAP } from '@/lib/gsap';

const quotes = [
  { text: "They don't just design rooms; they curate atmospheres. Every corner of our home feels intentional and breathtakingly beautiful.", author: "ALEXANDRA CHEN", role: "Private Residence" },
  { text: "A rare balance of brutalist architecture and warm, inviting textures. The studio understood our vision before we even fully articulated it.", author: "MARCUS WRIGHT", role: "Boutique Hotel Developer" },
  { text: "Their attention to materiality is unmatched. The spaces they create don't just look expensive; they feel timeless and deeply personal.", author: "ELENA ROSTOVA", role: "Creative Director" },
];

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const authorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);

  useGSAP(() => {
    // Hide all except first initially
    gsap.set(textRefs.current.slice(1), { autoAlpha: 0 });
    gsap.set(authorRefs.current.slice(1), { autoAlpha: 0 });

    const splits = textRefs.current.map(el => {
      if (!el) return null;
      const split = new SplitText(el, { type: 'words', wordsClass: 'overflow-hidden inline-flex' });
      return new SplitText(split.words, { type: 'words', wordsClass: 'inline-block' });
    });

    const authorSplits = authorRefs.current.map(el => {
      if (!el) return null;
      return new SplitText(el, { type: 'chars,words', charsClass: 'inline-block' });
    });

    // Hide inner words of inactive quotes
    splits.slice(1).forEach(s => {
      if (s) gsap.set(s.words, { yPercent: 110 });
    });
    authorSplits.slice(1).forEach(s => {
      if (s) gsap.set(s.chars, { y: 20, autoAlpha: 0 });
    });

    const goTo = (index: number, direction: 'next' | 'prev') => {
      if (isAnimating.current || index === current) return;
      isAnimating.current = true;

      const prevSplit = splits[current];
      const nextSplit = splits[index];
      const prevAuthor = authorSplits[current];
      const nextAuthor = authorSplits[index];

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrent(index);
          isAnimating.current = false;
        }
      });

      // Animate out previous
      if (prevSplit && prevAuthor) {
        tl.to(prevSplit.words, { 
          yPercent: direction === 'next' ? -110 : 110, 
          duration: 0.5, 
          stagger: direction === 'next' ? 0.015 : -0.015, 
          ease: 'power3.in' 
        }, 0)
        .to(prevAuthor.chars, {
          y: direction === 'next' ? -20 : 20,
          autoAlpha: 0,
          duration: 0.3,
          stagger: 0.01,
          ease: 'power3.in'
        }, 0)
        .set(textRefs.current[current], { autoAlpha: 0 })
        .set(authorRefs.current[current], { autoAlpha: 0 });
      }

      // Animate in next
      if (nextSplit && nextAuthor) {
        tl.set(textRefs.current[index], { autoAlpha: 1 })
          .set(authorRefs.current[index], { autoAlpha: 1 })
          .fromTo(nextSplit.words, 
            { yPercent: direction === 'next' ? 110 : -110 },
            { yPercent: 0, duration: 0.7, stagger: direction === 'next' ? 0.015 : -0.015, ease: 'power3.out' }, 
            0.4
          )
          .fromTo(nextAuthor.chars,
            { y: direction === 'next' ? 20 : -20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.01, ease: 'power3.out' },
            0.6
          );
      }
    };

    const next = () => goTo((current + 1) % quotes.length, 'next');
    const prev = () => goTo((current - 1 + quotes.length) % quotes.length, 'prev');

    // Swipe observer
    Observer.create({
      target: containerRef.current,
      type: 'touch,pointer',
      onRight: () => prev(),
      onLeft: () => next(),
      tolerance: 30,
      preventDefault: false
    });

    // Handle cursor changes for left/right halves
    const handlePointerMove = (e: PointerEvent) => {
      const circle = document.getElementById('cursor-circle');
      const textPath = circle?.querySelector('textPath');
      if (!circle || !textPath || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isRight = e.clientX > rect.left + rect.width / 2;
      
      textPath.textContent = isRight ? 'NEXT · NEXT · NEXT · ' : 'PREV · PREV · PREV · ';
      circle.classList.add('opacity-100', 'scale-100');
    };

    const handlePointerLeave = () => {
      const circle = document.getElementById('cursor-circle');
      if (circle) circle.classList.remove('opacity-100', 'scale-100');
    };

    containerRef.current?.addEventListener('pointermove', handlePointerMove);
    containerRef.current?.addEventListener('pointerleave', handlePointerLeave);
    // Click to advance
    containerRef.current?.addEventListener('click', (e) => {
      const rect = containerRef.current!.getBoundingClientRect();
      if (e.clientX > rect.left + rect.width / 2) next();
      else prev();
    });

    return () => {
      containerRef.current?.removeEventListener('pointermove', handlePointerMove);
      containerRef.current?.removeEventListener('pointerleave', handlePointerLeave);
    };

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-[100dvh] bg-[#0d0c0b] text-white flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 overflow-hidden cursor-none">
      
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 text-[0.65rem] tracking-[0.25em] uppercase text-white/50">
        Perspectives
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-[40vh] md:h-[50vh] flex flex-col justify-center items-center">
        {quotes.map((quote, i) => (
          <div key={i} className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div 
              ref={el => { textRefs.current[i] = el; }}
              className="text-display text-3xl md:text-5xl lg:text-[4.5vw] leading-[1.2] mb-12"
            >
              "{quote.text}"
            </div>
            <div 
              ref={el => { authorRefs.current[i] = el; }}
              className="text-[0.65rem] tracking-[0.25em] uppercase text-white/60 font-sans"
            >
              <span className="text-white font-medium mr-2">{quote.author}</span> — {quote.role}
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10 pointer-events-none">
        {quotes.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20 overflow-hidden relative">
            <div 
              className={`absolute inset-0 bg-white transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`} 
            />
          </div>
        ))}
      </div>

    </section>
  );
}
