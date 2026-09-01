'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function Contact() {
  const btnRef = useRef<HTMLButtonElement>(null);
  
  useGSAP(() => {
    // Magnetic Button
    if (btnRef.current) {
      const xTo = gsap.quickTo(btnRef.current, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(btnRef.current, 'y', { duration: 0.5, ease: 'power3.out' });

      btnRef.current.addEventListener('pointermove', (e) => {
        const rect = btnRef.current!.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width / 2) * 0.4);
        yTo((e.clientY - rect.top - rect.height / 2) * 0.4);
      });

      btnRef.current.addEventListener('pointerleave', () => { 
        xTo(0); 
        yTo(0); 
      });
    }
  }, []);

  return (
    <section id="contact" className="relative w-full bg-[#F7F4F0] pt-32 pb-32 md:pb-48 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Copy */}
        <div className="w-full lg:w-5/12">
          <h2 className="text-display text-5xl md:text-7xl lg:text-[6vw] leading-[1] mb-8">
            Let's <br/> <span className="text-accent-italic">discuss</span> <br/> your space.
          </h2>
          <p className="text-muted text-lg max-w-sm font-sans mb-12">
            Whether it's a private residence or a commercial endeavor, we are ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col gap-2 font-sans font-medium text-main text-sm tracking-wide">
            <a href="mailto:hello@formastudio.com" className="hover:text-accent-rust transition-colors w-fit">HELLO@FORMASTUDIO.COM</a>
            <a href="tel:+1234567890" className="hover:text-accent-rust transition-colors w-fit">+1 234 567 890</a>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-7/12">
          <form className="flex flex-col gap-12 mt-8 lg:mt-0 font-sans" onSubmit={(e) => e.preventDefault()}>
            
            <div className="flex flex-col md:flex-row gap-12">
              <div className="relative w-full md:w-1/2 group">
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-transparent border-b border-border-soft pb-4 text-main placeholder-transparent focus:outline-none focus:border-main transition-colors peer"
                  placeholder="Name"
                />
                <label htmlFor="name" className="absolute left-0 top-0 text-muted uppercase tracking-widest text-[0.65rem] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:text-main">
                  Your Name
                </label>
              </div>
              <div className="relative w-full md:w-1/2 group">
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-transparent border-b border-border-soft pb-4 text-main placeholder-transparent focus:outline-none focus:border-main transition-colors peer"
                  placeholder="Email"
                />
                <label htmlFor="email" className="absolute left-0 top-0 text-muted uppercase tracking-widest text-[0.65rem] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:text-main">
                  Email Address
                </label>
              </div>
            </div>

            <div className="relative w-full group">
              <input 
                type="text" 
                id="inquiry" 
                className="w-full bg-transparent border-b border-border-soft pb-4 text-main placeholder-transparent focus:outline-none focus:border-main transition-colors peer"
                placeholder="Inquiry"
              />
              <label htmlFor="inquiry" className="absolute left-0 top-0 text-muted uppercase tracking-widest text-[0.65rem] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:text-main">
                Project Type (e.g. Residential, Hospitality)
              </label>
            </div>

            <div className="relative w-full group">
              <textarea 
                id="message" 
                rows={3}
                className="w-full bg-transparent border-b border-border-soft pb-4 text-main placeholder-transparent focus:outline-none focus:border-main transition-colors resize-none peer"
                placeholder="Message"
              />
              <label htmlFor="message" className="absolute left-0 top-0 text-muted uppercase tracking-widest text-[0.65rem] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:text-main">
                Tell us about your project
              </label>
            </div>

            <div className="flex justify-end pt-8">
              <button 
                ref={btnRef}
                className="w-32 h-32 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center font-sans uppercase tracking-[0.2em] text-xs hover:bg-accent-rust transition-colors"
              >
                Send <br/> Inquiry
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
