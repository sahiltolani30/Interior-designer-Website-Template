'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  { id: 1, title: 'NOBU', category: 'F&B', location: 'Mumbai', src: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'KIRAN RESIDENCE', category: 'Residential', location: 'Delhi', src: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=80&w=1200' },
  { id: 3, title: 'THE GROVE CAFÉ', category: 'Commercial', location: 'Pune', src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, title: 'LEELA SUITES', category: 'Hospitality', location: 'Goa', src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200' },
  { id: 5, title: 'MEHTA OFFICE', category: 'Commercial', location: 'Bengaluru', src: 'https://images.unsplash.com/photo-1600607687710-cb005e838e12?auto=format&fit=crop&q=80&w=1200' },
  { id: 6, title: 'SUNLIT PENTHOUSE', category: 'Residential', location: 'Chennai', src: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1200' },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // 1. Ghost Parallax
    gsap.to('.projects-ghost-text', {
      xPercent: -15, // Move left slightly slower than scroll
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // 2. Scroll Reveals using batch
    ScrollTrigger.batch('.project-item', {
      onEnter: (elements) => {
        elements.forEach((item, i) => {
          const imgWrap = item.querySelector('.project-img-wrap');
          const img = item.querySelector('img');
          const meta = item.querySelector('.project-meta');
          
          const tl = gsap.timeline();
          
          tl.fromTo(imgWrap, 
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.out', delay: i * 0.1 }
          )
          .fromTo(img,
            { scale: 1.1 },
            { scale: 1, duration: 1.1, ease: 'power4.out' },
            '<'
          )
          .fromTo(meta, 
            { y: 15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' },
            '-=0.7'
          );
        });
      },
      start: 'top 85%',
      once: true,
    });

    // 3. Mouse parallax inside cards (desktop only)
    if (window.matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll('.project-item').forEach((item) => {
        const img = item.querySelector('img');
        if (!img) return;
        
        const xTo = gsap.quickTo(img, 'x', { duration: 0.6, ease: 'power3.out' });
        const yTo = gsap.quickTo(img, 'y', { duration: 0.6, ease: 'power3.out' });

        item.addEventListener('pointermove', (e: any) => {
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
          xTo(x);
          yTo(y);
        });

        item.addEventListener('pointerleave', () => {
          xTo(0);
          yTo(0);
        });
      });
    }
  }, { scope: sectionRef });

  const handleMouseEnter = () => {
    const circle = document.getElementById('cursor-circle');
    const textPath = circle?.querySelector('textPath');
    if (circle && textPath) {
      textPath.textContent = 'CLICK · CLICK · CLICK · CLICK · ';
      circle.classList.add('opacity-100', 'scale-100');
    }
  };

  const handleMouseLeave = () => {
    const circle = document.getElementById('cursor-circle');
    const textPath = circle?.querySelector('textPath');
    if (circle && textPath) {
      circle.classList.remove('opacity-100', 'scale-100');
      // Reset after transition
      setTimeout(() => {
        if (textPath) textPath.textContent = 'DRAG · DRAG · DRAG · ';
      }, 300);
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F7F4F0] pt-32 pb-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      
      {/* Ghost text background */}
      <div 
        className="projects-ghost-text absolute top-[15%] -left-[10%] text-[14vw] font-bold text-ghost whitespace-nowrap pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        SELECTED PROJECTS
      </div>

      <div className="relative z-10 w-full mb-32 flex justify-between items-start">
        <div className="text-[0.65rem] tracking-[0.25em] uppercase text-muted">What we do</div>
        <div className="text-display text-4xl md:text-5xl lg:text-[4vw] leading-[1.1] max-w-xl text-right">
          Offering <span className="text-accent-italic">perfectionist solutions,</span> leveraging our global <span className="text-accent-italic">experiences.</span>
        </div>
      </div>

      {/* Asymmetric 12-column grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 md:gap-y-40">
        
        {/* ROW 1 */}
        {/* Spans 6 cols */}
        <article className="project-item md:col-span-6" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <a href={`#project-${projects[0].id}`} className="block w-full">
            <figure className="w-full relative pt-[120%] md:pt-[130%]">
              <div className="project-img-wrap absolute inset-0 overflow-hidden bg-gray-200">
                <Image src={projects[0].src} alt={projects[0].title} fill className="object-cover scale-105 transition-transform duration-700 hover:scale-110" />
              </div>
            </figure>
            <footer className="project-meta mt-4 flex justify-between items-center opacity-0">
              <div>
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted">{projects[0].category}</span>
                <h3 className="text-base font-sans font-medium mt-1">{projects[0].title}</h3>
              </div>
              <span className="text-[0.65rem] uppercase text-muted">{projects[0].location}</span>
            </footer>
          </a>
        </article>

        {/* Spans 4 cols */}
        <article className="project-item md:col-span-4 md:mt-24" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <a href={`#project-${projects[1].id}`} className="block w-full">
            <figure className="w-full relative pt-[130%] md:pt-[140%]">
              <div className="project-img-wrap absolute inset-0 overflow-hidden bg-gray-200">
                <Image src={projects[1].src} alt={projects[1].title} fill className="object-cover scale-105 transition-transform duration-700 hover:scale-110" />
              </div>
            </figure>
            <footer className="project-meta mt-4 flex justify-between items-center opacity-0">
              <div>
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted">{projects[1].category}</span>
                <h3 className="text-base font-sans font-medium mt-1">{projects[1].title}</h3>
              </div>
            </footer>
          </a>
        </article>

        {/* Spans 2 cols (Partial peek) */}
        <article className="project-item md:col-span-2 hidden md:block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <a href={`#project-${projects[2].id}`} className="block w-full">
            <figure className="w-full relative pt-[150%]">
              <div className="project-img-wrap absolute inset-0 overflow-hidden bg-gray-200">
                <Image src={projects[2].src} alt={projects[2].title} fill className="object-cover scale-105 transition-transform duration-700 hover:scale-110" />
              </div>
            </figure>
          </a>
        </article>

        {/* ROW 2 */}
        {/* Spans 5 cols */}
        <article className="project-item md:col-span-5 md:-mt-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <a href={`#project-${projects[3].id}`} className="block w-full">
            <figure className="w-full relative pt-[140%] md:pt-[110%]">
              <div className="project-img-wrap absolute inset-0 overflow-hidden bg-gray-200">
                <Image src={projects[3].src} alt={projects[3].title} fill className="object-cover scale-105 transition-transform duration-700 hover:scale-110" />
              </div>
            </figure>
            <footer className="project-meta mt-4 flex justify-between items-center opacity-0">
              <div>
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted">{projects[3].category}</span>
                <h3 className="text-base font-sans font-medium mt-1">{projects[3].title}</h3>
              </div>
              <span className="text-[0.65rem] uppercase text-muted">{projects[3].location}</span>
            </footer>
          </a>
        </article>

        {/* Spans 4 cols */}
        <article className="project-item md:col-span-4 md:col-start-7 md:mt-32" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <a href={`#project-${projects[4].id}`} className="block w-full">
            <figure className="w-full relative pt-[120%]">
              <div className="project-img-wrap absolute inset-0 overflow-hidden bg-gray-200">
                <Image src={projects[4].src} alt={projects[4].title} fill className="object-cover scale-105 transition-transform duration-700 hover:scale-110" />
              </div>
            </figure>
            <footer className="project-meta mt-4 flex justify-between items-center opacity-0">
              <div>
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted">{projects[4].category}</span>
                <h3 className="text-base font-sans font-medium mt-1">{projects[4].title}</h3>
              </div>
            </footer>
          </a>
        </article>

        {/* ROW 3 */}
        {/* Spans 7 cols */}
        <article className="project-item md:col-span-7 md:col-start-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <a href={`#project-${projects[5].id}`} className="block w-full">
            <figure className="w-full relative pt-[70%]">
              <div className="project-img-wrap absolute inset-0 overflow-hidden bg-gray-200">
                <Image src={projects[5].src} alt={projects[5].title} fill className="object-cover scale-105 transition-transform duration-700 hover:scale-110" />
              </div>
            </figure>
            <footer className="project-meta mt-4 flex justify-between items-center opacity-0">
              <div>
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted">{projects[5].category}</span>
                <h3 className="text-base font-sans font-medium mt-1">{projects[5].title}</h3>
              </div>
              <span className="text-[0.65rem] uppercase text-muted">{projects[5].location}</span>
            </footer>
          </a>
        </article>

        {/* End of Grid */}
      </div>

      {/* Expanding CTA Button */}
      <div className="w-full flex justify-center mt-24 relative z-10 pb-12">
        <Link 
          href="/projects" 
          className="h-12 md:h-16 w-12 md:w-16 hover:w-48 md:hover:w-56 hover:px-6 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white cursor-pointer group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase whitespace-nowrap overflow-hidden max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:mr-2 md:group-hover:mr-3">
            See All Projects
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="scale-75 md:scale-100 flex-shrink-0">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>

    </section>
  );
}
