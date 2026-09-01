'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const steps = [
  { num: '01', title: 'DISCOVERY', text: 'We begin by understanding your vision, lifestyle, and how you intend to use the space. This is a collaborative dialogue where we establish the functional and aesthetic foundation of the project.' },
  { num: '02', title: 'CONCEPT', text: 'Translating ideas into visual language. We develop a comprehensive design direction, including spatial planning, material palettes, and initial sketches to align on the core aesthetic.' },
  { num: '03', title: 'DEVELOPMENT', text: 'Refining the concept down to the millimeter. This involves detailed architectural drawings, custom furniture specifications, and precise material sourcing from our global network of artisans.' },
  { num: '04', title: 'EXECUTION', text: 'Our project management team oversees the entire build process. We work closely with contractors and craftsmen to ensure every detail is executed to our uncompromising standards.' },
  { num: '05', title: 'HANDOVER', text: 'The final layer. We oversee the installation of all furniture, art, and styling elements, handing over a complete, turnkey space that is ready to be lived in.' },
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Reveal animation for step texts
    gsap.utils.toArray('.process-step-content').forEach((step: any) => {
      gsap.from(step, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        }
      });
    });

    // Highlight active number based on scroll position
    gsap.utils.toArray('.process-step-block').forEach((block: any, i) => {
      ScrollTrigger.create({
        trigger: block,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive && numbersRef.current[i]) {
            gsap.to(numbersRef.current[i], {
              color: '#1A1A1A',
              fontWeight: 700,
              scale: 1.1,
              transformOrigin: 'left center',
              duration: 0.3
            });
          } else if (numbersRef.current[i]) {
            gsap.to(numbersRef.current[i], {
              color: 'rgba(26,26,26,0.2)',
              fontWeight: 400,
              scale: 1.0,
              duration: 0.3
            });
          }
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-white text-main py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="text-[0.65rem] tracking-[0.25em] uppercase text-muted mb-24">Our Approach</div>
      
      <div className="flex flex-col md:flex-row relative">
        
        {/* Left Pinned Numbers (CSS Sticky) */}
        <div className="hidden md:block md:w-1/3 relative">
          <div className="sticky top-[30vh] flex flex-col gap-6 font-sans text-3xl lg:text-[3vw] text-border-soft">
            {steps.map((step, i) => (
              <div 
                key={step.num} 
                ref={el => { numbersRef.current[i] = el; }}
                className="transition-colors duration-300"
              >
                {step.num}
              </div>
            ))}
          </div>
        </div>

        {/* Right Scrolling Content */}
        <div className="w-full md:w-2/3 flex flex-col gap-24 md:gap-[40vh]">
          {steps.map((step, i) => (
            <div key={i} className="process-step-block flex flex-col md:block">
              {/* Mobile number (visible only on mobile) */}
              <div className="md:hidden text-2xl font-sans text-muted mb-4">{step.num}</div>
              
              <div className="process-step-content max-w-xl">
                <h3 className="text-3xl md:text-4xl lg:text-[3vw] text-display mb-6">{step.title}</h3>
                <p className="text-base md:text-lg text-muted font-sans leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
