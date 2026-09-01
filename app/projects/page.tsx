'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const extendedProjects = [
  { id: 1, title: 'MOLU', category: 'RETAIL', span: 'col-span-12 md:col-span-8', src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'GIGI RIGOLATTO', category: 'F&B', span: 'col-span-12 md:col-span-4 mt-0 md:mt-32', src: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'BEYMEN', category: 'RETAIL', span: 'col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-24', src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'TURKISH AIRLINES', category: 'OFFICE', span: 'col-span-12 md:col-span-6 mt-12 md:mt-0', src: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&q=80&w=1000' },
  { id: 5, title: 'HAKKASAN', category: 'F&B', span: 'col-span-12 md:col-span-12 mt-12 md:mt-24', src: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&q=80&w=1600' },
  { id: 6, title: 'NUUP RESTAURANT', category: 'F&B', span: 'col-span-12 md:col-span-7 mt-12 md:mt-24', src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1000' },
  { id: 7, title: 'PRIVATE RESIDENCE', category: 'RESIDENTIAL', span: 'col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-48', src: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'ST. REGIS', category: 'HOSPITALITY', span: 'col-span-12 md:col-span-6 md:col-start-2 mt-12 md:mt-24', src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000' },
  { id: 9, title: 'YOO HOTEL', category: 'HOSPITALITY', span: 'col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-0', src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800' },
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Reveal text
    gsap.from('.header-text', {
      yPercent: 100,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.1,
      delay: 0.2
    });

    // Grid batch reveal
    ScrollTrigger.batch('.project-item', {
      onEnter: batch => {
        gsap.to(batch, { 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          autoAlpha: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: 'power3.out' 
        });
      },
      start: 'top 85%',
    });

    // Parallax images
    gsap.utils.toArray('.project-image').forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, { scope: containerRef });

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
      setTimeout(() => {
        if (textPath) textPath.textContent = 'DRAG · DRAG · DRAG · ';
      }, 300);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={containerRef} className="w-full min-h-screen bg-white">
      <Nav />
      
      {/* Hero Header */}
      <section className="pt-48 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center overflow-hidden">
        <h1 className="header-text text-display text-[15vw] md:text-[18vw] leading-[0.8] tracking-tighter text-[#1A1A1A]">
          PROJECTS
        </h1>
      </section>

      {/* Grid Gallery */}
      <section className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {extendedProjects.map((project) => (
            <article 
              key={project.id} 
              className={`project-item relative group flex flex-col gap-4 opacity-0 translate-y-24 [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] ${project.span}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F7F4F0] rounded-[20px] md:rounded-[32px] cursor-none">
                <Image 
                  src={project.src} 
                  alt={project.title} 
                  fill 
                  className="project-image object-cover scale-110 origin-center transition-transform duration-700 ease-out group-hover:scale-100" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-muted font-sans mb-1">{project.category}</span>
                <h3 className="text-xl md:text-2xl font-sans font-medium text-main uppercase">{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Back to Top */}
      <div className="w-full flex justify-end px-6 md:px-12 lg:px-24 pb-24">
        <button 
          onClick={scrollToTop}
          className="w-12 h-12 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center hover:bg-accent-rust transition-colors hover:-translate-y-2 duration-300 group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="scale-75 transition-transform duration-300 group-hover:-translate-y-1">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      </div>

      <Footer />
    </main>
  );
}
