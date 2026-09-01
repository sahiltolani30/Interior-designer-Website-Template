import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Materials } from "@/components/Materials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F7F4F0]">
      <Preloader />
      <Nav />
      <Hero />
      <Philosophy />
      <Projects />
      <Process />
      <Testimonials />
      <Materials />
      <div className="bg-white rounded-b-[40px] md:rounded-b-[60px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] relative z-10">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
